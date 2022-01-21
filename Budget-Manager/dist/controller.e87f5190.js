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
})({"src/js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionType = exports.Transaction = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
};
exports.transactionType = transactionType;

var Transaction = /*#__PURE__*/_createClass(function Transaction(type, value) {
  _classCallCheck(this, Transaction);

  _defineProperty(this, "value", void 0);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "timestamp", void 0);

  if (typeof value !== "number" || isNaN(value)) {
    throw new TypeError("Value must be Number");
  }

  this.value = value;

  if (!(type in transactionType)) {
    throw new Error("Type must be INCOME or EXPENSE only");
  }

  this.type = type;
  this.id = "".concat(type, "-").concat(value, "-").concat(Math.random().toFixed(4) * 100);
  this.timestamp = Date.now();
});

exports.Transaction = Transaction;
;
},{}],"src/js/Views/AddTransactionView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("../model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Give amount Input
var AddTransactionView = /*#__PURE__*/function () {
  function AddTransactionView() {
    var _this = this;

    _classCallCheck(this, AddTransactionView);

    _defineProperty(this, "parentElement", document.querySelector('.add_transaction_form'));

    _defineProperty(this, "valueInput", this.parentElement.querySelector(".value_input"));

    _defineProperty(this, "typeSelect", this.parentElement.querySelector(".transaction_type"));

    // this.parentElement.addEventListener("submit",(e) => {
    //     e.preventDefault();
    //     console.log("Value is...", this.valueInput.value);
    // });
    this.typeSelect.addEventListener("change", function () {
      console.log("Type changed to", _this.typeSelect.value);
    });
  }

  _createClass(AddTransactionView, [{
    key: "addSubmitHandler",
    value: function addSubmitHandler(handler) {
      this.parentElement.addEventListener("submit", handler.bind(this));
    }
  }, {
    key: "amount",
    get: function get() {
      return parseFloat(this.valueInput.value);
    }
  }, {
    key: "type",
    get: function get() {
      return this.typeSelect.value;
    }
  }, {
    key: "clearForm",
    value: function clearForm() {
      this.valueInput.value = "";
      this.typeSelect.value = _model.transactionType.INCOME;
    }
  }]);

  return AddTransactionView;
}();

;

var _default = new AddTransactionView();

exports.default = _default;
},{"../model":"src/js/model.js"}],"src/js/Views/BalanceView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BalanceView = /*#__PURE__*/function () {
  function BalanceView() {
    _classCallCheck(this, BalanceView);

    _defineProperty(this, "container", document.querySelector(".balance"));
  }

  _createClass(BalanceView, [{
    key: "render",
    value: function render(balance) {
      this.container.innerHTML = "Rs. " + balance;

      if (balance > 0) {
        this.container.classList.add("green");
      } else {
        this.container.classList.add("red");
      }
    }
  }]);

  return BalanceView;
}();

var _default = new BalanceView();

exports.default = _default;
},{}],"src/js/Views/ListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListView = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ListView = /*#__PURE__*/function () {
  function ListView() {
    _classCallCheck(this, ListView);
  }

  _createClass(ListView, [{
    key: "render",
    value: function render(data) {
      this.data = data;
      var html = this.generateHTMLString();
      this.container.innerHTML = html;
    }
  }, {
    key: "pushTransactionInContainer",
    value: function pushTransactionInContainer(transaction) {
      this.container.insertAdjacentHTML("afterbegin", this.generateCardHTML(transaction));
    }
  }, {
    key: "addFilterChangeListener",
    value: function addFilterChangeListener(handler) {
      this.filterSelect.addEventListener("change", function (e) {
        handler(e);
      });
    }
  }, {
    key: "generateCardHTML",
    value: function generateCardHTML(transaction) {
      return "<div class=\"transaction_card\">\n            <div class=".concat(transaction.type === "EXPENSE" ? "red" : "green", ">Rs ").concat(transaction.value, "</div>\n            <div>").concat(this.formatTimestamp(transaction.timestamp), "</div>\n        </div>");
    }
  }, {
    key: "formatTimestamp",
    value: function formatTimestamp(timestamp) {
      // console.log(timestamp)
      // console.log(new Date())
      return new Date(timestamp).toDateString();
    }
  }, {
    key: "generateHTMLString",
    value: function generateHTMLString() {
      var _this = this;

      var data = this.data;
      var html = "";

      if (Array.isArray(data)) {
        data.forEach(function (transaction) {
          html += _this.generateCardHTML(transaction);
        });
      }

      return html;
    }
  }]);

  return ListView;
}();

exports.ListView = ListView;
;
},{}],"src/js/Views/ExpenseTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListView2 = require("./ListView");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpenseTrackerView = /*#__PURE__*/function (_ListView) {
  _inherits(ExpenseTrackerView, _ListView);

  var _super = _createSuper(ExpenseTrackerView);

  function ExpenseTrackerView() {
    var _this;

    _classCallCheck(this, ExpenseTrackerView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "container", document.querySelector('.expene_container'));

    _defineProperty(_assertThisInitialized(_this), "filterSelect", document.querySelector('#expense_filter'));

    return _this;
  }

  return _createClass(ExpenseTrackerView);
}(_ListView2.ListView);

;

var _default = new ExpenseTrackerView();

