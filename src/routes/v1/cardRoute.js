import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = Express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .post(cardValidation.createNew, cardController.createNew)
  .put()
  .delete()

Router.route('/:id')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .put(cardValidation.update, cardController.update)

export const cardRoute = Router