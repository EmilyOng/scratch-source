'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _intlHelpers = require('../../helpers/intl-helpers.js');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _audioBufferPlayer = require('../../__mocks__/audio-buffer-player.js');

var _audioBufferPlayer2 = _interopRequireDefault(_audioBufferPlayer);

var _audioEffects = require('../../__mocks__/audio-effects.js');

var _audioEffects2 = _interopRequireDefault(_audioEffects);

var _soundEditor = require('../../../src/containers/sound-editor');

var _soundEditor2 = _interopRequireDefault(_soundEditor);

var _soundEditor3 = require('../../../src/components/sound-editor/sound-editor');

var _soundEditor4 = _interopRequireDefault(_soundEditor3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../../src/lib/audio/audio-buffer-player', function () {
    return _audioBufferPlayer2.default;
});
jest.mock('../../../src/lib/audio/audio-effects', function () {
    return _audioEffects2.default;
});

describe('Sound Editor Container', function () {
    var mockStore = (0, _reduxMockStore2.default)();
    var store = void 0;
    var soundIndex = void 0;
    var soundBuffer = void 0;
    var samples = new Float32Array([0, 0, 0]); // eslint-disable-line no-undef
    var vm = void 0;

    beforeEach(function () {
        soundIndex = 0;
        soundBuffer = {
            sampleRate: 0,
            getChannelData: jest.fn(function () {
                return samples;
            })
        };
        vm = {
            getSoundBuffer: jest.fn(function () {
                return soundBuffer;
            }),
            renameSound: jest.fn(),
            updateSoundBuffer: jest.fn(),
            editingTarget: {
                sprite: {
                    sounds: [{ name: 'first name', id: 'first id' }]
                }
            }
        };
        store = mockStore({ vm: vm });
    });

    test('should pass the correct data to the component from the store', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var componentProps = wrapper.find(_soundEditor4.default).props();
        // Data retreived and processed by the `connect` with the store
        expect(componentProps.name).toEqual('first name');
        expect(componentProps.chunkLevels).toEqual([0]);
        expect(_audioBufferPlayer2.default.instance.samples).toEqual(samples);
        // Initial data
        expect(componentProps.playhead).toEqual(null);
        expect(componentProps.trimStart).toEqual(null);
        expect(componentProps.trimEnd).toEqual(null);
    });

    test('it plays when clicked and stops when clicked again', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        // Ensure rendering doesn't start playing any sounds
        expect(_audioBufferPlayer2.default.instance.play.mock.calls).toEqual([]);
        expect(_audioBufferPlayer2.default.instance.stop.mock.calls).toEqual([]);

        component.props().onPlay();
        expect(_audioBufferPlayer2.default.instance.play).toHaveBeenCalled();

        // Mock the audio buffer player calling onUpdate
        _audioBufferPlayer2.default.instance.onUpdate(0.5);
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.props().playhead).toEqual(0.5);

        component.props().onStop();
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(_audioBufferPlayer2.default.instance.stop).toHaveBeenCalled();
        expect(component.props().playhead).toEqual(null);
    });

    test('it sets the component props for trimming and submits to the vm', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);

        component.props().onActivateTrim();
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.props().trimStart).not.toEqual(null);
        expect(component.props().trimEnd).not.toEqual(null);

        component.props().onActivateTrim();
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
        expect(component.props().trimStart).toEqual(null);
        expect(component.props().trimEnd).toEqual(null);
    });

    test('it submits name changes to the vm', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onChangeName('hello');
        expect(vm.renameSound).toHaveBeenCalledWith(soundIndex, 'hello');
    });

    test('it handles an effect by submitting the result and playing', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onReverse(); // Could be any of the effects, just testing the end result
        _audioEffects2.default.instance._finishProcessing(soundBuffer);
        expect(_audioBufferPlayer2.default.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
    });

    test('it handles reverse effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onReverse();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.REVERSE);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles louder effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onLouder();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.LOUDER);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles softer effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onSofter();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.SOFTER);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles faster effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onFaster();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.FASTER);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles slower effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onSlower();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.SLOWER);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles echo effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onEcho();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.ECHO);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('it handles robot effect correctly', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        component.props().onRobot();
        expect(_audioEffects2.default.instance.name).toEqual(_audioEffects2.default.effectTypes.ROBOT);
        expect(_audioEffects2.default.instance.process).toHaveBeenCalled();
    });

    test('undo/redo stack state', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);
        // Undo and redo should be disabled initially
        expect(component.prop('canUndo')).toEqual(false);
        expect(component.prop('canRedo')).toEqual(false);

        // Submitting new samples should make it possible to undo
        component.props().onActivateTrim(); // Activate trimming
        component.props().onActivateTrim(); // Submit new samples by calling again
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.prop('canUndo')).toEqual(true);
        expect(component.prop('canRedo')).toEqual(false);

        // Undoing should make it possible to redo and not possible to undo again
        component.props().onUndo();
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.prop('canUndo')).toEqual(false);
        expect(component.prop('canRedo')).toEqual(true);

        // Redoing should make it possible to undo and not possible to redo again
        component.props().onRedo();
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.prop('canUndo')).toEqual(true);
        expect(component.prop('canRedo')).toEqual(false);

        // New submission should clear the redo stack
        component.props().onUndo(); // Undo to go back to a state where redo is enabled
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.prop('canRedo')).toEqual(true);
        component.props().onActivateTrim(); // Activate trimming
        component.props().onActivateTrim(); // Submit new samples by calling again

        wrapper.update();
        component = wrapper.find(_soundEditor4.default);
        expect(component.prop('canRedo')).toEqual(false);
    });

    test('undo and redo submit new samples and play the sound', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(_react2.default.createElement(_soundEditor2.default, {
            soundIndex: soundIndex,
            store: store
        }));
        var component = wrapper.find(_soundEditor4.default);

        // Set up an undoable state
        component.props().onActivateTrim(); // Activate trimming
        component.props().onActivateTrim(); // Submit new samples by calling again
        wrapper.update();
        component = wrapper.find(_soundEditor4.default);

        // Undo should update the sound buffer and play the new samples
        component.props().onUndo();
        expect(_audioBufferPlayer2.default.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();

        // Clear the mocks call history to assert again for redo.
        vm.updateSoundBuffer.mockClear();
        _audioBufferPlayer2.default.instance.play.mockClear();

        // Undo should update the sound buffer and play the new samples
        component.props().onRedo();
        expect(_audioBufferPlayer2.default.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
    });
});
