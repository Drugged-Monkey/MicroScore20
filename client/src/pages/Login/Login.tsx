import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import cssExports from "./Login.scss";

import { authProvider } from "../../libs/authProvider";
import { IApplicationState, IAuthState } from "../../libs/interfaces";
import { useSelector } from "react-redux";

interface ILoginProps {

}

const Login = (props?: ILoginProps) => {
    const { state } = useLocation();
    const { from } =  state as { from: {pathname: string} } || { from: { pathname: "/" } };
    const { isAuthenticated } = useSelector<IApplicationState, IAuthState>(state => state.auth);

    const login = () => {
        authProvider.signIn(() => {

        });
    };

    return (
        <div className={cssExports.login}>
            {isAuthenticated ? <Redirect to={from} /> : null}
            
            <div>
                <span>You must log in to view the page at {from.pathname}! </span>
                <button onClick={login}>Sign in</button>
            </div>
        </div>
    );
}

export default Login;