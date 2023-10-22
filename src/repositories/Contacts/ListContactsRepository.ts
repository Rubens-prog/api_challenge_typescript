import { AppDataSource } from "../../data-source";
import { FindManyOptions, ILike } from "typeorm";
import { Contact } from "../../entities/Contact";

type ListContactsRequest = {
  name?: string;
  email?: string;
  deals?: number[];
};

export class ListContactsRepository {
  async execute(data: ListContactsRequest): Promise<Contact[]> {
    const { email, name, deals } = data;

    const repo = AppDataSource.getRepository(Contact);

    const query = repo.createQueryBuilder("contacts");

    if (name) {
      query.where(`contacts.name ILIKE :name`, { name: `%${name}%` });
    }

    if (email) {
      query.where(`contacts.email = :email`, { email });
    }

    if (deals && deals.length > 0) {
      query.innerJoin(
        (qb2) => {
          return qb2
            .select("contacts.id", "id")
            .from(Contact, "contacts")
            .innerJoin("contacts.deals", "deals")
            .where("deals.id IN (:...dealsIds)", { dealsIds: deals });
        },
        "contactsWithDeals",
        'contacts.id = "contactsWithDeals".id'
      );
    }

    query.leftJoinAndSelect("contacts.deals", "deals");

    const contacts = await query.getMany();

    return contacts;
  }
}
