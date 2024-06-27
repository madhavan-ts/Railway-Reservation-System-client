import { BASE_URL } from "../../config.js";
import { getDataAsJSON } from "../../models.js";
import View from "../View.js";

class CheckPNRStatusView extends View {
  parentElement;
  constructor() {
    super();
  }

  render() {
    this.parentElement = document.querySelector(".user__content");
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
  }

  getHTML() {
    return `
      <div class="row w-100 m-0">
        <div class="col-md-8 my-3 mx-auto p-4 p-md-0">
          <h2 class="h2">Check PNR status</h2>
          <form id="check-pnr-form">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="PNR Number"
                name="pnrno"
                required
              />
              <label for="pnrno">PNR Number</label>
            </div>
            <button class="btn btn-primary text-uppercase fw-medium">
              Check
            </button>
          </form>
          <div class="my-3 d-flex flex-column gap-3" id="pnr_details"></div>
        </div>
      </div>
    `
  }

  renderPNRDetails(pnrDetails) {
    const { trainNo, trainName, className, startTime, dateOfJourney, fromStationID, fromStationName, toStationID, toStationName, status } = pnrDetails
    document.getElementById("pnr_details").innerHTML = "";
    document.getElementById("pnr_details").innerHTML = `
      <div class="d-flex flex-column align-items-center">
          <span class="fs-5 fw-bold">
            ${trainNo} - ${trainName}
          </span>
          <span>Date Of Journey - ${new Date(dateOfJourney).toLocaleDateString({ weekday: 'short', dateStyle: "medium" })}</span>
          <span>Departure time : ${startTime}</span>
          <div class="d-flex flex-column flex-md-row gap-md-3 align-items-center">
            <span class="fs-6">${fromStationName} (${fromStationID})</span>
              <span>-</span>
            <span class="fs-6">${toStationName} (${toStationID})</span> 
          </div>
          <span class="my-2"> CLASS : ${className}</span>
      </div>
      ${status.map((item) => this.getPassengerCard(item)).join("")}
    `
  }

  getPassengerCard(passengerDetails) {
    const { passengerName, passengerAge, passengerGender, ticketStatus, ticketID, seatNo, compartmentNo, waitingListNo } = passengerDetails;
    return `
    <div class="card" ${ticketStatus === "confirmed" ? `data-confirmed-id="${ticketID}"` : `data-waiting-id="${ticketID}"`} >
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
            <span>${compartmentNo}</span>
          </div>
          ` : `<div class="d-flex gap-2 justify-content-between">
                <span>Waiting List No : </span>
                <span>${waitingListNo}</span>
              </div>`
      }
    </div>
    </div>`
  }


  addEventHandlers() {
    const pnrForm = document.getElementById("check-pnr-form");
    pnrForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      document.getElementById("pnr_details").innerHTML = "";
      const formData = new FormData(pnrForm);

      try {
        const result = await getDataAsJSON(`${BASE_URL}/api/train/view-status?pnrNo=${formData.get("pnrno")}`)
        console.log(result);
        if (result.success === true) {
          if (result.status.length === 0) {
            this.renderAlert(pnrForm, "PNR Number doesn't exist ");
          } else {
            this.renderPNRDetails(result);
          }
        } else {
          this.renderAlert(pnrForm, "Couldn't fetch PNR Details");
        }
      } catch (err) {
        console.log(err);
      }
    })

  }

}

export default new CheckPNRStatusView();