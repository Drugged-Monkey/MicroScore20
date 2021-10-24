import { Cache } from "../libs/cache";
import { IUserBase, SortDirection } from "../libs/interfaces";
import { usersRepository } from "../repositories/users";
import { sorterCreator } from "../libs/utils";


export const listUsers = () => usersRepository.list();

export const getUser = (id: string) => {
    return usersRepository.list()
        .then((users) => {
            if(!!!users || users.length === 0) {
                // throw new Error("Users collection is empty!");
                return null;
            }
            const user = users.find(u => u.id === id);
            // if(!!!user) {
               // throw new Error(`There is no user with id '${id}'!`);

            // }
            return user;
        })
}

export const createUser = (user: IUserBase, id: string = null): Promise<IUserBase> => {
    return usersRepository.create(user, id);
}

export const updateUser = (user: IUserBase): Promise<IUserBase> => {
    return usersRepository.update(user);
}

