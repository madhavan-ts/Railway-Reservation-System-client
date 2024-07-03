(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pnr-details.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p> PNR No : "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"pnr") || (depth0 != null ? lookupProperty(depth0,"pnr") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pnr","hash":{},"data":data,"loc":{"start":{"line":16,"column":17},"end":{"line":16,"column":24}}}) : helper)))
    + "</p>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"fw-bold \"> Number of seat alloted for the waiting passengers : "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"alloted") || (depth0 != null ? lookupProperty(depth0,"alloted") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"alloted","hash":{},"data":data,"loc":{"start":{"line":19,"column":77},"end":{"line":19,"column":88}}}) : helper)))
    + "</p>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],{"name":"with","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":23,"column":2},"end":{"line":76,"column":11}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"card\" \r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isConfirmed")||(depth0 && lookupProperty(depth0,"isConfirmed"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"ticketStatus") : depth0),{"name":"isConfirmed","hash":{},"data":data,"loc":{"start":{"line":25,"column":12},"end":{"line":25,"column":38}}}),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":25,"column":6},"end":{"line":29,"column":13}}})) != null ? stack1 : "")
    + "    >\r\n      <div class=\"card-header d-flex justify-content-between\">\r\n        Passenger Details\r\n      </div>\r\n      <div class=\"card-body\">\r\n      <div class=\"d-flex gap-2 justify-content-between\">\r\n          <span>Name : </span>\r\n          <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"passengerName") || (depth0 != null ? lookupProperty(depth0,"passengerName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passengerName","hash":{},"data":data,"loc":{"start":{"line":37,"column":16},"end":{"line":37,"column":33}}}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"d-flex gap-2 justify-content-between\">\r\n          <span>Gender : </span>\r\n          <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"passengerGender") || (depth0 != null ? lookupProperty(depth0,"passengerGender") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passengerGender","hash":{},"data":data,"loc":{"start":{"line":41,"column":16},"end":{"line":41,"column":35}}}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"d-flex gap-2 justify-content-between\">\r\n          <span>Age : </span>\r\n          <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"passengerAge") || (depth0 != null ? lookupProperty(depth0,"passengerAge") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passengerAge","hash":{},"data":data,"loc":{"start":{"line":45,"column":16},"end":{"line":45,"column":32}}}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"d-flex gap-2 justify-content-between\">\r\n          <span>Status : </span>\r\n          <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isConfirmed")||(depth0 && lookupProperty(depth0,"isConfirmed"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"ticketStatus") : depth0),{"name":"isConfirmed","hash":{},"data":data,"loc":{"start":{"line":49,"column":29},"end":{"line":49,"column":55}}}),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":49,"column":23},"end":{"line":53,"column":31}}})) != null ? stack1 : "")
    + "\">\r\n            "
    + alias4((lookupProperty(helpers,"caps")||(depth0 && lookupProperty(depth0,"caps"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"ticketStatus") : depth0),{"name":"caps","hash":{},"data":data,"loc":{"start":{"line":54,"column":12},"end":{"line":54,"column":33}}}))
    + "\r\n          </span>\r\n        </div>\r\n        \r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isConfirmed")||(depth0 && lookupProperty(depth0,"isConfirmed"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"ticketStatus") : depth0),{"name":"isConfirmed","hash":{},"data":data,"loc":{"start":{"line":58,"column":14},"end":{"line":58,"column":40}}}),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":58,"column":8},"end":{"line":72,"column":15}}})) != null ? stack1 : "")
    + "      \r\n    </div>\r\n    </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        data-confirmed-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ticketID") || (depth0 != null ? lookupProperty(depth0,"ticketID") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ticketID","hash":{},"data":data,"loc":{"start":{"line":26,"column":27},"end":{"line":26,"column":39}}}) : helper)))
    + "\"\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        data-waiting-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ticketID") || (depth0 != null ? lookupProperty(depth0,"ticketID") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ticketID","hash":{},"data":data,"loc":{"start":{"line":28,"column":25},"end":{"line":28,"column":37}}}) : helper)))
    + "\"\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "\r\n                          text-success\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                          text-danger\r\n                        ";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"d-flex gap-2 justify-content-between\">\r\n            <span>Seat No : </span>\r\n            <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"seatNo") || (depth0 != null ? lookupProperty(depth0,"seatNo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"seatNo","hash":{},"data":data,"loc":{"start":{"line":61,"column":18},"end":{"line":61,"column":28}}}) : helper)))
    + "</span>\r\n          </div>\r\n          <div class=\"d-flex gap-2 justify-content-between\">\r\n            <span>Compartment No : </span>\r\n            <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"compartmentNo") || (depth0 != null ? lookupProperty(depth0,"compartmentNo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"compartmentNo","hash":{},"data":data,"loc":{"start":{"line":65,"column":18},"end":{"line":65,"column":35}}}) : helper)))
    + "</span>\r\n          </div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"d-flex gap-2 justify-content-between\">\r\n            <span>Waiting List No : </span>\r\n            <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"waitingListNo") || (depth0 != null ? lookupProperty(depth0,"waitingListNo") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"waitingListNo","hash":{},"data":data,"loc":{"start":{"line":70,"column":18},"end":{"line":70,"column":35}}}) : helper)))
    + "</span>\r\n          </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"d-flex flex-column align-items-center\">\r\n  <span class=\"fs-5 fw-bold\">\r\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"trainNo") || (depth0 != null ? lookupProperty(depth0,"trainNo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trainNo","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":15}}}) : helper)))
    + "\r\n    -\r\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"trainName") || (depth0 != null ? lookupProperty(depth0,"trainName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trainName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":17}}}) : helper)))
    + "\r\n  </span>\r\n  <span>Date Of Journey - "
    + alias4((lookupProperty(helpers,"formatDate")||(depth0 && lookupProperty(depth0,"formatDate"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"dateOfJourney") : depth0),{"name":"formatDate","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":7,"column":26},"end":{"line":7,"column":54}}}))
    + "</span>\r\n  <span>Departure time : "
    + alias4(((helper = (helper = lookupProperty(helpers,"startTime") || (depth0 != null ? lookupProperty(depth0,"startTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startTime","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":8,"column":25},"end":{"line":8,"column":38}}}) : helper)))
    + "</span>\r\n  <div class=\"d-flex flex-column flex-md-row gap-md-3 align-items-center\">\r\n    <span class=\"fs-6\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"fromStationName") || (depth0 != null ? lookupProperty(depth0,"fromStationName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fromStationName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":10,"column":23},"end":{"line":10,"column":42}}}) : helper)))
    + " ("
    + alias4(((helper = (helper = lookupProperty(helpers,"fromStationID") || (depth0 != null ? lookupProperty(depth0,"fromStationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fromStationID","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":10,"column":44},"end":{"line":10,"column":61}}}) : helper)))
    + ")</span>\r\n    <span>-</span>\r\n    <span class=\"fs-6\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"toStationName") || (depth0 != null ? lookupProperty(depth0,"toStationName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"toStationName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":12,"column":23},"end":{"line":12,"column":40}}}) : helper)))
    + " ("
    + alias4(((helper = (helper = lookupProperty(helpers,"toStationID") || (depth0 != null ? lookupProperty(depth0,"toStationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"toStationID","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":12,"column":42},"end":{"line":12,"column":57}}}) : helper)))
    + ")</span>\r\n  </div>\r\n  <p class=\"my-2\"> CLASS : "
    + alias4(((helper = (helper = lookupProperty(helpers,"className") || (depth0 != null ? lookupProperty(depth0,"className") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"className","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":14,"column":27},"end":{"line":14,"column":40}}}) : helper)))
    + "</p>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pnr") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":15,"column":2},"end":{"line":17,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"alloted") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":18,"column":2},"end":{"line":20,"column":9}}})) != null ? stack1 : "")
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"status") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":22,"column":0},"end":{"line":77,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();