import db from '../../database';

import encryptPassword from '../../utils/encryptPassword';

class UserController {
  async index(req, res) {
    const users = await db('users')
      .select('id', 'name', 'email', 'admin');

    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await db('users')
      .where({ id })
      .select('id', 'name', 'email', 'admin')
      .first();

    if (!user) {
      return res.status(400).send('User not found');
    }

    return res.json(user);
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    const userFromDB = await db('users').where({ email }).first();

    if (userFromDB) {
      return res.status(400).send('User already exists');
    }

    const encryptedPassword = await encryptPassword(password);

    await db('users').insert({
      name,
      email,
      password: encryptedPassword,
    });

    return res.status(204).send();
  }

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;

    const user = await db('users').where({ id }).first();

    if (!user) {
      return res.status(400).send('User not found');
    }

    if (data.password) {
      data.password = await encryptPassword(data.password);
    }

    const { name, email, password } = data;

    await db('users').where({ id }).update({
      name,
      email,
      password,
    });

    return res.status(204).send();
  }
}

export default new UserController();
