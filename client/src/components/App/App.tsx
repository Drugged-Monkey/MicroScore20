import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import About from '../../pages/About/About';
import Home from '../../pages/Home/Home';
import { IApplicationState } from '../../libs/interfaces';

import cssExports from './App.scss'; 

const App = () => {
    const isLoadingVisible = useSelector<IApplicationState, boolean>(state => state.common.loading);

    return (
        <div>
            <Loading visible={isLoadingVisible}/>
            <Router>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/town/:townId" component={Home} />
                <Route path="/town/:townId/season/:seasonId" component={Home} />
                <Route path="/about" component={About} />
            </Router>
            <Footer />
        </div>
    )
}

export default App;



