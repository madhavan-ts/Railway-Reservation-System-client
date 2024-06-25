import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import View from "../View.js";

class StationsHomeView extends View {

  parentElement;
  constructor() {
    super();
  }

  render() {
    this.parentElement = document.querySelector(".admin__content");
    // console.log(state.stations);
    this.parentElement.innerHTML = this.getHTML(state.stations);
    this.addEventHandler();
  }

  getHTML(stations) {
    return `<h1 class="h1" >Station Details</h1>
      <button class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addmodal">&#x2b;&nbsp; Add</button>
      <hr>
      <div class="container-sm p-0">
        <ul class="list-group" id="stations-list">
          ${stations.map((item) => `<li  class="list-group-item">
            <div class="d-flex justify-content-between gap-2 align-items-center">
              <span class="">
                ${item.stationName} (${item.stationID})
              </span>
              <div class="d-flex gap-2">
                <button class="btn btn-primary  py-1 px-2 edit-station-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-station-code="${item.stationID}" data-station-name="${item.stationName}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn btn-danger  py-1 px-2 delete-station-btn" data-bs-toggle="modal" data-bs-target="#deleteStationModal" data-station-code="${item.stationID}"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
            
            </li>`).join("")}
        </ul >
      </div>
      <div class="modal fade" id="addmodal" tab-index="-1" aria-hidden="true" aria-labelledby="addStationModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Add Stations Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <form id="add-stations-form">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="stationCode"
                    placeholder="Station Code"
                    name="stationCode"
                  />
                  <label for="stationCode">Station Code</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="stationName"
                    placeholder="Station Name"
                    name="stationName"
                  />
                  <label for="stationName">Station Name</label>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="editModal" tab-index="-1" aria-hidden="true" aria-labelledby="editStationsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Edit Stations Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <form id="edit-stations-form">
                <div class="form-floating mb-3">
                  <input
                    readonly
                    type="text"
                    class="form-control"
                    id="stationCode"
                    placeholder="Station Code"
                    name="stationCode"
                  />
                  <label for="stationCode">Station Code</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="stationName"
                    placeholder="Station Name"
                    name="stationName"
                  />
                  <label for="stationName">Station Name</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteStationModal" tab-index="-1" aria-hidden="true" aria-labelledby="deleteStationsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Delete Stations Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <p>Do you want to delete the Station (<span class="modal-delete-station-code"></span>)</p>
              <button class="btn btn-primary text-uppercase" id="modal-delete-station-btn">Continue</button>
            </div>
          </div>
        </div>
      </div>
      `
  }


  submitHandler(formID, methodType, messageLiteral, afterSubmitOperation) {
    document.getElementById(`${formID}`).addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      console.log(form);
      const formData = new FormData(form);
      console.log(formData);
      const data = {
        stationID: formData.get('stationCode'),
        stationName: formData.get('stationName')
      };
      console.log(data);
      console.log(event.target);
      if (data.stationID.trim() === "" || data.stationName.trim() === "") {
        this.renderAlert(event.target, "Station Code and Station Name cannot be blank", "warning");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/admin/station`, {
          method: methodType,
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();
        console.log(result);
        if (!result.success) {
          this.renderAlert(event.target, result.message, "warning");
          return;
        }
        this.renderAlert(event.target, `Station ${messageLiteral} Successfully`, "success");
        afterSubmitOperation(data);
        form.reset();
      } catch (error) {
        console.log(error);
        this.renderAlert(event.target, "Cannot Connect to Server");
      }
    });
  }

  addEventHandler() {
    this.submitHandler("add-stations-form", "POST", "added", function (data) {
      // item.stationID === data.stationID;
      state.stations.push(data);
      document.getElementById("stations-list").insertAdjacentHTML("beforeend",
        `<li  class="list-group-item">
        <div class="d-flex justify-content-between gap-2 align-items-center">
          <span class="">
            ${data.stationName} (${data.stationID})
          </span>
          <div class="d-flex gap-2">
            <button class="btn btn-primary  py-1 px-2 edit-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-station-code="${data.stationID}" data-station-name="${data.stationName}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-danger  py-1 px-2 delete-btn "><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </li>`);
      console.log(state.stations);
    })
    this.submitHandler("edit-stations-form", "PATCH", "updated", function (data) {
      let station = state.stations.find((item) => item.stationID === data.stationID);
      station.stationName = data.stationName;
      console.log(state.stations);

      let element = document.querySelector(`[data-station-code='${data.stationID}']`);
      element.setAttribute("data-station-name", data.stationName);
      const list = element.parentElement.parentElement.querySelector("span").innerText = `${data.stationName} (${data.stationID})`;
    });

    document.addEventListener("show.bs.modal", function (event) {
      let button = event.relatedTarget;
      if (button.classList.contains("edit-station-btn")) {
        let editStationsForm = document.querySelector("#edit-stations-form");
        // console.log(event);
        editStationsForm.querySelector("#stationCode").value = button.getAttribute("data-station-code");
        editStationsForm.querySelector("#stationName").value = button.getAttribute("data-station-name");
      } else if (button.classList.contains("delete-station-btn")) {
        document.querySelector(".modal-delete-station-code").innerText = button.getAttribute("data-station-code");
      }
    });


    document.getElementById("modal-delete-station-btn").addEventListener("click", async (event) => {
      // event.preventDefault();
      const stationCode = event.target.parentElement.querySelector(".modal-delete-station-code").innerText;
      const data = { stationID: stationCode };
      try {
        const response = await fetch(`${BASE_URL}/api/admin/station`, {
          method: "DELETE",
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();
        console.log(result);
        if (!result.success) {
          this.renderAlert(event.target.parentElement, result.message, "warning");
          return;
        }
        this.renderAlert(event.target.parentElement, `Station Deleted Successfully`, "success");
        state.stations = state.stations.filter(item => item.stationID !== stationCode);
        document.querySelector(`[data-station-code="${stationCode}"]`).parentElement.parentElement.parentElement.remove();

      } catch (error) {
        console.log(error);
        this.renderAlert(event.target.parentElement, "Cannot Connect to Server");
      }
    })

  }


}

export default new StationsHomeView();