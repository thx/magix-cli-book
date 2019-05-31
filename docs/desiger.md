magix应用可视化搭建工具 magix desiger

## 使用方法

1. 模板的准备 [如何编写模板？](http://gitlab.alibaba-inc.com/thx/magix-desiger/tree/master/bptemplate)

   + 使用nodejs包模板

       在你的magix应用项目安装相应的模板的nodejs包，例如:```tnpm install @ali/magix-desiger-bptemplate --save-dev```

       在package.json的magixCliConfig配置中加入magixDesigerTemplate:"@ali/magix-desiger-bptemplate"配置项 [cli配置说明](https://thx.github.io/magix-cli-book/#/config).

       注意：使用magix-cli脚手架新建的项目自带适用于magix3项目的模板包`@ali/magix-desiger-bptemplate`

   + 使用本地模板

      除了使用发布的npm包的模板外，支持使用本地模板 可以在项目文件夹 .mds 目录建一个 projectTemplate 目录来存放你本地项目的模板 例:[unoList](http://gitlab.alibaba-inc.com/mm/workbench/tree/master/.mds/projectTemplate)     

  
2. 利用magix-desiger tool进行搭建

   当magix-cli启动你的magix项目后右下角会多一个magix-desiger tool面板，可以利用这个工具完成搭建。
   
   ![](https://img.alicdn.com/tfs/TB1Ezj0tCzqK1RjSZFpXXakSXXa-180-42.png)

   + 新建空view文件
   ![](https://img.alicdn.com/tfs/TB1kNL0tCzqK1RjSZFjXXblCFXa-811-310.gif)

   + 如何搭建页面？
   
     以列表为示例，先选中你需要搭建的view，选择view的模板`listView`然后设置列表的一些表头，接口（已与Rap打通），筛选项等信息，点击提交后会改写这个view的代码，会生成一个基本的表格页面。
     
     ![](https://img.alicdn.com/tfs/TB1DHP6tCzqK1RjSZPcXXbTepXa-1894-869.gif)

     [更多信息](http://gitlab.alibaba-inc.com/thx/magix-desiger) or `@宫卫`
