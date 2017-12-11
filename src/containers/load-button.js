"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _lodash = require("lodash.bindall");

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _loadButton = require("../components/load-button/load-button.js");

var _loadButton2 = _interopRequireDefault(_loadButton);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var LoadButton = (function(_React$Component) {
  _inherits(LoadButton, _React$Component);

  function LoadButton(props) {
    _classCallCheck(this, LoadButton);

    var _this = _possibleConstructorReturn(
      this,
      (LoadButton.__proto__ || Object.getPrototypeOf(LoadButton))
        .call(this, props)
    );

    (0, _lodash2.default)(_this, [
      "setFileInput",
      "handleChange",
      "handleClick"
    ]);
    return _this;
  }

  _createClass(LoadButton, [
    {
      key: "handleChange",
      value: function handleChange(e) {
        console.log("load");
        return this.props.loadProject(document.getElementById("myBlocks").value);
      }
    },
    {
      key: "handleClick",
      value: function handleClick() {
        this.fileInput.click();
        console.log("click");
      }
    },
    {
      key: "setFileInput",
      value: function setFileInput(input) {
        this.fileInput = input;
      }
    },
    {
      key: "render",
      value: function render() {
        console.log("render");
        var _props = this.props,
          loadProject = _props.loadProject,
          props = _objectWithoutProperties(_props, ["loadProject"]);
        return _react2.default.createElement(
          _loadButton2.default,
          _extends(
            {
              inputRef: this.setFileInput,
              onChange: this.handleChange,
              onClick: this.handleClick
            },
            props
          )
        );
      }
    }
  ]);

  return LoadButton;
})(_react2.default.Component);

LoadButton.propTypes = {
  loadProject: _propTypes2.default.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    loadProject: state.vm.fromJSON.bind(state.vm)
  };
};

exports.default = (0, _reactRedux.connect)(
  mapStateToProps,
  function() {
    return {};
  } // omit dispatch prop
)(LoadButton);
