import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";

class AdminLogoutView {
  parentElement;
  constructor() {

  }

  async render() {
    this.parentElement = document.querySelector(".admin__content");
    this.parentElement.innerHTML = await getHandlebar("./js/templates/logout-page.hbs", { user: false });
    state.adminDetails = {};
    state.isAdminLoggedIn = false;
    document.getElementById("admin_navbar").remove();
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
export default new AdminLogoutView();