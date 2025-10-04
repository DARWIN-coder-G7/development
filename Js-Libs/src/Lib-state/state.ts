export class ReactiveState<T extends Record<string, any>> {
  private listeners: Map<keyof T, Set<(value: any) => void>> = new Map();
  public proxy: T;

  constructor(initial: T) {
    this.proxy = new Proxy(initial, 
      {
      get: (target, prop: string | symbol) => {
        if (typeof prop === "string" && prop in target) return target[prop as keyof T];
        return undefined;
      },
      set: (target, prop: string | symbol, value) => {
        if (typeof prop === "string" && prop in target) {
          const key = prop as keyof T ;
          target[key] = value ;
          this.listeners.get(key)?.forEach(fn => fn(value));
          return true;
        }
        return false;
      },
    }
  );
  }

  watch<K extends keyof T>(key: K, callback: (val: T[K]) => void) {
    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key)!.add(callback);
    return () => this.listeners.get(key)!.delete(callback);
  }

  getState() {
    return this.proxy;
  }
}
