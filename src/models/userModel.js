import { GET_DB } from "~/config/mongodb";
const USER_COLLECTION_NAME = "user";


const findUser = async (username, password) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ username, password });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  findUser
};
