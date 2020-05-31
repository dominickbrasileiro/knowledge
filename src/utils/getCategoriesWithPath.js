function getCategoriesWithPath(categories) {
  function getParent(categoriesArray, parentId) {
    const parent = categoriesArray.find((category) => category.id === parentId);
    return parent || null;
  }

  const categoriesWihPath = categories.map((category) => {
    let path = category.name;

    let parent = getParent(categories, category.parent_id);

    while (parent) {
      path = `${parent.name} > ${path}`;
      parent = getParent(categories, parent.parent_id);
    }

    return { ...category, path };
  });

  categoriesWihPath.sort((a, b) => {
    if (a.path.toLowerCase() > b.path.toLowerCase()) {
      return 1;
    }

    if (a.path.toLowerCase() < b.path.toLowerCase()) {
      return -1;
    }

    return 0;
  });

  return categoriesWihPath;
}

export default getCategoriesWithPath;
