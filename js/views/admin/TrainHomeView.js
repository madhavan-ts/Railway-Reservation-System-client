import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import View from "../View.js";

class TrainsHomeView extends View {

  parentElement;
  constructor() {
    super();
  }

  render() {
    this.parentElement = document.querySelector(".admin__content");
    // console.log(state.trains);
    this.parentElement.innerHTML = this.getHTML(state.trains);
    this.addEventHandler();
  }

  getHTML(trains) {
    return `<h1 class="h1">Train Details</h1>
      <button class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#addTrainModal">&#x2b;&nbsp; Add</button>
      <hr>
      <div class="container-sm p-0">
        <ul class="list-group" id="trains-list">
          ${trains.map((item) => this.getTrainItemHTML(item)).join("")}
        </ul>
      </div>
      ${this.getModalHTML()}
      `;
  }

  getTrainItemHTML(item) {
    return `<li class="list-group-item" data-train-id="${item.trainID}" data-train-number="${item.trainNo}">
      <div class="d-flex justify-content-between gap-2 align-items-center">
        <span class="">
          ${item.trainName} (${item.trainNo})
        </span>
        <div class="d-flex gap-2">
          <button class="btn btn-primary py-1 px-2 edit-train-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-train-number="${item.trainNo}" data-train-name="${item.trainName}"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-danger py-1 px-2 delete-train-btn" data-bs-toggle="modal" data-bs-target="#deleteTrainModal" data-train-id="${item.trainID}" data-train-number="${item.trainNo}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <ul class="list-group mt-2">
        ${item.classes.map(cls => this.getClassItemHTML(cls)).join('')}
      </ul>
    </li>`;
  }

  getClassItemHTML(cls) {
    return `<li class="list-group-item">
      <strong>${cls.className}</strong> - Compartments: ${cls.noOfCompartments}, Base Price: ${cls.basePrice}, Price per KM: ${cls.pricePerKM}
    </li>`;
  }

  getModalHTML() {
    return `
      <div class="modal fade" id="addTrainModal" tab-index="-1" aria-hidden="true" aria-labelledby="addTrainModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form id="add-train-form">
            <div class="modal-header">
              <h2 class="h2">Add Train Form <button type="submit" class="btn btn-primary">Add</button></h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="trainNo" placeholder="Train Number" name="trainNo"/>
                  <label for="trainNo">Train Number</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="trainName" placeholder="Train Name" name="trainName"/>
                  <label for="trainName">Train Name</label>
                </div>
                <div id="classes-container"></div>
                <button type="button" class="btn btn-secondary" id="add-class-btn">Add Class</button>
                </div>
                </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="editModal" tab-index="-1" aria-hidden="true" aria-labelledby="editTrainModal">
        <div class="modal-dialog">
          <div class="modal-content">
          <form id="edit-train-form">
            <div class="modal-header">
              <h2 class="h2">
                Edit Train Form
                <button type="submit" class="btn btn-primary">Submit</button>
              </h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating mb-3">
                  <input readonly type="text" class="form-control" id="trainNo" placeholder="Train Number" name="trainNo"/>
                  <label for="trainNo">Train Number</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="trainName" placeholder="Train Name" name="trainName"/>
                  <label for="trainName">Train Name</label>
                </div>
                <div id="edit-classes-container"></div>
                <button type="button" class="btn btn-secondary" id="edit-add-class-btn">Add Class</button>
                
                </div>
                </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteTrainModal" tab-index="-1" aria-hidden="true" aria-labelledby="deleteTrainModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="h2">Delete Train Form</h2>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
              <p>Do you want to delete the Train (<span class="modal-delete-train-number"></span>)</p>
              <button class="btn btn-primary text-uppercase" id="modal-delete-train-btn">Continue</button>
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
        trainNo: formData.get('trainNo'),
        trainName: formData.get('trainName'),
        classes: []
      };
      const classFields = form.querySelectorAll(".class-group");
      const classNames = [];

      // Extract classes and check for duplicates
      let duplicateClass = false;
      classFields.forEach((classField) => {
        const className = classField.querySelector("[name='className']").value;
        if (classNames.includes(className)) {
          duplicateClass = true;
        } else {
          classNames.push(className);
          const classData = {
            className: className,
            noOfCompartments: classField.querySelector("[name='noOfCompartments']").value,
            basePrice: classField.querySelector("[name='basePrice']").value,
            pricePerKM: classField.querySelector("[name='pricePerKM']").value
          };
          data.classes.push(classData);
        }
      });

      // Display an alert if duplicates are found
      if (duplicateClass) {
        this.renderAlert(event.target, "Class names must be unique. Please ensure no duplicate class names are selected.", "warning");
        return;
      }

      if (data.trainNo.trim() === "" || data.trainName.trim() === "") {
        this.renderAlert(event.target, "Train Number and Train Name cannot be blank", "warning");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/admin/train`, {
          method: methodType,
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(data)
        });

