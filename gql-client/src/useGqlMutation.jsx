import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

function useGqlMutation() {
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
      console.log(result);
      onCompleted(result.data.data.addMember);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [trigger];
}

export default useGqlMutation;