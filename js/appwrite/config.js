"use strict";
import { Client, Databases, ID, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const database = new Databases(client);
const account = new Account(client);

async function CheckAuth() {
  try {
    const currentSession = await account.get();
    console.log(`user is logged in:`);
  } catch (error) {
    window.location.href = "/pages/login";
    console.log("User is not logged in:", error);
  }
}

export { client, database, ID, account, CheckAuth };
