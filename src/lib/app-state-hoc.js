'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxThrottle = require('redux-throttle');

var _reduxThrottle2 = _interopRequireDefault(_reduxThrottle);

var _intl = require('../reducers/intl.js');

var _gui = require('../reducers/gui');

var _gui2 = _interopRequireDefault(_gui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var enhancer = composeEnhancers((0, _redux.applyMiddleware)((0, _reduxThrottle2.default)(300, { leading: true, trailing: true })));
var store = (0, _redux.createStore)(_gui2.default, _intl.intlInitialState, enhancer);

/*
 * Higher Order Component to provide redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
var AppStateHOC = function AppStateHOC(WrappedComponent) {
    var AppStateWrapper = function AppStateWrapper(_ref) {
        var props = _objectWithoutProperties(_ref, []);

        return _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _intl.IntlProvider,
                null,
                _react2.default.createElement(WrappedComponent, props)
            )
        );
    };
    return AppStateWrapper;
};

exports.default = AppStateHOC;
