const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(router);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на сервере' : message,
    });
  next();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
