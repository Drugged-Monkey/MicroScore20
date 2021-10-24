import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
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

    public signIn = (onSignedIn?: () => {}): Promise<void> => {
        const auth = getAuth(firebaseApp);
        
        return signInWithPopup(auth, this.provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const user = result.user;
                const accessToken = credential.accessToken;

                return user.getIdToken().then((idToken) => { return { idToken, accessToken } as IGoogleTokens});
            })
            .then((tokens: IGoogleTokens) => {
                const { idToken, accessToken } = tokens;
                return exchangeGoogleTokens(idToken, accessToken);
            })
            .then((user) => {
                store.dispatch({type: ActionType.AUTH_SIGNIN, payload: user});

                if(!!onSignedIn) {
                    onSignedIn();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } 

    public signOut = (onSignedOut?: () => {}): Promise<void> => {
        const auth = getAuth(firebaseApp);

        return signOut(auth).then(() => {
            store.dispatch({type: ActionType.AUTH_SIGNOUT});

            if(!!onSignedOut) {
                onSignedOut();
            }
        }).catch((error) => {
            console.error(error);
        });
    };
}

export const googleAuthenticationProvider: GoogleAuthenticationProvider = new GoogleAuthenticationProvider();


