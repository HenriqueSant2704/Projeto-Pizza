import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import cardapioRoutes from "./src/routes/cardapioRoutes.js";
import carrinhoRoutes from "./src/routes/carrinhoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Corrigir caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(__dirname));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Rotas da API
app.use("/api", cardapioRoutes);
app.use("/api/carrinho", carrinhoRoutes);

// Rota principal → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Porta (Render define automaticamente a variável PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
