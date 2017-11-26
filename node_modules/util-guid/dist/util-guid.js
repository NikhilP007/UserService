(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var guid = require('./util-guid');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.guid = factory();
  }
})(function () {

  return guid;
});

},{"./util-guid":2}],2:[function(require,module,exports){
'use strict';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var type = {
  16: function _() {
    return s4() + s4() + s4() + s4();
  },

  32: function _() {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }
};

module.exports = function (length) {
  return type[length || 32]();
};

},{}]},{},[1]);
