import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import About from '../../pages/About/About';
import MM from '../../pages/MM/MM';
import { IApplicationState } from '../../libs/interfaces';
import { fetchInitialData } from '../../libs/store';

import cssExports from './App.scss'; 

const App = () => {
    const isLoadingVisible = useSelector<IApplicationState, boolean>(state => state.common.loading);

    React.useEffect(() => {
        fetchInitialData();
    }, [])

    return (
        <div>
            <Loading visible={isLoadingVisible}/>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={MM} />
                    <Route path="/town/:townId/season/:seasonId" component={MM} />
                    <Route path="/town/:townId/season/:seasonId/" component={MM} />
                    <Route path="/town/:townId" component={MM} />
                    <Route path="/town/:townId/" component={MM} />
                    <Route path="/about" component={About} />                    
                    <Route path="/about/" component={About} />
                </Switch>
            </Router>
            <Footer />
        </div>
    )
}

export default App;



