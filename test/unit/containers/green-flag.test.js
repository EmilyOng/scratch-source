'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _greenFlag = require('../../../src/containers/green-flag');

var _greenFlag2 = _interopRequireDefault(_greenFlag);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _scratchVm = require('scratch-vm');

var _scratchVm2 = _interopRequireDefault(_scratchVm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GreenFlag Container', function () {
    var vm = void 0;
    beforeEach(function () {
        vm = new _scratchVm2.default();
    });

    test('renders active state', function () {
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(_greenFlag2.default, {
            active: true,
            vm: vm
        }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders inactive state', function () {
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(_greenFlag2.default, {
            active: false,
            vm: vm
        }));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers onClick when active', function () {
        var onClick = jest.fn();
        var componentShallowWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_greenFlag2.default, {
            active: true,
            vm: vm,
            onClick: onClick
        }));
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    // @todo: Test for handles key events.
    // @todo: Test project run start.
    // @todo: Test project run stop.
});
