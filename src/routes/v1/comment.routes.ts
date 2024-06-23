import express from "express";
const { commentController } = require("../../controllers/index");
const commentRouter = express.Router();

commentRouter.get("/ping", commentController.pingAnswerController);
commentRouter.post("/:id", commentController.addCommentToComment);
commentRouter.get("/:id", commentController.getAllCommentsToComments);
commentRouter.put("/:id", commentController.updateComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.delete("/:parentId/:id", commentController.deleteCommentOfComment);

module.exports = commentRouter;