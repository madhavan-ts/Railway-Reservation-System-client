import { BASE_URL } from "../../config.js";
import { getDataAsJSON, state } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";

class PrepareChartView extends View {
  parentElement;
  days = [
    { name: "SUN", value: 1 },
    { name: "MON", value: 2 },
    { name: "TUE", value: 3 },
    { name: "WED", value: 4 },
    { name: "THU", value: 5 },
    { name: "FRI", value: 6 },
    { name: "SAT", value: 7 },
  ];

  constructor() {
    super();
  }

  async render() {
    this.parentElement = document.querySelector(".admin__content");
    try {
      const response = await getDataAsJSON(`${BASE_URL}/api/admin/get-available-chart-prepare-trips`);
      // console.log(response);
      if (response.success) {
        this.parentElement.innerHTML = this.getHTML(response.tripIDs);
      } else {
        this.renderToast(response.message);
        router.navigateTo("/admin-home");
      }
    } catch (err) {
      console.log(err);
    }
    this.addEventHandler();
  }

  getHTML(trips) {
    return `
    <ul class="list-group">
      ${trips.map(item => {
        const { tripID, trainID, trainNo, trainName, routeNo, routeName, startTime, day } = state.trips.find(trip => trip.tripID === item);
      let dayNo = day;
      return `<li class="list-group-item" data-trip-id="${tripID}" data-train-id="${trainID}" >
        <div class="d-flex justify-content-between gap-2 align-items-center">
          <span class="">
            <b>${trainName} (${trainNo})</b> via <b>${routeNo} - ${routeName}</b> on ${this.days.find((day) => day.value === dayNo).name} at ${startTime}
          </span>
          <div class="d-flex gap-2">
            <button class="btn btn-primary py-1 px-2 edit-trip-btn" data-train-id="${trainID}" data-day-no="${day}" data-trip-id="${tripID}">Prepare Chart</button>
            
          </div>
        </div>
      </li>`;
    }
    ).join("")}
      </ul>`
  }
  addEventHandler() {
    document.querySelector(".list-group").addEventListener("click", async (event) => {
      console.log(event);
      if (event.target.tagName === "BUTTON") {
        let listItem = event.target.closest("li.list-group-item");
        let trainID = listItem.getAttribute("data-train-id");
        let tripID = listItem.getAttribute("data-trip-id");
        let requestdata = {
          trainID: parseInt(trainID),
          tripID: parseInt(tripID)
        }
        console.log(requestdata);
        try {
          const response = await fetch(`${BASE_URL}/api/admin/prepare-chart`, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json",
              'Accept': 'application/json'
            }),
            body: JSON.stringify(requestdata)
          });
          const data = await response.json();
          // console.log(data);
          if (data.success) {
            this.renderToast("Chart Prepared Successfully", true);
          } else {
            this.renderToast(data.message);
          }
        } catch (error) {
          console.log(error);
          this.renderToast(error);
        }
      }
    })

  }

}

export default new PrepareChartView();