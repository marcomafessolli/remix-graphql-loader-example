import type { MetaFunction, LoaderFunction, } from "remix";
import { useLoaderData, json, Link } from "remix";

import { useNavigate } from "remix";

import { queryCharacter } from "~/graphql/queries";
import type { Query } from "~/graphql/types";

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

  const { data, error } = await queryCharacter(id);
    
  if (data?.character) {
    return json(data.character);
  }

  throw new Response(error?.message, {
    status: 404
  })
};

type LoaderData = Query['character'];

export default function Index({  }) {
  let character = useLoaderData<LoaderData>();
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
