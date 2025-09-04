import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { brandClientApi } from "../lib/client";

interface Props {
  queryKey: string[];
  url: string;
  enabled?: boolean;
}

function useGet<RT>({ queryKey, url, enabled = true }: Props) {
  const { data, isPending, error, isError, isLoading, isFetching, status } =
    useQuery({
      queryKey,
      queryFn: async () => {
        try {
          const res = await brandClientApi.httpClient.request<RT>(url, "GET");
          return res.data;
        } catch (error) {
          brandClientApi.utils.alertError(error);
        }
      },
      // placeholderData: keepPreviousData,
      enabled,
    });

  console.log(status);

  return {
    data,
    isPending,
    error,
    isError,
    isLoading,
    isFetching,
    status,
  };
}
export default useGet;
