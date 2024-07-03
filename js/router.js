import AdminHomePageView from "./views/admin/AdminHomePageView.js";
import BookingView from "./views/user/BookingView.js";
import HomeView from "./views/HomeView.js";
import UserLoginView from "./views/user/UserLoginView.js";
import UserRegisterView from "./views/user/UserRegisterView.js";
import AdminLoginView from "./views/admin/AdminLoginView.js";
import UserHomePageView from "./views/user/UserHomePageView.js";

class Router {
  routes = [
    {
      pathname: "/",
      view: UserLoginView,
      title: "User Login Page",
    },
    {
      pathname: "/register",
      view: UserRegisterView,
      title: "User Register Page",
    },
    // {
    //   pathname: "/user-login",
    //   view: UserLoginView,
    //   title: "User Login Page",
    // },
    {
      pathname: "/book-ticket",
      view: BookingView,
      title: "Book Ticket",
    },
    {
      pathname: "/admin-login",
      view: AdminLoginView,
      title: "Admin Login",
    },
    {
      pathname: "/admin-home",
      view: AdminHomePageView,
      title: "Admin Home",
    },
    {
      pathname: "/user-home",
      view: UserHomePageView,
      title: "User Home",
    },
  ];

  navigateTo(pathname) {
    const foundPath = this.routes.find((item) => item.pathname === pathname);
    if (foundPath) {
      document.title = foundPath.title;
      let viewToBeRendered = foundPath.view;
      viewToBeRendered.render();
      // history.pushState(null, null, pathname);
    } else {
      UserLoginView.render();
    }
  }
  redirectTo(pathname) {
    const foundPath = this.routes.find((item) => item.pathname === pathname);
    if (foundPath) {
      document.title = foundPath.title;
      let viewToBeRendered = foundPath.view;
      viewToBeRendered.render();
    } else {
      UserLoginView.render();
    }
  }
}

export default new Router();
