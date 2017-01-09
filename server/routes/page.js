import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext,match,createMemoryHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from '../../client/stores/configureStore';

const getRoutes=require('../../client/views');

module.exports = function (req, res, next) {
  
  //构建出内存中历史记录
  // const memoryHistory = createMemoryHistory(req.originalUrl);
  
  //匹配客户端路由 history:memoryHistory,
  match({ routes: getRoutes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    //服务端构建出Store
    const store = configureStore();

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).render('index',{
        root:renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ),
        state:store.getState()
      });
    } else {
      res.status(404).send('Not found')
    }
  })
}