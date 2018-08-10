

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
      "protocolAlias": "http", //可以指定反向代理接口的协议，有些预发环境限制接口只能是https访问
      "galleriesMxRoot": "app/gallery/", //组件的目录
      "timeout": 10000, //设置本地服务的请求响应时间，单位ms
      "autoOpenUrl": "http://localhost", //设置 mm dev后自动打开的页面地址
      "apiMatch": [ //设置对接RAP或反向代理的接口的规则
          "api/",
          ".json",
          ".action"
      ],
      "indexMatch": "index.html", //设置入口文件
      "scopedCss": [ //设置magix-combine指定scoped样式
          "./src/app/assets/iconfont.less"
      ],
      "globalCss": [ //设置magix-combine指定global全局样式
          "./src/app/gallery/mx-style/index.less"
      ],
      "devCommand": "mat rap", // 自定义mx dev时启动的本地RAP服务，一般不需要配置，cli工具内置了
      "proxyCommand": "mat proxy", //自定义mx dev时启动的反向代理接口服务，一般不需要配置，cli工具内置了
      "dynamicProjectName": true, //指定加载的包名是否是动态的，在跨项目加载view时需要设置为true

      //RAP相关配置
      "rapVersion": "2", //指定使用rap1/rap2
      "rapProjectId": "878", //项目rap的projectId
      "disableRap": true, //禁掉命令里rap相关的功能
      "modelsPath": "src/app/services/models.js", //mx models生成的本地models.js的文件路径
      "modelsTmpl": "./magix-cli-models-tmpl/models.js", //mx models生成的models.js的文件模板

      //发布相关
      "srcFolder": "src", //项目源文件目录
      "buildFolder": "build" //项目编译打包目标目录
      "buildCommand": "gulp build", //自定义mx daily/publish要执行的项目构建任务名，一般不需要配置，cli工具内置了构建任务
      "publishDaily": false, //默认mx publish只能在master下执行，配置为true可直接将当前daily分支发布掉,
      "cloudBuild": true //是否云构建，为true时需要移除buildCommand配置
      "internationalCdn": true //是否同时发布到国际版cdn环境，域名前缀为https://b.alicdn.com/g/

      //埋点数据相关配置
      "logkey": "m5", //黄金令箭的logkey
      "spma": "a2e17", //spm的a段
      "dataPlusConfigPath": "src/app/dataplus/config.js", //数据小站需要的相关的配置信息文件，自动生成地址
      "dataPlusConfigTmpl": "./magix-cli-models-tmpl/config.js", //数据小站需要的相关的配置信息文件的模板文件
      "spmFolder": "src/app/views" //mx spmlog打点指定的文件夹，通常是view页面
      "spmCommand": "gulp spmlog", //自定义mx spmlog打点执行的本地命令，一般不需要配置，cli工具内置了打点命令

      //chartPark相关配置
      "chartParkId": "1234",
      "chartParkIndexPath": "src/app/chartpark/index.js", //生成本地chartPark完整主文件(包含图表配置)的路径
      "chartParkIndexTmpl": "./magix-cli-models-tmpl/chartParkIndexTmpl.js", //生成本地chartPark完整主文件的模板文件

      //magix相关配置
      "magixPath": "src/lib/magix.js" //mm magix同步magix库文件到项目中的路径

      //mx generate相关配置
      "codeTmpl": "./magix-cli-tmpl", //mx generate 生成view代码片段的本地模板

      //mx gallery相关配置
      "galleries": [{
        "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
        "path": "src/app/gallery", //组件同步到项目中的路径
        "ignoreFiles": "mx-style/_vars_override.less" //可配置忽略修改校验提示的文件，通常是用于在项目中覆盖组件样式的文件
      }]

      //magix-desiger配置
      "magixDesigerTemplate": "@ali/magix-desiger-bptemplate", //magix-desiger工具所依赖的模板
      
      //项目的额外gulp任务脚本说明列表，可通过mmr [脚本]运行
      "scriptsInfo": { 
        "dev": "这里是被改掉的dev的说明信息",
        "contribute": "添加贡献者信息",
        "build": "代码压缩",
        "models": false //值为false则隐藏掉该系统命令
      }
    }

