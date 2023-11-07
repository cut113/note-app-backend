import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService.js'

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCard = await cardService.update(id, req.body)
    res.status(StatusCodes.OK).json(updatedCard)
  } catch (error) { next(error) }
}

export const cardController = {
  createNew,
  update
}
