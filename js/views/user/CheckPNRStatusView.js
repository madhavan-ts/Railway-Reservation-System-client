import { BASE_URL } from "../../config.js";
import Handlebars from "../../helpers.js";
import { getDataAsJSON, getHandlebar } from "../../models.js";
import View from "../View.js";

class CheckPNRStatusView extends View {
  parentElement;
  constructor() {
    super();
  }

  async render() {
    this.parentElement = document.querySelector(".user__content");
    let pnrForm = Handlebars.templates["pnr-forms.hbs"];
    // console.log(pnrForm);
    this.parentElement.innerHTML = pnrForm();
    this.addEventHandlers();
  }

  async renderPNRDetails(pnrDetails) {
    let pnrDetailTemplate = Handlebars.templates["pnr-details.hbs"]
    document.getElementById("pnr_details").innerHTML = pnrDetailTemplate(pnrDetails);
  }


  addEventHandlers() {
    const pnrForm = document.getElementById("check-pnr-form");
    pnrForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      document.getElementById("pnr_details").innerHTML = "";
      const formData = new FormData(pnrForm);

      try {
        const result = await getDataAsJSON(`${BASE_URL}/api/train/view-status?pnrNo=${formData.get("pnrno")}`)
        console.log(result);
        if (result.success === true) {
          if (result.status.length === 0) {
            this.renderAlert(pnrForm, "PNR Number doesn't exist ");
          } else {
            this.renderPNRDetails(result);
          }
        } else {
          this.renderAlert(pnrForm, "Couldn't fetch PNR Details");
        }
      } catch (err) {
        console.log(err);
      }
    })

  }

}

export default new CheckPNRStatusView();