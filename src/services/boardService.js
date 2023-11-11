/* eslint-disable */
import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import { ApiError } from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"

const createNew = async(reqbody) => {
    try{
        const newBoard = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        const createdBoard = await boardModel.createNew(newBoard)
        console.log(createdBoard);

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async(boardId) => {
    try{
        const board = await boardModel.getDetails(boardId)
        if(!board){
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
        }
        board.lists.forEach(list => {
            list.cards = board.cards.filter(c => c.listId.toString() === list._id.toString())
        })
        // Remove cards data from boards detail
        delete board.cards
        return board
    }
    catch(error){
        throw error
    }
}

const getBoardByUserIdDetails = async(userId) => {
    try{
        const board = await boardModel.getBoardByUserId(userId)
        if(!board){
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
        }
        // Remove cards data from boards detail
        delete board.cards
        return board
    }
    catch(error){
        throw error
    }
}

const update = async (id, reqbody) => {
    try {
        const updateData = {
            ...reqbody,
            updatedAt: Date.now()
        }
        const updatedBoard = await boardModel.update(id, updateData)
        return updatedBoard
    }
    catch (error) {
        throw error
    }
}

export const boardService = {
    createNew,
    getDetails,
    getBoardByUserIdDetails,
    update
    };
