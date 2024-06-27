// views contain generic methods such as the renderToast, renderSpinner 

export default class View {

  renderAlert(parentElement, message, type = "danger") {
    const alertElement = document.createElement("div");
    alertElement.classList.add(`alert`, `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.innerText = message;
    parentElement.insertAdjacentElement("afterbegin", alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 3500);
  }

  renderToast(message, success = false) {
    let toastElement = document.getElementById("toast");
    toastElement.innerHTML = `<div class="toast position-fixed align-items-center text-bg-${success ? "success" : "danger"} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;

    let toast = new bootstrap.Toast(".toast");
    toast.show();

    setTimeout(() => {
      toast.hide();
    }, 2000);
  }

  renderSpinner() {
    let loadingElement = document.getElementById("loading");
    loadingElement.classList.add("position-fixed", "top-0", "bottom-0", "d-flex", "justify-content-center", "align-items-center", "w-100", "bg-body-dark");
    loadingElement.innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
  }

  hideSpinner() {
    let loadingElement = document.getElementById("loading");
    loadingElement.innerHTML = "";
    loadingElement.classList.remove(...loadingElement.classList);

  }
}