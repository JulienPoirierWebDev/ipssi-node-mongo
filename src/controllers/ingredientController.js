const Ingredient = require('../models/ingredientModel');

const createIngredient = async (request, response) => {
  const name = request.body.name;
  const type = request.body.type;

  if (!name || !type) {
    return response
      .status(400)
      .json({ message: 'Name et type sont obligatoires', error: true });
  }

  try {
    const newIngredient = new Ingredient({ name, type });

    await newIngredient.save();
    response
      .status(201)
      .json({ message: 'Ingrédient crée', result: newIngredient });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const findAll = async (request, response) => {
  try {
    const ingredients = await Ingredient.find();

    response
      .status(201)
      .json({ message: 'Ingrédient récupéré', results: ingredients });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const findOneById = async (request, response) => {
  const id = request.params.id;

  try {
    const ingredient = await Ingredient.findOne({ _id: id });
    // const ingredient = await Ingredient.find({ _id: id });
    // const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      response
        .status(404)
        .json({ message: 'Ingrédient non trouvé', error: true });
    }
    response
      .status(201)
      .json({ message: 'Ingrédient récupéré', result: ingredient });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const updateOneById = async (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const type = request.body.type;

  try {
    const ingredient = await Ingredient.findOne({ _id: id });
    // const ingredient = await Ingredient.find({ _id: id });
    // const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      response
        .status(404)
        .json({ message: 'Ingrédient non trouvé', error: true });
    }

    if (name) {
      ingredient.name = name;
    }

    if (type) {
      ingredient.type = type;
    }

    await ingredient.save();

    response
      .status(201)
      .json({ message: 'Ingrédient récupéré', result: ingredient });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const deleteOneById = async (request, response) => {
  const id = request.params.id;

  try {
    const ingredient = await Ingredient.findOne({ _id: id });
    // const ingredient = await Ingredient.find({ _id: id });
    // const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      response
        .status(404)
        .json({ message: 'Ingrédient non trouvé', error: true });
    }

    const infos = await Ingredient.deleteOne({ _id: id });

    response
      .status(201)
      .json({ message: 'Ingrédient supprimé', result: infos });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

module.exports = {
  createIngredient,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
};
