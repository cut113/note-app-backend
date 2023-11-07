import { StatusCodes } from 'http-status-codes'
import { listService } from '~/services/listService.js'
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.params: ', req.params)
    // console.log('req.query: ', req.query)
    // console.log('req.cookies: ', req.cookies)
    const createdList = await listService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdList)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedList = await listService.update(id, req.body)
    res.status(StatusCodes.OK).json(updatedList)
  } catch (error) { next(error) }
}

export const listController = {
  createNew,
  update
}
