import Image from "next/image";
import logo from "@/public/logo.png";
import Seo from "@/components/Seo";
import { Inter } from "next/font/google";
import data from "@/data.json";
import Recipe from "@/components/Recipe";
import Search from "@/components/Search";
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

const getUniqueTags = (recipes: any) => {
  const tags = recipes.map((recipe: any) => recipe.tags);
  const uniqueTags = new Set(tags.flat());
  return Array.from(uniqueTags);
};

const uniqueTags = getUniqueTags(recipes);

const getRecipesByTag = (recipes: any, tag: string) => {
  return recipes.filter((recipe: any) => recipe.tags.includes(tag));
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description={`Savory Saga is a free recipe site with healthy and delicious recipes. Join our community of passionate food lovers and support our work with a donation today.`}
      />
      <main className="p-2">
        <Search />
        <h1 className="text-4xl font-bold text-center">Savory Saga</h1>
        <Image
          src={logo}
          alt="Savory Saga logo"
          width={300}
          height={300}
          className="mx-auto"
        />
        <p className="max-w-3xl mx-auto">{`
          Savory Saga provides free and delicious recipes for all skill levels and budgets. Our mission is to make cooking simple and fun, and to inspire you to explore new flavors and ingredients in your kitchen. We rely on donations from our community of readers to support our work and continue bringing the joy of cooking to more people around the world. Join us today and discover a collection of healthy and tasty recipes. Happy cooking!
        `}</p>
        <div>
          {uniqueTags.map((tag: any, ind) => (
            <div key={tag + ind} className="my-8">
              <h3 className="text-2xl font-bold mb-4">{tag.toUpperCase()}</h3>
              <div className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3">
                {getRecipesByTag(recipes, tag).map(
                  (recipe: any, ind: number) => (
                    <div
                      key={recipe.title + ind}
                      className={`flex-shrink-0 border border-black rounded p-4 w-11/12 max-w-md`}
                    >
                      <Recipe recipe={recipe} isLink={true} />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {recipes.map((recipe, ind) => (
            <div className="border border-black rounded p-4">
              <Recipe key={recipe.title + ind} recipe={recipe} isLink={true} />
            </div>
          ))}
        </div> */}
      </main>
    </>
  );
}
