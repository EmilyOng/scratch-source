'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _intlHelpers = require('../../helpers/intl-helpers.js');

var _spriteSelectorItem = require('../../../src/components/sprite-selector-item/sprite-selector-item');

var _spriteSelectorItem2 = _interopRequireDefault(_spriteSelectorItem);

var _costumeCanvas = require('../../../src/components/costume-canvas/costume-canvas');

var _costumeCanvas2 = _interopRequireDefault(_costumeCanvas);

var _closeButton = require('../../../src/components/close-button/close-button');

var _closeButton2 = _interopRequireDefault(_closeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SpriteSelectorItemComponent', function () {
    var className = void 0;
    var costumeURL = void 0;
    var name = void 0;
    var onClick = void 0;
    var onDeleteButtonClick = void 0;
    var selected = void 0;

    // Wrap this in a function so it gets test specific states and can be reused.
    var getComponent = function getComponent() {
        return _react2.default.createElement(_spriteSelectorItem2.default, {
            className: className,
            costumeURL: costumeURL,
            name: name,
            selected: selected,
            onClick: onClick,
            onDeleteButtonClick: onDeleteButtonClick
        });
    };

    beforeEach(function () {
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        selected = true;
    });

    test('matches snapshot when selected', function () {
        var component = (0, _intlHelpers.componentWithIntl)(getComponent());
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('does not have a close box when not selected', function () {
        selected = false;
        var wrapper = (0, _intlHelpers.shallowWithIntl)(getComponent());
        expect(wrapper.find(_closeButton2.default).exists()).toBe(false);
    });

    test('triggers callback when Box component is clicked', function () {
        // Use `mount` here because of the way ContextMenuTrigger consumes onClick
        var wrapper = (0, _intlHelpers.mountWithIntl)(getComponent());
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    test('triggers callback when CloseButton component is clicked', function () {
        var wrapper = (0, _intlHelpers.shallowWithIntl)(getComponent());
        wrapper.find(_closeButton2.default).simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalled();
    });

    test('creates a CostumeCanvas when a costume url is defined', function () {
        var wrapper = (0, _intlHelpers.shallowWithIntl)(getComponent());
        expect(wrapper.find(_costumeCanvas2.default).exists()).toBe(true);
    });

    test('does not create a CostumeCanvas when a costume url is null', function () {
        costumeURL = null;
        var wrapper = (0, _intlHelpers.shallowWithIntl)(getComponent());
        expect(wrapper.find(_costumeCanvas2.default).exists()).toBe(false);
    });

    test('it has a context menu with delete menu item and callback', function () {
        var wrapper = (0, _intlHelpers.mountWithIntl)(getComponent());
        var contextMenu = wrapper.find('ContextMenu');
        expect(contextMenu.exists()).toBe(true);

        contextMenu.find('[children="delete"]').simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalled();
    });
});
