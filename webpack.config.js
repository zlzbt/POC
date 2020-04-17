// webpack4的配置
module.exports = {
  // webpack4需要添加这个配置，development为开发环境，production为生产环境
  mode: "development",
  entry:  __dirname + "/app/App.js", // 之前提到的唯一入口文件
  output: {
      path: __dirname + "/common", // 打包后的文件存放的地方
      filename: "index.js" // 打包后输出文件的文件名
  }
}
 
// var webpack = require('webpack');
// module.exports = {
 
//     //配置入口文件，入口文件可以以对象的形式配置，也可以以数组的形式配置,后缀名可以省略
//     /*
//      * 对象形式配置入口
//      * */
//     //entry:{
//     //    index:'./index'       //'./index.js'
//     //},
//     /*
//      * 数组形式配置入口
//      * */
//     entry: [
//         './index'       //'index.js'
//     ],
//     //输出文件出口
//     output: {
//         /*
//          输出路径，在这我们要手动创建一个文件夹，名字可以自己命名，
//          输出的文件路径是相对于本文件的路径
//          * */
//         path: './dist',  //输出路径
//         filename: '[name].bundle.js'     //输出文件名，文件可以自己定义，[name]的意思是与入口文件的文件对应，可以不用[name]，
//     },
//     /*
//      * 标题：加载器（loaders）
//      * 作用：需要下载不同别的加载器，如css，js，png等等
//      * */
//     loaders: [
//         {test: /\.js?$/, loaders: ['babel-loader']} //babel加载器可以把jsx的语法转换为js的语法，也可以把es6的语法标准转换es5的语法标准
//         /*
//          * 你可以在这配置别的加载器，写法是一样的
//          * */
 
//     ],
//     /*
//      *
//      * */
//     resolve: {
//         /*
//          * 别名配置，配置之后，可以在别的js文件中直接使用require('d3')，将导入的文件作为一个模块导入到你需要的项目中，不用配置别也可会当作模块导入项目中，只是你要重复写路径而已。
//          * */
//         alias: {
//             'd3': 'd3/d3.min.js'
//         }
//     }　　
// }