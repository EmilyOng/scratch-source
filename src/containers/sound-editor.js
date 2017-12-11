'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _audioUtil = require('../lib/audio/audio-util.js');

var _audioEffects = require('../lib/audio/audio-effects.js');

var _audioEffects2 = _interopRequireDefault(_audioEffects);

var _soundEditor = require('../components/sound-editor/sound-editor.js');

var _soundEditor2 = _interopRequireDefault(_soundEditor);

var _audioBufferPlayer = require('../lib/audio/audio-buffer-player.js');

var _audioBufferPlayer2 = _interopRequireDefault(_audioBufferPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundEditor = function (_React$Component) {
    _inherits(SoundEditor, _React$Component);

    function SoundEditor(props) {
        _classCallCheck(this, SoundEditor);

        var _this = _possibleConstructorReturn(this, (SoundEditor.__proto__ || Object.getPrototypeOf(SoundEditor)).call(this, props));

        (0, _lodash2.default)(_this, ['handleStoppedPlaying', 'handleChangeName', 'handlePlay', 'handleStopPlaying', 'handleUpdatePlayhead', 'handleActivateTrim', 'handleUpdateTrimEnd', 'handleUpdateTrimStart', 'handleEffect', 'handleUndo', 'handleRedo', 'submitNewSamples']);
        _this.state = {
            chunkLevels: (0, _audioUtil.computeChunkedRMS)(_this.props.samples),
            playhead: null, // null is not playing, [0 -> 1] is playing percent
            trimStart: null,
            trimEnd: null
        };

        _this.redoStack = [];
        _this.undoStack = [];
        return _this;
    }

    _createClass(SoundEditor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audioBufferPlayer = new _audioBufferPlayer2.default(this.props.samples, this.props.sampleRate);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.soundId !== this.props.soundId) {
                // A different sound has been selected
                this.redoStack = [];
                this.undoStack = [];
                this.resetState(newProps.samples, newProps.sampleRate);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.audioBufferPlayer.stop();
        }
    }, {
        key: 'resetState',
        value: function resetState(samples, sampleRate) {
            this.audioBufferPlayer.stop();
            this.audioBufferPlayer = new _audioBufferPlayer2.default(samples, sampleRate);
            this.setState({
                chunkLevels: (0, _audioUtil.computeChunkedRMS)(samples),
                playhead: null,
                trimStart: null,
                trimEnd: null
            });
        }
    }, {
        key: 'submitNewSamples',
        value: function submitNewSamples(samples, sampleRate, skipUndo) {
            if (!skipUndo) {
                this.redoStack = [];
                this.undoStack.push(this.props.samples.slice(0));
            }
            this.resetState(samples, sampleRate);
            this.props.onUpdateSoundBuffer(this.props.soundIndex, this.audioBufferPlayer.buffer);
        }
    }, {
        key: 'handlePlay',
        value: function handlePlay() {
            this.audioBufferPlayer.play(this.state.trimStart || 0, this.state.trimEnd || 1, this.handleUpdatePlayhead, this.handleStoppedPlaying);
        }
    }, {
        key: 'handleStopPlaying',
        value: function handleStopPlaying() {
            this.audioBufferPlayer.stop();
            this.handleStoppedPlaying();
        }
    }, {
        key: 'handleStoppedPlaying',
        value: function handleStoppedPlaying() {
            this.setState({ playhead: null });
        }
    }, {
        key: 'handleUpdatePlayhead',
        value: function handleUpdatePlayhead(playhead) {
            this.setState({ playhead: playhead });
        }
    }, {
        key: 'handleChangeName',
        value: function handleChangeName(name) {
            this.props.onRenameSound(this.props.soundIndex, name);
        }
    }, {
        key: 'handleActivateTrim',
        value: function handleActivateTrim() {
            if (this.state.trimStart === null && this.state.trimEnd === null) {
                this.setState({ trimEnd: 0.95, trimStart: 0.05 });
            } else {
                var sampleCount = this.props.samples.length;
                var startIndex = Math.floor(this.state.trimStart * sampleCount);
                var endIndex = Math.floor(this.state.trimEnd * sampleCount);
                var clippedSamples = this.props.samples.slice(startIndex, endIndex);
                this.submitNewSamples(clippedSamples, this.props.sampleRate);
            }
        }
    }, {
        key: 'handleUpdateTrimEnd',
        value: function handleUpdateTrimEnd(trimEnd) {
            this.setState({ trimEnd: trimEnd });
        }
    }, {
        key: 'handleUpdateTrimStart',
        value: function handleUpdateTrimStart(trimStart) {
            this.setState({ trimStart: trimStart });
        }
    }, {
        key: 'effectFactory',
        value: function effectFactory(name) {
            var _this2 = this;

            return function () {
                return _this2.handleEffect(name);
            };
        }
    }, {
        key: 'handleEffect',
        value: function handleEffect(name) {
            var _this3 = this;

            var effects = new _audioEffects2.default(this.audioBufferPlayer.buffer, name);
            effects.process(function (_ref) {
                var renderedBuffer = _ref.renderedBuffer;

                var samples = renderedBuffer.getChannelData(0);
                var sampleRate = renderedBuffer.sampleRate;
                _this3.submitNewSamples(samples, sampleRate);
                _this3.handlePlay();
            });
        }
    }, {
        key: 'handleUndo',
        value: function handleUndo() {
            this.redoStack.push(this.props.samples.slice(0));
            var samples = this.undoStack.pop();
            if (samples) {
                this.submitNewSamples(samples, this.props.sampleRate, true);
                this.handlePlay();
            }
        }
    }, {
        key: 'handleRedo',
        value: function handleRedo() {
            var samples = this.redoStack.pop();
            if (samples) {
                this.undoStack.push(this.props.samples.slice(0));
                this.submitNewSamples(samples, this.props.sampleRate, true);
                this.handlePlay();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var effectTypes = _audioEffects2.default.effectTypes;

            return _react2.default.createElement(_soundEditor2.default, {
                canRedo: this.redoStack.length > 0,
                canUndo: this.undoStack.length > 0,
                chunkLevels: this.state.chunkLevels,
                name: this.props.name,
                playhead: this.state.playhead,
                trimEnd: this.state.trimEnd,
                trimStart: this.state.trimStart,
                onActivateTrim: this.handleActivateTrim,
                onChangeName: this.handleChangeName,
                onEcho: this.effectFactory(effectTypes.ECHO),
                onFaster: this.effectFactory(effectTypes.FASTER),
                onLouder: this.effectFactory(effectTypes.LOUDER),
                onPlay: this.handlePlay,
                onRedo: this.handleRedo,
                onReverse: this.effectFactory(effectTypes.REVERSE),
                onRobot: this.effectFactory(effectTypes.ROBOT),
                onSetTrimEnd: this.handleUpdateTrimEnd,
                onSetTrimStart: this.handleUpdateTrimStart,
                onSlower: this.effectFactory(effectTypes.SLOWER),
                onSofter: this.effectFactory(effectTypes.SOFTER),
                onStop: this.handleStopPlaying,
                onUndo: this.handleUndo
            });
        }
    }]);

    return SoundEditor;
}(_react2.default.Component);

SoundEditor.propTypes = {
    name: _propTypes2.default.string.isRequired,
    onRenameSound: _propTypes2.default.func.isRequired,
    onUpdateSoundBuffer: _propTypes2.default.func.isRequired,
    sampleRate: _propTypes2.default.number,
    samples: _propTypes2.default.instanceOf(Float32Array),
    soundId: _propTypes2.default.string,
    soundIndex: _propTypes2.default.number
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
    var soundIndex = _ref2.soundIndex;

    var sound = state.vm.editingTarget.sprite.sounds[soundIndex];
    var audioBuffer = state.vm.getSoundBuffer(soundIndex);
    return {
        soundId: sound.soundId,
        sampleRate: audioBuffer.sampleRate,
        samples: audioBuffer.getChannelData(0),
        name: sound.name,
        onRenameSound: state.vm.renameSound.bind(state.vm),
        onUpdateSoundBuffer: state.vm.updateSoundBuffer.bind(state.vm)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SoundEditor);
