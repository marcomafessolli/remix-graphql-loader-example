import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import { client } from "~/graphql";

import { QUERY_CHARACTER } from "~/graphql/gql";
import type { Query } from "~/graphql/gql";

export let meta: MetaFunction = ({ data }: { data: LoaderData }) => {
   if (!data) {
    return {
      title: "No joke",
      description: "No joke found"
    };
  }

  return {
    title: `${data.name} - Remix + GraphQL`,
    description: `${data.name} detail page`
  };
};

export let loader: LoaderFunction = async ({ params }) => {
  let id = +params.id!;

  const { data, error } = await client
    .query<Query>(QUERY_CHARACTER, { id })
    .toPromise();
    
  if (data?.character) {
    return json(data.character);
  }

  throw new Response(error?.message, {
    status: 404
  })
};

type LoaderData = Query['character'];

export default function Index() {
  let character = useLoaderData<LoaderData>();

  return (
    <main>
      <h3>{character?.name}</h3>
      <img src={`${character?.image}`} alt={`${character?.name}`}/>
    </main>
  );
}
