(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['login-page.hbs'] = template({
        "1": function (container, depth0, helpers, partials, data) {
            return "admin-login";
        }, "3": function (container, depth0, helpers, partials, data) {
            return "        Admin\r\n";
        }, "5": function (container, depth0, helpers, partials, data) {
            return "        User\r\n      ";
        }, "7": function (container, depth0, helpers, partials, data) {
            return "          User\r\n";
        }, "9": function (container, depth0, helpers, partials, data) {
            return "          Admin\r\n        ";
        }, "11": function (container, depth0, helpers, partials, data) {
            return "        <button\r\n          id=\"register-now-btn\"\r\n          class=\"btn btn-outline-secondary w-100 py-2\"\r\n          type=\"button\"\r\n        >\r\n          Register Now\r\n        </button>\r\n";
        }, "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
            var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = container.hooks.helperMissing, alias3 = "function", alias4 = container.escapeExpression, lookupProperty = container.lookupProperty || function (parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<nav class=\"navbar bg-dark\">\r\n  <div class=\"nav-brand\"></div>\r\n  <ul class=\"nav\">\r\n    <li class=\"nav-item\"> \r\n      <a class=\"nav-link text-light\" href=\"/"
                + ((stack1 = lookupProperty(helpers, "if").call(alias1, (depth0 != null ? lookupProperty(depth0, "user") : depth0), { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 5, "column": 44 }, "end": { "line": 5, "column": 74 } } })) != null ? stack1 : "")
                + "\">\r\n"
                + ((stack1 = lookupProperty(helpers, "if").call(alias1, (depth0 != null ? lookupProperty(depth0, "user") : depth0), { "name": "if", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.program(5, data, 0), "data": data, "loc": { "start": { "line": 6, "column": 6 }, "end": { "line": 10, "column": 13 } } })) != null ? stack1 : "")
                + " Login</a>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n<div class=\"form__container col-md-6 text-center\">\r\n  <div class=\"login mx-auto\">\r\n    <form id=\"login-form\">\r\n      <h1 class=\"h3 mb-3 fw-normal\">\r\n"
                + ((stack1 = lookupProperty(helpers, "if").call(alias1, (depth0 != null ? lookupProperty(depth0, "user") : depth0), { "name": "if", "hash": {}, "fn": container.program(7, data, 0), "inverse": container.program(9, data, 0), "data": data, "loc": { "start": { "line": 18, "column": 8 }, "end": { "line": 22, "column": 15 } } })) != null ? stack1 : "")
                + " Login</h1>\r\n      <div class=\"form-floating mb-3\">\r\n        <input\r\n          type=\"email\"\r\n          class=\"form-control\"\r\n          id=\"username\"\r\n          name=\"username\"\r\n          placeholder=\"name@example.com\"\r\n        />\r\n        <label for=\"username\">Email address</label>\r\n        <span class=\"form-text text-danger\"></span>\r\n      </div>\r\n      <div class=\"input-group\">\r\n        <div class=\"form-floating\">\r\n          <input\r\n            type=\"password\"\r\n            class=\"form-control\"\r\n            id=\""
                + alias4(((helper = (helper = lookupProperty(helpers, "type") || (depth0 != null ? lookupProperty(depth0, "type") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data, "loc": { "start": { "line": 39, "column": 16 }, "end": { "line": 39, "column": 24 } } }) : helper)))
                + "password\"\r\n            placeholder=\"Password\"\r\n            name=\""
                + alias4(((helper = (helper = lookupProperty(helpers, "type") || (depth0 != null ? lookupProperty(depth0, "type") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data, "loc": { "start": { "line": 41, "column": 18 }, "end": { "line": 41, "column": 26 } } }) : helper)))
                + "password\"\r\n          />\r\n          <label for=\""
                + alias4(((helper = (helper = lookupProperty(helpers, "type") || (depth0 != null ? lookupProperty(depth0, "type") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "type", "hash": {}, "data": data, "loc": { "start": { "line": 43, "column": 22 }, "end": { "line": 43, "column": 30 } } }) : helper)))
                + "password\">Password</label>\r\n        </div>\r\n        <span class=\"input-group-text show-password open\"><i\r\n            class=\"fa-solid fa-eye\"\r\n          ></i></span>\r\n      </div>\r\n      <span class=\"form-text text-danger d-block mb-3\"></span>\r\n      <button class=\"btn btn-primary w-100 py-2 mb-3\" type=\"submit\">\r\n        Sign in\r\n      </button>\r\n"
                + ((stack1 = lookupProperty(helpers, "if").call(alias1, (depth0 != null ? lookupProperty(depth0, "user") : depth0), { "name": "if", "hash": {}, "fn": container.program(11, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 53, "column": 6 }, "end": { "line": 61, "column": 13 } } })) != null ? stack1 : "")
                + "    </form>\r\n  </div>\r\n</div>";
        }, "useData": true
    });
})();