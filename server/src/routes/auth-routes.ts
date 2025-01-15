import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  //get username and password from request body
  const { username, password } = req.body;
  //check if user exists in database
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  //check if password is valid
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // get secret key from env variables
  const secretKey = process.env.JWT_SECRET_KEY || '';
  // create a JWT token
  const token = jwt.sign({ username}, secretKey, { expiresIn: '1h' });
  // return the token
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
