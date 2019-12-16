var n,
    l,
    u,
    t,
    i,
    o,
    r,
    f = {},
    e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

function s(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function a(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var t,
      i,
      o,
      r,
      f = arguments;
  if (l = s({}, l), arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) u.push(f[t]);
  if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
  return r = l.key, null != (o = l.ref) && delete l.ref, null != r && delete l.key, v(n, l, r, o);
}

function v(l, u, t, i) {
  var o = {
    type: l,
    props: u,
    key: t,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: null,
    __c: null,
    constructor: void 0
  };
  return n.vnode && n.vnode(o), o;
}

function p() {
  return {};
}

function d(n) {
  return n.children;
}

function y(n, l) {
  this.props = n, this.context = l;
}

function m(n, l) {
  if (null == l) return n.__ ? m(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? m(n) : null;
}

function w(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return w(n);
  }
}

function g(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && ((i = n.debounceRendering) || t)(k);
}

function k() {
  var n, l, t, i, o, r, f;

  for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) n.__d && (t = void 0, i = void 0, r = (o = (l = n).__v).__e, (f = l.__P) && (t = [], i = T(f, o, s({}, o), l.__n, void 0 !== f.ownerSVGElement, null, t, null == r ? m(o) : r), $(t, o), i != r && w(o)));
}

function _(n, l, u, t, i, o, r, c, s) {
  var h,
      v,
      p,
      d,
      y,
      w,
      g,
      k = u && u.__k || e,
      _ = k.length;
  if (c == f && (c = null != o ? o[0] : _ ? m(u, 0) : null), h = 0, l.__k = b(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) k[h] = void 0;else for (v = 0; v < _; v++) {
        if ((p = k[v]) && u.key == p.key && u.type === p.type) {
          k[v] = void 0;
          break;
        }

        p = null;
      }

      if (d = T(n, u, p = p || f, t, i, o, r, c, s), (v = u.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, u), g.push(v, u.__c || d, u)), null != d) {
        if (null == w && (w = d), null != u.__d) d = u.__d, u.__d = null;else if (o == p || d != c || null == d.parentNode) {
          n: if (null == c || c.parentNode !== n) n.appendChild(d);else {
            for (y = c, v = 0; (y = y.nextSibling) && v < _; v += 2) if (y == d) break n;

            n.insertBefore(d, c);
          }

          "option" == l.type && (n.value = "");
        }
        c = d.nextSibling, "function" == typeof l.type && (l.__d = d);
      }
    }

    return h++, u;
  }), l.__e = w, null != o && "function" != typeof l.type) for (h = o.length; h--;) null != o[h] && a(o[h]);

  for (h = _; h--;) null != k[h] && A(k[h], k[h]);

  if (g) for (h = 0; h < g.length; h++) z(g[h], g[++h], g[++h]);
}

function b(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) b(n[t], l, u);else u.push(l ? l("string" == typeof n || "number" == typeof n ? v(null, n, null, null) : null != n.__e || null != n.__c ? v(n.type, n.props, n.key, null) : n) : n);
  return u;
}

function x(n, l, u, t, i) {
  var o;

  for (o in u) o in l || P(n, o, null, u[o], t);

  for (o in l) i && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || P(n, o, l[o], u[o], t);
}

function C(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
}

function P(n, l, u, t, i) {
  var o, r, f, e, c;
  if (i ? "className" === l && (l = "class") : "class" === l && (l = "className"), "key" === l || "children" === l) ;else if ("style" === l) {
    if (o = n.style, "string" == typeof u) o.cssText = u;else {
      if ("string" == typeof t && (o.cssText = "", t = null), t) for (r in t) u && r in u || C(o, r, "");
      if (u) for (f in u) t && u[f] === t[f] || C(o, f, u[f]);
    }
  } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, N, e), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, N, e)) : "list" !== l && "tagName" !== l && "form" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
}

function N(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}

function T(l, u, t, i, o, r, f, e, c) {
  var a,
      h,
      v,
      p,
      m,
      w,
      g,
      k,
      x,
      C,
      P = u.type;
  if (void 0 !== u.constructor) return null;
  (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (k = u.props, x = (a = P.contextType) && i[a.__c], C = a ? x ? x.props.value : a.__ : i, t.__c ? g = (h = u.__c = t.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(k, C) : (u.__c = h = new y(k, C), h.constructor = P, h.render = D), x && x.sub(h), h.props = k, h.state || (h.state = {}), h.context = C, h.__n = i, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), s(h.__s, P.getDerivedStateFromProps(k, h.__s))), p = h.props, m = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && null == h.__e && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, C), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, C)) {
          for (h.props = k, h.state = h.__s, h.__d = !1, h.__v = u, u.__e = t.__e, u.__k = t.__k, h.__h.length && f.push(h), a = 0; a < u.__k.length; a++) u.__k[a] && (u.__k[a].__ = u);

          break n;
        }

        null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, C), null != h.componentDidUpdate && h.__h.push(function () {
          h.componentDidUpdate(p, m, w);
        });
      }
      h.context = C, h.props = k, h.state = h.__s, (a = n.__r) && a(u), h.__d = !1, h.__v = u, h.__P = l, a = h.render(h.props, h.state, h.context), u.__k = b(null != a && a.type == d && null == a.key ? a.props.children : a), null != h.getChildContext && (i = s(s({}, i), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (w = h.getSnapshotBeforeUpdate(p, m)), _(l, u, t, i, o, r, f, e, c), h.base = u.__e, h.__h.length && f.push(h), g && (h.__E = h.__ = null), h.__e = null;
    } else u.__e = j(t.__e, u, t, i, o, r, f, c);

    (a = n.diffed) && a(u);
  } catch (l) {
    n.__e(l, u, t);
  }

  return u.__e;
}

function $(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, t, i, o, r, c) {
  var s,
      a,
      h,
      v,
      p,
      d = u.props,
      y = l.props;
  if (i = "svg" === l.type || i, null == n && null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
    n = a, o[s] = null;
    break;
  }

  if (null == n) {
    if (null === l.type) return document.createTextNode(y);
    n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), o = null;
  }

  if (null === l.type) null != o && (o[o.indexOf(n)] = null), d !== y && (n.data = y);else if (l !== u) {
    if (null != o && (o = e.slice.call(n.childNodes)), h = (d = u.props || f).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, !c) {
      if (d === f) for (d = {}, p = 0; p < n.attributes.length; p++) d[n.attributes[p].name] = n.attributes[p].value;
      (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || ""));
    }

    x(n, y, d, i, c), l.__k = l.props.children, v || _(n, l, u, t, "foreignObject" !== l.type && i, o, r, f, c), c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked));
  }
  return n;
}

function z(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}

