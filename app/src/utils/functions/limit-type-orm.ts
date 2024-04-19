export function limitByTypeOrm(
  limitBy?: string | number,
  page?: string | number,
) {
  const defaultLimitAndPage = { take: 30, skip: 0 };

  if (!limitBy && !page) return defaultLimitAndPage;

  let take = Number(limitBy);
  let skip = Number(page);

  take = Number.isNaN(take) ? defaultLimitAndPage.take : take;
  skip = Number.isNaN(skip) ? defaultLimitAndPage.skip : skip;

  if (take > defaultLimitAndPage.take)
    return {
      take: defaultLimitAndPage.take,
      skip: defaultLimitAndPage.take * skip - defaultLimitAndPage.take,
    };

  return {
    take,
    skip: take * skip - take,
  };
}
