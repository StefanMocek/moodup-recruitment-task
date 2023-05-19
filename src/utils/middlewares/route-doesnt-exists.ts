import { Request, Response, NextFunction } from 'express';
import {NotFoundError} from '../errors/not-found-error'

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
};