(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <li\r\n            data-target=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "\"\r\n            class=\"nav-item nav-link text-light rounded px-2 mx-2 pointer\"\r\n          >\r\n          "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "\r\n          </li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row m-0 w-100\">\r\n  <nav id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":2,"column":11},"end":{"line":2,"column":19}}}) : helper)))
    + "_navbar\" class=\"navbar navbar-expand-md text-light bg-dark\">\r\n    <div class=\"container-fluid p-2\">\r\n      <button\r\n        class=\"navbar-toggler p-2 text-bg-light\"\r\n        type=\"button\"\r\n        data-bs-toggle=\"collapse\"\r\n        data-bs-target=\"#"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":8,"column":25},"end":{"line":8,"column":33}}}) : helper)))
    + "NavBarToggle\"\r\n        aria-controls=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":9,"column":23},"end":{"line":9,"column":31}}}) : helper)))
    + "NavBarToggle\"\r\n        aria-expanded=\"false\"\r\n        aria-label=\"Toggle navigation\"\r\n      >\r\n        <span class=\"navbar-toggler-icon text-light\"></span>\r\n      </button>\r\n      <div class=\"collapse navbar-collapse\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":15,"column":48},"end":{"line":15,"column":56}}}) : helper)))
    + "NavBarToggle\">\r\n        <ul class=\"navbar-nav me-auto mt-2 mb-2 mb-lg-0 gap-2\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"links") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":24,"column":17}}})) != null ? stack1 : "")
    + "        </ul>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n  <div class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":29,"column":14},"end":{"line":29,"column":22}}}) : helper)))
    + "__content p-4\"></div>\r\n</div>";
},"useData":true});
})();