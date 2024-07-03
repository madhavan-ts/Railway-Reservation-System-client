import router from "../router.js";

class HomeView {
  parentElement = document.querySelector(".container-fluid");

  constructor() {

  }

  render() {
    router.navigateTo("/user-login");
  }



}

export default new HomeView();