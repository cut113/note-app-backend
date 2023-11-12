/* eslint-disable no-useless-catch */
import { userModel } from "~/models/userModel";
import { Role } from "~/utils/constants";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { secret } from "~/config/auth.config";

const getUser = async (username, password) => {
  try {
    // get user
    const user = await userModel.getUserByUsername(username);

    // check user password
    const passwordIsValid = compareSync(password, user.password);

    // returned result
    let result;
    if (passwordIsValid) {
      result = {
        id: user._id,
        username: user.username,
        email: user.email,
        isSuccess: true,
        accessToken: sign({ id: user._id }, secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400 //24 hours
        }),
        role: user.role
      };
    } else {
      result = {
        id: null,
        username: null,
        email: null,
        isSuccess: false,
        accessToken: null,
        role: null
      };
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserByUserId = async (id) => {
  try {
    const user = await userModel.getUserByUserId(id);
    return user;
  } catch (error) {
    throw error;
  }
}

const usernameExisted = async (username) => {
  try {
    const result = userModel.usernameExisted(username);
    return result = {
      id: result._id,
      username: result.username,
      email: null,
      isSuccess: false,
      accessToken: null,
      password: null,
    };
  } catch (error) {
    throw error;
  }
};

const createUser = async (reqbody) => {
  try {
    // Add default info to user
    const newUser = {
      ...reqbody,
      password: hashSync(reqbody.password, 8),
      role: Role.User,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boards: []
    };
    const userId = await userModel.createUser(newUser);
    return userId;
  } catch (error) {
    throw error;
  }
};

const getBoardsByUser = async (id) => {
  try {
    const boards = await userModel.getBoardsByUser(id);
    return boards;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUser,
  usernameExisted,
  createUser,
  getUserByUserId,
  getBoardsByUser
};
