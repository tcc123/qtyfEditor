/*
    menu - video
*/
import $ from '../../util/dom-core.js'
import { getRandom } from '../../util/util.js'
import Panel from '../panel.js'

// 构造函数
function Video(editor) {
    this.editor = editor
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-play"></i></div>')
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Video.prototype = {
    constructor: Video,

    onClick: function () {
        this._createPanel()
    },

    _createPanel: function () {
        // 创建 id
        const textValId = getRandom('text-val')
        const btnId = getRandom('btn')

        // 创建 panel
        const panel = new Panel(this, {
            width: 350,
            // 一个 panel 多个 tab
            tabs: [
                {
                    // 标题
                    title: '插入视频',
                    // 模板
                    tpl: `<div>
                        <input id="${textValId}" type="text" class="block" placeholder="格式如：<iframe src=... ><\/iframe>"/>
                        <div class="w-e-button-container">
                            <button id="${btnId}" class="right">插入</button>
                        </div>
                    </div>`,
                    // 事件绑定
                    events: [
                        {
                            selector: '#' + btnId,
                            type: 'click',
                            fn: () => {
                                const $text = $('#' + textValId)
                                const val = $text.val().trim()

                                // 测试用视频地址
                                // <iframe height=498 width=510 src='http://player.youku.com/embed/XMjcwMzc3MzM3Mg==' frameborder=0 'allowfullscreen'></iframe>

                                if (val) {
                                    // 插入视频
                                    this._insert(val)
                                }

                                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                                return true
                            }
                        }
                    ]
                } // first tab end
            ] // tabs end
        }) // panel end

        // 显示 panel
        panel.show()

        // 记录属性
        this.panel = panel
    },

    // 插入视频
    _insert: function (val) {
        const editor = this.editor
        editor.cmd.do('insertHTML', val + '<p><br></p>')
    }
}
/*

function Video(Vue, curEditor) {
    // 获取 wangEditor 构造函数和jquery
    var E = window.wangEditor;
    var $ = window.jQuery;
    // 当前的编辑实例和当前视频上绑定的事件,上传后返回的url
    var editor = curEditor;
    var $domEvent, $resultText, $curFileName;
    // 超时时间
    E.config.uploadTimeout = 60 * 60 * 1000;
    editor.config.uploadTimeout = 60 * 60 * 1000;
    // 用于存储上传回调事件
    editor.config.uploadVideoFns = {};
    editor.config.uploadVideoFns.ontimeout = (xhr) => {
        E.error('上传超时');
        throw xhr;
    };
    editor.config.uploadVideoFns.onerror = function (xhr) {
        alert('上传错误');
        throw xhr;
    };
    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id
        var menuId = 'huoalong';

        // check将检查菜单配置是否有该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }
        var lang = editor.config.lang;
        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '视频', // 菜单标题

            // 正常状态和选中状态下的dom对象，样式需要自定义
            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>'),
            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-play"></i></a>')
        });

        // 点击视频菜单将触发该事件
        menu.clickEvent = function (e) {
            menu.dropPanel.show();
            Object.keys(editor.menus).filter(e => e !== 'huoalong').map(key => editor.menus[key].dropPanel && editor.menus[key].dropPanel.hide());
        };
        ['link', 'table', 'insertcode'].map(key => {
            editor.menus[key].clickEvent = function() {
                editor.menus['huoalong'].dropPanel.hide();
                editor.menus['imgs'].dropPanel.hide();
                editor.menus['bgcolor'].dropPanel.hide();
                editor.menus['forecolor'].dropPanel.hide();
                editor.menus[key].dropPanel && editor.menus[key].dropPanel.show();
            }
        })
        //  点击图标异步加载表情并隐藏视频'emotion'
        editor.menus['emotion'].clickEvent = function(e) {
            menu.dropPanel.hide();
            let emotion = editor.menus['emotion'];
            let dropPanel = emotion.dropPanel;

            // -------------隐藏-------------
            if (dropPanel.isShowing) {
                dropPanel.hide();
                return;
            }

            // -------------显示-------------
            dropPanel.show();

            // 异步加载图片
            if (emotion.imgLoaded) {
                return;
            }
            $('.emotion-content-container').find('img').each(function () {
                var $img = $(this);
                var _src = $img.attr('_src');
                $img.on('error', function () {
                    E.error('加载不出表情图片 ' + _src);
                });
                $img.attr('src', _src);
                $img.removeAttr('_src');
            });
            emotion.imgLoaded = true;
        }
        // 视频 点击其他地方，不隐藏 dropPanel
        E.DropPanel.fn.initHideEvent = function () {
            var self = this;

            // 获取 panel elem
            var thisPanle = self.$panel.get(0);

            E.$body.on('click', function (e) {
                if (!self.isShowing) {
                    return;
                }
                var trigger = e.target;

                // 获取菜单elem
                var menu = self.menu;
                var menuDom;
                if (menu.selected) {
                    menuDom = menu.$domSelected.get(0);
                } else {
                    menuDom = menu.$domNormal.get(0);
                }

                if (menuDom === trigger || $.contains(menuDom, trigger)) {
                    // 说明由本菜单点击触发的
                    return;
                }

                if (thisPanle === trigger || $.contains(thisPanle, trigger)) {
                    // 说明由本panel点击触发的
                    return;
                }

                // 其他情况，不隐藏 panel
                // self.hide();
            });
            // 滚动放缩页面都不隐藏panel
            E.$window.scroll(function (e) {

            });

            E.$window.on('resize', function () {

            });
        };
        // 创建 panel 内容
        var $content = $('<div></div>');

        // 上传视频 content
        var $contentContainer = $('<div id="container" class="content-container"></div>');
        var $uploadContentVideo = $('<div class="content"><h1 style="margin-bottom: 20px;">上传视频</h1></div>');
        $contentContainer.append($uploadContentVideo);
        
        var $sizeContainer = $('<div style="margin:20px 10px;">格式设置: &nbsp;&nbsp;</div>');
        var $widthInput = $('<input type="text" value="380" style="width:50px;text-align:center;"/>');
        var $heightInput = $('<input type="text" value="215" style="width:50px;text-align:center;"/>');
        $sizeContainer.append('<span> ' + lang.width + ' </span>')
                    .append($widthInput)
                    .append('<span> px &nbsp;&nbsp;&nbsp;</span>')
                    .append('<span> ' + lang.height + ' </span>')
                    .append($heightInput)
                    .append('<span> px </span>');
        // 初始化视频的宽高
        E.$width = 380;
        E.$height = 215;
        var $btnContainer = $('<div></div>');
        var $btnSubmit = $('<button class="right">' + '确认' + '</button>');
        var $btnCancel = $('<button class="right gray">' + '关闭' + '</button>');
        $btnContainer.append($btnSubmit).append($btnCancel);
        $content.append($contentContainer).append($sizeContainer).append($btnContainer);

        // 取消按钮
        $btnCancel.click(function (e) {
            e.preventDefault();
            $widthInput.val(380);
            $heightInput.val(215);
            $('#filename').remove();
            $curFileName = null;
            $resultText = null;
            menu.dropPanel.hide();
            E.$width = 380;
            E.$height = 215;
            $('#uploadIcon').css('display', 'block');
        });
        // 确定
        $btnSubmit.click(function (e) {
            e.preventDefault();
            $curFileName = null;
            $('#filename').remove();
            $('#uploadIcon').css('display', 'block');
            if (!$resultText) {
                // 无上传内容
                Vue.$message({type: 'warning', message: '您没有上传任何视频!'});
                $widthInput.val(380);
                $heightInput.val(215);
                menu.dropPanel.hide();
                return;
            }
            // 将结果插入编辑器
            insertVideo($resultText, $domEvent)
            $resultText = null;
            $widthInput.val(380);
            $heightInput.val(215);
        });
        // -------- 插入视频的方法 --------
        function insertVideo(src, event) {
            var width = E.$width || 380;
            var height = E.$height || 215;
            var video = '<video src="'+ src +'" controls="controls" style="width: '+ width +'px; height: '+ height +'px">your browser does not support the video tag</video>';
            editor.command(event, 'insertHtml', video);
        }
        // 创建panel
        menu.dropPanel = new E.DropPanel(editor, menu, {
            $content: $content,
            width: 400
        });
        // 增加到editor对象中
        editor.menus[menuId] = menu;

        // 监听设置的宽高的变化
        $widthInput.change(function(e) {
            E.$width = e.target.value;
        });
        $heightInput.change(function(e) {
            E.$height = e.target.value;
        });

        // 判断用户是否配置了上传视频
        editor.ready(function () {
            var config = editor.config;
            var uploadVideoUrl = config.uploadVideoUrl;
            var customUpload = config.customUpload;
            var linkVideo = config.hideLinkVideo;
            var $uploadVideoPanel;

            if (uploadVideoUrl || customUpload) {
                // 第一，暴露出 $uploadContent 以便用户自定义 ！！！重要
                editor.$uploadContentVideo = $uploadContentVideo;

                // 第二，绑定tab切换事件
                // tabToggle();

                if (linkVideo) {
                    // 隐藏网络视频
                    hideLinkVideo();
                }
            }
            // } else {
            //     // 未配置上传视频功能
            //     hideUploadVideo();
            // }

            // 点击 $uploadContent 立即隐藏 dropPanel
            // 为了兼容IE8、9的上传，因为IE8、9使用 modal 上传
            // 这里使用异步，为了不妨碍高级浏览器通过点击 $uploadContent 选择文件
            // function hidePanel() {
            //     menu.dropPanel.hide();
            // }
            // $uploadContentVideo.click(function () {
            //     setTimeout(hidePanel);
            // });
        });
    });

    // 上传视频插件
    if (!window.FileReader || !window.FormData) {
        // 如果不支持html5的文档操作，直接返回
        return;
    }

    // 构造函数
    var UploadVideoFile = function (opt) {
        this.editor = opt.editor;
        this.uploadUrl = opt.uploadUrl;
        this.timeout = opt.timeout;
        this.fileAccept = opt.fileAccept;
        this.multiple = true;
    };
    UploadVideoFile.fn = UploadVideoFile.prototype;
    // clear
    UploadVideoFile.fn.clear = function () {
        this.$input.val('');
        E.log('input value 已清空');
    };
    // 渲染
    UploadVideoFile.fn.render = function () {
        var self = this;
        if (self._hasRender) {
            // 不要重复渲染
            return;
        }

        E.log('渲染dom');

        var fileAccept = self.fileAccept;
        var acceptTpl = fileAccept ? 'accept="' + fileAccept + '"' : '';
        var multiple = self.multiple;
        var multipleTpl = multiple ? 'multiple="multiple"' : '';
        var $input = $('<input type="file" ' + acceptTpl + ' ' + multipleTpl + '/>');
        var $container = $('<div style="display:none;"></div>');

        $container.append($input);
        E.$body.append($container);

        // onchange 事件
        $input.on('change', function (e) {
            self.selected(e, $input.get(0));
        });

        // 记录对象数据
        self.$input = $input;

        // 记录
        self._hasRender = true;
    };

    // 选择
    UploadVideoFile.fn.selectFiles = function () {
        var self = this;
        E.log('使用 html5 方式上传');

        // 先渲染
        self.render();

        // 选择
        E.log('选择文件');
        self.$input.click();
    };

    // 选中文件之后
    UploadVideoFile.fn.selected = function (e, input) {
        var self = this;
        var files = input.files || [];
        if (files.length === 0) {
            return;
        }

        E.log('选中 ' + files.length + ' 个文件');

        // 遍历选中的文件，预览、上传
        $.each(files, function (key, value) {
            self.upload(value);
        });
    };

    // 上传单个文件
    UploadVideoFile.fn.upload = function (file) {
        var self = this;
        var filename = file.name || '';
        var fileType = file.type || '';
        var uploadVideoFns = editor.config.uploadVideoFns;
        var UploadVideoFileName = editor.config.uploadVideoFileName || 'wangEditorH5File';
        var onload = uploadVideoFns.onload;
        var ontimeout = uploadVideoFns.ontimeout;
        var onerror = uploadVideoFns.onerror;
        var reader = new FileReader();

        if (!onload || !ontimeout || !onerror) {
            E.error('请为编辑器配置上传视频的 onload ontimeout onerror 回调事件');
            return;
        }


        E.log('开始执行 ' + filename + ' 文件的上传');

        // 清空 input 数据
        function clearInput() {
            self.clear();
        }

        // onload事件
        reader.onload = function (e) {
            E.log('已读取' + filename + '文件');
            $domEvent = e;
            var base64 = e.target.result || this.result;
            editor.xhrUploadVideo({
                event: e,
                filename: filename,
                base64: base64,
                fileType: fileType,
                name: UploadVideoFileName,
                loadfn: function (resultText, xhr) {
                    $curFileName = filename;
                    clearInput();
                    // 执行配置中的方法
                    var editor = this;
                    onload.call(editor, resultText, xhr);
                },
                errorfn: function (xhr) {
                    clearInput();
                    if (E.isOnWebsite) {
                        alert('wangEditor官网暂时没有服务端，因此报错。实际项目中不会发生');
                    }
                    // 执行配置中的方法
                    var editor = this;
                    onerror.call(editor, xhr);
                },
                timeoutfn: function (xhr) {
                    clearInput();
                    if (E.isOnWebsite) {
                        alert('wangEditor官网暂时没有服务端，因此超时。实际项目中不会发生');
                    }
                    // 执行配置中的方法
                    var editor = this;
                    ontimeout(editor, xhr);
                }
            });
        };

        // 开始取文件
        reader.readAsDataURL(file);
    };

    // 暴露给 E
    E.UploadVideoFile = UploadVideoFile;
    E.plugin(function () {
        var editor = curEditor;
        var config = editor.config;
        var uploadVideoUrl = config.uploadVideoUrl;
        var uploadTimeout = config.uploadTimeout;
        var event;
        var fns = config.uploadVideoFns;
        var onload = fns.onload;
        var ontimeout = fns.ontimeout;
        var onerror = fns.onerror;

        if (!uploadVideoUrl) {
            return;
        }

        // 获取editor的上传dom
        var $uploadContentVideo = editor.$uploadContentVideo;
        if (!$uploadContentVideo) {
            return;
        }

        // -------- 定义load函数 --------
        fns.onload = function (resultText, xhr) {
            E.log('上传结束，返回结果为 ' + resultText);
            if (resultText.indexOf('error') !== -1 || resultText.indexOf('Error') !== -1) {
                // 提示错误
                // E.warn('上传失败：' + resultText.split('|')[1]);
                $curFileName = null;
                Vue.$message({type: 'error', message: '上传失败!'});
            } else {
                E.log('上传成功，即将插入编辑区域，结果为：' + resultText);
                $resultText = resultText;
                $('#uploadIcon').css('display', 'none');
                $('#container').append(`<p id="filename">&nbsp;&nbsp;${$curFileName}</p>`);
                Vue.$message({type: 'success', message: '上传完成!'});
            }

        };
        // -------- 将以base64的视频url数据转换为Blob --------
        function convertBase64UrlToBlob(urlData, filetype){
            //去掉url的头，并转换为byte
            var bytes = window.atob(urlData.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            var i;
            for (i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {type : filetype});
        }

        // -------- onprogress 事件 --------
        function updateProgress(e) {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                editor.showUploadProgress(percentComplete * 100);
            }
        }
        // -------- xhr 上传视频 --------
        editor.xhrUploadVideo = function (opt) {
            // opt 数据
            var event = opt.event;
            var fileName = opt.filename || '';
            var base64 = opt.base64;
            var fileType = opt.fileType || 'video/mp4'; // 无扩展名则默认使用 png
            var name = opt.name || 'wangEditor_upload_file';
            var loadfn = opt.loadfn || onload;
            var errorfn = opt.errorfn || onerror;
            var timeoutfn = opt.timeoutfn || ontimeout;

            // 上传参数（如 token）
            var params = editor.config.uploadParams || {};

            // headers
            var headers = editor.config.uploadHeaders || {};

            // 获取文件扩展名
            var fileExt = 'mp4';  // 默认为 png
            if (fileName.indexOf('.') > 0) {
                // 原来的文件名有扩展名
                fileExt = fileName.slice(fileName.lastIndexOf('.') - fileName.length + 1);
            } else if (fileType.indexOf('/') > 0 && fileType.split('/')[1]) {
                // 文件名没有扩展名，通过类型获取，如从 'video/mp4' 取 'mp4'
                fileExt = fileType.split('/')[1];
            }

            // ------------ begin 预览模拟上传 ------------
            if (E.isOnWebsite) {
                E.log('预览模拟上传');
                insertVideo(base64, event);
                return;
            }
            // ------------ end 预览模拟上传 ------------

            // 变量声明
            var xhr = new XMLHttpRequest();
            var timeoutId;
            var src;
            var formData = new FormData();

            // 超时处理
            function timeoutCallback() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (xhr && xhr.abort) {
                    xhr.abort();
                }

                // 超时了就阻止默认行为
                event.preventDefault();

                // 执行回调函数，提示什么内容，都应该在回调函数中定义
                timeoutfn && timeoutfn.call(editor, xhr);

                // 隐藏进度条
                editor.hideUploadProgress();
            }

            xhr.onload = function () {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // 执行load函数，任何操作，都应该在load函数中定义
                loadfn && loadfn.call(editor, xhr.responseText, xhr);

                // 隐藏进度条
                // editor.hideUploadProgress();
            };
            xhr.onerror = function () {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // 超时了就阻止默认行为
                event.preventDefault();

                // 执行error函数，错误提示，应该在error函数中定义
                errorfn && errorfn.call(editor, xhr);

                // 隐藏进度条
                editor.hideUploadProgress();
            };
            // xhr.onprogress = updateProgress;
            xhr.upload.onprogress = updateProgress;

            // 填充数据
            formData.append(name, convertBase64UrlToBlob(base64, fileType), E.random() + '.' + fileExt);

            // 添加参数
            $.each(params, function (key, value) {
                formData.append(key, value);
            });

            // 开始上传
            xhr.open('POST', uploadVideoUrl, true);
            // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 将参数解析成传统form的方式上传

            // 修改自定义配置的headers
            $.each(headers, function (key, value) {
                xhr.setRequestHeader(key, value);
            });

            // 跨域上传时，传cookie
            xhr.withCredentials = editor.config.withCredentials || true;

            // 发送数据
            xhr.send(formData);
            timeoutId = setTimeout(timeoutCallback, uploadTimeout);

            E.log('开始上传...并开始超时计算');
        };

        // 自定义UI，并添加到上传dom节点上
        var $uploadIcon = $('<div id="uploadIcon"><div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div></div>');
        $uploadContentVideo.append($uploadIcon);
        // ---------- 构建上传对象 ----------
        var upfile = new E.UploadVideoFile({
            editor: editor,
            uploadUrl: uploadVideoUrl,
            timeout: uploadTimeout,
            fileAccept: 'video/mp4'    // 只允许选择视频 
        });

        // 选择本地文件，上传
        $uploadIcon.click(function (e) {
            event = e;
            upfile.selectFiles();
        });
    });
}
*/
export default Video