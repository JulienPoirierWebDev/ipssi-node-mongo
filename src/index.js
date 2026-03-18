const express = require('express');
const connection = require('./db');
const ingredientRouter = require('./routers/ingredientRouter');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

app.get('/', (request, response) => {
  response.json({ message: 'hello' });
});

app.use('/ingredients', ingredientRouter);

app.listen(3000, () => {
  console.log('Ca fonctionne');
});
