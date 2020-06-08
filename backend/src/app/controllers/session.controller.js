import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../../database';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).send('User not found');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).send('Password does not match');
    }

    const now = Math.floor(Date.now() / 1000);

    const expireDate = now + (30 * 60);

    const token = jwt.sign({
      id: user.id,
      admin: user.admin,
      iat: now,
      exp: expireDate,
    }, process.env.JWT_APP_SECRET);

    res.header('X-Token-Expire-Date', expireDate);

    return res.json({
      name: user.name,
      email: user.email,
      admin: user.admin,
      token,
    });
  }
}

export default new SessionControler();
