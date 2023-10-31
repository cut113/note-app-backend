import { slugify } from "~/utils/formatters"
import { cardModel } from "~/models/cardModel"

const createNew = async(reqbody) => {
    try{
        const newcard = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        const createdCard = await cardModel.createNew(newcard)
        console.log(createdCard);


        const getNewCard = await cardModel.findOneById(createdCard.insertedId)
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