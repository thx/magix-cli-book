/**
 * 请确保在master分支下执行本命令
 * master分支存的是文档 markdown 源码
 * gh-pages存的是编译后的文档，对接github pages
 * 执行 node build 会自动提交master代码并切换到gh-pages分支，删除旧文件，从_book里复制新编译的文件到根目录下
 */
require('gitbook-to-gh-pages')()
