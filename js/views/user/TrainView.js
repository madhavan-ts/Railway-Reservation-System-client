import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import { getDataAsJSON } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";

class TrainView extends View {
  parentElement;
  daysMap = {
    1: "MO",
    2: "TU",
    3: "WE",
    4: "TH",
    5: "FR",
    6: "SA",
    7: "SU",
  };
  data;
  constructor() { super(); }



  render(data) {

    this.data = data;
    console.log();
    this.parentElement = document.querySelector("#train__details");
    this.parentElement.innerHTML = "";
    this.parentElement.innerHTML = this.getMarkup(data);
    const self = this;
    document
      .querySelector("#train__details")
      .addEventListener("click", function (event) {
        const classElement = event.target.closest("[data-class]");
        const trainElement = event.target.closest("[data-train-no]");
        let selectedTrain = {
          tripID: trainElement.getAttribute("data-trip-id"),
          trainID: trainElement.getAttribute("data-train-id"),
          routeID: trainElement.getAttribute("data-route-id"),
          trainName: trainElement.getAttribute("data-train-name"),
          routeName: trainElement.getAttribute("data-route-name"),

          trainNumber: trainElement.getAttribute("data-train-no"),
          routeNumber: trainElement.getAttribute("data-route-no"),
          departureTime: trainElement.getAttribute("data-departure-time"),
          arrivalTime: trainElement.getAttribute("data-arrival-time"),
          duration: trainElement.getAttribute("data-duration"),
          dateOfJourney: state.search.dateOfJourney,
          fromStation: trainElement.getAttribute("data-from-station-name"),
          fromStationID: trainElement.getAttribute("data-from-station-id"),
          toStation: trainElement.getAttribute("data-to-station-name"),
          toStationID: trainElement.getAttribute("data-to-station-id"),
          // className: classElement.getAttribute("data-class"),
          // ticketPrice: classElement.getAttribute("data-price")
        };
        state.selectedTrain = { ...selectedTrain };
        // console.log(selectedTrain);
        if (event.target.matches(".check-btn")) {
          selectedTrain = {
            ...selectedTrain,
            className: classElement.getAttribute("data-class"),
            ticketPrice: classElement.getAttribute("data-price"),
          };
          console.log("Check Status");

          console.log(selectedTrain);
          state.selectedTrain = { ...selectedTrain };
          console.log("stateVariable", state.selectedTrain);
          getSeatAvailability(selectedTrain);
        } else if (event.target.matches(".book-btn")) {
          selectedTrain = {
            ...selectedTrain,
            className: classElement.getAttribute("data-class"),
            ticketPrice: classElement.getAttribute("data-price"),
          };
          state.selectedTrain = { ...selectedTrain };
          console.log("state Variable", state.selectedTrain);
          // BookingView.render();
          router.navigateTo("/book-ticket");

        }
      });

    const getSeatAvailability = async function (data) {
      const {
        trainID,
        tripID,
        className,
        dateOfJourney
      } = { ...data };

      const jsonResponse = await getDataAsJSON(
        `${BASE_URL}/api/train/check-availability?trainID=${trainID}&tripID=${tripID}&dateOfJourney=${dateOfJourney}&className=${className}`
      );
      if (jsonResponse.success) {
        if (jsonResponse.available) {
          self.renderToast(`Seats are available - No Of Seats are : ${jsonResponse.seatCount}`, true);
        } else {
          self.renderToast(`Seats are not available - Waiting List No : ${jsonResponse.waitinglist}`, true);
        }
      } else {
        self.renderToast(`${jsonResponse.message}`, false);
      }
      console.log(jsonResponse);
      // return data;
    };
  }

  getMarkup(trains) {
    return `
      <ul class="train__card p-0">
      ${trains
        .map((item) => {
          return `
        <li 
        data-departure-time="${item.departureTime}"
        data-trip-id="${item.tripID}"
        data-train-id="${item.trainID}"
        data-train-no="${item.trainNo}" 
        data-train-name="${item.trainName}" 
        data-route-id="${item.routeID}"
        data-route-no="${item.routeNo}" 
        data-route-name="${item.routeName}"
        data-from-station-id="${item.fromStationID}"
        data-to-station-id="${item.toStationID}" 
        data-from-station-name="${item.fromStation}" 
        data-to-station-name="${item.toStation}" 
        data-duration="${item.duration}" 
        data-arrival-time="${item.arrivalTime}" 
        class="card mb-2">
          <div class="card-header d-flex justify-content-between flex-wrap row-col-auto">
            <div class="train__card__item-name">${item.trainName} (${item.trainNo
            })</div>
            <div class="train__card__item-run-days">${item.days
              .map((item) => {
                return this.daysMap[item];
              })
              .join("-")}</div >
          </div >
          <div class="card-body">
            <div class="row ">
              <div class="d-flex flex-column align-items-center  col-md-4">
                <span>${item.departureTime}</span >
                <span>${item.fromStation} (${item.fromStationID})</span>
              </div >
              <div class="d-flex flex-column align-items-center col-md-4">
                <span>--- ${item.duration} ---</span>
              </div>
              <div class="d-flex flex-column align-items-center col-md-4">
                <span>${item.arrivalTime}</span>
                <span>${item.toStation} (${item.toStationID})</span>
              </div>
            </div >
            <div class="d-flex gap-3 flex-grow-1 overflow-x-auto py-2">
              ${item.classes
              .map(
                (trainClass) =>
                  `<div data-class="${trainClass.className}" data-price="${trainClass.ticketPrice}" class="card train__card__item-class-card">
                <div class="card-header text-center">${trainClass.className}</div>
                  <div class="card-body d-flex flex-column gap-1">
                    <div class="fw-bolder align-self-center">&#8377;&nbsp;${trainClass.ticketPrice}</div>
                    <button class="book-btn btn btn-primary p-1">Book</button>
                    <button class="check-btn btn btn-secondary p-1">Check</button>
                  </div>
                </div>`
              )
              .join("")}
            </div>
          </div>
        </li >
      `;
        })
        .join("")}
      </ul>
    `;
  }

  getDaysString(dayNumbers) {
    dayNumbers.sort
      .map((item) => {
        return this.daysMap[item];
      })
      .join("-");
  }
}

export default new TrainView();
