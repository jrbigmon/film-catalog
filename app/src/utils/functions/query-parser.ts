import { IFindAllFilters } from '../interfaces/find-all-filters.interface';

export function queryParser(
  query: { [key: string]: string | string[] },
  options: string[],
): IFindAllFilters {
  const defaultOptions = ['page', 'limitBy', 'orderBy'];

  const queryParsed: IFindAllFilters = {
    limitBy: '30',
    orderBy: JSON.stringify(['id', 'ASC']),
    page: '0',
    filters: {},
  };

  if (!query) return queryParsed;

  Object.entries(query).forEach(([key, value]) => {
    const objectValue = { [key]: value };
    const matchDefaultKey = defaultOptions.find(
      (keyOption) => key === keyOption,
    );
    if (matchDefaultKey) {
      Object.assign(queryParsed, objectValue);
    } else {
      const matchFilters = options.find((keyOption) => key === keyOption);
      if (matchFilters) {
        Object.assign(queryParsed.filters, objectValue);
      }
    }
  });

  if (!Object.keys(queryParsed.filters).length) {
    delete queryParsed.filters;
  }

  return queryParsed;
}
