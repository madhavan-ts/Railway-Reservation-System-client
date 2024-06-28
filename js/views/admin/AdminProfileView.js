class AdminProfileView {
  parentElement;

  constructor() {

  }

  render() {
    this.parentElement = document.querySelector(".admin__content");
    this.parentElement.innerHTML = this.getHTML();
    this.addEventListeners();
  }
  getHTML() {
    return `
      <div>Admin Profile Page View</div>
    `;
  }

  addEventListeners() {

  }
}

export default new AdminProfileView()