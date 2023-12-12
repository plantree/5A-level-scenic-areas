import { Client, Account, Databases, ID, Permission, Role } from 'appwrite';

export const client = new Client();

const END_POINT = 'http://localhost/v1';
const PROJECT_ID = '656d6955d4c0386a84d3';
const DATABASE_ID = '657676572d9f3eb6d337';
const COLLECTION_ID = '657676762f0cf9c3723b';

client.setEndpoint(END_POINT).setProject(PROJECT_ID);

// Auth.
export const account = new Account(client);
export { ID } from 'appwrite';

// Database.
const database = new Databases(client);
export async function createUser(name: string) {
  try {
    return await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { name: name }, [
      Permission.read(Role.any()), // Anyone can view this document
      Permission.update(Role.team('writers')), // Writers can update this document
      Permission.update(Role.team('admin')), // Admins can update this document
      Permission.delete(Role.user('5c1f88b42259e')), // User 5c1f88b42259e can delete this document
      Permission.delete(Role.team('admin'))
    ]);
  } catch (e) {
    console.error(e);
  }
  return null;
}
