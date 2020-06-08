import db from '../../database';

import queries from '../../utils/queries';

class ArticleController {
  async index(req, res) {
    const {
      page = 1,
      recursive = 0,
      category_id = null,
    } = req.query;

    const PAGE_LIMIT = 10;

    const { count } = await db('articles').count().first();

    let articles;

    if (recursive === 1) {
      // Get all articles inside an category (and its subcategories)
      const categories = await db.raw(queries.categoryWithChildren, category_id);

      const ids = categories.rows.map((c) => c.id);

      articles = await db({ a: 'articles', u: 'users' })
        .select('a.id', 'a.name', 'a.description', 'a.image_url', { author: 'u.name' })
        .limit(PAGE_LIMIT)
        .offset((page - 1) * PAGE_LIMIT)
        .whereRaw('?? = ??', ['u.id', 'a.user_id'])
        .whereIn('category_id', ids)
        .orderBy('a.id', 'desc');
    } else {
      articles = await db({ a: 'articles', u: 'users' })
        .select('a.id', 'a.name', 'a.description', 'a.image_url', { author: 'u.name' })
        .limit(PAGE_LIMIT)
        .offset((page - 1) * PAGE_LIMIT)
        .whereRaw('?? = ??', ['u.id', 'a.user_id'])
        .orderBy('a.id', 'desc');
    }

    res.header('X-Total-Count', parseInt(count, 10));
    res.header('X-Page-Limit', PAGE_LIMIT);

    return res.json(articles);
  }

  async show(req, res) {
    const { id } = req.params;

    const article = await db('articles')
      .where({ id })
      .first();

    if (!article) {
      return res.status(400).send('Article not found');
    }

    article.content = article.content.toString();

    return res.json(article);
  }

  async store(req, res) {
    const data = req.body;
    const { user_id, category_id } = data;

    const category = await db('categories').where({ id: category_id }).first();
    const user = await db('users').where({ id: user_id }).first();

    if (!category) {
      return res.status(400).send('Category not found');
    }

    if (!user) {
      return res.status(400).send('User not found');
    }

    await db('articles').insert(data);

    return res.status(204).send();
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    const { user_id, category_id } = data;

    if (category_id) {
      const category = await db('categories').where({ id: category_id }).first();

      if (!category) {
        return res.status(400).send('Category not found');
      }
    }

    if (user_id) {
      const user = await db('users').where({ id: user_id }).first();

      if (!user) {
        return res.status(400).send('User not found');
      }
    }

    const rowsUpdated = await db('articles').where({ id }).update(data);

    if (!rowsUpdated) {
      return res.status(400).send('Article not found');
    }

    return res.status(204).send();
  }

  async delete(req, res) {
    const { id } = req.params;

    const rowsDeleted = await db('articles').where({ id }).delete();

    if (!rowsDeleted) {
      return res.status(400).send('Article not found');
    }

    return res.status(204).send();
  }
}

export default new ArticleController();
