

// 封装插件时为了避免变量冲突，变量名称冲突、函数名称重复、等问题
// 可以通过自运行函数将功能代码片段，将功能代码片段中的变量、函数保护起来，避免与全局环境冲突
(function ($) {
    // 参数options 指代轮播功能需要配置的信息(轮播的速度、是否自动轮播)
    $.fn.zySliding = function (options) {
        return $(this).each(function (index, domEle) {
            // 轮播的具体代码片段
            // 参数一：将当前被遍历到的元素容器传入到轮播的核心代码片段中
            // 参数二：轮播的配置
            Slide(domEle, options);

        });
    }
    var Slide = function (domELe, options) {
        // 首先接收当前需要执行轮播的容器
        var $domEle = $(domELe);
        // 设置每个li的样式
        // 宽度、高度、透明度、层次、top、left
        var style = [
            { ZIndex: 1, opacity: 0.4, width: 110, height: 180, left: 60, top: 60 },
            { ZIndex: 2, opacity: 0.6, width: 140, height: 210, left: 0, top: 45 },
            { ZIndex: 3, opacity: 0.8, width: 170, height: 250, left: 128, top: 25 },
            { ZIndex: 4, opacity: 1, width: 200, height: 300, left: 225, top: 0 },
            { ZIndex: 3, opacity: 0.8, width: 170, height: 250, left: 352, top: 25 },
            { ZIndex: 2, opacity: 0.6, width: 140, height: 210, left: 510, top: 45 },
            { ZIndex: 1, opacity: 0.4, width: 110, height: 180, left: 470, top: 60 }
        ];
        // 定义一个变量来处理轮播速度、动画时间
        var settings = {
            speed: 2000,
            duration: 1000,
            auto: true
        }
        // 通过$.extend()来实现对象中属性值的合并
        settings = $.extend(settings, options);
        function move() {
            // var lis = $(".zySlide li");
            var lis = $domEle.find("li");
            lis.each(function (index, domELe) {
                // 获取数组中的对应的样式
                var state = style[index];
                $(domELe).stop().animate(state, settings.duration).css("z-index", state.ZIndex);

            });
        }
        move();
        // 实现轮播效果
        // 每隔一秒 整体移动一次
        // 遍历每一个li 重新以动画的形式重新展示新的样式
        function next() {
            // 将第一个数组对象移除并返回移除的对象
            // 再将移除的对象往数组的尾部新增到数组的尾部
            style.push(style.shift());
            move();
        }
        function prev() {
            style.unshift(style.pop());
            move();
        }
        var timer = null;
        function autoPlay() {
            timer = setInterval(function () {
                next();
            }, settings.speed);
        }
        if (settings.auto == true) {
            autoPlay();
        }


        $domEle.find("span.zy_next,span.zy_prev").hover(function () {
            clearInterval(timer);
            timer = null;
        }, function () {
            if (settings.auto == true) {
                autoPlay();
            }
        });

        $domEle.find("span.zy_next").click(function () {
            next();
        })
        $domEle.find("span.zy_prev").click(function () {
            prev();
        })
    }
})(jQuery);


