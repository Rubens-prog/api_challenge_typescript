import { Deal } from "../../entities/Deal";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import { Contact } from "../../entities/Contact";

type CreateDealRequest = {
  name: string;
  value: number;
  contacts?: number[];
};

export class CreateDealRepository {
  async execute(data: CreateDealRequest): Promise<Deal | AppError> {
    const { name, value, contacts } = data;

    const repo = AppDataSource.getRepository(Deal);

    if (!name) {
      return new AppError("O nome é obrigatório!");
    }

    const contactsId = contacts?.map((number) => ({ id: number }));

    const deal = repo.create({
      name,
      value: value ?? 0,
      contacts: contactsId,
    });

    await repo.save(deal);

    return deal;
  }
}
