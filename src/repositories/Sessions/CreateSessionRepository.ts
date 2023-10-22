import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import authConfig from "../../configs/auth";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

type CreateSessionRequest = {
  email: string;
  password: string;
};

export class CreateSessionRepository {
  async execute(data: CreateSessionRequest): Promise<User | string | AppError> {
    const { email, password } = data;

    const repo = AppDataSource.getRepository(User);

    if (!email || !password) {
      return new AppError("Preencha todos os campos!");
    }

    const checkUser = await repo.findOne({ where: { email } });

    if (!checkUser) {
      return new AppError("Usuário não encontrado");
    }

    const checkPassword =
      checkUser && (await compare(password, checkUser.password));

    if (!checkPassword) {
      return new AppError("Email ou senha não confere!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(checkUser.id),
      expiresIn: expiresIn,
    });

    return token;
  }
}
