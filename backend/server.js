import express from "express";
import cors from "cors";
import pizzaRoutes from "./src/routes/pizzaRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

// Rota principal
app.use("/pizzas", pizzaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
