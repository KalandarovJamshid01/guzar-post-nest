import { FindOneOptions } from 'typeorm';

export function buildQueryOneOptions(query: any, relations?: string[]) {
  const options: FindOneOptions = {};
  query = JSON.parse(query);
  const field = Object.keys(query)[0];

  options.where = { [field]: query[field] };

  if (relations && relations.length > 0) {
    options.relations = relations;
  }
  return options;
}
