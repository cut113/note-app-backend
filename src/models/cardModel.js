import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = "card";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardid: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  listId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  cover: Joi.string().optional().allow(null),
  title: Joi.string().required().min(3).max(50).trim().strict(),
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

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});

const createNew = async (data) => {
  try{
    const value = await CARD_COLLECTION_SCHEMA.validateAsync(data)
    const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(value)
    return  createdCard
  } catch(error){
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew
}
