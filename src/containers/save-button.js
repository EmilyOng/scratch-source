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

var _button = require("../components/button/button.js");

var _button2 = _interopRequireDefault(_button);

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

var SaveButton = (function(_React$Component) {
  _inherits(SaveButton, _React$Component);

  function SaveButton(props) {
    _classCallCheck(this, SaveButton);

    var _this = _possibleConstructorReturn(
      this,
      (SaveButton.__proto__ || Object.getPrototypeOf(SaveButton))
        .call(this, props)
    );

    (0, _lodash2.default)(_this, ["handleClick"]);
    return _this;
  }

  _createClass(SaveButton, [
    {
      key: "handleClick",
      value: function handleClick() {
        var json = this.props.saveProjectSb3();
        document.getElementById("myBlocks").value = json;
        console.log(json);
        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
        // var saveLink = document.createElement("a");
        // document.body.appendChild(saveLink);
        //
        // var data = new Blob([json], { type: "text" });
        // var url = window.URL.createObjectURL(data);
        // saveLink.href = url;
        //
        // // File name: project-DATE-TIME
        // var date = new Date();
        // var timestamp =
        //   date.toLocaleDateString() + "-" + date.toLocaleTimeString();
        // saveLink.download = "project-" + timestamp + ".json";
        // saveLink.click();
        // window.URL.revokeObjectURL(url);
        // document.body.removeChild(saveLink);
      }
    },
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          saveProjectSb3 = _props.saveProjectSb3,
          props = _objectWithoutProperties(_props, ["saveProjectSb3"]);

        return _react2.default.createElement(
          _button2.default,
          _extends(
            {
              onClick: this.handleClick
            },
            props
          ),
          "Save"
        );
      }
    }
  ]);

  return SaveButton;
})(_react2.default.Component);

SaveButton.propTypes = {
  saveProjectSb3: _propTypes2.default.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
  };
};

exports.default = (0, _reactRedux.connect)(
  mapStateToProps,
  function() {
    return {};
  } // omit dispatch prop
)(SaveButton);
