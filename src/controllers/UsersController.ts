import AppError from "../utils/AppError";
import { Request, Response } from "express";
import { CreateUserRepository } from "../repositories/Users/CreateUserRepository";
import { UpdateUserRepository } from "../repositories/Users/UpdateUserRepository";
import { DeleteUserRepository } from "../repositories/Users/DeleteUserRepository";
import { ListUsersRepository } from "../repositories/Users/ListUsersRepository";

class UsersController {
  async index(request: Request, response: Response) {
    const { name, email } = request.query;

    const userRepository = new ListUsersRepository();

    const result = await userRepository.execute({
      email: email?.toString(),
      name: name?.toString(),
    });

    return response.json({ result });
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = new CreateUserRepository();

    const result = await userRepository.execute({ name, email, password });

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Criado com sucesso!" });
  }

  async update(request: Request, response: Response) {
    const { name, email, password, old_password } = request.body;

    const id = Number(request.user);

    const userRepository = new UpdateUserRepository();

    const result = await userRepository.execute(
      {
        name,
        email,
        password,
        old_password,
      },
      id
    );

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Editado com sucesso!", id });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = new DeleteUserRepository();

    const result = await userRepository.execute(Number(id));

    return response.json({ message: result });
  }
}
export default UsersController;
