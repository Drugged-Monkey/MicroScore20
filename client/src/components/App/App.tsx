import * as React from 'react';
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import About from '../../pages/About/About';
import Admin from '../../pages/Admin/Admin';
import MM from '../../pages/MM/MM';
import { IApplicationState } from '../../libs/interfaces';
import { loadInitialData } from '../../libs/store';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


const App = () => {
    const isLoadingVisible = useSelector<IApplicationState, boolean>(state => state.common.loading);

    const { pathname } = useLocation();

    React.useEffect(() => {
        (async () => {
            await loadInitialData();
        })();
    }, [])

    return (
        <div>
            <Loading visible={isLoadingVisible}/>
                <Header />
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route path="/" exact component={MM} />
                    <Route path="/town/:townId/season/:seasonId" component={MM} />
                    <Route path="/town/:townId" component={MM} />
                    <Route path="/about" component={About} />                    
                    <PrivateRoute path="/admin" component={Admin} />                    
                    <Route path="/login" component={Login} />                    
                </Switch>
            <Footer />
        </div>
    )
}

export default App;



