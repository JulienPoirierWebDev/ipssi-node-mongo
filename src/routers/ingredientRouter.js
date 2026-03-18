const express = require('express');
const {
  createIngredient,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
} = require('../controllers/ingredientController');

const ingredientRouter = express.Router();

ingredientRouter.post('/', createIngredient);

ingredientRouter.get('/', findAll);

ingredientRouter.get('/:id', findOneById);

ingredientRouter.patch('/:id', updateOneById);

ingredientRouter.delete('/:id', deleteOneById);

module.exports = ingredientRouter;
