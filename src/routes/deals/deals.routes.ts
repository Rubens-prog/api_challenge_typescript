import { Router } from "express";
import ensureAuthenticated from "../../middleware/ensureAutheticated";
import DealsController from "../../controllers/DealsController";

const dealsRoutes = Router();
const dealsController = new DealsController();

dealsRoutes.use(ensureAuthenticated);

dealsRoutes.get("/", dealsController.index);
dealsRoutes.post("/", dealsController.create);
dealsRoutes.put("/:id", dealsController.update);
dealsRoutes.delete("/:id", dealsController.delete);

export default dealsRoutes;
