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

var _costumes = require('../lib/libraries/costumes.json');

var _costumes2 = _interopRequireDefault(_costumes);

var _library = require('../components/library/library.js');

var _library2 = _interopRequireDefault(_library);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CostumeLibrary = function (_React$PureComponent) {
    _inherits(CostumeLibrary, _React$PureComponent);

    function CostumeLibrary(props) {
        _classCallCheck(this, CostumeLibrary);

        var _this = _possibleConstructorReturn(this, (CostumeLibrary.__proto__ || Object.getPrototypeOf(CostumeLibrary)).call(this, props));

        (0, _lodash2.default)(_this, ['handleItemSelected']);
        return _this;
    }

    _createClass(CostumeLibrary, [{
        key: 'handleItemSelected',
        value: function handleItemSelected(item) {
            var vmCostume = {
                name: item.name,
                rotationCenterX: item.info[0],
                rotationCenterY: item.info[1],
                bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
                skinId: null
            };
            this.props.vm.addCostume(item.md5, vmCostume);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_library2.default, {
                data: _costumes2.default,
                title: 'Costume Library',
                onItemSelected: this.handleItemSelected,
                onRequestClose: this.props.onRequestClose
            });
        }
    }]);

    return CostumeLibrary;
}(_react2.default.PureComponent);

CostumeLibrary.propTypes = {
    onRequestClose: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

exports.default = CostumeLibrary;
