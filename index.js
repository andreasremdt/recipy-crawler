var puppeteer = require("puppeteer");
var utils = require("./utils");
var RecipeBuilder = require("./recipe-builder");

const URL = process.argv[2];

async function init() {
  var browser = await puppeteer.launch();
  var page = await browser.newPage();
  var Provider = utils.getProvider(URL);

  if (!Provider) {
    console.log(`No provider found for URL ${URL}.`);
    process.exit(1);
  }

  await page.goto(URL);

  var provider = new Provider(page);
  var builder = new RecipeBuilder();

  await provider.load();

  builder.append("title", await provider.title);
  builder.append("slug", utils.getURL(await provider.title));
  builder.append("description", await provider.description);
  builder.append("image_url", await provider.thumbnail);
  builder.append("meta", await provider.meta);
  builder.append("ingredients", await provider.ingredients);
  builder.append("steps", await provider.steps);
  builder.append("source_url", URL);
  builder.write();

  browser.close();
}

init();
