#node做中间层探索和思路

##历史发展

在以前`前后端未分离`的时候,基本的开发模式是，前端写好静态demo，后端翻译成VM模版（其实这个时候基本都是服务端来渲染页面）这种模式被吐槽很多，最大的体现点是在开发效率上...(此处省略1w个字)。  
再到后面的`前后端分离`，后端可以专注于M层业务逻辑，前端则在与页面展示和用户交互,此时服务端渲染的模式就开始被淡化了。大大提高的前后端的工作效率和降低了维护工作。  
**为什么要前后端分离,是否这种模式就可以满足?**笔者认为`不同的开发模式各有各的适用场景，没有哪一种完全取代另外一种`。前后端分离最典型的例子就是SPA(Single-page application)+AJAX+JWT(json web token)开发模式，为什么要提到JWT?这种认证模式与前后端分离有莫大的联系，它在首先抛开了session-cookie方式，解决前端跨域的问题。同样的，session-cookie和JWT在不同的应用场景有不用的用处。前后分离使得分工明确，但同样会爆出的问题，并不是所有的项目SPA开发模式就可以满足，SPA不能作为一种通用的解决方案。那服务端渲染呢，不是同样需要后端人员参与？这时候node就可以排上用处了，同一门语音，可以交给前端人员处理，同构方案就产生了。(笔者认为前后端分离时至今日并非完全分离，最为明显的是最大化的把前后端分工明确了，在某种意义上是转化为另一种方式。)  
以上纯属笔者的观点，欢迎吐槽！

##如何实现node做中间层

`server`:专注数据和业务逻辑，提供数据接口给上层。  
`node`:根据不同路由请求渲染不同的界面，同时也可以server层进行数据访问，肩负起一些业务逻辑处理。  
`client`：数据展现，用户交互。  

![node做中间层架构图](https://raw.githubusercontent.com/Mrlyjoutlook/react-isomorphic/master/doc/images/node.png)

node层和client层可以交给前端人员处理，这同时对前端人员提高了要求。 

分层就涉及每层之间的通讯，肯定会有一定的性能损耗。但是合理的分层能让职责清晰、也方便协作，会大大提高开发效率。分层带来的损失，一定能在其他方面的收益弥补回来。另外，一旦决定分层，我们可以通过优化通讯方式、通讯协议，尽可能把损耗降到最低。(引用网上的)

回来看服务端渲染问题，服务端渲染比较消耗服务器cpu，但有缓存，同样可以做的很快,再node底层本身就有V8引擎，V8引擎对JavaScript解析速度是最快的！！node和server通讯毕竟是在内网所有延迟方面应该没多大问题。  

```
总体来说利还是大于弊。每种方式都需要实践和探索！
```

淘宝已经采用node做中间层，可以去网上搜索学习。基于node的全栈式开发模式以后估计也是种趋势。  
前端长路漫漫~~，继续总结，继续积累。欢迎lssues讨论！