import RealtyTypeModel from '../models/RealtyTypeModel.mjs';
import dataApiResponse from '../services/dataApiResponse.mjs';

class RealtyTypeController {
  readAll(req, res) {
    const page = req.query.page || 1;
    const limit = 100;
    const offset = page * limit - limit;

    Promise.all([
      new RealtyTypeModel().countAll(),
      new RealtyTypeModel().readAll(offset, limit),
    ]).then(result =>
      res.status(200).json(dataApiResponse(result[1], page, result[0], limit))
    );
  }

  readOne(req, res) {
    const id = req.params.id;
    new RealtyTypeModel()
      .readOne(id)
      .then(response => res.status(200).json(dataApiResponse(response)))
      .catch(e => console.log(e));
  }

  createOne(req, res) {
    const entity = {
      title: req.body.title,
    };
    new RealtyTypeModel()
      .createOne(entity)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  updateOne(req, res) {
    let entity = {};
    let fields = ['title'];
    fields.forEach(field => {
      if (req.body[field]) {
        entity[field] = req.body[field];
      }
    });

    new RealtyTypeModel()
      .updateOne(entity, req.params.id)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  deleteOne(req, res) {
    const id = req.params.id;
    new RealtyTypeModel()
      .deleteOne(id)
      .then(response => res.status(200).json(response))
      .catch(e => console.log(e));
  }
}

export default RealtyTypeController;
