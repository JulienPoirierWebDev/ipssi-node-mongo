const express = require('express');
const connection = require('./db');
const ingredientRouter = require('./routers/ingredientRouter');
const recipeRouter = require('./routers/recipeRouter');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connection();

app.get('/', (request, response) => {
  const baseUrl = `${request.protocol}://${request.get('host')}`;

  response.status(200).json({
    message: 'Bienvenue sur l API Recipes',
    documentation: {
      baseUrl,
      contentType: 'application/json',
      endpoints: [
        {
          resource: 'ingredients',
          method: 'POST',
          path: '/ingredients',
          description: 'Creer un ingredient',
          body: {
            name: 'Tomate',
            type: 'Legume',
          },
        },
        {
          resource: 'ingredients',
          method: 'GET',
          path: '/ingredients',
          description: 'Recuperer tous les ingredients',
        },
        {
          resource: 'ingredients',
          method: 'GET',
          path: '/ingredients/:id',
          description: 'Recuperer un ingredient par son id',
        },
        {
          resource: 'ingredients',
          method: 'PATCH',
          path: '/ingredients/:id',
          description: 'Modifier un ingredient',
          body: {
            name: 'Tomate cerise',
            type: 'Legume',
          },
        },
        {
          resource: 'ingredients',
          method: 'DELETE',
          path: '/ingredients/:id',
          description: 'Supprimer un ingredient',
        },
        {
          resource: 'recipes',
          method: 'POST',
          path: '/recipes',
          description: 'Creer une recette',
          body: {
            title: 'Salade composee',
            difficulty: 'easy',
            prepTime: 15,
          },
        },
        {
          resource: 'recipes',
          method: 'POST',
          path: '/recipes/:id/ingredients',
          description:
            'Ajouter ou mettre a jour un ingredient dans une recette',
          body: {
            ingredientId: '67d1234567890abcdef1234',
            quantity: 2,
            unit: 'pieces',
          },
        },
        {
          resource: 'recipes',
          method: 'GET',
          path: '/recipes',
          description: 'Recuperer toutes les recettes',
        },
        {
          resource: 'recipes',
          method: 'GET',
          path: '/recipes/:id',
          description: 'Recuperer une recette par son id',
        },
        {
          resource: 'recipes',
          method: 'PATCH',
          path: '/recipes/:id',
          description: 'Modifier une recette',
          body: {
            title: 'Salade estivale',
            difficulty: 'medium',
            prepTime: 20,
          },
        },
        {
          resource: 'recipes',
          method: 'DELETE',
          path: '/recipes/:id',
          description: 'Supprimer une recette',
        },
      ],
      quickStart: [
        `POST ${baseUrl}/ingredients`,
        `POST ${baseUrl}/recipes`,
        `POST ${baseUrl}/recipes/:id/ingredients`,
        `GET ${baseUrl}/recipes`,
      ],
      notes: [
        'Les requetes POST et PATCH doivent etre envoyees en JSON.',
        'Le champ difficulty accepte : easy, medium, hard.',
        'Les identifiants doivent etre des ObjectId MongoDB valides.',
      ],
    },
  });
});

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);

app.listen(3000, () => {
  console.log('Ca fonctionne');
});
