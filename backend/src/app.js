const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.json());

const awsRoutes = require("./routes/aws.routes.js");

app.use("/aws", awsRoutes);

module.exports = { app };
