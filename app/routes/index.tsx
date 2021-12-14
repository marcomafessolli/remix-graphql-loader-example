import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import { client } from "~/graphql";

import { QUERY_CHARACTERS } from "~/graphql/gql";
import type { Query } from "~/graphql/gql";

export let loader: LoaderFunction = async () => {
  const { data } = await client.query<Query>(QUERY_CHARACTERS).toPromise();
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
  
  let characters = data?.results;
  let info = data?.info;

  return (
    <div>
      <main>
        <h2>Welcome to Remix!</h2>
        <code>
          <pre>{`${JSON.stringify(info)}`}</pre>
        </code>
      </main>
      <aside>
        <h3>Characters</h3>
        <ul>
          {characters?.map(character => (
            <li key={character.id}>
              <Link to={`/characters/${character.id}`}>
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
