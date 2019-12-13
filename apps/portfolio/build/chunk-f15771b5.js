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

export { createCommonjsModule as a, interopRequireDefault as b, classCallCheck as c, createClass as d, possibleConstructorReturn as e, getPrototypeOf as f, inherits as g, MaterialComponent_1 as h, Icon_1 as i, preact_module as j, unwrapExports as k, get as l, _typeof_1 as m, bindDecorator as n, styleInject as o, h as p, MDCRipple as q, b as r, I as s, y as t, commonjsGlobal as u, v$1 as v, slicedToArray as w, E as x, d$1 as y, p$1 as z, MDCRippleFoundation as A };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstZjE1NzcxYjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QubW9kdWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JpbmQtZGVjb3JhdG9yL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQmFzZS9NYXRlcmlhbENvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1pbmplY3QvZGlzdC9zdHlsZS1pbmplY3QuZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG4sbCx1LHQsaSxvLHIsZj17fSxlPVtdLGM9L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtmdW5jdGlvbiBzKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGEobil7dmFyIGw9bi5wYXJlbnROb2RlO2wmJmwucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gaChuLGwsdSl7dmFyIHQsaSxvLHIsZj1hcmd1bWVudHM7aWYobD1zKHt9LGwpLGFyZ3VtZW50cy5sZW5ndGg+Mylmb3IodT1bdV0sdD0zO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspdS5wdXNoKGZbdF0pO2lmKG51bGwhPXUmJihsLmNoaWxkcmVuPXUpLG51bGwhPW4mJm51bGwhPW4uZGVmYXVsdFByb3BzKWZvcihpIGluIG4uZGVmYXVsdFByb3BzKXZvaWQgMD09PWxbaV0mJihsW2ldPW4uZGVmYXVsdFByb3BzW2ldKTtyZXR1cm4gcj1sLmtleSxudWxsIT0obz1sLnJlZikmJmRlbGV0ZSBsLnJlZixudWxsIT1yJiZkZWxldGUgbC5rZXksdihuLGwscixvKX1mdW5jdGlvbiB2KGwsdSx0LGkpe3ZhciBvPXt0eXBlOmwscHJvcHM6dSxrZXk6dCxyZWY6aSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMH07cmV0dXJuIG4udm5vZGUmJm4udm5vZGUobyksb31mdW5jdGlvbiBwKCl7cmV0dXJue319ZnVuY3Rpb24gZChuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiB5KG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIG0obixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP20obi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/bShuKTpudWxsfWZ1bmN0aW9uIHcobil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiB3KG4pfX1mdW5jdGlvbiBnKGwpeyghbC5fX2QmJihsLl9fZD0hMCkmJjE9PT11LnB1c2gobCl8fGkhPT1uLmRlYm91bmNlUmVuZGVyaW5nKSYmKChpPW4uZGVib3VuY2VSZW5kZXJpbmcpfHx0KShrKX1mdW5jdGlvbiBrKCl7dmFyIG4sbCx0LGksbyxyLGY7Zm9yKHUuc29ydChmdW5jdGlvbihuLGwpe3JldHVybiBsLl9fdi5fX2Itbi5fX3YuX19ifSk7bj11LnBvcCgpOyluLl9fZCYmKHQ9dm9pZCAwLGk9dm9pZCAwLHI9KG89KGw9bikuX192KS5fX2UsKGY9bC5fX1ApJiYodD1bXSxpPVQoZixvLHMoe30sbyksbC5fX24sdm9pZCAwIT09Zi5vd25lclNWR0VsZW1lbnQsbnVsbCx0LG51bGw9PXI/bShvKTpyKSwkKHQsbyksaSE9ciYmdyhvKSkpfWZ1bmN0aW9uIF8obixsLHUsdCxpLG8scixjLHMpe3ZhciBoLHYscCxkLHksdyxnLGs9dSYmdS5fX2t8fGUsXz1rLmxlbmd0aDtpZihjPT1mJiYoYz1udWxsIT1vP29bMF06Xz9tKHUsMCk6bnVsbCksaD0wLGwuX19rPWIobC5fX2ssZnVuY3Rpb24odSl7aWYobnVsbCE9dSl7aWYodS5fXz1sLHUuX19iPWwuX19iKzEsbnVsbD09PShwPWtbaF0pfHxwJiZ1LmtleT09cC5rZXkmJnUudHlwZT09PXAudHlwZSlrW2hdPXZvaWQgMDtlbHNlIGZvcih2PTA7djxfO3YrKyl7aWYoKHA9a1t2XSkmJnUua2V5PT1wLmtleSYmdS50eXBlPT09cC50eXBlKXtrW3ZdPXZvaWQgMDticmVha31wPW51bGx9aWYoZD1UKG4sdSxwPXB8fGYsdCxpLG8scixjLHMpLCh2PXUucmVmKSYmcC5yZWYhPXYmJihnfHwoZz1bXSkscC5yZWYmJmcucHVzaChwLnJlZixudWxsLHUpLGcucHVzaCh2LHUuX19jfHxkLHUpKSxudWxsIT1kKXtpZihudWxsPT13JiYodz1kKSxudWxsIT11Ll9fZClkPXUuX19kLHUuX19kPW51bGw7ZWxzZSBpZihvPT1wfHxkIT1jfHxudWxsPT1kLnBhcmVudE5vZGUpe246aWYobnVsbD09Y3x8Yy5wYXJlbnROb2RlIT09biluLmFwcGVuZENoaWxkKGQpO2Vsc2V7Zm9yKHk9Yyx2PTA7KHk9eS5uZXh0U2libGluZykmJnY8Xzt2Kz0yKWlmKHk9PWQpYnJlYWsgbjtuLmluc2VydEJlZm9yZShkLGMpfVwib3B0aW9uXCI9PWwudHlwZSYmKG4udmFsdWU9XCJcIil9Yz1kLm5leHRTaWJsaW5nLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZSYmKGwuX19kPWQpfX1yZXR1cm4gaCsrLHV9KSxsLl9fZT13LG51bGwhPW8mJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGwudHlwZSlmb3IoaD1vLmxlbmd0aDtoLS07KW51bGwhPW9baF0mJmEob1toXSk7Zm9yKGg9XztoLS07KW51bGwhPWtbaF0mJkEoa1toXSxrW2hdKTtpZihnKWZvcihoPTA7aDxnLmxlbmd0aDtoKyspeihnW2hdLGdbKytoXSxnWysraF0pfWZ1bmN0aW9uIGIobixsLHUpe2lmKG51bGw9PXUmJih1PVtdKSxudWxsPT1ufHxcImJvb2xlYW5cIj09dHlwZW9mIG4pbCYmdS5wdXNoKGwobnVsbCkpO2Vsc2UgaWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIHQ9MDt0PG4ubGVuZ3RoO3QrKyliKG5bdF0sbCx1KTtlbHNlIHUucHVzaChsP2woXCJzdHJpbmdcIj09dHlwZW9mIG58fFwibnVtYmVyXCI9PXR5cGVvZiBuP3YobnVsbCxuLG51bGwsbnVsbCk6bnVsbCE9bi5fX2V8fG51bGwhPW4uX19jP3Yobi50eXBlLG4ucHJvcHMsbi5rZXksbnVsbCk6bik6bik7cmV0dXJuIHV9ZnVuY3Rpb24geChuLGwsdSx0LGkpe3ZhciBvO2ZvcihvIGluIHUpbyBpbiBsfHxQKG4sbyxudWxsLHVbb10sdCk7Zm9yKG8gaW4gbClpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsW29dfHxcInZhbHVlXCI9PT1vfHxcImNoZWNrZWRcIj09PW98fHVbb109PT1sW29dfHxQKG4sbyxsW29dLHVbb10sdCl9ZnVuY3Rpb24gQyhuLGwsdSl7XCItXCI9PT1sWzBdP24uc2V0UHJvcGVydHkobCx1KTpuW2xdPVwibnVtYmVyXCI9PXR5cGVvZiB1JiYhMT09PWMudGVzdChsKT91K1wicHhcIjpudWxsPT11P1wiXCI6dX1mdW5jdGlvbiBQKG4sbCx1LHQsaSl7dmFyIG8scixmLGUsYztpZihpP1wiY2xhc3NOYW1lXCI9PT1sJiYobD1cImNsYXNzXCIpOlwiY2xhc3NcIj09PWwmJihsPVwiY2xhc3NOYW1lXCIpLFwia2V5XCI9PT1sfHxcImNoaWxkcmVuXCI9PT1sKTtlbHNlIGlmKFwic3R5bGVcIj09PWwpaWYobz1uLnN0eWxlLFwic3RyaW5nXCI9PXR5cGVvZiB1KW8uY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihvLmNzc1RleHQ9XCJcIix0PW51bGwpLHQpZm9yKHIgaW4gdCl1JiZyIGluIHV8fEMobyxyLFwiXCIpO2lmKHUpZm9yKGYgaW4gdSl0JiZ1W2ZdPT09dFtmXXx8QyhvLGYsdVtmXSl9ZWxzZVwib1wiPT09bFswXSYmXCJuXCI9PT1sWzFdPyhlPWwhPT0obD1sLnJlcGxhY2UoL0NhcHR1cmUkLyxcIlwiKSksYz1sLnRvTG93ZXJDYXNlKCksbD0oYyBpbiBuP2M6bCkuc2xpY2UoMiksdT8odHx8bi5hZGRFdmVudExpc3RlbmVyKGwsTixlKSwobi5sfHwobi5sPXt9KSlbbF09dSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwsTixlKSk6XCJsaXN0XCIhPT1sJiZcInRhZ05hbWVcIiE9PWwmJlwiZm9ybVwiIT09bCYmIWkmJmwgaW4gbj9uW2xdPW51bGw9PXU/XCJcIjp1OlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUmJlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiE9PWwmJihsIT09KGw9bC5yZXBsYWNlKC9eeGxpbms6Py8sXCJcIikpP251bGw9PXV8fCExPT09dT9uLnJlbW92ZUF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSk6bi5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixsLnRvTG93ZXJDYXNlKCksdSk6bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIE4obCl7dGhpcy5sW2wudHlwZV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIFQobCx1LHQsaSxvLHIsZixlLGMpe3ZhciBhLGgsdixwLG0sdyxnLGsseCxDLFA9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7KGE9bi5fX2IpJiZhKHUpO3RyeXtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFApe2lmKGs9dS5wcm9wcyx4PShhPVAuY29udGV4dFR5cGUpJiZpW2EuX19jXSxDPWE/eD94LnByb3BzLnZhbHVlOmEuX186aSx0Ll9fYz9nPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooXCJwcm90b3R5cGVcImluIFAmJlAucHJvdG90eXBlLnJlbmRlcj91Ll9fYz1oPW5ldyBQKGssQyk6KHUuX19jPWg9bmV3IHkoayxDKSxoLmNvbnN0cnVjdG9yPVAsaC5yZW5kZXI9RCkseCYmeC5zdWIoaCksaC5wcm9wcz1rLGguc3RhdGV8fChoLnN0YXRlPXt9KSxoLmNvbnRleHQ9QyxoLl9fbj1pLHY9aC5fX2Q9ITAsaC5fX2g9W10pLG51bGw9PWguX19zJiYoaC5fX3M9aC5zdGF0ZSksbnVsbCE9UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihoLl9fcz09aC5zdGF0ZSYmKGguX19zPXMoe30saC5fX3MpKSxzKGguX19zLFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGssaC5fX3MpKSkscD1oLnByb3BzLG09aC5zdGF0ZSx2KW51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSxudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYobnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJm51bGw9PWguX19lJiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLEMpLCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcyxDKSl7Zm9yKGgucHJvcHM9ayxoLnN0YXRlPWguX19zLGguX19kPSExLGguX192PXUsdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssaC5fX2gubGVuZ3RoJiZmLnB1c2goaCksYT0wO2E8dS5fX2subGVuZ3RoO2ErKyl1Ll9fa1thXSYmKHUuX19rW2FdLl9fPXUpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcyxDKSxudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHAsbSx3KX0pfWguY29udGV4dD1DLGgucHJvcHM9ayxoLnN0YXRlPWguX19zLChhPW4uX19yKSYmYSh1KSxoLl9fZD0hMSxoLl9fdj11LGguX19QPWwsYT1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx1Ll9faz1iKG51bGwhPWEmJmEudHlwZT09ZCYmbnVsbD09YS5rZXk/YS5wcm9wcy5jaGlsZHJlbjphKSxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9cyhzKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx2fHxudWxsPT1oLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlfHwodz1oLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHAsbSkpLF8obCx1LHQsaSxvLHIsZixlLGMpLGguYmFzZT11Ll9fZSxoLl9faC5sZW5ndGgmJmYucHVzaChoKSxnJiYoaC5fX0U9aC5fXz1udWxsKSxoLl9fZT1udWxsfWVsc2UgdS5fX2U9aih0Ll9fZSx1LHQsaSxvLHIsZixjKTsoYT1uLmRpZmZlZCkmJmEodSl9Y2F0Y2gobCl7bi5fX2UobCx1LHQpfXJldHVybiB1Ll9fZX1mdW5jdGlvbiAkKGwsdSl7bi5fX2MmJm4uX19jKHUsbCksbC5zb21lKGZ1bmN0aW9uKHUpe3RyeXtsPXUuX19oLHUuX19oPVtdLGwuc29tZShmdW5jdGlvbihuKXtuLmNhbGwodSl9KX1jYXRjaChsKXtuLl9fZShsLHUuX192KX19KX1mdW5jdGlvbiBqKG4sbCx1LHQsaSxvLHIsYyl7dmFyIHMsYSxoLHYscCxkPXUucHJvcHMseT1sLnByb3BzO2lmKGk9XCJzdmdcIj09PWwudHlwZXx8aSxudWxsPT1uJiZudWxsIT1vKWZvcihzPTA7czxvLmxlbmd0aDtzKyspaWYobnVsbCE9KGE9b1tzXSkmJihudWxsPT09bC50eXBlPzM9PT1hLm5vZGVUeXBlOmEubG9jYWxOYW1lPT09bC50eXBlKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh5KTtuPWk/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlKSxvPW51bGx9aWYobnVsbD09PWwudHlwZSludWxsIT1vJiYob1tvLmluZGV4T2YobildPW51bGwpLGQhPT15JiYobi5kYXRhPXkpO2Vsc2UgaWYobCE9PXUpe2lmKG51bGwhPW8mJihvPWUuc2xpY2UuY2FsbChuLmNoaWxkTm9kZXMpKSxoPShkPXUucHJvcHN8fGYpLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLHY9eS5kYW5nZXJvdXNseVNldElubmVySFRNTCwhYyl7aWYoZD09PWYpZm9yKGQ9e30scD0wO3A8bi5hdHRyaWJ1dGVzLmxlbmd0aDtwKyspZFtuLmF0dHJpYnV0ZXNbcF0ubmFtZV09bi5hdHRyaWJ1dGVzW3BdLnZhbHVlOyh2fHxoKSYmKHYmJmgmJnYuX19odG1sPT1oLl9faHRtbHx8KG4uaW5uZXJIVE1MPXYmJnYuX19odG1sfHxcIlwiKSl9eChuLHksZCxpLGMpLGwuX19rPWwucHJvcHMuY2hpbGRyZW4sdnx8XyhuLGwsdSx0LFwiZm9yZWlnbk9iamVjdFwiIT09bC50eXBlJiZpLG8scixmLGMpLGN8fChcInZhbHVlXCJpbiB5JiZ2b2lkIDAhPT15LnZhbHVlJiZ5LnZhbHVlIT09bi52YWx1ZSYmKG4udmFsdWU9bnVsbD09eS52YWx1ZT9cIlwiOnkudmFsdWUpLFwiY2hlY2tlZFwiaW4geSYmdm9pZCAwIT09eS5jaGVja2VkJiZ5LmNoZWNrZWQhPT1uLmNoZWNrZWQmJihuLmNoZWNrZWQ9eS5jaGVja2VkKSl9cmV0dXJuIG59ZnVuY3Rpb24geihsLHUsdCl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIGw/bCh1KTpsLmN1cnJlbnQ9dX1jYXRjaChsKXtuLl9fZShsLHQpfX1mdW5jdGlvbiBBKGwsdSx0KXt2YXIgaSxvLHI7aWYobi51bm1vdW50JiZuLnVubW91bnQobCksKGk9bC5yZWYpJiZ6KGksbnVsbCx1KSx0fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGV8fCh0PW51bGwhPShvPWwuX19lKSksbC5fX2U9bC5fX2Q9bnVsbCxudWxsIT0oaT1sLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChsKXtuLl9fZShsLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bC5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZBKGlbcl0sdSx0KTtudWxsIT1vJiZhKG8pfWZ1bmN0aW9uIEQobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gRShsLHUsdCl7dmFyIGkscixjO24uX18mJm4uX18obCx1KSxyPShpPXQ9PT1vKT9udWxsOnQmJnQuX19rfHx1Ll9fayxsPWgoZCxudWxsLFtsXSksYz1bXSxUKHUsKGk/dTp0fHx1KS5fX2s9bCxyfHxmLGYsdm9pZCAwIT09dS5vd25lclNWR0VsZW1lbnQsdCYmIWk/W3RdOnI/bnVsbDplLnNsaWNlLmNhbGwodS5jaGlsZE5vZGVzKSxjLHR8fGYsaSksJChjLGwpfWZ1bmN0aW9uIEgobixsKXtFKG4sbCxvKX1mdW5jdGlvbiBJKG4sbCl7cmV0dXJuIGw9cyhzKHt9LG4ucHJvcHMpLGwpLGFyZ3VtZW50cy5sZW5ndGg+MiYmKGwuY2hpbGRyZW49ZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKSksdihuLnR5cGUsbCxsLmtleXx8bi5rZXksbC5yZWZ8fG4ucmVmKX1mdW5jdGlvbiBMKG4pe3ZhciBsPXt9LHU9e19fYzpcIl9fY0NcIityKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuKXt2YXIgdCxpPXRoaXM7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodD1bXSx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiBsW3UuX19jXT1pLGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGwpe24udmFsdWUhPT1sLnZhbHVlJiZ0LnNvbWUoZnVuY3Rpb24obil7bi5jb250ZXh0PWwudmFsdWUsZyhuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt0LnB1c2gobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dC5zcGxpY2UodC5pbmRleE9mKG4pLDEpLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufX07cmV0dXJuIHUuQ29uc3VtZXIuY29udGV4dFR5cGU9dSx1fW49e19fZTpmdW5jdGlvbihuLGwpe2Zvcih2YXIgdTtsPWwuX187KWlmKCh1PWwuX19jKSYmIXUuX18pdHJ5e2lmKHUuY29uc3RydWN0b3ImJm51bGwhPXUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKXUuc2V0U3RhdGUodS5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpO2Vsc2V7aWYobnVsbD09dS5jb21wb25lbnREaWRDYXRjaCljb250aW51ZTt1LmNvbXBvbmVudERpZENhdGNoKG4pfXJldHVybiBnKHUuX19FPXUpfWNhdGNoKGwpe249bH10aHJvdyBufX0sbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0seS5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PXRoaXMuX19zIT09dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1zKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4odSx0aGlzLnByb3BzKSksbiYmcyh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYodGhpcy5fX2U9ITEsbCYmdGhpcy5fX2gucHVzaChsKSxnKHRoaXMpKX0seS5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLGcodGhpcykpfSx5LnByb3RvdHlwZS5yZW5kZXI9ZCx1PVtdLHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsbz1mLHI9MDtleHBvcnR7RSBhcyByZW5kZXIsSCBhcyBoeWRyYXRlLGggYXMgY3JlYXRlRWxlbWVudCxoLGQgYXMgRnJhZ21lbnQscCBhcyBjcmVhdGVSZWYsbCBhcyBpc1ZhbGlkRWxlbWVudCx5IGFzIENvbXBvbmVudCxJIGFzIGNsb25lRWxlbWVudCxMIGFzIGNyZWF0ZUNvbnRleHQsYiBhcyB0b0NoaWxkQXJyYXksQSBhcyBfdW5tb3VudCxuIGFzIG9wdGlvbnN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0Lm1vZHVsZS5qcy5tYXBcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAoIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCx1LHIsaT1bXSxvPW4uX19yLGY9bi5kaWZmZWQsYz1uLl9fYyxlPW4udW5tb3VudDtmdW5jdGlvbiBhKHQpe24uX19oJiZuLl9faCh1KTt2YXIgcj11Ll9fSHx8KHUuX19IPXt0OltdLHU6W119KTtyZXR1cm4gdD49ci50Lmxlbmd0aCYmci50LnB1c2goe30pLHIudFt0XX1mdW5jdGlvbiB2KG4pe3JldHVybiBtKHgsbil9ZnVuY3Rpb24gbShuLHIsaSl7dmFyIG89YSh0KyspO3JldHVybiBvLl9fY3x8KG8uX19jPXUsby5pPVtpP2kocik6eCh2b2lkIDAsciksZnVuY3Rpb24odCl7dmFyIHU9bihvLmlbMF0sdCk7by5pWzBdIT09dSYmKG8uaVswXT11LG8uX19jLnNldFN0YXRlKHt9KSl9XSksby5pfWZ1bmN0aW9uIHAobixyKXt2YXIgaT1hKHQrKyk7cShpLm8scikmJihpLmk9bixpLm89cix1Ll9fSC51LnB1c2goaSkpfWZ1bmN0aW9uIGwobixyKXt2YXIgaT1hKHQrKyk7cShpLm8scikmJihpLmk9bixpLm89cix1Ll9faC5wdXNoKGkpKX1mdW5jdGlvbiBkKG4pe3JldHVybiB5KGZ1bmN0aW9uKCl7cmV0dXJue2N1cnJlbnQ6bn19LFtdKX1mdW5jdGlvbiBzKG4sdCx1KXtsKGZ1bmN0aW9uKCl7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uKHQoKSk6biYmKG4uY3VycmVudD10KCkpfSxudWxsPT11P3U6dS5jb25jYXQobikpfWZ1bmN0aW9uIHkobix1KXt2YXIgcj1hKHQrKyk7cmV0dXJuIHEoci5vLHUpPyhyLm89dSxyLnY9bixyLmk9bigpKTpyLml9ZnVuY3Rpb24gVChuLHQpe3JldHVybiB5KGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHcobil7dmFyIHI9dS5jb250ZXh0W24uX19jXTtpZighcilyZXR1cm4gbi5fXzt2YXIgaT1hKHQrKyk7cmV0dXJuIG51bGw9PWkuaSYmKGkuaT0hMCxyLnN1Yih1KSksci5wcm9wcy52YWx1ZX1mdW5jdGlvbiBBKHQsdSl7bi51c2VEZWJ1Z1ZhbHVlJiZuLnVzZURlYnVnVmFsdWUodT91KHQpOnQpfWZ1bmN0aW9uIEYoKXtpLnNvbWUoZnVuY3Rpb24obil7bi5fX1AmJihuLl9fSC51LmZvckVhY2goXyksbi5fX0gudS5mb3JFYWNoKGcpLG4uX19ILnU9W10pfSksaT1bXX1mdW5jdGlvbiBfKG4pe24ubSYmbi5tKCl9ZnVuY3Rpb24gZyhuKXt2YXIgdD1uLmkoKTtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYobi5tPXQpfWZ1bmN0aW9uIHEobix0KXtyZXR1cm4hbnx8dC5zb21lKGZ1bmN0aW9uKHQsdSl7cmV0dXJuIHQhPT1uW3VdfSl9ZnVuY3Rpb24geChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fW4uX19yPWZ1bmN0aW9uKG4pe28mJm8obiksdD0wLCh1PW4uX19jKS5fX0gmJih1Ll9fSC51LmZvckVhY2goXyksdS5fX0gudS5mb3JFYWNoKGcpLHUuX19ILnU9W10pfSxuLmRpZmZlZD1mdW5jdGlvbih0KXtmJiZmKHQpO3ZhciB1PXQuX19jO2lmKHUpe3ZhciBvPXUuX19IO28mJm8udS5sZW5ndGgmJigxIT09aS5wdXNoKHUpJiZyPT09bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgocj1uLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fGZ1bmN0aW9uKG4pe3ZhciB0LHU9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQociksY2FuY2VsQW5pbWF0aW9uRnJhbWUodCksc2V0VGltZW91dChuKX0scj1zZXRUaW1lb3V0KHUsMTAwKTtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodSkpfSkoRikpfX0sbi5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7bi5fX2guZm9yRWFjaChfKSxuLl9faD1uLl9faC5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIW4uaXx8ZyhuKX0pfSksYyYmYyhuLHQpfSxuLnVubW91bnQ9ZnVuY3Rpb24obil7ZSYmZShuKTt2YXIgdD1uLl9fYztpZih0KXt2YXIgdT10Ll9fSDt1JiZ1LnQuZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gbi5tJiZuLm0oKX0pfX07ZXhwb3J0e3YgYXMgdXNlU3RhdGUsbSBhcyB1c2VSZWR1Y2VyLHAgYXMgdXNlRWZmZWN0LGwgYXMgdXNlTGF5b3V0RWZmZWN0LGQgYXMgdXNlUmVmLHMgYXMgdXNlSW1wZXJhdGl2ZUhhbmRsZSx5IGFzIHVzZU1lbW8sVCBhcyB1c2VDYWxsYmFjayx3IGFzIHVzZUNvbnRleHQsQSBhcyB1c2VEZWJ1Z1ZhbHVlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2dldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3N1cGVyUHJvcEJhc2U7IiwidmFyIHN1cGVyUHJvcEJhc2UgPSByZXF1aXJlKFwiLi9zdXBlclByb3BCYXNlXCIpO1xuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb25zdGFudHM7XG4oZnVuY3Rpb24gKGNvbnN0YW50cykge1xuICAgIGNvbnN0YW50cy50eXBlT2ZGdW5jdGlvbiA9ICdmdW5jdGlvbic7XG4gICAgY29uc3RhbnRzLmJvb2xUcnVlID0gdHJ1ZTtcbn0pKGNvbnN0YW50cyB8fCAoY29uc3RhbnRzID0ge30pKTtcbmZ1bmN0aW9uIGJpbmQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgIGlmICghZGVzY3JpcHRvciB8fCAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgIT09IGNvbnN0YW50cy50eXBlT2ZGdW5jdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9ubHkgbWV0aG9kcyBjYW4gYmUgZGVjb3JhdGVkIHdpdGggQGJpbmQuIDxcIiArIHByb3BlcnR5S2V5ICsgXCI+IGlzIG5vdCBhIG1ldGhvZCFcIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogY29uc3RhbnRzLmJvb2xUcnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBib3VuZCA9IGRlc2NyaXB0b3IudmFsdWUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIENyZWRpdHMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZHJleXBvcHAvYXV0b2JpbmQtZGVjb3JhdG9yIGZvciBtZW1vaXppbmcgdGhlIHJlc3VsdCBvZiBiaW5kIGFnYWluc3QgYSBzeW1ib2wgb24gdGhlIGluc3RhbmNlLlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5S2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGJvdW5kLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogY29uc3RhbnRzLmJvb2xUcnVlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBjb25zdGFudHMuYm9vbFRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuYmluZCA9IGJpbmQ7XG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN1cHBvcnRzUHJlc3NSaXBwbGVfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3VwcG9ydHNQcmVzc1JpcHBsZSA9IHRoaXMuc3VwcG9ydHNQcmVzc1JpcHBsZV8oKTtcblxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKHN1cHBvcnRzUHJlc3NSaXBwbGUpO1xuXG4gICAgaWYgKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1cHBvcnRzUHJlc3NSaXBwbGVfKCkpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZHX0FDVElWQVRJT04pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GR19ERUFDVElWQVRJT04pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VwcG9ydHNQcmVzc1JpcHBsZSBQYXNzZWQgZnJvbSBpbml0IHRvIHNhdmUgYSByZWR1bmRhbnQgZnVuY3Rpb24gY2FsbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICBpZiAoc3VwcG9ydHNQcmVzc1JpcHBsZSkge1xuICAgICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ1JpcHBsZUZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZSBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge3tpc1VuYm91bmRlZDogKGJvb2xlYW58dW5kZWZpbmVkKX09fSBvcHRpb25zXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGV9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCwge2lzVW5ib3VuZGVkID0gdW5kZWZpbmVkfSA9IHt9KSB7XG4gICAgY29uc3QgcmlwcGxlID0gbmV3IE1EQ1JpcHBsZShyb290KTtcbiAgICAvLyBPbmx5IG92ZXJyaWRlIHVuYm91bmRlZCBiZWhhdmlvciBpZiBvcHRpb24gaXMgZXhwbGljaXRseSBzcGVjaWZpZWRcbiAgICBpZiAoaXNVbmJvdW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmlwcGxlLnVuYm91bmRlZCA9IC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gKGlzVW5ib3VuZGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcHBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFSaXBwbGVDYXBhYmxlU3VyZmFjZX0gaW5zdGFuY2VcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQWRhcHRlcihpbnN0YW5jZSkge1xuICAgIGNvbnN0IE1BVENIRVMgPSB1dGlsLmdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHV0aWwuc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiBpbnN0YW5jZS51bmJvdW5kZWQsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IGluc3RhbmNlLnJvb3RfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gaW5zdGFuY2UuZGlzYWJsZWQsXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IGluc3RhbmNlLnJvb3RfLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiBpbnN0YW5jZS5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YWx1ZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiBpbnN0YW5jZS5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+ICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCB1bmJvdW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXQgdW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIHRoaXMudW5ib3VuZGVkXyA9IEJvb2xlYW4odW5ib3VuZGVkKTtcbiAgICB0aGlzLnNldFVuYm91bmRlZF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiBhY2Nlc3MgY29udHJvbCBlcnJvciB3aGVuIGRpcmVjdGx5IGFjY2Vzc2luZyBhXG4gICAqIHByb3RlY3RlZCBvciBwcml2YXRlIHByb3BlcnR5IGluc2lkZSBhIGdldHRlci9zZXR0ZXIsIGxpa2UgdW5ib3VuZGVkIGFib3ZlLlxuICAgKiBCeSBhY2Nlc3NpbmcgdGhlIHByb3RlY3RlZCBwcm9wZXJ0eSBpbnNpZGUgYSBtZXRob2QsIHdlIHNvbHZlIHRoYXQgcHJvYmxlbS5cbiAgICogVGhhdCdzIHdoeSB0aGlzIGZ1bmN0aW9uIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFVuYm91bmRlZF8oKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVbmJvdW5kZWQodGhpcy51bmJvdW5kZWRfKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5sYXlvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlRm91bmRhdGlvbn1cbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ1JpcHBsZUZvdW5kYXRpb24oTURDUmlwcGxlLmNyZWF0ZUFkYXB0ZXIodGhpcykpO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy51bmJvdW5kZWQgPSAnbWRjUmlwcGxlSXNVbmJvdW5kZWQnIGluIHRoaXMucm9vdF8uZGF0YXNldDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBNYXRlcmlhbCBEZXNpZ24gc3BlYyBmb3IgbW9yZSBkZXRhaWxzIG9uIHdoZW4gdG8gdXNlIHJpcHBsZXMuXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2d1aWRlbGluZXMvbW90aW9uL2Nob3Jlb2dyYXBoeS5odG1sI2Nob3Jlb2dyYXBoeS1jcmVhdGlvblxuICogQHJlY29yZFxuICovXG5jbGFzcyBSaXBwbGVDYXBhYmxlU3VyZmFjZSB7fVxuXG4vKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUucm9vdF87XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBibGVlZHMgb3V0IG9mIHRoZSBib3VuZHMgb2YgdGhlIGVsZW1lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS51bmJvdW5kZWQ7XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBpcyBhdHRhY2hlZCB0byBhIGRpc2FibGVkIGNvbXBvbmVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLmRpc2FibGVkO1xuXG5leHBvcnQge01EQ1JpcHBsZSwgTURDUmlwcGxlRm91bmRhdGlvbiwgUmlwcGxlQ2FwYWJsZVN1cmZhY2UsIHV0aWx9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5NYXRlcmlhbENvbXBvbmVudCA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF9yaXBwbGUgPSByZXF1aXJlKFwiQG1hdGVyaWFsL3JpcHBsZVwiKTtcblxudmFyIF9iaW5kRGVjb3JhdG9yID0gcmVxdWlyZShcImJpbmQtZGVjb3JhdG9yXCIpO1xuXG52YXIgX3ByZWFjdCA9IHJlcXVpcmUoXCJwcmVhY3RcIik7XG5cbnZhciBfX2RlY29yYXRlID0gdm9pZCAwICYmICh2b2lkIDApLl9fZGVjb3JhdGUgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLFxuICAgICAgZDtcbiAgaWYgKCh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjIuZGVmYXVsdCkoUmVmbGVjdCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgfVxuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcblxudmFyIGRvTm90UmVtb3ZlUHJvcHMgPSBbJ2Rpc2FibGVkJ107XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGV2ZXJ5IE1hdGVyaWFsIGNvbXBvbmVudCBpbiB0aGlzIHBhY2thZ2VcbiAqIE5PVEU6IGV2ZXJ5IGNvbXBvbmVudCBzaG91bGQgYWRkIGEgcmVmIGJ5IHRoZSBuYW1lIG9mIGBjb250cm9sYCB0byBpdHMgcm9vdCBkb20gZm9yIGF1dG9Jbml0IFByb3BlcnRpZXNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTWF0ZXJpYWxDb21wb25lbnRcbiAqIEBleHRlbmRzIHtDb21wb25lbnR9XG4gKi9cblxudmFyIE1hdGVyaWFsQ29tcG9uZW50ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKE1hdGVyaWFsQ29tcG9uZW50LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNYXRlcmlhbENvbXBvbmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBNYXRlcmlhbENvbXBvbmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTWF0ZXJpYWxDb21wb25lbnQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTWF0ZXJpYWxDb21wb25lbnQsIFt7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIocHJvcHMpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc1RleHQpIHtcbiAgICAgICAgdGhpcy5jbGFzc1RleHQgPSB0aGlzLmJ1aWxkQ2xhc3NOYW1lKHByb3BzKTtcbiAgICAgIH0gLy8gRmV0Y2ggYSBWTm9kZVxuXG5cbiAgICAgIHZhciBjb21wb25lbnRQcm9wcyA9IHByb3BzO1xuICAgICAgdmFyIHVzZXJEZWZpbmVkQ2xhc3NlcyA9IGNvbXBvbmVudFByb3BzLmNsYXNzTmFtZSB8fCBjb21wb25lbnRQcm9wcy5jbGFzcyB8fCAnJzsgLy8gV2UgZGVsZXRlIGNsYXNzIHByb3BzIGFuZCBhZGQgdGhlbSBsYXRlciBpbiB0aGUgZmluYWxcbiAgICAgIC8vIHN0ZXAgc28gZXZlcnkgY29tcG9uZW50IGRvZXMgbm90IG5lZWQgdG8gaGFuZGxlIHVzZXIgc3BlY2lmaWVkIGNsYXNzZXMuXG5cbiAgICAgIGlmIChjb21wb25lbnRQcm9wcy5jbGFzcykge1xuICAgICAgICBkZWxldGUgY29tcG9uZW50UHJvcHMuY2xhc3M7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnRQcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgICAgZGVsZXRlIGNvbXBvbmVudFByb3BzLmNsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLm1hdGVyaWFsRG9tKGNvbXBvbmVudFByb3BzKTtcbiAgICAgIHZhciBwcm9wTmFtZSA9ICdhdHRyaWJ1dGVzJztcblxuICAgICAgaWYgKCdwcm9wcycgaW4gZWxlbWVudCkge1xuICAgICAgICBwcm9wTmFtZSA9ICdwcm9wcyc7IC8vIEB0cy1pZ25vcmVcblxuICAgICAgICBlbGVtZW50LnByb3BzID0gZWxlbWVudC5wcm9wcyB8fCB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlcyB8fCB7fTtcbiAgICAgIH0gLy8gQHRzLWlnbm9yZVxuXG5cbiAgICAgIGVsZW1lbnRbcHJvcE5hbWVdLmNsYXNzTmFtZSA9IFwiXCIuY29uY2F0KHVzZXJEZWZpbmVkQ2xhc3NlcywgXCIgXCIpLmNvbmNhdCh0aGlzLmdldENsYXNzTmFtZShlbGVtZW50KSkuc3BsaXQoJyAnKS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXggJiYgdmFsdWUgIT09ICcnO1xuICAgICAgfSkgLy8gVW5pcXVlICsgZXhjbHVkZSBlbXB0eSBjbGFzcyBuYW1lc1xuICAgICAgLmpvaW4oJyAnKTsgLy8gQ2xlYW4gdGhpcyBzaGl0IG9mIHByb3h5IGF0dHJpYnV0ZXNcblxuICAgICAgdGhpcy5tZGNQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIC8vIFRPRE86IEZpeCB0aGlzIGJldHRlclxuICAgICAgICBpZiAocHJvcCBpbiBkb05vdFJlbW92ZVByb3BzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIEB0cy1pZ25vcmVcblxuXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50W3Byb3BOYW1lXVtwcm9wXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIC8qKiBBdHRhY2ggdGhlIHJpcHBsZSBlZmZlY3QgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMucmlwcGxlICYmIHRoaXMuY29udHJvbCkge1xuICAgICAgICB0aGlzLnJpcHBsZSA9IG5ldyBfcmlwcGxlLk1EQ1JpcHBsZSh0aGlzLmNvbnRyb2wpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpcy5NRENvbXBvbmVudCAmJiB0aGlzLm1kY05vdGlmeVByb3BzKSB7XG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMubWRjTm90aWZ5UHJvcHNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wc1twcm9wXSAhPT0gbmV4dFByb3BzW3Byb3BdKSB7XG4gICAgICAgICAgICAgIHRoaXMuTURDb21wb25lbnRbcHJvcF0gPSBuZXh0UHJvcHNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5tZGNQcm9wc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBfcHJvcCA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgIGlmICh0aGlzLnByb3BzW19wcm9wXSAhPT0gbmV4dFByb3BzW19wcm9wXSkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc1RleHQgPSB0aGlzLmJ1aWxkQ2xhc3NOYW1lKG5leHRQcm9wcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLnJpcHBsZSkge1xuICAgICAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFmdGVyQ29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWZ0ZXJDb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLk1EQ29tcG9uZW50ICYmIHRoaXMubWRjTm90aWZ5UHJvcHMpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IHRoaXMubWRjTm90aWZ5UHJvcHNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5NRENvbXBvbmVudFtwcm9wXSA9IHRoaXMucHJvcHNbcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjMucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gU2hhcmVkIHNldHRlciBmb3IgdGhlIHJvb3QgZWxlbWVudCByZWZcblxuICB9LCB7XG4gICAga2V5OiBcInNldENvbnRyb2xSZWZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q29udHJvbFJlZihjb250cm9sKSB7XG4gICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgIH1cbiAgICAvKiogQnVpbGQgdGhlIGNsYXNzTmFtZSBiYXNlZCBvbiBjb21wb25lbnQgbmFtZXMgYW5kIG1kYyBwcm9wcyAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiYnVpbGRDbGFzc05hbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRDbGFzc05hbWUocHJvcHMpIHtcbiAgICAgIC8vIENsYXNzIG5hbWUgYmFzZWQgb24gY29tcG9uZW50IG5hbWVcbiAgICAgIHZhciBjbGFzc1RleHQgPSAnbWRjLScgKyB0aGlzLmNvbXBvbmVudE5hbWU7IC8vIExvb3Agb3ZlciBtZGNQcm9wcyB0byB0dXJuIHRoZW0gaW50byBjbGFzc05hbWVzXG5cbiAgICAgIGZvciAodmFyIHByb3BLZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHByb3BLZXkpKSB7XG4gICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1twcm9wS2V5XTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ2Jvb2xlYW4nICYmIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1kY1Byb3BzLmluZGV4T2YocHJvcEtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGNsYXNzVGV4dCArPSBcIiBtZGMtXCIuY29uY2F0KHRoaXMuY29tcG9uZW50TmFtZSwgXCItLVwiKS5jb25jYXQocHJvcEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbGFzc1RleHQ7XG4gICAgfVxuICAgIC8qKiBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lIGZvciBlbGVtZW50ICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRDbGFzc05hbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKGVsZW1lbnQpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9wTmFtZSA9ICdhdHRyaWJ1dGVzJztcblxuICAgICAgaWYgKCdwcm9wcycgaW4gZWxlbWVudCkge1xuICAgICAgICBwcm9wTmFtZSA9ICdwcm9wcyc7IC8vIEB0cy1pZ25vcmVcblxuICAgICAgICBlbGVtZW50LnByb3BzID0gZWxlbWVudC5wcm9wcyB8fCB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlcyB8fCB7fTtcbiAgICAgIH0gLy8gQHRzLWlnbm9yZVxuXG5cbiAgICAgIHZhciBhdHRycyA9IGVsZW1lbnRbcHJvcE5hbWVdID0gZWxlbWVudFtwcm9wTmFtZV0gfHwge307XG4gICAgICB2YXIgY2xhc3NUZXh0ID0gdGhpcy5jbGFzc1RleHQ7XG5cbiAgICAgIGlmIChhdHRycy5jbGFzcykge1xuICAgICAgICBjbGFzc1RleHQgKz0gJyAnICsgYXR0cnMuY2xhc3M7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRycy5jbGFzc05hbWUgJiYgYXR0cnMuY2xhc3NOYW1lICE9PSBhdHRycy5jbGFzcykge1xuICAgICAgICBjbGFzc1RleHQgKz0gJyAnICsgYXR0cnMuY2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xhc3NUZXh0O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWF0ZXJpYWxDb21wb25lbnQ7XG59KF9wcmVhY3QuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5NYXRlcmlhbENvbXBvbmVudCA9IE1hdGVyaWFsQ29tcG9uZW50O1xuXG5fX2RlY29yYXRlKFtfYmluZERlY29yYXRvci5iaW5kXSwgTWF0ZXJpYWxDb21wb25lbnQucHJvdG90eXBlLCBcInNldENvbnRyb2xSZWZcIiwgbnVsbCk7XG5cbnZhciBfZGVmYXVsdCA9IE1hdGVyaWFsQ29tcG9uZW50O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYXRlcmlhbENvbXBvbmVudC5qcy5tYXAiLCJmdW5jdGlvbiBzdHlsZUluamVjdChjc3MsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcblxuICBpZiAoIWNzcyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoaW5zZXJ0QXQgPT09ICd0b3AnKSB7XG4gICAgaWYgKGhlYWQuZmlyc3RDaGlsZCkge1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlSW5qZWN0O1xuIl0sIm5hbWVzIjpbIkVNUFRZX09CSiIsIkVNUFRZX0FSUiIsIklTX05PTl9ESU1FTlNJT05BTCIsIl9hcnJheVdpdGhIb2xlcyIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsImkiLCJTeW1ib2wiLCJpdGVyYXRvciIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIl9zIiwibmV4dCIsImRvbmUiLCJwdXNoIiwidmFsdWUiLCJsZW5ndGgiLCJlcnIiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwiX3NsaWNlZFRvQXJyYXkiLCJhcnJheVdpdGhIb2xlcyIsIml0ZXJhYmxlVG9BcnJheUxpbWl0Iiwibm9uSXRlcmFibGVSZXN0IiwiY3VycmVudEluZGV4IiwiY3VycmVudENvbXBvbmVudCIsInByZXZSYWYiLCJhZnRlclBhaW50RWZmZWN0cyIsIm9sZEJlZm9yZVJlbmRlciIsIm9wdGlvbnMiLCJfcmVuZGVyIiwib2xkQWZ0ZXJEaWZmIiwiZGlmZmVkIiwib2xkQ29tbWl0IiwiX2NvbW1pdCIsIm9sZEJlZm9yZVVubW91bnQiLCJ1bm1vdW50IiwiZ2V0SG9va1N0YXRlIiwiaW5kZXgiLCJfaG9vayIsImhvb2tzIiwiX19ob29rcyIsIl9saXN0IiwiX3BlbmRpbmdFZmZlY3RzIiwidXNlU3RhdGUiLCJpbml0aWFsU3RhdGUiLCJ1c2VSZWR1Y2VyIiwiaW52b2tlT3JSZXR1cm4iLCJyZWR1Y2VyIiwiaW5pdCIsImhvb2tTdGF0ZSIsIl9jb21wb25lbnQiLCJfdmFsdWUiLCJuZXh0VmFsdWUiLCJhY3Rpb24iLCJzZXRTdGF0ZSIsInVzZUVmZmVjdCIsImNhbGxiYWNrIiwiYXJncyIsInN0YXRlIiwiYXJnc0NoYW5nZWQiLCJfYXJncyIsInVzZVJlZiIsImluaXRpYWxWYWx1ZSIsInVzZU1lbW8iLCJjdXJyZW50IiwiX2NhbGxiYWNrIiwiZmx1c2hBZnRlclBhaW50RWZmZWN0cyIsInNvbWUiLCJuIiwiY29tcG9uZW50IiwiX3BhcmVudERvbSIsImZvckVhY2giLCJpbnZva2VDbGVhbnVwIiwiaW52b2tlRWZmZWN0IiwiaG9vayIsIl9jbGVhbnVwIiwicmVzdWx0Iiwib2xkQXJncyIsIm5ld0FyZ3MiLCJhcmciLCJmIiwidm5vZGUiLCJjIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmFmIiwiY2xlYXJUaW1lb3V0IiwidGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsIndpbmRvdyIsImNvbW1pdFF1ZXVlIiwiX3JlbmRlckNhbGxiYWNrcyIsImZpbHRlciIsImNiIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJtb2R1bGUiLCJfZ2V0UHJvdG90eXBlT2YiLCJvIiwic2V0UHJvdG90eXBlT2YiLCJnZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9zdXBlclByb3BCYXNlIiwib2JqZWN0IiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsIl9nZXQiLCJ0YXJnZXQiLCJyZWNlaXZlciIsIlJlZmxlY3QiLCJnZXQiLCJiYXNlIiwic3VwZXJQcm9wQmFzZSIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90eXBlb2YyIiwiY29uc3RydWN0b3IiLCJfdHlwZW9mIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsInNlbGYiLCJSZWZlcmVuY2VFcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX3NldFByb3RvdHlwZU9mIiwicCIsIl9pbmhlcml0cyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsImNyZWF0ZSIsImV4cG9ydHMiLCJjb25zdGFudHMiLCJ0eXBlT2ZGdW5jdGlvbiIsImJvb2xUcnVlIiwiYmluZCIsInByb3BlcnR5S2V5IiwiYm91bmQiLCJNRENGb3VuZGF0aW9uIiwiY3NzQ2xhc3NlcyIsInN0cmluZ3MiLCJudW1iZXJzIiwiZGVmYXVsdEFkYXB0ZXIiLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJkZXN0cm95IiwiTURDQ29tcG9uZW50IiwiYXR0YWNoVG8iLCJyb290IiwiZm91bmRhdGlvbiIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImxpc3RlbiIsImV2dFR5cGUiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInVubGlzdGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVtaXQiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJST09UIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwiRkdfREVBQ1RJVkFUSU9OX01TIiwiVEFQX0RFTEFZX01TIiwic3VwcG9ydHNDc3NWYXJpYWJsZXNfIiwic3VwcG9ydHNQYXNzaXZlXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsImZvcmNlUmVmcmVzaCIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwiaXNTdXBwb3J0ZWQiLCJwYXNzaXZlIiwiZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJ0eXBlIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImFzc2lnbiIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1cyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXIiLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwic3VwcG9ydHNQcmVzc1JpcHBsZV8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsInN1cHBvcnRzUHJlc3NSaXBwbGUiLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJsYXlvdXRJbnRlcm5hbF8iLCJyZW1vdmVDc3NWYXJzXyIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwiY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJrZXlDb2RlIiwiYWN0aXZhdGUiLCJldmVudCIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwic3RhcnRQb2ludCIsImVuZFBvaW50IiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsImFjdGl2YXRpb25IYXNFbmRlZCIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiZGVhY3RpdmF0ZSIsIm1heERpbSIsIk1hdGgiLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwic2V0VW5ib3VuZGVkIiwidW5ib3VuZGVkIiwiTURDUmlwcGxlIiwiZGlzYWJsZWQiLCJ1bmJvdW5kZWRfIiwicmlwcGxlIiwiY3JlYXRlQWRhcHRlciIsIk1BVENIRVMiLCJ1dGlsIiwiSFRNTEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb250YWlucyIsImRvY3VtZW50RWxlbWVudCIsInZhck5hbWUiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIkJvb2xlYW4iLCJzZXRVbmJvdW5kZWRfIiwiZGF0YXNldCIsIlJpcHBsZUNhcGFibGVTdXJmYWNlIiwiZG9Ob3RSZW1vdmVQcm9wcyIsImVsZW1lbnQiLCJwcm9wTmFtZSIsImF0dHJzIiwic3R5bGVJbmplY3QiLCJjc3MiLCJyZWYiLCJpbnNlcnRBdCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsImNyZWF0ZVRleHROb2RlIl0sIm1hcHBpbmdzIjoiQUFBTyxLQUFBO0tBQUE7S0FBQTtLQUFBO0tBQUE7S0FBQTtLQUFBO0lBQU1BLENBQUFBLEdBQVksRUFBbEI7SUFDTUMsQ0FBQUEsR0FBWSxF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
