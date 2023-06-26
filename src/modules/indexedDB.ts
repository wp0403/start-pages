class DB {
    databaseName: any;
    options: any;
    database: any;
    version: number;
    constructor(databaseName, options, version?) {
        this.databaseName = databaseName;
        this.options = options || {};
        this.database = null;
        this.version = version || 1;
    }
    async open() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.databaseName, this.version);
            request.onerror = (event: any) => reject(`Failed to open database: ${event.target.error}`);
            request.onsuccess = (event: any) => {
                this.database = event.target.result;
                resolve(this.database);
            };
            request.onupgradeneeded = (event: any) => {
                for (const objectStoreName in this.options.objectStores) {
                    const objectStoreOptions = this.options.objectStores[objectStoreName];
                    const objectStore = event.target.result.createObjectStore(objectStoreName, { keyPath: objectStoreOptions.keyPath || 'id' });
                    if (objectStoreOptions.indexes) {
                        for (const index of objectStoreOptions.indexes) {
                            objectStore.createIndex(index.name, index.keyPath, index.options);
                        }
                    }
                }
            };
        });
    }

    async add(objectStoreName, item) {
        return this.transaction(objectStoreName, 'readwrite', objectStore => {
            const request = objectStore.add(item);
            return new Promise((resolve, reject) => {
                request.onerror = event => reject(`Failed to add data: ${event.target.error}`);
                request.onsuccess = () => resolve(request.result);
            });
        });
    }

    async put(objectStoreName, item) {
        return this.transaction(objectStoreName, 'readwrite', objectStore => {
            const request = objectStore.put(item);
            return new Promise((resolve, reject) => {
                request.onerror = event => reject(`Failed to update data: ${event.target.error}`);
                request.onsuccess = () => resolve(request.result);
            });
        });
    }

    async get(objectStoreName, key) {
        return this.transaction(objectStoreName, 'readonly', objectStore => {
            const request = objectStore.get(key);
            return new Promise((resolve, reject) => {
                request.onerror = event => reject(`Failed to get data: ${event.target.error}`);
                request.onsuccess = () => resolve(request.result);
            });
        });
    }

    async getAll(objectStoreName) {
        return this.transaction(objectStoreName, 'readonly', objectStore => {
            const request = objectStore.getAll();
            return new Promise((resolve, reject) => {
                request.onerror = event => reject(`Failed to get all data: ${event.target.error}`);
                request.onsuccess = () => resolve(request.result);
            });
        });
    }

    async delete(objectStoreName, key) {
        return this.transaction(objectStoreName, 'readwrite', objectStore => {
            const request = objectStore.delete(key);
            return new Promise((resolve, reject) => {
                request.onerror = event => reject(`Failed to delete data: ${event.target.error}`);
                request.onsuccess = () => resolve(request.result);
            });
        });
    }

    transaction(objectStoreName, mode, callback) {
        return new Promise<void>((resolve, reject) => {
            const transaction = this.database.transaction([objectStoreName], mode);
            const objectStore = transaction.objectStore(objectStoreName);
            transaction.onerror = event => reject(`Transaction failed: ${event.target.error}`);
            transaction.onabort = () => reject('Transaction aborted');
            transaction.oncomplete = () => resolve();
            callback(objectStore).catch(error => reject(error));
        });
    }
}

const startPagesDB = new DB('startPagesDB', {
    objectStores: {
        'theme': {
            keyPath: 'key',
            indexes: [
                { name: 'key', keyPath: 'key', options: { unique: true } },
            ],
        },
    },
});

export default startPagesDB;