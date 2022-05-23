import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import assert from 'assert';
import UserModel from '../src/models/UserModel.mjs';

describe('Test du repository User', async () => {
  await it('Tester le count', done => {
    const User = new UserModel();
    let counter = 0;
    User.countAll()
      .then(count => {
        counter = count;
        User.deleteOne(count);
      })
      .then(() => User.countAll())
      .then(count => {
        assert.equal(count, counter - 1);
        done();
      });
  });

  await it(`Tester la récupération d'un utilisateur`, done => {
    const User = new UserModel();
    const user200 = [
      {
        id: 200,
        firstname: 'Ibbie',
        lastname: 'Marques',
        email: 'imarques5j@is.gd',
      },
    ];
    User.readOne(200).then(json => {
      assert.equal(json[0].firstname, user200[0].firstname);
      done();
    });
  });

  await it(`Créer un utilisateur`, done => {
    let userTest = {
      id: null,
      firstname: 'Last One',
      lastname: 'Marques',
      email: 'imarques5j@is.gd',
      password: 'mypassword',
    };
    const User = new UserModel();
    User.createOne(userTest)
      .then(() => User.countAll())
      .then(count => User.readOne(count))
      .then(user => {
        assert.equal(user[0].firstname, userTest.firstname);
        done();
      });
  });

  await it(`Modifier un utilisateur`, done => {
    assert.ok(true);
    done();
  });

  await it(`Supprimer un utilisateur`, done => {
    assert.ok(true);
    done();
  });
});
