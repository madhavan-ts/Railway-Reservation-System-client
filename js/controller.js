import View from "./views/View.js"
import { getHandlebar, loadRoutes, loadStations, loadTrains, loadTrips, state } from "./models.js";
import router from "./router.js";
import HomeView from "./views/HomeView.js";
import Handlebars from "./helpers.js";
import { BASE_URL } from "./config.js";

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});


window.onload = async () => {
  let view = new View();
  view.renderSpinner();
  if (localStorage.getItem("USESSIONID")) {
    const data = {
      USESSIONID: localStorage.getItem("USESSIONID")
    }
    try {
      const response = await fetch(`${BASE_URL}/api/users/validate`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        state.isUserLoggedIn = true;
        state.userDetails.username = result.username;
        router.redirectTo("/user-home");
      } else {
        router.redirectTo("/");
      }
      view.hideSpinner();
    } catch (err) {
      console.log(err);
      view.renderToast("Error Occrued");
      view.hideSpinner();
    }
  } else if (localStorage.getItem("ASESSIONID")) {
    const data = {
      ASESSIONID: localStorage.getItem("ASESSIONID")
    }
    try {
      const response = await fetch(`${BASE_URL}/api/admin/validate`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        state.isAdminLoggedIn = true;
        state.adminDetails.username = result.username;
        await loadRoutes();
        await loadStations();
        await loadTrains();
        await loadTrips();
        router.redirectTo("/admin-home");
      } else {
        router.redirectTo("/");
      }
      view.hideSpinner();
    } catch (err) {
      console.log(err);
      view.renderToast("Error Occrued");
      view.hideSpinner();
    }
  }
  else {
    router.navigateTo("/");
    view.hideSpinner();
  }
}

// onpopstate = event => {
//   event.preventDefault();
//   router.redirectTo(window.location.pathname);
//   // console.log(event);
// }
