import { slugify } from "~/utils/formatters"
import { listModel } from "~/models/listModel"

const createNew = async(reqbody) => {
    try{
        const newList = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        const createdList = await listModel.createNew(newList)
        console.log(createdList);


        const getNewList = await listModel.findOneById(createdList.insertedId)
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