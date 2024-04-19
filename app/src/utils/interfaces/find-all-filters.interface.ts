export interface IFindAllFilters {
  filters?: { [key: string]: string | string[] };
  page?: number | string;
  limitBy?: number | string;
  orderBy?: string;
}
