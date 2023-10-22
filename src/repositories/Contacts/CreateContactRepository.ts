import { Contact } from "../../entities/Contact";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";

type CreateContactRequest = {
  name: string;
  email: string;
  phone: string;
  deals: number[];
};

export class CreateContactRepository {
  async execute(data: CreateContactRequest): Promise<Contact | AppError> {
    const { email, name, phone, deals } = data;

    const repo = AppDataSource.getRepository(Contact);

    if (!name) {
      return new AppError("O nome é obrigatório!");
    }

    const dealsId = deals?.map((number) => ({ id: number }));

    const contact = repo.create({
      name,
      email,
      phone,
      deals: dealsId,
    });

    await repo.save(contact);

    return contact;
  }
}
