import { BASE_URL } from "../../config.js";
import { state } from "../../models.js";
import TrainFormsView from "./TrainFormsView.js";
import View from "../View.js";
import UserHomePageView from "./UserHomePageView.js";
import router from "../../router.js";

class UserRegisterView extends View {
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    document.title = "User Register Page";
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
    // this.addEventHandlers(this.handleFormSubmit);
  }

  getHTML() {
    return `
    
    <nav class="navbar bg-dark">
      <ul class="nav">
        <li class="nav-item "><a class="nav-link text-light" href="/admin-login">&larr; &nbsp; Back to user Login</a></li>

      </ul>
    </nav>
    <div class="col-md-10 w-100">
    <div class="form__container">  
    <div class="register mx-auto">
        <form id="register-form">
          <h1 class="h3 mb-3 fw-normal">Register Form</h1>
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
          <div class="input-group mb-3">
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
            <span data-target="userpassword" class="input-group-text show-password open"
              ><i class="fa-solid fa-eye"></i
            ></span>
          </div>
          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              <label for="confirmPassword">Confirm Password</label>
            </div>
            <span data-target="confirmPassword" class="input-group-text show-password open"
              ><i class="fa-solid fa-eye"></i
            ></span>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="first name"
            />
            <label for="firstName">First name</label>
            <span class="form-text text-danger"></span>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              placeholder="last name"
            />
            <label for="lastName">Last name</label>
            <span class="form-text text-danger"></span>
          </div>
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="date-of-birth"
              name="date-of-birth"
              placeholder="Date of birth"
            />
            <label for="date-of-birth">Date of Birth</label>
            <span class="form-text text-danger"></span>
          </div>
          <div class="form-group mb-3">
          <label for="gender">Gender</label>
          <select
          class="form-select"
          id="gender"
          name="gender"
          placeholder="Gender"
          >
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
          <option value="OTHER">OTHER</option>
          </select
            <span class="form-text text-danger"></span>
          </div>
          <div class="form-floating mb-3">
            <textarea
              rows="4"
              class="form-control"
              id="address"
              name="address"
              placeholder="Address"
            ></textarea>
            <label for="address">Address</label>
            <span class="form-text text-danger"></span>
          </div>
          <button class="btn btn-primary w-100 py-2 mb-3" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      </div>
      </div>
    `;
  }

  addEventHandlers() {
    const form = document.getElementById("register-form");

    // for show password Button
    form.querySelectorAll("span.show-password").forEach(item => {
      item.addEventListener("click", () => {
        console.log("clicked");
        const targetElementId = item.getAttribute("data-target");
        if (item.classList.contains("open")) {
          // console.log("show passwors");
          item.querySelector("i").classList.remove("fa-eye");
          item.querySelector("i").classList.add("fa-eye-slash");
          item.classList.remove("open");
          document.getElementById(targetElementId).setAttribute("type", "text");
        } else {
          // console.log("hide passwors");
          item.querySelector("i").classList.remove("fa-eye-slash");
          item.querySelector("i").classList.add("fa-eye");
          item.classList.add("open");
          document.getElementById(targetElementId).setAttribute("type", "password");
        }
      })
    });


    //form submit handler
    form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get("confirmPassword"),
      firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      dob: formData.get("date-of-birth"),
      gender: formData.get("gender"),
      address: formData.get("address")
    };

    // const emailRegEx = new RegExp("[a-zA-z]")
    // if (data.username.trim().match(""))

    if (data.username.trim() === "") {
      this.renderToast("Email Field cannot be blank");
      return;
    }
    if (data.password.trim() === "") {
      this.renderToast("Password field cannot be blank");
      return;
    }
    if (data.confirmPassword.trim() === "") {
      this.renderToast("Confirm password cannot be blank")
    }
    if (data.password.trim() !== data.confirmPassword.trim()) {
      this.renderToast("Please Enter the same password in confirm password");
      return;
    }
    const nameregex = new RegExp("[a-zA-Z\s]");
    if (data.firstname.trim() === "" || data.lastname.trim() === "") {
      this.renderToast("Firstname and Lastname shouldn't be blank");
      return;
    }
    if (!data.firstname.match(nameregex) || !data.lastname.match(nameregex)) {
      this.renderToast("Your Firstname and Lastname should contain only letters");
      return;
    }


    if (data.address.trim() === "") {
      this.renderToast("Address field should not be empty");
      return;
    }
    this.renderSpinner();
    // console.log(JSON.stringify(data));
    try {

      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
      });

      // const result = await response.json();
      // console.log(response);
      // console.log("loading");
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        this.hideSpinner();
        this.renderToast(result.message, true);
        return;
      }

      state.userDetails.username = data.username;
      state.isUserLoggedIn = true;
      this.renderToast("User Registration Successful", true);
      localStorage.setItem("USESSIONID", result.USESSIONID);
      this.hideSpinner();
      router.navigateTo("/user-home");
    } catch (err) {
      console.log(err);
      this.renderToast("Cannot connect to server");
    }

  }

}

export default new UserRegisterView();
