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

var _reactRedux = require('react-redux');

var _spriteSelectorItem = require('../components/sprite-selector-item/sprite-selector-item.js');

var _spriteSelectorItem2 = _interopRequireDefault(_spriteSelectorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpriteSelectorItem = function (_React$Component) {
    _inherits(SpriteSelectorItem, _React$Component);

    function SpriteSelectorItem(props) {
        _classCallCheck(this, SpriteSelectorItem);

        var _this = _possibleConstructorReturn(this, (SpriteSelectorItem.__proto__ || Object.getPrototypeOf(SpriteSelectorItem)).call(this, props));

        (0, _lodash2.default)(_this, ['handleClick', 'handleDelete', 'handleDuplicate']);
        return _this;
    }

    _createClass(SpriteSelectorItem, [{
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            this.props.onClick(this.props.id);
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete() {
            // eslint-disable-next-line no-alert
            if (window.confirm('Are you sure you want to delete this sprite?')) {
                this.props.onDeleteButtonClick(this.props.id);
            }
        }
    }, {
        key: 'handleDuplicate',
        value: function handleDuplicate(e) {
            e.stopPropagation(); // To prevent from bubbling back to handleClick
            this.props.onDuplicateButtonClick(this.props.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                assetId = _props.assetId,
                id = _props.id,
                onClick = _props.onClick,
                onDeleteButtonClick = _props.onDeleteButtonClick,
                onDuplicateButtonClick = _props.onDuplicateButtonClick,
                props = _objectWithoutProperties(_props, ['assetId', 'id', 'onClick', 'onDeleteButtonClick', 'onDuplicateButtonClick']);

            return _react2.default.createElement(_spriteSelectorItem2.default, _extends({
                onClick: this.handleClick,
                onDeleteButtonClick: this.handleDelete,
                onDuplicateButtonClick: onDuplicateButtonClick ? this.handleDuplicate : null
            }, props));
        }
    }]);

    return SpriteSelectorItem;
}(_react2.default.Component);

SpriteSelectorItem.propTypes = {
    assetId: _propTypes2.default.string,
    costumeURL: _propTypes2.default.string,
    id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    name: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    onDeleteButtonClick: _propTypes2.default.func.isRequired,
    onDuplicateButtonClick: _propTypes2.default.func,
    selected: _propTypes2.default.bool
};

var mapStateToProps = function mapStateToProps(state, _ref) {
    var assetId = _ref.assetId,
        costumeURL = _ref.costumeURL;
    return {
        costumeURL: costumeURL || assetId && state.vm.runtime.storage.get(assetId).encodeDataURI()
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SpriteSelectorItem);
