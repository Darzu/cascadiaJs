var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  PORT = process.env.PORT || 3000;

// Static routes.
app.use("/", express["static"]("app"));
app.use("/app", express["static"]("app"));
app.use("/test", express["static"]("test"));

// REST backend.
app.get("/notes/:id", function (req, res) {
  // **NOTE**: This should be replaced with an **actual** backend datastore
  // retrieval. For starters, we just pass through the id and give dummy data.
  res.json({
    id: req.params.id,
    title: "title # " + req.params.id,
    text: "text # " + req.params.id
  });
});

// Other configuration and startup.
app.use(bodyParser());
app.listen(PORT);
