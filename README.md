
# 1. 介绍

**qtyfEditor**——基于wangEditor进行二次开发的轻量级web富文本编辑器，配置方便，使用简单</b>。支持IE8+浏览器。

# 2. 下载

 - 点击 [https://git.iyunxiao.com/huoalong/qtyfEditor]
 (https://git.iyunxiao.com/huoalong/qtyfEditor) 下载最新版
 - 使用`git`下载： `git clone git@git.iyunxiao.com:huoalong/qtyfEditor.git`
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

更多配置，可参见官网的文档页面：[http://www.kancloud.cn/wangfupeng/qtyfeditor2/113961](http://www.kancloud.cn/wangfupeng/wangeditor2/113961)
