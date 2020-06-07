export default (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  return next();
};
