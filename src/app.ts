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


const boostrap = () => {
  const app = new AppModule(express());
  app.start();
};

boostrap();