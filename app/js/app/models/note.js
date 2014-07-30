define(["backbone", "underscore"], function(Backbone, _) {
  var NoteModel = Backbone.Model.extend({
    defaults: { title: "", text: "*Add Note!*" }
  });

  return NoteModel;
});