## 跨项目共享view

### 背景说明
使用`magix`提供的`vframe`功能，允许项目间类似`iframe`那样引用对方的`view`。该功能亦可把复杂的项目进行拆分成`n`个子项目进行维护

### 几个重点
1. 当前项目中的`view`被渲染在宿主项目(如钻展、直通车)时，应使用钻展或直通车的相关组件以及品牌色
2. 相关组件指`project/gallery/`目录下的组件，故该目录下的组件只能是统一提供的且版本相同的组件
3. 当前项目中界面显示所需要的相关颜色，会由`/gallery/mx-style/`统一提供，自己在`view`中不应写死与品牌色有关的颜色

### 相关约定
#### 包名约定
`seajs`或`requirejs`需要配置一个包名来使用某个目录下的`js`文件，指向不同目录下的包名不能同名。这要求我们在开发新项目时，使用新项目的名称来做为包名，不能再像以前那样使用统一的`app`名称。
多项目包配置示例：
```
seajs.config({
	paths: {
		zuanshi: src + '/app', //主项目
		dna: "https://g-assets.daily.taobao.net/mm/dna/0.0.3/dna" //被加载进来的子项目
	}
});
```

#### 目录约定
```bash
- project
  - src
     - project
       - assets
       - chartpark
       - dataplus
       - gallery
       - local-gallery
       - services
       - views
       prepare.ts
       view.ts
     - lib
    boot.ts
```
#### 通用样式约定
- 各自项目中的具体业务view中，请不要直接使用 `@color-brand` 等 `mx-style/_vars.less` 里的变量，而是通过使用 `.color-brand` 等样式名来使用，以达到被嵌入到其他项目时，能正确使用宿主项目的品牌色等

- 项目assets里放置的less文件为各自项目级别的通用样式，不随宿主项目而改变，请将assets里的所有less文件，都配置到 `package.json->magixCliConfig` 里的 `scopedCss` ，然后在 `prepare.ts` 文件里引用：
```
Magix.applyStyle('@scoped.style')
```

#### 接口对接问题
- 首先先到主项目的rap2平台配置协同仓库，将项目所要跨项目加载的所有其他仓库，加到协同仓库配置里

- 各自项目的接口地址依然为相对地址，如：`api/get/list.json`，然后在项目的 `services/project.js` 判断是线上环境时对接口做统一处理，加上：`https://zuanshi.taobao.com/` 之类的前缀
	##### 如何判断线上环境？

    magix-cli已经为开发状态注入了各种环境标识，如：
    - mm dev 全局注入标识 `window.__isRap__ = true`
    - mm dev -d [ip] 全局注入标识 `window.__isDaily__ = true`
    - mm dev -o [ip] 全局注入标识 `window.__isOnline__ = true`
    
        
        
判断线上环境可以用：
```
!window.__isRap__ && !window.__isDaily__ && !window.__isOnline__
```

- 在主项目加载子项目的view时，可能存在接口跨域请求的情况，请做好相关配置

- 在主项目进行 `mm dev -d` 进行本地开发时，访问到加载的子项目的view时，可能会遇到子项目请求的接口无法正常请求的情况


#### 通用`view`约定
通用`view`(或称之为组件)目前是使用`zs_gallery`这个仓库，并通过`magix-cli`中的`mx gallery`这个命令把这个仓库中的代码同步到`project/gallery`这个目录下。我们约定`project/gallery`这个目录只能从远程仓库中同步代码，不能自己添加、修改该目录下的组件(如果需要修改请参考`本地组件约定`)。

#### 本地组件约定
项目中`gallery-local`为当前项目提供的本地组件所在的目录，当前项目中通用的，或通用组件不能满足项目需求时，在该目录下添加自己需要的组件进行处理

```bash
- lg-chart
    index.ts
    index.html
    index.less
```
>该目录里面的组件统一`lg-`前缀


### 相关细节
#### boot.ts
 1. 准备通用环境，如加载`jquery,underscore,accouting`等
 2. 应用自己品牌色的通用样式
 3. 加载其它项目中的`project/prepare.ts`文件

> 注意：请保持项目间的boot.ts加载的通用模块的一致性，基本上从mx init初始化项目之后，就不要再动boot.ts文件了，有自己特殊逻辑的东西请在各自的prepare.ts文件里加载

#### project/prepare.ts
 1. 异步加载用户信息、字典文件等
 2. 使用`Magix.config`方法把相关信息放到`Magix.config({'prject.xx':'yy'})`里
 3. 导出返回值是`promise`的方法供外部调用

> prepare.ts可以算做boot.ts的本地化扩展，各自项目的特殊的逻辑可以在这里定义

#### project/view.ts
 1. 项目中所有`view`的基类为该文件，而不再是原来的`Magix.View`
 2. 该文件继承`Magix.View`，然后挂载项目中常用的方法等

> view.ts各自项目都保留一份，本质上是为了保持各自项目的一些特有非通用配置，比如 `Magix.config('zs_scaffold.user')` 等配置