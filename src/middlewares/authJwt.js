import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { secret } from "~/config/auth.config";
import { boardService } from "../services/boardService";

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "No token provided!" });
  }
  verify(token, secret, (err, decode) => {
    if (err)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    req.userId = decode.id;
    next();
  });
};

export const verifyBoardAccess = async (req, res, next) => {
  const boardId = req.params.id;
  const userId = req.userId;
  if (await boardService.verifyBoardAdmin(boardId, userId)) {
    next();
  } else if (await boardService.verifyBoardAccess(boardId, userId)) {
    next();
  }
  else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
};
