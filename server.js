const path = require('path');
const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");
const serverless = require("serverless-http");
const proxy = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const customLogger = require("../utils/logger");
const proxy = require('http-proxy-middleware');

const app = express();

// gzip responses
app.use(compression())

dotenv.config({ path: './config/config.env' });

// connecting the Mongo DB during server start up
connectDB();

// Apply express middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const basePath = "/.netlify/functions/server";
if (process.env.NODE_ENV === 'dev') {
    
    app.use(basePath, proxy({ target: "http://localhost:9000" }));
}

//const routerBasePath = process.env.NODE_ENV === 'dev' ? '/' : '/.netlify/functions/server';
app.use(basePath, transactions);

// Attach logger
app.use(morgan(customLogger))

module.exports = app;