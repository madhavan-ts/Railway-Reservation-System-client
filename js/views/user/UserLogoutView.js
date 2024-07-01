import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";

class UserLogoutView {
  parentElement;
  constructor() {

  }

  async render() {
    this.parentElement = document.querySelector(".user__content");
    this.parentElement.innerHTML = await getHandlebar("./js/templates/logout-page.hbs", { user: true });
    state.userDetails = {};
    state.isUserLoggedIn = false;
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

}
export default new UserLogoutView();