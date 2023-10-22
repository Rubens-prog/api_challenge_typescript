import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import { hash } from "bcrypt";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserRepository {
  async execute(data: CreateUserRequest): Promise<User | AppError> {
    const { email, name, password } = data;

    const repo = AppDataSource.getRepository(User);

    if (!email || !name || !password) {
      return new AppError("Preencha todos os campos!");
    }

    const checkUser = await repo.findOne({ where: { email } });

    if (checkUser) {
      return new AppError("Esse email já está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    const user = repo.create({
      name,
      email,
      password: hashedPassword,
    });

    await repo.save(user);

    return user;
  }
}
