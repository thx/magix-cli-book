#### 本地开发可视化配置跨项目 crossConfigs 
跨项目配置 crossConfigs 目前的方案一般是线上由后端写入入口文件，本地开发时则直接配置在本地的入口文件 (index.html) 上，不利于维护，现在 MM-CLI 支持在 Magix 开发帮助浮层可视化配置 crossConfigs，如下图：

<img width="780" src="https://img.alicdn.com/imgextra/i2/O1CN01tj1cvj1tKvAQJ0ZVF_!!6000000005884-2-tps-1510-1378.png">

?> 保存配置，会在 package.json 的 magixCliConfig 里增加 crossConfigs 配置
，然后 mm dev 时会将该 crossConfigs 注入到入口文件里