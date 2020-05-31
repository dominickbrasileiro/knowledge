import { Router } from 'express';

// Controllers
import {
  User,
  Category,
} from './app/controllers';

// Validators
import {
  UserValidator,
  CategoryValidator,
} from './app/validators';

class Routes {
  constructor() {
    this.routes = Router();

    this.users();
    this.categories();
  }

  users() {
    this.routes.route('/users/:id')
      .get(UserValidator.show, User.show)
      .put(UserValidator.update, User.update);

    this.routes.route('/users')
      .get(User.index)
      .post(UserValidator.store, User.store);
  }

  categories() {
    this.routes.route('/categories/:id')
      .get(CategoryValidator.show, Category.show)
      .put(CategoryValidator.update, Category.update)
      .delete(CategoryValidator.delete, Category.delete);

    this.routes.route('/categories')
      .get(Category.index)
      .post(CategoryValidator.store, Category.store);
  }
}


export default new Routes().routes;
