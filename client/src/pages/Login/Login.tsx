import * as React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

import cssExports from "./Login.scss";

import { fakeAuthProvider } from "../../libs/auth/fakeAuthProvider";
import { defaultLocationState, IApplicationState, IAuthState, ILocationState } from "../../libs/interfaces";
import { useSelector } from "react-redux";
import AuthButton from "../../components/AuthButton/AuthButton";
import { googleAuthenticationProvider } from "../../libs/auth/googleAuthenticationProvider";

interface ILoginProps {

}

const Login = (props?: ILoginProps) => {
    const { state } = useLocation<ILocationState>();
    const { from } = state || defaultLocationState;

    const { isAuthenticated } = useSelector<IApplicationState, IAuthState>(state => state.auth);

    const history = useHistory();

    const onSignedIn = (history) => (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                history.push(from);
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }

    const onLoginWithGoogleClick = (event): Promise<void> => {
        return googleAuthenticationProvider.signIn();
    }

    return (
        <div className={cssExports.login}>
            {isAuthenticated ? <Redirect to={from} /> : null}
            <div>
                <span>You must log in</span>

                <button onClick={onLoginWithGoogleClick}>Login with google</button>
                { 
                // <AuthButton onSignedIn={onSignedIn(history)} />
                }
            </div>
        </div>
    );
}

export default Login;