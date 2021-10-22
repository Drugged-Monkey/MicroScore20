import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import { authProvider } from "../../libs/authProvider";
import { IApplicationState, IAuthState } from "../../libs/interfaces";

interface IAuthButtonProps {

}

const AuthButton = (props?: IAuthButtonProps) => {
    const history = useHistory();

    const { isAuthenticated } = useSelector<IApplicationState, IAuthState>(state => state.auth);

    const signOut = () => { authProvider.signOut(async () => history.push("/")); };

    const signIn = () => { authProvider.signIn(async () => history.push("/")); };

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