function A(l, u, t) {
  var i, o, r;

  if (n.unmount && n.unmount(l), (i = l.ref) && z(i, null, u), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = null, null != (i = l.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    i.base = i.__P = null;
  }

  if (i = l.__k) for (r = 0; r < i.length; r++) i[r] && A(i[r], u, t);
  null != o && a(o);
}

function D(n, l, u) {
  return this.constructor(n, u);
}

function E(l, u, t) {
  var i, r, c;
  n.__ && n.__(l, u), r = (i = t === o) ? null : t && t.__k || u.__k, l = h(d, null, [l]), c = [], T(u, (i ? u : t || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : r ? null : e.slice.call(u.childNodes), c, t || f, i), $(c, l);
}

function H(n, l) {
  E(n, l, o);
}

function I(n, l) {
  return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), v(n.type, l, l.key || n.key, l.ref || n.ref);
}

function L(n) {
  var l = {},
      u = {
    __c: "__cC" + r++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var t,
          i = this;
      return this.getChildContext || (t = [], this.getChildContext = function () {
        return l[u.__c] = i, l;
      }, this.shouldComponentUpdate = function (l) {
        n.value !== l.value && t.some(function (n) {
          n.context = l.value, g(n);
        });
      }, this.sub = function (n) {
        t.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          t.splice(t.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Consumer.contextType = u, u;
}

n = {
  __e: function (n, l) {
    for (var u; l = l.__;) if ((u = l.__c) && !u.__) try {
      if (u.constructor && null != u.constructor.getDerivedStateFromError) u.setState(u.constructor.getDerivedStateFromError(n));else {
        if (null == u.componentDidCatch) continue;
        u.componentDidCatch(n);
      }
      return g(u.__E = u);
    } catch (l) {
      n = l;
    }

    throw n;
  }
}, l = function (n) {
  return null != n && void 0 === n.constructor;
}, y.prototype.setState = function (n, l) {
  var u;
  u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (this.__e = !1, l && this.__h.push(l), g(this));
}, y.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
}, y.prototype.render = d, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = f, r = 0;

var preact_module = /*#__PURE__*/Object.freeze({
  render: E,
  hydrate: H,
  createElement: h,
  h: h,
  Fragment: d,
  createRef: p,
  get isValidElement () { return l; },
  Component: y,
  cloneElement: I,
  createContext: L,
  toChildArray: b,
  _unmount: A,
  get options () { return n; }
});

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var t$1,
    u$1,
    r$1,
    i$1 = [],
    o$1 = n.__r,
    f$1 = n.diffed,
    c$1 = n.__c,
    e$1 = n.unmount;

function a$1(t) {
  n.__h && n.__h(u$1);
  var r = u$1.__H || (u$1.__H = {
    t: [],
    u: []
  });
  return t >= r.t.length && r.t.push({}), r.t[t];
}

function v$1(n$$1) {
  return m$1(x$1, n$$1);
}

function m$1(n$$1, r, i) {
  var o = a$1(t$1++);
  return o.__c || (o.__c = u$1, o.i = [i ? i(r) : x$1(void 0, r), function (t) {
    var u = n$$1(o.i[0], t);
    o.i[0] !== u && (o.i[0] = u, o.__c.setState({}));
  }]), o.i;
}

function p$1(n$$1, r) {
  var i = a$1(t$1++);
  q(i.o, r) && (i.i = n$$1, i.o = r, u$1.__H.u.push(i));
}

function d$1(n$$1) {
  return y$1(function () {
    return {
      current: n$$1
    };
  }, []);
}

function y$1(n$$1, u) {
  var r = a$1(t$1++);
  return q(r.o, u) ? (r.o = u, r.v = n$$1, r.i = n$$1()) : r.i;
}

function F() {
  i$1.some(function (n$$1) {
    n$$1.__P && (n$$1.__H.u.forEach(_$1), n$$1.__H.u.forEach(g$1), n$$1.__H.u = []);
  }), i$1 = [];
}

function _$1(n$$1) {
  n$$1.m && n$$1.m();
}

function g$1(n$$1) {
  var t = n$$1.i();
  "function" == typeof t && (n$$1.m = t);
}

function q(n$$1, t) {
  return !n$$1 || t.some(function (t, u) {
    return t !== n$$1[u];
  });
}

function x$1(n$$1, t) {
  return "function" == typeof t ? t(n$$1) : t;
}

n.__r = function (n$$1) {
  o$1 && o$1(n$$1), t$1 = 0, (u$1 = n$$1.__c).__H && (u$1.__H.u.forEach(_$1), u$1.__H.u.forEach(g$1), u$1.__H.u = []);
}, n.diffed = function (t) {
  f$1 && f$1(t);
  var u = t.__c;

  if (u) {
    var o = u.__H;
    o && o.u.length && (1 !== i$1.push(u) && r$1 === n.requestAnimationFrame || ((r$1 = n.requestAnimationFrame) || function (n$$1) {
      var t,
          u = function () {
        clearTimeout(r), cancelAnimationFrame(t), setTimeout(n$$1);
      },
          r = setTimeout(u, 100);

      "undefined" != typeof window && (t = requestAnimationFrame(u));
    })(F));
  }
}, n.__c = function (n$$1, t) {
  t.some(function (n$$1) {
    n$$1.__h.forEach(_$1), n$$1.__h = n$$1.__h.filter(function (n$$1) {
      return !n$$1.i || g$1(n$$1);
    });
  }), c$1 && c$1(n$$1, t);
}, n.unmount = function (n$$1) {
  e$1 && e$1(n$$1);
  var t = n$$1.__c;

  if (t) {
    var u = t.__H;
    u && u.t.forEach(function (n$$1) {
      return n$$1.m && n$$1.m();
    });
  }
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var interopRequireDefault = createCommonjsModule(function (module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = _interopRequireDefault;
});
unwrapExports(interopRequireDefault);

var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

var superPropBase = _superPropBase;

var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

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

var createClass = _createClass;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return typeof obj;
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var bindDecorator = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var constants;

  (function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
  })(constants || (constants = {}));

  function bind(target, propertyKey, descriptor) {
    if (!descriptor || typeof descriptor.value !== constants.typeOfFunction) {
      throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }

    return {
      configurable: constants.boolTrue,
      get: function () {
        var bound = descriptor.value.bind(this); // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.

        Object.defineProperty(this, propertyKey, {
          value: bound,
          configurable: constants.boolTrue,
          writable: constants.boolTrue
        });
        return bound;
      }
    };
  }

  exports.bind = bind;
  exports.default = bind;
});
unwrapExports(bindDecorator);
var bindDecorator_1 = bindDecorator.bind;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @template F
 */

class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};
const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};
const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225,
  // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150,
  // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices

};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;
/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */

let supportsPassive_;
/**
 * @param {!Window} windowObj
 * @return {boolean}
 */

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}
/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */


function supportsCssVariables(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  const weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }

  return supportsCssVariables;
} //

/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */


function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;

    try {
      globalObj.document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        }

      });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}
/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */


function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(p => p in HTMLElementPrototype).pop();
}
/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */


function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {
    x,
    y
  } = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;
  let normalizedX;
  let normalizedY; // Determine touch point relative to the ripple container.

  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}

var util = /*#__PURE__*/Object.freeze({
  supportsCssVariables: supportsCssVariables,
  applyPassive: applyPassive,
  getMatchesProperty: getMatchesProperty,
  getNormalizedEventCoords: getNormalizedEventCoords
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

/** @type {!Array<!EventTarget>} */

let activatedTargets = [];
/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

class MDCRippleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () =>
      /* boolean - cached */
      {},
      isUnbounded: () =>
      /* boolean */
      {},
      isSurfaceActive: () =>
      /* boolean */
      {},
      isSurfaceDisabled: () =>
      /* boolean */
      {},
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      containsEventTarget: () =>
      /* target: !EventTarget */
      {},
      registerInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {},
      updateCssVariable: () =>
      /* varName: string, value: string */
      {},
      computeBoundingRect: () =>
      /* ClientRect */
      {},
      getWindowPageOffset: () =>
      /* {x: number, y: number} */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));
    /** @private {number} */

    this.layoutFrame_ = 0;
    /** @private {!ClientRect} */

    this.frame_ =
    /** @type {!ClientRect} */
    {
      width: 0,
      height: 0
    };
    /** @private {!ActivationStateType} */

    this.activationState_ = this.defaultActivationState_();
    /** @private {number} */

    this.initialSize_ = 0;
    /** @private {number} */

    this.maxRadius_ = 0;
    /** @private {function(!Event)} */

    this.activateHandler_ = e => this.activate_(e);
    /** @private {function(!Event)} */


    this.deactivateHandler_ = e => this.deactivate_(e);
    /** @private {function(?Event=)} */


    this.focusHandler_ = () => this.handleFocus();
    /** @private {function(?Event=)} */


    this.blurHandler_ = () => this.handleBlur();
    /** @private {!Function} */


    this.resizeHandler_ = () => this.layout();
    /** @private {{left: number, top:number}} */


    this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    /** @private {number} */

    this.fgScale_ = 0;
    /** @private {number} */

    this.activationTimer_ = 0;
    /** @private {number} */

    this.fgDeactivationRemovalTimer_ = 0;
    /** @private {boolean} */

    this.activationAnimationHasEnded_ = false;
    /** @private {!Function} */

    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
    /** @private {?Event} */


    this.previousActivationEvent_ = null;
  }
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  supportsPressRipple_() {
    return this.adapter_.browserSupportsCssVars();
  }
  /**
   * @return {!ActivationStateType}
   */


  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  }
  /** @override */


  init() {
    const supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.addClass(ROOT);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple

          this.layoutInternal_();
        }
      });
    }
  }
  /** @override */


  destroy() {
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.removeClass(ROOT);
        this.adapter_.removeClass(UNBOUNDED);
        this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  }
  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */


  registerRootHandlers_(supportsPressRipple) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerInteractionHandler(type, this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  }
  /**
   * @param {!Event} e
   * @private
   */


  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }
  /** @private */


  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }
  /** @private */


  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }
  /** @private */


  removeCssVars_() {
    const {
      strings: strings$$1
    } = MDCRippleFoundation;
    Object.keys(strings$$1).forEach(k => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings$$1[k], null);
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';
    const hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(target => this.adapter_.containsEventTarget(target));

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(
      /** @type {!EventTarget} */
      e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  checkElementMadeActive_(e) {
    return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  activate(event = null) {
    this.activate_(event);
  }
  /** @private */


  animateActivation_() {
    const {
      VAR_FG_TRANSLATE_START,
      VAR_FG_TRANSLATE_END
    } = MDCRippleFoundation.strings;
    const {
      FG_DEACTIVATION,
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      DEACTIVATION_TIMEOUT_MS
    } = MDCRippleFoundation.numbers;
    this.layoutInternal_();
    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {
        startPoint,
        endPoint
      } = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }
  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  getFgTranslationCoordinates_() {
    const {
      activationEvent,
      wasActivatedByPointer
    } = this.activationState_;
    let startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
      /** @type {!Event} */
      activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    const endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint,
      endPoint
    };
  }
  /** @private */


  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {
      FG_DEACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      hasDeactivationUXRun,
      isActivated
    } = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  }
  /** @private */


  rmBoundedActivationClasses_() {
    const {
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }
  /**
   * @param {?Event} e
   * @private
   */


  deactivate_(e) {
    const activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    const state =
    /** @type {!ActivationStateType} */
    Object.assign({}, activationState);

    if (activationState.isProgrammatic) {
      const evtObject = null;
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
        this.resetActivationState_();
      });
    }
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  deactivate(event = null) {
    this.deactivate_(event);
  }
  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  animateDeactivation_(e, {
    wasActivatedByPointer,
    wasElementMadeActive
  }) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }
  /** @private */


  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  }
  /** @private */


  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE,
      VAR_LEFT,
      VAR_TOP,
      VAR_FG_SCALE
    } = MDCRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }
  /** @param {boolean} unbounded */


  setUnbounded(unbounded) {
    const {
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() => this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() => this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

class MDCRipple extends MDCComponent {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @type {boolean} */

    this.disabled = false;
    /** @private {boolean} */

    this.unbounded_;
  }
  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  static attachTo(root, {
    isUnbounded = undefined
  } = {}) {
    const ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (isUnbounded !== undefined) {
      ripple.unbounded =
      /** @type {boolean} */
      isUnbounded;
    }

    return ripple;
  }
  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  static createAdapter(instance) {
    const MATCHES = getMatchesProperty(HTMLElement.prototype);
    return {
      browserSupportsCssVars: () => supportsCssVariables(window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: className => instance.root_.classList.add(className),
      removeClass: className => instance.root_.classList.remove(className),
      containsEventTarget: target => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) => instance.root_.addEventListener(evtType, handler, applyPassive()),
      deregisterInteractionHandler: (evtType, handler) => instance.root_.removeEventListener(evtType, handler, applyPassive()),
      registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
      deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    };
  }
  /** @return {boolean} */


  get unbounded() {
    return this.unbounded_;
  }
  /** @param {boolean} unbounded */


  set unbounded(unbounded) {
    this.unbounded_ = Boolean(unbounded);
    this.setUnbounded_();
  }
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */


  setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  }

  activate() {
    this.foundation_.activate();
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  layout() {
    this.foundation_.layout();
  }
  /**
   * @return {!MDCRippleFoundation}
   * @override
   */


  getDefaultFoundation() {
    return new MDCRippleFoundation(MDCRipple.createAdapter(this));
  }
  /** @override */


  initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  }

}
/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


