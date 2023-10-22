import { Contact } from "../../entities/Contact";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";
import { Deal } from "../../entities/Deal";

type UpdateContactRequest = {
  name?: string;
  email?: string;
  phone?: string;
  deals: number[];
};

export class UpdateContactRepository {
  async execute(
    data: UpdateContactRequest,
    contactId: number
  ): Promise<Contact | AppError> {
    const { email, name, phone, deals } = data;

    const contact_id = contactId;

    const repo = AppDataSource.getRepository(Contact);

    const arrayDeals = deals.map((id) => {
      const deals = new Deal();
      deals.id = id;
      return deals;
    });

    const findContact = await repo.findOne({
      where: { id: contact_id },
      relations: {
        deals: true,
      },
    });

    if (!findContact) {
      return new AppError("Contato não encontrado");
    }

    findContact.name = name ?? findContact.name;
    findContact.email = email ?? findContact.email;
    findContact.phone = phone ?? findContact.phone;
    findContact.deals = [...findContact.deals, ...arrayDeals];

    const updatedContact = await repo.save(findContact);

    return updatedContact;
  }
}
