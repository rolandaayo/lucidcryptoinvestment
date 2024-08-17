import { toggleVisibility } from "./appwrite/config";
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("toggle-password")
    .addEventListener("click", toggleVisibility);
  console.log(`REGISTER READY`);
});
