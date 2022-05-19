import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class ImageModel {
  addOne(filename) {
    const query = 'INSERT INTO `images` (`filename`) VALUES (?)';
    return mysql
      .execute(query, [filename])
      .then(result => result[0]);
  }
}

export default ImageModel;
