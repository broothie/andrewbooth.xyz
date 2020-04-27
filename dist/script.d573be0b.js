// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/script.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener("DOMContentLoaded", function () {
  var game = new Game();
  game.render();
});

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.getElementById('canvas');
    this.foreground = document.getElementById('foreground');
    this.stepHz = 10;
    this.cellSize = 14;
    this.seedRatio = 0.2;
    this.colorMap = {
      dead: '#ffffff',
      reviving: '#fbfbfb',
      dying: '#f7f7f7',
      alive: '#f3f3f3'
    };
    this.first = true;
    this.cells = [];

    for (var _i = 0, _arr = ['render', 'stretch']; _i < _arr.length; _i++) {
      var method = _arr[_i];
      this[method] = this[method].bind(this);
    }

    this.init();
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      this.stretch();
      this.seed();
      this.updateCells();
      this.paint();
    }
  }, {
    key: "seed",
    value: function seed() {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          if (Math.random() < this.seedRatio) this.cells[x][y] = 'alive';
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.stretch();
      this.updateCells();
      this.paint();
      setTimeout(function () {
        return requestAnimationFrame(_this.render);
      }, 1000 / this.stepHz);
    }
  }, {
    key: "stretch",
    value: function stretch() {
      var width = this.foreground.offsetWidth;
      var height = this.foreground.offsetHeight;
      this.canvas.width = width;
      this.canvas.height = height;
      var xCells = Math.ceil(width / this.cellSize);
      var yCells = Math.ceil(height / this.cellSize);

      while (this.cells.length < xCells) {
        this.cells.push([]);
      }

      while (this.cells.length > xCells) {
        this.cells.pop();
      }

      while ((((_this$cells$ = this.cells[0]) === null || _this$cells$ === void 0 ? void 0 : _this$cells$.length) || 0) < yCells) {
        var _this$cells$;

        this.cells.forEach(function (col) {
          return col.push('dead');
        });
      }

      while ((((_this$cells$2 = this.cells[0]) === null || _this$cells$2 === void 0 ? void 0 : _this$cells$2.length) || 0) > yCells) {
        var _this$cells$2;

        this.cells.forEach(function (col) {
          return col.pop();
        });
      }
    }
  }, {
    key: "updateCells",
    value: function updateCells() {
      this.cells = this.newCells();
    }
  }, {
    key: "newCells",
    value: function newCells() {
      var newCells = [];

      for (var x = 0; x < this.width; x++) {
        var col = this.cells[x];
        var newCol = [];

        for (var y = 0; y < this.height; y++) {
          var cell = col[y];
          var alive = ['alive', 'dying'].includes(cell);
          var neighbors = neighborsOf(this.cells, x, y);
          var aliveNeighbors = neighbors.reduce(function (count, cell) {
            return count + Number(['alive', 'dying'].includes(cell));
          }, 0);
          var nextState = void 0;

          if (alive) {
            nextState = aliveNeighbors === 2 || aliveNeighbors === 3 ? 'alive' : 'dead';
          } else {
            nextState = aliveNeighbors === 3 ? 'alive' : 'dead';
          }

          newCol.push(nextState);
        }

        newCells.push(newCol);
      }

      for (var _x = 0; _x < this.width; _x++) {
        var _col = newCells[_x];

        for (var _y = 0; _y < this.height; _y++) {
          var _cell = _col[_y];

          var _neighbors = neighborsOf(newCells, _x, _y);

          var _aliveNeighbors = _neighbors.reduce(function (count, cell) {
            return count + Number(['alive', 'dying'].includes(cell));
          }, 0);

          if (_cell === 'alive' && _aliveNeighbors !== 2 && _aliveNeighbors !== 3) {
            _col[_y] = 'dying';
          } else if (_cell === 'dead' && _aliveNeighbors === 3) {
            _col[_y] = 'reviving';
          }
        }
      }

      return newCells;
    }
  }, {
    key: "neighborsOf",
    value: function neighborsOf(x, y) {
      var neighbors = [];

      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          neighbors.push(this.cells[mod(x + i, this.width)][mod(y + j, this.height)]);
        }
      }

      return neighbors;
    }
  }, {
    key: "paint",
    value: function paint() {
      for (var x = 0; x < this.width; x++) {
        var col = this.cells[x];

        for (var y = 0; y < this.height; y++) {
          var cell = col[y];
          this.drawCell(x, y, this.colorMap[cell]);
        }
      }
    }
  }, {
    key: "drawCell",
    value: function drawCell(x, y, color) {
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }, {
    key: "ctx",
    get: function get() {
      return this.canvas.getContext('2d');
    }
  }, {
    key: "width",
    get: function get() {
      return this.cells.length;
    }
  }, {
    key: "height",
    get: function get() {
      var _this$cells$3;

      return ((_this$cells$3 = this.cells[0]) === null || _this$cells$3 === void 0 ? void 0 : _this$cells$3.length) || 0;
    }
  }]);

  return Game;
}();

var neighborsOf = function neighborsOf(cells, x, y) {
  var _cells$;

  var width = cells.length;
  var height = ((_cells$ = cells[0]) === null || _cells$ === void 0 ? void 0 : _cells$.length) || 0;
  var neighbors = [];

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      neighbors.push(cells[mod(x + i, width)][mod(y + j, height)]);
    }
  }

  return neighbors;
};

var mod = function mod(n, m) {
  return n < 0 ? (m + n) % m : n % m;
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64258" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map