import Express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";
import { verifyToken, verifyBoardAccess } from "~/middlewares/authJwt";

const Router = Express.Router();

Router.route("/")
  .get([verifyToken], (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Get ok" });
  })
  .post(boardValidation.createNew, boardController.createNew)
  .put()
  .delete();

Router.route("/:id")
  .get([verifyToken, verifyBoardAccess], boardController.getDetails)
  .post()
  .put(boardValidation.update, boardController.update)
  .delete()

Router.route('/owner/:id')
  .get(boardController.getBoardByUserIdDetails)
  .post()
  .put(boardValidation.update, boardController.update)
  .delete();

export const boardRoute = Router;
