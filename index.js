var puppeteer = require("puppeteer");
var utils = require("./utils");
var RecipeBuilder = require("./recipe-builder");

const URL = process.argv[2];

async function init() {
  try {
    if (!URL) {
      throw new Error("Please provide an URL as the first argument.");
    }

    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    var Provider = utils.getProvider(URL);

    if (!Provider) {
      throw new Error(`No provider found for URL "${URL}".`);
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
  } catch (ex) {
    console.error(ex.message);
    process.exit(1);
  }
}

init();
