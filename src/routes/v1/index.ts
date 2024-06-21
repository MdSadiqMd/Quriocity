import express from 'express';
const userRouter = require('./user.routes');
const v1Router = express.Router();

v1Router.use("/users", userRouter);

module.exports = v1Router;