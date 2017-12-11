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

var _iconAddCostumeLib = require('../components/asset-panel/icon--add-costume-lib.svg');

var _iconAddCostumeLib2 = _interopRequireDefault(_iconAddCostumeLib);

var _paintEditorWrapper = require('./paint-editor-wrapper.js');

var _paintEditorWrapper2 = _interopRequireDefault(_paintEditorWrapper);

var _reactRedux = require('react-redux');

var _modals = require('../reducers/modals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CostumeTab = function (_React$Component) {
    _inherits(CostumeTab, _React$Component);

    function CostumeTab(props) {
        _classCallCheck(this, CostumeTab);

        var _this = _possibleConstructorReturn(this, (CostumeTab.__proto__ || Object.getPrototypeOf(CostumeTab)).call(this, props));

        (0, _lodash2.default)(_this, ['handleSelectCostume', 'handleDeleteCostume']);
        _this.state = { selectedCostumeIndex: 0 };
        return _this;
    }

    _createClass(CostumeTab, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var editingTarget = nextProps.editingTarget,
                sprites = nextProps.sprites,
                stage = nextProps.stage;


            var target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
            if (target && target.costumes && this.state.selectedCostumeIndex > target.costumes.length - 1) {
                this.setState({ selectedCostumeIndex: target.costumes.length - 1 });
            }
        }
    }, {
        key: 'handleSelectCostume',
        value: function handleSelectCostume(costumeIndex) {
            this.props.vm.editingTarget.setCostume(costumeIndex);
            this.setState({ selectedCostumeIndex: costumeIndex });
        }
    }, {
        key: 'handleDeleteCostume',
        value: function handleDeleteCostume(costumeIndex) {
            this.props.vm.deleteCostume(costumeIndex);
        }
    }, {
        key: 'render',
        value: function render() {
            // For paint wrapper
            var _props = this.props,
                onNewBackdropClick = _props.onNewBackdropClick,
                onNewCostumeClick = _props.onNewCostumeClick,
                props = _objectWithoutProperties(_props, ['onNewBackdropClick', 'onNewCostumeClick']);

            var editingTarget = props.editingTarget,
                sprites = props.sprites,
                stage = props.stage;


            var target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

            if (!target) {
                return null;
            }

            var addBackdropMsg = _react2.default.createElement(_reactIntl.FormattedMessage, {
                defaultMessage: 'Add Backdrop',
                description: 'Button to add a backdrop in the editor tab',
                id: 'gui.costumeTab.addBackdrop'
            });
            var addCostumeMsg = _react2.default.createElement(_reactIntl.FormattedMessage, {
                defaultMessage: 'Add Costume',
                description: 'Button to add a costume in the editor tab',
                id: 'gui.costumeTab.addCostume'
            });

            var addMessage = target.isStage ? addBackdropMsg : addCostumeMsg;
            var addFunc = target.isStage ? onNewBackdropClick : onNewCostumeClick;

            return _react2.default.createElement(
                _assetPanel2.default,
                {
                    buttons: [{
                        message: addMessage,
                        img: _iconAddCostumeLib2.default,
                        onClick: addFunc
                    }],
                    items: target.costumes || [],
                    selectedItemIndex: this.state.selectedCostumeIndex,
                    onDeleteClick: this.handleDeleteCostume,
                    onItemClick: this.handleSelectCostume
                },
                target.costumes ? _react2.default.createElement(_paintEditorWrapper2.default, _extends({}, props, {
                    selectedCostumeIndex: this.state.selectedCostumeIndex
                })) : null
            );
        }
    }]);

    return CostumeTab;
}(_react2.default.Component);

CostumeTab.propTypes = {
    editingTarget: _propTypes2.default.string,
    onNewBackdropClick: _propTypes2.default.func.isRequired,
    onNewCostumeClick: _propTypes2.default.func.isRequired,
    sprites: _propTypes2.default.shape({
        id: _propTypes2.default.shape({
            costumes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
                url: _propTypes2.default.string,
                name: _propTypes2.default.string.isRequired
            }))
        })
    }),
    stage: _propTypes2.default.shape({
        sounds: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            name: _propTypes2.default.string.isRequired
        }))
    }),
    vm: _propTypes2.default.instanceOf(_scratchVm2.default)
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        editingTarget: state.targets.editingTarget,
        sprites: state.targets.sprites,
        stage: state.targets.stage,
        costumeLibraryVisible: state.modals.costumeLibrary,
        backdropLibraryVisible: state.modals.backdropLibrary
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onNewBackdropClick: function onNewBackdropClick(e) {
            e.preventDefault();
            dispatch((0, _modals.openBackdropLibrary)());
        },
        onNewCostumeClick: function onNewCostumeClick(e) {
            e.preventDefault();
            dispatch((0, _modals.openCostumeLibrary)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CostumeTab);
