import express from 'express';
const v1Router = express.Router();
const userRouter = require('./user.routes');
const questionRouter = require('./question.routes');

v1Router.use("/users", userRouter);
v1Router.use("/questions", questionRouter);

module.exports = v1Router;