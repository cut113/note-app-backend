import { GET_DB } from "~/config/mongodb";
const USER_COLLECTION_NAME = "user";
import { ObjectId } from "mongodb";

/**
 * Get user by username
 * @param {string} username
 * @returns {user: {id: user._id,username: user.username,email: user.email,isSuccess: true,role: user.role} || null}
 */
const getUserByUsername = async (username) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ username });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get user by UserId
 * @param {string} id
 * @returns {user: {id: user._id,username: user.username} || null}
 */
const getUserByUserId = async (id) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
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
    return !!result;
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
  createUser,
  usernameExisted,
  getUserByUsername,
  getUserByUserId
};
