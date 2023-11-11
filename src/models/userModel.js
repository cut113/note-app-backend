import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
const USER_COLLECTION_NAME = "user";

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


/**
 * 
 * @param {string} userId
 * @param {string} boardId
 */
const addBoardToUser = async (userId, boardId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(userId) },
        {
          $push: {
            boards: boardId
          }
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  createUser,
  usernameExisted,
  getUserByUsername,
  addBoardToUser
};
