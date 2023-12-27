import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

const END_POINT = 'https://api.counter.plantree.me/v1';
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

client.setEndpoint(END_POINT).setProject(PROJECT_ID);

// Auth.
export const account = new Account(client);
export { ID } from 'appwrite';

// Database.
export const database = new Databases(client);
export async function generateId(text: string) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return hashHex.slice(0, 24);
}
