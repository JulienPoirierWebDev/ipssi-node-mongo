const { default: mongoose } = require('mongoose');
const Recipe = require('../models/recipeModel');

const createRecipe = async (request, response) => {
  const title = request.body.title;
  const difficulty = request.body.difficulty;
  const prepTime = request.body.prepTime;

  if (!title || prepTime === undefined) {
    return response
      .status(400)
      .json({ message: 'Title et prepTime sont obligatoires', error: true });
  }

  try {
    const newRecipe = new Recipe({ title, difficulty, prepTime });

    await newRecipe.save();
    response.status(201).json({ message: 'Recette crée', result: newRecipe });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const findAll = async (request, response) => {
  try {
    const recipes = await Recipe.find();

    response
      .status(200)
      .json({ message: 'Recettes récupérées', results: recipes });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const findOneById = async (request, response) => {
  const id = request.params.id;

  try {
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return response
        .status(404)
        .json({ message: 'Recette non trouvée', error: true });
    }

    response.status(200).json({ message: 'Recette récupérée', result: recipe });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const updateOneById = async (request, response) => {
  const id = request.params.id;
  const title = request.body.title;
  const difficulty = request.body.difficulty;
  const prepTime = request.body.prepTime;

  try {
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return response
        .status(404)
        .json({ message: 'Recette non trouvée', error: true });
    }

    if (title) {
      recipe.title = title;
    }

    if (difficulty) {
      recipe.difficulty = difficulty;
    }

    if (prepTime !== undefined) {
      recipe.prepTime = prepTime;
    }

    await recipe.save();

    response
      .status(200)
      .json({ message: 'Recette mise à jour', result: recipe });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const deleteOneById = async (request, response) => {
  const id = request.params.id;

  try {
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return response
        .status(404)
        .json({ message: 'Recette non trouvée', error: true });
    }

    const infos = await Recipe.deleteOne({ _id: id });

    response.status(200).json({ message: 'Recette supprimée', result: infos });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

const addIngredient = async (request, response) => {
  const id = request.params.id;
  const ingredientId = request.body?.ingredientId;
  const quantity = request.body?.quantity;
  const unit = request.body?.unit;

  if (!ingredientId || !quantity || !unit) {
    return response.status(400).json({
      message:
        "Merci de founir l'ID de l'ingredient ainsi que la quantité et l'unité aassociée",
    });
  }

  if (!mongoose.isValidObjectId(ingredientId)) {
    return response.status(400).json({
      message:
        "Merci de founir l'ID de l'ingredient et de s'assurer qu'il soit valide ",
    });
  }

  try {
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return response
        .status(404)
        .json({ message: 'Recette non trouvée', error: true });
    }

    const index = recipe.ingredients.findIndex(
      (element) => String(element.ingredient) === ingredientId,
    );

    if (index !== -1) {
      /*if(recipe.ingredients[index].unit !== unit) {
        return response.status(400).json({message:"Attention, l'ingrédient existe déja, mais l'unité est différente"})
      }
        */
      recipe.ingredients[index].quantity = quantity;
      recipe.ingredients[index].unit = unit;
    } else {
      recipe.ingredients.push({ ingredient: ingredientId, quantity, unit });
    }

    await recipe.populate('ingredients.ingredient');
    await recipe.save();

    response
      .status(200)
      .json({ message: 'Ingrédient ajouté a la recette', result: recipe });
  } catch (error) {
    response.status(500).json({ message: 'Erreur serveur', error: true });
  }
};

module.exports = {
  createRecipe,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
  addIngredient,
};
