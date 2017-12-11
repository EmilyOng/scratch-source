'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Higher Order Component to provide behavior for loading projects by id from
 * the window's hash (#this part in the url)
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
var ProjectLoaderHOC = function ProjectLoaderHOC(WrappedComponent) {
    var ProjectLoaderComponent = function (_React$Component) {
        _inherits(ProjectLoaderComponent, _React$Component);

        function ProjectLoaderComponent(props) {
            _classCallCheck(this, ProjectLoaderComponent);

            var _this = _possibleConstructorReturn(this, (ProjectLoaderComponent.__proto__ || Object.getPrototypeOf(ProjectLoaderComponent)).call(this, props));

            _this.fetchProjectId = _this.fetchProjectId.bind(_this);
            _this.updateProject = _this.updateProject.bind(_this);
            _this.state = {
                projectId: null,
                projectData: null
            };
            return _this;
        }

        _createClass(ProjectLoaderComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                window.addEventListener('hashchange', this.updateProject);
                this.updateProject();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps, prevState) {
                var _this2 = this;

                if (this.state.projectId !== prevState.projectId) {
                    _storage2.default.load(_storage2.default.AssetType.Project, this.state.projectId, _storage2.default.DataFormat.JSON).then(function (projectAsset) {
                        return projectAsset && _this2.setState({
                            projectData: projectAsset.data.toString()
                        });
                    }).catch(function (err) {
                        return _log2.default.error(err);
                    });
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.removeEventListener('hashchange', this.updateProject);
            }
        }, {
            key: 'fetchProjectId',
            value: function fetchProjectId() {
                return window.location.hash.substring(1);
            }
        }, {
            key: 'updateProject',
            value: function updateProject() {
                var projectId = this.fetchProjectId();
                if (projectId !== this.state.projectId) {
                    if (projectId.length < 1) projectId = 0;
                    this.setState({ projectId: projectId });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                if (!this.state.projectData) return null;
                return _react2.default.createElement(WrappedComponent, _extends({
                    projectData: this.state.projectData
                }, this.props));
            }
        }]);

        return ProjectLoaderComponent;
    }(_react2.default.Component);

    return ProjectLoaderComponent;
};

exports.default = ProjectLoaderHOC;
