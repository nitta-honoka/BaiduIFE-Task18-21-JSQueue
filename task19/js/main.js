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
          divElement.style.height = num + 'px';
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
        },
        verifyNum: function (num) {
            if (num < 10 || num > 100) {
                alert("请输入10至100内的数值");
                return false;
            } else {
                return true;
            }
        },
        randomNum: function () {
            return Math.floor(Math.random() * 91 + 10);
        }
    };
    //将点击事件代理在输入区域父元素上
    var body = document.getElementById('input-area');
    var val = document.getElementById('num');
    var i = 0; //记录队列元素数量
    EventUtil.addHandler(body, "click", function (event) {
        var num = val.value;
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var numEle = DomUtil.create(num, 'box');
        switch (target.id) {
            case "in-left":
                if (i > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    if (DomUtil.verifyNum(num)) {
                        DomUtil.insertEle('container', numEle, 'left');
                        i ++;
                    }
                }
                break;
            case "in-right":
                if (i > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    if (DomUtil.verifyNum(num)) {
                        DomUtil.insertEle('container', numEle, 'right');
                        i ++;
                    }
                }
                break;
            case "rm-left":
                DomUtil.removeEle('container', 'left');
                i --;
                break;
            case "rm-right":
                DomUtil.removeEle('container', 'right');
                i --;
                break;
            case "random":
                var j = 0;
                if (i > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    while(j < 60 - i) {
                        var ranNum = DomUtil.randomNum();
                        var ranEle = DomUtil.create(ranNum, 'box');
                        DomUtil.insertEle('container', ranEle, 'right');
                        i ++;
                    }
                }
                console.log(i);
                break;
        }
    });
})();

