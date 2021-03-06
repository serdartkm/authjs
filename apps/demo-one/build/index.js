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

  var AppOne =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(AppOne, _React$Component);

    function AppOne() {
      _classCallCheck(this, AppOne);

      return _possibleConstructorReturn(this, _getPrototypeOf(AppOne).apply(this, arguments));
    }

    _createClass(AppOne, [{
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
        return React.createElement("div", null, "AppOne");
      }
    }]);

    return AppOne;
  }(React.Component);

  ReactDOM.render(React.createElement(AppOne, null), document.getElementById('root'));

}(React));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5cbmNsYXNzIEFwcE9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cbiAgICAgICAgdGhpcy53ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6MzAwMFwiKVxuICAgICAgICB0aGlzLndlYlNvY2tldC5vbm9wZW4gPSgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBjbG9ubmVjdGVkXCIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJTb2NrZXQub25tZXNzYWdlPShkYXRhKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhLS1cIixkYXRhKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG5cbiAgICAgICAgcmV0dXJuIDxkaXY+QXBwT25lPC9kaXY+XG4gICAgfVxuXG59XG5cblxuXG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxBcHBPbmUgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuICApOyJdLCJuYW1lcyI6WyJBcHBPbmUiLCJ3ZWJTb2NrZXQiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJjb25zb2xlIiwibG9nIiwib25tZXNzYWdlIiwiZGF0YSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUlNQTs7Ozs7Ozs7Ozs7OzswQ0FFaUI7RUFFZixXQUFLQyxTQUFMLEdBQWlCLElBQUlDLFNBQUosQ0FBYyxxQkFBZCxDQUFqQjs7RUFDQSxXQUFLRCxTQUFMLENBQWVFLE1BQWYsR0FBdUIsWUFBSTtFQUN2QkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVo7RUFDSCxPQUZEOztFQUdBLFdBQUtKLFNBQUwsQ0FBZUssU0FBZixHQUF5QixVQUFDQyxJQUFELEVBQVE7RUFDN0JILFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBcUJFLElBQXJCO0VBQ0gsT0FGRDtFQUdIOzs7K0JBRU87RUFFSixhQUFPLDBDQUFQO0VBQ0g7Ozs7SUFoQmdCQyxLQUFLLENBQUNDOztFQXdCM0JDLFFBQVEsQ0FBQ0MsTUFBVCxDQUNJLG9CQUFDLE1BQUQsT0FESixFQUVJQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FGSjs7OzsifQ==
