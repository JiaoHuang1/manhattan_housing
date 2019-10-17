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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById('app').innerText = "Hello World!"; // Width and Height of the whole visualiation

  var width = 1000;
  var height = 1100; // create SVG

  var svg = d3.select("body").append("svg").attr("width", width).attr("height", height); // Append empty placeholder g element to the SVG
  // g will contain geometry elements

  var g = svg.append("g"); // Width and Height of the whole visualization
  // Set Projection Parameters

  var albersProjection = d3.geoAlbers().scale(100000).rotate([74.071, 0]).center([0, 40.783]).translate([width / 2, height / 2]); // Create GeoPath function that uses built-in D3 functionality to turn
  // lat/lon coordinates into screen coordinates

  var geoPath = d3.geoPath().projection(albersProjection); // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes

  d3.json("data/Neighborhood Tabulation Areas.json", function (newyork_data) {
    // console.log(data);
    g.selectAll("path").data(newyork_data.features).enter().append("path").attr("fill", "#ccc").attr("stroke", "#333").attr("d", geoPath); //    ajax call
    // $.ajax({
    //     method: "GET",
    //     url: "https://www.quandl.com/api/v3/datasets/ZILLOW/Z11233_MRPST.json?api_key=3S4uJpQyP-sfH-N5gbY6",
    // }).then(data => console.log(data));

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.quandl.com/api/v3/datasets/ZILLOW/Z11233_MRPST.json?api_key=3S4uJpQyP-sfH-N5gbY6');
    xhr.send(null);
    var area1;

    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.

      var OK = 200; // status 200 is a successful return.

      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          area1 = xhr.responseText;
          console.log(area1); // 'This is the returned text.'
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    };
  });
});

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVyVGV4dCIsIndpZHRoIiwiaGVpZ2h0Iiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwiZyIsImFsYmVyc1Byb2plY3Rpb24iLCJnZW9BbGJlcnMiLCJzY2FsZSIsInJvdGF0ZSIsImNlbnRlciIsInRyYW5zbGF0ZSIsImdlb1BhdGgiLCJwcm9qZWN0aW9uIiwianNvbiIsIm5ld3lvcmtfZGF0YSIsInNlbGVjdEFsbCIsImRhdGEiLCJmZWF0dXJlcyIsImVudGVyIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2VuZCIsImFyZWExIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiRE9ORSIsIk9LIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJ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IGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKS5pbm5lclRleHQgPSBcIkhlbGxvIFdvcmxkIVwiO1xuICAgICAgICAgICAvLyBXaWR0aCBhbmQgSGVpZ2h0IG9mIHRoZSB3aG9sZSB2aXN1YWxpYXRpb25cbiAgICAgICAgICAgdmFyIHdpZHRoID0gMTAwMDtcbiAgICAgICAgICAgdmFyIGhlaWdodCA9IDExMDA7XG4gICBcbiAgICAgICAgICAgLy8gY3JlYXRlIFNWR1xuICAgICAgICAgICB2YXIgc3ZnID0gZDMuc2VsZWN0KCBcImJvZHlcIiApXG4gICAgICAgICAgICAgICAuYXBwZW5kKCBcInN2Z1wiIClcbiAgICAgICAgICAgICAgIC5hdHRyKCBcIndpZHRoXCIsIHdpZHRoIClcbiAgICAgICAgICAgICAgIC5hdHRyKCBcImhlaWdodFwiLCBoZWlnaHQgKTtcbiAgIFxuICAgICAgICAgICAvLyBBcHBlbmQgZW1wdHkgcGxhY2Vob2xkZXIgZyBlbGVtZW50IHRvIHRoZSBTVkdcbiAgICAgICAgICAgLy8gZyB3aWxsIGNvbnRhaW4gZ2VvbWV0cnkgZWxlbWVudHNcbiAgICAgICAgICAgdmFyIGcgPSBzdmcuYXBwZW5kKCBcImdcIiApO1xuICAgXG4gICAgICAgICAgIC8vIFdpZHRoIGFuZCBIZWlnaHQgb2YgdGhlIHdob2xlIHZpc3VhbGl6YXRpb25cbiAgICAgICAgICAgLy8gU2V0IFByb2plY3Rpb24gUGFyYW1ldGVyc1xuICAgICAgICAgICB2YXIgYWxiZXJzUHJvamVjdGlvbiA9IGQzLmdlb0FsYmVycygpXG4gICAgICAgICAgICAgICAuc2NhbGUoIDEwMDAwMCApXG4gICAgICAgICAgICAgICAucm90YXRlKCBbNzQuMDcxLCAwXSApXG4gICAgICAgICAgICAgICAuY2VudGVyKCBbMCwgNDAuNzgzXSApXG4gICAgICAgICAgICAgICAudHJhbnNsYXRlKCBbd2lkdGgvMixoZWlnaHQvMl0gKTtcbiAgIFxuICAgICAgICAgICAvLyBDcmVhdGUgR2VvUGF0aCBmdW5jdGlvbiB0aGF0IHVzZXMgYnVpbHQtaW4gRDMgZnVuY3Rpb25hbGl0eSB0byB0dXJuXG4gICAgICAgICAgIC8vIGxhdC9sb24gY29vcmRpbmF0ZXMgaW50byBzY3JlZW4gY29vcmRpbmF0ZXNcbiAgICAgICAgICAgdmFyIGdlb1BhdGggPSBkMy5nZW9QYXRoKClcbiAgICAgICAgICAgICAgIC5wcm9qZWN0aW9uKCBhbGJlcnNQcm9qZWN0aW9uICk7XG4gICBcbiAgICAgICAgICAgLy8gQ2xhc3NpYyBEMy4uLiBTZWxlY3Qgbm9uLWV4aXN0ZW50IGVsZW1lbnRzLCBiaW5kIHRoZSBkYXRhLCBhcHBlbmQgdGhlIGVsZW1lbnRzLCBhbmQgYXBwbHkgYXR0cmlidXRlc1xuICAgICAgICAgICBkMy5qc29uKFwiZGF0YS9OZWlnaGJvcmhvb2QgVGFidWxhdGlvbiBBcmVhcy5qc29uXCIsIG5ld3lvcmtfZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgIGcuc2VsZWN0QWxsKCBcInBhdGhcIiApXG4gICAgICAgICAgICAgICAgICAgLmRhdGEoIG5ld3lvcmtfZGF0YS5mZWF0dXJlcyApXG4gICAgICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCBcInBhdGhcIiApXG4gICAgICAgICAgICAgICAgICAgLmF0dHIoIFwiZmlsbFwiLCBcIiNjY2NcIiApXG4gICAgICAgICAgICAgICAgICAgLmF0dHIoIFwic3Ryb2tlXCIsIFwiIzMzM1wiKVxuICAgICAgICAgICAgICAgICAgIC5hdHRyKCBcImRcIiwgZ2VvUGF0aCApO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgYWpheCBjYWxsXG4gICAgICAgICAgICAvLyAkLmFqYXgoe1xuICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIC8vICAgICB1cmw6IFwiaHR0cHM6Ly93d3cucXVhbmRsLmNvbS9hcGkvdjMvZGF0YXNldHMvWklMTE9XL1oxMTIzM19NUlBTVC5qc29uP2FwaV9rZXk9M1M0dUpwUXlQLXNmSC1ONWdiWTZcIixcbiAgICAgICAgICAgIC8vIH0pLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG5cbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly93d3cucXVhbmRsLmNvbS9hcGkvdjMvZGF0YXNldHMvWklMTE9XL1oxMTIzM19NUlBTVC5qc29uP2FwaV9rZXk9M1M0dUpwUXlQLXNmSC1ONWdiWTYnKTtcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgYXJlYTE7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBET05FID0gNDsgLy8gcmVhZHlTdGF0ZSA0IG1lYW5zIHRoZSByZXF1ZXN0IGlzIGRvbmUuXG4gICAgICAgICAgICAgICAgdmFyIE9LID0gMjAwOyAvLyBzdGF0dXMgMjAwIGlzIGEgc3VjY2Vzc2Z1bCByZXR1cm4uXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBET05FKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICBhcmVhMSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZWExKTsgLy8gJ1RoaXMgaXMgdGhlIHJldHVybmVkIHRleHQuJ1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgeGhyLnN0YXR1cyk7IC8vIEFuIGVycm9yIG9jY3VycmVkIGR1cmluZyB0aGUgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgIH0pXG5cblxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==