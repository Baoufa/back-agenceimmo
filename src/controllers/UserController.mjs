import UserModel from '../models/UserModel.mjs';
import bcrypt from 'bcrypt';

class UserController {
  readAll(req, res) {
    let page = 1;
    if (req.query.p) {
      page = req.query.p;
    }
    let limit = 100;
    let offset = page * 100 - 100;

    new UserModel()
      .readAll(offset, limit)
      .then(response => res.status(200).json(response))
      .catch(e => console.log(e));
  }

  readOne(req, res) {
    const id = req.params.id;
    new UserModel()
      .readOne(id)
      .then(response => res.status(200).json(response))
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
    const keys = {
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
    };
    const key = keys[Object.keys(req.body)[0]];
    const userObject = {
      [key]: req.body[key],
    };

    new UserModel()
      .updateOne(userObject, req.params.id)
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
