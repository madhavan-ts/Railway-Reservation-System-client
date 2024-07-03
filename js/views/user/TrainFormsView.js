import { BASE_URL } from "../../config.js";
import { loadStations, state } from "../../models.js";
import View from "../View.js";
import TrainView from "./TrainView.js";

class TrainFormsView extends View {
  parentElement;

  constructor() {
    super();
  }

  async render() {
    document.title = "Search Trains";
    this.renderSpinner();
    await loadStations();
    this.parentElement = document.querySelector(".user__content");
    this.renderPage(state.stations);
    this.hideSpinner();
  }

  renderPage(stations) {
    this.parentElement.innerHTML = this.getMarkup();
    const form = document.getElementById("train-search-form");

    // for DropDown Functionalities
    const formFields = form.querySelectorAll("[data-form-field]");
    formFields.forEach((item) => {
      // adding the event listener to listen to the form field input event
      item.addEventListener("input", function () {
        let typedString = item.value;

        let targetName = item.getAttribute("name");

        // filtering the station list and re-render the data based on the station name
        let newStations = stations.filter((item) =>
          item.stationName.toLowerCase().includes(typedString.toLowerCase())
        );
        // console.log(newStations);
        let targetDropDown = document.querySelector(
          `[data-dropdown="${targetName}"]`
        );

        // render the new station name in the dropdown.
        targetDropDown.innerHTML = `
        <ul class="stations-list">
        ${newStations
            .map((item) => {
              return `<li data-station-code='${item.stationID}' class="stations-item">${item.stationName} - (${item.stationID})</li>`;
            })
            .join("")} </ul>`;
        targetDropDown.classList.remove("hidden");
      });

      // for making the focus out event listeneer. Disappear when the form element looses focus
      item.addEventListener("focusout", function () {
        if (item.value === "") {
          let targetName = item.getAttribute("name");
          let targetDropDown = document.querySelector(
            `[data-dropdown="${targetName}"]`
          );
          targetDropDown.classList.add("hidden");
        }
      });
    });

    // let dropDowns = document.querySelectorAll(`[data-dropdown]`);
    const stationDropdown = document.querySelectorAll("[data-dropdown]");

    stationDropdown.forEach((item) => {
      item.addEventListener("click", function (event) {
        let value = event.target.getAttribute("data-station-code");
        let name = event.target.innerText;
        let tragetFieldName = item.getAttribute("data-dropdown");
        let targetField = document.querySelector(
          `[data-form-field="${tragetFieldName}"]`
        );
        targetField.value = name;
        targetField.setAttribute("data-value", value);
        // console.log(targetField.getAttribute("data-value"));
        item.classList.add("hidden");
      });
    });

    // make the submit functionality work
    document
      .getElementById("train-search-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        // console.log(this);
        let form = document.getElementById("train-search-form");
        let sourceElement = form.querySelector("#source");
        let destinationElement = form.querySelector("#destination");
        let dateOfJourneyElement = form.querySelector("#dateOfJourney");
        // console.log(sourceElement, destinationElement, dateOfJourneyElement);
        state.search.source = sourceElement.getAttribute("data-value");
        state.search.sourceStationName = sourceElement.value;
        state.search.destination =
          destinationElement.getAttribute("data-value");
        state.search.destinationStationName = destinationElement.value;
        state.search.dateOfJourney = dateOfJourneyElement.value;

        //validation for the field with empty values
        if (
          sourceElement === null ||
          destinationElement === null ||
          dateOfJourneyElement === null ||
          sourceElement === undefined ||
          destinationElement === undefined ||
          dateOfJourneyElement === undefined ||
          destinationElement.getAttribute("data-value") === null ||
          sourceElement.getAttribute("data-value") === null
        ) {
          this.renderToast("Please select any one of the stations");
          return;
        }

        try {
          const response = await fetch(
            `${BASE_URL}/api/train/search?source=${state.search.source}&destination=${state.search.destination}&dateOfJourney=${state.search.dateOfJourney}`
          );
          const data = await response.json();
          // console.log(response);
          // console.log(data);
          if (data.success) {
            TrainView.render(data.data);
          } else {
            this.renderToast(data.message);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      });
  }

  getMarkup() {
    return `
    <div class="col-md-10 w-100">
    <div>
      <form class="d-flex flex-column gap-3"  id="train-search-form">
      <div class="row g-3">
        <div class="col-sm-4">
          <div class="form-floating">
            <input
              data-form-field="source"
              class="form-control"
              type="text"
              required
              id="source"
              name="source"
              placeholder="source"
            />
            <label for="source" >Source</label>
            <div data-dropdown="source" class="stations hidden"></div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-floating">
            <input
              data-form-field="destination"
              type="text"
              class="form-control"
              id="destination"
              name="destination"
              placeholder="destination"
              required
            />
            <label for="destination">Destination</label>
            <div data-dropdown="destination" class="stations hidden"></div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-floating">
            <input
              type="date"
              required
              class="form-control"
              name="dateOfJourney"
              id="dateOfJourney"
              required
              min=${new Date().toISOString().split('T')[0]}
            />
            <label for="dateOfJourney">Date of Journey</label>
          </div>
        </div>
      </div> 
      <div class="row">
      <div col="col-sm-12">
      <button type="submit" class="btn btn-primary w-100">Search</button>
      </div>
      </div>
      </form>
    </div>
    <div id="train__details" class="train__details"></div>
    `;
  }
}

export default new TrainFormsView();
