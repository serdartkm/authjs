(function (React) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var WebSocketCodeLab =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WebSocketCodeLab, _React$Component);

    function WebSocketCodeLab() {
      _classCallCheck(this, WebSocketCodeLab);

      return _possibleConstructorReturn(this, _getPrototypeOf(WebSocketCodeLab).apply(this, arguments));
    }

    _createClass(WebSocketCodeLab, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.webSocket = new WebSocket("ws://localhost:3000");

        this.webSocket.onopen = function () {
          console.log("client clonnected");
        };

        this.webSocket.onmessage = function (data) {
          console.log("data--", data);
        };
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", null, "WebSocketCodeLab");
      }
    }]);

    return WebSocketCodeLab;
  }(React.Component);

  ReactDOM.render(React.createElement(WebSocketCodeLab, null), document.getElementById('root'));

}(React));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuXG5jbGFzcyBXZWJTb2NrZXRDb2RlTGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcblxuICAgICAgICB0aGlzLndlYlNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDozMDAwXCIpXG4gICAgICAgIHRoaXMud2ViU29ja2V0Lm9ub3BlbiA9KCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGNsb25uZWN0ZWRcIilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndlYlNvY2tldC5vbm1lc3NhZ2U9KGRhdGEpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEtLVwiLGRhdGEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgICByZXR1cm4gPGRpdj5XZWJTb2NrZXRDb2RlTGFiPC9kaXY+XG4gICAgfVxuXG59XG5cblxuXG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxXZWJTb2NrZXRDb2RlTGFiIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcbiAgKTsiXSwibmFtZXMiOlsiV2ViU29ja2V0Q29kZUxhYiIsIndlYlNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsImNvbnNvbGUiLCJsb2ciLCJvbm1lc3NhZ2UiLCJkYXRhIiwiUmVhY3QiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BSU1BOzs7Ozs7Ozs7Ozs7OzBDQUVpQjtFQUVmLFdBQUtDLFNBQUwsR0FBaUIsSUFBSUMsU0FBSixDQUFjLHFCQUFkLENBQWpCOztFQUNBLFdBQUtELFNBQUwsQ0FBZUUsTUFBZixHQUF1QixZQUFJO0VBQ3ZCQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtFQUNILE9BRkQ7O0VBR0EsV0FBS0osU0FBTCxDQUFlSyxTQUFmLEdBQXlCLFVBQUNDLElBQUQsRUFBUTtFQUM3QkgsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFxQkUsSUFBckI7RUFDSCxPQUZEO0VBR0g7OzsrQkFFTztFQUVKLGFBQU8sb0RBQVA7RUFDSDs7OztJQWhCMEJDLEtBQUssQ0FBQ0M7O0VBd0JyQ0MsUUFBUSxDQUFDQyxNQUFULENBQ0ksb0JBQUMsZ0JBQUQsT0FESixFQUVJQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FGSjs7OzsifQ==
