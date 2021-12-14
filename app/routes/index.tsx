import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link, Form, useTransition } from "remix";

import { queryCharacters } from "~/graphql/queries";
import type { Query } from "~/graphql/types";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let page = url.searchParams.get("page");

  const { data } = await queryCharacters(page);
  return json(data?.characters);
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix + GraphQL"
  };
};

type IndexLoaderData = Query['characters'];

export default function Index() {
  let data = useLoaderData<IndexLoaderData>();
  let transition = useTransition();
  
  if (transition.state === 'submitting') {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }
  
  let characters = data?.results;
  let info = data?.info;

  return (
    <main>
      <h2>Characters</h2>
      <ul>
        {characters?.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`} prefetch="intent">
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      {(info?.prev) && (
        <Form method="get">
          <input type="hidden" name="page" value={`${info?.prev}`} />
          <button type="submit">Previous Page</button>
        </Form>
      )}
      <Form method="get">
        <input type="hidden" name="page" value={`${info?.next}`} />
        <button type="submit">Next Page</button>
      </Form>
    </main>
  );
}
