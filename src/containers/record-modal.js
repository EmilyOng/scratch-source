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

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _wavEncoder = require('wav-encoder');

var _wavEncoder2 = _interopRequireDefault(_wavEncoder);

var _reactRedux = require('react-redux');

var _recordModal = require('../components/record-modal/record-modal.js');

var _recordModal2 = _interopRequireDefault(_recordModal);

var _modals = require('../reducers/modals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordModal = function (_React$Component) {
    _inherits(RecordModal, _React$Component);

    function RecordModal(props) {
        _classCallCheck(this, RecordModal);

        var _this = _possibleConstructorReturn(this, (RecordModal.__proto__ || Object.getPrototypeOf(RecordModal)).call(this, props));

        (0, _lodash2.default)(_this, ['handleRecord', 'handleStopRecording', 'handlePlay', 'handleStopPlaying', 'handleBack', 'handleSubmit', 'handleCancel', 'handleSetPlayhead', 'handleSetTrimStart', 'handleSetTrimEnd']);

        _this.state = {
            samples: null,
            encoding: false,
            levels: null,
            playhead: null,
            playing: false,
            recording: false,
            sampleRate: null,
            trimStart: 0,
            trimEnd: 1
        };
        return _this;
    }

    _createClass(RecordModal, [{
        key: 'handleRecord',
        value: function handleRecord() {
            this.setState({ recording: true });
        }
    }, {
        key: 'handleStopRecording',
        value: function handleStopRecording(samples, sampleRate, levels, trimStart, trimEnd) {
            this.setState({ samples: samples, sampleRate: sampleRate, levels: levels, trimStart: trimStart, trimEnd: trimEnd, recording: false });
        }
    }, {
        key: 'handlePlay',
        value: function handlePlay() {
            this.setState({ playing: true });
        }
    }, {
        key: 'handleStopPlaying',
        value: function handleStopPlaying() {
            this.setState({ playing: false, playhead: null });
        }
    }, {
        key: 'handleBack',
        value: function handleBack() {
            this.setState({ playing: false, samples: null });
        }
    }, {
        key: 'handleSetTrimEnd',
        value: function handleSetTrimEnd(trimEnd) {
            this.setState({ trimEnd: trimEnd });
        }
    }, {
        key: 'handleSetTrimStart',
        value: function handleSetTrimStart(trimStart) {
            this.setState({ trimStart: trimStart });
        }
    }, {
        key: 'handleSetPlayhead',
        value: function handleSetPlayhead(playhead) {
            this.setState({ playhead: playhead });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var _this2 = this;

            this.setState({ encoding: true }, function () {
                var sampleCount = _this2.state.samples.length;
                var startIndex = Math.floor(_this2.state.trimStart * sampleCount);
                var endIndex = Math.floor(_this2.state.trimEnd * sampleCount);
                var clippedSamples = _this2.state.samples.slice(startIndex, endIndex);
                _wavEncoder2.default.encode({
                    sampleRate: _this2.state.sampleRate,
                    channelData: [clippedSamples]
                }).then(function (wavBuffer) {
                    var md5 = String(Math.floor(100000 * Math.random()));
                    var vmSound = {
                        format: '',
                        md5: md5 + '.wav',
                        name: 'recording ' + _this2.props.vm.editingTarget.sprite.sounds.length
                    };

                    // Load the encoded .wav into the storage cache
                    var storage = _this2.props.vm.runtime.storage;
                    storage.builtinHelper.cache(storage.AssetType.Sound, storage.DataFormat.WAV, new Uint8Array(wavBuffer), md5);

                    _this2.props.vm.addSound(vmSound);
                    _this2.handleCancel();
                });
            });
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            this.props.onClose();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_recordModal2.default, {
                encoding: this.state.encoding,
                levels: this.state.levels,
                playhead: this.state.playhead,
                playing: this.state.playing,
                recording: this.state.recording,
                sampleRate: this.state.sampleRate,
                samples: this.state.samples,
                trimEnd: this.state.trimEnd,
                trimStart: this.state.trimStart,
                onBack: this.handleBack,
                onCancel: this.handleCancel,
                onPlay: this.handlePlay,
                onRecord: this.handleRecord,
                onSetPlayhead: this.handleSetPlayhead,
                onSetTrimEnd: this.handleSetTrimEnd,
                onSetTrimStart: this.handleSetTrimStart,
                onStopPlaying: this.handleStopPlaying,
                onStopRecording: this.handleStopRecording,
                onSubmit: this.handleSubmit
            });
        }
    }]);

    return RecordModal;
}(_react2.default.Component);

RecordModal.propTypes = {
    onClose: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default)
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        vm: state.vm
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClose: function onClose() {
            dispatch((0, _modals.closeSoundRecorder)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordModal);
