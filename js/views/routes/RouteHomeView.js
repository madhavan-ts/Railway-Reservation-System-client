import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import View from "../View.js";

class RoutesHomeView extends View {

  parentElement;
  constructor() {
    super();
  }

  render() {
    this.parentElement = document.querySelector(".admin__content");
    // console.log(state.routes);
    this.parentElement.innerHTML = this.getHTML(state.routes);
    this.addEventHandler();
  }

  getHTML(routes) {
    return `<h1 class="h1">Route Details</h1>
      <button class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addRouteModal">&#x2b;&nbsp; Add</button>
      <hr>
      <div class="container-sm p-0">
        <ul class="list-group" id="routes-list">
          ${routes.map((item) => this.getRouteItemHTML(item)).join("")}
        </ul>
      </div>
      ${this.getModalHTML()}
      `;
  }

  getRouteItemHTML(item) {
    return `<li class="list-group-item" data-route-id="${item.routeID}" data-route-number="${item.routeNo}">
      <div class="d-flex justify-content-between gap-2 align-items-center">
        <span class="">
          ${item.routeName} (${item.routeNo})
        </span>
        <div class="d-flex gap-2">
          <button class="btn btn-primary py-1 px-2 edit-route-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-route-id="${item.routeID}" data-route-number="${item.routeNo}" data-route-name="${item.routeName}"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-danger py-1 px-2 delete-route-btn" data-bs-toggle="modal" data-bs-target="#deleteRouteModal" data-route-id="${item.routeID}" data-route-number="${item.routeNo}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <ul class="list-group mt-2">
        ${item.stoppings.map(stop => this.getStoppingItemHTML(stop)).join('')}
      </ul>
    </li>`;
  }

  getStoppingItemHTML(stop) {
    return `<li class="list-group-item">
      <strong>Station ID:</strong> ${stop.stationID}, Waiting Time: ${stop.waitingTime} mins, Time to Next: ${stop.timeToNextStation} mins, Distance to Next: ${stop.distanceToNextStation} km
    </li>`;
  }

