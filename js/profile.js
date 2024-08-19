import { account, CheckAuth, client, ID } from "./appwrite/config";

document.addEventListener("DOMContentLoaded", async function () {
  const userFullName = document.querySelector(".user_fullname");
  const userEmail = document.querySelector(".user_email");
  try {
    if (window.location.pathname === "/pages/profile") {
      CheckAuth();
    }
    const { name, email } = await account.get();

    userFullName.textContent = name;
    userEmail.textContent = email;

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
  } catch (error) {
    console.log(error.message);
  }

  //   console.log(`profile page`);
});
