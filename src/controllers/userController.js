import { StatusCodes } from "http-status-codes";
import { userService } from "~/services/userService";

const validateUser = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body);
    // console.log('req.params: ', req.params)
    // console.log('req.query: ', req.query)
    // console.log('req.cookies: ', req.cookies)
    const user = await userService.getUser(req.body.username, req.body.password);
    res.status(StatusCodes.ACCEPTED).json(user);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  validateUser
};
