import { Contact } from "../../entities/Contact";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";

export class DeleteContactRepository {
  async execute(contactId: number): Promise<string | AppError> {
    const contact_id = contactId;

    const repo = AppDataSource.getRepository(Contact);

    const findContact = await repo.findOne({ where: { id: contact_id } });

    if (!findContact) {
      return new AppError("Contato não encontrado!");
    }

    await repo.remove(findContact);

    return "Deletado com Sucesso!";
  }
}
