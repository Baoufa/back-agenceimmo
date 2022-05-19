import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class ImageModel {
  readOne(id) {
    const query = 'SELECT *  FROM `images` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }

  readSelected(idsArray) {
    const query = 'SELECT `filename`  FROM `images` WHERE id IN (?)';
    return mysql.query(query, [idsArray]).then(result =>  result[0].map(obj => obj.filename));
  }

  addOne(filename) {
    const query = 'INSERT INTO `images` (`filename`) VALUES (?)';
    return mysql.execute(query, [filename]).then(result => result[0]);
  }

  deleteOne(id) {
    const query = 'DELETE FROM `images` WHERE id = ?';
    return mysql.execute(query, [id]).then(result => result[0]);
  }
}

export default ImageModel;
