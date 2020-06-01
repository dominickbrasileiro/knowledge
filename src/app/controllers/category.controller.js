import db from '../../database';

import getCategoriesWithPath from '../../utils/getCategoriesWithPath';
import getTreeCategories from '../../utils/getTreeCategories';

class CategoryController {
  async index(req, res) {
    const tree = req.query.tree || false;

    const categories = await db('categories');

    if (tree) {
      return res.json(getTreeCategories(categories));
    }

    return res.json(getCategoriesWithPath(categories));
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await db('categories')
      .where({ id })
      .first();

    if (!category) {
      return res.status(400).send('Category not found');
    }

    return res.json(getCategoriesWithPath(category));
  }

  async store(req, res) {
    const { name, parent_id } = req.body;

    if (parent_id) {
      const parent = await db('categories').where({ id: parent_id }).first();

      if (!parent) return res.status(400).send('Parent not found');
    }

    await db('categories').insert({
      name,
      parent_id,
    });

    return res.status(204).send();
  }

  async update(req, res) {
    const { name, parent_id } = req.body;
    const { id } = req.params;

    if (id === parent_id) {
      return res.status(400).send('parent_id cannot be the same as category id');
    }

    const rowsUpdated = await db('categories').where({ id }).update({
      name,
      parent_id,
    });

    if (!rowsUpdated) {
      return res.status(400).send('Category not found');
    }

    return res.status(204).send();
  }

  async delete(req, res) {
    const { id } = req.params;

    const rowsDeleted = await db('categories').where({ id }).delete();

    if (!rowsDeleted) {
      return res.status(400).send('Category not found');
    }

    return res.status(204).send();
  }
}

export default new CategoryController();
