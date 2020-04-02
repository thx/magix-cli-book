

### 生成https证书

启动本地https服务需要先生成本地https证书，并导入系统，详细教程见：http://gitlab.alibaba-inc.com/mmfs/ssl-cert


### 使用方法

执行 `sudo rmx dev -d --https` 带有--https标识时会启动本地https开发服务器，以应对某些场景下必须https服务的要求（如本地开发对接预发环境https接口，chrome的same-site限制等等）


---

另外建议修改项目里的`magixCliConfig.ipConfig` 格式为带完整域名的形式：

```json
    "ipConfig": {
        "线上": "106.11.211.220|https://dmp.taobao.com",
        "预发一套": "140.205.215.168|https://pre-dmp.taobao.com"
    }
```

这样配置的话，cli工具会自动将当前域名配置的127.0.0.1写入到host当中，并且执行`rmx clear`清除chrome缓存，无须再自己手动切换host了。


