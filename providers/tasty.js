class TastyProvider {
  constructor(page) {
    this.page = page;
  }

  load() {
    return this.page.waitForSelector(".vjs-poster");
  }

  get title() {
    return this.page.$eval(".recipe-name", (element) => element.textContent);
  }

  get description() {
    return "";
  }

  get thumbnail() {
    return this.page.$eval(".vjs-poster", (element) =>
      element.getAttribute("style").split('url("')[1].replace('");', "")
    );
  }

  get meta() {
    return this.page.evaluate(() => {
      return {
        servings: document.querySelector(".servings-display").textContent.replace(/\D/g, "")
      };
    });
  }

  get ingredients() {
    return this.page.evaluate(() => {
      var ingredients = document.querySelectorAll(".ingredient");
      var items = [];

      for (let ingredient of ingredients) {
        items.push({
          quantity: "",
          name: ingredient.textContent.trim()
        });
      }

      return items;
    });
  }

  get steps() {
    return this.page.evaluate(() => {
      var steps = document.querySelectorAll(".prep-steps li");
      var items = [];

      for (let step of steps) {
        items.push({
          image: null,
          text: step.textContent.trim()
        });
      }

      return items;
    });
  }
}

module.exports = TastyProvider;
