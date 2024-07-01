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
            ${details.map(detail => this.renderPNRDetails(detail)
    ).join("")}
          </div>
        </div >
      </div >
  `
  }

  renderPNRDetails(pnrDetails) {
    const { trainNo, trainName, className, departureTime, dateOfJourney, fromStationID, fromStation, toStationID, toStation, passengers, pnrNo } = pnrDetails
    return `
    <div class="pnr_details">
    <div class="d-flex flex-column align-items-center">
          <span class="fs-5 fw-bold">
            ${trainNo} - ${trainName}
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
      <div>
        ${passengers.map((item) => this.getPassengerCard(item)).join("")}
      </div>
      </div>`;
  }

  getPassengerCard(passengerDetails) {
    const { passengerName, passengerAge, passengerGender, ticketStatus, ticketID } = passengerDetails;
    return `<div class="card" ${!ticketStatus.includes("WL") ? `data-confirmed-id="${ticketID}"` : `data-waiting-id="${ticketID}"`}>
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Passenger Details</span>
        <button class="btn btn-danger text-uppercase">Cancel</button>
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
    document.getElementById("passenger__details").addEventListener("click", async (event) => {
      console.log(event);
      if (event.target.tagName === "BUTTON") {
        console.log("cancel button clicked");
        this.renderSpinner();
        let ticketID;
        let url;
        if (event.target.closest(".card[data-confirmed-id]")) {
          ticketID = event.target.closest(".card").getAttribute("data-confirmed-id");
          url = `${BASE_URL}/api/train/cancel`;
        } else {
          ticketID = event.target.closest(".card").getAttribute("data-waiting-id");
          url = `${BASE_URL}/api/train/cancel-waiting`;
        }
        try {
          const response = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({ ticketID: ticketID }),
          });
          const data = await response.json();
          console.log(data);
          this.hideSpinner();
          if (data.success) {
            this.renderToast(data.message, true);
            let pnrContainer = event.target.closest(".pnr_details");
            event.target.closest(".card").remove();
            if (pnrContainer.querySelectorAll(".card").length == 0) {
              pnrContainer.remove();
            }
          }
          else
            this.renderToast(data.message);
        } catch (err) {
          console.log(err);
          this.hideSpinner();
        }
      }
      // event.target.closest()
    })
  }


}



export default new CancelTicketView();