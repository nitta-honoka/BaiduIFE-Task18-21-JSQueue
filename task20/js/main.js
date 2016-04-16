/**
 * Created by honoka on 16/4/8.
 */
(function () {
  // 事件辅助对象
  const EventUtil = {
    addHandler(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
      } else {
        element['on' + type] = handler;
      }
    },
    getEvent(event = window.event) {
      return event;
    },
    getTarget(event) {
      return event.target || event.srcElement;
    }
  };
  // DOM操作辅助对象
  const DomUtil = {
    create(num, className) {
      const divElement = document.createElement('div');
      divElement.innerText = num.toString();
      divElement.className = className;
      return divElement;
    },
    insertEle(containId, element, type) {
      const containEle = document.getElementById(containId);
      const childList = containEle.childNodes;
      if (type === 'left') {
        containEle.insertBefore(element, childList[0]);
      } else {
        containEle.appendChild(element);
      }
    },
    removeEle(containId, type) {
      const containEle = document.getElementById(containId);
      if (type === 'left') {
        containEle.removeChild(containEle.firstChild);
      } else {
        containEle.removeChild(containEle.lastChild);
      }
    }
  };
  // 将点击事件代理在输入区域父元素上
  const body = document.getElementById('input-area');
  const val = document.getElementById('text');
  const inputReg = /\r|\s|[,，、]/g;
  let textCon = [];
  EventUtil.addHandler(body, 'click', function (event = EventUtil.getEvent(event)) {
    const text = val.value.split(inputReg);
    const target = EventUtil.getTarget(event);
    switch (target.id) {
      case 'in-left':
        for (let i = 0; i < text.length; i++) {
          const textEle = DomUtil.create(text[i], 'box');
          DomUtil.insertEle('container', textEle, 'left');
          textCon.push(text[i]);
        }
        val.value = '';
        break;
      case 'in-right':
        for (let i = 0; i < text.length; i ++) {
          const textEle = DomUtil.create(text[i], 'box');
          DomUtil.insertEle('container', textEle, 'right');
          textCon.push(text[i]);
        }
        val.value = '';
        break;
      case 'rm-left':
        DomUtil.removeEle('container', 'left');
        textCon.shift();
        break;
      case 'rm-right':
        DomUtil.removeEle('container', 'right');
        textCon.pop();
        break;
    }
  });
})();

