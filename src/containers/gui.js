'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scratchAudio = require('scratch-audio');

var _scratchAudio2 = _interopRequireDefault(_scratchAudio);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _modals = require('../reducers/modals.js');

var _vmListenerHoc = require('../lib/vm-listener-hoc.js');

var _vmListenerHoc2 = _interopRequireDefault(_vmListenerHoc);

var _gui = require('../components/gui/gui.js');

var _gui2 = _interopRequireDefault(_gui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GUI = function (_React$Component) {
    _inherits(GUI, _React$Component);

    function GUI(props) {
        _classCallCheck(this, GUI);

        var _this = _possibleConstructorReturn(this, (GUI.__proto__ || Object.getPrototypeOf(GUI)).call(this, props));

        (0, _lodash2.default)(_this, ['handleTabSelect']);
        _this.state = { tabIndex: 0 };
        return _this;
    }

    _createClass(GUI, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audioEngine = new _scratchAudio2.default();
            this.props.vm.attachAudioEngine(this.audioEngine);
            this.props.vm.loadProject(this.props.projectData);
            this.props.vm.setCompatibilityMode(true);
            this.props.vm.start();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.projectData !== nextProps.projectData) {
                this.props.vm.loadProject(nextProps.projectData);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.vm.stopAll();
        }
    }, {
        key: 'handleTabSelect',
        value: function handleTabSelect(tabIndex) {
            this.setState({ tabIndex: tabIndex });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                projectData = _props.projectData,
                vm = _props.vm,
                componentProps = _objectWithoutProperties(_props, ['children', 'projectData', 'vm']);

            return _react2.default.createElement(
                _gui2.default,
                _extends({
                    enableExtensions: window.location.search.includes('extensions'),
                    tabIndex: this.state.tabIndex,
                    vm: vm,
                    onTabSelect: this.handleTabSelect
                }, componentProps),
                children
            );
        }
    }]);

    return GUI;
}(_react2.default.Component);

GUI.propTypes = _extends({}, _gui2.default.propTypes, {
    projectData: _propTypes2.default.string,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default)
});

GUI.defaultProps = _gui2.default.defaultProps;

var mapStateToProps = function mapStateToProps() {
    return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onExtensionButtonClick: function onExtensionButtonClick() {
            return dispatch((0, _modals.openExtensionLibrary)());
        }
    };
};

var ConnectedGUI = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GUI);

exports.default = (0, _vmListenerHoc2.default)(ConnectedGUI);
