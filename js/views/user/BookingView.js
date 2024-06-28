import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import View from "../View.js";
import BookingDetailView from "./BookingDetailView.js";

class BookingView extends View {
  parentElement;
  preferences;
  constructor() { super(); }

  render() {
    this.parentElement = document.querySelector(".container-fluid");
    this.parentElement.innerHTML = this.getHTML(state.selectedTrain);
    this.preferences = this.getPreferences(state.selectedTrain.className);
    const addBtn = document.getElementById("add-passenger");

    const bookingForm = document.getElementById("booking__form");
    const self = this;
    bookingForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const passengerDetailsList = [];
      for (let index = 0; index < 5; index++) {
        if (document.getElementById(`passengerName[${index}]`) === null) continue;
        let map = {
          passengerName: document.getElementById(`passengerName[${index}]`).value,
          gender: document.getElementById(`passengerGender[${index}]`).value,
          preference: document.getElementById(`passengerPreference[${index}]`).value,
          age: document.getElementById(`passengerAge[${index}]`).value
        }
        passengerDetailsList.push(map);
      }
      console.log(passengerDetailsList);

      let submittedDetails = {
        username: state.userDetails.username,
        tripID: parseInt(state.selectedTrain.tripID),
        trainID: parseInt(state.selectedTrain.trainID),
        routeID: parseInt(state.selectedTrain.routeID),
        trainNumber: state.selectedTrain.trainNumber,
        routeNumber: state.selectedTrain.routeNumber,
        departureTime: state.selectedTrain.departureTime,
        className: state.selectedTrain.className,
        dateOfJourney: state.search.dateOfJourney,
        fromStationID: state.selectedTrain.fromStationID,
        toStationID: state.selectedTrain.toStationID,
        passengers: [...passengerDetailsList]
      };
      console.log(submittedDetails);

      try {
        self.renderSpinner();
        const response = await fetch(`${BASE_URL}/api/train/book`, {
          method: "POST",
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
          }),
          body: JSON.stringify(submittedDetails)
        })

