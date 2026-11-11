import express from "express";
import { connectToDatabase } from "./src/db.js";
import cors from "cors";
import { router } from "./routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(router);

connectToDatabase();

app.listen(4000, () => {
  console.log("Rodando na porta 4000");
});
