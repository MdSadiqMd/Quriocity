import express from "express";
const { questionController } = require("../../controllers/index");
const questionRouter = express.Router();

questionRouter.get("/ping", questionController.pingQuestionController);
questionRouter.post("/", questionController.createQuestion);
questionRouter.get("/search", questionController.searchQuestion);
questionRouter.get("/", questionController.getAllQuestions);
questionRouter.put("/:id", questionController.updateQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);
questionRouter.post("/:id/answers", questionController.addAnswer);

module.exports = questionRouter;