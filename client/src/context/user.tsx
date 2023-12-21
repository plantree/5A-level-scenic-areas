import { createContext, useContext, useEffect, useState } from 'react';
import { account, ID } from '../lib/appwrite';
import { Models } from 'appwrite';

const UserContext = createContext<{
  current: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
} | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  async function login(email: string, password: string) {
    await account.createEmailSession(email, password);
    const loggedIn = await account.get();
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession('current');
    setUser(null);
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
