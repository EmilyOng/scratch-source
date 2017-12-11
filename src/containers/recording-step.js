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

var _recordingStep = require('../components/record-modal/recording-step.js');

var _recordingStep2 = _interopRequireDefault(_recordingStep);

var _audioRecorder = require('../lib/audio/audio-recorder.js');

var _audioRecorder2 = _interopRequireDefault(_audioRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordingStep = function (_React$Component) {
    _inherits(RecordingStep, _React$Component);

    function RecordingStep(props) {
        _classCallCheck(this, RecordingStep);

        var _this = _possibleConstructorReturn(this, (RecordingStep.__proto__ || Object.getPrototypeOf(RecordingStep)).call(this, props));

        (0, _lodash2.default)(_this, ['handleRecord', 'handleStopRecording', 'handleStarted', 'handleLevelUpdate', 'handleRecordingError']);

        _this.state = {
            listening: false,
            level: 0,
            levels: null
        };
        return _this;
    }

    _createClass(RecordingStep, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audioRecorder = new _audioRecorder2.default();
            this.audioRecorder.startListening(this.handleStarted, this.handleLevelUpdate, this.handleRecordingError);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.audioRecorder.dispose();
        }
    }, {
        key: 'handleStarted',
        value: function handleStarted() {
            this.setState({ listening: true });
        }
    }, {
        key: 'handleRecordingError',
        value: function handleRecordingError() {
            alert('Could not start recording'); // eslint-disable-line no-alert
        }
    }, {
        key: 'handleLevelUpdate',
        value: function handleLevelUpdate(level) {
            this.setState({ level: level });
            if (this.props.recording) {
                this.setState({ levels: (this.state.levels || []).concat([level]) });
            }
        }
    }, {
        key: 'handleRecord',
        value: function handleRecord() {
            this.audioRecorder.startRecording();
            this.props.onRecord();
        }
    }, {
        key: 'handleStopRecording',
        value: function handleStopRecording() {
            var _audioRecorder$stop = this.audioRecorder.stop(),
                samples = _audioRecorder$stop.samples,
                sampleRate = _audioRecorder$stop.sampleRate,
                levels = _audioRecorder$stop.levels,
                trimStart = _audioRecorder$stop.trimStart,
                trimEnd = _audioRecorder$stop.trimEnd;

            this.props.onStopRecording(samples, sampleRate, levels, trimStart, trimEnd);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onRecord = _props.onRecord,
                onStopRecording = _props.onStopRecording,
                componentProps = _objectWithoutProperties(_props, ['onRecord', 'onStopRecording']);

            return _react2.default.createElement(_recordingStep2.default, _extends({
                level: this.state.level,
                levels: this.state.levels,
                listening: this.state.listening,
                onRecord: this.handleRecord,
                onStopRecording: this.handleStopRecording
            }, componentProps));
        }
    }]);

    return RecordingStep;
}(_react2.default.Component);

RecordingStep.propTypes = {
    onRecord: _propTypes2.default.func.isRequired,
    onStopRecording: _propTypes2.default.func.isRequired,
    recording: _propTypes2.default.bool
};

exports.default = RecordingStep;
