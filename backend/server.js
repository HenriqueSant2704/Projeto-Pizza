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

// Caminhos
const rootPath = path.join(__dirname, "../.."); // sobe até a raiz do projeto
const frontendPath = path.join(rootPath, "Frontend");

// Servir arquivos estáticos
app.use("/assets", express.static(path.join(rootPath, "assets")));
app.use(express.static(frontendPath));
app.use(express.static(rootPath)); // permite servir o index.html da raiz

// Rotas da API
app.use("/api", cardapioRoutes);
app.use("/api/carrinho", carrinhoRoutes);

// Rota padrão → index.html
app.use((req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});


// Porta (Render usa variável automática PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
