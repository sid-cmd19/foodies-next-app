import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all(); // all is used to fetch all rows, if we want to fetch only one row we use .get(). ALso, .run() is used to execute insert, update or delete queries. These are synchronous methods!
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(mealData) {
  mealData.slug = slugify(mealData.title, { lower: true });
  mealData.instructions = xss(mealData.instructions);

  const extension = mealData.image.name.split(".").pop();
  const fileName = `${mealData.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await mealData.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed ..!");
    }
  });

  mealData.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
      )
    `
  ).run(mealData);
}
