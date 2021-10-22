import * as React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

import cssExports from "./Login.scss";

import { authProvider } from "../../libs/authProvider";
import { defaultLocationState, IApplicationState, IAuthState, ILocationState } from "../../libs/interfaces";
import { useSelector } from "react-redux";
import AuthButton from "../../components/AuthButton/AuthButton";

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

    return (
        <div className={cssExports.login}>
            {isAuthenticated ? <Redirect to={from} /> : null}
            <div>
                <span>You must log in to view the page at <a href={from.pathname}>{from.pathname}</a>! </span>
                <AuthButton onSignedIn={onSignedIn(history)} />
            </div>
        </div>
    );
}

export default Login;