import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.params: ', req.params)
    // console.log('req.query: ', req.query)
    // console.log('req.cookies: ', req.cookies)

    res.status(StatusCodes.CREATED).json({ message: 'Post ok controller' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
