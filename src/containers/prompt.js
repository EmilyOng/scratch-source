'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _prompt = require('../components/prompt/prompt.js');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prompt = function (_React$Component) {
    _inherits(Prompt, _React$Component);

    function Prompt(props) {
        _classCallCheck(this, Prompt);

        var _this = _possibleConstructorReturn(this, (Prompt.__proto__ || Object.getPrototypeOf(Prompt)).call(this, props));

        (0, _lodash2.default)(_this, ['handleOk', 'handleCancel', 'handleChange', 'handleKeyPress']);
        _this.state = {
            inputValue: ''
        };
        return _this;
    }

    _createClass(Prompt, [{
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            if (event.key === 'Enter') this.handleOk();
        }
    }, {
        key: 'handleOk',
        value: function handleOk() {
            this.props.onOk(this.state.inputValue);
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            this.props.onCancel();
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ inputValue: e.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_prompt2.default, {
                label: this.props.label,
                placeholder: this.props.placeholder,
                title: this.props.title,
                onCancel: this.handleCancel,
                onChange: this.handleChange,
                onKeyPress: this.handleKeyPress,
                onOk: this.handleOk
            });
        }
    }]);

    return Prompt;
}(_react2.default.Component);

Prompt.propTypes = {
    label: _propTypes2.default.string.isRequired,
    onCancel: _propTypes2.default.func.isRequired,
    onOk: _propTypes2.default.func.isRequired,
    placeholder: _propTypes2.default.string,
    title: _propTypes2.default.string.isRequired
};

exports.default = Prompt;
