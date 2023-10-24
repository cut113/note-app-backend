import { slugify } from "~/utils/formatters"
const createNew = async(reqbody) => {
    try{
        const newBoard = {
            ...reqbody,    
            slug: slugify(reqbody.title)  
        }
        return newBoard
    }
    catch(error){
        throw error
    }
}

export const boardService = {
    createNew
    }