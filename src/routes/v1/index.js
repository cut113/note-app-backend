import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'

const Router = Express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'OK', code: StatusCodes.OK })
})

Router.use('/board', boardRoute)

export const APIs_V1 = Router