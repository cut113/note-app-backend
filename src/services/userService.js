import { userModel } from "~/models/userModel";

const getUser = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const getUser = await userModel.findUser(username, password);
    return getUser;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUser
};
