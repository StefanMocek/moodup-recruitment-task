import path from 'path';
import express from "express";
import { AppModule } from "./appModule";
import { JwtPayload } from './utils/globals';

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
      uploaderError?: Error
    }
  }
};

const swaggerDocPath = path.join(__dirname, '../../swagger.yaml')

const boostrap = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is require')
  };
  const app = new AppModule(express(), process.env.MONGO_URL, swaggerDocPath);
  await app.start();
};

boostrap();