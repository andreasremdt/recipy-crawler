class RecipeBuilder {
  constructor() {
    this.recipe = new Map();
  }

  append(key, value) {
    this.recipe.set(key, value);
  }

  write() {
    var data = JSON.stringify(Object.fromEntries(this.recipe), null, 2);

    console.log(data);
  }
}

module.exports = RecipeBuilder;
