import data from "@/data.json";
import Search from "@/components/Search";
import Seo from "@/components/Seo";
import slugify from "slugify";
import Recipe from "@/components/Recipe";
import Link from "next/link";

const handles = data.recipes.map((recipe) =>
  slugify(recipe.title, { lower: true })
);
function RecipePage({ recipe }) {
  return (
    <>
      <Seo title={recipe.title} description={recipe.description} />
      <main className="p-2 max-w-3xl m-auto">
        <Search />
        <Link href={"/"}>
          <span className="mr-2">&larr;</span>Home
        </Link>
        <Recipe recipe={recipe} showIngredients={true} />
      </main>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = handles.map((handle) => ({
    params: { handle },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const recipe = data.recipes.find(
    (recipe) => slugify(recipe.title, { lower: true }) === params.handle
  );

  return {
    props: {
      recipe,
    },
  };
}

export default RecipePage;
