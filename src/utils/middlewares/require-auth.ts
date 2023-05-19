import { Response, NextFunction } from 'express';
// import User from '../../src/models/user';
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const requireAuth = async (req: Req, res: Response, next: NextFunction) => {
    if(!req.currentUser) throw new NotAuthorizedError()

    // const user = await User.findById(req.currentUser?.userId);

    // if(!user) throw new NotAuthorizedError()

    next()
} 
