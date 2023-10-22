import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import { hash, compare } from "bcrypt";

type UpdateUserRequest = {
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
};

export class UpdateUserRepository {
  async execute(
    data: UpdateUserRequest,
    userId: number
  ): Promise<User | AppError> {
    const { email, name, password, old_password } = data;

    const user_id = userId;

    const repo = AppDataSource.getRepository(User);

    const findUser = await repo.findOne({ where: { id: user_id } });

    if (!findUser) {
      return new AppError("Usuário não encontrado");
    }

    if (email) {
      const findEmail = await repo.findOne({ where: { email } });

      if (findEmail && findEmail.id != findUser.id) {
        return new AppError("Esse email já está em uso!");
      }
    }

    if (password && !old_password) {
      return new AppError("VOCÊ PRECISA INFORMAR A ANTIGA SENHA!");
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, findUser.password);

      if (!checkPassword) {
        return new AppError("A senha antiga não confere!");
      }

      findUser.password = await hash(password, 8);
    }

    findUser.name = name ?? findUser.name;
    findUser.email = email ?? findUser.email;

    const updatedUser = await repo.save(findUser);

    return updatedUser;
  }
}
