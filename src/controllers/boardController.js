import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)
    console.log('req.cookies: ', req.cookies)
    res.status(StatusCodes.CREATED).json({ message: 'Post ok controller' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}
