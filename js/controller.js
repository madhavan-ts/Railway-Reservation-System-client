import { loadRoutes, loadStations, loadTrains, loadTrips, state } from "./models.js";
import router from "./router.js";
import AdminHomePageView from "./views/AdminHomePageView.js";
import AdminLoginView from "./views/AdminLoginView.js";
import HomeView from "./views/HomeView.js";
import TrainFormsView from "./views/user/TrainFormsView.js";
import TrainSearchView from "./views/user/TrainSearchView.js";
import UserLoginView from "./views/user/UserLoginView.js";

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    // console.log("Href", event.target.getAttribute("href"));
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});


loadRoutes();
loadStations();
loadTrains();
loadTrips();
// router.navigateTo("/admin-home");
// console.log(state);

window.onload = () => TrainFormsView.render(state.stations);


