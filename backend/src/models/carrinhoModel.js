import { connectDB, sql } from "../config/db.js";

class CarrinhoModel {


  static async adicionar(id_usuario, id_montarProduto, id_montarPedido, quantidade, valor_unitario, valor_total) {
    const db = await connectDB();

    const checkRequest = db.request();
    checkRequest.input("id_montarProduto", sql.Int, id_montarProduto);


    const itemExistente = await checkRequest.query(`
        SELECT id_carrinho, quantidade 
        FROM Carrinho 
        WHERE id_montarProduto = @id_montarProduto 
          AND id_usuario IS NULL 
    `);

    if (itemExistente.recordset.length > 0) {

      const item = itemExistente.recordset[0];

      const novaQuantidade = item.quantidade + quantidade;
      const novoValorTotal = novaQuantidade * valor_unitario;

      const updateRequest = db.request();
      updateRequest.input("id_carrinho", sql.Int, item.id_carrinho);
      updateRequest.input("quantidade", sql.Int, novaQuantidade);
      updateRequest.input("valor_total", sql.Decimal(10, 2), novoValorTotal);

      await updateRequest.query(`
            UPDATE Carrinho
            SET quantidade = @quantidade,
                valor_total = @valor_total
            WHERE id_carrinho = @id_carrinho
        `);

      return { id_carrinho: item.id_carrinho };

    }
    else {

      const insertRequest = db.request();
      insertRequest.input("id_usuario", sql.Int, id_usuario);
      insertRequest.input("id_montarProduto", sql.Int, id_montarProduto);
      insertRequest.input("id_montarPedido", sql.Int, id_montarPedido);
      insertRequest.input("quantidade", sql.Int, quantidade);
      insertRequest.input("valor_unitario", sql.Decimal(10, 2), valor_unitario);
      insertRequest.input("valor_total", sql.Decimal(10, 2), valor_total);

      const result = await insertRequest.query(`
            INSERT INTO Carrinho (
                id_usuario, id_montarProduto, id_montarPedido, 
                quantidade, valor_unitario, valor_total
            ) VALUES (
                @id_usuario, @id_montarProduto, @id_montarPedido, 
                @quantidade, @valor_unitario, @valor_total
            );
            
            SELECT SCOPE_IDENTITY() AS id_carrinho;
        `);

      return result.recordset[0];
    }
  }

  // ====================================================================================================================

  // NOVO MÉTODO: LISTAR

  // ====================================================================================================================


  static async listar() {
    const db = await connectDB();

    const result = await db.request().query(`
        SELECT 
        c.id_carrinho,
        c.id_usuario,
          c.id_montarProduto,
          c.id_montarPedido,
          c.quantidade,
          c.valor_unitario,
          c.valor_total,
          c.data_adicionado,
          COALESCE(mp.descricao, mpe.descricao) AS descricao_item 
          FROM Carrinho c
          LEFT JOIN MontarProduto mp ON c.id_montarProduto = mp.id_montarProduto
          LEFT JOIN MontarPedido mpe ON c.id_montarPedido = mpe.id_MontarPedido
          ORDER BY c.id_carrinho DESC
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
