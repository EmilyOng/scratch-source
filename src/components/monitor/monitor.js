'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _box = require('../box/box.js');

var _box2 = _interopRequireDefault(_box);

var _monitor = require('./monitor.css');

var _monitor2 = _interopRequireDefault(_monitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categories = {
    data: '#FF8C1A',
    sensing: '#5CB1D6',
    sound: '#CF63CF',
    looks: '#9966FF',
    motion: '#4C97FF'
};

var MonitorComponent = function MonitorComponent(props) {
    return _react2.default.createElement(
        _reactDraggable2.default,
        {
            bounds: 'parent',
            defaultClassNameDragging: _monitor2.default.dragging,
            onStop: props.onDragEnd
        },
        _react2.default.createElement(
            _box2.default,
            {
                className: _monitor2.default.monitor,
                componentRef: props.componentRef
            },
            _react2.default.createElement(
                _box2.default,
                { className: _monitor2.default.label },
                props.label
            ),
            _react2.default.createElement(
                _box2.default,
                {
                    className: _monitor2.default.value,
                    style: { background: categories[props.category] }
                },
                props.value
            )
        )
    );
};

MonitorComponent.categories = categories;

MonitorComponent.propTypes = {
    category: _propTypes2.default.oneOf(Object.keys(categories)),
    componentRef: _propTypes2.default.func.isRequired,
    label: _propTypes2.default.string.isRequired,
    onDragEnd: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string.isRequired
};

MonitorComponent.defaultProps = {
    category: 'data'
};

exports.default = MonitorComponent;
