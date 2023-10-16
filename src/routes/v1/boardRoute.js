import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = Express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .post(boardValidation.createNew, boardController.createNew)
  .put()
  .delete()

export const boardRoute = Router
