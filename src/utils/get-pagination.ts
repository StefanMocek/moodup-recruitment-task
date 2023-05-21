const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 3;

interface PaginationQuery {
  page?: number;
  limit?: number;
}

export function getPagination (query: PaginationQuery) {
  const page = Math.abs(query.page ?? DEFAULT_PAGE_NUMBER);
  const limit = Math.abs(query.limit ?? DEFAULT_PAGE_LIMIT);
  const skip = limit * (page - 1);
  return {
    skip,
    limit
  };
};