import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'string.base': 'Title should be a type of text',
      'string.empty': 'Title cannot be an empty field',
      'string.min': 'Title should have a minimum length of {#limit}',
      'string.max': 'Title should have a maximum length of {#limit}',
      'string.trim': 'Title cannot contain whitespace',
      'any.required': 'Title is a required field'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().required().valid('Public', 'Private').default('Public').trim().strict(),
    ownerId: Joi.string().required(),
    memberIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
    listOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
  })

  try {

    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, Error(error).message))
  }

}

export const boardValidation = {
  createNew
}
