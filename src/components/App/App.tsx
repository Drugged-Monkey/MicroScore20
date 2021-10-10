import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import About from '../About/About';
import Home from '../Home/Home';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'src/libs/interfaces';
import cssExports from './App.scss'; 

const App = () => {
    const loading = useSelector<IApplicationState, boolean>(state => state.common.loading);
    const loadingElement = loading ? <div className={cssExports.loading}>LOADING</div> : null;

    return (
        <div>
            {loadingElement}
            <Router>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </Router>
            <Footer />
        </div>
    )
}

export default App;



