'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _intlHelpers = require('../../helpers/intl-helpers.js');

var _soundEditor = require('../../../src/components/sound-editor/sound-editor');

var _soundEditor2 = _interopRequireDefault(_soundEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Sound Editor Component', function () {
    var props = void 0;
    beforeEach(function () {
        props = {
            canUndo: true,
            canRedo: false,
            chunkLevels: [1, 2, 3],
            name: 'sound name',
            playhead: 0.5,
            trimStart: 0.2,
            trimEnd: 0.8,
            onActivateTrim: jest.fn(),
            onChangeName: jest.fn(),
            onPlay: jest.fn(),
            onRedo: jest.fn(),
            onReverse: jest.fn(),
            onSofter: jest.fn(),
            onLouder: jest.fn(),
            onRobot: jest.fn(),
            onEcho: jest.fn(),
            onFaster: jest.fn(),
            onSlower: jest.fn(),
            onSetTrimEnd: jest.fn(),
            onSetTrimStart: jest.fn(),
            onStop: jest.fn(),
            onUndo: jest.fn()
        };
    });

    test('matches snapshot', function () {
        var component = (0, _intlHelpers.componentWithIntl)(_react2.default.createElement(_soundEditor2.default, props));
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('trim button appears when trims are null', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            trimEnd: null,
            trimStart: null
        })));
        wrapper.find('button[title="Trim"]').simulate('click');
        expect(props.onActivateTrim).toHaveBeenCalled();
    });

    test('save button appears when trims are not null', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            trimEnd: 0.75,
            trimStart: 0.25
        })));
        wrapper.find('button[title="Save"]').simulate('click');
        expect(props.onActivateTrim).toHaveBeenCalled();
    });

    test('play button appears when playhead is null', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            playhead: null
        })));
        wrapper.find('button[title="Play"]').simulate('click');
        expect(props.onPlay).toHaveBeenCalled();
    });

    test('stop button appears when playhead is not null', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            playhead: 0.5
        })));
        wrapper.find('button[title="Stop"]').simulate('click');
        expect(props.onStop).toHaveBeenCalled();
    });

    test('submitting name calls the callback', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, props));
        wrapper.find('input').simulate('change', { target: { value: 'hello' } }).simulate('blur');
        expect(props.onChangeName).toHaveBeenCalled();
    });

    test('effect buttons call the correct callbacks', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, props));

        wrapper.find('[children="Reverse"]').simulate('click');
        expect(props.onReverse).toHaveBeenCalled();

        wrapper.find('[children="Echo"]').simulate('click');
        expect(props.onEcho).toHaveBeenCalled();

        wrapper.find('[children="Robot"]').simulate('click');
        expect(props.onRobot).toHaveBeenCalled();

        wrapper.find('[children="Faster"]').simulate('click');
        expect(props.onFaster).toHaveBeenCalled();

        wrapper.find('[children="Slower"]').simulate('click');
        expect(props.onSlower).toHaveBeenCalled();

        wrapper.find('[children="Louder"]').simulate('click');
        expect(props.onLouder).toHaveBeenCalled();

        wrapper.find('[children="Softer"]').simulate('click');
        expect(props.onSofter).toHaveBeenCalled();
    });

    test('undo and redo buttons can be disabled by canUndo/canRedo', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            canUndo: true,
            canRedo: false
        })));
        expect(wrapper.find('button[title="Undo"]').prop('disabled')).toBe(false);
        expect(wrapper.find('button[title="Redo"]').prop('disabled')).toBe(true);

        wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            canRedo: true,
            canUndo: false
        })));
        expect(wrapper.find('button[title="Undo"]').prop('disabled')).toBe(true);
        expect(wrapper.find('button[title="Redo"]').prop('disabled')).toBe(false);
    });

    test.skip('undo/redo buttons call the correct callback', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, _extends({}, props, {
            canRedo: true,
            canUndo: true
        })));
        wrapper.find('button[title="Undo"]').simulate('click');
        expect(props.onUndo).toHaveBeenCalled();

        wrapper.find('button[title="Redo"]').simulate('click');
        expect(props.onRedo).toHaveBeenCalled();
    });
});
