const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5648377728fe2577fa37747b6',
//   };

//   next();
// });

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('648377728fe2577fa37747b6'),
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});
