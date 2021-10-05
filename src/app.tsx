import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

ReactDOM.render(
  <div>
    <Header/>
    <Body/>
    <Footer/>
  </div>,
  document.getElementById('app')
);