class RippleCapableSurface {}
/** @protected {!Element} */


RippleCapableSurface.prototype.root_;
/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.unbounded;
/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.disabled;

var ripple = /*#__PURE__*/Object.freeze({
  MDCRipple: MDCRipple,
  MDCRippleFoundation: MDCRippleFoundation,
  RippleCapableSurface: RippleCapableSurface,
  util: util
});

var MaterialComponent_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.MaterialComponent = void 0;

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

  var _inherits2 = interopRequireDefault(inherits);

  var _typeof2 = interopRequireDefault(_typeof_1);

  var __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var doNotRemoveProps = ['disabled'];
  /**
   * Base class for every Material component in this package
   * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
   *
   * @export
   * @class MaterialComponent
   * @extends {Component}
   */

  var MaterialComponent =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(MaterialComponent, _Component);

    function MaterialComponent() {
      (0, _classCallCheck2.default)(this, MaterialComponent);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MaterialComponent).apply(this, arguments));
    }

    (0, _createClass2.default)(MaterialComponent, [{
      key: "render",
      value: function render(props) {
        if (!this.classText) {
          this.classText = this.buildClassName(props);
        } // Fetch a VNode


        var componentProps = props;
        var userDefinedClasses = componentProps.className || componentProps.class || ''; // We delete class props and add them later in the final
        // step so every component does not need to handle user specified classes.

        if (componentProps.class) {
          delete componentProps.class;
        }

        if (componentProps.className) {
          delete componentProps.className;
        }

        var element = this.materialDom(componentProps);
        var propName = 'attributes';

        if ('props' in element) {
          propName = 'props'; // @ts-ignore

          element.props = element.props || {};
        } else {
          element.attributes = element.attributes || {};
        } // @ts-ignore


        element[propName].className = "".concat(userDefinedClasses, " ").concat(this.getClassName(element)).split(' ').filter(function (value, index, self) {
          return self.indexOf(value) === index && value !== '';
        }) // Unique + exclude empty class names
        .join(' '); // Clean this shit of proxy attributes

        this.mdcProps.forEach(function (prop) {
          // TODO: Fix this better
          if (prop in doNotRemoveProps) {
            return;
          } // @ts-ignore


          delete element[propName][prop];
        });
        return element;
      }
      /** Attach the ripple effect */

    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.ripple && this.control) {
          this.ripple = new ripple.MDCRipple(this.control);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (this.MDComponent && this.mdcNotifyProps) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.mdcNotifyProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var prop = _step.value;

              if (this.props[prop] !== nextProps[prop]) {
                this.MDComponent[prop] = nextProps[prop];
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.mdcProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _prop = _step2.value;

            if (this.props[_prop] !== nextProps[_prop]) {
              this.classText = this.buildClassName(nextProps);
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.ripple) {
          this.ripple.destroy();
        }
      }
    }, {
      key: "afterComponentDidMount",
      value: function afterComponentDidMount() {
        if (this.MDComponent && this.mdcNotifyProps) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.mdcNotifyProps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var prop = _step3.value;
              this.MDComponent[prop] = this.props[prop];
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } // Shared setter for the root element ref

    }, {
      key: "setControlRef",
      value: function setControlRef(control) {
        this.control = control;
      }
      /** Build the className based on component names and mdc props */

    }, {
      key: "buildClassName",
      value: function buildClassName(props) {
        // Class name based on component name
        var classText = 'mdc-' + this.componentName; // Loop over mdcProps to turn them into classNames

        for (var propKey in props) {
          if (props.hasOwnProperty(propKey)) {
            var prop = props[propKey];

            if (typeof prop === 'boolean' && prop) {
              if (this.mdcProps.indexOf(propKey) !== -1) {
                classText += " mdc-".concat(this.componentName, "--").concat(propKey);
              }
            }
          }
        }

        return classText;
      }
      /** Returns the class name for element */

    }, {
      key: "getClassName",
      value: function getClassName(element) {
        if (!element) {
          return '';
        }

        var propName = 'attributes';

        if ('props' in element) {
          propName = 'props'; // @ts-ignore

          element.props = element.props || {};
        } else {
          element.attributes = element.attributes || {};
        } // @ts-ignore


        var attrs = element[propName] = element[propName] || {};
        var classText = this.classText;

        if (attrs.class) {
          classText += ' ' + attrs.class;
        }

        if (attrs.className && attrs.className !== attrs.class) {
          classText += ' ' + attrs.className;
        }

        return classText;
      }
    }]);
    return MaterialComponent;
  }(preact_module.Component);

  exports.MaterialComponent = MaterialComponent;

  __decorate([bindDecorator.bind], MaterialComponent.prototype, "setControlRef", null);

  var _default = MaterialComponent;
  exports.default = _default;
});
unwrapExports(MaterialComponent_1);
var MaterialComponent_2 = MaterialComponent_1.MaterialComponent;

var Icon_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Icon = void 0;

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

  var _inherits2 = interopRequireDefault(inherits);

  var _MaterialComponent2 = interopRequireDefault(MaterialComponent_1);

  var Icon =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(Icon, _MaterialComponent);

    function Icon() {
      var _this;

      (0, _classCallCheck2.default)(this, Icon);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
      _this.componentName = 'icon';
      _this.mdcProps = [];
      return _this;
    }

    (0, _createClass2.default)(Icon, [{
      key: "materialDom",
      value: function materialDom(props) {
        var classes = ['material-icons']; // CardActionIcon sends className

        if (props.className) {
          classes.push(props.className);
        }

        return (0, preact_module.h)("i", Object.assign({}, props, {
          className: classes.join(' ')
        }), props.children);
      }
    }]);
    return Icon;
  }(_MaterialComponent2.default);

  exports.Icon = Icon;
  var _default = Icon;
  exports.default = _default;
});
unwrapExports(Icon_1);
var Icon_2 = Icon_1.Icon;

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

