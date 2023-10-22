import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import { FindManyOptions, ILike } from "typeorm";

type ListUsersRequest = {
  name?: string;
  email?: string;
};

export class ListUsersRepository {
  async execute(data: ListUsersRequest): Promise<User[]> {
    const { email, name } = data;

    const repo = AppDataSource.getRepository(User);

    const query: FindManyOptions<User> = {
      select: ["id", "name", "email"],
      where: {},
    };

    if (email) {
      query.where = { ...query.where, email: ILike(`%${email}%`) };
    }

    if (name) {
      query.where = { ...query.where, name: ILike(`%${name}%`) };
    }

    const users = await repo.find(query);

    return users;
  }
}
