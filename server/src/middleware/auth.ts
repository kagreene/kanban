import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // extract token from header
    const token = authHeader.split('')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    //compare token and secret key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // add user data to the request object
      req.user = user as JwtPayload;
      // call next middleware function
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
