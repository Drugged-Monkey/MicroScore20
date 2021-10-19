import { BaseRepository, IBaseRepositoryOptions, IBaseRepository } from "./base";
import { ISeasonBase, ITownBase } from "../libs/interfaces";

interface ISeasonsRepositoryOptions extends IBaseRepositoryOptions {

};

const seasonsRepositoryOptions: ISeasonsRepositoryOptions = {
    collectionName: "seasons"
}

interface ISeasonsRepository extends IBaseRepository<ISeasonBase> {
    listByTown: (townId: string) => Promise<ISeasonBase[]>;
}

class SeasonsRepository extends BaseRepository<ISeasonBase> implements ISeasonsRepository {
    constructor(opts?: ISeasonsRepositoryOptions) {
        super(opts);
    }

    listByTown = (townId: string): Promise<ISeasonBase[]> =>  {
        const q = this.collection.where("townId", "==", townId);

        return this.query(q);
    };
}

export const seasonsRepository: SeasonsRepository = new SeasonsRepository(seasonsRepositoryOptions);