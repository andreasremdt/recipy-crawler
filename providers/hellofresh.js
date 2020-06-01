class HelloFreshProvider {
  constructor(page) {
    this.page = page;
  }

  get title() {
    return this.page.$eval(
      '[data-test-id="recipeDetailFragment.recipe-name"]',
      (element) => `${element.textContent} ${element.nextElementSibling.textContent}`
    );
  }

  get description() {
    return this.page.$eval(".fela-_aqung0", (element) => {
      return element.children[1].querySelector("p").textContent;
    });
  }

  get thumbnail() {
    return this.page.$eval(".fela-_14dtxzo", (element) => {
      return element.firstElementChild.src;
    });
  }

  get meta() {
    return this.page.$eval(".fela-_1slhjvb", (element) => {
      return {
        time: element.firstElementChild.children[1].textContent,
        level: element.lastElementChild.children[1].textContent,
        servings: 2
      };
    });
  }

  get ingredients() {
    return this.page.evaluate(() => {
      var ingredients = document.querySelectorAll(".fela-_1qz307e");
      var items = [];

      for (let ingredient of ingredients) {
        items.push({
          quantity: ingredient.children[0].textContent,
          name: ingredient.children[1].textContent.replace(/\*/g, "")
        });
      }

      return items;
    });
  }

  get steps() {
    return this.page.evaluate(() => {
      var steps = document.querySelector(".fela-_12sjl9r").children[0].children;
      var items = [];

      for (let step of steps) {
        items.push({
          image: step
            .getElementsByTagName("picture")[0]
            .children[0].srcset.split("1x, ")[1]
            .replace(" 2x", ""),
          text: step.querySelector("p").textContent.replace(/\*/g, "").trim()
        });
      }

      return items;
    });
  }
}

module.exports = HelloFreshProvider;
