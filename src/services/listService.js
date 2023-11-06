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
        console.log(data)
        // transaction mongodb
        const newList = await listModel.createNew(data)
        newList.cards = []
        // update columnOrder array in board collection
        const updatedBoard = await boardModel.pushListOrder(newList.boardId.toString(), newList._id.toString())

        return newList
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