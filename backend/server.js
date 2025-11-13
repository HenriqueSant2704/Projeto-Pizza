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

// Caminho para a raiz do projeto (sobe 1 nível a partir do backend)
const rootPath = path.join(__dirname, "..");

// Servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use("/assets", express.static(path.join(rootPath, "assets")));
app.use(express.static(path.join(rootPath, "Frontend")));
app.use(express.static(rootPath));

// Rotas da API
app.use("/api", cardapioRoutes);
app.use("/api/carrinho", carrinhoRoutes);

// Rota principal → index.html da raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

// Porta (Render define automaticamente a variável PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
