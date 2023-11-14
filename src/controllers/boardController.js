import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import { boardService } from "~/services/boardService.js";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedList = await boardService.update(id, req.body);
    res.status(StatusCodes.OK).json(updatedList);
  } catch (error) {
    next(error);
  }
};

const getBoardByUserIdDetails = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const board = await boardService.getBoardByUserIdDetails(ownerId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const getBoardsByUserId = async (req, res) => {
  try {
    const { id } = req.body;
    const boards = await userModel.getBoardsByUser(id);
    if (boards) {
      res.status(StatusCodes.ACCEPTED).json(boards);
    } else {
      res.status(StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
  getBoardByUserIdDetails,
  getBoardsByUserId,
};
