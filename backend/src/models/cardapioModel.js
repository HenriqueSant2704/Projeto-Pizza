import { connectDB, sql } from "../config/db.js";

export async function buscarCategorias() {
  const pool = await connectDB();
  const result = await pool.request().query(`
    SELECT id_categoria, nome_categoria, imagem_url, descricao, ativo
    FROM Categoria
    WHERE ativo = 1
    ORDER BY nome_categoria
  `);
  return result.recordset;
}

export async function buscarProdutosPorCategoria(id_categoria) {
  const pool = await connectDB();
  const result = await pool.request()
  .input("id_categoria", sql.Int, id_categoria)
  .query(`
      SELECT 
      mp.id_montarProduto,
      mp.descricao AS descricao_montada,
      mp.valor_total,
      mp.imagem_url,
      p.nome_produto,
      p.descricao AS desc_produto,
      s.nome_sabor,
      s.tipo_sabor,
      t.nome_tamanho AS tamanho 
      FROM MontarProduto mp
      INNER JOIN Produto p ON p.id_produto = mp.id_produto
      LEFT JOIN Sabores s ON s.id_sabor = mp.id_sabor
      LEFT JOIN Tamanho t ON t.id_tamanho = mp.id_tamanho 
      WHERE mp.id_categoria = @id_categoria 
      AND mp.ativo = 1
    `);

 return result.recordset;
}
