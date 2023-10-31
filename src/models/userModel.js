import { GET_DB } from "~/config/mongodb";
const USER_COLLECTION_NAME = "user";

const login = async (username, password) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ username, password });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Check if Username already exsited
 * @param {username} username
 * @returns {boolean} true if username existed, false otherwise
 */
const usernameExisted = async (username) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ username });
    if (result) return true;
    else return false;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (user) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(user);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  login,
  createUser,
  usernameExisted
};
