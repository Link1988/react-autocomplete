import { useState, useCallback } from 'react';

type useQueryProps<QueryFnType> = {
  queryFn: QueryFnType;
}

export function useQuery<
  QueryFnType extends (options?: RequestInit) => Promise<ResponseType>,
  ResponseType,
>({ queryFn }: useQueryProps<QueryFnType>) {
  let controller: AbortController;

  const [data, setData] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(
    async (options?: RequestInit) => {
      setIsLoading(true);
      try {
        controller = new AbortController();
        const signal = controller.signal;
        const response = await queryFn({
          signal,
          ...options,
        });
        setData(response as ResponseType);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [queryFn]
  );

  const abort = useCallback(() => {
    if (controller) {
      setIsLoading(false);
      controller.abort();
    }
  }, []);

  return { data, isLoading, error, fetch, abort };
};
