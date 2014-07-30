// SKELETON
/**
 * Application.
 *
 * This file is usually the "binding" of all of the individual Backbone.js
 * components into a unified whole. It is also typically *not* unit tested
 * because it has side effects from just running it. So, here is the expected
 * place to also do things like start Backbone.js History, do `$()` DOM
 * manipulation, etc.
 */
define([
  "jquery",
  "underscore",
  "backbone",

  // Import and compile a HBS template.
  // For real application, remove this import (and the real file) and replace
  // with imports for your Backbone components needed to bootstrap the full
  // application. Likely this means a collection and router.
  "hbs!app/templates/notes",
  "hbs!app/templates/note",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  _,
  Backbone,
  notesTmpl,
  noteTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------

  var NoteModel = Backbone.Model.extend({
    defaults: { title: "", text: "*Add Note!*" }
  });

  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });

  var notesCollection = new NotesCollection();

  var $note = $("<div><h1>One Note</h1><div id='note' /></div>");
  var $notes = $("<div><h1>My Notes</h1><div id='notes' /></div>");

  var NoteView = Backbone.View.extend({
    el: "#note",
    template: noteTmpl,
    initialize: function() {
      if (!this.model) {throw "No model!"}
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  var NotesView = Backbone.View.extend({
    el: "#notes",
    template: notesTmpl,
    initialize: function() {
      if (!this.collection) {throw "No collection!"}
      this.listenTo(this.collection, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      "": "notes",
      ":id": "note"
    },
    notes: function() {
      //all notes
      $("body").html($notes);

      var notesView = new NotesView({
        collection: notesCollection
      });
      notesView.render();
    },
    note: function(id) {
      //single notes
      $("body").html($note);

      var noteView = new NoteView({
        model: notesCollection.at(id)
      });
      noteView.render();
    }
  });

  var router = new Router();

  Backbone.History.started || Backbone.history.start();

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  
  $(function () {
    
    notesCollection.localStorage._clear();

     _.each(["Hi", "Hello", "Hola"], function (msg) {
      notesCollection.create({ title: msg, text: msg });
    });

    notesCollection.fetch({ reset: true }); // Use existing models!
    
  });
});
