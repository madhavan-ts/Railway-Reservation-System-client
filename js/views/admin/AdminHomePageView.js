import AdminLogoutView from "./AdminLogoutView.js";
import PrepareChartView from "./PrepareChartView.js";
import View from "../View.js";
import RouteHomeView from "./RouteHomeView.js";
import StationsHomeView from "./StationsHomeView.js";
import TrainHomeView from "./TrainHomeView.js";
import TripsHomeView from "./TripsHomeView.js";
import { getHandlebar, state } from "../../models.js";
import router from "../../router.js";
import Handlebars from "../../helpers.js";
// import AdminProfileView from "./AdminProfileView.js";

class AdminHomePageView extends View {
  links = [
    { label: "Trains", view: TrainHomeView },
    { label: "Stations", view: StationsHomeView },
    { label: "Routes", view: RouteHomeView },
    { label: "Trips", view: TripsHomeView },
    { label: "Prepare Chart", view: PrepareChartView },
    { label: "Logout", view: AdminLogoutView },
    // { label: "Profile", view: AdminProfileView },
  ];
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    if (state.isAdminLoggedIn === false) {
      this.renderToast("Not Logged in",);
      router.redirectTo("/admin-login");
      return;
    } 
    let template = Handlebars.templates["navbar.hbs"];
    this.parentElement.innerHTML = template({ type: "admin", links: this.links });
    this.addEventHandlers();
    // const sidebar = document.getElementById("sidebar");
    document.querySelector(`#admin_navbar li[data-target="Trains"]`).classList.add("bg-primary");
    TrainHomeView.render();

  }



  addEventHandlers() {
    const sidebar = document.getElementById("admin_navbar");
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
export default new AdminHomePageView();
