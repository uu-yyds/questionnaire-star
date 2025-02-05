class CacheService {
  private cache: Storage;
  constructor(storage: Storage = localStorage) {
    this.cache = storage;
  }
  set(key: string, value: any) {
    this.cache.setItem(key, JSON.stringify(value));
  }
  get(key: string) {
    const value = this.cache.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  remove(key: string) {
    this.cache.removeItem(key);
  }
}

export const localCacheService = new CacheService();
export const sessionCacheService = new CacheService(sessionStorage);
