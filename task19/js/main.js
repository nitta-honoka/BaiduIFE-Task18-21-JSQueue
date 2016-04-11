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
        },
        bubbleSort: function (data) {
            var temp;
            var len = data.length;
            for (var i = 0; i < len - 1; i ++) {
                for (var j = len - 1; j >= 1; j --) {
                    if (data[j] < data[j - 1]) {
                        temp = data[j];
                        data[j] = data[j - 1];
                        data[j - 1] = temp;
                        DomUtil.paintEle('container', j, data, 'swap');
                    }
                    DomUtil.paintEle('container', j, data, 'no');
                }
            }
            return data;
        }
    };
    //DOM操作辅助对象
    var DomUtil = {
      create: function (num, className) {
          var divElement = document.createElement('div');
          divElement.style.height = num + 'px';
          divElement.className = className;
          divElement.numVal = num;
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
            var numReg = /^\s*\d+\s*$/g;
            if (!numReg.test(num)) {
                alert("请输入数值");
                input.focus();
                return false;
            } else {
                if (num < 10 || num > 100) {
                    alert("请输入10至100内的数值");
                    input.focus();
                    return false;
                } else {
                    return true;
                }
            }
        },
        randomNum: function () {
            return Math.floor(Math.random() * 91 + 10);
        },
        paintEle: function (containName, index, data, type) {
            var containChild = document.getElementById(containName).childNodes;
            if (type === 'swap') {
                containChild[index].style.backgroundColor = '#37FF6F';
                containChild[index - 1].style.backgroundColor = '#37FF6F';
                containChild[index].style.height = data[index] + 'px';
                containChild[index - 1].style.height = data[index - 1] + 'px';
            }
            if (type === 'no') {
                containChild[index].style.backgroundColor = '#f41c29';
                containChild[index - 1].style.backgroundColor = '#f41c29';
            }
        }
    };
    //将点击事件代理在输入区域父元素上
    var body = document.getElementById('input-area');
    var val = document.getElementById('num');
    var data = []; //记录队列元素
    EventUtil.addHandler(body, "click", function (event) {
        var num = val.value;
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var numEle = DomUtil.create(num, 'box');
        switch (target.id) {
            case "in-left":
                if (data.length > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    if (DomUtil.verifyNum(num)) {
                        data.push(num);
                        DomUtil.insertEle('container', numEle, 'left');
                    }
                }
                break;
            case "in-right":
                if (data.length > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    if (DomUtil.verifyNum(num)) {
                        data.push(num);
                        DomUtil.insertEle('container', numEle, 'right');
                    }
                }
                break;
            case "rm-left":
                DomUtil.removeEle('container', 'left');
                data.shift();
                break;
            case "rm-right":
                DomUtil.removeEle('container', 'right');
                data.pop();
                break;
            case "random":
                var j = 0;
                if (data.length > 60) {
                    alert("元素数量不能超过60个");
                } else {
                    while(j < 60 - data.length) {
                        var ranNum = DomUtil.randomNum();
                        var ranEle = DomUtil.create(ranNum, 'box');
                        DomUtil.insertEle('container', ranEle, 'right');
                        data.push(ranNum);
                    }
                }
                console.dir(data);
                break;
            case "sort":
                data = EventUtil.bubbleSort(data);
                console.dir(data);
        }
    });
})();

