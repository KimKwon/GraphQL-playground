import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

function useGqlMutation(queryName) {
  const trigger = useCallback(async (query, variables, onCompleted) => {
    try {
      const result = await client.post(
        "/graphql",
        JSON.stringify({
          query,
          variables,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      onCompleted && onCompleted(result.data.data[queryName]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [trigger];
}

export default useGqlMutation;
