

### 生成https证书

启动本地https服务需要先生成本地https证书，并导入系统，详细教程见：http://gitlab.alibaba-inc.com/mmfs/ssl-cert


### 使用方法

执行 `sudo rmx dev -d --https` 带有--https标识时会启动本地https开发服务器，以应对某些场景下必须https服务的要求（如本地开发对接预发环境https接口，chrome的same-site限制等等）


