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
      "string.max": "Username is maximum at {#limit} characters"
    }),
    password: Joi.string()
      .pattern(new RegExp(OBJECT_PASSWORD_RULE))
      .required()
      .min(8)
      .max(30)
      .messages({
        "any.required": "Password is required",
        "string.empty": "Password is note allowed to be empty",
        "string.min": "Password is at least {#limit} characters",
        "string.max": "Password is maximum at {#limit} characters",
        "string.pattern.base": "Password must be at least 8 and at most 30 charaters. And does not contains special characters"
      })
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      error: error.details
    });
  }
};

export const userValidation = {
  createNewUser,
  validateUser
};
