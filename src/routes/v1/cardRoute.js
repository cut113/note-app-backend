import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = Express.Router()

Router.route('/')

  .post(cardValidation.createNew, cardController.createNew)

export const cardRoute = Router