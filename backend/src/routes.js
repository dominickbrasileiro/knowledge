import { Router } from 'express';

// Controllers
import {
  Session,
  User,
  Category,
  Article,
  Stat,
} from './app/controllers';

// Validators
import {
  SessionValidator,
  UserValidator,
  CategoryValidator,
  ArticleValidator,
} from './app/validators';

// Middlewares
import {
  auth,
  admin,
} from './app/middlewares';

class Routes {
  constructor() {
    this.routes = Router();

    this.noAuth();

    this.routes.use(auth);

    this.users();
    this.categories();
    this.articles();
    this.stats();
  }

  noAuth() {
    this.routes.route('/sessions')
      .post(SessionValidator.store, Session.store);

    this.routes.route('/signup')
      .post(UserValidator.store, User.store);
  }

  users() {
    this.routes.route('/users/:id')
      .get(UserValidator.show, User.show)
      .put(UserValidator.update, User.update)
      .delete(UserValidator.delete, User.delete);

    this.routes.route('/users')
      .get(admin, User.index)
      .post(admin, UserValidator.store, User.store);
  }

  categories() {
    this.routes.route('/categories/:id')
      .get(CategoryValidator.show, Category.show)
      .put(admin, CategoryValidator.update, Category.update)
      .delete(admin, CategoryValidator.delete, Category.delete);

    this.routes.route('/categories')
      .get(Category.index)
      .post(admin, CategoryValidator.store, Category.store);
  }

  articles() {
    this.routes.route('/articles/:id')
      .get(ArticleValidator.show, Article.show)
      .put(admin, ArticleValidator.update, Article.update)
      .delete(admin, ArticleValidator.delete, Article.delete);

    this.routes.route('/articles')
      .get(ArticleValidator.index, Article.index)
      .post(admin, ArticleValidator.store, Article.store);
  }

  stats() {
    this.routes.route('/stats')
      .get(Stat.index);
  }
}


export default new Routes().routes;
