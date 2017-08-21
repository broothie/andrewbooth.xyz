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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _projects = __webpack_require__(1);

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  // Set up scroll nudge
  var SECONDS = 1000;
  var WAIT_TIME = 5 * SECONDS;
  var MOVE_HEIGHT = 30;
  var MOVE_TIME = 2 / 5 * SECONDS;
  var UPDATE_RATE = 10;
  var COUNTER_MAX = MOVE_TIME / UPDATE_RATE;
  setTimeout(function () {
    if (document.body.scrollTop < MOVE_HEIGHT) {
      var scrollCounter = 0;
      var scrollInterval = setInterval(function () {
        scrollCounter++;
        document.body.scrollTop = MOVE_HEIGHT / 2 * (1 - Math.cos(scrollCounter * 2 * Math.PI / COUNTER_MAX));
      }, UPDATE_RATE);

      setTimeout(function () {
        clearInterval(scrollInterval);
      }, MOVE_TIME);
    }
  }, WAIT_TIME);

  // Load up projects section
  var projectsSection = document.getElementById('projects');
  _projects2.default.forEach(function (project, idx) {
    // Info div
    var title = document.createElement('h2');
    title.innerText = project.title;

    var titleA = document.createElement('a');
    titleA.setAttribute('href', project.link);
    titleA.setAttribute('target', '_blank');
    titleA.appendChild(title);

    var liveA = document.createElement('a');
    liveA.innerText = 'Live';
    liveA.setAttribute('href', project.link);
    liveA.setAttribute('target', '_blank');

    var githubA = document.createElement('a');
    githubA.innerText = 'GitHub';
    githubA.setAttribute('href', project.github);
    githubA.setAttribute('target', '_blank');

    var body = document.createElement('p');
    body.appendChild(liveA);
    body.innerHTML += '&nbsp;&bull;&nbsp;';
    body.appendChild(githubA);
    body.innerHTML += '<br/><br/><br/>';
    body.innerHTML += project.body;

    var infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.appendChild(titleA);
    infoDiv.appendChild(body);

    // Image div
    var img = document.createElement('img');
    img.setAttribute('src', project.imgPath);

    var imgA = document.createElement('a');
    imgA.setAttribute('href', project.link);
    imgA.setAttribute('target', '_blank');
    imgA.appendChild(img);

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    imgDiv.appendChild(imgA);

    // Section content div
    var sectionContentDiv = document.createElement('div');
    sectionContentDiv.classList.add('section-content');
    sectionContentDiv.classList.add('section-content-img');
    sectionContentDiv.appendChild(imgDiv);
    sectionContentDiv.appendChild(infoDiv);

    // Add to page
    projectsSection.appendChild(sectionContentDiv);
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  title: 'Slink',
  body: '\n      An AIM clone visually influenced by Windows 95. Built on\n      <a href="http://rubyonrails.org/" target="_blank">Rails</a>,\n      <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>,\n      <a href="https://facebook.github.io/react/" target="_blank">React</a>,\n      and\n      <a href="http://redux.js.org/" target="_blank">Redux</a>.\n    ',
  imgPath: 'assets/img/slink.gif',
  link: 'http://www.slink.chat',
  github: 'https://github.com/andydennisonbooth/slink'
}, {
  title: 'Primordial Playground',
  body: '\n      A colorful, interactive Game of Life sandbox. Built with\n      <a href="http://vanilla-js.com/">VanillaJS</a>.\n    ',
  imgPath: 'assets/img/primordial-playground.gif',
  link: 'https://andydennisonbooth.github.io/primordial-playground/',
  github: 'https://github.com/andydennisonbooth/primordial-playground'
}, {
  title: 'RegexTranslator.com',
  body: '\n      A two-way translation tool for those regular expressions you forgot to\n      document. Built with\n      <a href="https://nodejs.org/en/" target="_blank">Node</a>,\n      <a href="https://www.meteor.com/" target="_blank">Meteor</a>,\n      <a href="https://facebook.github.io/react/" target="_blank">React</a>,\n      and\n      <a href="http://redux.js.org/" target="_blank">Redux</a>.\n    ',
  imgPath: 'assets/img/regex-translator.gif',
  link: 'https://www.regextranslator.com/',
  github: 'https://github.com/corsonknowles/RegExTranslator.com'
}, {
  title: 'Scrumtious',
  body: '\n      A simple online scrumboard great for small, agile scrum teams. Built with\n      <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>,\n      <a href="http://flask.pocoo.org/" target="_blank">Flask</a>,\n      <a href="https://socket.io/" target="_blank">SocketIO</a>,\n      <a href="https://redis.io/" target="_blank">Redis</a>,\n      <a href="http://coffeescript.org/" target="_blank">CoffeeScript</a>,\n      <a href="https://jquery.com/" target="_blank">JQuery</a>,\n      and\n      <a href="http://materializecss.com/" target="_blank">Materialize</a>.\n\n    ',
  imgPath: 'assets/img/scrumtious.gif',
  link: 'http://scrumtio.us/',
  github: 'https://github.com/andydennisonbooth/scrumtious/'
}];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map