'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _intl = require('../reducers/intl.js');

var _languageSelector = require('../components/language-selector/language-selector.js');

var _languageSelector2 = _interopRequireDefault(_languageSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return {
        currentLocale: state.intl.locale
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onChange: function onChange(e) {
            e.preventDefault();
            dispatch((0, _intl.updateIntl)(e.target.value));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_languageSelector2.default);
