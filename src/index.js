'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _appStateHoc = require('./lib/app-state-hoc.js');

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _gui = require('./containers/gui.js');

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = require('./lib/project-loader-hoc.js');

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(_gui2.default));

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_reactModal2.default.setAppElement(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);
