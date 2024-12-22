export function paginationHelper(query: any) {
  const page: number = query.page ? parseInt(query.page, 10) : 1;
  const limit: number = query.limit ? parseInt(query.limit) : 10;
  return { page, limit };
}
