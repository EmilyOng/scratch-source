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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _monitorLayout = require('../reducers/monitor-layout');

var _monitorList = require('../components/monitor-list/monitor-list.js');

var _monitorList2 = _interopRequireDefault(_monitorList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonitorList = function (_React$Component) {
    _inherits(MonitorList, _React$Component);

    function MonitorList(props) {
        _classCallCheck(this, MonitorList);

        var _this = _possibleConstructorReturn(this, (MonitorList.__proto__ || Object.getPrototypeOf(MonitorList)).call(this, props));

        (0, _lodash2.default)(_this, ['handleMonitorChange']);
        return _this;
    }

    _createClass(MonitorList, [{
        key: 'handleMonitorChange',
        value: function handleMonitorChange(id, x, y) {
            // eslint-disable-line no-unused-vars
            this.props.moveMonitorRect(id, x, y);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_monitorList2.default, _extends({
                onMonitorChange: this.handleMonitorChange
            }, this.props));
        }
    }]);

    return MonitorList;
}(_react2.default.Component);

MonitorList.propTypes = {
    moveMonitorRect: _propTypes2.default.func.isRequired
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        monitors: state.monitors
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        moveMonitorRect: function moveMonitorRect(id, x, y) {
            return dispatch((0, _monitorLayout.moveMonitorRect)(id, x, y));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MonitorList);
