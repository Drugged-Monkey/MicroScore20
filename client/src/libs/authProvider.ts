import { ActionType } from "./interfaces";
import { store } from "./store";

interface IAuthProvider {
    //isAuthenticated: boolean;
    signIn: (onSignedIn: () => {}) => Promise<void>;
    signOut: (onSignedOut: () => {}) => Promise<void>;
}

class AuthProvider implements IAuthProvider {
    //private _isAuthenticated: boolean = false;

    //public get isAuthenticated() {
    //    return this._isAuthenticated;
    // }

    public signIn(cb?: () => void): Promise<void> {
        return delay(1000).then(() => {
            if (!!cb) { cb(); };
            store.dispatch({ type: ActionType.AUTH_SIGNIN });
            // this._isAuthenticated = true; 
        });
    }

    public signOut(cb?: () => void): Promise<void> {
        return delay(1000).then(() => {
            if (!!cb) { cb(); };
            store.dispatch({ type: ActionType.AUTH_SIGNOUT });
            // this._isAuthenticated = false; 
        });
    }
};

const delay = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export const authProvider: AuthProvider = new AuthProvider();