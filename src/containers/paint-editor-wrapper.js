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

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _scratchPaint = require('scratch-paint');

var _scratchPaint2 = _interopRequireDefault(_scratchPaint);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaintEditorWrapper = function (_React$Component) {
    _inherits(PaintEditorWrapper, _React$Component);

    function PaintEditorWrapper(props) {
        _classCallCheck(this, PaintEditorWrapper);

        var _this = _possibleConstructorReturn(this, (PaintEditorWrapper.__proto__ || Object.getPrototypeOf(PaintEditorWrapper)).call(this, props));

        (0, _lodash2.default)(_this, ['handleUpdateName', 'handleUpdateSvg']);
        return _this;
    }

    _createClass(PaintEditorWrapper, [{
        key: 'handleUpdateName',
        value: function handleUpdateName(name) {
            this.props.vm.renameCostume(this.props.selectedCostumeIndex, name);
        }
    }, {
        key: 'handleUpdateSvg',
        value: function handleUpdateSvg(svg, rotationCenterX, rotationCenterY) {
            this.props.vm.updateSvg(this.props.selectedCostumeIndex, svg, rotationCenterX, rotationCenterY);
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.svgId) return null;
            return _react2.default.createElement(_scratchPaint2.default, _extends({}, this.props, {
                svg: this.props.vm.getCostumeSvg(this.props.selectedCostumeIndex),
                onUpdateName: this.handleUpdateName,
                onUpdateSvg: this.handleUpdateSvg
            }));
        }
    }]);

    return PaintEditorWrapper;
}(_react2.default.Component);

PaintEditorWrapper.propTypes = {
    name: _propTypes2.default.string,
    rotationCenterX: _propTypes2.default.number,
    rotationCenterY: _propTypes2.default.number,
    selectedCostumeIndex: _propTypes2.default.number.isRequired,
    svgId: _propTypes2.default.string,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default)
};

var mapStateToProps = function mapStateToProps(state, _ref) {
    var selectedCostumeIndex = _ref.selectedCostumeIndex;
    var _state$targets = state.targets,
        editingTarget = _state$targets.editingTarget,
        sprites = _state$targets.sprites,
        stage = _state$targets.stage;

    var target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
    var costume = target && target.costumes[selectedCostumeIndex];
    return {
        name: costume && costume.name,
        rotationCenterX: costume && costume.rotationCenterX,
        rotationCenterY: costume && costume.rotationCenterY,
        svgId: editingTarget && '' + editingTarget + costume.skinId
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PaintEditorWrapper);
