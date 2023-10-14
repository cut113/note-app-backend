
const MONGODB_URI = 'mongodb+srv://admin:o6DqNuldCum6Jvsw@cluster0.xkvaygw.mongodb.net/'

const DATABASE_NAME = 'noteApp'

import {MongoClient, ServerApiVersion} from 'mongodb'

let DatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI , {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export const CONNECT_DB = async () => {
        await mongoClientInstance.connect()
        DatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
    if (!DatabaseInstance) 
        throw new Error('Call connect first!')
        return DatabaseInstance 
}

export const CLOSE_DB = async () => {
    console.log('cuuuuuu');
    await mongoClientInstance.close()
}