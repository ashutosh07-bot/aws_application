const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./src/utils/configs/database/index");
const {app} = require("./src/app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Connection Failed !!!", err);
  });
