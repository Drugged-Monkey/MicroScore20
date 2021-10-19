import { BaseRepository, IBaseRepositoryOptions, IBaseRepository } from "./base";
import { ITourBase } from "../libs/interfaces";

interface IToursRepositoryOptions extends IBaseRepositoryOptions {

};

const toursRepositoryOptions: IToursRepositoryOptions = {
    collectionName: "tours"
}

interface IToursRepository extends IBaseRepository<ITourBase> {
    listByTownAndSeason: (townId: string, seasonId: string) => Promise<ITourBase[]>;
}

class ToursRepository extends BaseRepository<ITourBase> implements IToursRepository {
    constructor(opts?: IToursRepositoryOptions) {
        super(opts);
    }

    listByTownAndSeason = (townId: string, seasonId: string): Promise<ITourBase[]> => {
        const q = this.collection.where("townId", "==", townId).where("seasonId", "==", seasonId);
        return this.query(q);
    }
}

export const toursRepository: ToursRepository = new ToursRepository(toursRepositoryOptions);