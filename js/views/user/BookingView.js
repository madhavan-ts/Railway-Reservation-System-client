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
        BookingDetailView.render([...result.booked, ...result.waitingList]);

      } catch (error) {
        console.log(error);
      }
    })


    const addPassenger = (i) => {
      let passengerButton = document.getElementById("add-passenger");
      let passengerDetailsElement = document.createElement("div");
      passengerDetailsElement.classList.add('passenger__details');
      passengerDetailsElement.innerHTML = `<div class="passenger__details__form__group">
            <label for="passengerName[${i}]">Passenger Name</label>
            <input
              type="text"
              id="passengerName[${i}]"
              name="passengerName[${i}]"
              required
            />
          </div >
          <div class="passenger__details__form__group">
            <label for="passengerAge[${i}]">Passenger Age</label>
            <input
              type="text"
              id="passengerAge[${i}]"
              name="passengerAge[${i}]"
              required
            />
          </div>

          <div class="passenger__details__form__group">
            <label for="passengerGender[${i}]">Passenger Gender</label>
            <select
              type="text"
              id="passengerGender[${i}]"
              name="passengerGender[${i}]"
              required
            >
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div class="passenger__details__form__group">
            <label for="passengerPreference[${i}]">Seat Perference</label>
            <select
              type="text"
              id="passengerPreference[${i}]"
              name="passengerPreference[${i}]"
              required
            >
              ${this.preferences.map((item) => `<option value="${item}">${item}</option>`).join("")}
            </select>
          </div>
          <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
          `
      passengerButton.insertAdjacentElement("beforebegin", passengerDetailsElement
      );
      // </div>
      const deleteBtn = passengerDetailsElement.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function (event) {
        if (noOfElement > 0) {
          event.target.closest(".passenger__details").remove();
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
        <div class="booking__details">
          <h2 class="booking__details">Train Details</h2>
          <p class="booking__train-name">
            Train Name:
            <span class="booking__train-name-bold">
              ${trainDetails.trainName} (${trainDetails.trainNumber})</span
            >
          </p>
          <p class="booking__train-journey">${trainDetails.fromStation} (${trainDetails.fromStationID}) - ${trainDetails.toStation} (${trainDetails.toStationID})</p>
          <p class="booking__train-class-name">CLASS NAME (${trainDetails.className})</p>
          <p class="booking__train-price-details">$ ${trainDetails.ticketPrice}</p>
          <p class="booking__train-departure">DEPARTURE TIME : (${trainDetails.departureTime})</p>
          <div class="booking__train-duration">DURATION : (${trainDetails.duration})</div>
          <p class="booking__train-arrival">ARRIVAL TIME : (${trainDetails.arrivalTime})</p>
        </div>
        <form id="booking__form" class="booking__form">
          <div class="passenger__details">
            <div class="passenger__details__form__group">
              <label for="passengerName[0]">Passenger Name</label>
              <input
                type="text"
                id="passengerName[0]"
                name="passengerName[0]"
                required
              />
            </div>
            <div class="passenger__details__form__group">
              <label for="passengerAge[0]">Passenger Age</label>
              <input
                type="text"
                id="passengerAge[0]"
                name="passengerAge[0]"
                required
              />
            </div>

            <div class="passenger__details__form__group">
              <label for="passengerGender[0]">Passenger Gender</label>
              <select
                type="text"
                id="passengerGender[0]"
                name="passengerGender[0]"
                required
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div class="passenger__details__form__group">
              <label for="passengerPreference[0]">Seat Perference</label>
              <select
                type="text"
                id="passengerPreference[0]"
                name="passengerPreference[0]"
                required
              >

              ${this.getPreferences(trainDetails.className).map((item) => `<option value="${item}">${item}</option>`).join("")}
              </select>
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