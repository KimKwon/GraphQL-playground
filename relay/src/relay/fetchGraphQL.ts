const BASE_URL = "https://api.github.com";

type Variables = Record<string, string | number>;

async function fetchGraphQL(text: string, variables: Variables) {
  return fetch(`${BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  }).then((res) => res.json());
}

export default fetchGraphQL;
