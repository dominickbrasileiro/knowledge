import { Router } from 'express';

// Controllers
import {
  User,
} from './app/controllers';

class Routes {
  constructor() {
    this.routes = Router();

    this.users();
  }

  users() {
    this.routes.route('/users/:id')
      .get(User.show)
      .put(User.update);

    this.routes.route('/users')
      .get(User.index)
      .post(User.store);
  }
}


export default new Routes().routes;
