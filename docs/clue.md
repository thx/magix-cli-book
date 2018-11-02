clue是前端异常实时监控平台，能够实时监控线上错误，并报警。https://clue.alibaba-inc.com
#### 新项目
通过1.1.56之后版本的magix-cli工具，mx init脚手架创建的项目，已经内置接入了clue平台。开发者要查看数据，只要做1件事

告诉magix-cli作者（崇志），新建的项目名称，帮你开通权限。之后就可以查看了。https://clue.alibaba-inc.com


#### 已有项目
##### magix3版本
开发者要接入clue，要做4件事

1.到https://clue.alibaba-inc.com新建项目

![img](https://img.alicdn.com/tfs/TB1imtBmSzqK1RjSZPxXXc4tVXa-1013-485.png)

![img](https://img.alicdn.com/tfs/TB1BK40mFzqK1RjSZFvXXcB7VXa-825-336.png)

2.到该项目的设置中，新建自定义监控

![img](https://img.alicdn.com/tfs/TB1fM81mSzqK1RjSZFHXXb3CpXa-636-684.png)

3.把track.js放入本地lib文件夹下，文件cdn地址：https://g.alicdn.com/dt/tracker/4.0.3/tracker.Tracker.js

注意：文件开头要加上

```
//#snippet;
//#exclude(define,before)
```
4.在boot.js上添加如下代码
```javascript
const tracker = new Tracker({
    pid: porjectName, //必填项
    uidResolver: () => {
        return user.userId;
    } //用户id，不是必填项
});
```
在Magix.boot里的error中加上
```javascript
tracker.logError(e, {
    code: 11
});
```
![img](https://img.alicdn.com/tfs/TB1I1NEmPTpK1RjSZKPXXa3UpXa-1212-1082.png)
##### magix1 or magix2版本
开发者要接入clue，要做4件事

1.到https://clue.alibaba-inc.com新建项目

![img](https://img.alicdn.com/tfs/TB1imtBmSzqK1RjSZPxXXc4tVXa-1013-485.png)

![img](https://img.alicdn.com/tfs/TB1BK40mFzqK1RjSZFvXXcB7VXa-825-336.png)

2.到该项目的设置中，新建自定义监控

![img](https://img.alicdn.com/tfs/TB1fM81mSzqK1RjSZFHXXb3CpXa-636-684.png)

3.在项目入口文件加上

```javascript
<script type="text/javascript" src="https://g.alicdn.com/dt/tracker/4.0.3/??tracker.Tracker.js,tracker.interfaceTrackerPlugin.js,tracker.performanceTrackerPlugin.js" crossorigin></script>
```

4.在boot.js添加如下代码

```javascript
var tracker = new Tracker({
    pid: porjectName, //必填项
    uidResolver: () => {
        return user.userId;
    } //用户id，不是必填项
});
```
在Magix.start里加上
```javascript
execError: function (e) {
    tracker.logError(e, {
        code: 11
    });
}
```
![img](https://img.alicdn.com/tfs/TB1qd42mMHqK1RjSZFkXXX.WFXa-1346-972.png)