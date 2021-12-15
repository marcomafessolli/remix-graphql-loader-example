import { createClient } from "@urql/core";
import type { Client as URQLClient } from "@urql/core";

const API_URL = "https://rickandmortyapi.com/graphql/";
let client: URQLClient;

declare global {
  var __client: URQLClient | undefined;
}
if (process.env.NODE_ENV === "production") {
  client = createClient({
    url: API_URL,
    requestPolicy: "cache-and-network",
  });
} else {
  if (!global.__client) {
    console.log("creating client");

    global.__client = createClient({
      url: API_URL,
      requestPolicy: "network-only",
    });
  }

  client = global.__client;
}

export { client };
