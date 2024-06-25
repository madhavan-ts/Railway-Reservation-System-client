import { state } from "../models.js";
import View from "./View.js";
import RouteHomeView from "./routes/RouteHomeView.js";
import StationsHomeView from "./stations/StationsHomeView.js";
import TrainHomeView from "./trains/TrainHomeView.js";
import TripsHomeVIew from "./trips/TripsHomeView.js";

class AdminHomePageView extends View {
  links = [
    { label: "Trains", view: TrainHomeView },
    { label: "Stations", view: StationsHomeView },
    { label: "Routes", view: RouteHomeView },
    { label: "Trips", view: TripsHomeVIew }
  ];
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    this.parentElement.insertAdjacentHTML("afterbegin", this.getHTML());
    this.addEventHandlers();
    // console.log(this.links);

  }

  getHTML() {
    return `
    <div class="row">
      <div id="sidebar" class="d-flex flex-shrink-0 p-1  text-bg-dark sidebar" >
      <ul class="nav nav-pills mb-auto gap-2">
        ${this.links.map(item => `<li data-target="${item.label}" class="nav-item nav-link text-light ">${item.label}</li>`).join("")}  
      </ul>
      </div>
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
        // console.log(viewToBeRendered.view);
        viewToBeRendered.view.render();
      }
    })
  }

}
export default new AdminHomePageView();
