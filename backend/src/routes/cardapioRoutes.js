import { Router } from "express";
import { getCardapio } from "../controllers/cardapioController.js";

const router = Router();

router.get("/cardapio", getCardapio);

export default router;
