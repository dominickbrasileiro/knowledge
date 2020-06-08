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
    const {
      name, email, password, admin = false,
    } = req.body;

    if (admin && !req.isAdmin) {
      return res.status(401).send('Unauthorized');
    }

    const userFromDB = await db('users').where({ email }).first();

    if (userFromDB) {
      return res.status(400).send('User already exists');
    }

    const encryptedPassword = await encryptPassword(password);

    await db('users').insert({
      name,
      email,
      password: encryptedPassword,
      admin,
    });

    return res.status(204).send();
  }

  async update(req, res) {
    const {
      name, email, password, admin = false,
    } = req.body;

    const { id } = req.params;

    if (admin && !req.isAdmin) {
      return res.status(401).send('Unauthorized');
    }

    if (id !== req.userId && !req.isAdmin) {
      return res.status(401).send('Unauthorized');
    }

    const user = await db('users').where({ id }).first();

    if (!user) {
      return res.status(400).send('User not found');
    }

    let encryptedPassword;

    if (password) {
      encryptedPassword = await encryptPassword(password);
    }

    await db('users').where({ id }).update({
      name,
      email,
      password: encryptedPassword,
      admin,
    });

    return res.status(204).send();
  }

  async delete(req, res) {
    const { id } = req.params;

    if (id !== req.userId && !req.isAdmin) {
      return res.status(401).send('Unauthorized');
    }

    const articles = await db('articles').where({ user_id: id }).first();

    if (articles) {
      return res.status(400).send('There are articles associated with this user');
    }

    const rowsDeleted = await db('users').where({ id }).delete();

    if (!rowsDeleted) {
      return res.status(400).send('User not found');
    }

    return res.status(204).send();
  }
}

export default new UserController();
