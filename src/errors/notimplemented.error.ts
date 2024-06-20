import BaseError from "./base.error";
import { StatusCodes } from "http-status-codes";

class NotImplemented extends BaseError {
  constructor(methodName: any) {
    super(
      "Not Implemented",
      StatusCodes.NOT_IMPLEMENTED,
      `${methodName} Not Implemented`,
      {}
    );
  }
}

module.exports = NotImplemented;
