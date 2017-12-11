'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.debounce');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.defaultsdeep');

var _lodash6 = _interopRequireDefault(_lodash5);

var _makeToolboxXml = require('../lib/make-toolbox-xml');

var _makeToolboxXml2 = _interopRequireDefault(_makeToolboxXml);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blocks = require('../lib/blocks');

var _blocks2 = _interopRequireDefault(_blocks);

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _prompt = require('./prompt.js');

var _prompt2 = _interopRequireDefault(_prompt);

var _blocks3 = require('../components/blocks/blocks.js');

var _blocks4 = _interopRequireDefault(_blocks3);

var _extensionLibrary = require('./extension-library.js');

var _extensionLibrary2 = _interopRequireDefault(_extensionLibrary);

var _customProcedures = require('./custom-procedures.js');

var _customProcedures2 = _interopRequireDefault(_customProcedures);

var _reactRedux = require('react-redux');

var _toolbox = require('../reducers/toolbox');

var _colorPicker = require('../reducers/color-picker');

var _modals = require('../reducers/modals');

var _customProcedures3 = require('../reducers/custom-procedures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addFunctionListener = function addFunctionListener(object, property, callback) {
    var oldFn = object[property];
    object[property] = function () {
        var result = oldFn.apply(this, arguments);
        callback.apply(this, result);
        return result;
    };
};

