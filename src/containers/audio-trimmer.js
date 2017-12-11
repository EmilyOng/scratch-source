'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _audioTrimmer = require('../components/audio-trimmer/audio-trimmer.js');

var _audioTrimmer2 = _interopRequireDefault(_audioTrimmer);

var _touchUtils = require('../lib/touch-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MIN_LENGTH = 0.01; // Used to stop sounds being trimmed smaller than 1%

var AudioTrimmer = function (_React$Component) {
    _inherits(AudioTrimmer, _React$Component);

    function AudioTrimmer(props) {
        _classCallCheck(this, AudioTrimmer);

        var _this = _possibleConstructorReturn(this, (AudioTrimmer.__proto__ || Object.getPrototypeOf(AudioTrimmer)).call(this, props));

        (0, _lodash2.default)(_this, ['handleTrimStartMouseDown', 'handleTrimEndMouseDown', 'handleTrimStartMouseMove', 'handleTrimEndMouseMove', 'handleTrimStartMouseUp', 'handleTrimEndMouseUp', 'storeRef']);
        return _this;
    }

    _createClass(AudioTrimmer, [{
        key: 'handleTrimStartMouseMove',
        value: function handleTrimStartMouseMove(e) {
            var containerSize = this.containerElement.getBoundingClientRect().width;
            var dx = ((0, _touchUtils.getEventXY)(e).x - this.initialX) / containerSize;
            var newTrim = Math.max(0, Math.min(this.props.trimEnd - MIN_LENGTH, this.initialTrim + dx));
            this.props.onSetTrimStart(newTrim);
            e.preventDefault();
        }
    }, {
        key: 'handleTrimEndMouseMove',
        value: function handleTrimEndMouseMove(e) {
            var containerSize = this.containerElement.getBoundingClientRect().width;
            var dx = ((0, _touchUtils.getEventXY)(e).x - this.initialX) / containerSize;
            var newTrim = Math.min(1, Math.max(this.props.trimStart + MIN_LENGTH, this.initialTrim + dx));
            this.props.onSetTrimEnd(newTrim);
            e.preventDefault();
        }
    }, {
        key: 'handleTrimStartMouseUp',
        value: function handleTrimStartMouseUp() {
            window.removeEventListener('mousemove', this.handleTrimStartMouseMove);
            window.removeEventListener('mouseup', this.handleTrimStartMouseUp);
            window.removeEventListener('touchmove', this.handleTrimStartMouseMove);
            window.removeEventListener('touchend', this.handleTrimStartMouseUp);
        }
    }, {
        key: 'handleTrimEndMouseUp',
        value: function handleTrimEndMouseUp() {
            window.removeEventListener('mousemove', this.handleTrimEndMouseMove);
            window.removeEventListener('mouseup', this.handleTrimEndMouseUp);
            window.removeEventListener('touchmove', this.handleTrimEndMouseMove);
            window.removeEventListener('touchend', this.handleTrimEndMouseUp);
        }
    }, {
        key: 'handleTrimStartMouseDown',
        value: function handleTrimStartMouseDown(e) {
            this.initialX = (0, _touchUtils.getEventXY)(e).x;
            this.initialTrim = this.props.trimStart;
            window.addEventListener('mousemove', this.handleTrimStartMouseMove);
            window.addEventListener('mouseup', this.handleTrimStartMouseUp);
            window.addEventListener('touchmove', this.handleTrimStartMouseMove);
            window.addEventListener('touchend', this.handleTrimStartMouseUp);
        }
    }, {
        key: 'handleTrimEndMouseDown',
        value: function handleTrimEndMouseDown(e) {
            this.initialX = (0, _touchUtils.getEventXY)(e).x;
            this.initialTrim = this.props.trimEnd;
            window.addEventListener('mousemove', this.handleTrimEndMouseMove);
            window.addEventListener('mouseup', this.handleTrimEndMouseUp);
            window.addEventListener('touchmove', this.handleTrimEndMouseMove);
            window.addEventListener('touchend', this.handleTrimEndMouseUp);
        }
    }, {
        key: 'storeRef',
        value: function storeRef(el) {
            this.containerElement = el;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_audioTrimmer2.default, {
                containerRef: this.storeRef,
                playhead: this.props.playhead,
                trimEnd: this.props.trimEnd,
                trimStart: this.props.trimStart,
                onTrimEndMouseDown: this.handleTrimEndMouseDown,
                onTrimStartMouseDown: this.handleTrimStartMouseDown
            });
        }
    }]);

    return AudioTrimmer;
}(_react2.default.Component);

AudioTrimmer.propTypes = {
    onSetTrimEnd: _propTypes2.default.func,
    onSetTrimStart: _propTypes2.default.func,
    playhead: _propTypes2.default.number,
    trimEnd: _propTypes2.default.number,
    trimStart: _propTypes2.default.number
};

exports.default = AudioTrimmer;
