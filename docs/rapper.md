
### 什么是rapper

Rapper 是 Rap 的最佳伴侣，可以根据 Rap 上的接口信息直接生成出接口的 typescript 定义和请求函数。简单来说就是在写代码的时候，可以帮你直接提示接口的入参及返回数据格式（`前提是编辑器是vscode`）

__看下使用效果：__

![img](https://img.alicdn.com/tfs/TB1p1IPaRaE3KVjSZLeXXXsSFXa-700-344.gif)



### 接入方式

__新项目__：magix-cli已经内置rapper功能，新项目mm init完毕，直接就可以使用

__老项目__：

1. 增加package.json里的magixCliConfig配置`"rapper": true`

2. 然后需要参照脚手架仓库[zs_scaffold](http://gitlab.alibaba-inc.com/mm/zs_scaffold/tree/master)增加或更新一些文件，以下是需要修改的文件，以脚手架为准

    * `tsconfig.json`
    * `types/magix.d.ts`
    * `types/magix.ext.d.ts`
    * `src/zs_scaffold/view.ts`
    * `src/zs_scaffold/services/base-fetch.ts`

3. 最后执行 `mx models` 即可开始使用rapper


### 注意事项

1. 使用rapper提示的必须为.ts文件

2. view的引用方式需要改成import

![img](https://img.alicdn.com/tfs/TB1cYs1aMaH3KVjSZFpXXbhKpXa-468-154.jpg)

3. 代码示例

![img](https://img.alicdn.com/tfs/TB1xCc1aMaH3KVjSZFpXXbhKpXa-794-340.jpg)


