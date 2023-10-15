import  Express  from "express";
import {StatusCodes} from 'http-status-codes'
const Router = Express.Router();

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Get ok'});
    })
    .post((req, res) => {
        res.status(StatusCodes.CREATED).json({ message: 'Post ok'});
    })
    .put()
    .delete()

export const boardRouters = Router;


