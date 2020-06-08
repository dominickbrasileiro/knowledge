import 'dotenv/config';
import './config/mongodb';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

import statsJob from './jobs/stats';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();

    statsJob.init();

    this.app.use(errors());
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
