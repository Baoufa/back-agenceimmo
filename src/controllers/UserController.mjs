import UserModel from '../models/UserModel.mjs';
import bcrypt from 'bcrypt';

class UserController {
  async readAll(req, res) {
    const pagination = req.query.p;
    console.log(pagination);
    const userModel = new UserModel();
    const response = await userModel.readAll(pagination);
    console.log(response);
    res.send(response)
    res.end();
  }

  async readOne(req, res) {
    const userModel = new UserModel();
    const id = req.params.id;
    const response = await userModel.readOne(id);
    console.log(response);
    res.send(response)
    res.end();
  }

  async createOne(req, res) {
    const userModel = new UserModel();
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const userObject = {
      id: null,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      date: null,
    };
    const response = await userModel.createOne(userObject);
    console.log(response);
    res.send(response)
    res.end();
  }

  async updateOne(req, res) {
    const keys = {
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
    };

    const key = keys[Object.keys(req.body)[0]];

    const userModel = new UserModel();
    const userObject = {
      [key]: req.body[key],
    };

    const response = await userModel.updateOne(userObject, req.params.id);
    console.log(response);
    res.send(response)
    res.end();
  }

  async deleteOne(req, res) {
    const userModel = new UserModel();
    const id = req.params.id;
    const response = await userModel.deleteOne(id);
    console.log(response);
    res.send(response)
    res.end();
  }
}

export default UserController;
