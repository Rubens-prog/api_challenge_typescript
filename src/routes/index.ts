import { Router } from "express";

import sessionsRoutes from "./sessions/sessions.routes";
import usersRoutes from "./users/users.routes";
import contactsRoutes from "./contacts/contacts.routes";
import dealsRoutes from "./deals/deals.routes";

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/contacts", contactsRoutes);
routes.use("/deals", dealsRoutes);

export default routes;
