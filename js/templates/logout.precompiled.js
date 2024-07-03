(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['logout-page.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    User\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    Admin\r\n  ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"w-100 text-center\">\r\n  <p class=\"fs-4\" >You have been logged out of the \r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":7,"column":9}}})) != null ? stack1 : "")
    + " page</p>\r\n  <p> You will be redirected to Homepage in <span id=\"seconds\"></span></p>\r\n</div>";
},"useData":true});
})();