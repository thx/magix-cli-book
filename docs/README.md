### magix-cli


本命令行工具旨在基于脚手架快速创建magix项目，包括项目环境初始化，项目本地服务器运行（接口模拟基于[RAP](https://rap2.alibaba-inc.com)），项目一键云构建发布(基于[DEF](https://def.alibaba-inc.com))
> 基本上您只需在终端执行`mx init`初始化项目，随后 `mx dev`即可投入开发

------------

### 工具架构总览
[![magix-cli](https://img.alicdn.com/tfs/TB1os1SL9zqK1RjSZFHXXb3CpXa-2676-1104.jpg)](https://img.alicdn.com/tfs/TB1os1SL9zqK1RjSZFHXXb3CpXa-2676-1104.jpg)

----------

### 使用方法

#### 全局安装cli工具：

    tnpm install -g @ali/magix-cli


> 本工具依赖tnpm，请先安装tnpm： http://npm.alibaba-inc.com/profile


#### 然后在你的工作目录执行：

    mx init

##### 详细步骤：
1. 输入域账号/密码登录gitlab(只在首次使用时登录)
2. 选择脚手架类型
3. 选择你的项目要创建在哪个groups下(gitlab)
4. 输入项目名称 (会以该名称在gitlab平台上创建仓库，并在当前目录下创建以项目名称为名的文件夹)

![mx init](https://img.alicdn.com/tfs/TB1SuCprDtYBeNjy1XdXXXXyVXa-1436-1226.gif)

现在 `mx init` 已经接入以下各平台：
* [gitlab](https://gitlab.alibaba-inc.com/)
* [RAP](https://rap2.alibaba-inc.com/)
* [DEF云构建平台](https://work.def.alibaba-inc.com/my)
* [iconfont](https://www.iconfont.cn/)
* [chartpark](https://chartpark.alibaba-inc.com/)
* [数据小站](https://data.alimama.net/)

会在初始化项目时同步在各平台自动创建好关联项目，并配置到项目中，无需手动操作

### 目前支持的脚手架类型
  1. [后台管理脚手架](http://gitlab.alibaba-inc.com/mm/zs_scaffold)
  2. [联盟后台脚手架](http://gitlab.alibaba-inc.com/mm/union_scaffold)
  3. [cell-webpack-scaffold](http://gitlab.alibaba-inc.com/cell/cell-webpack-scaffold)
  4. [cell-lib-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lib-scaffold)
  5. [cell-components-scaffold](http://gitlab.alibaba-inc.com/cell/cell-components-scaffold)
  6. [cell-lego-scaffold](http://gitlab.alibaba-inc.com/cell/cell-lego-scaffold)


[semver](http://semver.org/)