        const result = await response.json();
        self.hideSpinner();
        // if(result.success){
        console.log(result);
        // }
        BookingDetailView.render([...result.booked, ...result.waitingList], result.pnr);

      } catch (error) {
        console.log(error);
      }
    })


    const addPassenger = (i) => {
      let passengerButton = document.getElementById("add-passenger");
      let passengerDetailsElement = document.createElement("div");
      passengerDetailsElement.classList.add("row", "m-0", "w-100", "gap-2", "mb-2");
      passengerDetailsElement.innerHTML = `
          <p class="fs-4 mb-0">Passenger Details<button type="button" class="delete-btn btn btn-danger mx-3">
            <i class="fa-solid fa-trash"></i>
          </button></p>
          <div class="col-md-3 p-0">

            <div class="form-floating" >
              <input
                placeholder="Passenger Name"
                class="form-control"
                type="text"
                id="passengerName[${i}]"
                name="passengerName[${i}]"
                required
              />
              <label for="passengerName[${i}]">Passenger Name</label>
            </div >
          </div >
          <div class="col-md-2 p-0">

            <div class="form-floating">
              <input
                placeholder="Passenger Age"
                class="form-control"
                type="number"
                min="1"
                max="100"
                id="passengerAge[${i}]"
                name="passengerAge[${i}]"
                required
              />
            <label for="passengerAge[${i}]">Passenger Age</label>
            </div>
          </div>
          <div class="col-md-3 p-0">

            <div class="form-floating">
              <select
                class="form-select"
                type="text"
                id="passengerGender[${i}]"
                name="passengerGender[${i}]"
                required
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
              <label for="passengerGender[${i}]">Gender</label>
            </div>
          </div>
          <div class="col-md-3 p-0">

            <div class="form-floating">
              <select
              class="form-select"
                type="text"
                id="passengerPreference[${i}]"
                name="passengerPreference[${i}]"
                required
              >
                ${this.preferences.map((item) => `<option value="${item}">${item}</option>`).join("")}
              </select>

              <label for="passengerPreference[${i}]">Perference</label>
            </div>
          </div>
          
          `
      passengerButton.insertAdjacentElement("beforebegin", passengerDetailsElement
      );
      // </div>
      const deleteBtn = passengerDetailsElement.querySelector(".delete-btn.btn.btn-danger");
      deleteBtn.addEventListener("click", function (event) {
        if (noOfElement > 0) {
          event.target.closest(".row.w-100.gap-2").remove();
          noOfElement--;
        }
        console.log(noOfElement);
      });

    }

    let noOfElement = 1;
    addBtn.addEventListener("click", function (event) {
      if (noOfElement >= 5) {
        alert("Limit Reached");
        return;
      }
      addPassenger(noOfElement);
      noOfElement++;
      console.log(noOfElement);
    });

    document.querySelector("[type='submit']");
  }



  getPreferences = function (className) {
    const map = {
      "SLEEPER (SL)": ["NO PREFERENCE", "LOWER", "MIDDLE", "UPPER"],
      "AC FIRST CLASS (1A)": ["NO PREFERENCE", "LOWER", "UPPER"],
      "AC 2 TIER (2A)": ["NO PREFERENCE", "LOWER", "UPPER"],
      "AC 3 TIER (3A)": ["NO PREFERENCE", "LOWER", "MIDDLE", "UPPER"],
      "FIRST CLASS (FC)": ["NO PREFERENCE", "LOWER", "MIDDLE", "UPPER"],
      "SECOND SITTING (2S)": ["NO PREFERENCE", "WINDOW", "MIDDLE", "ASILE"]
    }
    return map[className];
  }
  getHTML(trainDetails) {
    return `<div class= "booking p-3">
      <a href="/user-home">&larr;&nbsp;Back</a>
        <div class="booking__details d-flex flex-column align-items-center">
          <h2 class="booking__details">Train Details</h2>
          <p class="mb-0">
            Train Name:
            <span>
              ${trainDetails.trainName} (${trainDetails.trainNumber})</span
            >
          </p>
          <p class="mb-0">${trainDetails.fromStation} (${trainDetails.fromStationID}) - ${trainDetails.toStation} (${trainDetails.toStationID})</p>
          <p class="mb-0">CLASS NAME (${trainDetails.className})</p>
          <p class="mb-0">$ ${trainDetails.ticketPrice}</p>
          <p class="mb-0">DEPARTURE TIME : (${trainDetails.departureTime})</p>
          <p class="mb-0">DURATION : (${trainDetails.duration})</p>
          <p class="mb-0">ARRIVAL TIME : (${trainDetails.arrivalTime})</p>
        </div>
        <form id="booking__form" class="booking__form">
          <div class="row m-0 w-100 gap-2 mb-3">
          <p class="fs-4 mb-0">Passenger Details</p>
            <div class="col-md-3 p-0 ">
            <div class="form-floating">
              
              <input
              placeholder="Passeenger Age"
                class="form-control"
                type="text"
                id="passengerName[0]"
                name="passengerName[0]"
                required
              />
              <label for="passengerName[0]">Passenger Name</label>
            </div>
            </div>
            <div class="col-md-2 p-0">

            <div class="form-floating">
              
              <input
                placeholder="Passenger Age"
                class="form-control"
                type="number"
                min="1"
                max="100"
                id="passengerAge[0]"
                name="passengerAge[0]"
                required
              />
              <label for="passengerAge[0]">Passenger Age</label>
            </div>
            </div>
            <div class="col-md-3 p-0">

            <div class="form-floating">
              <select
                class="form-select"
                type="text"
                id="passengerGender[0]"
                name="passengerGender[0]"
                required
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
              
              <label for="passengerGender[0]">Gender</label>
            </div>
            </div>
            <div class="col-md-3 p-0">

            <div class="form-floating">
              <select
                class="form-select"
                type="text"
                id="passengerPreference[0]"
                name="passengerPreference[0]"
                required
              >

              ${this.getPreferences(trainDetails.className).map((item) => `<option value="${item}">${item}</option>`).join("")}
              </select>
              
              <label for="passengerPreference[0]">Perference</label>
            </div>
            </div>
          </div>
          <button type="button" id="add-passenger" class="form__button">ADD PASSENGER</button>
          <button type="submit" class="form__button">Submit</button>
        </form>
      </div >
          `
  }
}

export default new BookingView();