import { getAuth, signInWithCredential, GoogleAuthProvider, UserCredential } from "@firebase/auth";
import express from "express";
import { IUserBase } from "../libs/interfaces";
import { getUser, updateUser, createUser } from "../services/users";

import { firebaseApp } from "../libs/firebase";

interface IGoogleIdToken {
    idToken?: string;
    accessToken?: string
}

export const postGoogleTokens = (request: express.Request, response: express.Response) => {
    const { idToken, accessToken } = request.body as IGoogleIdToken;
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    const auth = getAuth(firebaseApp);

    signInWithCredential(auth, credential)
        .then((result: UserCredential) => {
            const gUser = result.user;
            return getUser(result.user.uid).then((user: IUserBase) => {
                return { user, result };
            });
        })
        .then((composit): Promise<IUserBase> => {
            const { user, result } = composit;
            const gUser = result.user;

            if (!!!user) {
                const newUser = {
                    id: gUser.uid,
                    name: gUser.displayName,
                    email: gUser.email,
                    photoURL: gUser.photoURL,
                    ratingId: null,
                    roles: ["user"],
                    authProvider: result.providerId
                } as IUserBase;
                return createUser(newUser, gUser.uid);
            }
            
            return Promise.resolve(user);
        })
        .then((user) => {
            response.status(200).json(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const cfe = GoogleAuthProvider.credentialFromError(error);

            console.error("error:", error);

            response.status(500).json({ error: errorMessage });
        });
}