/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Dot.js":
/*!********************!*\
  !*** ./src/Dot.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dot\": () => (/* binding */ Dot)\n/* harmony export */ });\nclass Dot {\n  /**\n   * @param {import(\"./math\").Vector2} position\n   * @param {string} color\n   */\n  constructor(position, color, radius = 3) {\n    const {\n      x,\n      y\n    } = position;\n    this.position = {\n      x,\n      y\n    };\n    this.color = color;\n    this.radius = radius;\n  }\n\n}\n\n//# sourceURL=webpack://canvas-interactive-background/./src/Dot.js?");

/***/ }),

/***/ "./src/DotLattice.js":
/*!***************************!*\
  !*** ./src/DotLattice.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DotLattice\": () => (/* binding */ DotLattice)\n/* harmony export */ });\n/* harmony import */ var _Dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dot */ \"./src/Dot.js\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ \"./src/math.js\");\n\n\n/**\n * @typedef {import(\"./math\").Vector2} Vector2\n */\n\nconst defaultOptions = {\n  spacing: 40,\n  offset: 20,\n  radius: {\n    min: 3,\n    max: 20\n  },\n  cursorPower: {\n    min: 10,\n    max: 100\n  },\n  changeFactor: 0.1,\n  colors: [\"#fece4a\", \"#43a4ff\", \"#6ec2b5\", \"#ff4949\"]\n};\nclass DotLattice {\n  /**\n   * @param {HTMLCanvasElement} canvas\n   */\n  constructor(canvas, options = defaultOptions) {\n    this._canvas = canvas;\n    this._context = canvas.getContext(\"2d\");\n    this._options = { ...options\n    };\n    /**\n     * @type {[Dot]}\n     */\n\n    this._dots = [];\n    this.resizeCanvas(window.innerWidth, window.innerHeight / 2);\n  }\n\n  get canvas() {\n    return this._canvas;\n  }\n\n  get context() {\n    return this._context;\n  }\n\n  get options() {\n    return this._options;\n  }\n\n  resizeCanvas(width, height) {\n    const {\n      colors,\n      spacing\n    } = this.options;\n    this.canvas.width = width;\n    this.canvas.height = height;\n    this._columns = Math.floor(this.canvas.width / spacing);\n    this._rows = Math.ceil(this.canvas.height / spacing);\n    this._sameColorWidth = Math.floor(this._columns / colors.length);\n    this.updateDots();\n  }\n\n  getDotColor(x) {\n    return this.options.colors[Math.floor(x / this._sameColorWidth)];\n  }\n\n  getDotRadius(radius, targetRadius) {\n    const {\n      min,\n      max\n    } = this.options.radius;\n    const {\n      changeFactor\n    } = this.options;\n    return (0,_math__WEBPACK_IMPORTED_MODULE_1__.clamp)(min, max, radius + changeFactor * (targetRadius - radius));\n  }\n  /**\n   * @param {Vector2} param0\n   * @returns {Vector2}\n   */\n\n\n  transformPosition({\n    x,\n    y\n  }) {\n    const {\n      spacing,\n      offset\n    } = this.options;\n    return {\n      x: x * spacing + offset,\n      y: y * spacing + offset\n    };\n  }\n\n  getCursorAffectedRadius(distance) {\n    const {\n      radius,\n      cursorPower\n    } = this.options;\n    return Math.max(radius.min, radius.max - (0,_math__WEBPACK_IMPORTED_MODULE_1__.mapTo)(cursorPower.min, cursorPower.max, distance, radius.min, radius.max));\n  }\n\n  updateDots() {\n    const {\n      _columns,\n      _rows\n    } = this;\n    const dots = [];\n\n    for (let x = 0; x < _columns; x++) {\n      for (let y = 0; y < _rows; y++) {\n        dots.push(new _Dot__WEBPACK_IMPORTED_MODULE_0__.Dot(this.transformPosition({\n          x,\n          y\n        }), this.getDotColor(x)));\n      }\n    }\n\n    this._dots = dots;\n  }\n\n  clear() {\n    const {\n      width,\n      height\n    } = this.canvas;\n    this.context.clearRect(0, 0, width, height);\n  }\n  /**\n   * @param {Vector2} cursor\n   */\n\n\n  calculateDotRadiuses(cursor) {\n    const {\n      cursorPower,\n      radius\n    } = this.options;\n    const isCursorOut = cursor.x < 0 || cursor.y < 0 || cursor.x > this.canvas.width || cursor.y > this.canvas.height;\n\n    for (const dot of this._dots) {\n      const distanceToCursor = (0,_math__WEBPACK_IMPORTED_MODULE_1__.distance)(cursor, dot.position);\n      const isAffectedByCursor = distanceToCursor <= cursorPower.max;\n\n      if (!isAffectedByCursor || isCursorOut) {\n        if (dot.radius > radius.min) {\n          dot.radius = this.getDotRadius(dot.radius, radius.min);\n        }\n\n        continue;\n      }\n\n      const targetRadius = this.getCursorAffectedRadius(distanceToCursor);\n      dot.radius = this.getDotRadius(dot.radius, targetRadius);\n    }\n  }\n  /**\n   * @param {Dot} dot\n   */\n\n\n  drawDot(dot) {\n    this.context.beginPath();\n    this.context.arc(dot.position.x, dot.position.y, dot.radius, 0, 2 * Math.PI);\n    this.context.fillStyle = dot.color;\n    this.context.fill();\n  }\n\n  drawDots() {\n    this.clear();\n\n    for (const dot of this._dots) {\n      this.drawDot(dot);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://canvas-interactive-background/./src/DotLattice.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ \"./src/main.scss\");\n/* harmony import */ var _DotLattice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DotLattice */ \"./src/DotLattice.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  /**\n   * @type {import(\"../math\").Vector2} canvas\n   */\n  const cursor = {\n    x: -1,\n    y: -1\n  };\n  /**\n   * @type {HTMLCanvasElement} canvas\n   */\n\n  const canvas = document.getElementById(\"canvas\");\n  const dotLattice = new _DotLattice__WEBPACK_IMPORTED_MODULE_1__.DotLattice(canvas);\n\n  function animationStep() {\n    dotLattice.calculateDotRadiuses(cursor);\n    dotLattice.drawDots();\n    window.requestAnimationFrame(animationStep);\n  }\n\n  window.requestAnimationFrame(animationStep);\n  canvas.addEventListener(\"pointermove\", event => {\n    const {\n      offsetX,\n      offsetY\n    } = event;\n    cursor.x = offsetX;\n    cursor.y = offsetY;\n  });\n  canvas.addEventListener(\"pointerleave\", () => {\n    cursor.x = -1;\n    cursor.y = -1;\n  });\n  window.addEventListener(\"resize\", () => {\n    dotLattice.resizeCanvas(window.innerWidth, window.innerHeight / 2);\n  });\n});\n\n//# sourceURL=webpack://canvas-interactive-background/./src/index.js?");

/***/ }),

/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"distance\": () => (/* binding */ distance),\n/* harmony export */   \"clamp\": () => (/* binding */ clamp),\n/* harmony export */   \"mapTo\": () => (/* binding */ mapTo)\n/* harmony export */ });\n/**\n * @typedef {{ x: number, y: number }} Vector2\n */\n\n/**\n * @param {Vector2} begin\n * @param {Vector2} end\n */\nconst distance = (begin, end) => {\n  const x = Math.pow(begin.x - end.x, 2);\n  const y = Math.pow(begin.y - end.y, 2);\n  return Math.sqrt(x + y);\n};\nconst clamp = (min, max, value) => Math.max(min, Math.min(max, value));\nconst mapTo = (min, max, value, newMin = 0, newMax = 1) => clamp(newMin, newMax, newMin + (value - min) * (newMax - newMin) / (max - min));\n\n//# sourceURL=webpack://canvas-interactive-background/./src/math.js?");

/***/ }),

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://canvas-interactive-background/./src/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;