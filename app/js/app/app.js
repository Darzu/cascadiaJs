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
  "backbone.localStorage",

  // Import and compile a HBS template.
  // For real application, remove this import (and the real file) and replace
  // with imports for your Backbone components needed to bootstrap the full
  // application. Likely this means a collection and router.
  "hbs!app/templates/notes",
  "hbs!app/templates/note",
  "app/models/notes",
  "app/models/note",

  // Polyfill JSON for old browsers.
  "json2"
], function (
  $,
  _,
  Backbone,
  BackboneLocalStorage,
  notesTmpl,
  noteTmpl,
  NotesCollection,
  NoteModel
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------

  var notesCollection = new NotesCollection();

  var $note = $("<div><h1>One Note</h1><div id='note' /></div>");
  var $notes = $("<div><h1>My Notes</h1><div id='notes' /></div>");

  var NoteView = Backbone.View.extend({
    el: "#note",
    template: noteTmpl,
    events: {
      "click": "clicked"
    },
    initialize: function() {
      if (!this.model) {throw "No model!"}
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
    clicked: function(ev) {
      Backbone.history.navigate("", {trigger: true});
    }
  });

  var NotesView = Backbone.View.extend({
    el: "#notes",
    template: notesTmpl,
    events: {
      "click li": "clicked"
    },
    initialize: function() {
      if (!this.collection) {throw "No collection!"}
      this.listenTo(this.collection, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    },
    clicked: function(ev) {
      var id = $(ev.currentTarget).index().toString();
      Backbone.history.navigate(id, {trigger: true});
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
