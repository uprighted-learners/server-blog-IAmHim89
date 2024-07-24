//env call
require("dotenv").config;
//importing express library
const express = require("express");

//calling express using a app variable
const app = express();

//call for json
app.use(express.json());

//call controller
const controller = require("./controllers/routes");

//initialize controller
app.use("/project", controller);

//establishing port that our localhost will work on
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
