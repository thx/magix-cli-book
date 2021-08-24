

#### Magix 套件配置说明
项目根目录下 package.json 的 `magixCliConfig` 对象为 Magix 套件的配置，以下是全量配置说明:
```javascript
"magixCliConfig": {
  //项目开发相关
  "matPort": "8888", //本地起的开发服务器的端口
  "ipConfig": { //mm dev -d 时提供可选的反向代理ip列表，|符号之后的为ip对应的域名配置，有域名配置的话系统会自动配置host，并清除hsts及dns缓存。
    "预发": "140.205.215.168|https://pre-dmp.taobao.com",
    "线上": "106.11.211.220|https://dmp.taobao.com", 
    "日常": "11.163.168.1|http://daily-dmp.taobao.net"
  }, 
  "timeout": 10000, //设置本地服务的请求响应时间，单位ms
  "autoOpenUrl": "http://localhost", //设置 mm dev后自动打开的页面地址，如果ipConfig里配置了域名，则以ipConfig里为准
  "apiMatch": [ //设置对接RAP或反向代理的接口的规则
      "api/",
      ".json",
      ".action"
  ],
  "indexMatch": ["index.html"], //设置入口文件,支持多个入口文件
  "scopedCss": [ //设置magix-combine指定scoped样式
      "./src/app/assets/iconfont.less"
  ],
  "globalCss": [ //设置magix-combine指定global全局样式
      "./src/app/gallery/mx-style/index.less"
  ],
  "magixLoaderType": "cmd", //magix-combine编译文件时的模块类型
  "magixJsTranspile": "ES2018", //magix-combine编译js文件到目标语言格式，"ES3", "ES5", "ES6"/"ES2015", "ES2016", "ES2017", "ES2018" (default) or "ESNext".
  "rootAppName": "app", //请填写app唯一标识，防止上线的时候样式名压缩与全局样式冲突
  "HMRWatchFiles": [
      "src/**/*.js",
      "src/**/*.ts",
      "src/**/*.es",
      "src/**/*.mx",
      "src/**/*.css",
      "src/**/*.html",
      "src/**/*.scss",
      "src/**/*.less"
  ], //HMR热更新所监听的文件
  "devCommand": "mat rap", // 自定义mm dev时启动的本地RAP服务，一般不需要配置，cli工具内置了
  "proxyCommand": "mat proxy", //自定义mm dev时启动的反向代理接口服务，一般不需要配置，cli工具内置了
  "dynamicProjectName": true, //指定加载的包名是否是动态的，在跨项目加载view时需要设置为true
  "jsExtension": ".es", //指定mm add生成的js文件为.es格式，默认为.js
  "dataLimit": "1mb", //post请求时参数大小的上限，格式为：'100kb', '1mb'等等，默认'10mb',
  "magixCombineConfig": {}, //支持传入整个magix-combine的配置项，配置详见 https://github.com/thx/magix-combine/issues/17
  "isPushState": false, //标识是否启动pushState模式
  "closeHmr": false, // 是否关闭hmr热更新，默认为false
  "closeDocs": false, // 是否关闭开发帮助文档，默认为false
  "closeDesiger": false, // 是否关闭magix-desiger插件，默认为false
  "closeInspector": false, // 是否关闭magix-inspector插件，默认为false
  "snowpackModulesDest": "src/dmp-new/web_modeuls", // dependencies 依赖的 npm 包在mm sync时同步到项目中的目录地址（默认值：src/[yourProjectName]/web_modules）

  //RAP相关配置
  "rapVersion": "2", //指定使用rap1/rap2
  "rapProjectId": "878", //项目rap的projectId，mm init会自动创建，无需填写
  "disableRap": true, //禁掉命令里rap相关的功能
  "modelsPath": "src/app/services/models.js", //mm models生成的本地models.js的文件路径
  "modelsTmpl": "./magix-cli-models-tmpl/models.js", //mm models生成的models.js的文件模板
  "supportApiPathParams": true, //为true的话完整保留:id类型的接口地址，service中通过pathMap对:id做替换

  //发布相关
  "srcFolder": "src", //项目源文件目录
  "buildFolder": "build", //项目编译打包目标目录
  "buildCommand": "gulp build", //自定义mm daily/publish要执行的项目构建任务名，一般不需要配置，cli工具内置了构建任务
  "cloudBuild": true, //是否云构建，为true时需要移除buildCommand配置
  "internationalCdn": true, //是否同时发布到国际版cdn环境，域名前缀为https://b.alicdn.com/g/
  "codeReviewers": [ //mm publish时可选择的代码审阅人员列表
    "71147|浩添",
    "252254|奇贤"
  ],
  "preloadModuleList": true, // 是否开启发布时自动生成预加载模块清单
  "esBuildTarget": ["es2018"], // esbuild 的 target 配置

  //埋点数据相关配置
  "logkey": "m5", //黄金令箭的logkey，固定的值
  "spma": "a2e17", //spm的a段，mm init会自动创建，无需填写
  "dataPlusConfigPath": "src/app/dataplus/config.js", //数据小站需要的相关的配置信息文件，自动生成地址
  "dataPlusConfigTmpl": "./magix-cli-models-tmpl/config.js", //数据小站需要的相关的配置信息文件的模板文件
  "spmFolder": "src/app/views", //mm spmlog打点指定的文件夹，通常是view页面
  "spmCommand": "gulp spmlog", //自定义mm spmlog打点执行的本地命令，一般不需要配置，cli工具内置了打点命令
  "spmPropertyMatch": ["to=\"", ":to=\""], //支持mm spmlog自定义属性匹配规则
  "noSpmlog": false, //配置mm daily时是否自动执行埋点spmlog任务

  //chartPark相关配置
  "chartParkId": "1234", //mm init会自动创建，无需填写
  "chartParkIndexPath": "src/app/chartpark/index.js", //生成本地chartPark完整主文件(包含图表配置)的路径
  "chartParkIndexTmpl": "./magix-cli-models-tmpl/chartParkIndexTmpl.js", //生成本地chartPark完整主文件的模板文件

  //mm add相关配置
  "codeTmpl": "./magix-cli-tmpl", //mm add 生成view代码片段的本地模板

  //mm gallery相关配置
  "galleries": [{
    "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
    "path": "src/app/gallery" //组件同步到项目中的路径
  }],
  "galleriesMxRoot": "app/gallery", //本地通用组件的路径
  "galleriesLgRoot": "app/gallery-locl", //本地组件的路径

  //周边相关项目id
  "defId": "2233", //DEF云构建的项目id, mm init会自动创建，无需填写
  "iconfontId": "48", //iconfont的项目id, mm init会自动创建，无需填写
  "iconfontScanPath": "src", //mm iconfont --check时扫描的路径
  "iconfontPath": "src/zs_scaffold/assets/iconfont.less", //指定mm iconfont同步字体文件到项目中的路径

  //magix-desiger配置
  "magixDesigerTemplate": "@ali/magix-desiger-bptemplate", //magix-desiger工具所依赖的模板

  //启用rapper，会在mm models时执行rapper脚本
  "rapper": true,

  //允许mm init结束后执行自定义的命令，进行一些额外的操作
  "initCompleted": "gulp dosomething",

  //允许mm daily/publish 结束后执行自定义的命令，进行一些额外的操作
  "dailyCompleted": "gulp dosomething",
  "publishCompleted": "gulp dosomething",

  "koaCorsConfig": {} // koa-cors跨域配置，详见：https://github.com/koajs/cors
}
```
