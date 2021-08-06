### magix套件

本套件是 mm-cli 下的 magix 体系套件，请先安装 mm-cli (详见[mm-cli](https://thx.github.io/rmx-cli-book))

### 安装
安装 mm-cli 完毕后，执行 `mm install` 选择 `套件 > magix` 即可进行安装 (也可以直接进入项目根目录执行套件命令，会提示先安装套件)

------------

### 套件架构总览
[![magix-cli](https://img.alicdn.com/imgextra/i4/O1CN01fhZZfQ1D0ZguNsgAy_!!6000000000154-55-tps-1339-523.svg)](https://img.alicdn.com/imgextra/i4/O1CN01fhZZfQ1D0ZguNsgAy_!!6000000000154-55-tps-1339-523.svg)

----------

### 初始化套件脚手架

    mm init magix

##### 详细步骤：
1. 输入域账号/密码登录gitlab(只在首次使用时登录)
2. 选择脚手架类型
3. 选择你的项目要创建在哪个groups下(gitlab)
4. 输入项目名称 (会以该名称在gitlab平台上创建仓库，并在当前目录下创建以项目名称为名的文件夹)

![mm init](https://img.alicdn.com/tfs/TB111gpl7T2gK0jSZFkXXcIQFXa-1424-742.gif)

现在 `mm init` 已经接入以下各平台：
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


