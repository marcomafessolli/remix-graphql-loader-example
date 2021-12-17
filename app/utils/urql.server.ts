import { createClient, dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";

import type { Client, OperationContext, TypedDocumentNode } from "@urql/core";

import { getSdk, Requester } from '@marcomafessolli/rick-and-morty-gql-files';

const API_URL = "https://rickandmortyapi.com/graphql/";

let urqlClient: Client;

let clientConfig = {
  url: API_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    fetchExchange,
  ]
}

declare global {
  var __urqlclient: Client | undefined;
}

if (process.env.NODE_ENV === "production") {
  urqlClient = createClient(clientConfig);
} else {
  if (!global.__urqlclient) {
    global.__urqlclient = createClient(clientConfig);
  }

  urqlClient = global.__urqlclient;
}
// @ts-expect-error
const requester: Requester = async <R, V extends object>(doc: TypedDocumentNode, vars: V, options: OperationContext): Promise<R> => {
  const result = await urqlClient.query<R, V>(doc, vars, options).toPromise();

  if (result.error || result.data === undefined) {
    return Promise.resolve({ data: null, error: result.error }) as unknown as Promise<R>;
  }

  return result.data;
};

const client = getSdk<Client>(requester);

export { client };
