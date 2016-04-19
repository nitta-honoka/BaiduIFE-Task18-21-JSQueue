/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by honoka on 16/4/8.
	 */
	(function () {
	  // 事件辅助对象
	  var EventUtil = {
	    addHandler: function addHandler(element, type, handler) {
	      if (element.addEventListener) {
	        element.addEventListener(type, handler, false);
	      } else if (element.attachEvent) {
	        element.attachEvent('on' + type, handler);
	      } else {
	        element['on' + type] = handler;
	      }
	    },
	    getEvent: function getEvent() {
	      var event = arguments.length <= 0 || arguments[0] === undefined ? window.event : arguments[0];

	      return event;
	    },
	    getTarget: function getTarget(event) {
	      return event.target || event.srcElement;
	    }
	  };
	  // DOM操作辅助对象
	  var DomUtil = {
	    create: function create(num, className) {
	      var divElement = document.createElement('div');
	      divElement.innerHTML = num;
	      divElement.className = className;
	      return divElement;
	    },
	    insertEle: function insertEle(containId, element, type) {
	      var containEle = document.getElementById(containId);
	      var childList = containEle.childNodes;
	      if (type === 'left') {
	        containEle.insertBefore(element, childList[0]);
	      } else {
	        containEle.appendChild(element);
	      }
	    },
	    searchRender: function searchRender(textCon, str) {
	      if (str !== null && str.length > 0) {
	        if (textCon.match(str)) {
	          textCon = textCon.replace(new RegExp(str, 'g'), '<span class="search-span">' + str + '</span>');
	          return '<div>' + textCon + '</div>';
	        }
	      }
	    },
	    removeEle: function removeEle(containId, type) {
	      var containEle = document.getElementById(containId);
	      if (type === 'left') {
	        containEle.removeChild(containEle.firstChild);
	      } else {
	        containEle.removeChild(containEle.lastChild);
	      }
	    }
	  };
	  // 将点击事件代理在输入区域父元素上
	  var body = document.getElementById('input-area');
	  var val = document.getElementById('text');
	  var search = document.getElementById('search');
	  var inputReg = /\r|\s|[,，、]/g;
	  var containEle = document.getElementById('container');
	  var textCon = [];
	  EventUtil.addHandler(body, 'click', function () {
	    var event = arguments.length <= 0 || arguments[0] === undefined ? EventUtil.getEvent(event) : arguments[0];

	    var text = val.value.split(inputReg);
	    var target = EventUtil.getTarget(event);
	    var searchVal = search.value;
	    switch (target.id) {
	      case 'in-left':
	        for (var i = 0; i < text.length; i++) {
	          var textEle = DomUtil.create(text[i], 'box');
	          DomUtil.insertEle('container', textEle, 'left');
	          textCon.push(textEle);
	        }
	        val.value = '';
	        break;
	      case 'in-right':
	        for (var _i = 0; _i < text.length; _i++) {
	          var _textEle = DomUtil.create(text[_i], 'box');
	          DomUtil.insertEle('container', _textEle, 'right');
	          textCon.push(_textEle);
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
	        for (var _i2 = 0; _i2 < textCon.length; _i2++) {
	          var textVal = textCon[_i2].firstChild.nodeValue;
	          console.log(textVal);
	          if (textVal.match(searchVal)) {
	            textVal = textVal.replace(new RegExp(searchVal, 'g'), '<span class="search-btn">' + searchVal + '</span>');
	            var textValEle = DomUtil.create(textVal, 'box');
	            containEle.replaceChild(textValEle, textCon[_i2]);
	          }
	        }
	        break;
	    }
	  });
	})();

/***/ }
/******/ ]);