import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link, Form, useTransition } from "remix";

import type { Characters } from "@marcomafessolli/rick-and-morty-gql-files";

import { client } from '~/utils/urql.server';

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let page = url.searchParams.get("page");

  const { characters } = await client.QueryCharacters({ page: parseInt(page || "1") });
  return json(characters);
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix + GraphQL"
  };
};

export default function Index() {
  let data = useLoaderData<Characters>();
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
          <li key={character?.id}>
            <Link to={`/characters/${character?.id}`} prefetch="intent">
              {character?.name}
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
