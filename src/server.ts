import express from "express";
import { Request, Response, NextFunction, Express } from "express";

import { AppDataSource } from "./data-source";

import AppError from "./utils/AppError";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes);

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      console.error(error);

      return response.status(500).json({
        status: "Error",
        message: "Internal server error",
      });
    }
  );

  const PORT = 3333;

  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
});
