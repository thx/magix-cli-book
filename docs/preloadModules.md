### BP项目闲时预加载静态资源
由于我们的项目资源都是以模块的形式存在，所以可以在页面加载完毕之后，空闲时后台预加载其他页面的静态资源，以缩短用户访问剩余页面的打开时间，原理详见：https://github.com/xinglie/xinglie.github.io/issues/72

### 如何改造
1. 项目 `package.json` 的 magixCliConfig 增加配置 
``` 
    "magixCliConfig": {
      preloadModuleList: true
          ...,
    }
```
1. 在你的项目的 `boot.ts` 的 Magix.boot() 启动 magix 项目代码后面加下面这段代码 (参考：http://gitlab.alibaba-inc.com/mm/zs_scaffold/blob/master/src/boot.ts#L109)
  ```
      // start - 预加载静态资源
      seajs.use([`${projectName}/preloadModuleList`], (ModuleList) => {
        if (!ModuleList) {
          return
        }
        const BATCH_COUNT = 5 // 一次批量加载 BATCH_COUNT 个模块
        const TIME_INTERVAL = 3000 // 每次批量加载模块的间隔时间，单位(ms)
        const PRELOAD_DELAY = 5000 // 开启预加载静态资源的延迟时间，单位(ms)

        setTimeout(e => {
          let i = 0

          // 间隔预加载资源主函数
          function recur () {
            const currModules = ModuleList.default.slice(i * BATCH_COUNT, (i + 1) * BATCH_COUNT)
            i++
            if (currModules.length) {
              console.log('预加载模块: ', currModules.join('，'))
              seajs.use(currModules)
              setTimeout(() => {
                recur()
              }, TIME_INTERVAL)
            }
          }

          recur()
        }, PRELOAD_DELAY)
      })
      // end - 预加载静态资源
  ```

1. 执行 `mm daily` 即可（会在项目根目录下生成 `preloadModuleList.ts` 模块清单文件）