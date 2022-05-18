import UserModel from '../models/UserModel.mjs';
import bcrypt from 'bcrypt';
import dataApiResponse from '../services/dataApiResponse.mjs';

class UserController {
  readAll(req, res) {
    const page = req.query.page || 1;
    const limit = 100;
    const offset = page * limit - limit;

    Promise.all([
      new UserModel().countAll(),
      new UserModel().readAll(offset, limit),
    ]).then(result =>
      res.status(200).json(dataApiResponse(result[1], page, result[0], limit))
    );
  }

  readOne(req, res) {
    const id = req.params.id;
    new UserModel()
      .readOne(id)
      .then(response => res.status(200).json(dataApiResponse(response)))
      .catch(e => console.log(e));
  }

  createOne(req, res) {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const userObject = {
      id: null,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      date: null,
    };
    new UserModel()
      .createOne(userObject)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  updateOne(req, res) {
    let entity = {};
    let fields = ['firstname', 'lastname', 'email'];
    fields.forEach(field => {
      if (req.body[field]) {
        entity[field] = req.body[field];
      }
    });

    new UserModel()
      .updateOne(entity, req.params.id)
      .then(response => res.status(201).json(response))
      .catch(e => console.log(e));
  }

  deleteOne(req, res) {
    const id = req.params.id;
    new UserModel()
      .deleteOne(id)
      .then(response => res.status(200).json(response))
      .catch(e => console.log(e));
  }
}

export default UserController;
