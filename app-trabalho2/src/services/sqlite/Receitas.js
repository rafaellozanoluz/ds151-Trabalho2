import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS receitas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, servings TEXT, ingredients TEXT, instructions TEXT);"
  );
});
  
  /**
   * CRIAÇÃO DE UM NOVO REGISTRO
   * - Recebe um objeto;
   * - Retorna uma Promise:
   *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
   *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
   */
  const create = (obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "INSERT INTO receitas (title, servings, ingredients, instructions) values (?, ?, ?, ?);",
          [obj.title, obj.servings, obj.ingredients, obj.instructions],
          //-----------------------
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };
  
  /**
   * ATUALIZA UM REGISTRO JÁ EXISTENTE
   * - Recebe o ID do registro e um OBJETO com valores atualizados;
   * - Retorna uma Promise:
   *  - O resultado da Promise é a quantidade de registros atualizados;
   *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
   */
  const update = (id, obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "UPDATE receitas SET title=? WHERE id=?;",
          [obj, id],
          //-----------------------
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject("Error updating obj: id=" + id); // nenhum registro alterado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };
  
  /**
   * BUSCA UM REGISTRO POR MEIO DO ID
   * - Recebe o ID do registro;
   * - Retorna uma Promise:
   *  - O resultado da Promise é o objeto (caso exista);
   *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
   */
  const find = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM receitas WHERE id=?;",
          [id],
          //-----------------------
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Obj not found: id=" + id); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };
  
    
  /**
   * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
   * - Não recebe parâmetros;
   * - Retorna uma Promise:
   *  - O resultado da Promise é uma lista (Array) de objetos;
   *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
   *  - Pode retornar um array vazio caso não existam registros.
   */
  const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM receitas;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };
  
  /**
   * REMOVE UM REGISTRO POR MEIO DO ID
   * - Recebe o ID do registro;
   * - Retorna uma Promise:
   *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
   *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
   */
  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM receitas WHERE id=?;",
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };
  
  export default {
    create,
    update,
    find,
    all,
    remove,
  };