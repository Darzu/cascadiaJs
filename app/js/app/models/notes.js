define(["backbone", "underscore", "app/models/note"], function(Backbone, _, NoteModel) {
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });

  return NotesCollection;
});
