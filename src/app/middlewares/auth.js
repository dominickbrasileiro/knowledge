import jwt from 'jsonwebtoken';

import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_APP_SECRET);

    req.userId = decoded.id;
    req.isAdmin = decoded.admin;

    return next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
};
