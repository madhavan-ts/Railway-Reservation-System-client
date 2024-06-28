import AdminLogoutView from "./AdminLogoutView.js";
import PrepareChartView from "./PrepareChartView.js";
import View from "../View.js";
import RouteHomeView from "./RouteHomeView.js";
import StationsHomeView from "./StationsHomeView.js";
import TrainHomeView from "./TrainHomeView.js";
import TripsHomeView from "./TripsHomeView.js";
import { state } from "../../models.js";
import router from "../../router.js";
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
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
    // const sidebar = document.getElementById("sidebar");
    document.querySelector(`#admin_navbar li[data-target="Trains"]`).classList.add("bg-primary");
    TrainHomeView.render();

  }
  getHTML() {
    return `
    <div class="row m-0 w-100">

      <nav id="admin_navbar" class="navbar navbar-expand-md  text-light bg-dark">
        <div class="container-fluid p-2">
          <button class="navbar-toggler p-2 text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavBarToggle" aria-controls="adminNavBarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-light "></span>
          </button>
          <div class="collapse navbar-collapse" id="adminNavBarToggle">
            <ul class="navbar-nav me-auto mt-2 mb-2 mb-lg-0 gap-2">
            ${this.links.map(item => `<li data-target="${item.label}" class="nav-item nav-link text-light rounded px-2 mx-2">
              ${item.label}
            </li>`).join("")}
            </ul>
          </div>
        </div>
      </nav>
      <div class="admin__content p-4"></div>
    </div>`;
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
