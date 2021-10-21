#### 安装
1. 安装 `tnpm` （如果已有 tnpm，请忽略）
```bash
npm install --registry=https://registry.npm.alibaba-inc.com -g tnpm
```

2. 用 tnpm 安装 `mm-cli` 命令行工具 
```bash
tnpm install -g @ali/mm-cli
```

#### 基于 magix 套件脚手架初始化一个项目
```bash
mm init magix
```
!>  首次使用 `mm-cli` 工具会提示域账号登录，按提示操作即可


<img width="340" src="https://img.alicdn.com/imgextra/i2/O1CN01KZqyOY1vw8Z2TSaNc_!!6000000006236-2-tps-630-192.png">

接下来会提示安装 `magix` 套件，安装完毕后，选择脚手架（BP后台请选择 *zs_scaffold*），其他选择根据提示即可

<img width="460" src="https://img.alicdn.com/imgextra/i4/O1CN01isQgwW1VmM61jRYd4_!!6000000002695-2-tps-884-456.png">

项目初始化完毕后，进入项目目录执行 `mm dev` 即可开始开发


#### 项目开发配置
项目开发相关的配置在 package.json 的 `magixCliConfig` 对象里（[查看全量配置](config)），默认配置一般不需要改，需要根据项目修改的配置有

- `autoOpenUrl` 执行 mm dev（接口对接 [RAP](rap)）时自动打开的浏览器地址
```javascript
"autoOpenUrl": "https://localhost:1234/index.html" 
```
- `ipConfig` 执行 mm dev -d（接口对接真实 IP）时可选的开发环境配置
```javascript
"ipConfig": {
    "预发": "140.205.215.168|https://pre-zuanshi.taobao.com:443/index.html",
    "线上": "106.11.223.90|https://zuanshi.taobao.com:443/index.html"
}
```
  > **此处配置的完整 url 地址隐含多重配置信息**
  1. `https` 协议部分代表当前启动的本地开发服务是 https 或 http （首次启动 https 服务需要安装本地证书，请执行 `mm cert --install` 安装）
  2. `pre-zuanshi.taobao.com` 域名部分会自动将 *127.0.0.1 [域名]* 写入系统 hosts，无须手动管理 hosts (该配置会在中止 mm dev 时自动从 系统hosts 里移除)
  3. `:443` 端口部分代表当前启动的本地服务器的端口号
  4. `/index.html` 该部分代表入口 html 文件

一种更方便的修改项目配置的方式是 `mm dev` 启动开发服务后，通过页面上注入的 `Magix 开发帮助` 浮层进行配置管理

<img width="650" style="box-shadow: 0 0 10px rgba(0,0,0,0.2)" src="https://img.alicdn.com/imgextra/i4/O1CN01US01CI1tZZp5qMFw9_!!6000000005916-2-tps-1462-1670.png">


#### HMR 热更新
项目默认开启 Magix 的 view 级别的模块热更新，如果你改的文件对应的 view 有在当前页面上渲染，则会触发 view 的热更新，否则全页刷新 

#### 构建部署相关
开发时请先执行 `mm createDaily` (短命令 `mm cd`，该命令是个插件，首次执行会提示安装) 创建带时间戳的日常分支，然后在日常分支上开发调试完毕，执行 `mm daily` 即可一键构建部署到预发环境，最后执行 `mm publish` 发布到生产环境

> `mm daily` 可以重复发布日常分支以方便测试验证，`mm publish` 发布后该分支会被删除