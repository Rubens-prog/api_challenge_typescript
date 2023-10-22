import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";

export class DeleteUserRepository {
  async execute(userId: number): Promise<string | AppError> {
    const user_id = userId;

    const repo = AppDataSource.getRepository(User);

    const findUser = await repo.findOne({ where: { id: user_id } });

    if (!findUser) {
      return new AppError("Usuário não encontrado!");
    }

    await repo.remove(findUser);

    return "Deletado com Sucesso!";
  }
}
