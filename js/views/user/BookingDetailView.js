import { BASE_URL } from "../../config.js";
import { getDataAsJSON, state } from "../../models.js";
import View from "../View.js";

class BookingDetails extends View {
  parentElement;
  constructor() {
    super();
  }

  render(bookingDetails) {
    this.parentElement = document.querySelector(".container-fluid");
    this.parentElement.innerHTML = this.getHTML();
    this.renderBookingDetails(bookingDetails)

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
      <div id="passenger-details">
      </div>
    `
  }

  renderBookingDetails(details) {
    const { trainNumber, trainName, className, departureTime, dateOfJourney, fromStationID, fromStation, toStationID, toStation, pnr } = state.selectedTrain;

    // const details = [...booking]
    let passengerDetailsContainerElement = document.getElementById("passenger-details")
    passengerDetailsContainerElement.innerHTML = "";
    passengerDetailsContainerElement.innerHTML = `
      <div class="d-flex flex-column align-items-center">
          <span class="fs-5 fw-bold">
            ${trainNumber} - ${trainName}
          </span>
          <span>Date Of Journey - ${new Date(dateOfJourney).toLocaleDateString({ weekday: 'short', dateStyle: "medium" })}</span>
          <span>Departure time : ${departureTime}</span>
          <div class="d-flex flex-column flex-md-row gap-md-3 align-items-center">
            <span class="fs-6">${fromStation} (${fromStationID})</span>
              <span>-</span>
            <span class="fs-6">${toStation} (${toStationID})</span> 
          </div>
          <span> CLASS : ${className}</span>
          <span> PNR No : ${pnr}</span>
      </div>
      <div class="p-2">
        ${details.map((item) => this.getPassengerCard(item)).join("")}
      </div>
    `
  }

  getPassengerCard(passengerDetails) {
    const { passengerName, passengerAge, passengerGender, ticketStatus, ticketID, seatNo, compartmentNo, waitingListNo } = passengerDetails;
    return `
    <div class="card mb-3" ${ticketStatus === "confirmed" ? `data-confirmed-id="${ticketID}"` : `data-waiting-id="${ticketID}"`} >
      <div class="card-header d-flex justify-content-between">
        Passenger Details
      </div>
      <div class="card-body">
      <div class="d-flex gap-2 justify-content-between">
          <span>Name : </span>
          <span>${passengerName}</span>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <span>Gender : </span>
          <span>${passengerGender}</span>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <span>Age : </span>
          <span>${passengerAge}</span>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <span>Status : </span>
          <span class="${ticketStatus === "confirmed" ? "text-success" : "text-danger"}">${ticketStatus.toUpperCase()}</span>
        </div>
        
      
        ${ticketStatus === "confirmed" ? `
          <div class="d-flex gap-2 justify-content-between">
            <span>Seat No : </span>
            <span>${seatNo}</span>
          </div>
          <div class="d-flex gap-2 justify-content-between">
            <span>Compartment No : </span>
            <span>${compartmentNo}</span>>
          </div>
          ` : `<div class="d-flex gap-2 justify-content-between">
                <span>Waiting List No : </span>
                <span>${waitingListNo}</span>
              </div>`
      }
    </div>
    </div>`
  }

}

export default new BookingDetails();