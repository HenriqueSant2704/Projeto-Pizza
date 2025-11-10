import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import cardapioRoutes from "./src/routes/cardapioRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agora sim: serve assets que estão FORA do backend
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// Rotas da API
app.use("/api", cardapioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
