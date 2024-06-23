import express from 'express';
const v1Router = express.Router();
const userRouter = require('./user.routes');
const questionRouter = require('./question.routes');
const answerRouter = require('./answer.routes');
const commentRouter = require('./comment.routes');

v1Router.use("/users", userRouter);
v1Router.use("/questions", questionRouter);
v1Router.use("/answers", answerRouter);
v1Router.use("/comments", commentRouter);

module.exports = v1Router;