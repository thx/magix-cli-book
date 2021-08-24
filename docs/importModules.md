#### 项目中直接导入使用 npm 包 
现在 `Magix` 套件已支持直接在项目代码中 `import` npm 包的能力

#### 使用步骤
> 确保你的 `Magix` 套件已经更新到最新版本

1. 配置 package.json 的 `dependencies` 依赖包或执行 `tnpm i [npm包] -S`，示例：
  ```json
  "dependencies": {
    "dayjs": "^1.10.6"
  }
  ```
  !> 请确保你引入的 npm 包是浏览器端可用的包，否则将报错

2. `mm dev` 启动服务后，在你的业务代码中直接 `import` 包名即可使用，示例：
   ```js
   import Dayjs from 'dayjs'
   ```

#### 注意事项
?> `mm dev` 或 `mm daily/publish` 时会自动同步 `dependencies` 依赖的包到项目中，包目录默认位于 `src/[yourProjectName]/web_modules` 下，请勿手动更改该目录下的文件

支持更改默认同步到项目中的包目录地址，magixCliConfig 配置示例：
```json
  "magixCliConfig": {
    ...,
    "snowpackModulesDest": "src/dmp-new/web_modules"
  }
```

!> 注意，如果你的项目需要被跨项目加载， `snowpackModulesDest` 包目录配置必须位于 `src/[yourProjectName]/xxx` 下，否则会加载不到模块
