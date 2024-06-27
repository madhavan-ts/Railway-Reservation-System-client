import { state } from "../models.js";
import View from "./View.js";
import RouteHomeView from "./routes/RouteHomeView.js";
import StationsHomeView from "./stations/StationsHomeView.js";
import TrainHomeView from "./trains/TrainHomeView.js";
import TripsHomeView from "./trips/TripsHomeView.js";

class AdminHomePageView extends View {
  links = [
    { label: "Trains", view: TrainHomeView },
    { label: "Stations", view: StationsHomeView },
    { label: "Routes", view: RouteHomeView },
    { label: "Trips", view: TripsHomeView }
  ];
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
    // const sidebar = document.getElementById("sidebar");
    document.querySelector(`li[data-target="Trains"]`).classList.add("active");
    TrainHomeView.render();

  }

  getHTML() {
    return `
    <div class="row m-0 w-100">
      <nav id="sidebar" class="d-flex flex-shrink-0 p-1  text-bg-dark" >
      <ul class="nav nav-pills mb-auto gap-2">
        ${this.links.map(item => `<li data-target="${item.label}" class="nav-item nav-link text-light ">${item.label}</li>`).join("")}  
      </ul>
      </nav>
      <div class="admin__content p-4"></div>
    </div>`;
  }


  addEventHandlers() {
    const sidebar = document.getElementById("sidebar");
    sidebar.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.closest("ul").querySelectorAll("li").forEach(element => {
          element.classList.remove("active");
        });
        event.target.classList.add("active");

        const viewToBeRendered = this.links.find(item => item.label === event.target.innerText);
        viewToBeRendered.view.render();
      }
    })
  }

}
export default new AdminHomePageView();
