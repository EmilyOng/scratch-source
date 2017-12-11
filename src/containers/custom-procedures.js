'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaultsdeep');

var _lodash4 = _interopRequireDefault(_lodash3);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customProcedures = require('../components/custom-procedures/custom-procedures.js');

var _customProcedures2 = _interopRequireDefault(_customProcedures);

var _scratchBlocks = require('scratch-blocks');

var _scratchBlocks2 = _interopRequireDefault(_scratchBlocks);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomProcedures = function (_React$Component) {
    _inherits(CustomProcedures, _React$Component);

    function CustomProcedures(props) {
        _classCallCheck(this, CustomProcedures);

        var _this = _possibleConstructorReturn(this, (CustomProcedures.__proto__ || Object.getPrototypeOf(CustomProcedures)).call(this, props));

        (0, _lodash2.default)(_this, ['handleAddLabel', 'handleAddBoolean', 'handleAddTextNumber', 'handleCancel', 'handleOk', 'setBlocks']);
        return _this;
    }

    _createClass(CustomProcedures, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.workspace) {
                this.workspace.dispose();
            }
        }
    }, {
        key: 'setBlocks',
        value: function setBlocks(blocksRef) {
            var _this2 = this;

            if (!blocksRef) return;
            this.blocks = blocksRef;
            var workspaceConfig = (0, _lodash4.default)({}, CustomProcedures.defaultOptions, this.props.options);

            // @todo This is a hack to make there be no toolbox.
            var oldDefaultToolbox = _scratchBlocks2.default.Blocks.defaultToolbox;
            _scratchBlocks2.default.Blocks.defaultToolbox = null;
            this.workspace = _scratchBlocks2.default.inject(this.blocks, workspaceConfig);
            _scratchBlocks2.default.Blocks.defaultToolbox = oldDefaultToolbox;

            // Create the procedure declaration block for editing the mutation.
            this.mutationRoot = this.workspace.newBlock('procedures_declaration');
            // Make the declaration immovable, undeletable and have no context menu
            this.mutationRoot.setMovable(false);
            this.mutationRoot.setDeletable(false);
            this.mutationRoot.contextMenu = false;

            this.workspace.addChangeListener(function () {
                _this2.mutationRoot.onChangeFn();
                // Keep the block centered on the workspace
                var metrics = _this2.workspace.getMetrics();

                var _mutationRoot$getRela = _this2.mutationRoot.getRelativeToSurfaceXY(),
                    x = _mutationRoot$getRela.x,
                    y = _mutationRoot$getRela.y;

                var dy = metrics.viewHeight / 2 - _this2.mutationRoot.height / 2 - y;
                var dx = metrics.viewWidth / 2 - _this2.mutationRoot.width / 2 - x;
                // If the procedure declaration is wider than the view width,
                // keep the right-hand side of the procedure in view.
                if (_this2.mutationRoot.width > metrics.viewWidth) {
                    dx = metrics.viewWidth - _this2.mutationRoot.width - x;
                }
                _this2.mutationRoot.moveBy(dx, dy);
            });
            this.mutationRoot.domToMutation(this.props.mutator);
            this.mutationRoot.initSvg();
            this.mutationRoot.render();
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            this.props.onRequestClose();
        }
    }, {
        key: 'handleOk',
        value: function handleOk() {
            var newMutation = this.mutationRoot ? this.mutationRoot.mutationToDom() : null;
            this.props.onRequestClose(newMutation);
        }
    }, {
        key: 'handleAddLabel',
        value: function handleAddLabel() {
            if (this.mutationRoot) {
                this.mutationRoot.addLabelExternal();
            }
        }
    }, {
        key: 'handleAddBoolean',
        value: function handleAddBoolean() {
            if (this.mutationRoot) {
                this.mutationRoot.addBooleanExternal();
            }
        }
    }, {
        key: 'handleAddTextNumber',
        value: function handleAddTextNumber() {
            if (this.mutationRoot) {
                this.mutationRoot.addStringNumberExternal();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_customProcedures2.default, {
                componentRef: this.setBlocks,
                onAddBoolean: this.handleAddBoolean,
                onAddLabel: this.handleAddLabel,
                onAddTextNumber: this.handleAddTextNumber,
                onCancel: this.handleCancel,
                onOk: this.handleOk
            });
        }
    }]);

    return CustomProcedures;
}(_react2.default.Component);

CustomProcedures.propTypes = {
    mutator: _propTypes2.default.instanceOf(Element),
    onRequestClose: _propTypes2.default.func.isRequired,
    options: _propTypes2.default.shape({
        media: _propTypes2.default.string,
        zoom: _propTypes2.default.shape({
            controls: _propTypes2.default.bool,
            wheel: _propTypes2.default.bool,
            startScale: _propTypes2.default.number
        }),
        comments: _propTypes2.default.bool
    })
};

CustomProcedures.defaultOptions = {
    zoom: {
        controls: false,
        wheel: false,
        startScale: 0.9
    },
    comments: false,
    scrollbars: true
};

CustomProcedures.defaultProps = {
    options: CustomProcedures.defaultOptions
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        mutator: state.customProcedures.mutator
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CustomProcedures);
