import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class RealtyTypeModel {
  countAll() {
    const query = 'SELECT COUNT(*) as nb FROM `type_realties`';
    return mysql.execute(query).then(result => result[0][0].nb);
  }

  readAll(offset = 0, limit = 100) {
    const query = 'SELECT * FROM `type_realties` LIMIT ?,?';
    return mysql.execute(query, [offset, limit]).then(result => result[0]);
  }

  readOne(id) {
    const query = 'SELECT * FROM `type_realties` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }

  createOne(entity) {
    const query = 'INSERT INTO `type_realties` (`title`) VALUES (?)';
    return mysql.execute(query, [entity.title]).then(result => result[0]);
  }

  updateOne(entity, id) {
    const query = 'UPDATE `type_realties` SET `title` = ? WHERE id = ?';
    return mysql.query(query, [entity.title, id]).then(result => result[0]);
  }

  deleteOne(id) {
    const query = 'DELETE FROM `type_realties` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }
}

export default RealtyTypeModel;
