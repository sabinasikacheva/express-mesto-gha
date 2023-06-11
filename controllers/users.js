const userModel = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
        err: err.message,
        stack: err.stack,
      });
    });
};

const getUserById = (req, res) => {
  userModel
    .findById(req.params.user_id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Запрашиваемый пользователь не найден',
        });
        // return;
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => new Error('Not found'))
    .then((user) => {
      // if (!user) {
      //   res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      // } else {
      res.send({ user });
      // }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({
            message: 'Передан некорректный id пользоателя',
          });
      } else if (err.name === 'Not found') {
        res
          .status(NOT_FOUND)
          .send({
            message: 'Запрашиваемый пользователь не найден',
          });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not found'))
    .then((user) => {
      // if (!user) {
      //   res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      // } else {
      res.send({ user });
      // }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({
            message: 'Передан некорректный id пользоателя',
          });
      } else if (err.name === 'Not found') {
        res
          .status(NOT_FOUND)
          .send({
            message: 'Запрашиваемый пользователь не найден',
          });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
