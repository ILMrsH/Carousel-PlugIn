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
        function move() {
            var lis = $("#box li");
            lis.each(function (index, domELe) {
                // 获取数组中的对应的样式
                var state = style[index];
                $(domELe).stop().animate(state, 1000).css("z-index", state.ZIndex);

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
            }, 2000);
        }
        autoPlay();

        $("span").hover(function () {
            clearInterval(timer);
            timer = null;
        }, function () {
            autoPlay();
        });

        $("span.next").click(function () {
            next();
        })
        $("span.prev").click(function () {
            prev();
        })
