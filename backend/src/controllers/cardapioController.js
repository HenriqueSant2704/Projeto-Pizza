import { buscarCategorias, buscarProdutosPorCategoria } from "../models/cardapioModel.js";

export async function getCardapio(req, res) {
  try {
    const categorias = await buscarCategorias();
    const respostaFinal = [];

    for (const categoria of categorias) {
      const produtos = await buscarProdutosPorCategoria(categoria.id_categoria);

      const carrosseis = {};

      for (const item of produtos) {
        const tipo = item.tipo_sabor || "Sem Tipo";

        if (!carrosseis[tipo]) {
          carrosseis[tipo] = [];
        }

        carrosseis[tipo].push({
          id_montarProduto: item.id_montarProduto,
          nome: item.nome_produto,
          descricao: item.descricao_montada || item.desc_produto,
          imagem: item.imagem_url,
          tipo_sabor: tipo,
          valor: item.valor_total,
          tamanho: item.tamanho
        });
      }

      respostaFinal.push({
        id_categoria: categoria.id_categoria,
        nome: categoria.nome_categoria,
        descricao: categoria.descricao,
        imagem: categoria.imagem_url,
        carrosseis
      });
    }

    res.json(respostaFinal);

  } catch (err) {
    console.error("Erro no controller do cardápio:", err);
    res.status(500).json({ erro: "Erro ao montar cardápio" });
  }
}
