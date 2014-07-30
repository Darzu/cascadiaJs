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

  // TODO: Print out notes containing an "o" in `text`
  // HINT: There's a useful underscore method

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  
  $(function () {
    
    notesCollection.localStorage._clear();

     _.each(["Hi", "Hello", "Hola"], function (msg) {
      notesCollection.create({ title: msg, text: msg });
    });

    notesCollection.fetch({ reset: true }); // Use existing models!

    //single notes
    var note = notesCollection.at(1);
    $("body").append($(noteTmpl(note.toJSON())));

    //all notes
    $("body").append($(notesTmpl(notesCollection.toJSON())));
    
  });
});
