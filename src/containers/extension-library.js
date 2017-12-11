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

var _index = require('../lib/libraries/extensions/index');

var _index2 = _interopRequireDefault(_index);

var _library = require('../components/library/library.js');

var _library2 = _interopRequireDefault(_library);

var _iconSprite = require('../components/sprite-selector/icon--sprite.svg');

var _iconSprite2 = _interopRequireDefault(_iconSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtensionLibrary = function (_React$PureComponent) {
    _inherits(ExtensionLibrary, _React$PureComponent);

    function ExtensionLibrary(props) {
        _classCallCheck(this, ExtensionLibrary);

        var _this = _possibleConstructorReturn(this, (ExtensionLibrary.__proto__ || Object.getPrototypeOf(ExtensionLibrary)).call(this, props));

        (0, _lodash2.default)(_this, ['handleItemSelect']);
        return _this;
    }

    _createClass(ExtensionLibrary, [{
        key: 'handleItemSelect',
        value: function handleItemSelect(item) {
            var _this2 = this;

            // eslint-disable-next-line no-alert
            var url = item.extensionURL || prompt('Enter the URL of the extension');
            if (url) {
                if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                    this.props.onCategorySelected(item.name);
                } else {
                    this.props.vm.extensionManager.loadExtensionURL(url).then(function () {
                        _this2.props.onCategorySelected(item.name);
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var extensionLibraryThumbnailData = _index2.default.map(function (extension) {
                return _extends({
                    rawURL: extension.iconURL || _iconSprite2.default
                }, extension);
            });
            return _react2.default.createElement(_library2.default, {
                data: extensionLibraryThumbnailData,
                title: 'Extension Library',
                visible: this.props.visible,
                onItemSelected: this.handleItemSelect,
                onRequestClose: this.props.onRequestClose
            });
        }
    }]);

    return ExtensionLibrary;
}(_react2.default.PureComponent);

ExtensionLibrary.propTypes = {
    onCategorySelected: _propTypes2.default.func,
    onRequestClose: _propTypes2.default.func,
    visible: _propTypes2.default.bool,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired // eslint-disable-line react/no-unused-prop-types
};

exports.default = ExtensionLibrary;
