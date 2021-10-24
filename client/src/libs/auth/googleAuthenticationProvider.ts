import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, browserSessionPersistence, setPersistence, Auth, User, IdTokenResult, UserInfo, UserMetadata } from "@firebase/auth";
import { IAuthProvider } from "./authProvider";
import { firebaseApp } from "../firebase";
import { exchangeGoogleTokens } from "../repositories";
import { access } from "fs";
import { store } from "../store";
import { ActionType } from "../interfaces";

interface IGoogleTokens {
    idToken?: string;
    accessToken?: string;
}

class GoogleAuthenticationProvider implements IAuthProvider {
    readonly name: string = "google.com";
    readonly provider: GoogleAuthProvider = new GoogleAuthProvider();

    GoogleAuthenticationProvider() {  }

    public signIn = (): Promise<void> => {
        const auth = getAuth(firebaseApp);

        return signInWithPopup(auth, this.provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const user = result.user;
                const accessToken = credential.accessToken;

                return user.getIdToken().then((idToken) => { return { idToken, accessToken } as IGoogleTokens });
            })
            .then((tokens: IGoogleTokens) => {
                const { idToken, accessToken } = tokens;
                return exchangeGoogleTokens(idToken, accessToken);
            })
            .then((user) => {
                if(!!user) {
                    store.dispatch({ type: ActionType.AUTH_SIGNIN, payload: user });
                    Promise.resolve();
                } else {
                    Promise.reject(new Error("Something went wrong during authorisation."));
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    public signOut = (): Promise<void> => {
        const auth = getAuth(firebaseApp);

        return signOut(auth).then(() => {
            store.dispatch({ type: ActionType.AUTH_SIGNOUT });
        }).catch((error) => {
            console.error(error);
        });
    };
}

export const googleAuthenticationProvider: GoogleAuthenticationProvider = new GoogleAuthenticationProvider();