var Blocks = function (_React$Component) {
    _inherits(Blocks, _React$Component);

    function Blocks(props) {
        _classCallCheck(this, Blocks);

        var _this = _possibleConstructorReturn(this, (Blocks.__proto__ || Object.getPrototypeOf(Blocks)).call(this, props));

        _this.ScratchBlocks = (0, _blocks2.default)(props.vm);
        (0, _lodash2.default)(_this, ['attachVM', 'detachVM', 'handleCategorySelected', 'handlePromptStart', 'handlePromptCallback', 'handlePromptClose', 'handleCustomProceduresClose', 'onScriptGlowOn', 'onScriptGlowOff', 'onBlockGlowOn', 'onBlockGlowOff', 'handleExtensionAdded', 'onTargetsUpdate', 'onVisualReport', 'onWorkspaceUpdate', 'onWorkspaceMetricsChange', 'setBlocks']);
        _this.ScratchBlocks.prompt = _this.handlePromptStart;
        _this.state = {
            workspaceMetrics: {},
            prompt: null
        };
        _this.onTargetsUpdate = (0, _lodash4.default)(_this.onTargetsUpdate, 100);
        return _this;
    }

    _createClass(Blocks, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.ScratchBlocks.FieldColourSlider.activateEyedropper_ = this.props.onActivateColorPicker;
            this.ScratchBlocks.Procedures.externalProcedureDefCallback = this.props.onActivateCustomProcedures;

            var workspaceConfig = (0, _lodash6.default)({}, Blocks.defaultOptions, this.props.options, { toolbox: this.props.toolboxXML });
            this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);

            // @todo change this when blockly supports UI events
            addFunctionListener(this.workspace, 'translate', this.onWorkspaceMetricsChange);
            addFunctionListener(this.workspace, 'zoom', this.onWorkspaceMetricsChange);

            this.attachVM();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.state.prompt !== nextState.prompt || this.props.isVisible !== nextProps.isVisible || this.props.toolboxXML !== nextProps.toolboxXML || this.props.extensionLibraryVisible !== nextProps.extensionLibraryVisible || this.props.customProceduresVisible !== nextProps.customProceduresVisible;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.toolboxXML !== this.props.toolboxXML) {
                var selectedCategoryName = this.workspace.toolbox_.getSelectedItem().name_;
                this.workspace.updateToolbox(this.props.toolboxXML);
                this.workspace.toolbox_.setSelectedCategoryByName(selectedCategoryName);
            }
            if (this.props.isVisible === prevProps.isVisible) {
                return;
            }
            // @todo hack to resize blockly manually in case resize happened while hidden
            // @todo hack to reload the workspace due to gui bug #413
            if (this.props.isVisible) {
                // Scripts tab
                this.workspace.setVisible(true);
                this.props.vm.refreshWorkspace();
                window.dispatchEvent(new Event('resize'));
            } else {
                this.workspace.setVisible(false);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachVM();
            this.workspace.dispose();
        }
    }, {
        key: 'attachVM',
        value: function attachVM() {
            this.workspace.addChangeListener(this.props.vm.blockListener);
            this.flyoutWorkspace = this.workspace.getFlyout().getWorkspace();
            this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
            this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
            this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
            this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
            this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
            this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
            this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
            this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
            this.props.vm.addListener('targetsUpdate', this.onTargetsUpdate);
            this.props.vm.addListener('EXTENSION_ADDED', this.handleExtensionAdded);
        }
    }, {
        key: 'detachVM',
        value: function detachVM() {
            this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
            this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
            this.props.vm.removeListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
            this.props.vm.removeListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
            this.props.vm.removeListener('VISUAL_REPORT', this.onVisualReport);
            this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
            this.props.vm.removeListener('targetsUpdate', this.onTargetsUpdate);
            this.props.vm.removeListener('EXTENSION_ADDED', this.handleExtensionAdded);
        }
    }, {
        key: 'updateToolboxBlockValue',
        value: function updateToolboxBlockValue(id, value) {
            var block = this.workspace.getFlyout().getWorkspace().getBlockById(id);
            if (block) {
                block.inputList[0].fieldRow[0].setValue(value);
            }
        }
    }, {
        key: 'onTargetsUpdate',
        value: function onTargetsUpdate() {
            var _this2 = this;

            if (this.props.vm.editingTarget) {
                ['glide', 'move', 'set'].forEach(function (prefix) {
                    _this2.updateToolboxBlockValue(prefix + 'x', _this2.props.vm.editingTarget.x.toFixed(0));
                    _this2.updateToolboxBlockValue(prefix + 'y', _this2.props.vm.editingTarget.y.toFixed(0));
                });
            }
        }
    }, {
        key: 'onWorkspaceMetricsChange',
        value: function onWorkspaceMetricsChange() {
            var target = this.props.vm.editingTarget;
            if (target && target.id) {
                var workspaceMetrics = Object.assign({}, this.state.workspaceMetrics, _defineProperty({}, target.id, {
                    scrollX: this.workspace.scrollX,
                    scrollY: this.workspace.scrollY,
                    scale: this.workspace.scale
                }));
                this.setState({ workspaceMetrics: workspaceMetrics });
            }
        }
    }, {
        key: 'onScriptGlowOn',
        value: function onScriptGlowOn(data) {
            this.workspace.glowStack(data.id, true);
        }
    }, {
        key: 'onScriptGlowOff',
        value: function onScriptGlowOff(data) {
            this.workspace.glowStack(data.id, false);
        }
    }, {
        key: 'onBlockGlowOn',
        value: function onBlockGlowOn(data) {
            this.workspace.glowBlock(data.id, true);
        }
    }, {
        key: 'onBlockGlowOff',
        value: function onBlockGlowOff(data) {
            this.workspace.glowBlock(data.id, false);
        }
    }, {
        key: 'onVisualReport',
        value: function onVisualReport(data) {
            this.workspace.reportValue(data.id, data.value);
        }
    }, {
        key: 'onWorkspaceUpdate',
        value: function onWorkspaceUpdate(data) {
            // When we change sprites, update the toolbox to have the new sprite's blocks
            if (this.props.vm.editingTarget) {
                var target = this.props.vm.editingTarget;
                var dynamicBlocksXML = this.props.vm.runtime.getBlocksXML();
                var toolboxXML = (0, _makeToolboxXml2.default)(target.isStage, target.id, dynamicBlocksXML);
                this.props.updateToolboxState(toolboxXML);
            }

            if (this.props.vm.editingTarget && !this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
                this.onWorkspaceMetricsChange();
            }

            // Remove and reattach the workspace listener (but allow flyout events)
            this.workspace.removeChangeListener(this.props.vm.blockListener);
            var dom = this.ScratchBlocks.Xml.textToDom(data.xml);
            // @todo This line rerenders toolbox, and the change in the toolbox XML also rerenders the toolbox.
            // We should only rerender the toolbox once. See https://github.com/LLK/scratch-gui/issues/901
            this.ScratchBlocks.Xml.clearWorkspaceAndLoadFromXml(dom, this.workspace);
            this.workspace.addChangeListener(this.props.vm.blockListener);

            if (this.props.vm.editingTarget && this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
                var _state$workspaceMetri = this.state.workspaceMetrics[this.props.vm.editingTarget.id],
                    scrollX = _state$workspaceMetri.scrollX,
                    scrollY = _state$workspaceMetri.scrollY,
                    scale = _state$workspaceMetri.scale;

                this.workspace.scrollX = scrollX;
                this.workspace.scrollY = scrollY;
                this.workspace.scale = scale;
                this.workspace.resize();
            }
        }
    }, {
        key: 'handleExtensionAdded',
        value: function handleExtensionAdded(blocksInfo) {
            this.ScratchBlocks.defineBlocksWithJsonArray(blocksInfo.map(function (blockInfo) {
                return blockInfo.json;
            }));
            var dynamicBlocksXML = this.props.vm.runtime.getBlocksXML();
            var target = this.props.vm.editingTarget;
            var toolboxXML = (0, _makeToolboxXml2.default)(target.isStage, target.id, dynamicBlocksXML);
            this.props.updateToolboxState(toolboxXML);
        }
    }, {
        key: 'handleCategorySelected',
        value: function handleCategorySelected(categoryName) {
            this.workspace.toolbox_.setSelectedCategoryByName(categoryName);
        }
    }, {
        key: 'setBlocks',
        value: function setBlocks(blocks) {
            this.blocks = blocks;
        }
    }, {
        key: 'handlePromptStart',
        value: function handlePromptStart(message, defaultValue, callback) {
            this.setState({ prompt: { callback: callback, message: message, defaultValue: defaultValue } });
        }
    }, {
        key: 'handlePromptCallback',
        value: function handlePromptCallback(data) {
            this.state.prompt.callback(data);
            this.handlePromptClose();
        }
    }, {
        key: 'handlePromptClose',
        value: function handlePromptClose() {
            this.setState({ prompt: null });
        }
    }, {
        key: 'handleCustomProceduresClose',
        value: function handleCustomProceduresClose(data) {
            this.props.onRequestCloseCustomProcedures(data);
            this.workspace.refreshToolboxSelection_();
        }
    }, {
        key: 'render',
        value: function render() {
            /* eslint-disable no-unused-vars */
            var _props = this.props,
                customProceduresVisible = _props.customProceduresVisible,
                extensionLibraryVisible = _props.extensionLibraryVisible,
                options = _props.options,
                vm = _props.vm,
                isVisible = _props.isVisible,
                onActivateColorPicker = _props.onActivateColorPicker,
                updateToolboxState = _props.updateToolboxState,
                onActivateCustomProcedures = _props.onActivateCustomProcedures,
                onRequestCloseExtensionLibrary = _props.onRequestCloseExtensionLibrary,
                onRequestCloseCustomProcedures = _props.onRequestCloseCustomProcedures,
                toolboxXML = _props.toolboxXML,
                props = _objectWithoutProperties(_props, ['customProceduresVisible', 'extensionLibraryVisible', 'options', 'vm', 'isVisible', 'onActivateColorPicker', 'updateToolboxState', 'onActivateCustomProcedures', 'onRequestCloseExtensionLibrary', 'onRequestCloseCustomProcedures', 'toolboxXML']);
            /* eslint-enable no-unused-vars */


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_blocks4.default, _extends({
                    componentRef: this.setBlocks
                }, props)),
                this.state.prompt ? _react2.default.createElement(_prompt2.default, {
                    label: this.state.prompt.message,
                    placeholder: this.state.prompt.defaultValue,
                    title: 'New Variable' // @todo the only prompt is for new variables
                    , onCancel: this.handlePromptClose,
                    onOk: this.handlePromptCallback
                }) : null,
                extensionLibraryVisible ? _react2.default.createElement(_extensionLibrary2.default, {
                    vm: vm,
                    onCategorySelected: this.handleCategorySelected,
                    onRequestClose: onRequestCloseExtensionLibrary
                }) : null,
                customProceduresVisible ? _react2.default.createElement(_customProcedures2.default, {
                    options: {
                        media: options.media
                    },
                    onRequestClose: this.handleCustomProceduresClose
                }) : null
            );
        }
    }]);

    return Blocks;
}(_react2.default.Component);

