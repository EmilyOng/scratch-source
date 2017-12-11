'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _appStateHoc = require('../lib/app-state-hoc.js');

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _controls = require('../containers/controls.js');

var _controls2 = _interopRequireDefault(_controls);

var _blocks = require('../containers/blocks.js');

var _blocks2 = _interopRequireDefault(_blocks);

var _gui = require('../containers/gui.js');

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = require('../lib/project-loader-hoc.js');

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _blocksOnly = require('./blocks-only.css');

var _blocksOnly2 = _interopRequireDefault(_blocksOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
};

var VMBlocks = (0, _reactRedux.connect)(mapStateToProps)(_blocks2.default);
var VMControls = (0, _reactRedux.connect)(mapStateToProps)(_controls2.default);

var BlocksOnly = function BlocksOnly(props) {
    return _react2.default.createElement(
        _gui2.default,
        props,
        _react2.default.createElement(VMBlocks, {
            grow: 1,
            options: {
                media: 'static/blocks-media/'
            }
        }),
        _react2.default.createElement(VMControls, { className: _blocksOnly2.default.controls })
    );
};

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(BlocksOnly));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);
