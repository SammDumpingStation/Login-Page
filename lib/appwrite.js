import { Client, Account, ID, Databases } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rn.koshi",
  projectId: "66e928ab0034d564f865",
  databaseId: "66e92b9d000cf78a3545",
  userCollectionId: "66e9900900236805d5a0",
  storageId: "66e92d0400123e0307dd",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    // Signing in immediately after account creation
    const session = await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(), // Use the account ID as the document ID
      {
        accountId: newAccount.$id,
        email,
        username,
      }
    );

    return { newAccount, session, newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the original error
  }
};

export const signIn = async (email, password) => {
  try {
    await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Re-throw the original error
  }
};
