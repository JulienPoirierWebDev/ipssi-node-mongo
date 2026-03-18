const express = require('express');
const connection = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

app.get('/', (request, response) => {
  response.json({ message: 'hello' });
});

app.listen(3000, () => {
  console.log('Ca fonctionne');
});
