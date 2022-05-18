import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class UserModel {
  countAll() {
    const query = 'SELECT COUNT(*) as nb FROM `users`';
    return mysql.execute(query).then(result => result[0][0].nb);
  }

  // Modifier pour ne faire que le read all
  readAll(offset = 0, limit = 100) {
    const query = 'SELECT * FROM `users` LIMIT ?,?';
    return mysql.execute(query, [offset, limit]).then(result => result[0]);
  }

  readOne(id) {
    const query =
      'SELECT `id`, `firstname`, `lastname`, `email`, `date`  FROM `users` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }

  createOne(user) {
    const query = 'INSERT IGNORE INTO `users` VALUES (?, ?, ?, ?, ?, now())';
    return mysql
      .execute(query, [
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.password,
      ])
      .then(result => result[0]);
  }

  updateOne(setter, id) {
    const query = 'UPDATE `users` SET ? WHERE id = ?';
    return mysql.query(query, [setter, id]).then(result => result[0]);
  }

  deleteOne(id) {
    const query = 'DELETE FROM `users` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }
}

export default UserModel;
