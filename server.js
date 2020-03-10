const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");

const app = express();

// for body parser middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

dotenv.config({ path: './config/config.env' });

// connecting the Mongo DB during server start up
connectDB();

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});