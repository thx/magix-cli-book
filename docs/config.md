

#### 配置说明
项目根目录的package.json里提供了magixCliConfig来支持项目的自定义配置

>  `rmx init magix` 初始化后的项目默认不需要修改magixCliConfig配置，开箱即用

以下是`package.json`中的magixCliConfig的全量配置:

    "magixCliConfig": {

      //项目开发相关
      "matPort": "8888", //本地起的开发服务器的端口
      "ipConfig": { //rmx dev -d 时提供可选的反向代理ip列表，|符号之后的为ip对应的域名配置，有域名配置的话系统会自动配置host，并清除hsts及dns缓存。
        "预发": "140.205.215.168|https://pre-dmp.taobao.com",
        "线上": "106.11.211.220|https://dmp.taobao.com", 
        "日常": "11.163.168.1|http://daily-dmp.taobao.net"
      }, 
      "timeout": 10000, //设置本地服务的请求响应时间，单位ms
      "autoOpenUrl": "http://localhost", //设置 rmx dev后自动打开的页面地址，如果ipConfig里配置了域名，则以ipConfig里为准
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
      "magixJsTranspile": "", //magix-combine编译js文件到目标语言格式，"ES3" (default), "ES5", "ES6"/"ES2015", "ES2016", "ES2017" or "ESNext".
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
      "devCommand": "mat rap", // 自定义rmx dev时启动的本地RAP服务，一般不需要配置，cli工具内置了
      "proxyCommand": "mat proxy", //自定义rmx dev时启动的反向代理接口服务，一般不需要配置，cli工具内置了
      "dynamicProjectName": true, //指定加载的包名是否是动态的，在跨项目加载view时需要设置为true
      "jsExtension": ".es", //指定rmx add生成的js文件为.es格式，默认为.js
      "dataLimit": "1mb", //post请求时参数大小的上限，格式为：'100kb', '1mb'等等，默认'10mb',
      "magixCombineDebug": false, //本地开发时magix-combine编译默认为true。

      //RAP相关配置
      "rapVersion": "2", //指定使用rap1/rap2
      "rapProjectId": "878", //项目rap的projectId，rmx init会自动创建，无需填写
      "disableRap": true, //禁掉命令里rap相关的功能
      "modelsPath": "src/app/services/models.js", //rmx models生成的本地models.js的文件路径
      "modelsTmpl": "./magix-cli-models-tmpl/models.js", //rmx models生成的models.js的文件模板

      //发布相关
      "srcFolder": "src", //项目源文件目录
      "buildFolder": "build", //项目编译打包目标目录
      "buildCommand": "gulp build", //自定义rmx daily/publish要执行的项目构建任务名，一般不需要配置，cli工具内置了构建任务
      "cloudBuild": true, //是否云构建，为true时需要移除buildCommand配置
      "internationalCdn": true, //是否同时发布到国际版cdn环境，域名前缀为https://b.alicdn.com/g/

      //埋点数据相关配置
      "logkey": "m5", //黄金令箭的logkey，固定的值
      "spma": "a2e17", //spm的a段，rmx init会自动创建，无需填写
      "dataPlusConfigPath": "src/app/dataplus/config.js", //数据小站需要的相关的配置信息文件，自动生成地址
      "dataPlusConfigTmpl": "./magix-cli-models-tmpl/config.js", //数据小站需要的相关的配置信息文件的模板文件
      "spmFolder": "src/app/views", //rmx spmlog打点指定的文件夹，通常是view页面
      "spmCommand": "gulp spmlog", //自定义rmx spmlog打点执行的本地命令，一般不需要配置，cli工具内置了打点命令
      "spmPropertyMatch": ["to=\"", ":to=\""], //支持rmx spmlog自定义属性匹配规则

      //chartPark相关配置
      "chartParkId": "1234", //rmx init会自动创建，无需填写
      "chartParkIndexPath": "src/app/chartpark/index.js", //生成本地chartPark完整主文件(包含图表配置)的路径
      "chartParkIndexTmpl": "./magix-cli-models-tmpl/chartParkIndexTmpl.js", //生成本地chartPark完整主文件的模板文件

      //rmx add相关配置
      "codeTmpl": "./magix-cli-tmpl", //rmx add 生成view代码片段的本地模板

      //rmx gallery相关配置
      "galleries": [{
        "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
        "path": "src/app/gallery", //组件同步到项目中的路径
        "ignoreFiles": "mx-style/_vars_override.less" //可配置忽略修改校验提示的文件，通常是用于在项目中覆盖组件样式的文件
      }],
      "galleriesMxRoot": "app/gallery", //本地通用组件的路径
      "galleriesLgRoot": "app/gallery-locl", //本地组件的路径

      //周边相关项目id
      "defId": "2233", //DEF云构建的项目id, rmx init会自动创建，无需填写
      "iconfontId": "48", //iconfont的项目id, rmx init会自动创建，无需填写
      "iconfontScanPath": "src", //rmx iconfont --check时扫描的路径
      "iconfontPath": "src/zs_scaffold/assets/iconfont.less", //指定rmx iconfont同步字体文件到项目中的路径

      //magix-desiger配置
      "magixDesigerTemplate": "@ali/magix-desiger-bptemplate", //magix-desiger工具所依赖的模板

      //启用rapper，会在rmx models时执行rapper脚本
      "rapper": true,

      //允许rmx init结束后执行自定义的命令，进行一些额外的操作
      "initCompleted": "gulp dosomething"
    }


