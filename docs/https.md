

### 生成https证书

启动本地https服务需要先生成本地https证书，并导入系统，请使用 mm-cli 插件 `mm cert`

直接运行 `mm cert --install` 按提示即可完成本地https证书安装，首次执行会提示安装套件。


### 使用方法

本地https证书安装完毕后执行 `mm dev -d` ipconfig配置里的url如果是https协议的会启动本地https开发服务器，以应对某些场景下必须https服务的要求（如本地开发对接预发环境https接口，chrome的same-site限制等等）


---

另外建议修改项目里的`magixCliConfig.ipConfig` 格式为带完整域名的形式：

```json
    "ipConfig": {
        "线上": "106.11.211.220|https://dmp.taobao.com:443",
        "预发一套": "140.205.215.168|https://pre-dmp.taobao.com:443"
    }
```

这样配置的话，cli工具会自动将当前域名配置的127.0.0.1写入到host当中，并且执行`mm clear`清除chrome缓存，无须再自己手动切换host了。


