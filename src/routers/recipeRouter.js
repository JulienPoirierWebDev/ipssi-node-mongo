const express = require('express');
const {
  createRecipe,
  addIngredient,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
} = require('../controllers/recipeController');

const recipeRouter = express.Router();

recipeRouter.post('/', createRecipe);

recipeRouter.post('/:id/ingredients', addIngredient);

recipeRouter.get('/', findAll);

recipeRouter.get('/:id', findOneById);

recipeRouter.patch('/:id', updateOneById);

recipeRouter.delete('/:id', deleteOneById);

module.exports = recipeRouter;
