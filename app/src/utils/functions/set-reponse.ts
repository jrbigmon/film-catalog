import { Response } from 'express';

export function setResponse<T>(data: T, res: Response) {
  res.locals.data = data;
  return res.json(data);
}
