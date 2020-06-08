import { promisify } from 'util';
import bcrypt from 'bcryptjs';

async function encryptPassword(password) {
  const hash = await promisify(bcrypt.hash)(password, 8);
  return hash;
}

export default encryptPassword;
