/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Storage.js":
/*!***********************!*\
  !*** ./js/Storage.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n'use stirct';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar storage = {\n  __key: \"todo_list\",\n  __default: { maxSub: 0, data: [] },\n  /* \r\n   * localStorage 数据格式\r\n   * {\r\n   *     maxSub: ,\r\n   *     ...,\r\n   *     data:[{id:...},{},{}]\r\n   *  }\r\n   */\n  set: function set(arr) {\n    arr = arr || [];\n    var info = this.__getAll();\n    info.data = arr;\n    localStorage[this.__key] = JSON.stringify(info);\n  },\n  getMaxSub: function getMaxSub() {\n    var info = this.__getAll();\n    this.setMaxSub(info.maxSub + 1);\n    return info.maxSub;\n  },\n  setMaxSub: function setMaxSub(maxSub) {\n    if (maxSub === undefined) return;\n    var info = this.__getAll();\n    info.maxSub = maxSub;\n    localStorage[this.__key] = JSON.stringify(info);\n  },\n  __getAll: function __getAll() {\n    var tpl = JSON.stringify(this.__default);\n    return JSON.parse(localStorage[this.__key] || tpl);\n  }\n\n  /* Unit Test */\n  // storage.set();\n  // storage.set(1, { tiem: Date.now(), title: \"abc\", content: \"..\", comfirmed: true });\n  // console.log(storage.get(1));\n  //storage.remove(-1);\n  // console.log(storage.getMaxSub());\n  // storage.setMaxSub(3);\n  /* Test End */\n\n};exports.default = storage;\n\n//# sourceURL=webpack:///./js/Storage.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Storage = __webpack_require__(/*! ./Storage.js */ \"./js/Storage.js\");\n\nvar _Storage2 = _interopRequireDefault(_Storage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Event = new Vue();\n\nVue.component(\"list\", {\n  template: \"#task-tpl\",\n  props: [\"todo\"],\n  methods: {\n    action: function action(name, id) {\n      Event.$emit(name, id);\n    }\n  }\n});\n\nVue.component(\"list-finish\", {\n  template: \"#task-finish-tpl\",\n  props: [\"todo\"],\n  methods: {\n    action: function action(name, id) {\n      Event.$emit(name, id);\n    }\n  }\n});\n\nvar app = new Vue({\n  el: \"#v-app\",\n  data: function () {\n    return {\n      /* { \r\n          id: number, \r\n          title: string, \r\n          content: string, \r\n          time: number,\r\n          finish: boolean, \r\n          confirmed: boolean\r\n      } */\n      current: {\n        id: -1,\n        title: \"\",\n        content: \"\",\n        time: null,\n        finish: false,\n        confirmed: false\n      },\n      list: []\n    };\n  }(),\n  methods: {\n    merge: function merge() {\n      var title = this.current.title;\n      var id = this.current.id;\n      //标题有内容，可以为0且id为默认的-1\n      if (title && title !== 0) {\n        if (id === -1) {\n          var maxSub = _Storage2.default.getMaxSub();\n          this.current.id = maxSub || 0;\n          this.list.push(Object.assign({}, this.current));\n        } else {\n          var sub = this.findIndex(id);\n          this.list[sub] = Object.assign({}, this.current);\n        }\n      }\n      this.reset();\n    },\n    remove: function remove(id) {\n      var sub = this.findIndex(id);\n      this.list.splice(sub, 1);\n    },\n    change: function change(id) {\n      var sub = this.findIndex(id);\n      this.current = this.list[sub];\n    },\n    finishTrigger: function finishTrigger(id) {\n      var sub = this.findIndex(id);\n      this.list[sub].finish = !this.list[sub].finish;\n    },\n    findIndex: function findIndex(id) {\n      var item = this.list.find(function (item) {\n        return id === item.id;\n      });\n      return this.list.indexOf(item);\n    },\n    toggle: function toggle() {\n      var tmp = document.getElementsByClassName('more')[0];\n      if (tmp.className === \"more\") {\n        tmp.className = \"more active\";\n      } else {\n        tmp.className = \"more\";\n      }\n    },\n    clear: function clear() {\n      this.list = [];\n    },\n    reset: function reset(options) {\n      var tpl = {\n        id: -1,\n        title: \"\",\n        content: \"\",\n        time: null,\n        finish: false,\n        confirmed: false\n      };\n      this.current = options || tpl;\n    }\n  },\n  mounted: function mounted() {\n    this.list = _Storage2.default.__getAll().data;\n    Event.$on('remove', function (id) {\n      if (id) {\n        this.remove(id);\n      }\n    }.bind(this));\n    Event.$on('change', function (id) {\n      if (id) {\n        this.change(id);\n      }\n    }.bind(this));\n    Event.$on('finishTrigger', function (id) {\n      if (id) {\n        this.finishTrigger(id);\n      }\n    }.bind(this));\n  },\n  watch: {\n    list: {\n      deep: true,\n      handler: function handler(newVal, oldVal) {\n        _Storage2.default.set(this.list);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });