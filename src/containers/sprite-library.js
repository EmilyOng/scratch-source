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

var _sprites = require('../lib/libraries/sprites.json');

var _sprites2 = _interopRequireDefault(_sprites);

var _library = require('../components/library/library.js');

var _library2 = _interopRequireDefault(_library);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpriteLibrary = function (_React$PureComponent) {
    _inherits(SpriteLibrary, _React$PureComponent);

    function SpriteLibrary(props) {
        _classCallCheck(this, SpriteLibrary);

        var _this = _possibleConstructorReturn(this, (SpriteLibrary.__proto__ || Object.getPrototypeOf(SpriteLibrary)).call(this, props));

        (0, _lodash2.default)(_this, ['handleItemSelect', 'handleMouseEnter', 'handleMouseLeave', 'rotateCostume', 'startRotatingCostumes', 'stopRotatingCostumes']);
        _this.state = {
            activeSprite: null,
            costumeIndex: 0,
            sprites: _sprites2.default
        };
        return _this;
    }

    _createClass(SpriteLibrary, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.intervalId);
        }
    }, {
        key: 'handleItemSelect',
        value: function handleItemSelect(item) {
            this.props.vm.addSprite2(JSON.stringify(item.json));
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(item) {
            this.stopRotatingCostumes();
            this.setState({ activeSprite: item }, this.startRotatingCostumes);
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.stopRotatingCostumes();
        }
    }, {
        key: 'startRotatingCostumes',
        value: function startRotatingCostumes() {
            if (!this.state.activeSprite) return;
            this.rotateCostume();
            this.intervalId = setInterval(this.rotateCostume, 300);
        }
    }, {
        key: 'stopRotatingCostumes',
        value: function stopRotatingCostumes() {
            this.intervalId = clearInterval(this.intervalId);
        }
    }, {
        key: 'rotateCostume',
        value: function rotateCostume() {
            var _this2 = this;

            var costumes = this.state.activeSprite.json.costumes;
            var nextCostumeIndex = (this.state.costumeIndex + 1) % costumes.length;
            this.setState({
                costumeIndex: nextCostumeIndex,
                sprites: this.state.sprites.map(function (sprite) {
                    if (sprite.name === _this2.state.activeSprite.name) {
                        return _extends({}, sprite, {
                            md5: sprite.json.costumes[nextCostumeIndex].baseLayerMD5
                        });
                    }
                    return sprite;
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_library2.default, {
                data: this.state.sprites,
                title: 'Sprite Library',
                onItemMouseEnter: this.handleMouseEnter,
                onItemMouseLeave: this.handleMouseLeave,
                onItemSelected: this.handleItemSelect,
                onRequestClose: this.props.onRequestClose
            });
        }
    }]);

    return SpriteLibrary;
}(_react2.default.PureComponent);

SpriteLibrary.propTypes = {
    onRequestClose: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

exports.default = SpriteLibrary;
