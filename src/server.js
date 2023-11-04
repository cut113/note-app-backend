import express from "express";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  // Add headers to response
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/v1", APIs_V1);

  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
  exitHook(() => {
    CLOSE_DB();
    console.log("Disconnected from MongoDB successfully!");
  });
};

(async () => {
  try {
    console.log("Connecting to MongoDB!");
    await CONNECT_DB();
    console.log("Connected to MongoDB successfully!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

