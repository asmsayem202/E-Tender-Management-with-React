import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";

const useFetchData = <TData, TError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>
) => {
  const query = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
};

export default useFetchData;
