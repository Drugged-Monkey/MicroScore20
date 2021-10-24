import { ActionType } from "../interfaces";
import { store } from "../store";
import { IAuthProvider } from "./authProvider";

class FakeAuthProvider implements IAuthProvider {
    name: "fake";

    public signIn(cb?: () => void): Promise<void> {
        return delay(1000).then(() => {
            if (!!cb) { cb(); };
            store.dispatch({ type: ActionType.AUTH_SIGNIN });
        });
    }

    public signOut(cb?: () => void): Promise<void> {
        return delay(1000).then(() => {
            if (!!cb) { cb(); };
            store.dispatch({ type: ActionType.AUTH_SIGNOUT });
        });
    }
};

const delay = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export const fakeAuthProvider: FakeAuthProvider = new FakeAuthProvider();