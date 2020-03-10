
### 目前开发发布流程

1. master下执行 `rmx createDaily` 自动创建开发分支
2. 在开发分支下 `rmx daily` 重复发布日常环境
3. 日常开发完毕，将日常分支合并到 master，在master下，执行 `rmx publish`，以时间戳形式发布到线上cdn环境

### 存在的问题

1. 目前的 `rmx createDaily` 固定生成如 `daily/x.x.x`格式分支，没有语义化
2. `rmx publish` 需要先把开发分支的代码合到master，才能在master下执行，违背直觉且操作繁琐
3. 目前 `rmx publish` 是从master切时间戳分支来进行发布，与原来开发分支割离，久而久之会导致开发分支冗余，很容易就达到DEF发布的上限(40个迭代分支)


### 完善后的新流程

1. master下执行 `rmx createDaily` ，填写完问答后，自动创建语义化分支 (如`feat-project2/20190410.200637.151`，不能使用中文名)

<img src="https://img.alicdn.com/tfs/TB1SqXAQrvpK1RjSZPiXXbmwXXa-1094-252.jpg" width="70%">

> DEF云构建已支持语义化分支名称，不再限于daily/x.x.x形式，详见 https://work.def.alibaba-inc.com/doc/branch_name

2. 在语义化的开发分支下执行 `rmx daily`，重复发布日常环境，这步与原来保持一致
3. 需求开发完毕后，直接在当前开发分支下执行 `rmx publish`，将当前分支发布到cdn环境，发布完毕删除该分支，并checkout到master分支
> 这样便可以解决DEF平台上未发布的分支不能超过40条的限制，同时也防止项目久了日常分支会越来越冗余的问题
