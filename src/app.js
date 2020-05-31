import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();

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
