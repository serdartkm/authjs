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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lc20vaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzbS9yZWFjdC1yb3V0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIi4uLy4uLy4uL3hhZi92YWxpZGF0aW9uL2xpYi92YWxpZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uLy4uL2F1dGhqcy9hdXRoLXJlYWN0L2xpYi9FbWFpbFBhc3N3b3JkUHJvdmlkZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtaW5wdXQvbGliL0Jvb3RzdHJhcElucHV0LmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24vbGliL0FzeW5jQnV0dG9uLmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9Mb2dpbi5qcyIsIi4uLy4uLy4uL2F1dGhqcy9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvU2lnbnVwLmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9SZWNvdmVyUGFzc3dvcmQuanMiLCIuLi8uLi8uLi9hdXRoanMvYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1Jlc2V0UGFzc3dvcmQuanMiLCIuLi8uLi9tb25nby1yZWFjdC9saWIvbW9uZ29kYi1jbGllbnQuanMiLCIuLi8uLi9tb25nby1yZWFjdC9saWIvTW9uZ29kYlByb3ZpZGVyLmpzIiwiLi4vLi4vLi4veGFmL2VkaXRvci1yZWFjdC9saWIvZWRpdG9yLXJlYWN0LmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC1kaWFsb2cvbGliL0Jvb3RzdHJhcENvbmZpcm1hdGlvbi5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtZGlhbG9nL2xpYi9Cb290c3RyYXBGb3JtLmpzIiwiLi4vLi4vLi4veGFmL3RhYmxlLXJlbmRlci9saWIvaW5kZXguanMiLCIuLi8uLi8uLi94YWYvYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZS5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlQm9keS5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlQ29sdW1uLmpzIiwiLi4vLi4vLi4veGFmL2Jvb3RzdHJhcC10YWJsZS9saWIvVGFibGVIZWFkZXIuanMiLCIuLi8uLi8uLi94YWYvYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZVJvdy5qcyIsIi4uLy4uLy4uL3hhZi9ib290c3RyYXAtdGFibGUvbGliL2luZGV4LmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9Vc2Vycy5qcyIsIi4uL2NsaWVudC9Ib21lLmpzIiwiLi4vY2xpZW50L05hdkJhci5qcyIsIi4uL2NsaWVudC9BcHAuanMiLCIuLi9jbGllbnQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbi8vIGJhc2VkIG9mZiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXByb2Nlc3MvYmxvYi9tYXN0ZXIvYnJvd3Nlci5qc1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbnZhciBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuaWYgKHR5cGVvZiBnbG9iYWwuc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xufVxuaWYgKHR5cGVvZiBnbG9iYWwuY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xufVxuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn1cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5leHBvcnQgdmFyIHRpdGxlID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBwbGF0Zm9ybSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgYnJvd3NlciA9IHRydWU7XG5leHBvcnQgdmFyIGVudiA9IHt9O1xuZXhwb3J0IHZhciBhcmd2ID0gW107XG5leHBvcnQgdmFyIHZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbmV4cG9ydCB2YXIgdmVyc2lvbnMgPSB7fTtcbmV4cG9ydCB2YXIgcmVsZWFzZSA9IHt9O1xuZXhwb3J0IHZhciBjb25maWcgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmV4cG9ydCB2YXIgb24gPSBub29wO1xuZXhwb3J0IHZhciBhZGRMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIG9uY2UgPSBub29wO1xuZXhwb3J0IHZhciBvZmYgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5leHBvcnQgdmFyIGVtaXQgPSBub29wO1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZyhuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3dkICgpIHsgcmV0dXJuICcvJyB9XG5leHBvcnQgZnVuY3Rpb24gY2hkaXIgKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHVtYXNrKCkgeyByZXR1cm4gMDsgfVxuXG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9rdW1hdmlzL2Jyb3dzZXItcHJvY2Vzcy1ocnRpbWUvYmxvYi9tYXN0ZXIvaW5kZXguanNcbnZhciBwZXJmb3JtYW5jZSA9IGdsb2JhbC5wZXJmb3JtYW5jZSB8fCB7fVxudmFyIHBlcmZvcm1hbmNlTm93ID1cbiAgcGVyZm9ybWFuY2Uubm93ICAgICAgICB8fFxuICBwZXJmb3JtYW5jZS5tb3pOb3cgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1zTm93ICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uub05vdyAgICAgICB8fFxuICBwZXJmb3JtYW5jZS53ZWJraXROb3cgIHx8XG4gIGZ1bmN0aW9uKCl7IHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpIH1cblxuLy8gZ2VuZXJhdGUgdGltZXN0YW1wIG9yIGRlbHRhXG4vLyBzZWUgaHR0cDovL25vZGVqcy5vcmcvYXBpL3Byb2Nlc3MuaHRtbCNwcm9jZXNzX3Byb2Nlc3NfaHJ0aW1lXG5leHBvcnQgZnVuY3Rpb24gaHJ0aW1lKHByZXZpb3VzVGltZXN0YW1wKXtcbiAgdmFyIGNsb2NrdGltZSA9IHBlcmZvcm1hbmNlTm93LmNhbGwocGVyZm9ybWFuY2UpKjFlLTNcbiAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKGNsb2NrdGltZSlcbiAgdmFyIG5hbm9zZWNvbmRzID0gTWF0aC5mbG9vcigoY2xvY2t0aW1lJTEpKjFlOSlcbiAgaWYgKHByZXZpb3VzVGltZXN0YW1wKSB7XG4gICAgc2Vjb25kcyA9IHNlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFswXVxuICAgIG5hbm9zZWNvbmRzID0gbmFub3NlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFsxXVxuICAgIGlmIChuYW5vc2Vjb25kczwwKSB7XG4gICAgICBzZWNvbmRzLS1cbiAgICAgIG5hbm9zZWNvbmRzICs9IDFlOVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3NlY29uZHMsbmFub3NlY29uZHNdXG59XG5cbnZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuZXhwb3J0IGZ1bmN0aW9uIHVwdGltZSgpIHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcbiAgdmFyIGRpZiA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4gZGlmIC8gMTAwMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuZXh0VGljazogbmV4dFRpY2ssXG4gIHRpdGxlOiB0aXRsZSxcbiAgYnJvd3NlcjogYnJvd3NlcixcbiAgZW52OiBlbnYsXG4gIGFyZ3Y6IGFyZ3YsXG4gIHZlcnNpb246IHZlcnNpb24sXG4gIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgb246IG9uLFxuICBhZGRMaXN0ZW5lcjogYWRkTGlzdGVuZXIsXG4gIG9uY2U6IG9uY2UsXG4gIG9mZjogb2ZmLFxuICByZW1vdmVMaXN0ZW5lcjogcmVtb3ZlTGlzdGVuZXIsXG4gIHJlbW92ZUFsbExpc3RlbmVyczogcmVtb3ZlQWxsTGlzdGVuZXJzLFxuICBlbWl0OiBlbWl0LFxuICBiaW5kaW5nOiBiaW5kaW5nLFxuICBjd2Q6IGN3ZCxcbiAgY2hkaXI6IGNoZGlyLFxuICB1bWFzazogdW1hc2ssXG4gIGhydGltZTogaHJ0aW1lLFxuICBwbGF0Zm9ybTogcGxhdGZvcm0sXG4gIHJlbGVhc2U6IHJlbGVhc2UsXG4gIGNvbmZpZzogY29uZmlnLFxuICB1cHRpbWU6IHVwdGltZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzTG9vc2U7IiwiLy8gQGZsb3dcbid1c2Ugc3RyaWN0JztcblxudmFyIGtleSA9ICdfX2dsb2JhbF91bmlxdWVfaWRfXyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxba2V5XSA9IChnbG9iYWxba2V5XSB8fCAwKSArIDE7XG59O1xuIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5mdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWlzUHJvZHVjdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGV4dCA9IFwiV2FybmluZzogXCIgKyBtZXNzYWdlO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKHRleHQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aHJvdyBFcnJvcih0ZXh0KTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdhcm5pbmc7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNMb29zZSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGd1ZCBmcm9tICdndWQnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcblxudmFyIE1BWF9TSUdORURfMzFfQklUX0lOVCA9IDEwNzM3NDE4MjM7XG5cbmZ1bmN0aW9uIG9iamVjdElzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudEVtaXR0ZXIodmFsdWUpIHtcbiAgdmFyIGhhbmRsZXJzID0gW107XG4gIHJldHVybiB7XG4gICAgb246IGZ1bmN0aW9uIG9uKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgfSxcbiAgICBvZmY6IGZ1bmN0aW9uIG9mZihoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVycyA9IGhhbmRsZXJzLmZpbHRlcihmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gaCAhPT0gaGFuZGxlcjtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdWYWx1ZSwgY2hhbmdlZEJpdHMpIHtcbiAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKHZhbHVlLCBjaGFuZ2VkQml0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlblswXSA6IGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZWFjdENvbnRleHQoZGVmYXVsdFZhbHVlLCBjYWxjdWxhdGVDaGFuZ2VkQml0cykge1xuICB2YXIgX1Byb3ZpZGVyJGNoaWxkQ29udGV4LCBfQ29uc3VtZXIkY29udGV4dFR5cGU7XG5cbiAgdmFyIGNvbnRleHRQcm9wID0gJ19fY3JlYXRlLXJlYWN0LWNvbnRleHQtJyArIGd1ZCgpICsgJ19fJztcblxuICB2YXIgUHJvdmlkZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUHJvdmlkZXIsIF9Db21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIoKSB7XG4gICAgICB2YXIgX3RoaXM7XG5cbiAgICAgIF90aGlzID0gX0NvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpcy5lbWl0dGVyID0gY3JlYXRlRXZlbnRFbWl0dGVyKF90aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvID0gUHJvdmlkZXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICByZXR1cm4gX3JlZiA9IHt9LCBfcmVmW2NvbnRleHRQcm9wXSA9IHRoaXMuZW1pdHRlciwgX3JlZjtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUgIT09IG5leHRQcm9wcy52YWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlO1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSBuZXh0UHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBjaGFuZ2VkQml0cztcblxuICAgICAgICBpZiAob2JqZWN0SXMob2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgIGNoYW5nZWRCaXRzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFuZ2VkQml0cyA9IHR5cGVvZiBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gJ2Z1bmN0aW9uJyA/IGNhbGN1bGF0ZUNoYW5nZWRCaXRzKG9sZFZhbHVlLCBuZXdWYWx1ZSkgOiBNQVhfU0lHTkVEXzMxX0JJVF9JTlQ7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgd2FybmluZygoY2hhbmdlZEJpdHMgJiBNQVhfU0lHTkVEXzMxX0JJVF9JTlQpID09PSBjaGFuZ2VkQml0cywgJ2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBFeHBlY3RlZCB0aGUgcmV0dXJuIHZhbHVlIHRvIGJlIGEgJyArICczMS1iaXQgaW50ZWdlci4gSW5zdGVhZCByZWNlaXZlZDogJyArIGNoYW5nZWRCaXRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGFuZ2VkQml0cyB8PSAwO1xuXG4gICAgICAgICAgaWYgKGNoYW5nZWRCaXRzICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuc2V0KG5leHRQcm9wcy52YWx1ZSwgY2hhbmdlZEJpdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfTtcblxuICAgIHJldHVybiBQcm92aWRlcjtcbiAgfShDb21wb25lbnQpO1xuXG4gIFByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzID0gKF9Qcm92aWRlciRjaGlsZENvbnRleCA9IHt9LCBfUHJvdmlkZXIkY2hpbGRDb250ZXhbY29udGV4dFByb3BdID0gUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCBfUHJvdmlkZXIkY2hpbGRDb250ZXgpO1xuXG4gIHZhciBDb25zdW1lciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Db21wb25lbnQyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQ29uc3VtZXIsIF9Db21wb25lbnQyKTtcblxuICAgIGZ1bmN0aW9uIENvbnN1bWVyKCkge1xuICAgICAgdmFyIF90aGlzMjtcblxuICAgICAgX3RoaXMyID0gX0NvbXBvbmVudDIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMyLnN0YXRlID0ge1xuICAgICAgICB2YWx1ZTogX3RoaXMyLmdldFZhbHVlKClcbiAgICAgIH07XG5cbiAgICAgIF90aGlzMi5vblVwZGF0ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSwgY2hhbmdlZEJpdHMpIHtcbiAgICAgICAgdmFyIG9ic2VydmVkQml0cyA9IF90aGlzMi5vYnNlcnZlZEJpdHMgfCAwO1xuXG4gICAgICAgIGlmICgob2JzZXJ2ZWRCaXRzICYgY2hhbmdlZEJpdHMpICE9PSAwKSB7XG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiBfdGhpczIuZ2V0VmFsdWUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gX3RoaXMyO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yID0gQ29uc3VtZXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIHZhciBvYnNlcnZlZEJpdHMgPSBuZXh0UHJvcHMub2JzZXJ2ZWRCaXRzO1xuICAgICAgdGhpcy5vYnNlcnZlZEJpdHMgPSBvYnNlcnZlZEJpdHMgPT09IHVuZGVmaW5lZCB8fCBvYnNlcnZlZEJpdHMgPT09IG51bGwgPyBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgOiBvYnNlcnZlZEJpdHM7XG4gICAgfTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0ub24odGhpcy5vblVwZGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBvYnNlcnZlZEJpdHMgPSB0aGlzLnByb3BzLm9ic2VydmVkQml0cztcbiAgICAgIHRoaXMub2JzZXJ2ZWRCaXRzID0gb2JzZXJ2ZWRCaXRzID09PSB1bmRlZmluZWQgfHwgb2JzZXJ2ZWRCaXRzID09PSBudWxsID8gTUFYX1NJR05FRF8zMV9CSVRfSU5UIDogb2JzZXJ2ZWRCaXRzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICB0aGlzLmNvbnRleHRbY29udGV4dFByb3BdLm9mZih0aGlzLm9uVXBkYXRlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMi5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0uZ2V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBvbmx5Q2hpbGQodGhpcy5wcm9wcy5jaGlsZHJlbikodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb25zdW1lcjtcbiAgfShDb21wb25lbnQpO1xuXG4gIENvbnN1bWVyLmNvbnRleHRUeXBlcyA9IChfQ29uc3VtZXIkY29udGV4dFR5cGUgPSB7fSwgX0NvbnN1bWVyJGNvbnRleHRUeXBlW2NvbnRleHRQcm9wXSA9IFByb3BUeXBlcy5vYmplY3QsIF9Db25zdW1lciRjb250ZXh0VHlwZSk7XG4gIHJldHVybiB7XG4gICAgUHJvdmlkZXI6IFByb3ZpZGVyLFxuICAgIENvbnN1bWVyOiBDb25zdW1lclxuICB9O1xufVxuXG52YXIgaW5kZXggPSBSZWFjdC5jcmVhdGVDb250ZXh0IHx8IGNyZWF0ZVJlYWN0Q29udGV4dDtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSIsImZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aG5hbWUpIHtcbiAgcmV0dXJuIHBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nO1xufVxuXG4vLyBBYm91dCAxLjV4IGZhc3RlciB0aGFuIHRoZSB0d28tYXJnIHZlcnNpb24gb2YgQXJyYXkjc3BsaWNlKClcbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpIHtcbiAgICBsaXN0W2ldID0gbGlzdFtrXTtcbiAgfVxuXG4gIGxpc3QucG9wKCk7XG59XG5cbi8vIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgaGVhdmlseSBvbiBub2RlJ3MgdXJsLnBhcnNlXG5mdW5jdGlvbiByZXNvbHZlUGF0aG5hbWUodG8pIHtcbiAgdmFyIGZyb20gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuXG4gIHZhciB0b1BhcnRzID0gdG8gJiYgdG8uc3BsaXQoJy8nKSB8fCBbXTtcbiAgdmFyIGZyb21QYXJ0cyA9IGZyb20gJiYgZnJvbS5zcGxpdCgnLycpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSB2b2lkIDA7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkge1xuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcuLicpO1xuICB9aWYgKG11c3RFbmRBYnMgJiYgZnJvbVBhcnRzWzBdICE9PSAnJyAmJiAoIWZyb21QYXJ0c1swXSB8fCAhaXNBYnNvbHV0ZShmcm9tUGFydHNbMF0pKSkgZnJvbVBhcnRzLnVuc2hpZnQoJycpO1xuXG4gIHZhciByZXN1bHQgPSBmcm9tUGFydHMuam9pbignLycpO1xuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIHJlc3VsdC5zdWJzdHIoLTEpICE9PSAnLycpIHJlc3VsdCArPSAnLyc7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVzb2x2ZVBhdGhuYW1lOyIsInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gdmFsdWVFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYikgJiYgYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICByZXR1cm4gdmFsdWVFcXVhbChpdGVtLCBiW2luZGV4XSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgYVR5cGUgPSB0eXBlb2YgYSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYSk7XG4gIHZhciBiVHlwZSA9IHR5cGVvZiBiID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihiKTtcblxuICBpZiAoYVR5cGUgIT09IGJUeXBlKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBhVmFsdWUgPSBhLnZhbHVlT2YoKTtcbiAgICB2YXIgYlZhbHVlID0gYi52YWx1ZU9mKCk7XG5cbiAgICBpZiAoYVZhbHVlICE9PSBhIHx8IGJWYWx1ZSAhPT0gYikgcmV0dXJuIHZhbHVlRXF1YWwoYVZhbHVlLCBiVmFsdWUpO1xuXG4gICAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgdmFyIGJLZXlzID0gT2JqZWN0LmtleXMoYik7XG5cbiAgICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBhS2V5cy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdmFsdWVFcXVhbChhW2tleV0sIGJba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlRXF1YWw7IiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG52YXIgcHJlZml4ID0gJ0ludmFyaWFudCBmYWlsZWQnO1xuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXggKyBcIjogXCIgKyAobWVzc2FnZSB8fCAnJykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludmFyaWFudDtcbiIsImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCByZXNvbHZlUGF0aG5hbWUgZnJvbSAncmVzb2x2ZS1wYXRobmFtZSc7XG5pbXBvcnQgdmFsdWVFcXVhbCBmcm9tICd2YWx1ZS1lcXVhbCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aCA6ICcvJyArIHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHByZWZpeCArICcoXFxcXC98XFxcXD98I3wkKScsICdpJykudGVzdChwYXRoKTtcbn1cbmZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpID8gcGF0aC5zdWJzdHIocHJlZml4Lmxlbmd0aCkgOiBwYXRoO1xufVxuZnVuY3Rpb24gc3RyaXBUcmFpbGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KHBhdGgubGVuZ3RoIC0gMSkgPT09ICcvJyA/IHBhdGguc2xpY2UoMCwgLTEpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBwYXRobmFtZSA9IHBhdGggfHwgJy8nO1xuICB2YXIgc2VhcmNoID0gJyc7XG4gIHZhciBoYXNoID0gJyc7XG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG5cbiAgaWYgKGhhc2hJbmRleCAhPT0gLTEpIHtcbiAgICBoYXNoID0gcGF0aG5hbWUuc3Vic3RyKGhhc2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBzZWFyY2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJz8nKTtcblxuICBpZiAoc2VhcmNoSW5kZXggIT09IC0xKSB7XG4gICAgc2VhcmNoID0gcGF0aG5hbWUuc3Vic3RyKHNlYXJjaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBzZWFyY2hJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICBzZWFyY2g6IHNlYXJjaCA9PT0gJz8nID8gJycgOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaCA9PT0gJyMnID8gJycgOiBoYXNoXG4gIH07XG59XG5mdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uKSB7XG4gIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLFxuICAgICAgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XG4gIHZhciBwYXRoID0gcGF0aG5hbWUgfHwgJy8nO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaCAhPT0gJz8nKSBwYXRoICs9IHNlYXJjaC5jaGFyQXQoMCkgPT09ICc/JyA/IHNlYXJjaCA6IFwiP1wiICsgc2VhcmNoO1xuICBpZiAoaGFzaCAmJiBoYXNoICE9PSAnIycpIHBhdGggKz0gaGFzaC5jaGFyQXQoMCkgPT09ICcjJyA/IGhhc2ggOiBcIiNcIiArIGhhc2g7XG4gIHJldHVybiBwYXRoO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwga2V5LCBjdXJyZW50TG9jYXRpb24pIHtcbiAgdmFyIGxvY2F0aW9uO1xuXG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUd28tYXJnIGZvcm06IHB1c2gocGF0aCwgc3RhdGUpXG4gICAgbG9jYXRpb24gPSBwYXJzZVBhdGgocGF0aCk7XG4gICAgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPbmUtYXJnIGZvcm06IHB1c2gobG9jYXRpb24pXG4gICAgbG9jYXRpb24gPSBfZXh0ZW5kcyh7fSwgcGF0aCk7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnBhdGhuYW1lID0gJyc7XG5cbiAgICBpZiAobG9jYXRpb24uc2VhcmNoKSB7XG4gICAgICBpZiAobG9jYXRpb24uc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBsb2NhdGlvbi5zZWFyY2ggPSAnPycgKyBsb2NhdGlvbi5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLnNlYXJjaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgICBpZiAobG9jYXRpb24uaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgbG9jYXRpb24uaGFzaCA9ICcjJyArIGxvY2F0aW9uLmhhc2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBsb2NhdGlvbi5zdGF0ZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsb2NhdGlvbi5wYXRobmFtZSA9IGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIFVSSUVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVVJJRXJyb3IoJ1BhdGhuYW1lIFwiJyArIGxvY2F0aW9uLnBhdGhuYW1lICsgJ1wiIGNvdWxkIG5vdCBiZSBkZWNvZGVkLiAnICsgJ1RoaXMgaXMgbGlrZWx5IGNhdXNlZCBieSBhbiBpbnZhbGlkIHBlcmNlbnQtZW5jb2RpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGtleSkgbG9jYXRpb24ua2V5ID0ga2V5O1xuXG4gIGlmIChjdXJyZW50TG9jYXRpb24pIHtcbiAgICAvLyBSZXNvbHZlIGluY29tcGxldGUvcmVsYXRpdmUgcGF0aG5hbWUgcmVsYXRpdmUgdG8gY3VycmVudCBsb2NhdGlvbi5cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9IGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9IHJlc29sdmVQYXRobmFtZShsb2NhdGlvbi5wYXRobmFtZSwgY3VycmVudExvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBwcmlvciBsb2NhdGlvbiBhbmQgcGF0aG5hbWUgaXMgZW1wdHksIHNldCBpdCB0byAvXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxvY2F0aW9uO1xufVxuZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoID09PSBiLmhhc2ggJiYgYS5rZXkgPT09IGIua2V5ICYmIHZhbHVlRXF1YWwoYS5zdGF0ZSwgYi5zdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCkge1xuICB2YXIgcHJvbXB0ID0gbnVsbDtcblxuICBmdW5jdGlvbiBzZXRQcm9tcHQobmV4dFByb21wdCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcocHJvbXB0ID09IG51bGwsICdBIGhpc3Rvcnkgc3VwcG9ydHMgb25seSBvbmUgcHJvbXB0IGF0IGEgdGltZScpIDogdm9pZCAwO1xuICAgIHByb21wdCA9IG5leHRQcm9tcHQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9tcHQgPT09IG5leHRQcm9tcHQpIHByb21wdCA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvLyBUT0RPOiBJZiBhbm90aGVyIHRyYW5zaXRpb24gc3RhcnRzIHdoaWxlIHdlJ3JlIHN0aWxsIGNvbmZpcm1pbmdcbiAgICAvLyB0aGUgcHJldmlvdXMgb25lLCB3ZSBtYXkgZW5kIHVwIGluIGEgd2VpcmQgc3RhdGUuIEZpZ3VyZSBvdXQgdGhlXG4gICAgLy8gYmVzdCB3YXkgdG8gaGFuZGxlIHRoaXMuXG4gICAgaWYgKHByb21wdCAhPSBudWxsKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdHlwZW9mIHByb21wdCA9PT0gJ2Z1bmN0aW9uJyA/IHByb21wdChsb2NhdGlvbiwgYWN0aW9uKSA6IHByb21wdDtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2V0VXNlckNvbmZpcm1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGdldFVzZXJDb25maXJtYXRpb24ocmVzdWx0LCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgJ0EgaGlzdG9yeSBuZWVkcyBhIGdldFVzZXJDb25maXJtYXRpb24gZnVuY3Rpb24gaW4gb3JkZXIgdG8gdXNlIGEgcHJvbXB0IG1lc3NhZ2UnKSA6IHZvaWQgMDtcbiAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIGZhbHNlIGZyb20gYSB0cmFuc2l0aW9uIGhvb2sgdG8gY2FuY2VsIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICBjYWxsYmFjayhyZXN1bHQgIT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFwcGVuZExpc3RlbmVyKGZuKSB7XG4gICAgdmFyIGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKGlzQWN0aXZlKSBmbi5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBsaXN0ZW5lci5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRQcm9tcHQ6IHNldFByb21wdCxcbiAgICBjb25maXJtVHJhbnNpdGlvblRvOiBjb25maXJtVHJhbnNpdGlvblRvLFxuICAgIGFwcGVuZExpc3RlbmVyOiBhcHBlbmRMaXN0ZW5lcixcbiAgICBub3RpZnlMaXN0ZW5lcnM6IG5vdGlmeUxpc3RlbmVyc1xuICB9O1xufVxuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmZ1bmN0aW9uIGdldENvbmZpcm1hdGlvbihtZXNzYWdlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayh3aW5kb3cuY29uZmlybShtZXNzYWdlKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpcyBzdXBwb3J0ZWQuIFRha2VuIGZyb20gTW9kZXJuaXpyLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9oaXN0b3J5LmpzXG4gKiBjaGFuZ2VkIHRvIGF2b2lkIGZhbHNlIG5lZ2F0aXZlcyBmb3IgV2luZG93cyBQaG9uZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgaWYgKCh1YS5pbmRleE9mKCdBbmRyb2lkIDIuJykgIT09IC0xIHx8IHVhLmluZGV4T2YoJ0FuZHJvaWQgNC4wJykgIT09IC0xKSAmJiB1YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgIT09IC0xICYmIHVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSAmJiB1YS5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB3aW5kb3cuaGlzdG9yeSAmJiAncHVzaFN0YXRlJyBpbiB3aW5kb3cuaGlzdG9yeTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGJyb3dzZXIgZmlyZXMgcG9wc3RhdGUgb24gaGFzaCBjaGFuZ2UuXG4gKiBJRTEwIGFuZCBJRTExIGRvIG5vdC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlKCkge1xuICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpID09PSAtMTtcbn1cbi8qKlxuICogUmV0dXJucyBmYWxzZSBpZiB1c2luZyBnbyhuKSB3aXRoIGhhc2ggaGlzdG9yeSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkLlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCkge1xuICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID09PSAtMTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgZ2l2ZW4gcG9wc3RhdGUgZXZlbnQgaXMgYW4gZXh0cmFuZW91cyBXZWJLaXQgZXZlbnQuXG4gKiBBY2NvdW50cyBmb3IgdGhlIGZhY3QgdGhhdCBDaHJvbWUgb24gaU9TIGZpcmVzIHJlYWwgcG9wc3RhdGUgZXZlbnRzXG4gKiBjb250YWluaW5nIHVuZGVmaW5lZCBzdGF0ZSB3aGVuIHByZXNzaW5nIHRoZSBiYWNrIGJ1dHRvbi5cbiAqL1xuXG5mdW5jdGlvbiBpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50KGV2ZW50KSB7XG4gIGV2ZW50LnN0YXRlID09PSB1bmRlZmluZWQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID09PSAtMTtcbn1cblxudmFyIFBvcFN0YXRlRXZlbnQgPSAncG9wc3RhdGUnO1xudmFyIEhhc2hDaGFuZ2VFdmVudCA9ICdoYXNoY2hhbmdlJztcblxuZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElFIDExIHNvbWV0aW1lcyB0aHJvd3Mgd2hlbiBhY2Nlc3Npbmcgd2luZG93Lmhpc3Rvcnkuc3RhdGVcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvaGlzdG9yeS9wdWxsLzI4OVxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpbmNsdWRpbmdcbiAqIHB1c2hTdGF0ZSwgcmVwbGFjZVN0YXRlLCBhbmQgdGhlIHBvcHN0YXRlIGV2ZW50LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlQnJvd3Nlckhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0Jyb3dzZXIgaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhblVzZUhpc3RvcnkgPSBzdXBwb3J0c0hpc3RvcnkoKTtcbiAgdmFyIG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyID0gIXN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGZvcmNlUmVmcmVzaCA9IF9wcm9wcy5mb3JjZVJlZnJlc2gsXG4gICAgICBmb3JjZVJlZnJlc2ggPSBfcHJvcHMkZm9yY2VSZWZyZXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRmb3JjZVJlZnJlc2gsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgdmFyIF9yZWYgPSBoaXN0b3J5U3RhdGUgfHwge30sXG4gICAgICAgIGtleSA9IF9yZWYua2V5LFxuICAgICAgICBzdGF0ZSA9IF9yZWYuc3RhdGU7XG5cbiAgICB2YXIgX3dpbmRvdyRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgICAgcGF0aG5hbWUgPSBfd2luZG93JGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2ggPSBfd2luZG93JGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgaGFzaCA9IF93aW5kb3ckbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgcGF0aCA9IHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwga2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuICAgIC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG4gICAgaWYgKGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpKSByZXR1cm47XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSkpO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIGtleXMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3Iga2V5cyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxLZXlzLmluZGV4T2YodG9Mb2NhdGlvbi5rZXkpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbEtleXMuaW5kZXhPZihmcm9tTG9jYXRpb24ua2V5KTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSk7XG4gIHZhciBhbGxLZXlzID0gW2luaXRpYWxMb2NhdGlvbi5rZXldOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiBiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucHVzaFN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICB2YXIgbmV4dEtleXMgPSBhbGxLZXlzLnNsaWNlKDAsIHByZXZJbmRleCA9PT0gLTEgPyAwIDogcHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgbmV4dEtleXMucHVzaChsb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGFsbEtleXMgPSBuZXh0S2V5cztcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnJlcGxhY2VTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsS2V5c1twcmV2SW5kZXhdID0gbG9jYXRpb24ua2V5O1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbnZhciBIYXNoQ2hhbmdlRXZlbnQkMSA9ICdoYXNoY2hhbmdlJztcbnZhciBIYXNoUGF0aENvZGVycyA9IHtcbiAgaGFzaGJhbmc6IHtcbiAgICBlbmNvZGVQYXRoOiBmdW5jdGlvbiBlbmNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aCA6ICchLycgKyBzdHJpcExlYWRpbmdTbGFzaChwYXRoKTtcbiAgICB9LFxuICAgIGRlY29kZVBhdGg6IGZ1bmN0aW9uIGRlY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG4gICAgfVxuICB9LFxuICBub3NsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogc3RyaXBMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH0sXG4gIHNsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRIYXNoUGF0aCgpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBoYXNoSW5kZXggPT09IC0xID8gJycgOiBocmVmLnN1YnN0cmluZyhoYXNoSW5kZXggKyAxKTtcbn1cblxuZnVuY3Rpb24gcHVzaEhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB2YXIgaGFzaEluZGV4ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpO1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaHJlZi5zbGljZSgwLCBoYXNoSW5kZXggPj0gMCA/IGhhc2hJbmRleCA6IDApICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdIYXNoIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHZhciBnbG9iYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHZhciBjYW5Hb1dpdGhvdXRSZWxvYWQgPSBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRoYXNoVHlwZSA9IF9wcm9wcy5oYXNoVHlwZSxcbiAgICAgIGhhc2hUeXBlID0gX3Byb3BzJGhhc2hUeXBlID09PSB2b2lkIDAgPyAnc2xhc2gnIDogX3Byb3BzJGhhc2hUeXBlO1xuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuICB2YXIgX0hhc2hQYXRoQ29kZXJzJGhhc2hUID0gSGFzaFBhdGhDb2RlcnNbaGFzaFR5cGVdLFxuICAgICAgZW5jb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5lbmNvZGVQYXRoLFxuICAgICAgZGVjb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5kZWNvZGVQYXRoO1xuXG4gIGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZGVjb2RlUGF0aChnZXRIYXNoUGF0aCgpKTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgdmFyIGlnbm9yZVBhdGggPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHtcbiAgICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhIHByb3Blcmx5LWVuY29kZWQgaGFzaC5cbiAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gICAgICB2YXIgcHJldkxvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjtcbiAgICAgIGlmICghZm9yY2VOZXh0UG9wICYmIGxvY2F0aW9uc0FyZUVxdWFsKHByZXZMb2NhdGlvbiwgbG9jYXRpb24pKSByZXR1cm47IC8vIEEgaGFzaGNoYW5nZSBkb2Vzbid0IGFsd2F5cyA9PSBsb2NhdGlvbiBjaGFuZ2UuXG5cbiAgICAgIGlmIChpZ25vcmVQYXRoID09PSBjcmVhdGVQYXRoKGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBJZ25vcmUgdGhpcyBjaGFuZ2U7IHdlIGFscmVhZHkgc2V0U3RhdGUgaW4gcHVzaC9yZXBsYWNlLlxuXG4gICAgICBpZ25vcmVQYXRoID0gbnVsbDtcbiAgICAgIGhhbmRsZVBvcChsb2NhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2YgcGF0aHMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3IgcGF0aHMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aCh0b0xvY2F0aW9uKSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChmcm9tTG9jYXRpb24pKTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfSAvLyBFbnN1cmUgdGhlIGhhc2ggaXMgZW5jb2RlZCBwcm9wZXJseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cblxuXG4gIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcbiAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgdmFyIGFsbFBhdGhzID0gW2NyZWF0ZVBhdGgoaW5pdGlhbExvY2F0aW9uKV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuICcjJyArIGVuY29kZVBhdGgoYmFzZW5hbWUgKyBjcmVhdGVQYXRoKGxvY2F0aW9uKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUFVTSCwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcHVzaEhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgICB2YXIgbmV4dFBhdGhzID0gYWxsUGF0aHMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgbmV4dFBhdGhzLnB1c2gocGF0aCk7XG4gICAgICAgIGFsbFBhdGhzID0gbmV4dFBhdGhzO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoOyBhIG5ldyBlbnRyeSB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaycpIDogdm9pZCAwO1xuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFJFUExBQ0UsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5pbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbFBhdGhzW3ByZXZJbmRleF0gPSBwYXRoO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGNhbkdvV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpIDogdm9pZCAwO1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQkMSwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbGFtcChuLCBsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuLCBsb3dlckJvdW5kKSwgdXBwZXJCb3VuZCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHN0b3JlcyBsb2NhdGlvbnMgaW4gbWVtb3J5LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMuaW5pdGlhbEVudHJpZXMsXG4gICAgICBpbml0aWFsRW50cmllcyA9IF9wcm9wcyRpbml0aWFsRW50cmllcyA9PT0gdm9pZCAwID8gWycvJ10gOiBfcHJvcHMkaW5pdGlhbEVudHJpZXMsXG4gICAgICBfcHJvcHMkaW5pdGlhbEluZGV4ID0gX3Byb3BzLmluaXRpYWxJbmRleCxcbiAgICAgIGluaXRpYWxJbmRleCA9IF9wcm9wcyRpbml0aWFsSW5kZXggPT09IHZvaWQgMCA/IDAgOiBfcHJvcHMkaW5pdGlhbEluZGV4LFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gY2xhbXAoaW5pdGlhbEluZGV4LCAwLCBpbml0aWFsRW50cmllcy5sZW5ndGggLSAxKTtcbiAgdmFyIGVudHJpZXMgPSBpbml0aWFsRW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycgPyBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBjcmVhdGVLZXkoKSkgOiBjcmVhdGVMb2NhdGlvbihlbnRyeSwgdW5kZWZpbmVkLCBlbnRyeS5rZXkgfHwgY3JlYXRlS2V5KCkpO1xuICB9KTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gY3JlYXRlUGF0aDtcblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHByZXZJbmRleCA9IGhpc3RvcnkuaW5kZXg7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gcHJldkluZGV4ICsgMTtcbiAgICAgIHZhciBuZXh0RW50cmllcyA9IGhpc3RvcnkuZW50cmllcy5zbGljZSgwKTtcblxuICAgICAgaWYgKG5leHRFbnRyaWVzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgICBuZXh0RW50cmllcy5zcGxpY2UobmV4dEluZGV4LCBuZXh0RW50cmllcy5sZW5ndGggLSBuZXh0SW5kZXgsIGxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICAgIGVudHJpZXM6IG5leHRFbnRyaWVzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICBoaXN0b3J5LmVudHJpZXNbaGlzdG9yeS5pbmRleF0gPSBsb2NhdGlvbjtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGNsYW1wKGhpc3RvcnkuaW5kZXggKyBuLCAwLCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoIC0gMSk7XG4gICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgIHZhciBsb2NhdGlvbiA9IGhpc3RvcnkuZW50cmllc1tuZXh0SW5kZXhdO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAob2spIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgICBpbmRleDogbmV4dEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWltaWMgdGhlIGJlaGF2aW9yIG9mIERPTSBoaXN0b3JpZXMgYnlcbiAgICAgICAgLy8gY2F1c2luZyBhIHJlbmRlciBhZnRlciBhIGNhbmNlbGxlZCBQT1AuXG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBoaXN0b3J5LmluZGV4ICsgbjtcbiAgICByZXR1cm4gbmV4dEluZGV4ID49IDAgJiYgbmV4dEluZGV4IDwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZW50cmllcy5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogZW50cmllc1tpbmRleF0sXG4gICAgaW5kZXg6IGluZGV4LFxuICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGNhbkdvOiBjYW5HbyxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgY3JlYXRlTWVtb3J5SGlzdG9yeSwgY3JlYXRlTG9jYXRpb24sIGxvY2F0aW9uc0FyZUVxdWFsLCBwYXJzZVBhdGgsIGNyZWF0ZVBhdGggfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsInZhciBpc2FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbi8qKlxuICogRXhwb3NlIGBwYXRoVG9SZWdleHBgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhUb1JlZ2V4cFxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGVcbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXG5cbi8qKlxuICogVGhlIG1haW4gcGF0aCBtYXRjaGluZyByZWdleHAgdXRpbGl0eS5cbiAqXG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG52YXIgUEFUSF9SRUdFWFAgPSBuZXcgUmVnRXhwKFtcbiAgLy8gTWF0Y2ggZXNjYXBlZCBjaGFyYWN0ZXJzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGFwcGVhciBpbiBmdXR1cmUgbWF0Y2hlcy5cbiAgLy8gVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0IHdvbid0IHRyYW5zZm9ybS5cbiAgJyhcXFxcXFxcXC4pJyxcbiAgLy8gTWF0Y2ggRXhwcmVzcy1zdHlsZSBwYXJhbWV0ZXJzIGFuZCB1bi1uYW1lZCBwYXJhbWV0ZXJzIHdpdGggYSBwcmVmaXhcbiAgLy8gYW5kIG9wdGlvbmFsIHN1ZmZpeGVzLiBNYXRjaGVzIGFwcGVhciBhczpcbiAgLy9cbiAgLy8gXCIvOnRlc3QoXFxcXGQrKT9cIiA9PiBbXCIvXCIsIFwidGVzdFwiLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCBcIj9cIiwgdW5kZWZpbmVkXVxuICAvLyBcIi9yb3V0ZShcXFxcZCspXCIgID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gIC8vIFwiLypcIiAgICAgICAgICAgID0+IFtcIi9cIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIipcIl1cbiAgJyhbXFxcXC8uXSk/KD86KD86XFxcXDooXFxcXHcrKSg/OlxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpP3xcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKShbKyo/XSk/fChcXFxcKikpJ1xuXS5qb2luKCd8JyksICdnJylcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshQXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VucyA9IFtdXG4gIHZhciBrZXkgPSAwXG4gIHZhciBpbmRleCA9IDBcbiAgdmFyIHBhdGggPSAnJ1xuICB2YXIgZGVmYXVsdERlbGltaXRlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nXG4gIHZhciByZXNcblxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIHZhciBtID0gcmVzWzBdXG4gICAgdmFyIGVzY2FwZWQgPSByZXNbMV1cbiAgICB2YXIgb2Zmc2V0ID0gcmVzLmluZGV4XG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICBpbmRleCA9IG9mZnNldCArIG0ubGVuZ3RoXG5cbiAgICAvLyBJZ25vcmUgYWxyZWFkeSBlc2NhcGVkIHNlcXVlbmNlcy5cbiAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgcGF0aCArPSBlc2NhcGVkWzFdXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBuZXh0ID0gc3RyW2luZGV4XVxuICAgIHZhciBwcmVmaXggPSByZXNbMl1cbiAgICB2YXIgbmFtZSA9IHJlc1szXVxuICAgIHZhciBjYXB0dXJlID0gcmVzWzRdXG4gICAgdmFyIGdyb3VwID0gcmVzWzVdXG4gICAgdmFyIG1vZGlmaWVyID0gcmVzWzZdXG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddXG5cbiAgICAvLyBQdXNoIHRoZSBjdXJyZW50IHBhdGggb250byB0aGUgdG9rZW5zLlxuICAgIGlmIChwYXRoKSB7XG4gICAgICB0b2tlbnMucHVzaChwYXRoKVxuICAgICAgcGF0aCA9ICcnXG4gICAgfVxuXG4gICAgdmFyIHBhcnRpYWwgPSBwcmVmaXggIT0gbnVsbCAmJiBuZXh0ICE9IG51bGwgJiYgbmV4dCAhPT0gcHJlZml4XG4gICAgdmFyIHJlcGVhdCA9IG1vZGlmaWVyID09PSAnKycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBvcHRpb25hbCA9IG1vZGlmaWVyID09PSAnPycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBkZWxpbWl0ZXIgPSByZXNbMl0gfHwgZGVmYXVsdERlbGltaXRlclxuICAgIHZhciBwYXR0ZXJuID0gY2FwdHVyZSB8fCBncm91cFxuXG4gICAgdG9rZW5zLnB1c2goe1xuICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcbiAgICAgIHByZWZpeDogcHJlZml4IHx8ICcnLFxuICAgICAgZGVsaW1pdGVyOiBkZWxpbWl0ZXIsXG4gICAgICBvcHRpb25hbDogb3B0aW9uYWwsXG4gICAgICByZXBlYXQ6IHJlcGVhdCxcbiAgICAgIHBhcnRpYWw6IHBhcnRpYWwsXG4gICAgICBhc3RlcmlzazogISFhc3RlcmlzayxcbiAgICAgIHBhdHRlcm46IHBhdHRlcm4gPyBlc2NhcGVHcm91cChwYXR0ZXJuKSA6IChhc3RlcmlzayA/ICcuKicgOiAnW14nICsgZXNjYXBlU3RyaW5nKGRlbGltaXRlcikgKyAnXSs/JylcbiAgICB9KVxuICB9XG5cbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgcGF0aCArPSBzdHIuc3Vic3RyKGluZGV4KVxuICB9XG5cbiAgLy8gSWYgdGhlIHBhdGggZXhpc3RzLCBwdXNoIGl0IG9udG8gdGhlIGVuZC5cbiAgaWYgKHBhdGgpIHtcbiAgICB0b2tlbnMucHVzaChwYXRoKVxuICB9XG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuXG4vKipcbiAqIENvbXBpbGUgYSBzdHJpbmcgdG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgdGhlIHBhdGguXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IWZ1bmN0aW9uKE9iamVjdD0sIE9iamVjdD0pfVxuICovXG5mdW5jdGlvbiBjb21waWxlIChzdHIsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyLCBvcHRpb25zKSlcbn1cblxuLyoqXG4gKiBQcmV0dGllciBlbmNvZGluZyBvZiBVUkkgcGF0aCBzZWdtZW50cy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFByZXR0eSAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bXFwvPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEVuY29kZSB0aGUgYXN0ZXJpc2sgcGFyYW1ldGVyLiBTaW1pbGFyIHRvIGBwcmV0dHlgLCBidXQgYWxsb3dzIHNsYXNoZXMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVBc3RlcmlzayAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb0Z1bmN0aW9uICh0b2tlbnMpIHtcbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHRva2VucyBpbnRvIHJlZ2V4cHMuXG4gIHZhciBtYXRjaGVzID0gbmV3IEFycmF5KHRva2Vucy5sZW5ndGgpXG5cbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRva2Vuc1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeKD86JyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJykkJylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuICAgIHZhciBwYXRoID0gJydcbiAgICB2YXIgZGF0YSA9IG9iaiB8fCB7fVxuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fVxuICAgIHZhciBlbmNvZGUgPSBvcHRpb25zLnByZXR0eSA/IGVuY29kZVVSSUNvbXBvbmVudFByZXR0eSA6IGVuY29kZVVSSUNvbXBvbmVudFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoICs9IHRva2VuXG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlID0gZGF0YVt0b2tlbi5uYW1lXVxuICAgICAgdmFyIHNlZ21lbnRcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgLy8gUHJlcGVuZCBwYXJ0aWFsIHNlZ21lbnQgcHJlZml4ZXMuXG4gICAgICAgICAgaWYgKHRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIGJlIGRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc2FycmF5KHZhbHVlKSkge1xuICAgICAgICBpZiAoIXRva2VuLnJlcGVhdCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IHJlcGVhdCwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJ2AnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgYmUgZW1wdHknKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsdWUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBzZWdtZW50ID0gZW5jb2RlKHZhbHVlW2pdKVxuXG4gICAgICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFsbCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQpICsgJ2AnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhdGggKz0gKGogPT09IDAgPyB0b2tlbi5wcmVmaXggOiB0b2tlbi5kZWxpbWl0ZXIpICsgc2VnbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgc2VnbWVudCA9IHRva2VuLmFzdGVyaXNrID8gZW5jb2RlQXN0ZXJpc2sodmFsdWUpIDogZW5jb2RlKHZhbHVlKVxuXG4gICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBcIicgKyBzZWdtZW50ICsgJ1wiJylcbiAgICAgIH1cblxuICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhcbiAgfVxufVxuXG4vKipcbiAqIEVzY2FwZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfFxcL1xcXFxdKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBFc2NhcGUgdGhlIGNhcHR1cmluZyBncm91cCBieSBlc2NhcGluZyBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIG1lYW5pbmcuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBncm91cFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVHcm91cCAoZ3JvdXApIHtcbiAgcmV0dXJuIGdyb3VwLnJlcGxhY2UoLyhbPSE6JFxcLygpXSkvZywgJ1xcXFwkMScpXG59XG5cbi8qKlxuICogQXR0YWNoIHRoZSBrZXlzIGFzIGEgcHJvcGVydHkgb2YgdGhlIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSByZVxuICogQHBhcmFtICB7QXJyYXl9ICAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXR0YWNoS2V5cyAocmUsIGtleXMpIHtcbiAgcmUua2V5cyA9IGtleXNcbiAgcmV0dXJuIHJlXG59XG5cbi8qKlxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZmxhZ3MgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpXG5cbiAgaWYgKGdyb3Vwcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlzLnB1c2goe1xuICAgICAgICBuYW1lOiBpLFxuICAgICAgICBwcmVmaXg6IG51bGwsXG4gICAgICAgIGRlbGltaXRlcjogbnVsbCxcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICBwYXJ0aWFsOiBmYWxzZSxcbiAgICAgICAgYXN0ZXJpc2s6IGZhbHNlLFxuICAgICAgICBwYXR0ZXJuOiBudWxsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHBhdGgsIGtleXMpXG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgcGF0aFxuICogQHBhcmFtICB7QXJyYXl9ICAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgcGFydHMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSlcbiAgfVxuXG4gIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzonICsgcGFydHMuam9pbignfCcpICsgJyknLCBmbGFncyhvcHRpb25zKSlcblxuICByZXR1cm4gYXR0YWNoS2V5cyhyZWdleHAsIGtleXMpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcGF0aCByZWdleHAgZnJvbSBzdHJpbmcgaW5wdXQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvUmVnRXhwKHBhcnNlKHBhdGgsIG9wdGlvbnMpLCBrZXlzLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgICAgICAgICB0b2tlbnNcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0ga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiB0b2tlbnNUb1JlZ0V4cCAodG9rZW5zLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdFxuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlXG4gIHZhciByb3V0ZSA9ICcnXG5cbiAgLy8gSXRlcmF0ZSBvdmVyIHRoZSB0b2tlbnMgYW5kIGNyZWF0ZSBvdXIgcmVnZXhwIHN0cmluZy5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcodG9rZW4ucHJlZml4KVxuICAgICAgdmFyIGNhcHR1cmUgPSAnKD86JyArIHRva2VuLnBhdHRlcm4gKyAnKSdcblxuICAgICAga2V5cy5wdXNoKHRva2VuKVxuXG4gICAgICBpZiAodG9rZW4ucmVwZWF0KSB7XG4gICAgICAgIGNhcHR1cmUgKz0gJyg/OicgKyBwcmVmaXggKyBjYXB0dXJlICsgJykqJ1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgY2FwdHVyZSA9ICcoPzonICsgcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpKT8nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKT8nXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyknXG4gICAgICB9XG5cbiAgICAgIHJvdXRlICs9IGNhcHR1cmVcbiAgICB9XG4gIH1cblxuICB2YXIgZGVsaW1pdGVyID0gZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJylcbiAgdmFyIGVuZHNXaXRoRGVsaW1pdGVyID0gcm91dGUuc2xpY2UoLWRlbGltaXRlci5sZW5ndGgpID09PSBkZWxpbWl0ZXJcblxuICAvLyBJbiBub24tc3RyaWN0IG1vZGUgd2UgYWxsb3cgYSBzbGFzaCBhdCB0aGUgZW5kIG9mIG1hdGNoLiBJZiB0aGUgcGF0aCB0b1xuICAvLyBtYXRjaCBhbHJlYWR5IGVuZHMgd2l0aCBhIHNsYXNoLCB3ZSByZW1vdmUgaXQgZm9yIGNvbnNpc3RlbmN5LiBUaGUgc2xhc2hcbiAgLy8gaXMgdmFsaWQgYXQgdGhlIGVuZCBvZiBhIHBhdGggbWF0Y2gsIG5vdCBpbiB0aGUgbWlkZGxlLiBUaGlzIGlzIGltcG9ydGFudFxuICAvLyBpbiBub24tZW5kaW5nIG1vZGUsIHdoZXJlIFwiL3Rlc3QvXCIgc2hvdWxkbid0IG1hdGNoIFwiL3Rlc3QvL3JvdXRlXCIuXG4gIGlmICghc3RyaWN0KSB7XG4gICAgcm91dGUgPSAoZW5kc1dpdGhEZWxpbWl0ZXIgPyByb3V0ZS5zbGljZSgwLCAtZGVsaW1pdGVyLmxlbmd0aCkgOiByb3V0ZSkgKyAnKD86JyArIGRlbGltaXRlciArICcoPz0kKSk/J1xuICB9XG5cbiAgaWYgKGVuZCkge1xuICAgIHJvdXRlICs9ICckJ1xuICB9IGVsc2Uge1xuICAgIC8vIEluIG5vbi1lbmRpbmcgbW9kZSwgd2UgbmVlZCB0aGUgY2FwdHVyaW5nIGdyb3VwcyB0byBtYXRjaCBhcyBtdWNoIGFzXG4gICAgLy8gcG9zc2libGUgYnkgdXNpbmcgYSBwb3NpdGl2ZSBsb29rYWhlYWQgdG8gdGhlIGVuZCBvciBuZXh0IHBhdGggc2VnbWVudC5cbiAgICByb3V0ZSArPSBzdHJpY3QgJiYgZW5kc1dpdGhEZWxpbWl0ZXIgPyAnJyA6ICcoPz0nICsgZGVsaW1pdGVyICsgJ3wkKSdcbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKG5ldyBSZWdFeHAoJ14nICsgcm91dGUsIGZsYWdzKG9wdGlvbnMpKSwga2V5cylcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcbiAqIGNvbnRhaW4gYFt7IG5hbWU6ICdpZCcsIGRlbGltaXRlcjogJy8nLCBvcHRpb25hbDogZmFsc2UsIHJlcGVhdDogZmFsc2UgfV1gLlxuICpcbiAqIEBwYXJhbSAgeyhzdHJpbmd8UmVnRXhwfEFycmF5KX0gcGF0aFxuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSAgICAgICBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBpZiAocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpKVxuICB9XG5cbiAgaWYgKGlzYXJyYXkocGF0aCkpIHtcbiAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cCgvKiogQHR5cGUgeyFBcnJheX0gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG59XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjkuMFxuICogcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7XG52YXIgYj1cImZ1bmN0aW9uXCI9PT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuZm9yLGM9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZWxlbWVudFwiKTo2MDEwMyxkPWI/U3ltYm9sLmZvcihcInJlYWN0LnBvcnRhbFwiKTo2MDEwNixlPWI/U3ltYm9sLmZvcihcInJlYWN0LmZyYWdtZW50XCIpOjYwMTA3LGY9Yj9TeW1ib2wuZm9yKFwicmVhY3Quc3RyaWN0X21vZGVcIik6NjAxMDgsZz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm9maWxlclwiKTo2MDExNCxoPWI/U3ltYm9sLmZvcihcInJlYWN0LnByb3ZpZGVyXCIpOjYwMTA5LGs9Yj9TeW1ib2wuZm9yKFwicmVhY3QuY29udGV4dFwiKTo2MDExMCxsPWI/U3ltYm9sLmZvcihcInJlYWN0LmFzeW5jX21vZGVcIik6NjAxMTEsbT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5jb25jdXJyZW50X21vZGVcIik6NjAxMTEsbj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKTo2MDExMixwPWI/U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlXCIpOjYwMTEzLHE9Yj9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VfbGlzdFwiKTpcbjYwMTIwLHI9Yj9TeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKTo2MDExNSx0PWI/U3ltYm9sLmZvcihcInJlYWN0LmxhenlcIik6NjAxMTYsdj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5mdW5kYW1lbnRhbFwiKTo2MDExNyx3PWI/U3ltYm9sLmZvcihcInJlYWN0LnJlc3BvbmRlclwiKTo2MDExODtmdW5jdGlvbiB4KGEpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEpe3ZhciB1PWEuJCR0eXBlb2Y7c3dpdGNoKHUpe2Nhc2UgYzpzd2l0Y2goYT1hLnR5cGUsYSl7Y2FzZSBsOmNhc2UgbTpjYXNlIGU6Y2FzZSBnOmNhc2UgZjpjYXNlIHA6cmV0dXJuIGE7ZGVmYXVsdDpzd2l0Y2goYT1hJiZhLiQkdHlwZW9mLGEpe2Nhc2UgazpjYXNlIG46Y2FzZSBoOnJldHVybiBhO2RlZmF1bHQ6cmV0dXJuIHV9fWNhc2UgdDpjYXNlIHI6Y2FzZSBkOnJldHVybiB1fX19ZnVuY3Rpb24geShhKXtyZXR1cm4geChhKT09PW19ZXhwb3J0cy50eXBlT2Y9eDtleHBvcnRzLkFzeW5jTW9kZT1sO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZT1tO2V4cG9ydHMuQ29udGV4dENvbnN1bWVyPWs7ZXhwb3J0cy5Db250ZXh0UHJvdmlkZXI9aDtleHBvcnRzLkVsZW1lbnQ9YztleHBvcnRzLkZvcndhcmRSZWY9bjtleHBvcnRzLkZyYWdtZW50PWU7ZXhwb3J0cy5MYXp5PXQ7ZXhwb3J0cy5NZW1vPXI7ZXhwb3J0cy5Qb3J0YWw9ZDtleHBvcnRzLlByb2ZpbGVyPWc7ZXhwb3J0cy5TdHJpY3RNb2RlPWY7ZXhwb3J0cy5TdXNwZW5zZT1wO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgYXx8YT09PWV8fGE9PT1tfHxhPT09Z3x8YT09PWZ8fGE9PT1wfHxhPT09cXx8XCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmKGEuJCR0eXBlb2Y9PT10fHxhLiQkdHlwZW9mPT09cnx8YS4kJHR5cGVvZj09PWh8fGEuJCR0eXBlb2Y9PT1rfHxhLiQkdHlwZW9mPT09bnx8YS4kJHR5cGVvZj09PXZ8fGEuJCR0eXBlb2Y9PT13KX07ZXhwb3J0cy5pc0FzeW5jTW9kZT1mdW5jdGlvbihhKXtyZXR1cm4geShhKXx8eChhKT09PWx9O2V4cG9ydHMuaXNDb25jdXJyZW50TW9kZT15O2V4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1rfTtleHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09aH07XG5leHBvcnRzLmlzRWxlbWVudD1mdW5jdGlvbihhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiZhLiQkdHlwZW9mPT09Y307ZXhwb3J0cy5pc0ZvcndhcmRSZWY9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1ufTtleHBvcnRzLmlzRnJhZ21lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1lfTtleHBvcnRzLmlzTGF6eT1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PXR9O2V4cG9ydHMuaXNNZW1vPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09cn07ZXhwb3J0cy5pc1BvcnRhbD1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWR9O2V4cG9ydHMuaXNQcm9maWxlcj1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWd9O2V4cG9ydHMuaXNTdHJpY3RNb2RlPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09Zn07ZXhwb3J0cy5pc1N1c3BlbnNlPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09cH07XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjkuMFxuICogcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7XG4vLyBUT0RPOiBXZSBkb24ndCB1c2UgQXN5bmNNb2RlIG9yIENvbmN1cnJlbnRNb2RlIGFueW1vcmUuIFRoZXkgd2VyZSB0ZW1wb3Jhcnlcbi8vICh1bnN0YWJsZSkgQVBJcyB0aGF0IGhhdmUgYmVlbiByZW1vdmVkLiBDYW4gd2UgcmVtb3ZlIHRoZSBzeW1ib2xzP1xudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHxcbiAgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFKTtcbn1cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcblxudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7XG5cbi8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHx8IHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0Q29uc3VtZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRm9yd2FyZFJlZihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xufVxuZnVuY3Rpb24gaXNGcmFnbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNMYXp5KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0xBWllfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTWVtbyhvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9NRU1PX1RZUEU7XG59XG5mdW5jdGlvbiBpc1BvcnRhbChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QT1JUQUxfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUHJvZmlsZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdXNwZW5zZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xufVxuXG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUsIFlhaG9vISBJbmMuXG4gKiBDb3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuIFNlZSB0aGUgYWNjb21wYW55aW5nIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMuXG4gKi9cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcjogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gICAgbWl4aW5zOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICBuYW1lOiB0cnVlLFxuICAgIGxlbmd0aDogdHJ1ZSxcbiAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgY2FsbGVyOiB0cnVlLFxuICAgIGNhbGxlZTogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBGT1JXQVJEX1JFRl9TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgcmVuZGVyOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWVcbn07XG5cbnZhciBNRU1PX1NUQVRJQ1MgPSB7XG4gICAgJyQkdHlwZW9mJzogdHJ1ZSxcbiAgICBjb21wYXJlOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIFRZUEVfU1RBVElDUyA9IHt9O1xuVFlQRV9TVEFUSUNTW1JlYWN0SXMuRm9yd2FyZFJlZl0gPSBGT1JXQVJEX1JFRl9TVEFUSUNTO1xuXG5mdW5jdGlvbiBnZXRTdGF0aWNzKGNvbXBvbmVudCkge1xuICAgIGlmIChSZWFjdElzLmlzTWVtbyhjb21wb25lbnQpKSB7XG4gICAgICAgIHJldHVybiBNRU1PX1NUQVRJQ1M7XG4gICAgfVxuICAgIHJldHVybiBUWVBFX1NUQVRJQ1NbY29tcG9uZW50WyckJHR5cGVvZiddXSB8fCBSRUFDVF9TVEFUSUNTO1xufVxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG5cbiAgICAgICAgaWYgKG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBpbmhlcml0ZWRDb21wb25lbnQsIGJsYWNrbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldFN0YXRpY3MgPSBnZXRTdGF0aWNzKHRhcmdldENvbXBvbmVudCk7XG4gICAgICAgIHZhciBzb3VyY2VTdGF0aWNzID0gZ2V0U3RhdGljcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBpZiAoIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAhKGJsYWNrbGlzdCAmJiBibGFja2xpc3Rba2V5XSkgJiYgIShzb3VyY2VTdGF0aWNzICYmIHNvdXJjZVN0YXRpY3Nba2V5XSkgJiYgISh0YXJnZXRTdGF0aWNzICYmIHRhcmdldFN0YXRpY3Nba2V5XSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2VDb21wb25lbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob2lzdE5vblJlYWN0U3RhdGljcztcbiIsImltcG9ydCBjcmVhdGVDb250ZXh0IGZyb20gJ21pbmktY3JlYXRlLXJlYWN0LWNvbnRleHQnO1xuaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSwgY3JlYXRlTG9jYXRpb24sIGxvY2F0aW9uc0FyZUVxdWFsLCBjcmVhdGVQYXRoIH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcbmltcG9ydCBwYXRoVG9SZWdleHAgZnJvbSAncGF0aC10by1yZWdleHAnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHsgaXNWYWxpZEVsZW1lbnRUeXBlIH0gZnJvbSAncmVhY3QtaXMnO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UnO1xuaW1wb3J0IGhvaXN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5cbi8vIFRPRE86IFJlcGxhY2Ugd2l0aCBSZWFjdC5jcmVhdGVDb250ZXh0IG9uY2Ugd2UgY2FuIGFzc3VtZSBSZWFjdCAxNitcblxudmFyIGNyZWF0ZU5hbWVkQ29udGV4dCA9IGZ1bmN0aW9uIGNyZWF0ZU5hbWVkQ29udGV4dChuYW1lKSB7XG4gIHZhciBjb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuICBjb250ZXh0LmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgcmV0dXJuIGNvbnRleHQ7XG59O1xuXG52YXIgY29udGV4dCA9XG4vKiNfX1BVUkVfXyovXG5jcmVhdGVOYW1lZENvbnRleHQoXCJSb3V0ZXJcIik7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHB1dHRpbmcgaGlzdG9yeSBvbiBjb250ZXh0LlxuICovXG5cbnZhciBSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBSb3V0ZXIuY29tcHV0ZVJvb3RNYXRjaCA9IGZ1bmN0aW9uIGNvbXB1dGVSb290TWF0Y2gocGF0aG5hbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogXCIvXCIsXG4gICAgICB1cmw6IFwiL1wiLFxuICAgICAgcGFyYW1zOiB7fSxcbiAgICAgIGlzRXhhY3Q6IHBhdGhuYW1lID09PSBcIi9cIlxuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gUm91dGVyKHByb3BzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBsb2NhdGlvbjogcHJvcHMuaGlzdG9yeS5sb2NhdGlvblxuICAgIH07IC8vIFRoaXMgaXMgYSBiaXQgb2YgYSBoYWNrLiBXZSBoYXZlIHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IgbG9jYXRpb25cbiAgICAvLyBjaGFuZ2VzIGhlcmUgaW4gdGhlIGNvbnN0cnVjdG9yIGluIGNhc2UgdGhlcmUgYXJlIGFueSA8UmVkaXJlY3Q+c1xuICAgIC8vIG9uIHRoZSBpbml0aWFsIHJlbmRlci4gSWYgdGhlcmUgYXJlLCB0aGV5IHdpbGwgcmVwbGFjZS9wdXNoIHdoZW5cbiAgICAvLyB0aGV5IG1vdW50IGFuZCBzaW5jZSBjRE0gZmlyZXMgaW4gY2hpbGRyZW4gYmVmb3JlIHBhcmVudHMsIHdlIG1heVxuICAgIC8vIGdldCBhIG5ldyBsb2NhdGlvbiBiZWZvcmUgdGhlIDxSb3V0ZXI+IGlzIG1vdW50ZWQuXG5cbiAgICBfdGhpcy5faXNNb3VudGVkID0gZmFsc2U7XG4gICAgX3RoaXMuX3BlbmRpbmdMb2NhdGlvbiA9IG51bGw7XG5cbiAgICBpZiAoIXByb3BzLnN0YXRpY0NvbnRleHQpIHtcbiAgICAgIF90aGlzLnVubGlzdGVuID0gcHJvcHMuaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIGlmIChfdGhpcy5faXNNb3VudGVkKSB7XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuX3BlbmRpbmdMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9pc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdMb2NhdGlvbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxvY2F0aW9uOiB0aGlzLl9wZW5kaW5nTG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy51bmxpc3RlbikgdGhpcy51bmxpc3RlbigpO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Qcm92aWRlciwge1xuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW4gfHwgbnVsbCxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIGhpc3Rvcnk6IHRoaXMucHJvcHMuaGlzdG9yeSxcbiAgICAgICAgbG9jYXRpb246IHRoaXMuc3RhdGUubG9jYXRpb24sXG4gICAgICAgIG1hdGNoOiBSb3V0ZXIuY29tcHV0ZVJvb3RNYXRjaCh0aGlzLnN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lKSxcbiAgICAgICAgc3RhdGljQ29udGV4dDogdGhpcy5wcm9wcy5zdGF0aWNDb250ZXh0XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBoaXN0b3J5OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgc3RhdGljQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdFxuICB9O1xuXG4gIFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKHByZXZQcm9wcykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcocHJldlByb3BzLmhpc3RvcnkgPT09IHRoaXMucHJvcHMuaGlzdG9yeSwgXCJZb3UgY2Fubm90IGNoYW5nZSA8Um91dGVyIGhpc3Rvcnk+XCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgc3RvcmVzIGxvY2F0aW9uIGluIG1lbW9yeS5cbiAqL1xuXG52YXIgTWVtb3J5Um91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKE1lbW9yeVJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTWVtb3J5Um91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVNZW1vcnlIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTWVtb3J5Um91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTWVtb3J5Um91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIE1lbW9yeVJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgaW5pdGlhbEVudHJpZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbml0aWFsSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxuICB9O1xuXG4gIE1lbW9yeVJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxNZW1vcnlSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBNZW1vcnlSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxudmFyIExpZmVjeWNsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShMaWZlY3ljbGUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIExpZmVjeWNsZSgpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTGlmZWN5Y2xlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdW50KSB0aGlzLnByb3BzLm9uTW91bnQuY2FsbCh0aGlzLCB0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLm9uVXBkYXRlKSB0aGlzLnByb3BzLm9uVXBkYXRlLmNhbGwodGhpcywgdGhpcywgcHJldlByb3BzKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVubW91bnQpIHRoaXMucHJvcHMub25Vbm1vdW50LmNhbGwodGhpcywgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gTGlmZWN5Y2xlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBwcm9tcHRpbmcgdGhlIHVzZXIgYmVmb3JlIG5hdmlnYXRpbmcgYXdheSBmcm9tIGEgc2NyZWVuLlxuICovXG5cbmZ1bmN0aW9uIFByb21wdChfcmVmKSB7XG4gIHZhciBtZXNzYWdlID0gX3JlZi5tZXNzYWdlLFxuICAgICAgX3JlZiR3aGVuID0gX3JlZi53aGVuLFxuICAgICAgd2hlbiA9IF9yZWYkd2hlbiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYkd2hlbjtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFByb21wdD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBpZiAoIXdoZW4gfHwgY29udGV4dCQkMS5zdGF0aWNDb250ZXh0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgbWV0aG9kID0gY29udGV4dCQkMS5oaXN0b3J5LmJsb2NrO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpZmVjeWNsZSwge1xuICAgICAgb25Nb3VudDogZnVuY3Rpb24gb25Nb3VudChzZWxmKSB7XG4gICAgICAgIHNlbGYucmVsZWFzZSA9IG1ldGhvZChtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoc2VsZiwgcHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMubWVzc2FnZSAhPT0gbWVzc2FnZSkge1xuICAgICAgICAgIHNlbGYucmVsZWFzZSgpO1xuICAgICAgICAgIHNlbGYucmVsZWFzZSA9IG1ldGhvZChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uVW5tb3VudDogZnVuY3Rpb24gb25Vbm1vdW50KHNlbGYpIHtcbiAgICAgICAgc2VsZi5yZWxlYXNlKCk7XG4gICAgICB9LFxuICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgIH0pO1xuICB9KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICB2YXIgbWVzc2FnZVR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLnN0cmluZ10pO1xuICBQcm9tcHQucHJvcFR5cGVzID0ge1xuICAgIHdoZW46IFByb3BUeXBlcy5ib29sLFxuICAgIG1lc3NhZ2U6IG1lc3NhZ2VUeXBlLmlzUmVxdWlyZWRcbiAgfTtcbn1cblxudmFyIGNhY2hlID0ge307XG52YXIgY2FjaGVMaW1pdCA9IDEwMDAwO1xudmFyIGNhY2hlQ291bnQgPSAwO1xuXG5mdW5jdGlvbiBjb21waWxlUGF0aChwYXRoKSB7XG4gIGlmIChjYWNoZVtwYXRoXSkgcmV0dXJuIGNhY2hlW3BhdGhdO1xuICB2YXIgZ2VuZXJhdG9yID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUocGF0aCk7XG5cbiAgaWYgKGNhY2hlQ291bnQgPCBjYWNoZUxpbWl0KSB7XG4gICAgY2FjaGVbcGF0aF0gPSBnZW5lcmF0b3I7XG4gICAgY2FjaGVDb3VudCsrO1xuICB9XG5cbiAgcmV0dXJuIGdlbmVyYXRvcjtcbn1cbi8qKlxuICogUHVibGljIEFQSSBmb3IgZ2VuZXJhdGluZyBhIFVSTCBwYXRobmFtZSBmcm9tIGEgcGF0aCBhbmQgcGFyYW1ldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlUGF0aChwYXRoLCBwYXJhbXMpIHtcbiAgaWYgKHBhdGggPT09IHZvaWQgMCkge1xuICAgIHBhdGggPSBcIi9cIjtcbiAgfVxuXG4gIGlmIChwYXJhbXMgPT09IHZvaWQgMCkge1xuICAgIHBhcmFtcyA9IHt9O1xuICB9XG5cbiAgcmV0dXJuIHBhdGggPT09IFwiL1wiID8gcGF0aCA6IGNvbXBpbGVQYXRoKHBhdGgpKHBhcmFtcywge1xuICAgIHByZXR0eTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgbmF2aWdhdGluZyBwcm9ncmFtbWF0aWNhbGx5IHdpdGggYSBjb21wb25lbnQuXG4gKi9cblxuZnVuY3Rpb24gUmVkaXJlY3QoX3JlZikge1xuICB2YXIgY29tcHV0ZWRNYXRjaCA9IF9yZWYuY29tcHV0ZWRNYXRjaCxcbiAgICAgIHRvID0gX3JlZi50byxcbiAgICAgIF9yZWYkcHVzaCA9IF9yZWYucHVzaCxcbiAgICAgIHB1c2ggPSBfcmVmJHB1c2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRwdXNoO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICFjb250ZXh0JCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UmVkaXJlY3Q+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIGhpc3RvcnkgPSBjb250ZXh0JCQxLmhpc3RvcnksXG4gICAgICAgIHN0YXRpY0NvbnRleHQgPSBjb250ZXh0JCQxLnN0YXRpY0NvbnRleHQ7XG4gICAgdmFyIG1ldGhvZCA9IHB1c2ggPyBoaXN0b3J5LnB1c2ggOiBoaXN0b3J5LnJlcGxhY2U7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oY29tcHV0ZWRNYXRjaCA/IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGdlbmVyYXRlUGF0aCh0bywgY29tcHV0ZWRNYXRjaC5wYXJhbXMpIDogX2V4dGVuZHMoe30sIHRvLCB7XG4gICAgICBwYXRobmFtZTogZ2VuZXJhdGVQYXRoKHRvLnBhdGhuYW1lLCBjb21wdXRlZE1hdGNoLnBhcmFtcylcbiAgICB9KSA6IHRvKTsgLy8gV2hlbiByZW5kZXJpbmcgaW4gYSBzdGF0aWMgY29udGV4dCxcbiAgICAvLyBzZXQgdGhlIG5ldyBsb2NhdGlvbiBpbW1lZGlhdGVseS5cblxuICAgIGlmIChzdGF0aWNDb250ZXh0KSB7XG4gICAgICBtZXRob2QobG9jYXRpb24pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlmZWN5Y2xlLCB7XG4gICAgICBvbk1vdW50OiBmdW5jdGlvbiBvbk1vdW50KCkge1xuICAgICAgICBtZXRob2QobG9jYXRpb24pO1xuICAgICAgfSxcbiAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShzZWxmLCBwcmV2UHJvcHMpIHtcbiAgICAgICAgdmFyIHByZXZMb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHByZXZQcm9wcy50byk7XG5cbiAgICAgICAgaWYgKCFsb2NhdGlvbnNBcmVFcXVhbChwcmV2TG9jYXRpb24sIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgICAgICAgIGtleTogcHJldkxvY2F0aW9uLmtleVxuICAgICAgICB9KSkpIHtcbiAgICAgICAgICBtZXRob2QobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG86IHRvXG4gICAgfSk7XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJlZGlyZWN0LnByb3BUeXBlcyA9IHtcbiAgICBwdXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmcm9tOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSkuaXNSZXF1aXJlZFxuICB9O1xufVxuXG52YXIgY2FjaGUkMSA9IHt9O1xudmFyIGNhY2hlTGltaXQkMSA9IDEwMDAwO1xudmFyIGNhY2hlQ291bnQkMSA9IDA7XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXRoJDEocGF0aCwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVLZXkgPSBcIlwiICsgb3B0aW9ucy5lbmQgKyBvcHRpb25zLnN0cmljdCArIG9wdGlvbnMuc2Vuc2l0aXZlO1xuICB2YXIgcGF0aENhY2hlID0gY2FjaGUkMVtjYWNoZUtleV0gfHwgKGNhY2hlJDFbY2FjaGVLZXldID0ge30pO1xuICBpZiAocGF0aENhY2hlW3BhdGhdKSByZXR1cm4gcGF0aENhY2hlW3BhdGhdO1xuICB2YXIga2V5cyA9IFtdO1xuICB2YXIgcmVnZXhwID0gcGF0aFRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIHJlZ2V4cDogcmVnZXhwLFxuICAgIGtleXM6IGtleXNcbiAgfTtcblxuICBpZiAoY2FjaGVDb3VudCQxIDwgY2FjaGVMaW1pdCQxKSB7XG4gICAgcGF0aENhY2hlW3BhdGhdID0gcmVzdWx0O1xuICAgIGNhY2hlQ291bnQkMSsrO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUHVibGljIEFQSSBmb3IgbWF0Y2hpbmcgYSBVUkwgcGF0aG5hbWUgdG8gYSBwYXRoLlxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hQYXRoKHBhdGhuYW1lLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIG9wdGlvbnMgPSB7XG4gICAgcGF0aDogb3B0aW9uc1xuICB9O1xuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgcGF0aCA9IF9vcHRpb25zLnBhdGgsXG4gICAgICBfb3B0aW9ucyRleGFjdCA9IF9vcHRpb25zLmV4YWN0LFxuICAgICAgZXhhY3QgPSBfb3B0aW9ucyRleGFjdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRleGFjdCxcbiAgICAgIF9vcHRpb25zJHN0cmljdCA9IF9vcHRpb25zLnN0cmljdCxcbiAgICAgIHN0cmljdCA9IF9vcHRpb25zJHN0cmljdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRzdHJpY3QsXG4gICAgICBfb3B0aW9ucyRzZW5zaXRpdmUgPSBfb3B0aW9ucy5zZW5zaXRpdmUsXG4gICAgICBzZW5zaXRpdmUgPSBfb3B0aW9ucyRzZW5zaXRpdmUgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc2Vuc2l0aXZlO1xuICB2YXIgcGF0aHMgPSBbXS5jb25jYXQocGF0aCk7XG4gIHJldHVybiBwYXRocy5yZWR1Y2UoZnVuY3Rpb24gKG1hdGNoZWQsIHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuICAgIGlmIChtYXRjaGVkKSByZXR1cm4gbWF0Y2hlZDtcblxuICAgIHZhciBfY29tcGlsZVBhdGggPSBjb21waWxlUGF0aCQxKHBhdGgsIHtcbiAgICAgIGVuZDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgIHNlbnNpdGl2ZTogc2Vuc2l0aXZlXG4gICAgfSksXG4gICAgICAgIHJlZ2V4cCA9IF9jb21waWxlUGF0aC5yZWdleHAsXG4gICAgICAgIGtleXMgPSBfY29tcGlsZVBhdGgua2V5cztcblxuICAgIHZhciBtYXRjaCA9IHJlZ2V4cC5leGVjKHBhdGhuYW1lKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdXJsID0gbWF0Y2hbMF0sXG4gICAgICAgIHZhbHVlcyA9IG1hdGNoLnNsaWNlKDEpO1xuICAgIHZhciBpc0V4YWN0ID0gcGF0aG5hbWUgPT09IHVybDtcbiAgICBpZiAoZXhhY3QgJiYgIWlzRXhhY3QpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgLy8gdGhlIHBhdGggdXNlZCB0byBtYXRjaFxuICAgICAgdXJsOiBwYXRoID09PSBcIi9cIiAmJiB1cmwgPT09IFwiXCIgPyBcIi9cIiA6IHVybCxcbiAgICAgIC8vIHRoZSBtYXRjaGVkIHBvcnRpb24gb2YgdGhlIFVSTFxuICAgICAgaXNFeGFjdDogaXNFeGFjdCxcbiAgICAgIC8vIHdoZXRoZXIgb3Igbm90IHdlIG1hdGNoZWQgZXhhY3RseVxuICAgICAgcGFyYW1zOiBrZXlzLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5LCBpbmRleCkge1xuICAgICAgICBtZW1vW2tleS5uYW1lXSA9IHZhbHVlc1tpbmRleF07XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgfSwge30pXG4gICAgfTtcbiAgfSwgbnVsbCk7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikge1xuICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID09PSAwO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgbWF0Y2hpbmcgYSBzaW5nbGUgcGF0aCBhbmQgcmVuZGVyaW5nLlxuICovXG5cblxudmFyIFJvdXRlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFJvdXRlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBSb3V0ZSgpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUm91dGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgdmFyIGxvY2F0aW9uID0gX3RoaXMucHJvcHMubG9jYXRpb24gfHwgY29udGV4dCQkMS5sb2NhdGlvbjtcbiAgICAgIHZhciBtYXRjaCA9IF90aGlzLnByb3BzLmNvbXB1dGVkTWF0Y2ggPyBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoIC8vIDxTd2l0Y2g+IGFscmVhZHkgY29tcHV0ZWQgdGhlIG1hdGNoIGZvciB1c1xuICAgICAgOiBfdGhpcy5wcm9wcy5wYXRoID8gbWF0Y2hQYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBfdGhpcy5wcm9wcykgOiBjb250ZXh0JCQxLm1hdGNoO1xuXG4gICAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgY29udGV4dCQkMSwge1xuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIG1hdGNoOiBtYXRjaFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgY29tcG9uZW50ID0gX3RoaXMkcHJvcHMuY29tcG9uZW50LFxuICAgICAgICAgIHJlbmRlciA9IF90aGlzJHByb3BzLnJlbmRlcjsgLy8gUHJlYWN0IHVzZXMgYW4gZW1wdHkgYXJyYXkgYXMgY2hpbGRyZW4gYnlcbiAgICAgIC8vIGRlZmF1bHQsIHNvIHVzZSBudWxsIGlmIHRoYXQncyB0aGUgY2FzZS5cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuKHByb3BzKTtcblxuICAgICAgICBpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gX3RoaXMucHJvcHMucGF0aDtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsIFwiWW91IHJldHVybmVkIGB1bmRlZmluZWRgIGZyb20gdGhlIGBjaGlsZHJlbmAgZnVuY3Rpb24gb2YgXCIgKyAoXCI8Um91dGVcIiArIChwYXRoID8gXCIgcGF0aD1cXFwiXCIgKyBwYXRoICsgXCJcXFwiXCIgOiBcIlwiKSArIFwiPiwgYnV0IHlvdSBcIikgKyBcInNob3VsZCBoYXZlIHJldHVybmVkIGEgUmVhY3QgZWxlbWVudCBvciBgbnVsbGBcIikgOiB2b2lkIDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgICAgdmFsdWU6IHByb3BzXG4gICAgICB9LCBjaGlsZHJlbiAmJiAhaXNFbXB0eUNoaWxkcmVuKGNoaWxkcmVuKSA/IGNoaWxkcmVuIDogcHJvcHMubWF0Y2ggPyBjb21wb25lbnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpIDogcmVuZGVyID8gcmVuZGVyKHByb3BzKSA6IG51bGwgOiBudWxsKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUm91dGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUm91dGUucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjb21wb25lbnQ6IGZ1bmN0aW9uIGNvbXBvbmVudChwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gJiYgIWlzVmFsaWRFbGVtZW50VHlwZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbnZhbGlkIHByb3AgJ2NvbXBvbmVudCcgc3VwcGxpZWQgdG8gJ1JvdXRlJzogdGhlIHByb3AgaXMgbm90IGEgdmFsaWQgUmVhY3QgY29tcG9uZW50XCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXhhY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHBhdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXSksXG4gICAgcmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZW5zaXRpdmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0cmljdDogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMuY2hpbGRyZW4gJiYgIWlzRW1wdHlDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuKSAmJiB0aGlzLnByb3BzLmNvbXBvbmVudCksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgY2hpbGRyZW4+IGluIHRoZSBzYW1lIHJvdXRlOyA8Um91dGUgY29tcG9uZW50PiB3aWxsIGJlIGlnbm9yZWRcIikgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMuY2hpbGRyZW4gJiYgIWlzRW1wdHlDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuKSAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSByZW5kZXI+IGFuZCA8Um91dGUgY2hpbGRyZW4+IGluIHRoZSBzYW1lIHJvdXRlOyA8Um91dGUgcmVuZGVyPiB3aWxsIGJlIGlnbm9yZWRcIikgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMuY29tcG9uZW50ICYmIHRoaXMucHJvcHMucmVuZGVyKSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIGNvbXBvbmVudD4gYW5kIDxSb3V0ZSByZW5kZXI+IGluIHRoZSBzYW1lIHJvdXRlOyA8Um91dGUgcmVuZGVyPiB3aWxsIGJlIGlnbm9yZWRcIikgOiB2b2lkIDA7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5sb2NhdGlvbiAmJiAhcHJldlByb3BzLmxvY2F0aW9uKSwgJzxSb3V0ZT4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSB1bmNvbnRyb2xsZWQgdG8gY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBpbml0aWFsbHkgdXNlZCBubyBcImxvY2F0aW9uXCIgcHJvcCBhbmQgdGhlbiBwcm92aWRlZCBvbmUgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEoIXRoaXMucHJvcHMubG9jYXRpb24gJiYgcHJldlByb3BzLmxvY2F0aW9uKSwgJzxSb3V0ZT4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBwcm92aWRlZCBhIFwibG9jYXRpb25cIiBwcm9wIGluaXRpYWxseSBidXQgb21pdHRlZCBpdCBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiID8gcGF0aCA6IFwiL1wiICsgcGF0aDtcbn1cblxuZnVuY3Rpb24gYWRkQmFzZW5hbWUoYmFzZW5hbWUsIGxvY2F0aW9uKSB7XG4gIGlmICghYmFzZW5hbWUpIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUpICsgbG9jYXRpb24ucGF0aG5hbWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUoYmFzZW5hbWUsIGxvY2F0aW9uKSB7XG4gIGlmICghYmFzZW5hbWUpIHJldHVybiBsb2NhdGlvbjtcbiAgdmFyIGJhc2UgPSBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUpO1xuICBpZiAobG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZihiYXNlKSAhPT0gMCkgcmV0dXJuIGxvY2F0aW9uO1xuICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cihiYXNlLmxlbmd0aClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVSTChsb2NhdGlvbikge1xuICByZXR1cm4gdHlwZW9mIGxvY2F0aW9uID09PSBcInN0cmluZ1wiID8gbG9jYXRpb24gOiBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbn1cblxuZnVuY3Rpb24gc3RhdGljSGFuZGxlcihtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBjYW5ub3QgJXMgd2l0aCA8U3RhdGljUm91dGVyPlwiLCBtZXRob2ROYW1lKSA6IGludmFyaWFudChmYWxzZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuLyoqXG4gKiBUaGUgcHVibGljIHRvcC1sZXZlbCBBUEkgZm9yIGEgXCJzdGF0aWNcIiA8Um91dGVyPiwgc28tY2FsbGVkIGJlY2F1c2UgaXRcbiAqIGNhbid0IGFjdHVhbGx5IGNoYW5nZSB0aGUgY3VycmVudCBsb2NhdGlvbi4gSW5zdGVhZCwgaXQganVzdCByZWNvcmRzXG4gKiBsb2NhdGlvbiBjaGFuZ2VzIGluIGEgY29udGV4dCBvYmplY3QuIFVzZWZ1bCBtYWlubHkgaW4gdGVzdGluZyBhbmRcbiAqIHNlcnZlci1yZW5kZXJpbmcgc2NlbmFyaW9zLlxuICovXG5cblxudmFyIFN0YXRpY1JvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTdGF0aWNSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN0YXRpY1JvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcblxuICAgIF90aGlzLmhhbmRsZVB1c2ggPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlBVU0hcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZVJlcGxhY2UgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlJFUExBQ0VcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3RhdGljUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubmF2aWdhdGVUbyA9IGZ1bmN0aW9uIG5hdmlnYXRlVG8obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzJGJhc2VuYW1lID0gX3RoaXMkcHJvcHMuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wcyRiYXNlbmFtZSxcbiAgICAgICAgX3RoaXMkcHJvcHMkY29udGV4dCA9IF90aGlzJHByb3BzLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wcyRjb250ZXh0ID09PSB2b2lkIDAgPyB7fSA6IF90aGlzJHByb3BzJGNvbnRleHQ7XG4gICAgY29udGV4dC5hY3Rpb24gPSBhY3Rpb247XG4gICAgY29udGV4dC5sb2NhdGlvbiA9IGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpO1xuICAgIGNvbnRleHQudXJsID0gY3JlYXRlVVJMKGNvbnRleHQubG9jYXRpb24pO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzJHByb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzMiRiYXNlbmFtZSA9IF90aGlzJHByb3BzMi5iYXNlbmFtZSxcbiAgICAgICAgYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wczIkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzMiRjb250ZXh0ID0gX3RoaXMkcHJvcHMyLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wczIkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wczIkY29udGV4dCxcbiAgICAgICAgX3RoaXMkcHJvcHMyJGxvY2F0aW9uID0gX3RoaXMkcHJvcHMyLmxvY2F0aW9uLFxuICAgICAgICBsb2NhdGlvbiA9IF90aGlzJHByb3BzMiRsb2NhdGlvbiA9PT0gdm9pZCAwID8gXCIvXCIgOiBfdGhpcyRwcm9wczIkbG9jYXRpb24sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wczIsIFtcImJhc2VuYW1lXCIsIFwiY29udGV4dFwiLCBcImxvY2F0aW9uXCJdKTtcblxuICAgIHZhciBoaXN0b3J5ID0ge1xuICAgICAgY3JlYXRlSHJlZjogZnVuY3Rpb24gY3JlYXRlSHJlZihwYXRoKSB7XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUgKyBjcmVhdGVVUkwocGF0aCkpO1xuICAgICAgfSxcbiAgICAgIGFjdGlvbjogXCJQT1BcIixcbiAgICAgIGxvY2F0aW9uOiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpLFxuICAgICAgcHVzaDogdGhpcy5oYW5kbGVQdXNoLFxuICAgICAgcmVwbGFjZTogdGhpcy5oYW5kbGVSZXBsYWNlLFxuICAgICAgZ286IHN0YXRpY0hhbmRsZXIoXCJnb1wiKSxcbiAgICAgIGdvQmFjazogc3RhdGljSGFuZGxlcihcImdvQmFja1wiKSxcbiAgICAgIGdvRm9yd2FyZDogc3RhdGljSGFuZGxlcihcImdvRm9yd2FyZFwiKSxcbiAgICAgIGxpc3RlbjogdGhpcy5oYW5kbGVMaXN0ZW4sXG4gICAgICBibG9jazogdGhpcy5oYW5kbGVCbG9ja1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgaGlzdG9yeTogaGlzdG9yeSxcbiAgICAgIHN0YXRpY0NvbnRleHQ6IGNvbnRleHRcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIFN0YXRpY1JvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTdGF0aWNSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKVxuICB9O1xuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxTdGF0aWNSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBTdGF0aWNSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIHRoZSBmaXJzdCA8Um91dGU+IHRoYXQgbWF0Y2hlcy5cbiAqL1xuXG52YXIgU3dpdGNoID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFN3aXRjaCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTd2l0Y2gucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFN3aXRjaD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQkJDEubG9jYXRpb247XG4gICAgICB2YXIgZWxlbWVudCwgbWF0Y2g7IC8vIFdlIHVzZSBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoIGluc3RlYWQgb2YgUmVhY3QuQ2hpbGRyZW4udG9BcnJheSgpLmZpbmQoKVxuICAgICAgLy8gaGVyZSBiZWNhdXNlIHRvQXJyYXkgYWRkcyBrZXlzIHRvIGFsbCBjaGlsZCBlbGVtZW50cyBhbmQgd2UgZG8gbm90IHdhbnRcbiAgICAgIC8vIHRvIHRyaWdnZXIgYW4gdW5tb3VudC9yZW1vdW50IGZvciB0d28gPFJvdXRlPnMgdGhhdCByZW5kZXIgdGhlIHNhbWVcbiAgICAgIC8vIGNvbXBvbmVudCBhdCBkaWZmZXJlbnQgVVJMcy5cblxuICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChfdGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsICYmIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIGVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICB2YXIgcGF0aCA9IGNoaWxkLnByb3BzLnBhdGggfHwgY2hpbGQucHJvcHMuZnJvbTtcbiAgICAgICAgICBtYXRjaCA9IHBhdGggPyBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIF9leHRlbmRzKHt9LCBjaGlsZC5wcm9wcywge1xuICAgICAgICAgICAgcGF0aDogcGF0aFxuICAgICAgICAgIH0pKSA6IGNvbnRleHQkJDEubWF0Y2g7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBjb21wdXRlZE1hdGNoOiBtYXRjaFxuICAgICAgfSkgOiBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTd2l0Y2g7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBTd2l0Y2gucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5sb2NhdGlvbiAmJiAhcHJldlByb3BzLmxvY2F0aW9uKSwgJzxTd2l0Y2g+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogQSBwdWJsaWMgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byBhY2Nlc3MgdGhlIGltcGVyYXRpdmUgQVBJXG4gKi9cblxuZnVuY3Rpb24gd2l0aFJvdXRlcihDb21wb25lbnQpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gXCJ3aXRoUm91dGVyKFwiICsgKENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSkgKyBcIilcIjtcblxuICB2YXIgQyA9IGZ1bmN0aW9uIEMocHJvcHMpIHtcbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudFJlZiA9IHByb3BzLndyYXBwZWRDb21wb25lbnRSZWYsXG4gICAgICAgIHJlbWFpbmluZ1Byb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJvcHMsIFtcIndyYXBwZWRDb21wb25lbnRSZWZcIl0pO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAgICFjb250ZXh0JCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8XCIgKyBkaXNwbGF5TmFtZSArIFwiIC8+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHt9LCByZW1haW5pbmdQcm9wcywgY29udGV4dCQkMSwge1xuICAgICAgICByZWY6IHdyYXBwZWRDb21wb25lbnRSZWZcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBDLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIEMuV3JhcHBlZENvbXBvbmVudCA9IENvbXBvbmVudDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgQy5wcm9wVHlwZXMgPSB7XG4gICAgICB3cmFwcGVkQ29tcG9uZW50UmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBob2lzdFN0YXRpY3MoQywgQ29tcG9uZW50KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBnbG9iYWwgPSB3aW5kb3c7XG4gICAgdmFyIGtleSA9IFwiX19yZWFjdF9yb3V0ZXJfYnVpbGRfX1wiO1xuICAgIHZhciBidWlsZE5hbWVzID0ge1xuICAgICAgY2pzOiBcIkNvbW1vbkpTXCIsXG4gICAgICBlc206IFwiRVMgbW9kdWxlc1wiLFxuICAgICAgdW1kOiBcIlVNRFwiXG4gICAgfTtcblxuICAgIGlmIChnbG9iYWxba2V5XSAmJiBnbG9iYWxba2V5XSAhPT0gXCJlc21cIikge1xuICAgICAgdmFyIGluaXRpYWxCdWlsZE5hbWUgPSBidWlsZE5hbWVzW2dsb2JhbFtrZXldXTtcbiAgICAgIHZhciBzZWNvbmRhcnlCdWlsZE5hbWUgPSBidWlsZE5hbWVzW1wiZXNtXCJdOyAvLyBUT0RPOiBBZGQgbGluayB0byBhcnRpY2xlIHRoYXQgZXhwbGFpbnMgaW4gZGV0YWlsIGhvdyB0byBhdm9pZFxuICAgICAgLy8gbG9hZGluZyAyIGRpZmZlcmVudCBidWlsZHMuXG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBhcmUgbG9hZGluZyB0aGUgXCIgKyBzZWNvbmRhcnlCdWlsZE5hbWUgKyBcIiBidWlsZCBvZiBSZWFjdCBSb3V0ZXIgXCIgKyAoXCJvbiBhIHBhZ2UgdGhhdCBpcyBhbHJlYWR5IHJ1bm5pbmcgdGhlIFwiICsgaW5pdGlhbEJ1aWxkTmFtZSArIFwiIFwiKSArIFwiYnVpbGQsIHNvIHRoaW5ncyB3b24ndCB3b3JrIHJpZ2h0LlwiKTtcbiAgICB9XG5cbiAgICBnbG9iYWxba2V5XSA9IFwiZXNtXCI7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWVtb3J5Um91dGVyLCBQcm9tcHQsIFJlZGlyZWN0LCBSb3V0ZSwgUm91dGVyLCBTdGF0aWNSb3V0ZXIsIFN3aXRjaCwgZ2VuZXJhdGVQYXRoLCBtYXRjaFBhdGgsIHdpdGhSb3V0ZXIsIGNvbnRleHQgYXMgX19Sb3V0ZXJDb250ZXh0IH07XG4iLCJpbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGVyLCBfX1JvdXRlckNvbnRleHQsIG1hdGNoUGF0aCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5leHBvcnQgKiBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHVzZXMgSFRNTDUgaGlzdG9yeS5cbiAqL1xuXG52YXIgQnJvd3NlclJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShCcm93c2VyUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBCcm93c2VyUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVCcm93c2VySGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEJyb3dzZXJSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBCcm93c2VyUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEJyb3dzZXJSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBmb3JjZVJlZnJlc2g6IFByb3BUeXBlcy5ib29sLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleUxlbmd0aDogUHJvcFR5cGVzLm51bWJlclxuICB9O1xuXG4gIEJyb3dzZXJSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8QnJvd3NlclJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHVzZXMgd2luZG93LmxvY2F0aW9uLmhhc2guXG4gKi9cblxudmFyIEhhc2hSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoSGFzaFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSGFzaFJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlSGFzaEhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBIYXNoUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gSGFzaFJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBIYXNoUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFzaFR5cGU6IFByb3BUeXBlcy5vbmVPZihbXCJoYXNoYmFuZ1wiLCBcIm5vc2xhc2hcIiwgXCJzbGFzaFwiXSlcbiAgfTtcblxuICBIYXNoUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPEhhc2hSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBIYXNoUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciByZW5kZXJpbmcgYSBoaXN0b3J5LWF3YXJlIDxhPi5cbiAqL1xuXG5cbnZhciBMaW5rID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKExpbmssIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIExpbmsoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IExpbmsucHJvdG90eXBlO1xuXG4gIF9wcm90by5oYW5kbGVDbGljayA9IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50LCBoaXN0b3J5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aHJvdyBleDtcbiAgICB9XG5cbiAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgJiYgLy8gb25DbGljayBwcmV2ZW50ZWQgZGVmYXVsdFxuICAgIGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiAoIC8vIGlnbm9yZSBldmVyeXRoaW5nIGJ1dCBsZWZ0IGNsaWNrc1xuICAgICF0aGlzLnByb3BzLnRhcmdldCB8fCB0aGlzLnByb3BzLnRhcmdldCA9PT0gXCJfc2VsZlwiKSAmJiAvLyBsZXQgYnJvd3NlciBoYW5kbGUgXCJ0YXJnZXQ9X2JsYW5rXCIgZXRjLlxuICAgICFpc01vZGlmaWVkRXZlbnQoZXZlbnQpIC8vIGlnbm9yZSBjbGlja3Mgd2l0aCBtb2RpZmllciBrZXlzXG4gICAgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBtZXRob2QgPSB0aGlzLnByb3BzLnJlcGxhY2UgPyBoaXN0b3J5LnJlcGxhY2UgOiBoaXN0b3J5LnB1c2g7XG4gICAgICAgIG1ldGhvZCh0aGlzLnByb3BzLnRvKTtcbiAgICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBpbm5lclJlZiA9IF90aGlzJHByb3BzLmlubmVyUmVmLFxuICAgICAgICByZXBsYWNlID0gX3RoaXMkcHJvcHMucmVwbGFjZSxcbiAgICAgICAgdG8gPSBfdGhpcyRwcm9wcy50byxcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzLCBbXCJpbm5lclJlZlwiLCBcInJlcGxhY2VcIiwgXCJ0b1wiXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX19Sb3V0ZXJDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgIWNvbnRleHQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxMaW5rPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gY3JlYXRlTG9jYXRpb24odG8sIG51bGwsIG51bGwsIGNvbnRleHQubG9jYXRpb24pIDogdG87XG4gICAgICB2YXIgaHJlZiA9IGxvY2F0aW9uID8gY29udGV4dC5oaXN0b3J5LmNyZWF0ZUhyZWYobG9jYXRpb24pIDogXCJcIjtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUNsaWNrKGV2ZW50LCBjb250ZXh0Lmhpc3RvcnkpO1xuICAgICAgICB9LFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICByZWY6IGlubmVyUmVmXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIExpbms7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIHRvVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKTtcbiAgdmFyIGlubmVyUmVmVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGN1cnJlbnQ6IFByb3BUeXBlcy5hbnlcbiAgfSldKTtcbiAgTGluay5wcm9wVHlwZXMgPSB7XG4gICAgaW5uZXJSZWY6IGlubmVyUmVmVHlwZSxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZXBsYWNlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IHRvVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbmZ1bmN0aW9uIGpvaW5DbGFzc25hbWVzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NuYW1lcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBjbGFzc25hbWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGNsYXNzbmFtZXMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGk7XG4gIH0pLmpvaW4oXCIgXCIpO1xufVxuLyoqXG4gKiBBIDxMaW5rPiB3cmFwcGVyIHRoYXQga25vd3MgaWYgaXQncyBcImFjdGl2ZVwiIG9yIG5vdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIE5hdkxpbmsoX3JlZikge1xuICB2YXIgX3JlZiRhcmlhQ3VycmVudCA9IF9yZWZbXCJhcmlhLWN1cnJlbnRcIl0sXG4gICAgICBhcmlhQ3VycmVudCA9IF9yZWYkYXJpYUN1cnJlbnQgPT09IHZvaWQgMCA/IFwicGFnZVwiIDogX3JlZiRhcmlhQ3VycmVudCxcbiAgICAgIF9yZWYkYWN0aXZlQ2xhc3NOYW1lID0gX3JlZi5hY3RpdmVDbGFzc05hbWUsXG4gICAgICBhY3RpdmVDbGFzc05hbWUgPSBfcmVmJGFjdGl2ZUNsYXNzTmFtZSA9PT0gdm9pZCAwID8gXCJhY3RpdmVcIiA6IF9yZWYkYWN0aXZlQ2xhc3NOYW1lLFxuICAgICAgYWN0aXZlU3R5bGUgPSBfcmVmLmFjdGl2ZVN0eWxlLFxuICAgICAgY2xhc3NOYW1lUHJvcCA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgZXhhY3QgPSBfcmVmLmV4YWN0LFxuICAgICAgaXNBY3RpdmVQcm9wID0gX3JlZi5pc0FjdGl2ZSxcbiAgICAgIGxvY2F0aW9uUHJvcCA9IF9yZWYubG9jYXRpb24sXG4gICAgICBzdHJpY3QgPSBfcmVmLnN0cmljdCxcbiAgICAgIHN0eWxlUHJvcCA9IF9yZWYuc3R5bGUsXG4gICAgICB0byA9IF9yZWYudG8sXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYXJpYS1jdXJyZW50XCIsIFwiYWN0aXZlQ2xhc3NOYW1lXCIsIFwiYWN0aXZlU3R5bGVcIiwgXCJjbGFzc05hbWVcIiwgXCJleGFjdFwiLCBcImlzQWN0aXZlXCIsIFwibG9jYXRpb25cIiwgXCJzdHJpY3RcIiwgXCJzdHlsZVwiLCBcInRvXCJdKTtcblxuICB2YXIgcGF0aCA9IHR5cGVvZiB0byA9PT0gXCJvYmplY3RcIiA/IHRvLnBhdGhuYW1lIDogdG87IC8vIFJlZ2V4IHRha2VuIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9waWxsYXJqcy9wYXRoLXRvLXJlZ2V4cC9ibG9iL21hc3Rlci9pbmRleC5qcyNMMjAyXG5cbiAgdmFyIGVzY2FwZWRQYXRoID0gcGF0aCAmJiBwYXRoLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18L1xcXFxdKS9nLCBcIlxcXFwkMVwiKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX19Sb3V0ZXJDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TmF2TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgcGF0aFRvTWF0Y2ggPSBsb2NhdGlvblByb3AgPyBsb2NhdGlvblByb3AucGF0aG5hbWUgOiBjb250ZXh0LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBtYXRjaCA9IGVzY2FwZWRQYXRoID8gbWF0Y2hQYXRoKHBhdGhUb01hdGNoLCB7XG4gICAgICBwYXRoOiBlc2NhcGVkUGF0aCxcbiAgICAgIGV4YWN0OiBleGFjdCxcbiAgICAgIHN0cmljdDogc3RyaWN0XG4gICAgfSkgOiBudWxsO1xuICAgIHZhciBpc0FjdGl2ZSA9ICEhKGlzQWN0aXZlUHJvcCA/IGlzQWN0aXZlUHJvcChtYXRjaCwgY29udGV4dC5sb2NhdGlvbikgOiBtYXRjaCk7XG4gICAgdmFyIGNsYXNzTmFtZSA9IGlzQWN0aXZlID8gam9pbkNsYXNzbmFtZXMoY2xhc3NOYW1lUHJvcCwgYWN0aXZlQ2xhc3NOYW1lKSA6IGNsYXNzTmFtZVByb3A7XG4gICAgdmFyIHN0eWxlID0gaXNBY3RpdmUgPyBfZXh0ZW5kcyh7fSwgc3R5bGVQcm9wLCBhY3RpdmVTdHlsZSkgOiBzdHlsZVByb3A7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgX2V4dGVuZHMoe1xuICAgICAgXCJhcmlhLWN1cnJlbnRcIjogaXNBY3RpdmUgJiYgYXJpYUN1cnJlbnQgfHwgbnVsbCxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgdG86IHRvXG4gICAgfSwgcmVzdCkpO1xuICB9KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICB2YXIgYXJpYUN1cnJlbnRUeXBlID0gUHJvcFR5cGVzLm9uZU9mKFtcInBhZ2VcIiwgXCJzdGVwXCIsIFwibG9jYXRpb25cIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcInRydWVcIl0pO1xuICBOYXZMaW5rLnByb3BUeXBlcyA9IF9leHRlbmRzKHt9LCBMaW5rLnByb3BUeXBlcywge1xuICAgIFwiYXJpYS1jdXJyZW50XCI6IGFyaWFDdXJyZW50VHlwZSxcbiAgICBhY3RpdmVDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0FjdGl2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc3RyaWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICB9KTtcbn1cblxuZXhwb3J0IHsgQnJvd3NlclJvdXRlciwgSGFzaFJvdXRlciwgTGluaywgTmF2TGluayB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlbWFpbFJlZ2V4ID0gL1thLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pPy9cbmNvbnN0IHBhc3N3b3JkUmVnZXggPSAvKCg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKltcXFddKS57OCw2NH0pL2dcbmNvbnN0IG1lc3NhZ2VSZWdleCA9L2RmL2dcbmNvbnN0IGVtYWlsUmVxdWlyZW1lbnRzID0gXCJ3cm9uZyBlbWFpbCBmb3JtYXRcIlxuY29uc3QgcGFzc3BvcnRSZXF1aXJlbWVudHMgPSBcIkVuc3VyZSB0aGF0IHBhc3N3b3JkIGlzIDggdG8gNjQgY2hhcmFjdGVycyBsb25nIGFuZCBjb250YWlucyBhIG1peCBvZiB1cHBlciBhbmQgbG93ZXIgY2FzZSBjaGFyYWN0ZXJzLCBvbmUgbnVtZXJpYyBhbmQgb25lIHNwZWNpYWwgY2hhcmFjdGVyXCJcblxuY29uc3QgaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICBlbWFpbDogeyBpc1ZhbGlkOiB0cnVlLCBtZXNzYWdlOiBcIlwiIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgaXNWYWxpZDogdHJ1ZSwgbWVzc2FnZTogXCJcIlxuICAgIH1cbn1cblxuY29uc3QgaXNWYWxpZCA9ICh7IGVtYWlsID0gdW5kZWZpbmVkLCBwYXNzd29yZCA9IHVuZGVmaW5lZCwgbWVzc2FnZT0gdW5kZWZpbmVkIH0pID0+IHtcbiAgICBsZXQgZW1haWxWYWxpZGF0aW9uID0gdHJ1ZVxuICAgIGxldCBwYXNzd29yZFZhbGlkYXRpb24gPSB0cnVlXG4gICAgaWYgKGVtYWlsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZW1haWxWYWxpZGF0aW9uID0gZW1haWxSZWdleC50ZXN0KGVtYWlsKSA/IHsgaXNWYWxpZDogdHJ1ZSB9IDogeyBpc1ZhbGlkOiBmYWxzZSwgbWVzc2FnZTogZW1haWxSZXF1aXJlbWVudHMgfVxuICAgIH1cbiAgICBpZiAocGFzc3dvcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXNzd29yZFZhbGlkYXRpb24gPSBwYXNzd29yZFJlZ2V4LnRlc3QocGFzc3dvcmQpID8geyBpc1ZhbGlkOiB0cnVlIH0gOiB7IGlzVmFsaWQ6IGZhbHNlLCBtZXNzYWdlOiBwYXNzcG9ydFJlcXVpcmVtZW50cyB9XG4gICAgfVxuICAgIGlmKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIG1lc3NhZ2VWYWxpZGF0aW9uID0gXCJcIlxuICAgIH1cbiAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0ID0geyBlbWFpbDogZW1haWxWYWxpZGF0aW9uLCBwYXNzd29yZDogcGFzc3dvcmRWYWxpZGF0aW9uIH1cbiAgICByZXR1cm4gKHNlbGYpID0+IHtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4udmFsaWRhdGlvblJlc3VsdCB9IH0pXG4gICAgICAgIGlmICh2YWxpZGF0aW9uUmVzdWx0LmVtYWlsLmlzVmFsaWQgJiYgdmFsaWRhdGlvblJlc3VsdC5wYXNzd29yZC5pc1ZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuLy9leHBvcnQgZGVmYXVsdCBpc1ZhbGlkXG5leHBvcnQge1xuICAgIGluaXRpYWxWYWxpZGF0aW9uU3RhdGUsXG4gICAgaXNWYWxpZFxufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiZcbiAgICB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIGVxdWFsIHRvIG1lcmdlIHdpdGggdGhlIGRpZmZlcmVuY2UgYmVpbmcgdGhhdCBubyByZWZlcmVuY2VcbiAqIHRvIG9yaWdpbmFsIG9iamVjdHMgaXMga2VwdC5cbiAqXG4gKiBAc2VlIG1lcmdlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBkZWVwTWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZGVlcE1lcmdlOiBkZWVwTWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICAvLyBPbmx5IE5vZGUuSlMgaGFzIGEgcHJvY2VzcyB2YXJpYWJsZSB0aGF0IGlzIG9mIFtbQ2xhc3NdXSBwcm9jZXNzXG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB1dGlscy5mb3JFYWNoKFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLFxuICAgICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JywgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLFxuICAgICdzb2NrZXRQYXRoJ1xuICBdLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7aXNWYWxpZCxpbml0aWFsVmFsaWRhdGlvblN0YXRlfSBmcm9tICdAYXV0aGpzL3ZhbGlkYXRpb24nXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5leHBvcnQgY29uc3QgRW1haWxQYXNzd29yZENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KClcblxuXG5cbmNsYXNzIEVtYWlsUGFzc3dvcmRQcm92aWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGUgPSB7IGxvYWRpbmc6IGZhbHNlLCB0b2tlbjogXCJcIiwgaXNMb2dnZWRJbjogZmFsc2UsIGVtYWlsOiBcIlwiLCBwYXNzd29yZDogXCJcIiwgY29uZmlybTogXCJcIiwgc2VydmVyRXJyb3I6IFwiXCIsIHZhbGlkYXRpb246IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9nZ2VkSW4oKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IHRydWUgfSlcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBzZXRUb2tlbiA9ICh7IHRva2VuIH0pID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRva2VuIH0pXG4gICAgfVxuICAgIG9uQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IHZhbHVlIH0pXG4gICAgICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKClcbiAgICB9XG4gICAgcmVzZXRWYWxpZGF0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSB9KVxuICAgIH1cbiAgICByZWNvdmVyUGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwgfSA9IHRoaXMuc3RhdGVcbiAgICAgIC8vICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0ID0gdmFsaWRhdGUoeyBlbWFpbCB9KVxuICAgICAgLy8gIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLnZhbGlkYXRpb25SZXN1bHQgfSB9KVxuICAgICAgICBpZiAoaXNWYWxpZCh7ZW1haWx9KSh0aGlzKSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL3JlY292ZXInLCB7IGVtYWlsIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6ZmFsc2V9KVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkYXRpb24uZW1haWwuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi5kYXRhLnZhbGlkYXRpb24gfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcGFzc3dvcmQsIHRva2VuIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGlmIChpc1ZhbGlkKHtwYXNzd29yZH0pKHRoaXMpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvY2hhbmdlJywgeyBwYXNzd29yZCwgdG9rZW4gfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2U6IGRhdGEsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvcixsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2lnbnVwID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoaXNWYWxpZCh7ZW1haWwscGFzc3dvcmR9KSh0aGlzKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpcyB2YWxpZCAtLS0tLS1cIiwgZW1haWwscGFzc3dvcmQpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvc2lnbnVwJywgeyBlbWFpbCwgcGFzc3dvcmQgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgLy9TZXJ2ZXIgc2lkZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi5kYXRhLnZhbGlkYXRpb24gfSxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogdHJ1ZSxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUb2tlbihkYXRhLnRva2VuKTsgLy8gU2V0dGluZyB0aGUgdG9rZW4gaW4gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvcixsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpcyBub3QgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbn1cblxuICAgIGxvZ2luID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoaXNWYWxpZCh7ZW1haWwscGFzc3dvcmR9KSh0aGlzKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpcyB2YWxpZCAtLS0tLS1cIiwgZW1haWwscGFzc3dvcmQpXG4gICAgICAgIC8vIEdldCBhIHRva2VuIGZyb20gYXBpIHNlcnZlciB1c2luZyB0aGUgZmV0Y2ggYXBpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pXG5cbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCgnL2xvZy1pbicsIHtcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImF4aW9zIHJlc3BvbnNlXCIsIHJlc3BvbnNlKVxuICAgICAgICAgICAgLy9TZXJ2ZXIgc2lkZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICBpZiAoZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0sbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IHRydWUsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgdGhpcy5zZXRUb2tlbihkYXRhLnRva2VuKTsgLy8gU2V0dGluZyB0aGUgdG9rZW4gaW4gbG9jYWxTdG9yYWdlXG5cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpcyBub3QgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgIH1cbiAgICB9XG4gICAgbG9nZ2VkSW4gPSAoKSA9PiB7XG4gICAgICAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpOyAvLyBHZXR0aW5nIHRva2VuIGZyb20gbG9jYWxzdG9yYWdlXG4gICAgICAgIHJldHVybiAhIXRva2VuICYmICF0aGlzLmlzVG9rZW5FeHBpcmVkKHRva2VuKTsgLy8gaGFuZHdhaXZpbmcgaGVyZVxuICAgIH07XG5cbiAgICBpc1Rva2VuRXhwaXJlZCA9IHRva2VuID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGUodG9rZW4pO1xuICAgICAgICAgICAgaWYgKGRlY29kZWQuZXhwIDwgRGF0ZS5ub3coKSAvIDEwMDApIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVja2luZyBpZiB0b2tlbiBpcyBleHBpcmVkLlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0VG9rZW4gPSBpZFRva2VuID0+IHtcbiAgICAgICAgLy8gU2F2ZXMgdXNlciB0b2tlbiB0byBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZF90b2tlblwiLCBpZFRva2VuKTtcbiAgICB9O1xuXG4gICAgZ2V0VG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIC8vIFJldHJpZXZlcyB0aGUgdXNlciB0b2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKTtcbiAgICB9O1xuXG4gICAgbG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogZmFsc2UsIHVzZXJuYW1lOiBcIlwiLCBlcnJvcjogXCJcIiwgbWVzc2FnZTogXCJcIiB9KVxuICAgICAgICAvLyBDbGVhciB1c2VyIHRva2VuIGFuZCBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJpZF90b2tlblwiKTtcbiAgICB9O1xuXG4gICAgZ2V0Q29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgLy8gVXNpbmcgand0LWRlY29kZSBucG0gcGFja2FnZSB0byBkZWNvZGUgdGhlIHRva2VuXG4gICAgICAgIGxldCBhbnN3ZXIgPSBkZWNvZGUodGhpcy5nZXRUb2tlbigpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWNpZXZlZCBhbnN3ZXIhXCIpO1xuICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgIH07XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGxvYWRpbmcsIGlzTG9nZ2VkSW4sIGVtYWlsLCBwYXNzd29yZCwgdmFsaWRhdGlvbiwgY29uZmlybSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e1xuICAgICAgICAgICAgbG9naW46IHRoaXMubG9naW4sXG4gICAgICAgICAgICBpc0xvZ2dlZEluLFxuICAgICAgICAgICAgbG9nb3V0OiB0aGlzLmxvZ291dCxcbiAgICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgICBzaWdudXA6IHRoaXMuc2lnbnVwLFxuICAgICAgICAgICAgcmVzZXRQYXNzd29yZDogdGhpcy5yZXNldFBhc3N3b3JkLFxuICAgICAgICAgICAgcmVjb3ZlclBhc3N3b3JkOiB0aGlzLnJlY292ZXJQYXNzd29yZCxcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBjb25maXJtLFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsXG4gICAgICAgICAgICB2YWxpZGF0aW9uLFxuICAgICAgICAgICAgc2V0VG9rZW46IHRoaXMuc2V0VG9rZW5cbiAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Qcm92aWRlcj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW1haWxQYXNzd29yZFByb3ZpZGVyIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNyBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSAmJiBhcmcubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0aWYgKGlubmVyKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGlubmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Y2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmNvbnN0IEN1c3RvbUlucHV0ID0gKHsgdHlwZSwgcGxhY2Vob2xkZXIsIG5hbWUsIHZhbGlkYXRpb24sIG9uQ2hhbmdlLCB2YWx1ZSwgbGFiZWwgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yaHRtbD1cInBhc3N3b3JkXCI+e2xhYmVsfTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZm9ybS1jb250cm9sJywgeyAnaXMtaW52YWxpZCc6ICF2YWxpZGF0aW9uLmlzVmFsaWQgfSl9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsdWU9e3ZhbHVlfSBuYW1lPXtuYW1lfSB0eXBlPXt0eXBlfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW52YWxpZC1mZWVkYmFja1wiPlxuICAgICAgICAgICAge3ZhbGlkYXRpb24ubWVzc2FnZX08L2Rpdj5cbiAgICA8L2Rpdj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbUlucHV0IiwiXG5cblxuXG5cblxuXG5cbmNvbnN0IEFzeW5jQnV0dG9uID0gKHsgdGl0bGUsIGxvYWRpbmcsIG9uQ2xpY2ssIGRpc2FibGVkIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246XCJyZWxhdGl2ZVwifX0+XG4gICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiwgbWFyZ2luVG9wOjMsIG1hcmdpbkJvdHRvbTozIH19IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeVwiIG9uQ2xpY2s9e29uQ2xpY2t9IGRpc2FibGVkPXtkaXNhYmxlZCB8fCBsb2FkaW5nfT57bG9hZGluZyA/PGRpdj48UHJvZ3Jlc3NMb2FkZXIvPjxkaXYgc3R5bGU9e3tvcGFjaXR5OjB9fT57dGl0bGV9PC9kaXY+PC9kaXY+OjxkaXY+e3RpdGxlfTwvZGl2Pn08L2J1dHRvbj5cblxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzeW5jQnV0dG9uXG5cbmNvbnN0IFByb2dyZXNzQ2lyY2xlID0gKHsgc2VsZWN0ZWQgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgcGFkZGluZzogMyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogNTAsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiA0LFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxlY3RlZCA/IFwiIzFhMjM3ZVwiIDogXCIjOWZhOGRhXCJcbiAgICAgICAgfX0+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5cblxuXG5jbGFzcyBQcm9ncmVzc0xvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc2VsZWN0ZWQ6IDBcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IDAgfSlcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IDEgfSlcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAyIH0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IDAgfSlcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDIwMClcblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQgfSA9IHRoaXMuc3RhdGVcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOlwiMTAwJVwiLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgdG9wOjIwLFxuICAgICAgICAgICAgICAgIGxlZnQ6MFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPFByb2dyZXNzQ2lyY2xlIHNlbGVjdGVkPXtzZWxlY3RlZCA9PT0gMH0gLz5cbiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3NDaXJjbGUgc2VsZWN0ZWQ9e3NlbGVjdGVkID09PSAxfSAvPlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0NpcmNsZSBzZWxlY3RlZD17c2VsZWN0ZWQgPT09IDJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQge0Jvb3RzdHJhcElucHV0fSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1pbnB1dCdcblxuaW1wb3J0IEJvb3RzdHJhcEFzeW5jQnV0dG9uIGZyb20gJ0B4YWYvYm9vdHN0cmFwLWFzeW5jLWJ1dHRvbidcbmNvbnN0IExvZ2luID0oKT0+e1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgICB7KHtlbWFpbCxwYXNzd29yZCxsb2dpbixvbkNoYW5nZSx2YWxpZGF0aW9uLGlzTG9nZ2VkSW4sbG9hZGluZ30pPT57XG4gICAgICAgICAgICBpZighaXNMb2dnZWRJbilcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPkxvZ2luOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLmVtYWlsIH19IGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiUGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwQXN5bmNCdXR0b24gdGl0bGU9XCJMb2dpblwiIG9uQ2xpY2s9e2xvZ2lufSBsb2FkaW5nPXtsb2FkaW5nfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89XCIvcmVjb3ZlclwiPkZvcmdvdCBQYXNzd29yZCAhPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiA8UmVkaXJlY3QgdG89XCIvXCIgLz5cbiAgICAgICAgfX1cbiAgICA8L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPilcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBMb2dpbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmltcG9ydCB7Qm9vdHN0cmFwSW5wdXR9IGZyb20gJ0B4YWYvYm9vdHN0cmFwLWlucHV0J1xuaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCBCb290c3RyYXBBc3luY0J1dHRvbiBmcm9tICdAeGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24nXG5jb25zdCBTaWduVXAgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBvbkNoYW5nZSwgZW1haWwsIHBhc3N3b3JkLCBzaWdudXAsbG9hZGluZywgdmFsaWRhdGlvbiwgaXNMb2dnZWRJbiB9KSA9PiB7XG4gICAgICAgICAgaWYoIWlzTG9nZ2VkSW4pXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlNpZ24gVXA6PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLmVtYWlsIH19IGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIlBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIlNpZ25VcFwiIG9uQ2xpY2s9e3NpZ251cH0gbG9hZGluZz17bG9hZGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz1cIi9cIiAvPlxuICAgICAgICB9fTwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWduVXAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5pbXBvcnQge0Jvb3RzdHJhcElucHV0fSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1pbnB1dCdcbmltcG9ydCBCb290c3RyYXBBc3luY0J1dHRvbiBmcm9tICdAeGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24nXG5jb25zdCBSZWNvdmVyUGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBlbWFpbCwgb25DaGFuZ2UsIHZhbGlkYXRpb24sIHJlY292ZXIsbG9hZGluZyB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlJlY292ZXIgUGFzc3dvcmQ6PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLmVtYWlsIH19IGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PEJvb3RzdHJhcEFzeW5jQnV0dG9uIHRpdGxlPVwiUmVjb3ZlciBQYXNzd29yZFwiIG9uQ2xpY2s9e3JlY292ZXJ9IGxvYWRpbmc9e2xvYWRpbmd9Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9fTwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvdmVyUGFzc3dvcmQiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5pbXBvcnQge0Jvb3RzdHJhcElucHV0fSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1pbnB1dCdcbmltcG9ydCBCb290c3RyYXBBc3luY0J1dHRvbiBmcm9tICdAeGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24nXG5cbmNvbnN0IFJlc2V0UGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+eyh7IHBhc3N3b3JkLCBjb25maXJtLCByZXNldFBhc3N3b3JkLCB2YWxpZGF0aW9uLGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5SZXNldCBQYXNzd29yZDo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJOZXcgUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiTmV3IFBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJDb25maXJtIFBhc3N3b3JkXCIgbmFtZT1cImNvbmZpcm1cIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT17Y29uZmlybX0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJDb25maXJtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcEFzeW5jQnV0dG9uIHRpdGxlPVwiUmVzZXQgUGFzc3dvcmRcIiBvbkNsaWNrPXtyZXNldFBhc3N3b3JkfSBsb2FkaW5nPXtsb2FkaW5nfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfX08L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPilcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzZXRQYXNzd29yZCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuY29uc3QgbW9uZ29Db2xsZWN0aW9uID0gKHtjb2xsZWN0aW9uLGRifSkgPT4ge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmluZE9uZTogKHtmaWx0ZXJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiZmluZE9uZVwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIgfSB9KVxuICAgICAgICB9LFxuICAgICAgICBmaW5kOiAoe2ZpbHRlcn0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5nZXQoYC9tb25nb2RiYCwgeyBwYXJhbXM6IHsgcmVxVHlwZTogXCJmaW5kXCIsIGNvbGxlY3Rpb24sZGIsIGZpbHRlciB9IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGluc2VydE9uZTogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5wb3N0KGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiaW5zZXJ0T25lXCIsIGNvbGxlY3Rpb24sZGIsIGRhdGEgfSB9KVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVPbmU6ICh7ZmlsdGVyLGRhdGF9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MucHV0KGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwidXBkYXRlT25lXCIsIGNvbGxlY3Rpb24sZGIsIGZpbHRlcixkYXRhIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlT25lOiAoe2ZpbHRlcn0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5kZWxldGUoYC9tb25nb2RiYCwgeyBwYXJhbXM6IHsgcmVxVHlwZTogXCJkZWxldGVPbmVcIiwgY29sbGVjdGlvbixkYiwgZmlsdGVyIH0gfSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBtb25nb0NvbGxlY3Rpb25cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1vbmdvUmVhY3QgZnJvbSAnLi9tb25nb2RiLWNsaWVudCdcbmV4cG9ydCBjb25zdCBNb25nb2RiQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKVxuXG5cbmNsYXNzIE1vbmdvZGJQcm92aWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgXG4gICAgIHN0YXRlPXtvYmplY3RzOltdLGxvYWRpbmc6ZmFsc2V9XG4gIFxuICAgIGZpbmRPbmU9KHtmaWx0ZXJ9KT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkuZmluZE9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmaW5kPSgpPT57XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBtb25nb1JlYWN0KHsgY29sbGVjdGlvbiwgZGJ9KS5maW5kKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlbGV0ZU9uZT0oKT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkuZGVsZXRlT25lKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZU9uZT0oKT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkudXBkYXRlT25lKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluc2VydE9uZT0oKT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkuaW5zZXJ0T25lKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldEluaXRpYWxTdGF0ZSA9KCk9PntcblxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7Y2hpbGRyZW59PSB0aGlzLnByb3BzXG4gICAgICAgIHJldHVybig8TW9uZ29Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7XG4gICAgICAgICAgICAgIHNldEluaXRpYWxTdGF0ZTp0aGlzLnNldEluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgICAgZmluZDp0aGlzLmZpbmQsXG4gICAgICAgICAgICAgIGZpbmRPbmU6dGhpcy5maW5kT25lLFxuICAgICAgICAgICAgICB1cGRhdGVPbmU6dGhpcy51cGRhdGVPbmUsXG4gICAgICAgICAgICAgIGluc2VydE9uZTp0aGlzLmluc2VydE9uZSxcbiAgICAgICAgICAgICAgZGVsZXRlT25lOnRoaXMuZGVsZXRlT25lXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvTW9uZ29Db250ZXh0LlByb3ZpZGVyPilcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNb25nb2RiUHJvdmlkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBpbml0aWFsVmFsaWRhdGlvblN0YXRlIH0gZnJvbSAnQGF1dGhqcy92YWxpZGF0aW9uJ1xuaW1wb3J0IG1vbmdvRGJDbGllbnQgZnJvbSAnQG1vbmdvZGJqcy9yZWFjdCdcbmNsYXNzIEVkaXRvclJlYWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHN0YXRlID0geyBvYmplY3RzOiBbXSwgc2VydmVyRXJyb3I6IFwiXCIsIGxvYWRpbmc6IGZhbHNlLCBzZWxlY3RlZE9iamVjdDogbnVsbCwgdmFsaWRhdGlvbjogaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBjb25zdCB7aW5pdGlhbFN0YXRlfT0gdGhpcy5wcm9wc1xuICAgICAgICB0aGlzLl9zZXRJbml0aWFsU3RhdGUoe2luaXRpYWxTdGF0ZX0pXG4gICAgfVxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgY29uc29sZS5sb2coXCJFZGl0b3IgUmVhY3QgbW91bnRlZFwiKVxuICAgICAgdGhpcy5maW5kKClcbiAgfVxuICAgIF9zZXRJbml0aWFsU3RhdGU9KCk9PntcbiAgICAgICBjb25zdCB7aW5pdGlhbFN0YXRlfT0gdGhpcy5wcm9wc1xuICAgICAgIGlmKGluaXRpYWxTdGF0ZSAhPT11bmRlZmluZWQpe1xuICAgICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpPT4oey4uLnByZXZTdGF0ZSwuLi5pbml0aWFsU3RhdGV9KSlcbiAgICAgICB9XG4gICAgfVxuICAgIG9uQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRPYmplY3Q6IHsgW25hbWVdOiB2YWx1ZSB9IH0pXG4gICAgfVxuXG4gICAgZmluZCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7fVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGIgfSkuZmluZCh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgb2JqZWN0czogZGF0YS5yZXN1bHQsIGxvYWRpbmc6IGZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsIGxvYWRpbmc6IGZhbHNlIH0pXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZpbmRPbmUgPSAoeyBpZCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IF9pZDogaWQgfVxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmVcIiwgaWQpXG4gICAgICAgIG1vbmdvRGJDbGllbnQoeyBjb2xsZWN0aW9uLCBkYiB9KS5maW5kT25lKHsgZmlsdGVyIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzZWxlY3RPbmUgPSAoeyBfaWQgfSkgPT4geyBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkT2JqZWN0OiB0aGlzLnN0YXRlLm9iamVjdHMuZmluZCgodSkgPT4gdS5faWQgPT09IF9pZCkgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVPbmUgPSAoeyBpZCwgZGF0YSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IF9pZDogaWQgfVxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmVcIiwgaWQpXG4gICAgICAgIG1vbmdvRGJDbGllbnQoeyBjb2xsZWN0aW9uLCBkYn0pLmZpbmRPbmUoeyBmaWx0ZXIgfSwgeyBkYXRhIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluZE9uZSByZXN1bHRcIiwgcmVzdWx0KVxuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiBkYXRhLnJlc3VsdCxsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3NlcnZlckVycm9yOmVycm9yLGxvYWRpbmc6ZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlbGV0ZU9uZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgX2lkIH0gPSB0aGlzLnN0YXRlLnNlbGVjdGVkT2JqZWN0XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgX2lkIH1cbiAgICAgICAgbW9uZ29EYkNsaWVudCh7IGNvbGxlY3Rpb24sIGRiIH0pLmRlbGV0ZU9uZSh7IGZpbHRlciB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7IG9iamVjdHM6IHN0YXRlLm9iamVjdHMuZmlsdGVyKCh1KSA9PiB1Ll9pZCAhPT0gX2lkKSB9KSlcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlT25lIHJlc3VsdFwiLCByZXN1bHQpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlT25lIGVycm9yXCIsIGVycm9yKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyAgdmFsaWRhdGlvbn0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhdGUtLS1cIix0aGlzLnN0YXRlKVxuICAgICAgICByZXR1cm4gKDxkaXY+e2NoaWxkcmVuKHtvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ey4uLnRoaXMuc3RhdGV9LFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPbmU6dGhpcy5zZWxlY3RPbmUsXG4gICAgICAgICAgICAgICAgICAgIGZpbmQ6IHRoaXMuZmluZCxcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlT25lOiBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVPbmUsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9uZTogdGhpcy51cGRhdGVPbmV9KX08L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JSZWFjdFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5cbmNvbnN0IENvbmZpcm1hdGlvbkRpYWxvZyA9KHtkZWNsaW5lLGNvbmZpcm0sIGNoaWxkcmVuLG1vZGFsSWR9KT0+e1xuICAgICAgICByZXR1cm4oPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXttb2RhbElkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+Q29uZmlybWF0aW9uIGlzIG5lZWRlZDwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtkZWNsaW5lfSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NvbmZpcm19IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPk9rPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1hdGlvbkRpYWxvZyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmNvbnN0IEVkaXRvckRpYWxvZyA9KHtjaGlsZHJlbiwgc2F2ZSxjYW5jZWwsbW9kYWxJZH0pPT57XG4gICAgcmV0dXJuKDxkaXY+XG48ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD17bW9kYWxJZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgPGg1IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPk1vZGFsIHRpdGxlPC9oNT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXtjYW5jZWx9PkNsb3NlPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3NhdmV9PlNhdmUgY2hhbmdlczwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4gICAgPC9kaXY+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JEaWFsb2ciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5jb25zdCBUYWJsZVJlbmRlciA9ICh7IGNvbGxlY3Rpb249W10sc2VsZWN0T25lLCBoZWFkZXJzPVtdLCBUYWJsZSwgVGFibGVCb2R5LCBUYWJsZVJvdywgVGFibGVDb2x1bW4sIFRhYmxlRm9vdGVyLCBUYWJsZUhlYWRlciB9KSA9PiB7XG4gICBjb25zb2xlLmxvZyhcImNvbGxlY3Rpb24tLS1cIixjb2xsZWN0aW9uKVxuICAgcmV0dXJuICAoPFRhYmxlPlxuICAgICAgICAgICAge1RhYmxlSGVhZGVyICYmIDxUYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICB7aGVhZGVycy5sZW5ndGg9PT0wICYmY29sbGVjdGlvbi5sZW5ndGg+MCAmJiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uWzBdKS5tYXAoKGgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxUYWJsZUNvbHVtbiBrZXk9e2l9PntofTwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge2hlYWRlcnMubGVuZ3RoPjAgJiYgaGVhZGVycy5tYXAoKGgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxUYWJsZUNvbHVtbiBrZXk9e2l9PntofTwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1RhYmxlSGVhZGVyPn1cbiAgICAgICAgICAgIDxUYWJsZUJvZHk+XG4gICAgICAgICAgICAgICAge2NvbGxlY3Rpb24gIT09dW5kZWZpbmVkICYmIGNvbGxlY3Rpb24ubWFwKChjLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVSb3cgc2VsZWN0T25lPXtzZWxlY3RPbmV9IF9pZD17Yy5faWR9IGtleT17YX0+e09iamVjdC5rZXlzKGMpLm1hcCgociwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8VGFibGVDb2x1bW4ga2V5PXtpfT57Y1tyXX08L1RhYmxlQ29sdW1uPilcbiAgICAgICAgICAgICAgICAgICAgfSl9PC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgICAge1RhYmxlRm9vdGVyICYmIDxUYWJsZUZvb3Rlcj5cbiAgICAgICAgICAgIDwvVGFibGVGb290ZXI+fVxuICAgICAgICA8L1RhYmxlPilcbiAgIFxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVJlbmRlclxuXG4iLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmNvbnN0IFRhYmxlID0gKHtjaGlsZHJlbn0pID0+IHtcbiAgICByZXR1cm4gKDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvdGFibGU+KVxuICB9XG5cbi8vXG4gIGV4cG9ydCBkZWZhdWx0IFRhYmxlIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUYWJsZUJvZHkgPSh7Y2hpbGRyZW59KT0+e1xuICAgIHJldHVybiAoPHRib2R5PlxuICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgIDwvdGJvZHk+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUJvZHkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlQ29sdW1uID0oe2NoaWxkcmVufSk9PntcbiAgICByZXR1cm4gKDx0ZD57Y2hpbGRyZW59PC90ZD4pXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgVGFibGVIZWFkID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuXG4gICAgcmV0dXJuICg8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVIZWFkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUYWJsZVJvdyA9KHtjaGlsZHJlbixzZWxlY3RPbmUsX2lkfSk9PntcbiAgIGNvbnNvbGUubG9nKFwiX2lkLS0tLS1cIixfaWQpXG4gICAgcmV0dXJuICg8dHI+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNmb3JtXCIgb25DbGljaz17KCkgPT4geyBzZWxlY3RPbmUoe19pZH0pIH19IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5FZGl0PC9idXR0b24+PC90ZD5cbiAgICAgICAgICA8dGQ+PGJ1dHRvbiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY29uZmlybVwiIG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0T25lKHtfaWR9KSB9fSBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+XG4gICAgPC90cj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlUm93IiwiaW1wb3J0IFRhYmxlUmVuZGVyIGZyb20gJ0B4YWYvdGFibGUtcmVuZGVyJ1xuaW1wb3J0IFRhYmxlIGZyb20gJy4vVGFibGUnXG5pbXBvcnQgVGFibGVCb2R5IGZyb20gJy4vVGFibGVCb2R5J1xuaW1wb3J0IFRhYmxlQ29sdW1uIGZyb20gJy4vVGFibGVDb2x1bW4nXG5pbXBvcnQgVGFibGVIZWFkZXIgZnJvbSAnLi9UYWJsZUhlYWRlcidcbmltcG9ydCBUYWJsZVJvdyBmcm9tICcuL1RhYmxlUm93J1xuXG5jb25zdCBCb290c3RyYXBUYWJsZSA9KHtjb2xsZWN0aW9uLGhlYWRlcnMsc2VsZWN0T25lfSk9PntcbiAgICByZXR1cm4oXG4gICAgPFRhYmxlUmVuZGVyXG4gICAgICBzZWxlY3RPbmU9e3NlbGVjdE9uZX1cbiAgICAgIGhlYWRlcnMgPXtoZWFkZXJzfVxuICAgICAgY29sbGVjdGlvbj17Y29sbGVjdGlvbn1cbiAgICAgIFRhYmxlQm9keT17VGFibGVCb2R5fVxuICAgICAgVGFibGVIZWFkZXI9e1RhYmxlSGVhZGVyfVxuICAgICAgVGFibGVDb2x1bW49e1RhYmxlQ29sdW1ufVxuICAgICAgVGFibGVSb3c9e1RhYmxlUm93fVxuICAgICAgVGFibGU9e1RhYmxlfVxuICAgICAgLz4pXG59XG5leHBvcnQgeyBCb290c3RyYXBUYWJsZX0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgRWRpdG9yUmVhY3QgZnJvbSAnQHhhZi9lZGl0b3ItcmVhY3QnXG5pbXBvcnQge0Jvb3RzdHJhcEZvcm0sQm9vdHN0cmFwQ29uZmlybWF0aW9ufSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1kaWFsb2cnXG5pbXBvcnQge0Jvb3RzdHJhcFRhYmxlfSAgZnJvbSAnQHhhZi9ib290c3RyYXAtdGFibGUnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgdXNlcnM6IFtdLFxuICBlbWFpbDogXCJcIiwgcGFzc3dvcmQ6IFwiXCIsIF9pZDogXCJcIlxufVxuY29uc3QgaGVhZGVycyA9W1wiX2lkXCIsXCJQYXNzd29yZFwiLFwiRW1haWxcIixcIkVkaXRcIixcIkRlbGV0ZVwiXVxuY29uc3QgVXNlcnMgPSAoe2NvbGxlY3Rpb24sZGJ9KSA9PiB7XG4gICAgICBcbiAgcmV0dXJuICg8RWRpdG9yUmVhY3QgY29sbGVjdGlvbj17Y29sbGVjdGlvbn0gZGI9e2RifSBpbml0aWFsU3RhdGU9e2luaXRpYWxTdGF0ZX0+eyh7c3RhdGUsIGRlbGV0ZU9uZSwgc2VsZWN0T25lIH0pID0+IHtcbiAgICBjb25zdCB1c2VycyA9c3RhdGUub2JqZWN0cy5tYXAoKHUpPT57cmV0dXJuIHsuLi51LCBwYXNzd29yZDpcIioqKioqKioqXCIgfX0pXG4gIHJldHVybiAoPGRpdj48Qm9vdHN0cmFwVGFibGUgIGhlYWRlcnM9e2hlYWRlcnN9IGNvbGxlY3Rpb249e3VzZXJzfSBzZWxlY3RPbmU9e3NlbGVjdE9uZX0gLz5cbiAgPEJvb3RzdHJhcEZvcm0gbW9kYWxJZD1cImZvcm1cIj54eHg8L0Jvb3RzdHJhcEZvcm0+XG4gIDxCb290c3RyYXBDb25maXJtYXRpb24gY29uZmlybT17ZGVsZXRlT25lfSBkZWNsaW5lPXsoKT0+e319IG1vZGFsSWQ9XCJjb25maXJtXCI+Q29uZmlybSBkZWxldGlvbiBvZjoge3N0YXRlLnNlbGVjdGVkT2JqZWN0ICYmIHN0YXRlLnNlbGVjdGVkT2JqZWN0LmVtYWlsIH08L0Jvb3RzdHJhcENvbmZpcm1hdGlvbj5cbiAgPC9kaXY+KVxuICB9fTwvRWRpdG9yUmVhY3Q+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBVc2Vyc1xuLypcbiAgICA8RWRpdFVzZXIgey4uLnN0YXRlfSB2YWxpZGF0aW9uPXt2YWxpZGF0aW9ufSBvbkNoYW5nZT17b25DaGFuZ2V9ICAvPlxuICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZyBkZWxldGVPbmU9e2RlbGV0ZU9uZX0gLz5cbiovXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgPGRpdj5Ib21lPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWUgIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5jb25zdCBOYXZCYXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+eyh7IGlzTG9nZ2VkSW4sIGxvZ291dCB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1saWdodCBiZy1saWdodFwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+TmF2YmFyPC9hPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXJcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI25hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWNvbnRyb2xzPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgbmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IG1yLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbSBhY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL1wiPkhvbWUgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj48L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzTG9nZ2VkSW4gJiYgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi91c2Vyc1wiPlVzZXJzPC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshaXNMb2dnZWRJbiAmJiA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL2xvZ2luXCI+TG9naW48L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPn1cblxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9nZ2VkSW4gJiYgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvXCIgb25DbGljaz17bG9nb3V0fT5Mb2dvdXQ8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgeyFpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvc2lnbnVwXCI+U2lnblVwPC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT59XG5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIClcbiAgICB9fVxuXG4gICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLEhhc2hSb3V0ZXIsIFJvdXRlLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCBMb2dpbix7U2lnblVwLFJlY292ZXJQYXNzd29yZCxSZWNvdmVyUmVzdWx0LFJlc2V0UGFzc3dvcmQsVXNlcnN9IGZyb20gJ0BhdXRoanMvcmVhY3QtdWknXG5pbXBvcnQgSG9tZSBmcm9tICcuL0hvbWUnXG5pbXBvcnQgTmF2QmFyIGZyb20gJy4vTmF2QmFyJ1xuY29uc3QgQXBwID0gKCkgPT4ge1xuICAgIHJldHVybiA8ZGl2PlxuICAgICAgICA8SGFzaFJvdXRlcj5cbiAgICAgICAgICAgIDxuYXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWFyb3VuZFwiIH19PlxuICAgICAgICAgICAgPE5hdkJhci8+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiIGNvbXBvbmVudD17SG9tZX0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3VzZXJzXCIgcmVuZGVyPXsoKT0+PFVzZXJzIGNvbGxlY3Rpb249XCJ1c2Vyc1wiIGRiID1cImRlbW9cIi8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9sb2dpblwiIGNvbXBvbmVudD17TG9naW59IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9zaWdudXBcIiBjb21wb25lbnQ9e1NpZ25VcH0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlY292ZXJcIiBjb21wb25lbnQ9e1JlY292ZXJQYXNzd29yZH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVzZXRwYXNzLzp1c2VybmFtZS86dG9rZW5cIiBjb21wb25lbnQ9e1Jlc2V0UGFzc3dvcmR9Lz5cbiAgICAgICAgPC9IYXNoUm91dGVyPlxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJ1xuaW1wb3J0IEVtYWlsUGFzc3dvcmRQcm92aWRlciBmcm9tICdAYXV0aGpzL3JlYWN0J1xuUmVhY3RET00ucmVuZGVyKFxuICA8ZGl2PlxuICAgIDxFbWFpbFBhc3N3b3JkUHJvdmlkZXI+XG4gICAgPEFwcC8+XG4gICAgPC9FbWFpbFBhc3N3b3JkUHJvdmlkZXI+XG5cbiAgPC9kaXY+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4pO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsIl9pbmhlcml0c0xvb3NlIiwib24iLCJvZmYiLCJDb21wb25lbnQiLCJSZWFjdCIsImlzUHJvZHVjdGlvbiIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwiUmVhY3RJcyIsImNyZWF0ZUNvbnRleHQiLCJwYXRoVG9SZWdleHAiLCJpbmRleCIsImlzVmFsaWRFbGVtZW50VHlwZSIsImFkZExlYWRpbmdTbGFzaCIsInN0cmlwQmFzZW5hbWUiLCJub29wIiwia2V5IiwiX19Sb3V0ZXJDb250ZXh0IiwiY29udGV4dCIsImVtYWlsUmVnZXgiLCJwYXNzd29yZFJlZ2V4IiwiZW1haWxSZXF1aXJlbWVudHMiLCJwYXNzcG9ydFJlcXVpcmVtZW50cyIsImluaXRpYWxWYWxpZGF0aW9uU3RhdGUiLCJlbWFpbCIsImlzVmFsaWQiLCJtZXNzYWdlIiwicGFzc3dvcmQiLCJ1bmRlZmluZWQiLCJlbWFpbFZhbGlkYXRpb24iLCJwYXNzd29yZFZhbGlkYXRpb24iLCJ0ZXN0IiwibWVzc2FnZVZhbGlkYXRpb24iLCJ2YWxpZGF0aW9uUmVzdWx0Iiwic2VsZiIsInNldFN0YXRlIiwidmFsaWRhdGlvbiIsImNvb2tpZXMiLCJkZWZhdWx0cyIsIkludGVyY2VwdG9yTWFuYWdlciIsIkNhbmNlbCIsIkF4aW9zIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJFbWFpbFBhc3N3b3JkQ29udGV4dCIsIkVtYWlsUGFzc3dvcmRQcm92aWRlciIsImxvYWRpbmciLCJ0b2tlbiIsImlzTG9nZ2VkSW4iLCJjb25maXJtIiwic2VydmVyRXJyb3IiLCJlIiwibmFtZSIsInRhcmdldCIsInZhbHVlIiwicmVzZXRWYWxpZGF0aW9uIiwic3RhdGUiLCJheGlvcyIsInBvc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2V0VG9rZW4iLCJnZXQiLCJwYXJhbXMiLCJnZXRUb2tlbiIsImlzVG9rZW5FeHBpcmVkIiwiZGVjb2RlZCIsImRlY29kZSIsImV4cCIsIkRhdGUiLCJub3ciLCJpZFRva2VuIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJ1c2VybmFtZSIsInJlbW92ZUl0ZW0iLCJhbnN3ZXIiLCJsb2dnZWRJbiIsImNoaWxkcmVuIiwicHJvcHMiLCJsb2dpbiIsImxvZ291dCIsInNpZ251cCIsInJlc2V0UGFzc3dvcmQiLCJyZWNvdmVyUGFzc3dvcmQiLCJvbkNoYW5nZSIsIkN1c3RvbUlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibGFiZWwiLCJjbGFzc05hbWVzIiwiQXN5bmNCdXR0b24iLCJ0aXRsZSIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsInBvc2l0aW9uIiwid2lkdGgiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJvcGFjaXR5IiwiUHJvZ3Jlc3NDaXJjbGUiLCJzZWxlY3RlZCIsImhlaWdodCIsInBhZGRpbmciLCJib3JkZXJSYWRpdXMiLCJtYXJnaW5MZWZ0IiwidGV4dEFsaWduIiwiYmFja2dyb3VuZENvbG9yIiwiUHJvZ3Jlc3NMb2FkZXIiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsInRvcCIsImxlZnQiLCJMb2dpbiIsIkJvb3RzdHJhcElucHV0IiwiQm9vdHN0cmFwQXN5bmNCdXR0b24iLCJTaWduVXAiLCJSZWNvdmVyUGFzc3dvcmQiLCJyZWNvdmVyIiwiUmVzZXRQYXNzd29yZCIsIm1vbmdvQ29sbGVjdGlvbiIsImNvbGxlY3Rpb24iLCJkYiIsImZpbmRPbmUiLCJmaWx0ZXIiLCJyZXFUeXBlIiwiZmluZCIsImluc2VydE9uZSIsInVwZGF0ZU9uZSIsInB1dCIsImRlbGV0ZU9uZSIsIk1vbmdvZGJDb250ZXh0IiwiTW9uZ29kYlByb3ZpZGVyIiwib2JqZWN0cyIsIm1vbmdvUmVhY3QiLCJyZXN1bHQiLCJzZXRJbml0aWFsU3RhdGUiLCJFZGl0b3JSZWFjdCIsInNlbGVjdGVkT2JqZWN0IiwiaW5pdGlhbFN0YXRlIiwicHJldlN0YXRlIiwibW9uZ29EYkNsaWVudCIsImlkIiwiX2lkIiwidSIsIl9zZXRJbml0aWFsU3RhdGUiLCJzZWxlY3RPbmUiLCJDb25maXJtYXRpb25EaWFsb2ciLCJkZWNsaW5lIiwibW9kYWxJZCIsIkVkaXRvckRpYWxvZyIsInNhdmUiLCJjYW5jZWwiLCJUYWJsZVJlbmRlciIsImhlYWRlcnMiLCJUYWJsZSIsIlRhYmxlQm9keSIsIlRhYmxlUm93IiwiVGFibGVDb2x1bW4iLCJUYWJsZUZvb3RlciIsIlRhYmxlSGVhZGVyIiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImgiLCJpIiwiYyIsImEiLCJyIiwiVGFibGVIZWFkIiwiQm9vdHN0cmFwVGFibGUiLCJ1c2VycyIsIlVzZXJzIiwiQm9vdHN0cmFwRm9ybSIsIkJvb3RzdHJhcENvbmZpcm1hdGlvbiIsIkhvbWUiLCJOYXZCYXIiLCJBcHAiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwyQkFBZSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNO1lBQ3RELFlBQVksT0FBTyxJQUFJLEtBQUssV0FBVyxHQUFHLElBQUk7WUFDOUMsWUFBWSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRTs7WUNGekQ7OztZQUdBLFNBQVMsZ0JBQWdCLEdBQUc7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUN0RDtZQUNELFNBQVMsbUJBQW1CLElBQUk7Z0JBQzVC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QUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1lBQzFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxD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
