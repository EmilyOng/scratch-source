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

var _scratchRender = require('scratch-render');

var _scratchRender2 = _interopRequireDefault(_scratchRender);

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

var _reactRedux = require('react-redux');

var _touchUtils = require('../lib/touch-utils');

var _stage = require('../components/stage/stage.js');

var _stage2 = _interopRequireDefault(_stage);

var _colorPicker = require('../reducers/color-picker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colorPickerRadius = 20;

var Stage = function (_React$Component) {
    _inherits(Stage, _React$Component);

    function Stage(props) {
        _classCallCheck(this, Stage);

        var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this, props));

        (0, _lodash2.default)(_this, ['attachMouseEvents', 'cancelMouseDownTimeout', 'detachMouseEvents', 'handleDoubleClick', 'handleQuestionAnswered', 'onMouseUp', 'onMouseMove', 'onMouseDown', 'onStartDrag', 'onStopDrag', 'updateRect', 'questionListener', 'setCanvas']);
        _this.state = {
            mouseDownTimeoutId: null,
            mouseDownPosition: null,
            isDragging: false,
            dragOffset: null,
            dragId: null,
            colorInfo: null,
            question: null
        };
        return _this;
    }

    _createClass(Stage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.attachRectEvents();
            this.attachMouseEvents(this.canvas);
            this.updateRect();
            this.renderer = new _scratchRender2.default(this.canvas);
            this.props.vm.attachRenderer(this.renderer);
            this.props.vm.runtime.addListener('QUESTION', this.questionListener);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.width !== nextProps.width || this.props.height !== nextProps.height || this.props.isColorPicking !== nextProps.isColorPicking || this.state.colorInfo !== nextState.colorInfo || this.state.question !== nextState.question;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.isColorPicking && !prevProps.isColorPicking) {
                this.startColorPickingLoop();
            } else if (!this.props.isColorPicking && prevProps.isColorPicking) {
                this.stopColorPickingLoop();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachMouseEvents(this.canvas);
            this.detachRectEvents();
            this.stopColorPickingLoop();
        }
    }, {
        key: 'questionListener',
        value: function questionListener(question) {
            this.setState({ question: question });
        }
    }, {
        key: 'handleQuestionAnswered',
        value: function handleQuestionAnswered(answer) {
            var _this2 = this;

            this.setState({ question: null }, function () {
                _this2.props.vm.runtime.emit('ANSWER', answer);
            });
        }
    }, {
        key: 'startColorPickingLoop',
        value: function startColorPickingLoop() {
            var _this3 = this;

            this.intervalId = setInterval(function () {
                _this3.setState({ colorInfo: _this3.getColorInfo(_this3.pickX, _this3.pickY) });
            }, 30);
        }
    }, {
        key: 'stopColorPickingLoop',
        value: function stopColorPickingLoop() {
            clearInterval(this.intervalId);
        }
    }, {
        key: 'attachMouseEvents',
        value: function attachMouseEvents(canvas) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('touchmove', this.onMouseMove);
            document.addEventListener('touchend', this.onMouseUp);
            canvas.addEventListener('mousedown', this.onMouseDown);
            canvas.addEventListener('touchstart', this.onMouseDown);
        }
    }, {
        key: 'detachMouseEvents',
        value: function detachMouseEvents(canvas) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('touchmove', this.onMouseMove);
            document.removeEventListener('touchend', this.onMouseUp);
            canvas.removeEventListener('mousedown', this.onMouseDown);
            canvas.removeEventListener('touchstart', this.onMouseDown);
        }
    }, {
        key: 'attachRectEvents',
        value: function attachRectEvents() {
            window.addEventListener('resize', this.updateRect);
            window.addEventListener('scroll', this.updateRect);
        }
    }, {
        key: 'detachRectEvents',
        value: function detachRectEvents() {
            window.removeEventListener('resize', this.updateRect);
            window.removeEventListener('scroll', this.updateRect);
        }
    }, {
        key: 'updateRect',
        value: function updateRect() {
            this.rect = this.canvas.getBoundingClientRect();
        }
    }, {
        key: 'getScratchCoords',
        value: function getScratchCoords(x, y) {
            var nativeSize = this.renderer.getNativeSize();
            return [nativeSize[0] / this.rect.width * (x - this.rect.width / 2), nativeSize[1] / this.rect.height * (y - this.rect.height / 2)];
        }
    }, {
        key: 'getColorInfo',
        value: function getColorInfo(x, y) {
            return _extends({
                x: x,
                y: y
            }, this.renderer.extractColor(x, y, colorPickerRadius));
        }
    }, {
        key: 'handleDoubleClick',
        value: function handleDoubleClick(e) {
            var _getEventXY = (0, _touchUtils.getEventXY)(e),
                x = _getEventXY.x,
                y = _getEventXY.y;
            // Set editing target from cursor position, if clicking on a sprite.


            var mousePosition = [x - this.rect.left, y - this.rect.top];
            var drawableId = this.renderer.pick(mousePosition[0], mousePosition[1]);
            if (drawableId === null) return;
            var targetId = this.props.vm.getTargetIdForDrawableId(drawableId);
            if (targetId === null) return;
            this.props.vm.setEditingTarget(targetId);
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            var _getEventXY2 = (0, _touchUtils.getEventXY)(e),
                x = _getEventXY2.x,
                y = _getEventXY2.y;

            var mousePosition = [x - this.rect.left, y - this.rect.top];

            // Set the pickX/Y for the color picker loop to pick up
            this.pickX = mousePosition[0];
            this.pickY = mousePosition[1];

            if (this.state.mouseDownTimeoutId !== null) {
                this.cancelMouseDownTimeout();
                if (this.state.mouseDown && !this.state.isDragging) {
                    this.onStartDrag.apply(this, _toConsumableArray(this.state.mouseDownPosition));
                }
            }
            if (this.state.mouseDown && this.state.isDragging) {
                var spritePosition = this.getScratchCoords(mousePosition[0], mousePosition[1]);
                this.props.vm.postSpriteInfo({
                    x: spritePosition[0] + this.state.dragOffset[0],
                    y: -(spritePosition[1] + this.state.dragOffset[1]),
                    force: true
                });
            }
            var coordinates = {
                x: mousePosition[0],
                y: mousePosition[1],
                canvasWidth: this.rect.width,
                canvasHeight: this.rect.height
            };
            this.props.vm.postIOData('mouse', coordinates);
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            var _getEventXY3 = (0, _touchUtils.getEventXY)(e),
                x = _getEventXY3.x,
                y = _getEventXY3.y;

            this.cancelMouseDownTimeout();
            this.setState({
                mouseDown: false,
                mouseDownPosition: null
            });
            if (this.state.isDragging) {
                this.onStopDrag();
            } else {
                var data = {
                    isDown: false,
                    x: x - this.rect.left,
                    y: y - this.rect.top,
                    canvasWidth: this.rect.width,
                    canvasHeight: this.rect.height
                };
                this.props.vm.postIOData('mouse', data);
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            this.updateRect();

            var _getEventXY4 = (0, _touchUtils.getEventXY)(e),
                x = _getEventXY4.x,
                y = _getEventXY4.y;

            var mousePosition = [x - this.rect.left, y - this.rect.top];
            if (e.button === 0) {
                this.setState({
                    mouseDown: true,
                    mouseDownPosition: mousePosition,
                    mouseDownTimeoutId: setTimeout(this.onStartDrag.bind(this, mousePosition[0], mousePosition[1]), 500)
                });
            }
            var data = {
                isDown: true,
                x: mousePosition[0],
                y: mousePosition[1],
                canvasWidth: this.rect.width,
                canvasHeight: this.rect.height
            };
            this.props.vm.postIOData('mouse', data);
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (this.props.isColorPicking) {
                var _state$colorInfo$colo = this.state.colorInfo.color,
                    r = _state$colorInfo$colo.r,
                    g = _state$colorInfo$colo.g,
                    b = _state$colorInfo$colo.b;

                var componentToString = function componentToString(c) {
                    var hex = c.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                };
                var colorString = '#' + componentToString(r) + componentToString(g) + componentToString(b);
                this.props.onDeactivateColorPicker(colorString);
                this.setState({ colorInfo: null });
            }
        }
    }, {
        key: 'cancelMouseDownTimeout',
        value: function cancelMouseDownTimeout() {
            if (this.state.mouseDownTimeoutId !== null) {
                clearTimeout(this.state.mouseDownTimeoutId);
            }
            this.setState({ mouseDownTimeoutId: null });
        }
    }, {
        key: 'onStartDrag',
        value: function onStartDrag(x, y) {
            var drawableId = this.renderer.pick(x, y);
            if (drawableId === null) return;
            var drawableData = this.renderer.extractDrawable(drawableId, x, y);
            var targetId = this.props.vm.getTargetIdForDrawableId(drawableId);
            if (targetId === null) return;
            this.props.vm.startDrag(targetId);
            this.setState({
                isDragging: true,
                dragId: targetId,
                dragOffset: drawableData.scratchOffset
            });
        }
    }, {
        key: 'onStopDrag',
        value: function onStopDrag() {
            this.props.vm.stopDrag(this.state.dragId);
            this.setState({
                isDragging: false,
                dragOffset: null,
                dragId: null
            });
        }
    }, {
        key: 'setCanvas',
        value: function setCanvas(canvas) {
            this.canvas = canvas;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                vm = _props.vm,
                onActivateColorPicker = _props.onActivateColorPicker,
                props = _objectWithoutProperties(_props, ['vm', 'onActivateColorPicker']);

            return _react2.default.createElement(_stage2.default, _extends({
                canvasRef: this.setCanvas,
                colorInfo: this.state.colorInfo,
                question: this.state.question,
                onDoubleClick: this.handleDoubleClick,
                onQuestionAnswered: this.handleQuestionAnswered
            }, props));
        }
    }]);

    return Stage;
}(_react2.default.Component);

Stage.propTypes = {
    height: _propTypes2.default.number,
    isColorPicking: _propTypes2.default.bool,
    onActivateColorPicker: _propTypes2.default.func,
    onDeactivateColorPicker: _propTypes2.default.func,
    vm: _propTypes2.default.instanceOf(_scratchVm2.default).isRequired,
    width: _propTypes2.default.number
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isColorPicking: state.colorPicker.active
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onActivateColorPicker: function onActivateColorPicker() {
            return dispatch((0, _colorPicker.activateColorPicker)());
        },
        onDeactivateColorPicker: function onDeactivateColorPicker(color) {
            return dispatch((0, _colorPicker.deactivateColorPicker)(color));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Stage);
