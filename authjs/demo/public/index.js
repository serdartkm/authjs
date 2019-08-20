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
            var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
            60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118;function x(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case t:case r:case d:return u}}}function y(a){return x(a)===m}exports.typeOf=x;exports.AsyncMode=l;
            exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
            exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w)};exports.isAsyncMode=function(a){return y(a)||x(a)===l};exports.isConcurrentMode=y;exports.isContextConsumer=function(a){return x(a)===k};exports.isContextProvider=function(a){return x(a)===h};
            exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return x(a)===n};exports.isFragment=function(a){return x(a)===e};exports.isLazy=function(a){return x(a)===t};exports.isMemo=function(a){return x(a)===r};exports.isPortal=function(a){return x(a)===d};exports.isProfiler=function(a){return x(a)===g};exports.isStrictMode=function(a){return x(a)===f};exports.isSuspense=function(a){return x(a)===p};
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
            // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
            // (unstable) APIs that have been removed. Can we remove the symbols?
            var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
            var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
            var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
            var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
            var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
            var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
            var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
            var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
            var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

            function isValidElementType(type) {
              return typeof type === 'string' || typeof type === 'function' ||
              // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
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
                  password = _ref$password === void 0 ? undefined : _ref$password,
                  _ref$message = _ref.message,
                  message = _ref$message === void 0 ? undefined : _ref$message;
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

              if (message !== undefined) {
                messageValidation = "";
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
            }; //

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lc20vaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzbS9yZWFjdC1yb3V0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIi4uLy4uLy4uL3hhZi92YWxpZGF0aW9uL2xpYi92YWxpZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uL2F1dGgtcmVhY3QvbGliL0VtYWlsUGFzc3dvcmRQcm92aWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC1pbnB1dC9saWIvQm9vdHN0cmFwSW5wdXQuanMiLCIuLi8uLi8uLi94YWYvYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbi9saWIvQXN5bmNCdXR0b24uanMiLCIuLi8uLi9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvTG9naW4uanMiLCIuLi8uLi9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvU2lnbnVwLmpzIiwiLi4vLi4vYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1JlY292ZXJQYXNzd29yZC5qcyIsIi4uLy4uL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9SZXNldFBhc3N3b3JkLmpzIiwiLi4vLi4vLi4vbW9uZ29kYmpzL21vbmdvLXJlYWN0L2xpYi9tb25nb2RiLWNsaWVudC5qcyIsIi4uLy4uLy4uL21vbmdvZGJqcy9tb25nby1yZWFjdC9saWIvTW9uZ29kYlByb3ZpZGVyLmpzIiwiLi4vLi4vLi4veGFmL2VkaXRvci1yZWFjdC9saWIvZWRpdG9yLXJlYWN0LmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC1kaWFsb2cvbGliL0Jvb3RzdHJhcENvbmZpcm1hdGlvbi5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtZGlhbG9nL2xpYi9Cb290c3RyYXBGb3JtLmpzIiwiLi4vLi4vLi4veGFmL3RhYmxlLXJlbmRlci9saWIvaW5kZXguanMiLCIuLi8uLi8uLi94YWYvYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZS5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlQm9keS5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlQ29sdW1uLmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC10YWJsZS9saWIvVGFibGVIZWFkZXIuanMiLCIuLi8uLi8uLi94YWYvYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZVJvdy5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL2luZGV4LmpzIiwiLi4vLi4vYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1VzZXJzLmpzIiwiLi4vY2xpZW50L0hvbWUuanMiLCIuLi9jbGllbnQvTmF2QmFyLmpzIiwiLi4vY2xpZW50L0FwcC5qcyIsIi4uL2NsaWVudC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuLy8gYmFzZWQgb2ZmIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzXG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxudmFyIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5pZiAodHlwZW9mIGdsb2JhbC5zZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG59XG5pZiAodHlwZW9mIGdsb2JhbC5jbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0VGljayhmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbmV4cG9ydCB2YXIgdGl0bGUgPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIHBsYXRmb3JtID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBicm93c2VyID0gdHJ1ZTtcbmV4cG9ydCB2YXIgZW52ID0ge307XG5leHBvcnQgdmFyIGFyZ3YgPSBbXTtcbmV4cG9ydCB2YXIgdmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuZXhwb3J0IHZhciB2ZXJzaW9ucyA9IHt9O1xuZXhwb3J0IHZhciByZWxlYXNlID0ge307XG5leHBvcnQgdmFyIGNvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IHZhciBvbiA9IG5vb3A7XG5leHBvcnQgdmFyIGFkZExpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgb25jZSA9IG5vb3A7XG5leHBvcnQgdmFyIG9mZiA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbmV4cG9ydCB2YXIgZW1pdCA9IG5vb3A7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjd2QgKCkgeyByZXR1cm4gJy8nIH1cbmV4cG9ydCBmdW5jdGlvbiBjaGRpciAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdW1hc2soKSB7IHJldHVybiAwOyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2t1bWF2aXMvYnJvd3Nlci1wcm9jZXNzLWhydGltZS9ibG9iL21hc3Rlci9pbmRleC5qc1xudmFyIHBlcmZvcm1hbmNlID0gZ2xvYmFsLnBlcmZvcm1hbmNlIHx8IHt9XG52YXIgcGVyZm9ybWFuY2VOb3cgPVxuICBwZXJmb3JtYW5jZS5ub3cgICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1vek5vdyAgICAgfHxcbiAgcGVyZm9ybWFuY2UubXNOb3cgICAgICB8fFxuICBwZXJmb3JtYW5jZS5vTm93ICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLndlYmtpdE5vdyAgfHxcbiAgZnVuY3Rpb24oKXsgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfVxuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmV4cG9ydCBmdW5jdGlvbiBocnRpbWUocHJldmlvdXNUaW1lc3RhbXApe1xuICB2YXIgY2xvY2t0aW1lID0gcGVyZm9ybWFuY2VOb3cuY2FsbChwZXJmb3JtYW5jZSkqMWUtM1xuICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICB2YXIgbmFub3NlY29uZHMgPSBNYXRoLmZsb29yKChjbG9ja3RpbWUlMSkqMWU5KVxuICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgbmFub3NlY29uZHMgPSBuYW5vc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzFdXG4gICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgIHNlY29uZHMtLVxuICAgICAgbmFub3NlY29uZHMgKz0gMWU5XG4gICAgfVxuICB9XG4gIHJldHVybiBbc2Vjb25kcyxuYW5vc2Vjb25kc11cbn1cblxudmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gdXB0aW1lKCkge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICB2YXIgZGlmID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiBkaWYgLyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5leHRUaWNrOiBuZXh0VGljayxcbiAgdGl0bGU6IHRpdGxlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBlbnY6IGVudixcbiAgYXJndjogYXJndixcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICBvbjogb24sXG4gIGFkZExpc3RlbmVyOiBhZGRMaXN0ZW5lcixcbiAgb25jZTogb25jZSxcbiAgb2ZmOiBvZmYsXG4gIHJlbW92ZUxpc3RlbmVyOiByZW1vdmVMaXN0ZW5lcixcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIGVtaXQ6IGVtaXQsXG4gIGJpbmRpbmc6IGJpbmRpbmcsXG4gIGN3ZDogY3dkLFxuICBjaGRpcjogY2hkaXIsXG4gIHVtYXNrOiB1bWFzayxcbiAgaHJ0aW1lOiBocnRpbWUsXG4gIHBsYXRmb3JtOiBwbGF0Zm9ybSxcbiAgcmVsZWFzZTogcmVsZWFzZSxcbiAgY29uZmlnOiBjb25maWcsXG4gIHVwdGltZTogdXB0aW1lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHNMb29zZTsiLCIvLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5ID0gJ19fZ2xvYmFsX3VuaXF1ZV9pZF9fJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFtrZXldID0gKGdsb2JhbFtrZXldIHx8IDApICsgMTtcbn07XG4iLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbmZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghaXNQcm9kdWN0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0ZXh0ID0gXCJXYXJuaW5nOiBcIiArIG1lc3NhZ2U7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4odGV4dCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRocm93IEVycm9yKHRleHQpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2FybmluZztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZ3VkIGZyb20gJ2d1ZCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuXG52YXIgTUFYX1NJR05FRF8zMV9CSVRfSU5UID0gMTA3Mzc0MTgyMztcblxuZnVuY3Rpb24gb2JqZWN0SXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RW1pdHRlcih2YWx1ZSkge1xuICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBvbjogZnVuY3Rpb24gb24oaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXJzID0gaGFuZGxlcnMuZmlsdGVyKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiBoICE9PSBoYW5kbGVyO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIodmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuWzBdIDogY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0Q29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXgsIF9Db25zdW1lciRjb250ZXh0VHlwZTtcblxuICB2YXIgY29udGV4dFByb3AgPSAnX19jcmVhdGUtcmVhY3QtY29udGV4dC0nICsgZ3VkKCkgKyAnX18nO1xuXG4gIHZhciBQcm92aWRlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQcm92aWRlcigpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzLmVtaXR0ZXIgPSBjcmVhdGVFdmVudEVtaXR0ZXIoX3RoaXMucHJvcHMudmFsdWUpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8gPSBQcm92aWRlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbY29udGV4dFByb3BdID0gdGhpcy5lbWl0dGVyLCBfcmVmO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSAhPT0gbmV4dFByb3BzLnZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIGNoYW5nZWRCaXRzO1xuXG4gICAgICAgIGlmIChvYmplY3RJcyhvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5nZWRCaXRzID0gdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSAnZnVuY3Rpb24nID8gY2FsY3VsYXRlQ2hhbmdlZEJpdHMob2xkVmFsdWUsIG5ld1ZhbHVlKSA6IE1BWF9TSUdORURfMzFfQklUX0lOVDtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuaW5nKChjaGFuZ2VkQml0cyAmIE1BWF9TSUdORURfMzFfQklUX0lOVCkgPT09IGNoYW5nZWRCaXRzLCAnY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IEV4cGVjdGVkIHRoZSByZXR1cm4gdmFsdWUgdG8gYmUgYSAnICsgJzMxLWJpdCBpbnRlZ2VyLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgY2hhbmdlZEJpdHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoYW5nZWRCaXRzIHw9IDA7XG5cbiAgICAgICAgICBpZiAoY2hhbmdlZEJpdHMgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zZXQobmV4dFByb3BzLnZhbHVlLCBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgdmFyIENvbnN1bWVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDb25zdW1lciwgX0NvbXBvbmVudDIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICBfdGhpczIgPSBfQ29tcG9uZW50Mi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIuc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiBfdGhpczIuZ2V0VmFsdWUoKVxuICAgICAgfTtcblxuICAgICAgX3RoaXMyLm9uVXBkYXRlID0gZnVuY3Rpb24gKG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gX3RoaXMyLm9ic2VydmVkQml0cyB8IDA7XG5cbiAgICAgICAgaWYgKChvYnNlcnZlZEJpdHMgJiBjaGFuZ2VkQml0cykgIT09IDApIHtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIgPSBDb25zdW1lci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IG5leHRQcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vbih0aGlzLm9uVXBkYXRlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IHRoaXMucHJvcHMub2JzZXJ2ZWRCaXRzO1xuICAgICAgdGhpcy5vYnNlcnZlZEJpdHMgPSBvYnNlcnZlZEJpdHMgPT09IHVuZGVmaW5lZCB8fCBvYnNlcnZlZEJpdHMgPT09IG51bGwgPyBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgOiBvYnNlcnZlZEJpdHM7XG4gICAgfTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0ub2ZmKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5nZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG9ubHlDaGlsZCh0aGlzLnByb3BzLmNoaWxkcmVuKSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnN1bWVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgQ29uc3VtZXIuY29udGV4dFR5cGVzID0gKF9Db25zdW1lciRjb250ZXh0VHlwZSA9IHt9LCBfQ29uc3VtZXIkY29udGV4dFR5cGVbY29udGV4dFByb3BdID0gUHJvcFR5cGVzLm9iamVjdCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlKTtcbiAgcmV0dXJuIHtcbiAgICBQcm92aWRlcjogUHJvdmlkZXIsXG4gICAgQ29uc3VtZXI6IENvbnN1bWVyXG4gIH07XG59XG5cbnZhciBpbmRleCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQgfHwgY3JlYXRlUmVhY3RDb250ZXh0O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bykge1xuICB2YXIgZnJvbSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgdmFyIHRvUGFydHMgPSB0byAmJiB0by5zcGxpdCgnLycpIHx8IFtdO1xuICB2YXIgZnJvbVBhcnRzID0gZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykgfHwgW107XG5cbiAgdmFyIGlzVG9BYnMgPSB0byAmJiBpc0Fic29sdXRlKHRvKTtcbiAgdmFyIGlzRnJvbUFicyA9IGZyb20gJiYgaXNBYnNvbHV0ZShmcm9tKTtcbiAgdmFyIG11c3RFbmRBYnMgPSBpc1RvQWJzIHx8IGlzRnJvbUFicztcblxuICBpZiAodG8gJiYgaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAvLyB0byBpcyBhYnNvbHV0ZVxuICAgIGZyb21QYXJ0cyA9IHRvUGFydHM7XG4gIH0gZWxzZSBpZiAodG9QYXJ0cy5sZW5ndGgpIHtcbiAgICAvLyB0byBpcyByZWxhdGl2ZSwgZHJvcCB0aGUgZmlsZW5hbWVcbiAgICBmcm9tUGFydHMucG9wKCk7XG4gICAgZnJvbVBhcnRzID0gZnJvbVBhcnRzLmNvbmNhdCh0b1BhcnRzKTtcbiAgfVxuXG4gIGlmICghZnJvbVBhcnRzLmxlbmd0aCkgcmV0dXJuICcvJztcblxuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IHZvaWQgMDtcbiAgaWYgKGZyb21QYXJ0cy5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdCA9IGZyb21QYXJ0c1tmcm9tUGFydHMubGVuZ3RoIC0gMV07XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nIHx8IGxhc3QgPT09ICcnO1xuICB9IGVsc2Uge1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBmcm9tUGFydHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIHZhciBwYXJ0ID0gZnJvbVBhcnRzW2ldO1xuXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbXVzdEVuZEFicykgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gIH1pZiAobXVzdEVuZEFicyAmJiBmcm9tUGFydHNbMF0gIT09ICcnICYmICghZnJvbVBhcnRzWzBdIHx8ICFpc0Fic29sdXRlKGZyb21QYXJ0c1swXSkpKSBmcm9tUGFydHMudW5zaGlmdCgnJyk7XG5cbiAgdmFyIHJlc3VsdCA9IGZyb21QYXJ0cy5qb2luKCcvJyk7XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgcmVzdWx0LnN1YnN0cigtMSkgIT09ICcvJykgcmVzdWx0ICs9ICcvJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlUGF0aG5hbWU7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGl0ZW0sIGJbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhVHlwZSA9IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKTtcbiAgdmFyIGJUeXBlID0gdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGIpO1xuXG4gIGlmIChhVHlwZSAhPT0gYlR5cGUpIHJldHVybiBmYWxzZTtcblxuICBpZiAoYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IGEudmFsdWVPZigpO1xuICAgIHZhciBiVmFsdWUgPSBiLnZhbHVlT2YoKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGFLZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVFcXVhbDsiLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBwcmVmaXggPSAnSW52YXJpYW50IGZhaWxlZCc7XG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmIChjb25kaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCArIFwiOiBcIiArIChtZXNzYWdlIHx8ICcnKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW52YXJpYW50O1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHJlc29sdmVQYXRobmFtZSBmcm9tICdyZXNvbHZlLXBhdGhuYW1lJztcbmltcG9ydCB2YWx1ZUVxdWFsIGZyb20gJ3ZhbHVlLWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcHJlZml4ICsgJyhcXFxcL3xcXFxcP3wjfCQpJywgJ2knKS50ZXN0KHBhdGgpO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJykgOiB2b2lkIDA7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpIDogdm9pZCAwO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufVxuXG52YXIgUG9wU3RhdGVFdmVudCA9ICdwb3BzdGF0ZSc7XG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG5mdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgICBuZXh0S2V5cy5wdXNoKGxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgYWxsS2V5cyA9IG5leHRLZXlzO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxLZXlzW3ByZXZJbmRleF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxudmFyIEhhc2hDaGFuZ2VFdmVudCQxID0gJ2hhc2hjaGFuZ2UnO1xudmFyIEhhc2hQYXRoQ29kZXJzID0ge1xuICBoYXNoYmFuZzoge1xuICAgIGVuY29kZVBhdGg6IGZ1bmN0aW9uIGVuY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoIDogJyEvJyArIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBzdHJpcExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfSxcbiAgc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpO1xufVxuXG5mdW5jdGlvbiBwdXNoSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHZhciBoYXNoSW5kZXggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKDAsIGhhc2hJbmRleCA+PSAwID8gaGFzaEluZGV4IDogMCkgKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gX3Byb3BzLmhhc2hUeXBlLFxuICAgICAgaGFzaFR5cGUgPSBfcHJvcHMkaGFzaFR5cGUgPT09IHZvaWQgMCA/ICdzbGFzaCcgOiBfcHJvcHMkaGFzaFR5cGU7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG4gIHZhciBfSGFzaFBhdGhDb2RlcnMkaGFzaFQgPSBIYXNoUGF0aENvZGVyc1toYXNoVHlwZV0sXG4gICAgICBlbmNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmVuY29kZVBhdGgsXG4gICAgICBkZWNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmRlY29kZVBhdGg7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBkZWNvZGVQYXRoKGdldEhhc2hQYXRoKCkpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkge1xuICAgICAgLy8gRW5zdXJlIHdlIGFsd2F5cyBoYXZlIGEgcHJvcGVybHktZW5jb2RlZCBoYXNoLlxuICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKHRvTG9jYXRpb24pKTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9IC8vIEVuc3VyZSB0aGUgaGFzaCBpcyBlbmNvZGVkIHByb3Blcmx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxuXG5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICB2YXIgYWxsUGF0aHMgPSBbY3JlYXRlUGF0aChpbml0aWFsTG9jYXRpb24pXTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBQVVNILCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICBwdXNoSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICAgIHZhciBuZXh0UGF0aHMgPSBhbGxQYXRocy5zbGljZSgwLCBwcmV2SW5kZXggPT09IC0xID8gMCA6IHByZXZJbmRleCArIDEpO1xuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGg7IGEgbmV3IGVudHJ5IHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrJykgOiB2b2lkIDA7XG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoY2FuR29XaXRob3V0UmVsb2FkLCAnSGFzaCBoaXN0b3J5IGdvKG4pIGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQgaW4gdGhpcyBicm93c2VyJykgOiB2b2lkIDA7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIF9wcm9wcyRpbml0aWFsRW50cmllcyA9IF9wcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB2b2lkIDAgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBfcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdm9pZCAwID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgaW5kZXggPSBjbGFtcChpbml0aWFsSW5kZXgsIDAsIGluaXRpYWxFbnRyaWVzLmxlbmd0aCAtIDEpO1xuICB2YXIgZW50cmllcyA9IGluaXRpYWxFbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJyA/IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGVudHJ5LmtleSB8fCBjcmVhdGVLZXkoKSk7XG4gIH0pOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBjcmVhdGVQYXRoO1xuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuXG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gY2xhbXAoaGlzdG9yeS5pbmRleCArIG4sIDAsIGhpc3RvcnkuZW50cmllcy5sZW5ndGggLSAxKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgdmFyIGxvY2F0aW9uID0gaGlzdG9yeS5lbnRyaWVzW25leHRJbmRleF07XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGhpc3RvcnkuaW5kZXggKyBuO1xuICAgIHJldHVybiBuZXh0SW5kZXggPj0gMCAmJiBuZXh0SW5kZXggPCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIHBhcnNlUGF0aCwgY3JlYXRlUGF0aCB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwidmFyIGlzYXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFRvUmVnZXhwXG5tb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZVxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvUmVnRXhwID0gdG9rZW5zVG9SZWdFeHBcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKVxuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4geyFBcnJheX1cbiAqL1xuZnVuY3Rpb24gcGFyc2UgKHN0ciwgb3B0aW9ucykge1xuICB2YXIgdG9rZW5zID0gW11cbiAgdmFyIGtleSA9IDBcbiAgdmFyIGluZGV4ID0gMFxuICB2YXIgcGF0aCA9ICcnXG4gIHZhciBkZWZhdWx0RGVsaW1pdGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlbGltaXRlciB8fCAnLydcbiAgdmFyIHJlc1xuXG4gIHdoaWxlICgocmVzID0gUEFUSF9SRUdFWFAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgdmFyIG0gPSByZXNbMF1cbiAgICB2YXIgZXNjYXBlZCA9IHJlc1sxXVxuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXhcbiAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGhcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIG5leHQgPSBzdHJbaW5kZXhdXG4gICAgdmFyIHByZWZpeCA9IHJlc1syXVxuICAgIHZhciBuYW1lID0gcmVzWzNdXG4gICAgdmFyIGNhcHR1cmUgPSByZXNbNF1cbiAgICB2YXIgZ3JvdXAgPSByZXNbNV1cbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl1cbiAgICB2YXIgYXN0ZXJpc2sgPSByZXNbN11cblxuICAgIC8vIFB1c2ggdGhlIGN1cnJlbnQgcGF0aCBvbnRvIHRoZSB0b2tlbnMuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gICAgICBwYXRoID0gJydcbiAgICB9XG5cbiAgICB2YXIgcGFydGlhbCA9IHByZWZpeCAhPSBudWxsICYmIG5leHQgIT0gbnVsbCAmJiBuZXh0ICE9PSBwcmVmaXhcbiAgICB2YXIgcmVwZWF0ID0gbW9kaWZpZXIgPT09ICcrJyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIGRlbGltaXRlciA9IHJlc1syXSB8fCBkZWZhdWx0RGVsaW1pdGVyXG4gICAgdmFyIHBhdHRlcm4gPSBjYXB0dXJlIHx8IGdyb3VwXG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pXG4gIH1cblxuICAvLyBNYXRjaCBhbnkgY2hhcmFjdGVycyBzdGlsbCByZW1haW5pbmcuXG4gIGlmIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICBwYXRoICs9IHN0ci5zdWJzdHIoaW5kZXgpXG4gIH1cblxuICAvLyBJZiB0aGUgcGF0aCBleGlzdHMsIHB1c2ggaXQgb250byB0aGUgZW5kLlxuICBpZiAocGF0aCkge1xuICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aClcblxuICAvLyBDb21waWxlIGFsbCB0aGUgcGF0dGVybnMgYmVmb3JlIGNvbXBpbGF0aW9uLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgbWF0Y2hlc1tpXSA9IG5ldyBSZWdFeHAoJ14oPzonICsgdG9rZW5zW2ldLnBhdHRlcm4gKyAnKSQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSAnJ1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9XG4gICAgdmFyIGVuY29kZSA9IG9wdGlvbnMucHJldHR5ID8gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IDogZW5jb2RlVVJJQ29tcG9uZW50XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggKz0gdG9rZW5cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBkYXRhW3Rva2VuLm5hbWVdXG4gICAgICB2YXIgc2VnbWVudFxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAvLyBQcmVwZW5kIHBhcnRpYWwgc2VnbWVudCBwcmVmaXhlcy5cbiAgICAgICAgICBpZiAodG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXhcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICghdG9rZW4ucmVwZWF0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnYCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0pXG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzZWdtZW50ID0gdG9rZW4uYXN0ZXJpc2sgPyBlbmNvZGVBc3Rlcmlzayh2YWx1ZSkgOiBlbmNvZGUodmFsdWUpXG5cbiAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxuICAgICAgfVxuXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5c1xuICByZXR1cm4gcmVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zZW5zaXRpdmUgPyAnJyA6ICdpJ1xufVxuXG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZylcblxuICBpZiAoZ3JvdXBzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGksXG4gICAgICAgIHByZWZpeDogbnVsbCxcbiAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxuICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgIHBhcnRpYWw6IGZhbHNlLFxuICAgICAgICBhc3RlcmlzazogZmFsc2UsXG4gICAgICAgIHBhdHRlcm46IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydHMucHVzaChwYXRoVG9SZWdleHAocGF0aFtpXSwga2V5cywgb3B0aW9ucykuc291cmNlKVxuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0XG4gIHZhciBlbmQgPSBvcHRpb25zLmVuZCAhPT0gZmFsc2VcbiAgdmFyIHJvdXRlID0gJydcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyh0b2tlbilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyh0b2tlbi5wcmVmaXgpXG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJ1xuXG4gICAgICBrZXlzLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgY2FwdHVyZSArPSAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonXG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpPydcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSdcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZVxuICAgIH1cbiAgfVxuXG4gIHZhciBkZWxpbWl0ZXIgPSBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nKVxuICB2YXIgZW5kc1dpdGhEZWxpbWl0ZXIgPSByb3V0ZS5zbGljZSgtZGVsaW1pdGVyLmxlbmd0aCkgPT09IGRlbGltaXRlclxuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nXG4gIH1cblxuICBpZiAoZW5kKSB7XG4gICAgcm91dGUgKz0gJyQnXG4gIH0gZWxzZSB7XG4gICAgLy8gSW4gbm9uLWVuZGluZyBtb2RlLCB3ZSBuZWVkIHRoZSBjYXB0dXJpbmcgZ3JvdXBzIHRvIG1hdGNoIGFzIG11Y2ggYXNcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aERlbGltaXRlciA/ICcnIDogJyg/PScgKyBkZWxpbWl0ZXIgKyAnfCQpJ1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOS4wXG4gKiByZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtcbnZhciBiPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5mb3IsYz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpOjYwMTAzLGQ9Yj9TeW1ib2wuZm9yKFwicmVhY3QucG9ydGFsXCIpOjYwMTA2LGU9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIik6NjAxMDcsZj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdHJpY3RfbW9kZVwiKTo2MDEwOCxnPWI/U3ltYm9sLmZvcihcInJlYWN0LnByb2ZpbGVyXCIpOjYwMTE0LGg9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvdmlkZXJcIik6NjAxMDksaz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpOjYwMTEwLGw9Yj9TeW1ib2wuZm9yKFwicmVhY3QuYXN5bmNfbW9kZVwiKTo2MDExMSxtPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbmN1cnJlbnRfbW9kZVwiKTo2MDExMSxuPWI/U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpOjYwMTEyLHA9Yj9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIik6NjAxMTMscT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZV9saXN0XCIpOlxuNjAxMjAscj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpOjYwMTE1LHQ9Yj9TeW1ib2wuZm9yKFwicmVhY3QubGF6eVwiKTo2MDExNix2PWI/U3ltYm9sLmZvcihcInJlYWN0LmZ1bmRhbWVudGFsXCIpOjYwMTE3LHc9Yj9TeW1ib2wuZm9yKFwicmVhY3QucmVzcG9uZGVyXCIpOjYwMTE4O2Z1bmN0aW9uIHgoYSl7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSl7dmFyIHU9YS4kJHR5cGVvZjtzd2l0Y2godSl7Y2FzZSBjOnN3aXRjaChhPWEudHlwZSxhKXtjYXNlIGw6Y2FzZSBtOmNhc2UgZTpjYXNlIGc6Y2FzZSBmOmNhc2UgcDpyZXR1cm4gYTtkZWZhdWx0OnN3aXRjaChhPWEmJmEuJCR0eXBlb2YsYSl7Y2FzZSBrOmNhc2UgbjpjYXNlIGg6cmV0dXJuIGE7ZGVmYXVsdDpyZXR1cm4gdX19Y2FzZSB0OmNhc2UgcjpjYXNlIGQ6cmV0dXJuIHV9fX1mdW5jdGlvbiB5KGEpe3JldHVybiB4KGEpPT09bX1leHBvcnRzLnR5cGVPZj14O2V4cG9ydHMuQXN5bmNNb2RlPWw7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlPW07ZXhwb3J0cy5Db250ZXh0Q29uc3VtZXI9aztleHBvcnRzLkNvbnRleHRQcm92aWRlcj1oO2V4cG9ydHMuRWxlbWVudD1jO2V4cG9ydHMuRm9yd2FyZFJlZj1uO2V4cG9ydHMuRnJhZ21lbnQ9ZTtleHBvcnRzLkxhenk9dDtleHBvcnRzLk1lbW89cjtleHBvcnRzLlBvcnRhbD1kO2V4cG9ydHMuUHJvZmlsZXI9ZztleHBvcnRzLlN0cmljdE1vZGU9ZjtleHBvcnRzLlN1c3BlbnNlPXA7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZT1mdW5jdGlvbihhKXtyZXR1cm5cInN0cmluZ1wiPT09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09PXR5cGVvZiBhfHxhPT09ZXx8YT09PW18fGE9PT1nfHxhPT09Znx8YT09PXB8fGE9PT1xfHxcIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiYoYS4kJHR5cGVvZj09PXR8fGEuJCR0eXBlb2Y9PT1yfHxhLiQkdHlwZW9mPT09aHx8YS4kJHR5cGVvZj09PWt8fGEuJCR0eXBlb2Y9PT1ufHxhLiQkdHlwZW9mPT09dnx8YS4kJHR5cGVvZj09PXcpfTtleHBvcnRzLmlzQXN5bmNNb2RlPWZ1bmN0aW9uKGEpe3JldHVybiB5KGEpfHx4KGEpPT09bH07ZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlPXk7ZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lcj1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWt9O2V4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1ofTtcbmV4cG9ydHMuaXNFbGVtZW50PWZ1bmN0aW9uKGEpe3JldHVyblwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJmEuJCR0eXBlb2Y9PT1jfTtleHBvcnRzLmlzRm9yd2FyZFJlZj1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PW59O2V4cG9ydHMuaXNGcmFnbWVudD1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWV9O2V4cG9ydHMuaXNMYXp5PWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09dH07ZXhwb3J0cy5pc01lbW89ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1yfTtleHBvcnRzLmlzUG9ydGFsPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09ZH07ZXhwb3J0cy5pc1Byb2ZpbGVyPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09Z307ZXhwb3J0cy5pc1N0cmljdE1vZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1mfTtleHBvcnRzLmlzU3VzcGVuc2U9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1wfTtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOS4wXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbi8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG52YXIgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpIDogMHhlYWQ4O1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG52YXIgUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZ1bmRhbWVudGFsJykgOiAweGVhZDU7XG52YXIgUkVBQ1RfUkVTUE9OREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5yZXNwb25kZXInKSA6IDB4ZWFkNjtcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUkVTUE9OREVSX1RZUEUpO1xufVxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bsb3dQcmlvcml0eVdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJCR0eXBlb2ZUeXBlID0gdHlwZSAmJiB0eXBlLiQkdHlwZW9mO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCQkdHlwZW9mVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxudmFyIEFzeW5jTW9kZSA9IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbnZhciBDb25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xuXG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTtcblxuLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5mdW5jdGlvbiBpc0FzeW5jTW9kZShvYmplY3QpIHtcbiAge1xuICAgIGlmICghaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUpIHtcbiAgICAgIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gdHJ1ZTtcbiAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gICAgY29udGV4dFR5cGU6IHRydWUsXG4gICAgY29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yOiB0cnVlLFxuICAgIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wczogdHJ1ZSxcbiAgICBtaXhpbnM6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICAgIG5hbWU6IHRydWUsXG4gICAgbGVuZ3RoOiB0cnVlLFxuICAgIHByb3RvdHlwZTogdHJ1ZSxcbiAgICBjYWxsZXI6IHRydWUsXG4gICAgY2FsbGVlOiB0cnVlLFxuICAgIGFyZ3VtZW50czogdHJ1ZSxcbiAgICBhcml0eTogdHJ1ZVxufTtcblxudmFyIEZPUldBUkRfUkVGX1NUQVRJQ1MgPSB7XG4gICAgJyQkdHlwZW9mJzogdHJ1ZSxcbiAgICByZW5kZXI6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZVxufTtcblxudmFyIE1FTU9fU1RBVElDUyA9IHtcbiAgICAnJCR0eXBlb2YnOiB0cnVlLFxuICAgIGNvbXBhcmU6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgVFlQRV9TVEFUSUNTID0ge307XG5UWVBFX1NUQVRJQ1NbUmVhY3RJcy5Gb3J3YXJkUmVmXSA9IEZPUldBUkRfUkVGX1NUQVRJQ1M7XG5cbmZ1bmN0aW9uIGdldFN0YXRpY3MoY29tcG9uZW50KSB7XG4gICAgaWYgKFJlYWN0SXMuaXNNZW1vKGNvbXBvbmVudCkpIHtcbiAgICAgICAgcmV0dXJuIE1FTU9fU1RBVElDUztcbiAgICB9XG4gICAgcmV0dXJuIFRZUEVfU1RBVElDU1tjb21wb25lbnRbJyQkdHlwZW9mJ11dIHx8IFJFQUNUX1NUQVRJQ1M7XG59XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZUNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcblxuICAgICAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmIChpbmhlcml0ZWRDb21wb25lbnQgJiYgaW5oZXJpdGVkQ29tcG9uZW50ICE9PSBvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGFyZ2V0U3RhdGljcyA9IGdldFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50KTtcbiAgICAgICAgdmFyIHNvdXJjZVN0YXRpY3MgPSBnZXRTdGF0aWNzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmICghS05PV05fU1RBVElDU1trZXldICYmICEoYmxhY2tsaXN0ICYmIGJsYWNrbGlzdFtrZXldKSAmJiAhKHNvdXJjZVN0YXRpY3MgJiYgc291cmNlU3RhdGljc1trZXldKSAmJiAhKHRhcmdldFN0YXRpY3MgJiYgdGFyZ2V0U3RhdGljc1trZXldKSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldENvbXBvbmVudCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvaXN0Tm9uUmVhY3RTdGF0aWNzO1xuIiwiaW1wb3J0IGNyZWF0ZUNvbnRleHQgZnJvbSAnbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dCc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIGNyZWF0ZVBhdGggfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG5pbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgeyBpc1ZhbGlkRWxlbWVudFR5cGUgfSBmcm9tICdyZWFjdC1pcyc7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSc7XG5pbXBvcnQgaG9pc3RTdGF0aWNzIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcblxuLy8gVE9ETzogUmVwbGFjZSB3aXRoIFJlYWN0LmNyZWF0ZUNvbnRleHQgb25jZSB3ZSBjYW4gYXNzdW1lIFJlYWN0IDE2K1xuXG52YXIgY3JlYXRlTmFtZWRDb250ZXh0ID0gZnVuY3Rpb24gY3JlYXRlTmFtZWRDb250ZXh0KG5hbWUpIHtcbiAgdmFyIGNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG4gIGNvbnRleHQuZGlzcGxheU5hbWUgPSBuYW1lO1xuICByZXR1cm4gY29udGV4dDtcbn07XG5cbnZhciBjb250ZXh0ID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZU5hbWVkQ29udGV4dChcIlJvdXRlclwiKTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHV0dGluZyBoaXN0b3J5IG9uIGNvbnRleHQuXG4gKi9cblxudmFyIFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIFJvdXRlci5jb21wdXRlUm9vdE1hdGNoID0gZnVuY3Rpb24gY29tcHV0ZVJvb3RNYXRjaChwYXRobmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBcIi9cIixcbiAgICAgIHVybDogXCIvXCIsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaXNFeGFjdDogcGF0aG5hbWUgPT09IFwiL1wiXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBSb3V0ZXIocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvY2F0aW9uOiBwcm9wcy5oaXN0b3J5LmxvY2F0aW9uXG4gICAgfTsgLy8gVGhpcyBpcyBhIGJpdCBvZiBhIGhhY2suIFdlIGhhdmUgdG8gc3RhcnQgbGlzdGVuaW5nIGZvciBsb2NhdGlvblxuICAgIC8vIGNoYW5nZXMgaGVyZSBpbiB0aGUgY29uc3RydWN0b3IgaW4gY2FzZSB0aGVyZSBhcmUgYW55IDxSZWRpcmVjdD5zXG4gICAgLy8gb24gdGhlIGluaXRpYWwgcmVuZGVyLiBJZiB0aGVyZSBhcmUsIHRoZXkgd2lsbCByZXBsYWNlL3B1c2ggd2hlblxuICAgIC8vIHRoZXkgbW91bnQgYW5kIHNpbmNlIGNETSBmaXJlcyBpbiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cywgd2UgbWF5XG4gICAgLy8gZ2V0IGEgbmV3IGxvY2F0aW9uIGJlZm9yZSB0aGUgPFJvdXRlcj4gaXMgbW91bnRlZC5cblxuICAgIF90aGlzLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbnVsbDtcblxuICAgIGlmICghcHJvcHMuc3RhdGljQ29udGV4dCkge1xuICAgICAgX3RoaXMudW5saXN0ZW4gPSBwcm9wcy5oaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgaWYgKF90aGlzLl9pc01vdW50ZWQpIHtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGVuZGluZ0xvY2F0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbG9jYXRpb246IHRoaXMuX3BlbmRpbmdMb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnVubGlzdGVuKSB0aGlzLnVubGlzdGVuKCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCBudWxsLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgaGlzdG9yeTogdGhpcy5wcm9wcy5oaXN0b3J5LFxuICAgICAgICBsb2NhdGlvbjogdGhpcy5zdGF0ZS5sb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IFJvdXRlci5jb21wdXRlUm9vdE1hdGNoKHRoaXMuc3RhdGUubG9jYXRpb24ucGF0aG5hbWUpLFxuICAgICAgICBzdGF0aWNDb250ZXh0OiB0aGlzLnByb3BzLnN0YXRpY0NvbnRleHRcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBzdGF0aWNDb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcmV2UHJvcHMuaGlzdG9yeSA9PT0gdGhpcy5wcm9wcy5oaXN0b3J5LCBcIllvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCBzdG9yZXMgbG9jYXRpb24gaW4gbWVtb3J5LlxuICovXG5cbnZhciBNZW1vcnlSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWVtb3J5Um91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNZW1vcnlSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZU1lbW9yeUhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNZW1vcnlSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNZW1vcnlSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTWVtb3J5Um91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBpbml0aWFsRW50cmllczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluaXRpYWxJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG4gIH07XG5cbiAgTWVtb3J5Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPE1lbW9yeVJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IE1lbW9yeVJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG52YXIgTGlmZWN5Y2xlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKExpZmVjeWNsZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTGlmZWN5Y2xlKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaWZlY3ljbGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW91bnQpIHRoaXMucHJvcHMub25Nb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGUpIHRoaXMucHJvcHMub25VcGRhdGUuY2FsbCh0aGlzLCB0aGlzLCBwcmV2UHJvcHMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uVW5tb3VudCkgdGhpcy5wcm9wcy5vblVubW91bnQuY2FsbCh0aGlzLCB0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBMaWZlY3ljbGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHByb21wdGluZyB0aGUgdXNlciBiZWZvcmUgbmF2aWdhdGluZyBhd2F5IGZyb20gYSBzY3JlZW4uXG4gKi9cblxuZnVuY3Rpb24gUHJvbXB0KF9yZWYpIHtcbiAgdmFyIG1lc3NhZ2UgPSBfcmVmLm1lc3NhZ2UsXG4gICAgICBfcmVmJHdoZW4gPSBfcmVmLndoZW4sXG4gICAgICB3aGVuID0gX3JlZiR3aGVuID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiR3aGVuO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICFjb250ZXh0JCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UHJvbXB0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGlmICghd2hlbiB8fCBjb250ZXh0JCQxLnN0YXRpY0NvbnRleHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtZXRob2QgPSBjb250ZXh0JCQxLmhpc3RvcnkuYmxvY2s7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlmZWN5Y2xlLCB7XG4gICAgICBvbk1vdW50OiBmdW5jdGlvbiBvbk1vdW50KHNlbGYpIHtcbiAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShzZWxmLCBwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5tZXNzYWdlICE9PSBtZXNzYWdlKSB7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlKCk7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25Vbm1vdW50OiBmdW5jdGlvbiBvblVubW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciBtZXNzYWdlVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc3RyaW5nXSk7XG4gIFByb21wdC5wcm9wVHlwZXMgPSB7XG4gICAgd2hlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWVzc2FnZTogbWVzc2FnZVR5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBjYWNoZUxpbWl0ID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCA9IDA7XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXRoKHBhdGgpIHtcbiAgaWYgKGNhY2hlW3BhdGhdKSByZXR1cm4gY2FjaGVbcGF0aF07XG4gIHZhciBnZW5lcmF0b3IgPSBwYXRoVG9SZWdleHAuY29tcGlsZShwYXRoKTtcblxuICBpZiAoY2FjaGVDb3VudCA8IGNhY2hlTGltaXQpIHtcbiAgICBjYWNoZVtwYXRoXSA9IGdlbmVyYXRvcjtcbiAgICBjYWNoZUNvdW50Kys7XG4gIH1cblxuICByZXR1cm4gZ2VuZXJhdG9yO1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBnZW5lcmF0aW5nIGEgVVJMIHBhdGhuYW1lIGZyb20gYSBwYXRoIGFuZCBwYXJhbWV0ZXJzLlxuICovXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVQYXRoKHBhdGgsIHBhcmFtcykge1xuICBpZiAocGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgcGF0aCA9IFwiL1wiO1xuICB9XG5cbiAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgcGFyYW1zID0ge307XG4gIH1cblxuICByZXR1cm4gcGF0aCA9PT0gXCIvXCIgPyBwYXRoIDogY29tcGlsZVBhdGgocGF0aCkocGFyYW1zLCB7XG4gICAgcHJldHR5OiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBuYXZpZ2F0aW5nIHByb2dyYW1tYXRpY2FsbHkgd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG5mdW5jdGlvbiBSZWRpcmVjdChfcmVmKSB7XG4gIHZhciBjb21wdXRlZE1hdGNoID0gX3JlZi5jb21wdXRlZE1hdGNoLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgX3JlZiRwdXNoID0gX3JlZi5wdXNoLFxuICAgICAgcHVzaCA9IF9yZWYkcHVzaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJHB1c2g7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSZWRpcmVjdD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgaGlzdG9yeSA9IGNvbnRleHQkJDEuaGlzdG9yeSxcbiAgICAgICAgc3RhdGljQ29udGV4dCA9IGNvbnRleHQkJDEuc3RhdGljQ29udGV4dDtcbiAgICB2YXIgbWV0aG9kID0gcHVzaCA/IGhpc3RvcnkucHVzaCA6IGhpc3RvcnkucmVwbGFjZTtcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihjb21wdXRlZE1hdGNoID8gdHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gZ2VuZXJhdGVQYXRoKHRvLCBjb21wdXRlZE1hdGNoLnBhcmFtcykgOiBfZXh0ZW5kcyh7fSwgdG8sIHtcbiAgICAgIHBhdGhuYW1lOiBnZW5lcmF0ZVBhdGgodG8ucGF0aG5hbWUsIGNvbXB1dGVkTWF0Y2gucGFyYW1zKVxuICAgIH0pIDogdG8pOyAvLyBXaGVuIHJlbmRlcmluZyBpbiBhIHN0YXRpYyBjb250ZXh0LFxuICAgIC8vIHNldCB0aGUgbmV3IGxvY2F0aW9uIGltbWVkaWF0ZWx5LlxuXG4gICAgaWYgKHN0YXRpY0NvbnRleHQpIHtcbiAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoKSB7XG4gICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICB2YXIgcHJldkxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocHJldlByb3BzLnRvKTtcblxuICAgICAgICBpZiAoIWxvY2F0aW9uc0FyZUVxdWFsKHByZXZMb2NhdGlvbiwgX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgICAgICAga2V5OiBwcmV2TG9jYXRpb24ua2V5XG4gICAgICAgIH0pKSkge1xuICAgICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0bzogdG9cbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICAgIHB1c2g6IFByb3BUeXBlcy5ib29sLFxuICAgIGZyb206IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSQxID0ge307XG52YXIgY2FjaGVMaW1pdCQxID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCQxID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgkMShwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZUtleSA9IFwiXCIgKyBvcHRpb25zLmVuZCArIG9wdGlvbnMuc3RyaWN0ICsgb3B0aW9ucy5zZW5zaXRpdmU7XG4gIHZhciBwYXRoQ2FjaGUgPSBjYWNoZSQxW2NhY2hlS2V5XSB8fCAoY2FjaGUkMVtjYWNoZUtleV0gPSB7fSk7XG4gIGlmIChwYXRoQ2FjaGVbcGF0aF0pIHJldHVybiBwYXRoQ2FjaGVbcGF0aF07XG4gIHZhciBrZXlzID0gW107XG4gIHZhciByZWdleHAgPSBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgcmVnZXhwOiByZWdleHAsXG4gICAga2V5czoga2V5c1xuICB9O1xuXG4gIGlmIChjYWNoZUNvdW50JDEgPCBjYWNoZUxpbWl0JDEpIHtcbiAgICBwYXRoQ2FjaGVbcGF0aF0gPSByZXN1bHQ7XG4gICAgY2FjaGVDb3VudCQxKys7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBtYXRjaGluZyBhIFVSTCBwYXRobmFtZSB0byBhIHBhdGguXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaFBhdGgocGF0aG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikgb3B0aW9ucyA9IHtcbiAgICBwYXRoOiBvcHRpb25zXG4gIH07XG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBwYXRoID0gX29wdGlvbnMucGF0aCxcbiAgICAgIF9vcHRpb25zJGV4YWN0ID0gX29wdGlvbnMuZXhhY3QsXG4gICAgICBleGFjdCA9IF9vcHRpb25zJGV4YWN0ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGV4YWN0LFxuICAgICAgX29wdGlvbnMkc3RyaWN0ID0gX29wdGlvbnMuc3RyaWN0LFxuICAgICAgc3RyaWN0ID0gX29wdGlvbnMkc3RyaWN0ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHN0cmljdCxcbiAgICAgIF9vcHRpb25zJHNlbnNpdGl2ZSA9IF9vcHRpb25zLnNlbnNpdGl2ZSxcbiAgICAgIHNlbnNpdGl2ZSA9IF9vcHRpb25zJHNlbnNpdGl2ZSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRzZW5zaXRpdmU7XG4gIHZhciBwYXRocyA9IFtdLmNvbmNhdChwYXRoKTtcbiAgcmV0dXJuIHBhdGhzLnJlZHVjZShmdW5jdGlvbiAobWF0Y2hlZCwgcGF0aCkge1xuICAgIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKG1hdGNoZWQpIHJldHVybiBtYXRjaGVkO1xuXG4gICAgdmFyIF9jb21waWxlUGF0aCA9IGNvbXBpbGVQYXRoJDEocGF0aCwge1xuICAgICAgZW5kOiBleGFjdCxcbiAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgc2Vuc2l0aXZlOiBzZW5zaXRpdmVcbiAgICB9KSxcbiAgICAgICAgcmVnZXhwID0gX2NvbXBpbGVQYXRoLnJlZ2V4cCxcbiAgICAgICAga2V5cyA9IF9jb21waWxlUGF0aC5rZXlzO1xuXG4gICAgdmFyIG1hdGNoID0gcmVnZXhwLmV4ZWMocGF0aG5hbWUpO1xuICAgIGlmICghbWF0Y2gpIHJldHVybiBudWxsO1xuICAgIHZhciB1cmwgPSBtYXRjaFswXSxcbiAgICAgICAgdmFsdWVzID0gbWF0Y2guc2xpY2UoMSk7XG4gICAgdmFyIGlzRXhhY3QgPSBwYXRobmFtZSA9PT0gdXJsO1xuICAgIGlmIChleGFjdCAmJiAhaXNFeGFjdCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAvLyB0aGUgcGF0aCB1c2VkIHRvIG1hdGNoXG4gICAgICB1cmw6IHBhdGggPT09IFwiL1wiICYmIHVybCA9PT0gXCJcIiA/IFwiL1wiIDogdXJsLFxuICAgICAgLy8gdGhlIG1hdGNoZWQgcG9ydGlvbiBvZiB0aGUgVVJMXG4gICAgICBpc0V4YWN0OiBpc0V4YWN0LFxuICAgICAgLy8gd2hldGhlciBvciBub3Qgd2UgbWF0Y2hlZCBleGFjdGx5XG4gICAgICBwYXJhbXM6IGtleXMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXksIGluZGV4KSB7XG4gICAgICAgIG1lbW9ba2V5Lm5hbWVdID0gdmFsdWVzW2luZGV4XTtcbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICB9LCB7fSlcbiAgICB9O1xuICB9LCBudWxsKTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eUNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPT09IDA7XG59XG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBtYXRjaGluZyBhIHNpbmdsZSBwYXRoIGFuZCByZW5kZXJpbmcuXG4gKi9cblxuXG52YXIgUm91dGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoUm91dGUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJvdXRlKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSb3V0ZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAgICFjb250ZXh0JCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGU+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JCQxLmxvY2F0aW9uO1xuICAgICAgdmFyIG1hdGNoID0gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCA/IF90aGlzLnByb3BzLmNvbXB1dGVkTWF0Y2ggLy8gPFN3aXRjaD4gYWxyZWFkeSBjb21wdXRlZCB0aGUgbWF0Y2ggZm9yIHVzXG4gICAgICA6IF90aGlzLnByb3BzLnBhdGggPyBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIF90aGlzLnByb3BzKSA6IGNvbnRleHQkJDEubWF0Y2g7XG5cbiAgICAgIHZhciBwcm9wcyA9IF9leHRlbmRzKHt9LCBjb250ZXh0JCQxLCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IG1hdGNoXG4gICAgICB9KTtcblxuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBjb21wb25lbnQgPSBfdGhpcyRwcm9wcy5jb21wb25lbnQsXG4gICAgICAgICAgcmVuZGVyID0gX3RoaXMkcHJvcHMucmVuZGVyOyAvLyBQcmVhY3QgdXNlcyBhbiBlbXB0eSBhcnJheSBhcyBjaGlsZHJlbiBieVxuICAgICAgLy8gZGVmYXVsdCwgc28gdXNlIG51bGwgaWYgdGhhdCdzIHRoZSBjYXNlLlxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ocHJvcHMpO1xuXG4gICAgICAgIGlmIChjaGlsZHJlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBfdGhpcy5wcm9wcy5wYXRoO1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgXCJZb3UgcmV0dXJuZWQgYHVuZGVmaW5lZGAgZnJvbSB0aGUgYGNoaWxkcmVuYCBmdW5jdGlvbiBvZiBcIiArIChcIjxSb3V0ZVwiICsgKHBhdGggPyBcIiBwYXRoPVxcXCJcIiArIHBhdGggKyBcIlxcXCJcIiA6IFwiXCIpICsgXCI+LCBidXQgeW91IFwiKSArIFwic2hvdWxkIGhhdmUgcmV0dXJuZWQgYSBSZWFjdCBlbGVtZW50IG9yIGBudWxsYFwiKSA6IHZvaWQgMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Qcm92aWRlciwge1xuICAgICAgICB2YWx1ZTogcHJvcHNcbiAgICAgIH0sIGNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pID8gY2hpbGRyZW4gOiBwcm9wcy5tYXRjaCA/IGNvbXBvbmVudCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcykgOiByZW5kZXIgPyByZW5kZXIocHJvcHMpIDogbnVsbCA6IG51bGwpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSb3V0ZS5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMubm9kZV0pLFxuICAgIGNvbXBvbmVudDogZnVuY3Rpb24gY29tcG9uZW50KHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSAmJiAhaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgcHJvcCAnY29tcG9uZW50JyBzdXBwbGllZCB0byAnUm91dGUnOiB0aGUgcHJvcCBpcyBub3QgYSB2YWxpZCBSZWFjdCBjb21wb25lbnRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcGF0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyldKSxcbiAgICByZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbnNpdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RyaWN0OiBQcm9wVHlwZXMuYm9vbFxuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5jaGlsZHJlbiAmJiAhaXNFbXB0eUNoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4pICYmIHRoaXMucHJvcHMuY29tcG9uZW50KSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIGNvbXBvbmVudD4gYW5kIDxSb3V0ZSBjaGlsZHJlbj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSBjb21wb25lbnQ+IHdpbGwgYmUgaWdub3JlZFwiKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5jaGlsZHJlbiAmJiAhaXNFbXB0eUNoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4pICYmIHRoaXMucHJvcHMucmVuZGVyKSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIHJlbmRlcj4gYW5kIDxSb3V0ZSBjaGlsZHJlbj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSByZW5kZXI+IHdpbGwgYmUgaWdub3JlZFwiKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5jb21wb25lbnQgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIHJlbmRlcj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSByZW5kZXI+IHdpbGwgYmUgaWdub3JlZFwiKSA6IHZvaWQgMDtcbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKHByZXZQcm9wcykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmxvY2F0aW9uICYmICFwcmV2UHJvcHMubG9jYXRpb24pLCAnPFJvdXRlPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISghdGhpcy5wcm9wcy5sb2NhdGlvbiAmJiBwcmV2UHJvcHMubG9jYXRpb24pLCAnPFJvdXRlPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCIgPyBwYXRoIDogXCIvXCIgKyBwYXRoO1xufVxuXG5mdW5jdGlvbiBhZGRCYXNlbmFtZShiYXNlbmFtZSwgbG9jYXRpb24pIHtcbiAgaWYgKCFiYXNlbmFtZSkgcmV0dXJuIGxvY2F0aW9uO1xuICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgcGF0aG5hbWU6IGFkZExlYWRpbmdTbGFzaChiYXNlbmFtZSkgKyBsb2NhdGlvbi5wYXRobmFtZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShiYXNlbmFtZSwgbG9jYXRpb24pIHtcbiAgaWYgKCFiYXNlbmFtZSkgcmV0dXJuIGxvY2F0aW9uO1xuICB2YXIgYmFzZSA9IGFkZExlYWRpbmdTbGFzaChiYXNlbmFtZSk7XG4gIGlmIChsb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKGJhc2UpICE9PSAwKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyKGJhc2UubGVuZ3RoKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVVJMKGxvY2F0aW9uKSB7XG4gIHJldHVybiB0eXBlb2YgbG9jYXRpb24gPT09IFwic3RyaW5nXCIgPyBsb2NhdGlvbiA6IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xufVxuXG5mdW5jdGlvbiBzdGF0aWNIYW5kbGVyKG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IGNhbm5vdCAlcyB3aXRoIDxTdGF0aWNSb3V0ZXI+XCIsIG1ldGhvZE5hbWUpIDogaW52YXJpYW50KGZhbHNlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4vKipcbiAqIFRoZSBwdWJsaWMgdG9wLWxldmVsIEFQSSBmb3IgYSBcInN0YXRpY1wiIDxSb3V0ZXI+LCBzby1jYWxsZWQgYmVjYXVzZSBpdFxuICogY2FuJ3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBjdXJyZW50IGxvY2F0aW9uLiBJbnN0ZWFkLCBpdCBqdXN0IHJlY29yZHNcbiAqIGxvY2F0aW9uIGNoYW5nZXMgaW4gYSBjb250ZXh0IG9iamVjdC4gVXNlZnVsIG1haW5seSBpbiB0ZXN0aW5nIGFuZFxuICogc2VydmVyLXJlbmRlcmluZyBzY2VuYXJpb3MuXG4gKi9cblxuXG52YXIgU3RhdGljUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFN0YXRpY1JvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3RhdGljUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuXG4gICAgX3RoaXMuaGFuZGxlUHVzaCA9IGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIF90aGlzLm5hdmlnYXRlVG8obG9jYXRpb24sIFwiUFVTSFwiKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlUmVwbGFjZSA9IGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIF90aGlzLm5hdmlnYXRlVG8obG9jYXRpb24sIFwiUkVQTEFDRVwiKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlTGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUJsb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTdGF0aWNSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24gbmF2aWdhdGVUbyhsb2NhdGlvbiwgYWN0aW9uKSB7XG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgX3RoaXMkcHJvcHMkYmFzZW5hbWUgPSBfdGhpcyRwcm9wcy5iYXNlbmFtZSxcbiAgICAgICAgYmFzZW5hbWUgPSBfdGhpcyRwcm9wcyRiYXNlbmFtZSA9PT0gdm9pZCAwID8gXCJcIiA6IF90aGlzJHByb3BzJGJhc2VuYW1lLFxuICAgICAgICBfdGhpcyRwcm9wcyRjb250ZXh0ID0gX3RoaXMkcHJvcHMuY29udGV4dCxcbiAgICAgICAgY29udGV4dCA9IF90aGlzJHByb3BzJGNvbnRleHQgPT09IHZvaWQgMCA/IHt9IDogX3RoaXMkcHJvcHMkY29udGV4dDtcbiAgICBjb250ZXh0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICBjb250ZXh0LmxvY2F0aW9uID0gYWRkQmFzZW5hbWUoYmFzZW5hbWUsIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSk7XG4gICAgY29udGV4dC51cmwgPSBjcmVhdGVVUkwoY29udGV4dC5sb2NhdGlvbik7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMkcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgX3RoaXMkcHJvcHMyJGJhc2VuYW1lID0gX3RoaXMkcHJvcHMyLmJhc2VuYW1lLFxuICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzMiRiYXNlbmFtZSA9PT0gdm9pZCAwID8gXCJcIiA6IF90aGlzJHByb3BzMiRiYXNlbmFtZSxcbiAgICAgICAgX3RoaXMkcHJvcHMyJGNvbnRleHQgPSBfdGhpcyRwcm9wczIuY29udGV4dCxcbiAgICAgICAgY29udGV4dCA9IF90aGlzJHByb3BzMiRjb250ZXh0ID09PSB2b2lkIDAgPyB7fSA6IF90aGlzJHByb3BzMiRjb250ZXh0LFxuICAgICAgICBfdGhpcyRwcm9wczIkbG9jYXRpb24gPSBfdGhpcyRwcm9wczIubG9jYXRpb24sXG4gICAgICAgIGxvY2F0aW9uID0gX3RoaXMkcHJvcHMyJGxvY2F0aW9uID09PSB2b2lkIDAgPyBcIi9cIiA6IF90aGlzJHByb3BzMiRsb2NhdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzMiwgW1wiYmFzZW5hbWVcIiwgXCJjb250ZXh0XCIsIFwibG9jYXRpb25cIl0pO1xuXG4gICAgdmFyIGhpc3RvcnkgPSB7XG4gICAgICBjcmVhdGVIcmVmOiBmdW5jdGlvbiBjcmVhdGVIcmVmKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdTbGFzaChiYXNlbmFtZSArIGNyZWF0ZVVSTChwYXRoKSk7XG4gICAgICB9LFxuICAgICAgYWN0aW9uOiBcIlBPUFwiLFxuICAgICAgbG9jYXRpb246IHN0cmlwQmFzZW5hbWUoYmFzZW5hbWUsIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSksXG4gICAgICBwdXNoOiB0aGlzLmhhbmRsZVB1c2gsXG4gICAgICByZXBsYWNlOiB0aGlzLmhhbmRsZVJlcGxhY2UsXG4gICAgICBnbzogc3RhdGljSGFuZGxlcihcImdvXCIpLFxuICAgICAgZ29CYWNrOiBzdGF0aWNIYW5kbGVyKFwiZ29CYWNrXCIpLFxuICAgICAgZ29Gb3J3YXJkOiBzdGF0aWNIYW5kbGVyKFwiZ29Gb3J3YXJkXCIpLFxuICAgICAgbGlzdGVuOiB0aGlzLmhhbmRsZUxpc3RlbixcbiAgICAgIGJsb2NrOiB0aGlzLmhhbmRsZUJsb2NrXG4gICAgfTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIF9leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgICAgc3RhdGljQ29udGV4dDogY29udGV4dFxuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4gU3RhdGljUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFN0YXRpY1JvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pXG4gIH07XG5cbiAgU3RhdGljUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPFN0YXRpY1JvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IFN0YXRpY1JvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciByZW5kZXJpbmcgdGhlIGZpcnN0IDxSb3V0ZT4gdGhhdCBtYXRjaGVzLlxuICovXG5cbnZhciBTd2l0Y2ggPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoU3dpdGNoLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTd2l0Y2goKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFN3aXRjaC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAgICFjb250ZXh0JCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8U3dpdGNoPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgdmFyIGxvY2F0aW9uID0gX3RoaXMucHJvcHMubG9jYXRpb24gfHwgY29udGV4dCQkMS5sb2NhdGlvbjtcbiAgICAgIHZhciBlbGVtZW50LCBtYXRjaDsgLy8gV2UgdXNlIFJlYWN0LkNoaWxkcmVuLmZvckVhY2ggaW5zdGVhZCBvZiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KCkuZmluZCgpXG4gICAgICAvLyBoZXJlIGJlY2F1c2UgdG9BcnJheSBhZGRzIGtleXMgdG8gYWxsIGNoaWxkIGVsZW1lbnRzIGFuZCB3ZSBkbyBub3Qgd2FudFxuICAgICAgLy8gdG8gdHJpZ2dlciBhbiB1bm1vdW50L3JlbW91bnQgZm9yIHR3byA8Um91dGU+cyB0aGF0IHJlbmRlciB0aGUgc2FtZVxuICAgICAgLy8gY29tcG9uZW50IGF0IGRpZmZlcmVudCBVUkxzLlxuXG4gICAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKF90aGlzLnByb3BzLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwgJiYgUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgZWxlbWVudCA9IGNoaWxkO1xuICAgICAgICAgIHZhciBwYXRoID0gY2hpbGQucHJvcHMucGF0aCB8fCBjaGlsZC5wcm9wcy5mcm9tO1xuICAgICAgICAgIG1hdGNoID0gcGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX2V4dGVuZHMoe30sIGNoaWxkLnByb3BzLCB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoXG4gICAgICAgICAgfSkpIDogY29udGV4dCQkMS5tYXRjaDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2ggPyBSZWFjdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwge1xuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIGNvbXB1dGVkTWF0Y2g6IG1hdGNoXG4gICAgICB9KSA6IG51bGw7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFN3aXRjaDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTd2l0Y2gucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdFxuICB9O1xuXG4gIFN3aXRjaC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKHByZXZQcm9wcykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmxvY2F0aW9uICYmICFwcmV2UHJvcHMubG9jYXRpb24pLCAnPFN3aXRjaD4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSB1bmNvbnRyb2xsZWQgdG8gY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBpbml0aWFsbHkgdXNlZCBubyBcImxvY2F0aW9uXCIgcHJvcCBhbmQgdGhlbiBwcm92aWRlZCBvbmUgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEoIXRoaXMucHJvcHMubG9jYXRpb24gJiYgcHJldlByb3BzLmxvY2F0aW9uKSwgJzxTd2l0Y2g+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHB1YmxpYyBoaWdoZXItb3JkZXIgY29tcG9uZW50IHRvIGFjY2VzcyB0aGUgaW1wZXJhdGl2ZSBBUElcbiAqL1xuXG5mdW5jdGlvbiB3aXRoUm91dGVyKENvbXBvbmVudCkge1xuICB2YXIgZGlzcGxheU5hbWUgPSBcIndpdGhSb3V0ZXIoXCIgKyAoQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lKSArIFwiKVwiO1xuXG4gIHZhciBDID0gZnVuY3Rpb24gQyhwcm9wcykge1xuICAgIHZhciB3cmFwcGVkQ29tcG9uZW50UmVmID0gcHJvcHMud3JhcHBlZENvbXBvbmVudFJlZixcbiAgICAgICAgcmVtYWluaW5nUHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShwcm9wcywgW1wid3JhcHBlZENvbXBvbmVudFJlZlwiXSk7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxcIiArIGRpc3BsYXlOYW1lICsgXCIgLz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHJlbWFpbmluZ1Byb3BzLCBjb250ZXh0JCQxLCB7XG4gICAgICAgIHJlZjogd3JhcHBlZENvbXBvbmVudFJlZlxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEMuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgQy5XcmFwcGVkQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBDLnByb3BUeXBlcyA9IHtcbiAgICAgIHdyYXBwZWRDb21wb25lbnRSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMub2JqZWN0XSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGhvaXN0U3RhdGljcyhDLCBDb21wb25lbnQpO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIGdsb2JhbCA9IHdpbmRvdztcbiAgICB2YXIga2V5ID0gXCJfX3JlYWN0X3JvdXRlcl9idWlsZF9fXCI7XG4gICAgdmFyIGJ1aWxkTmFtZXMgPSB7XG4gICAgICBjanM6IFwiQ29tbW9uSlNcIixcbiAgICAgIGVzbTogXCJFUyBtb2R1bGVzXCIsXG4gICAgICB1bWQ6IFwiVU1EXCJcbiAgICB9O1xuXG4gICAgaWYgKGdsb2JhbFtrZXldICYmIGdsb2JhbFtrZXldICE9PSBcImVzbVwiKSB7XG4gICAgICB2YXIgaW5pdGlhbEJ1aWxkTmFtZSA9IGJ1aWxkTmFtZXNbZ2xvYmFsW2tleV1dO1xuICAgICAgdmFyIHNlY29uZGFyeUJ1aWxkTmFtZSA9IGJ1aWxkTmFtZXNbXCJlc21cIl07IC8vIFRPRE86IEFkZCBsaW5rIHRvIGFydGljbGUgdGhhdCBleHBsYWlucyBpbiBkZXRhaWwgaG93IHRvIGF2b2lkXG4gICAgICAvLyBsb2FkaW5nIDIgZGlmZmVyZW50IGJ1aWxkcy5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGFyZSBsb2FkaW5nIHRoZSBcIiArIHNlY29uZGFyeUJ1aWxkTmFtZSArIFwiIGJ1aWxkIG9mIFJlYWN0IFJvdXRlciBcIiArIChcIm9uIGEgcGFnZSB0aGF0IGlzIGFscmVhZHkgcnVubmluZyB0aGUgXCIgKyBpbml0aWFsQnVpbGROYW1lICsgXCIgXCIpICsgXCJidWlsZCwgc28gdGhpbmdzIHdvbid0IHdvcmsgcmlnaHQuXCIpO1xuICAgIH1cblxuICAgIGdsb2JhbFtrZXldID0gXCJlc21cIjtcbiAgfVxufVxuXG5leHBvcnQgeyBNZW1vcnlSb3V0ZXIsIFByb21wdCwgUmVkaXJlY3QsIFJvdXRlLCBSb3V0ZXIsIFN0YXRpY1JvdXRlciwgU3dpdGNoLCBnZW5lcmF0ZVBhdGgsIG1hdGNoUGF0aCwgd2l0aFJvdXRlciwgY29udGV4dCBhcyBfX1JvdXRlckNvbnRleHQgfTtcbiIsImltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZXIsIF9fUm91dGVyQ29udGV4dCwgbWF0Y2hQYXRoIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmV4cG9ydCAqIGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uIH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG5cbnZhciBCcm93c2VyUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEJyb3dzZXJSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEJyb3dzZXJSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQnJvd3NlclJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEJyb3dzZXJSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQnJvd3NlclJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGZvcmNlUmVmcmVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyXG4gIH07XG5cbiAgQnJvd3NlclJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxCcm93c2VyUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyB3aW5kb3cubG9jYXRpb24uaGFzaC5cbiAqL1xuXG52YXIgSGFzaFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShIYXNoUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBIYXNoUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVIYXNoSGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEhhc2hSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBIYXNoUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEhhc2hSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYXNoVHlwZTogUHJvcFR5cGVzLm9uZU9mKFtcImhhc2hiYW5nXCIsIFwibm9zbGFzaFwiLCBcInNsYXNoXCJdKVxuICB9O1xuXG4gIEhhc2hSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8SGFzaFJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IEhhc2hSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAhIShldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KTtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyBhIGhpc3RvcnktYXdhcmUgPGE+LlxuICovXG5cblxudmFyIExpbmsgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTGluaywgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTGluaygpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTGluay5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmhhbmRsZUNsaWNrID0gZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXZlbnQsIGhpc3RvcnkpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljaykgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRocm93IGV4O1xuICAgIH1cblxuICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCAmJiAvLyBvbkNsaWNrIHByZXZlbnRlZCBkZWZhdWx0XG4gICAgZXZlbnQuYnV0dG9uID09PSAwICYmICggLy8gaWdub3JlIGV2ZXJ5dGhpbmcgYnV0IGxlZnQgY2xpY2tzXG4gICAgIXRoaXMucHJvcHMudGFyZ2V0IHx8IHRoaXMucHJvcHMudGFyZ2V0ID09PSBcIl9zZWxmXCIpICYmIC8vIGxldCBicm93c2VyIGhhbmRsZSBcInRhcmdldD1fYmxhbmtcIiBldGMuXG4gICAgIWlzTW9kaWZpZWRFdmVudChldmVudCkgLy8gaWdub3JlIGNsaWNrcyB3aXRoIG1vZGlmaWVyIGtleXNcbiAgICApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIG1ldGhvZCA9IHRoaXMucHJvcHMucmVwbGFjZSA/IGhpc3RvcnkucmVwbGFjZSA6IGhpc3RvcnkucHVzaDtcbiAgICAgICAgbWV0aG9kKHRoaXMucHJvcHMudG8pO1xuICAgICAgfVxuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIGlubmVyUmVmID0gX3RoaXMkcHJvcHMuaW5uZXJSZWYsXG4gICAgICAgIHJlcGxhY2UgPSBfdGhpcyRwcm9wcy5yZXBsYWNlLFxuICAgICAgICB0byA9IF90aGlzJHByb3BzLnRvLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMsIFtcImlubmVyUmVmXCIsIFwicmVwbGFjZVwiLCBcInRvXCJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChfX1JvdXRlckNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPExpbms+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBjcmVhdGVMb2NhdGlvbih0bywgbnVsbCwgbnVsbCwgY29udGV4dC5sb2NhdGlvbikgOiB0bztcbiAgICAgIHZhciBocmVmID0gbG9jYXRpb24gPyBjb250ZXh0Lmhpc3RvcnkuY3JlYXRlSHJlZihsb2NhdGlvbikgOiBcIlwiO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIF9leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaGFuZGxlQ2xpY2soZXZlbnQsIGNvbnRleHQuaGlzdG9yeSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgIHJlZjogaW5uZXJSZWZcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTGluaztcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICB2YXIgdG9UeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pO1xuICB2YXIgaW5uZXJSZWZUeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgY3VycmVudDogUHJvcFR5cGVzLmFueVxuICB9KV0pO1xuICBMaW5rLnByb3BUeXBlcyA9IHtcbiAgICBpbm5lclJlZjogaW5uZXJSZWZUeXBlLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlcGxhY2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhcmdldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0bzogdG9UeXBlLmlzUmVxdWlyZWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gam9pbkNsYXNzbmFtZXMoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjbGFzc25hbWVzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGNsYXNzbmFtZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gY2xhc3NuYW1lcy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gaTtcbiAgfSkuam9pbihcIiBcIik7XG59XG4vKipcbiAqIEEgPExpbms+IHdyYXBwZXIgdGhhdCBrbm93cyBpZiBpdCdzIFwiYWN0aXZlXCIgb3Igbm90LlxuICovXG5cblxuZnVuY3Rpb24gTmF2TGluayhfcmVmKSB7XG4gIHZhciBfcmVmJGFyaWFDdXJyZW50ID0gX3JlZltcImFyaWEtY3VycmVudFwiXSxcbiAgICAgIGFyaWFDdXJyZW50ID0gX3JlZiRhcmlhQ3VycmVudCA9PT0gdm9pZCAwID8gXCJwYWdlXCIgOiBfcmVmJGFyaWFDdXJyZW50LFxuICAgICAgX3JlZiRhY3RpdmVDbGFzc05hbWUgPSBfcmVmLmFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYkYWN0aXZlQ2xhc3NOYW1lID09PSB2b2lkIDAgPyBcImFjdGl2ZVwiIDogX3JlZiRhY3RpdmVDbGFzc05hbWUsXG4gICAgICBhY3RpdmVTdHlsZSA9IF9yZWYuYWN0aXZlU3R5bGUsXG4gICAgICBjbGFzc05hbWVQcm9wID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBleGFjdCA9IF9yZWYuZXhhY3QsXG4gICAgICBpc0FjdGl2ZVByb3AgPSBfcmVmLmlzQWN0aXZlLFxuICAgICAgbG9jYXRpb25Qcm9wID0gX3JlZi5sb2NhdGlvbixcbiAgICAgIHN0cmljdCA9IF9yZWYuc3RyaWN0LFxuICAgICAgc3R5bGVQcm9wID0gX3JlZi5zdHlsZSxcbiAgICAgIHRvID0gX3JlZi50byxcbiAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJhcmlhLWN1cnJlbnRcIiwgXCJhY3RpdmVDbGFzc05hbWVcIiwgXCJhY3RpdmVTdHlsZVwiLCBcImNsYXNzTmFtZVwiLCBcImV4YWN0XCIsIFwiaXNBY3RpdmVcIiwgXCJsb2NhdGlvblwiLCBcInN0cmljdFwiLCBcInN0eWxlXCIsIFwidG9cIl0pO1xuXG4gIHZhciBwYXRoID0gdHlwZW9mIHRvID09PSBcIm9iamVjdFwiID8gdG8ucGF0aG5hbWUgOiB0bzsgLy8gUmVnZXggdGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3BpbGxhcmpzL3BhdGgtdG8tcmVnZXhwL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0wyMDJcblxuICB2YXIgZXNjYXBlZFBhdGggPSBwYXRoICYmIHBhdGgucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChfX1JvdXRlckNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgIWNvbnRleHQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxOYXZMaW5rPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBwYXRoVG9NYXRjaCA9IGxvY2F0aW9uUHJvcCA/IGxvY2F0aW9uUHJvcC5wYXRobmFtZSA6IGNvbnRleHQubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIG1hdGNoID0gZXNjYXBlZFBhdGggPyBtYXRjaFBhdGgocGF0aFRvTWF0Y2gsIHtcbiAgICAgIHBhdGg6IGVzY2FwZWRQYXRoLFxuICAgICAgZXhhY3Q6IGV4YWN0LFxuICAgICAgc3RyaWN0OiBzdHJpY3RcbiAgICB9KSA6IG51bGw7XG4gICAgdmFyIGlzQWN0aXZlID0gISEoaXNBY3RpdmVQcm9wID8gaXNBY3RpdmVQcm9wKG1hdGNoLCBjb250ZXh0LmxvY2F0aW9uKSA6IG1hdGNoKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gaXNBY3RpdmUgPyBqb2luQ2xhc3NuYW1lcyhjbGFzc05hbWVQcm9wLCBhY3RpdmVDbGFzc05hbWUpIDogY2xhc3NOYW1lUHJvcDtcbiAgICB2YXIgc3R5bGUgPSBpc0FjdGl2ZSA/IF9leHRlbmRzKHt9LCBzdHlsZVByb3AsIGFjdGl2ZVN0eWxlKSA6IHN0eWxlUHJvcDtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCBfZXh0ZW5kcyh7XG4gICAgICBcImFyaWEtY3VycmVudFwiOiBpc0FjdGl2ZSAmJiBhcmlhQ3VycmVudCB8fCBudWxsLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgICB0bzogdG9cbiAgICB9LCByZXN0KSk7XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciBhcmlhQ3VycmVudFR5cGUgPSBQcm9wVHlwZXMub25lT2YoW1wicGFnZVwiLCBcInN0ZXBcIiwgXCJsb2NhdGlvblwiLCBcImRhdGVcIiwgXCJ0aW1lXCIsIFwidHJ1ZVwiXSk7XG4gIE5hdkxpbmsucHJvcFR5cGVzID0gX2V4dGVuZHMoe30sIExpbmsucHJvcFR5cGVzLCB7XG4gICAgXCJhcmlhLWN1cnJlbnRcIjogYXJpYUN1cnJlbnRUeXBlLFxuICAgIGFjdGl2ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXhhY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQWN0aXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gIH0pO1xufVxuXG5leHBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBMaW5rLCBOYXZMaW5rIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVtYWlsUmVnZXggPSAvW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/L1xuY29uc3QgcGFzc3dvcmRSZWdleCA9IC8oKD89LipcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qW1xcV10pLns4LDY0fSkvZ1xuY29uc3QgbWVzc2FnZVJlZ2V4ID0vZGYvZ1xuY29uc3QgZW1haWxSZXF1aXJlbWVudHMgPSBcIndyb25nIGVtYWlsIGZvcm1hdFwiXG5jb25zdCBwYXNzcG9ydFJlcXVpcmVtZW50cyA9IFwiRW5zdXJlIHRoYXQgcGFzc3dvcmQgaXMgOCB0byA2NCBjaGFyYWN0ZXJzIGxvbmcgYW5kIGNvbnRhaW5zIGEgbWl4IG9mIHVwcGVyIGFuZCBsb3dlciBjYXNlIGNoYXJhY3RlcnMsIG9uZSBudW1lcmljIGFuZCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIlxuXG5jb25zdCBpbml0aWFsVmFsaWRhdGlvblN0YXRlID0ge1xuICAgIGVtYWlsOiB7IGlzVmFsaWQ6IHRydWUsIG1lc3NhZ2U6IFwiXCIgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICBpc1ZhbGlkOiB0cnVlLCBtZXNzYWdlOiBcIlwiXG4gICAgfVxufVxuXG5jb25zdCBpc1ZhbGlkID0gKHsgZW1haWwgPSB1bmRlZmluZWQsIHBhc3N3b3JkID0gdW5kZWZpbmVkLCBtZXNzYWdlPSB1bmRlZmluZWQgfSkgPT4ge1xuICAgIGxldCBlbWFpbFZhbGlkYXRpb24gPSB0cnVlXG4gICAgbGV0IHBhc3N3b3JkVmFsaWRhdGlvbiA9IHRydWVcbiAgICBpZiAoZW1haWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbWFpbFZhbGlkYXRpb24gPSBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpID8geyBpc1ZhbGlkOiB0cnVlIH0gOiB7IGlzVmFsaWQ6IGZhbHNlLCBtZXNzYWdlOiBlbWFpbFJlcXVpcmVtZW50cyB9XG4gICAgfVxuICAgIGlmIChwYXNzd29yZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhc3N3b3JkVmFsaWRhdGlvbiA9IHBhc3N3b3JkUmVnZXgudGVzdChwYXNzd29yZCkgPyB7IGlzVmFsaWQ6IHRydWUgfSA6IHsgaXNWYWxpZDogZmFsc2UsIG1lc3NhZ2U6IHBhc3Nwb3J0UmVxdWlyZW1lbnRzIH1cbiAgICB9XG4gICAgaWYobWVzc2FnZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgbWVzc2FnZVZhbGlkYXRpb24gPSBcIlwiXG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB7IGVtYWlsOiBlbWFpbFZhbGlkYXRpb24sIHBhc3N3b3JkOiBwYXNzd29yZFZhbGlkYXRpb24gfVxuICAgIHJldHVybiAoc2VsZikgPT4ge1xuICAgICAgICBzZWxmLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHQuZW1haWwuaXNWYWxpZCAmJiB2YWxpZGF0aW9uUmVzdWx0LnBhc3N3b3JkLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4vL2V4cG9ydCBkZWZhdWx0IGlzVmFsaWRcbmV4cG9ydCB7XG4gICAgaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSxcbiAgICBpc1ZhbGlkXG59XG5cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGRlZXBNZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIC8vIE9ubHkgTm9kZS5KUyBoYXMgYSBwcm9jZXNzIHZhcmlhYmxlIHRoYXQgaXMgb2YgW1tDbGFzc11dIHByb2Nlc3NcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHV0aWxzLmZvckVhY2goWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ10sIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J10sIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsXG4gICAgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsXG4gICAgJ3NvY2tldFBhdGgnXG4gIF0sIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kID8gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ2dldCc7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtpc1ZhbGlkLGluaXRpYWxWYWxpZGF0aW9uU3RhdGV9IGZyb20gJ0BhdXRoanMvdmFsaWRhdGlvbidcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmV4cG9ydCBjb25zdCBFbWFpbFBhc3N3b3JkQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKVxuXG5cblxuY2xhc3MgRW1haWxQYXNzd29yZFByb3ZpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0ZSA9IHsgbG9hZGluZzogZmFsc2UsIHRva2VuOiBcIlwiLCBpc0xvZ2dlZEluOiBmYWxzZSwgZW1haWw6IFwiXCIsIHBhc3N3b3JkOiBcIlwiLCBjb25maXJtOiBcIlwiLCBzZXJ2ZXJFcnJvcjogXCJcIiwgdmFsaWRhdGlvbjogaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5sb2dnZWRJbigpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHNldFRva2VuID0gKHsgdG9rZW4gfSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdG9rZW4gfSlcbiAgICB9XG4gICAgb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogdmFsdWUgfSlcbiAgICAgICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKVxuICAgIH1cbiAgICByZXNldFZhbGlkYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiBpbml0aWFsVmFsaWRhdGlvblN0YXRlIH0pXG4gICAgfVxuICAgIHJlY292ZXJQYXNzd29yZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgLy8gIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB2YWxpZGF0ZSh7IGVtYWlsIH0pXG4gICAgICAvLyAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4udmFsaWRhdGlvblJlc3VsdCB9IH0pXG4gICAgICAgIGlmIChpc1ZhbGlkKHtlbWFpbH0pKHRoaXMpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvcmVjb3ZlcicsIHsgZW1haWwgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzpmYWxzZX0pXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWRhdGlvbi5lbWFpbC5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9IH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvcixsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRQYXNzd29yZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBwYXNzd29yZCwgdG9rZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgaWYgKGlzVmFsaWQoe3Bhc3N3b3JkfSkodGhpcykpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9jaGFuZ2UnLCB7IHBhc3N3b3JkLCB0b2tlbiB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZTogZGF0YSxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaWdudXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGlmIChpc1ZhbGlkKHtlbWFpbCxwYXNzd29yZH0pKHRoaXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9zaWdudXAnLCB7IGVtYWlsLCBwYXNzd29yZCB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAvL1NlcnZlciBzaWRlIHZhbGlkYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRva2VuKGRhdGEudG9rZW4pOyAvLyBTZXR0aW5nIHRoZSB0b2tlbiBpbiBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImlzIG5vdCB2YWxpZCAtLS0tLS1cIiwgZW1haWwscGFzc3dvcmQpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxufVxuXG4gICAgbG9naW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGlmIChpc1ZhbGlkKHtlbWFpbCxwYXNzd29yZH0pKHRoaXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICAgICAgLy8gR2V0IGEgdG9rZW4gZnJvbSBhcGkgc2VydmVyIHVzaW5nIHRoZSBmZXRjaCBhcGlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcblxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvbG9nLWluJywge1xuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXhpb3MgcmVzcG9uc2VcIiwgcmVzcG9uc2UpXG4gICAgICAgICAgICAvL1NlcnZlciBzaWRlIHZhbGlkYXRpb25cbiAgICAgICAgICAgIGlmIChkYXRhLnRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi5kYXRhLnZhbGlkYXRpb24gfSxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogdHJ1ZSxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICB0aGlzLnNldFRva2VuKGRhdGEudG9rZW4pOyAvLyBTZXR0aW5nIHRoZSB0b2tlbiBpbiBsb2NhbFN0b3JhZ2VcblxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KVxuICAgIH1lbHNle1xuICAgICAgICBjb25zb2xlLmxvZyhcImlzIG5vdCB2YWxpZCAtLS0tLS1cIiwgZW1haWwscGFzc3dvcmQpXG4gICAgfVxuICAgIH1cbiAgICBsb2dnZWRJbiA9ICgpID0+IHtcbiAgICAgICAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7IC8vIEdldHRpbmcgdG9rZW4gZnJvbSBsb2NhbHN0b3JhZ2VcbiAgICAgICAgcmV0dXJuICEhdG9rZW4gJiYgIXRoaXMuaXNUb2tlbkV4cGlyZWQodG9rZW4pOyAvLyBoYW5kd2FpdmluZyBoZXJlXG4gICAgfTtcblxuICAgIGlzVG9rZW5FeHBpcmVkID0gdG9rZW4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZSh0b2tlbik7XG4gICAgICAgICAgICBpZiAoZGVjb2RlZC5leHAgPCBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgICAgICAgICAgIC8vIENoZWNraW5nIGlmIHRva2VuIGlzIGV4cGlyZWQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXRUb2tlbiA9IGlkVG9rZW4gPT4ge1xuICAgICAgICAvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlkX3Rva2VuXCIsIGlkVG9rZW4pO1xuICAgIH07XG5cbiAgICBnZXRUb2tlbiA9ICgpID0+IHtcbiAgICAgICAgLy8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpO1xuICAgIH07XG5cbiAgICBsb2dvdXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiBmYWxzZSwgdXNlcm5hbWU6IFwiXCIsIGVycm9yOiBcIlwiLCBtZXNzYWdlOiBcIlwiIH0pXG4gICAgICAgIC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImlkX3Rva2VuXCIpO1xuICAgIH07XG5cbiAgICBnZXRDb25maXJtID0gKCkgPT4ge1xuICAgICAgICAvLyBVc2luZyBqd3QtZGVjb2RlIG5wbSBwYWNrYWdlIHRvIGRlY29kZSB0aGUgdG9rZW5cbiAgICAgICAgbGV0IGFuc3dlciA9IGRlY29kZSh0aGlzLmdldFRva2VuKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlY2lldmVkIGFuc3dlciFcIik7XG4gICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgfTtcblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgbG9hZGluZywgaXNMb2dnZWRJbiwgZW1haWwsIHBhc3N3b3JkLCB2YWxpZGF0aW9uLCBjb25maXJtIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7XG4gICAgICAgICAgICBsb2dpbjogdGhpcy5sb2dpbixcbiAgICAgICAgICAgIGlzTG9nZ2VkSW4sXG4gICAgICAgICAgICBsb2dvdXQ6IHRoaXMubG9nb3V0LFxuICAgICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAgIHNpZ251cDogdGhpcy5zaWdudXAsXG4gICAgICAgICAgICByZXNldFBhc3N3b3JkOiB0aGlzLnJlc2V0UGFzc3dvcmQsXG4gICAgICAgICAgICByZWNvdmVyUGFzc3dvcmQ6IHRoaXMucmVjb3ZlclBhc3N3b3JkLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIGNvbmZpcm0sXG4gICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgICAgICAgIHZhbGlkYXRpb24sXG4gICAgICAgICAgICBzZXRUb2tlbjogdGhpcy5zZXRUb2tlblxuICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L0VtYWlsUGFzc3dvcmRDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbWFpbFBhc3N3b3JkUHJvdmlkZXIiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE3IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goaW5uZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuY29uc3QgQ3VzdG9tSW5wdXQgPSAoeyB0eXBlLCBwbGFjZWhvbGRlciwgbmFtZSwgdmFsaWRhdGlvbiwgb25DaGFuZ2UsIHZhbHVlLCBsYWJlbCB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbCBmb3JodG1sPVwicGFzc3dvcmRcIj57bGFiZWx9OiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdmb3JtLWNvbnRyb2wnLCB7ICdpcy1pbnZhbGlkJzogIXZhbGlkYXRpb24uaXNWYWxpZCB9KX0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWx1ZT17dmFsdWV9IG5hbWU9e25hbWV9IHR5cGU9e3R5cGV9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnZhbGlkLWZlZWRiYWNrXCI+XG4gICAgICAgICAgICB7dmFsaWRhdGlvbi5tZXNzYWdlfTwvZGl2PlxuICAgIDwvZGl2Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tSW5wdXQiLCJcblxuXG5cblxuXG5cblxuY29uc3QgQXN5bmNCdXR0b24gPSAoeyB0aXRsZSwgbG9hZGluZywgb25DbGljaywgZGlzYWJsZWQgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcInJlbGF0aXZlXCJ9fT5cbiAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiLCBtYXJnaW5Ub3A6MywgbWFyZ2luQm90dG9tOjMgfX0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCIgb25DbGljaz17b25DbGlja30gZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGxvYWRpbmd9Pntsb2FkaW5nID88ZGl2PjxQcm9ncmVzc0xvYWRlci8+PGRpdiBzdHlsZT17e29wYWNpdHk6MH19Pnt0aXRsZX08L2Rpdj48L2Rpdj46PGRpdj57dGl0bGV9PC9kaXY+fTwvYnV0dG9uPlxuXG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXN5bmNCdXR0b25cblxuY29uc3QgUHJvZ3Jlc3NDaXJjbGUgPSAoeyBzZWxlY3RlZCB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBwYWRkaW5nOiAzLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA1MCxcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDQsXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGVjdGVkID8gXCIjMWEyMzdlXCIgOiBcIiM5ZmE4ZGFcIlxuICAgICAgICB9fT5cblxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cblxuXG5cbmNsYXNzIFByb2dyZXNzTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzZWxlY3RlZDogMFxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogMCB9KVxuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogMSB9KVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IDIgfSlcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogMCB9KVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgMjAwKVxuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZCB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6XCIxMDAlXCIsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICB0b3A6MjAsXG4gICAgICAgICAgICAgICAgbGVmdDowXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3NDaXJjbGUgc2VsZWN0ZWQ9e3NlbGVjdGVkID09PSAwfSAvPlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0NpcmNsZSBzZWxlY3RlZD17c2VsZWN0ZWQgPT09IDF9IC8+XG4gICAgICAgICAgICAgICAgPFByb2dyZXNzQ2lyY2xlIHNlbGVjdGVkPXtzZWxlY3RlZCA9PT0gMn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7Qm9vdHN0cmFwSW5wdXR9IGZyb20gJ0B4YWYvYm9vdHN0cmFwLWlucHV0J1xuXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuY29uc3QgTG9naW4gPSgpPT57XG4gICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgIHsoe2VtYWlsLHBhc3N3b3JkLGxvZ2luLG9uQ2hhbmdlLHZhbGlkYXRpb24saXNMb2dnZWRJbixsb2FkaW5nfSk9PntcbiAgICAgICAgICAgIGlmKCFpc0xvZ2dlZEluKVxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+TG9naW46PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHZhbHVlPXtlbWFpbH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24uZW1haWwgfX0gbGFiZWw9XCJFbWFpbCBBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIkxvZ2luXCIgb25DbGljaz17bG9naW59IGxvYWRpbmc9e2xvYWRpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9yZWNvdmVyXCI+Rm9yZ290IFBhc3N3b3JkICE8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz1cIi9cIiAvPlxuICAgICAgICB9fVxuICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5pbXBvcnQge1JlZGlyZWN0fSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IEJvb3RzdHJhcEFzeW5jQnV0dG9uIGZyb20gJ0B4YWYvYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbidcbmNvbnN0IFNpZ25VcCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+eyh7IG9uQ2hhbmdlLCBlbWFpbCwgcGFzc3dvcmQsIHNpZ251cCxsb2FkaW5nLCB2YWxpZGF0aW9uLCBpc0xvZ2dlZEluIH0pID0+IHtcbiAgICAgICAgICBpZighaXNMb2dnZWRJbilcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+U2lnbiBVcDo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHZhbHVlPXtlbWFpbH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24uZW1haWwgfX0gbGFiZWw9XCJFbWFpbCBBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiUGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcEFzeW5jQnV0dG9uIHRpdGxlPVwiU2lnblVwXCIgb25DbGljaz17c2lnbnVwfSBsb2FkaW5nPXtsb2FkaW5nfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPVwiL1wiIC8+XG4gICAgICAgIH19PC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25VcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmltcG9ydCB7Qm9vdHN0cmFwSW5wdXR9IGZyb20gJ0B4YWYvYm9vdHN0cmFwLWlucHV0J1xuaW1wb3J0IEJvb3RzdHJhcEFzeW5jQnV0dG9uIGZyb20gJ0B4YWYvYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbidcbmNvbnN0IFJlY292ZXJQYXNzd29yZCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+eyh7IGVtYWlsLCBvbkNoYW5nZSwgdmFsaWRhdGlvbiwgcmVjb3Zlcixsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+UmVjb3ZlciBQYXNzd29yZDo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHZhbHVlPXtlbWFpbH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24uZW1haWwgfX0gbGFiZWw9XCJFbWFpbCBBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Qm9vdHN0cmFwQXN5bmNCdXR0b24gdGl0bGU9XCJSZWNvdmVyIFBhc3N3b3JkXCIgb25DbGljaz17cmVjb3Zlcn0gbG9hZGluZz17bG9hZGluZ30vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH19PC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY292ZXJQYXNzd29yZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmltcG9ydCB7Qm9vdHN0cmFwSW5wdXR9IGZyb20gJ0B4YWYvYm9vdHN0cmFwLWlucHV0J1xuaW1wb3J0IEJvb3RzdHJhcEFzeW5jQnV0dG9uIGZyb20gJ0B4YWYvYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbidcblxuY29uc3QgUmVzZXRQYXNzd29yZCA9ICgpID0+IHtcbiAgICByZXR1cm4gKDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgcGFzc3dvcmQsIGNvbmZpcm0sIHJlc2V0UGFzc3dvcmQsIHZhbGlkYXRpb24sbG9hZGluZyB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlJlc2V0IFBhc3N3b3JkOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIk5ldyBQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJOZXcgUGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIkNvbmZpcm0gUGFzc3dvcmRcIiBuYW1lPVwiY29uZmlybVwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtjb25maXJtfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIkNvbmZpcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwQXN5bmNCdXR0b24gdGl0bGU9XCJSZXNldCBQYXNzd29yZFwiIG9uQ2xpY2s9e3Jlc2V0UGFzc3dvcmR9IGxvYWRpbmc9e2xvYWRpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9fTwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXNldFBhc3N3b3JkIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5jb25zdCBtb25nb0NvbGxlY3Rpb24gPSAoe2NvbGxlY3Rpb24sZGJ9KSA9PiB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaW5kT25lOiAoe2ZpbHRlcn0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5nZXQoYC9tb25nb2RiYCwgeyBwYXJhbXM6IHsgcmVxVHlwZTogXCJmaW5kT25lXCIsIGNvbGxlY3Rpb24sZGIsIGZpbHRlciB9IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZpbmQ6ICh7ZmlsdGVyfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImZpbmRcIiwgY29sbGVjdGlvbixkYiwgZmlsdGVyIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgaW5zZXJ0T25lOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoYC9tb25nb2RiYCwgeyBwYXJhbXM6IHsgcmVxVHlwZTogXCJpbnNlcnRPbmVcIiwgY29sbGVjdGlvbixkYiwgZGF0YSB9IH0pXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZU9uZTogKHtmaWx0ZXIsZGF0YX0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5wdXQoYC9tb25nb2RiYCwgeyBwYXJhbXM6IHsgcmVxVHlwZTogXCJ1cGRhdGVPbmVcIiwgY29sbGVjdGlvbixkYiwgZmlsdGVyLGRhdGEgfSB9KVxuICAgICAgICB9LFxuICAgICAgICBkZWxldGVPbmU6ICh7ZmlsdGVyfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLmRlbGV0ZShgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImRlbGV0ZU9uZVwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIgfSB9KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvQ29sbGVjdGlvblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgbW9uZ29SZWFjdCBmcm9tICcuL21vbmdvZGItY2xpZW50J1xuZXhwb3J0IGNvbnN0IE1vbmdvZGJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpXG5cblxuY2xhc3MgTW9uZ29kYlByb3ZpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICBcbiAgICAgc3RhdGU9e29iamVjdHM6W10sbG9hZGluZzpmYWxzZX1cbiAgXG4gICAgZmluZE9uZT0oe2ZpbHRlcn0pPT57XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBtb25nb1JlYWN0KHsgY29sbGVjdGlvbiwgZGJ9KS5maW5kT25lKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZpbmQ9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmZpbmQoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVsZXRlT25lPSgpPT57XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBtb25nb1JlYWN0KHsgY29sbGVjdGlvbiwgZGJ9KS5kZWxldGVPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlT25lPSgpPT57XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBtb25nb1JlYWN0KHsgY29sbGVjdGlvbiwgZGJ9KS51cGRhdGVPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5zZXJ0T25lPSgpPT57XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBtb25nb1JlYWN0KHsgY29sbGVjdGlvbiwgZGJ9KS5pbnNlcnRPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbFN0YXRlID0oKT0+e1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbn09IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuKDxNb25nb0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tcbiAgICAgICAgICAgICAgc2V0SW5pdGlhbFN0YXRlOnRoaXMuc2V0SW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgICBmaW5kOnRoaXMuZmluZCxcbiAgICAgICAgICAgICAgZmluZE9uZTp0aGlzLmZpbmRPbmUsXG4gICAgICAgICAgICAgIHVwZGF0ZU9uZTp0aGlzLnVwZGF0ZU9uZSxcbiAgICAgICAgICAgICAgaW5zZXJ0T25lOnRoaXMuaW5zZXJ0T25lLFxuICAgICAgICAgICAgICBkZWxldGVPbmU6dGhpcy5kZWxldGVPbmVcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9Nb25nb0NvbnRleHQuUHJvdmlkZXI+KVxuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1vbmdvZGJQcm92aWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfSBmcm9tICdAYXV0aGpzL3ZhbGlkYXRpb24nXG5pbXBvcnQgbW9uZ29EYkNsaWVudCBmcm9tICdAbW9uZ29kYmpzL3JlYWN0J1xuY2xhc3MgRWRpdG9yUmVhY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGUgPSB7IG9iamVjdHM6IFtdLCBzZXJ2ZXJFcnJvcjogXCJcIiwgbG9hZGluZzogZmFsc2UsIHNlbGVjdGVkT2JqZWN0OiBudWxsLCB2YWxpZGF0aW9uOiBpbml0aWFsVmFsaWRhdGlvblN0YXRlIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IHtpbml0aWFsU3RhdGV9PSB0aGlzLnByb3BzXG4gICAgICAgIHRoaXMuX3NldEluaXRpYWxTdGF0ZSh7aW5pdGlhbFN0YXRlfSlcbiAgICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICBjb25zb2xlLmxvZyhcIkVkaXRvciBSZWFjdCBtb3VudGVkXCIpXG4gICAgICB0aGlzLmZpbmQoKVxuICB9XG4gICAgX3NldEluaXRpYWxTdGF0ZT0oKT0+e1xuICAgICAgIGNvbnN0IHtpbml0aWFsU3RhdGV9PSB0aGlzLnByb3BzXG4gICAgICAgaWYoaW5pdGlhbFN0YXRlICE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSk9Pih7Li4ucHJldlN0YXRlLC4uLmluaXRpYWxTdGF0ZX0pKVxuICAgICAgIH1cbiAgICB9XG4gICAgb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZE9iamVjdDogeyBbbmFtZV06IHZhbHVlIH0gfSlcbiAgICB9XG5cbiAgICBmaW5kID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHt9XG4gICAgICAgIG1vbmdvRGJDbGllbnQoeyBjb2xsZWN0aW9uLCBkYiB9KS5maW5kKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvYmplY3RzOiBkYXRhLnJlc3VsdCwgbG9hZGluZzogZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvciwgbG9hZGluZzogZmFsc2UgfSlcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZmluZE9uZSA9ICh7IGlkIH0pID0+IHtcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgX2lkOiBpZCB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZVwiLCBpZClcbiAgICAgICAgbW9uZ29EYkNsaWVudCh7IGNvbGxlY3Rpb24sIGRiIH0pLmZpbmRPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHNlbGVjdE9uZSA9ICh7IF9pZCB9KSA9PiB7IFxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRPYmplY3Q6IHRoaXMuc3RhdGUub2JqZWN0cy5maW5kKCh1KSA9PiB1Ll9pZCA9PT0gX2lkKSB9KVxuICAgIH1cblxuICAgIHVwZGF0ZU9uZSA9ICh7IGlkLCBkYXRhIH0pID0+IHtcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgX2lkOiBpZCB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZVwiLCBpZClcbiAgICAgICAgbW9uZ29EYkNsaWVudCh7IGNvbGxlY3Rpb24sIGRifSkuZmluZE9uZSh7IGZpbHRlciB9LCB7IGRhdGEgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVsZXRlT25lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBfaWQgfSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRPYmplY3RcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBfaWQgfVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGIgfSkuZGVsZXRlT25lKHsgZmlsdGVyIH0pXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHsgb2JqZWN0czogc3RhdGUub2JqZWN0cy5maWx0ZXIoKHUpID0+IHUuX2lkICE9PSBfaWQpIH0pKVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGVPbmUgcmVzdWx0XCIsIHJlc3VsdClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGVPbmUgZXJyb3JcIiwgZXJyb3IpXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7ICB2YWxpZGF0aW9ufSA9IHRoaXMuc3RhdGVcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGF0ZS0tLVwiLHRoaXMuc3RhdGUpXG4gICAgICAgIHJldHVybiAoPGRpdj57Y2hpbGRyZW4oe29uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTp7Li4udGhpcy5zdGF0ZX0sXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9uZTp0aGlzLnNlbGVjdE9uZSxcbiAgICAgICAgICAgICAgICAgICAgZmluZDogdGhpcy5maW5kLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVPbmU6IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZU9uZSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT25lOiB0aGlzLnVwZGF0ZU9uZX0pfTwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvclJlYWN0XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cblxuY29uc3QgQ29uZmlybWF0aW9uRGlhbG9nID0oe2RlY2xpbmUsY29uZmlybSwgY2hpbGRyZW4sbW9kYWxJZH0pPT57XG4gICAgICAgIHJldHVybig8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e21vZGFsSWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj5Db25maXJtYXRpb24gaXMgbmVlZGVkPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2RlY2xpbmV9IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17Y29uZmlybX0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+T2s8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybWF0aW9uRGlhbG9nIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuY29uc3QgRWRpdG9yRGlhbG9nID0oe2NoaWxkcmVuLCBzYXZlLGNhbmNlbCxtb2RhbElkfSk9PntcbiAgICByZXR1cm4oPGRpdj5cbjxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXttb2RhbElkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICA8aDUgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+TW9kYWwgdGl0bGU8L2g1PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e2NhbmNlbH0+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17c2F2ZX0+U2F2ZSBjaGFuZ2VzPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiAgICA8L2Rpdj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvckRpYWxvZyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmNvbnN0IFRhYmxlUmVuZGVyID0gKHsgY29sbGVjdGlvbj1bXSxzZWxlY3RPbmUsIGhlYWRlcnM9W10sIFRhYmxlLCBUYWJsZUJvZHksIFRhYmxlUm93LCBUYWJsZUNvbHVtbiwgVGFibGVGb290ZXIsIFRhYmxlSGVhZGVyIH0pID0+IHtcbiAgIGNvbnNvbGUubG9nKFwiY29sbGVjdGlvbi0tLVwiLGNvbGxlY3Rpb24pXG4gICByZXR1cm4gICg8VGFibGU+XG4gICAgICAgICAgICB7VGFibGVIZWFkZXIgJiYgPFRhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICAgIHtoZWFkZXJzLmxlbmd0aD09PTAgJiZjb2xsZWN0aW9uLmxlbmd0aD4wICYmIE9iamVjdC5rZXlzKGNvbGxlY3Rpb25bMF0pLm1hcCgoaCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlQ29sdW1uIGtleT17aX0+e2h9PC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB7aGVhZGVycy5sZW5ndGg+MCAmJiBoZWFkZXJzLm1hcCgoaCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlQ29sdW1uIGtleT17aX0+e2h9PC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVGFibGVIZWFkZXI+fVxuICAgICAgICAgICAgPFRhYmxlQm9keT5cbiAgICAgICAgICAgICAgICB7Y29sbGVjdGlvbiAhPT11bmRlZmluZWQgJiYgY29sbGVjdGlvbi5tYXAoKGMsIGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxUYWJsZVJvdyBzZWxlY3RPbmU9e3NlbGVjdE9uZX0gX2lkPXtjLl9pZH0ga2V5PXthfT57T2JqZWN0LmtleXMoYykubWFwKChyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxUYWJsZUNvbHVtbiBrZXk9e2l9PntjW3JdfTwvVGFibGVDb2x1bW4+KVxuICAgICAgICAgICAgICAgICAgICB9KX08L1RhYmxlUm93PlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgICAgICAgICB7VGFibGVGb290ZXIgJiYgPFRhYmxlRm9vdGVyPlxuICAgICAgICAgICAgPC9UYWJsZUZvb3Rlcj59XG4gICAgICAgIDwvVGFibGU+KVxuICAgXG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlUmVuZGVyXG5cbiIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuY29uc3QgVGFibGUgPSAoe2NoaWxkcmVufSkgPT4ge1xuICAgIHJldHVybiAoPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC90YWJsZT4pXG4gIH1cblxuLy9cbiAgZXhwb3J0IGRlZmF1bHQgVGFibGUiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlQm9keSA9KHtjaGlsZHJlbn0pPT57XG4gICAgcmV0dXJuICg8dGJvZHk+XG4gICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgPC90Ym9keT4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQm9keSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgVGFibGVDb2x1bW4gPSh7Y2hpbGRyZW59KT0+e1xuICAgIHJldHVybiAoPHRkPntjaGlsZHJlbn08L3RkPilcbn1cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29sdW1uIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUYWJsZUhlYWQgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG5cbiAgICByZXR1cm4gKDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUhlYWQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlUm93ID0oe2NoaWxkcmVuLHNlbGVjdE9uZSxfaWR9KT0+e1xuICAgY29uc29sZS5sb2coXCJfaWQtLS0tLVwiLF9pZClcbiAgICByZXR1cm4gKDx0cj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPHRkPjxidXR0b24gZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2Zvcm1cIiBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdE9uZSh7X2lkfSkgfX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPkVkaXQ8L2J1dHRvbj48L3RkPlxuICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjb25maXJtXCIgb25DbGljaz17KCkgPT4geyBzZWxlY3RPbmUoe19pZH0pIH19IGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC90ZD5cbiAgICA8L3RyPilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVSb3ciLCJpbXBvcnQgVGFibGVSZW5kZXIgZnJvbSAnQHhhZi90YWJsZS1yZW5kZXInXG5pbXBvcnQgVGFibGUgZnJvbSAnLi9UYWJsZSdcbmltcG9ydCBUYWJsZUJvZHkgZnJvbSAnLi9UYWJsZUJvZHknXG5pbXBvcnQgVGFibGVDb2x1bW4gZnJvbSAnLi9UYWJsZUNvbHVtbidcbmltcG9ydCBUYWJsZUhlYWRlciBmcm9tICcuL1RhYmxlSGVhZGVyJ1xuaW1wb3J0IFRhYmxlUm93IGZyb20gJy4vVGFibGVSb3cnXG5cbmNvbnN0IEJvb3RzdHJhcFRhYmxlID0oe2NvbGxlY3Rpb24saGVhZGVycyxzZWxlY3RPbmV9KT0+e1xuICAgIHJldHVybihcbiAgICA8VGFibGVSZW5kZXJcbiAgICAgIHNlbGVjdE9uZT17c2VsZWN0T25lfVxuICAgICAgaGVhZGVycyA9e2hlYWRlcnN9XG4gICAgICBjb2xsZWN0aW9uPXtjb2xsZWN0aW9ufVxuICAgICAgVGFibGVCb2R5PXtUYWJsZUJvZHl9XG4gICAgICBUYWJsZUhlYWRlcj17VGFibGVIZWFkZXJ9XG4gICAgICBUYWJsZUNvbHVtbj17VGFibGVDb2x1bW59XG4gICAgICBUYWJsZVJvdz17VGFibGVSb3d9XG4gICAgICBUYWJsZT17VGFibGV9XG4gICAgICAvPilcbn1cbmV4cG9ydCB7IEJvb3RzdHJhcFRhYmxlfSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBFZGl0b3JSZWFjdCBmcm9tICdAeGFmL2VkaXRvci1yZWFjdCdcbmltcG9ydCB7Qm9vdHN0cmFwRm9ybSxCb290c3RyYXBDb25maXJtYXRpb259IGZyb20gJ0B4YWYvYm9vdHN0cmFwLWRpYWxvZydcbmltcG9ydCB7Qm9vdHN0cmFwVGFibGV9ICBmcm9tICdAeGFmL2Jvb3RzdHJhcC10YWJsZSdcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICB1c2VyczogW10sXG4gIGVtYWlsOiBcIlwiLCBwYXNzd29yZDogXCJcIiwgX2lkOiBcIlwiXG59XG5jb25zdCBoZWFkZXJzID1bXCJfaWRcIixcIlBhc3N3b3JkXCIsXCJFbWFpbFwiLFwiRWRpdFwiLFwiRGVsZXRlXCJdXG5jb25zdCBVc2VycyA9ICh7Y29sbGVjdGlvbixkYn0pID0+IHtcbiAgICAgIFxuICByZXR1cm4gKDxFZGl0b3JSZWFjdCBjb2xsZWN0aW9uPXtjb2xsZWN0aW9ufSBkYj17ZGJ9IGluaXRpYWxTdGF0ZT17aW5pdGlhbFN0YXRlfT57KHtzdGF0ZSwgZGVsZXRlT25lLCBzZWxlY3RPbmUgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJzID1zdGF0ZS5vYmplY3RzLm1hcCgodSk9PntyZXR1cm4gey4uLnUsIHBhc3N3b3JkOlwiKioqKioqKipcIiB9fSlcbiAgcmV0dXJuICg8ZGl2PjxCb290c3RyYXBUYWJsZSAgaGVhZGVycz17aGVhZGVyc30gY29sbGVjdGlvbj17dXNlcnN9IHNlbGVjdE9uZT17c2VsZWN0T25lfSAvPlxuICA8Qm9vdHN0cmFwRm9ybSBtb2RhbElkPVwiZm9ybVwiPnh4eDwvQm9vdHN0cmFwRm9ybT5cbiAgPEJvb3RzdHJhcENvbmZpcm1hdGlvbiBjb25maXJtPXtkZWxldGVPbmV9IGRlY2xpbmU9eygpPT57fX0gbW9kYWxJZD1cImNvbmZpcm1cIj5Db25maXJtIGRlbGV0aW9uIG9mOiB7c3RhdGUuc2VsZWN0ZWRPYmplY3QgJiYgc3RhdGUuc2VsZWN0ZWRPYmplY3QuZW1haWwgfTwvQm9vdHN0cmFwQ29uZmlybWF0aW9uPlxuICA8L2Rpdj4pXG4gIH19PC9FZGl0b3JSZWFjdD4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJzXG4vKlxuICAgIDxFZGl0VXNlciB7Li4uc3RhdGV9IHZhbGlkYXRpb249e3ZhbGlkYXRpb259IG9uQ2hhbmdlPXtvbkNoYW5nZX0gIC8+XG4gICAgICA8Q29uZmlybWF0aW9uRGlhbG9nIGRlbGV0ZU9uZT17ZGVsZXRlT25lfSAvPlxuKi9cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKFxuICAgICA8ZGl2PkhvbWU8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZSAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmNvbnN0IE5hdkJhciA9ICgpID0+IHtcbiAgICByZXR1cm4gKDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgaXNMb2dnZWRJbiwgbG9nb3V0IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQtbGcgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNcIj5OYXZiYXI8L2E+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtY29udHJvbHM9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdmJhci1uYXYgbXItYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtIGFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvXCI+SG9tZSA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPjwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNMb2dnZWRJbiAmJiA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL3VzZXJzXCI+VXNlcnM8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgeyFpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvbG9naW5cIj5Mb2dpbjwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2dnZWRJbiAmJiA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9cIiBvbkNsaWNrPXtsb2dvdXR9PkxvZ291dDwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7IWlzTG9nZ2VkSW4gJiYgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9zaWdudXBcIj5TaWduVXA8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPn1cblxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgKVxuICAgIH19XG5cbiAgICA8L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPilcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsSGFzaFJvdXRlciwgUm91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IExvZ2luLHtTaWduVXAsUmVjb3ZlclBhc3N3b3JkLFJlY292ZXJSZXN1bHQsUmVzZXRQYXNzd29yZCxVc2Vyc30gZnJvbSAnQGF1dGhqcy9yZWFjdC11aSdcbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZSdcbmltcG9ydCBOYXZCYXIgZnJvbSAnLi9OYXZCYXInXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gICAgcmV0dXJuIDxkaXY+XG4gICAgICAgIDxIYXNoUm91dGVyPlxuICAgICAgICAgICAgPG5hdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYXJvdW5kXCIgfX0+XG4gICAgICAgICAgICA8TmF2QmFyLz5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgY29tcG9uZW50PXtIb21lfSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXNlcnNcIiByZW5kZXI9eygpPT48VXNlcnMgY29sbGVjdGlvbj1cInVzZXJzXCIgZGIgPVwiZGVtb1wiLz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2xvZ2luXCIgY29tcG9uZW50PXtMb2dpbn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3NpZ251cFwiIGNvbXBvbmVudD17U2lnblVwfSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVjb3ZlclwiIGNvbXBvbmVudD17UmVjb3ZlclBhc3N3b3JkfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZXNldHBhc3MvOnVzZXJuYW1lLzp0b2tlblwiIGNvbXBvbmVudD17UmVzZXRQYXNzd29yZH0vPlxuICAgICAgICA8L0hhc2hSb3V0ZXI+XG4gICAgPC9kaXY+XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXG5pbXBvcnQgRW1haWxQYXNzd29yZFByb3ZpZGVyIGZyb20gJ0BhdXRoanMvcmVhY3QnXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxkaXY+XG4gICAgPEVtYWlsUGFzc3dvcmRQcm92aWRlcj5cbiAgICA8QXBwLz5cbiAgICA8L0VtYWlsUGFzc3dvcmRQcm92aWRlcj5cblxuICA8L2Rpdj4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbik7XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiX2luaGVyaXRzTG9vc2UiLCJvbiIsIm9mZiIsIkNvbXBvbmVudCIsIlJlYWN0IiwiaXNQcm9kdWN0aW9uIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJSZWFjdElzIiwiY3JlYXRlQ29udGV4dCIsInBhdGhUb1JlZ2V4cCIsImluZGV4IiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiYWRkTGVhZGluZ1NsYXNoIiwic3RyaXBCYXNlbmFtZSIsIm5vb3AiLCJrZXkiLCJfX1JvdXRlckNvbnRleHQiLCJjb250ZXh0IiwiZW1haWxSZWdleCIsInBhc3N3b3JkUmVnZXgiLCJlbWFpbFJlcXVpcmVtZW50cyIsInBhc3Nwb3J0UmVxdWlyZW1lbnRzIiwiaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSIsImVtYWlsIiwiaXNWYWxpZCIsIm1lc3NhZ2UiLCJwYXNzd29yZCIsInVuZGVmaW5lZCIsImVtYWlsVmFsaWRhdGlvbiIsInBhc3N3b3JkVmFsaWRhdGlvbiIsInRlc3QiLCJtZXNzYWdlVmFsaWRhdGlvbiIsInZhbGlkYXRpb25SZXN1bHQiLCJzZWxmIiwic2V0U3RhdGUiLCJ2YWxpZGF0aW9uIiwiY29va2llcyIsImRlZmF1bHRzIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwiQ2FuY2VsIiwiQXhpb3MiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsIkVtYWlsUGFzc3dvcmRDb250ZXh0IiwiRW1haWxQYXNzd29yZFByb3ZpZGVyIiwibG9hZGluZyIsInRva2VuIiwiaXNMb2dnZWRJbiIsImNvbmZpcm0iLCJzZXJ2ZXJFcnJvciIsImUiLCJuYW1lIiwidGFyZ2V0IiwidmFsdWUiLCJyZXNldFZhbGlkYXRpb24iLCJzdGF0ZSIsImF4aW9zIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzZXRUb2tlbiIsImdldCIsInBhcmFtcyIsImdldFRva2VuIiwiaXNUb2tlbkV4cGlyZWQiLCJkZWNvZGVkIiwiZGVjb2RlIiwiZXhwIiwiRGF0ZSIsIm5vdyIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInVzZXJuYW1lIiwicmVtb3ZlSXRlbSIsImFuc3dlciIsImxvZ2dlZEluIiwiY2hpbGRyZW4iLCJwcm9wcyIsImxvZ2luIiwibG9nb3V0Iiwic2lnbnVwIiwicmVzZXRQYXNzd29yZCIsInJlY292ZXJQYXNzd29yZCIsIm9uQ2hhbmdlIiwiQ3VzdG9tSW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJsYWJlbCIsImNsYXNzTmFtZXMiLCJBc3luY0J1dHRvbiIsInRpdGxlIiwib25DbGljayIsImRpc2FibGVkIiwicG9zaXRpb24iLCJ3aWR0aCIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsIm9wYWNpdHkiLCJQcm9ncmVzc0NpcmNsZSIsInNlbGVjdGVkIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsIm1hcmdpbkxlZnQiLCJ0ZXh0QWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJQcm9ncmVzc0xvYWRlciIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwidG9wIiwibGVmdCIsIkxvZ2luIiwiQm9vdHN0cmFwSW5wdXQiLCJCb290c3RyYXBBc3luY0J1dHRvbiIsIlNpZ25VcCIsIlJlY292ZXJQYXNzd29yZCIsInJlY292ZXIiLCJSZXNldFBhc3N3b3JkIiwibW9uZ29Db2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsImRiIiwiZmluZE9uZSIsImZpbHRlciIsInJlcVR5cGUiLCJmaW5kIiwiaW5zZXJ0T25lIiwidXBkYXRlT25lIiwicHV0IiwiZGVsZXRlT25lIiwiTW9uZ29kYkNvbnRleHQiLCJNb25nb2RiUHJvdmlkZXIiLCJvYmplY3RzIiwibW9uZ29SZWFjdCIsInJlc3VsdCIsInNldEluaXRpYWxTdGF0ZSIsIkVkaXRvclJlYWN0Iiwic2VsZWN0ZWRPYmplY3QiLCJpbml0aWFsU3RhdGUiLCJwcmV2U3RhdGUiLCJtb25nb0RiQ2xpZW50IiwiaWQiLCJfaWQiLCJ1IiwiX3NldEluaXRpYWxTdGF0ZSIsInNlbGVjdE9uZSIsIkNvbmZpcm1hdGlvbkRpYWxvZyIsImRlY2xpbmUiLCJtb2RhbElkIiwiRWRpdG9yRGlhbG9nIiwic2F2ZSIsImNhbmNlbCIsIlRhYmxlUmVuZGVyIiwiaGVhZGVycyIsIlRhYmxlIiwiVGFibGVCb2R5IiwiVGFibGVSb3ciLCJUYWJsZUNvbHVtbiIsIlRhYmxlRm9vdGVyIiwiVGFibGVIZWFkZXIiLCJsZW5ndGgiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiaCIsImkiLCJjIiwiYSIsInIiLCJUYWJsZUhlYWQiLCJCb290c3RyYXBUYWJsZSIsInVzZXJzIiwiVXNlcnMiLCJCb290c3RyYXBGb3JtIiwiQm9vdHN0cmFwQ29uZmlybWF0aW9uIiwiSG9tZSIsIk5hdkJhciIsIkFwcCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDJCQUFlLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLE1BQU07WUFDdEQsWUFBWSxPQUFPLElBQUksS0FBSyxXQUFXLEdBQUcsSUFBSTtZQUM5QyxZQUFZLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUcsRUFBRSxFQUFFOztZQ0Z6RDs7O1lBR0EsU0FBUyxnQkFBZ0IsR0FBRztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsU0FBUyxtQkFBbUIsSUFBSTtnQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxD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Q0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7WUFDMWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FB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
