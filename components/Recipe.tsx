import { Inter } from "next/font/google";
import slugify from "slugify";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Recipe({
  recipe,
  isLink = false,
  showIngredients = false,
}: any) {
  const title = (
    <h2
      className={`${inter.className} ${
        isLink ? "text-lg" : "text-3xl"
      } font-semibold`}
    >
      {recipe.title}
    </h2>
  );

  return (
    <div className="flex flex-col h-full">
      {isLink ? (
        <Link
          href={`/recipe/${slugify(recipe.title, { lower: true })}`}
          className={``}
        >
          {title}
        </Link>
      ) : (
        <>{title}</>
      )}
      <div className="flex flex-wrap gap-4 bg-slate-300 p-1 rounded">
        <div>
          <div className=" font-semibold">Prep</div>
          <div className="">{`${recipe.prep_time}min`}</div>
        </div>
        <div>
          <div className=" font-semibold">Cook</div>
          <div className="">{`${recipe.cook_time}min`}</div>
        </div>
        <div>
          <div className=" font-semibold">Servings</div>
          <div className="">{`${recipe.servings}`}</div>
        </div>
      </div>
      <div className="italic my-4">
        <span>{`${recipe.description}`}</span>
      </div>
      {showIngredients && (
        <>
          <h3 className="text-2xl font-semibold mt-4 mb-2">{` Ingredients: `}</h3>

          <ul className="list-disc ml-4">
            {recipe.ingredients.map((ingredient: string, ind: number) => (
              <li key={ingredient + ind}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}

      {isLink ? (
        <Link
          href={`/recipe/${slugify(recipe.title, { lower: true })}`}
          className={`text-lg text-center font-semibold block mt-auto pt-2`}
        >
          Instructions <span className="">&rarr;</span>
        </Link>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mt-4 mb-2">{` Instructions: `}</h3>

          <ol className="list-decimal ml-4">
            {recipe.instructions.map((instruction: string, ind: number) => (
              <li className="my-2" key={instruction + ind}>
                {instruction}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
