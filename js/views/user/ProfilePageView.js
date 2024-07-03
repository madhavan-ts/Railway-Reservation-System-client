import { BASE_URL } from "../../config.js";
import Handlebars from "../../helpers.js";
import { getDataAsJSON, getHandlebar, state } from "../../models.js";
import View from "../View.js";

class ProfilePageView extends View {
  parentElement;
  isEditing;
  constructor() {
    super();
  }

  async render() {
    this.parentElement = document.querySelector(".user__content");
    let profileTemplate = Handlebars.templates["profile.hbs"];
    this.parentElement.innerHTML = profileTemplate();
    this.setValues();
    this.addEventHandlers();
  }

  // getHTML() {

  // }

  async setValues() {
    try {
      const res = await getDataAsJSON(`${BASE_URL}/api/users/profile?username=${state.userDetails.username}`);
      // const data = response.json();
      if (res.success) {
        const data = res.profile;
        const form = document.getElementById("profile-form");
        // console.log(data);
        form.querySelector("[name='firstName']").value = data.firstname;
        form.querySelector("[name='lastName']").value = data.lastname;
        form.querySelector("[name='dob']").value = data.dob;
        form.querySelector("[name='gender']").querySelector(`[value='${data.gender}']`).setAttribute("selected", true);
        form.querySelector("[name='address']").value = data.address;
        this.isEditing = false;
      } else {
        this.renderToast(data.message);
      }
    } catch (err) {
      // console.log(err);
      this.renderToast(err.message);
    }


  }

  addEventHandlers() {
    document.getElementById("edit-btn").addEventListener("click", (event) => {
      // console.log(event);
      if (!this.isEditing) {
        const form = document.getElementById("profile-form");
        form.querySelector("[name='firstName']").removeAttribute("disabled");
        form.querySelector("[name='lastName']").removeAttribute("disabled");
        form.querySelector("[name='dob']").removeAttribute("disabled");
        form.querySelector("[name='gender']").removeAttribute("disabled");
        form.querySelector("[name='address']").removeAttribute("disabled");
        const button = document.createElement("button");
        button.innerText = "Submit"
        button.setAttribute("id", "submit-btn");
        button.classList.add("btn", "btn-primary", "col-12");
        button.setAttribute("type", "submit");
        form.insertAdjacentElement("beforeend", button);
        this.isEditing = true;
      }
    });

    document.getElementById("profile-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitBtn = document.getElementById("submit-btn")
      submitBtn.setAttribute("disabled", true);
      // console.log(event);
      const form = event.target;
      // form.querySelector("[name='firstName']").value = data.firstname;
      // form.querySelector("[name='lastName']").value = data.lastname;
      // form.querySelector("[name='dob']").value = data.dob;
      // form.querySelector("[name='gender']").querySelector(`[value='${data.gender}']`).setAttribute("selected", true);
      // form.querySelector("[name='address']").value = data.address;
      const formData = new FormData(form);
      const requestData = {
        username: state.userDetails.username,
        firstname: formData.get("firstName").trim(),
        lastname: formData.get("lastName").trim(),
        address: formData.get("address").trim(),
        dob: formData.get("dob").trim(),
        gender: formData.get("gender").trim()
      }

      if (requestData.firstname === "" || requestData.lastname === "" || requestData.address === "") {
        this.renderToast("None of the fields can be empty");
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/api/users/profile`, {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(requestData)
        })
        const data = await response.json();
        if (data.success) {
          this.renderToast(data.message, data.success);
          submitBtn.remove();

          document.querySelectorAll("[name]")
            .forEach(item => {
              if (item.tagName === "INPUT" || item.tagName === "SELECT" || item.tagName === "TEXTAREA") {
                item.setAttribute("disabled", true)
              }
            });

          // console.log(this.isEditing);

        } else {
          this.renderToast(data.message, data.success);
        }
      } catch (err) {
        console.log(err);
      }
      this.isEditing = false;
    });
  }


}

export default new ProfilePageView();