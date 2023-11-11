import Joi from "joi";
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = "cards";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  listId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  cover: Joi.string().optional().allow(null),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().optional(),

  memberIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  comments: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string()
          .required()
          .pattern(OBJECT_ID_RULE)
          .message(OBJECT_ID_RULE_MESSAGE),
        content: Joi.string().required().trim().strict(),
        createdAt: Joi.date().timestamp("javascript").default(Date.now)
      }).default([])
    )
    .default([]),
  attachments: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required().trim().strict(),
        name: Joi.string().required().trim().strict()
      })
    )
    .default([]),
  startDate: Joi.date().timestamp("javascript").default(null),
  endDate: Joi.date().timestamp("javascript").default(null),

  createdAt: Joi.date().timestamp("javascript").default(() => new Date().toISOString()),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async(data) => {
  try{
      const value = await CARD_COLLECTION_SCHEMA.validateAsync(data)
      return value
  } catch(error){
      throw new Error(error)
  }
}

const createNew = async (data) => {
  try{
    const validatedValue = await validateSchema(data, {abortEarly: false})
    const insertValue = {
      ...validatedValue,
      boardId: new ObjectId(validatedValue.boardId),
      listId: new ObjectId(validatedValue.listId)
    }
    const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(insertValue)
    return createdCard
  } catch(error){
    throw new Error(error)
  }
}

const findOneById = async(id) => {
  try{
      const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id)})
      return result
  } catch(error){
      throw new Error(error)
  }
}

const update = async(id, data) => {
  try{
      const updatedCard = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnOriginal: false}
      )
      console.log(updatedCard);
      return updatedCard.value
  } catch(error){
      throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  update,
  findOneById
}
