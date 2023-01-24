const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
mongoose.set("strictQuery", true);

exports.connect = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((resp) => {
      console.log("DB Connected Successfully!");
    })
    .catch((err) => {
      console.log("DB Connection failed!");
      console.log(err);
      process.exit(1);
    });
};
