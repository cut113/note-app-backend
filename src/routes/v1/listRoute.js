import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { listValidation } from '~/validations/listValidation'
import { listController } from '~/controllers/listController'

const Router = Express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .post(listValidation.createNew, listController.createNew)
  .put()
  .delete()

Router.route('/:id')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get ok' })
  })
  .put(listValidation.update, listController.update)

export const listRoute = Router
