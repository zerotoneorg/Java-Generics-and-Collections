(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{559:function(n,o){n.exports="\x3c!--\ntitle: 安装 \nsort: 2\n--\x3e\n\n入门教程是，简单的一步一步配置一个工程，如果你等不急了，可以通过[快速开始](#/introduce/init-project)生成一个工程。\n\n## 全局安装\n\n并不推荐这种方法，直接 `运行` 和 `编译` 网站，时间长了，就不知道文档是使用什么版本的 `rdoc` 生成的。全局安装目的，是通过命令 `rdoc init my-project` 初始化一个工程。\n\n```shell\n$ npm install rdoc -g\n## /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js\n## /usr/local/bin/rdoc-cli -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js\n```\n\n⚠️ 提供了一个 `rdoc-cli` 命令，跟 `rdoc` 命令是一样的，目的是解决 `Mac` 系统自带的 `Ruby` 命令 `rdoc` 冲突。\n\n## 开发模式安装\n\n这里是通过开发调试模式安装，因为没有开源，所以没有提供`npm install`方式安装\n\n```shell\n$ git clone https://github.com/jaywcjlove/rdoc.git\n$ cd rdoc\n\n## 全局命令安装使用\n$ npm link\n## updated 2 packages in 8.343s\n## /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js\n## /usr/local/lib/node_modules/rdoc -> /Users/****/rdoc\n\n$ cd doc-example # 进入项目，已经配置好的 rdoc 工程\n$ npm link rdoc\n```\n\n上面方法也是开发模式运行方法。\n"}}]);