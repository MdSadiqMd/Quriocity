import BaseError from "./base.error";
import { StatusCodes } from "http-status-codes";

class BadRequest extends BaseError {
  constructor(propertyName: string, details: any) {
    super(
      "Bad Request",
      StatusCodes.BAD_REQUEST,
      `Invalid Structure for ${propertyName} provided`,
      details
    );
  }
}

module.exports = BadRequest;
