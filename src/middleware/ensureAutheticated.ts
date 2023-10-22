import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import authConfig from "../configs/auth";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = Number(user_id);

    return next();
  } catch {
    throw new AppError("JWT token inválido!", 401);
  }
}

export default ensureAuthenticated;
