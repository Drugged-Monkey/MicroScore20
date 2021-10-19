export class Cache<T> {
    private values: Map<string, T> = new Map<string, T>();
    private maxEntries: number = 20;

    public hasKey(key: string): boolean {
        return this.values.has(key);
    }

    public get(key: string): T {
        let entry: T;
        if (this.hasKey(key)) {
            entry = this.values.get(key);
            this.values.delete(key);
            this.values.set(key, entry);
        }

        return entry;
    }

    public put(key: string, value: T) {
        if (this.values.size >= this.maxEntries) {
            const keyToDelete = this.values.keys().next().value;
            this.values.delete(keyToDelete);
        }
        this.values.set(key, value);
    }

    public useCache(getKey: () => string, getData: () => T): () => T {
        const key = getKey();
        if(this.hasKey(key))  {
            return () => this.get(key);
        }  else {
            return () => {
                const result = getData();
                this.put(key, result);
                return this.get(key);
            };
        }
    }
}