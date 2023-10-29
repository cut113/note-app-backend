import Express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { authRoute } from "./authentication";
import { listRoute } from './listRoute'
import { cardRoute } from './cardRoute'
const Router = Express.Router()

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "OK", code: StatusCodes.OK });
});

Router.use("/boards", boardRoute);
Router.use("/auth", authRoute);

Router.use('/lists', listRoute)

Router.use('/cards', cardRoute)

export const APIs_V1 = Router
