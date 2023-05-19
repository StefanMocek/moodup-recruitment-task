import {AppModule} from "./module";
import express from "express";
import {JwtPayload} from './utils/globals';

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
};

const app = new AppModule(express());
export default app.app;

const boostrap = () => {
  app.start();
};

boostrap();