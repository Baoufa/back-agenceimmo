import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = await mysqlConnection;

//Difference entre execute et query? 

class UserModel {
  async readAll(pagination) {
    const [count, countFields] = await mysql.execute('SELECT COUNT(id) FROM `users`');
    const [rows, fields] = await mysql.execute('SELECT * FROM `users` LIMIT ?',[pagination*10]);

    const response = {
      userCount : Object.values(count[0])[0],
      rows : rows.length,
      records : rows
    }
    return response;
  }

  async readOne(id) {
    const [rows, fields] = await mysql.execute(
      'SELECT * FROM `users` WHERE id = ?',
      [id]
    );
    return rows;
  }

  async createOne(user) {
    const [rows, fields] = await mysql.execute(
      'INSERT IGNORE INTO `users` VALUES (?, ?, ?, ?, ?, now())',
      [
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.password,
      ]
    );
    console.log(rows);
    return rows;
  }

  async updateOne(setter, id) {
    const [rows, fields] = await mysql.query(
      'UPDATE `users` SET ? WHERE id = ?', [
        setter,
        id
      ]
    );
    console.log(rows);
    return rows;
  }

  async deleteOne(id) {
    const [rows, fields] = await mysql.execute(
      'DELETE FROM `users` WHERE id = ?',
      [id]
    );
    console.log(rows);
    return rows;
  }
}

export default UserModel;
