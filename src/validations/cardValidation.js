import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict().messages({
      'string.base': 'Title should be a type of text',
      'string.empty': 'Title cannot be an empty field',
      'string.min': 'Title should have a minimum length of {#limit}',
      'string.max': 'Title should have a maximum length of {#limit}',
      'string.trim': 'Title cannot contain whitespace',
      'any.required': 'Title is a required field'
    }),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    listId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    cover: Joi.string().optional().allow(null),
    description: Joi.string().optional().allow(null),
    memberIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
    comments: Joi.array().items(
      Joi.object({
        userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        content: Joi.string().required().trim().strict(),
      }).default([]),

    ).default([]),
    attachments: Joi.array().items(
      Joi.object({
        url: Joi.string().required().trim().strict(),
        name: Joi.string().required().trim().strict()
      })
    ).default([]),
    startDate: Joi.date().timestamp('javascript').default(null),
    endDate: Joi.date().timestamp('javascript').default(null),
  })


  try {

    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, Error(error).message))
  }

}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict().messages({
      'string.base': 'Title should be a type of text',
      'string.empty': 'Title cannot be an empty field',
      'string.min': 'Title should have a minimum length of {#limit}',
      'string.max': 'Title should have a maximum length of {#limit}',
      'string.trim': 'Title cannot contain whitespace',
      'any.required': 'Title is a required field'
    }),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

  })

  try {

    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, Error(error).message))
  }

}

export const cardValidation = {
  createNew,
  update
}
