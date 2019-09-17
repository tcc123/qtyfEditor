# 使用模块定义

qtyfEditor 除了直接使用`<script>`引用之外，还支持`AMD`和`CommonJS`的引用方式。

## AMD

以`require.js`为例演示

先创建`main.js`，代码为

```javascript
require(['/qtyfEditor.min.js'], function (E) {
    var editor = new E('#editor')
    editor.create()
})
```

然后创建页面，代码为

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>qtyfEditor demo</title>
</head>
<body>
    <div id="editor">
        <p>欢迎使用 qtyfEditor 富文本编辑器</p>
    </div>

    <script data-main="./main.js" src="//cdn.bootcss.com/require.js/2.3.3/require.js"></script>
</body>
</html>
```

## CommonJS

可以使用`npm install qtyfeditor`安装（注意，这里`qtyfeditor`全是**小写字母**）

```javascript
// 引用
var E = require('qtyfeditor')  // 使用 npm 安装
var E = require('/qtyfEditor.min.js')  // 使用下载的源码

// 创建编辑器
var editor = new E('#editor')
editor.create()
```
