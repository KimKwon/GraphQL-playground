import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

function useGqlQuery(query, variables, queryName, isLazy) {
  const [data, setdata] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(0);
  const [loading, setloading] = useState(false);

  const refetch = useCallback(() => setShouldRefetch((prev) => prev + 1), []);
  const request = useCallback(
    async (variables) => {
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

        setdata(result.data.data[queryName] || []);
        return result.data.data[queryName] || [];
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    },
    [query, variables]
  );

  useEffect(() => {
    if (isLazy) {
      if (shouldRefetch) request();
    } else {
      request();
    }
  }, [query, variables, shouldRefetch]);

  if (isLazy) return [request, { data, loading, refetch }];

  return { data, loading, refetch };
}

export default useGqlQuery;
