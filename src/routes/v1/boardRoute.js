import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'

const Router = Express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .post(boardValidation.createNew)
  .put()
  .delete()

export const boardRoute = Router


