import { BASE_URL } from "../../config.js";
import { getDataAsJSON, state } from "../../models.js";
import router from "../../router.js";
import View from "../View.js";

class CancelTicketView extends View {
  parentElement;
  constructor() { super(); }

  async render() {
    this.parentElement = document.querySelector(".user__content");
    let result = await getDataAsJSON(`${BASE_URL}/api/train/get-booking-info?username=${state.userDetails.username}`);
    console.log(result);
    if (result.success) {
      this.parentElement.innerHTML = this.getHTML(result.tickets);
      this.addEventHandlers();
    } else {
      this.renderToast(result.message, false);
      router.navigateTo("/user-home");
    }
  }

  getHTML(details) {
    return `
      <div class="row w-100 m-0">
        <div class="col-md-8 my-3 mx-auto p-4 p-md-0">
          <h2 class="h2">Cancel Ticket</h2>
          <div class="my-3 d-flex flex-column gap-3" id="passenger__details">
            ${details.map(detail => this.renderPNRDetails(detail)).join("")}
          </div>
          <div class="modal fade" id="cancel-modal" tab-index="-1" aria-labelledby="cancel-modal" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Cancel Ticket</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="cancel-form">
                    <div id="passenger-list"></div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }

  renderPNRDetails(pnrDetails) {
    const { trainNo, trainName, className, departureTime, dateOfJourney, fromStationID, fromStation, toStationID, toStation, passengers, pnrNo } = pnrDetails;
    return `
    <div class="pnr_details" data-tripID="${pnrDetails.tripID}">
      <div class="d-flex flex-column align-items-center">
        <span class="d-flex justify-content-space-between gap-3">
          <span class="fs-5 fw-bold">
            ${trainNo} - ${trainName}
          </span>
          <button class="btn btn-danger text-uppercase p-1" data-bs-toggle="modal" data-bs-target="#cancel-modal" data-details='${JSON.stringify(pnrDetails)}'>Cancel</button>
        </span>
        <span>Date Of Journey - ${new Date(dateOfJourney).toLocaleDateString({ weekday: 'short', dateStyle: "medium" })}</span>
        <span>Departure time : ${departureTime}</span>
        <div class="d-flex flex-column flex-md-row gap-md-3 align-items-center">
          <span class="fs-6">${fromStation} (${fromStationID})</span>
            <span>-</span>
          <span class="fs-6">${toStation} (${toStationID})</span> 
        </div>
        <span> CLASS : ${className}</span>
        <span> PNR No : ${pnrNo}</span>
      </div>
      <div class="d-flex flex-column gap-3">
        ${passengers.map((item) => this.getPassengerCard(item)).join("")}
      </div>
    </div>`;
  }

  getPassengerCard(passengerDetails) {
    const { passengerName, passengerAge, passengerGender, ticketStatus, ticketID } = passengerDetails;
    return `<div class="card" ${!ticketStatus.includes("WL") ? `data-confirmed-id="${ticketID}"` : `data-waiting-id="${ticketID}"`}>
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Passenger Details</span>
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
          <span class="${!ticketStatus.includes("WL") ? "text-success" : "text-danger"}">${!ticketStatus.includes("WL") ? "CONFIRMED" : "WAITING-LIST"}</span>
        </div>
        
        ${!ticketStatus.includes("WL") ? `
          <div class="d-flex gap-2 justify-content-between">
            <span>Seat No : </span>
            <span>${ticketStatus.split("-")[0]}</span>
          </div>
          <div class="d-flex gap-2 justify-content-between">
            <span>Compartment No : </span>
            <span>${ticketStatus.split("-")[1]}</span>
          </div>
          ` : `<div class="d-flex gap-2 justify-content-between">
                <span>Waiting List No : </span>
                <span>${ticketStatus}</span>
              </div>`
      }
    </div >
    </div > `
  }

  addEventHandlers() {
    document.getElementById("passenger__details").addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON" && event.target.dataset.bsToggle === "modal") {
        const details = JSON.parse(event.target.dataset.details);
        const passengerList = document.getElementById("passenger-list");
        passengerList.innerHTML = this.renderPassengerCheckboxes(details.passengers);
        document.getElementById("cancel-form").dataset.details = JSON.stringify(details);
      }
    });

    document.getElementById("cancel-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const details = JSON.parse(event.target.dataset.details);
      const confirmedTickets = [];
      const waitingListTickets = [];

      document.querySelectorAll("#passenger-list input:checked").forEach((checkbox) => {
        const ticketID = parseInt(checkbox.dataset.ticketId);
        if (checkbox.dataset.status === "CONFIRMED") {
          confirmedTickets.push(ticketID);
        } else {
          waitingListTickets.push(ticketID);
        }
      });

      const data = {
        tripID: details.tripID,
        className: details.className,
        dateOfJourney: details.dateOfJourney,
        confirmedTickets,
        waitingListTickets,
      };

      console.log(data);

      try {
        const response = await fetch(`${BASE_URL}/api/train/cancel-multiple`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const modalElement = document.querySelector("#cancel-modal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        console.log(response);
        const result = await response.json();
        console.log(result);
        if (result.success) {
          this.renderToast(result.message, true);
          router.navigateTo("/user-home");
        } else {
          this.renderToast(result.message, false);
        }
      } catch (error) {
        console.error(error);
        const modalElement = document.querySelector("#cancel-modal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.renderToast("An error occurred. Please try again.", false);
      }
    });
  }

  renderPassengerCheckboxes(passengers) {
    return passengers.map((passenger) => {
      const { passengerName, ticketID, ticketStatus } = passenger;
      const status = ticketStatus.includes("WL") ? "WAITING-LIST" : "CONFIRMED";
      return `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" data-ticket-id="${ticketID}" data-status="${status}" id="passenger-${ticketID}">
          <label class="form-check-label" for="passenger-${ticketID}">
            ${passengerName} (${status})
          </label>
        </div>
      `;
    }).join("");
  }
}

export default new CancelTicketView();
