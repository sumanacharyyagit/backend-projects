require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
const PORT = process.env.PORT || 8000;

const courses = [
  {
    id: "11",
    name: "Learn React.JS",
    price: "399",
  },
  {
    id: "22",
    name: "Learn Angular",
    price: "499",
  },
  {
    id: "33",
    name: "Learn NEXT.JS",
    price: "599",
  },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.get("/api/v1", (req, res) => {
  res.send("Welcome api/v1/ !");
});
app.get("/api/v1/docs", (req, res) => {
  res.send("Welcome to Docs !");
});
app.get("/api/v1/docsobject", (req, res) => {
  res.send({ id: "55", name: "Course X", price: 599 });
});
app.get("/api/v1/docscourses", (req, res) => {
  res.send(courses);
});
app.get("/api/v1/course/:cid", (req, res) => {
  const courseRes = courses.find((c) => c.id === req.params.cid);
  res.send(courseRes);
});
app.post("/api/v1/addcourse", (req, res) => {
  courses.push(req.body);
  res.status(201).send(true);
});
app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});
app.post("/api/v1/addcourseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.samplefile;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    if (err) {
      res.send(false);
    }
    res.send(true);
  });
});

app.listen(PORT, () => {
  console.log(`Starting at port http://localhost:${PORT}`);
});
