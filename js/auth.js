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
        name: nameValue,
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
      const { email, password, name } = newUserData;

      // 1. create new user account in Appwrite
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newAccount) {
        console.log(newAccount);
        alert("Account created successfully!"); // remember to replace with correct notification library

        // 2. Clear the input fields if the account was created successfully
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
});
