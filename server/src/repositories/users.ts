import { BaseRepository, IBaseRepositoryOptions, IBaseRepository } from "./base";
import { IUserBase } from "../libs/interfaces";

interface IUsersRepositoryOptions extends IBaseRepositoryOptions {

};

const usersRepositoryOptions: IUsersRepositoryOptions = {
    collectionName: "users"
}

interface IUsersRepository extends IBaseRepository<IUserBase> {

}

class UsersRepository extends BaseRepository<IUserBase> implements IUsersRepository {
    constructor(opts?: IUsersRepositoryOptions) {
        super(opts);
    }
}

export const usersRepository: UsersRepository = new UsersRepository(usersRepositoryOptions);