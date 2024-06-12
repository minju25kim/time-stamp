// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  const dateObject = new Date();
  const unixDate = dateObject.getTime();
  const utcDate = dateObject.toUTCString();
  res.json({ unix: unixDate, utc: utcDate });
});

app.get("/api/:input", function (req, res) {
  const input = req.params.input;
  if (!isNaN(input)) {
    const unixTimestamp = parseInt(input);
    const dateObject = new Date(unixTimestamp);
    if (!isNaN(dateObject.getTime())) {
      const formattedDate = dateObject.toUTCString();
      res.json({ unix: unixTimestamp, utc: formattedDate });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } 
  else {
    const dateObject = new Date(input);
    if (!isNaN(dateObject.getTime())) {
      const unixTimestamp = dateObject.getTime();
      const utcDate = dateObject.toUTCString();
      res.json({ unix: unixTimestamp, utc: utcDate });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on port " +
      "http://localhost:" +
      listener.address().port
  );
});
