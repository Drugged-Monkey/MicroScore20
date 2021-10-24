import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleAuthenticationProvider } from "../../libs/auth/googleAuthenticationProvider";

import { IApplicationState, IAuthState } from "../../libs/interfaces";


interface IAuthButtonProps {
    onSignedIn?: () => Promise<void>;
    onSignedOut?: () => Promise<void>;
}


const defaultAuthButtonProps = (history): IAuthButtonProps  => {
    return  {
        onSignedIn: (): Promise<void> => {
            return new Promise<void>((resolve, reject) => {
                try {
                    history.push("/");
                    resolve();
                } catch(err) {
                    reject(err);
                }
            });
        },
        onSignedOut: (): Promise<void> => {
            return new Promise<void>((resolve, reject) => {
                try {
                    history.push("/");
                    resolve();
                } catch(err) {
                    reject(err);
                }
            });
        }
    }
}


const AuthButton = (props?: IAuthButtonProps) => {
    const history = useHistory();
    const { isAuthenticated, user } = useSelector<IApplicationState, IAuthState>(state => state.auth);

    const onSignedIn = props?.onSignedIn || defaultAuthButtonProps(history).onSignedIn;
    const onSignedOut = props?.onSignedOut || defaultAuthButtonProps(history).onSignedOut;

    const signOut = () => { googleAuthenticationProvider.signOut(onSignedOut); };
    const signIn = () => { googleAuthenticationProvider.signIn(onSignedIn); };

    console.log(googleAuthenticationProvider);

    return (
        <div>
            {
            isAuthenticated ? (
                <div>
                    <img src={user.photoURL} alt={"avatar"}/>
                    <span>Hi, {user.name} ({user.email})</span>
                    <button onClick={signOut}>Sign out</button>
                </div>
            ) : (
                <div>
                <button onClick={signIn}>Sign in with {googleAuthenticationProvider.name}</button>
                </div>
            )}
        </div>
    )
}

export default AuthButton;