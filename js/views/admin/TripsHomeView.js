import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import View from "../View.js";

class TripsHomeView extends View {
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

  render() {
    this.parentElement = document.querySelector(".admin__content");
    // console.log(state);
    this.parentElement.innerHTML = this.getHTML(state.trips);
    this.addEventHandler();
  }

  getHTML(trips) {
    return `
      <h1 class="h1" >Trips Details</h1>
      <button class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addTripModal">&#x2b;&nbsp; Add</button>
      <hr>
      <div class="container-sm p-0">
        <ul class="list-group" id="trip-list">
          ${trips.map((item) => this.getTripItemHTML(item)).join("")}
        </ul>
      </div>
      ${this.getModalHTML()}
    `;
  }

  submitHandler(formID, methodType, messageLiteral, afterSubmitOperation) {
    document
      .getElementById(`${formID}`)
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        // event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
          tripID: parseInt(formData.get("tripID")),
          trainID: parseInt(formData.get("trainID")),
          routeID: parseInt(formData.get("routeID")),
          startTime: formData.get("startTime"),
          day: parseInt(formData.get("dayNo")),
        };

        console.log(data);
        try {
          const response = await fetch(`${BASE_URL}/api/admin/trip`, {
            method: methodType,
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
            }),
            body: JSON.stringify(data),
          });

          const result = await response.json();
          console.log(result);
          if (!result.success) {
            this.renderAlert(event.target, result.message, "warning");
            return;
          }
          this.renderAlert(
            event.target,
            `Trip ${messageLiteral} Successfully`,
            "success"
          );
          afterSubmitOperation({ ...data, tripID: result.tripID });
          form.reset();
        } catch (error) {
          this.renderAlert(event.target, "Cannot Connect to Server");
          console.log(error);
        }
      });
  }

  addEventHandler() {
    let self = this;

    this.submitHandler("add-trip-form", "POST", "added", function (data) {
      console.log(state.trips);
      data = {
        ...data,
        ...state.trains.find((item) => item.trainID === data.trainID),
        ...state.routes.find((item) => item.routeID === data.routeID),
      };
      state.trips.push(data);
      // console.log(data);
      const newTripItemHTML = self.getTripItemHTML(data);
      document
        .getElementById("trip-list")
        .insertAdjacentHTML("beforeend", newTripItemHTML);
    });

    document.addEventListener("show.bs.modal", function (event) {
      const btn = event.relatedTarget;
      let tripID = btn.getAttribute("data-trip-id");
      if (btn.classList.contains("edit-trip-btn")) {
        let editTrainForm = document.querySelector("#edit-trip-form");
        let selectedTrip = state.trips.find((item) => item.tripID == tripID);

        editTrainForm
          .querySelector(
            `select[name="trainID"] option[value="${selectedTrip.trainID}"]`
          )
          .setAttribute("selected", true);
        editTrainForm
          .querySelector(
            `select[name="routeID"] option[value="${selectedTrip.routeID}"]`
          )
          .setAttribute("selected", true);
        editTrainForm.querySelector("#start-time").value =
          selectedTrip.startTime;
        editTrainForm
          .querySelector(
            `select[name="dayNo"] option[value="${selectedTrip.day}"]`
          )
          .setAttribute("selected", true);
        editTrainForm.querySelector("#trip-id").value = tripID;
      } else if (btn.classList.contains("delete-trip-btn")) {
        // let tripID = btn.getAttribute("data-trip-id");
        document
          .getElementById("deleteTripModal")
          .setAttribute("data-trip-id", tripID);
      }
    });

    this.submitHandler("edit-trip-form", "PATCH", "updated", function (data) {
      let tripIndex = state.trips.findIndex(
        (item) => item.tripID === data.tripID
      );
      data = {
        ...data,
        ...state.trains.find((item) => item.trainID == data.trainID),
        ...state.routes.find((item) => item.routeID == data.routeID),
      };
      state.trips[tripIndex] = data;
      console.log(state.trips);
      console.log(data);
      const editedTripHTML = self.getTripItemHTML(data);
      document.querySelector(`li[data-trip-id="${data.tripID}"]`).outerHTML =
        editedTripHTML;
    });

    document
      .getElementById("modal-delete-trip-btn")
      .addEventListener("click", async (event) => {
        const tripID =
          event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
            "data-trip-id"
          );
        console.log(tripID);
        const data = { tripID: parseInt(tripID) };
        console.log(data);
        try {
          const response = await fetch(`${BASE_URL}/api/admin/trip`, {
            method: "DELETE",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
            }),
            body: JSON.stringify(data),
          });

          console.log(response);
          const result = await response.json();
          console.log(result);
          if (!result.success) {
            this.renderAlert(
              event.target.parentElement,
              result.message,
              "warning"
            );
            return;
          }
          this.renderAlert(
            event.target.parentElement,
            `Trip Deleted Successfully`,
            "success"
          );
          state.stations = state.stations.filter(
            (item) => item.tripID != tripID
          );
          document.querySelector(`[data-trip-id="${tripID}"]`).remove();
        } catch (error) {
          console.log(error);
          this.renderAlert(
            event.target.parentElement,
            "Cannot Connect to Server"
          );
        }
      });
  }

  getTripItemHTML(item) {
    return `
      <li class="list-group-item" data-trip-id="${item.tripID}" >
      <div class="d-flex justify-content-between gap-2 align-items-center">
        <span class="">
           <b>${item.trainName} (${item.trainNo})</b> via <b>${item.routeNo
      } - ${item.routeName}</b> on ${this.days.find((day) => day.value === item.day).name
      } at ${item.startTime}
        </span>
        <div class="d-flex gap-2">
          <button class="btn btn-primary py-1 px-2 edit-trip-btn" data-bs-toggle="modal" data-bs-target="#editTripModal" data-train-id="${item.trainID
      }" data-route-id="${item.routeID}" data-start-time="${item.startTime
      }" data-day-no="${item.day}" data-trip-id="${item.tripID
      }"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-danger py-1 px-2 delete-trip-btn" data-bs-toggle="modal" data-bs-target="#deleteTripModal" data-trip-id="${item.tripID
      }"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </li>
    `;
  }

  getModalHTML() {
    const trainOptions = state.trains
      .map(
        (item) =>
          `<option value="${item.trainID}">${item.trainNo} - ${item.trainName}</option>`
      )
      .join("");
    const routeOptions = state.routes
      .map(
        (item) =>
          `<option value="${item.routeID}">${item.routeNo} - ${item.routeName}</option>`
      )
      .join("");
    const dayOptions = this.days
      .map((item) => `<option value="${item.value}">${item.name}</option>`)
      .join("");
    return `
      <div class="modal fade" id="addTripModal" tab-index="-1" aria-hidden="true" aria-labelledby="addTrip">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Add Trip Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <form id="add-trip-form">
                <div class="form-floating mb-3">
                  <select class="form-control" name="trainID">
                    ${trainOptions}
                  </select>
                  <label for="trainID">Train Detail</label>
                </div>
                <div class="form-floating mb-3">
                  <select required class="form-control" name="routeID">
                    ${routeOptions}
                  </select>
                  <label  for="trainID">Route Detail</label>
                </div>
                <div class="form-floating mb-3">
                  <select required class="form-control" name="dayNo">
                    ${dayOptions}
                  </select>
                  <label>Day Of Journey</label>
                </div>
                
                <div class="form-floating mb-3">
                  <input type="time" required class="form-control" name="startTime"/>
                  <label>Start Time</label>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="editTripModal" tab-index="-1" aria-hidden="true" aria-labelledby="editTrainModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Edit Trips Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <form id="edit-trip-form">
                <input hidden type="text" id="trip-id" required class="form-control" name="tripID"/>
                  
                <div class="form-floating mb-3">
                  <select class="form-control" name="trainID">
                    ${trainOptions}
                  </select>
                  <label for="trainID">Train Detail</label>
                </div>
                <div class="form-floating mb-3">
                  <select required class="form-control" name="routeID">
                    ${routeOptions}
                  </select>
                  <label  for="trainID">Route Detail</label>
                </div>
                <div class="form-floating mb-3">
                  <select required class="form-control" name="dayNo">
                    ${dayOptions}
                  </select>
                  <label>Day Of Journey</label>
                </div>
                
                <div class="form-floating mb-3">
                  <input type="time" id="start-time" required class="form-control" name="startTime"/>
                  <label>Start Time</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteTripModal" tab-index="-1" aria-hidden="true" aria-labelledby="deleteTripModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Delete Trip Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <p>Do you want to delete the Trip</p>
              <button class="btn btn-primary text-uppercase" id="modal-delete-trip-btn">Continue</button>
            </div>
          </div>
        </div>
      </div>`;
  }
}

export default new TripsHomeView();
