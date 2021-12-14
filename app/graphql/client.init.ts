import { createClient } from "@urql/core";
import type { Client } from "@urql/core";

const API_URL = "https://rickandmortyapi.com/graphql/";

let client: Client;

declare global {
  var __client: Client | undefined;
}

if (process.env.NODE_ENV === "production") {
  client = createClient({
    url: API_URL,
  });
} else {
  if (!global.__client) {
    console.log("creating graphql client");

    global.__client = createClient({
      url: API_URL,
    });
  }

  client = global.__client;
}

export { client };
