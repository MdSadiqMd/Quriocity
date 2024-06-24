import express from "express";
const { likeController } = require("../../controllers/index");
const likeRouter = express.Router();

likeRouter.get("/ping", likeController.pingLikeController);
likeRouter.post("/:type/:type_id/:id/likes", likeController.like);
likeRouter.get("/:type/:type_id/:id/getlikes", likeController.getLikes);
likeRouter.delete("/:id/dislikes", likeController.dislike);

module.exports = likeRouter;