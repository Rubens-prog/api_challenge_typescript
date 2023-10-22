import AppError from "../utils/AppError";
import { Request, Response } from "express";
import { ListDealsRepository } from "../repositories/Deals/ListDealsRepository";
import { CreateDealRepository } from "../repositories/Deals/CreateDealsRepository";
import { DeleteDealRepository } from "../repositories/Deals/DeleteDealsRepository";
import { UpdateDealRepository } from "../repositories/Deals/UpdateDealsRepository";

class DealsController {
  async index(request: Request, response: Response) {
    const { name, contacts } = request.body;

    const dealsRepository = new ListDealsRepository();

    const result = await dealsRepository.execute({
      name: name,
      contacts,
    });

    return response.json({ result });
  }

  async create(request: Request, response: Response) {
    const { name, value, contacts } = request.body;

    const dealsRepository = new CreateDealRepository();

    const result = await dealsRepository.execute({ name, value, contacts });

    if (result instanceof AppError) {
      return response.json({ status: "Error", message: result.message });
    }

    return response.json({ message: "Criado com sucesso!" });
  }

  async update(request: Request, response: Response) {
    const { name, value, contacts } = request.body;
    const { id } = request.params;

    const dealsRepository = new UpdateDealRepository();

    const result = await dealsRepository.execute(
      {
        name,
        value,
        contacts,
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

    const dealsRepository = new DeleteDealRepository();

    const result = await dealsRepository.execute(Number(id));

    return response.json({ message: result });
  }
}
export default DealsController;
