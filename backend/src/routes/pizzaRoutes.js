import express from "express";
import { listarPizzas, listarPizzasDoces } from "../controllers/pizzaController.js";

const router = express.Router();

// Rota para pizzas salgadas
router.get("/", listarPizzas);

// Rota para pizzas doces
router.get("/doce", listarPizzasDoces);

export default router;
