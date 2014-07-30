define(["backbone", "app/models/note"], function(Backbone, NoteModel) {

  describe("app/models/note", function() {

    beforeEach(function() {
      this.model = new NoteModel();
    });
    afterEach(function() {
      this.model = null;
    });

    it("is a bb model", function() {
      expect(this.model)
        .to.be.an.instanceof(Backbone.Model);
    });

    it("should have expected defaults", function() {
      expect(this.model.get("title")).to.equal("");
      expect(this.model.get("text")).to.contain("Add Note");
    });
    it("can set the title property");
    it("can set the text property");
  });

});
