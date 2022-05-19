import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class RelationRealtyImageModel {
  addOne(realtyId, imageId) {
    const query = 'INSERT INTO `relation_realties_images` (`realty`, `image`) VALUES (?, ?)';
    return mysql
      .execute(query, [realtyId, imageId])
      .then(result => result[0]);
  }

  getAllImgId(realtyId){
    const query = 'SELECT * FROM `relation_realties_images` WHERE `realty`=?';
    return mysql
      .execute(query, [realtyId])
      .then(result => result[0].map(obj => obj.image));
  }
}

export default RelationRealtyImageModel;