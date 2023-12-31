import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
// Define Collection (name & schema)
const LIST_COLLECTION_NAME = "columns";
const LIST_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(() => new Date().toISOString()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  try {
    const value = await LIST_COLLECTION_SCHEMA.validateAsync(data)
    return value
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateSchema(data)
    const insertValue = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }
    const createdList = await GET_DB().collection(LIST_COLLECTION_NAME).insertOne(insertValue)
    return createdList
  } catch (error) {
    throw new Error(error)
  }
}

const pushCardOrder = async (card) => {
  try {
    const updatedList = await GET_DB().collection(LIST_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(card.listId) },
      { $push: { cardOrderIds: card._id } },
      { returnOriginal: false }
    )
    console.log("cardID: " + card._id);

    return updatedList.value
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    console.log("tim listid: " + id)
    const result = await GET_DB().collection(LIST_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    console.log("tim listid: " + result)
    return result
  } catch (error) {
    throw new Error(error)
  }
}


const update = async (id, data) => {
  try {
    const updatedList = await GET_DB().collection(LIST_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    )
    console.log(updatedList);
    return updatedList.value
  } catch (error) {
    throw new Error(error)
  }
}



export const listModel = {
  LIST_COLLECTION_NAME,
  LIST_COLLECTION_SCHEMA,
  createNew,
  pushCardOrder,
  update,
  findOneById
}
