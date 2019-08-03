const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const localDatabase = require('./config/database');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(localDatabase.local.localUrl)
  .then(() => {
    console.log('Database connected with success!');
  }, (err) => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit();
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

module.exports = app;