        const result = await response.json();
        // console.log(result);
        if (!result.success) {
          this.renderAlert(event.target.querySelector(".modal-body"), result.message, "warning");
          return;
        }
        this.renderAlert(event.target.querySelector(".modal-body"), `Train ${messageLiteral} Successfully`, "success");
        afterSubmitOperation({ trainID: result.trainID, ...data });
        form.reset();
      } catch (error) {
        this.renderAlert(event.target.querySelector(".modal-body"), "Cannot Connect to Server");
      }
    });
  }


  addEventHandler() {
    const self = this;

    document.getElementById("add-class-btn").addEventListener("click", function () {
      const classFieldsHTML = self.getClassFieldsHTML();
      document.getElementById("classes-container").insertAdjacentHTML("beforeend", classFieldsHTML);
    });

    document.getElementById("edit-add-class-btn").addEventListener("click", function () {
      const classFieldsHTML = self.getClassFieldsHTML();
      document.getElementById("edit-classes-container").insertAdjacentHTML("beforeend", classFieldsHTML);
    });

    this.submitHandler("add-train-form", "POST", "added", function (data) {
      state.trains.push(data);
      const newTrainHTML = self.getTrainItemHTML(data);
      document.getElementById("trains-list").insertAdjacentHTML("beforeend", newTrainHTML);
    });

    this.submitHandler("edit-train-form", "PATCH", "updated", function (data) {
      let trainIndex = state.trains.findIndex((item) => item.trainNo === data.trainNo);
      state.trains[trainIndex] = data;
      const editedTrainHTML = self.getTrainItemHTML(data);
      document.querySelector(`li[data-train-number="${data.trainNo}"]`).outerHTML = editedTrainHTML;
    });

    document.addEventListener("show.bs.modal", function (event) {
      let button = event.relatedTarget;
      if (button.classList.contains("edit-train-btn")) {
        let editTrainForm = document.querySelector("#edit-train-form");
        editTrainForm.querySelector("#trainNo").value = button.getAttribute("data-train-number");
        editTrainForm.querySelector("#trainName").value = button.getAttribute("data-train-name");

        const editClassesContainer = document.getElementById("edit-classes-container");
        editClassesContainer.innerHTML = '';

        const train = state.trains.find(t => t.trainNo === button.getAttribute("data-train-number"));
        train.classes.forEach(cls => {
          const classFieldsHTML = self.getClassFieldsHTML(cls);
          editClassesContainer.insertAdjacentHTML("beforeend", classFieldsHTML);
        });
      } else if (button.classList.contains("delete-train-btn")) {
        // console.log(button.getAttribute("data-train-id"));
        document.querySelector(".modal-delete-train-number").innerText = button.getAttribute("data-train-number");
        document.querySelector(".modal-delete-train-number").setAttribute("data-train-id", button.getAttribute("data-train-id"));
      }
    });

    document.getElementById("modal-delete-train-btn").addEventListener("click", async (event) => {
      const trainID = event.target.parentElement.querySelector(".modal-delete-train-number").getAttribute('data-train-id');
      // console.log(trainID);
      const data = { trainID: trainID };
      try {
        const response = await fetch(`${BASE_URL}/api/admin/train`, {
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
        this.renderAlert(event.target.parentElement, `Train Deleted Successfully`, "success");
        // console.log(state.trains.filter(item => item.trainID !== parseInt(trainID)));
        state.trains = state.trains.filter(item => item.trainID !== parseInt(trainID));
        // console.log(state.trains);
        document.querySelector(`li[data-train-id="${trainID}"]`).remove();
      } catch (error) {
        // console.log(error);
        this.renderAlert(event.target.parentElement, "Cannot Connect to Server");
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-class-btn")) {
        event.target.closest(".class-group").remove();
      }
    });
  }

  getClassFieldsHTML(cls = {}) {
    return `
      <div class="class-group">
        <div class="d-flex justify-content-between mb-2">
          <h5>Class Details</h5>
          <button type="button" class="btn btn-danger btn-sm delete-class-btn">&times;</button>
        </div>
        <div class="form-floating mb-3">
          <select class="form-control" name="className">
            <option value="AC FIRST CLASS (1A)" ${cls.className === "AC FIRST CLASS (1A)" ? "selected" : ""}>AC FIRST CLASS (1A)</option>
            <option value="AC 2 TIER (2A)" ${cls.className === "AC 2 TIER (2A)" ? "selected" : ""}>AC 2 TIER (2A)</option>
            <option value="AC 3 TIER (3A)" ${cls.className === "AC 3 TIER (3A)" ? "selected" : ""}>AC 3 TIER (3A)</option>
            <option value="SLEEPER (SL)" ${cls.className === "SLEEPER (SL)" ? "selected" : ""}>SLEEPER (SL)</option>
            <option value="SECOND SEATING (2S)" ${cls.className === "SECOND SEATING (2S)" ? "selected" : ""}>SECOND SEATING (2S)</option>
            <option value="FIRST CLASS (FC)" ${cls.className === "FIRST CLASS (FC)" ? "selected" : ""}>FIRST CLASS (FC)</option>
          </select>
          <label for="className">Class Name</label>
        </div>
        
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="No of Compartments"
            name="noOfCompartments"
            value="${cls.noOfCompartments || ''}"
          />
          <label for="noOfCompartments">No of Compartments</label>
        </div>
        <div class="d-flex gap-2 justify-content-between mb-3">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              placeholder="Base Price"
              name="basePrice"
              value="${cls.basePrice || ''}"
            />
            <label for="basePrice">Base Price</label>
          </div>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              placeholder="Price per KM"
              name="pricePerKM"
              value="${cls.pricePerKM || ''}"
            />
            <label for="pricePerKM">Price per KM</label>
          </div>
        </div>
      </div>`;
  }

}

export default new TrainsHomeView();
