import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import createStore from './createStore';
import injectTapEventPlugin from 'react-tap-event-plugin';


import Index from './pages/index';

injectTapEventPlugin();
const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
