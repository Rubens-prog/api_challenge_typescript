import { Router } from "express";
import usersRoutes from "./users/users.routes";
import sessionsRoutes from "./sessions/sessions.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

export default routes;
