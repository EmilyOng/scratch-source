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

var _modals = require('../reducers/modals');

var _stageSelector = require('../components/stage-selector/stage-selector.js');

var _stageSelector2 = _interopRequireDefault(_stageSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StageSelector = function (_React$Component) {
    _inherits(StageSelector, _React$Component);

    function StageSelector(props) {
        _classCallCheck(this, StageSelector);

        var _this = _possibleConstructorReturn(this, (StageSelector.__proto__ || Object.getPrototypeOf(StageSelector)).call(this, props));

        (0, _lodash2.default)(_this, ['handleClick']);
        return _this;
    }

    _createClass(StageSelector, [{
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                assetId = _props.assetId,
                id = _props.id,
                onSelect = _props.onSelect,
                componentProps = _objectWithoutProperties(_props, ['assetId', 'id', 'onSelect']);

            return _react2.default.createElement(_stageSelector2.default, _extends({
                onClick: this.handleClick
            }, componentProps));
        }
    }]);

    return StageSelector;
}(_react2.default.Component);

StageSelector.propTypes = _extends({}, _stageSelector2.default.propTypes, {
    id: _propTypes2.default.string,
    onSelect: _propTypes2.default.func
});

var mapStateToProps = function mapStateToProps(state, _ref) {
    var assetId = _ref.assetId;
    return {
        url: assetId && state.vm.runtime.storage.get(assetId).encodeDataURI()
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onNewBackdropClick: function onNewBackdropClick(e) {
            e.preventDefault();
            dispatch((0, _modals.openBackdropLibrary)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StageSelector);
