import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
const createNew = async(reqbody) => {
    try{
        const newBoard = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        const createdBoard = await boardModel.createNew(newBoard)
        console.log(createdBoard);


        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
        return getNewBoard
    }
    catch(error){
        throw error
    }
}

export const boardService = {
    createNew
    }