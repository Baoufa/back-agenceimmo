import fs from 'fs';
import path from 'path';
import __dirname from '../../server.mjs';
import imageFormatter from '../services/imageFormatter.mjs';

import ImageModel from '../models/ImageModel.mjs';
import RelationRealtyImageModel from '../models/RelationRealtyImage.mjs';

class ImageController {
  addOne(req, res) {
    imageFormatter(req.files.image.data)
      .then(image => {
        fs.writeFileSync(
          path.join(__dirname, 'public', 'realty-images', image.name),
          image.data
        );
        return image.name;
      })
      .then(imageName => new ImageModel().addOne(imageName))
      .then(result => {
        new RelationRealtyImageModel().addOne(
          parseInt(req.body.destination),
          parseInt(result.insertId)
        );
      })
      .then(result => res.status(201).send(result));
  }
}

export default ImageController;
