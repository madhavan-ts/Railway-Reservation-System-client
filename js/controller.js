import View from "./views/View.js"
import { loadRoutes, loadStations, loadTrains, loadTrips, state } from "./models.js";
import router from "./router.js";
import HomeView from "./views/HomeView.js";

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});

loadRoutes();
loadStations();
loadTrains();
loadTrips();

window.onload = () => {
  let view = new View();
  view.renderSpinner();
  router.navigateTo("/");

  view.hideSpinner();
}


