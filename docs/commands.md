


### mm init magix

一键初始化基于 Magix 框架体系的项目

### mm dev

*本地开发命令*
  * `mm dev` 接口对接 RAP 平台模拟数据返回，会自动打开浏览器，依赖配置 *autoOpenUrl*，示例：
    ```js
    "autoOpenUrl": "https://localhost:1234/index.html" 
    ```
  * `mm dev -d` 接口对接真实环境，一般是在联调阶段，调用后端真实接口，本命令依赖 *ipConfig* 配置（配置格式：`"[ip]|[url]"`），示例：
    ```js
    "ipConfig": {
      "预发": "140.205.215.168|https://pre-zuanshi.taobao.com:443/index.html",
      "线上": "106.11.223.90|https://zuanshi.taobao.com:443/index.html"
    }
    ```
    
  !> 此处配置的完整 url 地址隐含多重配置信息，如下说明：
    * `https` 协议部分代表当前启动的本地开发服务是 https 或 http （首次启动 https 服务需要安装本地证书，请执行 `mm cert --install` 安装）
    * `pre-zuanshi.taobao.com` 域名部分会自动将 *127.0.0.1 [域名]* 写入系统 hosts，无须手动管理 hosts (该配置会在中止 mm dev 时自动从 系统 hosts 里移除)
    * `:443` 端口部分代表当前启动的本地服务器的端口号
    * `/index.html` 该部分代表入口 html 文件
  
  * 本地开发时会进行当前开发环境的标识注入，方便一些情况下的环境判断（如对 jsonp 接口的特殊处理）：
    * `mm dev` 全局注入标识 `window.__isRap__ = true`
    * `mm dev -d`  全局注入标识 `window.__isDaily__ = true`

*其他可选参数：*

  * `--https` 忽略配置，强制当前启动的服务为 https 服务
  * `-p, --port <port>` 忽略配置，指定当前服务的端口号
  * `--close-hmr` 关闭 HMR 热更新功能
  * `--close-docs` 关闭帮助文档提示功能
  * `--close-desiger` 关闭 magix-desiger 功能
  * `--close-inspector` 关闭 magix-inspector 功能
  * `--debug` 开启 debug 模式，会校验 rap 接口等


### mm add

在当前目录下生成预设的 view 相关文件，包含 `*.html` `*.ts` `*.less`，支持输入目录结构 *(exp: src/app/views/test)*

  1. 选择你要的 view 模板，默认支持 *blank, table, form* 三种（如果你有项目特定的模板，可以在本地维护模板，然后配置在package.json的`magixCliConfig.codeTmpl`中）
  2. 输入你要生成的 view 的名称（可包含相对路径）
  3. 输入你 RAP 上相关接口的 id，则可根据 RAP 上接口信息生成初步可用页面（非必填，不填则生成固定静态页面）


### mm models 

*短命令： `mm m`*

根据当前项目配置的 RAP 的 *rapProjectId* ，自动生成 `models.js` 接口集合文件，文件路径一般位于 `src/[yourProjectName]/services/models.js`

!> 需要注意的是，我们约定项目的接口文件 `model.js` 文件与 RAP 平台强绑定，所以务必确保 RAP 平台接口正确，如果 RAP 平台接口有修改或删除动作，本地执行 `mm models` 同步接口时会给出警示，请确认无误后再同步


### mm gallery
*短命令： `mm g`*

同步组件到本地项目中，支持配置多组件仓库，如果本地组件有修改过，则给出提示，配置格式如下：
  ```js
    "galleries": [{
      "name": "@ali/zs-gallery@1.3.10", //组件库名称，可以@指定组件库版本
      "path": "src/app/gallery" //组件同步到项目中的路径
    }]
  ```
  *可选参数：*

  * `-n, --gallery-name <组件名>` 指定同步某个组件，如果组件被修改过，则给出提示
  * `-l, --list` 列出本地所有组件的相关信息



### mm daily
*短命令： `mm d`*

一键发布当前开发分支到预发环境（包含项目构建 `build`，代码提交 `git pull/push/merge`，提交到 DEF 云构建）

*可选参数：*
 * `-m [comit message]` 提交代码时的 commit 信息
 * `--nospm` 不附带执行 `mm spmlog` 埋点命令

?> 日常开发分支可以重复 `mm daily` 发布，以方便测试验证修改代码结果


### mm publish
*短命令： `mm p`*

一键将当前开发分支发布到 cdn 正式生产环境 

*可选参数：*
 * `-m <comit message>` 提交代码时的 commit 信息
 * `--nospm` 不附带执行 `mm spmlog` 埋点命令
 * `-i, --international` 是否同时发布到国际版cdn
 * `-p, --prod` 是否只执行发布线上生产环境（默认是先发预发环境，再发线上）
 * `-a, --all-reviewer` 是否全选已配置的代码审阅人员
 * `-c, --code-reviewers <reviewers>` 直接指定代码审阅人员工号，多工号以逗号分隔

!> 注意：`mm publish` 发布完毕后，当前开发分支会被废弃删除


### mm build
本地云构建，请确保项目根目录有 `abc.json`（DEF云构建的配置），会在本地目录下生成 build 文件夹

?> 一般不需要单独执行该命令，`mm daily/publish` 发布命令内部已经包含了 build

### mm chartpark
*短命令： `mm cp`*

与 [chartpark](https://chartpark.alibaba-inc.com) 平台联动的专属命令，依赖项目配置 *chartParkId* (一般项目初始化时自动创建并配置了)，在 chartpark 平台操作添加图表并且 `打包并推送CDN` 后，执行 `mm chartpark` 将 chartpark 平台打包生成的完整图表文件及配置同步到本地项目中，然后就可以在项目中调用 chartpark 配置好的图表

### mm iconfont
*短命令： `mm if`*

与 [iconfont](https://www.iconfont.cn) 平台联动的专属命令，依赖项目配置 *iconfontId* (一般项目初始化时自动创建并配置了)，在 iconfont 平台上添加新的 icon 时，本地执行本命令即可同步最新的 iconfont 样式配置到项目中

*可选参数：*
* `--check` 仅检测 iconfont 平台有没有本地项目中没有引用到的失效 icon
 

### mm spmlog
*短命令： `mm sl`*

遍历所有文件进行黄金令箭埋点，该命令会同时执行同步 [数据小站](https://mamadata.alibaba-inc.com/) 的配置文件到项目中

*可选参数：*
* `-r, --remove-spm` 清空所有 spm 埋点

?> 一般不需要单独执行该命令，在 `mm daily/publish` 发布命令里内置执行了该命令

