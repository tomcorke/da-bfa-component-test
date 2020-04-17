function clone<T>(obj: T) {
  try {
    return JSON.parse(JSON.stringify(obj)) as T;
  } catch (e) {
    // This is fine
  }
}

export abstract class DB<T> {
  public data: {
    [key: string]: T | undefined;
  } = {};

  constructor(name: string) {
    /* ABSTRACT */
  }

  public abstract init(): Promise<void>;

  public abstract saveData(): Promise<void>;

  public set(key: string, data: T): Promise<void> {
    this.data[key] = clone(data);
    return this.saveData();
  }

  public get(key: string): T | undefined {
    return clone(this.data[key]);
  }

  public getAll() {
    return clone(this.data);
  }

  public getAllValues(): T[] {
    return clone(Object.values(this.data)) as T[];
  }

  public delete(key: string) {
    delete this.data[key];
    this.saveData();
  }
}
