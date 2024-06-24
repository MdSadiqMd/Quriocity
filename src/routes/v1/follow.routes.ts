import express from "express";
const { followController } = require("../../controllers/index");
const followRouter = express.Router();

followRouter.get("/ping", followController.pingFollowController);
followRouter.post("/:userId/:targetUserId", followController.follow);
followRouter.get("/:userId/followers", followController.getFollowers);
followRouter.get("/:userId/following", followController.getFollowing);
followRouter.delete("/:userId/:targetUserId", followController.unFollow);

module.exports = followRouter;