import { Request, Response } from "express";
import { CreateSessionRepository } from "../repositories/Sessions/CreateSessionRepository";
import AppError from "../utils/AppError";

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const sessionsRepository = new CreateSessionRepository();
    const result = await sessionsRepository.execute({ email, password });

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Criado com sucesso!", token: result });
  }
}

export default SessionsController;
