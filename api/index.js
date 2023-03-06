const express = require('express');//backend
const cors = require('cors');
const app = express()
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');

const allowedOrigins = ['https://money-tracker-fwft.onrender.com']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions)); // Use cors middleware with the options

app.use(express.json());
app.get("https://money-tracker-fwft.onrender.com", (req, res) => {
    res.json('test ok3');
})

app.post("https://money-tracker-fwft.onrender.com", async (req, res) => {
    console.log("mongodb+srv://mainak:jkeBTAvstcntro7i@cluster0.bcrbfvz.mongodb.net/?retryWrites=true&w=majority");
    await mongoose.connect(`mongodb+srv://mainak:jkeBTAvstcntro7i@cluster0.bcrbfvz.mongodb.net/?retryWrites=true&w=majority`);
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({
        name, description, datetime, price
    });
    res.json(transaction);
});
app.get("https://money-tracker-fwft.onrender.com", async (req, res) => {
    await mongoose.connect(`mongodb+srv://mainak:jkeBTAvstcntro7i@cluster0.bcrbfvz.mongodb.net/?retryWrites=true&w=majority`);
    const transactions = await Transaction.find();
    res.json(transactions); 
})

app.listen(4568);
