(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pnr-forms.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row w-100 m-0\">\r\n  <div class=\"col-md-8 my-3 mx-auto p-4 p-md-0\">\r\n    <h2 class=\"h2\">Check PNR status</h2>\r\n    <form id=\"check-pnr-form\">\r\n      <div class=\"form-floating mb-3\">\r\n        <input\r\n          type=\"number\"\r\n          class=\"form-control\"\r\n          placeholder=\"PNR Number\"\r\n          name=\"pnrno\"\r\n          required\r\n        />\r\n        <label for=\"pnrno\">PNR Number</label>\r\n      </div>\r\n      <button class=\"btn btn-primary text-uppercase fw-medium\">\r\n        Check\r\n      </button>\r\n    </form>\r\n    <div class=\"my-3 d-flex flex-column gap-3\" id=\"pnr_details\"></div>\r\n  </div>\r\n</div>";
},"useData":true});
})();