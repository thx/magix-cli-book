### mm clear 

> 本命令用来一键清除chrome的dns及hsts缓存 

### 背景
由于chrome浏览器的dns及hsts缓存机制，在本地开发与线上环境切换host时，常常不会立即生效，需要打开chrome的配置页面`chrome://net-internals/#hsts`进行清除缓存，操作繁琐，故提供 `mm clear` 命令来进行一键清除

### 原理
利用applescript (详见`@宫卫`的[chrome_hosts_flush_util](https://github.com/gongeek/chrome_hosts_flush_util)) 模拟人为打开`chrome://net-internals/#hsts`配置页进行自动点击操作，运行过程中会自动打开chrome并跳转到配置页面清除缓存，最后自动关闭。

此命令包含清除dns及hsts，dns无须配置，hsts需要配置指定的域名 (由 `mm clear --config [域名]` 命令配置，支持多域名，以逗号分隔)，清除hsts配置的域名等同于原先 `chrome://net-internals/#hsts` 输入框里的域名，如下图：

<img src="https://img.alicdn.com/tfs/TB1p_ZBlND1gK0jSZFyXXciOVXa-1560-194.png">



### 准备工作
1. 请配置chrome浏览器允许执行applescript中的javascript，如下图：

<img src="https://img.alicdn.com/tfs/TB1cnuKlFY7gK0jSZKzXXaikpXa-1088-702.png" style="width:70%;" />

2. 初次由终端运行可能会弹出提示，确定即可


### 使用方式

* `mm clear` 一键清除chrome的dns及hsts缓存，初次使用需要填写要清除hsts的域名配置
* `mm clear --config` 获取当前保存的域名配置
* `mm clear --config xxx.com,yyy.com` 配置需要清除hsts的域名，多个域名以逗号分隔


### 快捷短命令

* `mm cl`
* `mm cl -c`