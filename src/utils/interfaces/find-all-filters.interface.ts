export interface IFindAllFilters<T extends object> {
  filters: Partial<T>;
  page: number;
  limitBy: number;
  orderBy: 'ASC' | 'DESC';
}
