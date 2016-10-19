var $ = require('jquery');
var models = require('./models/contacts.js');
var views = require('./views/contacts.js');

$(function(){
  var contacts = new models.ContactCollection();
  console.log(contacts);

  var contactInformation = new views.ContactInstructionView({collection: contacts});
  $('#instructions').append(contactInformation.render().el);

  var contactForm = new views.ContactsFormView({collection: contacts});
  $('.app').append(contactForm.render().el);

  var contactTable = new views.ContactsTableView({collection: contacts});
  $('.table-temp').append(contactTable.render().el);




  contacts.fetch();
  // contacts.add([
  //   {'email': 'faker@gmail.com', 'name': 'Faker Smith', 'phone-number': '555-555-1234', 'twitter': '@faker'},
  //   {'email': 'bigdaddy@gmail.com', 'name': 'Daddy Smith', 'phone-number': '555-555-0001', 'twitter': '@bigdaddy'},
  //   {'email': 'japple@gmail.com', 'name': 'Johnny Apple', 'phone-number': '555-555-7777', 'twitter': '@japp'}
  // ]);

});
