

#### 配置说明
所有配置在项目的package.json的magixCliConfig中

    "magixCliConfig": {

      //项目开发相关
      "matPort": "8888", //本地起的开发服务器的端口
      "matProxyPass": "140.205.173.181", //反向代理的ip, mx dev -d时默认用到的ip
      "ipConfig": { //mx dev -d 时提供可选的反向代理ip列表，有该值则覆盖matProxyPass配置
        "预发一套": "140.205.173.181",
        "预发二套": "140.205.173.180", 
        "日常": "11.163.168.1"
      }, 
      "protocolAlias": "http", //可以指定反向代理接口的协议，有些预发环境限制接口只能是https访问，可以通过命令行参数--https直接启用
      "galleriesMxRoot": "app/gallery/", //组件的目录
      "timeout": 10000, //设置本地服务的请求响应时间，单位ms
      "autoOpenUrl": "http://localhost", //设置 mm dev后自动打开的页面地址
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
      "devCommand": "mat rap", // 自定义mx dev时启动的本地RAP服务，一般不需要配置，cli工具内置了
      "proxyCommand": "mat proxy", //自定义mx dev时启动的反向代理接口服务，一般不需要配置，cli工具内置了
      "dynamicProjectName": true, //指定加载的包名是否是动态的，在跨项目加载view时需要设置为true
      "jsExtension": ".es", //指定mx generate生成的js文件为.es格式，默认为.js
      "dataLimit": "1mb", //post请求时参数大小的上限，格式为：'100kb', '1mb'等等，默认'10mb'

      //RAP相关配置
      "rapVersion": "2", //指定使用rap1/rap2
      "rapProjectId": "878", //项目rap的projectId，mm init会自动创建，无需填写
      "disableRap": true, //禁掉命令里rap相关的功能
      "modelsPath": "src/app/services/models.js", //mx models生成的本地models.js的文件路径
      "modelsTmpl": "./magix-cli-models-tmpl/models.js", //mx models生成的models.js的文件模板

      //发布相关
      "srcFolder": "src", //项目源文件目录
      "buildFolder": "build", //项目编译打包目标目录
      "buildCommand": "gulp build", //自定义mx daily/publish要执行的项目构建任务名，一般不需要配置，cli工具内置了构建任务
      "cloudBuild": true, //是否云构建，为true时需要移除buildCommand配置
      "internationalCdn": true, //是否同时发布到国际版cdn环境，域名前缀为https://b.alicdn.com/g/

      //埋点数据相关配置
      "logkey": "m5", //黄金令箭的logkey，固定的值
      "spma": "a2e17", //spm的a段，mm init会自动创建，无需填写
      "dataPlusConfigPath": "src/app/dataplus/config.js", //数据小站需要的相关的配置信息文件，自动生成地址
      "dataPlusConfigTmpl": "./magix-cli-models-tmpl/config.js", //数据小站需要的相关的配置信息文件的模板文件
      "spmFolder": "src/app/views", //mx spmlog打点指定的文件夹，通常是view页面
      "spmCommand": "gulp spmlog", //自定义mx spmlog打点执行的本地命令，一般不需要配置，cli工具内置了打点命令
      "spmPropertyMatch": ["to=\"", ":to=\""], //支持mm spmlog自定义属性匹配规则

      //chartPark相关配置
      "chartParkId": "1234", //mm init会自动创建，无需填写
      "chartParkIndexPath": "src/app/chartpark/index.js", //生成本地chartPark完整主文件(包含图表配置)的路径
      "chartParkIndexTmpl": "./magix-cli-models-tmpl/chartParkIndexTmpl.js", //生成本地chartPark完整主文件的模板文件

      //magix相关配置
      "magixPath": "src/lib/magix.js", //mm magix同步magix库文件到项目中的路径
      "magixModuleType": "cmd", //要同步的magix的打包版本，默认为cmd，可选择项：amd,cmd,kissy,module,webpack

      //mx generate相关配置
      "codeTmpl": "./magix-cli-tmpl", //mx generate 生成view代码片段的本地模板

      //mx gallery相关配置
      "galleries": [{
        "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
        "path": "src/app/gallery", //组件同步到项目中的路径
        "ignoreFiles": "mx-style/_vars_override.less" //可配置忽略修改校验提示的文件，通常是用于在项目中覆盖组件样式的文件
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

      //允许mm createDaily结束后执行自定义的命令，进行一些额外的操作
      "createDailyHook": "gulp dosomething",
      
      //项目的额外gulp任务脚本说明列表，可通过mmr [脚本]运行
      "scriptsInfo": { 
        "dev": "这里是被改掉的dev的说明信息",
        "contribute": "添加贡献者信息",
        "build": "代码压缩",
        "models": false //值为false则隐藏掉该系统命令
      }
    }


