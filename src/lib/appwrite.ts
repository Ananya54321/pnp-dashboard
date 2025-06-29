import { Client, Account, Databases, Storage, Functions, OAuthProvider } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// OAuth providers
export const oAuthProviders = {
    google: OAuthProvider.Google,
    github: OAuthProvider.Github,
};

export { client, OAuthProvider };
