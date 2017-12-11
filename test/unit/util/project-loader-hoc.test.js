'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _projectLoaderHoc = require('../../../src/lib/project-loader-hoc.js');

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _storage = require('../../../src/lib/storage');

var _storage2 = _interopRequireDefault(_storage);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ProjectLoaderHOC', function () {
    test('when there is no project data, it renders null', function () {
        var Component = function Component(_ref) {
            var projectData = _ref.projectData;
            return _react2.default.createElement(
                'div',
                null,
                projectData
            );
        };
        var WrappedComponent = (0, _projectLoaderHoc2.default)(Component);
        window.location.hash = '#winning';
        var originalLoad = _storage2.default.load;
        _storage2.default.load = jest.fn(function () {
            return Promise.resolve(null);
        });
        var mounted = (0, _enzyme.mount)(_react2.default.createElement(WrappedComponent, null));
        _storage2.default.load = originalLoad;
        window.location.hash = '';
        var mountedDiv = mounted.find('div');
        expect(mountedDiv.exists()).toEqual(false);
    });

    test('when there is no hash, it loads the default project', function () {
        var Component = function Component(_ref2) {
            var projectData = _ref2.projectData;
            return _react2.default.createElement(
                'div',
                null,
                projectData
            );
        };
        var WrappedComponent = (0, _projectLoaderHoc2.default)(Component);
        window.location.hash = '';
        var originalLoad = _storage2.default.load;
        _storage2.default.load = jest.fn(function (type, id) {
            return Promise.resolve(id);
        });
        var mounted = (0, _enzyme.mount)(_react2.default.createElement(WrappedComponent, null));
        expect(mounted.state().projectId).toEqual(0);
        expect(_storage2.default.load).toHaveBeenCalledWith(_storage2.default.AssetType.Project, 0, _storage2.default.DataFormat.JSON);
        _storage2.default.load = originalLoad;
    });

    test('when there is a hash, it tries to load that project', function () {
        var Component = function Component(_ref3) {
            var projectData = _ref3.projectData;
            return _react2.default.createElement(
                'div',
                null,
                projectData
            );
        };
        var WrappedComponent = (0, _projectLoaderHoc2.default)(Component);
        window.location.hash = '#winning';
        var originalLoad = _storage2.default.load;
        _storage2.default.load = jest.fn(function (type, id) {
            return Promise.resolve({ data: id });
        });
        var mounted = (0, _enzyme.mount)(_react2.default.createElement(WrappedComponent, null));
        expect(mounted.state().projectId).toEqual('winning');
        expect(_storage2.default.load).toHaveBeenLastCalledWith(_storage2.default.AssetType.Project, 'winning', _storage2.default.DataFormat.JSON);
        _storage2.default.load = originalLoad;
    });

    test('when hash change happens, the project data state is changed', function () {
        var Component = function Component(_ref4) {
            var projectData = _ref4.projectData;
            return _react2.default.createElement(
                'div',
                null,
                projectData
            );
        };
        var WrappedComponent = (0, _projectLoaderHoc2.default)(Component);
        window.location.hash = '';
        var mounted = (0, _enzyme.mount)(_react2.default.createElement(WrappedComponent, null));
        expect(mounted.state().projectId).toEqual(0);
        var originalLoad = _storage2.default.load;
        _storage2.default.load = jest.fn(function (type, id) {
            return Promise.resolve({ data: id });
        });
        window.location.hash = '#winning';
        mounted.instance().updateProject();
        expect(mounted.state().projectId).toEqual('winning');
        _storage2.default.load = originalLoad;
    });
});
