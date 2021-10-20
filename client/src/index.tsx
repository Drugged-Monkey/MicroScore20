import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';

import App from './components/App/App';

import { store } from './libs/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
); 