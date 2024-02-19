import { FetchQuery } from "@airstack/node/dist/types/types";

export interface IteratePaginationResponse<Data> {
  data: Data | null | undefined;
  error?: any;
  hasPrevPage: boolean | undefined;
  hasNextPage: boolean | undefined;
  getPrevPage: () => Promise<IteratePaginationResponse<Data>>;
  getNextPage: () => Promise<IteratePaginationResponse<Data>>;
}

/**
 * @description Iterate through the pagination of Airstack queries w/ formatting included
 * @example
 * const { getNextPage } = await fetchQueryWithPagination(query, variables);
 * const res = await iteratePagination(getNextPage);
 *
 * @param iteratePage Either `getNextPage` or `getPrevPage` from `fetchQueryWithPagination`
 * @returns Next/previous page result of Airstack queries w/ formatting included
 */
export async function iteratePagination<Data, Variables>(
  iteratePage: (() => Promise<FetchQuery | null>) | undefined,
  formatFunction: (data: Variables) => any
  // TODO: need to generalize this output type
): Promise<IteratePaginationResponse<Data>> {
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    (await iteratePage?.()) ?? {};
  return {
    data: formatFunction?.(data as Variables),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination(getPrevPage, formatFunction),
    getNextPage: async () =>
      await iteratePagination(getNextPage, formatFunction),
  };
}
