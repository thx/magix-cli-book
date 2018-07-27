
### HTTP Header
* 所有接口必须支持 CORS
![10_26_03__03_08_2018.jpg | center | 774x296](https://gw.alipayobjects.com/zos/skylark/18ab5233-e6f0-4a8e-83bb-1202e483de47/2018/jpeg/f8667702-b8dd-4cd3-b842-4bad1f11dc60.jpeg "")
* Content-Type
    * html `text/html` 
    * json `application/json` 
    * form `application/x-www-form-urlencoded`

### 接口名称
| 名称 | 操作 | 例子 |
| --- | --- | --- |
| list | 获取列表 | api/***/list |
| add | 增加一条数据 | api/***/add |
| del | 删除一条数据 | api/***/del |
| mod | 修改一条数据 | api/***/mod |
| query | 查询某条数据 | api/***/query |
| login | 登录 | api/***/login |
| logout | 注销 | api/***/logout |
| --- | --- | --- |
| user | 用户相关 | api/user/*** |
| role | 权限相关 | api/role/*** |
| activity | 活动相关 | api/activity/*** |
| campaign | 计划相关 | api/campaign/*** |
| adgroup | 推广组相关 | api/adgroup/*** |
| adzone | 推广位(资源位)相关 | api/adzone/*** |
| creative | 创意相关 | api/creative/*** |
| media | 媒体相关 | api/media/*** |
| brand | 品牌相关 | api/brand/*** |
| crowd | 人群相关 | api/crowd/*** |


### 响应数据
字段名称规范

| 属性 | 类型 | 含义 | 是否必选 |
| --- | --- | --- | --- |
| data | Object | 数据对象 | 是 |
| list | Array | 数组 | 是 |
| detail | Object | 数据对象 | 是 |
| ext | Object | 数据对象 | 是 |
| ok | Boolean | 是否成功 | 是 |
| msg | String | 错误信息描述 | 失败时=是 |


#### 列表数据：
```json
{   //不支持扩展
    "data": {  //不支持扩展
        "list": [  //若无数据只能为[], 不能为null或者其他
        {},{},{},...  //每个对象代表一条数据
    ],
    "ext": {  //额外的信息 支持扩展
      "count":100,         //共几条
    }
    },
    "info": {  //不支持扩展            
    "ok":true,
      "msg":''
  }
}
```

#### 单条数据：
```json
{   //不支持扩展
    "data": {  //不支持扩展
        "detail": {  //若无数据只能为{}, 不能为null或者其他
            //填入返回的数据 
        }
    },
   "info": {  //不支持扩展
      "ok":true,
    "msg":''
  }
}
```
#### 下拉数据：
```json
{   
    "data": {  
        "list": [ 
      {
        "key": "bar",
        "value": "foo" 
        },
      ...
        ]
    },
   "info": { 
      "ok":true,
    "msg":''
  }
}
```

#### 树形或多重列表：
在列表基础上,在子节点属性上增加 `children`
```json
{   
    "data": {    
      "list": [
        {  
          "id" : '1',
        "name" : '名称1',
         "children":[{},{},...]
      },
      ...
    ]
  },
    "info":{ 
    "ok": true,
        "msg": ''
  }
}
```

#### 响应失败：
```json
{   //不支持扩展
    "data": {    //data只能为{}, 不能为null或者其他
    "ext":{  //额外的信息(可无)
      code: '301',
      ...
    }
  },
    "info":{  //不支持扩展
    "ok": false,
        "msg": '请求失败!'  //失败用于前端展现的信息
  }
}
```

### 请求参数
#### 列表数据：
```javascript
{   
  "pageNo":1,         //第几页         
    "pageSize":10       //每页几条
    "keyWord":'iphone'  //搜索关键字
  "keyWordType":      //搜索关键字类型
}
```

</br>

#### 单条数据：
```javascript
{   
  "id" : 1
}
```
</br>

### 常见属性
#### 统一命名
| 名称 | 定义 | 说明 |
| --- | --- | --- |
| oneTime | 单日 | 精确到天: 2018-07-01 精确到分秒: 2018-07-01 10: 30:00  |
| startTime | 开始时间| |
| endTime | 结束时间 | |
| createTime | 创建时间 | |
| updateTime | 更新时间 | |
| pageNo | 第几页  | |
| pageSize | 每页几条 | |
| keyWord | 搜索关键字 | |
| keyWordType | 搜索关键字类型 | |
| \*\*\* | | | |

#### 布尔值命名
以is开头命名 值只可选true或者false。
```json
{
  isStart: 'true',
    isEnd: 'false'
}
```
#### 其他命名
数组类型的命名, 用复数表示(除list外), 例如: medias, corwds
非数组不可用复数表示


### 边界值约定
> 当某些属性的值为「空」时，它可能是 `null`、`undefined`、`''`、0、`[]`、`{}`，执行结果变得不可预期；
> 当前端尝试执行类似 `foo.bar` 的代码时，可能因为 `foo` 是 `null` 或 `undefined` 而报错；此时前端需要编写针对性的兼容代码。

因此对响应数据约定以下规则：

| 类型 | 边界值 |
| --- | --- |
| Array | 没有时 只能=[]  不能是其他值|
| Object | 没有时 只能={}   不能是其他值|
| String | 没有时 只能=''   不能是其他值 |
| Boolean | 只可true or false  不能是其他值 |
