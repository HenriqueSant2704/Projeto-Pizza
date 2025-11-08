import { connectDB, sql } from "../config/db.js";

export async function getPizzasByTipo(tipo) {
  try {
    const pool = await connectDB(); // garante conexão ativa
    const request = pool.request();

    request.input("tipo", sql.VarChar(50), tipo);
    const query = `
      SELECT TOP 6 
        id_sabor, nome_sabor, descricao, valor_sabor, tipo_sabor, imagem_url
      FROM Sabores
      WHERE tipo_sabor = @tipo AND ativo = 1
      ORDER BY data_criacao DESC;
    `;

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}
