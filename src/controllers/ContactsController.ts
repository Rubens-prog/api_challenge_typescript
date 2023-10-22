import AppError from "../utils/AppError";
import { Request, Response } from "express";
import { ListContactsRepository } from "../repositories/Contacts/ListContactsRepository";
import { CreateContactRepository } from "../repositories/Contacts/CreateContactRepository";
import { DeleteContactRepository } from "../repositories/Contacts/DeleteContactRepository";
import { UpdateContactRepository } from "../repositories/Contacts/UpdateContactRepository";

class ContactsController {
  async index(request: Request, response: Response) {
    const { name, email, deals } = request.body;

    const contactRepository = new ListContactsRepository();

    const result = await contactRepository.execute({
      email,
      name,
      deals,
    });

    return response.json({ result });
  }

  async create(request: Request, response: Response) {
    const { name, email, phone, deals } = request.body;

    const contactRepository = new CreateContactRepository();

    const result = await contactRepository.execute({
      name,
      email,
      phone,
      deals,
    });

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Criado com sucesso!" });
  }

  async update(request: Request, response: Response) {
    const { name, email, phone, deals } = request.body;
    const { id } = request.params;

    const contactRepository = new UpdateContactRepository();

    const result = await contactRepository.execute(
      {
        name,
        email,
        phone,
        deals,
      },
      Number(id)
    );

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Editado com sucesso!" });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const contactRepository = new DeleteContactRepository();

    const result = await contactRepository.execute(Number(id));

    return response.json({ message: result });
  }
}
export default ContactsController;
