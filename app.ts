import express, { Express } from "express";
import router from "@/routes";
import {
  internalServerError,
  notFound,
  prismaErrorHandlrer,
  zodErrorHandler,
} from "@/middlewares";
import morgan from "morgan";
import cors from "cors";

const { PORT } = process.env;
const app: Express = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use(zodErrorHandler);
app.use(prismaErrorHandlrer);
app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
