import express from "express";
import { connectToDatabase } from "./src/db.js";
import cors from "cors";
import { router } from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

connectToDatabase();

app.listen(4000, () => {
  console.log("Rodando na porta 4000");
});
