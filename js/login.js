import { account, toggleVisibility } from "./appwrite/config";
document.addEventListener("DOMContentLoaded", function () {
  console.log(`LOGIN READY`);
  const loginEmailInput = document.querySelector(".login_email");
  const loginPasswordInput = document.querySelector(".login_password");
  const loginButton = document.querySelector(".login_btn");
  document
    .getElementById("toggle-password")
    .addEventListener("click", toggleVisibility);

  /*VALIDATE USER INPUTS START*/
  function validateInputs(emailField, passwordField) {
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
  /*LOGIN START*/
  async function loginUser(userData) {
    try {
      const { email, password } = userData;
      // await account.deleteSession("current");
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log(response);
      if (response) {
        console.log(`user session created:`);
        window.location.href = "/pages/profile";
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  if (loginButton) {
    loginButton.addEventListener("click", async function (e) {
      e.preventDefault();
      const emailValue = loginEmailInput.value.trim();
      const passwordValue = loginPasswordInput.value.trim();
      if (validateInputs(loginEmailInput, loginPasswordInput)) {
        loginButton.disabled = true;
      }

      const loginInfo = {
        email: emailValue,
        password: passwordValue,
      };
      await loginUser(loginInfo);
    });
  }

  /*LOGIN END*/
});
