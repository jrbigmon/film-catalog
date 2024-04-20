export interface ICacheManagerService {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
}
