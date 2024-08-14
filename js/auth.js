"use strict";
import { account, CheckAuth, client, database, ID } from "./appwrite/config";

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/pages/profile") {
    CheckAuth();
  }
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
      const { email, password } = newUserData;

      const newAccount = await account.create(ID.unique(), email, password);
      console.log(newAccount);
      alert("Account created successfully!"); // replace with correct notification library

      if (newAccount) {
        clearInputs();
      }
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("There was an error creating the account. Please try again.");
    }
  }
  /*CREATE NEW USER END */

  /*LOGIN START*/
  if (loginButton) {
    loginButton.addEventListener("click", async function (e) {
      e.preventDefault();
      const emailValue = loginEmailInput.value.trim();
      const passwordValue = loginPasswordInput.value.trim();

      const loginInfo = {
        email: emailValue,
        password: passwordValue,
      };
      await loginUser(loginInfo);
    });
  }
  async function loginUser(userData) {
    try {
      const { email, password } = userData;

      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log(response);
      if (response) {
        window.location.href = "/pages/profile";
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*LOGIN END*/

  /*LOGOUT START*/
  async function logoutUser() {
    try {
      const logoutResponse = await account.deleteSession("current");
      console.log("Session ended successfully:", logoutResponse);
      window.location.href = "/pages/login";
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }
  document
    .querySelector(".logout_button")
    .addEventListener("click", async function () {
      await logoutUser();
    });

  /*LOGOUT END*/
});
