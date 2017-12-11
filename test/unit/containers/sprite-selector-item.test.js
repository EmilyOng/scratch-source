'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _intlHelpers = require('../../helpers/intl-helpers.js');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reactRedux = require('react-redux');

var _spriteSelectorItem = require('../../../src/containers/sprite-selector-item');

var _spriteSelectorItem2 = _interopRequireDefault(_spriteSelectorItem);

var _closeButton = require('../../../src/components/close-button/close-button');

var _closeButton2 = _interopRequireDefault(_closeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SpriteSelectorItem Container', function () {
    var mockStore = (0, _reduxMockStore2.default)();
    var className = void 0;
    var costumeURL = void 0;
    var name = void 0;
    var onClick = void 0;
    var onDeleteButtonClick = void 0;
    var selected = void 0;
    var id = void 0;
    var store = void 0;
    // Wrap this in a function so it gets test specific states and can be reused.
    var getContainer = function getContainer() {
        return _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_spriteSelectorItem2.default, {
                className: className,
                costumeURL: costumeURL,
                id: id,
                name: name,
                selected: selected,
                onClick: onClick,
                onDeleteButtonClick: onDeleteButtonClick
            })
        );
    };

    beforeEach(function () {
        store = mockStore();
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        id = 1337;
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        selected = true;
        // Mock window.confirm() which is called when the close button is clicked.
        global.confirm = jest.fn(function () {
            return true;
        });
    });

    test('should confirm if the user really wants to delete the sprite', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(getContainer());
        wrapper.find(_closeButton2.default).simulate('click');
        expect(global.confirm).toHaveBeenCalled();
        expect(onDeleteButtonClick).toHaveBeenCalledWith(1337);
    });

    test('should not delete the sprite if the user cancels', function () {
        global.confirm = jest.fn(function () {
            return false;
        });
        var wrapper = (0, _intlHelpers.mountWithIntl)(getContainer());
        wrapper.find(_closeButton2.default).simulate('click');
        expect(global.confirm).toHaveBeenCalled();
        expect(onDeleteButtonClick).not.toHaveBeenCalled();
    });
});
