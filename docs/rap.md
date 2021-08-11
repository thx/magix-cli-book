#### Magix 套件与 RAP 
[RAP](https://rap2.alibaba-inc.com) 是一个接口模拟管理平台，Magix 套件在执行 `mm dev` 时接口会请求到 RAP 平台返回模拟数据，如此只需后端在 RAP 上定义并录入接口完毕之后，前端就可以直接在本地进行调试开发，无须等待真实接口实现。

#### 具体配置
套件配置 `magixCliConfig` 中与 RAP 相关的配置有
- `rapVersion` 默认为 2 (历史存在过版本 1)
- `rapProjectId` RAP 平台的项目id，**mm init magix** 初始化项目时会自动生成，无须手动配置

#### 配套命令 mm models
`mm models` 命令会从 RAP 平台对应项目中拉一份全量接口数据在本地生成一个接口配置文件，一般位于`src/[yourProjectName]/services/models.js`，如：

<img width="700" src="https://img.alicdn.com/imgextra/i4/O1CN01qBD4Fd1hZKDW7611h_!!6000000004291-2-tps-1582-1306.png"> 

业务中需要请求接口的地方直接 fetch 对应接口 name 即可，示例如下：

```javascript
async getData() {
  const model = await this.fetch({
    name: 'api_tag_topic_list_get',
    params: {}
  })
}

```

> 需要注意的是，我们约定项目的接口文件 `model.js` 文件与 RAP 平台强绑定，所以务必确保 RAP 平台接口正确，如果 RAP 平台接口有修改或删除动作，本地执行 `mm models` 同步接口时会给出警示，请确认无误后再同步

#### 特殊接口规则 
如果接口路径里有动态 id 的情形，如 `api/tag/topic/12345`（RAP 平台配置接口地址为: `api/tag/topic/:id`），则需要配置 `pathMap` 对象，用来将换占位符替换为真实的id，示例如下：

```javascript
async getData() {
  const model = await this.fetch({
    name: 'api_tag_topic_$id_get',
    pathMap: {
      ':id': id
    }
  })
}

```