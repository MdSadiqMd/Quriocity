import express from "express";
const { answerController } = require("../../controllers/index");
const answerRouter = express.Router();

answerRouter.get("/ping", answerController.pingAnswerController);
answerRouter.get("/:id", answerController.getAllAnswers);
answerRouter.put("/:id", answerController.updateAnswer);
answerRouter.delete("/:id", answerController.deleteAnswer);
answerRouter.post("/:id/comments", answerController.addComment);

module.exports = answerRouter;