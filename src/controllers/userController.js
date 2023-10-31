import { StatusCodes } from "http-status-codes";
import { userService } from "~/services/userService";

const validateUser = async (req, res) => {
  try {
    const user = await userService.getUser(
      req.body.username,
      req.body.password
    );
    res.status(StatusCodes.ACCEPTED).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const createNewUser = async (req, res) => {
  try {
    const shouldCreateUser = !(await userService.usernameExisted(
      req.body.username
    ));
    if (shouldCreateUser) {
      // TODO: implement get Access Token
      const userId = await userService.createUser(req.body);
      res.status(StatusCodes.ACCEPTED).json(userId);
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "username already exsisted" });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

export const userController = {
  validateUser,
  createNewUser
};
