import { config } from "./config";

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: string, variables: Record<string, object>) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(config.graphql.api, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
