'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _button = require('../../../src/components/button/button');

var _button2 = _interopRequireDefault(_button);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ButtonComponent', function () {
    test('matches snapshot', function () {
        var onClick = jest.fn();
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(_button2.default, { onClick: onClick }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers callback when clicked', function () {
        var onClick = jest.fn();
        var componentShallowWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_button2.default, { onClick: onClick }));
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
