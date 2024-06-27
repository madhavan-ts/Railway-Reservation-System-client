import { BASE_URL } from "../config.js";
import { state } from "../models.js";
import router from "../router.js";
import AdminHomePageView from "./AdminHomePageView.js";
import View from "./View.js";

class AdminLoginView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandler();
  }

  getHTML() {
    return `
    <nav class="navbar bg-dark">
      <div class="nav-brand"></div>
      <ul class="nav">
        <li class="nav-item">
          <a class="text-light nav-link text-light" href="/">Homepage</a>
        </li>
        <li class="nav-item">
          <a class="text-light nav-link text-light" href="/login">User Login</a>
        </li>
      </ul>
    </nav>
    <div class="form__container">
     <div class="register mx-auto my-5">
        <form id="register-form">
          <h1 class="h3 mb-3 fw-normal">Admin Login</h1>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="admin-email"
              name="admin-username"
              placeholder="name@example.com"
            />
            <label for="admin-email">Email address</label>
            <span class="form-text text-danger"></span>
          </div>
          <div class="input-group">
            <div class="form-floating">
              <input
              required
                type="password"
                class="form-control"
                id="admin-password"
                placeholder="Password"
                name="admin-password"
              />
              <label for="admin-password">Password</label>
            </div>
            <span class="input-group-text show-password open"
              ><i class="fa-solid fa-eye"></i
            ></span>
          </div>
          <span class="form-text text-danger d-block mb-3"></span>
          <button class="btn btn-primary w-100 py-2 mb-3" type="submit">
            Sign in
          </button>
        </form>
      </div>
      </div>
    `
  }

  addEventHandler() {
    const form = this.parentElement.querySelector("#register-form");
    form.addEventListener("submit", this.handleFormSubmit.bind(this));
    const eyeButton = form.querySelector("span.show-password");
    eyeButton.addEventListener("click", () => {
      if (eyeButton.classList.contains("open")) {
        eyeButton.querySelector("i").classList.remove("fa-eye");
        eyeButton.querySelector("i").classList.add("fa-eye-slash");
        eyeButton.classList.remove("open");
        document.getElementById("admin-password").setAttribute("type", "text");
      } else {
        eyeButton.querySelector("i").classList.remove("fa-eye-slash");
        eyeButton.querySelector("i").classList.add("fa-eye");
        eyeButton.classList.add("open");
        document.getElementById("admin-password").setAttribute("type", "password");
      }
    });
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      username: formData.get('admin-username'),
      password: formData.get('admin-password')
    };

    if (data.username.trim() === "" || data.password.trim() === "") {
      this.renderToast("Username and Password cannot be blank");
      return;
    }


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

      console.log(response);
      const result = await response.json();
      console.log(result);
      if (!result.success) {
        this.renderToast(result.message);
        return;
      }

      state.isAdminLoggedIn = true;
      this.renderToast("Admin Login Successful", true);
      state.adminDetails.username = data.username;
      console.log("Admin forms to be displayed");
      console.log(state.adminDetails);
      router.navigateTo("/admin-home");
    } catch (error) {
      console.log(error);
      this.renderToast("Cannot Connect to Server");
    }
  }
}

export default new AdminLoginView();