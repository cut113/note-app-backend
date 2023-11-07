import express from "express";
import cors from "cors";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import { userValidation } from "~/validations/userValidation";
import { userController } from "~/controllers/userController";

router
  .route("/login")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Get ok" });
  })
  .post(cors(), userValidation.validateUser, userController.validateUser);

router
  .route("/register")
  .get()
  .post(cors(), userValidation.createNewUser, userController.createNewUser);

export const authRoute = router;
