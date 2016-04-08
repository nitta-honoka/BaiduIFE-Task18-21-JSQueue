/**
 * Created by honoka on 16/4/8.
 */
(function () {
    'use strict';
    //事件辅助对象
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        }
    };
    //将点击事件代理在输入区域父元素上
    var body = document.getElementById('input-area');
    var val = document.getElementById('num');
    var num;
    EventUtil.addHandler(body, "click", function (event) {
        num = val.value;
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        switch (target.id) {
            case "in-left":
                console.log(num);
                break;
            case "in-right":
                console.log("in-right");
                break;
            case "rm-left":
                console.log("rm-left");
                break;
            case "rm-right":
                console.log("rm-right");
                break;
        }
    });
})();

