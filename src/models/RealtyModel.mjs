import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class RealtyModel {
  countAll() {
    const query = 'SELECT COUNT(*) as nb FROM `realties`';
    return mysql.execute(query).then(result => result[0][0].nb);
  }

  // Modifier pour ne faire que le read all
  readAll(offset = 0, limit = 100) {
    const query = 'SELECT * FROM `realties` LIMIT ?,?';
    return mysql.execute(query, [offset, limit]).then(result => result[0]);
  }

  readOne(id) {
    const query =
      'SELECT *  FROM `realties` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }

  createOne(entity) {
    const query = 'INSERT INTO `realties` (`type`, `address_1`, `address_2`, `city`, `zipcode`, `surface`, `nb_rooms`, `price`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return mysql
      .execute(query, 
        Object.values(entity)
      )
      .then(result => result[0]);
  }

  updateOne(setter, id) {
    const query = 'UPDATE `realties` SET ? WHERE id = ?';
    return mysql.query(query, [setter, id]).then(result => result[0]);
  }

  deleteOne(id) {
    const query = 'DELETE FROM `realties` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }
}

export default RealtyModel;
