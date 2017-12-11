'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mountWithIntl = exports.shallowWithIntl = exports.componentWithIntl = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _reactIntl = require('react-intl');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Helpers for using enzyme and react-test-renderer with react-intl
 * Directly from https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 */
var intlProvider = new _reactIntl.IntlProvider({ locale: 'en' }, {});

var _intlProvider$getChil = intlProvider.getChildContext(),
    intl = _intlProvider$getChil.intl;

var nodeWithIntlProp = function nodeWithIntlProp(node) {
    return _react2.default.cloneElement(node, { intl: intl });
};

var shallowWithIntl = function shallowWithIntl(node) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        context = _ref.context;

    return (0, _enzyme.shallow)(nodeWithIntlProp(node), {
        context: Object.assign({}, context, { intl: intl })
    });
};

var mountWithIntl = function mountWithIntl(node) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        context = _ref2.context,
        childContextTypes = _ref2.childContextTypes;

    return (0, _enzyme.mount)(nodeWithIntlProp(node), {
        context: Object.assign({}, context, { intl: intl }),
        childContextTypes: Object.assign({}, { intl: _reactIntl.intlShape }, childContextTypes)
    });
};

// react-test-renderer component for use with snapshot testing
var componentWithIntl = function componentWithIntl(children) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { locale: 'en' };
    return _reactTestRenderer2.default.create(_react2.default.createElement(
        _reactIntl.IntlProvider,
        props,
        children
    ));
};

exports.componentWithIntl = componentWithIntl;
exports.shallowWithIntl = shallowWithIntl;
exports.mountWithIntl = mountWithIntl;
