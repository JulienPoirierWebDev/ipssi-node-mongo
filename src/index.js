const express = require('express');
const connection = require('./db');
const ingredientRouter = require('./routers/ingredientRouter');
const recipeRouter = require('./routers/recipeRouter');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

app.get('/', (request, response) => {
  response.json({ message: 'hello' });
});

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);

app.listen(3000, () => {
  console.log('Ca fonctionne');
});
