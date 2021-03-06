

### 背景说明
通常情况下`mx dev -d [ip]`已经可以满足大部分联调接口场景，这里的ip可以是daily或预发环境的ip地址，但有时候需要联调对接线上真实的接口，而线上接口通常是https的，所以我们需要修改配置来实现


### 如何配置？

1. 在项目package.json的magixCliConfig中增加配置 `"protocolAlias": "https"`
> 注意：对于一些matfile.js等配置文件还没未收敛进cli工具的老项目，需要手动升级package.json里的mat, mat-proxy包到最新版本，然后在matfile.js文件里配置
```
mat.url(apiPatterns)
    .use(proxy({
      proxyPass: matProxyPass,
      protocolAlias: 'https'
    }))
```

2. ping出你的项目的线上域名的ip地址，然后执行`sudo mx dev -d [线上ip地址]`，ip地址也可配置在项目magixCliConfig.matProxyPass中

3. 通常线上接口有对域名做限制，所以你本地开发时的host需要绑定线上真实域名，例如：
    ```
    127.0.0.1 zuanshi.taobao.com
    ```

4. 本地开发服务启动后，请在本地访问http服务地址，如`http://zuanshi.taobao.com`，(线上通常也会对端口做限制，请确保本地开发服务的端口为`80`端口)，cli工具会在碰到接口时自动代理转发到线上真实https接口地址，例如本地访问的接口：
    ```
    http://zuanshi.taobao.com/api/tag/recommend
    ```
    会被转发成 
    ```
    https://140.205.140.87/api/tag/recommend
    ```

> 注意事项：如果你之前没绑host访问过线上正式带https的域名，如: `https://zuanshi.taobao.com`，则浏览器可能缓存了hsts，导致你访问 `http://zuanshi.taobao.com` 也会跳转至https，这种情况请到chrome的hsts设置页面，[chrome://net-internals/#hsts](chrome://net-internals/#hsts)，在以下设置模块清除你的域名的hsts缓存
![](https://img.alicdn.com/tfs/TB1FQzJCkvoK1RjSZPfXXXPKFXa-1552-184.png)
同时别忘了清除缓存

> HOST切换不生效问题：https://www.cnblogs.com/hustskyking/p/hosts-modify.html

### 快捷进入https接口模式

现在支持在命令行中增加`--https`参数来直接启用https接口模式，例如: `sudo mx dev -d --https` 

### 为何不实现本地起https服务？

1. 对于本地起https服务，需要本地生成自颁发证书，并认证通过，过程很繁琐，例如这个[教程](https://segmentfault.com/a/1190000007990972)

2. 以上实现已经可以满足本地开发联调线上真实接口的场景了，在现实开发过程中，只需要切换`magixCliConfig`的配置`"protocolAlias": "http|https"`即可


### ipconfig自动配置host

ipconfig增加域名配置(以逗号分隔)，配置如下图：

<!-- ![](https://img.alicdn.com/tfs/TB1jMHwlRv0gK0jSZKbXXbK2FXa-1006-338.png) -->
<img src="https://img.alicdn.com/tfs/TB1jMHwlRv0gK0jSZKbXXbK2FXa-1006-338.png" width="66%">

现在`mm dev`时如果检测到ipconfig里配置了域名信息，则会自动往系统hosts里配置 `127.0.0.1 xxx.com` 信息，不再需要手动配置hosts，随后会执行 `mm clear` (该命令详见 [mm clear](clearDnsHsts)) 清除dns及hsts，最后再自动打开浏览器访问该域名 


