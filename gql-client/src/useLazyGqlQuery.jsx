import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

function useLazyGqlQuery(query, variables, queryName) {
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
    if (shouldRefetch) request();
  }, [query, variables, shouldRefetch]);

  return [request, { data, loading, refetch }];
}

export default useLazyGqlQuery;
