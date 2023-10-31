import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import {
  OBJECT_PASSWORD_RULE
} from "~/utils/validators";

const createNewUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().pattern(new RegExp(OBJECT_PASSWORD_RULE)).required(),
    avatar: Joi.string(),
    displayName: Joi.string().min(5).max(20).required()
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, Error(error).message));
  }
};

const validateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required().messages({
      "any.required": "Username is required",
      "string.empty": "Username is note allowed to be empty",
      "string.min": "Username is at least {#limit} characters",
      "string.max": "Username is maxmimum at {#limit} characters"
    }),
    password: Joi.string()
      .pattern(new RegExp(OBJECT_PASSWORD_RULE))
      .required()
      .messages({
        "any.required": "Password is required",
        "string.empty": "Password is note allowed to be empty"
      })
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, Error(error).message));
  }
};

export const userValidation = {
  createNewUser,
  validateUser
};