  getModalHTML() {
    return `
      <div class="modal fade" id="addRouteModal" tab-index="-1" aria-hidden="true" aria-labelledby="addRouteModal">
        <div class="modal-dialog">
          <div class="modal-content">
          <form id="add-route-form">
            <div class="modal-header">
              <h2 class="h2">Add Route Form <button type="submit" class="btn btn-primary">Add</button></h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="routeNo" placeholder="Route Number" name="routeNo"/>
                <label for="routeNo">Route Number</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="routeName" placeholder="Route Name" name="routeName"/>
                <label for="routeName">Route Name</label>
              </div>
              <div id="stoppings-container"></div>
              <button type="button" class="btn btn-secondary" id="add-stopping-btn">Add Stopping</button>
            </div>
           </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="editModal" tab-index="-1" aria-hidden="true" aria-labelledby="editRouteModal">
        <div class="modal-dialog">
          <div class="modal-content">
          <form id="edit-route-form">
            <div class="modal-header">
              <h2 class="h2">
                Edit Route Form
                <button type="submit" class="btn btn-primary">Submit</button>
              </h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input readonly type="text" class="form-control" id="routeNo" placeholder="Route Number" name="routeNo"/>
                <label for="routeNo">Route Number</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="routeName" placeholder="Route Name" name="routeName"/>
                <label for="routeName">Route Name</label>
              </div>
              <div id="edit-stoppings-container"></div>
              <button type="button" class="btn btn-secondary" id="edit-add-stopping-btn">Add Stopping</button>
            </div>
          </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteRouteModal" tab-index="-1" aria-hidden="true" aria-labelledby="deleteRouteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Delete Route Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <p>Do you want to delete the Route (<span class="modal-delete-route-number"></span>)</p>
              <button class="btn btn-primary text-uppercase" id="modal-delete-route-btn">Continue</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  submitHandler(formID, methodType, messageLiteral, afterSubmitOperation) {
    document.getElementById(`${formID}`).addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = {
        routeNo: formData.get('routeNo'),
        routeName: formData.get('routeName'),
        stoppings: []
      };
      const stoppingFields = form.querySelectorAll(".stopping-group");
      const stationIDs = [];

      // Extract stoppings and check for duplicates
      let duplicateStopping = false;
      stoppingFields.forEach((stoppingField, i) => {
        const stationID = stoppingField.querySelector("[name='stationID']").value;
        if (stationIDs.includes(stationID)) {
          duplicateStopping = true;
        } else {
          stationIDs.push(stationID);
          const stoppingData = {
            stationID: stationID,
            waitingTime: (i === 0 || (i === stoppingFields.length - 1)) ? 0 : parseInt(stoppingField.querySelector("[name='waitingTime']").value),
            timeToNextStation: (i === stoppingFields.length - 1) ? 0 : parseInt(stoppingField.querySelector("[name='timeToNext']").value),
            distanceToNextStation: (i === stoppingFields.length - 1) ? 0 : parseInt(stoppingField.querySelector("[name='distanceToNext']").value)
          };
          data.stoppings.push(stoppingData);
        }
      });

      // Display an alert if duplicates are found
      if (duplicateStopping) {
        this.renderAlert(event.target, "Station IDs must be unique. Please ensure no duplicate station IDs are selected.", "warning");
        return;
      }

      if (data.routeNo.trim() === "" || data.routeName.trim() === "") {
        this.renderAlert(event.target, "Route Number and Route Name cannot be blank", "warning");
        return;
      }

      if (data.stoppings.length < 2) {
        this.renderAlert(event.target, "There must be at least two stoppings for the route.", "warning");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/admin/route`, {
          method: methodType,
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (!result.success) {
          this.renderAlert(event.target.querySelector(".modal-body"), result.message, "warning");
          return;
        }
        this.renderAlert(event.target.querySelector(".modal-body"), `Route ${messageLiteral} Successfully`, "success");
        afterSubmitOperation({ routeID: parseInt(result.routeID), ...data });
        form.reset();
      } catch (error) {
        this.renderAlert(event.target.querySelector(".modal-body"), "Cannot Connect to Server");
      }
    });
  }

  addEventHandler() {
    const self = this;

    document.getElementById("add-stopping-btn").addEventListener("click", function () {
      const stoppingFieldsHTML = self.getStoppingFieldsHTML();
      document.getElementById("stoppings-container").insertAdjacentHTML("beforeend", stoppingFieldsHTML);
    });

    document.getElementById("edit-add-stopping-btn").addEventListener("click", function () {
      const stoppingFieldsHTML = self.getStoppingFieldsHTML();
      document.getElementById("edit-stoppings-container").insertAdjacentHTML("beforeend", stoppingFieldsHTML);
    });

    this.submitHandler("add-route-form", "POST", "added", function (data) {
      state.routes.push(data);
      // console.log(data);
      const newRouteHTML = self.getRouteItemHTML(data);
      document.getElementById("routes-list").insertAdjacentHTML("beforeend", newRouteHTML);
    });

    this.submitHandler("edit-route-form", "PATCH", "updated", function (data) {
      let routeIndex = state.routes.findIndex((item) => item.routeNo === data.routeNo);
      state.routes[routeIndex] = data;
      const editedRouteHTML = self.getRouteItemHTML(data);
      document.querySelector(`li[data-route-number="${data.routeNo}"]`).outerHTML = editedRouteHTML;
    });

    document.addEventListener("show.bs.modal", function (event) {
      let button = event.relatedTarget;
      if (button.classList.contains("edit-route-btn")) {
        let editRouteForm = document.querySelector("#edit-route-form");
        editRouteForm.querySelector("#routeNo").value = button.getAttribute("data-route-number");
        editRouteForm.querySelector("#routeName").value = button.getAttribute("data-route-name");

        const editStoppingsContainer = document.getElementById("edit-stoppings-container");
        editStoppingsContainer.innerHTML = '';

        const route = state.routes.find(r => r.routeNo === button.getAttribute("data-route-number"));
        route.stoppings.forEach(stop => {
          const stoppingFieldsHTML = self.getStoppingFieldsHTML(stop);
          editStoppingsContainer.insertAdjacentHTML("beforeend", stoppingFieldsHTML);
        });
      } else if (button.classList.contains("delete-route-btn")) {
        // console.log(button.getAttribute("data-route-id"));
        document.querySelector(".modal-delete-route-number").innerText = button.getAttribute("data-route-number");
        document.querySelector(".modal-delete-route-number").setAttribute("data-route-id", button.getAttribute("data-route-id"));
      }
    });

    document.getElementById("modal-delete-route-btn").addEventListener("click", async (event) => {
      const routeID = event.target.parentElement.querySelector(".modal-delete-route-number").getAttribute('data-route-id');
      // console.log(routeID);
      const data = { routeID: parseInt(routeID) };
      try {
        const response = await fetch(`${BASE_URL}/api/admin/route`, {
          method: "DELETE",
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (!result.success) {
          this.renderAlert(event.target.parentElement, result.message, "warning");
          return;
        }
        this.renderAlert(event.target.parentElement, `Route Deleted Successfully`, "success");
        // console.log(state.routes.filter(item => item.routeID !== parseInt(routeID)));
        state.routes = state.routes.filter(item => item.routeID !== parseInt(routeID));
        // console.log(state.routes);
        document.querySelector(`li[data-route-id="${routeID}"]`).remove();
      } catch (error) {
        // console.log(error);
        this.renderAlert(event.target.parentElement, "Cannot Connect to Server");
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-stopping-btn")) {
        event.target.closest(".stopping-group").remove();
      }
    });
  }

  getStoppingFieldsHTML(stop = {}) {
    const stationsOptions = state.stations.map(station => `<option value="${station.stationID}" ${stop.stationID === station.stationID ? "selected" : ""}>${station.stationName}</option>`).join("");

    return `
      <div class="stopping-group">
        <div class="d-flex justify-content-between mb-2">
          <h5>Stopping Details</h5>
          <button type="button" class="btn btn-danger btn-sm delete-stopping-btn">&times;</button>
        </div>
        <div class="form-floating mb-3">
          <select class="form-control" name="stationID">
            ${stationsOptions}
          </select>
          <label for="stationID">Station ID</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Waiting Time (minutes)"
            name="waitingTime"
            value="${stop.waitingTime || ''}"
          />
          <label for="waitingTime">Waiting Time (minutes)</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Time to Next Station (minutes)"
            name="timeToNext"
            value="${stop.timeToNextStation || ''}"
          />
          <label for="timeToNext">Time to Next Station (minutes)</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Distance to Next Station (km)"
            name="distanceToNext"
            value="${stop.distanceToNextStation || ''}"
          />
          <label for="distanceToNext">Distance to Next Station (km)</label>
        </div>
      </div>`;
  }

}

export default new RoutesHomeView();
