import { Response, NextFunction } from 'express';
// import User from '../../src/models/user';
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const requireAuth = (req: Req, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
  
    next();
  };
