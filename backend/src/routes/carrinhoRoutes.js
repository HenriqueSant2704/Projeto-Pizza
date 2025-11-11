import express from "express";
import CarrinhoController from "../controllers/carrinhoController.js";

const router = express.Router();

router.post("/add", CarrinhoController.adicionar);

router.get("/listar", CarrinhoController.listar);

router.delete("/deletar/:id", CarrinhoController.deletar);

router.put("/atualizar/:id", CarrinhoController.atualizarQuantidade);



export default router;
