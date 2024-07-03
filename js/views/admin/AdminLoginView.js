import { BASE_URL } from "../../config.js";
import { getHandlebar, loadRoutes, loadStations, loadTrains, loadTrips, state } from "../../models.js";
import router from "../../router.js";
import AdminHomePageView from "./AdminHomePageView.js";
import View from "../View.js";

class AdminLoginView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    let template = Handlebars.templates["login-page.hbs"];
    this.parentElement.innerHTML = template({ user: false, type: "admin" });
    this.addEventHandler();
  }


  addEventHandler() {
    const form = this.parentElement.querySelector("#login-form");
    form.addEventListener("submit", this.handleFormSubmit.bind(this));
    const eyeButton = form.querySelector("span.show-password");
    eyeButton.addEventListener("click", () => {
      if (eyeButton.classList.contains("open")) {
        eyeButton.querySelector("i").classList.remove("fa-eye");
        eyeButton.querySelector("i").classList.add("fa-eye-slash");
        eyeButton.classList.remove("open");
        document.getElementById("adminpassword").setAttribute("type", "text");
      } else {
        eyeButton.querySelector("i").classList.remove("fa-eye-slash");
        eyeButton.querySelector("i").classList.add("fa-eye");
        eyeButton.classList.add("open");
        document.getElementById("adminpassword").setAttribute("type", "password");
      }
    });
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      username: formData.get('username'),
      password: formData.get('adminpassword')
    };

    if (data.username.trim() === "" || data.password.trim() === "") {
      this.renderToast("Username and Password cannot be blank");
      return;
    }

    this.renderSpinner();
    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
      });

      // console.log(response);
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        this.renderToast(result.message);
        this.hideSpinner();
        return;
      }

      state.isAdminLoggedIn = true;
      localStorage.setItem("ASESSIONID", result.ASESSIONID);
      this.renderToast("Admin Login Successful", true);
      state.adminDetails.username = result.username;

      await loadRoutes();
      await loadStations();
      await loadTrains();
      await loadTrips();
      // console.log("Admin forms to be displayed");
      // console.log(state.adminDetails);
      this.hideSpinner();
      router.navigateTo("/admin-home");
    } catch (error) {
      console.log(error);
      this.renderToast("Cannot Connect to Server");
    }
  }
}

export default new AdminLoginView();