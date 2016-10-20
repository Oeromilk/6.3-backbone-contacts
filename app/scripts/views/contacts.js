window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');
var Backbone = require('backbone');
var contactFormTemplate = require('../../templates/contactforms.hbs');
var contactTableTemplate = require('../../templates/contacttable.hbs');

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
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.collection, 'add', this.renderContactTable);
    this.$el.append(
      '<thead>'+ '<tr>' + '<th>' + 'Email' + '</th>' + '<th>' + 'Name' + '</th>'
      + '<th>' + 'Phone Number' + '</th>' + '<th>' + 'Twitter' + '</th>' + '<th>'
      + 'Actions' + '</th>' + '</tr>' + '</thead>');
  },
  renderContactTable: function(contact){
    var contactRow = new ContactRowView({model: contact});


    this.$el.append(contactRow.render().el);
  }
});

var ContactRowView = Backbone.View.extend({
  tagName: 'tbody',
  template: contactTableTemplate,
  events: {
    'click #remove': 'remove',
    'click #update': 'update'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
  },
  render: function(){
    var context = this.model.toJSON();
    var rowTemp = this.template(context);
    this.$el.html(rowTemp);

    return this;
  },
  remove: function(){
    confirmModal.model = this.model;

    confirmModal.show();
  },
  update: function(){
    submissionModal.model = this.model;

    submissionModal.show();
  }
});

var ContactConfirmModal = Backbone.View.extend({
  el: $('#confirm-modal')[0],
  events: {
    'click #delete-contact': 'delete'
  },
  hide: function(){
    this.$el.modal('hide');
  },
  show: function(){
    this.$el.modal('show');
  },
  delete: function(){
    this.model.destroy();

    this.hide();
  }
});

var confirmModal = new ContactConfirmModal();

var ContactSubmissionModal = Backbone.View.extend({
  el: $('#resubmit-modal')[0],
  events: {
    'submit .addContact': 'addContact'
  },
  hide: function(){
    this.$el.modal('hide');
  },
  show: function(){
    this.$el.modal('show');
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
  }
});

var submissionModal = new ContactSubmissionModal();

module.exports = {
  ContactInstructionView: ContactInstructionView,
  ContactsFormView: ContactsFormView,
  ContactsTableView: ContactsTableView
};
