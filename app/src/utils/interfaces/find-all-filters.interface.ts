export interface IFindAllFilters {
  filters?: { [key: string]: string | string[] };
  page?: number;
  limitBy?: number;
  orderBy?: 'ASC' | 'DESC';
}
