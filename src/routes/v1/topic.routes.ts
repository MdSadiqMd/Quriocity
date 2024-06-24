import express from "express";
const { topicController } = require("../../controllers/index");
const topicRouter = express.Router();

topicRouter.get("/ping", topicController.pingTopicController);
topicRouter.post("/", topicController.createTopic);
topicRouter.get("/", topicController.getTopics);
topicRouter.delete("/", topicController.deleteTopic);

module.exports = topicRouter;