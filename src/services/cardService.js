import { slugify } from "~/utils/formatters"
import { cardModel } from "~/models/cardModel"
import { listModel } from "~/models/listModel"
/* eslint-disable */
const createNew = async(reqbody) => {
    try{
        const data = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        console.log(data)
        // transaction mongodb
        const newCard = await cardModel.createNew(data)
        // update cardOrder array in list collection
        const updatedBoard = await listModel.pushCardOrder(newCard.listId.toString(), newCard._id.toString())

        return newCard
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
        const updatedCard = await cardModel.update(id, updateData)
        return updatedCard
    }
    catch(error){
        throw error
    }
}

export const cardService = {
    createNew,
    update
    }