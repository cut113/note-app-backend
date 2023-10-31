/* eslint-disable */
import { slugify } from "~/utils/formatters"
import { listModel } from "~/models/listModel"
import { boardModel } from "~/models/boardModel"

const createNew = async(reqbody) => {
    try{
        const data = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        const newList = await listModel.createNew(data)
        console.log(typeof newList.boardId)
        console.log(typeof newList.boardId.toString())
        const updatedBoard = await boardModel.pushListOrder(newList.boardId.toString(), newList._id.toString())
        console.log(updatedBoard)
        
        const getNewList = await listModel.findOneById(newList.insertedId)
        return getNewList
    }
    catch(error){
        throw error
    }
}

const update = async(id, reqbody) => {
    try{
        const updateData = {
            ...reqbody,
            updatedAt: Date.now()
        }
        const updatedList = await listModel.update(id, updateData)
        return updatedList
    }
    catch(error){
        throw error
    }
}



export const listService = {
    createNew,
    update
    }