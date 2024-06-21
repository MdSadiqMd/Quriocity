import express from "express";
const { userController } = require("../../controllers/index");
const userRouter = express.Router();

userRouter.get("/ping", userController.pingUserController);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser);
userRouter.get("/", userController.getAllUsers);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;