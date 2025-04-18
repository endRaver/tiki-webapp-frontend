export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheManager<T> {
  private cache: Record<string, CacheItem<T>> = {};
  private cacheDuration: number;

  constructor(cacheDuration: number = 5 * 60 * 1000) {
    // Default 5 minutes
    this.cacheDuration = cacheDuration;
  }

  get(key: string): T | null {
    const cacheItem = this.cache[key];
    if (!cacheItem) return null;

    if (this.isCacheValid(cacheItem)) {
      return cacheItem.data;
    }

    // Remove expired cache
    delete this.cache[key];
    return null;
  }

  set(key: string, data: T): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  clear(key?: string): void {
    if (key) {
      delete this.cache[key];
    } else {
      this.cache = {};
    }
  }

  private isCacheValid(cacheItem: CacheItem<T>): boolean {
    return Date.now() - cacheItem.timestamp < this.cacheDuration;
  }
}
