var puppeteer = require("puppeteer");
var utils = require("./utils");
var RecipeBuilder = require("./recipe-builder");
var HelloFreshProvider = require("./providers/hellofresh");

async function init() {
  var browser = await puppeteer.launch();
  var page = await browser.newPage();
  var provider = new HelloFreshProvider(page);

  await page.goto(process.argv[2]);

  var title = await provider.title;

  var builder = new RecipeBuilder();
  builder.append("title", title);
  builder.append("slug", utils.getURL(title));
  builder.append("description", await provider.description);
  builder.append("image_url", await provider.thumbnail);
  builder.append("meta", await provider.meta);
  builder.append("ingredients", await provider.ingredients);
  builder.append("steps", await provider.steps);
  builder.write();

  browser.close();
}

init();
