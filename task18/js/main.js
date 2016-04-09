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
    //DOM操作辅助对象
    var DomUtil = {
      create: function (num, className) {
          var divElement = document.createElement('div');
          divElement.innerText = num.toString();
          divElement.className = className;
          return divElement;
      },
        insertEle: function (containId, element, type) {
            var containEle = document.getElementById(containId);
            var childList = containEle.childNodes;
            if (type === 'left') {
                containEle.insertBefore(element, childList[0]);
            } else {
                containEle.appendChild(element);
            }
        },
        removeEle: function (containId, type) {
            var containEle = document.getElementById(containId);
            if (type === 'left') {
                containEle.removeChild(containEle.firstChild);
            } else {
                containEle.removeChild(containEle.lastChild);
            }
        }
    };
    //将点击事件代理在输入区域父元素上
    var body = document.getElementById('input-area');
    var val = document.getElementById('num');
    EventUtil.addHandler(body, "click", function (event) {
        var num = val.value;
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var numEle = DomUtil.create(num, 'box');
        switch (target.id) {
            case "in-left":
                DomUtil.insertEle('container', numEle, 'left');
                break;
            case "in-right":
                DomUtil.insertEle('container', numEle, 'right');
                break;
            case "rm-left":
                DomUtil.removeEle('container', 'left');
                break;
            case "rm-right":
                DomUtil.removeEle('container', 'right');
                break;
        }
    });
})();

