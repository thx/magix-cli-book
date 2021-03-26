
> 以下教程适用于老项目或未接入magix-cli工具的项目，新 `mm init magix` 生成的项目默认已经接入了云构建，只须做`准备工作`即可

### 准备工作
- 升级mm-cli工具到最新版本 `tnpm install -g @ali/mm-cli`
- 项目的package.json里的magixCliConfig增加配置 `"cloudBuild": true`
- 仓库接入云构建平台，请先登录平台[DEF](http://engine.def.alibaba-inc.com/my#/project)，点击接入新仓库，输入你的项目git地址根据提示操作


### 项目场景

由于历史原因目前项目一般分为两种情况

1. 最近新 `mm init magix` 初始化成功的Magix3项目（特征是项目中不再有`combine-tool-config.js`, `matfile.js`, `gulpfile.js`等文件，因为已经收敛进cli工具中了）

2. 以前的老项目

两种项目接入方式略有不同


### 接入方法

1. 对于符合 `mm init magix` 脚手架的新项目我们使用`构建器`构建，在项目根目录下放置 `abc.json`文件，填充以下内容即可
 ```
    {
        "assets": {
            "type": "builder",
            "builder": {
                "name": "@ali/builder-magix-combine"
            }
        }
    }
 ```

2. 对于老项目或其他非magix项目的话，则使用`构建脚本`的方式，在项目根目录下放置 `abc.json`文件，填充以下内容即可

  ```
    {
        "assets":{
            "type":"command",
            "command":{
                "cmd":[
                    "tnpm install", 
                    "npx gulp build", //这里的gulp build是项目原来的打包命令，请根据实际填写 (如果没有打包过程可以去掉这行命令)
                    "mv ./build $BUILD_DEST"
                ]
            }
        }
    }
 ```
 > 注意：如果magixCliConfig中有 `"buildCommand": "gulp build"` 之类的配置，需要移除掉它

3. 以上两种都是在云端执行构建脚本，有些老的项目希望还是在本地构建，然后再发布，这种情形的话，`abc.json`的配置如下：

```
    {
        "assets":{
            "type":"command",
            "command":{
                "cmd":[
                    "mv ./build $BUILD_DEST" //去掉构建逻辑只保留这行, build是构建后的文件夹，可根据实际填写
                ]
            }
        }
    }
 ```
 > 此时 magixCliConfig 中需要配置 `"buildCommand": "gulp build"` 之类的本地构建逻辑，`mm daily/publish` 时会先在本地执行该构建逻辑，然后再进行云构建发布


### 一切就绪

配置完成后，就可以执行 `mm daily/publish` 来进行云构建发布了

- `mm daily`: 日常发布，在你的开发分支下执行，可以重复发布
- `mm publish`: 将你的当前开发分支发布到正式cdn环境，发布完毕后会删除当前开发分支，并checkout到master分支

> 需要注意的是云构建自动接入门神校验系统，`mm publish` 发正式cdn的时候，需要通过门神的校验才可以正常发布，校验结果可以查看仓库的检查日志

### 常见的门神校验错误

- 资源引用url地址使用了http协议，需要改成`//dmp.taobao.com`之类的形式
- build构建后代码包含了注释，通常发生在build文件下保留了源文件的情形，需要修改下原来的build逻辑，只构建生成压缩后的代码

### 其他常见错误

- 原先项目里的`gulp build`命令，如果用了`magix-combine`的，需要配置
   ```
   combineTool.config({
       log: false
   })
   ```
   来关闭日志输出，以防在云端执行构建命令时日志溢出导致发布失败的情形