import { BASE_URL } from "../../config.js";
import Handlebars from "../../helpers.js";
import { getDataAsJSON, getHandlebar, state } from "../../models.js";
import View from "../View.js";

class BookingDetails extends View {
  parentElement;
  constructor() {
    super();
  }

  render(bookingDetails, pnr) {
    this.parentElement = document.querySelector(".container-fluid");
    this.parentElement.innerHTML = this.getHTML();
    this.renderBookingDetails(bookingDetails, pnr)

    // this.addEventHandlers();
  }

  getHTML() {
    return `
    <a href="/user-home">&larr; &nbsp; Back to Home</a>
    <div class="row w-100 m-0 mb-3 flex-column d-flex align-items-center justify-content-center text-center p-3">
      <div class="w-100 my-3">
        <i class="fa-solid fa-circle-check" style="font-size: 5rem;"></i>
      </div>
      <span class="fs-2">Booking Successful</span>
    </div>
    <div id="passenger-details" class="my-3 d-flex flex-column gap-3 p-3"></div>
    `
  }

  renderBookingDetails(details, pnr) {
    let passengerDetailsContainerElement = document.getElementById("passenger-details")
     let template = Handlebars.templates["pnr-details.hbs"];
     passengerDetailsContainerElement.innerHTML = template({
      ...state.selectedTrain,
      trainNo: state.selectedTrain.trainNumber,
      startTime: state.selectedTrain.departureTime,
      fromStationName: state.selectedTrain.fromStation,
      toStationName: state.selectedTrain.toStation,
      status: details,
      pnr: pnr
    })

  }
}

export default new BookingDetails();