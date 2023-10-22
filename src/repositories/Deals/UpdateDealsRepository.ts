import { Deal } from "../../entities/Deal";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import { hash, compare } from "bcrypt";
import { Contact } from "../../entities/Contact";

type UpdateDealRequest = {
  name?: string;
  value: number;
  contacts: number[];
};

export class UpdateDealRepository {
  async execute(
    data: UpdateDealRequest,
    dealId: number
  ): Promise<Deal | AppError> {
    const deal_id = dealId;
    const { name, value, contacts } = data;

    const arrayContacts = contacts.map((id) => {
      const contact = new Contact();
      contact.id = id;
      return contact;
    });

    const repo = AppDataSource.getRepository(Deal);

    const findDeal = await repo.findOne({
      where: { id: deal_id },
      relations: {
        contacts: true,
      },
    });

    if (!findDeal) {
      return new AppError("Negócio não encontrado");
    }

    findDeal.name = name ?? findDeal.name;
    findDeal.value = value ?? findDeal.value;
    findDeal.contacts = [...findDeal.contacts, ...arrayContacts];

    const updatedDeal = await repo.save(findDeal);

    return updatedDeal;
  }
}