export { createCommonjsModule as a, interopRequireDefault as b, classCallCheck as c, createClass as d, possibleConstructorReturn as e, getPrototypeOf as f, inherits as g, MaterialComponent_1 as h, Icon_1 as i, preact_module as j, unwrapExports as k, get as l, _typeof_1 as m, bindDecorator as n, styleInject as o, h as p, b as q, I as r, y as s, commonjsGlobal as t, v$1 as u, slicedToArray as v, E as w, d$1 as x, p$1 as y };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstZjE1NzcxYjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QubW9kdWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JpbmQtZGVjb3JhdG9yL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0Jhc2UvTWF0ZXJpYWxDb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBuLGwsdSx0LGksbyxyLGY9e30sZT1bXSxjPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkL2k7ZnVuY3Rpb24gcyhuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBhKG4pe3ZhciBsPW4ucGFyZW50Tm9kZTtsJiZsLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGgobixsLHUpe3ZhciB0LGksbyxyLGY9YXJndW1lbnRzO2lmKGw9cyh7fSxsKSxhcmd1bWVudHMubGVuZ3RoPjMpZm9yKHU9W3VdLHQ9Mzt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXUucHVzaChmW3RdKTtpZihudWxsIT11JiYobC5jaGlsZHJlbj11KSxudWxsIT1uJiZudWxsIT1uLmRlZmF1bHRQcm9wcylmb3IoaSBpbiBuLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1sW2ldJiYobFtpXT1uLmRlZmF1bHRQcm9wc1tpXSk7cmV0dXJuIHI9bC5rZXksbnVsbCE9KG89bC5yZWYpJiZkZWxldGUgbC5yZWYsbnVsbCE9ciYmZGVsZXRlIGwua2V5LHYobixsLHIsbyl9ZnVuY3Rpb24gdihsLHUsdCxpKXt2YXIgbz17dHlwZTpsLHByb3BzOnUsa2V5OnQscmVmOmksX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2Q6bnVsbCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDB9O3JldHVybiBuLnZub2RlJiZuLnZub2RlKG8pLG99ZnVuY3Rpb24gcCgpe3JldHVybnt9fWZ1bmN0aW9uIGQobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24geShuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiBtKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz9tKG4uX18sbi5fXy5fX2suaW5kZXhPZihuKSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP20obik6bnVsbH1mdW5jdGlvbiB3KG4pe3ZhciBsLHU7aWYobnVsbCE9KG49bi5fXykmJm51bGwhPW4uX19jKXtmb3Iobi5fX2U9bi5fX2MuYmFzZT1udWxsLGw9MDtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSl7bi5fX2U9bi5fX2MuYmFzZT11Ll9fZTticmVha31yZXR1cm4gdyhuKX19ZnVuY3Rpb24gZyhsKXsoIWwuX19kJiYobC5fX2Q9ITApJiYxPT09dS5wdXNoKGwpfHxpIT09bi5kZWJvdW5jZVJlbmRlcmluZykmJigoaT1uLmRlYm91bmNlUmVuZGVyaW5nKXx8dCkoayl9ZnVuY3Rpb24gaygpe3ZhciBuLGwsdCxpLG8scixmO2Zvcih1LnNvcnQoZnVuY3Rpb24obixsKXtyZXR1cm4gbC5fX3YuX19iLW4uX192Ll9fYn0pO249dS5wb3AoKTspbi5fX2QmJih0PXZvaWQgMCxpPXZvaWQgMCxyPShvPShsPW4pLl9fdikuX19lLChmPWwuX19QKSYmKHQ9W10saT1UKGYsbyxzKHt9LG8pLGwuX19uLHZvaWQgMCE9PWYub3duZXJTVkdFbGVtZW50LG51bGwsdCxudWxsPT1yP20obyk6ciksJCh0LG8pLGkhPXImJncobykpKX1mdW5jdGlvbiBfKG4sbCx1LHQsaSxvLHIsYyxzKXt2YXIgaCx2LHAsZCx5LHcsZyxrPXUmJnUuX19rfHxlLF89ay5sZW5ndGg7aWYoYz09ZiYmKGM9bnVsbCE9bz9vWzBdOl8/bSh1LDApOm51bGwpLGg9MCxsLl9faz1iKGwuX19rLGZ1bmN0aW9uKHUpe2lmKG51bGwhPXUpe2lmKHUuX189bCx1Ll9fYj1sLl9fYisxLG51bGw9PT0ocD1rW2hdKXx8cCYmdS5rZXk9PXAua2V5JiZ1LnR5cGU9PT1wLnR5cGUpa1toXT12b2lkIDA7ZWxzZSBmb3Iodj0wO3Y8Xzt2Kyspe2lmKChwPWtbdl0pJiZ1LmtleT09cC5rZXkmJnUudHlwZT09PXAudHlwZSl7a1t2XT12b2lkIDA7YnJlYWt9cD1udWxsfWlmKGQ9VChuLHUscD1wfHxmLHQsaSxvLHIsYyxzKSwodj11LnJlZikmJnAucmVmIT12JiYoZ3x8KGc9W10pLHAucmVmJiZnLnB1c2gocC5yZWYsbnVsbCx1KSxnLnB1c2godix1Ll9fY3x8ZCx1KSksbnVsbCE9ZCl7aWYobnVsbD09dyYmKHc9ZCksbnVsbCE9dS5fX2QpZD11Ll9fZCx1Ll9fZD1udWxsO2Vsc2UgaWYobz09cHx8ZCE9Y3x8bnVsbD09ZC5wYXJlbnROb2RlKXtuOmlmKG51bGw9PWN8fGMucGFyZW50Tm9kZSE9PW4pbi5hcHBlbmRDaGlsZChkKTtlbHNle2Zvcih5PWMsdj0wOyh5PXkubmV4dFNpYmxpbmcpJiZ2PF87dis9MilpZih5PT1kKWJyZWFrIG47bi5pbnNlcnRCZWZvcmUoZCxjKX1cIm9wdGlvblwiPT1sLnR5cGUmJihuLnZhbHVlPVwiXCIpfWM9ZC5uZXh0U2libGluZyxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGUmJihsLl9fZD1kKX19cmV0dXJuIGgrKyx1fSksbC5fX2U9dyxudWxsIT1vJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsLnR5cGUpZm9yKGg9by5sZW5ndGg7aC0tOyludWxsIT1vW2hdJiZhKG9baF0pO2ZvcihoPV87aC0tOyludWxsIT1rW2hdJiZBKGtbaF0sa1toXSk7aWYoZylmb3IoaD0wO2g8Zy5sZW5ndGg7aCsrKXooZ1toXSxnWysraF0sZ1srK2hdKX1mdW5jdGlvbiBiKG4sbCx1KXtpZihudWxsPT11JiYodT1bXSksbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBuKWwmJnUucHVzaChsKG51bGwpKTtlbHNlIGlmKEFycmF5LmlzQXJyYXkobikpZm9yKHZhciB0PTA7dDxuLmxlbmd0aDt0KyspYihuW3RdLGwsdSk7ZWxzZSB1LnB1c2gobD9sKFwic3RyaW5nXCI9PXR5cGVvZiBufHxcIm51bWJlclwiPT10eXBlb2Ygbj92KG51bGwsbixudWxsLG51bGwpOm51bGwhPW4uX19lfHxudWxsIT1uLl9fYz92KG4udHlwZSxuLnByb3BzLG4ua2V5LG51bGwpOm4pOm4pO3JldHVybiB1fWZ1bmN0aW9uIHgobixsLHUsdCxpKXt2YXIgbztmb3IobyBpbiB1KW8gaW4gbHx8UChuLG8sbnVsbCx1W29dLHQpO2ZvcihvIGluIGwpaSYmXCJmdW5jdGlvblwiIT10eXBlb2YgbFtvXXx8XCJ2YWx1ZVwiPT09b3x8XCJjaGVja2VkXCI9PT1vfHx1W29dPT09bFtvXXx8UChuLG8sbFtvXSx1W29dLHQpfWZ1bmN0aW9uIEMobixsLHUpe1wiLVwiPT09bFswXT9uLnNldFByb3BlcnR5KGwsdSk6bltsXT1cIm51bWJlclwiPT10eXBlb2YgdSYmITE9PT1jLnRlc3QobCk/dStcInB4XCI6bnVsbD09dT9cIlwiOnV9ZnVuY3Rpb24gUChuLGwsdSx0LGkpe3ZhciBvLHIsZixlLGM7aWYoaT9cImNsYXNzTmFtZVwiPT09bCYmKGw9XCJjbGFzc1wiKTpcImNsYXNzXCI9PT1sJiYobD1cImNsYXNzTmFtZVwiKSxcImtleVwiPT09bHx8XCJjaGlsZHJlblwiPT09bCk7ZWxzZSBpZihcInN0eWxlXCI9PT1sKWlmKG89bi5zdHlsZSxcInN0cmluZ1wiPT10eXBlb2YgdSlvLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYoby5jc3NUZXh0PVwiXCIsdD1udWxsKSx0KWZvcihyIGluIHQpdSYmciBpbiB1fHxDKG8scixcIlwiKTtpZih1KWZvcihmIGluIHUpdCYmdVtmXT09PXRbZl18fEMobyxmLHVbZl0pfWVsc2VcIm9cIj09PWxbMF0mJlwiblwiPT09bFsxXT8oZT1sIT09KGw9bC5yZXBsYWNlKC9DYXB0dXJlJC8sXCJcIikpLGM9bC50b0xvd2VyQ2FzZSgpLGw9KGMgaW4gbj9jOmwpLnNsaWNlKDIpLHU/KHR8fG4uYWRkRXZlbnRMaXN0ZW5lcihsLE4sZSksKG4ubHx8KG4ubD17fSkpW2xdPXUpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLE4sZSkpOlwibGlzdFwiIT09bCYmXCJ0YWdOYW1lXCIhPT1sJiZcImZvcm1cIiE9PWwmJiFpJiZsIGluIG4/bltsXT1udWxsPT11P1wiXCI6dTpcImZ1bmN0aW9uXCIhPXR5cGVvZiB1JiZcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIhPT1sJiYobCE9PShsPWwucmVwbGFjZSgvXnhsaW5rOj8vLFwiXCIpKT9udWxsPT11fHwhMT09PXU/bi5yZW1vdmVBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixsLnRvTG93ZXJDYXNlKCkpOm4uc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpLHUpOm51bGw9PXV8fCExPT09dT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLHUpKX1mdW5jdGlvbiBOKGwpe3RoaXMubFtsLnR5cGVdKG4uZXZlbnQ/bi5ldmVudChsKTpsKX1mdW5jdGlvbiBUKGwsdSx0LGksbyxyLGYsZSxjKXt2YXIgYSxoLHYscCxtLHcsZyxrLHgsQyxQPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOyhhPW4uX19iKSYmYSh1KTt0cnl7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBQKXtpZihrPXUucHJvcHMseD0oYT1QLmNvbnRleHRUeXBlKSYmaVthLl9fY10sQz1hP3g/eC5wcm9wcy52YWx1ZTphLl9fOmksdC5fX2M/Zz0oaD11Ll9fYz10Ll9fYykuX189aC5fX0U6KFwicHJvdG90eXBlXCJpbiBQJiZQLnByb3RvdHlwZS5yZW5kZXI/dS5fX2M9aD1uZXcgUChrLEMpOih1Ll9fYz1oPW5ldyB5KGssQyksaC5jb25zdHJ1Y3Rvcj1QLGgucmVuZGVyPUQpLHgmJnguc3ViKGgpLGgucHJvcHM9ayxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5jb250ZXh0PUMsaC5fX249aSx2PWguX19kPSEwLGguX19oPVtdKSxudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLG51bGwhPVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1zKHt9LGguX19zKSkscyhoLl9fcyxQLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHA9aC5wcm9wcyxtPWguc3RhdGUsdiludWxsPT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCksbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKG51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsPT1oLl9fZSYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoayxDKSwhaC5fX2UmJm51bGwhPWguc2hvdWxkQ29tcG9uZW50VXBkYXRlJiYhMT09PWguc2hvdWxkQ29tcG9uZW50VXBkYXRlKGssaC5fX3MsQykpe2ZvcihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxoLl9fdj11LHUuX19lPXQuX19lLHUuX19rPXQuX19rLGguX19oLmxlbmd0aCYmZi5wdXNoKGgpLGE9MDthPHUuX19rLmxlbmd0aDthKyspdS5fX2tbYV0mJih1Ll9fa1thXS5fXz11KTticmVhayBufW51bGwhPWguY29tcG9uZW50V2lsbFVwZGF0ZSYmaC5jb21wb25lbnRXaWxsVXBkYXRlKGssaC5fX3MsQyksbnVsbCE9aC5jb21wb25lbnREaWRVcGRhdGUmJmguX19oLnB1c2goZnVuY3Rpb24oKXtoLmNvbXBvbmVudERpZFVwZGF0ZShwLG0sdyl9KX1oLmNvbnRleHQ9QyxoLnByb3BzPWssaC5zdGF0ZT1oLl9fcywoYT1uLl9fcikmJmEodSksaC5fX2Q9ITEsaC5fX3Y9dSxoLl9fUD1sLGE9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdS5fX2s9YihudWxsIT1hJiZhLnR5cGU9PWQmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46YSksbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPXMocyh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSksdnx8bnVsbD09aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZXx8KHc9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZShwLG0pKSxfKGwsdSx0LGksbyxyLGYsZSxjKSxoLmJhc2U9dS5fX2UsaC5fX2gubGVuZ3RoJiZmLnB1c2goaCksZyYmKGguX19FPWguX189bnVsbCksaC5fX2U9bnVsbH1lbHNlIHUuX19lPWoodC5fX2UsdSx0LGksbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe24uX19lKGwsdSx0KX1yZXR1cm4gdS5fX2V9ZnVuY3Rpb24gJChsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gaihuLGwsdSx0LGksbyxyLGMpe3ZhciBzLGEsaCx2LHAsZD11LnByb3BzLHk9bC5wcm9wcztpZihpPVwic3ZnXCI9PT1sLnR5cGV8fGksbnVsbD09biYmbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYobnVsbD09PWwudHlwZT8zPT09YS5ub2RlVHlwZTphLmxvY2FsTmFtZT09PWwudHlwZSkpe249YSxvW3NdPW51bGw7YnJlYWt9aWYobnVsbD09bil7aWYobnVsbD09PWwudHlwZSlyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoeSk7bj1pP2RvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsbC50eXBlKTpkb2N1bWVudC5jcmVhdGVFbGVtZW50KGwudHlwZSksbz1udWxsfWlmKG51bGw9PT1sLnR5cGUpbnVsbCE9byYmKG9bby5pbmRleE9mKG4pXT1udWxsKSxkIT09eSYmKG4uZGF0YT15KTtlbHNlIGlmKGwhPT11KXtpZihudWxsIT1vJiYobz1lLnNsaWNlLmNhbGwobi5jaGlsZE5vZGVzKSksaD0oZD11LnByb3BzfHxmKS5kYW5nZXJvdXNseVNldElubmVySFRNTCx2PXkuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIWMpe2lmKGQ9PT1mKWZvcihkPXt9LHA9MDtwPG4uYXR0cmlidXRlcy5sZW5ndGg7cCsrKWRbbi5hdHRyaWJ1dGVzW3BdLm5hbWVdPW4uYXR0cmlidXRlc1twXS52YWx1ZTsodnx8aCkmJih2JiZoJiZ2Ll9faHRtbD09aC5fX2h0bWx8fChuLmlubmVySFRNTD12JiZ2Ll9faHRtbHx8XCJcIikpfXgobix5LGQsaSxjKSxsLl9faz1sLnByb3BzLmNoaWxkcmVuLHZ8fF8obixsLHUsdCxcImZvcmVpZ25PYmplY3RcIiE9PWwudHlwZSYmaSxvLHIsZixjKSxjfHwoXCJ2YWx1ZVwiaW4geSYmdm9pZCAwIT09eS52YWx1ZSYmeS52YWx1ZSE9PW4udmFsdWUmJihuLnZhbHVlPW51bGw9PXkudmFsdWU/XCJcIjp5LnZhbHVlKSxcImNoZWNrZWRcImluIHkmJnZvaWQgMCE9PXkuY2hlY2tlZCYmeS5jaGVja2VkIT09bi5jaGVja2VkJiYobi5jaGVja2VkPXkuY2hlY2tlZCkpfXJldHVybiBufWZ1bmN0aW9uIHoobCx1LHQpe3RyeXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBsP2wodSk6bC5jdXJyZW50PXV9Y2F0Y2gobCl7bi5fX2UobCx0KX19ZnVuY3Rpb24gQShsLHUsdCl7dmFyIGksbyxyO2lmKG4udW5tb3VudCYmbi51bm1vdW50KGwpLChpPWwucmVmKSYmeihpLG51bGwsdSksdHx8XCJmdW5jdGlvblwiPT10eXBlb2YgbC50eXBlfHwodD1udWxsIT0obz1sLl9fZSkpLGwuX19lPWwuX19kPW51bGwsbnVsbCE9KGk9bC5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobCl7bi5fX2UobCx1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPWwuX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmQShpW3JdLHUsdCk7bnVsbCE9byYmYShvKX1mdW5jdGlvbiBEKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIEUobCx1LHQpe3ZhciBpLHIsYztuLl9fJiZuLl9fKGwsdSkscj0oaT10PT09byk/bnVsbDp0JiZ0Ll9fa3x8dS5fX2ssbD1oKGQsbnVsbCxbbF0pLGM9W10sVCh1LChpP3U6dHx8dSkuX19rPWwscnx8ZixmLHZvaWQgMCE9PXUub3duZXJTVkdFbGVtZW50LHQmJiFpP1t0XTpyP251bGw6ZS5zbGljZS5jYWxsKHUuY2hpbGROb2RlcyksYyx0fHxmLGkpLCQoYyxsKX1mdW5jdGlvbiBIKG4sbCl7RShuLGwsbyl9ZnVuY3Rpb24gSShuLGwpe3JldHVybiBsPXMocyh7fSxuLnByb3BzKSxsKSxhcmd1bWVudHMubGVuZ3RoPjImJihsLmNoaWxkcmVuPWUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpLHYobi50eXBlLGwsbC5rZXl8fG4ua2V5LGwucmVmfHxuLnJlZil9ZnVuY3Rpb24gTChuKXt2YXIgbD17fSx1PXtfX2M6XCJfX2NDXCIrcisrLF9fOm4sQ29uc3VtZXI6ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0sUHJvdmlkZXI6ZnVuY3Rpb24obil7dmFyIHQsaT10aGlzO3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHQ9W10sdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbFt1Ll9fY109aSxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihsKXtuLnZhbHVlIT09bC52YWx1ZSYmdC5zb21lKGZ1bmN0aW9uKG4pe24uY29udGV4dD1sLnZhbHVlLGcobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dC5wdXNoKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3Quc3BsaWNlKHQuaW5kZXhPZihuKSwxKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn19O3JldHVybiB1LkNvbnN1bWVyLmNvbnRleHRUeXBlPXUsdX1uPXtfX2U6ZnVuY3Rpb24obixsKXtmb3IodmFyIHU7bD1sLl9fOylpZigodT1sLl9fYykmJiF1Ll9fKXRyeXtpZih1LmNvbnN0cnVjdG9yJiZudWxsIT11LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcil1LnNldFN0YXRlKHUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKTtlbHNle2lmKG51bGw9PXUuY29tcG9uZW50RGlkQ2F0Y2gpY29udGludWU7dS5jb21wb25lbnREaWRDYXRjaChuKX1yZXR1cm4gZyh1Ll9fRT11KX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LHkucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT10aGlzLl9fcyE9PXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9cyh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKHUsdGhpcy5wcm9wcykpLG4mJnModSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKHRoaXMuX19lPSExLGwmJnRoaXMuX19oLnB1c2gobCksZyh0aGlzKSl9LHkucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSxnKHRoaXMpKX0seS5wcm90b3R5cGUucmVuZGVyPWQsdT1bXSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LG89ZixyPTA7ZXhwb3J0e0UgYXMgcmVuZGVyLEggYXMgaHlkcmF0ZSxoIGFzIGNyZWF0ZUVsZW1lbnQsaCxkIGFzIEZyYWdtZW50LHAgYXMgY3JlYXRlUmVmLGwgYXMgaXNWYWxpZEVsZW1lbnQseSBhcyBDb21wb25lbnQsSSBhcyBjbG9uZUVsZW1lbnQsTCBhcyBjcmVhdGVDb250ZXh0LGIgYXMgdG9DaGlsZEFycmF5LEEgYXMgX3VubW91bnQsbiBhcyBvcHRpb25zfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgaWYgKCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsImltcG9ydHtvcHRpb25zIGFzIG59ZnJvbVwicHJlYWN0XCI7dmFyIHQsdSxyLGk9W10sbz1uLl9fcixmPW4uZGlmZmVkLGM9bi5fX2MsZT1uLnVubW91bnQ7ZnVuY3Rpb24gYSh0KXtuLl9faCYmbi5fX2godSk7dmFyIHI9dS5fX0h8fCh1Ll9fSD17dDpbXSx1OltdfSk7cmV0dXJuIHQ+PXIudC5sZW5ndGgmJnIudC5wdXNoKHt9KSxyLnRbdF19ZnVuY3Rpb24gdihuKXtyZXR1cm4gbSh4LG4pfWZ1bmN0aW9uIG0obixyLGkpe3ZhciBvPWEodCsrKTtyZXR1cm4gby5fX2N8fChvLl9fYz11LG8uaT1baT9pKHIpOngodm9pZCAwLHIpLGZ1bmN0aW9uKHQpe3ZhciB1PW4oby5pWzBdLHQpO28uaVswXSE9PXUmJihvLmlbMF09dSxvLl9fYy5zZXRTdGF0ZSh7fSkpfV0pLG8uaX1mdW5jdGlvbiBwKG4scil7dmFyIGk9YSh0KyspO3EoaS5vLHIpJiYoaS5pPW4saS5vPXIsdS5fX0gudS5wdXNoKGkpKX1mdW5jdGlvbiBsKG4scil7dmFyIGk9YSh0KyspO3EoaS5vLHIpJiYoaS5pPW4saS5vPXIsdS5fX2gucHVzaChpKSl9ZnVuY3Rpb24gZChuKXtyZXR1cm4geShmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gcyhuLHQsdSl7bChmdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIG4/bih0KCkpOm4mJihuLmN1cnJlbnQ9dCgpKX0sbnVsbD09dT91OnUuY29uY2F0KG4pKX1mdW5jdGlvbiB5KG4sdSl7dmFyIHI9YSh0KyspO3JldHVybiBxKHIubyx1KT8oci5vPXUsci52PW4sci5pPW4oKSk6ci5pfWZ1bmN0aW9uIFQobix0KXtyZXR1cm4geShmdW5jdGlvbigpe3JldHVybiBufSx0KX1mdW5jdGlvbiB3KG4pe3ZhciByPXUuY29udGV4dFtuLl9fY107aWYoIXIpcmV0dXJuIG4uX187dmFyIGk9YSh0KyspO3JldHVybiBudWxsPT1pLmkmJihpLmk9ITAsci5zdWIodSkpLHIucHJvcHMudmFsdWV9ZnVuY3Rpb24gQSh0LHUpe24udXNlRGVidWdWYWx1ZSYmbi51c2VEZWJ1Z1ZhbHVlKHU/dSh0KTp0KX1mdW5jdGlvbiBGKCl7aS5zb21lKGZ1bmN0aW9uKG4pe24uX19QJiYobi5fX0gudS5mb3JFYWNoKF8pLG4uX19ILnUuZm9yRWFjaChnKSxuLl9fSC51PVtdKX0pLGk9W119ZnVuY3Rpb24gXyhuKXtuLm0mJm4ubSgpfWZ1bmN0aW9uIGcobil7dmFyIHQ9bi5pKCk7XCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKG4ubT10KX1mdW5jdGlvbiBxKG4sdCl7cmV0dXJuIW58fHQuc29tZShmdW5jdGlvbih0LHUpe3JldHVybiB0IT09blt1XX0pfWZ1bmN0aW9uIHgobix0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Qobik6dH1uLl9fcj1mdW5jdGlvbihuKXtvJiZvKG4pLHQ9MCwodT1uLl9fYykuX19IJiYodS5fX0gudS5mb3JFYWNoKF8pLHUuX19ILnUuZm9yRWFjaChnKSx1Ll9fSC51PVtdKX0sbi5kaWZmZWQ9ZnVuY3Rpb24odCl7ZiYmZih0KTt2YXIgdT10Ll9fYztpZih1KXt2YXIgbz11Ll9fSDtvJiZvLnUubGVuZ3RoJiYoMSE9PWkucHVzaCh1KSYmcj09PW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKHI9bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHxmdW5jdGlvbihuKXt2YXIgdCx1PWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHIpLGNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHI9c2V0VGltZW91dCh1LDEwMCk7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHUpKX0pKEYpKX19LG4uX19jPWZ1bmN0aW9uKG4sdCl7dC5zb21lKGZ1bmN0aW9uKG4pe24uX19oLmZvckVhY2goXyksbi5fX2g9bi5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLml8fGcobil9KX0pLGMmJmMobix0KX0sbi51bm1vdW50PWZ1bmN0aW9uKG4pe2UmJmUobik7dmFyIHQ9bi5fX2M7aWYodCl7dmFyIHU9dC5fX0g7dSYmdS50LmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIG4ubSYmbi5tKCl9KX19O2V4cG9ydHt2IGFzIHVzZVN0YXRlLG0gYXMgdXNlUmVkdWNlcixwIGFzIHVzZUVmZmVjdCxsIGFzIHVzZUxheW91dEVmZmVjdCxkIGFzIHVzZVJlZixzIGFzIHVzZUltcGVyYXRpdmVIYW5kbGUseSBhcyB1c2VNZW1vLFQgYXMgdXNlQ2FsbGJhY2ssdyBhcyB1c2VDb250ZXh0LEEgYXMgdXNlRGVidWdWYWx1ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zdXBlclByb3BCYXNlOyIsInZhciBzdXBlclByb3BCYXNlID0gcmVxdWlyZShcIi4vc3VwZXJQcm9wQmFzZVwiKTtcblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBSZWZsZWN0LmdldDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IHN1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29uc3RhbnRzO1xuKGZ1bmN0aW9uIChjb25zdGFudHMpIHtcbiAgICBjb25zdGFudHMudHlwZU9mRnVuY3Rpb24gPSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0YW50cy5ib29sVHJ1ZSA9IHRydWU7XG59KShjb25zdGFudHMgfHwgKGNvbnN0YW50cyA9IHt9KSk7XG5mdW5jdGlvbiBiaW5kKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoIWRlc2NyaXB0b3IgfHwgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlICE9PSBjb25zdGFudHMudHlwZU9mRnVuY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPbmx5IG1ldGhvZHMgY2FuIGJlIGRlY29yYXRlZCB3aXRoIEBiaW5kLiA8XCIgKyBwcm9wZXJ0eUtleSArIFwiPiBpcyBub3QgYSBtZXRob2QhXCIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb25maWd1cmFibGU6IGNvbnN0YW50cy5ib29sVHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYm91bmQgPSBkZXNjcmlwdG9yLnZhbHVlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyBDcmVkaXRzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZXlwb3BwL2F1dG9iaW5kLWRlY29yYXRvciBmb3IgbWVtb2l6aW5nIHRoZSByZXN1bHQgb2YgYmluZCBhZ2FpbnN0IGEgc3ltYm9sIG9uIHRoZSBpbnN0YW5jZS5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eUtleSwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBib3VuZCxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGNvbnN0YW50cy5ib29sVHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogY29uc3RhbnRzLmJvb2xUcnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBib3VuZDtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmJpbmQgPSBiaW5kO1xuZXhwb3J0cy5kZWZhdWx0ID0gYmluZDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdXBwb3J0c1ByZXNzUmlwcGxlXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0KCkge1xuICAgIGNvbnN0IHN1cHBvcnRzUHJlc3NSaXBwbGUgPSB0aGlzLnN1cHBvcnRzUHJlc3NSaXBwbGVfKCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXyhzdXBwb3J0c1ByZXNzUmlwcGxlKTtcblxuICAgIGlmIChzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XG4gICAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdXBwb3J0c1ByZXNzUmlwcGxlXygpKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GR19BQ1RJVkFUSU9OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1cHBvcnRzUHJlc3NSaXBwbGUgUGFzc2VkIGZyb20gaW5pdCB0byBzYXZlIGEgcmVkdW5kYW50IGZ1bmN0aW9uIGNhbGxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXyhzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XG4gICAgaWYgKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENSaXBwbGVGb3VuZGF0aW9uPlxuICovXG5jbGFzcyBNRENSaXBwbGUgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKiogQHBhcmFtIHsuLi4/fSBhcmdzICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHt7aXNVbmJvdW5kZWQ6IChib29sZWFufHVuZGVmaW5lZCl9PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlfVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QsIHtpc1VuYm91bmRlZCA9IHVuZGVmaW5lZH0gPSB7fSkge1xuICAgIGNvbnN0IHJpcHBsZSA9IG5ldyBNRENSaXBwbGUocm9vdCk7XG4gICAgLy8gT25seSBvdmVycmlkZSB1bmJvdW5kZWQgYmVoYXZpb3IgaWYgb3B0aW9uIGlzIGV4cGxpY2l0bHkgc3BlY2lmaWVkXG4gICAgaWYgKGlzVW5ib3VuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSAvKiogQHR5cGUge2Jvb2xlYW59ICovIChpc1VuYm91bmRlZCk7XG4gICAgfVxuICAgIHJldHVybiByaXBwbGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshUmlwcGxlQ2FwYWJsZVN1cmZhY2V9IGluc3RhbmNlXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFkYXB0ZXIoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBNQVRDSEVTID0gdXRpbC5nZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB1dGlsLnN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdyksXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gaW5zdGFuY2UudW5ib3VuZGVkLFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiBpbnN0YW5jZS5yb290X1tNQVRDSEVTXSgnOmFjdGl2ZScpLFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IGluc3RhbmNlLmRpc2FibGVkLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiBpbnN0YW5jZS5yb290Xy5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4gaW5zdGFuY2Uucm9vdF8uc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFsdWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gaW5zdGFuY2Uucm9vdF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgdW5ib3VuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0IHVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICB0aGlzLnVuYm91bmRlZF8gPSBCb29sZWFuKHVuYm91bmRlZCk7XG4gICAgdGhpcy5zZXRVbmJvdW5kZWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc3VyZSBDb21waWxlciB0aHJvd3MgYW4gYWNjZXNzIGNvbnRyb2wgZXJyb3Igd2hlbiBkaXJlY3RseSBhY2Nlc3NpbmcgYVxuICAgKiBwcm90ZWN0ZWQgb3IgcHJpdmF0ZSBwcm9wZXJ0eSBpbnNpZGUgYSBnZXR0ZXIvc2V0dGVyLCBsaWtlIHVuYm91bmRlZCBhYm92ZS5cbiAgICogQnkgYWNjZXNzaW5nIHRoZSBwcm90ZWN0ZWQgcHJvcGVydHkgaW5zaWRlIGEgbWV0aG9kLCB3ZSBzb2x2ZSB0aGF0IHByb2JsZW0uXG4gICAqIFRoYXQncyB3aHkgdGhpcyBmdW5jdGlvbiBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRVbmJvdW5kZWRfKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VW5ib3VuZGVkKHRoaXMudW5ib3VuZGVkXyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmFjdGl2YXRlKCk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8ubGF5b3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUZvdW5kYXRpb259XG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIHRoaXMudW5ib3VuZGVkID0gJ21kY1JpcHBsZUlzVW5ib3VuZGVkJyBpbiB0aGlzLnJvb3RfLmRhdGFzZXQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgTWF0ZXJpYWwgRGVzaWduIHNwZWMgZm9yIG1vcmUgZGV0YWlscyBvbiB3aGVuIHRvIHVzZSByaXBwbGVzLlxuICogaHR0cHM6Ly9tYXRlcmlhbC5pby9ndWlkZWxpbmVzL21vdGlvbi9jaG9yZW9ncmFwaHkuaHRtbCNjaG9yZW9ncmFwaHktY3JlYXRpb25cbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgUmlwcGxlQ2FwYWJsZVN1cmZhY2Uge31cblxuLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnJvb3RfO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgYmxlZWRzIG91dCBvZiB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUudW5ib3VuZGVkO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgaXMgYXR0YWNoZWQgdG8gYSBkaXNhYmxlZCBjb21wb25lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5kaXNhYmxlZDtcblxuZXhwb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb24sIFJpcHBsZUNhcGFibGVTdXJmYWNlLCB1dGlsfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuTWF0ZXJpYWxDb21wb25lbnQgPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfcmlwcGxlID0gcmVxdWlyZShcIkBtYXRlcmlhbC9yaXBwbGVcIik7XG5cbnZhciBfYmluZERlY29yYXRvciA9IHJlcXVpcmUoXCJiaW5kLWRlY29yYXRvclwiKTtcblxudmFyIF9wcmVhY3QgPSByZXF1aXJlKFwicHJlYWN0XCIpO1xuXG52YXIgX19kZWNvcmF0ZSA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2RlY29yYXRlIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYyxcbiAgICAgIGQ7XG4gIGlmICgodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YyLmRlZmF1bHQpKFJlZmxlY3QpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7ZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIH1cbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5cbnZhciBkb05vdFJlbW92ZVByb3BzID0gWydkaXNhYmxlZCddO1xuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBldmVyeSBNYXRlcmlhbCBjb21wb25lbnQgaW4gdGhpcyBwYWNrYWdlXG4gKiBOT1RFOiBldmVyeSBjb21wb25lbnQgc2hvdWxkIGFkZCBhIHJlZiBieSB0aGUgbmFtZSBvZiBgY29udHJvbGAgdG8gaXRzIHJvb3QgZG9tIGZvciBhdXRvSW5pdCBQcm9wZXJ0aWVzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIE1hdGVyaWFsQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyB7Q29tcG9uZW50fVxuICovXG5cbnZhciBNYXRlcmlhbENvbXBvbmVudCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShNYXRlcmlhbENvbXBvbmVudCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTWF0ZXJpYWxDb21wb25lbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgTWF0ZXJpYWxDb21wb25lbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKE1hdGVyaWFsQ29tcG9uZW50KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKE1hdGVyaWFsQ29tcG9uZW50LCBbe1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKHByb3BzKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NUZXh0KSB7XG4gICAgICAgIHRoaXMuY2xhc3NUZXh0ID0gdGhpcy5idWlsZENsYXNzTmFtZShwcm9wcyk7XG4gICAgICB9IC8vIEZldGNoIGEgVk5vZGVcblxuXG4gICAgICB2YXIgY29tcG9uZW50UHJvcHMgPSBwcm9wcztcbiAgICAgIHZhciB1c2VyRGVmaW5lZENsYXNzZXMgPSBjb21wb25lbnRQcm9wcy5jbGFzc05hbWUgfHwgY29tcG9uZW50UHJvcHMuY2xhc3MgfHwgJyc7IC8vIFdlIGRlbGV0ZSBjbGFzcyBwcm9wcyBhbmQgYWRkIHRoZW0gbGF0ZXIgaW4gdGhlIGZpbmFsXG4gICAgICAvLyBzdGVwIHNvIGV2ZXJ5IGNvbXBvbmVudCBkb2VzIG5vdCBuZWVkIHRvIGhhbmRsZSB1c2VyIHNwZWNpZmllZCBjbGFzc2VzLlxuXG4gICAgICBpZiAoY29tcG9uZW50UHJvcHMuY2xhc3MpIHtcbiAgICAgICAgZGVsZXRlIGNvbXBvbmVudFByb3BzLmNsYXNzO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9uZW50UHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICAgIGRlbGV0ZSBjb21wb25lbnRQcm9wcy5jbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5tYXRlcmlhbERvbShjb21wb25lbnRQcm9wcyk7XG4gICAgICB2YXIgcHJvcE5hbWUgPSAnYXR0cmlidXRlcyc7XG5cbiAgICAgIGlmICgncHJvcHMnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgcHJvcE5hbWUgPSAncHJvcHMnOyAvLyBAdHMtaWdub3JlXG5cbiAgICAgICAgZWxlbWVudC5wcm9wcyA9IGVsZW1lbnQucHJvcHMgfHwge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXMgfHwge307XG4gICAgICB9IC8vIEB0cy1pZ25vcmVcblxuXG4gICAgICBlbGVtZW50W3Byb3BOYW1lXS5jbGFzc05hbWUgPSBcIlwiLmNvbmNhdCh1c2VyRGVmaW5lZENsYXNzZXMsIFwiIFwiKS5jb25jYXQodGhpcy5nZXRDbGFzc05hbWUoZWxlbWVudCkpLnNwbGl0KCcgJykuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4ICYmIHZhbHVlICE9PSAnJztcbiAgICAgIH0pIC8vIFVuaXF1ZSArIGV4Y2x1ZGUgZW1wdHkgY2xhc3MgbmFtZXNcbiAgICAgIC5qb2luKCcgJyk7IC8vIENsZWFuIHRoaXMgc2hpdCBvZiBwcm94eSBhdHRyaWJ1dGVzXG5cbiAgICAgIHRoaXMubWRjUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAvLyBUT0RPOiBGaXggdGhpcyBiZXR0ZXJcbiAgICAgICAgaWYgKHByb3AgaW4gZG9Ob3RSZW1vdmVQcm9wcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBAdHMtaWdub3JlXG5cblxuICAgICAgICBkZWxldGUgZWxlbWVudFtwcm9wTmFtZV1bcHJvcF07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICAvKiogQXR0YWNoIHRoZSByaXBwbGUgZWZmZWN0ICovXG5cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnJpcHBsZSAmJiB0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5yaXBwbGUgPSBuZXcgX3JpcHBsZS5NRENSaXBwbGUodGhpcy5jb250cm9sKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXMuTURDb21wb25lbnQgJiYgdGhpcy5tZGNOb3RpZnlQcm9wcykge1xuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLm1kY05vdGlmeVByb3BzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHNbcHJvcF0gIT09IG5leHRQcm9wc1twcm9wXSkge1xuICAgICAgICAgICAgICB0aGlzLk1EQ29tcG9uZW50W3Byb3BdID0gbmV4dFByb3BzW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMubWRjUHJvcHNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgX3Byb3AgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBpZiAodGhpcy5wcm9wc1tfcHJvcF0gIT09IG5leHRQcm9wc1tfcHJvcF0pIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NUZXh0ID0gdGhpcy5idWlsZENsYXNzTmFtZShuZXh0UHJvcHMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuICE9IG51bGwpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5yaXBwbGUpIHtcbiAgICAgICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZnRlckNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFmdGVyQ29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5NRENvbXBvbmVudCAmJiB0aGlzLm1kY05vdGlmeVByb3BzKSB7XG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSB0aGlzLm1kY05vdGlmeVByb3BzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuTURDb21wb25lbnRbcHJvcF0gPSB0aGlzLnByb3BzW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIFNoYXJlZCBzZXR0ZXIgZm9yIHRoZSByb290IGVsZW1lbnQgcmVmXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRDb250cm9sUmVmXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbnRyb2xSZWYoY29udHJvbCkge1xuICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICB9XG4gICAgLyoqIEJ1aWxkIHRoZSBjbGFzc05hbWUgYmFzZWQgb24gY29tcG9uZW50IG5hbWVzIGFuZCBtZGMgcHJvcHMgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImJ1aWxkQ2xhc3NOYW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkQ2xhc3NOYW1lKHByb3BzKSB7XG4gICAgICAvLyBDbGFzcyBuYW1lIGJhc2VkIG9uIGNvbXBvbmVudCBuYW1lXG4gICAgICB2YXIgY2xhc3NUZXh0ID0gJ21kYy0nICsgdGhpcy5jb21wb25lbnROYW1lOyAvLyBMb29wIG92ZXIgbWRjUHJvcHMgdG8gdHVybiB0aGVtIGludG8gY2xhc3NOYW1lc1xuXG4gICAgICBmb3IgKHZhciBwcm9wS2V5IGluIHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNbcHJvcEtleV07XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdib29sZWFuJyAmJiBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZGNQcm9wcy5pbmRleE9mKHByb3BLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgICBjbGFzc1RleHQgKz0gXCIgbWRjLVwiLmNvbmNhdCh0aGlzLmNvbXBvbmVudE5hbWUsIFwiLS1cIikuY29uY2F0KHByb3BLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xhc3NUZXh0O1xuICAgIH1cbiAgICAvKiogUmV0dXJucyB0aGUgY2xhc3MgbmFtZSBmb3IgZWxlbWVudCAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2xhc3NOYW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzTmFtZShlbGVtZW50KSB7XG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcE5hbWUgPSAnYXR0cmlidXRlcyc7XG5cbiAgICAgIGlmICgncHJvcHMnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgcHJvcE5hbWUgPSAncHJvcHMnOyAvLyBAdHMtaWdub3JlXG5cbiAgICAgICAgZWxlbWVudC5wcm9wcyA9IGVsZW1lbnQucHJvcHMgfHwge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXMgfHwge307XG4gICAgICB9IC8vIEB0cy1pZ25vcmVcblxuXG4gICAgICB2YXIgYXR0cnMgPSBlbGVtZW50W3Byb3BOYW1lXSA9IGVsZW1lbnRbcHJvcE5hbWVdIHx8IHt9O1xuICAgICAgdmFyIGNsYXNzVGV4dCA9IHRoaXMuY2xhc3NUZXh0O1xuXG4gICAgICBpZiAoYXR0cnMuY2xhc3MpIHtcbiAgICAgICAgY2xhc3NUZXh0ICs9ICcgJyArIGF0dHJzLmNsYXNzO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXR0cnMuY2xhc3NOYW1lICYmIGF0dHJzLmNsYXNzTmFtZSAhPT0gYXR0cnMuY2xhc3MpIHtcbiAgICAgICAgY2xhc3NUZXh0ICs9ICcgJyArIGF0dHJzLmNsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNsYXNzVGV4dDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1hdGVyaWFsQ29tcG9uZW50O1xufShfcHJlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuTWF0ZXJpYWxDb21wb25lbnQgPSBNYXRlcmlhbENvbXBvbmVudDtcblxuX19kZWNvcmF0ZShbX2JpbmREZWNvcmF0b3IuYmluZF0sIE1hdGVyaWFsQ29tcG9uZW50LnByb3RvdHlwZSwgXCJzZXRDb250cm9sUmVmXCIsIG51bGwpO1xuXG52YXIgX2RlZmF1bHQgPSBNYXRlcmlhbENvbXBvbmVudDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWF0ZXJpYWxDb21wb25lbnQuanMubWFwIiwiZnVuY3Rpb24gc3R5bGVJbmplY3QoY3NzLCByZWYpIHtcbiAgaWYgKCByZWYgPT09IHZvaWQgMCApIHJlZiA9IHt9O1xuICB2YXIgaW5zZXJ0QXQgPSByZWYuaW5zZXJ0QXQ7XG5cbiAgaWYgKCFjc3MgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGluc2VydEF0ID09PSAndG9wJykge1xuICAgIGlmIChoZWFkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsZUluamVjdDtcbiJdLCJuYW1lcyI6WyJFTVBUWV9PQkoiLCJFTVBUWV9BUlIiLCJJU19OT05fRElNRU5TSU9OQUwiLCJfYXJyYXlXaXRoSG9sZXMiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJpIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwidW5kZWZpbmVkIiwiX2kiLCJfcyIsIm5leHQiLCJkb25lIiwicHVzaCIsInZhbHVlIiwibGVuZ3RoIiwiZXJyIiwiX25vbkl0ZXJhYmxlUmVzdCIsIlR5cGVFcnJvciIsIl9zbGljZWRUb0FycmF5IiwiYXJyYXlXaXRoSG9sZXMiLCJpdGVyYWJsZVRvQXJyYXlMaW1pdCIsIm5vbkl0ZXJhYmxlUmVzdCIsImN1cnJlbnRJbmRleCIsImN1cnJlbnRDb21wb25lbnQiLCJwcmV2UmFmIiwiYWZ0ZXJQYWludEVmZmVjdHMiLCJvbGRCZWZvcmVSZW5kZXIiLCJvcHRpb25zIiwiX3JlbmRlciIsIm9sZEFmdGVyRGlmZiIsImRpZmZlZCIsIm9sZENvbW1pdCIsIl9jb21taXQiLCJvbGRCZWZvcmVVbm1vdW50IiwidW5tb3VudCIsImdldEhvb2tTdGF0ZSIsImluZGV4IiwiX2hvb2siLCJob29rcyIsIl9faG9va3MiLCJfbGlzdCIsIl9wZW5kaW5nRWZmZWN0cyIsInVzZVN0YXRlIiwiaW5pdGlhbFN0YXRlIiwidXNlUmVkdWNlciIsImludm9rZU9yUmV0dXJuIiwicmVkdWNlciIsImluaXQiLCJob29rU3RhdGUiLCJfY29tcG9uZW50IiwiX3ZhbHVlIiwibmV4dFZhbHVlIiwiYWN0aW9uIiwic2V0U3RhdGUiLCJ1c2VFZmZlY3QiLCJjYWxsYmFjayIsImFyZ3MiLCJzdGF0ZSIsImFyZ3NDaGFuZ2VkIiwiX2FyZ3MiLCJ1c2VSZWYiLCJpbml0aWFsVmFsdWUiLCJ1c2VNZW1vIiwiY3VycmVudCIsIl9jYWxsYmFjayIsImZsdXNoQWZ0ZXJQYWludEVmZmVjdHMiLCJzb21lIiwibiIsImNvbXBvbmVudCIsIl9wYXJlbnREb20iLCJmb3JFYWNoIiwiaW52b2tlQ2xlYW51cCIsImludm9rZUVmZmVjdCIsImhvb2siLCJfY2xlYW51cCIsInJlc3VsdCIsIm9sZEFyZ3MiLCJuZXdBcmdzIiwiYXJnIiwiZiIsInZub2RlIiwiYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJhZiIsImNsZWFyVGltZW91dCIsInRpbWVvdXQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCJjb21taXRRdWV1ZSIsIl9yZW5kZXJDYWxsYmFja3MiLCJmaWx0ZXIiLCJjYiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwibW9kdWxlIiwiX2dldFByb3RvdHlwZU9mIiwibyIsInNldFByb3RvdHlwZU9mIiwiZ2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfc3VwZXJQcm9wQmFzZSIsIm9iamVjdCIsInByb3BlcnR5IiwiaGFzT3duUHJvcGVydHkiLCJfZ2V0IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJSZWZsZWN0IiwiZ2V0IiwiYmFzZSIsInN1cGVyUHJvcEJhc2UiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfdHlwZW9mMiIsImNvbnN0cnVjdG9yIiwiX3R5cGVvZiIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsImFzc2VydFRoaXNJbml0aWFsaXplZCIsIl9zZXRQcm90b3R5cGVPZiIsInAiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJleHBvcnRzIiwiY29uc3RhbnRzIiwidHlwZU9mRnVuY3Rpb24iLCJib29sVHJ1ZSIsImJpbmQiLCJwcm9wZXJ0eUtleSIsImJvdW5kIiwiTURDRm91bmRhdGlvbiIsImNzc0NsYXNzZXMiLCJzdHJpbmdzIiwibnVtYmVycyIsImRlZmF1bHRBZGFwdGVyIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiZGVzdHJveSIsIk1EQ0NvbXBvbmVudCIsImF0dGFjaFRvIiwicm9vdCIsImZvdW5kYXRpb24iLCJyb290XyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJsaXN0ZW4iLCJldnRUeXBlIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bmxpc3RlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbWl0IiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUk9PVCIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwidHlwZSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJhc3NpZ24iLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsInN1cHBvcnRzUHJlc3NSaXBwbGVfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJzdXBwb3J0c1ByZXNzUmlwcGxlIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwibGF5b3V0SW50ZXJuYWxfIiwicmVtb3ZlQ3NzVmFyc18iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwia2V5Q29kZSIsImFjdGl2YXRlIiwiZXZlbnQiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImRlYWN0aXZhdGUiLCJtYXhEaW0iLCJNYXRoIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInNldFVuYm91bmRlZCIsInVuYm91bmRlZCIsIk1EQ1JpcHBsZSIsImRpc2FibGVkIiwidW5ib3VuZGVkXyIsInJpcHBsZSIsImNyZWF0ZUFkYXB0ZXIiLCJNQVRDSEVTIiwidXRpbCIsIkhUTUxFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiY29udGFpbnMiLCJkb2N1bWVudEVsZW1lbnQiLCJ2YXJOYW1lIiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJCb29sZWFuIiwic2V0VW5ib3VuZGVkXyIsImRhdGFzZXQiLCJSaXBwbGVDYXBhYmxlU3VyZmFjZSIsImRvTm90UmVtb3ZlUHJvcHMiLCJlbGVtZW50IiwicHJvcE5hbWUiLCJhdHRycyIsInN0eWxlSW5qZWN0IiwiY3NzIiwicmVmIiwiaW5zZXJ0QXQiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjcmVhdGVUZXh0Tm9kZSJdLCJtYXBwaW5ncyI6IkFBQU8sS0FBQTtLQUFBO0tBQUE7S0FBQTtLQUFBO0tBQUE7S0FBQTtJQUFNQSxDQUFBQSxHQUFZLEVBQWxCO0lBQ01DLENBQUFBLEdBQVksRUFEbEI7SUFFTUMsQ0FBQUEsR0FBcUIsNkRBRjNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQLFNBQVNDLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCO01BQ3hCQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxDQUFKLEVBQXdCLE9BQU9BLEdBQVA7OztBQUcxQixrQkFBYyxHQUFHRCxlQUFqQjs7QUNKQSxTQUFTSSxxQkFBVCxDQUErQkgsR0FBL0IsRUFBb0NJLENBQXBDLEVBQXVDO01BQ2pDLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQkMsTUFBTSxDQUFDUCxHQUFELENBQXpCLElBQWtDTyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQlYsR0FBL0IsTUFBd0Msb0JBQTVFLENB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
