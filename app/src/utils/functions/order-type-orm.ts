import { Sort } from '../enums/sort.enum';

export function orderTypeOrm(order: string) {
  try {
    const orderParsed = JSON.parse(order) as Array<string>;

    const sorts = Object.values(Sort) as Array<string>;

    if (!order) {
      return {
        id: Sort.ASC,
      };
    }

    const [column, sort] = orderParsed;

    if (!sort) {
      return {
        [column]: Sort.ASC,
      };
    }

    if (!sorts.includes(sort.toUpperCase())) {
      return {
        [column]: Sort.ASC,
      };
    }

    return {
      [column]: sort.toUpperCase(),
    };
  } catch (error) {
    console.log('Error on parsing order: ', error);
    return {
      id: Sort.ASC,
    };
  }
}
