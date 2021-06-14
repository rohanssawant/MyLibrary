const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const indexRouter = require("./routes/index.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const db_url = process.env.DATABASE_URL;

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`MONGOOSE CONNECTED..`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", indexRouter);

const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`SERVER STARTED AT PORT ${PORT}`));
