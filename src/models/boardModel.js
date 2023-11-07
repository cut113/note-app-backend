
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { listModel } from '~/models/listModel'
import { cardModel } from '~/models/cardModel'



const BOARD_COLLECTION_NAME = "board";
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(), 
    type: Joi.string().required().valid('Public', 'Private').default('Public').trim().strict(),

    ownerId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    memberIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
    
    listOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

  createdAt: Joi.date().timestamp("javascript").default(() => new Date().toISOString()),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  try {
    const value = await BOARD_COLLECTION_SCHEMA.validateAsync(data);
    return value;
  } catch (error) {
    throw new Error(error);
  }
};
const createNew = async (data) => {
  try {
    const validData = await validateSchema(data);
    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData);
    return createdBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Check if username is in the memberIds of Board
 * @param {string} id: board id
 * @param {string} userId: user's id
 * @returns {boolean} true if userIds is in memberIds, false otherwise
 */
const checkIfUserIsMemberOfBoard = async (id, userId) => {
  try {
    const memberIds = (await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })).memberIds;
    return memberIds?.includes(userId);
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  checkIfUserIsMemberOfBoard
};

