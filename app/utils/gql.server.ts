import { createClient, dedupExchange, fetchExchange } from "@urql/core";
import type { Client } from "@urql/core";

import { cacheExchange } from "@urql/exchange-graphcache";

const API_URL = "https://rickandmortyapi.com/graphql/";

let client: Client;

let clientConfig = {
  url: API_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    fetchExchange,
  ]
}

declare global {
  var __client: Client | undefined;
}
if (process.env.NODE_ENV === "production") {
  client = createClient(clientConfig);
} else {
  if (!global.__client) {
    console.log("creating client");

    global.__client = createClient(clientConfig);
  }

  client = global.__client;
}

export { client };
