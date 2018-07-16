## 云构建


#### 准备工作
- 升级magix-cli工具到最新版本 `tnpm install -g @ali/magix`
- 仓库接入云构建平台，请先登录平台[DEF](http://engine.def.alibaba-inc.com/my#/project)，点击接入新仓库，输入你的项目git地址即可


#### 项目场景

由于历史原因目前项目一般分为两种情况

1. 最近新mm init初始化成功的Magix3项目（特征是项目中不再有`combine-tool-config.js`, `matfile.js`, `gulpfile.js`等文件，因为已经收敛进cli工具中了）

2. 以前的老项目

两种项目接入方式略有不同


#### 接入方法

1. 对于新项目我们使用构建器构建，在package.json的magixCliConfig配置中增加 `"cloudBuild": true`，然后在项目根目录下放置 `abc.json`文件，填充以下内容即可
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

2. 对于老项目的话，则使用构建脚本的方式，在package.json的magixCliConfig配置中增加 `"cloudBuild": true`，然后在项目根目录下放置 `abc.json`文件，填充以下内容即可

  ```
    {
        "assets":{
            "type":"command",
            "command":{
                "cmd":[
                    "tnpm install",
                    "npx gulp build", //这里的gulp build是项目原来的打包命令，请根据实际填写
                    "mv ./build $BUILD_DEST"
                ]
            }
        }
    }
 ```
 > 注意：如果有 `"buildCommand": "gulp build"` 之类的配置，需要移除掉它


#### 写在最后

配置完成后，发布流程与原来没有差别，还是原来的命令 `mm daily/publish` 即可

> 需要注意的是云构建自动接入门神校验系统，`mm publish` 发正式cdn的时候，需要通过门神的校验才可以正常发布，校验结果可以查看仓库的检查日志