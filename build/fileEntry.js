const fs = require('fs'),
      path = require('path');

function getName(name){
    return name.slice(6,name.indexOf('.js'))
}

module.exports = fs.readdirSync(path.resolve(__dirname,'../client'))
    .filter(filename =>
        /^index\.+[a-zA-Z]+\.(js|jsx)$/.test(filename)
    )
    .reduce((pre,cur)=>{
        const name=getName(cur);
        pre[name] = `${path.resolve(__dirname,'../client/'+cur)}`;
        return pre;
    },{})