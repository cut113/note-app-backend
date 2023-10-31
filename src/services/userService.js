/* eslint-disable no-useless-catch */
import { userModel } from "~/models/userModel";
import { Role } from "~/utils/constants";

const getUser = async (username, password) => {
  try {
    const getUser = await userModel.login(username, password);
    return getUser;
  } catch (error) {
    throw error;
  }
};

const usernameExisted = async (username) => {
  try {
    const result = userModel.usernameExisted(username);
    return result;
  } catch (error) {
    throw error;
  }
};

const createUser = async (reqbody) => {
  try {
    // Add default info to user
    const newUser = {
      ...reqbody,
      role: Role.User,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const userId = await userModel.createUser(newUser);
    return userId;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUser,
  usernameExisted,
  createUser
};
