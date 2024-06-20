import { Request, Response, NextFunction } from "express";
import BaseError from "../errors/base.error";
import { StatusCodes } from "http-status-codes";

function errorHandler(
  err: any, // It is the Express built-in error handler Middleware
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
      data: {},
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    details: err,
    data: {},
  });
}

module.exports = errorHandler;
