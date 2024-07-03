import { BASE_URL } from "../../config.js";
import Handlebars from "../../helpers.js";
import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";

class UserLogoutView extends View {
  parentElement;
  constructor() {
    super();
  }

  async render() {
    this.parentElement = document.querySelector(".user__content");
    let template = Handlebars.templates["logout-page.hbs"];
    this.parentElement.innerHTML = template({ user: true });

    try {
      const uuid = localStorage.getItem("USESSIONID");
      const data = {
        USESSIONID: uuid
      }
      const response = await fetch(`${BASE_URL}/api/users/logout`, {
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
        localStorage.removeItem("USESSIONID");
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
      } else {
        this.renderToast(result.message);
      }
    } catch (err) {
      console.log(err);
      this.renderToast("Error Occured");
    }
    // document.getElementById("user_navbar").remove();
    // let sec = 5;
    // let interval = setInterval(() => {
    //   document.getElementById("seconds").innerText = sec + " seconds";
    //   sec--;

    // }, 1000);
    // setTimeout(() => {
    //   clearInterval(interval);
    //   router.navigateTo("/");
    // }, 6000);
  }

}
export default new UserLogoutView();