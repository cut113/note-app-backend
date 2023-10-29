import { env } from "~/config/environment";
import { MongoClient, ServerApiVersion } from "mongodb";

let DatabaseInstance;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  DatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!DatabaseInstance) throw new Error("Call connect first!");
  return DatabaseInstance;
};

export const CLOSE_DB = async () => {
  console.log("cuuuuuu");
  await mongoClientInstance.close();
};
