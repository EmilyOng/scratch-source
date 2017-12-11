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

var _monitorAdapter = require('../lib/monitor-adapter.js');

var _monitorAdapter2 = _interopRequireDefault(_monitorAdapter);

var _monitor = require('../components/monitor/monitor.js');

var _monitor2 = _interopRequireDefault(_monitor);

var _monitorLayout = require('../reducers/monitor-layout');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monitor = function (_React$Component) {
    _inherits(Monitor, _React$Component);

    function Monitor(props) {
        _classCallCheck(this, Monitor);

        var _this = _possibleConstructorReturn(this, (Monitor.__proto__ || Object.getPrototypeOf(Monitor)).call(this, props));

        (0, _lodash2.default)(_this, ['handleDragEnd', 'setElement']);
        return _this;
    }

    _createClass(Monitor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var rect = void 0;
            // Load the VM provided position if not loaded already
            if (this.props.x && this.props.y && !this.props.monitorLayout.savedMonitorPositions[this.props.id]) {
                rect = {
                    upperStart: { x: this.props.x, y: this.props.y },
                    lowerEnd: { x: this.props.x + this.element.offsetWidth, y: this.props.y + this.element.offsetHeight }
                };
                this.props.addMonitorRect(this.props.id, rect, true /* savePosition */);
            } else {
                // Newly created user monitor
                rect = (0, _monitorLayout.getInitialPosition)(this.props.monitorLayout, this.props.id, this.element.offsetWidth, this.element.offsetHeight);
                this.props.addMonitorRect(this.props.id, rect);
            }
            this.element.style.top = rect.upperStart.y + 'px';
            this.element.style.left = rect.upperStart.x + 'px';
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextState !== this.state) {
                return true;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.getOwnPropertyNames(nextProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    // Don't need to rerender when other monitors are moved.
                    // monitorLayout is only used during initial layout.
                    if (key !== 'monitorLayout' && nextProps[key] !== this.props[key]) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.props.resizeMonitorRect(this.props.id, this.element.offsetWidth, this.element.offsetHeight);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.removeMonitorRect(this.props.id);
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd(e, _ref) {
            var x = _ref.x,
                y = _ref.y;

            this.props.onDragEnd(this.props.id, parseInt(this.element.style.left, 10) + x, parseInt(this.element.style.top, 10) + y);
        }
    }, {
        key: 'setElement',
        value: function setElement(monitorElt) {
            this.element = monitorElt;
        }
    }, {
        key: 'render',
        value: function render() {
            var monitorProps = (0, _monitorAdapter2.default)(this.props);
            return _react2.default.createElement(_monitor2.default, _extends({
                componentRef: this.setElement
            }, monitorProps, {
                onDragEnd: this.handleDragEnd
            }));
        }
    }]);

    return Monitor;
}(_react2.default.Component);

Monitor.propTypes = {
    addMonitorRect: _propTypes2.default.func.isRequired,
    id: _propTypes2.default.string.isRequired,
    monitorLayout: _propTypes2.default.shape({
        monitors: _propTypes2.default.object,
        savedMonitorPositions: _propTypes2.default.object
    }).isRequired,
    onDragEnd: _propTypes2.default.func.isRequired,
    opcode: _propTypes2.default.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    params: _propTypes2.default.object, // eslint-disable-line react/no-unused-prop-types, react/forbid-prop-types
    removeMonitorRect: _propTypes2.default.func.isRequired,
    resizeMonitorRect: _propTypes2.default.func.isRequired,
    spriteName: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
    value: _propTypes2.default.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        monitorLayout: state.monitorLayout
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addMonitorRect: function addMonitorRect(id, rect, savePosition) {
            return dispatch((0, _monitorLayout.addMonitorRect)(id, rect.upperStart, rect.lowerEnd, savePosition));
        },
        resizeMonitorRect: function resizeMonitorRect(id, newWidth, newHeight) {
            return dispatch((0, _monitorLayout.resizeMonitorRect)(id, newWidth, newHeight));
        },
        removeMonitorRect: function removeMonitorRect(id) {
            return dispatch((0, _monitorLayout.removeMonitorRect)(id));
        }
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Monitor);
