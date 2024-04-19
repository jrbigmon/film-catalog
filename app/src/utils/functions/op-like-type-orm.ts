import { Like, Or } from 'typeorm';

export function opLikeTypeOrm(filter: { [key: string]: string | string[] }) {
  const filterOpLike = {};

  if (!filter) return filterOpLike;

  Object.entries(filter).map(([key, values]) => {
    if (Array.isArray(values)) {
      const filterOR = values.map((value) => Like(`%${value}%`));
      filterOpLike[key] = Or(...filterOR);
    } else {
      filterOpLike[key] = Like(`%${values}%`);
    }
  });

  return filterOpLike;
}
