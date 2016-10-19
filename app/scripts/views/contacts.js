window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');
var Backbone = require('backbone');
var contactFormTemplate = require('../templates/contactforms.hbs');
var contactTableTemplate = require('../templates/contacttable.hbs');

var ContactInstructionView = Backbone.View.extend({
  tagName: 'h3',
  attributes: {
    id: 'instructions',
    'class': 'col-md-12 text-center contact-instructions'
  },
  render: function(){
    this.$el.text('Enter your Contact information.');

    return this;
  }
});

var ContactsFormView = Backbone.View.extend({
  tagName: 'form',
  template: contactFormTemplate,
  attributes: {
    'class': 'form-horizontal well'
  },
  events: {
    'submit': 'addContact'
  },
  addContact: function(event){
    event.preventDefault();

    var contactEmail = $('#email').val();
    var contactName = $('#name').val();
    var contactNumber = $('#phone-number').val();
    var twitterName = $('#twitter-username').val();
    this.collection.create({
      email: contactEmail,
      name: contactName,
      'phone-number': contactNumber,
      twitter: twitterName
    });

    $('#email').val('');
    $('#name').val('');
    $('#phone-number').val('');
    $('#twitter-username').val('');
  },
  render: function(){
    var renderedTemp = this.template();
    this.$el.html(renderedTemp);

    return this;
  }
});

var ContactsTableView = Backbone.View.extend({
  tagName: 'table',
  attributes: {
    'class': 'table table-bordered'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContactTable)
    this.$el.append(
      '<thead>'+ '<tr>' + '<th>' + 'Email' + '</th>' + '<th>' + 'Name' + '</th>'
      + '<th>' + 'Phone Number' + '</th>' + '<th>' + 'Twitter' + '</th>');
  },
  renderContactTable: function(contact){
    var contactRow = new ContactRowView({model: contact});


    this.$el.append(contactRow.render().el);
  }
});

var ContactRowView = Backbone.View.extend({
  tagName: 'tbody',
  template: contactTableTemplate,
  render: function(){
    var context = this.model.toJSON();
    var rowTemp = this.template(context);
    this.$el.html(rowTemp);

    return this;
  }
});

module.exports = {
  ContactInstructionView: ContactInstructionView,
  ContactsFormView: ContactsFormView,
  ContactsTableView: ContactsTableView
};
