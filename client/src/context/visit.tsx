import { createContext, useContext, useEffect, useState } from 'react';
import { database, DATABASE_ID, COLLECTION_ID } from '../lib/appwrite';
import { Query } from 'appwrite';
import { account, generateId } from '../lib/appwrite';

import { useUser } from './user';

const VisitContext = createContext<{
  visits: Map<string, string>;
  addVisit: (name: string) => Promise<void>;
  removeVisit: (name: string) => Promise<void>;
  exist: (name: string) => boolean;
} | null>(null);

export function useVisit() {
  return useContext(VisitContext);
}

export function VisitProvider(props: { children: React.ReactNode }) {
  const user = useUser();
  const isAuthenticated = user?.current !== null;

  const [visits, setVisits] = useState<Map<string, string>>(new Map());

  async function addVisit(name: string) {
    if (!isAuthenticated) {
      return;
    }
    if (exist(name)) {
      return;
    }
    const response = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      await generateId(user!.current!.email + name),
      {
        user_name: user!.current!.email,
        visit: name
      }
    );
    setVisits(visits.set(name, response.$id));
  }

  async function removeVisit(name: string) {
    if (!isAuthenticated) {
      return;
    }
    if (!exist(name)) {
      return;
    }
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, visits.get(name)!);
    visits.delete(name);
    setVisits(new Map(visits));
  }

  function exist(name: string) {
    if (!isAuthenticated) {
      return false;
    }
    return visits.has(name);
  }

  async function init() {
    const user = await account.get();
    if (!user) {
      return;
    }
    try {
      const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.orderDesc('$createdAt'),
        Query.equal('user_name', user!.email),
        Query.limit(400),
        Query.offset(0)
      ]);
      setVisits(response.documents.reduce((map, doc) => map.set(doc.visit, doc.$id), new Map()));
    } catch (e) {
      console.log(e);
      setVisits(new Map());
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  return (
    <VisitContext.Provider value={{ visits: visits, addVisit, removeVisit, exist }}>
      {props.children}
    </VisitContext.Provider>
  );
}
