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

/***/ "./src/Track.ts":
/*!**********************!*\
  !*** ./src/Track.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.trackGrid = exports.TRACK_ROWS = exports.TRACK_COLS = exports.TRACK_GAP = exports.TRACK_H = exports.TRACK_W = void 0;\r\nexports.TRACK_W = 40;\r\nexports.TRACK_H = 40;\r\nexports.TRACK_GAP = 2;\r\nexports.TRACK_COLS = 20;\r\nexports.TRACK_ROWS = 15;\r\nexports.trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,\r\n    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,\r\n    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,\r\n    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,\r\n    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,\r\n    1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,\r\n    1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,\r\n    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,\r\n    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,\r\n    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,\r\n    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,\r\n    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,\r\n    1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,\r\n    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,\r\n    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];\r\n\n\n//# sourceURL=webpack://ball_game/./src/Track.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Track_1 = __webpack_require__(/*! ./Track */ \"./src/Track.ts\");\r\nvar carPic = document.createElement('img');\r\nvar carPicLoaded = false; // image loaded asynchronously\r\nvar carX = 75;\r\nvar carY = 75;\r\nvar carSpeed = 0;\r\nvar carAng = 0;\r\nvar tracksLeft = 0;\r\nvar canvas = null;\r\nvar canvasContext = null;\r\nvar KEY_LEFT_ARROW = 37;\r\nvar KEY_UP_ARROW = 38;\r\nvar KEY_RIGHT_ARROW = 39;\r\nvar KEY_DOWN_ARROW = 40;\r\nvar keyHeld_Gas = false;\r\nvar keyHeld_Reverse = false;\r\nvar keyHeld_TurnLeft = false;\r\nvar keyHeld_TurnRight = false;\r\nvar mouseX = 0;\r\nvar mouseY = 0;\r\nvar updateMousePos = function (evt) {\r\n    var rect = canvas.getBoundingClientRect();\r\n    var root = document.documentElement;\r\n    mouseX = evt.clientX - rect.left - root.scrollLeft;\r\n    mouseY = evt.clientY - rect.top - root.scrollTop;\r\n};\r\nvar keyPressed = function (evt) {\r\n    switch (evt.keyCode) {\r\n        case KEY_LEFT_ARROW:\r\n            keyHeld_TurnLeft = true;\r\n            break;\r\n        case KEY_RIGHT_ARROW:\r\n            keyHeld_TurnRight = true;\r\n            break;\r\n        case KEY_UP_ARROW:\r\n            keyHeld_Gas = true;\r\n            break;\r\n        case KEY_DOWN_ARROW:\r\n            keyHeld_Reverse = true;\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n    evt.preventDefault();\r\n};\r\nvar keyReleased = function (evt) {\r\n    switch (evt.keyCode) {\r\n        case KEY_LEFT_ARROW:\r\n            keyHeld_TurnLeft = false;\r\n            break;\r\n        case KEY_RIGHT_ARROW:\r\n            keyHeld_TurnRight = false;\r\n            break;\r\n        case KEY_UP_ARROW:\r\n            keyHeld_Gas = false;\r\n            break;\r\n        case KEY_DOWN_ARROW:\r\n            keyHeld_Reverse = false;\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n};\r\nwindow.onload = function () {\r\n    canvas = document.getElementById('gameCanvas');\r\n    canvasContext = canvas.getContext('2d');\r\n    var framesPerSecond = 30;\r\n    setInterval(updateAll, 1000 / framesPerSecond);\r\n    canvas.addEventListener('mousemove', updateMousePos);\r\n    document.addEventListener('keydown', keyPressed);\r\n    document.addEventListener('keyup', keyReleased);\r\n    carPic.onload = function () {\r\n        carPicLoaded = true;\r\n    };\r\n    carPic.src = './images/player1car.png';\r\n    carReset();\r\n};\r\nvar updateAll = function () {\r\n    moveAll();\r\n    drawAll();\r\n};\r\nvar carReset = function () {\r\n    for (var eachRow = 0; eachRow < Track_1.TRACK_ROWS; eachRow++) {\r\n        for (var eachCol = 0; eachCol < Track_1.TRACK_COLS; eachCol++) {\r\n            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);\r\n            if (Track_1.trackGrid[arrayIndex] === 2) {\r\n                Track_1.trackGrid[arrayIndex] = 0;\r\n                carAng = (-90 * Math.PI) / 180.0;\r\n                carX = eachCol * Track_1.TRACK_W + Track_1.TRACK_W / 2;\r\n                carY = eachRow * Track_1.TRACK_H + Track_1.TRACK_H / 2;\r\n            } // end of if this track here\r\n        } // end of for each track\r\n    }\r\n};\r\nvar carMove = function () {\r\n    carSpeed *= 0.97;\r\n    var SPEED_RANGE = 0.3;\r\n    if (keyHeld_Gas) {\r\n        carSpeed += SPEED_RANGE;\r\n    }\r\n    if (keyHeld_Reverse) {\r\n        carSpeed = carSpeed - SPEED_RANGE <= 0 ? 0 : carSpeed - SPEED_RANGE;\r\n    }\r\n    if (keyHeld_TurnLeft) {\r\n        carAng += 0.04;\r\n    }\r\n    if (keyHeld_TurnRight) {\r\n        carAng -= 0.04;\r\n    }\r\n    carX += Math.cos(carAng) * carSpeed;\r\n    carY += Math.sin(carAng) * carSpeed;\r\n};\r\nvar isTrackAtColRow = function (col, row) {\r\n    if (col >= 0 && col < Track_1.TRACK_COLS && row >= 0 && row < Track_1.TRACK_ROWS) {\r\n        var trackIndexUnderCoord = rowColToArrayIndex(col, row);\r\n        return Track_1.trackGrid[trackIndexUnderCoord] === 1;\r\n    }\r\n    else {\r\n        return false;\r\n    }\r\n};\r\nvar carTrackHandling = function () {\r\n    var carTrackCol = Math.floor(carX / Track_1.TRACK_W);\r\n    var carTrackRow = Math.floor(carY / Track_1.TRACK_H);\r\n    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);\r\n    if (carTrackCol >= 0 && carTrackCol < Track_1.TRACK_COLS && carTrackRow >= 0 && carTrackRow < Track_1.TRACK_ROWS) {\r\n        if (isTrackAtColRow(carTrackCol, carTrackRow)) {\r\n            carX -= Math.cos(carAng) * carSpeed;\r\n            carY -= Math.sin(carAng) * carSpeed;\r\n            carSpeed *= -0.5;\r\n        } // end of track found\r\n    } // end of valid col and row\r\n}; // end of carTrackHandling function\r\nvar moveAll = function () {\r\n    carMove();\r\n    carTrackHandling();\r\n};\r\nvar rowColToArrayIndex = function (col, row) {\r\n    return col + Track_1.TRACK_COLS * row;\r\n};\r\nvar drawTracks = function () {\r\n    for (var eachRow = 0; eachRow < Track_1.TRACK_ROWS; eachRow++) {\r\n        for (var eachCol = 0; eachCol < Track_1.TRACK_COLS; eachCol++) {\r\n            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);\r\n            if (Track_1.trackGrid[arrayIndex] === 1) {\r\n                colorRect(Track_1.TRACK_W * eachCol, Track_1.TRACK_H * eachRow, Track_1.TRACK_W - Track_1.TRACK_GAP, Track_1.TRACK_H - Track_1.TRACK_GAP, 'blue');\r\n            } // end of if this track here\r\n        } // end of for each track\r\n    }\r\n}; // end of drawTracks func\r\nvar drawAll = function () {\r\n    colorRect(0, 0, canvas.width, canvas.height, 'black'); // clear screen\r\n    // colorCircle(carX, carY, 10, 'white'); // draw car\r\n    if (carPicLoaded) {\r\n        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);\r\n    }\r\n    drawTracks();\r\n};\r\nvar drawBitmapCenteredWithRotation = function (useBitmap, atX, atY, withAng) {\r\n    canvasContext.save();\r\n    canvasContext.translate(atX, atY);\r\n    canvasContext.rotate(withAng);\r\n    canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);\r\n    canvasContext.restore();\r\n};\r\nvar colorText = function (showWords, textX, textY, fillColor) {\r\n    canvasContext.fillStyle = fillColor;\r\n    canvasContext.fillText(showWords, textX, textY);\r\n};\r\nvar colorRect = function (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {\r\n    canvasContext.fillStyle = fillColor;\r\n    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);\r\n};\r\nvar colorCircle = function (centerX, centerY, radius, fillColor) {\r\n    canvasContext.fillStyle = fillColor;\r\n    canvasContext.beginPath();\r\n    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);\r\n    canvasContext.fill();\r\n};\r\n\n\n//# sourceURL=webpack://ball_game/./src/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;