### BP项目闲时预加载静态资源
由于我们的项目资源都是以模块的形式存在，所以可以在页面加载完毕之后，空闲时后台预加载其他页面的静态资源，以缩短用户访问剩余页面的打开时间，原理详见：https://github.com/xinglie/xinglie.github.io/issues/72

### 如何改造
1. 确保你的 `magix` 套件已经更新到最新 (执行 `mm install kit magix`)
2. 项目 `package.json` 的 magixCliConfig 增加配置
``` 
    "magixCliConfig": {
      ...,
      preloadModuleList: true
    }
```
3. 执行 `mm daily`，会自动在项目根目录下生成以下文件
```
    preloadModule.ts //模块预加载主逻辑文件 
    preloadModuleList.ts //模块清单文件
```
   
4. 随后在项目的 `boot.ts` 文件的 Magix.boot({...}) 代码后面加上以下这段代码 (参考：http://gitlab.alibaba-inc.com/mm/zs_scaffold/blob/master/src/boot.ts#L109)
```
    // 预加载静态资源
    seajs.use([`${projectName}/preloadModule`], (preload) => {
      preload.default.start()
    })
```

> **风险点：** 改造完后需要本地测试下所有模块文件预加载完毕时有无报错信息，如果有报错说明业务js文件有不合理的引用全局变量情况，需要修改业务逻辑，否则可能会导致线上该模块报错不可用
