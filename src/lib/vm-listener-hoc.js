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

var _reactRedux = require('react-redux');

var _targets = require('../reducers/targets');

var _monitors = require('../reducers/monitors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Higher Order Component to manage events emitted by the VM
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
var vmListenerHOC = function vmListenerHOC(WrappedComponent) {
    var VMListener = function (_React$Component) {
        _inherits(VMListener, _React$Component);

        function VMListener(props) {
            _classCallCheck(this, VMListener);

            var _this = _possibleConstructorReturn(this, (VMListener.__proto__ || Object.getPrototypeOf(VMListener)).call(this, props));

            (0, _lodash2.default)(_this, ['handleKeyDown', 'handleKeyUp']);
            // We have to start listening to the vm here rather than in
            // componentDidMount because the HOC mounts the wrapped component,
            // so the HOC componentDidMount triggers after the wrapped component
            // mounts.
            // If the wrapped component uses the vm in componentDidMount, then
            // we need to start listening before mounting the wrapped component.
            _this.props.vm.on('targetsUpdate', _this.props.onTargetsUpdate);
            _this.props.vm.on('MONITORS_UPDATE', _this.props.onMonitorsUpdate);

            return _this;
        }

        _createClass(VMListener, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.attachKeyboardEvents) {
                    document.addEventListener('keydown', this.handleKeyDown);
                    document.addEventListener('keyup', this.handleKeyUp);
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.props.attachKeyboardEvents) {
                    document.removeEventListener('keydown', this.handleKeyDown);
                    document.removeEventListener('keyup', this.handleKeyUp);
                }
            }
        }, {
            key: 'handleKeyDown',
            value: function handleKeyDown(e) {
                // Don't capture keys intended for Blockly inputs.
                if (e.target !== document && e.target !== document.body) return;

                this.props.vm.postIOData('keyboard', {
                    keyCode: e.keyCode,
                    isDown: true
                });

                // Don't stop browser keyboard shortcuts
                if (e.metaKey || e.altKey || e.ctrlKey) return;

                e.preventDefault();
            }
        }, {
            key: 'handleKeyUp',
            value: function handleKeyUp(e) {
                // Always capture up events,
                // even those that have switched to other targets.
                this.props.vm.postIOData('keyboard', {
                    keyCode: e.keyCode,
                    isDown: false
                });

                // E.g., prevent scroll.
                if (e.target !== document && e.target !== document.body) {
                    e.preventDefault();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    attachKeyboardEvents = _props.attachKeyboardEvents,
                    onKeyDown = _props.onKeyDown,
                    onKeyUp = _props.onKeyUp,
                    onMonitorsUpdate = _props.onMonitorsUpdate,
                    onTargetsUpdate = _props.onTargetsUpdate,
                    props = _objectWithoutProperties(_props, ['attachKeyboardEvents', 'onKeyDown', 'onKeyUp', 'onMonitorsUpdate', 'onTargetsUpdate']);

                return _react2.default.createElement(WrappedComponent, props);
            }
        }]);

        return VMListener;
    }(_react2.default.Component);

    VMListener.propTypes = {
        attachKeyboardEvents: _propTypes2.default.bool,
        onKeyDown: _propTypes2.default.func,
        onKeyUp: _propTypes2.default.func,
        onMonitorsUpdate: _propTypes2.default.func,
        onTargetsUpdate: _propTypes2.default.func,
        vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
    };
    VMListener.defaultProps = {
        attachKeyboardEvents: true
    };
    var mapStateToProps = function mapStateToProps(state) {
        return {
            vm: state.vm
        };
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {
            onTargetsUpdate: function onTargetsUpdate(data) {
                dispatch((0, _targets.updateEditingTarget)(data.editingTarget));
                dispatch((0, _targets.updateTargets)(data.targetList));
            },
            onMonitorsUpdate: function onMonitorsUpdate(monitorList) {
                dispatch((0, _monitors.updateMonitors)(monitorList));
            }
        };
    };
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VMListener);
};

exports.default = vmListenerHOC;
