import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";
import CancelTicketView from "./CancelTicketView.js";

import CheckPNRStatusView from "./CheckPNRStatusView.js";
import ProfilePageView from "./ProfilePageView.js";
import TrainFormsView from "./TrainFormsView.js";
import UserLogoutView from "./UserLogoutView.js";


class UserHomePageView extends View {
  links = [
    { label: "Book Ticket", view: TrainFormsView },
    { label: "PNR Status", view: CheckPNRStatusView },
    { label: "Cancel Ticket", view: CancelTicketView },
    { label: "Profile", view: ProfilePageView },
    { label: "Logout", view: UserLogoutView },

  ];
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  async render() {
    if (state.isUserLoggedIn === false) {
      this.renderToast("Not Logged in",);
      router.redirectTo("/");
      return;
    } 
    let template = 
    this.parentElement.innerHTML = await getHandlebar("./js/templates/navbar.hbs", { type: "user", links: this.links });
    this.addEventHandlers();
    // console.log(this.links);
    // console.log(document.querySelector(`#user_navbar li[data-target="Book Ticket"]`));
    document.querySelector(`#user_navbar li[data-target="Book Ticket"]`).classList.add("bg-primary");
    TrainFormsView.render();
  }



  addEventHandlers() {
    const sidebar = document.getElementById("user_navbar");
    sidebar.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.closest("ul").querySelectorAll("li").forEach(element => {
          element.classList.remove("bg-primary");
        });
        event.target.classList.add("bg-primary");

        const viewToBeRendered = this.links.find(item => item.label === event.target.innerText);
        viewToBeRendered.view.render();
      }
    })
  }

}
export default new UserHomePageView();
