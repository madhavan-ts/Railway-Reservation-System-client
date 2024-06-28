import { state } from "../../models.js";
import router from "../../router.js";

class AdminLogoutView {
  parentElement;
  constructor() {

  }

  render() {
    this.parentElement = document.querySelector(".admin__content");
    this.parentElement.innerHTML = this.getHTML();
    state.adminDetails = {};
    document.getElementById("admin_navbar").remove();
    let sec = 5;
    let interval = setInterval(() => {
      document.getElementById("seconds").innerText = sec + " seconds";
      sec--;

      console.log(sec);
      console.log("Running");
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      router.navigateTo("/");
    }, 6000);
  }

  getHTML() {
    return `
    <div class="w-100 text-center">
      <p class="fs-4" >You have been logged out of the Admin page</p>
      <p> You will be redirected to Homepage in <span id="seconds"></></p>
    </div>
    `
  }

}
export default new AdminLogoutView();