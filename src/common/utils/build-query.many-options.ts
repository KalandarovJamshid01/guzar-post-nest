import { Between, FindManyOptions, In, Like } from 'typeorm';
import { paginationHelper } from '../helpers/pagination.helper';

export function buildQueryManyOptions(
  query: any,
  searchFields: string[],
  relations?: string[],
) {
  const options: FindManyOptions = {};
  //Pagination
  const { page, limit } = paginationHelper(query);
  options.skip = (page - 1) * limit;
  options.take = limit;

  if (query.sort) {
    const sortField: string = query.sort.startsWith('-')
      ? query.sort.slice(1)
      : query.sort;
    const sortOrder: 'ASC' | 'DESC' = query.sort.startsWith('-')
      ? 'DESC'
      : 'ASC';
    options.order = { [sortField]: sortOrder };
  }
  const whereConditions: any[] = [];
  if (query.search && searchFields.length > 0) {
    const search = searchFields.map((field) => ({
      [field]: Like(`%${query.search}%`),
    }));
    whereConditions.push(...search);
  }

  if (query.between) {
    query.between = JSON.parse(query.between);
    const betweenField = Object.keys(query.between)[0];
    const [start, end] = query.between[betweenField];
    whereConditions.push({
      [betweenField]: Between(start, end),
    });
  }
  if (query.in) {
    query.in = JSON.parse(query.in);
    const inField = Object.keys(query.in)[0];
    const values = query.in[inField];
    whereConditions.push({
      [inField]: In(values),
    });
  }

  if (whereConditions.length > 0) {
    options.where = whereConditions;
  }
  if (relations && relations.length > 0) {
    options.relations = relations;
  }

  return options;
}
