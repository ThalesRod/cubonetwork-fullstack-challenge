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
    console.error(`MongoDB connection error: ${err}`);
    process.exit();
  }
);

const personRouter = require('./routes/person.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', personRouter);

module.exports = app;