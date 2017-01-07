import 'core-js/fn/object/assign';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router,match,browserHistory} from 'react-router';
import configureStore from './stores/configureStore';

// require('normalize.css');
const getRoutes=require('./views');

const store = configureStore(browserHistory,window.__INITIAL_STATE__);

match({history:browserHistory, routes: getRoutes}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={getRoutes}/>
    </Provider>,
    document.getElementById('root')
  );
})
