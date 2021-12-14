import { createClient } from "@urql/core";
import type { Client as URQLClient } from "@urql/core";

const API_URL = "https://rickandmortyapi.com/graphql/";

declare global {
  var __client: URQLClient | undefined;
}

function initClient() {
  if (process.env.NODE_ENV === "production") {
    return createClient({
      url: API_URL,
    })
  }

  if (global.__client) {
    return global.__client;
  }

  console.log("creating graphql client");
  
  global.__client = createClient({
    url: API_URL,
  });

  return global.__client;
}

export const client = initClient();
