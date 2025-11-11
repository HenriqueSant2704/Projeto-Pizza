import { connectDB, sql } from "../config/db.js";

class CarrinhoModel {

  static async adicionar(id_usuario, id_montarProduto, id_montarPedido, quantidade, valor_unitario, valor_total) {
    const db = await connectDB();

    const result = await db.request()
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_montarProduto", sql.Int, id_montarProduto)
      .input("id_montarPedido", sql.Int, id_montarPedido)
      .input("quantidade", sql.Int, quantidade)
      .input("valor_unitario", sql.Decimal(10, 2), valor_unitario)
      .input("valor_total", sql.Decimal(10, 2), valor_total)
      .query(`
        INSERT INTO Carrinho (
          id_usuario,
          id_montarProduto,
          id_montarPedido,
          quantidade,
          valor_unitario,
          valor_total
        ) VALUES (
          @id_usuario,
          @id_montarProduto,
          @id_montarPedido,
          @quantidade,
          @valor_unitario,
          @valor_total
        );
        
        SELECT SCOPE_IDENTITY() AS id_carrinho;
      `);

    return result.recordset[0];
  }

  // ====================================================================================================================

  // NOVO MÉTODO: LISTAR

  // ====================================================================================================================


  static async listar() {
    const db = await connectDB();

    const result = await db.request().query(`
      SELECT 
        id_carrinho,
        id_usuario,
        id_montarProduto,
        id_montarPedido,
        quantidade,
        valor_unitario,
        valor_total,
        data_adicionado
      FROM Carrinho
      ORDER BY id_carrinho DESC
    `);

    return result.recordset;
  }

  // ====================================================================================================================

  // REMOVE O ITEM DO CARRINHO

  // ====================================================================================================================

  static async deletar(id_carrinho) {
  const db = await connectDB();
  const result = await db.request()
    .input("id_carrinho", sql.Int, id_carrinho)
    .query(`
      DELETE FROM Carrinho 
      WHERE id_carrinho = @id_carrinho
    `);

  return result.rowsAffected[0]; 
}

// ==========================================================================

// ATUALIZAR QUANTIDADE DO ITEM

// ==========================================================================


static async buscarPorId(id_carrinho) {
  const db = await connectDB();
  const result = await db.request()
    .input("id_carrinho", sql.Int, id_carrinho)
    .query(`
      SELECT * FROM Carrinho
      WHERE id_carrinho = @id_carrinho
    `);

  return result.recordset[0];
}

// Atualizar quantidade e valor_total
static async atualizarQuantidade(id_carrinho, quantidade, valor_total) {
  const db = await connectDB();
  const result = await db.request()
    .input("id_carrinho", sql.Int, id_carrinho)
    .input("quantidade", sql.Int, quantidade)
    .input("valor_total", sql.Decimal(10, 2), valor_total)
    .query(`
      UPDATE Carrinho
      SET quantidade = @quantidade,
          valor_total = @valor_total
      WHERE id_carrinho = @id_carrinho
    `);

  return result.rowsAffected[0];
}


}

export default CarrinhoModel;
