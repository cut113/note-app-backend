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
        const getNewCard = await cardModel.findOneById(newCard.insertedId)
        if (getNewCard) {
            // update cardOrder array in list collection
            const updatedList = await listModel.pushCardOrder(getNewCard)
        }

        return getNewCard
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