import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";
  const port = 8017;

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(port, hostname, () => {
    console.log(`Hello Thang DB, I am running at http://${hostname}:${port}/`);
  });
  exitHook(() => {
    CLOSE_DB()
    console.log("Disconnected from MongoDB successfully!");
  });
};

(async () => {
  try {
    console.log("Connecting to MongoDB successfully!");
    await CONNECT_DB();
    console.log("Connected to MongoDB successfully!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// CONNECT_DB()
// .then(() => console.log('Connected to MongoDB successfully!'))
// .then(() => START_SERVER())
// .catch(error => {
//   console.error(error)
//   process.exit(0)
// })
