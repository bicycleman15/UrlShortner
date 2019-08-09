const express = require("express");
const mongoose = require("mongoose")
const app = express();
const item = require("./routes/urlShorten");
const bodyParser = require("body-parser");
const PORT = 3000;
const mongoURI = require("./config/keys");
const db = mongoURI

// Body Parser Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is the root page");
});

//Start server on Port 3000
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

//Assigning Routes
app.use("/api/item", item);

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch(err => {
    console.log(err);
  });


