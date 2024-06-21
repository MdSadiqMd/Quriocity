import express from "express";

const v1Router = require("./v1/index");
const apiRouter = express.Router();

apiRouter.use("/v1", v1Router);

module.exports = apiRouter;