'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _modals = require('../reducers/modals');

var _targetPane = require('../components/target-pane/target-pane.js');

var _targetPane2 = _interopRequireDefault(_targetPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TargetPane = function (_React$Component) {
    _inherits(TargetPane, _React$Component);

    function TargetPane(props) {
        _classCallCheck(this, TargetPane);

        var _this = _possibleConstructorReturn(this, (TargetPane.__proto__ || Object.getPrototypeOf(TargetPane)).call(this, props));

        (0, _lodash2.default)(_this, ['handleChangeSpriteDirection', 'handleChangeSpriteName', 'handleChangeSpriteRotationStyle', 'handleChangeSpriteVisibility', 'handleChangeSpriteX', 'handleChangeSpriteY', 'handleDeleteSprite', 'handleDuplicateSprite', 'handleSelectSprite']);
        return _this;
    }

    _createClass(TargetPane, [{
        key: 'handleChangeSpriteDirection',
        value: function handleChangeSpriteDirection(direction) {
            this.props.vm.postSpriteInfo({ direction: direction });
        }
    }, {
        key: 'handleChangeSpriteName',
        value: function handleChangeSpriteName(name) {
            this.props.vm.renameSprite(this.props.editingTarget, name);
        }
    }, {
        key: 'handleChangeSpriteRotationStyle',
        value: function handleChangeSpriteRotationStyle(rotationStyle) {
            this.props.vm.postSpriteInfo({ rotationStyle: rotationStyle });
        }
    }, {
        key: 'handleChangeSpriteVisibility',
        value: function handleChangeSpriteVisibility(visible) {
            this.props.vm.postSpriteInfo({ visible: visible });
        }
    }, {
        key: 'handleChangeSpriteX',
        value: function handleChangeSpriteX(x) {
            this.props.vm.postSpriteInfo({ x: x });
        }
    }, {
        key: 'handleChangeSpriteY',
        value: function handleChangeSpriteY(y) {
            this.props.vm.postSpriteInfo({ y: y });
        }
    }, {
        key: 'handleDeleteSprite',
        value: function handleDeleteSprite(id) {
            this.props.vm.deleteSprite(id);
        }
    }, {
        key: 'handleDuplicateSprite',
        value: function handleDuplicateSprite(id) {
            this.props.vm.duplicateSprite(id);
        }
    }, {
        key: 'handleSelectSprite',
        value: function handleSelectSprite(id) {
            this.props.vm.setEditingTarget(id);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_targetPane2.default, _extends({}, this.props, {
                onChangeSpriteDirection: this.handleChangeSpriteDirection,
                onChangeSpriteName: this.handleChangeSpriteName,
                onChangeSpriteRotationStyle: this.handleChangeSpriteRotationStyle,
                onChangeSpriteVisibility: this.handleChangeSpriteVisibility,
                onChangeSpriteX: this.handleChangeSpriteX,
                onChangeSpriteY: this.handleChangeSpriteY,
                onDeleteSprite: this.handleDeleteSprite,
                onDuplicateSprite: this.handleDuplicateSprite,
                onSelectSprite: this.handleSelectSprite
            }));
        }
    }]);

    return TargetPane;
}(_react2.default.Component);

var _TargetPaneComponent$ = _targetPane2.default.propTypes,
    onSelectSprite = _TargetPaneComponent$.onSelectSprite,
    targetPaneProps = _objectWithoutProperties(_TargetPaneComponent$, ['onSelectSprite']);

TargetPane.propTypes = _extends({}, targetPaneProps);

var mapStateToProps = function mapStateToProps(state) {
    return {
        editingTarget: state.targets.editingTarget,
        sprites: Object.keys(state.targets.sprites).reduce(function (sprites, k) {
            var _state$targets$sprite = state.targets.sprites[k],
                direction = _state$targets$sprite.direction,
                x = _state$targets$sprite.x,
                y = _state$targets$sprite.y,
                sprite = _objectWithoutProperties(_state$targets$sprite, ['direction', 'x', 'y']);

            if (typeof direction !== 'undefined') direction = Math.round(direction);
            if (typeof x !== 'undefined') x = Math.round(x);
            if (typeof y !== 'undefined') y = Math.round(y);
            sprites[k] = _extends({}, sprite, { direction: direction, x: x, y: y });
            return sprites;
        }, {}),
        stage: state.targets.stage,
        soundLibraryVisible: state.modals.soundLibrary,
        spriteLibraryVisible: state.modals.spriteLibrary,
        costumeLibraryVisible: state.modals.costumeLibrary,
        backdropLibraryVisible: state.modals.backdropLibrary
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onNewSpriteClick: function onNewSpriteClick(e) {
            e.preventDefault();
            dispatch((0, _modals.openSpriteLibrary)());
        },
        onRequestCloseBackdropLibrary: function onRequestCloseBackdropLibrary() {
            dispatch((0, _modals.closeBackdropLibrary)());
        },
        onRequestCloseCostumeLibrary: function onRequestCloseCostumeLibrary() {
            dispatch((0, _modals.closeCostumeLibrary)());
        },
        onRequestCloseSoundLibrary: function onRequestCloseSoundLibrary() {
            dispatch((0, _modals.closeSoundLibrary)());
        },
        onRequestCloseSpriteLibrary: function onRequestCloseSpriteLibrary() {
            dispatch((0, _modals.closeSpriteLibrary)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TargetPane);
