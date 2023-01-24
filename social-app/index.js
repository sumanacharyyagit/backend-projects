require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dateFormat = require("date-format");
// Swagger Docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.get("/api/v1/instagram", (req, res) => {
  const instaSocial = {
    userName: "sumanacharyyainsta",
    followers: 100,
    follows: 40,
    date: dateFormat.asString("dd-[MM-yy]-hh:mm:ss", new Date()),
  };

  res.status(200).json(instaSocial);
});

app.get("/api/v1/facebook", (req, res) => {
  const fbSocial = {
    userName: "sumanacharyyafacebook",
    followers: 100,
    follows: 40,
    date: dateFormat.asString("dd-[MM-yy]-hh:mm:ss", new Date()),
  };

  res.status(200).json(fbSocial);
});

app.get("/api/v1/linkedin", (req, res) => {
  const linkSocial = {
    userName: "sumanacharyyalinkedin",
    followers: 100,
    follows: 40,
    date: dateFormat.asString("dd-[MM-yy]-hh:mm:ss", new Date()),
  };

  res.status(200).json(linkSocial);
});

app.get("/api/v1/:token", (req, res) => {
  console.log(req.params.token);
  res.status(200).json({
    params: req.params.token,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`App listening on port --> http://localhost:${PORT}`);
});
