"use strict";
import { client, database, ID } from "./appwrite/config";

const createAccountButton = document.querySelector(".createAccount_btn");
const nameInput = document.querySelector(".name_input");
const emailInput = document.querySelector(".email_input");
const passwordInput = document.querySelector(".password_input");

createAccountButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailValue = emailInput.value.trim();
  if (validateInputs()) {
    createAccountButton.disabled = true;
  }
  const newUserData = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
  };

  await createUser(newUserData);
});

/*VALIDATE USER INPUTS START*/
function validateInputs() {
  if (!nameInput.value.trim()) {
    alert("Name is required");
    return false;
  }
  if (!emailInput.value.trim()) {
    alert("Email is required");
    return false;
  }
  if (!passwordInput.value.trim()) {
    alert("Password is required");
    return false;
  }
  return true;
}
/*VALIDATE USER INPUTS END*/

/*CREATE NEW USER START */

async function createUser(newUserData) {
  try {
    const response = await database.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_COLLECTION_ID_USERDATA,
      ID.unique(),
      newUserData
    );
    alert("Account created successfully!");
  } catch (error) {
    console.error("Failed to create account:", error);
    alert("There was an error creating the account. Please try again.");
  }
}
/*CREATE NEW USER END */
