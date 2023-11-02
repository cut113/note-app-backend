import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { secret } from "~/config/auth.config";
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
