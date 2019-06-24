
### 什么是Rapper 


Rapper 是 Rap 的最佳伴侣，可以根据 Rap 上的接口信息直接生成出接口的 typescript 定义和请求函数。简单来说就是在写接口请求的时候，可以帮你直接提示接口的入参及返回数据格式 `(Rapper作者：@池冰)`



__看下使用效果：__

![img](https://img.alicdn.com/tfs/TB1p1IPaRaE3KVjSZLeXXXsSFXa-700-344.gif)



### 接入方式

__新项目__：magix-cli已经内置Rapper，新项目初始完毕后，在Rap上填写接口，然后本地执行`mx models`，即可开始使用rapper接口提示功能



__老项目__：

1. 增加package.json里的magixCliConfig配置`"rapper": true`

2. 然后需要参照脚手架仓库[zs_scaffold](http://gitlab.alibaba-inc.com/mm/zs_scaffold/tree/master)增加或更新一些文件，以下是需要修改的文件，以脚手架为准

    * `tsconfig.json`
    * `types/magix.d.ts`
    * `types/magix.ext.d.ts`
    * `src/zs_scaffold/view.ts`
    * `src/zs_scaffold/services/base-fetch.ts`

3. 最后执行 `mx models` 即可开始使用rapper

    > 注意：`src/[你的项目名]/services/`目录下的 `model-itf.ts`、`models.ts`、`requester.ts` 这三个文件由`mx models`命令读取RAP2平台的数据自动生成，请勿手动更改


### 使用方式

1. 要启用Rapper接口提示功能的必须为.ts文件

2. view的引用方式需要改成import

    ![img](https://img.alicdn.com/tfs/TB1cYs1aMaH3KVjSZFpXXbhKpXa-468-154.jpg)

3. 使用`this.requester.<your_model_name>` 替换原先的 `this.fetch`

    __代码示例__

    ![img](https://img.alicdn.com/tfs/TB1xCc1aMaH3KVjSZFpXXbhKpXa-794-340.jpg)


