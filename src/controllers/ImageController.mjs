import fs from 'fs';
import path from 'path';
import {__dirname} from '../../server.mjs';
import imageFormatter from '../services/imageFormatter.mjs';
import ImageModel from '../models/ImageModel.mjs';
import RelationRealtyImageModel from '../models/RelationRealtyImageModel.mjs';

class ImageController {

  // A supprimer inutile juste pour appeler pour le test 
  readAll(req, res) {
    new ImageModel()
    .readAll([39, 40, 41, 42])
    .then(response => console.log(response))
  }
  
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

  deleteOne(req, res) {
    const imageModel = new ImageModel();
    imageModel
      .readOne(req.params.id)
      .then(result =>
        fs.unlinkSync(
          path.join(__dirname, 'public', 'realty-images', result[0].filename)
        )
      )
      .then(data => imageModel.deleteOne(req.params.id))
      .then(result => res.status(201).send(result));
  }
}

export default ImageController;
