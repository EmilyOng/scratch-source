'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spriteInfo = require('../components/sprite-info/sprite-info.js');

var _spriteInfo2 = _interopRequireDefault(_spriteInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpriteInfo = function (_React$Component) {
    _inherits(SpriteInfo, _React$Component);

    function SpriteInfo(props) {
        _classCallCheck(this, SpriteInfo);

        var _this = _possibleConstructorReturn(this, (SpriteInfo.__proto__ || Object.getPrototypeOf(SpriteInfo)).call(this, props));

        (0, _lodash2.default)(_this, ['handleChangeRotationStyle', 'handleClickVisible', 'handleClickNotVisible', 'handlePressVisible', 'handlePressNotVisible']);
        return _this;
    }

    _createClass(SpriteInfo, [{
        key: 'handleChangeRotationStyle',
        value: function handleChangeRotationStyle(e) {
            this.props.onChangeRotationStyle(e.target.value);
        }
    }, {
        key: 'handleClickVisible',
        value: function handleClickVisible(e) {
            e.preventDefault();
            this.props.onChangeVisibility(true);
        }
    }, {
        key: 'handleClickNotVisible',
        value: function handleClickNotVisible(e) {
            e.preventDefault();
            this.props.onChangeVisibility(false);
        }
    }, {
        key: 'handlePressVisible',
        value: function handlePressVisible(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.props.onChangeVisibility(true);
            }
        }
    }, {
        key: 'handlePressNotVisible',
        value: function handlePressNotVisible(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.props.onChangeVisibility(false);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_spriteInfo2.default, _extends({}, this.props, {
                onChangeRotationStyle: this.handleChangeRotationStyle,
                onClickNotVisible: this.handleClickNotVisible,
                onClickVisible: this.handleClickVisible,
                onPressNotVisible: this.handlePressNotVisible,
                onPressVisible: this.handlePressVisible
            }));
        }
    }]);

    return SpriteInfo;
}(_react2.default.Component);

SpriteInfo.propTypes = _extends({}, _spriteInfo2.default.propTypes, {
    onChangeDirection: _propTypes2.default.func,
    onChangeName: _propTypes2.default.func,
    onChangeRotationStyle: _propTypes2.default.func,
    onChangeVisibility: _propTypes2.default.func,
    onChangeX: _propTypes2.default.func,
    onChangeY: _propTypes2.default.func,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
});

exports.default = SpriteInfo;
