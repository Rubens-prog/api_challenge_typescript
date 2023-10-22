import { AppDataSource } from "../../data-source";
import { Deal } from "../../entities/Deal";

type ListDealsRequest = {
  name?: string;
  contacts: number[];
};

export class ListDealsRepository {
  async execute(data: ListDealsRequest): Promise<Deal[]> {
    const { name, contacts } = data;

    const repo = AppDataSource.getRepository(Deal);

    const query = repo.createQueryBuilder("deals");

    if (name) {
      query.where(`deals.name ILIKE :name`, { name: `%${name}%` });
    }

    if (contacts && contacts.length > 0) {
      query.innerJoin(
        (qb2) => {
          return qb2
            .select("deals.id", "id")
            .from(Deal, "deals")
            .innerJoin("deals.contacts", "contacts")
            .where("contacts.id IN (:...contactIds)", { contactIds: contacts });
        },
        "dealsWithContacts",
        'deals.id = "dealsWithContacts".id'
      );
    }

    query.leftJoinAndSelect("deals.contacts", "contacts");

    const deals = await query.getMany();

    return deals;
  }
}
