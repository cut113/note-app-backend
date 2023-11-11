/* eslint-disable */
import { listModel } from "~/models/listModel"
import { boardModel } from "~/models/boardModel"

const createNew = async (reqbody) => {
    try {
        const data = {
            ...reqbody
        }
        console.log(data)
        // transaction mongodb
        const newList = await listModel.createNew(data)
        const getNewList = await listModel.findOneById(newList.insertedId)
        if (getNewList) {
            getNewList.cards = []
            // update columnOrder array in board collection
            const updatedBoard = await boardModel.pushListOrder(getNewList)
        }

        return newList
    }
    catch (error) {
        throw error
    }
}

const update = async (id, reqbody) => {
    try {
        const updateData = {
            ...reqbody,
            updatedAt: Date.now()
        }
        const updatedList = await listModel.update(id, updateData)
        return updatedList
    }
    catch (error) {
        throw error
    }
}



export const listService = {
    createNew,
    update
}