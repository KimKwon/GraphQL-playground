import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

function useGqlQuery(query, variables) {
  const [data, setdata] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(0);
  const [loading, setloading] = useState(false);

  const refetch = useCallback(() => setShouldRefetch((prev) => prev + 1), []);
  const request = useCallback(async () => {
    try {
      setloading(true);
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

      setdata(result.data.data.members || []);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  }, [query, variables]);

  useEffect(() => {
    request();
  }, [query, variables, shouldRefetch]);

  return { data, loading, refetch };
}

export default useGqlQuery;
