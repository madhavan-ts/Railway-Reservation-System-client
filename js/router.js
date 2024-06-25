import AdminHomePageView from "./views/AdminHomePageView.js";
import BookingView from "./views/user/BookingView.js";
import HomeView from "./views/HomeView.js";
import TrainSearchView from "./views/user/TrainSearchView.js";
import UserLoginView from "./views/user/UserLoginView.js";
import UserRegisterView from "./views/user/UserRegisterView.js";

class Router {
  routes = [
    {
      pathname: "/",
      view: HomeView,
      title: "Home Page"
    },
    {
      pathname: "/register",
      view: UserRegisterView,
      title: "User Register Page"
    },
    {
      pathname: "/login",
      view: UserLoginView,
      title: "User Login Page"
    },
    {
      pathname: "/train-search",
      view: TrainSearchView,
      title: "Search Trains"
    },
    {
      pathname: "/book-ticket",
      view: BookingView,
      title: "Book Ticket"
    },
    {
      pathname: "/admin-home",
      view: AdminHomePageView,
      title: "Admin Home"
    }
  ]

  navigateTo(pathname) {
    const foundPath = this.routes.find(item => item.pathname === pathname)
    if (foundPath) {
      let viewToBeRendered = foundPath.view;
      viewToBeRendered.render();
    } else {
      HomeView.render();
    }
  }

}

export default new Router();