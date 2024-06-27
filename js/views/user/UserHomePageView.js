import View from "../View.js";
import CancelTicketView from "./CancelTicketView.js";

import CheckPNRStatusView from "./CheckPNRStatusView.js";
import TrainFormsView from "./TrainFormsView.js";


class UserHomePageView extends View {
  links = [
    { label: "Book Ticket", view: TrainFormsView },
    { label: "PNR Status", view: CheckPNRStatusView },
    { label: "Cancel Ticket", view: CancelTicketView },
  ];
  parentElement = document.querySelector(".container-fluid");
  constructor() {
    super();
  }

  render() {
    this.parentElement.innerHTML = this.getHTML();
    this.addEventHandlers();
    // console.log(this.links);
    console.log(document.querySelector(`#user_navbar li[data-target="Book Ticket"]`));
    document.querySelector(`#user_navbar li[data-target="Book Ticket"]`).classList.add("bg-primary");
    TrainFormsView.render();

  }

  getHTML() {
    return `
    <div class="row w-100 m-0">
      <nav id="user_navbar" class="navbar navbar-expand-md  text-light bg-dark">
        <div class="container-fluid p-2">
          <button class="navbar-toggler p-2 text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#userNavBarToggle" aria-controls="userNavBarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-light "></span>
          </button>
          <div class="collapse navbar-collapse" id="userNavBarToggle">
            <ul class="navbar-nav me-auto mt-2 mb-2 mb-lg-0 gap-2">
            ${this.links.map(item => `<li data-target="${item.label}" class="nav-item nav-link text-light rounded px-2 mx-2">
              ${item.label}
            </li>`).join("")}    
            </ul>
          </div>
        </div>
      </nav>
      <div class="user__content p-0 w-100"></div>
    </div>`;
  }


  addEventHandlers() {
    const sidebar = document.getElementById("user_navbar");
    sidebar.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.closest("ul").querySelectorAll("li").forEach(element => {
          element.classList.remove("bg-primary");
        });
        event.target.classList.add("bg-primary");

        const viewToBeRendered = this.links.find(item => item.label === event.target.innerText);
        viewToBeRendered.view.render();
      }
    })
  }

}
export default new UserHomePageView();
