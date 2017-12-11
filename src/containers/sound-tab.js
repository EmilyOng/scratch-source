'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactIntl = require('react-intl');

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _assetPanel = require('../components/asset-panel/asset-panel.js');

var _assetPanel2 = _interopRequireDefault(_assetPanel);

var _iconSound = require('../components/asset-panel/icon--sound.svg');

var _iconSound2 = _interopRequireDefault(_iconSound);

var _iconAddSoundLib = require('../components/asset-panel/icon--add-sound-lib.svg');

var _iconAddSoundLib2 = _interopRequireDefault(_iconAddSoundLib);

var _iconAddSoundRecord = require('../components/asset-panel/icon--add-sound-record.svg');

var _iconAddSoundRecord2 = _interopRequireDefault(_iconAddSoundRecord);

var _recordModal = require('./record-modal.js');

var _recordModal2 = _interopRequireDefault(_recordModal);

var _soundEditor = require('./sound-editor.js');

var _soundEditor2 = _interopRequireDefault(_soundEditor);

var _reactRedux = require('react-redux');

var _modals = require('../reducers/modals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundTab = function (_React$Component) {
    _inherits(SoundTab, _React$Component);

    function SoundTab(props) {
        _classCallCheck(this, SoundTab);

        var _this = _possibleConstructorReturn(this, (SoundTab.__proto__ || Object.getPrototypeOf(SoundTab)).call(this, props));

        (0, _lodash2.default)(_this, ['handleSelectSound', 'handleDeleteSound']);
        _this.state = { selectedSoundIndex: 0 };
        return _this;
    }

    _createClass(SoundTab, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var editingTarget = nextProps.editingTarget,
                sprites = nextProps.sprites,
                stage = nextProps.stage;


            var target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

            if (target && target.sounds && this.state.selectedSoundIndex > target.sounds.length - 1) {
                this.setState({ selectedSoundIndex: Math.max(target.sounds.length - 1, 0) });
            }
        }
    }, {
        key: 'handleSelectSound',
        value: function handleSelectSound(soundIndex) {
            this.setState({ selectedSoundIndex: soundIndex });
        }
    }, {
        key: 'handleDeleteSound',
        value: function handleDeleteSound(soundIndex) {
            this.props.vm.deleteSound(soundIndex);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                vm = _props.vm,
                onNewSoundFromLibraryClick = _props.onNewSoundFromLibraryClick,
                onNewSoundFromRecordingClick = _props.onNewSoundFromRecordingClick;


            if (!vm.editingTarget) {
                return null;
            }

            var sprite = vm.editingTarget.sprite;

            var sounds = sprite.sounds ? sprite.sounds.map(function (sound) {
                return {
                    url: _iconSound2.default,
                    name: sound.name
                };
            }) : [];

            var recordSoundMsg = _react2.default.createElement(_reactIntl.FormattedMessage, {
                defaultMessage: 'Record Sound',
                description: 'Button to record a sound in the editor tab',
                id: 'gui.soundTab.recordSound'
            });
            var addSoundMsg = _react2.default.createElement(_reactIntl.FormattedMessage, {
                defaultMessage: 'Add Sound',
                description: 'Button to add a sound in the editor tab',
                id: 'gui.soundTab.addSound'
            });

            return _react2.default.createElement(
                _assetPanel2.default,
                {
                    buttons: [{
                        message: recordSoundMsg,
                        img: _iconAddSoundRecord2.default,
                        onClick: onNewSoundFromRecordingClick
                    }, {
                        message: addSoundMsg,
                        img: _iconAddSoundLib2.default,
                        onClick: onNewSoundFromLibraryClick
                    }],
                    items: sounds.map(function (sound) {
                        return _extends({
                            url: _iconSound2.default
                        }, sound);
                    }),
                    selectedItemIndex: this.state.selectedSoundIndex,
                    onDeleteClick: this.handleDeleteSound,
                    onItemClick: this.handleSelectSound
                },
                sprite.sounds && sprite.sounds.length > 0 ? _react2.default.createElement(_soundEditor2.default, { soundIndex: this.state.selectedSoundIndex }) : null,
                this.props.soundRecorderVisible ? _react2.default.createElement(_recordModal2.default, null) : null
            );
        }
    }]);

    return SoundTab;
}(_react2.default.Component);

SoundTab.propTypes = {
    editingTarget: _propTypes2.default.string,
    onNewSoundFromLibraryClick: _propTypes2.default.func.isRequired,
    onNewSoundFromRecordingClick: _propTypes2.default.func.isRequired,
    soundRecorderVisible: _propTypes2.default.bool,
    sprites: _propTypes2.default.shape({
        id: _propTypes2.default.shape({
            sounds: _propTypes2.default.arrayOf(_propTypes2.default.shape({
                name: _propTypes2.default.string.isRequired
            }))
        })
    }),
    stage: _propTypes2.default.shape({
        sounds: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            name: _propTypes2.default.string.isRequired
        }))
    }),
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        editingTarget: state.targets.editingTarget,
        sprites: state.targets.sprites,
        stage: state.targets.stage,
        soundRecorderVisible: state.modals.soundRecorder
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onNewSoundFromLibraryClick: function onNewSoundFromLibraryClick(e) {
            e.preventDefault();
            dispatch((0, _modals.openSoundLibrary)());
        },
        onNewSoundFromRecordingClick: function onNewSoundFromRecordingClick() {
            dispatch((0, _modals.openSoundRecorder)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SoundTab);
