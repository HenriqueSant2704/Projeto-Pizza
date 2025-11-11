import CarrinhoModel from "../models/carrinhoModel.js";

class CarrinhoController {

  static async adicionar(req, res) {
    try {
      const { id_montarProduto, quantidade, valor_total } = req.body;

      const idProdutoParsed = parseInt(id_montarProduto, 10);

      if (isNaN(idProdutoParsed)) {
        return res.status(400).json({ error: "ID do produto inválido." });
      }

      const id_usuario = null;
      const id_montar_pedido = null;
      const valor_unitario = valor_total / quantidade;

      const novoItem = await CarrinhoModel.adicionar(
        id_usuario,
        idProdutoParsed,
        id_montar_pedido,
        quantidade,
        valor_unitario,
        valor_total
      );

      res.json({
        message: "Item adicionado ao carrinho!",
        id_carrinho: novoItem.id_carrinho
      });

    } catch (error) {
      console.error("Erro ao adicionar carrinho:", error);
      res.status(500).json({ error: "Erro interno ao adicionar carrinho." });
    }
  }

  // ==================================================================================================================================================

  // NOVO: LISTAR CARRINHO

  // =================================================================================================================================================
  
  static async listar(req, res) {
    try {
      const itens = await CarrinhoModel.listar();
      res.json(itens);

    } catch (error) {
      console.error("Erro ao listar o carrinho:", error);
      res.status(500).json({ error: "Erro interno ao listar o carrinho." });
    }
  }

// ====================================================================================================================

// REMOVE O ITEM DO CARRINHO

// ====================================================================================================================

  static async deletar(req, res) {
            try {
            const { id } = req.params;

            const idParsed = parseInt(id, 10);
            if (isNaN(idParsed)) {
                  return res.status(400).json({ error: "ID inválido." });
            }

            const linhasAfetadas = await CarrinhoModel.deletar(idParsed);

            if (linhasAfetadas === 0) {
                  return res.status(404).json({ error: "Item não encontrado no carrinho." });
            }

            res.json({ message: "Item removido com sucesso!" });

            } catch (error) {
            console.error("Erro ao deletar item:", error);
            res.status(500).json({ error: "Erro interno ao remover item." });
            }
      }

// ==========================================================================

// ATUALIZAR QUANTIDADE DO ITEM

// ==========================================================================

static async atualizarQuantidade(req, res) {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const idParsed = parseInt(id, 10);
    const quantidadeParsed = parseInt(quantidade, 10);

    if (isNaN(idParsed) || isNaN(quantidadeParsed) || quantidadeParsed < 1) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const item = await CarrinhoModel.buscarPorId(idParsed);

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    const novoValorTotal = item.valor_unitario * quantidadeParsed;

    const linhasAfetadas = await CarrinhoModel.atualizarQuantidade(
      idParsed,
      quantidadeParsed,
      novoValorTotal
    );

    if (linhasAfetadas === 0) {
      return res.status(400).json({ error: "Nenhuma linha alterada." });
    }

    res.json({ 
      message: "Quantidade atualizada!",
      novo_total: novoValorTotal
    });

  } catch (erro) {
    console.error("Erro ao atualizar quantidade:", erro);
    res.status(500).json({ error: "Erro interno ao atualizar quantidade." });
  }
}


}

export default CarrinhoController;
