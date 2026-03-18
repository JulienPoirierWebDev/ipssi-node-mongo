const { Schema, default: mongoose } = require('mongoose');

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        ingredient : {
          type: Schema.Types.ObjectId,
          ref:"Ingredient"
        },
        quantity: Number,
        unit: String,
      },
    ],
    //createdAt: { type: Date, default: Date.now(), required: true },
    //updatedAt: { type: Date, default: Date.now(), required: true },
  },
  { timestamps: true },
);

recipeSchema.virtual('totalIngredients').get(() => {
  return this.ingredients.length;
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
