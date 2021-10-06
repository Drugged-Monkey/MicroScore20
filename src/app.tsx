import * as ReactDOM from 'react-dom';
import * as React from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Home from './components/Home/Home';

ReactDOM.render(
  <div>
    <Header/>
    <Home/>
    <Footer/>
  </div>,
  document.getElementById('app')
);