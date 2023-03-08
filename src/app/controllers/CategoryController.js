const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: "Category not found" });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findByName(name);
    if (categoryExists) {
      return response
        .status(400)
        .json({ error: "This name is already in use" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const category = await CategoriesRepository.create({ name });

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesRepository.deleteById(id);
    return response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: "Category not exists" });
    }

    const categoryUpdated = await CategoriesRepository.updateById(id, { name });

    return response.json(categoryUpdated);
  }
}

module.exports = new CategoryController();
