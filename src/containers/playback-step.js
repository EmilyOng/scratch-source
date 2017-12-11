'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _playbackStep = require('../components/record-modal/playback-step.js');

var _playbackStep2 = _interopRequireDefault(_playbackStep);

var _audioBufferPlayer = require('../lib/audio/audio-buffer-player.js');

var _audioBufferPlayer2 = _interopRequireDefault(_audioBufferPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaybackStep = function (_React$Component) {
    _inherits(PlaybackStep, _React$Component);

    function PlaybackStep(props) {
        _classCallCheck(this, PlaybackStep);

        var _this = _possibleConstructorReturn(this, (PlaybackStep.__proto__ || Object.getPrototypeOf(PlaybackStep)).call(this, props));

        (0, _lodash2.default)(_this, ['handlePlay', 'handleStopPlaying']);
        return _this;
    }

    _createClass(PlaybackStep, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audioBufferPlayer = new _audioBufferPlayer2.default(this.props.samples, this.props.sampleRate);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.audioBufferPlayer.stop();
        }
    }, {
        key: 'handlePlay',
        value: function handlePlay() {
            this.audioBufferPlayer.play(this.props.trimStart, this.props.trimEnd, this.props.onSetPlayhead, this.props.onStopPlaying);
            this.props.onPlay();
        }
    }, {
        key: 'handleStopPlaying',
        value: function handleStopPlaying() {
            this.audioBufferPlayer.stop();
            this.props.onStopPlaying();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                sampleRate = _props.sampleRate,
                onPlay = _props.onPlay,
                onStopPlaying = _props.onStopPlaying,
                onSetPlayhead = _props.onSetPlayhead,
                componentProps = _objectWithoutProperties(_props, ['sampleRate', 'onPlay', 'onStopPlaying', 'onSetPlayhead']);

            return _react2.default.createElement(_playbackStep2.default, _extends({
                onPlay: this.handlePlay,
                onStopPlaying: this.handleStopPlaying
            }, componentProps));
        }
    }]);

    return PlaybackStep;
}(_react2.default.Component);

PlaybackStep.propTypes = _extends({
    sampleRate: _propTypes2.default.number.isRequired,
    samples: _propTypes2.default.instanceOf(Float32Array).isRequired
}, _playbackStep2.default.propTypes);

exports.default = PlaybackStep;
