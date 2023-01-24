const app = require("./app");

const {PORT} = process.env;

app.listen(PORT, (req, res) => {
  console.log(`App listening at port --> http://localhost:${PORT}`);
});
