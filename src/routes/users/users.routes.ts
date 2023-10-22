import { Router } from "express";
import UsersController from "../../controllers/UsersController";
import ensureAuthenticated from "../../middleware/ensureAutheticated";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

export default usersRoutes;
