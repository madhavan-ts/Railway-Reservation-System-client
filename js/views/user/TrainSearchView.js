import { state } from "../../models.js";
import View from "../View.js";

class TrainSearchView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    this.parentElement.innerHTML = this.getHTML(state.stations);
  }

  getHTML(stations) {
    return `
      <div class="p-2 bg-background-primary">
      <header class="w-100">
      <form id="train-search-form">

        <div class="row g-3">
          <div class="col-sm-4">
            <div class="form-floating mb-3">
              <input id="sourceStation" placeholder="Source Station" class="form-control" name="sourceStation" required />
              <label for="sourceStation" >Source</label>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-floating mb-3">
              <input id="destinationStation" placeholder="Destination Station" class="form-control" name="destinationStation" required />
              <label for="destinationStation" >Destination</label>
              <ul class="dropdown-menu">
                ${stations.map(station => { return `<li data-station-code="${station.stationID}" class="dropdown-item">${station.stationName}</li>` }).join("")}
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-floating mb-3">
              <input type="date" id="dateOfJourney" placeholder="Date of Journey" class="form-control" name="dateOfJourney" required />
              <label for="dateOfJourney" >Date of Journey</label>
            </div>
          </div>
        </div>
      </form>
      </header>
      </div>
    `
  }
}
export default new TrainSearchView();