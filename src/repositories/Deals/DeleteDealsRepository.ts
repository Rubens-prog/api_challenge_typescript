import { Deal } from "../../entities/Deal";
import { AppDataSource } from "../../data-source";
import AppError from "../../utils/AppError";

export class DeleteDealRepository {
  async execute(dealId: number): Promise<string | AppError> {
    const deal_id = dealId;

    const repo = AppDataSource.getRepository(Deal);

    const findDeal = await repo.findOne({ where: { id: deal_id } });

    if (!findDeal) {
      return new AppError("Negócio não encontrado!");
    }

    await repo.remove(findDeal);

    return "Deletado com Sucesso!";
  }
}
