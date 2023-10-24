import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'

const BOARD_COLLECTION_NAME = 'board'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

 
  listOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const createNew = async(data) => {
    try{
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
        return createdBoard
    } catch(error){
        throw new Error(error)
    }
}

const findOneById = async(id) => {
    try{
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: id})
        return result
    } catch(error){
        throw new Error(error)
    }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
    findOneById
}