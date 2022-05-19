import RealtyModel from '../models/RealtyModel.mjs';
import dataApiResponse from '../services/dataApiResponse.mjs';

class RealtyController {
  readAll(req, res) {
    const page = req.query.page || 1;
    const limit = 100;
    const offset = page * limit - limit;

    Promise.all([
      new RealtyModel().countAll(),
      new RealtyModel().readAll(offset, limit),
    ]).then(result =>
      res.status(200).json(dataApiResponse(result[1], page, result[0], limit))
    );
  }

  readOne(req, res) {
    const id = req.params.id;
    new RealtyModel()
      .readOne(id)
      .then(response => res.status(200).json(dataApiResponse(response)))
      .catch(e => console.log(e));
  }

  createOne(req, res) {
    const RealtyObject = {
      type: req.body.type < 7 && req.body.type > 0 ? req.body.type : null,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      zipcode: req.body.zipcode,
      surface: req.body.surface,
      nb_rooms: req.body.nb_rooms,
      price: req.body.price,
      description: req.body.description,
    };
    new RealtyModel()
      .createOne(RealtyObject)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  updateOne(req, res) {
    let entity = {};
    let fields = ['type', 'address_1', 'address_2', 'city', 'zipcode', 'surface', 'nb_rooms', 'price', 'description'];
    fields.forEach(field => {
      if (req.body[field]) {
        entity[field] = req.body[field];
      }
    });

    new RealtyModel()
      .updateOne(entity, req.params.id)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  deleteOne(req, res) {
    const id = req.params.id;
    new RealtyModel()
      .deleteOne(id)
      .then(response => res.status(200).json(response))
      .catch(e => console.log(e));
  }
}

export default RealtyController;
