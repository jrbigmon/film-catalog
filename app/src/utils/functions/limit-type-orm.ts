export function limitByTypeOrm(limitBy?: string | number) {
  const maxSize = 30;

  if (!limitBy) return maxSize;

  const value = Number(limitBy);

  if (Number.isNaN(value)) return maxSize;

  if (value > maxSize) return maxSize;

  return value;
}
