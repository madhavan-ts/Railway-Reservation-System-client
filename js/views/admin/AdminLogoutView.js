import { BASE_URL } from "../../config.js";
// import Handlebars from "../../helpers.js";
import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";

class AdminLogoutView extends View {
  parentElement;
  constructor() { 
    super();
  }

  async render() {
    this.parentElement = document.querySelector(".admin__content");
    let template = Handlebars.templates["logout-page.hbs"];
    this.parentElement.innerHTML = template({ user: false });

    try {
      const uuid = localStorage.getItem("ASESSIONID");
      const data = {
        ASESSIONID: uuid
      }
      const response = await fetch(`${BASE_URL}/api/admin/logout`, {
        headers: new Headers({
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }),
        method: "POST",
        body: JSON.stringify(data)
      })

      console.log(response);
      const result = await response.json();
      console.log(result);
      if (result.success) {
        localStorage.removeItem("ASESSIONID");
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
          router.navigateTo("/admin-login");
        }, 6000);
      } else {
        this.renderToast(result.message);
      }
    } catch (err) {
      console.log(err);
      this.renderToast("Error Occured");
    }
    // state.adminDetails = {};
    // state.isAdminLoggedIn = false;
    // document.getElementById("admin_navbar").remove();
    // let sec = 5;
    // let interval = setInterval(() => {
    //   document.getElementById("seconds").innerText = sec + " seconds";
    //   sec--;
    // }, 1000);

    // setTimeout(() => {
    //   clearInterval(interval);
    //   router.navigateTo("/admin-login");
    // }, 6000);
  }

}
export default new AdminLogoutView();