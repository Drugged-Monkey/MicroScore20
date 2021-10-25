import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleAuthenticationProvider } from "../../libs/auth/googleAuthenticationProvider";

import { IApplicationState, IAuthState } from "../../libs/interfaces";
import cssExports from "./AuthButton.scss";


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

    const signOut = () => { googleAuthenticationProvider.signOut(); };
    const signIn = () => { googleAuthenticationProvider.signIn(); };

    return (
        <div className={cssExports["auth-button"]}>
            {
            isAuthenticated ? (
                <div>
                    <img src={user.photoURL} alt={"avatar"}/>
                    <span>Hi, {user.name}</span> 
                    <button onClick={signOut}>Sign out</button>
                </div>
            ) : (
                <div>
                    <button className={cssExports["login-button"]} onClick={signIn}>Sign in with {googleAuthenticationProvider.name}</button>
                </div>
            )}
        </div>
    )
}

export default AuthButton;