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
      divElement.innerHTML = num;
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
    searchRender(textCon, str) {
      if (str !== null && str.length > 0) {
        if (textCon.match(str)) {
          textCon = textCon.replace(new RegExp(str, 'g'), `<span class="search-span">${str}</span>`);
          return `<div>${textCon}</div>`;
        }
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
  const search = document.getElementById('search');
  const inputReg = /\r|\s|[,，、]/g;
  const containEle = document.getElementById('container');
  let textCon = [];
  EventUtil.addHandler(body, 'click', function (event = EventUtil.getEvent(event)) {
    const text = val.value.split(inputReg);
    const target = EventUtil.getTarget(event);
    const searchVal = search.value;
    switch (target.id) {
      case 'in-left':
        for (let i = 0; i < text.length; i++) {
          const textEle = DomUtil.create(text[i], 'box');
          DomUtil.insertEle('container', textEle, 'left');
          textCon.push(textEle);
        }
        val.value = '';
        break;
      case 'in-right':
        for (let i = 0; i < text.length; i++) {
          const textEle = DomUtil.create(text[i], 'box');
          DomUtil.insertEle('container', textEle, 'right');
          textCon.push(textEle);
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
      case 'search-btn':
        for (let i = 0; i < textCon.length; i ++) {
          let textVal = textCon[i].firstChild.nodeValue;
          console.log(textVal);
          if (textVal.match(searchVal)) {
            textVal = textVal.replace(new RegExp(searchVal, 'g'), `<span class="search-btn">${searchVal}</span>`);
            const textValEle = DomUtil.create(textVal, 'box');
            containEle.replaceChild(textValEle, textCon[i]);
          }
        }
        break;
    }
  });
})();

