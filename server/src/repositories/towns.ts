import { BaseRepository, IBaseRepositoryOptions, IBaseRepository } from "./base";
import { ITownBase } from "../libs/interfaces";

interface ITownsRepositoryOptions extends IBaseRepositoryOptions {

};

const townsRepositoryOptions: ITownsRepositoryOptions = {
    collectionName: "towns"
}

interface ITownsRepository extends IBaseRepository<ITownBase> {

}

class TownsRepository extends BaseRepository<ITownBase> implements ITownsRepository {
    constructor(opts?: ITownsRepositoryOptions) {
        super(opts);
    }
}

export const townsRepository: TownsRepository = new TownsRepository(townsRepositoryOptions);