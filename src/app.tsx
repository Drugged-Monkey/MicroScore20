import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Home from './components/Home/Home';

ReactDOM.render(
  <div>
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </Router>
    <Footer />
  </div>,
  document.getElementById('app')
); 