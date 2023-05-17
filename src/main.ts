import {AppModule} from "./module";
import express from "express";

interface JwtPayload {
  email: string,
  userId: string
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
      uploaderError?: Error
    }
  }
};

const boostrap = () => {
  const app = new AppModule(express());

  app.start();
};

boostrap();