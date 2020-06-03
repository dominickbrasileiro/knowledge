import { Router } from 'express';

// Controllers
import {
  Session,
  User,
  Category,
  Article,
} from './app/controllers';

// Validators
import {
  SessionValidator,
  UserValidator,
  CategoryValidator,
  ArticleValidator,
} from './app/validators';

class Routes {
  constructor() {
    this.routes = Router();

    this.sessions();

    this.users();
    this.categories();
    this.articles();
  }

  sessions() {
    this.routes.route('/sessions')
      .post(SessionValidator.store, Session.store);
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

  articles() {
    this.routes.route('/articles/:id')
      .get(ArticleValidator.show, Article.show)
      .put(ArticleValidator.update, Article.update)
      .delete(ArticleValidator.delete, Article.delete);

    this.routes.route('/articles')
      .get(ArticleValidator.index, Article.index)
      .post(ArticleValidator.store, Article.store);
  }
}


export default new Routes().routes;
