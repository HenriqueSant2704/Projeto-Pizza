import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import cardapioRoutes from "./src/routes/cardapioRoutes.js";
import carrinhoRoutes from "./src/routes/carrinhoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

//======================================================================================================

// Rotas da API

//====================================================================================================================
app.use("/api", cardapioRoutes);

app.use("/api/carrinho", carrinhoRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
