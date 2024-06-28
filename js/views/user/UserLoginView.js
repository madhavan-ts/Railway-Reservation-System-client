import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import UserRegisterView from "./UserRegisterView.js";
import View from "../View.js";
import UserHomePageView from "./UserHomePageView.js";
import router from "../../router.js";

class UserLoginView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    document.title = "User Login Page";
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
  }

  getHTML() {
    return ` 
    <nav class="navbar bg-dark">
      <div class="nav-brand"></div>
      <ul class="nav">
      <li class="nav-item">
          <a class="text-light nav-link text-light" href="/">Homepage</a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-light" href="/admin-login">Admin Login</a>
        </li>
      </ul>
    </nav>
    <div class="form__container col-md-6 text-center">
    <div class="login mx-auto">
        <form id="login-form">
          <h1 class="h3 mb-3 fw-normal">User Login</h1>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="useremail"
              name="username"
              placeholder="name@example.com"
            />
            <label for="useremail">Email address</label>
            <span class="form-text text-danger"></span>
          </div>
          <div class="input-group">
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="userpassword"
                placeholder="Password"
                name="password"
              />
              <label for="userpassword">Password</label>
            </div>
            <span class="input-group-text show-password open"
              ><i class="fa-solid fa-eye"></i
            ></span>
          </div>
          <span class="form-text text-danger d-block mb-3"></span>
          <button class="btn btn-primary w-100 py-2 mb-3" type="submit">
            Sign in
          </button>
          <button id="register-now-btn" class="btn btn-outline-secondary w-100 py-2" type="button">
            Register Now
          </button>
        </form>
      </div>
      </div>
    `;
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
      password: formData.get("password"),
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
