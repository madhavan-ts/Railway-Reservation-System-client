import { BASE_URL } from "../../config.js";
import { getHandlebar, state } from "../../models.js";
import UserRegisterView from "./UserRegisterView.js";
import View from "../View.js";
import UserHomePageView from "./UserHomePageView.js";
import router from "../../router.js";

class UserLoginView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  async render() {
    document.title = "User Login Page";
    this.parentElement.innerHTML = await getHandlebar("./js/templates/login-page.hbs", { type: "user", user: true });
    this.addEventHandlers();
  }


  addEventHandlers() {
    const form = this.parentElement.querySelector("#login-form");
    form.addEventListener("submit", this.handleFormSubmit.bind(this));
    const eyeButton = form.querySelector("span.show-password");
    eyeButton.addEventListener("click", () => {
      if (eyeButton.classList.contains("open")) {
        eyeButton.querySelector("i").classList.remove("fa-eye");
        eyeButton.querySelector("i").classList.add("fa-eye-slash");
        eyeButton.classList.remove("open");
        document.getElementById("userpassword").setAttribute("type", "text");
      } else {
        eyeButton.querySelector("i").classList.remove("fa-eye-slash");
        eyeButton.querySelector("i").classList.add("fa-eye");
        eyeButton.classList.add("open");
        document
          .getElementById("userpassword")
          .setAttribute("type", "password");
      }
    });
    form.querySelector("#register-now-btn").addEventListener("click", () => {
      console.log("To Register");
      UserRegisterView.render();
    });
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      username: formData.get("username"),
      password: formData.get("userpassword"),
    };

    if (data.username.trim() === "" || data.password.trim() === "") {
      this.renderToast("Username and Password cannot be blank");
    }

    // if(data.user)

    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
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
        this.renderToast(result.message);
        return;
      }

      state.isUserLoggedIn = true;
      state.userDetails.username = data.username;
      this.renderToast("User Login Successful", true);
      router.navigateTo("/user-home");


      // state.isUserLoggedIn = true
    } catch (error) {
      console.log(error);
      this.renderToast("Cannot Connect to Server");
    }
  }
}

export default new UserLoginView();
