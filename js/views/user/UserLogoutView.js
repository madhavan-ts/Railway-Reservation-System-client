import { state } from "../../models.js";
import router from "../../router.js";

class UserLogoutView {
  parentElement;
  constructor() {

  }

  render() {
    this.parentElement = document.querySelector(".user__content");
    this.parentElement.innerHTML = this.getHTML();
    state.userDetails = {};
    document.getElementById("user_navbar").remove();
    let sec = 5;
    let interval = setInterval(() => {
      document.getElementById("seconds").innerText = sec + " seconds";
      sec--;

    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      router.navigateTo("/");
    }, 6000);
  }

  getHTML() {
    return `
    <div class="w-100 text-center">
      <p class="fs-4" >You have been logged out of the Users page</p>
      <p> You will be redirected to Homepage in <span id="seconds"></></p>
    </div>
    `
  }

}
export default new UserLogoutView();