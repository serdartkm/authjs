
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (React$1, ReactDOM, PropTypes) {
            'use strict';

            var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
            ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
            PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            // shim for using process in browser
            // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout () {
                throw new Error('clearTimeout has not been defined');
            }
            var cachedSetTimeout = defaultSetTimout;
            var cachedClearTimeout = defaultClearTimeout;
            if (typeof global$1.setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            }
            if (typeof global$1.clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            }

            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch(e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch(e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while(len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }
            function nextTick(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            }
            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            var title = 'browser';
            var platform = 'browser';
            var browser = true;
            var env = {};
            var argv = [];
            var version = ''; // empty string to avoid regexp issues
            var versions = {};
            var release = {};
            var config = {};

            function noop() {}

            var on = noop;
            var addListener = noop;
            var once = noop;
            var off = noop;
            var removeListener = noop;
            var removeAllListeners = noop;
            var emit = noop;

            function binding(name) {
                throw new Error('process.binding is not supported');
            }

            function cwd () { return '/' }
            function chdir (dir) {
                throw new Error('process.chdir is not supported');
            }function umask() { return 0; }

            // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
            var performance = global$1.performance || {};
            var performanceNow =
              performance.now        ||
              performance.mozNow     ||
              performance.msNow      ||
              performance.oNow       ||
              performance.webkitNow  ||
              function(){ return (new Date()).getTime() };

            // generate timestamp or delta
            // see http://nodejs.org/api/process.html#process_process_hrtime
            function hrtime(previousTimestamp){
              var clocktime = performanceNow.call(performance)*1e-3;
              var seconds = Math.floor(clocktime);
              var nanoseconds = Math.floor((clocktime%1)*1e9);
              if (previousTimestamp) {
                seconds = seconds - previousTimestamp[0];
                nanoseconds = nanoseconds - previousTimestamp[1];
                if (nanoseconds<0) {
                  seconds--;
                  nanoseconds += 1e9;
                }
              }
              return [seconds,nanoseconds]
            }

            var startTime = new Date();
            function uptime() {
              var currentTime = new Date();
              var dif = currentTime - startTime;
              return dif / 1000;
            }

            var process = {
              nextTick: nextTick,
              title: title,
              browser: browser,
              env: env,
              argv: argv,
              version: version,
              versions: versions,
              on: on,
              addListener: addListener,
              once: once,
              off: off,
              removeListener: removeListener,
              removeAllListeners: removeAllListeners,
              emit: emit,
              binding: binding,
              cwd: cwd,
              chdir: chdir,
              umask: umask,
              hrtime: hrtime,
              platform: platform,
              release: release,
              config: config,
              uptime: uptime
            };

            function _inheritsLoose(subClass, superClass) {
              subClass.prototype = Object.create(superClass.prototype);
              subClass.prototype.constructor = subClass;
              subClass.__proto__ = superClass;
            }

            function _inheritsLoose$1(subClass, superClass) {
              subClass.prototype = Object.create(superClass.prototype);
              subClass.prototype.constructor = subClass;
              subClass.__proto__ = superClass;
            }

            var inheritsLoose = _inheritsLoose$1;

            var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

            function unwrapExports (x) {
            	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
            }

            function createCommonjsModule(fn, module) {
            	return module = { exports: {} }, fn(module, module.exports), module.exports;
            }

            var key = '__global_unique_id__';

            var gud = function() {
              return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
            };

            var isProduction = process.env.NODE_ENV === 'production';
            function warning(condition, message) {
              if (!isProduction) {
                if (condition) {
                  return;
                }

                var text = "Warning: " + message;

                if (typeof console !== 'undefined') {
                  console.warn(text);
                }

                try {
                  throw Error(text);
                } catch (x) {}
              }
            }

            var MAX_SIGNED_31_BIT_INT = 1073741823;

            function objectIs(x, y) {
              if (x === y) {
                return x !== 0 || 1 / x === 1 / y;
              } else {
                return x !== x && y !== y;
              }
            }

            function createEventEmitter(value) {
              var handlers = [];
              return {
                on: function on$$1(handler) {
                  handlers.push(handler);
                },
                off: function off$$1(handler) {
                  handlers = handlers.filter(function (h) {
                    return h !== handler;
                  });
                },
                get: function get() {
                  return value;
                },
                set: function set(newValue, changedBits) {
                  value = newValue;
                  handlers.forEach(function (handler) {
                    return handler(value, changedBits);
                  });
                }
              };
            }

            function onlyChild(children) {
              return Array.isArray(children) ? children[0] : children;
            }

            function createReactContext(defaultValue, calculateChangedBits) {
              var _Provider$childContex, _Consumer$contextType;

              var contextProp = '__create-react-context-' + gud() + '__';

              var Provider =
              /*#__PURE__*/
              function (_Component) {
                inheritsLoose(Provider, _Component);

                function Provider() {
                  var _this;

                  _this = _Component.apply(this, arguments) || this;
                  _this.emitter = createEventEmitter(_this.props.value);
                  return _this;
                }

                var _proto = Provider.prototype;

                _proto.getChildContext = function getChildContext() {
                  var _ref;

                  return _ref = {}, _ref[contextProp] = this.emitter, _ref;
                };

                _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                  if (this.props.value !== nextProps.value) {
                    var oldValue = this.props.value;
                    var newValue = nextProps.value;
                    var changedBits;

                    if (objectIs(oldValue, newValue)) {
                      changedBits = 0;
                    } else {
                      changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

                      if (process.env.NODE_ENV !== 'production') {
                        warning((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: ' + changedBits);
                      }

                      changedBits |= 0;

                      if (changedBits !== 0) {
                        this.emitter.set(nextProps.value, changedBits);
                      }
                    }
                  }
                };

                _proto.render = function render() {
                  return this.props.children;
                };

                return Provider;
              }(React$1.Component);

              Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = PropTypes.object.isRequired, _Provider$childContex);

              var Consumer =
              /*#__PURE__*/
              function (_Component2) {
                inheritsLoose(Consumer, _Component2);

                function Consumer() {
                  var _this2;

                  _this2 = _Component2.apply(this, arguments) || this;
                  _this2.state = {
                    value: _this2.getValue()
                  };

                  _this2.onUpdate = function (newValue, changedBits) {
                    var observedBits = _this2.observedBits | 0;

                    if ((observedBits & changedBits) !== 0) {
                      _this2.setState({
                        value: _this2.getValue()
                      });
                    }
                  };

                  return _this2;
                }

                var _proto2 = Consumer.prototype;

                _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                  var observedBits = nextProps.observedBits;
                  this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
                };

                _proto2.componentDidMount = function componentDidMount() {
                  if (this.context[contextProp]) {
                    this.context[contextProp].on(this.onUpdate);
                  }

                  var observedBits = this.props.observedBits;
                  this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
                };

                _proto2.componentWillUnmount = function componentWillUnmount() {
                  if (this.context[contextProp]) {
                    this.context[contextProp].off(this.onUpdate);
                  }
                };

                _proto2.getValue = function getValue() {
                  if (this.context[contextProp]) {
                    return this.context[contextProp].get();
                  } else {
                    return defaultValue;
                  }
                };

                _proto2.render = function render() {
                  return onlyChild(this.props.children)(this.state.value);
                };

                return Consumer;
              }(React$1.Component);

              Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = PropTypes.object, _Consumer$contextType);
              return {
                Provider: Provider,
                Consumer: Consumer
              };
            }

            var index = React$1__default.createContext || createReactContext;

            function _extends() {
              _extends = Object.assign || function (target) {
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

              return _extends.apply(this, arguments);
            }

            function isAbsolute(pathname) {
              return pathname.charAt(0) === '/';
            }

            // About 1.5x faster than the two-arg version of Array#splice()
            function spliceOne(list, index) {
              for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
                list[i] = list[k];
              }

              list.pop();
            }

            // This implementation is based heavily on node's url.parse
            function resolvePathname(to) {
              var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

              var toParts = to && to.split('/') || [];
              var fromParts = from && from.split('/') || [];

              var isToAbs = to && isAbsolute(to);
              var isFromAbs = from && isAbsolute(from);
              var mustEndAbs = isToAbs || isFromAbs;

              if (to && isAbsolute(to)) {
                // to is absolute
                fromParts = toParts;
              } else if (toParts.length) {
                // to is relative, drop the filename
                fromParts.pop();
                fromParts = fromParts.concat(toParts);
              }

              if (!fromParts.length) return '/';

              var hasTrailingSlash = void 0;
              if (fromParts.length) {
                var last = fromParts[fromParts.length - 1];
                hasTrailingSlash = last === '.' || last === '..' || last === '';
              } else {
                hasTrailingSlash = false;
              }

              var up = 0;
              for (var i = fromParts.length; i >= 0; i--) {
                var part = fromParts[i];

                if (part === '.') {
                  spliceOne(fromParts, i);
                } else if (part === '..') {
                  spliceOne(fromParts, i);
                  up++;
                } else if (up) {
                  spliceOne(fromParts, i);
                  up--;
                }
              }

              if (!mustEndAbs) for (; up--; up) {
                fromParts.unshift('..');
              }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

              var result = fromParts.join('/');

              if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

              return result;
            }

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

            function valueEqual(a, b) {
              if (a === b) return true;

              if (a == null || b == null) return false;

              if (Array.isArray(a)) {
                return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
                  return valueEqual(item, b[index]);
                });
              }

              var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
              var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

              if (aType !== bType) return false;

              if (aType === 'object') {
                var aValue = a.valueOf();
                var bValue = b.valueOf();

                if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

                var aKeys = Object.keys(a);
                var bKeys = Object.keys(b);

                if (aKeys.length !== bKeys.length) return false;

                return aKeys.every(function (key) {
                  return valueEqual(a[key], b[key]);
                });
              }

              return false;
            }

            var isProduction$1 = process.env.NODE_ENV === 'production';
            var prefix = 'Invariant failed';
            function invariant(condition, message) {
              if (condition) {
                return;
              }

              if (isProduction$1) {
                throw new Error(prefix);
              } else {
                throw new Error(prefix + ": " + (message || ''));
              }
            }

            function addLeadingSlash(path) {
              return path.charAt(0) === '/' ? path : '/' + path;
            }
            function stripLeadingSlash(path) {
              return path.charAt(0) === '/' ? path.substr(1) : path;
            }
            function hasBasename(path, prefix) {
              return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
            }
            function stripBasename(path, prefix) {
              return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
            }
            function stripTrailingSlash(path) {
              return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
            }
            function parsePath(path) {
              var pathname = path || '/';
              var search = '';
              var hash = '';
              var hashIndex = pathname.indexOf('#');

              if (hashIndex !== -1) {
                hash = pathname.substr(hashIndex);
                pathname = pathname.substr(0, hashIndex);
              }

              var searchIndex = pathname.indexOf('?');

              if (searchIndex !== -1) {
                search = pathname.substr(searchIndex);
                pathname = pathname.substr(0, searchIndex);
              }

              return {
                pathname: pathname,
                search: search === '?' ? '' : search,
                hash: hash === '#' ? '' : hash
              };
            }
            function createPath(location) {
              var pathname = location.pathname,
                  search = location.search,
                  hash = location.hash;
              var path = pathname || '/';
              if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
              if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
              return path;
            }

            function createLocation(path, state, key, currentLocation) {
              var location;

              if (typeof path === 'string') {
                // Two-arg form: push(path, state)
                location = parsePath(path);
                location.state = state;
              } else {
                // One-arg form: push(location)
                location = _extends({}, path);
                if (location.pathname === undefined) location.pathname = '';

                if (location.search) {
                  if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
                } else {
                  location.search = '';
                }

                if (location.hash) {
                  if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
                } else {
                  location.hash = '';
                }

                if (state !== undefined && location.state === undefined) location.state = state;
              }

              try {
                location.pathname = decodeURI(location.pathname);
              } catch (e) {
                if (e instanceof URIError) {
                  throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
                } else {
                  throw e;
                }
              }

              if (key) location.key = key;

              if (currentLocation) {
                // Resolve incomplete/relative pathname relative to current location.
                if (!location.pathname) {
                  location.pathname = currentLocation.pathname;
                } else if (location.pathname.charAt(0) !== '/') {
                  location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
                }
              } else {
                // When there is no prior location and pathname is empty, set it to /
                if (!location.pathname) {
                  location.pathname = '/';
                }
              }

              return location;
            }
            function locationsAreEqual(a, b) {
              return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
            }

            function createTransitionManager() {
              var prompt = null;

              function setPrompt(nextPrompt) {
                process.env.NODE_ENV !== "production" ? warning(prompt == null, 'A history supports only one prompt at a time') : void 0;
                prompt = nextPrompt;
                return function () {
                  if (prompt === nextPrompt) prompt = null;
                };
              }

              function confirmTransitionTo(location, action, getUserConfirmation, callback) {
                // TODO: If another transition starts while we're still confirming
                // the previous one, we may end up in a weird state. Figure out the
                // best way to handle this.
                if (prompt != null) {
                  var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

                  if (typeof result === 'string') {
                    if (typeof getUserConfirmation === 'function') {
                      getUserConfirmation(result, callback);
                    } else {
                      process.env.NODE_ENV !== "production" ? warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
                      callback(true);
                    }
                  } else {
                    // Return false from a transition hook to cancel the transition.
                    callback(result !== false);
                  }
                } else {
                  callback(true);
                }
              }

              var listeners = [];

              function appendListener(fn) {
                var isActive = true;

                function listener() {
                  if (isActive) fn.apply(void 0, arguments);
                }

                listeners.push(listener);
                return function () {
                  isActive = false;
                  listeners = listeners.filter(function (item) {
                    return item !== listener;
                  });
                };
              }

              function notifyListeners() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                listeners.forEach(function (listener) {
                  return listener.apply(void 0, args);
                });
              }

              return {
                setPrompt: setPrompt,
                confirmTransitionTo: confirmTransitionTo,
                appendListener: appendListener,
                notifyListeners: notifyListeners
              };
            }

            var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
            function getConfirmation(message, callback) {
              callback(window.confirm(message)); // eslint-disable-line no-alert
            }
            /**
             * Returns true if the HTML5 history API is supported. Taken from Modernizr.
             *
             * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
             * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
             * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
             */

            function supportsHistory() {
              var ua = window.navigator.userAgent;
              if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
              return window.history && 'pushState' in window.history;
            }
            /**
             * Returns true if browser fires popstate on hash change.
             * IE10 and IE11 do not.
             */

            function supportsPopStateOnHashChange() {
              return window.navigator.userAgent.indexOf('Trident') === -1;
            }
            /**
             * Returns false if using go(n) with hash history causes a full page reload.
             */

            function supportsGoWithoutReloadUsingHash() {
              return window.navigator.userAgent.indexOf('Firefox') === -1;
            }
            /**
             * Returns true if a given popstate event is an extraneous WebKit event.
             * Accounts for the fact that Chrome on iOS fires real popstate events
             * containing undefined state when pressing the back button.
             */

            function isExtraneousPopstateEvent(event) {
              event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
            }

            var PopStateEvent = 'popstate';
            var HashChangeEvent = 'hashchange';

            function getHistoryState() {
              try {
                return window.history.state || {};
              } catch (e) {
                // IE 11 sometimes throws when accessing window.history.state
                // See https://github.com/ReactTraining/history/pull/289
                return {};
              }
            }
            /**
             * Creates a history object that uses the HTML5 history API including
             * pushState, replaceState, and the popstate event.
             */


            function createBrowserHistory(props) {
              if (props === void 0) {
                props = {};
              }

              !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Browser history needs a DOM') : invariant(false) : void 0;
              var globalHistory = window.history;
              var canUseHistory = supportsHistory();
              var needsHashChangeListener = !supportsPopStateOnHashChange();
              var _props = props,
                  _props$forceRefresh = _props.forceRefresh,
                  forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
                  _props$getUserConfirm = _props.getUserConfirmation,
                  getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
                  _props$keyLength = _props.keyLength,
                  keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
              var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

              function getDOMLocation(historyState) {
                var _ref = historyState || {},
                    key = _ref.key,
                    state = _ref.state;

                var _window$location = window.location,
                    pathname = _window$location.pathname,
                    search = _window$location.search,
                    hash = _window$location.hash;
                var path = pathname + search + hash;
                process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
                if (basename) path = stripBasename(path, basename);
                return createLocation(path, state, key);
              }

              function createKey() {
                return Math.random().toString(36).substr(2, keyLength);
              }

              var transitionManager = createTransitionManager();

              function setState(nextState) {
                _extends(history, nextState);

                history.length = globalHistory.length;
                transitionManager.notifyListeners(history.location, history.action);
              }

              function handlePopState(event) {
                // Ignore extraneous popstate events in WebKit.
                if (isExtraneousPopstateEvent(event)) return;
                handlePop(getDOMLocation(event.state));
              }

              function handleHashChange() {
                handlePop(getDOMLocation(getHistoryState()));
              }

              var forceNextPop = false;

              function handlePop(location) {
                if (forceNextPop) {
                  forceNextPop = false;
                  setState();
                } else {
                  var action = 'POP';
                  transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                    if (ok) {
                      setState({
                        action: action,
                        location: location
                      });
                    } else {
                      revertPop(location);
                    }
                  });
                }
              }

              function revertPop(fromLocation) {
                var toLocation = history.location; // TODO: We could probably make this more reliable by
                // keeping a list of keys we've seen in sessionStorage.
                // Instead, we just default to 0 for keys we don't know.

                var toIndex = allKeys.indexOf(toLocation.key);
                if (toIndex === -1) toIndex = 0;
                var fromIndex = allKeys.indexOf(fromLocation.key);
                if (fromIndex === -1) fromIndex = 0;
                var delta = toIndex - fromIndex;

                if (delta) {
                  forceNextPop = true;
                  go(delta);
                }
              }

              var initialLocation = getDOMLocation(getHistoryState());
              var allKeys = [initialLocation.key]; // Public interface

              function createHref(location) {
                return basename + createPath(location);
              }

              function push(path, state) {
                process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
                var action = 'PUSH';
                var location = createLocation(path, state, createKey(), history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  var href = createHref(location);
                  var key = location.key,
                      state = location.state;

                  if (canUseHistory) {
                    globalHistory.pushState({
                      key: key,
                      state: state
                    }, null, href);

                    if (forceRefresh) {
                      window.location.href = href;
                    } else {
                      var prevIndex = allKeys.indexOf(history.location.key);
                      var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                      nextKeys.push(location.key);
                      allKeys = nextKeys;
                      setState({
                        action: action,
                        location: location
                      });
                    }
                  } else {
                    process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
                    window.location.href = href;
                  }
                });
              }

              function replace(path, state) {
                process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
                var action = 'REPLACE';
                var location = createLocation(path, state, createKey(), history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  var href = createHref(location);
                  var key = location.key,
                      state = location.state;

                  if (canUseHistory) {
                    globalHistory.replaceState({
                      key: key,
                      state: state
                    }, null, href);

                    if (forceRefresh) {
                      window.location.replace(href);
                    } else {
                      var prevIndex = allKeys.indexOf(history.location.key);
                      if (prevIndex !== -1) allKeys[prevIndex] = location.key;
                      setState({
                        action: action,
                        location: location
                      });
                    }
                  } else {
                    process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
                    window.location.replace(href);
                  }
                });
              }

              function go(n) {
                globalHistory.go(n);
              }

              function goBack() {
                go(-1);
              }

              function goForward() {
                go(1);
              }

              var listenerCount = 0;

              function checkDOMListeners(delta) {
                listenerCount += delta;

                if (listenerCount === 1 && delta === 1) {
                  window.addEventListener(PopStateEvent, handlePopState);
                  if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
                } else if (listenerCount === 0) {
                  window.removeEventListener(PopStateEvent, handlePopState);
                  if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
                }
              }

              var isBlocked = false;

              function block(prompt) {
                if (prompt === void 0) {
                  prompt = false;
                }

                var unblock = transitionManager.setPrompt(prompt);

                if (!isBlocked) {
                  checkDOMListeners(1);
                  isBlocked = true;
                }

                return function () {
                  if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                  }

                  return unblock();
                };
              }

              function listen(listener) {
                var unlisten = transitionManager.appendListener(listener);
                checkDOMListeners(1);
                return function () {
                  checkDOMListeners(-1);
                  unlisten();
                };
              }

              var history = {
                length: globalHistory.length,
                action: 'POP',
                location: initialLocation,
                createHref: createHref,
                push: push,
                replace: replace,
                go: go,
                goBack: goBack,
                goForward: goForward,
                block: block,
                listen: listen
              };
              return history;
            }

            var HashChangeEvent$1 = 'hashchange';
            var HashPathCoders = {
              hashbang: {
                encodePath: function encodePath(path) {
                  return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
                },
                decodePath: function decodePath(path) {
                  return path.charAt(0) === '!' ? path.substr(1) : path;
                }
              },
              noslash: {
                encodePath: stripLeadingSlash,
                decodePath: addLeadingSlash
              },
              slash: {
                encodePath: addLeadingSlash,
                decodePath: addLeadingSlash
              }
            };

            function getHashPath() {
              // We can't use window.location.hash here because it's not
              // consistent across browsers - Firefox will pre-decode it!
              var href = window.location.href;
              var hashIndex = href.indexOf('#');
              return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
            }

            function pushHashPath(path) {
              window.location.hash = path;
            }

            function replaceHashPath(path) {
              var hashIndex = window.location.href.indexOf('#');
              window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
            }

            function createHashHistory(props) {
              if (props === void 0) {
                props = {};
              }

              !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Hash history needs a DOM') : invariant(false) : void 0;
              var globalHistory = window.history;
              var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
              var _props = props,
                  _props$getUserConfirm = _props.getUserConfirmation,
                  getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
                  _props$hashType = _props.hashType,
                  hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
              var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
              var _HashPathCoders$hashT = HashPathCoders[hashType],
                  encodePath = _HashPathCoders$hashT.encodePath,
                  decodePath = _HashPathCoders$hashT.decodePath;

              function getDOMLocation() {
                var path = decodePath(getHashPath());
                process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
                if (basename) path = stripBasename(path, basename);
                return createLocation(path);
              }

              var transitionManager = createTransitionManager();

              function setState(nextState) {
                _extends(history, nextState);

                history.length = globalHistory.length;
                transitionManager.notifyListeners(history.location, history.action);
              }

              var forceNextPop = false;
              var ignorePath = null;

              function handleHashChange() {
                var path = getHashPath();
                var encodedPath = encodePath(path);

                if (path !== encodedPath) {
                  // Ensure we always have a properly-encoded hash.
                  replaceHashPath(encodedPath);
                } else {
                  var location = getDOMLocation();
                  var prevLocation = history.location;
                  if (!forceNextPop && locationsAreEqual(prevLocation, location)) return; // A hashchange doesn't always == location change.

                  if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

                  ignorePath = null;
                  handlePop(location);
                }
              }

              function handlePop(location) {
                if (forceNextPop) {
                  forceNextPop = false;
                  setState();
                } else {
                  var action = 'POP';
                  transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                    if (ok) {
                      setState({
                        action: action,
                        location: location
                      });
                    } else {
                      revertPop(location);
                    }
                  });
                }
              }

              function revertPop(fromLocation) {
                var toLocation = history.location; // TODO: We could probably make this more reliable by
                // keeping a list of paths we've seen in sessionStorage.
                // Instead, we just default to 0 for paths we don't know.

                var toIndex = allPaths.lastIndexOf(createPath(toLocation));
                if (toIndex === -1) toIndex = 0;
                var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
                if (fromIndex === -1) fromIndex = 0;
                var delta = toIndex - fromIndex;

                if (delta) {
                  forceNextPop = true;
                  go(delta);
                }
              } // Ensure the hash is encoded properly before doing anything else.


              var path = getHashPath();
              var encodedPath = encodePath(path);
              if (path !== encodedPath) replaceHashPath(encodedPath);
              var initialLocation = getDOMLocation();
              var allPaths = [createPath(initialLocation)]; // Public interface

              function createHref(location) {
                return '#' + encodePath(basename + createPath(location));
              }

              function push(path, state) {
                process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;
                var action = 'PUSH';
                var location = createLocation(path, undefined, undefined, history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  var path = createPath(location);
                  var encodedPath = encodePath(basename + path);
                  var hashChanged = getHashPath() !== encodedPath;

                  if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a PUSH, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(createPath(history.location));
                    var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextPaths.push(path);
                    allPaths = nextPaths;
                    setState({
                      action: action,
                      location: location
                    });
                  } else {
                    process.env.NODE_ENV !== "production" ? warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;
                    setState();
                  }
                });
              }

              function replace(path, state) {
                process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;
                var action = 'REPLACE';
                var location = createLocation(path, undefined, undefined, history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  var path = createPath(location);
                  var encodedPath = encodePath(basename + path);
                  var hashChanged = getHashPath() !== encodedPath;

                  if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                  }

                  var prevIndex = allPaths.indexOf(createPath(history.location));
                  if (prevIndex !== -1) allPaths[prevIndex] = path;
                  setState({
                    action: action,
                    location: location
                  });
                });
              }

              function go(n) {
                process.env.NODE_ENV !== "production" ? warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;
                globalHistory.go(n);
              }

              function goBack() {
                go(-1);
              }

              function goForward() {
                go(1);
              }

              var listenerCount = 0;

              function checkDOMListeners(delta) {
                listenerCount += delta;

                if (listenerCount === 1 && delta === 1) {
                  window.addEventListener(HashChangeEvent$1, handleHashChange);
                } else if (listenerCount === 0) {
                  window.removeEventListener(HashChangeEvent$1, handleHashChange);
                }
              }

              var isBlocked = false;

              function block(prompt) {
                if (prompt === void 0) {
                  prompt = false;
                }

                var unblock = transitionManager.setPrompt(prompt);

                if (!isBlocked) {
                  checkDOMListeners(1);
                  isBlocked = true;
                }

                return function () {
                  if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                  }

                  return unblock();
                };
              }

              function listen(listener) {
                var unlisten = transitionManager.appendListener(listener);
                checkDOMListeners(1);
                return function () {
                  checkDOMListeners(-1);
                  unlisten();
                };
              }

              var history = {
                length: globalHistory.length,
                action: 'POP',
                location: initialLocation,
                createHref: createHref,
                push: push,
                replace: replace,
                go: go,
                goBack: goBack,
                goForward: goForward,
                block: block,
                listen: listen
              };
              return history;
            }

            function clamp(n, lowerBound, upperBound) {
              return Math.min(Math.max(n, lowerBound), upperBound);
            }
            /**
             * Creates a history object that stores locations in memory.
             */


            function createMemoryHistory(props) {
              if (props === void 0) {
                props = {};
              }

              var _props = props,
                  getUserConfirmation = _props.getUserConfirmation,
                  _props$initialEntries = _props.initialEntries,
                  initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
                  _props$initialIndex = _props.initialIndex,
                  initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
                  _props$keyLength = _props.keyLength,
                  keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
              var transitionManager = createTransitionManager();

              function setState(nextState) {
                _extends(history, nextState);

                history.length = history.entries.length;
                transitionManager.notifyListeners(history.location, history.action);
              }

              function createKey() {
                return Math.random().toString(36).substr(2, keyLength);
              }

              var index = clamp(initialIndex, 0, initialEntries.length - 1);
              var entries = initialEntries.map(function (entry) {
                return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
              }); // Public interface

              var createHref = createPath;

              function push(path, state) {
                process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
                var action = 'PUSH';
                var location = createLocation(path, state, createKey(), history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  var prevIndex = history.index;
                  var nextIndex = prevIndex + 1;
                  var nextEntries = history.entries.slice(0);

                  if (nextEntries.length > nextIndex) {
                    nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
                  } else {
                    nextEntries.push(location);
                  }

                  setState({
                    action: action,
                    location: location,
                    index: nextIndex,
                    entries: nextEntries
                  });
                });
              }

              function replace(path, state) {
                process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
                var action = 'REPLACE';
                var location = createLocation(path, state, createKey(), history.location);
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (!ok) return;
                  history.entries[history.index] = location;
                  setState({
                    action: action,
                    location: location
                  });
                });
              }

              function go(n) {
                var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
                var action = 'POP';
                var location = history.entries[nextIndex];
                transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                  if (ok) {
                    setState({
                      action: action,
                      location: location,
                      index: nextIndex
                    });
                  } else {
                    // Mimic the behavior of DOM histories by
                    // causing a render after a cancelled POP.
                    setState();
                  }
                });
              }

              function goBack() {
                go(-1);
              }

              function goForward() {
                go(1);
              }

              function canGo(n) {
                var nextIndex = history.index + n;
                return nextIndex >= 0 && nextIndex < history.entries.length;
              }

              function block(prompt) {
                if (prompt === void 0) {
                  prompt = false;
                }

                return transitionManager.setPrompt(prompt);
              }

              function listen(listener) {
                return transitionManager.appendListener(listener);
              }

              var history = {
                length: entries.length,
                action: 'POP',
                location: entries[index],
                index: index,
                entries: entries,
                createHref: createHref,
                push: push,
                replace: replace,
                go: go,
                goBack: goBack,
                goForward: goForward,
                canGo: canGo,
                block: block,
                listen: listen
              };
              return history;
            }

            var isarray = Array.isArray || function (arr) {
              return Object.prototype.toString.call(arr) == '[object Array]';
            };

            /**
             * Expose `pathToRegexp`.
             */
            var pathToRegexp_1 = pathToRegexp;
            var parse_1 = parse;
            var compile_1 = compile;
            var tokensToFunction_1 = tokensToFunction;
            var tokensToRegExp_1 = tokensToRegExp;

            /**
             * The main path matching regexp utility.
             *
             * @type {RegExp}
             */
            var PATH_REGEXP = new RegExp([
              // Match escaped characters that would otherwise appear in future matches.
              // This allows the user to escape special characters that won't transform.
              '(\\\\.)',
              // Match Express-style parameters and un-named parameters with a prefix
              // and optional suffixes. Matches appear as:
              //
              // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
              // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
              // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
              '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
            ].join('|'), 'g');

            /**
             * Parse a string for the raw tokens.
             *
             * @param  {string}  str
             * @param  {Object=} options
             * @return {!Array}
             */
            function parse (str, options) {
              var tokens = [];
              var key = 0;
              var index = 0;
              var path = '';
              var defaultDelimiter = options && options.delimiter || '/';
              var res;

              while ((res = PATH_REGEXP.exec(str)) != null) {
                var m = res[0];
                var escaped = res[1];
                var offset = res.index;
                path += str.slice(index, offset);
                index = offset + m.length;

                // Ignore already escaped sequences.
                if (escaped) {
                  path += escaped[1];
                  continue
                }

                var next = str[index];
                var prefix = res[2];
                var name = res[3];
                var capture = res[4];
                var group = res[5];
                var modifier = res[6];
                var asterisk = res[7];

                // Push the current path onto the tokens.
                if (path) {
                  tokens.push(path);
                  path = '';
                }

                var partial = prefix != null && next != null && next !== prefix;
                var repeat = modifier === '+' || modifier === '*';
                var optional = modifier === '?' || modifier === '*';
                var delimiter = res[2] || defaultDelimiter;
                var pattern = capture || group;

                tokens.push({
                  name: name || key++,
                  prefix: prefix || '',
                  delimiter: delimiter,
                  optional: optional,
                  repeat: repeat,
                  partial: partial,
                  asterisk: !!asterisk,
                  pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
                });
              }

              // Match any characters still remaining.
              if (index < str.length) {
                path += str.substr(index);
              }

              // If the path exists, push it onto the end.
              if (path) {
                tokens.push(path);
              }

              return tokens
            }

            /**
             * Compile a string to a template function for the path.
             *
             * @param  {string}             str
             * @param  {Object=}            options
             * @return {!function(Object=, Object=)}
             */
            function compile (str, options) {
              return tokensToFunction(parse(str, options))
            }

            /**
             * Prettier encoding of URI path segments.
             *
             * @param  {string}
             * @return {string}
             */
            function encodeURIComponentPretty (str) {
              return encodeURI(str).replace(/[\/?#]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16).toUpperCase()
              })
            }

            /**
             * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
             *
             * @param  {string}
             * @return {string}
             */
            function encodeAsterisk (str) {
              return encodeURI(str).replace(/[?#]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16).toUpperCase()
              })
            }

            /**
             * Expose a method for transforming tokens into the path function.
             */
            function tokensToFunction (tokens) {
              // Compile all the tokens into regexps.
              var matches = new Array(tokens.length);

              // Compile all the patterns before compilation.
              for (var i = 0; i < tokens.length; i++) {
                if (typeof tokens[i] === 'object') {
                  matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
                }
              }

              return function (obj, opts) {
                var path = '';
                var data = obj || {};
                var options = opts || {};
                var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

                for (var i = 0; i < tokens.length; i++) {
                  var token = tokens[i];

                  if (typeof token === 'string') {
                    path += token;

                    continue
                  }

                  var value = data[token.name];
                  var segment;

                  if (value == null) {
                    if (token.optional) {
                      // Prepend partial segment prefixes.
                      if (token.partial) {
                        path += token.prefix;
                      }

                      continue
                    } else {
                      throw new TypeError('Expected "' + token.name + '" to be defined')
                    }
                  }

                  if (isarray(value)) {
                    if (!token.repeat) {
                      throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
                    }

                    if (value.length === 0) {
                      if (token.optional) {
                        continue
                      } else {
                        throw new TypeError('Expected "' + token.name + '" to not be empty')
                      }
                    }

                    for (var j = 0; j < value.length; j++) {
                      segment = encode(value[j]);

                      if (!matches[i].test(segment)) {
                        throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
                      }

                      path += (j === 0 ? token.prefix : token.delimiter) + segment;
                    }

                    continue
                  }

                  segment = token.asterisk ? encodeAsterisk(value) : encode(value);

                  if (!matches[i].test(segment)) {
                    throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
                  }

                  path += token.prefix + segment;
                }

                return path
              }
            }

            /**
             * Escape a regular expression string.
             *
             * @param  {string} str
             * @return {string}
             */
            function escapeString (str) {
              return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
            }

            /**
             * Escape the capturing group by escaping special characters and meaning.
             *
             * @param  {string} group
             * @return {string}
             */
            function escapeGroup (group) {
              return group.replace(/([=!:$\/()])/g, '\\$1')
            }

            /**
             * Attach the keys as a property of the regexp.
             *
             * @param  {!RegExp} re
             * @param  {Array}   keys
             * @return {!RegExp}
             */
            function attachKeys (re, keys) {
              re.keys = keys;
              return re
            }

            /**
             * Get the flags for a regexp from the options.
             *
             * @param  {Object} options
             * @return {string}
             */
            function flags (options) {
              return options.sensitive ? '' : 'i'
            }

            /**
             * Pull out keys from a regexp.
             *
             * @param  {!RegExp} path
             * @param  {!Array}  keys
             * @return {!RegExp}
             */
            function regexpToRegexp (path, keys) {
              // Use a negative lookahead to match only capturing groups.
              var groups = path.source.match(/\((?!\?)/g);

              if (groups) {
                for (var i = 0; i < groups.length; i++) {
                  keys.push({
                    name: i,
                    prefix: null,
                    delimiter: null,
                    optional: false,
                    repeat: false,
                    partial: false,
                    asterisk: false,
                    pattern: null
                  });
                }
              }

              return attachKeys(path, keys)
            }

            /**
             * Transform an array into a regexp.
             *
             * @param  {!Array}  path
             * @param  {Array}   keys
             * @param  {!Object} options
             * @return {!RegExp}
             */
            function arrayToRegexp (path, keys, options) {
              var parts = [];

              for (var i = 0; i < path.length; i++) {
                parts.push(pathToRegexp(path[i], keys, options).source);
              }

              var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

              return attachKeys(regexp, keys)
            }

            /**
             * Create a path regexp from string input.
             *
             * @param  {string}  path
             * @param  {!Array}  keys
             * @param  {!Object} options
             * @return {!RegExp}
             */
            function stringToRegexp (path, keys, options) {
              return tokensToRegExp(parse(path, options), keys, options)
            }

            /**
             * Expose a function for taking tokens and returning a RegExp.
             *
             * @param  {!Array}          tokens
             * @param  {(Array|Object)=} keys
             * @param  {Object=}         options
             * @return {!RegExp}
             */
            function tokensToRegExp (tokens, keys, options) {
              if (!isarray(keys)) {
                options = /** @type {!Object} */ (keys || options);
                keys = [];
              }

              options = options || {};

              var strict = options.strict;
              var end = options.end !== false;
              var route = '';

              // Iterate over the tokens and create our regexp string.
              for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];

                if (typeof token === 'string') {
                  route += escapeString(token);
                } else {
                  var prefix = escapeString(token.prefix);
                  var capture = '(?:' + token.pattern + ')';

                  keys.push(token);

                  if (token.repeat) {
                    capture += '(?:' + prefix + capture + ')*';
                  }

                  if (token.optional) {
                    if (!token.partial) {
                      capture = '(?:' + prefix + '(' + capture + '))?';
                    } else {
                      capture = prefix + '(' + capture + ')?';
                    }
                  } else {
                    capture = prefix + '(' + capture + ')';
                  }

                  route += capture;
                }
              }

              var delimiter = escapeString(options.delimiter || '/');
              var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

              // In non-strict mode we allow a slash at the end of match. If the path to
              // match already ends with a slash, we remove it for consistency. The slash
              // is valid at the end of a path match, not in the middle. This is important
              // in non-ending mode, where "/test/" shouldn't match "/test//route".
              if (!strict) {
                route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
              }

              if (end) {
                route += '$';
              } else {
                // In non-ending mode, we need the capturing groups to match as much as
                // possible by using a positive lookahead to the end or next path segment.
                route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
              }

              return attachKeys(new RegExp('^' + route, flags(options)), keys)
            }

            /**
             * Normalize the given path string, returning a regular expression.
             *
             * An empty array can be passed in for the keys, which will hold the
             * placeholder key descriptions. For example, using `/user/:id`, `keys` will
             * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
             *
             * @param  {(string|RegExp|Array)} path
             * @param  {(Array|Object)=}       keys
             * @param  {Object=}               options
             * @return {!RegExp}
             */
            function pathToRegexp (path, keys, options) {
              if (!isarray(keys)) {
                options = /** @type {!Object} */ (keys || options);
                keys = [];
              }

              options = options || {};

              if (path instanceof RegExp) {
                return regexpToRegexp(path, /** @type {!Array} */ (keys))
              }

              if (isarray(path)) {
                return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
              }

              return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
            }
            pathToRegexp_1.parse = parse_1;
            pathToRegexp_1.compile = compile_1;
            pathToRegexp_1.tokensToFunction = tokensToFunction_1;
            pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

            var reactIs_production_min = createCommonjsModule(function (module, exports) {
            Object.defineProperty(exports,"__esModule",{value:!0});
            var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
            60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
            exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
            exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
            exports.isSuspense=function(a){return t(a)===p};
            });

            unwrapExports(reactIs_production_min);
            var reactIs_production_min_1 = reactIs_production_min.typeOf;
            var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
            var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
            var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
            var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
            var reactIs_production_min_6 = reactIs_production_min.Element;
            var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
            var reactIs_production_min_8 = reactIs_production_min.Fragment;
            var reactIs_production_min_9 = reactIs_production_min.Lazy;
            var reactIs_production_min_10 = reactIs_production_min.Memo;
            var reactIs_production_min_11 = reactIs_production_min.Portal;
            var reactIs_production_min_12 = reactIs_production_min.Profiler;
            var reactIs_production_min_13 = reactIs_production_min.StrictMode;
            var reactIs_production_min_14 = reactIs_production_min.Suspense;
            var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
            var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
            var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
            var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
            var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
            var reactIs_production_min_20 = reactIs_production_min.isElement;
            var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
            var reactIs_production_min_22 = reactIs_production_min.isFragment;
            var reactIs_production_min_23 = reactIs_production_min.isLazy;
            var reactIs_production_min_24 = reactIs_production_min.isMemo;
            var reactIs_production_min_25 = reactIs_production_min.isPortal;
            var reactIs_production_min_26 = reactIs_production_min.isProfiler;
            var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
            var reactIs_production_min_28 = reactIs_production_min.isSuspense;

            var reactIs_development = createCommonjsModule(function (module, exports) {



            if (process.env.NODE_ENV !== "production") {
              (function() {

            Object.defineProperty(exports, '__esModule', { value: true });

            // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
            // nor polyfill, then a plain number is used for performance.
            var hasSymbol = typeof Symbol === 'function' && Symbol.for;

            var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
            var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
            var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
            var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
            var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
            var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
            var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
            var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
            var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
            var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
            var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
            var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
            var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

            function isValidElementType(type) {
              return typeof type === 'string' || typeof type === 'function' ||
              // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
            }

            /**
             * Forked from fbjs/warning:
             * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
             *
             * Only change is we use console.warn instead of console.error,
             * and do nothing when 'console' is not supported.
             * This really simplifies the code.
             * ---
             * Similar to invariant but only logs a warning if the condition is not met.
             * This can be used to log issues in development environments in critical
             * paths. Removing the logging code for production environments will keep the
             * same logic and follow the same code paths.
             */

            var lowPriorityWarning = function () {};

            {
              var printWarning = function (format) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }

                var argIndex = 0;
                var message = 'Warning: ' + format.replace(/%s/g, function () {
                  return args[argIndex++];
                });
                if (typeof console !== 'undefined') {
                  console.warn(message);
                }
                try {
                  // --- Welcome to debugging React ---
                  // This error was thrown as a convenience so that you can use this stack
                  // to find the callsite that caused this warning to fire.
                  throw new Error(message);
                } catch (x) {}
              };

              lowPriorityWarning = function (condition, format) {
                if (format === undefined) {
                  throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
                }
                if (!condition) {
                  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    args[_key2 - 2] = arguments[_key2];
                  }

                  printWarning.apply(undefined, [format].concat(args));
                }
              };
            }

            var lowPriorityWarning$1 = lowPriorityWarning;

            function typeOf(object) {
              if (typeof object === 'object' && object !== null) {
                var $$typeof = object.$$typeof;
                switch ($$typeof) {
                  case REACT_ELEMENT_TYPE:
                    var type = object.type;

                    switch (type) {
                      case REACT_ASYNC_MODE_TYPE:
                      case REACT_CONCURRENT_MODE_TYPE:
                      case REACT_FRAGMENT_TYPE:
                      case REACT_PROFILER_TYPE:
                      case REACT_STRICT_MODE_TYPE:
                      case REACT_SUSPENSE_TYPE:
                        return type;
                      default:
                        var $$typeofType = type && type.$$typeof;

                        switch ($$typeofType) {
                          case REACT_CONTEXT_TYPE:
                          case REACT_FORWARD_REF_TYPE:
                          case REACT_PROVIDER_TYPE:
                            return $$typeofType;
                          default:
                            return $$typeof;
                        }
                    }
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PORTAL_TYPE:
                    return $$typeof;
                }
              }

              return undefined;
            }

            // AsyncMode is deprecated along with isAsyncMode
            var AsyncMode = REACT_ASYNC_MODE_TYPE;
            var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
            var ContextConsumer = REACT_CONTEXT_TYPE;
            var ContextProvider = REACT_PROVIDER_TYPE;
            var Element = REACT_ELEMENT_TYPE;
            var ForwardRef = REACT_FORWARD_REF_TYPE;
            var Fragment = REACT_FRAGMENT_TYPE;
            var Lazy = REACT_LAZY_TYPE;
            var Memo = REACT_MEMO_TYPE;
            var Portal = REACT_PORTAL_TYPE;
            var Profiler = REACT_PROFILER_TYPE;
            var StrictMode = REACT_STRICT_MODE_TYPE;
            var Suspense = REACT_SUSPENSE_TYPE;

            var hasWarnedAboutDeprecatedIsAsyncMode = false;

            // AsyncMode should be deprecated
            function isAsyncMode(object) {
              {
                if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                  hasWarnedAboutDeprecatedIsAsyncMode = true;
                  lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
                }
              }
              return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
            }
            function isConcurrentMode(object) {
              return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
            }
            function isContextConsumer(object) {
              return typeOf(object) === REACT_CONTEXT_TYPE;
            }
            function isContextProvider(object) {
              return typeOf(object) === REACT_PROVIDER_TYPE;
            }
            function isElement(object) {
              return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function isForwardRef(object) {
              return typeOf(object) === REACT_FORWARD_REF_TYPE;
            }
            function isFragment(object) {
              return typeOf(object) === REACT_FRAGMENT_TYPE;
            }
            function isLazy(object) {
              return typeOf(object) === REACT_LAZY_TYPE;
            }
            function isMemo(object) {
              return typeOf(object) === REACT_MEMO_TYPE;
            }
            function isPortal(object) {
              return typeOf(object) === REACT_PORTAL_TYPE;
            }
            function isProfiler(object) {
              return typeOf(object) === REACT_PROFILER_TYPE;
            }
            function isStrictMode(object) {
              return typeOf(object) === REACT_STRICT_MODE_TYPE;
            }
            function isSuspense(object) {
              return typeOf(object) === REACT_SUSPENSE_TYPE;
            }

            exports.typeOf = typeOf;
            exports.AsyncMode = AsyncMode;
            exports.ConcurrentMode = ConcurrentMode;
            exports.ContextConsumer = ContextConsumer;
            exports.ContextProvider = ContextProvider;
            exports.Element = Element;
            exports.ForwardRef = ForwardRef;
            exports.Fragment = Fragment;
            exports.Lazy = Lazy;
            exports.Memo = Memo;
            exports.Portal = Portal;
            exports.Profiler = Profiler;
            exports.StrictMode = StrictMode;
            exports.Suspense = Suspense;
            exports.isValidElementType = isValidElementType;
            exports.isAsyncMode = isAsyncMode;
            exports.isConcurrentMode = isConcurrentMode;
            exports.isContextConsumer = isContextConsumer;
            exports.isContextProvider = isContextProvider;
            exports.isElement = isElement;
            exports.isForwardRef = isForwardRef;
            exports.isFragment = isFragment;
            exports.isLazy = isLazy;
            exports.isMemo = isMemo;
            exports.isPortal = isPortal;
            exports.isProfiler = isProfiler;
            exports.isStrictMode = isStrictMode;
            exports.isSuspense = isSuspense;
              })();
            }
            });

            unwrapExports(reactIs_development);
            var reactIs_development_1 = reactIs_development.typeOf;
            var reactIs_development_2 = reactIs_development.AsyncMode;
            var reactIs_development_3 = reactIs_development.ConcurrentMode;
            var reactIs_development_4 = reactIs_development.ContextConsumer;
            var reactIs_development_5 = reactIs_development.ContextProvider;
            var reactIs_development_6 = reactIs_development.Element;
            var reactIs_development_7 = reactIs_development.ForwardRef;
            var reactIs_development_8 = reactIs_development.Fragment;
            var reactIs_development_9 = reactIs_development.Lazy;
            var reactIs_development_10 = reactIs_development.Memo;
            var reactIs_development_11 = reactIs_development.Portal;
            var reactIs_development_12 = reactIs_development.Profiler;
            var reactIs_development_13 = reactIs_development.StrictMode;
            var reactIs_development_14 = reactIs_development.Suspense;
            var reactIs_development_15 = reactIs_development.isValidElementType;
            var reactIs_development_16 = reactIs_development.isAsyncMode;
            var reactIs_development_17 = reactIs_development.isConcurrentMode;
            var reactIs_development_18 = reactIs_development.isContextConsumer;
            var reactIs_development_19 = reactIs_development.isContextProvider;
            var reactIs_development_20 = reactIs_development.isElement;
            var reactIs_development_21 = reactIs_development.isForwardRef;
            var reactIs_development_22 = reactIs_development.isFragment;
            var reactIs_development_23 = reactIs_development.isLazy;
            var reactIs_development_24 = reactIs_development.isMemo;
            var reactIs_development_25 = reactIs_development.isPortal;
            var reactIs_development_26 = reactIs_development.isProfiler;
            var reactIs_development_27 = reactIs_development.isStrictMode;
            var reactIs_development_28 = reactIs_development.isSuspense;

            var reactIs = createCommonjsModule(function (module) {

            if (process.env.NODE_ENV === 'production') {
              module.exports = reactIs_production_min;
            } else {
              module.exports = reactIs_development;
            }
            });
            var reactIs_1 = reactIs.isValidElementType;
            var reactIs_2 = reactIs.ForwardRef;

            function _objectWithoutPropertiesLoose(source, excluded) {
              if (source == null) return {};
              var target = {};
              var sourceKeys = Object.keys(source);
              var key, i;

              for (i = 0; i < sourceKeys.length; i++) {
                key = sourceKeys[i];
                if (excluded.indexOf(key) >= 0) continue;
                target[key] = source[key];
              }

              return target;
            }

            var FORWARD_REF_STATICS = {
                '$$typeof': true,
                render: true,
                defaultProps: true,
                displayName: true,
                propTypes: true
            };

            var TYPE_STATICS = {};
            TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;

            // TODO: Replace with React.createContext once we can assume React 16+

            var createNamedContext = function createNamedContext(name) {
              var context = index();
              context.displayName = name;
              return context;
            };

            var context =
            /*#__PURE__*/
            createNamedContext("Router");

            /**
             * The public API for putting history on context.
             */

            var Router =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(Router, _React$Component);

              Router.computeRootMatch = function computeRootMatch(pathname) {
                return {
                  path: "/",
                  url: "/",
                  params: {},
                  isExact: pathname === "/"
                };
              };

              function Router(props) {
                var _this;

                _this = _React$Component.call(this, props) || this;
                _this.state = {
                  location: props.history.location
                }; // This is a bit of a hack. We have to start listening for location
                // changes here in the constructor in case there are any <Redirect>s
                // on the initial render. If there are, they will replace/push when
                // they mount and since cDM fires in children before parents, we may
                // get a new location before the <Router> is mounted.

                _this._isMounted = false;
                _this._pendingLocation = null;

                if (!props.staticContext) {
                  _this.unlisten = props.history.listen(function (location) {
                    if (_this._isMounted) {
                      _this.setState({
                        location: location
                      });
                    } else {
                      _this._pendingLocation = location;
                    }
                  });
                }

                return _this;
              }

              var _proto = Router.prototype;

              _proto.componentDidMount = function componentDidMount() {
                this._isMounted = true;

                if (this._pendingLocation) {
                  this.setState({
                    location: this._pendingLocation
                  });
                }
              };

              _proto.componentWillUnmount = function componentWillUnmount() {
                if (this.unlisten) this.unlisten();
              };

              _proto.render = function render() {
                return React$1__default.createElement(context.Provider, {
                  children: this.props.children || null,
                  value: {
                    history: this.props.history,
                    location: this.state.location,
                    match: Router.computeRootMatch(this.state.location.pathname),
                    staticContext: this.props.staticContext
                  }
                });
              };

              return Router;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              Router.propTypes = {
                children: PropTypes.node,
                history: PropTypes.object.isRequired,
                staticContext: PropTypes.object
              };

              Router.prototype.componentDidUpdate = function (prevProps) {
                process.env.NODE_ENV !== "production" ? warning(prevProps.history === this.props.history, "You cannot change <Router history>") : void 0;
              };
            }

            /**
             * The public API for a <Router> that stores location in memory.
             */

            var MemoryRouter =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(MemoryRouter, _React$Component);

              function MemoryRouter() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
                _this.history = createMemoryHistory(_this.props);
                return _this;
              }

              var _proto = MemoryRouter.prototype;

              _proto.render = function render() {
                return React$1__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return MemoryRouter;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              MemoryRouter.propTypes = {
                initialEntries: PropTypes.array,
                initialIndex: PropTypes.number,
                getUserConfirmation: PropTypes.func,
                keyLength: PropTypes.number,
                children: PropTypes.node
              };

              MemoryRouter.prototype.componentDidMount = function () {
                process.env.NODE_ENV !== "production" ? warning(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.") : void 0;
              };
            }

            var Lifecycle =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(Lifecycle, _React$Component);

              function Lifecycle() {
                return _React$Component.apply(this, arguments) || this;
              }

              var _proto = Lifecycle.prototype;

              _proto.componentDidMount = function componentDidMount() {
                if (this.props.onMount) this.props.onMount.call(this, this);
              };

              _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
                if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
              };

              _proto.componentWillUnmount = function componentWillUnmount() {
                if (this.props.onUnmount) this.props.onUnmount.call(this, this);
              };

              _proto.render = function render() {
                return null;
              };

              return Lifecycle;
            }(React$1__default.Component);

            /**
             * The public API for prompting the user before navigating away from a screen.
             */

            function Prompt(_ref) {
              var message = _ref.message,
                  _ref$when = _ref.when,
                  when = _ref$when === void 0 ? true : _ref$when;
              return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Prompt> outside a <Router>") : invariant(false) : void 0;
                if (!when || context$$1.staticContext) return null;
                var method = context$$1.history.block;
                return React$1__default.createElement(Lifecycle, {
                  onMount: function onMount(self) {
                    self.release = method(message);
                  },
                  onUpdate: function onUpdate(self, prevProps) {
                    if (prevProps.message !== message) {
                      self.release();
                      self.release = method(message);
                    }
                  },
                  onUnmount: function onUnmount(self) {
                    self.release();
                  },
                  message: message
                });
              });
            }

            if (process.env.NODE_ENV !== "production") {
              var messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);
              Prompt.propTypes = {
                when: PropTypes.bool,
                message: messageType.isRequired
              };
            }

            var cache = {};
            var cacheLimit = 10000;
            var cacheCount = 0;

            function compilePath(path) {
              if (cache[path]) return cache[path];
              var generator = pathToRegexp_1.compile(path);

              if (cacheCount < cacheLimit) {
                cache[path] = generator;
                cacheCount++;
              }

              return generator;
            }
            /**
             * Public API for generating a URL pathname from a path and parameters.
             */


            function generatePath(path, params) {
              if (path === void 0) {
                path = "/";
              }

              if (params === void 0) {
                params = {};
              }

              return path === "/" ? path : compilePath(path)(params, {
                pretty: true
              });
            }

            /**
             * The public API for navigating programmatically with a component.
             */

            function Redirect(_ref) {
              var computedMatch = _ref.computedMatch,
                  to = _ref.to,
                  _ref$push = _ref.push,
                  push = _ref$push === void 0 ? false : _ref$push;
              return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Redirect> outside a <Router>") : invariant(false) : void 0;
                var history = context$$1.history,
                    staticContext = context$$1.staticContext;
                var method = push ? history.push : history.replace;
                var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
                  pathname: generatePath(to.pathname, computedMatch.params)
                }) : to); // When rendering in a static context,
                // set the new location immediately.

                if (staticContext) {
                  method(location);
                  return null;
                }

                return React$1__default.createElement(Lifecycle, {
                  onMount: function onMount() {
                    method(location);
                  },
                  onUpdate: function onUpdate(self, prevProps) {
                    var prevLocation = createLocation(prevProps.to);

                    if (!locationsAreEqual(prevLocation, _extends({}, location, {
                      key: prevLocation.key
                    }))) {
                      method(location);
                    }
                  },
                  to: to
                });
              });
            }

            if (process.env.NODE_ENV !== "production") {
              Redirect.propTypes = {
                push: PropTypes.bool,
                from: PropTypes.string,
                to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
              };
            }

            var cache$1 = {};
            var cacheLimit$1 = 10000;
            var cacheCount$1 = 0;

            function compilePath$1(path, options) {
              var cacheKey = "" + options.end + options.strict + options.sensitive;
              var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
              if (pathCache[path]) return pathCache[path];
              var keys = [];
              var regexp = pathToRegexp_1(path, keys, options);
              var result = {
                regexp: regexp,
                keys: keys
              };

              if (cacheCount$1 < cacheLimit$1) {
                pathCache[path] = result;
                cacheCount$1++;
              }

              return result;
            }
            /**
             * Public API for matching a URL pathname to a path.
             */


            function matchPath(pathname, options) {
              if (options === void 0) {
                options = {};
              }

              if (typeof options === "string") options = {
                path: options
              };
              var _options = options,
                  path = _options.path,
                  _options$exact = _options.exact,
                  exact = _options$exact === void 0 ? false : _options$exact,
                  _options$strict = _options.strict,
                  strict = _options$strict === void 0 ? false : _options$strict,
                  _options$sensitive = _options.sensitive,
                  sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
              var paths = [].concat(path);
              return paths.reduce(function (matched, path) {
                if (!path) return null;
                if (matched) return matched;

                var _compilePath = compilePath$1(path, {
                  end: exact,
                  strict: strict,
                  sensitive: sensitive
                }),
                    regexp = _compilePath.regexp,
                    keys = _compilePath.keys;

                var match = regexp.exec(pathname);
                if (!match) return null;
                var url = match[0],
                    values = match.slice(1);
                var isExact = pathname === url;
                if (exact && !isExact) return null;
                return {
                  path: path,
                  // the path used to match
                  url: path === "/" && url === "" ? "/" : url,
                  // the matched portion of the URL
                  isExact: isExact,
                  // whether or not we matched exactly
                  params: keys.reduce(function (memo, key, index$$1) {
                    memo[key.name] = values[index$$1];
                    return memo;
                  }, {})
                };
              }, null);
            }

            function isEmptyChildren(children) {
              return React$1__default.Children.count(children) === 0;
            }
            /**
             * The public API for matching a single path and rendering.
             */


            var Route =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(Route, _React$Component);

              function Route() {
                return _React$Component.apply(this, arguments) || this;
              }

              var _proto = Route.prototype;

              _proto.render = function render() {
                var _this = this;

                return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                  !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Route> outside a <Router>") : invariant(false) : void 0;
                  var location = _this.props.location || context$$1.location;
                  var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
                  : _this.props.path ? matchPath(location.pathname, _this.props) : context$$1.match;

                  var props = _extends({}, context$$1, {
                    location: location,
                    match: match
                  });

                  var _this$props = _this.props,
                      children = _this$props.children,
                      component = _this$props.component,
                      render = _this$props.render; // Preact uses an empty array as children by
                  // default, so use null if that's the case.

                  if (Array.isArray(children) && children.length === 0) {
                    children = null;
                  }

                  if (typeof children === "function") {
                    children = children(props);

                    if (children === undefined) {
                      if (process.env.NODE_ENV !== "production") {
                        var path = _this.props.path;
                        process.env.NODE_ENV !== "production" ? warning(false, "You returned `undefined` from the `children` function of " + ("<Route" + (path ? " path=\"" + path + "\"" : "") + ">, but you ") + "should have returned a React element or `null`") : void 0;
                      }

                      children = null;
                    }
                  }

                  return React$1__default.createElement(context.Provider, {
                    value: props
                  }, children && !isEmptyChildren(children) ? children : props.match ? component ? React$1__default.createElement(component, props) : render ? render(props) : null : null);
                });
              };

              return Route;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              Route.propTypes = {
                children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
                component: function component(props, propName) {
                  if (props[propName] && !reactIs_1(props[propName])) {
                    return new Error("Invalid prop 'component' supplied to 'Route': the prop is not a valid React component");
                  }
                },
                exact: PropTypes.bool,
                location: PropTypes.object,
                path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
                render: PropTypes.func,
                sensitive: PropTypes.bool,
                strict: PropTypes.bool
              };

              Route.prototype.componentDidMount = function () {
                process.env.NODE_ENV !== "production" ? warning(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.component), "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored") : void 0;
                process.env.NODE_ENV !== "production" ? warning(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.render), "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored") : void 0;
                process.env.NODE_ENV !== "production" ? warning(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored") : void 0;
              };

              Route.prototype.componentDidUpdate = function (prevProps) {
                process.env.NODE_ENV !== "production" ? warning(!(this.props.location && !prevProps.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : void 0;
                process.env.NODE_ENV !== "production" ? warning(!(!this.props.location && prevProps.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : void 0;
              };
            }

            function addLeadingSlash$1(path) {
              return path.charAt(0) === "/" ? path : "/" + path;
            }

            function addBasename(basename, location) {
              if (!basename) return location;
              return _extends({}, location, {
                pathname: addLeadingSlash$1(basename) + location.pathname
              });
            }

            function stripBasename$1(basename, location) {
              if (!basename) return location;
              var base = addLeadingSlash$1(basename);
              if (location.pathname.indexOf(base) !== 0) return location;
              return _extends({}, location, {
                pathname: location.pathname.substr(base.length)
              });
            }

            function createURL(location) {
              return typeof location === "string" ? location : createPath(location);
            }

            function staticHandler(methodName) {
              return function () {
                process.env.NODE_ENV !== "production" ? invariant(false, "You cannot %s with <StaticRouter>", methodName) : invariant(false);
              };
            }

            function noop$1() {}
            /**
             * The public top-level API for a "static" <Router>, so-called because it
             * can't actually change the current location. Instead, it just records
             * location changes in a context object. Useful mainly in testing and
             * server-rendering scenarios.
             */


            var StaticRouter =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(StaticRouter, _React$Component);

              function StaticRouter() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

                _this.handlePush = function (location) {
                  return _this.navigateTo(location, "PUSH");
                };

                _this.handleReplace = function (location) {
                  return _this.navigateTo(location, "REPLACE");
                };

                _this.handleListen = function () {
                  return noop$1;
                };

                _this.handleBlock = function () {
                  return noop$1;
                };

                return _this;
              }

              var _proto = StaticRouter.prototype;

              _proto.navigateTo = function navigateTo(location, action) {
                var _this$props = this.props,
                    _this$props$basename = _this$props.basename,
                    basename = _this$props$basename === void 0 ? "" : _this$props$basename,
                    _this$props$context = _this$props.context,
                    context = _this$props$context === void 0 ? {} : _this$props$context;
                context.action = action;
                context.location = addBasename(basename, createLocation(location));
                context.url = createURL(context.location);
              };

              _proto.render = function render() {
                var _this$props2 = this.props,
                    _this$props2$basename = _this$props2.basename,
                    basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
                    _this$props2$context = _this$props2.context,
                    context = _this$props2$context === void 0 ? {} : _this$props2$context,
                    _this$props2$location = _this$props2.location,
                    location = _this$props2$location === void 0 ? "/" : _this$props2$location,
                    rest = _objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);

                var history = {
                  createHref: function createHref(path) {
                    return addLeadingSlash$1(basename + createURL(path));
                  },
                  action: "POP",
                  location: stripBasename$1(basename, createLocation(location)),
                  push: this.handlePush,
                  replace: this.handleReplace,
                  go: staticHandler("go"),
                  goBack: staticHandler("goBack"),
                  goForward: staticHandler("goForward"),
                  listen: this.handleListen,
                  block: this.handleBlock
                };
                return React$1__default.createElement(Router, _extends({}, rest, {
                  history: history,
                  staticContext: context
                }));
              };

              return StaticRouter;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              StaticRouter.propTypes = {
                basename: PropTypes.string,
                context: PropTypes.object,
                location: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
              };

              StaticRouter.prototype.componentDidMount = function () {
                process.env.NODE_ENV !== "production" ? warning(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.") : void 0;
              };
            }

            /**
             * The public API for rendering the first <Route> that matches.
             */

            var Switch =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(Switch, _React$Component);

              function Switch() {
                return _React$Component.apply(this, arguments) || this;
              }

              var _proto = Switch.prototype;

              _proto.render = function render() {
                var _this = this;

                return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                  !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Switch> outside a <Router>") : invariant(false) : void 0;
                  var location = _this.props.location || context$$1.location;
                  var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
                  // here because toArray adds keys to all child elements and we do not want
                  // to trigger an unmount/remount for two <Route>s that render the same
                  // component at different URLs.

                  React$1__default.Children.forEach(_this.props.children, function (child) {
                    if (match == null && React$1__default.isValidElement(child)) {
                      element = child;
                      var path = child.props.path || child.props.from;
                      match = path ? matchPath(location.pathname, _extends({}, child.props, {
                        path: path
                      })) : context$$1.match;
                    }
                  });
                  return match ? React$1__default.cloneElement(element, {
                    location: location,
                    computedMatch: match
                  }) : null;
                });
              };

              return Switch;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              Switch.propTypes = {
                children: PropTypes.node,
                location: PropTypes.object
              };

              Switch.prototype.componentDidUpdate = function (prevProps) {
                process.env.NODE_ENV !== "production" ? warning(!(this.props.location && !prevProps.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : void 0;
                process.env.NODE_ENV !== "production" ? warning(!(!this.props.location && prevProps.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : void 0;
              };
            }

            if (process.env.NODE_ENV !== "production") {
              if (typeof window !== "undefined") {
                var global$2 = window;
                var key$1 = "__react_router_build__";
                var buildNames = {
                  cjs: "CommonJS",
                  esm: "ES modules",
                  umd: "UMD"
                };

                if (global$2[key$1] && global$2[key$1] !== "esm") {
                  var initialBuildName = buildNames[global$2[key$1]];
                  var secondaryBuildName = buildNames["esm"]; // TODO: Add link to article that explains in detail how to avoid
                  // loading 2 different builds.

                  throw new Error("You are loading the " + secondaryBuildName + " build of React Router " + ("on a page that is already running the " + initialBuildName + " ") + "build, so things won't work right.");
                }

                global$2[key$1] = "esm";
              }
            }

            /**
             * The public API for a <Router> that uses HTML5 history.
             */

            var BrowserRouter =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(BrowserRouter, _React$Component);

              function BrowserRouter() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
                _this.history = createBrowserHistory(_this.props);
                return _this;
              }

              var _proto = BrowserRouter.prototype;

              _proto.render = function render() {
                return React$1__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return BrowserRouter;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              BrowserRouter.propTypes = {
                basename: PropTypes.string,
                children: PropTypes.node,
                forceRefresh: PropTypes.bool,
                getUserConfirmation: PropTypes.func,
                keyLength: PropTypes.number
              };

              BrowserRouter.prototype.componentDidMount = function () {
                process.env.NODE_ENV !== "production" ? warning(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.") : void 0;
              };
            }

            /**
             * The public API for a <Router> that uses window.location.hash.
             */

            var HashRouter =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(HashRouter, _React$Component);

              function HashRouter() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
                _this.history = createHashHistory(_this.props);
                return _this;
              }

              var _proto = HashRouter.prototype;

              _proto.render = function render() {
                return React$1__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return HashRouter;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              HashRouter.propTypes = {
                basename: PropTypes.string,
                children: PropTypes.node,
                getUserConfirmation: PropTypes.func,
                hashType: PropTypes.oneOf(["hashbang", "noslash", "slash"])
              };

              HashRouter.prototype.componentDidMount = function () {
                process.env.NODE_ENV !== "production" ? warning(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.") : void 0;
              };
            }

            function isModifiedEvent(event) {
              return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
            }
            /**
             * The public API for rendering a history-aware <a>.
             */


            var Link =
            /*#__PURE__*/
            function (_React$Component) {
              _inheritsLoose(Link, _React$Component);

              function Link() {
                return _React$Component.apply(this, arguments) || this;
              }

              var _proto = Link.prototype;

              _proto.handleClick = function handleClick(event, history) {
                try {
                  if (this.props.onClick) this.props.onClick(event);
                } catch (ex) {
                  event.preventDefault();
                  throw ex;
                }

                if (!event.defaultPrevented && // onClick prevented default
                event.button === 0 && ( // ignore everything but left clicks
                !this.props.target || this.props.target === "_self") && // let browser handle "target=_blank" etc.
                !isModifiedEvent(event) // ignore clicks with modifier keys
                ) {
                    event.preventDefault();
                    var method = this.props.replace ? history.replace : history.push;
                    method(this.props.to);
                  }
              };

              _proto.render = function render() {
                var _this = this;

                var _this$props = this.props,
                    innerRef = _this$props.innerRef,
                    replace = _this$props.replace,
                    to = _this$props.to,
                    rest = _objectWithoutPropertiesLoose(_this$props, ["innerRef", "replace", "to"]); // eslint-disable-line no-unused-vars


                return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                  !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Link> outside a <Router>") : invariant(false) : void 0;
                  var location = typeof to === "string" ? createLocation(to, null, null, context$$1.location) : to;
                  var href = location ? context$$1.history.createHref(location) : "";
                  return React$1__default.createElement("a", _extends({}, rest, {
                    onClick: function onClick(event) {
                      return _this.handleClick(event, context$$1.history);
                    },
                    href: href,
                    ref: innerRef
                  }));
                });
              };

              return Link;
            }(React$1__default.Component);

            if (process.env.NODE_ENV !== "production") {
              var toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
              var innerRefType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({
                current: PropTypes.any
              })]);
              Link.propTypes = {
                innerRef: innerRefType,
                onClick: PropTypes.func,
                replace: PropTypes.bool,
                target: PropTypes.string,
                to: toType.isRequired
              };
            }

            function joinClassnames() {
              for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
                classnames[_key] = arguments[_key];
              }

              return classnames.filter(function (i) {
                return i;
              }).join(" ");
            }
            /**
             * A <Link> wrapper that knows if it's "active" or not.
             */


            function NavLink(_ref) {
              var _ref$ariaCurrent = _ref["aria-current"],
                  ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
                  _ref$activeClassName = _ref.activeClassName,
                  activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
                  activeStyle = _ref.activeStyle,
                  classNameProp = _ref.className,
                  exact = _ref.exact,
                  isActiveProp = _ref.isActive,
                  locationProp = _ref.location,
                  strict = _ref.strict,
                  styleProp = _ref.style,
                  to = _ref.to,
                  rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to"]);

              var path = typeof to === "object" ? to.pathname : to; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

              var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
              return React$1__default.createElement(context.Consumer, null, function (context$$1) {
                !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <NavLink> outside a <Router>") : invariant(false) : void 0;
                var pathToMatch = locationProp ? locationProp.pathname : context$$1.location.pathname;
                var match = escapedPath ? matchPath(pathToMatch, {
                  path: escapedPath,
                  exact: exact,
                  strict: strict
                }) : null;
                var isActive = !!(isActiveProp ? isActiveProp(match, context$$1.location) : match);
                var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
                var style = isActive ? _extends({}, styleProp, activeStyle) : styleProp;
                return React$1__default.createElement(Link, _extends({
                  "aria-current": isActive && ariaCurrent || null,
                  className: className,
                  style: style,
                  to: to
                }, rest));
              });
            }

            if (process.env.NODE_ENV !== "production") {
              var ariaCurrentType = PropTypes.oneOf(["page", "step", "location", "date", "time", "true"]);
              NavLink.propTypes = _extends({}, Link.propTypes, {
                "aria-current": ariaCurrentType,
                activeClassName: PropTypes.string,
                activeStyle: PropTypes.object,
                className: PropTypes.string,
                exact: PropTypes.bool,
                isActive: PropTypes.func,
                location: PropTypes.object,
                strict: PropTypes.bool,
                style: PropTypes.object
              });
            }

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

            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, {
                  value: value,
                  enumerable: true,
                  configurable: true,
                  writable: true
                });
              } else {
                obj[key] = value;
              }

              return obj;
            }

            function ownKeys(object, enumerableOnly) {
              var keys = Object.keys(object);

              if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                if (enumerableOnly) symbols = symbols.filter(function (sym) {
                  return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
                keys.push.apply(keys, symbols);
              }

              return keys;
            }

            function _objectSpread2(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? arguments[i] : {};

                if (i % 2) {
                  ownKeys(source, true).forEach(function (key) {
                    _defineProperty(target, key, source[key]);
                  });
                } else if (Object.getOwnPropertyDescriptors) {
                  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                } else {
                  ownKeys(source).forEach(function (key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                  });
                }
              }

              return target;
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

            var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            var passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;
            var emailRequirements = "wrong email format";
            var passportRequirements = "Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character";
            var initialValidationState = {
              email: {
                isValid: true,
                message: ""
              },
              password: {
                isValid: true,
                message: ""
              }
            };

            var isValid = function isValid(_ref) {
              var _ref$email = _ref.email,
                  email = _ref$email === void 0 ? undefined : _ref$email,
                  _ref$password = _ref.password,
                  password = _ref$password === void 0 ? undefined : _ref$password;
              var emailValidation = true;
              var passwordValidation = true;

              if (email !== undefined) {
                emailValidation = emailRegex.test(email) ? {
                  isValid: true
                } : {
                  isValid: false,
                  message: emailRequirements
                };
              }

              if (password !== undefined) {
                passwordValidation = passwordRegex.test(password) ? {
                  isValid: true
                } : {
                  isValid: false,
                  message: passportRequirements
                };
              }

              var validationResult = {
                email: emailValidation,
                password: passwordValidation
              };
              return function (self) {
                self.setState({
                  validation: _objectSpread2({}, validationResult)
                });

                if (validationResult.email.isValid && validationResult.password.isValid) {
                  return true;
                } else {
                  return false;
                }
              };
            }; //export default isValid

            var bind = function bind(fn, thisArg) {
              return function wrap() {
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; i++) {
                  args[i] = arguments[i];
                }
                return fn.apply(thisArg, args);
              };
            };

            /*!
             * Determine if an object is a Buffer
             *
             * @author   Feross Aboukhadijeh <https://feross.org>
             * @license  MIT
             */

            var isBuffer = function isBuffer (obj) {
              return obj != null && obj.constructor != null &&
                typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
            };

            /*global toString:true*/

            // utils is a library of generic helper functions non-specific to axios

            var toString = Object.prototype.toString;

            /**
             * Determine if a value is an Array
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an Array, otherwise false
             */
            function isArray(val) {
              return toString.call(val) === '[object Array]';
            }

            /**
             * Determine if a value is an ArrayBuffer
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an ArrayBuffer, otherwise false
             */
            function isArrayBuffer(val) {
              return toString.call(val) === '[object ArrayBuffer]';
            }

            /**
             * Determine if a value is a FormData
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an FormData, otherwise false
             */
            function isFormData(val) {
              return (typeof FormData !== 'undefined') && (val instanceof FormData);
            }

            /**
             * Determine if a value is a view on an ArrayBuffer
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
             */
            function isArrayBufferView(val) {
              var result;
              if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
                result = ArrayBuffer.isView(val);
              } else {
                result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
              }
              return result;
            }

            /**
             * Determine if a value is a String
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a String, otherwise false
             */
            function isString(val) {
              return typeof val === 'string';
            }

            /**
             * Determine if a value is a Number
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Number, otherwise false
             */
            function isNumber(val) {
              return typeof val === 'number';
            }

            /**
             * Determine if a value is undefined
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if the value is undefined, otherwise false
             */
            function isUndefined(val) {
              return typeof val === 'undefined';
            }

            /**
             * Determine if a value is an Object
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is an Object, otherwise false
             */
            function isObject(val) {
              return val !== null && typeof val === 'object';
            }

            /**
             * Determine if a value is a Date
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Date, otherwise false
             */
            function isDate(val) {
              return toString.call(val) === '[object Date]';
            }

            /**
             * Determine if a value is a File
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a File, otherwise false
             */
            function isFile(val) {
              return toString.call(val) === '[object File]';
            }

            /**
             * Determine if a value is a Blob
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Blob, otherwise false
             */
            function isBlob(val) {
              return toString.call(val) === '[object Blob]';
            }

            /**
             * Determine if a value is a Function
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Function, otherwise false
             */
            function isFunction(val) {
              return toString.call(val) === '[object Function]';
            }

            /**
             * Determine if a value is a Stream
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a Stream, otherwise false
             */
            function isStream(val) {
              return isObject(val) && isFunction(val.pipe);
            }

            /**
             * Determine if a value is a URLSearchParams object
             *
             * @param {Object} val The value to test
             * @returns {boolean} True if value is a URLSearchParams object, otherwise false
             */
            function isURLSearchParams(val) {
              return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
            }

            /**
             * Trim excess whitespace off the beginning and end of a string
             *
             * @param {String} str The String to trim
             * @returns {String} The String freed of excess whitespace
             */
            function trim(str) {
              return str.replace(/^\s*/, '').replace(/\s*$/, '');
            }

            /**
             * Determine if we're running in a standard browser environment
             *
             * This allows axios to run in a web worker, and react-native.
             * Both environments support XMLHttpRequest, but not fully standard globals.
             *
             * web workers:
             *  typeof window -> undefined
             *  typeof document -> undefined
             *
             * react-native:
             *  navigator.product -> 'ReactNative'
             * nativescript
             *  navigator.product -> 'NativeScript' or 'NS'
             */
            function isStandardBrowserEnv() {
              if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                                       navigator.product === 'NativeScript' ||
                                                       navigator.product === 'NS')) {
                return false;
              }
              return (
                typeof window !== 'undefined' &&
                typeof document !== 'undefined'
              );
            }

            /**
             * Iterate over an Array or an Object invoking a function for each item.
             *
             * If `obj` is an Array callback will be called passing
             * the value, index, and complete array for each item.
             *
             * If 'obj' is an Object callback will be called passing
             * the value, key, and complete object for each property.
             *
             * @param {Object|Array} obj The object to iterate
             * @param {Function} fn The callback to invoke for each item
             */
            function forEach(obj, fn) {
              // Don't bother if no value provided
              if (obj === null || typeof obj === 'undefined') {
                return;
              }

              // Force an array if not already something iterable
              if (typeof obj !== 'object') {
                /*eslint no-param-reassign:0*/
                obj = [obj];
              }

              if (isArray(obj)) {
                // Iterate over array values
                for (var i = 0, l = obj.length; i < l; i++) {
                  fn.call(null, obj[i], i, obj);
                }
              } else {
                // Iterate over object keys
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    fn.call(null, obj[key], key, obj);
                  }
                }
              }
            }

            /**
             * Accepts varargs expecting each argument to be an object, then
             * immutably merges the properties of each object and returns result.
             *
             * When multiple objects contain the same key the later object in
             * the arguments list will take precedence.
             *
             * Example:
             *
             * ```js
             * var result = merge({foo: 123}, {foo: 456});
             * console.log(result.foo); // outputs 456
             * ```
             *
             * @param {Object} obj1 Object to merge
             * @returns {Object} Result of all merge properties
             */
            function merge(/* obj1, obj2, obj3, ... */) {
              var result = {};
              function assignValue(val, key) {
                if (typeof result[key] === 'object' && typeof val === 'object') {
                  result[key] = merge(result[key], val);
                } else {
                  result[key] = val;
                }
              }

              for (var i = 0, l = arguments.length; i < l; i++) {
                forEach(arguments[i], assignValue);
              }
              return result;
            }

            /**
             * Function equal to merge with the difference being that no reference
             * to original objects is kept.
             *
             * @see merge
             * @param {Object} obj1 Object to merge
             * @returns {Object} Result of all merge properties
             */
            function deepMerge(/* obj1, obj2, obj3, ... */) {
              var result = {};
              function assignValue(val, key) {
                if (typeof result[key] === 'object' && typeof val === 'object') {
                  result[key] = deepMerge(result[key], val);
                } else if (typeof val === 'object') {
                  result[key] = deepMerge({}, val);
                } else {
                  result[key] = val;
                }
              }

              for (var i = 0, l = arguments.length; i < l; i++) {
                forEach(arguments[i], assignValue);
              }
              return result;
            }

            /**
             * Extends object a by mutably adding to it the properties of object b.
             *
             * @param {Object} a The object to be extended
             * @param {Object} b The object to copy properties from
             * @param {Object} thisArg The object to bind function to
             * @return {Object} The resulting value of object a
             */
            function extend(a, b, thisArg) {
              forEach(b, function assignValue(val, key) {
                if (thisArg && typeof val === 'function') {
                  a[key] = bind(val, thisArg);
                } else {
                  a[key] = val;
                }
              });
              return a;
            }

            var utils = {
              isArray: isArray,
              isArrayBuffer: isArrayBuffer,
              isBuffer: isBuffer,
              isFormData: isFormData,
              isArrayBufferView: isArrayBufferView,
              isString: isString,
              isNumber: isNumber,
              isObject: isObject,
              isUndefined: isUndefined,
              isDate: isDate,
              isFile: isFile,
              isBlob: isBlob,
              isFunction: isFunction,
              isStream: isStream,
              isURLSearchParams: isURLSearchParams,
              isStandardBrowserEnv: isStandardBrowserEnv,
              forEach: forEach,
              merge: merge,
              deepMerge: deepMerge,
              extend: extend,
              trim: trim
            };

            function encode(val) {
              return encodeURIComponent(val).
                replace(/%40/gi, '@').
                replace(/%3A/gi, ':').
                replace(/%24/g, '$').
                replace(/%2C/gi, ',').
                replace(/%20/g, '+').
                replace(/%5B/gi, '[').
                replace(/%5D/gi, ']');
            }

            /**
             * Build a URL by appending params to the end
             *
             * @param {string} url The base of the url (e.g., http://www.google.com)
             * @param {object} [params] The params to be appended
             * @returns {string} The formatted url
             */
            var buildURL = function buildURL(url, params, paramsSerializer) {
              /*eslint no-param-reassign:0*/
              if (!params) {
                return url;
              }

              var serializedParams;
              if (paramsSerializer) {
                serializedParams = paramsSerializer(params);
              } else if (utils.isURLSearchParams(params)) {
                serializedParams = params.toString();
              } else {
                var parts = [];

                utils.forEach(params, function serialize(val, key) {
                  if (val === null || typeof val === 'undefined') {
                    return;
                  }

                  if (utils.isArray(val)) {
                    key = key + '[]';
                  } else {
                    val = [val];
                  }

                  utils.forEach(val, function parseValue(v) {
                    if (utils.isDate(v)) {
                      v = v.toISOString();
                    } else if (utils.isObject(v)) {
                      v = JSON.stringify(v);
                    }
                    parts.push(encode(key) + '=' + encode(v));
                  });
                });

                serializedParams = parts.join('&');
              }

              if (serializedParams) {
                var hashmarkIndex = url.indexOf('#');
                if (hashmarkIndex !== -1) {
                  url = url.slice(0, hashmarkIndex);
                }

                url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
              }

              return url;
            };

            function InterceptorManager() {
              this.handlers = [];
            }

            /**
             * Add a new interceptor to the stack
             *
             * @param {Function} fulfilled The function to handle `then` for a `Promise`
             * @param {Function} rejected The function to handle `reject` for a `Promise`
             *
             * @return {Number} An ID used to remove interceptor later
             */
            InterceptorManager.prototype.use = function use(fulfilled, rejected) {
              this.handlers.push({
                fulfilled: fulfilled,
                rejected: rejected
              });
              return this.handlers.length - 1;
            };

            /**
             * Remove an interceptor from the stack
             *
             * @param {Number} id The ID that was returned by `use`
             */
            InterceptorManager.prototype.eject = function eject(id) {
              if (this.handlers[id]) {
                this.handlers[id] = null;
              }
            };

            /**
             * Iterate over all the registered interceptors
             *
             * This method is particularly useful for skipping over any
             * interceptors that may have become `null` calling `eject`.
             *
             * @param {Function} fn The function to call for each interceptor
             */
            InterceptorManager.prototype.forEach = function forEach(fn) {
              utils.forEach(this.handlers, function forEachHandler(h) {
                if (h !== null) {
                  fn(h);
                }
              });
            };

            var InterceptorManager_1 = InterceptorManager;

            /**
             * Transform the data for a request or a response
             *
             * @param {Object|String} data The data to be transformed
             * @param {Array} headers The headers for the request or response
             * @param {Array|Function} fns A single function or Array of functions
             * @returns {*} The resulting transformed data
             */
            var transformData = function transformData(data, headers, fns) {
              /*eslint no-param-reassign:0*/
              utils.forEach(fns, function transform(fn) {
                data = fn(data, headers);
              });

              return data;
            };

            var isCancel = function isCancel(value) {
              return !!(value && value.__CANCEL__);
            };

            var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
              utils.forEach(headers, function processHeader(value, name) {
                if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                  headers[normalizedName] = value;
                  delete headers[name];
                }
              });
            };

            /**
             * Update an Error with the specified config, error code, and response.
             *
             * @param {Error} error The error to update.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The error.
             */
            var enhanceError = function enhanceError(error, config, code, request, response) {
              error.config = config;
              if (code) {
                error.code = code;
              }

              error.request = request;
              error.response = response;
              error.isAxiosError = true;

              error.toJSON = function() {
                return {
                  // Standard
                  message: this.message,
                  name: this.name,
                  // Microsoft
                  description: this.description,
                  number: this.number,
                  // Mozilla
                  fileName: this.fileName,
                  lineNumber: this.lineNumber,
                  columnNumber: this.columnNumber,
                  stack: this.stack,
                  // Axios
                  config: this.config,
                  code: this.code
                };
              };
              return error;
            };

            /**
             * Create an Error with the specified message, config, error code, request and response.
             *
             * @param {string} message The error message.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The created error.
             */
            var createError = function createError(message, config, code, request, response) {
              var error = new Error(message);
              return enhanceError(error, config, code, request, response);
            };

            /**
             * Resolve or reject a Promise based on response status.
             *
             * @param {Function} resolve A function that resolves the promise.
             * @param {Function} reject A function that rejects the promise.
             * @param {object} response The response.
             */
            var settle = function settle(resolve, reject, response) {
              var validateStatus = response.config.validateStatus;
              if (!validateStatus || validateStatus(response.status)) {
                resolve(response);
              } else {
                reject(createError(
                  'Request failed with status code ' + response.status,
                  response.config,
                  null,
                  response.request,
                  response
                ));
              }
            };

            // Headers whose duplicates are ignored by node
            // c.f. https://nodejs.org/api/http.html#http_message_headers
            var ignoreDuplicateOf = [
              'age', 'authorization', 'content-length', 'content-type', 'etag',
              'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
              'last-modified', 'location', 'max-forwards', 'proxy-authorization',
              'referer', 'retry-after', 'user-agent'
            ];

            /**
             * Parse headers into an object
             *
             * ```
             * Date: Wed, 27 Aug 2014 08:58:49 GMT
             * Content-Type: application/json
             * Connection: keep-alive
             * Transfer-Encoding: chunked
             * ```
             *
             * @param {String} headers Headers needing to be parsed
             * @returns {Object} Headers parsed into an object
             */
            var parseHeaders = function parseHeaders(headers) {
              var parsed = {};
              var key;
              var val;
              var i;

              if (!headers) { return parsed; }

              utils.forEach(headers.split('\n'), function parser(line) {
                i = line.indexOf(':');
                key = utils.trim(line.substr(0, i)).toLowerCase();
                val = utils.trim(line.substr(i + 1));

                if (key) {
                  if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                    return;
                  }
                  if (key === 'set-cookie') {
                    parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
                  } else {
                    parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
                  }
                }
              });

              return parsed;
            };

            var isURLSameOrigin = (
              utils.isStandardBrowserEnv() ?

              // Standard browser envs have full support of the APIs needed to test
              // whether the request URL is of the same origin as current location.
                (function standardBrowserEnv() {
                  var msie = /(msie|trident)/i.test(navigator.userAgent);
                  var urlParsingNode = document.createElement('a');
                  var originURL;

                  /**
                * Parse a URL to discover it's components
                *
                * @param {String} url The URL to be parsed
                * @returns {Object}
                */
                  function resolveURL(url) {
                    var href = url;

                    if (msie) {
                    // IE needs attribute set twice to normalize properties
                      urlParsingNode.setAttribute('href', href);
                      href = urlParsingNode.href;
                    }

                    urlParsingNode.setAttribute('href', href);

                    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                    return {
                      href: urlParsingNode.href,
                      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                      host: urlParsingNode.host,
                      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                      hostname: urlParsingNode.hostname,
                      port: urlParsingNode.port,
                      pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                        urlParsingNode.pathname :
                        '/' + urlParsingNode.pathname
                    };
                  }

                  originURL = resolveURL(window.location.href);

                  /**
                * Determine if a URL shares the same origin as the current location
                *
                * @param {String} requestURL The URL to test
                * @returns {boolean} True if URL shares the same origin, otherwise false
                */
                  return function isURLSameOrigin(requestURL) {
                    var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
                    return (parsed.protocol === originURL.protocol &&
                        parsed.host === originURL.host);
                  };
                })() :

              // Non standard browser envs (web workers, react-native) lack needed support.
                (function nonStandardBrowserEnv() {
                  return function isURLSameOrigin() {
                    return true;
                  };
                })()
            );

            var cookies = (
              utils.isStandardBrowserEnv() ?

              // Standard browser envs support document.cookie
                (function standardBrowserEnv() {
                  return {
                    write: function write(name, value, expires, path, domain, secure) {
                      var cookie = [];
                      cookie.push(name + '=' + encodeURIComponent(value));

                      if (utils.isNumber(expires)) {
                        cookie.push('expires=' + new Date(expires).toGMTString());
                      }

                      if (utils.isString(path)) {
                        cookie.push('path=' + path);
                      }

                      if (utils.isString(domain)) {
                        cookie.push('domain=' + domain);
                      }

                      if (secure === true) {
                        cookie.push('secure');
                      }

                      document.cookie = cookie.join('; ');
                    },

                    read: function read(name) {
                      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                      return (match ? decodeURIComponent(match[3]) : null);
                    },

                    remove: function remove(name) {
                      this.write(name, '', Date.now() - 86400000);
                    }
                  };
                })() :

              // Non standard browser env (web workers, react-native) lack needed support.
                (function nonStandardBrowserEnv() {
                  return {
                    write: function write() {},
                    read: function read() { return null; },
                    remove: function remove() {}
                  };
                })()
            );

            var xhr = function xhrAdapter(config) {
              return new Promise(function dispatchXhrRequest(resolve, reject) {
                var requestData = config.data;
                var requestHeaders = config.headers;

                if (utils.isFormData(requestData)) {
                  delete requestHeaders['Content-Type']; // Let the browser set it
                }

                var request = new XMLHttpRequest();

                // HTTP basic authentication
                if (config.auth) {
                  var username = config.auth.username || '';
                  var password = config.auth.password || '';
                  requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
                }

                request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

                // Set the request timeout in MS
                request.timeout = config.timeout;

                // Listen for ready state
                request.onreadystatechange = function handleLoad() {
                  if (!request || request.readyState !== 4) {
                    return;
                  }

                  // The request errored out and we didn't get a response, this will be
                  // handled by onerror instead
                  // With one exception: request that using file: protocol, most browsers
                  // will return status as 0 even though it's a successful request
                  if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                  }

                  // Prepare the response
                  var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
                  var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
                  var response = {
                    data: responseData,
                    status: request.status,
                    statusText: request.statusText,
                    headers: responseHeaders,
                    config: config,
                    request: request
                  };

                  settle(resolve, reject, response);

                  // Clean up request
                  request = null;
                };

                // Handle browser request cancellation (as opposed to a manual cancellation)
                request.onabort = function handleAbort() {
                  if (!request) {
                    return;
                  }

                  reject(createError('Request aborted', config, 'ECONNABORTED', request));

                  // Clean up request
                  request = null;
                };

                // Handle low level network errors
                request.onerror = function handleError() {
                  // Real errors are hidden from us by the browser
                  // onerror should only fire if it's a network error
                  reject(createError('Network Error', config, null, request));

                  // Clean up request
                  request = null;
                };

                // Handle timeout
                request.ontimeout = function handleTimeout() {
                  reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
                    request));

                  // Clean up request
                  request = null;
                };

                // Add xsrf header
                // This is only done if running in a standard browser environment.
                // Specifically not if we're in a web worker, or react-native.
                if (utils.isStandardBrowserEnv()) {
                  var cookies$$1 = cookies;

                  // Add xsrf header
                  var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
                    cookies$$1.read(config.xsrfCookieName) :
                    undefined;

                  if (xsrfValue) {
                    requestHeaders[config.xsrfHeaderName] = xsrfValue;
                  }
                }

                // Add headers to the request
                if ('setRequestHeader' in request) {
                  utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                    if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                      // Remove Content-Type if data is undefined
                      delete requestHeaders[key];
                    } else {
                      // Otherwise add header to the request
                      request.setRequestHeader(key, val);
                    }
                  });
                }

                // Add withCredentials to request if needed
                if (config.withCredentials) {
                  request.withCredentials = true;
                }

                // Add responseType to request if needed
                if (config.responseType) {
                  try {
                    request.responseType = config.responseType;
                  } catch (e) {
                    // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                    // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                    if (config.responseType !== 'json') {
                      throw e;
                    }
                  }
                }

                // Handle progress if needed
                if (typeof config.onDownloadProgress === 'function') {
                  request.addEventListener('progress', config.onDownloadProgress);
                }

                // Not all browsers support upload events
                if (typeof config.onUploadProgress === 'function' && request.upload) {
                  request.upload.addEventListener('progress', config.onUploadProgress);
                }

                if (config.cancelToken) {
                  // Handle cancellation
                  config.cancelToken.promise.then(function onCanceled(cancel) {
                    if (!request) {
                      return;
                    }

                    request.abort();
                    reject(cancel);
                    // Clean up request
                    request = null;
                  });
                }

                if (requestData === undefined) {
                  requestData = null;
                }

                // Send the request
                request.send(requestData);
              });
            };

            var DEFAULT_CONTENT_TYPE = {
              'Content-Type': 'application/x-www-form-urlencoded'
            };

            function setContentTypeIfUnset(headers, value) {
              if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
                headers['Content-Type'] = value;
              }
            }

            function getDefaultAdapter() {
              var adapter;
              // Only Node.JS has a process variable that is of [[Class]] process
              if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
                // For node use HTTP adapter
                adapter = xhr;
              } else if (typeof XMLHttpRequest !== 'undefined') {
                // For browsers use XHR adapter
                adapter = xhr;
              }
              return adapter;
            }

            var defaults = {
              adapter: getDefaultAdapter(),

              transformRequest: [function transformRequest(data, headers) {
                normalizeHeaderName(headers, 'Accept');
                normalizeHeaderName(headers, 'Content-Type');
                if (utils.isFormData(data) ||
                  utils.isArrayBuffer(data) ||
                  utils.isBuffer(data) ||
                  utils.isStream(data) ||
                  utils.isFile(data) ||
                  utils.isBlob(data)
                ) {
                  return data;
                }
                if (utils.isArrayBufferView(data)) {
                  return data.buffer;
                }
                if (utils.isURLSearchParams(data)) {
                  setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                  return data.toString();
                }
                if (utils.isObject(data)) {
                  setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
                  return JSON.stringify(data);
                }
                return data;
              }],

              transformResponse: [function transformResponse(data) {
                /*eslint no-param-reassign:0*/
                if (typeof data === 'string') {
                  try {
                    data = JSON.parse(data);
                  } catch (e) { /* Ignore */ }
                }
                return data;
              }],

              /**
               * A timeout in milliseconds to abort a request. If set to 0 (default) a
               * timeout is not created.
               */
              timeout: 0,

              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',

              maxContentLength: -1,

              validateStatus: function validateStatus(status) {
                return status >= 200 && status < 300;
              }
            };

            defaults.headers = {
              common: {
                'Accept': 'application/json, text/plain, */*'
              }
            };

            utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
              defaults.headers[method] = {};
            });

            utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
              defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
            });

            var defaults_1 = defaults;

            /**
             * Determines whether the specified URL is absolute
             *
             * @param {string} url The URL to test
             * @returns {boolean} True if the specified URL is absolute, otherwise false
             */
            var isAbsoluteURL = function isAbsoluteURL(url) {
              // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
              // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
              // by any combination of letters, digits, plus, period, or hyphen.
              return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
            };

            /**
             * Creates a new URL by combining the specified URLs
             *
             * @param {string} baseURL The base URL
             * @param {string} relativeURL The relative URL
             * @returns {string} The combined URL
             */
            var combineURLs = function combineURLs(baseURL, relativeURL) {
              return relativeURL
                ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
                : baseURL;
            };

            /**
             * Throws a `Cancel` if cancellation has been requested.
             */
            function throwIfCancellationRequested(config) {
              if (config.cancelToken) {
                config.cancelToken.throwIfRequested();
              }
            }

            /**
             * Dispatch a request to the server using the configured adapter.
             *
             * @param {object} config The config that is to be used for the request
             * @returns {Promise} The Promise to be fulfilled
             */
            var dispatchRequest = function dispatchRequest(config) {
              throwIfCancellationRequested(config);

              // Support baseURL config
              if (config.baseURL && !isAbsoluteURL(config.url)) {
                config.url = combineURLs(config.baseURL, config.url);
              }

              // Ensure headers exist
              config.headers = config.headers || {};

              // Transform request data
              config.data = transformData(
                config.data,
                config.headers,
                config.transformRequest
              );

              // Flatten headers
              config.headers = utils.merge(
                config.headers.common || {},
                config.headers[config.method] || {},
                config.headers || {}
              );

              utils.forEach(
                ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                function cleanHeaderConfig(method) {
                  delete config.headers[method];
                }
              );

              var adapter = config.adapter || defaults_1.adapter;

              return adapter(config).then(function onAdapterResolution(response) {
                throwIfCancellationRequested(config);

                // Transform response data
                response.data = transformData(
                  response.data,
                  response.headers,
                  config.transformResponse
                );

                return response;
              }, function onAdapterRejection(reason) {
                if (!isCancel(reason)) {
                  throwIfCancellationRequested(config);

                  // Transform response data
                  if (reason && reason.response) {
                    reason.response.data = transformData(
                      reason.response.data,
                      reason.response.headers,
                      config.transformResponse
                    );
                  }
                }

                return Promise.reject(reason);
              });
            };

            /**
             * Config-specific merge-function which creates a new config-object
             * by merging two configuration objects together.
             *
             * @param {Object} config1
             * @param {Object} config2
             * @returns {Object} New object resulting from merging config2 to config1
             */
            var mergeConfig = function mergeConfig(config1, config2) {
              // eslint-disable-next-line no-param-reassign
              config2 = config2 || {};
              var config = {};

              utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
                if (typeof config2[prop] !== 'undefined') {
                  config[prop] = config2[prop];
                }
              });

              utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
                if (utils.isObject(config2[prop])) {
                  config[prop] = utils.deepMerge(config1[prop], config2[prop]);
                } else if (typeof config2[prop] !== 'undefined') {
                  config[prop] = config2[prop];
                } else if (utils.isObject(config1[prop])) {
                  config[prop] = utils.deepMerge(config1[prop]);
                } else if (typeof config1[prop] !== 'undefined') {
                  config[prop] = config1[prop];
                }
              });

              utils.forEach([
                'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
                'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
                'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
                'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
                'socketPath'
              ], function defaultToConfig2(prop) {
                if (typeof config2[prop] !== 'undefined') {
                  config[prop] = config2[prop];
                } else if (typeof config1[prop] !== 'undefined') {
                  config[prop] = config1[prop];
                }
              });

              return config;
            };

            /**
             * Create a new instance of Axios
             *
             * @param {Object} instanceConfig The default config for the instance
             */
            function Axios(instanceConfig) {
              this.defaults = instanceConfig;
              this.interceptors = {
                request: new InterceptorManager_1(),
                response: new InterceptorManager_1()
              };
            }

            /**
             * Dispatch a request
             *
             * @param {Object} config The config specific for this request (merged with this.defaults)
             */
            Axios.prototype.request = function request(config) {
              /*eslint no-param-reassign:0*/
              // Allow for axios('example/url'[, config]) a la fetch API
              if (typeof config === 'string') {
                config = arguments[1] || {};
                config.url = arguments[0];
              } else {
                config = config || {};
              }

              config = mergeConfig(this.defaults, config);
              config.method = config.method ? config.method.toLowerCase() : 'get';

              // Hook up interceptors middleware
              var chain = [dispatchRequest, undefined];
              var promise = Promise.resolve(config);

              this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
                chain.unshift(interceptor.fulfilled, interceptor.rejected);
              });

              this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
                chain.push(interceptor.fulfilled, interceptor.rejected);
              });

              while (chain.length) {
                promise = promise.then(chain.shift(), chain.shift());
              }

              return promise;
            };

            Axios.prototype.getUri = function getUri(config) {
              config = mergeConfig(this.defaults, config);
              return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
            };

            // Provide aliases for supported request methods
            utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function(url, config) {
                return this.request(utils.merge(config || {}, {
                  method: method,
                  url: url
                }));
              };
            });

            utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function(url, data, config) {
                return this.request(utils.merge(config || {}, {
                  method: method,
                  url: url,
                  data: data
                }));
              };
            });

            var Axios_1 = Axios;

            /**
             * A `Cancel` is an object that is thrown when an operation is canceled.
             *
             * @class
             * @param {string=} message The message.
             */
            function Cancel(message) {
              this.message = message;
            }

            Cancel.prototype.toString = function toString() {
              return 'Cancel' + (this.message ? ': ' + this.message : '');
            };

            Cancel.prototype.__CANCEL__ = true;

            var Cancel_1 = Cancel;

            /**
             * A `CancelToken` is an object that can be used to request cancellation of an operation.
             *
             * @class
             * @param {Function} executor The executor function.
             */
            function CancelToken(executor) {
              if (typeof executor !== 'function') {
                throw new TypeError('executor must be a function.');
              }

              var resolvePromise;
              this.promise = new Promise(function promiseExecutor(resolve) {
                resolvePromise = resolve;
              });

              var token = this;
              executor(function cancel(message) {
                if (token.reason) {
                  // Cancellation has already been requested
                  return;
                }

                token.reason = new Cancel_1(message);
                resolvePromise(token.reason);
              });
            }

            /**
             * Throws a `Cancel` if cancellation has been requested.
             */
            CancelToken.prototype.throwIfRequested = function throwIfRequested() {
              if (this.reason) {
                throw this.reason;
              }
            };

            /**
             * Returns an object that contains a new `CancelToken` and a function that, when called,
             * cancels the `CancelToken`.
             */
            CancelToken.source = function source() {
              var cancel;
              var token = new CancelToken(function executor(c) {
                cancel = c;
              });
              return {
                token: token,
                cancel: cancel
              };
            };

            var CancelToken_1 = CancelToken;

            /**
             * Syntactic sugar for invoking a function and expanding an array for arguments.
             *
             * Common use case would be to use `Function.prototype.apply`.
             *
             *  ```js
             *  function f(x, y, z) {}
             *  var args = [1, 2, 3];
             *  f.apply(null, args);
             *  ```
             *
             * With `spread` this example can be re-written.
             *
             *  ```js
             *  spread(function(x, y, z) {})([1, 2, 3]);
             *  ```
             *
             * @param {Function} callback
             * @returns {Function}
             */
            var spread = function spread(callback) {
              return function wrap(arr) {
                return callback.apply(null, arr);
              };
            };

            /**
             * Create an instance of Axios
             *
             * @param {Object} defaultConfig The default config for the instance
             * @return {Axios} A new instance of Axios
             */
            function createInstance(defaultConfig) {
              var context = new Axios_1(defaultConfig);
              var instance = bind(Axios_1.prototype.request, context);

              // Copy axios.prototype to instance
              utils.extend(instance, Axios_1.prototype, context);

              // Copy context to instance
              utils.extend(instance, context);

              return instance;
            }

            // Create the default instance to be exported
            var axios = createInstance(defaults_1);

            // Expose Axios class to allow class inheritance
            axios.Axios = Axios_1;

            // Factory for creating new instances
            axios.create = function create(instanceConfig) {
              return createInstance(mergeConfig(axios.defaults, instanceConfig));
            };

            // Expose Cancel & CancelToken
            axios.Cancel = Cancel_1;
            axios.CancelToken = CancelToken_1;
            axios.isCancel = isCancel;

            // Expose all/spread
            axios.all = function all(promises) {
              return Promise.all(promises);
            };
            axios.spread = spread;

            var axios_1 = axios;

            // Allow use of default import syntax in TypeScript
            var default_1 = axios;
            axios_1.default = default_1;

            var axios$1 = axios_1;

            var EmailPasswordContext = React$1__default.createContext();

            var EmailPasswordProvider =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(EmailPasswordProvider, _React$Component);

              function EmailPasswordProvider() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, EmailPasswordProvider);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EmailPasswordProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  loading: false,
                  token: "",
                  isLoggedIn: false,
                  email: "",
                  password: "",
                  confirm: "",
                  serverError: "",
                  validation: initialValidationState
                });

                _defineProperty(_assertThisInitialized(_this), "setToken", function (_ref) {
                  var token = _ref.token;

                  _this.setState({
                    token: token
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
                  var name = e.target.name;
                  var value = e.target.value;

                  _this.setState(_defineProperty({}, name, value));

                  _this.resetValidation();
                });

                _defineProperty(_assertThisInitialized(_this), "resetValidation", function () {
                  _this.setState({
                    validation: initialValidationState
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "recoverPassword", function () {
                  var email = _this.state.email; //  const validationResult = validate({ email })
                  //  this.setState({ validation: { ...validationResult } })

                  if (isValid({
                    email: email
                  })(_assertThisInitialized(_this))) {
                    _this.setState({
                      loading: true
                    });

                    return axios$1.post('/recover', {
                      email: email
                    }).then(function (response) {
                      var data = response.data;

                      _this.setState({
                        loading: false
                      });

                      if (data.validation.email.isValid) {
                        _this.setState({
                          validation: _objectSpread2({}, data.validation)
                        });
                      }
                    })["catch"](function (error) {
                      _this.setState({
                        serverError: error,
                        loading: false
                      });
                    });
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "resetPassword", function () {
                  var _this$state = _this.state,
                      password = _this$state.password,
                      token = _this$state.token;

                  if (isValid({
                    password: password
                  })(_assertThisInitialized(_this))) {
                    _this.setState({
                      loading: true
                    });

                    return axios$1.post('/change', {
                      password: password,
                      token: token
                    }).then(function (response) {
                      var data = response.data;

                      _this.setState({
                        message: data,
                        loading: false
                      });
                    })["catch"](function (error) {
                      _this.setState({
                        serverError: error,
                        loading: false
                      });
                    });
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "signup", function () {
                  var _this$state2 = _this.state,
                      email = _this$state2.email,
                      password = _this$state2.password;

                  if (isValid({
                    email: email,
                    password: password
                  })(_assertThisInitialized(_this))) {
                    console.log("is valid ------", email, password);

                    _this.setState({
                      loading: true
                    });

                    return axios$1.post('/signup', {
                      email: email,
                      password: password
                    }).then(function (response) {
                      var data = response.data; //Server side validation

                      if (data.token === undefined) {
                        _this.setState({
                          validation: _objectSpread2({}, data.validation),
                          loading: false
                        });

                        return;
                      }

                      _this.setState({
                        isLoggedIn: true,
                        loading: false
                      });

                      _this.setToken(data.token); // Setting the token in localStorage

                    })["catch"](function (error) {
                      _this.setState({
                        serverError: error,
                        loading: false
                      });
                    });
                  } else {
                    console.log("is not valid ------", email, password);
                    return;
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "login", function () {
                  var _this$state3 = _this.state,
                      email = _this$state3.email,
                      password = _this$state3.password;

                  if (isValid({
                    email: email,
                    password: password
                  })(_assertThisInitialized(_this))) {
                    console.log("is valid ------", email, password); // Get a token from api server using the fetch api

                    _this.setState({
                      loading: true
                    });

                    return axios$1.get('/log-in', {
                      params: {
                        email: email,
                        password: password
                      }
                    }).then(function (response) {
                      var data = response.data;
                      console.log("axios response", response); //Server side validation

                      if (data.token === undefined) {
                        _this.setState({
                          validation: _objectSpread2({}, data.validation),
                          loading: false
                        });

                        return;
                      }

                      _this.setState({
                        isLoggedIn: true,
                        loading: false
                      });

                      _this.setToken(data.token); // Setting the token in localStorage

                    })["catch"](function (error) {
                      _this.setState({
                        serverError: error,
                        loading: false
                      });
                    });
                  } else {
                    console.log("is not valid ------", email, password);
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "loggedIn", function () {
                  // Checks if there is a saved token and it's still valid
                  var token = _this.getToken(); // Getting token from localstorage


                  return !!token && !_this.isTokenExpired(token); // handwaiving here
                });

                _defineProperty(_assertThisInitialized(_this), "isTokenExpired", function (token) {
                  try {
                    var decoded = decode(token);

                    if (decoded.exp < Date.now() / 1000) {
                      // Checking if token is expired.
                      return true;
                    } else return false;
                  } catch (error) {
                    _this.setState({
                      error: error
                    });

                    return false;
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "setToken", function (idToken) {
                  // Saves user token to localStorage
                  localStorage.setItem("id_token", idToken);
                });

                _defineProperty(_assertThisInitialized(_this), "getToken", function () {
                  // Retrieves the user token from localStorage
                  return localStorage.getItem("id_token");
                });

                _defineProperty(_assertThisInitialized(_this), "logout", function () {
                  _this.setState({
                    isLoggedIn: false,
                    username: "",
                    error: "",
                    message: ""
                  }); // Clear user token and profile data from localStorage


                  localStorage.removeItem("id_token");
                });

                _defineProperty(_assertThisInitialized(_this), "getConfirm", function () {
                  // Using jwt-decode npm package to decode the token
                  var answer = decode(_this.getToken());
                  console.log("Recieved answer!");
                  return answer;
                });

                return _this;
              }

              _createClass(EmailPasswordProvider, [{
                key: "componentWillMount",
                value: function componentWillMount() {
                  if (this.loggedIn()) {
                    this.setState({
                      isLoggedIn: true
                    });
                  }
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  var _this$state4 = this.state,
                      loading = _this$state4.loading,
                      isLoggedIn = _this$state4.isLoggedIn,
                      email = _this$state4.email,
                      password = _this$state4.password,
                      validation = _this$state4.validation,
                      confirm = _this$state4.confirm;
                  return React$1__default.createElement(EmailPasswordContext.Provider, {
                    value: {
                      login: this.login,
                      isLoggedIn: isLoggedIn,
                      logout: this.logout,
                      loading: loading,
                      signup: this.signup,
                      resetPassword: this.resetPassword,
                      recoverPassword: this.recoverPassword,
                      email: email,
                      password: password,
                      confirm: confirm,
                      onChange: this.onChange,
                      validation: validation,
                      setToken: this.setToken
                    }
                  }, React$1__default.createElement("div", null, children));
                }
              }]);

              return EmailPasswordProvider;
            }(React$1__default.Component);

            var classnames = createCommonjsModule(function (module) {
            /*!
              Copyright (c) 2017 Jed Watson.
              Licensed under the MIT License (MIT), see
              http://jedwatson.github.io/classnames
            */
            /* global define */

            (function () {

            	var hasOwn = {}.hasOwnProperty;

            	function classNames () {
            		var classes = [];

            		for (var i = 0; i < arguments.length; i++) {
            			var arg = arguments[i];
            			if (!arg) continue;

            			var argType = typeof arg;

            			if (argType === 'string' || argType === 'number') {
            				classes.push(arg);
            			} else if (Array.isArray(arg) && arg.length) {
            				var inner = classNames.apply(null, arg);
            				if (inner) {
            					classes.push(inner);
            				}
            			} else if (argType === 'object') {
            				for (var key in arg) {
            					if (hasOwn.call(arg, key) && arg[key]) {
            						classes.push(key);
            					}
            				}
            			}
            		}

            		return classes.join(' ');
            	}

            	if (module.exports) {
            		classNames.default = classNames;
            		module.exports = classNames;
            	} else {
            		window.classNames = classNames;
            	}
            }());
            });

            var CustomInput = function CustomInput(_ref) {
              var type = _ref.type,
                  placeholder = _ref.placeholder,
                  name = _ref.name,
                  validation = _ref.validation,
                  onChange = _ref.onChange,
                  value = _ref.value,
                  label = _ref.label;
              return React$1__default.createElement("div", {
                className: "form-group"
              }, React$1__default.createElement("label", {
                forhtml: "password"
              }, label, ": "), React$1__default.createElement("input", {
                className: classnames('form-control', {
                  'is-invalid': !validation.isValid
                }),
                onChange: onChange,
                value: value,
                name: name,
                type: type,
                placeholder: placeholder
              }), React$1__default.createElement("div", {
                className: "invalid-feedback"
              }, validation.message));
            };

            var AsyncButton = function AsyncButton(_ref) {
              var title = _ref.title,
                  loading = _ref.loading,
                  onClick = _ref.onClick,
                  disabled = _ref.disabled;
              return React.createElement("div", {
                style: {
                  position: "relative"
                }
              }, React.createElement("button", {
                style: {
                  width: "100%",
                  marginTop: 3,
                  marginBottom: 3
                },
                type: "button",
                className: "btn btn-outline-primary",
                onClick: onClick,
                disabled: disabled || loading
              }, loading ? React.createElement("div", null, React.createElement(ProgressLoader, null), React.createElement("div", {
                style: {
                  opacity: 0
                }
              }, title)) : React.createElement("div", null, title)));
            };

            var ProgressCircle = function ProgressCircle(_ref2) {
              var selected = _ref2.selected;
              return React.createElement("div", {
                style: {
                  height: 2,
                  width: 2,
                  padding: 3,
                  borderRadius: 50,
                  marginLeft: 4,
                  textAlign: "center",
                  backgroundColor: selected ? "#1a237e" : "#9fa8da"
                }
              });
            };

            var ProgressLoader =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(ProgressLoader, _React$Component);

              function ProgressLoader() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, ProgressLoader);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProgressLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  selected: 0
                });

                return _this;
              }

              _createClass(ProgressLoader, [{
                key: "componentWillMount",
                value: function componentWillMount() {
                  this.setState({
                    selected: 0
                  });
                }
              }, {
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this2 = this;

                  this.interval = setInterval(function () {
                    if (_this2.state.selected === 0) {
                      _this2.setState({
                        selected: 1
                      });
                    } else if (_this2.state.selected === 1) {
                      _this2.setState({
                        selected: 2
                      });
                    } else if (_this2.state.selected === 2) {
                      _this2.setState({
                        selected: 0
                      });
                    }
                  }, 200);
                }
              }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  clearInterval(this.interval);
                }
              }, {
                key: "render",
                value: function render() {
                  var selected = this.state.selected;
                  return React.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      position: 'absolute',
                      top: 20,
                      left: 0
                    }
                  }, React.createElement(ProgressCircle, {
                    selected: selected === 0
                  }), React.createElement(ProgressCircle, {
                    selected: selected === 1
                  }), React.createElement(ProgressCircle, {
                    selected: selected === 2
                  }));
                }
              }]);

              return ProgressLoader;
            }(React.Component);

            var Login = function Login() {
              return React$1__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var email = _ref.email,
                    password = _ref.password,
                    login = _ref.login,
                    onChange = _ref.onChange,
                    validation = _ref.validation,
                    isLoggedIn = _ref.isLoggedIn,
                    loading = _ref.loading;
                if (!isLoggedIn) return React$1__default.createElement("div", {
                  className: "container"
                }, React$1__default.createElement("div", {
                  className: "row justify-content-center"
                }, React$1__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React$1__default.createElement("fieldset", null, React$1__default.createElement("legend", null, "Login:"), React$1__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React$1__default.createElement(CustomInput, {
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Password"
                }), React$1__default.createElement("div", null, React$1__default.createElement(AsyncButton, {
                  title: "Login",
                  onClick: login,
                  loading: loading
                })), React$1__default.createElement(Link, {
                  to: "/recover"
                }, "Forgot Password !")))));
                return React$1__default.createElement(Redirect, {
                  to: "/"
                });
              });
            };

            var SignUp = function SignUp() {
              return React$1__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var onChange = _ref.onChange,
                    email = _ref.email,
                    password = _ref.password,
                    signup = _ref.signup,
                    loading = _ref.loading,
                    validation = _ref.validation,
                    isLoggedIn = _ref.isLoggedIn;
                if (!isLoggedIn) return React$1__default.createElement("div", {
                  className: "container"
                }, React$1__default.createElement("div", {
                  className: "row justify-content-center"
                }, React$1__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React$1__default.createElement("fieldset", null, React$1__default.createElement("legend", null, "Sign Up:"), React$1__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React$1__default.createElement(CustomInput, {
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Password"
                }), React$1__default.createElement("div", null, React$1__default.createElement(AsyncButton, {
                  title: "SignUp",
                  onClick: signup,
                  loading: loading
                }))))));
                return React$1__default.createElement(Redirect, {
                  to: "/"
                });
              });
            };

            var RecoverPassword = function RecoverPassword() {
              return React$1__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var email = _ref.email,
                    onChange = _ref.onChange,
                    validation = _ref.validation,
                    recover = _ref.recover,
                    loading = _ref.loading;
                return React$1__default.createElement("div", {
                  className: "container"
                }, React$1__default.createElement("div", {
                  className: "row justify-content-center"
                }, React$1__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React$1__default.createElement("fieldset", null, React$1__default.createElement("legend", null, "Recover Password:"), React$1__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React$1__default.createElement("div", null, React$1__default.createElement(AsyncButton, {
                  title: "Recover Password",
                  onClick: recover,
                  loading: loading
                }))))));
              });
            };

            var ResetPassword = function ResetPassword() {
              return React$1__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var password = _ref.password,
                    confirm = _ref.confirm,
                    resetPassword = _ref.resetPassword,
                    validation = _ref.validation,
                    loading = _ref.loading;
                return React$1__default.createElement("div", {
                  className: "container"
                }, React$1__default.createElement("div", {
                  className: "row justify-content-center"
                }, React$1__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React$1__default.createElement("fieldset", null, React$1__default.createElement("legend", null, "Reset Password:"), React$1__default.createElement(CustomInput, {
                  placeholder: "New Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "New Password"
                }), React$1__default.createElement(CustomInput, {
                  placeholder: "Confirm Password",
                  name: "confirm",
                  type: "password",
                  value: confirm,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Confirm"
                }), React$1__default.createElement("div", null, React$1__default.createElement(AsyncButton, {
                  title: "Reset Password",
                  onClick: resetPassword,
                  loading: loading
                }))))));
              });
            };

            var mongoCollection = function mongoCollection(_ref) {
              var collection = _ref.collection,
                  db = _ref.db;
              return {
                findOne: function findOne(_ref2) {
                  var filter = _ref2.filter;
                  return axios$1.get("/mongodb", {
                    params: {
                      reqType: "findOne",
                      collection: collection,
                      db: db,
                      filter: filter
                    }
                  });
                },
                find: function find(_ref3) {
                  var filter = _ref3.filter;
                  return axios$1.get("/mongodb", {
                    params: {
                      reqType: "find",
                      collection: collection,
                      db: db,
                      filter: filter
                    }
                  });
                },
                insertOne: function insertOne(data) {
                  return axios$1.post("/mongodb", {
                    params: {
                      reqType: "insertOne",
                      collection: collection,
                      db: db,
                      data: data
                    }
                  });
                },
                updateOne: function updateOne(_ref4) {
                  var filter = _ref4.filter,
                      data = _ref4.data;
                  return axios$1.put("/mongodb", {
                    params: {
                      reqType: "updateOne",
                      collection: collection,
                      db: db,
                      filter: filter,
                      data: data
                    }
                  });
                },
                deleteOne: function deleteOne(_ref5) {
                  var filter = _ref5.filter;
                  return axios$1["delete"]("/mongodb", {
                    params: {
                      reqType: "deleteOne",
                      collection: collection,
                      db: db,
                      filter: filter
                    }
                  });
                }
              };
            };

            var MongodbContext = React$1__default.createContext();

            var MongodbProvider =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(MongodbProvider, _React$Component);

              function MongodbProvider() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, MongodbProvider);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MongodbProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  objects: [],
                  loading: false
                });

                _defineProperty(_assertThisInitialized(_this), "findOne", function (_ref) {
                  var filter = _ref.filter;
                  var _this$props = _this.props,
                      collection = _this$props.collection,
                      db = _this$props.db;
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).findOne({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "find", function () {
                  var _this$props2 = _this.props,
                      collection = _this$props2.collection,
                      db = _this$props2.db;
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).find({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "deleteOne", function () {
                  var _this$props3 = _this.props,
                      collection = _this$props3.collection,
                      db = _this$props3.db;
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).deleteOne({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "updateOne", function () {
                  var _this$props4 = _this.props,
                      collection = _this$props4.collection,
                      db = _this$props4.db;
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).updateOne({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "insertOne", function () {
                  var _this$props5 = _this.props,
                      collection = _this$props5.collection,
                      db = _this$props5.db;
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).insertOne({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "setInitialState", function () {});

                return _this;
              }

              _createClass(MongodbProvider, [{
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  return React$1__default.createElement(MongoContext.Provider, {
                    value: {
                      setInitialState: this.setInitialState,
                      find: this.find,
                      findOne: this.findOne,
                      updateOne: this.updateOne,
                      insertOne: this.insertOne,
                      deleteOne: this.deleteOne
                    }
                  }, React$1__default.createElement("div", null, children));
                }
              }]);

              return MongodbProvider;
            }(React$1__default.Component);

            var EditorReact =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(EditorReact, _React$Component);

              function EditorReact() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, EditorReact);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditorReact)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  objects: [],
                  serverError: "",
                  loading: false,
                  selectedObject: null,
                  validation: initialValidationState
                });

                _defineProperty(_assertThisInitialized(_this), "_setInitialState", function () {
                  var initialState = _this.props.initialState;

                  if (initialState !== undefined) {
                    _this.setState(function (prevState) {
                      return _objectSpread2({}, prevState, {}, initialState);
                    });
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
                  var value = e.target.value;
                  var name = e.target.name;

                  _this.setState({
                    selectedObject: _defineProperty({}, name, value)
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "find", function () {
                  var _this$props = _this.props,
                      collection = _this$props.collection,
                      db = _this$props.db;
                  var filter = {};
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).find({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;

                    _this.setState({
                      objects: data.result,
                      loading: false
                    });
                  })["catch"](function (error) {
                    _this.setState({
                      serverError: error,
                      loading: false
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "findOne", function (_ref) {
                  var id = _ref.id;
                  var _this$props2 = _this.props,
                      collection = _this$props2.collection,
                      db = _this$props2.db;
                  var filter = {
                    _id: id
                  };
                  console.log("findOne", id);
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).findOne({
                    filter: filter
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "selectOne", function (_ref2) {
                  var _id = _ref2._id;

                  _this.setState({
                    selectedObject: _this.state.objects.find(function (u) {
                      return u._id === _id;
                    })
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "updateOne", function (_ref3) {
                  var id = _ref3.id,
                      data = _ref3.data;
                  var _this$props3 = _this.props,
                      collection = _this$props3.collection,
                      db = _this$props3.db;
                  var filter = {
                    _id: id
                  };
                  console.log("findOne", id);
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).findOne({
                    filter: filter
                  }, {
                    data: data
                  }).then(function (result) {
                    var data = result.data;
                    console.log("findOne result", result); // this.setState({ users: data.result,loading:false })
                  })["catch"](function (error) {// this.setState({serverError:error,loading:false})
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "deleteOne", function () {
                  var _this$props4 = _this.props,
                      collection = _this$props4.collection,
                      db = _this$props4.db;
                  var _id = _this.state.selectedObject._id;
                  var filter = {
                    _id: _id
                  };
                  mongoCollection({
                    collection: collection,
                    db: db
                  }).deleteOne({
                    filter: filter
                  }).then(function (result) {
                    _this.setState(function (state) {
                      return {
                        objects: state.objects.filter(function (u) {
                          return u._id !== _id;
                        })
                      };
                    });

                    var data = result.data;
                    console.log("deleteOne result", result);
                  })["catch"](function (error) {
                    console.log("deleteOne error", error);
                  });
                });

                return _this;
              }

              _createClass(EditorReact, [{
                key: "componentWillMount",
                value: function componentWillMount() {
                  var initialState = this.props.initialState;

                  this._setInitialState({
                    initialState: initialState
                  });
                }
              }, {
                key: "componentDidMount",
                value: function componentDidMount() {
                  console.log("Editor React mounted");
                  this.find();
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  var validation = this.state.validation;
                  console.log("state---", this.state);
                  return React$1__default.createElement("div", null, children({
                    onChange: this.onChange,
                    state: _objectSpread2({}, this.state),
                    validation: validation,
                    selectOne: this.selectOne,
                    find: this.find,
                    deleteOne: this.deleteOne,
                    updateOne: this.updateOne
                  }));
                }
              }]);

              return EditorReact;
            }(React$1__default.Component);

            var ConfirmationDialog = function ConfirmationDialog(_ref) {
              var decline = _ref.decline,
                  confirm = _ref.confirm,
                  children = _ref.children,
                  modalId = _ref.modalId;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", {
                className: "modal fade",
                id: modalId,
                tabIndex: "-1",
                role: "dialog",
                "aria-labelledby": "exampleModalLabel",
                "aria-hidden": "true"
              }, React$1__default.createElement("div", {
                className: "modal-dialog",
                role: "document"
              }, React$1__default.createElement("div", {
                className: "modal-content"
              }, React$1__default.createElement("div", {
                className: "modal-header"
              }, React$1__default.createElement("h5", {
                className: "modal-title",
                id: "exampleModalLabel"
              }, "Confirmation is needed"), React$1__default.createElement("button", {
                type: "button",
                className: "close",
                "data-dismiss": "modal",
                "aria-label": "Close"
              }, React$1__default.createElement("span", {
                "aria-hidden": "true"
              }, "\xD7"))), React$1__default.createElement("div", {
                className: "modal-body"
              }, children), React$1__default.createElement("div", {
                className: "modal-footer"
              }, React$1__default.createElement("button", {
                onClick: decline,
                type: "button",
                className: "btn btn-secondary",
                "data-dismiss": "modal"
              }, "Cancel"), React$1__default.createElement("button", {
                onClick: confirm,
                type: "button",
                className: "btn btn-primary",
                "data-dismiss": "modal"
              }, "Ok"))))));
            };

            var EditorDialog = function EditorDialog(_ref) {
              var children = _ref.children,
                  save = _ref.save,
                  cancel = _ref.cancel,
                  modalId = _ref.modalId;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", {
                className: "modal fade",
                id: modalId,
                tabIndex: "-1",
                role: "dialog",
                "aria-labelledby": "exampleModalLabel",
                "aria-hidden": "true"
              }, React$1__default.createElement("div", {
                className: "modal-dialog",
                role: "document"
              }, React$1__default.createElement("div", {
                className: "modal-content"
              }, React$1__default.createElement("div", {
                className: "modal-header"
              }, React$1__default.createElement("h5", {
                className: "modal-title",
                id: "exampleModalLabel"
              }, "Modal title"), React$1__default.createElement("button", {
                type: "button",
                className: "close",
                "data-dismiss": "modal",
                "aria-label": "Close"
              }, React$1__default.createElement("span", {
                "aria-hidden": "true"
              }, "\xD7"))), React$1__default.createElement("div", {
                className: "modal-body"
              }, children), React$1__default.createElement("div", {
                className: "modal-footer"
              }, React$1__default.createElement("button", {
                type: "button",
                className: "btn btn-secondary",
                "data-dismiss": "modal",
                onClick: cancel
              }, "Close"), React$1__default.createElement("button", {
                type: "button",
                className: "btn btn-primary",
                onClick: save
              }, "Save changes"))))));
            };

            var TableRender = function TableRender(_ref) {
              var _ref$collection = _ref.collection,
                  collection = _ref$collection === void 0 ? [] : _ref$collection,
                  selectOne = _ref.selectOne,
                  _ref$headers = _ref.headers,
                  headers = _ref$headers === void 0 ? [] : _ref$headers,
                  Table = _ref.Table,
                  TableBody = _ref.TableBody,
                  TableRow = _ref.TableRow,
                  TableColumn = _ref.TableColumn,
                  TableFooter = _ref.TableFooter,
                  TableHeader = _ref.TableHeader;
              console.log("collection---", collection);
              return React$1__default.createElement(Table, null, TableHeader && React$1__default.createElement(TableHeader, null, headers.length === 0 && collection.length > 0 && Object.keys(collection[0]).map(function (h, i) {
                return React$1__default.createElement(TableColumn, {
                  key: i
                }, h);
              }), headers.length > 0 && headers.map(function (h, i) {
                return React$1__default.createElement(TableColumn, {
                  key: i
                }, h);
              })), React$1__default.createElement(TableBody, null, collection !== undefined && collection.map(function (c, a) {
                return React$1__default.createElement(TableRow, {
                  selectOne: selectOne,
                  _id: c._id,
                  key: a
                }, Object.keys(c).map(function (r, i) {
                  return React$1__default.createElement(TableColumn, {
                    key: i
                  }, c[r]);
                }));
              })), TableFooter && React$1__default.createElement(TableFooter, null));
            };

            var Table = function Table(_ref) {
              var children = _ref.children;
              return React$1__default.createElement("table", {
                className: "table"
              }, children);
            };

            var TableBody = function TableBody(_ref) {
              var children = _ref.children;
              return React$1__default.createElement("tbody", null, children);
            };

            var TableColumn = function TableColumn(_ref) {
              var children = _ref.children;
              return React$1__default.createElement("td", null, children);
            };

            var TableHead = function TableHead(_ref) {
              var children = _ref.children;
              return React$1__default.createElement("thead", null, React$1__default.createElement("tr", null, children));
            };

            var TableRow = function TableRow(_ref) {
              var children = _ref.children,
                  selectOne = _ref.selectOne,
                  _id = _ref._id;
              console.log("_id-----", _id);
              return React$1__default.createElement("tr", null, children, React$1__default.createElement("td", null, React$1__default.createElement("button", {
                "data-toggle": "modal",
                "data-target": "#form",
                onClick: function onClick() {
                  selectOne({
                    _id: _id
                  });
                },
                className: "btn btn-primary"
              }, "Edit")), React$1__default.createElement("td", null, React$1__default.createElement("button", {
                "data-toggle": "modal",
                "data-target": "#confirm",
                onClick: function onClick() {
                  selectOne({
                    _id: _id
                  });
                },
                className: "btn btn-danger"
              }, "Delete")));
            };

            var BootstrapTable = function BootstrapTable(_ref) {
              var collection = _ref.collection,
                  headers = _ref.headers,
                  selectOne = _ref.selectOne;
              return React.createElement(TableRender, {
                selectOne: selectOne,
                headers: headers,
                collection: collection,
                TableBody: TableBody,
                TableHeader: TableHead,
                TableColumn: TableColumn,
                TableRow: TableRow,
                Table: Table
              });
            };

            var initialState = {
              users: [],
              email: "",
              password: "",
              _id: ""
            };
            var headers = ["_id", "Password", "Email", "Edit", "Delete"];

            var Users = function Users(_ref) {
              var collection = _ref.collection,
                  db = _ref.db;
              return React$1__default.createElement(EditorReact, {
                collection: collection,
                db: db,
                initialState: initialState
              }, function (_ref2) {
                var state = _ref2.state,
                    deleteOne = _ref2.deleteOne,
                    selectOne = _ref2.selectOne;
                var users = state.objects.map(function (u) {
                  return _objectSpread2({}, u, {
                    password: "********"
                  });
                });
                return React$1__default.createElement("div", null, React$1__default.createElement(BootstrapTable, {
                  headers: headers,
                  collection: users,
                  selectOne: selectOne
                }), React$1__default.createElement(EditorDialog, {
                  modalId: "form"
                }, "xxx"), React$1__default.createElement(ConfirmationDialog, {
                  confirm: deleteOne,
                  decline: function decline() {},
                  modalId: "confirm"
                }, "Confirm deletion of: ", state.selectedObject && state.selectedObject.email));
              });
            };
            /*
                <EditUser {...state} validation={validation} onChange={onChange}  />
                  <ConfirmationDialog deleteOne={deleteOne} />
            */

            var Home =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(Home, _React$Component);

              function Home() {
                _classCallCheck(this, Home);

                return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
              }

              _createClass(Home, [{
                key: "render",
                value: function render() {
                  return React$1__default.createElement("div", null, "Home");
                }
              }]);

              return Home;
            }(React$1__default.Component);

            var NavBar = function NavBar() {
              return React$1__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var isLoggedIn = _ref.isLoggedIn,
                    logout = _ref.logout;
                return React$1__default.createElement("nav", {
                  className: "navbar navbar-expand-lg navbar-light bg-light"
                }, React$1__default.createElement("a", {
                  className: "navbar-brand",
                  href: "#"
                }, "Navbar"), React$1__default.createElement("button", {
                  className: "navbar-toggler",
                  type: "button",
                  "data-toggle": "collapse",
                  "data-target": "#navbarSupportedContent",
                  "aria-controls": "navbarSupportedContent",
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation"
                }, React$1__default.createElement("span", {
                  className: "navbar-toggler-icon"
                })), React$1__default.createElement("div", {
                  className: "collapse navbar-collapse",
                  id: "navbarSupportedContent"
                }, React$1__default.createElement("ul", {
                  className: "navbar-nav mr-auto"
                }, React$1__default.createElement("li", {
                  className: "nav-item active"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/"
                }, "Home ", React$1__default.createElement("span", {
                  className: "sr-only"
                }, "(current)"))), isLoggedIn && React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/users"
                }, "Users")), !isLoggedIn && React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/login"
                }, "Login")), isLoggedIn && React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/",
                  onClick: logout
                }, "Logout")), !isLoggedIn && React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/signup"
                }, "SignUp")))));
              });
            };

            var App = function App() {
              return React$1__default.createElement("div", null, React$1__default.createElement(HashRouter, null, React$1__default.createElement("nav", {
                style: {
                  display: "flex",
                  justifyContent: "space-around"
                }
              }, React$1__default.createElement(NavBar, null)), React$1__default.createElement(Route, {
                exact: true,
                path: "/",
                component: Home
              }), React$1__default.createElement(Route, {
                path: "/users",
                render: function render() {
                  return React$1__default.createElement(Users, {
                    collection: "users",
                    db: "demo"
                  });
                }
              }), React$1__default.createElement(Route, {
                path: "/login",
                component: Login
              }), React$1__default.createElement(Route, {
                path: "/signup",
                component: SignUp
              }), React$1__default.createElement(Route, {
                path: "/recover",
                component: RecoverPassword
              }), React$1__default.createElement(Route, {
                path: "/resetpass/:username/:token",
                component: ResetPassword
              })));
            };

            ReactDOM.render(React$1__default.createElement("div", null, React$1__default.createElement(EmailPasswordProvider, null, React$1__default.createElement(App, null))), document.getElementById('root'));

}(React, ReactDOM, PropTypes));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lc20vaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzbS9yZWFjdC1yb3V0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIi4uLy4uL3ZhbGlkYXRpb24vbGliL3ZhbGlkYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vLi4vYXV0aC1yZWFjdC9saWIvRW1haWxQYXNzd29yZFByb3ZpZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIuLi8uLi9ib290c3RyYXAtaW5wdXQvbGliL0Jvb3RzdHJhcElucHV0LmpzIiwiLi4vLi4vYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbi9saWIvQXN5bmNCdXR0b24uanMiLCIuLi8uLi9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvTG9naW4uanMiLCIuLi8uLi9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvU2lnbnVwLmpzIiwiLi4vLi4vYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1JlY292ZXJQYXNzd29yZC5qcyIsIi4uLy4uL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9SZXNldFBhc3N3b3JkLmpzIiwiLi4vLi4vbW9uZ28tcmVhY3QvbGliL21vbmdvZGItY2xpZW50LmpzIiwiLi4vLi4vbW9uZ28tcmVhY3QvbGliL01vbmdvZGJQcm92aWRlci5qcyIsIi4uLy4uL2VkaXRvci1yZWFjdC9saWIvZWRpdG9yLXJlYWN0LmpzIiwiLi4vLi4vYm9vdHN0cmFwLWRpYWxvZy9saWIvQm9vdHN0cmFwQ29uZmlybWF0aW9uLmpzIiwiLi4vLi4vYm9vdHN0cmFwLWRpYWxvZy9saWIvQm9vdHN0cmFwRm9ybS5qcyIsIi4uLy4uL3RhYmxlLXJlbmRlci9saWIvaW5kZXguanMiLCIuLi8uLi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlLmpzIiwiLi4vLi4vYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZUJvZHkuanMiLCIuLi8uLi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlQ29sdW1uLmpzIiwiLi4vLi4vYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZUhlYWRlci5qcyIsIi4uLy4uL2Jvb3RzdHJhcC10YWJsZS9saWIvVGFibGVSb3cuanMiLCIuLi8uLi9ib290c3RyYXAtdGFibGUvbGliL2luZGV4LmpzIiwiLi4vLi4vYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1VzZXJzLmpzIiwiLi4vY2xpZW50L0hvbWUuanMiLCIuLi9jbGllbnQvTmF2QmFyLmpzIiwiLi4vY2xpZW50L0FwcC5qcyIsIi4uL2NsaWVudC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuLy8gYmFzZWQgb2ZmIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzXG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxudmFyIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5pZiAodHlwZW9mIGdsb2JhbC5zZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG59XG5pZiAodHlwZW9mIGdsb2JhbC5jbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0VGljayhmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbmV4cG9ydCB2YXIgdGl0bGUgPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIHBsYXRmb3JtID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBicm93c2VyID0gdHJ1ZTtcbmV4cG9ydCB2YXIgZW52ID0ge307XG5leHBvcnQgdmFyIGFyZ3YgPSBbXTtcbmV4cG9ydCB2YXIgdmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuZXhwb3J0IHZhciB2ZXJzaW9ucyA9IHt9O1xuZXhwb3J0IHZhciByZWxlYXNlID0ge307XG5leHBvcnQgdmFyIGNvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IHZhciBvbiA9IG5vb3A7XG5leHBvcnQgdmFyIGFkZExpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgb25jZSA9IG5vb3A7XG5leHBvcnQgdmFyIG9mZiA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbmV4cG9ydCB2YXIgZW1pdCA9IG5vb3A7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjd2QgKCkgeyByZXR1cm4gJy8nIH1cbmV4cG9ydCBmdW5jdGlvbiBjaGRpciAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdW1hc2soKSB7IHJldHVybiAwOyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2t1bWF2aXMvYnJvd3Nlci1wcm9jZXNzLWhydGltZS9ibG9iL21hc3Rlci9pbmRleC5qc1xudmFyIHBlcmZvcm1hbmNlID0gZ2xvYmFsLnBlcmZvcm1hbmNlIHx8IHt9XG52YXIgcGVyZm9ybWFuY2VOb3cgPVxuICBwZXJmb3JtYW5jZS5ub3cgICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1vek5vdyAgICAgfHxcbiAgcGVyZm9ybWFuY2UubXNOb3cgICAgICB8fFxuICBwZXJmb3JtYW5jZS5vTm93ICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLndlYmtpdE5vdyAgfHxcbiAgZnVuY3Rpb24oKXsgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfVxuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmV4cG9ydCBmdW5jdGlvbiBocnRpbWUocHJldmlvdXNUaW1lc3RhbXApe1xuICB2YXIgY2xvY2t0aW1lID0gcGVyZm9ybWFuY2VOb3cuY2FsbChwZXJmb3JtYW5jZSkqMWUtM1xuICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICB2YXIgbmFub3NlY29uZHMgPSBNYXRoLmZsb29yKChjbG9ja3RpbWUlMSkqMWU5KVxuICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgbmFub3NlY29uZHMgPSBuYW5vc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzFdXG4gICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgIHNlY29uZHMtLVxuICAgICAgbmFub3NlY29uZHMgKz0gMWU5XG4gICAgfVxuICB9XG4gIHJldHVybiBbc2Vjb25kcyxuYW5vc2Vjb25kc11cbn1cblxudmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gdXB0aW1lKCkge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICB2YXIgZGlmID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiBkaWYgLyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5leHRUaWNrOiBuZXh0VGljayxcbiAgdGl0bGU6IHRpdGxlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBlbnY6IGVudixcbiAgYXJndjogYXJndixcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICBvbjogb24sXG4gIGFkZExpc3RlbmVyOiBhZGRMaXN0ZW5lcixcbiAgb25jZTogb25jZSxcbiAgb2ZmOiBvZmYsXG4gIHJlbW92ZUxpc3RlbmVyOiByZW1vdmVMaXN0ZW5lcixcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIGVtaXQ6IGVtaXQsXG4gIGJpbmRpbmc6IGJpbmRpbmcsXG4gIGN3ZDogY3dkLFxuICBjaGRpcjogY2hkaXIsXG4gIHVtYXNrOiB1bWFzayxcbiAgaHJ0aW1lOiBocnRpbWUsXG4gIHBsYXRmb3JtOiBwbGF0Zm9ybSxcbiAgcmVsZWFzZTogcmVsZWFzZSxcbiAgY29uZmlnOiBjb25maWcsXG4gIHVwdGltZTogdXB0aW1lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHNMb29zZTsiLCIvLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5ID0gJ19fZ2xvYmFsX3VuaXF1ZV9pZF9fJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFtrZXldID0gKGdsb2JhbFtrZXldIHx8IDApICsgMTtcbn07XG4iLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbmZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghaXNQcm9kdWN0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0ZXh0ID0gXCJXYXJuaW5nOiBcIiArIG1lc3NhZ2U7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4odGV4dCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRocm93IEVycm9yKHRleHQpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2FybmluZztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZ3VkIGZyb20gJ2d1ZCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuXG52YXIgTUFYX1NJR05FRF8zMV9CSVRfSU5UID0gMTA3Mzc0MTgyMztcblxuZnVuY3Rpb24gb2JqZWN0SXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RW1pdHRlcih2YWx1ZSkge1xuICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBvbjogZnVuY3Rpb24gb24oaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXJzID0gaGFuZGxlcnMuZmlsdGVyKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiBoICE9PSBoYW5kbGVyO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIodmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuWzBdIDogY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0Q29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXgsIF9Db25zdW1lciRjb250ZXh0VHlwZTtcblxuICB2YXIgY29udGV4dFByb3AgPSAnX19jcmVhdGUtcmVhY3QtY29udGV4dC0nICsgZ3VkKCkgKyAnX18nO1xuXG4gIHZhciBQcm92aWRlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQcm92aWRlcigpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzLmVtaXR0ZXIgPSBjcmVhdGVFdmVudEVtaXR0ZXIoX3RoaXMucHJvcHMudmFsdWUpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8gPSBQcm92aWRlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbY29udGV4dFByb3BdID0gdGhpcy5lbWl0dGVyLCBfcmVmO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSAhPT0gbmV4dFByb3BzLnZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIGNoYW5nZWRCaXRzO1xuXG4gICAgICAgIGlmIChvYmplY3RJcyhvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5nZWRCaXRzID0gdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSAnZnVuY3Rpb24nID8gY2FsY3VsYXRlQ2hhbmdlZEJpdHMob2xkVmFsdWUsIG5ld1ZhbHVlKSA6IE1BWF9TSUdORURfMzFfQklUX0lOVDtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuaW5nKChjaGFuZ2VkQml0cyAmIE1BWF9TSUdORURfMzFfQklUX0lOVCkgPT09IGNoYW5nZWRCaXRzLCAnY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IEV4cGVjdGVkIHRoZSByZXR1cm4gdmFsdWUgdG8gYmUgYSAnICsgJzMxLWJpdCBpbnRlZ2VyLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgY2hhbmdlZEJpdHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoYW5nZWRCaXRzIHw9IDA7XG5cbiAgICAgICAgICBpZiAoY2hhbmdlZEJpdHMgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zZXQobmV4dFByb3BzLnZhbHVlLCBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgdmFyIENvbnN1bWVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDb25zdW1lciwgX0NvbXBvbmVudDIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICBfdGhpczIgPSBfQ29tcG9uZW50Mi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIuc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiBfdGhpczIuZ2V0VmFsdWUoKVxuICAgICAgfTtcblxuICAgICAgX3RoaXMyLm9uVXBkYXRlID0gZnVuY3Rpb24gKG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gX3RoaXMyLm9ic2VydmVkQml0cyB8IDA7XG5cbiAgICAgICAgaWYgKChvYnNlcnZlZEJpdHMgJiBjaGFuZ2VkQml0cykgIT09IDApIHtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIgPSBDb25zdW1lci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IG5leHRQcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vbih0aGlzLm9uVXBkYXRlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IHRoaXMucHJvcHMub2JzZXJ2ZWRCaXRzO1xuICAgICAgdGhpcy5vYnNlcnZlZEJpdHMgPSBvYnNlcnZlZEJpdHMgPT09IHVuZGVmaW5lZCB8fCBvYnNlcnZlZEJpdHMgPT09IG51bGwgPyBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgOiBvYnNlcnZlZEJpdHM7XG4gICAgfTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0ub2ZmKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5nZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG9ubHlDaGlsZCh0aGlzLnByb3BzLmNoaWxkcmVuKSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnN1bWVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgQ29uc3VtZXIuY29udGV4dFR5cGVzID0gKF9Db25zdW1lciRjb250ZXh0VHlwZSA9IHt9LCBfQ29uc3VtZXIkY29udGV4dFR5cGVbY29udGV4dFByb3BdID0gUHJvcFR5cGVzLm9iamVjdCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlKTtcbiAgcmV0dXJuIHtcbiAgICBQcm92aWRlcjogUHJvdmlkZXIsXG4gICAgQ29uc3VtZXI6IENvbnN1bWVyXG4gIH07XG59XG5cbnZhciBpbmRleCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQgfHwgY3JlYXRlUmVhY3RDb250ZXh0O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bykge1xuICB2YXIgZnJvbSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgdmFyIHRvUGFydHMgPSB0byAmJiB0by5zcGxpdCgnLycpIHx8IFtdO1xuICB2YXIgZnJvbVBhcnRzID0gZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykgfHwgW107XG5cbiAgdmFyIGlzVG9BYnMgPSB0byAmJiBpc0Fic29sdXRlKHRvKTtcbiAgdmFyIGlzRnJvbUFicyA9IGZyb20gJiYgaXNBYnNvbHV0ZShmcm9tKTtcbiAgdmFyIG11c3RFbmRBYnMgPSBpc1RvQWJzIHx8IGlzRnJvbUFicztcblxuICBpZiAodG8gJiYgaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAvLyB0byBpcyBhYnNvbHV0ZVxuICAgIGZyb21QYXJ0cyA9IHRvUGFydHM7XG4gIH0gZWxzZSBpZiAodG9QYXJ0cy5sZW5ndGgpIHtcbiAgICAvLyB0byBpcyByZWxhdGl2ZSwgZHJvcCB0aGUgZmlsZW5hbWVcbiAgICBmcm9tUGFydHMucG9wKCk7XG4gICAgZnJvbVBhcnRzID0gZnJvbVBhcnRzLmNvbmNhdCh0b1BhcnRzKTtcbiAgfVxuXG4gIGlmICghZnJvbVBhcnRzLmxlbmd0aCkgcmV0dXJuICcvJztcblxuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IHZvaWQgMDtcbiAgaWYgKGZyb21QYXJ0cy5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdCA9IGZyb21QYXJ0c1tmcm9tUGFydHMubGVuZ3RoIC0gMV07XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nIHx8IGxhc3QgPT09ICcnO1xuICB9IGVsc2Uge1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBmcm9tUGFydHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIHZhciBwYXJ0ID0gZnJvbVBhcnRzW2ldO1xuXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbXVzdEVuZEFicykgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gIH1pZiAobXVzdEVuZEFicyAmJiBmcm9tUGFydHNbMF0gIT09ICcnICYmICghZnJvbVBhcnRzWzBdIHx8ICFpc0Fic29sdXRlKGZyb21QYXJ0c1swXSkpKSBmcm9tUGFydHMudW5zaGlmdCgnJyk7XG5cbiAgdmFyIHJlc3VsdCA9IGZyb21QYXJ0cy5qb2luKCcvJyk7XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgcmVzdWx0LnN1YnN0cigtMSkgIT09ICcvJykgcmVzdWx0ICs9ICcvJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlUGF0aG5hbWU7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGl0ZW0sIGJbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhVHlwZSA9IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKTtcbiAgdmFyIGJUeXBlID0gdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGIpO1xuXG4gIGlmIChhVHlwZSAhPT0gYlR5cGUpIHJldHVybiBmYWxzZTtcblxuICBpZiAoYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IGEudmFsdWVPZigpO1xuICAgIHZhciBiVmFsdWUgPSBiLnZhbHVlT2YoKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGFLZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVFcXVhbDsiLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBwcmVmaXggPSAnSW52YXJpYW50IGZhaWxlZCc7XG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmIChjb25kaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCArIFwiOiBcIiArIChtZXNzYWdlIHx8ICcnKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW52YXJpYW50O1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHJlc29sdmVQYXRobmFtZSBmcm9tICdyZXNvbHZlLXBhdGhuYW1lJztcbmltcG9ydCB2YWx1ZUVxdWFsIGZyb20gJ3ZhbHVlLWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcHJlZml4ICsgJyhcXFxcL3xcXFxcP3wjfCQpJywgJ2knKS50ZXN0KHBhdGgpO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJykgOiB2b2lkIDA7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpIDogdm9pZCAwO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufVxuXG52YXIgUG9wU3RhdGVFdmVudCA9ICdwb3BzdGF0ZSc7XG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG5mdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgICBuZXh0S2V5cy5wdXNoKGxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgYWxsS2V5cyA9IG5leHRLZXlzO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxLZXlzW3ByZXZJbmRleF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxudmFyIEhhc2hDaGFuZ2VFdmVudCQxID0gJ2hhc2hjaGFuZ2UnO1xudmFyIEhhc2hQYXRoQ29kZXJzID0ge1xuICBoYXNoYmFuZzoge1xuICAgIGVuY29kZVBhdGg6IGZ1bmN0aW9uIGVuY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoIDogJyEvJyArIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBzdHJpcExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfSxcbiAgc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpO1xufVxuXG5mdW5jdGlvbiBwdXNoSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHZhciBoYXNoSW5kZXggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKDAsIGhhc2hJbmRleCA+PSAwID8gaGFzaEluZGV4IDogMCkgKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gX3Byb3BzLmhhc2hUeXBlLFxuICAgICAgaGFzaFR5cGUgPSBfcHJvcHMkaGFzaFR5cGUgPT09IHZvaWQgMCA/ICdzbGFzaCcgOiBfcHJvcHMkaGFzaFR5cGU7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG4gIHZhciBfSGFzaFBhdGhDb2RlcnMkaGFzaFQgPSBIYXNoUGF0aENvZGVyc1toYXNoVHlwZV0sXG4gICAgICBlbmNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmVuY29kZVBhdGgsXG4gICAgICBkZWNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmRlY29kZVBhdGg7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBkZWNvZGVQYXRoKGdldEhhc2hQYXRoKCkpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkge1xuICAgICAgLy8gRW5zdXJlIHdlIGFsd2F5cyBoYXZlIGEgcHJvcGVybHktZW5jb2RlZCBoYXNoLlxuICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKHRvTG9jYXRpb24pKTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9IC8vIEVuc3VyZSB0aGUgaGFzaCBpcyBlbmNvZGVkIHByb3Blcmx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxuXG5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICB2YXIgYWxsUGF0aHMgPSBbY3JlYXRlUGF0aChpbml0aWFsTG9jYXRpb24pXTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBQVVNILCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICBwdXNoSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICAgIHZhciBuZXh0UGF0aHMgPSBhbGxQYXRocy5zbGljZSgwLCBwcmV2SW5kZXggPT09IC0xID8gMCA6IHByZXZJbmRleCArIDEpO1xuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGg7IGEgbmV3IGVudHJ5IHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrJykgOiB2b2lkIDA7XG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoY2FuR29XaXRob3V0UmVsb2FkLCAnSGFzaCBoaXN0b3J5IGdvKG4pIGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQgaW4gdGhpcyBicm93c2VyJykgOiB2b2lkIDA7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIF9wcm9wcyRpbml0aWFsRW50cmllcyA9IF9wcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB2b2lkIDAgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBfcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdm9pZCAwID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgaW5kZXggPSBjbGFtcChpbml0aWFsSW5kZXgsIDAsIGluaXRpYWxFbnRyaWVzLmxlbmd0aCAtIDEpO1xuICB2YXIgZW50cmllcyA9IGluaXRpYWxFbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJyA/IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGVudHJ5LmtleSB8fCBjcmVhdGVLZXkoKSk7XG4gIH0pOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBjcmVhdGVQYXRoO1xuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuXG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gY2xhbXAoaGlzdG9yeS5pbmRleCArIG4sIDAsIGhpc3RvcnkuZW50cmllcy5sZW5ndGggLSAxKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgdmFyIGxvY2F0aW9uID0gaGlzdG9yeS5lbnRyaWVzW25leHRJbmRleF07XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGhpc3RvcnkuaW5kZXggKyBuO1xuICAgIHJldHVybiBuZXh0SW5kZXggPj0gMCAmJiBuZXh0SW5kZXggPCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIHBhcnNlUGF0aCwgY3JlYXRlUGF0aCB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwidmFyIGlzYXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFRvUmVnZXhwXG5tb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZVxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvUmVnRXhwID0gdG9rZW5zVG9SZWdFeHBcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKVxuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4geyFBcnJheX1cbiAqL1xuZnVuY3Rpb24gcGFyc2UgKHN0ciwgb3B0aW9ucykge1xuICB2YXIgdG9rZW5zID0gW11cbiAgdmFyIGtleSA9IDBcbiAgdmFyIGluZGV4ID0gMFxuICB2YXIgcGF0aCA9ICcnXG4gIHZhciBkZWZhdWx0RGVsaW1pdGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlbGltaXRlciB8fCAnLydcbiAgdmFyIHJlc1xuXG4gIHdoaWxlICgocmVzID0gUEFUSF9SRUdFWFAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgdmFyIG0gPSByZXNbMF1cbiAgICB2YXIgZXNjYXBlZCA9IHJlc1sxXVxuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXhcbiAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGhcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIG5leHQgPSBzdHJbaW5kZXhdXG4gICAgdmFyIHByZWZpeCA9IHJlc1syXVxuICAgIHZhciBuYW1lID0gcmVzWzNdXG4gICAgdmFyIGNhcHR1cmUgPSByZXNbNF1cbiAgICB2YXIgZ3JvdXAgPSByZXNbNV1cbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl1cbiAgICB2YXIgYXN0ZXJpc2sgPSByZXNbN11cblxuICAgIC8vIFB1c2ggdGhlIGN1cnJlbnQgcGF0aCBvbnRvIHRoZSB0b2tlbnMuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gICAgICBwYXRoID0gJydcbiAgICB9XG5cbiAgICB2YXIgcGFydGlhbCA9IHByZWZpeCAhPSBudWxsICYmIG5leHQgIT0gbnVsbCAmJiBuZXh0ICE9PSBwcmVmaXhcbiAgICB2YXIgcmVwZWF0ID0gbW9kaWZpZXIgPT09ICcrJyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIGRlbGltaXRlciA9IHJlc1syXSB8fCBkZWZhdWx0RGVsaW1pdGVyXG4gICAgdmFyIHBhdHRlcm4gPSBjYXB0dXJlIHx8IGdyb3VwXG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pXG4gIH1cblxuICAvLyBNYXRjaCBhbnkgY2hhcmFjdGVycyBzdGlsbCByZW1haW5pbmcuXG4gIGlmIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICBwYXRoICs9IHN0ci5zdWJzdHIoaW5kZXgpXG4gIH1cblxuICAvLyBJZiB0aGUgcGF0aCBleGlzdHMsIHB1c2ggaXQgb250byB0aGUgZW5kLlxuICBpZiAocGF0aCkge1xuICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aClcblxuICAvLyBDb21waWxlIGFsbCB0aGUgcGF0dGVybnMgYmVmb3JlIGNvbXBpbGF0aW9uLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgbWF0Y2hlc1tpXSA9IG5ldyBSZWdFeHAoJ14oPzonICsgdG9rZW5zW2ldLnBhdHRlcm4gKyAnKSQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSAnJ1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9XG4gICAgdmFyIGVuY29kZSA9IG9wdGlvbnMucHJldHR5ID8gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IDogZW5jb2RlVVJJQ29tcG9uZW50XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggKz0gdG9rZW5cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBkYXRhW3Rva2VuLm5hbWVdXG4gICAgICB2YXIgc2VnbWVudFxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAvLyBQcmVwZW5kIHBhcnRpYWwgc2VnbWVudCBwcmVmaXhlcy5cbiAgICAgICAgICBpZiAodG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXhcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICghdG9rZW4ucmVwZWF0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnYCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0pXG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzZWdtZW50ID0gdG9rZW4uYXN0ZXJpc2sgPyBlbmNvZGVBc3Rlcmlzayh2YWx1ZSkgOiBlbmNvZGUodmFsdWUpXG5cbiAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxuICAgICAgfVxuXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5c1xuICByZXR1cm4gcmVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zZW5zaXRpdmUgPyAnJyA6ICdpJ1xufVxuXG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZylcblxuICBpZiAoZ3JvdXBzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGksXG4gICAgICAgIHByZWZpeDogbnVsbCxcbiAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxuICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgIHBhcnRpYWw6IGZhbHNlLFxuICAgICAgICBhc3RlcmlzazogZmFsc2UsXG4gICAgICAgIHBhdHRlcm46IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydHMucHVzaChwYXRoVG9SZWdleHAocGF0aFtpXSwga2V5cywgb3B0aW9ucykuc291cmNlKVxuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0XG4gIHZhciBlbmQgPSBvcHRpb25zLmVuZCAhPT0gZmFsc2VcbiAgdmFyIHJvdXRlID0gJydcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyh0b2tlbilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyh0b2tlbi5wcmVmaXgpXG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJ1xuXG4gICAgICBrZXlzLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgY2FwdHVyZSArPSAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonXG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpPydcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSdcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZVxuICAgIH1cbiAgfVxuXG4gIHZhciBkZWxpbWl0ZXIgPSBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nKVxuICB2YXIgZW5kc1dpdGhEZWxpbWl0ZXIgPSByb3V0ZS5zbGljZSgtZGVsaW1pdGVyLmxlbmd0aCkgPT09IGRlbGltaXRlclxuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nXG4gIH1cblxuICBpZiAoZW5kKSB7XG4gICAgcm91dGUgKz0gJyQnXG4gIH0gZWxzZSB7XG4gICAgLy8gSW4gbm9uLWVuZGluZyBtb2RlLCB3ZSBuZWVkIHRoZSBjYXB0dXJpbmcgZ3JvdXBzIHRvIG1hdGNoIGFzIG11Y2ggYXNcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aERlbGltaXRlciA/ICcnIDogJyg/PScgKyBkZWxpbWl0ZXIgKyAnfCQpJ1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtcbnZhciBiPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5mb3IsYz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpOjYwMTAzLGQ9Yj9TeW1ib2wuZm9yKFwicmVhY3QucG9ydGFsXCIpOjYwMTA2LGU9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIik6NjAxMDcsZj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdHJpY3RfbW9kZVwiKTo2MDEwOCxnPWI/U3ltYm9sLmZvcihcInJlYWN0LnByb2ZpbGVyXCIpOjYwMTE0LGg9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvdmlkZXJcIik6NjAxMDksaz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpOjYwMTEwLGw9Yj9TeW1ib2wuZm9yKFwicmVhY3QuYXN5bmNfbW9kZVwiKTo2MDExMSxtPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbmN1cnJlbnRfbW9kZVwiKTo2MDExMSxuPWI/U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpOjYwMTEyLHA9Yj9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIik6NjAxMTMscT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpOlxuNjAxMTUscj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2O2Z1bmN0aW9uIHQoYSl7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSl7dmFyIHU9YS4kJHR5cGVvZjtzd2l0Y2godSl7Y2FzZSBjOnN3aXRjaChhPWEudHlwZSxhKXtjYXNlIGw6Y2FzZSBtOmNhc2UgZTpjYXNlIGc6Y2FzZSBmOmNhc2UgcDpyZXR1cm4gYTtkZWZhdWx0OnN3aXRjaChhPWEmJmEuJCR0eXBlb2YsYSl7Y2FzZSBrOmNhc2UgbjpjYXNlIGg6cmV0dXJuIGE7ZGVmYXVsdDpyZXR1cm4gdX19Y2FzZSByOmNhc2UgcTpjYXNlIGQ6cmV0dXJuIHV9fX1mdW5jdGlvbiB2KGEpe3JldHVybiB0KGEpPT09bX1leHBvcnRzLnR5cGVPZj10O2V4cG9ydHMuQXN5bmNNb2RlPWw7ZXhwb3J0cy5Db25jdXJyZW50TW9kZT1tO2V4cG9ydHMuQ29udGV4dENvbnN1bWVyPWs7ZXhwb3J0cy5Db250ZXh0UHJvdmlkZXI9aDtleHBvcnRzLkVsZW1lbnQ9YztleHBvcnRzLkZvcndhcmRSZWY9bjtcbmV4cG9ydHMuRnJhZ21lbnQ9ZTtleHBvcnRzLkxhenk9cjtleHBvcnRzLk1lbW89cTtleHBvcnRzLlBvcnRhbD1kO2V4cG9ydHMuUHJvZmlsZXI9ZztleHBvcnRzLlN0cmljdE1vZGU9ZjtleHBvcnRzLlN1c3BlbnNlPXA7ZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgYXx8YT09PWV8fGE9PT1tfHxhPT09Z3x8YT09PWZ8fGE9PT1wfHxcIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiYoYS4kJHR5cGVvZj09PXJ8fGEuJCR0eXBlb2Y9PT1xfHxhLiQkdHlwZW9mPT09aHx8YS4kJHR5cGVvZj09PWt8fGEuJCR0eXBlb2Y9PT1uKX07ZXhwb3J0cy5pc0FzeW5jTW9kZT1mdW5jdGlvbihhKXtyZXR1cm4gdihhKXx8dChhKT09PWx9O2V4cG9ydHMuaXNDb25jdXJyZW50TW9kZT12O2V4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1rfTtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1ofTtleHBvcnRzLmlzRWxlbWVudD1mdW5jdGlvbihhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiZhLiQkdHlwZW9mPT09Y307ZXhwb3J0cy5pc0ZvcndhcmRSZWY9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1ufTtleHBvcnRzLmlzRnJhZ21lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1lfTtleHBvcnRzLmlzTGF6eT1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PXJ9O2V4cG9ydHMuaXNNZW1vPWZ1bmN0aW9uKGEpe3JldHVybiB0KGEpPT09cX07ZXhwb3J0cy5pc1BvcnRhbD1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PWR9O2V4cG9ydHMuaXNQcm9maWxlcj1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PWd9O2V4cG9ydHMuaXNTdHJpY3RNb2RlPWZ1bmN0aW9uKGEpe3JldHVybiB0KGEpPT09Zn07XG5leHBvcnRzLmlzU3VzcGVuc2U9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1wfTtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZTogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IHRydWUsXG4gICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBjYWxsZWU6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgRk9SV0FSRF9SRUZfU1RBVElDUyA9IHtcbiAgICAnJCR0eXBlb2YnOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlXG59O1xuXG52YXIgTUVNT19TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgY29tcGFyZTogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tSZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblxuZnVuY3Rpb24gZ2V0U3RhdGljcyhjb21wb25lbnQpIHtcbiAgICBpZiAoUmVhY3RJcy5pc01lbW8oY29tcG9uZW50KSkge1xuICAgICAgICByZXR1cm4gTUVNT19TVEFUSUNTO1xuICAgIH1cbiAgICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuXG4gICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXRTdGF0aWNzID0gZ2V0U3RhdGljcyh0YXJnZXRDb21wb25lbnQpO1xuICAgICAgICB2YXIgc291cmNlU3RhdGljcyA9IGdldFN0YXRpY3Moc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFLTk9XTl9TVEFUSUNTW2tleV0gJiYgIShibGFja2xpc3QgJiYgYmxhY2tsaXN0W2tleV0pICYmICEoc291cmNlU3RhdGljcyAmJiBzb3VyY2VTdGF0aWNzW2tleV0pICYmICEodGFyZ2V0U3RhdGljcyAmJiB0YXJnZXRTdGF0aWNzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG4iLCJpbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdtaW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgY3JlYXRlUGF0aCB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9IGZyb20gJ3JlYWN0LWlzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG4vLyBUT0RPOiBSZXBsYWNlIHdpdGggUmVhY3QuY3JlYXRlQ29udGV4dCBvbmNlIHdlIGNhbiBhc3N1bWUgUmVhY3QgMTYrXG5cbnZhciBjcmVhdGVOYW1lZENvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVOYW1lZENvbnRleHQobmFtZSkge1xuICB2YXIgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcbiAgY29udGV4dC5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gIHJldHVybiBjb250ZXh0O1xufTtcblxudmFyIGNvbnRleHQgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlTmFtZWRDb250ZXh0KFwiUm91dGVyXCIpO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBwdXR0aW5nIGhpc3Rvcnkgb24gY29udGV4dC5cbiAqL1xuXG52YXIgUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgUm91dGVyLmNvbXB1dGVSb290TWF0Y2ggPSBmdW5jdGlvbiBjb21wdXRlUm9vdE1hdGNoKHBhdGhuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgdXJsOiBcIi9cIixcbiAgICAgIHBhcmFtczoge30sXG4gICAgICBpc0V4YWN0OiBwYXRobmFtZSA9PT0gXCIvXCJcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIFJvdXRlcihwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgbG9jYXRpb246IHByb3BzLmhpc3RvcnkubG9jYXRpb25cbiAgICB9OyAvLyBUaGlzIGlzIGEgYml0IG9mIGEgaGFjay4gV2UgaGF2ZSB0byBzdGFydCBsaXN0ZW5pbmcgZm9yIGxvY2F0aW9uXG4gICAgLy8gY2hhbmdlcyBoZXJlIGluIHRoZSBjb25zdHJ1Y3RvciBpbiBjYXNlIHRoZXJlIGFyZSBhbnkgPFJlZGlyZWN0PnNcbiAgICAvLyBvbiB0aGUgaW5pdGlhbCByZW5kZXIuIElmIHRoZXJlIGFyZSwgdGhleSB3aWxsIHJlcGxhY2UvcHVzaCB3aGVuXG4gICAgLy8gdGhleSBtb3VudCBhbmQgc2luY2UgY0RNIGZpcmVzIGluIGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLCB3ZSBtYXlcbiAgICAvLyBnZXQgYSBuZXcgbG9jYXRpb24gYmVmb3JlIHRoZSA8Um91dGVyPiBpcyBtb3VudGVkLlxuXG4gICAgX3RoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xuICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBudWxsO1xuXG4gICAgaWYgKCFwcm9wcy5zdGF0aWNDb250ZXh0KSB7XG4gICAgICBfdGhpcy51bmxpc3RlbiA9IHByb3BzLmhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICBpZiAoX3RoaXMuX2lzTW91bnRlZCkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5faXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9wZW5kaW5nTG9jYXRpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsb2NhdGlvbjogdGhpcy5fcGVuZGluZ0xvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHRoaXMudW5saXN0ZW4oKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IG51bGwsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBoaXN0b3J5OiB0aGlzLnByb3BzLmhpc3RvcnksXG4gICAgICAgIGxvY2F0aW9uOiB0aGlzLnN0YXRlLmxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogUm91dGVyLmNvbXB1dGVSb290TWF0Y2godGhpcy5zdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSksXG4gICAgICAgIHN0YXRpY0NvbnRleHQ6IHRoaXMucHJvcHMuc3RhdGljQ29udGV4dFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgaGlzdG9yeTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByZXZQcm9wcy5oaXN0b3J5ID09PSB0aGlzLnByb3BzLmhpc3RvcnksIFwiWW91IGNhbm5vdCBjaGFuZ2UgPFJvdXRlciBoaXN0b3J5PlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHN0b3JlcyBsb2NhdGlvbiBpbiBtZW1vcnkuXG4gKi9cblxudmFyIE1lbW9yeVJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShNZW1vcnlSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1lbW9yeVJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1lbW9yeVJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1lbW9yeVJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBNZW1vcnlSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGluaXRpYWxFbnRyaWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5pdGlhbEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbiAgfTtcblxuICBNZW1vcnlSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8TWVtb3J5Um91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgTWVtb3J5Um91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbnZhciBMaWZlY3ljbGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTGlmZWN5Y2xlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IExpZmVjeWNsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VudCkgdGhpcy5wcm9wcy5vbk1vdW50LmNhbGwodGhpcywgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVwZGF0ZSkgdGhpcy5wcm9wcy5vblVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMsIHByZXZQcm9wcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Vbm1vdW50KSB0aGlzLnByb3BzLm9uVW5tb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIExpZmVjeWNsZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHJvbXB0aW5nIHRoZSB1c2VyIGJlZm9yZSBuYXZpZ2F0aW5nIGF3YXkgZnJvbSBhIHNjcmVlbi5cbiAqL1xuXG5mdW5jdGlvbiBQcm9tcHQoX3JlZikge1xuICB2YXIgbWVzc2FnZSA9IF9yZWYubWVzc2FnZSxcbiAgICAgIF9yZWYkd2hlbiA9IF9yZWYud2hlbixcbiAgICAgIHdoZW4gPSBfcmVmJHdoZW4gPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJHdoZW47XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxQcm9tcHQ+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgaWYgKCF3aGVuIHx8IGNvbnRleHQkJDEuc3RhdGljQ29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG1ldGhvZCA9IGNvbnRleHQkJDEuaGlzdG9yeS5ibG9jaztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLm1lc3NhZ2UgIT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblVubW91bnQ6IGZ1bmN0aW9uIG9uVW5tb3VudChzZWxmKSB7XG4gICAgICAgIHNlbGYucmVsZWFzZSgpO1xuICAgICAgfSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIG1lc3NhZ2VUeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5zdHJpbmddKTtcbiAgUHJvbXB0LnByb3BUeXBlcyA9IHtcbiAgICB3aGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtZXNzYWdlOiBtZXNzYWdlVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSA9IHt9O1xudmFyIGNhY2hlTGltaXQgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50ID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0aCkge1xuICBpZiAoY2FjaGVbcGF0aF0pIHJldHVybiBjYWNoZVtwYXRoXTtcbiAgdmFyIGdlbmVyYXRvciA9IHBhdGhUb1JlZ2V4cC5jb21waWxlKHBhdGgpO1xuXG4gIGlmIChjYWNoZUNvdW50IDwgY2FjaGVMaW1pdCkge1xuICAgIGNhY2hlW3BhdGhdID0gZ2VuZXJhdG9yO1xuICAgIGNhY2hlQ291bnQrKztcbiAgfVxuXG4gIHJldHVybiBnZW5lcmF0b3I7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIGdlbmVyYXRpbmcgYSBVUkwgcGF0aG5hbWUgZnJvbSBhIHBhdGggYW5kIHBhcmFtZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBhdGgocGF0aCwgcGFyYW1zKSB7XG4gIGlmIChwYXRoID09PSB2b2lkIDApIHtcbiAgICBwYXRoID0gXCIvXCI7XG4gIH1cblxuICBpZiAocGFyYW1zID09PSB2b2lkIDApIHtcbiAgICBwYXJhbXMgPSB7fTtcbiAgfVxuXG4gIHJldHVybiBwYXRoID09PSBcIi9cIiA/IHBhdGggOiBjb21waWxlUGF0aChwYXRoKShwYXJhbXMsIHtcbiAgICBwcmV0dHk6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG5hdmlnYXRpbmcgcHJvZ3JhbW1hdGljYWxseSB3aXRoIGEgY29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIFJlZGlyZWN0KF9yZWYpIHtcbiAgdmFyIGNvbXB1dGVkTWF0Y2ggPSBfcmVmLmNvbXB1dGVkTWF0Y2gsXG4gICAgICB0byA9IF9yZWYudG8sXG4gICAgICBfcmVmJHB1c2ggPSBfcmVmLnB1c2gsXG4gICAgICBwdXNoID0gX3JlZiRwdXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkcHVzaDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJlZGlyZWN0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dCQkMS5oaXN0b3J5LFxuICAgICAgICBzdGF0aWNDb250ZXh0ID0gY29udGV4dCQkMS5zdGF0aWNDb250ZXh0O1xuICAgIHZhciBtZXRob2QgPSBwdXNoID8gaGlzdG9yeS5wdXNoIDogaGlzdG9yeS5yZXBsYWNlO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKGNvbXB1dGVkTWF0Y2ggPyB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBnZW5lcmF0ZVBhdGgodG8sIGNvbXB1dGVkTWF0Y2gucGFyYW1zKSA6IF9leHRlbmRzKHt9LCB0bywge1xuICAgICAgcGF0aG5hbWU6IGdlbmVyYXRlUGF0aCh0by5wYXRobmFtZSwgY29tcHV0ZWRNYXRjaC5wYXJhbXMpXG4gICAgfSkgOiB0byk7IC8vIFdoZW4gcmVuZGVyaW5nIGluIGEgc3RhdGljIGNvbnRleHQsXG4gICAgLy8gc2V0IHRoZSBuZXcgbG9jYXRpb24gaW1tZWRpYXRlbHkuXG5cbiAgICBpZiAoc3RhdGljQ29udGV4dCkge1xuICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpZmVjeWNsZSwge1xuICAgICAgb25Nb3VudDogZnVuY3Rpb24gb25Nb3VudCgpIHtcbiAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIH0sXG4gICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoc2VsZiwgcHJldlByb3BzKSB7XG4gICAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwcmV2UHJvcHMudG8pO1xuXG4gICAgICAgIGlmICghbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICAgICAgICBrZXk6IHByZXZMb2NhdGlvbi5rZXlcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvOiB0b1xuICAgIH0pO1xuICB9KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gICAgcHVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZnJvbTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0bzogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLmlzUmVxdWlyZWRcbiAgfTtcbn1cblxudmFyIGNhY2hlJDEgPSB7fTtcbnZhciBjYWNoZUxpbWl0JDEgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50JDEgPSAwO1xuXG5mdW5jdGlvbiBjb21waWxlUGF0aCQxKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJcIiArIG9wdGlvbnMuZW5kICsgb3B0aW9ucy5zdHJpY3QgKyBvcHRpb25zLnNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhDYWNoZSA9IGNhY2hlJDFbY2FjaGVLZXldIHx8IChjYWNoZSQxW2NhY2hlS2V5XSA9IHt9KTtcbiAgaWYgKHBhdGhDYWNoZVtwYXRoXSkgcmV0dXJuIHBhdGhDYWNoZVtwYXRoXTtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHJlZ2V4cCA9IHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICByZWdleHA6IHJlZ2V4cCxcbiAgICBrZXlzOiBrZXlzXG4gIH07XG5cbiAgaWYgKGNhY2hlQ291bnQkMSA8IGNhY2hlTGltaXQkMSkge1xuICAgIHBhdGhDYWNoZVtwYXRoXSA9IHJlc3VsdDtcbiAgICBjYWNoZUNvdW50JDErKztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgVVJMIHBhdGhuYW1lIHRvIGEgcGF0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoUGF0aChwYXRobmFtZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSBvcHRpb25zID0ge1xuICAgIHBhdGg6IG9wdGlvbnNcbiAgfTtcbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBhdGggPSBfb3B0aW9ucy5wYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0LFxuICAgICAgX29wdGlvbnMkc2Vuc2l0aXZlID0gX29wdGlvbnMuc2Vuc2l0aXZlLFxuICAgICAgc2Vuc2l0aXZlID0gX29wdGlvbnMkc2Vuc2l0aXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhzID0gW10uY29uY2F0KHBhdGgpO1xuICByZXR1cm4gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAobWF0Y2hlZCkgcmV0dXJuIG1hdGNoZWQ7XG5cbiAgICB2YXIgX2NvbXBpbGVQYXRoID0gY29tcGlsZVBhdGgkMShwYXRoLCB7XG4gICAgICBlbmQ6IGV4YWN0LFxuICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICBzZW5zaXRpdmU6IHNlbnNpdGl2ZVxuICAgIH0pLFxuICAgICAgICByZWdleHAgPSBfY29tcGlsZVBhdGgucmVnZXhwLFxuICAgICAgICBrZXlzID0gX2NvbXBpbGVQYXRoLmtleXM7XG5cbiAgICB2YXIgbWF0Y2ggPSByZWdleHAuZXhlYyhwYXRobmFtZSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHVybCA9IG1hdGNoWzBdLFxuICAgICAgICB2YWx1ZXMgPSBtYXRjaC5zbGljZSgxKTtcbiAgICB2YXIgaXNFeGFjdCA9IHBhdGhuYW1lID09PSB1cmw7XG4gICAgaWYgKGV4YWN0ICYmICFpc0V4YWN0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIC8vIHRoZSBwYXRoIHVzZWQgdG8gbWF0Y2hcbiAgICAgIHVybDogcGF0aCA9PT0gXCIvXCIgJiYgdXJsID09PSBcIlwiID8gXCIvXCIgOiB1cmwsXG4gICAgICAvLyB0aGUgbWF0Y2hlZCBwb3J0aW9uIG9mIHRoZSBVUkxcbiAgICAgIGlzRXhhY3Q6IGlzRXhhY3QsXG4gICAgICAvLyB3aGV0aGVyIG9yIG5vdCB3ZSBtYXRjaGVkIGV4YWN0bHlcbiAgICAgIHBhcmFtczoga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSwgaW5kZXgpIHtcbiAgICAgICAgbWVtb1trZXkubmFtZV0gPSB2YWx1ZXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgIH0sIHt9KVxuICAgIH07XG4gIH0sIG51bGwpO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA9PT0gMDtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG5cbnZhciBSb3V0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZT4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQkJDEubG9jYXRpb247XG4gICAgICB2YXIgbWF0Y2ggPSBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoID8gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCAvLyA8U3dpdGNoPiBhbHJlYWR5IGNvbXB1dGVkIHRoZSBtYXRjaCBmb3IgdXNcbiAgICAgIDogX3RoaXMucHJvcHMucGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX3RoaXMucHJvcHMpIDogY29udGV4dCQkMS5tYXRjaDtcblxuICAgICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIGNvbnRleHQkJDEsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogbWF0Y2hcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNvbXBvbmVudCA9IF90aGlzJHByb3BzLmNvbXBvbmVudCxcbiAgICAgICAgICByZW5kZXIgPSBfdGhpcyRwcm9wcy5yZW5kZXI7IC8vIFByZWFjdCB1c2VzIGFuIGVtcHR5IGFycmF5IGFzIGNoaWxkcmVuIGJ5XG4gICAgICAvLyBkZWZhdWx0LCBzbyB1c2UgbnVsbCBpZiB0aGF0J3MgdGhlIGNhc2UuXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbihwcm9wcyk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IF90aGlzLnByb3BzLnBhdGg7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCBcIllvdSByZXR1cm5lZCBgdW5kZWZpbmVkYCBmcm9tIHRoZSBgY2hpbGRyZW5gIGZ1bmN0aW9uIG9mIFwiICsgKFwiPFJvdXRlXCIgKyAocGF0aCA/IFwiIHBhdGg9XFxcIlwiICsgcGF0aCArIFwiXFxcIlwiIDogXCJcIikgKyBcIj4sIGJ1dCB5b3UgXCIpICsgXCJzaG91bGQgaGF2ZSByZXR1cm5lZCBhIFJlYWN0IGVsZW1lbnQgb3IgYG51bGxgXCIpIDogdm9pZCAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIHZhbHVlOiBwcm9wc1xuICAgICAgfSwgY2hpbGRyZW4gJiYgIWlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikgPyBjaGlsZHJlbiA6IHByb3BzLm1hdGNoID8gY29tcG9uZW50ID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKSA6IHJlbmRlciA/IHJlbmRlcihwcm9wcykgOiBudWxsIDogbnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY29tcG9uZW50OiBmdW5jdGlvbiBjb21wb25lbnQocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICYmICFpc1ZhbGlkRWxlbWVudFR5cGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wICdjb21wb25lbnQnIHN1cHBsaWVkIHRvICdSb3V0ZSc6IHRoZSBwcm9wIGlzIG5vdCBhIHZhbGlkIFJlYWN0IGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwYXRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuICAgIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2Vuc2l0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5jb21wb25lbnQpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNvbXBvbmVudD4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgcmVuZGVyPiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgcmVuZGVyPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIiA/IHBhdGggOiBcIi9cIiArIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKSArIGxvY2F0aW9uLnBhdGhuYW1lXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoYmFzZS5sZW5ndGgpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXRpY0hhbmRsZXIobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3UgY2Fubm90ICVzIHdpdGggPFN0YXRpY1JvdXRlcj5cIiwgbWV0aG9kTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxuICogVGhlIHB1YmxpYyB0b3AtbGV2ZWwgQVBJIGZvciBhIFwic3RhdGljXCIgPFJvdXRlcj4sIHNvLWNhbGxlZCBiZWNhdXNlIGl0XG4gKiBjYW4ndCBhY3R1YWxseSBjaGFuZ2UgdGhlIGN1cnJlbnQgbG9jYXRpb24uIEluc3RlYWQsIGl0IGp1c3QgcmVjb3Jkc1xuICogbG9jYXRpb24gY2hhbmdlcyBpbiBhIGNvbnRleHQgb2JqZWN0LiBVc2VmdWwgbWFpbmx5IGluIHRlc3RpbmcgYW5kXG4gKiBzZXJ2ZXItcmVuZGVyaW5nIHNjZW5hcmlvcy5cbiAqL1xuXG5cbnZhciBTdGF0aWNSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoU3RhdGljUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTdGF0aWNSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfdGhpcy5oYW5kbGVQdXNoID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJQVVNIXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVSZXBsYWNlID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJSRVBMQUNFXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVMaXN0ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFN0YXRpY1JvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm5hdmlnYXRlVG8gPSBmdW5jdGlvbiBuYXZpZ2F0ZVRvKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICB2YXIgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wcyRiYXNlbmFtZSA9IF90aGlzJHByb3BzLmJhc2VuYW1lLFxuICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzJGNvbnRleHQgPSBfdGhpcyRwcm9wcy5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wcyRjb250ZXh0O1xuICAgIGNvbnRleHQuYWN0aW9uID0gYWN0aW9uO1xuICAgIGNvbnRleHQubG9jYXRpb24gPSBhZGRCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKTtcbiAgICBjb250ZXh0LnVybCA9IGNyZWF0ZVVSTChjb250ZXh0LmxvY2F0aW9uKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMyJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMyJGJhc2VuYW1lLFxuICAgICAgICBfdGhpcyRwcm9wczIkY29udGV4dCA9IF90aGlzJHByb3BzMi5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMyJGNvbnRleHQgPT09IHZvaWQgMCA/IHt9IDogX3RoaXMkcHJvcHMyJGNvbnRleHQsXG4gICAgICAgIF90aGlzJHByb3BzMiRsb2NhdGlvbiA9IF90aGlzJHByb3BzMi5sb2NhdGlvbixcbiAgICAgICAgbG9jYXRpb24gPSBfdGhpcyRwcm9wczIkbG9jYXRpb24gPT09IHZvaWQgMCA/IFwiL1wiIDogX3RoaXMkcHJvcHMyJGxvY2F0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMyLCBbXCJiYXNlbmFtZVwiLCBcImNvbnRleHRcIiwgXCJsb2NhdGlvblwiXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IHtcbiAgICAgIGNyZWF0ZUhyZWY6IGZ1bmN0aW9uIGNyZWF0ZUhyZWYocGF0aCkge1xuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lICsgY3JlYXRlVVJMKHBhdGgpKTtcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IFwiUE9QXCIsXG4gICAgICBsb2NhdGlvbjogc3RyaXBCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKSxcbiAgICAgIHB1c2g6IHRoaXMuaGFuZGxlUHVzaCxcbiAgICAgIHJlcGxhY2U6IHRoaXMuaGFuZGxlUmVwbGFjZSxcbiAgICAgIGdvOiBzdGF0aWNIYW5kbGVyKFwiZ29cIiksXG4gICAgICBnb0JhY2s6IHN0YXRpY0hhbmRsZXIoXCJnb0JhY2tcIiksXG4gICAgICBnb0ZvcndhcmQ6IHN0YXRpY0hhbmRsZXIoXCJnb0ZvcndhcmRcIiksXG4gICAgICBsaXN0ZW46IHRoaXMuaGFuZGxlTGlzdGVuLFxuICAgICAgYmxvY2s6IHRoaXMuaGFuZGxlQmxvY2tcbiAgICB9O1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgIGhpc3Rvcnk6IGhpc3RvcnksXG4gICAgICBzdGF0aWNDb250ZXh0OiBjb250ZXh0XG4gICAgfSkpO1xuICB9O1xuXG4gIHJldHVybiBTdGF0aWNSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3RhdGljUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSlcbiAgfTtcblxuICBTdGF0aWNSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8U3RhdGljUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgU3RhdGljUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyB0aGUgZmlyc3QgPFJvdXRlPiB0aGF0IG1hdGNoZXMuXG4gKi9cblxudmFyIFN3aXRjaCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTd2l0Y2gsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN3aXRjaCgpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3dpdGNoLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxTd2l0Y2g+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JCQxLmxvY2F0aW9uO1xuICAgICAgdmFyIGVsZW1lbnQsIG1hdGNoOyAvLyBXZSB1c2UgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCBpbnN0ZWFkIG9mIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoKS5maW5kKClcbiAgICAgIC8vIGhlcmUgYmVjYXVzZSB0b0FycmF5IGFkZHMga2V5cyB0byBhbGwgY2hpbGQgZWxlbWVudHMgYW5kIHdlIGRvIG5vdCB3YW50XG4gICAgICAvLyB0byB0cmlnZ2VyIGFuIHVubW91bnQvcmVtb3VudCBmb3IgdHdvIDxSb3V0ZT5zIHRoYXQgcmVuZGVyIHRoZSBzYW1lXG4gICAgICAvLyBjb21wb25lbnQgYXQgZGlmZmVyZW50IFVSTHMuXG5cbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goX3RoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAobWF0Y2ggPT0gbnVsbCAmJiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICBlbGVtZW50ID0gY2hpbGQ7XG4gICAgICAgICAgdmFyIHBhdGggPSBjaGlsZC5wcm9wcy5wYXRoIHx8IGNoaWxkLnByb3BzLmZyb207XG4gICAgICAgICAgbWF0Y2ggPSBwYXRoID8gbWF0Y2hQYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBfZXh0ZW5kcyh7fSwgY2hpbGQucHJvcHMsIHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgICB9KSkgOiBjb250ZXh0JCQxLm1hdGNoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaCA/IFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgY29tcHV0ZWRNYXRjaDogbWF0Y2hcbiAgICAgIH0pIDogbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3dpdGNoO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgU3dpdGNoLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISghdGhpcy5wcm9wcy5sb2NhdGlvbiAmJiBwcmV2UHJvcHMubG9jYXRpb24pLCAnPFN3aXRjaD4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBwcm92aWRlZCBhIFwibG9jYXRpb25cIiBwcm9wIGluaXRpYWxseSBidXQgb21pdHRlZCBpdCBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIEEgcHVibGljIGhpZ2hlci1vcmRlciBjb21wb25lbnQgdG8gYWNjZXNzIHRoZSBpbXBlcmF0aXZlIEFQSVxuICovXG5cbmZ1bmN0aW9uIHdpdGhSb3V0ZXIoQ29tcG9uZW50KSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IFwid2l0aFJvdXRlcihcIiArIChDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUpICsgXCIpXCI7XG5cbiAgdmFyIEMgPSBmdW5jdGlvbiBDKHByb3BzKSB7XG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnRSZWYgPSBwcm9wcy53cmFwcGVkQ29tcG9uZW50UmVmLFxuICAgICAgICByZW1haW5pbmdQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHByb3BzLCBbXCJ3cmFwcGVkQ29tcG9uZW50UmVmXCJdKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFwiICsgZGlzcGxheU5hbWUgKyBcIiAvPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVtYWluaW5nUHJvcHMsIGNvbnRleHQkJDEsIHtcbiAgICAgICAgcmVmOiB3cmFwcGVkQ29tcG9uZW50UmVmXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICBDLldyYXBwZWRDb21wb25lbnQgPSBDb21wb25lbnQ7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIEMucHJvcFR5cGVzID0ge1xuICAgICAgd3JhcHBlZENvbXBvbmVudFJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5vYmplY3RdKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9pc3RTdGF0aWNzKEMsIENvbXBvbmVudCk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgZ2xvYmFsID0gd2luZG93O1xuICAgIHZhciBrZXkgPSBcIl9fcmVhY3Rfcm91dGVyX2J1aWxkX19cIjtcbiAgICB2YXIgYnVpbGROYW1lcyA9IHtcbiAgICAgIGNqczogXCJDb21tb25KU1wiLFxuICAgICAgZXNtOiBcIkVTIG1vZHVsZXNcIixcbiAgICAgIHVtZDogXCJVTURcIlxuICAgIH07XG5cbiAgICBpZiAoZ2xvYmFsW2tleV0gJiYgZ2xvYmFsW2tleV0gIT09IFwiZXNtXCIpIHtcbiAgICAgIHZhciBpbml0aWFsQnVpbGROYW1lID0gYnVpbGROYW1lc1tnbG9iYWxba2V5XV07XG4gICAgICB2YXIgc2Vjb25kYXJ5QnVpbGROYW1lID0gYnVpbGROYW1lc1tcImVzbVwiXTsgLy8gVE9ETzogQWRkIGxpbmsgdG8gYXJ0aWNsZSB0aGF0IGV4cGxhaW5zIGluIGRldGFpbCBob3cgdG8gYXZvaWRcbiAgICAgIC8vIGxvYWRpbmcgMiBkaWZmZXJlbnQgYnVpbGRzLlxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlIGxvYWRpbmcgdGhlIFwiICsgc2Vjb25kYXJ5QnVpbGROYW1lICsgXCIgYnVpbGQgb2YgUmVhY3QgUm91dGVyIFwiICsgKFwib24gYSBwYWdlIHRoYXQgaXMgYWxyZWFkeSBydW5uaW5nIHRoZSBcIiArIGluaXRpYWxCdWlsZE5hbWUgKyBcIiBcIikgKyBcImJ1aWxkLCBzbyB0aGluZ3Mgd29uJ3Qgd29yayByaWdodC5cIik7XG4gICAgfVxuXG4gICAgZ2xvYmFsW2tleV0gPSBcImVzbVwiO1xuICB9XG59XG5cbmV4cG9ydCB7IE1lbW9yeVJvdXRlciwgUHJvbXB0LCBSZWRpcmVjdCwgUm91dGUsIFJvdXRlciwgU3RhdGljUm91dGVyLCBTd2l0Y2gsIGdlbmVyYXRlUGF0aCwgbWF0Y2hQYXRoLCB3aXRoUm91dGVyLCBjb250ZXh0IGFzIF9fUm91dGVyQ29udGV4dCB9O1xuIiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlciwgX19Sb3V0ZXJDb250ZXh0LCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuZXhwb3J0ICogZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgY3JlYXRlTG9jYXRpb24gfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIEhUTUw1IGhpc3RvcnkuXG4gKi9cblxudmFyIEJyb3dzZXJSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoQnJvd3NlclJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQnJvd3NlclJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBCcm93c2VyUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQnJvd3NlclJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBCcm93c2VyUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9yY2VSZWZyZXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXJcbiAgfTtcblxuICBCcm93c2VyUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPEJyb3dzZXJSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIHdpbmRvdy5sb2NhdGlvbi5oYXNoLlxuICovXG5cbnZhciBIYXNoUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEhhc2hSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEhhc2hSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSGFzaFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEhhc2hSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgSGFzaFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhc2hUeXBlOiBQcm9wVHlwZXMub25lT2YoW1wiaGFzaGJhbmdcIiwgXCJub3NsYXNoXCIsIFwic2xhc2hcIl0pXG4gIH07XG5cbiAgSGFzaFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxIYXNoUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgSGFzaFJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIGEgaGlzdG9yeS1hd2FyZSA8YT4uXG4gKi9cblxuXG52YXIgTGluayA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaW5rKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaW5rLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCwgaGlzdG9yeSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuXG4gICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBpZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgICAhdGhpcy5wcm9wcy50YXJnZXQgfHwgdGhpcy5wcm9wcy50YXJnZXQgPT09IFwiX3NlbGZcIikgJiYgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAhaXNNb2RpZmllZEV2ZW50KGV2ZW50KSAvLyBpZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wcm9wcy5yZXBsYWNlID8gaGlzdG9yeS5yZXBsYWNlIDogaGlzdG9yeS5wdXNoO1xuICAgICAgICBtZXRob2QodGhpcy5wcm9wcy50byk7XG4gICAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgaW5uZXJSZWYgPSBfdGhpcyRwcm9wcy5pbm5lclJlZixcbiAgICAgICAgcmVwbGFjZSA9IF90aGlzJHByb3BzLnJlcGxhY2UsXG4gICAgICAgIHRvID0gX3RoaXMkcHJvcHMudG8sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wcywgW1wiaW5uZXJSZWZcIiwgXCJyZXBsYWNlXCIsIFwidG9cIl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGNyZWF0ZUxvY2F0aW9uKHRvLCBudWxsLCBudWxsLCBjb250ZXh0LmxvY2F0aW9uKSA6IHRvO1xuICAgICAgdmFyIGhyZWYgPSBsb2NhdGlvbiA/IGNvbnRleHQuaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKSA6IFwiXCI7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVDbGljayhldmVudCwgY29udGV4dC5oaXN0b3J5KTtcbiAgICAgICAgfSxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgcmVmOiBpbm5lclJlZlxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBMaW5rO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciB0b1R5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSk7XG4gIHZhciBpbm5lclJlZlR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBjdXJyZW50OiBQcm9wVHlwZXMuYW55XG4gIH0pXSk7XG4gIExpbmsucHJvcFR5cGVzID0ge1xuICAgIGlubmVyUmVmOiBpbm5lclJlZlR5cGUsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVwbGFjZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvOiB0b1R5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBqb2luQ2xhc3NuYW1lcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzbmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2xhc3NuYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc25hbWVzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5qb2luKFwiIFwiKTtcbn1cbi8qKlxuICogQSA8TGluaz4gd3JhcHBlciB0aGF0IGtub3dzIGlmIGl0J3MgXCJhY3RpdmVcIiBvciBub3QuXG4gKi9cblxuXG5mdW5jdGlvbiBOYXZMaW5rKF9yZWYpIHtcbiAgdmFyIF9yZWYkYXJpYUN1cnJlbnQgPSBfcmVmW1wiYXJpYS1jdXJyZW50XCJdLFxuICAgICAgYXJpYUN1cnJlbnQgPSBfcmVmJGFyaWFDdXJyZW50ID09PSB2b2lkIDAgPyBcInBhZ2VcIiA6IF9yZWYkYXJpYUN1cnJlbnQsXG4gICAgICBfcmVmJGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYuYWN0aXZlQ2xhc3NOYW1lLFxuICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3JlZiRhY3RpdmVDbGFzc05hbWUgPT09IHZvaWQgMCA/IFwiYWN0aXZlXCIgOiBfcmVmJGFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZVN0eWxlID0gX3JlZi5hY3RpdmVTdHlsZSxcbiAgICAgIGNsYXNzTmFtZVByb3AgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGV4YWN0ID0gX3JlZi5leGFjdCxcbiAgICAgIGlzQWN0aXZlUHJvcCA9IF9yZWYuaXNBY3RpdmUsXG4gICAgICBsb2NhdGlvblByb3AgPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgc3RyaWN0ID0gX3JlZi5zdHJpY3QsXG4gICAgICBzdHlsZVByb3AgPSBfcmVmLnN0eWxlLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImFyaWEtY3VycmVudFwiLCBcImFjdGl2ZUNsYXNzTmFtZVwiLCBcImFjdGl2ZVN0eWxlXCIsIFwiY2xhc3NOYW1lXCIsIFwiZXhhY3RcIiwgXCJpc0FjdGl2ZVwiLCBcImxvY2F0aW9uXCIsIFwic3RyaWN0XCIsIFwic3R5bGVcIiwgXCJ0b1wiXSk7XG5cbiAgdmFyIHBhdGggPSB0eXBlb2YgdG8gPT09IFwib2JqZWN0XCIgPyB0by5wYXRobmFtZSA6IHRvOyAvLyBSZWdleCB0YWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vcGlsbGFyanMvcGF0aC10by1yZWdleHAvYmxvYi9tYXN0ZXIvaW5kZXguanMjTDIwMlxuXG4gIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPE5hdkxpbms+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHBhdGhUb01hdGNoID0gbG9jYXRpb25Qcm9wID8gbG9jYXRpb25Qcm9wLnBhdGhuYW1lIDogY29udGV4dC5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgbWF0Y2ggPSBlc2NhcGVkUGF0aCA/IG1hdGNoUGF0aChwYXRoVG9NYXRjaCwge1xuICAgICAgcGF0aDogZXNjYXBlZFBhdGgsXG4gICAgICBleGFjdDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdFxuICAgIH0pIDogbnVsbDtcbiAgICB2YXIgaXNBY3RpdmUgPSAhIShpc0FjdGl2ZVByb3AgPyBpc0FjdGl2ZVByb3AobWF0Y2gsIGNvbnRleHQubG9jYXRpb24pIDogbWF0Y2gpO1xuICAgIHZhciBjbGFzc05hbWUgPSBpc0FjdGl2ZSA/IGpvaW5DbGFzc25hbWVzKGNsYXNzTmFtZVByb3AsIGFjdGl2ZUNsYXNzTmFtZSkgOiBjbGFzc05hbWVQcm9wO1xuICAgIHZhciBzdHlsZSA9IGlzQWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlUHJvcCwgYWN0aXZlU3R5bGUpIDogc3R5bGVQcm9wO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIF9leHRlbmRzKHtcbiAgICAgIFwiYXJpYS1jdXJyZW50XCI6IGlzQWN0aXZlICYmIGFyaWFDdXJyZW50IHx8IG51bGwsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHRvOiB0b1xuICAgIH0sIHJlc3QpKTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIGFyaWFDdXJyZW50VHlwZSA9IFByb3BUeXBlcy5vbmVPZihbXCJwYWdlXCIsIFwic3RlcFwiLCBcImxvY2F0aW9uXCIsIFwiZGF0ZVwiLCBcInRpbWVcIiwgXCJ0cnVlXCJdKTtcbiAgTmF2TGluay5wcm9wVHlwZXMgPSBfZXh0ZW5kcyh7fSwgTGluay5wcm9wVHlwZXMsIHtcbiAgICBcImFyaWEtY3VycmVudFwiOiBhcmlhQ3VycmVudFR5cGUsXG4gICAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIExpbmssIE5hdkxpbmsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZW1haWxSZWdleCA9IC9bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8vXG5jb25zdCBwYXNzd29yZFJlZ2V4ID0gLygoPz0uKlxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbXFxXXSkuezgsNjR9KS9nXG5jb25zdCBlbWFpbFJlcXVpcmVtZW50cyA9IFwid3JvbmcgZW1haWwgZm9ybWF0XCJcbmNvbnN0IHBhc3Nwb3J0UmVxdWlyZW1lbnRzID0gXCJFbnN1cmUgdGhhdCBwYXNzd29yZCBpcyA4IHRvIDY0IGNoYXJhY3RlcnMgbG9uZyBhbmQgY29udGFpbnMgYSBtaXggb2YgdXBwZXIgYW5kIGxvd2VyIGNhc2UgY2hhcmFjdGVycywgb25lIG51bWVyaWMgYW5kIG9uZSBzcGVjaWFsIGNoYXJhY3RlclwiXG5cbmNvbnN0IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgZW1haWw6IHsgaXNWYWxpZDogdHJ1ZSwgbWVzc2FnZTogXCJcIiB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIGlzVmFsaWQ6IHRydWUsIG1lc3NhZ2U6IFwiXCJcbiAgICB9XG59XG5cbmNvbnN0IGlzVmFsaWQgPSAoeyBlbWFpbCA9IHVuZGVmaW5lZCwgcGFzc3dvcmQgPSB1bmRlZmluZWQgfSkgPT4ge1xuICAgIGxldCBlbWFpbFZhbGlkYXRpb24gPSB0cnVlXG4gICAgbGV0IHBhc3N3b3JkVmFsaWRhdGlvbiA9IHRydWVcbiAgICBpZiAoZW1haWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbWFpbFZhbGlkYXRpb24gPSBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpID8geyBpc1ZhbGlkOiB0cnVlIH0gOiB7IGlzVmFsaWQ6IGZhbHNlLCBtZXNzYWdlOiBlbWFpbFJlcXVpcmVtZW50cyB9XG4gICAgfVxuICAgIGlmIChwYXNzd29yZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhc3N3b3JkVmFsaWRhdGlvbiA9IHBhc3N3b3JkUmVnZXgudGVzdChwYXNzd29yZCkgPyB7IGlzVmFsaWQ6IHRydWUgfSA6IHsgaXNWYWxpZDogZmFsc2UsIG1lc3NhZ2U6IHBhc3Nwb3J0UmVxdWlyZW1lbnRzIH1cbiAgICB9XG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHsgZW1haWw6IGVtYWlsVmFsaWRhdGlvbiwgcGFzc3dvcmQ6IHBhc3N3b3JkVmFsaWRhdGlvbiB9XG4gICAgcmV0dXJuIChzZWxmKSA9PiB7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLnZhbGlkYXRpb25SZXN1bHQgfSB9KVxuICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdC5lbWFpbC5pc1ZhbGlkICYmIHZhbGlkYXRpb25SZXN1bHQucGFzc3dvcmQuaXNWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbi8vZXhwb3J0IGRlZmF1bHQgaXNWYWxpZFxuZXhwb3J0IHtcbiAgICBpbml0aWFsVmFsaWRhdGlvblN0YXRlLFxuICAgIGlzVmFsaWRcbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmXG4gICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgLy8gT25seSBOb2RlLkpTIGhhcyBhIHByb2Nlc3MgdmFyaWFibGUgdGhhdCBpcyBvZiBbW0NsYXNzXV0gcHJvY2Vzc1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdXRpbHMuZm9yRWFjaChbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXSwgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJyxcbiAgICAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJyxcbiAgICAnc29ja2V0UGF0aCdcbiAgXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QgPyBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAnZ2V0JztcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2lzVmFsaWQsaW5pdGlhbFZhbGlkYXRpb25TdGF0ZX0gZnJvbSAnQGF1dGhqcy92YWxpZGF0aW9uJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuZXhwb3J0IGNvbnN0IEVtYWlsUGFzc3dvcmRDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpXG5cblxuXG5jbGFzcyBFbWFpbFBhc3N3b3JkUHJvdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRlID0geyBsb2FkaW5nOiBmYWxzZSwgdG9rZW46IFwiXCIsIGlzTG9nZ2VkSW46IGZhbHNlLCBlbWFpbDogXCJcIiwgcGFzc3dvcmQ6IFwiXCIsIGNvbmZpcm06IFwiXCIsIHNlcnZlckVycm9yOiBcIlwiLCB2YWxpZGF0aW9uOiBpbml0aWFsVmFsaWRhdGlvblN0YXRlIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ2dlZEluKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgc2V0VG9rZW4gPSAoeyB0b2tlbiB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2tlbiB9KVxuICAgIH1cbiAgICBvbkNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiB2YWx1ZSB9KVxuICAgICAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgfVxuICAgIHJlc2V0VmFsaWRhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfSlcbiAgICB9XG4gICAgcmVjb3ZlclBhc3N3b3JkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGVtYWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAvLyAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHZhbGlkYXRlKHsgZW1haWwgfSlcbiAgICAgIC8vICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsfSkodGhpcykpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9yZWNvdmVyJywgeyBlbWFpbCB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZGF0aW9uLmVtYWlsLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHBhc3N3b3JkLCB0b2tlbiB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoaXNWYWxpZCh7cGFzc3dvcmR9KSh0aGlzKSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2NoYW5nZScsIHsgcGFzc3dvcmQsIHRva2VuIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiBkYXRhLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpZ251cCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsLHBhc3N3b3JkfSkodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL3NpZ251cCcsIHsgZW1haWwsIHBhc3N3b3JkIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgICAgIC8vU2VydmVyIHNpZGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0sbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IHRydWUsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oZGF0YS50b2tlbik7IC8vIFNldHRpbmcgdGhlIHRva2VuIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbm90IHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG59XG5cbiAgICBsb2dpbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsLHBhc3N3b3JkfSkodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgICAgICAvLyBHZXQgYSB0b2tlbiBmcm9tIGFwaSBzZXJ2ZXIgdXNpbmcgdGhlIGZldGNoIGFwaVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9sb2ctaW4nLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJheGlvcyByZXNwb25zZVwiLCByZXNwb25zZSlcbiAgICAgICAgICAgIC8vU2VydmVyIHNpZGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgaWYgKGRhdGEudG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oZGF0YS50b2tlbik7IC8vIFNldHRpbmcgdGhlIHRva2VuIGluIGxvY2FsU3RvcmFnZVxuXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvcixsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pXG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbm90IHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICB9XG4gICAgfVxuICAgIGxvZ2dlZEluID0gKCkgPT4ge1xuICAgICAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgYSBzYXZlZCB0b2tlbiBhbmQgaXQncyBzdGlsbCB2YWxpZFxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTsgLy8gR2V0dGluZyB0b2tlbiBmcm9tIGxvY2Fsc3RvcmFnZVxuICAgICAgICByZXR1cm4gISF0b2tlbiAmJiAhdGhpcy5pc1Rva2VuRXhwaXJlZCh0b2tlbik7IC8vIGhhbmR3YWl2aW5nIGhlcmVcbiAgICB9O1xuXG4gICAgaXNUb2tlbkV4cGlyZWQgPSB0b2tlbiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlKHRva2VuKTtcbiAgICAgICAgICAgIGlmIChkZWNvZGVkLmV4cCA8IERhdGUubm93KCkgLyAxMDAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdG9rZW4gaXMgZXhwaXJlZC5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNldFRva2VuID0gaWRUb2tlbiA9PiB7XG4gICAgICAgIC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRfdG9rZW5cIiwgaWRUb2tlbik7XG4gICAgfTtcblxuICAgIGdldFRva2VuID0gKCkgPT4ge1xuICAgICAgICAvLyBSZXRyaWV2ZXMgdGhlIHVzZXIgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IGZhbHNlLCB1c2VybmFtZTogXCJcIiwgZXJyb3I6IFwiXCIsIG1lc3NhZ2U6IFwiXCIgfSlcbiAgICAgICAgLy8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGdldENvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgIC8vIFVzaW5nIGp3dC1kZWNvZGUgbnBtIHBhY2thZ2UgdG8gZGVjb2RlIHRoZSB0b2tlblxuICAgICAgICBsZXQgYW5zd2VyID0gZGVjb2RlKHRoaXMuZ2V0VG9rZW4oKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYW5zd2VyIVwiKTtcbiAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICB9O1xuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBpc0xvZ2dlZEluLCBlbWFpbCwgcGFzc3dvcmQsIHZhbGlkYXRpb24sIGNvbmZpcm0gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tcbiAgICAgICAgICAgIGxvZ2luOiB0aGlzLmxvZ2luLFxuICAgICAgICAgICAgaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGxvZ291dDogdGhpcy5sb2dvdXQsXG4gICAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgICAgc2lnbnVwOiB0aGlzLnNpZ251cCxcbiAgICAgICAgICAgIHJlc2V0UGFzc3dvcmQ6IHRoaXMucmVzZXRQYXNzd29yZCxcbiAgICAgICAgICAgIHJlY292ZXJQYXNzd29yZDogdGhpcy5yZWNvdmVyUGFzc3dvcmQsXG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgY29uZmlybSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgdmFsaWRhdGlvbixcbiAgICAgICAgICAgIHNldFRva2VuOiB0aGlzLnNldFRva2VuXG4gICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVtYWlsUGFzc3dvcmRQcm92aWRlciIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5jb25zdCBDdXN0b21JbnB1dCA9ICh7IHR5cGUsIHBsYWNlaG9sZGVyLCBuYW1lLCB2YWxpZGF0aW9uLCBvbkNoYW5nZSwgdmFsdWUsIGxhYmVsIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGxhYmVsIGZvcmh0bWw9XCJwYXNzd29yZFwiPntsYWJlbH06IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2Zvcm0tY29udHJvbCcsIHsgJ2lzLWludmFsaWQnOiAhdmFsaWRhdGlvbi5pc1ZhbGlkIH0pfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbHVlPXt2YWx1ZX0gbmFtZT17bmFtZX0gdHlwZT17dHlwZX0gcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludmFsaWQtZmVlZGJhY2tcIj5cbiAgICAgICAgICAgIHt2YWxpZGF0aW9uLm1lc3NhZ2V9PC9kaXY+XG4gICAgPC9kaXY+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21JbnB1dCIsIlxuXG5cblxuXG5cblxuXG5jb25zdCBBc3luY0J1dHRvbiA9ICh7IHRpdGxlLCBsb2FkaW5nLCBvbkNsaWNrLCBkaXNhYmxlZCB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIn19PlxuICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIsIG1hcmdpblRvcDozLCBtYXJnaW5Cb3R0b206MyB9fSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtvbkNsaWNrfSBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgbG9hZGluZ30+e2xvYWRpbmcgPzxkaXY+PFByb2dyZXNzTG9hZGVyLz48ZGl2IHN0eWxlPXt7b3BhY2l0eTowfX0+e3RpdGxlfTwvZGl2PjwvZGl2Pjo8ZGl2Pnt0aXRsZX08L2Rpdj59PC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3luY0J1dHRvblxuXG5jb25zdCBQcm9ncmVzc0NpcmNsZSA9ICh7IHNlbGVjdGVkIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIHBhZGRpbmc6IDMsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDUwLFxuICAgICAgICAgICAgbWFyZ2luTGVmdDogNCxcbiAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZWN0ZWQgPyBcIiMxYTIzN2VcIiA6IFwiIzlmYThkYVwiXG4gICAgICAgIH19PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuXG5cblxuY2xhc3MgUHJvZ3Jlc3NMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHNlbGVjdGVkOiAwXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAwIH0pXG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAxIH0pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogMiB9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAwIH0pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAyMDApXG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICB3aWR0aDpcIjEwMCVcIixcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRvcDoyMCxcbiAgICAgICAgICAgICAgICBsZWZ0OjBcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0NpcmNsZSBzZWxlY3RlZD17c2VsZWN0ZWQgPT09IDB9IC8+XG4gICAgICAgICAgICAgICAgPFByb2dyZXNzQ2lyY2xlIHNlbGVjdGVkPXtzZWxlY3RlZCA9PT0gMX0gLz5cbiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3NDaXJjbGUgc2VsZWN0ZWQ9e3NlbGVjdGVkID09PSAyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5cbmltcG9ydCBCb290c3RyYXBBc3luY0J1dHRvbiBmcm9tICdAeGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24nXG5jb25zdCBMb2dpbiA9KCk9PntcbiAgICByZXR1cm4gKDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgeyh7ZW1haWwscGFzc3dvcmQsbG9naW4sb25DaGFuZ2UsdmFsaWRhdGlvbixpc0xvZ2dlZEluLGxvYWRpbmd9KT0+e1xuICAgICAgICAgICAgaWYoIWlzTG9nZ2VkSW4pXG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5Mb2dpbjo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIlBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcEFzeW5jQnV0dG9uIHRpdGxlPVwiTG9naW5cIiBvbkNsaWNrPXtsb2dpbn0gbG9hZGluZz17bG9hZGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL3JlY292ZXJcIj5Gb3Jnb3QgUGFzc3dvcmQgITwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPVwiL1wiIC8+XG4gICAgICAgIH19XG4gICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj4pXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9naW4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5pbXBvcnQge0Jvb3RzdHJhcElucHV0fSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1pbnB1dCdcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuY29uc3QgU2lnblVwID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgb25DaGFuZ2UsIGVtYWlsLCBwYXNzd29yZCwgc2lnbnVwLGxvYWRpbmcsIHZhbGlkYXRpb24sIGlzTG9nZ2VkSW4gfSkgPT4ge1xuICAgICAgICAgIGlmKCFpc0xvZ2dlZEluKVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5TaWduIFVwOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwQXN5bmNCdXR0b24gdGl0bGU9XCJTaWduVXBcIiBvbkNsaWNrPXtzaWdudXB9IGxvYWRpbmc9e2xvYWRpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiA8UmVkaXJlY3QgdG89XCIvXCIgLz5cbiAgICAgICAgfX08L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lnblVwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuY29uc3QgUmVjb3ZlclBhc3N3b3JkID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgZW1haWwsIG9uQ2hhbmdlLCB2YWxpZGF0aW9uLCByZWNvdmVyLGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5SZWNvdmVyIFBhc3N3b3JkOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIlJlY292ZXIgUGFzc3dvcmRcIiBvbkNsaWNrPXtyZWNvdmVyfSBsb2FkaW5nPXtsb2FkaW5nfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfX08L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjb3ZlclBhc3N3b3JkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuXG5jb25zdCBSZXNldFBhc3N3b3JkID0gKCkgPT4ge1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBwYXNzd29yZCwgY29uZmlybSwgcmVzZXRQYXNzd29yZCwgdmFsaWRhdGlvbixsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+UmVzZXQgUGFzc3dvcmQ6PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiTmV3IFBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIk5ldyBQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiQ29uZmlybSBQYXNzd29yZFwiIG5hbWU9XCJjb25maXJtXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e2NvbmZpcm19IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiQ29uZmlybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIlJlc2V0IFBhc3N3b3JkXCIgb25DbGljaz17cmVzZXRQYXNzd29yZH0gbG9hZGluZz17bG9hZGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH19PC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc2V0UGFzc3dvcmQiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmNvbnN0IG1vbmdvQ29sbGVjdGlvbiA9ICh7Y29sbGVjdGlvbixkYn0pID0+IHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbmRPbmU6ICh7ZmlsdGVyfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImZpbmRPbmVcIiwgY29sbGVjdGlvbixkYiwgZmlsdGVyIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmluZDogKHtmaWx0ZXJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiZmluZFwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIgfSB9KVxuICAgICAgICB9LFxuICAgICAgICBpbnNlcnRPbmU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImluc2VydE9uZVwiLCBjb2xsZWN0aW9uLGRiLCBkYXRhIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlT25lOiAoe2ZpbHRlcixkYXRhfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLnB1dChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcInVwZGF0ZU9uZVwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIsZGF0YSB9IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZU9uZTogKHtmaWx0ZXJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MuZGVsZXRlKGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiZGVsZXRlT25lXCIsIGNvbGxlY3Rpb24sZGIsIGZpbHRlciB9IH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29Db2xsZWN0aW9uXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBtb25nb1JlYWN0IGZyb20gJy4vbW9uZ29kYi1jbGllbnQnXG5leHBvcnQgY29uc3QgTW9uZ29kYkNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KClcblxuXG5jbGFzcyBNb25nb2RiUHJvdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIFxuICAgICBzdGF0ZT17b2JqZWN0czpbXSxsb2FkaW5nOmZhbHNlfVxuICBcbiAgICBmaW5kT25lPSh7ZmlsdGVyfSk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmZpbmRPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZmluZD0oKT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkuZmluZCh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmRlbGV0ZU9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLnVwZGF0ZU9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnNlcnRPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmluc2VydE9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRJbml0aWFsU3RhdGUgPSgpPT57XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2NoaWxkcmVufT0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4oPE1vbmdvQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e1xuICAgICAgICAgICAgICBzZXRJbml0aWFsU3RhdGU6dGhpcy5zZXRJbml0aWFsU3RhdGUsXG4gICAgICAgICAgICAgIGZpbmQ6dGhpcy5maW5kLFxuICAgICAgICAgICAgICBmaW5kT25lOnRoaXMuZmluZE9uZSxcbiAgICAgICAgICAgICAgdXBkYXRlT25lOnRoaXMudXBkYXRlT25lLFxuICAgICAgICAgICAgICBpbnNlcnRPbmU6dGhpcy5pbnNlcnRPbmUsXG4gICAgICAgICAgICAgIGRlbGV0ZU9uZTp0aGlzLmRlbGV0ZU9uZVxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L01vbmdvQ29udGV4dC5Qcm92aWRlcj4pXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTW9uZ29kYlByb3ZpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSB9IGZyb20gJ0BhdXRoanMvdmFsaWRhdGlvbidcbmltcG9ydCBtb25nb0RiQ2xpZW50IGZyb20gJ0Btb25nb2RianMvcmVhY3QnXG5jbGFzcyBFZGl0b3JSZWFjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0ZSA9IHsgb2JqZWN0czogW10sIHNlcnZlckVycm9yOiBcIlwiLCBsb2FkaW5nOiBmYWxzZSwgc2VsZWN0ZWRPYmplY3Q6IG51bGwsIHZhbGlkYXRpb246IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgY29uc3Qge2luaXRpYWxTdGF0ZX09IHRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5fc2V0SW5pdGlhbFN0YXRlKHtpbml0aWFsU3RhdGV9KVxuICAgIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRWRpdG9yIFJlYWN0IG1vdW50ZWRcIilcbiAgICAgIHRoaXMuZmluZCgpXG4gIH1cbiAgICBfc2V0SW5pdGlhbFN0YXRlPSgpPT57XG4gICAgICAgY29uc3Qge2luaXRpYWxTdGF0ZX09IHRoaXMucHJvcHNcbiAgICAgICBpZihpbml0aWFsU3RhdGUgIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+KHsuLi5wcmV2U3RhdGUsLi4uaW5pdGlhbFN0YXRlfSkpXG4gICAgICAgfVxuICAgIH1cbiAgICBvbkNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWVcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkT2JqZWN0OiB7IFtuYW1lXTogdmFsdWUgfSB9KVxuICAgIH1cblxuICAgIGZpbmQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0ge31cbiAgICAgICAgbW9uZ29EYkNsaWVudCh7IGNvbGxlY3Rpb24sIGRiIH0pLmZpbmQoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9iamVjdHM6IGRhdGEucmVzdWx0LCBsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLCBsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmaW5kT25lID0gKHsgaWQgfSkgPT4ge1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBfaWQ6IGlkIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lXCIsIGlkKVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGIgfSkuZmluZE9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2VsZWN0T25lID0gKHsgX2lkIH0pID0+IHsgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZE9iamVjdDogdGhpcy5zdGF0ZS5vYmplY3RzLmZpbmQoKHUpID0+IHUuX2lkID09PSBfaWQpIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlT25lID0gKHsgaWQsIGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBfaWQ6IGlkIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lXCIsIGlkKVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGJ9KS5maW5kT25lKHsgZmlsdGVyIH0sIHsgZGF0YSB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVPbmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IF9pZCB9ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZE9iamVjdFxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IF9pZCB9XG4gICAgICAgIG1vbmdvRGJDbGllbnQoeyBjb2xsZWN0aW9uLCBkYiB9KS5kZWxldGVPbmUoeyBmaWx0ZXIgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiAoeyBvYmplY3RzOiBzdGF0ZS5vYmplY3RzLmZpbHRlcigodSkgPT4gdS5faWQgIT09IF9pZCkgfSkpXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZU9uZSByZXN1bHRcIiwgcmVzdWx0KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZU9uZSBlcnJvclwiLCBlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgIHZhbGlkYXRpb259ID0gdGhpcy5zdGF0ZVxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXRlLS0tXCIsdGhpcy5zdGF0ZSlcbiAgICAgICAgcmV0dXJuICg8ZGl2PntjaGlsZHJlbih7b25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOnsuLi50aGlzLnN0YXRlfSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T25lOnRoaXMuc2VsZWN0T25lLFxuICAgICAgICAgICAgICAgICAgICBmaW5kOiB0aGlzLmZpbmQsXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9uZTogXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlT25lLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPbmU6IHRoaXMudXBkYXRlT25lfSl9PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yUmVhY3RcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuXG5jb25zdCBDb25maXJtYXRpb25EaWFsb2cgPSh7ZGVjbGluZSxjb25maXJtLCBjaGlsZHJlbixtb2RhbElkfSk9PntcbiAgICAgICAgcmV0dXJuKDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD17bW9kYWxJZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPkNvbmZpcm1hdGlvbiBpcyBuZWVkZWQ8L2g1PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17ZGVjbGluZX0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjb25maXJtfSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5PazwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtYXRpb25EaWFsb2ciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5jb25zdCBFZGl0b3JEaWFsb2cgPSh7Y2hpbGRyZW4sIHNhdmUsY2FuY2VsLG1vZGFsSWR9KT0+e1xuICAgIHJldHVybig8ZGl2PlxuPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e21vZGFsSWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgIDxoNSBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj5Nb2RhbCB0aXRsZTwvaDU+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17Y2FuY2VsfT5DbG9zZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtzYXZlfT5TYXZlIGNoYW5nZXM8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuICAgIDwvZGl2Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yRGlhbG9nIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuY29uc3QgVGFibGVSZW5kZXIgPSAoeyBjb2xsZWN0aW9uPVtdLHNlbGVjdE9uZSwgaGVhZGVycz1bXSwgVGFibGUsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ29sdW1uLCBUYWJsZUZvb3RlciwgVGFibGVIZWFkZXIgfSkgPT4ge1xuICAgY29uc29sZS5sb2coXCJjb2xsZWN0aW9uLS0tXCIsY29sbGVjdGlvbilcbiAgIHJldHVybiAgKDxUYWJsZT5cbiAgICAgICAgICAgIHtUYWJsZUhlYWRlciAmJiA8VGFibGVIZWFkZXI+XG4gICAgICAgICAgICAgICAge2hlYWRlcnMubGVuZ3RoPT09MCAmJmNvbGxlY3Rpb24ubGVuZ3RoPjAgJiYgT2JqZWN0LmtleXMoY29sbGVjdGlvblswXSkubWFwKChoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVDb2x1bW4ga2V5PXtpfT57aH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHtoZWFkZXJzLmxlbmd0aD4wICYmIGhlYWRlcnMubWFwKChoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVDb2x1bW4ga2V5PXtpfT57aH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9UYWJsZUhlYWRlcj59XG4gICAgICAgICAgICA8VGFibGVCb2R5PlxuICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uICE9PXVuZGVmaW5lZCAmJiBjb2xsZWN0aW9uLm1hcCgoYywgYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlUm93IHNlbGVjdE9uZT17c2VsZWN0T25lfSBfaWQ9e2MuX2lkfSBrZXk9e2F9PntPYmplY3Qua2V5cyhjKS5tYXAoKHIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPFRhYmxlQ29sdW1uIGtleT17aX0+e2Nbcl19PC9UYWJsZUNvbHVtbj4pXG4gICAgICAgICAgICAgICAgICAgIH0pfTwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1RhYmxlQm9keT5cbiAgICAgICAgICAgIHtUYWJsZUZvb3RlciAmJiA8VGFibGVGb290ZXI+XG4gICAgICAgICAgICA8L1RhYmxlRm9vdGVyPn1cbiAgICAgICAgPC9UYWJsZT4pXG4gICBcbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVSZW5kZXJcblxuIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5jb25zdCBUYWJsZSA9ICh7Y2hpbGRyZW59KSA9PiB7XG4gICAgcmV0dXJuICg8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3RhYmxlPilcbiAgfVxuXG5cbiAgZXhwb3J0IGRlZmF1bHQgVGFibGUiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlQm9keSA9KHtjaGlsZHJlbn0pPT57XG4gICAgcmV0dXJuICg8dGJvZHk+XG4gICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgPC90Ym9keT4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQm9keSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgVGFibGVDb2x1bW4gPSh7Y2hpbGRyZW59KT0+e1xuICAgIHJldHVybiAoPHRkPntjaGlsZHJlbn08L3RkPilcbn1cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29sdW1uIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUYWJsZUhlYWQgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG5cbiAgICByZXR1cm4gKDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUhlYWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlUm93ID0oe2NoaWxkcmVuLHNlbGVjdE9uZSxfaWR9KT0+e1xuICAgY29uc29sZS5sb2coXCJfaWQtLS0tLVwiLF9pZClcbiAgICByZXR1cm4gKDx0cj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPHRkPjxidXR0b24gZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2Zvcm1cIiBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdE9uZSh7X2lkfSkgfX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPkVkaXQ8L2J1dHRvbj48L3RkPlxuICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjb25maXJtXCIgb25DbGljaz17KCkgPT4geyBzZWxlY3RPbmUoe19pZH0pIH19IGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC90ZD5cbiAgICA8L3RyPilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVSb3ciLCJpbXBvcnQgVGFibGVSZW5kZXIgZnJvbSAnQHhhZi90YWJsZS1yZW5kZXInXG5pbXBvcnQgVGFibGUgZnJvbSAnLi9UYWJsZSdcbmltcG9ydCBUYWJsZUJvZHkgZnJvbSAnLi9UYWJsZUJvZHknXG5pbXBvcnQgVGFibGVDb2x1bW4gZnJvbSAnLi9UYWJsZUNvbHVtbidcbmltcG9ydCBUYWJsZUhlYWRlciBmcm9tICcuL1RhYmxlSGVhZGVyJ1xuaW1wb3J0IFRhYmxlUm93IGZyb20gJy4vVGFibGVSb3cnXG5cbmNvbnN0IEJvb3RzdHJhcFRhYmxlID0oe2NvbGxlY3Rpb24saGVhZGVycyxzZWxlY3RPbmV9KT0+e1xuICAgIHJldHVybihcbiAgICA8VGFibGVSZW5kZXJcbiAgICAgIHNlbGVjdE9uZT17c2VsZWN0T25lfVxuICAgICAgaGVhZGVycyA9e2hlYWRlcnN9XG4gICAgICBjb2xsZWN0aW9uPXtjb2xsZWN0aW9ufVxuICAgICAgVGFibGVCb2R5PXtUYWJsZUJvZHl9XG4gICAgICBUYWJsZUhlYWRlcj17VGFibGVIZWFkZXJ9XG4gICAgICBUYWJsZUNvbHVtbj17VGFibGVDb2x1bW59XG4gICAgICBUYWJsZVJvdz17VGFibGVSb3d9XG4gICAgICBUYWJsZT17VGFibGV9XG4gICAgICAvPilcbn1cblxuZXhwb3J0IHsgQm9vdHN0cmFwVGFibGV9IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEVkaXRvclJlYWN0IGZyb20gJ0B4YWYvZWRpdG9yLXJlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBGb3JtLEJvb3RzdHJhcENvbmZpcm1hdGlvbn0gZnJvbSAnQHhhZi9ib290c3RyYXAtZGlhbG9nJ1xuaW1wb3J0IHtCb290c3RyYXBUYWJsZX0gIGZyb20gJ0B4YWYvYm9vdHN0cmFwLXRhYmxlJ1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHVzZXJzOiBbXSxcbiAgZW1haWw6IFwiXCIsIHBhc3N3b3JkOiBcIlwiLCBfaWQ6IFwiXCJcbn1cbmNvbnN0IGhlYWRlcnMgPVtcIl9pZFwiLFwiUGFzc3dvcmRcIixcIkVtYWlsXCIsXCJFZGl0XCIsXCJEZWxldGVcIl1cbmNvbnN0IFVzZXJzID0gKHtjb2xsZWN0aW9uLGRifSkgPT4ge1xuICAgICAgXG4gIHJldHVybiAoPEVkaXRvclJlYWN0IGNvbGxlY3Rpb249e2NvbGxlY3Rpb259IGRiPXtkYn0gaW5pdGlhbFN0YXRlPXtpbml0aWFsU3RhdGV9Pnsoe3N0YXRlLCBkZWxldGVPbmUsIHNlbGVjdE9uZSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcnMgPXN0YXRlLm9iamVjdHMubWFwKCh1KT0+e3JldHVybiB7Li4udSwgcGFzc3dvcmQ6XCIqKioqKioqKlwiIH19KVxuICByZXR1cm4gKDxkaXY+PEJvb3RzdHJhcFRhYmxlICBoZWFkZXJzPXtoZWFkZXJzfSBjb2xsZWN0aW9uPXt1c2Vyc30gc2VsZWN0T25lPXtzZWxlY3RPbmV9IC8+XG4gIDxCb290c3RyYXBGb3JtIG1vZGFsSWQ9XCJmb3JtXCI+eHh4PC9Cb290c3RyYXBGb3JtPlxuICA8Qm9vdHN0cmFwQ29uZmlybWF0aW9uIGNvbmZpcm09e2RlbGV0ZU9uZX0gZGVjbGluZT17KCk9Pnt9fSBtb2RhbElkPVwiY29uZmlybVwiPkNvbmZpcm0gZGVsZXRpb24gb2Y6IHtzdGF0ZS5zZWxlY3RlZE9iamVjdCAmJiBzdGF0ZS5zZWxlY3RlZE9iamVjdC5lbWFpbCB9PC9Cb290c3RyYXBDb25maXJtYXRpb24+XG4gIDwvZGl2PilcbiAgfX08L0VkaXRvclJlYWN0Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcnNcbi8qXG4gICAgPEVkaXRVc2VyIHsuLi5zdGF0ZX0gdmFsaWRhdGlvbj17dmFsaWRhdGlvbn0gb25DaGFuZ2U9e29uQ2hhbmdlfSAgLz5cbiAgICAgIDxDb25maXJtYXRpb25EaWFsb2cgZGVsZXRlT25lPXtkZWxldGVPbmV9IC8+XG4qL1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgIDxkaXY+SG9tZTwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuY29uc3QgTmF2QmFyID0gKCkgPT4ge1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBpc0xvZ2dlZEluLCBsb2dvdXQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPk5hdmJhcjwvYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1jb250cm9scz1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIG5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdiBtci1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW0gYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9cIj5Ib21lIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+PC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvdXNlcnNcIj5Vc2VyczwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7IWlzTG9nZ2VkSW4gJiYgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9sb2dpblwiPkxvZ2luPC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL1wiIG9uQ2xpY2s9e2xvZ291dH0+TG9nb3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshaXNMb2dnZWRJbiAmJiA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL3NpZ251cFwiPlNpZ25VcDwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+fVxuXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICApXG4gICAgfX1cblxuICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlcixIYXNoUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgTG9naW4se1NpZ25VcCxSZWNvdmVyUGFzc3dvcmQsUmVjb3ZlclJlc3VsdCxSZXNldFBhc3N3b3JkLFVzZXJzfSBmcm9tICdAYXV0aGpzL3JlYWN0LXVpJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9Ib21lJ1xuaW1wb3J0IE5hdkJhciBmcm9tICcuL05hdkJhcidcbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgPEhhc2hSb3V0ZXI+XG4gICAgICAgICAgICA8bmF2IHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIiB9fT5cbiAgICAgICAgICAgIDxOYXZCYXIvPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi91c2Vyc1wiIHJlbmRlcj17KCk9PjxVc2VycyBjb2xsZWN0aW9uPVwidXNlcnNcIiBkYiA9XCJkZW1vXCIvPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbG9naW5cIiBjb21wb25lbnQ9e0xvZ2lufSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvc2lnbnVwXCIgY29tcG9uZW50PXtTaWduVXB9IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZWNvdmVyXCIgY29tcG9uZW50PXtSZWNvdmVyUGFzc3dvcmR9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3Jlc2V0cGFzcy86dXNlcm5hbWUvOnRva2VuXCIgY29tcG9uZW50PXtSZXNldFBhc3N3b3JkfS8+XG4gICAgICAgIDwvSGFzaFJvdXRlcj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcbmltcG9ydCBFbWFpbFBhc3N3b3JkUHJvdmlkZXIgZnJvbSAnQGF1dGhqcy9yZWFjdCdcblJlYWN0RE9NLnJlbmRlcihcbiAgPGRpdj5cbiAgICA8RW1haWxQYXNzd29yZFByb3ZpZGVyPlxuICAgIDxBcHAvPlxuICAgIDwvRW1haWxQYXNzd29yZFByb3ZpZGVyPlxuXG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJfaW5oZXJpdHNMb29zZSIsIm9uIiwib2ZmIiwiQ29tcG9uZW50IiwiUmVhY3QiLCJpc1Byb2R1Y3Rpb24iLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsIlJlYWN0SXMiLCJjcmVhdGVDb250ZXh0IiwicGF0aFRvUmVnZXhwIiwiaW5kZXgiLCJpc1ZhbGlkRWxlbWVudFR5cGUiLCJhZGRMZWFkaW5nU2xhc2giLCJzdHJpcEJhc2VuYW1lIiwibm9vcCIsImtleSIsIl9fUm91dGVyQ29udGV4dCIsImNvbnRleHQiLCJlbWFpbFJlZ2V4IiwicGFzc3dvcmRSZWdleCIsImVtYWlsUmVxdWlyZW1lbnRzIiwicGFzc3BvcnRSZXF1aXJlbWVudHMiLCJpbml0aWFsVmFsaWRhdGlvblN0YXRlIiwiZW1haWwiLCJpc1ZhbGlkIiwibWVzc2FnZSIsInBhc3N3b3JkIiwidW5kZWZpbmVkIiwiZW1haWxWYWxpZGF0aW9uIiwicGFzc3dvcmRWYWxpZGF0aW9uIiwidGVzdCIsInZhbGlkYXRpb25SZXN1bHQiLCJzZWxmIiwic2V0U3RhdGUiLCJ2YWxpZGF0aW9uIiwiY29va2llcyIsImRlZmF1bHRzIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwiQ2FuY2VsIiwiQXhpb3MiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsIkVtYWlsUGFzc3dvcmRDb250ZXh0IiwiRW1haWxQYXNzd29yZFByb3ZpZGVyIiwibG9hZGluZyIsInRva2VuIiwiaXNMb2dnZWRJbiIsImNvbmZpcm0iLCJzZXJ2ZXJFcnJvciIsImUiLCJuYW1lIiwidGFyZ2V0IiwidmFsdWUiLCJyZXNldFZhbGlkYXRpb24iLCJzdGF0ZSIsImF4aW9zIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzZXRUb2tlbiIsImdldCIsInBhcmFtcyIsImdldFRva2VuIiwiaXNUb2tlbkV4cGlyZWQiLCJkZWNvZGVkIiwiZGVjb2RlIiwiZXhwIiwiRGF0ZSIsIm5vdyIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInVzZXJuYW1lIiwicmVtb3ZlSXRlbSIsImFuc3dlciIsImxvZ2dlZEluIiwiY2hpbGRyZW4iLCJwcm9wcyIsImxvZ2luIiwibG9nb3V0Iiwic2lnbnVwIiwicmVzZXRQYXNzd29yZCIsInJlY292ZXJQYXNzd29yZCIsIm9uQ2hhbmdlIiwiQ3VzdG9tSW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJsYWJlbCIsImNsYXNzTmFtZXMiLCJBc3luY0J1dHRvbiIsInRpdGxlIiwib25DbGljayIsImRpc2FibGVkIiwicG9zaXRpb24iLCJ3aWR0aCIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsIm9wYWNpdHkiLCJQcm9ncmVzc0NpcmNsZSIsInNlbGVjdGVkIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsIm1hcmdpbkxlZnQiLCJ0ZXh0QWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJQcm9ncmVzc0xvYWRlciIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwidG9wIiwibGVmdCIsIkxvZ2luIiwiQm9vdHN0cmFwSW5wdXQiLCJCb290c3RyYXBBc3luY0J1dHRvbiIsIlNpZ25VcCIsIlJlY292ZXJQYXNzd29yZCIsInJlY292ZXIiLCJSZXNldFBhc3N3b3JkIiwibW9uZ29Db2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsImRiIiwiZmluZE9uZSIsImZpbHRlciIsInJlcVR5cGUiLCJmaW5kIiwiaW5zZXJ0T25lIiwidXBkYXRlT25lIiwicHV0IiwiZGVsZXRlT25lIiwiTW9uZ29kYkNvbnRleHQiLCJNb25nb2RiUHJvdmlkZXIiLCJvYmplY3RzIiwibW9uZ29SZWFjdCIsInJlc3VsdCIsInNldEluaXRpYWxTdGF0ZSIsIkVkaXRvclJlYWN0Iiwic2VsZWN0ZWRPYmplY3QiLCJpbml0aWFsU3RhdGUiLCJwcmV2U3RhdGUiLCJtb25nb0RiQ2xpZW50IiwiaWQiLCJfaWQiLCJ1IiwiX3NldEluaXRpYWxTdGF0ZSIsInNlbGVjdE9uZSIsIkNvbmZpcm1hdGlvbkRpYWxvZyIsImRlY2xpbmUiLCJtb2RhbElkIiwiRWRpdG9yRGlhbG9nIiwic2F2ZSIsImNhbmNlbCIsIlRhYmxlUmVuZGVyIiwiaGVhZGVycyIsIlRhYmxlIiwiVGFibGVCb2R5IiwiVGFibGVSb3ciLCJUYWJsZUNvbHVtbiIsIlRhYmxlRm9vdGVyIiwiVGFibGVIZWFkZXIiLCJsZW5ndGgiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiaCIsImkiLCJjIiwiYSIsInIiLCJUYWJsZUhlYWQiLCJCb290c3RyYXBUYWJsZSIsInVzZXJzIiwiVXNlcnMiLCJCb290c3RyYXBGb3JtIiwiQm9vdHN0cmFwQ29uZmlybWF0aW9uIiwiSG9tZSIsIk5hdkJhciIsIkFwcCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQWUsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTTtZQUN0RCxZQUFZLE9BQU8sSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJO1lBQzlDLFlBQVksT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUU7O1lDRnpEOzs7WUFHQSxTQUFTLGdCQUFnQixHQUFHO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxTQUFTLG1CQUFtQixJQUFJO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLElB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QUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFDamdCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJ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