exports.default = _default;
},{"./ListView":"src/js/Views/ListView.js"}],"src/js/Views/IncomeTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListView2 = require("./ListView");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IncomeTrackerView = /*#__PURE__*/function (_ListView) {
  _inherits(IncomeTrackerView, _ListView);

  var _super = _createSuper(IncomeTrackerView);

  function IncomeTrackerView() {
    var _this;

    _classCallCheck(this, IncomeTrackerView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "container", document.querySelector('.income_container'));

    _defineProperty(_assertThisInitialized(_this), "filterSelect", document.querySelector('#income_filter'));

    return _this;
  }

  return _createClass(IncomeTrackerView);
}(_ListView2.ListView);

;

var _default = new IncomeTrackerView();

exports.default = _default;
},{"./ListView":"src/js/Views/ListView.js"}],"src/js/controller.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _AddTransactionView = _interopRequireDefault(require("./Views/AddTransactionView"));

var _BalanceView = _interopRequireDefault(require("./Views/BalanceView"));

var _ExpenseTrackerView = _interopRequireDefault(require("./Views/ExpenseTrackerView"));

var _IncomeTrackerView = _interopRequireDefault(require("./Views/IncomeTrackerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTransactionsFromLS = function getTransactionsFromLS(type) {
  // localStorage.clear();
  return JSON.parse(localStorage.getItem(type) || '[]');
};

var saveTransactionInLS = function saveTransactionInLS(transaction) {
  var data = getTransactionsFromLS(transaction.type);

  if (Array.isArray(data)) {
    data.push(transaction);
    localStorage.setItem(transaction.type, JSON.stringify(data));
  }
}; // const temp = new Transaction(transactionType.INCOME,4000);
// saveTransactionInLS(temp);


var controlAddTransaction = function controlAddTransaction(e) {
  e.preventDefault();
  var amount = _AddTransactionView.default.amount,
      type = _AddTransactionView.default.type;
  var newTran = new _model.Transaction(type, amount);
  saveTransactionInLS(newTran);

  _AddTransactionView.default.clearForm();

  _BalanceView.default.render(calculateTotalBalance());

  if (newTran.type === _model.transactionType.EXPENSE) {
    _ExpenseTrackerView.default.pushTransactionInContainer(newTran);
  } else {
    _IncomeTrackerView.default.pushTransactionInContainer(newTran);
  }
};

var calculateTotalBalance = function calculateTotalBalance() {
  var expense = getTransactionsFromLS(_model.transactionType.EXPENSE);
  var income = getTransactionsFromLS(_model.transactionType.INCOME);
  var total = 0;

  if (Array.isArray(expense) && Array.isArray(income)) {
    income.forEach(function (inc) {
      total += inc.value;
    });
    expense.forEach(function (ex) {
      total -= ex.value;
    });
  }

  return total;
}; //Sorting Increas LS list


var HandleSortInc = function HandleSortInc(a, b) {
  if (a.value < b.value) return -1;else if (a.value > b.value) return 1;
  return 0;
}; //Sorting Decreasing


var HandlesortDec = function HandlesortDec(a, b) {
  if (a.value > b.value) return -1;else if (b.value < a.value) return 1;
  return 0;
};

var sortAmoutnInc = function sortAmoutnInc(type, flag) {
  var list = getTransactionsFromLS(type);

  if (Array.isArray(list)) {
    if (!flag) list.sort(HandleSortInc);else list.sort(HandlesortDec);
  }

  return list;
};

var controlFilterSelect = function controlFilterSelect(e) {
  console.log(e.target.id);

  if (e.target.id === "income_filter") {
    if (e.target.value === "amount+") {
      var list = sortAmoutnInc(_model.transactionType.INCOME);

      _IncomeTrackerView.default.render(list);
    } else if (e.target.value === "amount-") {
      var _list = sortAmoutnInc(_model.transactionType.INCOME, true);

      _IncomeTrackerView.default.render(_list);
    } else {
      _IncomeTrackerView.default.render(getTransactionsFromLS(_model.transactionType.INCOME));
    }
  } else {
    if (e.target.value === "amount+") {
      var _list2 = sortAmoutnInc(_model.transactionType.EXPENSE);

      _ExpenseTrackerView.default.render(_list2);
    } else if (e.target.value === "amount-") {
      var _list3 = sortAmoutnInc(_model.transactionType.EXPENSE, true);

      _ExpenseTrackerView.default.render(_list3);
    } else {
      _ExpenseTrackerView.default.render(getTransactionsFromLS(_model.transactionType.EXPENSE));
    }
  }
};

var init = function init() {
  _AddTransactionView.default.addSubmitHandler(controlAddTransaction);

  _BalanceView.default.render(calculateTotalBalance());

  _ExpenseTrackerView.default.render(getTransactionsFromLS(_model.transactionType.EXPENSE));

  _IncomeTrackerView.default.render(getTransactionsFromLS(_model.transactionType.INCOME));

  _IncomeTrackerView.default.addFilterChangeListener(controlFilterSelect);

  _ExpenseTrackerView.default.addFilterChangeListener(controlFilterSelect);
};

init();
},{"./model":"src/js/model.js","./Views/AddTransactionView":"src/js/Views/AddTransactionView.js","./Views/BalanceView":"src/js/Views/BalanceView.js","./Views/ExpenseTrackerView":"src/js/Views/ExpenseTrackerView.js","./Views/IncomeTrackerView":"src/js/Views/IncomeTrackerView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49318" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/controller.js"], null)
//# sourceMappingURL=/controller.e87f5190.js.map