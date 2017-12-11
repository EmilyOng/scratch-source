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

var _controls = require('../components/controls/controls.js');

var _controls2 = _interopRequireDefault(_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = function (_React$Component) {
    _inherits(Controls, _React$Component);

    function Controls(props) {
        _classCallCheck(this, Controls);

        var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));

        (0, _lodash2.default)(_this, ['handleGreenFlagClick', 'handleStopAllClick', 'onProjectRunStart', 'onProjectRunStop']);
        _this.state = {
            projectRunning: false,
            turbo: false
        };
        return _this;
    }

    _createClass(Controls, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.vm.addListener('PROJECT_RUN_START', this.onProjectRunStart);
            this.props.vm.addListener('PROJECT_RUN_STOP', this.onProjectRunStop);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.vm.removeListener('PROJECT_RUN_START', this.onProjectRunStart);
            this.props.vm.removeListener('PROJECT_RUN_STOP', this.onProjectRunStop);
        }
    }, {
        key: 'onProjectRunStart',
        value: function onProjectRunStart() {
            this.setState({ projectRunning: true });
        }
    }, {
        key: 'onProjectRunStop',
        value: function onProjectRunStop() {
            this.setState({ projectRunning: false });
        }
    }, {
        key: 'handleGreenFlagClick',
        value: function handleGreenFlagClick(e) {
            e.preventDefault();
            if (e.shiftKey) {
                this.setState({ turbo: !this.state.turbo });
                this.props.vm.setTurboMode(!this.state.turbo);
            } else {
                this.props.vm.greenFlag();
            }
        }
    }, {
        key: 'handleStopAllClick',
        value: function handleStopAllClick(e) {
            e.preventDefault();
            this.props.vm.stopAll();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                vm = _props.vm,
                props = _objectWithoutProperties(_props, ['vm']);

            return _react2.default.createElement(_controls2.default, _extends({}, props, {
                active: this.state.projectRunning,
                turbo: this.state.turbo,
                onGreenFlagClick: this.handleGreenFlagClick,
                onStopAllClick: this.handleStopAllClick
            }));
        }
    }]);

    return Controls;
}(_react2.default.Component);

Controls.propTypes = {
    vm: _propTypes2.default.instanceOf(_scratchVm2.default)
};

exports.default = Controls;
