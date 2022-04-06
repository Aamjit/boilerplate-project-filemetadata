var express = require("express");
var cors = require("cors");
const formidable = require("formidable");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

app.post("/api/fileanalyse", (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error", err);
    } else {
      console.log("Fields: ", fields);
      console.log("Files: ", files);
      res.json({
        name: files.upfile.originalFilename,
        type: files.upfile.mimetype,
        size: files.upfile.size,
      });
      // for (const file of Object.entries(files)) {
      //   console.log(file);
    }
  });
});
