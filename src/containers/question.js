'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

var _question = require('../components/question/question.js');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Question = function (_React$Component) {
    _inherits(Question, _React$Component);

    function Question(props) {
        _classCallCheck(this, Question);

        var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

        (0, _lodash2.default)(_this, ['handleChange', 'handleKeyPress', 'handleSubmit']);
        _this.state = {
            answer: ''
        };
        return _this;
    }

    _createClass(Question, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ answer: e.target.value });
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            if (event.key === 'Enter') this.handleSubmit();
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            this.props.onQuestionAnswered(this.state.answer);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_question2.default, {
                answer: this.state.answer,
                question: this.props.question,
                onChange: this.handleChange,
                onClick: this.handleSubmit,
                onKeyPress: this.handleKeyPress
            });
        }
    }]);

    return Question;
}(_react2.default.Component);

Question.propTypes = {
    onQuestionAnswered: _propTypes2.default.func.isRequired,
    question: _propTypes2.default.string
};

exports.default = Question;
