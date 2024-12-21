import { Between, FindManyOptions, In, Like } from 'typeorm';

export function buildQueryOption(query: any, searchFields: string[]) {
  const options: FindManyOptions = {};
  //Pagination
  const page: number = query.page ? parseInt(query.page, 10) : 1;
  const limit: number = query.limit ? parseInt(query.limit) : 10;
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
    const betweenField = Object.keys(query.between)[0];
    const [start, end] = query.between[betweenField];
    whereConditions.push({
      [betweenField]: Between(start, end),
    });
  }
  if (query.in) {
    const inField = Object.keys(query.in)[0];
    const values = query.in[inField];
    whereConditions.push({
      [inField]: In(values),
    });
  }

  if (whereConditions.length > 0) {
    options.where = whereConditions;
  }

  return options;
}
