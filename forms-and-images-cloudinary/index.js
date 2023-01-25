require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const PORT = process.env.PORT || 8000;
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// View Template Middlewares
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/mygetapi", (req, res) => {
  console.log(req.query); // Template Engine data comes from query
  console.log(req.body); // UI Lib. or Frameworks(eg. React, Vue) data comes from body
  res.send(req.query);
  //   res.send(req.body);
});

app.post("/mypostapi", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  //   #*#*#*#*#*#* USE-CASE FOR SINGLE IMAGE UPLOAD *#*#*#*#*#

  if (req.files.samplefile.length) {
    for (let i = 0; i < req.files.samplefile.length; i++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[i]?.tempFilePath,
        {
          folder: "users",
        }
      );
    imageArray.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
    }
  }

  //   #*#*#*#*#*#* USE-CASE FOR SINGLE IMAGE UPLOAD *#*#*#*#*#
  //   let file = req.files.samplefile;
  //   let result = await cloudinary.uploader.upload(file?.tempFilePath, {
  //     folder: "users",
  //   });

  console.log(result);

  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray,
  };
  console.log(details);

  res.send(details);
});

app.get("/mygetform", (req, res) => {
  res.render("get-form");
});

app.get("/mypostform", (req, res) => {
  res.render("post-form");
});

app.listen(PORT, (req, res) => {
  console.log(`App listening at port --> http://localhost:${PORT}`);
});
