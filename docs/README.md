## magix-cli


本命令行工具旨在基于脚手架快速创建magix项目，包括项目环境初始化，项目本地服务器运行（接口模拟基于[RAP](https://rap2.alibaba-inc.com)），项目一键部署到aone等
> 基本上您只需在终端执行`mx init`初始化项目，随后 `mx dev`即可投入开发

------------

#### 工具架构总览：
[![magix-cli](https://img.alicdn.com/tfs/TB1VxWkrMmTBuNjy1XbXXaMrVXa-2202-1086.png)](https://img.alicdn.com/tfs/TB1VxWkrMmTBuNjy1XbXXaMrVXa-2202-1086.png)

----------

#### 使用方法：

##### 全局安装cli工具：

    tnpm install -g @ali/magix-cli


> 本工具依赖tnpm，请先安装tnpm： http://npm.alibaba-inc.com/profile


##### 然后在你的工作目录执行：

    mx init

详细步骤：

  * 输入域账号/密码登录gitlab
  * 选择脚手架类型
  * 选择你的项目要创建在哪个groups下(gitlab)
  * 输入项目名称 (会以该名称在gitlab平台上创建仓库，并在当前目录下创建以项目名称为名的文件夹)
  * 输入你在RAP上创建好的项目的projectId [非必填，需要你先在[RAP](http://rap2.alibaba-inc.com)上面创建好项目]
  * 输入你在黄金令箭上创建好的场景ID [非必填，需要你先在[黄金令箭](http://log.alibaba-inc.com/gold/part/index.htm)上创建好项目]

> init流程：系统到gitlab平台上创建好项目，然后自动从相应类型的脚手架仓库`clone`代码到你的本地，并且设置`git remote`为gitlab的仓库地址，然后`tnpm install`所有的依赖包，同时执行`mx gallery`同步magix组件到本地，以及执行`mx models`同步RAP上的接口到本地项目中

  ![mx init](https://img.alicdn.com/tfs/TB1SuCprDtYBeNjy1XdXXXXyVXa-1436-1226.gif)


##### 目前支持的脚手架类型：
  1. [后台管理脚手架](http://gitlab.alibaba-inc.com/mm/zs_scaffold)
  2. [Minisite脚手架](http://gitlab.alibaba-inc.com/mm/minisite-scaffold)
  2. [联盟后台脚手架](http://gitlab.alibaba-inc.com/mm/union_scaffold)
  3. [cell-webpack-scaffold](http://gitlab.alibaba-inc.com/cell/cell-webpack-scaffold)
  4. [cell-lib-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lib-scaffold)
  5. [cell-components-scaffold](http://gitlab.alibaba-inc.com/cell/cell-components-scaffold)
  6. [cell-lego-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lego-scaffold)

-------

#### 所有命令列表 mx -h

##### # `mx init`

初始化项目

##### # `mx dev`

运行mat本地服务器，会自动打开浏览器，访问默认端口为1234的localhost

  * mx dev 默认开启接口调用RAP平台返回模拟数据 (需要在package.json里配好RAP的项目id, `magixCliConfig.rapProjectId`)
  
  * mx dev -d 10.22.34.55 可以切换接口访问真实开发接口 (格式：-d [ip]，ip可以是daily或预发)

  > 如果magixCliConfig里配置好了ipConfig参数，则mx dev -d不用输入ip，会列出所有ipConfig配置下拉选择即可

  * mx dev -p 7777 可以指定端口，如果指定80端口需sudo权限

  * 本地开发时会进行当前开发环境的标识注入，方便一些情况下的环境判断（如对jsonp接口的特殊处理）：
    - mm dev 全局注入标识 `window.__isRap__ = true`
    - mm dev -d [ip] 全局注入标识 `window.__isDaily__ = true`
    - mm dev -o [ip]全局注入标识 `window.__isOnline__ = true`

  * mx dev --closeHmr 支持关闭热更新功能

  * mx dev 已加入magix-desiger工具，详见 [magix-desiger](http://gitlab.alibaba-inc.com/thx/magix-desiger)

  * mx dev 支持直接调试线上https真实接口环境，详见[调试线上https接口](/devOnline)


##### # `mx models`

根据当前项目RAP的项目id，自动生成models.js接口集合文件，对于接口的一些特殊处理，可以在src/app/service/project.js文件中处理 (默认在mx init初始化项目时就会自动执行本命令)

  > 建议实行RAP接口与项目的强关联，不再在项目中维护models.js，新增接口都写在RAP上，然后执行mx models同步到本地，以保持项目接口的统一与可维护性


##### # `mx generate`

在当前目录下生成预设的view文件，包含view.html, view.js，支持输入目录结构(exp: src/app/views/test)

  1. 选择你要的view模板，默认支持blank, table, form三种（如果你有项目特定的模板，可以在本地维护模板，然后配置在package.json的`magixCliConfig.codeTmpl`中）
  2. 输入你要生成的view的名称（可包含相对路径）
  3. 输入你RAP上相关接口的id，则可根据RAP上接口信息生成初步可用页面（非必填，不填则生成固定静态模板页）

##### # `mx gallery`

magix3 组件相关命令，同步组件到本地项目中，支持配置多组件仓库，配置项在`package.json`的`magixCliConfig.galleries`里，配置格式如下：

    [{
      "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
      "path": "src/app/gallery", //组件同步到项目中的路径
      "ignoreFiles": "mx-style/_vars_override.less" //可配置忽略修改校验提示的文件，通常是用于在项目中覆盖组件样式的文件
    }]

  * mx gallery 同步组件仓库里的所有组件到项目中，如果本地组件有修改过，则给出提示
  * mx gallery -n <组件名> 指定同步某个组件，如果组件被修改过，则给出提示
  * mx gallery -l 列出本地所有组件的相关信息

##### # `mx daily`

一键发布当前daily分支（包含项目build，代码git pull/merge等，daily分支可复用），并可实时查看发布结果 [powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]

> 现已接入云构建，详细配置见 [云构建](/cloudBuild)


##### # `mx publish`

一键发布到cdn正式环境，请在master分支下执行（所以这代表你已经先将开发daily分支合并到你的master了）[powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]

##### # `mx chartpark`

与[chartpark](https://chartpark.alibaba-inc.com)平台联动的专属命令，需要你在chartpark平台创建好项目后，配置项目id到`magixCliConfig.chartParkId`里，然后平台操作添加图表等并打包完后(请选择CDN打包)，执行 `mx chartpark` 将 chartpark 平台打包生成的完整图表文件及配置同步到本地项目中，免去了在项目中频繁调试图表效果的繁琐操作

##### # `mx magix`

一键升级项目的magix版本： package.json的dependencies配好magix版本后，执行`mx magix`即可安装包，并同步`magix`库文件到 `magixCliConfig.magixPath` 里指定的路径里，可以选择不同打包方式的文件(amd/cmd等)


##### # `mx spmlog`

黄金令箭埋点 [powerd by [gulp-magix-spmlog](https://www.npmjs.com/package/gulp-magix-spmlog)]，该命令会同时执行同步[数据小站](https://data.alimama.net/)的配置文件到项目中

##### # `mmr <task>`

运行本地gulp任务，可配置 `-t grunt/webpack` 等运行其他构建工具


----------

#### 所有配置说明 magixCliConfig 
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
      "cssSelectorPrefix": "_zs_scaffold", //设置magix-combine的scoped样式的前缀
      "scopedCss": [ //设置magix-combine指定scoped样式
          "./src/app/assets/layout.less"
      ],
      "globalCss": [ //设置magix-combine指定global全局样式
          "./src/app/assets/iconfont.less",
          "./src/app/gallery/mx-style/index.less",
          "./src/app/assets/lib.less"
      ],
      "devCommand": "mat rap", // 自定义mx dev时启动的本地RAP服务，一般不需要配置，cli工具内置了
      "proxyCommand": "mat proxy", //自定义mx dev时启动的反向代理接口服务，一般不需要配置，cli工具内置了

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


[semver](http://semver.org/)
