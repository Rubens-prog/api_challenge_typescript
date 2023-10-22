import { Router } from "express";
import ensureAuthenticated from "../../middleware/ensureAutheticated";
import ContactsController from "../../controllers/ContactsController";

const contactsRoutes = Router();
const contactsController = new ContactsController();

contactsRoutes.use(ensureAuthenticated);

contactsRoutes.get("/", contactsController.index);
contactsRoutes.post("/", contactsController.create);
contactsRoutes.put("/:id", contactsController.update);
contactsRoutes.delete("/:id", contactsController.delete);

export default contactsRoutes;
