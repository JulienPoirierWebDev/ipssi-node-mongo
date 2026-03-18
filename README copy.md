````markdown
# 🍲 TP MongoDB + Express — API de Recettes

## 🎯 Objectif

Vous allez développer une API REST avec **Node.js, Express et MongoDB (Mongoose)** permettant de gérer des recettes de cuisine.

Ce TP vous permettra de travailler :

- les modèles Mongoose
- les relations entre collections
- les routes Express
- les opérations CRUD
- l'utilisation de `populate()`

---

## 🧱 Modélisation des données

Vous devez créer **2 entités** :

### 🥕 Ingredient

Un ingrédient réutilisable dans plusieurs recettes.

```js
{
  _id,
  name: String,
  type: String,
  createdAt,
  updatedAt
}
```
````

---

### 🍽️ Recipe

Une recette contenant plusieurs ingrédients.

```js
{
  _id,
  title: String,
  description: String,
  difficulty: "easy" | "medium" | "hard",
  prepTime: Number,
  ingredients: [
    {
      ingredient: ObjectId (ref Ingredient),
      quantity: Number,
      unit: String
    }
  ],
  createdAt,
  updatedAt
}
```

---

## ⚙️ Installation

1. Initialisez votre projet :

```bash
npm init -y
```

2. Installez les dépendances :

```bash
npm install express mongoose dotenv
```

3. Lancez votre serveur avec :

```bash
node server.js
```

---

## 🔌 Connexion à MongoDB

Vous devez utiliser MongoDB Atlas.

Exemple de chaîne de connexion :

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/recipes_api
```

---

## 📁 Arborescence attendue

```txt
src/
  server.js
  app.js
  config/
    db.js
  models/
    ingredient.model.js
    recipe.model.js
  controllers/
    ingredient.controller.js
    recipe.controller.js
  routes/
    ingredient.routes.js
    recipe.routes.js
```

---

## 🛠️ Travail demandé

### 1. Créer les modèles Mongoose

- Ingredient
- Recipe (avec sous-document pour les ingrédients)

---

### 2. Implémenter les routes CRUD

#### 🥕 Ingredient

| Méthode | Route            | Description            |
| ------- | ---------------- | ---------------------- |
| GET     | /ingredients     | Liste des ingrédients  |
| GET     | /ingredients/:id | Détail d’un ingrédient |
| POST    | /ingredients     | Créer un ingrédient    |
| PUT     | /ingredients/:id | Modifier               |
| DELETE  | /ingredients/:id | Supprimer              |

---

#### 🍽️ Recipe

| Méthode | Route        | Description          |
| ------- | ------------ | -------------------- |
| GET     | /recipes     | Liste des recettes   |
| GET     | /recipes/:id | Détail d’une recette |
| POST    | /recipes     | Créer une recette    |
| PUT     | /recipes/:id | Modifier             |
| DELETE  | /recipes/:id | Supprimer            |

---

### 3. Utiliser `populate()`

Lors de la récupération des recettes, vous devez afficher les informations complètes des ingrédients.

```js
Recipe.find().populate('ingredients.ingredient');
```

---

## ⚠️ Contraintes importantes

- Le champ `title` d’une recette est obligatoire
- Le champ `name` d’un ingrédient est obligatoire
- Vous devez gérer les erreurs (try/catch)
- Vous devez retourner des statuts HTTP cohérents (200, 201, 400, 404…)

---

## 🧠 Gestion des dépendances

Vous devez empêcher la suppression d’un ingrédient s’il est utilisé dans une recette.

---

## ⭐ Bonus (facultatif)

### 🔍 Recherche

Permettre de rechercher des recettes par ingrédient :

```
GET /recipes?ingredient=farine
```

---

### 📊 Moyenne de temps de préparation

Retourner la moyenne des temps de préparation de toutes les recettes.

---

### 📄 Pagination

Limiter les résultats :

```
GET /recipes?page=1&limit=10
```

---

### 🔐 Authentification (optionnel)

Associer une recette à un utilisateur.

---

## ✅ Livrable attendu

- Code fonctionnel
- API testable avec Postman / Insomnia
- Structure claire du projet
- Respect des bonnes pratiques

---

## 💡 Conseils

- Commencez simple (CRUD de base)
- Testez chaque route au fur et à mesure
- N’essayez pas de tout faire d’un coup
- Vérifiez vos données dans MongoDB Atlas

---

## 🚀 Objectif final

À la fin de ce TP, vous devez être capable de :

- créer une API avec Express
- modéliser des données avec MongoDB
- gérer des relations entre collections
- structurer un projet backend proprement

```

---

Si vous voulez, je peux vous faire :
- une **version corrigée complète**
- ou une **version avec pièges pédagogiques intégrés (erreurs fréquentes à faire corriger)**
```

```

```
