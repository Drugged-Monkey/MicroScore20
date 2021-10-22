import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authProvider } from "../../libs/authProvider";
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
    const { isAuthenticated } = useSelector<IApplicationState, IAuthState>(state => state.auth);

    const onSignedIn = props?.onSignedIn || defaultAuthButtonProps(history).onSignedIn;
    const onSignedOut = props?.onSignedOut || defaultAuthButtonProps(history).onSignedOut;

    const signOut = () => { authProvider.signOut(onSignedOut); };
    const signIn = () => { authProvider.signIn(onSignedIn); };

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={signOut}>Sign out</button>
            ) : (
                <button onClick={signIn}>Sign In</button>
            )}
        </div>
    )
}

export default AuthButton;