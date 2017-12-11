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

var _backdrops = require('../lib/libraries/backdrops.json');

var _backdrops2 = _interopRequireDefault(_backdrops);

var _library = require('../components/library/library.js');

var _library2 = _interopRequireDefault(_library);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackdropLibrary = function (_React$Component) {
    _inherits(BackdropLibrary, _React$Component);

    function BackdropLibrary(props) {
        _classCallCheck(this, BackdropLibrary);

        var _this = _possibleConstructorReturn(this, (BackdropLibrary.__proto__ || Object.getPrototypeOf(BackdropLibrary)).call(this, props));

        (0, _lodash2.default)(_this, ['handleItemSelect']);
        return _this;
    }

    _createClass(BackdropLibrary, [{
        key: 'handleItemSelect',
        value: function handleItemSelect(item) {
            var vmBackdrop = {
                name: item.name,
                rotationCenterX: item.info[0] && item.info[0] / 2,
                rotationCenterY: item.info[1] && item.info[1] / 2,
                bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
                skinId: null
            };
            this.props.vm.addBackdrop(item.md5, vmBackdrop);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_library2.default, {
                data: _backdrops2.default,
                title: 'Backdrop Library',
                onItemSelected: this.handleItemSelect,
                onRequestClose: this.props.onRequestClose
            });
        }
    }]);

    return BackdropLibrary;
}(_react2.default.Component);

BackdropLibrary.propTypes = {
    onRequestClose: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

exports.default = BackdropLibrary;
