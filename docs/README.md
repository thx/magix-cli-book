#### magix 套件

本套件是 mm-cli 下的 magix 体系套件，请先安装 mm-cli (详见[mm-cli](https://thx.github.io/rmx-cli-book))

#### 安装套件
安装 mm-cli 完毕后，执行 `mm install kit magix` 即可进行安装 (也可以直接进入项目根目录执行套件命令，会提示先安装套件)

------------

#### 套件架构总览
[![magix-cli](https://img.alicdn.com/imgextra/i4/O1CN01fhZZfQ1D0ZguNsgAy_!!6000000000154-55-tps-1339-523.svg)](https://img.alicdn.com/imgextra/i4/O1CN01fhZZfQ1D0ZguNsgAy_!!6000000000154-55-tps-1339-523.svg)

----------

#### 初始化套件脚手架

执行 `mm init magix` 即可一键初始化项目（包括创建关联平台的项目），目前已经接入以下各平台：
* [gitlab](https://gitlab.alibaba-inc.com/)
* [RAP](https://rap2.alibaba-inc.com/)
* [DEF云构建平台](https://work.def.alibaba-inc.com/my)
* [iconfont](https://www.iconfont.cn/)
* [chartpark](https://chartpark.alibaba-inc.com/)
* [数据小站](https://mamadata.alibaba-inc.com/)
* [ARMS](https://clue.alibaba-inc.com/)

*mm-cli 工具会在初始化项目时同步在各平台自动创建好关联项目，并配置到项目中，无需手动操作*


#### 目前支持的脚手架类型
  - [zs_scaffold](https://gitlab.alibaba-inc.com/mm/zs_scaffold) *后台管理类型的脚手架*
  - [magix5-scaffold](https://gitlab.alibaba-inc.com/thx/magix5-scaffold) *后台管理类型的脚手架（magix5版）*
  - [union_scaffold](https://gitlab.alibaba-inc.com/mm/union_scaffold) *联盟后台脚手架*
  - [cell-webpack-scaffold](https://gitlab.alibaba-inc.com/cell/cell-webpack-scaffold)
  - [cell-lib-scaffold](https://gitlab.alibaba-inc.com/cell/cell-lib-scaffold)
  - [cell-components-scaffold](https://gitlab.alibaba-inc.com/cell/cell-components-scaffold)
  - [cell-lego-scaffold](https://gitlab.alibaba-inc.com/cell/cell-lego-scaffold)


