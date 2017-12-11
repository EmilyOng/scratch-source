'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _intlHelpers = require('../../helpers/intl-helpers.js');

var _controls = require('../../../src/components/controls/controls');

var _controls2 = _interopRequireDefault(_controls);

var _turboMode = require('../../../src/components/turbo-mode/turbo-mode');

var _turboMode2 = _interopRequireDefault(_turboMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Controls component', function () {
    var defaultProps = function defaultProps() {
        return {
            active: false,
            greenFlagTitle: 'Go',
            onGreenFlagClick: jest.fn(),
            onStopAllClick: jest.fn(),
            stopAllTitle: 'Stop',
            turbo: false
        };
    };

    test('shows turbo mode when in turbo mode', function () {
        var component = (0, _intlHelpers.shallowWithIntl)(_react2.default.createElement(_controls2.default, defaultProps()));
        expect(component.find(_turboMode2.default).exists()).toEqual(false);
        component.setProps({ turbo: true });
        expect(component.find(_turboMode2.default).exists()).toEqual(true);
    });

    test('triggers the right callbacks when clicked', function () {
        var props = defaultProps();
        var component = (0, _intlHelpers.shallowWithIntl)(_react2.default.createElement(_controls2.default, props));
        component.find('[title="Go"]').simulate('click');
        expect(props.onGreenFlagClick).toHaveBeenCalled();

        component.find('[title="Stop"]').simulate('click');
        expect(props.onStopAllClick).toHaveBeenCalled();
    });
});
