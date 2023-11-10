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
    type: Joi.string()
        .required()
        .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
        .default('Public')
        .trim()
        .strict(),

    ownerId: Joi.string().required(),
    memberIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    listOrderIds: Joi.array().items(
        Joi.string()
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
    try {
        const value = await BOARD_COLLECTION_SCHEMA.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}
const createNew = async (data) => {
    try {
        const validData = await validateSchema(data)
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * 
 * @param {string} boardId 
 * @param {string} listId 
 */
const pushListOrder = async (list) => {
    console.log("listID is: " + list._id)
    try {
        const updatedBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(list.boardId) },
            { $push: { listOrderIds: list._id } },
            { returnOriginal: false }
        )

        return updatedBoard.value
    } catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (id) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                    _destroy: false
                }
            },
            {
                $lookup: {
                    from: listModel.LIST_COLLECTION_NAME,
                    let: { boardId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$boardId', '$$boardId'] },
                                        { $eq: ['$_destroy', false] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'lists'
                }
            },
            {
                $lookup: {
                    from: cardModel.CARD_COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray()
        return result[0] || null
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
      const updatedBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnOriginal: false }
      )
      console.log(updatedBoard);
      return updatedBoard.value
    } catch (error) {
      throw new Error(error)
    }
  }


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
    pushListOrder,
  findOneById,
  getDetails,
    update,
  checkIfUserIsMemberOfBoard
};

// boardID: 6540c766bae52bc1da1d2463
// listID: 65412f024af33870af578a08
// cardID: 65412f794af33870af578a0c
