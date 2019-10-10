
# 1. 介绍

**qtyfEditor**——轻量级web富文本编辑器，配置方便，使用简单</b>。支持IE8+浏览器。

* 软件官网：[qtyfEditor.github.io](http://qtyfeditor.github.io/)
* demo演示：[qtyfEditor.github.io](http://qtyfeditor.github.io/)
* 文档：[http://www.kancloud.cn/qtyffupeng/qtyfeditor2/113961](http://www.kancloud.cn/qtyffupeng/qtyfeditor2/113961)

![](http://images2015.cnblogs.com/blog/138012/201509/138012-20150910004209122-1645253022.png)

# 2. 下载

 - 点击 [https://github.com/qtyffupeng1988/qtyfEditor/releases](https://github.com/qtyffupeng1988/qtyfEditor/releases) 下载最新版
 - 使用`git`下载： `git clone https://github.com/qtyffupeng1988/qtyfEditor.git`
 - 使用`npm`下载: `npm install qtyfeditor` （注意 `qtyfeditor` 全部是**小写字母**）
 - 使用`bower`下载：`bower install qtyfEditor` （前提保证电脑已安装了`bower`）

# 3. 使用

引用`qtyfEditor.css`、`jquery.js`和`qtyfEditor.js`之后，即可简单生成富文本编辑器，简单易用。
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>qtyfEditor</title>
    <link rel="stylesheet" type="text/css" href="../dist/css/qtyfEditor.min.css">
    <style type="text/css">
        #div1 {
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
    <div id="div1">
        <p>请输入内容...</p>
    </div>

    <script type="text/javascript" src="../dist/js/lib/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../dist/js/qtyfEditor.min.js"></script>
    <script type="text/javascript">
        $(function () {
            var editor = new qtyfEditor('div1');
            editor.create();
        });
    </script>
</body>
</html>
```

更多配置，可参见官网的文档页面：[http://www.kancloud.cn/qtyffupeng/qtyfeditor2/113961](http://www.kancloud.cn/qtyffupeng/qtyfeditor2/113961)

# 4. 本地运行demo

 - 确定本机安装了 `nodejs`，可使用 `node -v` 验证
 - 下载源码、解压，或者 `git clone https://github.com/qtyffupeng1988/qtyfEditor.git` 。**注意，`windows`系统必须下载到`C盘`运行**
 - 进入源码目录，找到 `server.js` 命令行中运行 `node server.js`
 - 打开浏览器访问 `http://localhost:8011/test/index.html`

# 5. 交流

交流QQ群：**164999061**
