import { Inter } from "next/font/google";
import slugify from "slugify";
import Link from "next/link";
import data from "@/data.json";
const recipes = data.recipes;
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// create a function to filter the recipes by search term
const filterRecipes = (searchTerm: string) => {
  if (searchTerm === "") {
    return [];
  }
  const lowercase = searchTerm.toLowerCase();
  return recipes
    .filter((recipe: any) => {
      const recipeTitle = recipe.title.toLowerCase();
      const recipeDescription = recipe.description.toLowerCase();
      const recipeIngredients = recipe.ingredients.map((ingredient: string) =>
        ingredient.toLowerCase()
      );
      return (
        recipeTitle.includes(lowercase) ||
        recipeDescription.includes(lowercase) ||
        recipeIngredients.includes(lowercase)
      );
    })
    .slice(0, 5);
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecipes = filterRecipes(searchTerm);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      setSearchTerm("");
    }
  }, [router.asPath]);
  return (
    <>
      <div className="relative max-w-lg mx-auto">
        <div className="flex items-center">
          <span>&#128269;</span>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setTimeout(() => setSearchTerm(""), 200)}
            value={searchTerm}
            className="w-full rounded p-1 mb-1"
          />
        </div>

        {filteredRecipes.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-inherit rounded-xl">
            {filteredRecipes.map((recipe: any, ind: number) => (
              <Link
                key={recipe.title + ind}
                className="border p-1 block"
                href={`/recipe/${slugify(recipe.title, { lower: true })}`}
              >
                {recipe.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
