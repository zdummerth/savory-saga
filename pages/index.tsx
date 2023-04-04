import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import data from "@/data.json";
const recipes = data.recipes;

// create a function to filter the recipes by search term
const filterRecipes = (recipes: any, searchTerm: string) => {
  if (searchTerm === "") {
    return recipes;
  }
  return recipes.filter((recipe: any) => {
    const recipeTitle = recipe.title.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map((ingredient: string) =>
      ingredient.toLowerCase()
    );
    return (
      recipeTitle.includes(searchTerm) ||
      recipeDescription.includes(searchTerm) ||
      recipeIngredients.includes(searchTerm)
    );
  });
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Just Plain Recipes</title>
        <meta
          name="description"
          content="A list of some of my favorite recipes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>

        <div className={styles.grid}>
          {recipes.map((recipe, ind) => (
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
              key={recipe.title + ind}
            >
              <h2 className={inter.className}>{recipe.title}</h2>
              <p className={styles.description}>{recipe.description}</p>
              <ul>
                {recipe.ingredients.map((ingredient, ind) => (
                  <li key={ingredient + ind}>{ingredient}</li>
                ))}
              </ul>
              <ol>
                {recipe.instructions.map((instruction, ind) => (
                  <li key={instruction + ind}>{instruction}</li>
                ))}
              </ol>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
