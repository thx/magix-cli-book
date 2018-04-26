# magix-cli 


本工具旨在基于脚手架快速创建magix项目，包括项目初始化，项目本地服务器运行（模拟接口基于[RAP](https://rap2.alibaba-inc.com)），项目发布等
> 基本上您只需在gitlab及rap上创建项目，然后在控制台执行mx init，然后mx dev即可投入开发

------------

### 工具架构总览：
[![magix-cli](https://img.alicdn.com/tfs/TB1FD2mlwvD8KJjy0FlXXagBFXa-1127-510.png)](https://img.alicdn.com/tfs/TB1FD2mlwvD8KJjy0FlXXagBFXa-1127-510.png)

----------

### 使用方法：

#### 全局安装cli工具：

    tnpm install -g @ali/magix-cli


> 本工具依赖tnpm，请先安装tnpm： http://npm.alibaba-inc.com/profile

> node版本最好是大于6.x，如果是升级上来的运行失败，尝试执行以下命令：

> `$ curl -0 -L http://npmjs.org/install.sh | sudo sh`


#### 在使用工具前请先做好几个准备工作：

  * 到gitlab上创建项目相应的仓库 ([Gitlab](http://gitlab.alibaba-inc.com))
  * 到rap上创建相应项目(非必要) ([RAP](http://rap.alibaba-inc.com))
  * 到黄金令箭上创建项目(非必要) ([黄金令箭](http://log.alibaba-inc.com/gold/part/index.htm))

#### 然后在你的工作目录执行：

    mx init

  * 选择脚手架类型
  * 输入你在gitlab创建好的项目的仓库地址 (会在当前目录下创建以你仓库名称为名的文件夹)
  * 输入你在RAP上创建好的项目的projectId [非必填]
  * 输入你在黄金令箭上创建好的场景ID [非必填]

> init流程：系统会自动从相应类型的脚手架仓库`clone`代码到你的本地，并且设置`git remote`为你在gitlab上创建的项目，然后`tnpm install`所有的依赖包，同时执行`mx gallery`同步magix组件到本地，以及执行`mx models`同步rap上的接口到本地项目中

  ![mx init](https://img.alicdn.com/tfs/TB12mDrlwvD8KJjy0FlXXagBFXa-704-638.gif)


#### 目前支持的脚手架类型：
  1. [BP后台管理脚手架](http://gitlab.alibaba-inc.com/thx/scaffold)
  2. [Minisite脚手架](http://gitlab.alibaba-inc.com/mm/minisite-scaffold)
  3. [cell-webpack-scaffold](http://gitlab.alibaba-inc.com/cell/cell-webpack-scaffold)
  4. [cell-lib-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lib-scaffold)
  5. [cell-components-scaffold](http://gitlab.alibaba-inc.com/cell/cell-components-scaffold)
  6. [cell-lego-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lego-scaffold)


## 所有命令列表 mx -h

#### # `mx init`

初始化项目

#### # `mx dev`

运行mat本地服务器，会自动打开浏览器，访问默认端口为1234的localhost

  *   mx dev 默认开启接口rap化模拟 (需要在package.json里配好rap的projectId)
  *   mx dev -d 10.22.34.55 可以切换接口访问真实daily接口，指定daily的ip地址
  *   mx dev -p 7777 可以指定端口，如果指定80端口需sudo权限
  
  > mx dev 已加入magix-desiger工具，详见 [magix-desiger](http://gitlab.alibaba-inc.com/thx/magix-desiger)


#### # `mx models`

根据当前项目RAP的projectId，自动生成models.js接口集合文件，对于接口的一些特殊处理，可以在src/app/service/project.js文件中处理 (默认在mx init初始化项目时就会自动执行该命令)

  > 建议实行rap接口与项目的强关联，不再在项目中维护models.js，新增接口都写在rap上，然后执行mx models同步到本地，以保持项目接口的统一与可维护性


#### # `mx generate`

在当前目录下生成预设的view文件，包含view.html, view.js，支持输入目录结构(exp: src/app/views/test)

  1. 选择你要的view模板，默认支持blank, table, form三种（如果你有项目特定的模板，可以在本地维护模板，然后配置在package.json的codeTmpl中）
  2. 输入你要生成的view的path，相对于当前目录
  3. 输入你RAP上相关接口的id，则可根据rap上接口信息生成初步可用页面（非必填，不填则生成固定静态模板页）

#### # `mx gallery`

magix3 组件相关命令，同步组件到本地项目中，支持配置多组件仓库，配置项在package.json的magixCliConfig.galleries里 (key: 组件仓库名(支持@指定版本)，value: 组件同步到本地项目的路径)

  1. mx gallery 根据package.json里的magixCliConfig.galleries配置安装组件包并同步到本地项目中，如果本地组件有修改过，给出提示
  3. mx gallery -n <组件名> 指定同步某个组件，如果组件被修改过，则给出提示
  4. mx gallery -l 列出本地所有组件的版本信息

#### # `mx chartpark`

在[chartpark](https://chartpark.alibaba-inc.com)平台操作并打包完后，执行 `mx chartpark` 将 chartpark 平台打包生成的完整图表文件及配置同步到本地项目中，免去了项目中时时修改版本号的麻烦


#### # `mx daily`

daily分支发布 [powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]

> 新建的项目还未在aone上创建应用，会导致发布后无法正常获取发布状态，请先上aone注册该项目的应用


#### # `mx publish`

发布到cdn生产环境，请在master分支下执行 [powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]


#### # `mx spmlog`

黄金令箭埋点 [powerd by [gulp-magix-spmlog](https://www.npmjs.com/package/gulp-magix-spmlog)]

#### # `mmr <task>`

运行本地gulp任务，可配置 `-t grunt/webpack` 等运行其他构建工具


----------

## 所有配置 magixCliConfig 
所有配置在package.json的magixCliConfig中

    "magixCliConfig": {

      //项目开发相关
      "matPort": "8888", //本地起的开发服务器的端口
      "matProxyPass": "140.205.173.181", //反向代理的ip, mx dev -d时默认用到的ip
      "ipConfigPath": "./ip.config", //mx dev -d 时如果有本地的ip.config文件，则从本地获取开发环境ip
      "devCommand": "mat rap", // mx dev时启动的mat命令
      "proxyCommand": "mat proxy", //mx dev -d 时启动的mat命令

      //RAP相关配置
      "rapVersion": "2", //指定使用rap1/rap2
      "rapProjectId": "878", //项目rap的projectId
      "disableRap": true, //禁掉命令里rap相关的功能
      "modelsPath": "src/app/services/models.js", //mx models生成的本地models.js的文件路径
      "modelsTmpl": "./magix-cli-models-tmpl/models.js", //mx models生成的models.js的文件模板

      //发布相关
      "buildCommand": "gulp build", //指定mx daily/publish要执行的项目构建任务名，默认gulp build
      "publishDaily": false, //默认mx publish只能在master下执行，配置为true可直接将当前daily分支发布掉,

      //埋点数据相关配置
      "logkey": "m5", //黄金令箭的logkey
      "spma": "a2e17", //spm的a段
      "dataPlusConfigPath": "src/app/dataplus/config.js", //数据小站需要的相关的配置信息文件，自动生成地址
      "dataPlusConfigTmpl": "./magix-cli-models-tmpl/config.js", //数据小站需要的相关的配置信息文件的模板文件
      "spmCommand": "gulp spmlog", //mx spmlog内部执行的spm打点命令，定义在gulpfile.js里

      //chartPark相关配置
      "chartParkId": "1234",
      "chartParkIndexPath": "src/app/chartpark/index.js", //生成本地chartPark完整主文件(包含图表配置)的路径
      "chartParkIndexTmpl": "./magix-cli-models-tmpl/chartParkIndexTmpl.js", //生成本地chartPark完整主文件的模板文件

      //magix相关配置
      "magixPath": "src/lib/magix.js" //mm magix同步magix库文件到项目中的路径

      //mx generate相关配置
      "codeTmpl": "./magix-cli-tmpl", //mx generate 生成view代码片段的本地模板

      //mx gallery相关配置
      "galleries": { //key: 组件名，value: 组件同步到项目中的路径
        "magix-gallery@1.3.10": "src/app/gallery", //magix官方组件库，可以@指定组件库版本
        "other-gallery": "src/app/other-gallery" //可配置其他自维护的组件库
      },

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

