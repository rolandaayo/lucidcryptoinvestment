"use strict";
import { account, ID } from "./appwrite/config";

document.addEventListener("DOMContentLoaded", function () {
  const createAccountButton = document.querySelector(".createAccount_btn");
  const nameInput = document.querySelector(".name_input");
  const emailInput = document.querySelector(".email_input");
  const passwordInput = document.querySelector(".password_input");

  const loginPasswordInput = document.querySelector(".login_password");
  const loginEmailInput = document.querySelector(".login_email");
  const loginButton = document.querySelector(".login_btn");
  function clearInputs() {
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  }

  if (createAccountButton) {
    createAccountButton.addEventListener("click", async function (e) {
      e.preventDefault();

      const nameValue = nameInput.value.trim();
      const passwordValue = passwordInput.value.trim();
      const emailValue = emailInput.value.trim();
      if (validateInputs(nameInput, emailInput, passwordInput)) {
        createAccountButton.disabled = true;
      }
      const newUserData = {
        fullName: nameValue,
        email: emailValue,
        password: passwordValue,
      };

      await createUser(newUserData);
      createAccountButton.disabled = false;
    });
  }

  /*VALIDATE USER INPUTS START*/
  function validateInputs(nameField, emailField, passwordField) {
    if (!nameField.value.trim()) {
      alert("Name is required");
      return false;
    }
    if (!emailField.value.trim()) {
      alert("Email is required");
      return false;
    }
    if (!passwordField.value.trim()) {
      alert("Password is required");
      return false;
    }
    return true;
  }

  /*VALIDATE USER INPUTS END*/

  /*CREATE NEW USER START */

  async function createUser(newUserData) {
    try {
      const { email, password, fullName } = newUserData;

      // 1. create new user account in Appwrite
      const newAccount = await account.create(ID.unique(), email, password);
      // 2. Log in the user immediately after account creation
      const session = await account.createEmailPasswordSession(email, password);
      // 3. update the full name
      if (session) {
        // This checks if the session was created successfully and then updates the user name
        const nameUpdateResponse = await account.updateName(fullName);
        console.log(`name update response :`);
        // 4. Log out the user
        await account.deleteSession("current");
      } else {
        console.log("Session creation failed, cannot update full name.");
      }

      if (newAccount) {
        alert("Account created successfully!"); // remember to replace with correct notification library

        // 5. Clear the input fields if the account was created successfully
        clearInputs();

        // and redirect to the login page
        window.location.href = "/pages/login.html";
      }
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("There was an error creating the account. Please try again.");
    }
  }
  /*CREATE NEW USER END */

  

  /*LOGIN END*/

  /*LOGOUT START*/
  // async function logoutUser() {
  //   try {
  //     const logoutResponse = await account.deleteSession("current");
  //     console.log("Session ended successfully:", logoutResponse);
  //     window.location.href = "/pages/login";
  //   } catch (error) {
  //     console.error("Failed to log out:", error);
  //   }
  // }
  // document
  //   .querySelector(".logout_button")
  //   .addEventListener("click", async function () {
  //     await logoutUser();
  //   });

  // /*LOGOUT END*/
});
