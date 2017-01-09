import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(history, initialState) {

  const createStoreWithMiddleware = compose(
      applyMiddleware(
        thunk
      ),
      // window.devToolsExtension ? window.devToolsExtension() : f=>f
  )(createStore);
  
  const store = createStoreWithMiddleware(rootReducer, initialState);

  /**
   * redux reducers的热加载 
   */
//   if (module.hot) {
//     module.hot.accept('../reducers', ()=>store.replaceReducer(require('../reducers').default))
//   }
  
  return store;
}
