/* eslint-disable no-param-reassign */
function getTreeCategories(categories, tree) {
  if (!tree) {
    tree = categories.filter((c) => !c.parent_id);
  }

  tree = tree.map((parent) => {
    const children = categories.filter((c) => c.parent_id === parent.id);

    if (children && children.length > 0) {
      parent.children = getTreeCategories(categories, children);
    }

    return parent;
  });

  return tree;
}

export default getTreeCategories;
