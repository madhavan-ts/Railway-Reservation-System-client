class HomeView {
  parentElement = document.querySelector(".container-fluid");

  constructor() {

  }

  render() {
    this.parentElement.innerHTML = "";
    this.parentElement.innerHTML = this.getHTML();
  }


  getHTML() {
    return `
      <p>Home Page</p>
      <a href="/login">Go to Login Page</a>
      <br>
      <a href="/admin-login"> Go to Admin Login page
    `;
  }


}

export default new HomeView();