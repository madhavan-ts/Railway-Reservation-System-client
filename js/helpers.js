Handlebars.registerHelper("caps", (str) => str.toUpperCase());


Handlebars.registerHelper("isConfirmed", (ticketStatus) => ticketStatus === 'confirmed');


Handlebars.registerHelper("formatDate", (dateOfJourney) => new Date(dateOfJourney).toLocaleDateString());

export default Handlebars;