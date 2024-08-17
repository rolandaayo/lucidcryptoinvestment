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
    console.log(`user is logged in:`, currentSession);
    return currentSession;
  } catch (error) {
    window.location.href = "/pages/login";
    console.log("User is not logged in:", error);
  }
}

function toggleVisibility() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("toggle-icon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}
export { client, database, ID, account, CheckAuth, toggleVisibility };
