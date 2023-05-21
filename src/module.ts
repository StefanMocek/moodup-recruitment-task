import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express'

import {errorHandler, currentUser, handleNotFound} from './utils/middlewares';
import {authRouters} from './auth/auth.routers';
import {recipesRouters} from './recipes/recipes.routers';

const PORT = process.env.PORT || 5000;

// read from /dist/src/module.js 
const swaggerDoc = YAML.load(path.join(__dirname, '../../swagger.yaml'));

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
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION){
      throw new Error('Your AWS access keys are required to run this app')
    };

    try {
      await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
      throw new Error('database connection error')
    };
    
    this.app.use(currentUser(process.env.JWT_KEY));
    this.app.get('/', (req: Request, res: Response) => {
      res.send('<h1>Moodup recruitment task by Stefan MOCEK</h1><a href="/api-docs">Documentation</a>')
    })
    //  docs route
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

    // main routes
    this.app.use('/api/v1/auth', authRouters);
    this.app.use('/api/v1/recipes', recipesRouters);
    this.app.use(handleNotFound);
    this.app.use(errorHandler);

    this.app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  };
};
