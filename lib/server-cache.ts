type Entry<T> = { value: T; exp: number };

const store = new Map<string, Entry<unknown>>();

export function getCached<T>(key: string): T | null {
  const hit = store.get(key);
  if (!hit) {
    return null;
  }

  if (Date.now() > hit.exp) {
    store.delete(key);
    return null;
  }

  return hit.value as T;
}

export function setCached<T>(key: string, value: T, ttlMs: number) {
  store.set(key, { value, exp: Date.now() + ttlMs });
}