import { Router } from 'express';

// Controllers
import {
  User,
  Category,
} from './app/controllers';

class Routes {
  constructor() {
    this.routes = Router();

    this.users();
    this.categories();
  }

  users() {
    this.routes.route('/users/:id')
      .get(User.show)
      .put(User.update);

    this.routes.route('/users')
      .get(User.index)
      .post(User.store);
  }

  categories() {
    this.routes.route('/categories/:id')
      .get(Category.show)
      .put(Category.update)
      .delete(Category.delete);

    this.routes.route('/categories')
      .get(Category.index)
      .post(Category.store);
  }
}


export default new Routes().routes;
