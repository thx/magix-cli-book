

#### spm埋点及数据小站配置
通过 `mm init magix` 脚手架创建的项目，已经内置了spm埋点的功能，开发者要做的是3件事

1. 申请`spma`字段
2. 申请`logkey`字段
3. 登录数据小站平台配置站点


#### 申请 spma 字段
登录阿里日志平台-SPM申请 http://spm.alibaba-inc.com/track/index.htm?#/apply/spmapply ， 点击 `新建站点`，填完相关信息保存可以看到生成的`spma`字段，如下图 

<img src="https://img.alicdn.com/tfs/TB1ECsdvBjTBKNjSZFDXXbVgVXa-1274-426.png" width="80%">


#### 申请 logkey 字段
进入阿里日志平台-黄金令箭 http://spm.alibaba-inc.com/track/index.htm?#/apply/gold ，按顺序执行 `新建业务 -> 新建场景 -> 新建令箭`，完成后在列表里点击 `生成代码`，查看黄金令箭编码，去掉`/`即为`logkey`

<img src="https://img.alicdn.com/tfs/TB162QCvpooBKNjSZFPXXXa2XXa-1032-510.png"  width="70%">


#### 数据小站配置
登录数据小站 https://data.alimama.net/#!/spm/spmb-config?spma=a2e3k  ，地址栏里的`spma`字段改成你刚刚申请的spma，然后可以根据你的项目页面进行配置，如图

![img](https://img.alicdn.com/tfs/TB1RKx_vtcnBKNjSZR0XXcFqFXa-1716-1194.png)

#### 最后

以上操作完后，将`spma` `logkey` 字段填到项目的`magixCliConfig`配置里，然后在开发完毕后执行 `mm spmlog` 即可完成全项目埋点，会遍历项目所有文件，给匹配到的节点打上`data-spm-click="..."`之类的标志
> `mm spmlog` 会同时在本地生成dataplus数据小站相关的文件<br>
> `mm spmlog -r` 可以清除项目的埋点