Blocks.propTypes = {
    customProceduresVisible: _propTypes2.default.bool,
    extensionLibraryVisible: _propTypes2.default.bool,
    isVisible: _propTypes2.default.bool,
    onActivateColorPicker: _propTypes2.default.func,
    onActivateCustomProcedures: _propTypes2.default.func,
    onRequestCloseCustomProcedures: _propTypes2.default.func,
    onRequestCloseExtensionLibrary: _propTypes2.default.func,
    options: _propTypes2.default.shape({
        media: _propTypes2.default.string,
        zoom: _propTypes2.default.shape({
            controls: _propTypes2.default.bool,
            wheel: _propTypes2.default.bool,
            startScale: _propTypes2.default.number
        }),
        colours: _propTypes2.default.shape({
            workspace: _propTypes2.default.string,
            flyout: _propTypes2.default.string,
            toolbox: _propTypes2.default.string,
            toolboxSelected: _propTypes2.default.string,
            scrollbar: _propTypes2.default.string,
            scrollbarHover: _propTypes2.default.string,
            insertionMarker: _propTypes2.default.string,
            insertionMarkerOpacity: _propTypes2.default.number,
            fieldShadow: _propTypes2.default.string,
            dragShadowOpacity: _propTypes2.default.number
        }),
        comments: _propTypes2.default.bool
    }),
    toolboxXML: _propTypes2.default.string,
    updateToolboxState: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.675
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: false
};

Blocks.defaultProps = {
    isVisible: true,
    options: Blocks.defaultOptions
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        extensionLibraryVisible: state.modals.extensionLibrary,
        toolboxXML: state.toolbox.toolboxXML,
        customProceduresVisible: state.customProcedures.active
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onActivateColorPicker: function onActivateColorPicker(callback) {
            return dispatch((0, _colorPicker.activateColorPicker)(callback));
        },
        onActivateCustomProcedures: function onActivateCustomProcedures(data, callback) {
            return dispatch((0, _customProcedures3.activateCustomProcedures)(data, callback));
        },
        onRequestCloseExtensionLibrary: function onRequestCloseExtensionLibrary() {
            dispatch((0, _modals.closeExtensionLibrary)());
        },
        onRequestCloseCustomProcedures: function onRequestCloseCustomProcedures(data) {
            dispatch((0, _customProcedures3.deactivateCustomProcedures)(data));
        },
        updateToolboxState: function updateToolboxState(toolboxXML) {
            dispatch((0, _toolbox.updateToolbox)(toolboxXML));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Blocks);
