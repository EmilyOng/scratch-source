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

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _scratchAudio = require('scratch-audio');

var _scratchAudio2 = _interopRequireDefault(_scratchAudio);

var _library = require('../components/library/library.js');

var _library2 = _interopRequireDefault(_library);

var _iconSound = require('../components/asset-panel/icon--sound.svg');

var _iconSound2 = _interopRequireDefault(_iconSound);

var _sounds = require('../lib/libraries/sounds.json');

var _sounds2 = _interopRequireDefault(_sounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundLibrary = function (_React$PureComponent) {
    _inherits(SoundLibrary, _React$PureComponent);

    function SoundLibrary(props) {
        _classCallCheck(this, SoundLibrary);

        var _this = _possibleConstructorReturn(this, (SoundLibrary.__proto__ || Object.getPrototypeOf(SoundLibrary)).call(this, props));

        (0, _lodash2.default)(_this, ['handleItemSelected', 'handleItemMouseEnter', 'handleItemMouseLeave']);
        return _this;
    }

    _createClass(SoundLibrary, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audioEngine = new _scratchAudio2.default();
            this.player = this.audioEngine.createPlayer();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.player.stopAllSounds();
        }
    }, {
        key: 'handleItemMouseEnter',
        value: function handleItemMouseEnter(soundItem) {
            var _this2 = this;

            var md5ext = soundItem._md5;
            var idParts = md5ext.split('.');
            var md5 = idParts[0];
            var vm = this.props.vm;
            vm.runtime.storage.load(vm.runtime.storage.AssetType.Sound, md5).then(function (soundAsset) {
                var sound = {
                    md5: md5ext,
                    name: soundItem.name,
                    format: soundItem.format,
                    data: soundAsset.data
                };
                return _this2.audioEngine.decodeSound(sound);
            }).then(function (soundId) {
                _this2.player.playSound(soundId);
            });
        }
    }, {
        key: 'handleItemMouseLeave',
        value: function handleItemMouseLeave() {
            this.player.stopAllSounds();
        }
    }, {
        key: 'handleItemSelected',
        value: function handleItemSelected(soundItem) {
            var vmSound = {
                format: soundItem.format,
                md5: soundItem._md5,
                rate: soundItem.rate,
                sampleCount: soundItem.sampleCount,
                name: soundItem.name
            };
            this.props.vm.addSound(vmSound);
        }
    }, {
        key: 'render',
        value: function render() {
            // @todo need to use this hack to avoid library using md5 for image
            var soundLibraryThumbnailData = _sounds2.default.map(function (sound) {
                var md5 = sound.md5,
                    otherData = _objectWithoutProperties(sound, ['md5']);

                return _extends({
                    _md5: md5,
                    rawURL: _iconSound2.default
                }, otherData);
            });

            return _react2.default.createElement(_library2.default, {
                data: soundLibraryThumbnailData,
                title: 'Sound Library',
                onItemMouseEnter: this.handleItemMouseEnter,
                onItemMouseLeave: this.handleItemMouseLeave,
                onItemSelected: this.handleItemSelected,
                onRequestClose: this.props.onRequestClose
            });
        }
    }]);

    return SoundLibrary;
}(_react2.default.PureComponent);

SoundLibrary.propTypes = {
    onRequestClose: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

exports.default = SoundLibrary;
