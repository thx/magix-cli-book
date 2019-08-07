### chrome插件： magix-cross-configs 
本插件主要用来在预发或测试环境配置跨项目加载的子项目的前端资源地址和接口host配置.

* 插件下载地址：http://gitlab.alibaba-inc.com/thx/magix-cross-configs/raw/master/magix-cross-configs.crx
* 插件gitlab地址：http://gitlab.alibaba-inc.com/thx/magix-cross-configs

#### 安装
> 下载好上面地址的.crx文件后，在chrome的 `chrome://extensions/`界面，将.crx文件拖入即可安装


### 背景
目前跨项目加载view的项目，关联的子项目版本及接口host都配置在diamond上，导致单一项目的前端配置过多，后端容易配错，所以我们将所有关联子项目的前端资源地址以及host配置全部收敛进前端代码里进行配置，然后测试和产品们通过安装本插件，可以在预发或线上环境随意指定子项目的前端资源地址及host配置

> 出于对测试或产品使用本插件的难度考虑，维持子项目apiHost由后端根据环境直接输出，然后前端变量形式配置到boot-config.js里，保持原来的测试逻辑，插件只提供特殊情况下的配置需求

### 前端改造点

> 可以参考 `http://gitlab.alibaba-inc.com/mm/dmp-new` 项目的boot.ts文件进行修改

具体步骤：
1. 去掉index.html入口文件里除了当前项目版本外的其他所有子项目版本配置，后端输出的子项目apiHost可以保留
2. 在`boot.ts`文件旁边创建`boot-config.ts`文件，配置如下：
```javascript
//#loader=none;
//以下约定的数据格式，勿随意修改
define("boot-config", () => {
    return {
        //跨项目加载view的项目，可配置多个
        //以下配置为线上正式环境的版本及host，预发或daily环境的代码跟host，由插件配置提供
        crossConfigs: [{
            projectName: 'dmp-xiaoer',
            source: '//g.alicdn.com/mm/dmp-xiaoer/20190628.151909.437/dmp-xiaoer',
            apiHostKey: 'dmp-xiaoer.api.host',
            apiHost: ''
        }, {
            projectName: 'tactics',
            source: '//g.alicdn.com/mm/tactics/20190712.110549.440/tactics',
            apiHostKey: 'tactics.api.host',
            apiHost: '//adbrain.taobao.com'
        }]
    };
});
```
如果apiHost是由后端输出，定义在window下的环境变量里，则`boot-config.js`里可以使用变量形式，如：
```javascript
//#loader=none;
define("boot-config", () => {
    let tacticsApiHost = ENV.tacticsApiHost
    let cdnHost = window._cdnHost //cdnHost由主项目决定
    return {
        crossConfigs: [{
            projectName: 'dmp-xiaoer',
            source: `${cdnHost}/mm/dmp-xiaoer/20190628.151909.437/dmp-xiaoer`,
            apiHostKey: 'dmp-xiaoer.api.host',
            apiHost: ''
        }, {
            projectName: 'tactics',
            source: `${cdnHost}/mm/tactics/20190712.110549.440/tactics`,
            apiHostKey: 'tactics.api.host',
            apiHost: tacticsApiHost
        }]
    };
});
```


3. 然后`boot.ts`里将`boot-config.ts`引入 
```javascript
seajs.use(['boot-config'], (bootConfig) => {...}
```

4. 配置好seajs的path
```javascript
//从bootConfig里配置关联子项目的包配置
bootConfig.crossConfigs.forEach(config => {
    seajsConfig.paths[config.projectName] = config.source
})
```
5. 配置seajs的map
```javascript
//插件会注入带时间戳的map，保证开启插件下访问预发等测试环境的文件不会被缓存
seajsConfig.map = bootConfig.map
```

6. 配置子项目的host
```javascript
//从bootConfig里配置关联子项目的接口host
bootConfig.crossConfigs.forEach(config => {
    Magix.config({
        [config.apiHostKey]: config.apiHost
    })
})
```

### 插件使用效果

插件安装完成后，只要访问带有`boot-config.js`文件的站点，就会出现配置按钮，如下图：

![a](https://img.alicdn.com/tfs/TB1vj5Ibhz1gK0jSZSgXXavwpXa-1642-1200.jpg)

同时提供全局禁用插件，以及一键清除所有站点的跨项目加载view的配置信息

![b](https://img.alicdn.com/tfs/TB1r_rRboT1gK0jSZFrXXcNCXXa-988-610.png)

### 使用人群
测试：
> 以后测试要测什么版本，什么host自己动手配置吧，解放前端！

前端开发：
> 本地同时起两个项目服务时，可以通过插件配置子项目的资源地址为localhost、接口为RAP地址等，无须修改boot-config.ts里的配置，防止忘记还原配置发布到线上。
