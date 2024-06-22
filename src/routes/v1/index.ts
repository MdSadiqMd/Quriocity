import express from 'express';
const v1Router = express.Router();
const userRouter = require('./user.routes');
const questionRouter = require('./question.routes');
const answerRouter = require('./answer.routes');

v1Router.use("/users", userRouter);
v1Router.use("/questions", questionRouter);
v1Router.use("/answers", answerRouter);

module.exports = v1Router;