import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IApplicationState, IAuthState } from '../../libs/interfaces';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useSelector<IApplicationState, IAuthState>(state => state.auth);
    
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;