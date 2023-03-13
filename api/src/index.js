import "dotenv/config";
import express, { json } from "express";
import routers from "./routers/index.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(json());
app.use(routers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API is running! PORT: ${PORT}`);
});
