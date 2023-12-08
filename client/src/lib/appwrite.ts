import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('http://localhost/v1').setProject('656d6955d4c0386a84d3');

export const account = new Account(client);
export { ID } from 'appwrite';

export async function accountLoader() {
  try {
    const user = await account.get();
    return user;
  } catch (e) {
    return null;
  }
}
