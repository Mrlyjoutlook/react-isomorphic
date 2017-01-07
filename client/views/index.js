import App from './components/App';

module.exports = {
  childRoutes: [{
    path: '/',
    component:App
  },{
    path:'*',
    component:require('./components/NotFound.js')
  }]
};