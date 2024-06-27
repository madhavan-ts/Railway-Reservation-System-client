import AdminHomePageView from "./views/AdminHomePageView.js";
import BookingView from "./views/user/BookingView.js";
import HomeView from "./views/HomeView.js";
import UserLoginView from "./views/user/UserLoginView.js";
import UserRegisterView from "./views/user/UserRegisterView.js";
import AdminLoginView from "./views/AdminLoginView.js";
import UserHomePageView from "./views/user/UserHomePageView.js";

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
      pathname: "/book-ticket",
      view: BookingView,
      title: "Book Ticket"
    },
    {
      pathname: "/admin-login",
      view: AdminLoginView,
      title: "Book Ticket"
    },
    {
      pathname: "/admin-home",
      view: AdminHomePageView,
      title: "Admin Home"
    },
    {
      pathname: "/user-home",
      view: UserHomePageView,
      title: "User Home"
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