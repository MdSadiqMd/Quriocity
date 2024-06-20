import BaseError from "./base.error";
import { StatusCodes } from "http-status-codes";

class NotFound extends BaseError {
  constructor(resourceName: any, resourceValue: any) {
    super(
      "NotFound",
      StatusCodes.NOT_FOUND,
      `The requested resource: ${resourceName} with value ${resourceValue} not found`,
      {
        resourceName,
        resourceValue,
      }
    );
  }
}

module.exports = NotFound;
