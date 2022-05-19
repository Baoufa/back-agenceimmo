import mysqlConnection from '../services/mysqlConnection.mjs';

const mysql = mysqlConnection.promise();

class RelationRealtyImageModel {
  addOne(imageId, realtyId) {
    console.log('here');
    const query = 'INSERT INTO `relation_realties_images` (`realty`, `image`) VALUES (?, ?)';
    return mysql
      .execute(query, [realtyId, imageId])
      .then(result => 
        {console.log('here');
        return result[0]});
  }
}

export default RelationRealtyImageModel;