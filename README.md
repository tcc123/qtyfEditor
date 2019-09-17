
# qtyfEditor

## 介绍

**qtyfEditor** —— 基于wangEditor进行二次开发的轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。

- 官网：[www.qtyfEditor.com](http://www.qtyfeditor.com/)
- 文档：[www.kancloud.cn/qtyffupeng/qtyfeditor3/332599](http://www.kancloud.cn/qtyffupeng/qtyfeditor3/332599)
- 源码：[github.com/huoalong/qtyfEditor](https://github.com/huoalong/qtyfEditor) （欢迎 star）


## 下载

- 直接下载：[https://github.com/huoalong/qtyfEditor/releases](https://github.com/huoalong/qtyfEditor/releases)
- 使用`npm`下载：`npm install qtyfeditor` （注意 `qtyfeditor` 全部是**小写字母**）
- 使用`bower`下载：`bower install qtyfEditor` （前提保证电脑已安装了`bower`）
- 使用CDN：[//unpkg.com/qtyfeditor/release/qtyfEditor.min.js](https://unpkg.com/qtyfeditor/release/qtyfEditor.min.js)


## 使用

```javascript
var E = window.qtyfEditor
var editor = new E('#div1')
editor.create()
```


## 运行 demo

- 下载源码 `git clone git@github.com:huoalong/qtyfEditor.git`
- 安装或者升级最新版本 node（最低`v6.x.x`）
- 进入目录，安装依赖包 `cd qtyfEditor && npm i`
- 安装包完成之后，windows 用户运行`npm run win-example`，Mac 用户运行`npm run example`
- 打开浏览器访问[localhost:3000/index.html](http://localhost:3000/index.html)


### 提问

注意，作者只受理以下几种提问方式，其他方式直接忽略

- 直接在 [github issues](https://github.com/huoalong/qtyfEditor/issues) 提交问题
- 去[知乎](https://www.zhihu.com/)提问，并邀请[作者](https://www.zhihu.com/people/qtyf-fu-peng-54/activities)来回答
- 去[segmentfault](https://segmentfault.com)提问，并邀请[作者](https://segmentfault.com/u/huoalong)来回答

每次升级版本修复的问题记录在[这里](./ISSUE.md)

## 相关文章

- 《[深入理解javascript原型和闭包系列](http://www.cnblogs.com/huoalong/p/4001284.html)》《[深入理解javascript异步系列](https://github.com/huoalong/js-async-tutorial)》《[换个思路学习nodejs](https://github.com/huoalong/node-tutorial)》《[CSS知多少](http://www.cnblogs.com/huoalong/p/4325007.html)》 
- 《[前端JS高级面试](https://coding.imooc.com/class/190.html)》《[前端JS基础面试题](http://coding.imooc.com/class/115.html)》《[React.js模拟大众点评webapp](http://coding.imooc.com/class/99.html)》《[zepto设计与源码分析](http://www.imooc.com/learn/745)》《[json2.js源码解读](http://study.163.com/course/courseMain.htm?courseId=691008)》

