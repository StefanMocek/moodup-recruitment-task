import * as dotenv from 'dotenv';
dotenv.config();

import express, {Application} from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';

import {errorHandler, currentUser} from './utils/middlewares';
import {authRouters} from './auth/auth.routers';
import {recipesRouters} from './recipes/recipes.routers';

const PORT = process.env.PORT || 3000

export class AppModule {
  constructor(public app: Application) {
    app.set('trust proxy', true);
    app.use(cors({
      credentials: true,
      optionsSuccessStatus: 200
    }))
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cookieSession({
      signed: false,
      secure: false
    }));

    Object.setPrototypeOf(this, AppModule.prototype);
  };

  async start() {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is require')
    };
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is require')
    };

    try {
      await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
      throw new Error('database connection error')
    };

    this.app.use(currentUser(process.env.JWT_KEY));
    this.app.use(authRouters);
    this.app.use(recipesRouters);
    this.app.use(errorHandler);

    this.app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  };
};
