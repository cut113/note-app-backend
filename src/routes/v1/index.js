import  Express  from "express";
import {StatusCodes} from 'http-status-codes'
import { boardRouters } from "~/routes/v1/boardRoutes";

const Router = Express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'OK', code: StatusCodes.OK});
});

Router.use('/board', boardRouters)

export const APIs_V1 = Router   