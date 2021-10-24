import * as admin from "firebase-admin";
import { IEntity } from "../libs/interfaces";
import { db } from '../libs/firebase';


export interface IBaseRepository<T extends IEntity> {
    collectionName: string;
    collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;
    list: () => Promise<T[]>;
    get: (id: string) => Promise<T>;
    create: (item: T, id?: string) => Promise<T>;
    update: (item: T) => Promise<T>;
    query: (q: admin.firestore.Query<admin.firestore.DocumentData>) => Promise<T[]>;
    merge: (a: T, b: T) => T;
    mapId: (item: T, data: admin.firestore.DocumentData) => T;
    unmapId: (item: T) => T;
}

export interface IBaseRepositoryOptions {
    collectionName: string;
}

export abstract class BaseRepository<T extends IEntity> implements IBaseRepository<T> {
    readonly collectionName: string;
    readonly collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

    constructor(opts?: IBaseRepositoryOptions) {
        opts = opts || {} as IBaseRepositoryOptions;
        this.collectionName = opts.collectionName;
        this.collection = db.collection(this.collectionName);
    }

    query = (q: admin.firestore.Query<admin.firestore.DocumentData>): Promise<T[]> => {
        return q.get()
            .then((docs) => {
                const results: T[] = [];
                docs.forEach((doc) => {
                    const result = doc.data() as T;
                    results.push(this.mapId(result, doc));
                });

                return results;
            });
    };

    merge = (a: T, b: T): T => {
        return { ...a, ...b };
    }

    mapId = (item: T, data: admin.firestore.DocumentData): T => {
        return this.merge(item, { id: data.id } as T);
    }

    unmapId = (item: T): T => {
        return this.merge(item, { id: null } as T);
    }

    mapDoc = (doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>): T => {
        const data = doc.data() as T;
        return this.mapId(data, doc);
    }

    list = (): Promise<T[]> => {
        return this.collection
            .get()
            .then((docs) => {
                const results: T[] = [];
                docs.forEach((doc) => {
                    const result = doc.data() as T;
                    results.push(this.mapId(result, doc));
                });
                return results;
            });
    }

    get = (id: string): Promise<T> => {
        const ref = this.collection.doc(id);

        return ref.get()
            .then(doc => {
                const data: T = doc.data() as T;
                return this.mapId(data, doc);
            });
    }

    create = (item: T, id: string = null): Promise<T> => {
        if (!!!id) {
            return this.collection
                .add(this.unmapId(item))
                .then(ref => {
                    return ref.get();
                })
                .then(doc => {
                    const data: T = doc.data() as T;
                    return this.mapId(data, doc);
                });
        } else {
            return this.collection.doc(id)
                .set(item)
                .then((result: admin.firestore.WriteResult) => {
                    return this.collection.doc(id).get();
                })
                .then(doc => {
                    const data: T = doc.data() as T;
                    return this.mapId(data, doc);
                });
        }
    };

    update = (item: T): Promise<T> => {
        const id = item.id;
        const ref = this.collection.doc(id);
        item = this.unmapId(item);

        return ref.set(item, {
            merge: true
        })
            .then(res => {
                if (!!res.writeTime) {
                    return ref.get();
                } else {
                    throw new Error(`Update document '${id}' in collection '${this.collectionName} failed.`);
                }
            })
            .then(doc => {
                const data: T = doc.data() as T;
                return this.mapId(data, doc);
            });
    };
}