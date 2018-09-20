


### mx init 

初始化项目

### mx dev

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


### mx models

根据当前项目RAP的项目id，自动生成models.js接口集合文件，对于接口的一些特殊处理，可以在src/app/service/project.js文件中处理 (默认在mx init初始化项目时就会自动执行本命令)

  > 建议实行RAP接口与项目的强关联，不再在项目中维护models.js，新增接口都写在RAP上，然后执行mx models同步到本地，以保持项目接口的统一与可维护性


### mx generate

在当前目录下生成预设的view文件，包含view.html, view.js，支持输入目录结构(exp: src/app/views/test)

  1. 选择你要的view模板，默认支持blank, table, form三种（如果你有项目特定的模板，可以在本地维护模板，然后配置在package.json的`magixCliConfig.codeTmpl`中）
  2. 输入你要生成的view的名称（可包含相对路径）
  3. 输入你RAP上相关接口的id，则可根据RAP上接口信息生成初步可用页面（非必填，不填则生成固定静态模板页）

### mx gallery

magix3 组件相关命令，同步组件到本地项目中，支持配置多组件仓库，配置项在`package.json`的`magixCliConfig.galleries`里，配置格式如下：

    [{
      "name": "magix-gallery@1.3.10", //组件库名称，可以@指定组件库版本
      "path": "src/app/gallery", //组件同步到项目中的路径
      "ignoreFiles": "mx-style/_vars_override.less" //可配置忽略修改校验提示的文件，通常是用于在项目中覆盖组件样式的文件
    }]

  * mx gallery 同步组件仓库里的所有组件到项目中，如果本地组件有修改过，则给出提示
  * mx gallery -n <组件名> 指定同步某个组件，如果组件被修改过，则给出提示
  * mx gallery -l 列出本地所有组件的相关信息

### mx daily

一键发布当前daily分支（包含项目build，代码git pull/merge等，daily分支可复用），并可实时查看发布结果 [powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]

> 现已接入云构建，详细配置见 [云构建](/cloudBuild)


### mx publish

一键发布到cdn正式环境，请在master分支下执行（所以这代表你已经先将开发daily分支合并到你的master了）[powerd by [alimama-deploy](http://gitlab.alibaba-inc.com/thx/alimama-deploy)]

### mx chartpark

与[chartpark](https://chartpark.alibaba-inc.com)平台联动的专属命令，需要你在chartpark平台创建好项目后，配置项目id到`magixCliConfig.chartParkId`里，然后平台操作添加图表等并打包完后(请选择CDN打包)，执行 `mx chartpark` 将 chartpark 平台打包生成的完整图表文件及配置同步到本地项目中，免去了在项目中频繁调试图表效果的繁琐操作

### mx check

调用magix-combine检测项目代码是否正确

### mx magix

一键升级项目的magix版本： package.json的dependencies配好magix版本后，执行`mx magix`即可安装包，并同步`magix`库文件到 `magixCliConfig.magixPath` 里指定的路径里，可以选择不同打包方式的文件(amd/cmd等)


### mx spmlog

黄金令箭埋点 [powerd by [gulp-magix-spmlog](https://www.npmjs.com/package/gulp-magix-spmlog)]，该命令会同时执行同步[数据小站](https://data.alimama.net/)的配置文件到项目中

### mmr < task >

运行本地gulp任务，可配置 `-t grunt/webpack` 等运行其他构建工具


