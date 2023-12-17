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

/***/ "./src/Circle.js":
/*!***********************!*\
  !*** ./src/Circle.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Circle)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ \"./utils.js\");\n\r\n\r\nclass Circle {\r\n  constructor(x, y, radius = _utils_js__WEBPACK_IMPORTED_MODULE_0__.CIRCLE_RADIUS, color = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomColor)()) {\r\n    console.log(\"Circle created with x:\", x, \"y:\", y);\r\n    this.x = x;\r\n    this.y = y;\r\n    this.radius = radius;\r\n    this.color = color;\r\n    this.velocityY = 0;\r\n    this.gravity = _utils_js__WEBPACK_IMPORTED_MODULE_0__.GRAVITY;\r\n    this.damping = _utils_js__WEBPACK_IMPORTED_MODULE_0__.DAMPING;\r\n    this.collisionWindow = _utils_js__WEBPACK_IMPORTED_MODULE_0__.COLLISION_WINDOW_DURATION;\r\n  }\r\n\r\n  draw(ctx) {\r\n    ctx.beginPath();\r\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\r\n    ctx.fillStyle = this.color;\r\n    ctx.fill();\r\n    ctx.closePath();\r\n  }\r\n\r\n  update(deltaTime, circles, canvas) {\r\n    if (this.collisionWindow > 0) {\r\n      this.collisionWindow--;\r\n      return;\r\n    }\r\n\r\n    this.velocityY += this.gravity * deltaTime;\r\n    this.y += this.velocityY * deltaTime;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://your-project-name/./src/Circle.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle.js */ \"./src/Circle.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ \"./utils.js\");\n\r\n\r\n\r\n\r\nconst canvas = document.getElementById(\"gravityCanvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nlet circles = [];\r\nlet lastTime = 0;\r\nconst circleDiameter = 30;\r\ncanvas.width = window.innerWidth;\r\ncanvas.height = window.innerHeight;\r\n\r\nfunction tick(currentTime) {\r\n  const deltaTime = (currentTime - lastTime) / 1000;\r\n  lastTime = currentTime;\r\n  render();\r\n  update(deltaTime, circles, canvas);\r\n\r\n  requestAnimationFrame(tick);\r\n}\r\n\r\nfunction update(deltaTime, circles, canvas) {\r\n  for (let i = 0; i < circles.length; i++) {\r\n    circles[i].update(deltaTime, circles, canvas);\r\n\r\n    if (\r\n      circles[i].y + circles[i].radius + circles[i].velocityY >\r\n      canvas.height\r\n    ) {\r\n      if (circles[i].velocityY > 0) {\r\n        circles[i].velocityY = -circles[i].velocityY * circles[i].damping;\r\n      } else {\r\n        circles[i].velocityY = -circles[i].velocityY;\r\n      }\r\n    } else {\r\n      circles[i].velocityY += circles[i].gravity;\r\n    }\r\n\r\n    circles[i].y += circles[i].velocityY;\r\n  }\r\n  handleCollisions();\r\n}\r\n\r\nfunction render() {\r\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n\r\n  for (let i = 0; i < circles.length; i++) {\r\n    circles[i].draw(ctx);\r\n  }\r\n}\r\n\r\nfunction spawnCircle(x, y) {\r\n  if (circles.length < _utils_js__WEBPACK_IMPORTED_MODULE_1__.MAX_CIRCLES) {\r\n    let circle = new _Circle_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, _utils_js__WEBPACK_IMPORTED_MODULE_1__.CIRCLE_RADIUS);\r\n    circles.push(circle);\r\n    return circle;\r\n  } else {\r\n    alert(\"You can create a maximum of 15 balls.\");\r\n    location.reload();\r\n  }\r\n}\r\nfunction handleCollisions() {\r\n  for (let i = 0; i < circles.length; i++) {\r\n    for (let j = i + 1; j < circles.length; j++) {\r\n      const circleA = circles[i];\r\n      const circleB = circles[j];\r\n\r\n      const dx = circleB.x - circleA.x;\r\n      const dy = circleB.y - circleA.y;\r\n      const distanceBetweenCenters = Math.hypot(dx, dy);\r\n      const areOverlapping = distanceBetweenCenters < circleDiameter;\r\n\r\n      if (areOverlapping) {\r\n        const overlapDistance = circleDiameter - distanceBetweenCenters;\r\n        const percentOverlap = overlapDistance / circleDiameter;\r\n\r\n        const halfPercent = percentOverlap * 0.5;\r\n\r\n        const adjustX = dx * halfPercent;\r\n        const adjustY = dy * halfPercent;\r\n\r\n        circleA.x -= adjustX;\r\n        circleA.y -= adjustY;\r\n\r\n        circleB.x += adjustX;\r\n        circleB.y += adjustY;\r\n\r\n        const canvasBottom = canvas.height - circleA.radius;\r\n        if (circleA.y > canvasBottom) {\r\n          circleA.y = canvasBottom;\r\n        }\r\n\r\n        const canvasBottomB = canvas.height - circleB.radius;\r\n        if (circleB.y > canvasBottomB) {\r\n          circleB.y = canvasBottomB;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\ncanvas.addEventListener(\"click\", (e) => {\r\n  spawnCircle(e.x, e.y);\r\n});\r\n\r\nrequestAnimationFrame(tick);\r\n\n\n//# sourceURL=webpack://your-project-name/./src/app.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CIRCLE_RADIUS: () => (/* binding */ CIRCLE_RADIUS),\n/* harmony export */   COLLISION_WINDOW_DURATION: () => (/* binding */ COLLISION_WINDOW_DURATION),\n/* harmony export */   DAMPING: () => (/* binding */ DAMPING),\n/* harmony export */   GRAVITY: () => (/* binding */ GRAVITY),\n/* harmony export */   MAX_CIRCLES: () => (/* binding */ MAX_CIRCLES),\n/* harmony export */   getRandomColor: () => (/* binding */ getRandomColor)\n/* harmony export */ });\n// Constants\r\nconst GRAVITY = 0.5;\r\nconst DAMPING = 0.8;\r\nconst COLLISION_WINDOW_DURATION = 10;\r\nconst CIRCLE_RADIUS = 15;\r\nconst MAX_CIRCLES = 15;\r\n\r\n// Utility function to get a random color\r\nfunction getRandomColor() {\r\n  const letters = \"0123456789ABCDEF\";\r\n  let color = \"#\";\r\n  for (let i = 0; i < 6; i++) {\r\n    color += letters[Math.floor(Math.random() * 16)];\r\n  }\r\n  return color;\r\n}\r\n\n\n//# sourceURL=webpack://your-project-name/./utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;