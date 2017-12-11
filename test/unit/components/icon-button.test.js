'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _iconButton = require('../../../src/components/icon-button/icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('IconButtonComponent', function () {
    test('matches snapshot', function () {
        var onClick = jest.fn();
        var title = _react2.default.createElement(
            'div',
            null,
            'Text'
        );
        var imgSrc = 'imgSrc';
        var className = 'custom-class-name';
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(_iconButton2.default, {
            className: className,
            img: imgSrc,
            title: title,
            onClick: onClick
        }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers callback when clicked', function () {
        var onClick = jest.fn();
        var title = _react2.default.createElement(
            'div',
            null,
            'Text'
        );
        var imgSrc = 'imgSrc';
        var componentShallowWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_iconButton2.default, {
            img: imgSrc,
            title: title,
            onClick: onClick
        }));
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
