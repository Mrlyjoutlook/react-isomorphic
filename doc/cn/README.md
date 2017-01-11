#关于React在多应用入口，服务端渲染，同构方面解决方案

##目录

- [概述](#Overview)  
  - [node做中间层探索和思路](https://github.com/Mrlyjoutlook/react-isomorphic/tree/master/doc/node)
  - [服务端渲染和客户端渲染流程讲解]()
- [使用](#Installation)

##Overview
该项目是使用Node.js做中间层来做服务端渲染，实现前后端同构。[node做中间层探索和思路(点击阅读)](https://github.com/Mrlyjoutlook/react-isomorphic/tree/master/doc/node)。  
####为什么要做同构和多应用入口？  
首先说同构，同一套组件能够在服务端和客户端渲染出的DOM结构一致，最大的好处是在`首屏直出`,`SEO`,`对爬虫友好`,`服务端和客户端可以共享某些代码`...笔者开发过程大多数是SPA这种开发模式，这种方式带来优质的体验效果同时也让笔者感觉到它在某些应用场景上的缺失。对于一些大型点，复杂的项目应该是多页面多入口，不该是采用单页面单入口的这种拥挤方式。多入口可以很清晰的把业务逻辑代码分割开来，哪一部分是对应着哪一部分。就拿登录注册和主控制面板来说，大多数用户停留在主控制面板的时间远远大于登录注册，故可以分成2个入口，代码合理分割开来了，有人会说在代码分割和按需加载，确实可以减少部分代码，但涉及到主代码还是留在控制面板这里，并非分割的完全。总体下来也是web优化的一种手段。
####同构（Isomorphic）
通过React提供的服务端渲染方法，我们可以在服务器上生成DOM结构，让用户尽早看到页面内容，但是一个能够work的页面不仅仅是DOM结构，还包括了各种事件响应、用户交互。那么意味着，在客户端上，还得执行一段JS代码绑定事件、处理异步交互，在React中，意味着整个页面的组件需要重新渲染一次，反而带来了额外的负担。

因此，在服务端渲染中，有一个十分重要的概念， 同构(Isomorphic) ，在服务端和客户端中，使用完全一致的React组件，这样能够保证两个端中渲染出的DOM结构是完全一致的，而在这种情况下，客户端在渲染过程中，会判断已有的DOM结构是否和即将渲染出的结构相同，若相同，不重新渲染DOM结构，只是进行事件绑定。  
`相关链接`：[React+Redux 同构应用开发（上面段落引用来自这里）](http://www.aliued.com/?p=3077)
####React服务端渲染和同构的原理
React天生的`虚拟DOM`不仅前所未有为前端页面带来性能的提升，还带来了服务端渲染的优势。（`虚拟DOM 的概念`虚拟DOM以对象树的形式保存在内存中，与真实DOM相映射，通过ReactDOM的Render方法，渲染到页面中，并维护DOM的创建、销毁、更新等过程，以最高的效率，得到相同的DOM结构。）在客户端渲染，React API提供`ReactDOM.render`将DOM结构渲染到页面中，在服务端渲染方面，又提供2API`ReactDOMServer.renderToString`,`ReactDOMServer.renderToStaticMarkup`，将虚拟DOM渲染成一段完整的HTML结构的字符串，然后由服务端IO输出至浏览器解析。  

- 流程：请求->路由->初次渲染html字符串（此时渲染生命周期知道componentWillMount）->IO输出->client->再次渲染（流程原理下面会详解）
- `renderToString`渲染出的字符串中会包含checksum，在客户端通过checksum判断是否需要重新render
相同则不重新render，省略创建DOM和挂载DOM的过程，接着触发 componentDidMount 等事件来处理服务端上的未尽事宜(事件绑定等)，从而加快了交互时间；不同时，组件将客户端上被重新挂载 render。
- `renderToStaticMarkup`:渲染出的字符串不包含data-*和checksum，适合静态，不被再次渲染的组件

####如何使用Webpack支架起Client和Server开发?
该项目server采用的框架为express，express笔者较为熟悉和业务开发也够用了，至于koa？等它2017年第二版正式发布后就直接用koa2了。  
由于从开发到生产部署及中间的服务端渲染各种配置较为复杂使得很多人都止步于此，感谢网上各路大神贡献！(此处省略1w字)  
![架构图](https://raw.githubusercontent.com/Mrlyjoutlook/react-isomorphic/master/doc/images/webpack.png)

##Installation
Install using npm:

```
$ npm install
```

dev:

```
npm run dev
```

dist:

```
npm run dist
```

If a node-sass error occurs:

```
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
```

#Features

- React
- Redux
- React-Route
- Express
- Webpack
- support Postcss,Less,Sass
- PM2