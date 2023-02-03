const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToDB = (url) => {
  mongoose.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Conneced!");
    }
  });
};

module.exports = connectToDB;
