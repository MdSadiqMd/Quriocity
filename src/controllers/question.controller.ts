import { NextFunction, Request, Response } from "express";
const { UserService } = require('../services/index');
const { UserRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const userService = new UserService(new UserRepository());

function pingUserController(req: Request, res: Response) {
  return res.json({ message: "pong problem controller" });
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'New User Created Succesfully',
      error: {},
      data: newUser
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "User Fetched",
      error: {},
      data: user
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "All Users Fetched",
      error: {},
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "Problem Updated",
      error: {},
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const deleteUser = await userService.deleteUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "Problem Deleted",
      error: {},
      data: deleteUser
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  pingUserController,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};