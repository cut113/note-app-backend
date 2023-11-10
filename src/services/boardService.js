/* eslint-disable no-useless-catch */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import { ApiError } from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";

const createNew = async (reqbody) => {
  try {
    const newBoard = {
      ...reqbody,
      slug: slugify(reqbody.title)
    };
    const createdBoard = await boardModel.createNew(newBoard);
    console.log(createdBoard);

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }
    return board;
  } catch (error) {
    throw error;
  }
};

const verifyBoardAccess = async (boardId, userId) => {
  try {
    const result = await boardModel.checkIfUserIsMemberOfBoard(boardId, userId);
    return !!result;
  } catch (err) {
    throw err;
  }
};

export const boardService = {
  createNew,
  getDetails,
  verifyBoardAccess
};
