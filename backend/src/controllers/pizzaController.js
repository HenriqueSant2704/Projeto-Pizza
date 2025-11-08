import { connectDB } from "../config/db.js";

export async function listarPizzas(req, res) {
  try {
    const pool = await connectDB();

   const query = `
    SELECT 
      MP.id_montarProduto AS id,
      MP.descricao,
      MP.valor_total,
      MP.imagem_url,
      S.tipo_sabor,
      T.nome_tamanho
    FROM MontarProduto MP
    JOIN Sabores S ON MP.id_sabor = S.id_sabor
    LEFT JOIN Tamanho T ON MP.id_tamanho = T.id_tamanho
    WHERE MP.id_categoria = 1  -- pizzas
      AND MP.ativo = 1
    ORDER BY S.tipo_sabor, MP.data_criacao DESC;
`;


    const result = await pool.request().query(query);

   
    const pizzasSalgadas = [];
    const pizzasDoces = [];

    for (const p of result.recordset) {
      const pizza = {
          id: p.id,
          descricao: p.descricao,
          valor_total: Number(p.valor_total),
          imagem_url: p.imagem_url,
          tipo_sabor: p.tipo_sabor?.trim() || "Salgada",
          tamanho: p.nome_tamanho || "Não informado"
      };

      if (pizza.tipo_sabor.toLowerCase() === "doce") {
        pizzasDoces.push(pizza);
      } else {
        pizzasSalgadas.push(pizza);
      }
    }

    res.json({
      salgadas: pizzasSalgadas,
      doces: pizzasDoces,
    });
  } catch (err) {
    console.error("Erro ao listar pizzas:", err);
    res.status(500).json({ error: "Erro ao buscar pizzas" });
  }
}

// ===============================
// Pizzas Doces
// ===============================
export async function listarPizzasDoces(req, res) {
  try {
    const pool = await connectDB();

    const query = `
      SELECT 
        MP.id_montarProduto AS id,
        MP.descricao,
        MP.valor_total,
        MP.imagem_url,
        MP.tamanho,
        S.tipo_sabor
      FROM MontarProduto MP
      JOIN Sabores S ON MP.id_sabor = S.id_sabor
      WHERE MP.id_categoria = 1
        AND MP.ativo = 1
        AND S.tipo_sabor = 'Doce'
      ORDER BY MP.data_criacao DESC;
    `;

    const result = await pool.request().query(query);

    const pizzasDoces = result.recordset.map(p => ({
      id: p.id,
      descricao: p.descricao,
      valor_total: Number(p.valor_total),
      imagem_url: p.imagem_url,
      tamanho: p.tamanho || "Médio",
    }));

    res.json(pizzasDoces);
  } catch (err) {
    console.error("Erro ao listar pizzas doces:", err);
    res.status(500).json({ error: "Erro ao buscar pizzas doces" });
  }
}
