Handlebars.registerHelper("caps", (str) => str.toUpperCase());


Handlebars.registerHelper("isConfirmed", (ticketStatus) => ticketStatus === 'confirmed');


Handlebars.registerHelper("formatDate", (dateOfJourney) => new Date(dateOfJourney).toLocaleDateString({
  weekday:
    'short', dateStyle: "medium"
}));

export default Handlebars;