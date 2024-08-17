import { account, toggleVisibility } from "./appwrite/config";
document.addEventListener("DOMContentLoaded", function () {
  console.log(`LOGIN READY`);
  const loginEmailInput = document.querySelector(".login_email");
  const loginPasswordInput = document.querySelector(".login_password");
  const loginButton = document.querySelector(".login_btn");
  document
    .getElementById("toggle-password")
    .addEventListener("click", toggleVisibility);

  /*LOGIN START*/
  async function loginUser(userData) {
    try {
      const { email, password } = userData;
      // await account.deleteSession("current");
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      if (response) {
        window.location.href = "/pages/profile";
        console.log(`user session created:`);
      }
    } catch (error) {
      console.log(error);
    }
  }
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

  /*LOGIN END*/
});
