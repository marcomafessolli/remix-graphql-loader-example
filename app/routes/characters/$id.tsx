import type { MetaFunction, LoaderFunction, } from "remix";
import { useLoaderData, json, Link } from "remix";

import { useNavigate } from "remix";

import { client } from "~/utils/urql.server";

import type { Character } from "@marcomafessolli/rick-and-morty-gql-files";

export let meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return { 
      title: `Character ${params.id} found`,
      description: "No character found"
    };
  }

  return {
    title: `${data.name}`,
    description: `${data.name} detail page`
  };
};

export let loader: LoaderFunction = async ({ params }) => {
  let id = params.id!;

  const { character } = await client.QueryCharacter({ id });
    
  if (character) {
    return json(character);
  }

  throw new Response('Not found', { status: 404 });
};

export default function Index({  }) {
  let character = useLoaderData<Character>();
  let navigate = useNavigate();

  return (
    <main>
      <Link to={`/`} onClick={() => { navigate(-1) }}>
        Back to characters
      </Link>
      
      <h3>{character?.name}</h3>
      <img src={`${character?.image}`} alt={`${character?.name}`}/>
    </main>
  );
}
