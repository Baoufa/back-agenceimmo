import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class UserModel {
  readAll(offset = 0, limit = 100) {
    let response;
    const query1 = 'SELECT COUNT(id) FROM `users`';
    const query2 = 'SELECT * FROM `users` LIMIT ?,?';

    const queryPromise1 = mysql
      .execute(query1)
      .then(result => Object.values(result[0][0])[0]);

    const queryPromise2 = mysql
      .execute(query2, [offset, limit])
      .then(result => result[0]);

    return Promise.all([queryPromise1, queryPromise2]).then(
      result =>
        (response = {
          recordsCount: result[0],
          rows: result[1].length,
          records: result[1],
        })
    );
  }

  readOne(id) {
    const query = 'SELECT * FROM `users` WHERE id = ?';
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
