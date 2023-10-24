import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService.js'
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.params: ', req.params)
    // console.log('req.query: ', req.query)
    // console.log('req.cookies: ', req.cookies)
    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
