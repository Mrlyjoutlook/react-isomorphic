// Hook for server 服务端渲染，require.ensure是不存在的，因此需要判断运行环境，提供钩子函数
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

module.exports = {
  childRoutes: [{
    path: '/',
    component:require('./components/App.js')
  },{
    path:'*',
    component:require('./components/NotFound.js')
  }]
};