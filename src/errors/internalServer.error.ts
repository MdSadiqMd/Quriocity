import BaseError from "./base.error";
import { StatusCodes } from "http-status-codes";

class InternalServer extends BaseError {
  constructor(details: any) {
    super(
      "Bad Request",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      details
    );
  }
}

module.exports = InternalServer;
