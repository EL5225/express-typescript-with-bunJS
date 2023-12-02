import express, { Express } from "express";
import router from "./src/routes";
import {
  internalServerError,
  notFound,
  prismaErrorHandlrer,
  zodErrorHandler,
} from "@/middlewares";
import morgan from "morgan";
const { PORT } = process.env;
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use(zodErrorHandler);
app.use(prismaErrorHandlrer);
app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
