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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lc20vaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzbS9yZWFjdC1yb3V0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIi4uLy4uL3ZhbGlkYXRpb24vbGliL3ZhbGlkYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QvbGliL0VtYWlsUGFzc3dvcmRQcm92aWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vYm9vdHN0cmFwLWlucHV0L2xpYi9Cb290c3RyYXBJbnB1dC5qcyIsIi4uLy4uL2Jvb3RzdHJhcC1hc3luYy1idXR0b24vbGliL0FzeW5jQnV0dG9uLmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9Mb2dpbi5qcyIsIi4uLy4uLy4uL2F1dGhqcy9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvU2lnbnVwLmpzIiwiLi4vLi4vLi4vYXV0aGpzL2F1dGgtcmVhY3QtdWkvbGliL2Jvb3RzdHJhcC9SZWNvdmVyUGFzc3dvcmQuanMiLCIuLi8uLi8uLi9hdXRoanMvYXV0aC1yZWFjdC11aS9saWIvYm9vdHN0cmFwL1Jlc2V0UGFzc3dvcmQuanMiLCIuLi8uLi8uLi9tb25nb2RianMvbW9uZ28tcmVhY3QvbGliL21vbmdvZGItY2xpZW50LmpzIiwiLi4vLi4vLi4vbW9uZ29kYmpzL21vbmdvLXJlYWN0L2xpYi9Nb25nb2RiUHJvdmlkZXIuanMiLCIuLi8uLi9lZGl0b3ItcmVhY3QvbGliL2VkaXRvci1yZWFjdC5qcyIsIi4uLy4uL2Jvb3RzdHJhcC1kaWFsb2cvbGliL0Jvb3RzdHJhcENvbmZpcm1hdGlvbi5qcyIsIi4uLy4uL2Jvb3RzdHJhcC1kaWFsb2cvbGliL0Jvb3RzdHJhcEZvcm0uanMiLCIuLi8uLi90YWJsZS1yZW5kZXIvbGliL2luZGV4LmpzIiwiLi4vLi4vYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZS5qcyIsIi4uLy4uL2Jvb3RzdHJhcC10YWJsZS9saWIvVGFibGVCb2R5LmpzIiwiLi4vLi4vYm9vdHN0cmFwLXRhYmxlL2xpYi9UYWJsZUNvbHVtbi5qcyIsIi4uLy4uL2Jvb3RzdHJhcC10YWJsZS9saWIvVGFibGVIZWFkZXIuanMiLCIuLi8uLi9ib290c3RyYXAtdGFibGUvbGliL1RhYmxlUm93LmpzIiwiLi4vLi4vYm9vdHN0cmFwLXRhYmxlL2xpYi9pbmRleC5qcyIsIi4uLy4uLy4uL2F1dGhqcy9hdXRoLXJlYWN0LXVpL2xpYi9ib290c3RyYXAvVXNlcnMuanMiLCIuLi9jbGllbnQvSG9tZS5qcyIsIi4uL2NsaWVudC9OYXZCYXIuanMiLCIuLi9jbGllbnQvQXBwLmpzIiwiLi4vY2xpZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDpcbiAgICAgICAgICAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6XG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG4vLyBiYXNlZCBvZmYgaHR0cHM6Ly9naXRodWIuY29tL2RlZnVuY3R6b21iaWUvbm9kZS1wcm9jZXNzL2Jsb2IvbWFzdGVyL2Jyb3dzZXIuanNcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG52YXIgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbmlmICh0eXBlb2YgZ2xvYmFsLnNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbn1cbmlmICh0eXBlb2YgZ2xvYmFsLmNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbn1cblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5leHRUaWNrKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59XG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuZXhwb3J0IHZhciB0aXRsZSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgcGxhdGZvcm0gPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIGJyb3dzZXIgPSB0cnVlO1xuZXhwb3J0IHZhciBlbnYgPSB7fTtcbmV4cG9ydCB2YXIgYXJndiA9IFtdO1xuZXhwb3J0IHZhciB2ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5leHBvcnQgdmFyIHZlcnNpb25zID0ge307XG5leHBvcnQgdmFyIHJlbGVhc2UgPSB7fTtcbmV4cG9ydCB2YXIgY29uZmlnID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5leHBvcnQgdmFyIG9uID0gbm9vcDtcbmV4cG9ydCB2YXIgYWRkTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciBvbmNlID0gbm9vcDtcbmV4cG9ydCB2YXIgb2ZmID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xuZXhwb3J0IHZhciBlbWl0ID0gbm9vcDtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRpbmcobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN3ZCAoKSB7IHJldHVybiAnLycgfVxuZXhwb3J0IGZ1bmN0aW9uIGNoZGlyIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1bWFzaygpIHsgcmV0dXJuIDA7IH1cblxuLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9icm93c2VyLXByb2Nlc3MtaHJ0aW1lL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG52YXIgcGVyZm9ybWFuY2UgPSBnbG9iYWwucGVyZm9ybWFuY2UgfHwge31cbnZhciBwZXJmb3JtYW5jZU5vdyA9XG4gIHBlcmZvcm1hbmNlLm5vdyAgICAgICAgfHxcbiAgcGVyZm9ybWFuY2UubW96Tm93ICAgICB8fFxuICBwZXJmb3JtYW5jZS5tc05vdyAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm9Ob3cgICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uud2Via2l0Tm93ICB8fFxuICBmdW5jdGlvbigpeyByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSB9XG5cbi8vIGdlbmVyYXRlIHRpbWVzdGFtcCBvciBkZWx0YVxuLy8gc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19wcm9jZXNzX2hydGltZVxuZXhwb3J0IGZ1bmN0aW9uIGhydGltZShwcmV2aW91c1RpbWVzdGFtcCl7XG4gIHZhciBjbG9ja3RpbWUgPSBwZXJmb3JtYW5jZU5vdy5jYWxsKHBlcmZvcm1hbmNlKSoxZS0zXG4gIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcihjbG9ja3RpbWUpXG4gIHZhciBuYW5vc2Vjb25kcyA9IE1hdGguZmxvb3IoKGNsb2NrdGltZSUxKSoxZTkpXG4gIGlmIChwcmV2aW91c1RpbWVzdGFtcCkge1xuICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMF1cbiAgICBuYW5vc2Vjb25kcyA9IG5hbm9zZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMV1cbiAgICBpZiAobmFub3NlY29uZHM8MCkge1xuICAgICAgc2Vjb25kcy0tXG4gICAgICBuYW5vc2Vjb25kcyArPSAxZTlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtzZWNvbmRzLG5hbm9zZWNvbmRzXVxufVxuXG52YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbmV4cG9ydCBmdW5jdGlvbiB1cHRpbWUoKSB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gIHZhciBkaWYgPSBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIGRpZiAvIDEwMDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmV4dFRpY2s6IG5leHRUaWNrLFxuICB0aXRsZTogdGl0bGUsXG4gIGJyb3dzZXI6IGJyb3dzZXIsXG4gIGVudjogZW52LFxuICBhcmd2OiBhcmd2LFxuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gIG9uOiBvbixcbiAgYWRkTGlzdGVuZXI6IGFkZExpc3RlbmVyLFxuICBvbmNlOiBvbmNlLFxuICBvZmY6IG9mZixcbiAgcmVtb3ZlTGlzdGVuZXI6IHJlbW92ZUxpc3RlbmVyLFxuICByZW1vdmVBbGxMaXN0ZW5lcnM6IHJlbW92ZUFsbExpc3RlbmVycyxcbiAgZW1pdDogZW1pdCxcbiAgYmluZGluZzogYmluZGluZyxcbiAgY3dkOiBjd2QsXG4gIGNoZGlyOiBjaGRpcixcbiAgdW1hc2s6IHVtYXNrLFxuICBocnRpbWU6IGhydGltZSxcbiAgcGxhdGZvcm06IHBsYXRmb3JtLFxuICByZWxlYXNlOiByZWxlYXNlLFxuICBjb25maWc6IGNvbmZpZyxcbiAgdXB0aW1lOiB1cHRpbWVcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0c0xvb3NlOyIsIi8vIEBmbG93XG4ndXNlIHN0cmljdCc7XG5cbnZhciBrZXkgPSAnX19nbG9iYWxfdW5pcXVlX2lkX18nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2xvYmFsW2tleV0gPSAoZ2xvYmFsW2tleV0gfHwgMCkgKyAxO1xufTtcbiIsInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFpc1Byb2R1Y3Rpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHQgPSBcIldhcm5pbmc6IFwiICsgbWVzc2FnZTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhyb3cgRXJyb3IodGV4dCk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3YXJuaW5nO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBndWQgZnJvbSAnZ3VkJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5cbnZhciBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgPSAxMDczNzQxODIzO1xuXG5mdW5jdGlvbiBvYmplY3RJcyh4LCB5KSB7XG4gIGlmICh4ID09PSB5KSB7XG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnRFbWl0dGVyKHZhbHVlKSB7XG4gIHZhciBoYW5kbGVycyA9IFtdO1xuICByZXR1cm4ge1xuICAgIG9uOiBmdW5jdGlvbiBvbihoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH0sXG4gICAgb2ZmOiBmdW5jdGlvbiBvZmYoaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMgPSBoYW5kbGVycy5maWx0ZXIoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIGggIT09IGhhbmRsZXI7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQobmV3VmFsdWUsIGNoYW5nZWRCaXRzKSB7XG4gICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gaGFuZGxlcih2YWx1ZSwgY2hhbmdlZEJpdHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW5bMF0gOiBjaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVhY3RDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIHtcbiAgdmFyIF9Qcm92aWRlciRjaGlsZENvbnRleCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlO1xuXG4gIHZhciBjb250ZXh0UHJvcCA9ICdfX2NyZWF0ZS1yZWFjdC1jb250ZXh0LScgKyBndWQoKSArICdfXyc7XG5cbiAgdmFyIFByb3ZpZGVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0c0xvb3NlKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKCkge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfdGhpcyA9IF9Db21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMuZW1pdHRlciA9IGNyZWF0ZUV2ZW50RW1pdHRlcihfdGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90byA9IFByb3ZpZGVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90by5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltjb250ZXh0UHJvcF0gPSB0aGlzLmVtaXR0ZXIsIF9yZWY7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlICE9PSBuZXh0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gbmV4dFByb3BzLnZhbHVlO1xuICAgICAgICB2YXIgY2hhbmdlZEJpdHM7XG5cbiAgICAgICAgaWYgKG9iamVjdElzKG9sZFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICBjaGFuZ2VkQml0cyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSB0eXBlb2YgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09ICdmdW5jdGlvbicgPyBjYWxjdWxhdGVDaGFuZ2VkQml0cyhvbGRWYWx1ZSwgbmV3VmFsdWUpIDogTUFYX1NJR05FRF8zMV9CSVRfSU5UO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoKGNoYW5nZWRCaXRzICYgTUFYX1NJR05FRF8zMV9CSVRfSU5UKSA9PT0gY2hhbmdlZEJpdHMsICdjYWxjdWxhdGVDaGFuZ2VkQml0czogRXhwZWN0ZWQgdGhlIHJldHVybiB2YWx1ZSB0byBiZSBhICcgKyAnMzEtYml0IGludGVnZXIuIEluc3RlYWQgcmVjZWl2ZWQ6ICcgKyBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hhbmdlZEJpdHMgfD0gMDtcblxuICAgICAgICAgIGlmIChjaGFuZ2VkQml0cyAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLnNldChuZXh0UHJvcHMudmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfUHJvdmlkZXIkY2hpbGRDb250ZXggPSB7fSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W2NvbnRleHRQcm9wXSA9IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4KTtcblxuICB2YXIgQ29uc3VtZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ29tcG9uZW50Mikge1xuICAgIF9pbmhlcml0c0xvb3NlKENvbnN1bWVyLCBfQ29tcG9uZW50Mik7XG5cbiAgICBmdW5jdGlvbiBDb25zdW1lcigpIHtcbiAgICAgIHZhciBfdGhpczI7XG5cbiAgICAgIF90aGlzMiA9IF9Db21wb25lbnQyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzMi5zdGF0ZSA9IHtcbiAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICB9O1xuXG4gICAgICBfdGhpczIub25VcGRhdGUgPSBmdW5jdGlvbiAobmV3VmFsdWUsIGNoYW5nZWRCaXRzKSB7XG4gICAgICAgIHZhciBvYnNlcnZlZEJpdHMgPSBfdGhpczIub2JzZXJ2ZWRCaXRzIHwgMDtcblxuICAgICAgICBpZiAoKG9ic2VydmVkQml0cyAmIGNoYW5nZWRCaXRzKSAhPT0gMCkge1xuICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogX3RoaXMyLmdldFZhbHVlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMiA9IENvbnN1bWVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gbmV4dFByb3BzLm9ic2VydmVkQml0cztcbiAgICAgIHRoaXMub2JzZXJ2ZWRCaXRzID0gb2JzZXJ2ZWRCaXRzID09PSB1bmRlZmluZWQgfHwgb2JzZXJ2ZWRCaXRzID09PSBudWxsID8gTUFYX1NJR05FRF8zMV9CSVRfSU5UIDogb2JzZXJ2ZWRCaXRzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICB0aGlzLmNvbnRleHRbY29udGV4dFByb3BdLm9uKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gdGhpcy5wcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vZmYodGhpcy5vblVwZGF0ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRbY29udGV4dFByb3BdLmdldCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMi5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gb25seUNoaWxkKHRoaXMucHJvcHMuY2hpbGRyZW4pKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29uc3VtZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBDb25zdW1lci5jb250ZXh0VHlwZXMgPSAoX0NvbnN1bWVyJGNvbnRleHRUeXBlID0ge30sIF9Db25zdW1lciRjb250ZXh0VHlwZVtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LCBfQ29uc3VtZXIkY29udGV4dFR5cGUpO1xuICByZXR1cm4ge1xuICAgIFByb3ZpZGVyOiBQcm92aWRlcixcbiAgICBDb25zdW1lcjogQ29uc3VtZXJcbiAgfTtcbn1cblxudmFyIGluZGV4ID0gUmVhY3QuY3JlYXRlQ29udGV4dCB8fCBjcmVhdGVSZWFjdENvbnRleHQ7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn0iLCJmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGhuYW1lKSB7XG4gIHJldHVybiBwYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJztcbn1cblxuLy8gQWJvdXQgMS41eCBmYXN0ZXIgdGhhbiB0aGUgdHdvLWFyZyB2ZXJzaW9uIG9mIEFycmF5I3NwbGljZSgpXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICh2YXIgaSA9IGluZGV4LCBrID0gaSArIDEsIG4gPSBsaXN0Lmxlbmd0aDsgayA8IG47IGkgKz0gMSwgayArPSAxKSB7XG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIH1cblxuICBsaXN0LnBvcCgpO1xufVxuXG4vLyBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIGhlYXZpbHkgb24gbm9kZSdzIHVybC5wYXJzZVxuZnVuY3Rpb24gcmVzb2x2ZVBhdGhuYW1lKHRvKSB7XG4gIHZhciBmcm9tID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcblxuICB2YXIgdG9QYXJ0cyA9IHRvICYmIHRvLnNwbGl0KCcvJykgfHwgW107XG4gIHZhciBmcm9tUGFydHMgPSBmcm9tICYmIGZyb20uc3BsaXQoJy8nKSB8fCBbXTtcblxuICB2YXIgaXNUb0FicyA9IHRvICYmIGlzQWJzb2x1dGUodG8pO1xuICB2YXIgaXNGcm9tQWJzID0gZnJvbSAmJiBpc0Fic29sdXRlKGZyb20pO1xuICB2YXIgbXVzdEVuZEFicyA9IGlzVG9BYnMgfHwgaXNGcm9tQWJzO1xuXG4gIGlmICh0byAmJiBpc0Fic29sdXRlKHRvKSkge1xuICAgIC8vIHRvIGlzIGFic29sdXRlXG4gICAgZnJvbVBhcnRzID0gdG9QYXJ0cztcbiAgfSBlbHNlIGlmICh0b1BhcnRzLmxlbmd0aCkge1xuICAgIC8vIHRvIGlzIHJlbGF0aXZlLCBkcm9wIHRoZSBmaWxlbmFtZVxuICAgIGZyb21QYXJ0cy5wb3AoKTtcbiAgICBmcm9tUGFydHMgPSBmcm9tUGFydHMuY29uY2F0KHRvUGFydHMpO1xuICB9XG5cbiAgaWYgKCFmcm9tUGFydHMubGVuZ3RoKSByZXR1cm4gJy8nO1xuXG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gdm9pZCAwO1xuICBpZiAoZnJvbVBhcnRzLmxlbmd0aCkge1xuICAgIHZhciBsYXN0ID0gZnJvbVBhcnRzW2Zyb21QYXJ0cy5sZW5ndGggLSAxXTtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gbGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicgfHwgbGFzdCA9PT0gJyc7XG4gIH0gZWxzZSB7XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IGZyb21QYXJ0cy5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIHBhcnQgPSBmcm9tUGFydHNbaV07XG5cbiAgICBpZiAocGFydCA9PT0gJy4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICB9IGVsc2UgaWYgKHBhcnQgPT09ICcuLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgaWYgKCFtdXN0RW5kQWJzKSBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICBmcm9tUGFydHMudW5zaGlmdCgnLi4nKTtcbiAgfWlmIChtdXN0RW5kQWJzICYmIGZyb21QYXJ0c1swXSAhPT0gJycgJiYgKCFmcm9tUGFydHNbMF0gfHwgIWlzQWJzb2x1dGUoZnJvbVBhcnRzWzBdKSkpIGZyb21QYXJ0cy51bnNoaWZ0KCcnKTtcblxuICB2YXIgcmVzdWx0ID0gZnJvbVBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiByZXN1bHQuc3Vic3RyKC0xKSAhPT0gJy8nKSByZXN1bHQgKz0gJy8nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVQYXRobmFtZTsiLCJ2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIHZhbHVlRXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGIpICYmIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoaXRlbSwgYltpbmRleF0pO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGFUeXBlID0gdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGEpO1xuICB2YXIgYlR5cGUgPSB0eXBlb2YgYiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYik7XG5cbiAgaWYgKGFUeXBlICE9PSBiVHlwZSkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChhVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYVZhbHVlID0gYS52YWx1ZU9mKCk7XG4gICAgdmFyIGJWYWx1ZSA9IGIudmFsdWVPZigpO1xuXG4gICAgaWYgKGFWYWx1ZSAhPT0gYSB8fCBiVmFsdWUgIT09IGIpIHJldHVybiB2YWx1ZUVxdWFsKGFWYWx1ZSwgYlZhbHVlKTtcblxuICAgIHZhciBhS2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpO1xuXG4gICAgaWYgKGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gYUtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIHZhbHVlRXF1YWwoYVtrZXldLCBiW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZUVxdWFsOyIsInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xudmFyIHByZWZpeCA9ICdJbnZhcmlhbnQgZmFpbGVkJztcbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKGNvbmRpdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocHJlZml4KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocHJlZml4ICsgXCI6IFwiICsgKG1lc3NhZ2UgfHwgJycpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbnZhcmlhbnQ7XG4iLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgcmVzb2x2ZVBhdGhuYW1lIGZyb20gJ3Jlc29sdmUtcGF0aG5hbWUnO1xuaW1wb3J0IHZhbHVlRXF1YWwgZnJvbSAndmFsdWUtZXF1YWwnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuXG5mdW5jdGlvbiBhZGRMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGggOiAnLycgKyBwYXRoO1xufVxuZnVuY3Rpb24gc3RyaXBMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXggKyAnKFxcXFwvfFxcXFw/fCN8JCknLCAnaScpLnRlc3QocGF0aCk7XG59XG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSA/IHBhdGguc3Vic3RyKHByZWZpeC5sZW5ndGgpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpID09PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBwYXRoIHx8ICcvJztcbiAgdmFyIHNlYXJjaCA9ICcnO1xuICB2YXIgaGFzaCA9ICcnO1xuICB2YXIgaGFzaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignIycpO1xuXG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cihoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG5cbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cihzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2ggPT09ICc/JyA/ICcnIDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2ggPT09ICcjJyA/ICcnIDogaGFzaFxuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICB2YXIgcGF0aCA9IHBhdGhuYW1lIHx8ICcvJztcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2ggIT09ICc/JykgcGF0aCArPSBzZWFyY2guY2hhckF0KDApID09PSAnPycgPyBzZWFyY2ggOiBcIj9cIiArIHNlYXJjaDtcbiAgaWYgKGhhc2ggJiYgaGFzaCAhPT0gJyMnKSBwYXRoICs9IGhhc2guY2hhckF0KDApID09PSAnIycgPyBoYXNoIDogXCIjXCIgKyBoYXNoO1xuICByZXR1cm4gcGF0aDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSwgY3VycmVudExvY2F0aW9uKSB7XG4gIHZhciBsb2NhdGlvbjtcblxuICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVHdvLWFyZyBmb3JtOiBwdXNoKHBhdGgsIHN0YXRlKVxuICAgIGxvY2F0aW9uID0gcGFyc2VQYXRoKHBhdGgpO1xuICAgIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25lLWFyZyBmb3JtOiBwdXNoKGxvY2F0aW9uKVxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIHBhdGgpO1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5wYXRobmFtZSA9ICcnO1xuXG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5jaGFyQXQoMCkgIT09ICc/JykgbG9jYXRpb24uc2VhcmNoID0gJz8nICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5zZWFyY2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLmhhc2guY2hhckF0KDApICE9PSAnIycpIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBsb2NhdGlvbi5oYXNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQgJiYgbG9jYXRpb24uc3RhdGUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbG9jYXRpb24ucGF0aG5hbWUgPSBkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBVUklFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFVSSUVycm9yKCdQYXRobmFtZSBcIicgKyBsb2NhdGlvbi5wYXRobmFtZSArICdcIiBjb3VsZCBub3QgYmUgZGVjb2RlZC4gJyArICdUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgYW4gaW52YWxpZCBwZXJjZW50LWVuY29kaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkpIGxvY2F0aW9uLmtleSA9IGtleTtcblxuICBpZiAoY3VycmVudExvY2F0aW9uKSB7XG4gICAgLy8gUmVzb2x2ZSBpbmNvbXBsZXRlL3JlbGF0aXZlIHBhdGhuYW1lIHJlbGF0aXZlIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSByZXNvbHZlUGF0aG5hbWUobG9jYXRpb24ucGF0aG5hbWUsIGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdoZW4gdGhlcmUgaXMgbm8gcHJpb3IgbG9jYXRpb24gYW5kIHBhdGhuYW1lIGlzIGVtcHR5LCBzZXQgaXQgdG8gL1xuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsb2NhdGlvbjtcbn1cbmZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCA9PT0gYi5oYXNoICYmIGEua2V5ID09PSBiLmtleSAmJiB2YWx1ZUVxdWFsKGEuc3RhdGUsIGIuc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpIHtcbiAgdmFyIHByb21wdCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0UHJvbXB0KG5leHRQcm9tcHQpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByb21wdCA9PSBudWxsLCAnQSBoaXN0b3J5IHN1cHBvcnRzIG9ubHkgb25lIHByb21wdCBhdCBhIHRpbWUnKSA6IHZvaWQgMDtcbiAgICBwcm9tcHQgPSBuZXh0UHJvbXB0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvbXB0ID09PSBuZXh0UHJvbXB0KSBwcm9tcHQgPSBudWxsO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgLy8gVE9ETzogSWYgYW5vdGhlciB0cmFuc2l0aW9uIHN0YXJ0cyB3aGlsZSB3ZSdyZSBzdGlsbCBjb25maXJtaW5nXG4gICAgLy8gdGhlIHByZXZpb3VzIG9uZSwgd2UgbWF5IGVuZCB1cCBpbiBhIHdlaXJkIHN0YXRlLiBGaWd1cmUgb3V0IHRoZVxuICAgIC8vIGJlc3Qgd2F5IHRvIGhhbmRsZSB0aGlzLlxuICAgIGlmIChwcm9tcHQgIT0gbnVsbCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHR5cGVvZiBwcm9tcHQgPT09ICdmdW5jdGlvbicgPyBwcm9tcHQobG9jYXRpb24sIGFjdGlvbikgOiBwcm9tcHQ7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGdldFVzZXJDb25maXJtYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKHJlc3VsdCwgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdBIGhpc3RvcnkgbmVlZHMgYSBnZXRVc2VyQ29uZmlybWF0aW9uIGZ1bmN0aW9uIGluIG9yZGVyIHRvIHVzZSBhIHByb21wdCBtZXNzYWdlJykgOiB2b2lkIDA7XG4gICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBmYWxzZSBmcm9tIGEgdHJhbnNpdGlvbiBob29rIHRvIGNhbmNlbCB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0ICE9PSBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBhcHBlbmRMaXN0ZW5lcihmbikge1xuICAgIHZhciBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmIChpc0FjdGl2ZSkgZm4uYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0UHJvbXB0OiBzZXRQcm9tcHQsXG4gICAgY29uZmlybVRyYW5zaXRpb25UbzogY29uZmlybVRyYW5zaXRpb25UbyxcbiAgICBhcHBlbmRMaXN0ZW5lcjogYXBwZW5kTGlzdGVuZXIsXG4gICAgbm90aWZ5TGlzdGVuZXJzOiBub3RpZnlMaXN0ZW5lcnNcbiAgfTtcbn1cblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBnZXRDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sod2luZG93LmNvbmZpcm0obWVzc2FnZSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaXMgc3VwcG9ydGVkLiBUYWtlbiBmcm9tIE1vZGVybml6ci5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yb3V0ZXIvaXNzdWVzLzU4NlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gd2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3Rvcnk7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBicm93c2VyIGZpcmVzIHBvcHN0YXRlIG9uIGhhc2ggY2hhbmdlLlxuICogSUUxMCBhbmQgSUUxMSBkbyBub3QuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGdpdmVuIHBvcHN0YXRlIGV2ZW50IGlzIGFuIGV4dHJhbmVvdXMgV2ViS2l0IGV2ZW50LlxuICogQWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgQ2hyb21lIG9uIGlPUyBmaXJlcyByZWFsIHBvcHN0YXRlIGV2ZW50c1xuICogY29udGFpbmluZyB1bmRlZmluZWQgc3RhdGUgd2hlbiBwcmVzc2luZyB0aGUgYmFjayBidXR0b24uXG4gKi9cblxuZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkge1xuICBldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ3JpT1MnKSA9PT0gLTE7XG59XG5cbnZhciBQb3BTdGF0ZUV2ZW50ID0gJ3BvcHN0YXRlJztcbnZhciBIYXNoQ2hhbmdlRXZlbnQgPSAnaGFzaGNoYW5nZSc7XG5cbmZ1bmN0aW9uIGdldEhpc3RvcnlTdGF0ZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93Lmhpc3Rvcnkuc3RhdGUgfHwge307XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJRSAxMSBzb21ldGltZXMgdGhyb3dzIHdoZW4gYWNjZXNzaW5nIHdpbmRvdy5oaXN0b3J5LnN0YXRlXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdFRyYWluaW5nL2hpc3RvcnkvcHVsbC8yODlcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgdXNlcyB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaW5jbHVkaW5nXG4gKiBwdXNoU3RhdGUsIHJlcGxhY2VTdGF0ZSwgYW5kIHRoZSBwb3BzdGF0ZSBldmVudC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHZhciBnbG9iYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHZhciBjYW5Vc2VIaXN0b3J5ID0gc3VwcG9ydHNIaXN0b3J5KCk7XG4gIHZhciBuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lciA9ICFzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRmb3JjZVJlZnJlc2ggPSBfcHJvcHMuZm9yY2VSZWZyZXNoLFxuICAgICAgZm9yY2VSZWZyZXNoID0gX3Byb3BzJGZvcmNlUmVmcmVzaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkZm9yY2VSZWZyZXNoLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB2b2lkIDAgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuXG4gIGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKGhpc3RvcnlTdGF0ZSkge1xuICAgIHZhciBfcmVmID0gaGlzdG9yeVN0YXRlIHx8IHt9LFxuICAgICAgICBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlO1xuXG4gICAgdmFyIF93aW5kb3ckbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICAgIHBhdGhuYW1lID0gX3dpbmRvdyRsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoID0gX3dpbmRvdyRsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgIGhhc2ggPSBfd2luZG93JGxvY2F0aW9uLmhhc2g7XG4gICAgdmFyIHBhdGggPSBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKSA6IHZvaWQgMDtcbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wU3RhdGUoZXZlbnQpIHtcbiAgICAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuICAgIGlmIChpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50KGV2ZW50KSkgcmV0dXJuO1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihldmVudC5zdGF0ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBrZXlzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIGtleXMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsS2V5cy5pbmRleE9mKHRvTG9jYXRpb24ua2V5KTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxLZXlzLmluZGV4T2YoZnJvbUxvY2F0aW9uLmtleSk7XG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG4gICAgdmFyIGRlbHRhID0gdG9JbmRleCAtIGZyb21JbmRleDtcblxuICAgIGlmIChkZWx0YSkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gdHJ1ZTtcbiAgICAgIGdvKGRlbHRhKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpO1xuICB2YXIgYWxsS2V5cyA9IFtpbml0aWFsTG9jYXRpb24ua2V5XTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gYmFzZW5hbWUgKyBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnB1c2hTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgdmFyIG5leHRLZXlzID0gYWxsS2V5cy5zbGljZSgwLCBwcmV2SW5kZXggPT09IC0xID8gMCA6IHByZXZJbmRleCArIDEpO1xuICAgICAgICAgIG5leHRLZXlzLnB1c2gobG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBhbGxLZXlzID0gbmV4dEtleXM7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbEtleXNbcHJldkluZGV4XSA9IGxvY2F0aW9uLmtleTtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG52YXIgSGFzaENoYW5nZUV2ZW50JDEgPSAnaGFzaGNoYW5nZSc7XG52YXIgSGFzaFBhdGhDb2RlcnMgPSB7XG4gIGhhc2hiYW5nOiB7XG4gICAgZW5jb2RlUGF0aDogZnVuY3Rpb24gZW5jb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGggOiAnIS8nICsgc3RyaXBMZWFkaW5nU2xhc2gocGF0aCk7XG4gICAgfSxcbiAgICBkZWNvZGVQYXRoOiBmdW5jdGlvbiBkZWNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xuICAgIH1cbiAgfSxcbiAgbm9zbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IHN0cmlwTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9LFxuICBzbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIGhhc2hJbmRleCA9IGhyZWYuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/ICcnIDogaHJlZi5zdWJzdHJpbmcoaGFzaEluZGV4ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHB1c2hIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUhhc2hQYXRoKHBhdGgpIHtcbiAgdmFyIGhhc2hJbmRleCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKTtcbiAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhyZWYuc2xpY2UoMCwgaGFzaEluZGV4ID49IDAgPyBoYXNoSW5kZXggOiAwKSArICcjJyArIHBhdGgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIYXNoSGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnSGFzaCBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuR29XaXRob3V0UmVsb2FkID0gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB2b2lkIDAgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMkaGFzaFR5cGUgPSBfcHJvcHMuaGFzaFR5cGUsXG4gICAgICBoYXNoVHlwZSA9IF9wcm9wcyRoYXNoVHlwZSA9PT0gdm9pZCAwID8gJ3NsYXNoJyA6IF9wcm9wcyRoYXNoVHlwZTtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcbiAgdmFyIF9IYXNoUGF0aENvZGVycyRoYXNoVCA9IEhhc2hQYXRoQ29kZXJzW2hhc2hUeXBlXSxcbiAgICAgIGVuY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZW5jb2RlUGF0aCxcbiAgICAgIGRlY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZGVjb2RlUGF0aDtcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbigpIHtcbiAgICB2YXIgcGF0aCA9IGRlY29kZVBhdGgoZ2V0SGFzaFBhdGgoKSk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKSA6IHZvaWQgMDtcbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24ocGF0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gIHZhciBpZ25vcmVQYXRoID0gbnVsbDtcblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gICAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSB7XG4gICAgICAvLyBFbnN1cmUgd2UgYWx3YXlzIGhhdmUgYSBwcm9wZXJseS1lbmNvZGVkIGhhc2guXG4gICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICAgICAgdmFyIHByZXZMb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG4gICAgICBpZiAoIWZvcmNlTmV4dFBvcCAmJiBsb2NhdGlvbnNBcmVFcXVhbChwcmV2TG9jYXRpb24sIGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBBIGhhc2hjaGFuZ2UgZG9lc24ndCBhbHdheXMgPT0gbG9jYXRpb24gY2hhbmdlLlxuXG4gICAgICBpZiAoaWdub3JlUGF0aCA9PT0gY3JlYXRlUGF0aChsb2NhdGlvbikpIHJldHVybjsgLy8gSWdub3JlIHRoaXMgY2hhbmdlOyB3ZSBhbHJlYWR5IHNldFN0YXRlIGluIHB1c2gvcmVwbGFjZS5cblxuICAgICAgaWdub3JlUGF0aCA9IG51bGw7XG4gICAgICBoYW5kbGVQb3AobG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIHBhdGhzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIHBhdGhzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgodG9Mb2NhdGlvbikpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoZnJvbUxvY2F0aW9uKSk7XG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG4gICAgdmFyIGRlbHRhID0gdG9JbmRleCAtIGZyb21JbmRleDtcblxuICAgIGlmIChkZWx0YSkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gdHJ1ZTtcbiAgICAgIGdvKGRlbHRhKTtcbiAgICB9XG4gIH0gLy8gRW5zdXJlIHRoZSBoYXNoIGlzIGVuY29kZWQgcHJvcGVybHkgYmVmb3JlIGRvaW5nIGFueXRoaW5nIGVsc2UuXG5cblxuICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG4gIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gIHZhciBhbGxQYXRocyA9IFtjcmVhdGVQYXRoKGluaXRpYWxMb2NhdGlvbildOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiAnIycgKyBlbmNvZGVQYXRoKGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFBVU0gsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHB1c2hIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgICAgdmFyIG5leHRQYXRocyA9IGFsbFBhdGhzLnNsaWNlKDAsIHByZXZJbmRleCA9PT0gLTEgPyAwIDogcHJldkluZGV4ICsgMSk7XG4gICAgICAgIG5leHRQYXRocy5wdXNoKHBhdGgpO1xuICAgICAgICBhbGxQYXRocyA9IG5leHRQYXRocztcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdIYXNoIGhpc3RvcnkgY2Fubm90IFBVU0ggdGhlIHNhbWUgcGF0aDsgYSBuZXcgZW50cnkgd2lsbCBub3QgYmUgYWRkZWQgdG8gdGhlIGhpc3Rvcnkgc3RhY2snKSA6IHZvaWQgMDtcbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBSRVBMQUNFLCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMuaW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxQYXRoc1twcmV2SW5kZXhdID0gcGF0aDtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhjYW5Hb1dpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKSA6IHZvaWQgMDtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobiwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobiwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCBzdG9yZXMgbG9jYXRpb25zIGluIG1lbW9yeS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZU1lbW9yeUhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgX3Byb3BzJGluaXRpYWxFbnRyaWVzID0gX3Byb3BzLmluaXRpYWxFbnRyaWVzLFxuICAgICAgaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPT09IHZvaWQgMCA/IFsnLyddIDogX3Byb3BzJGluaXRpYWxFbnRyaWVzLFxuICAgICAgX3Byb3BzJGluaXRpYWxJbmRleCA9IF9wcm9wcy5pbml0aWFsSW5kZXgsXG4gICAgICBpbml0aWFsSW5kZXggPSBfcHJvcHMkaW5pdGlhbEluZGV4ID09PSB2b2lkIDAgPyAwIDogX3Byb3BzJGluaXRpYWxJbmRleCxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciBpbmRleCA9IGNsYW1wKGluaXRpYWxJbmRleCwgMCwgaW5pdGlhbEVudHJpZXMubGVuZ3RoIC0gMSk7XG4gIHZhciBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgY3JlYXRlS2V5KCkpIDogY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgZW50cnkua2V5IHx8IGNyZWF0ZUtleSgpKTtcbiAgfSk7IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICB2YXIgY3JlYXRlSHJlZiA9IGNyZWF0ZVBhdGg7XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBoaXN0b3J5LmluZGV4O1xuICAgICAgdmFyIG5leHRJbmRleCA9IHByZXZJbmRleCArIDE7XG4gICAgICB2YXIgbmV4dEVudHJpZXMgPSBoaXN0b3J5LmVudHJpZXMuc2xpY2UoMCk7XG5cbiAgICAgIGlmIChuZXh0RW50cmllcy5sZW5ndGggPiBuZXh0SW5kZXgpIHtcbiAgICAgICAgbmV4dEVudHJpZXMuc3BsaWNlKG5leHRJbmRleCwgbmV4dEVudHJpZXMubGVuZ3RoIC0gbmV4dEluZGV4LCBsb2NhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RW50cmllcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgICBlbnRyaWVzOiBuZXh0RW50cmllc1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgaGlzdG9yeS5lbnRyaWVzW2hpc3RvcnkuaW5kZXhdID0gbG9jYXRpb247XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBjbGFtcChoaXN0b3J5LmluZGV4ICsgbiwgMCwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aCAtIDEpO1xuICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICB2YXIgbG9jYXRpb24gPSBoaXN0b3J5LmVudHJpZXNbbmV4dEluZGV4XTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgICAgaW5kZXg6IG5leHRJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1pbWljIHRoZSBiZWhhdmlvciBvZiBET00gaGlzdG9yaWVzIGJ5XG4gICAgICAgIC8vIGNhdXNpbmcgYSByZW5kZXIgYWZ0ZXIgYSBjYW5jZWxsZWQgUE9QLlxuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gaGlzdG9yeS5pbmRleCArIG47XG4gICAgcmV0dXJuIG5leHRJbmRleCA+PSAwICYmIG5leHRJbmRleCA8IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGVudHJpZXMubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGVudHJpZXNbaW5kZXhdLFxuICAgIGluZGV4OiBpbmRleCxcbiAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBjYW5HbzogY2FuR28sXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5leHBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgcGFyc2VQYXRoLCBjcmVhdGVQYXRoIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJ2YXIgaXNhcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG4vKipcbiAqIEV4cG9zZSBgcGF0aFRvUmVnZXhwYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoVG9SZWdleHBcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvblxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9SZWdFeHAgPSB0b2tlbnNUb1JlZ0V4cFxuXG4vKipcbiAqIFRoZSBtYWluIHBhdGggbWF0Y2hpbmcgcmVnZXhwIHV0aWxpdHkuXG4gKlxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChbXG4gIC8vIE1hdGNoIGVzY2FwZWQgY2hhcmFjdGVycyB0aGF0IHdvdWxkIG90aGVyd2lzZSBhcHBlYXIgaW4gZnV0dXJlIG1hdGNoZXMuXG4gIC8vIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgdGhhdCB3b24ndCB0cmFuc2Zvcm0uXG4gICcoXFxcXFxcXFwuKScsXG4gIC8vIE1hdGNoIEV4cHJlc3Mtc3R5bGUgcGFyYW1ldGVycyBhbmQgdW4tbmFtZWQgcGFyYW1ldGVycyB3aXRoIGEgcHJlZml4XG4gIC8vIGFuZCBvcHRpb25hbCBzdWZmaXhlcy4gTWF0Y2hlcyBhcHBlYXIgYXM6XG4gIC8vXG4gIC8vIFwiLzp0ZXN0KFxcXFxkKyk/XCIgPT4gW1wiL1wiLCBcInRlc3RcIiwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgXCI/XCIsIHVuZGVmaW5lZF1cbiAgLy8gXCIvcm91dGUoXFxcXGQrKVwiICA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAvLyBcIi8qXCIgICAgICAgICAgICA9PiBbXCIvXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCIqXCJdXG4gICcoW1xcXFwvLl0pPyg/Oig/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSkoWysqP10pP3woXFxcXCopKSdcbl0uam9pbignfCcpLCAnZycpXG5cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7IUFycmF5fVxuICovXG5mdW5jdGlvbiBwYXJzZSAoc3RyLCBvcHRpb25zKSB7XG4gIHZhciB0b2tlbnMgPSBbXVxuICB2YXIga2V5ID0gMFxuICB2YXIgaW5kZXggPSAwXG4gIHZhciBwYXRoID0gJydcbiAgdmFyIGRlZmF1bHREZWxpbWl0ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJ1xuICB2YXIgcmVzXG5cbiAgd2hpbGUgKChyZXMgPSBQQVRIX1JFR0VYUC5leGVjKHN0cikpICE9IG51bGwpIHtcbiAgICB2YXIgbSA9IHJlc1swXVxuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdXG4gICAgdmFyIG9mZnNldCA9IHJlcy5pbmRleFxuICAgIHBhdGggKz0gc3RyLnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aFxuXG4gICAgLy8gSWdub3JlIGFscmVhZHkgZXNjYXBlZCBzZXF1ZW5jZXMuXG4gICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgIHBhdGggKz0gZXNjYXBlZFsxXVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB2YXIgbmV4dCA9IHN0cltpbmRleF1cbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdXG4gICAgdmFyIG5hbWUgPSByZXNbM11cbiAgICB2YXIgY2FwdHVyZSA9IHJlc1s0XVxuICAgIHZhciBncm91cCA9IHJlc1s1XVxuICAgIHZhciBtb2RpZmllciA9IHJlc1s2XVxuICAgIHZhciBhc3RlcmlzayA9IHJlc1s3XVxuXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cbiAgICBpZiAocGF0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aClcbiAgICAgIHBhdGggPSAnJ1xuICAgIH1cblxuICAgIHZhciBwYXJ0aWFsID0gcHJlZml4ICE9IG51bGwgJiYgbmV4dCAhPSBudWxsICYmIG5leHQgIT09IHByZWZpeFxuICAgIHZhciByZXBlYXQgPSBtb2RpZmllciA9PT0gJysnIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgb3B0aW9uYWwgPSBtb2RpZmllciA9PT0gJz8nIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgZGVsaW1pdGVyID0gcmVzWzJdIHx8IGRlZmF1bHREZWxpbWl0ZXJcbiAgICB2YXIgcGF0dGVybiA9IGNhcHR1cmUgfHwgZ3JvdXBcblxuICAgIHRva2Vucy5wdXNoKHtcbiAgICAgIG5hbWU6IG5hbWUgfHwga2V5KyssXG4gICAgICBwcmVmaXg6IHByZWZpeCB8fCAnJyxcbiAgICAgIGRlbGltaXRlcjogZGVsaW1pdGVyLFxuICAgICAgb3B0aW9uYWw6IG9wdGlvbmFsLFxuICAgICAgcmVwZWF0OiByZXBlYXQsXG4gICAgICBwYXJ0aWFsOiBwYXJ0aWFsLFxuICAgICAgYXN0ZXJpc2s6ICEhYXN0ZXJpc2ssXG4gICAgICBwYXR0ZXJuOiBwYXR0ZXJuID8gZXNjYXBlR3JvdXAocGF0dGVybikgOiAoYXN0ZXJpc2sgPyAnLionIDogJ1teJyArIGVzY2FwZVN0cmluZyhkZWxpbWl0ZXIpICsgJ10rPycpXG4gICAgfSlcbiAgfVxuXG4gIC8vIE1hdGNoIGFueSBjaGFyYWN0ZXJzIHN0aWxsIHJlbWFpbmluZy5cbiAgaWYgKGluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgIHBhdGggKz0gc3RyLnN1YnN0cihpbmRleClcbiAgfVxuXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXG4gIGlmIChwYXRoKSB7XG4gICAgdG9rZW5zLnB1c2gocGF0aClcbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgc3RyaW5nIHRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIHRoZSBwYXRoLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFmdW5jdGlvbihPYmplY3Q9LCBPYmplY3Q9KX1cbiAqL1xuZnVuY3Rpb24gY29tcGlsZSAoc3RyLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb0Z1bmN0aW9uKHBhcnNlKHN0ciwgb3B0aW9ucykpXG59XG5cbi8qKlxuICogUHJldHRpZXIgZW5jb2Rpbmcgb2YgVVJJIHBhdGggc2VnbWVudHMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvW1xcLz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFbmNvZGUgdGhlIGFzdGVyaXNrIHBhcmFtZXRlci4gU2ltaWxhciB0byBgcHJldHR5YCwgYnV0IGFsbG93cyBzbGFzaGVzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlQXN0ZXJpc2sgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbiAodG9rZW5zKSB7XG4gIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxuICB2YXIgbWF0Y2hlcyA9IG5ldyBBcnJheSh0b2tlbnMubGVuZ3RoKVxuXG4gIC8vIENvbXBpbGUgYWxsIHRoZSBwYXR0ZXJucyBiZWZvcmUgY29tcGlsYXRpb24uXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBtYXRjaGVzW2ldID0gbmV3IFJlZ0V4cCgnXig/OicgKyB0b2tlbnNbaV0ucGF0dGVybiArICcpJCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICB2YXIgcGF0aCA9ICcnXG4gICAgdmFyIGRhdGEgPSBvYmogfHwge31cbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgfHwge31cbiAgICB2YXIgZW5jb2RlID0gb3B0aW9ucy5wcmV0dHkgPyBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgOiBlbmNvZGVVUklDb21wb25lbnRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCArPSB0b2tlblxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV1cbiAgICAgIHZhciBzZWdtZW50XG5cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgIC8vIFByZXBlbmQgcGFydGlhbCBzZWdtZW50IHByZWZpeGVzLlxuICAgICAgICAgIGlmICh0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBiZSBkZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCByZXBlYXQsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IGJlIGVtcHR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSlcblxuICAgICAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeShzZWdtZW50KSArICdgJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXRoICs9IChqID09PSAwID8gdG9rZW4ucHJlZml4IDogdG9rZW4uZGVsaW1pdGVyKSArIHNlZ21lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHNlZ21lbnQgPSB0b2tlbi5hc3RlcmlzayA/IGVuY29kZUFzdGVyaXNrKHZhbHVlKSA6IGVuY29kZSh2YWx1ZSlcblxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXG4gICAgICB9XG5cbiAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudFxuICAgIH1cblxuICAgIHJldHVybiBwYXRoXG4gIH1cbn1cblxuLyoqXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXxcXC9cXFxcXSkvZywgJ1xcXFwkMScpXG59XG5cbi8qKlxuICogRXNjYXBlIHRoZSBjYXB0dXJpbmcgZ3JvdXAgYnkgZXNjYXBpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBtZWFuaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gZ3JvdXBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlR3JvdXAgKGdyb3VwKSB7XG4gIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiRcXC8oKV0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEF0dGFjaCB0aGUga2V5cyBhcyBhIHByb3BlcnR5IG9mIHRoZSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcmVcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGF0dGFjaEtleXMgKHJlLCBrZXlzKSB7XG4gIHJlLmtleXMgPSBrZXlzXG4gIHJldHVybiByZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZsYWdzIChvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knXG59XG5cbi8qKlxuICogUHVsbCBvdXQga2V5cyBmcm9tIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvUmVnZXhwIChwYXRoLCBrZXlzKSB7XG4gIC8vIFVzZSBhIG5lZ2F0aXZlIGxvb2thaGVhZCB0byBtYXRjaCBvbmx5IGNhcHR1cmluZyBncm91cHMuXG4gIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKVxuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaSxcbiAgICAgICAgcHJlZml4OiBudWxsLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgcGFydGlhbDogZmFsc2UsXG4gICAgICAgIGFzdGVyaXNrOiBmYWxzZSxcbiAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhwYXRoLCBrZXlzKVxufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gIHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnRzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0cy5wdXNoKHBhdGhUb1JlZ2V4cChwYXRoW2ldLCBrZXlzLCBvcHRpb25zKS5zb3VyY2UpXG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpXG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocmVnZXhwLCBrZXlzKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHBhdGggcmVnZXhwIGZyb20gc3RyaW5nIGlucHV0LlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb1JlZ0V4cChwYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucylcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBmdW5jdGlvbiBmb3IgdGFraW5nIHRva2VucyBhbmQgcmV0dXJuaW5nIGEgUmVnRXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gICAgICAgICAgdG9rZW5zXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19IGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9SZWdFeHAgKHRva2Vucywga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3RcbiAgdmFyIGVuZCA9IG9wdGlvbnMuZW5kICE9PSBmYWxzZVxuICB2YXIgcm91dGUgPSAnJ1xuXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgdG9rZW5zIGFuZCBjcmVhdGUgb3VyIHJlZ2V4cCBzdHJpbmcuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgcm91dGUgKz0gZXNjYXBlU3RyaW5nKHRva2VuKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeClcbiAgICAgIHZhciBjYXB0dXJlID0gJyg/OicgKyB0b2tlbi5wYXR0ZXJuICsgJyknXG5cbiAgICAgIGtleXMucHVzaCh0b2tlbilcblxuICAgICAgaWYgKHRva2VuLnJlcGVhdCkge1xuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKidcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgIGlmICghdG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgIGNhcHR1cmUgPSAnKD86JyArIHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSk/J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyk/J1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJ1xuICAgICAgfVxuXG4gICAgICByb3V0ZSArPSBjYXB0dXJlXG4gICAgfVxuICB9XG5cbiAgdmFyIGRlbGltaXRlciA9IGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCAnLycpXG4gIHZhciBlbmRzV2l0aERlbGltaXRlciA9IHJvdXRlLnNsaWNlKC1kZWxpbWl0ZXIubGVuZ3RoKSA9PT0gZGVsaW1pdGVyXG5cbiAgLy8gSW4gbm9uLXN0cmljdCBtb2RlIHdlIGFsbG93IGEgc2xhc2ggYXQgdGhlIGVuZCBvZiBtYXRjaC4gSWYgdGhlIHBhdGggdG9cbiAgLy8gbWF0Y2ggYWxyZWFkeSBlbmRzIHdpdGggYSBzbGFzaCwgd2UgcmVtb3ZlIGl0IGZvciBjb25zaXN0ZW5jeS4gVGhlIHNsYXNoXG4gIC8vIGlzIHZhbGlkIGF0IHRoZSBlbmQgb2YgYSBwYXRoIG1hdGNoLCBub3QgaW4gdGhlIG1pZGRsZS4gVGhpcyBpcyBpbXBvcnRhbnRcbiAgLy8gaW4gbm9uLWVuZGluZyBtb2RlLCB3aGVyZSBcIi90ZXN0L1wiIHNob3VsZG4ndCBtYXRjaCBcIi90ZXN0Ly9yb3V0ZVwiLlxuICBpZiAoIXN0cmljdCkge1xuICAgIHJvdXRlID0gKGVuZHNXaXRoRGVsaW1pdGVyID8gcm91dGUuc2xpY2UoMCwgLWRlbGltaXRlci5sZW5ndGgpIDogcm91dGUpICsgJyg/OicgKyBkZWxpbWl0ZXIgKyAnKD89JCkpPydcbiAgfVxuXG4gIGlmIChlbmQpIHtcbiAgICByb3V0ZSArPSAnJCdcbiAgfSBlbHNlIHtcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xuICAgIC8vIHBvc3NpYmxlIGJ5IHVzaW5nIGEgcG9zaXRpdmUgbG9va2FoZWFkIHRvIHRoZSBlbmQgb3IgbmV4dCBwYXRoIHNlZ21lbnQuXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoRGVsaW1pdGVyID8gJycgOiAnKD89JyArIGRlbGltaXRlciArICd8JCknXG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhuZXcgUmVnRXhwKCdeJyArIHJvdXRlLCBmbGFncyhvcHRpb25zKSksIGtleXMpXG59XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiBwYXRoIHN0cmluZywgcmV0dXJuaW5nIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXG4gKiBwbGFjZWhvbGRlciBrZXkgZGVzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgdXNpbmcgYC91c2VyLzppZGAsIGBrZXlzYCB3aWxsXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cbiAqXG4gKiBAcGFyYW0gIHsoc3RyaW5nfFJlZ0V4cHxBcnJheSl9IHBhdGhcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0gICAgICAga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSlcbiAgfVxuXG4gIGlmIChpc2FycmF5KHBhdGgpKSB7XG4gICAgcmV0dXJuIGFycmF5VG9SZWdleHAoLyoqIEB0eXBlIHshQXJyYXl9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdUb1JlZ2V4cCgvKiogQHR5cGUge3N0cmluZ30gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxufVxuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi45LjBcbiAqIHJlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO1xudmFyIGI9XCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvcixjPWI/U3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIik6NjAxMDMsZD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIik6NjAxMDYsZT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTo2MDEwNyxmPWI/U3ltYm9sLmZvcihcInJlYWN0LnN0cmljdF9tb2RlXCIpOjYwMTA4LGc9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvZmlsZXJcIik6NjAxMTQsaD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm92aWRlclwiKTo2MDEwOSxrPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbnRleHRcIik6NjAxMTAsbD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5hc3luY19tb2RlXCIpOjYwMTExLG09Yj9TeW1ib2wuZm9yKFwicmVhY3QuY29uY3VycmVudF9tb2RlXCIpOjYwMTExLG49Yj9TeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIik6NjAxMTIscD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZVwiKTo2MDExMyxxPWI/U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlX2xpc3RcIik6XG42MDEyMCxyPWI/U3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIik6NjAxMTUsdD1iP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2LHY9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnVuZGFtZW50YWxcIik6NjAxMTcsdz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5yZXNwb25kZXJcIik6NjAxMTg7ZnVuY3Rpb24geChhKXtpZihcIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hKXt2YXIgdT1hLiQkdHlwZW9mO3N3aXRjaCh1KXtjYXNlIGM6c3dpdGNoKGE9YS50eXBlLGEpe2Nhc2UgbDpjYXNlIG06Y2FzZSBlOmNhc2UgZzpjYXNlIGY6Y2FzZSBwOnJldHVybiBhO2RlZmF1bHQ6c3dpdGNoKGE9YSYmYS4kJHR5cGVvZixhKXtjYXNlIGs6Y2FzZSBuOmNhc2UgaDpyZXR1cm4gYTtkZWZhdWx0OnJldHVybiB1fX1jYXNlIHQ6Y2FzZSByOmNhc2UgZDpyZXR1cm4gdX19fWZ1bmN0aW9uIHkoYSl7cmV0dXJuIHgoYSk9PT1tfWV4cG9ydHMudHlwZU9mPXg7ZXhwb3J0cy5Bc3luY01vZGU9bDtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGU9bTtleHBvcnRzLkNvbnRleHRDb25zdW1lcj1rO2V4cG9ydHMuQ29udGV4dFByb3ZpZGVyPWg7ZXhwb3J0cy5FbGVtZW50PWM7ZXhwb3J0cy5Gb3J3YXJkUmVmPW47ZXhwb3J0cy5GcmFnbWVudD1lO2V4cG9ydHMuTGF6eT10O2V4cG9ydHMuTWVtbz1yO2V4cG9ydHMuUG9ydGFsPWQ7ZXhwb3J0cy5Qcm9maWxlcj1nO2V4cG9ydHMuU3RyaWN0TW9kZT1mO2V4cG9ydHMuU3VzcGVuc2U9cDtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlPWZ1bmN0aW9uKGEpe3JldHVyblwic3RyaW5nXCI9PT10eXBlb2YgYXx8XCJmdW5jdGlvblwiPT09dHlwZW9mIGF8fGE9PT1lfHxhPT09bXx8YT09PWd8fGE9PT1mfHxhPT09cHx8YT09PXF8fFwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJihhLiQkdHlwZW9mPT09dHx8YS4kJHR5cGVvZj09PXJ8fGEuJCR0eXBlb2Y9PT1ofHxhLiQkdHlwZW9mPT09a3x8YS4kJHR5cGVvZj09PW58fGEuJCR0eXBlb2Y9PT12fHxhLiQkdHlwZW9mPT09dyl9O2V4cG9ydHMuaXNBc3luY01vZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHkoYSl8fHgoYSk9PT1sfTtleHBvcnRzLmlzQ29uY3VycmVudE1vZGU9eTtleHBvcnRzLmlzQ29udGV4dENvbnN1bWVyPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09a307ZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlcj1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWh9O1xuZXhwb3J0cy5pc0VsZW1lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmYS4kJHR5cGVvZj09PWN9O2V4cG9ydHMuaXNGb3J3YXJkUmVmPWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09bn07ZXhwb3J0cy5pc0ZyYWdtZW50PWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpPT09ZX07ZXhwb3J0cy5pc0xhenk9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT10fTtleHBvcnRzLmlzTWVtbz1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PXJ9O2V4cG9ydHMuaXNQb3J0YWw9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1kfTtleHBvcnRzLmlzUHJvZmlsZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSk9PT1nfTtleHBvcnRzLmlzU3RyaWN0TW9kZT1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PWZ9O2V4cG9ydHMuaXNTdXNwZW5zZT1mdW5jdGlvbihhKXtyZXR1cm4geChhKT09PXB9O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi45LjBcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlO1xuLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZTogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IHRydWUsXG4gICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBjYWxsZWU6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgRk9SV0FSRF9SRUZfU1RBVElDUyA9IHtcbiAgICAnJCR0eXBlb2YnOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlXG59O1xuXG52YXIgTUVNT19TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgY29tcGFyZTogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tSZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblxuZnVuY3Rpb24gZ2V0U3RhdGljcyhjb21wb25lbnQpIHtcbiAgICBpZiAoUmVhY3RJcy5pc01lbW8oY29tcG9uZW50KSkge1xuICAgICAgICByZXR1cm4gTUVNT19TVEFUSUNTO1xuICAgIH1cbiAgICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuXG4gICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXRTdGF0aWNzID0gZ2V0U3RhdGljcyh0YXJnZXRDb21wb25lbnQpO1xuICAgICAgICB2YXIgc291cmNlU3RhdGljcyA9IGdldFN0YXRpY3Moc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFLTk9XTl9TVEFUSUNTW2tleV0gJiYgIShibGFja2xpc3QgJiYgYmxhY2tsaXN0W2tleV0pICYmICEoc291cmNlU3RhdGljcyAmJiBzb3VyY2VTdGF0aWNzW2tleV0pICYmICEodGFyZ2V0U3RhdGljcyAmJiB0YXJnZXRTdGF0aWNzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG4iLCJpbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdtaW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgY3JlYXRlUGF0aCB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9IGZyb20gJ3JlYWN0LWlzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG4vLyBUT0RPOiBSZXBsYWNlIHdpdGggUmVhY3QuY3JlYXRlQ29udGV4dCBvbmNlIHdlIGNhbiBhc3N1bWUgUmVhY3QgMTYrXG5cbnZhciBjcmVhdGVOYW1lZENvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVOYW1lZENvbnRleHQobmFtZSkge1xuICB2YXIgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcbiAgY29udGV4dC5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gIHJldHVybiBjb250ZXh0O1xufTtcblxudmFyIGNvbnRleHQgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlTmFtZWRDb250ZXh0KFwiUm91dGVyXCIpO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBwdXR0aW5nIGhpc3Rvcnkgb24gY29udGV4dC5cbiAqL1xuXG52YXIgUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgUm91dGVyLmNvbXB1dGVSb290TWF0Y2ggPSBmdW5jdGlvbiBjb21wdXRlUm9vdE1hdGNoKHBhdGhuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgdXJsOiBcIi9cIixcbiAgICAgIHBhcmFtczoge30sXG4gICAgICBpc0V4YWN0OiBwYXRobmFtZSA9PT0gXCIvXCJcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIFJvdXRlcihwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgbG9jYXRpb246IHByb3BzLmhpc3RvcnkubG9jYXRpb25cbiAgICB9OyAvLyBUaGlzIGlzIGEgYml0IG9mIGEgaGFjay4gV2UgaGF2ZSB0byBzdGFydCBsaXN0ZW5pbmcgZm9yIGxvY2F0aW9uXG4gICAgLy8gY2hhbmdlcyBoZXJlIGluIHRoZSBjb25zdHJ1Y3RvciBpbiBjYXNlIHRoZXJlIGFyZSBhbnkgPFJlZGlyZWN0PnNcbiAgICAvLyBvbiB0aGUgaW5pdGlhbCByZW5kZXIuIElmIHRoZXJlIGFyZSwgdGhleSB3aWxsIHJlcGxhY2UvcHVzaCB3aGVuXG4gICAgLy8gdGhleSBtb3VudCBhbmQgc2luY2UgY0RNIGZpcmVzIGluIGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLCB3ZSBtYXlcbiAgICAvLyBnZXQgYSBuZXcgbG9jYXRpb24gYmVmb3JlIHRoZSA8Um91dGVyPiBpcyBtb3VudGVkLlxuXG4gICAgX3RoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xuICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBudWxsO1xuXG4gICAgaWYgKCFwcm9wcy5zdGF0aWNDb250ZXh0KSB7XG4gICAgICBfdGhpcy51bmxpc3RlbiA9IHByb3BzLmhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICBpZiAoX3RoaXMuX2lzTW91bnRlZCkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5faXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9wZW5kaW5nTG9jYXRpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsb2NhdGlvbjogdGhpcy5fcGVuZGluZ0xvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHRoaXMudW5saXN0ZW4oKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IG51bGwsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBoaXN0b3J5OiB0aGlzLnByb3BzLmhpc3RvcnksXG4gICAgICAgIGxvY2F0aW9uOiB0aGlzLnN0YXRlLmxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogUm91dGVyLmNvbXB1dGVSb290TWF0Y2godGhpcy5zdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSksXG4gICAgICAgIHN0YXRpY0NvbnRleHQ6IHRoaXMucHJvcHMuc3RhdGljQ29udGV4dFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgaGlzdG9yeTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByZXZQcm9wcy5oaXN0b3J5ID09PSB0aGlzLnByb3BzLmhpc3RvcnksIFwiWW91IGNhbm5vdCBjaGFuZ2UgPFJvdXRlciBoaXN0b3J5PlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHN0b3JlcyBsb2NhdGlvbiBpbiBtZW1vcnkuXG4gKi9cblxudmFyIE1lbW9yeVJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShNZW1vcnlSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1lbW9yeVJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1lbW9yeVJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1lbW9yeVJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBNZW1vcnlSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGluaXRpYWxFbnRyaWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5pdGlhbEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbiAgfTtcblxuICBNZW1vcnlSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8TWVtb3J5Um91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgTWVtb3J5Um91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbnZhciBMaWZlY3ljbGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTGlmZWN5Y2xlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IExpZmVjeWNsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VudCkgdGhpcy5wcm9wcy5vbk1vdW50LmNhbGwodGhpcywgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVwZGF0ZSkgdGhpcy5wcm9wcy5vblVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMsIHByZXZQcm9wcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Vbm1vdW50KSB0aGlzLnByb3BzLm9uVW5tb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIExpZmVjeWNsZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHJvbXB0aW5nIHRoZSB1c2VyIGJlZm9yZSBuYXZpZ2F0aW5nIGF3YXkgZnJvbSBhIHNjcmVlbi5cbiAqL1xuXG5mdW5jdGlvbiBQcm9tcHQoX3JlZikge1xuICB2YXIgbWVzc2FnZSA9IF9yZWYubWVzc2FnZSxcbiAgICAgIF9yZWYkd2hlbiA9IF9yZWYud2hlbixcbiAgICAgIHdoZW4gPSBfcmVmJHdoZW4gPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJHdoZW47XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxQcm9tcHQ+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgaWYgKCF3aGVuIHx8IGNvbnRleHQkJDEuc3RhdGljQ29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG1ldGhvZCA9IGNvbnRleHQkJDEuaGlzdG9yeS5ibG9jaztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLm1lc3NhZ2UgIT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblVubW91bnQ6IGZ1bmN0aW9uIG9uVW5tb3VudChzZWxmKSB7XG4gICAgICAgIHNlbGYucmVsZWFzZSgpO1xuICAgICAgfSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIG1lc3NhZ2VUeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5zdHJpbmddKTtcbiAgUHJvbXB0LnByb3BUeXBlcyA9IHtcbiAgICB3aGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtZXNzYWdlOiBtZXNzYWdlVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSA9IHt9O1xudmFyIGNhY2hlTGltaXQgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50ID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0aCkge1xuICBpZiAoY2FjaGVbcGF0aF0pIHJldHVybiBjYWNoZVtwYXRoXTtcbiAgdmFyIGdlbmVyYXRvciA9IHBhdGhUb1JlZ2V4cC5jb21waWxlKHBhdGgpO1xuXG4gIGlmIChjYWNoZUNvdW50IDwgY2FjaGVMaW1pdCkge1xuICAgIGNhY2hlW3BhdGhdID0gZ2VuZXJhdG9yO1xuICAgIGNhY2hlQ291bnQrKztcbiAgfVxuXG4gIHJldHVybiBnZW5lcmF0b3I7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIGdlbmVyYXRpbmcgYSBVUkwgcGF0aG5hbWUgZnJvbSBhIHBhdGggYW5kIHBhcmFtZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBhdGgocGF0aCwgcGFyYW1zKSB7XG4gIGlmIChwYXRoID09PSB2b2lkIDApIHtcbiAgICBwYXRoID0gXCIvXCI7XG4gIH1cblxuICBpZiAocGFyYW1zID09PSB2b2lkIDApIHtcbiAgICBwYXJhbXMgPSB7fTtcbiAgfVxuXG4gIHJldHVybiBwYXRoID09PSBcIi9cIiA/IHBhdGggOiBjb21waWxlUGF0aChwYXRoKShwYXJhbXMsIHtcbiAgICBwcmV0dHk6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG5hdmlnYXRpbmcgcHJvZ3JhbW1hdGljYWxseSB3aXRoIGEgY29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIFJlZGlyZWN0KF9yZWYpIHtcbiAgdmFyIGNvbXB1dGVkTWF0Y2ggPSBfcmVmLmNvbXB1dGVkTWF0Y2gsXG4gICAgICB0byA9IF9yZWYudG8sXG4gICAgICBfcmVmJHB1c2ggPSBfcmVmLnB1c2gsXG4gICAgICBwdXNoID0gX3JlZiRwdXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkcHVzaDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJlZGlyZWN0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dCQkMS5oaXN0b3J5LFxuICAgICAgICBzdGF0aWNDb250ZXh0ID0gY29udGV4dCQkMS5zdGF0aWNDb250ZXh0O1xuICAgIHZhciBtZXRob2QgPSBwdXNoID8gaGlzdG9yeS5wdXNoIDogaGlzdG9yeS5yZXBsYWNlO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKGNvbXB1dGVkTWF0Y2ggPyB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBnZW5lcmF0ZVBhdGgodG8sIGNvbXB1dGVkTWF0Y2gucGFyYW1zKSA6IF9leHRlbmRzKHt9LCB0bywge1xuICAgICAgcGF0aG5hbWU6IGdlbmVyYXRlUGF0aCh0by5wYXRobmFtZSwgY29tcHV0ZWRNYXRjaC5wYXJhbXMpXG4gICAgfSkgOiB0byk7IC8vIFdoZW4gcmVuZGVyaW5nIGluIGEgc3RhdGljIGNvbnRleHQsXG4gICAgLy8gc2V0IHRoZSBuZXcgbG9jYXRpb24gaW1tZWRpYXRlbHkuXG5cbiAgICBpZiAoc3RhdGljQ29udGV4dCkge1xuICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpZmVjeWNsZSwge1xuICAgICAgb25Nb3VudDogZnVuY3Rpb24gb25Nb3VudCgpIHtcbiAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIH0sXG4gICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoc2VsZiwgcHJldlByb3BzKSB7XG4gICAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwcmV2UHJvcHMudG8pO1xuXG4gICAgICAgIGlmICghbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICAgICAgICBrZXk6IHByZXZMb2NhdGlvbi5rZXlcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvOiB0b1xuICAgIH0pO1xuICB9KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gICAgcHVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZnJvbTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0bzogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLmlzUmVxdWlyZWRcbiAgfTtcbn1cblxudmFyIGNhY2hlJDEgPSB7fTtcbnZhciBjYWNoZUxpbWl0JDEgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50JDEgPSAwO1xuXG5mdW5jdGlvbiBjb21waWxlUGF0aCQxKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJcIiArIG9wdGlvbnMuZW5kICsgb3B0aW9ucy5zdHJpY3QgKyBvcHRpb25zLnNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhDYWNoZSA9IGNhY2hlJDFbY2FjaGVLZXldIHx8IChjYWNoZSQxW2NhY2hlS2V5XSA9IHt9KTtcbiAgaWYgKHBhdGhDYWNoZVtwYXRoXSkgcmV0dXJuIHBhdGhDYWNoZVtwYXRoXTtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHJlZ2V4cCA9IHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICByZWdleHA6IHJlZ2V4cCxcbiAgICBrZXlzOiBrZXlzXG4gIH07XG5cbiAgaWYgKGNhY2hlQ291bnQkMSA8IGNhY2hlTGltaXQkMSkge1xuICAgIHBhdGhDYWNoZVtwYXRoXSA9IHJlc3VsdDtcbiAgICBjYWNoZUNvdW50JDErKztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgVVJMIHBhdGhuYW1lIHRvIGEgcGF0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoUGF0aChwYXRobmFtZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSBvcHRpb25zID0ge1xuICAgIHBhdGg6IG9wdGlvbnNcbiAgfTtcbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBhdGggPSBfb3B0aW9ucy5wYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0LFxuICAgICAgX29wdGlvbnMkc2Vuc2l0aXZlID0gX29wdGlvbnMuc2Vuc2l0aXZlLFxuICAgICAgc2Vuc2l0aXZlID0gX29wdGlvbnMkc2Vuc2l0aXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhzID0gW10uY29uY2F0KHBhdGgpO1xuICByZXR1cm4gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAobWF0Y2hlZCkgcmV0dXJuIG1hdGNoZWQ7XG5cbiAgICB2YXIgX2NvbXBpbGVQYXRoID0gY29tcGlsZVBhdGgkMShwYXRoLCB7XG4gICAgICBlbmQ6IGV4YWN0LFxuICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICBzZW5zaXRpdmU6IHNlbnNpdGl2ZVxuICAgIH0pLFxuICAgICAgICByZWdleHAgPSBfY29tcGlsZVBhdGgucmVnZXhwLFxuICAgICAgICBrZXlzID0gX2NvbXBpbGVQYXRoLmtleXM7XG5cbiAgICB2YXIgbWF0Y2ggPSByZWdleHAuZXhlYyhwYXRobmFtZSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHVybCA9IG1hdGNoWzBdLFxuICAgICAgICB2YWx1ZXMgPSBtYXRjaC5zbGljZSgxKTtcbiAgICB2YXIgaXNFeGFjdCA9IHBhdGhuYW1lID09PSB1cmw7XG4gICAgaWYgKGV4YWN0ICYmICFpc0V4YWN0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIC8vIHRoZSBwYXRoIHVzZWQgdG8gbWF0Y2hcbiAgICAgIHVybDogcGF0aCA9PT0gXCIvXCIgJiYgdXJsID09PSBcIlwiID8gXCIvXCIgOiB1cmwsXG4gICAgICAvLyB0aGUgbWF0Y2hlZCBwb3J0aW9uIG9mIHRoZSBVUkxcbiAgICAgIGlzRXhhY3Q6IGlzRXhhY3QsXG4gICAgICAvLyB3aGV0aGVyIG9yIG5vdCB3ZSBtYXRjaGVkIGV4YWN0bHlcbiAgICAgIHBhcmFtczoga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSwgaW5kZXgpIHtcbiAgICAgICAgbWVtb1trZXkubmFtZV0gPSB2YWx1ZXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgIH0sIHt9KVxuICAgIH07XG4gIH0sIG51bGwpO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA9PT0gMDtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG5cbnZhciBSb3V0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZT4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQkJDEubG9jYXRpb247XG4gICAgICB2YXIgbWF0Y2ggPSBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoID8gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCAvLyA8U3dpdGNoPiBhbHJlYWR5IGNvbXB1dGVkIHRoZSBtYXRjaCBmb3IgdXNcbiAgICAgIDogX3RoaXMucHJvcHMucGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX3RoaXMucHJvcHMpIDogY29udGV4dCQkMS5tYXRjaDtcblxuICAgICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIGNvbnRleHQkJDEsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogbWF0Y2hcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNvbXBvbmVudCA9IF90aGlzJHByb3BzLmNvbXBvbmVudCxcbiAgICAgICAgICByZW5kZXIgPSBfdGhpcyRwcm9wcy5yZW5kZXI7IC8vIFByZWFjdCB1c2VzIGFuIGVtcHR5IGFycmF5IGFzIGNoaWxkcmVuIGJ5XG4gICAgICAvLyBkZWZhdWx0LCBzbyB1c2UgbnVsbCBpZiB0aGF0J3MgdGhlIGNhc2UuXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbihwcm9wcyk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IF90aGlzLnByb3BzLnBhdGg7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCBcIllvdSByZXR1cm5lZCBgdW5kZWZpbmVkYCBmcm9tIHRoZSBgY2hpbGRyZW5gIGZ1bmN0aW9uIG9mIFwiICsgKFwiPFJvdXRlXCIgKyAocGF0aCA/IFwiIHBhdGg9XFxcIlwiICsgcGF0aCArIFwiXFxcIlwiIDogXCJcIikgKyBcIj4sIGJ1dCB5b3UgXCIpICsgXCJzaG91bGQgaGF2ZSByZXR1cm5lZCBhIFJlYWN0IGVsZW1lbnQgb3IgYG51bGxgXCIpIDogdm9pZCAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIHZhbHVlOiBwcm9wc1xuICAgICAgfSwgY2hpbGRyZW4gJiYgIWlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikgPyBjaGlsZHJlbiA6IHByb3BzLm1hdGNoID8gY29tcG9uZW50ID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKSA6IHJlbmRlciA/IHJlbmRlcihwcm9wcykgOiBudWxsIDogbnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY29tcG9uZW50OiBmdW5jdGlvbiBjb21wb25lbnQocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICYmICFpc1ZhbGlkRWxlbWVudFR5cGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wICdjb21wb25lbnQnIHN1cHBsaWVkIHRvICdSb3V0ZSc6IHRoZSBwcm9wIGlzIG5vdCBhIHZhbGlkIFJlYWN0IGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwYXRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuICAgIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2Vuc2l0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5jb21wb25lbnQpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNvbXBvbmVudD4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgcmVuZGVyPiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgcmVuZGVyPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIiA/IHBhdGggOiBcIi9cIiArIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKSArIGxvY2F0aW9uLnBhdGhuYW1lXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoYmFzZS5sZW5ndGgpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXRpY0hhbmRsZXIobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3UgY2Fubm90ICVzIHdpdGggPFN0YXRpY1JvdXRlcj5cIiwgbWV0aG9kTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxuICogVGhlIHB1YmxpYyB0b3AtbGV2ZWwgQVBJIGZvciBhIFwic3RhdGljXCIgPFJvdXRlcj4sIHNvLWNhbGxlZCBiZWNhdXNlIGl0XG4gKiBjYW4ndCBhY3R1YWxseSBjaGFuZ2UgdGhlIGN1cnJlbnQgbG9jYXRpb24uIEluc3RlYWQsIGl0IGp1c3QgcmVjb3Jkc1xuICogbG9jYXRpb24gY2hhbmdlcyBpbiBhIGNvbnRleHQgb2JqZWN0LiBVc2VmdWwgbWFpbmx5IGluIHRlc3RpbmcgYW5kXG4gKiBzZXJ2ZXItcmVuZGVyaW5nIHNjZW5hcmlvcy5cbiAqL1xuXG5cbnZhciBTdGF0aWNSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoU3RhdGljUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTdGF0aWNSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfdGhpcy5oYW5kbGVQdXNoID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJQVVNIXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVSZXBsYWNlID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJSRVBMQUNFXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVMaXN0ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFN0YXRpY1JvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm5hdmlnYXRlVG8gPSBmdW5jdGlvbiBuYXZpZ2F0ZVRvKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICB2YXIgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wcyRiYXNlbmFtZSA9IF90aGlzJHByb3BzLmJhc2VuYW1lLFxuICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzJGNvbnRleHQgPSBfdGhpcyRwcm9wcy5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wcyRjb250ZXh0O1xuICAgIGNvbnRleHQuYWN0aW9uID0gYWN0aW9uO1xuICAgIGNvbnRleHQubG9jYXRpb24gPSBhZGRCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKTtcbiAgICBjb250ZXh0LnVybCA9IGNyZWF0ZVVSTChjb250ZXh0LmxvY2F0aW9uKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMyJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMyJGJhc2VuYW1lLFxuICAgICAgICBfdGhpcyRwcm9wczIkY29udGV4dCA9IF90aGlzJHByb3BzMi5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMyJGNvbnRleHQgPT09IHZvaWQgMCA/IHt9IDogX3RoaXMkcHJvcHMyJGNvbnRleHQsXG4gICAgICAgIF90aGlzJHByb3BzMiRsb2NhdGlvbiA9IF90aGlzJHByb3BzMi5sb2NhdGlvbixcbiAgICAgICAgbG9jYXRpb24gPSBfdGhpcyRwcm9wczIkbG9jYXRpb24gPT09IHZvaWQgMCA/IFwiL1wiIDogX3RoaXMkcHJvcHMyJGxvY2F0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMyLCBbXCJiYXNlbmFtZVwiLCBcImNvbnRleHRcIiwgXCJsb2NhdGlvblwiXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IHtcbiAgICAgIGNyZWF0ZUhyZWY6IGZ1bmN0aW9uIGNyZWF0ZUhyZWYocGF0aCkge1xuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lICsgY3JlYXRlVVJMKHBhdGgpKTtcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IFwiUE9QXCIsXG4gICAgICBsb2NhdGlvbjogc3RyaXBCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKSxcbiAgICAgIHB1c2g6IHRoaXMuaGFuZGxlUHVzaCxcbiAgICAgIHJlcGxhY2U6IHRoaXMuaGFuZGxlUmVwbGFjZSxcbiAgICAgIGdvOiBzdGF0aWNIYW5kbGVyKFwiZ29cIiksXG4gICAgICBnb0JhY2s6IHN0YXRpY0hhbmRsZXIoXCJnb0JhY2tcIiksXG4gICAgICBnb0ZvcndhcmQ6IHN0YXRpY0hhbmRsZXIoXCJnb0ZvcndhcmRcIiksXG4gICAgICBsaXN0ZW46IHRoaXMuaGFuZGxlTGlzdGVuLFxuICAgICAgYmxvY2s6IHRoaXMuaGFuZGxlQmxvY2tcbiAgICB9O1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgIGhpc3Rvcnk6IGhpc3RvcnksXG4gICAgICBzdGF0aWNDb250ZXh0OiBjb250ZXh0XG4gICAgfSkpO1xuICB9O1xuXG4gIHJldHVybiBTdGF0aWNSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3RhdGljUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSlcbiAgfTtcblxuICBTdGF0aWNSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8U3RhdGljUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgU3RhdGljUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyB0aGUgZmlyc3QgPFJvdXRlPiB0aGF0IG1hdGNoZXMuXG4gKi9cblxudmFyIFN3aXRjaCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTd2l0Y2gsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN3aXRjaCgpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3dpdGNoLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxTd2l0Y2g+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JCQxLmxvY2F0aW9uO1xuICAgICAgdmFyIGVsZW1lbnQsIG1hdGNoOyAvLyBXZSB1c2UgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCBpbnN0ZWFkIG9mIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoKS5maW5kKClcbiAgICAgIC8vIGhlcmUgYmVjYXVzZSB0b0FycmF5IGFkZHMga2V5cyB0byBhbGwgY2hpbGQgZWxlbWVudHMgYW5kIHdlIGRvIG5vdCB3YW50XG4gICAgICAvLyB0byB0cmlnZ2VyIGFuIHVubW91bnQvcmVtb3VudCBmb3IgdHdvIDxSb3V0ZT5zIHRoYXQgcmVuZGVyIHRoZSBzYW1lXG4gICAgICAvLyBjb21wb25lbnQgYXQgZGlmZmVyZW50IFVSTHMuXG5cbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goX3RoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAobWF0Y2ggPT0gbnVsbCAmJiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICBlbGVtZW50ID0gY2hpbGQ7XG4gICAgICAgICAgdmFyIHBhdGggPSBjaGlsZC5wcm9wcy5wYXRoIHx8IGNoaWxkLnByb3BzLmZyb207XG4gICAgICAgICAgbWF0Y2ggPSBwYXRoID8gbWF0Y2hQYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBfZXh0ZW5kcyh7fSwgY2hpbGQucHJvcHMsIHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgICB9KSkgOiBjb250ZXh0JCQxLm1hdGNoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaCA/IFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgY29tcHV0ZWRNYXRjaDogbWF0Y2hcbiAgICAgIH0pIDogbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3dpdGNoO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgU3dpdGNoLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISghdGhpcy5wcm9wcy5sb2NhdGlvbiAmJiBwcmV2UHJvcHMubG9jYXRpb24pLCAnPFN3aXRjaD4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBwcm92aWRlZCBhIFwibG9jYXRpb25cIiBwcm9wIGluaXRpYWxseSBidXQgb21pdHRlZCBpdCBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIEEgcHVibGljIGhpZ2hlci1vcmRlciBjb21wb25lbnQgdG8gYWNjZXNzIHRoZSBpbXBlcmF0aXZlIEFQSVxuICovXG5cbmZ1bmN0aW9uIHdpdGhSb3V0ZXIoQ29tcG9uZW50KSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IFwid2l0aFJvdXRlcihcIiArIChDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUpICsgXCIpXCI7XG5cbiAgdmFyIEMgPSBmdW5jdGlvbiBDKHByb3BzKSB7XG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnRSZWYgPSBwcm9wcy53cmFwcGVkQ29tcG9uZW50UmVmLFxuICAgICAgICByZW1haW5pbmdQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHByb3BzLCBbXCJ3cmFwcGVkQ29tcG9uZW50UmVmXCJdKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFwiICsgZGlzcGxheU5hbWUgKyBcIiAvPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVtYWluaW5nUHJvcHMsIGNvbnRleHQkJDEsIHtcbiAgICAgICAgcmVmOiB3cmFwcGVkQ29tcG9uZW50UmVmXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICBDLldyYXBwZWRDb21wb25lbnQgPSBDb21wb25lbnQ7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIEMucHJvcFR5cGVzID0ge1xuICAgICAgd3JhcHBlZENvbXBvbmVudFJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5vYmplY3RdKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9pc3RTdGF0aWNzKEMsIENvbXBvbmVudCk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgZ2xvYmFsID0gd2luZG93O1xuICAgIHZhciBrZXkgPSBcIl9fcmVhY3Rfcm91dGVyX2J1aWxkX19cIjtcbiAgICB2YXIgYnVpbGROYW1lcyA9IHtcbiAgICAgIGNqczogXCJDb21tb25KU1wiLFxuICAgICAgZXNtOiBcIkVTIG1vZHVsZXNcIixcbiAgICAgIHVtZDogXCJVTURcIlxuICAgIH07XG5cbiAgICBpZiAoZ2xvYmFsW2tleV0gJiYgZ2xvYmFsW2tleV0gIT09IFwiZXNtXCIpIHtcbiAgICAgIHZhciBpbml0aWFsQnVpbGROYW1lID0gYnVpbGROYW1lc1tnbG9iYWxba2V5XV07XG4gICAgICB2YXIgc2Vjb25kYXJ5QnVpbGROYW1lID0gYnVpbGROYW1lc1tcImVzbVwiXTsgLy8gVE9ETzogQWRkIGxpbmsgdG8gYXJ0aWNsZSB0aGF0IGV4cGxhaW5zIGluIGRldGFpbCBob3cgdG8gYXZvaWRcbiAgICAgIC8vIGxvYWRpbmcgMiBkaWZmZXJlbnQgYnVpbGRzLlxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlIGxvYWRpbmcgdGhlIFwiICsgc2Vjb25kYXJ5QnVpbGROYW1lICsgXCIgYnVpbGQgb2YgUmVhY3QgUm91dGVyIFwiICsgKFwib24gYSBwYWdlIHRoYXQgaXMgYWxyZWFkeSBydW5uaW5nIHRoZSBcIiArIGluaXRpYWxCdWlsZE5hbWUgKyBcIiBcIikgKyBcImJ1aWxkLCBzbyB0aGluZ3Mgd29uJ3Qgd29yayByaWdodC5cIik7XG4gICAgfVxuXG4gICAgZ2xvYmFsW2tleV0gPSBcImVzbVwiO1xuICB9XG59XG5cbmV4cG9ydCB7IE1lbW9yeVJvdXRlciwgUHJvbXB0LCBSZWRpcmVjdCwgUm91dGUsIFJvdXRlciwgU3RhdGljUm91dGVyLCBTd2l0Y2gsIGdlbmVyYXRlUGF0aCwgbWF0Y2hQYXRoLCB3aXRoUm91dGVyLCBjb250ZXh0IGFzIF9fUm91dGVyQ29udGV4dCB9O1xuIiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlciwgX19Sb3V0ZXJDb250ZXh0LCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuZXhwb3J0ICogZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgY3JlYXRlTG9jYXRpb24gfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIEhUTUw1IGhpc3RvcnkuXG4gKi9cblxudmFyIEJyb3dzZXJSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoQnJvd3NlclJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQnJvd3NlclJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBCcm93c2VyUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQnJvd3NlclJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBCcm93c2VyUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9yY2VSZWZyZXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXJcbiAgfTtcblxuICBCcm93c2VyUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPEJyb3dzZXJSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIHdpbmRvdy5sb2NhdGlvbi5oYXNoLlxuICovXG5cbnZhciBIYXNoUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEhhc2hSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEhhc2hSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSGFzaFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEhhc2hSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgSGFzaFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhc2hUeXBlOiBQcm9wVHlwZXMub25lT2YoW1wiaGFzaGJhbmdcIiwgXCJub3NsYXNoXCIsIFwic2xhc2hcIl0pXG4gIH07XG5cbiAgSGFzaFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxIYXNoUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgSGFzaFJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIGEgaGlzdG9yeS1hd2FyZSA8YT4uXG4gKi9cblxuXG52YXIgTGluayA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaW5rKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaW5rLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCwgaGlzdG9yeSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuXG4gICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBpZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgICAhdGhpcy5wcm9wcy50YXJnZXQgfHwgdGhpcy5wcm9wcy50YXJnZXQgPT09IFwiX3NlbGZcIikgJiYgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAhaXNNb2RpZmllZEV2ZW50KGV2ZW50KSAvLyBpZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wcm9wcy5yZXBsYWNlID8gaGlzdG9yeS5yZXBsYWNlIDogaGlzdG9yeS5wdXNoO1xuICAgICAgICBtZXRob2QodGhpcy5wcm9wcy50byk7XG4gICAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgaW5uZXJSZWYgPSBfdGhpcyRwcm9wcy5pbm5lclJlZixcbiAgICAgICAgcmVwbGFjZSA9IF90aGlzJHByb3BzLnJlcGxhY2UsXG4gICAgICAgIHRvID0gX3RoaXMkcHJvcHMudG8sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wcywgW1wiaW5uZXJSZWZcIiwgXCJyZXBsYWNlXCIsIFwidG9cIl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGNyZWF0ZUxvY2F0aW9uKHRvLCBudWxsLCBudWxsLCBjb250ZXh0LmxvY2F0aW9uKSA6IHRvO1xuICAgICAgdmFyIGhyZWYgPSBsb2NhdGlvbiA/IGNvbnRleHQuaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKSA6IFwiXCI7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVDbGljayhldmVudCwgY29udGV4dC5oaXN0b3J5KTtcbiAgICAgICAgfSxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgcmVmOiBpbm5lclJlZlxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBMaW5rO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciB0b1R5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSk7XG4gIHZhciBpbm5lclJlZlR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBjdXJyZW50OiBQcm9wVHlwZXMuYW55XG4gIH0pXSk7XG4gIExpbmsucHJvcFR5cGVzID0ge1xuICAgIGlubmVyUmVmOiBpbm5lclJlZlR5cGUsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVwbGFjZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvOiB0b1R5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBqb2luQ2xhc3NuYW1lcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzbmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2xhc3NuYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc25hbWVzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5qb2luKFwiIFwiKTtcbn1cbi8qKlxuICogQSA8TGluaz4gd3JhcHBlciB0aGF0IGtub3dzIGlmIGl0J3MgXCJhY3RpdmVcIiBvciBub3QuXG4gKi9cblxuXG5mdW5jdGlvbiBOYXZMaW5rKF9yZWYpIHtcbiAgdmFyIF9yZWYkYXJpYUN1cnJlbnQgPSBfcmVmW1wiYXJpYS1jdXJyZW50XCJdLFxuICAgICAgYXJpYUN1cnJlbnQgPSBfcmVmJGFyaWFDdXJyZW50ID09PSB2b2lkIDAgPyBcInBhZ2VcIiA6IF9yZWYkYXJpYUN1cnJlbnQsXG4gICAgICBfcmVmJGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYuYWN0aXZlQ2xhc3NOYW1lLFxuICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3JlZiRhY3RpdmVDbGFzc05hbWUgPT09IHZvaWQgMCA/IFwiYWN0aXZlXCIgOiBfcmVmJGFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZVN0eWxlID0gX3JlZi5hY3RpdmVTdHlsZSxcbiAgICAgIGNsYXNzTmFtZVByb3AgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGV4YWN0ID0gX3JlZi5leGFjdCxcbiAgICAgIGlzQWN0aXZlUHJvcCA9IF9yZWYuaXNBY3RpdmUsXG4gICAgICBsb2NhdGlvblByb3AgPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgc3RyaWN0ID0gX3JlZi5zdHJpY3QsXG4gICAgICBzdHlsZVByb3AgPSBfcmVmLnN0eWxlLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImFyaWEtY3VycmVudFwiLCBcImFjdGl2ZUNsYXNzTmFtZVwiLCBcImFjdGl2ZVN0eWxlXCIsIFwiY2xhc3NOYW1lXCIsIFwiZXhhY3RcIiwgXCJpc0FjdGl2ZVwiLCBcImxvY2F0aW9uXCIsIFwic3RyaWN0XCIsIFwic3R5bGVcIiwgXCJ0b1wiXSk7XG5cbiAgdmFyIHBhdGggPSB0eXBlb2YgdG8gPT09IFwib2JqZWN0XCIgPyB0by5wYXRobmFtZSA6IHRvOyAvLyBSZWdleCB0YWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vcGlsbGFyanMvcGF0aC10by1yZWdleHAvYmxvYi9tYXN0ZXIvaW5kZXguanMjTDIwMlxuXG4gIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPE5hdkxpbms+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHBhdGhUb01hdGNoID0gbG9jYXRpb25Qcm9wID8gbG9jYXRpb25Qcm9wLnBhdGhuYW1lIDogY29udGV4dC5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgbWF0Y2ggPSBlc2NhcGVkUGF0aCA/IG1hdGNoUGF0aChwYXRoVG9NYXRjaCwge1xuICAgICAgcGF0aDogZXNjYXBlZFBhdGgsXG4gICAgICBleGFjdDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdFxuICAgIH0pIDogbnVsbDtcbiAgICB2YXIgaXNBY3RpdmUgPSAhIShpc0FjdGl2ZVByb3AgPyBpc0FjdGl2ZVByb3AobWF0Y2gsIGNvbnRleHQubG9jYXRpb24pIDogbWF0Y2gpO1xuICAgIHZhciBjbGFzc05hbWUgPSBpc0FjdGl2ZSA/IGpvaW5DbGFzc25hbWVzKGNsYXNzTmFtZVByb3AsIGFjdGl2ZUNsYXNzTmFtZSkgOiBjbGFzc05hbWVQcm9wO1xuICAgIHZhciBzdHlsZSA9IGlzQWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlUHJvcCwgYWN0aXZlU3R5bGUpIDogc3R5bGVQcm9wO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIF9leHRlbmRzKHtcbiAgICAgIFwiYXJpYS1jdXJyZW50XCI6IGlzQWN0aXZlICYmIGFyaWFDdXJyZW50IHx8IG51bGwsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHRvOiB0b1xuICAgIH0sIHJlc3QpKTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIGFyaWFDdXJyZW50VHlwZSA9IFByb3BUeXBlcy5vbmVPZihbXCJwYWdlXCIsIFwic3RlcFwiLCBcImxvY2F0aW9uXCIsIFwiZGF0ZVwiLCBcInRpbWVcIiwgXCJ0cnVlXCJdKTtcbiAgTmF2TGluay5wcm9wVHlwZXMgPSBfZXh0ZW5kcyh7fSwgTGluay5wcm9wVHlwZXMsIHtcbiAgICBcImFyaWEtY3VycmVudFwiOiBhcmlhQ3VycmVudFR5cGUsXG4gICAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIExpbmssIE5hdkxpbmsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZW1haWxSZWdleCA9IC9bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8vXG5jb25zdCBwYXNzd29yZFJlZ2V4ID0gLygoPz0uKlxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbXFxXXSkuezgsNjR9KS9nXG5jb25zdCBtZXNzYWdlUmVnZXggPS9kZi9nXG5jb25zdCBlbWFpbFJlcXVpcmVtZW50cyA9IFwid3JvbmcgZW1haWwgZm9ybWF0XCJcbmNvbnN0IHBhc3Nwb3J0UmVxdWlyZW1lbnRzID0gXCJFbnN1cmUgdGhhdCBwYXNzd29yZCBpcyA4IHRvIDY0IGNoYXJhY3RlcnMgbG9uZyBhbmQgY29udGFpbnMgYSBtaXggb2YgdXBwZXIgYW5kIGxvd2VyIGNhc2UgY2hhcmFjdGVycywgb25lIG51bWVyaWMgYW5kIG9uZSBzcGVjaWFsIGNoYXJhY3RlclwiXG5cbmNvbnN0IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgZW1haWw6IHsgaXNWYWxpZDogdHJ1ZSwgbWVzc2FnZTogXCJcIiB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIGlzVmFsaWQ6IHRydWUsIG1lc3NhZ2U6IFwiXCJcbiAgICB9XG59XG5cbmNvbnN0IGlzVmFsaWQgPSAoeyBlbWFpbCA9IHVuZGVmaW5lZCwgcGFzc3dvcmQgPSB1bmRlZmluZWQsIG1lc3NhZ2U9IHVuZGVmaW5lZCB9KSA9PiB7XG4gICAgbGV0IGVtYWlsVmFsaWRhdGlvbiA9IHRydWVcbiAgICBsZXQgcGFzc3dvcmRWYWxpZGF0aW9uID0gdHJ1ZVxuICAgIGlmIChlbWFpbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVtYWlsVmFsaWRhdGlvbiA9IGVtYWlsUmVnZXgudGVzdChlbWFpbCkgPyB7IGlzVmFsaWQ6IHRydWUgfSA6IHsgaXNWYWxpZDogZmFsc2UsIG1lc3NhZ2U6IGVtYWlsUmVxdWlyZW1lbnRzIH1cbiAgICB9XG4gICAgaWYgKHBhc3N3b3JkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFzc3dvcmRWYWxpZGF0aW9uID0gcGFzc3dvcmRSZWdleC50ZXN0KHBhc3N3b3JkKSA/IHsgaXNWYWxpZDogdHJ1ZSB9IDogeyBpc1ZhbGlkOiBmYWxzZSwgbWVzc2FnZTogcGFzc3BvcnRSZXF1aXJlbWVudHMgfVxuICAgIH1cbiAgICBpZihtZXNzYWdlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBtZXNzYWdlVmFsaWRhdGlvbiA9IFwiXCJcbiAgICB9XG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHsgZW1haWw6IGVtYWlsVmFsaWRhdGlvbiwgcGFzc3dvcmQ6IHBhc3N3b3JkVmFsaWRhdGlvbiB9XG4gICAgcmV0dXJuIChzZWxmKSA9PiB7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLnZhbGlkYXRpb25SZXN1bHQgfSB9KVxuICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdC5lbWFpbC5pc1ZhbGlkICYmIHZhbGlkYXRpb25SZXN1bHQucGFzc3dvcmQuaXNWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbi8vZXhwb3J0IGRlZmF1bHQgaXNWYWxpZFxuZXhwb3J0IHtcbiAgICBpbml0aWFsVmFsaWRhdGlvblN0YXRlLFxuICAgIGlzVmFsaWRcbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmXG4gICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgLy8gT25seSBOb2RlLkpTIGhhcyBhIHByb2Nlc3MgdmFyaWFibGUgdGhhdCBpcyBvZiBbW0NsYXNzXV0gcHJvY2Vzc1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdXRpbHMuZm9yRWFjaChbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXSwgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJyxcbiAgICAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJyxcbiAgICAnc29ja2V0UGF0aCdcbiAgXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QgPyBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAnZ2V0JztcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2lzVmFsaWQsaW5pdGlhbFZhbGlkYXRpb25TdGF0ZX0gZnJvbSAnQGF1dGhqcy92YWxpZGF0aW9uJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuZXhwb3J0IGNvbnN0IEVtYWlsUGFzc3dvcmRDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpXG5cblxuXG5jbGFzcyBFbWFpbFBhc3N3b3JkUHJvdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRlID0geyBsb2FkaW5nOiBmYWxzZSwgdG9rZW46IFwiXCIsIGlzTG9nZ2VkSW46IGZhbHNlLCBlbWFpbDogXCJcIiwgcGFzc3dvcmQ6IFwiXCIsIGNvbmZpcm06IFwiXCIsIHNlcnZlckVycm9yOiBcIlwiLCB2YWxpZGF0aW9uOiBpbml0aWFsVmFsaWRhdGlvblN0YXRlIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ2dlZEluKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgc2V0VG9rZW4gPSAoeyB0b2tlbiB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2tlbiB9KVxuICAgIH1cbiAgICBvbkNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiB2YWx1ZSB9KVxuICAgICAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgfVxuICAgIHJlc2V0VmFsaWRhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfSlcbiAgICB9XG4gICAgcmVjb3ZlclBhc3N3b3JkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGVtYWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAvLyAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHZhbGlkYXRlKHsgZW1haWwgfSlcbiAgICAgIC8vICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsfSkodGhpcykpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9yZWNvdmVyJywgeyBlbWFpbCB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZGF0aW9uLmVtYWlsLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHBhc3N3b3JkLCB0b2tlbiB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoaXNWYWxpZCh7cGFzc3dvcmR9KSh0aGlzKSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2NoYW5nZScsIHsgcGFzc3dvcmQsIHRva2VuIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiBkYXRhLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpZ251cCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsLHBhc3N3b3JkfSkodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL3NpZ251cCcsIHsgZW1haWwsIHBhc3N3b3JkIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgICAgIC8vU2VydmVyIHNpZGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0sbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IHRydWUsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oZGF0YS50b2tlbik7IC8vIFNldHRpbmcgdGhlIHRva2VuIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbm90IHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG59XG5cbiAgICBsb2dpbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgaWYgKGlzVmFsaWQoe2VtYWlsLHBhc3N3b3JkfSkodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgdmFsaWQgLS0tLS0tXCIsIGVtYWlsLHBhc3N3b3JkKVxuICAgICAgICAvLyBHZXQgYSB0b2tlbiBmcm9tIGFwaSBzZXJ2ZXIgdXNpbmcgdGhlIGZldGNoIGFwaVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9sb2ctaW4nLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJheGlvcyByZXNwb25zZVwiLCByZXNwb25zZSlcbiAgICAgICAgICAgIC8vU2VydmVyIHNpZGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgaWYgKGRhdGEudG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlLGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oZGF0YS50b2tlbik7IC8vIFNldHRpbmcgdGhlIHRva2VuIGluIGxvY2FsU3RvcmFnZVxuXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckVycm9yOiBlcnJvcixsb2FkaW5nOmZhbHNlIH0pXG4gICAgICAgIH0pXG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbm90IHZhbGlkIC0tLS0tLVwiLCBlbWFpbCxwYXNzd29yZClcbiAgICB9XG4gICAgfVxuICAgIGxvZ2dlZEluID0gKCkgPT4ge1xuICAgICAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgYSBzYXZlZCB0b2tlbiBhbmQgaXQncyBzdGlsbCB2YWxpZFxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTsgLy8gR2V0dGluZyB0b2tlbiBmcm9tIGxvY2Fsc3RvcmFnZVxuICAgICAgICByZXR1cm4gISF0b2tlbiAmJiAhdGhpcy5pc1Rva2VuRXhwaXJlZCh0b2tlbik7IC8vIGhhbmR3YWl2aW5nIGhlcmVcbiAgICB9O1xuXG4gICAgaXNUb2tlbkV4cGlyZWQgPSB0b2tlbiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlKHRva2VuKTtcbiAgICAgICAgICAgIGlmIChkZWNvZGVkLmV4cCA8IERhdGUubm93KCkgLyAxMDAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdG9rZW4gaXMgZXhwaXJlZC5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNldFRva2VuID0gaWRUb2tlbiA9PiB7XG4gICAgICAgIC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRfdG9rZW5cIiwgaWRUb2tlbik7XG4gICAgfTtcblxuICAgIGdldFRva2VuID0gKCkgPT4ge1xuICAgICAgICAvLyBSZXRyaWV2ZXMgdGhlIHVzZXIgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IGZhbHNlLCB1c2VybmFtZTogXCJcIiwgZXJyb3I6IFwiXCIsIG1lc3NhZ2U6IFwiXCIgfSlcbiAgICAgICAgLy8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGdldENvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgIC8vIFVzaW5nIGp3dC1kZWNvZGUgbnBtIHBhY2thZ2UgdG8gZGVjb2RlIHRoZSB0b2tlblxuICAgICAgICBsZXQgYW5zd2VyID0gZGVjb2RlKHRoaXMuZ2V0VG9rZW4oKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYW5zd2VyIVwiKTtcbiAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICB9O1xuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBpc0xvZ2dlZEluLCBlbWFpbCwgcGFzc3dvcmQsIHZhbGlkYXRpb24sIGNvbmZpcm0gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tcbiAgICAgICAgICAgIGxvZ2luOiB0aGlzLmxvZ2luLFxuICAgICAgICAgICAgaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGxvZ291dDogdGhpcy5sb2dvdXQsXG4gICAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgICAgc2lnbnVwOiB0aGlzLnNpZ251cCxcbiAgICAgICAgICAgIHJlc2V0UGFzc3dvcmQ6IHRoaXMucmVzZXRQYXNzd29yZCxcbiAgICAgICAgICAgIHJlY292ZXJQYXNzd29yZDogdGhpcy5yZWNvdmVyUGFzc3dvcmQsXG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgY29uZmlybSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgdmFsaWRhdGlvbixcbiAgICAgICAgICAgIHNldFRva2VuOiB0aGlzLnNldFRva2VuXG4gICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVtYWlsUGFzc3dvcmRQcm92aWRlciIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5jb25zdCBDdXN0b21JbnB1dCA9ICh7IHR5cGUsIHBsYWNlaG9sZGVyLCBuYW1lLCB2YWxpZGF0aW9uLCBvbkNoYW5nZSwgdmFsdWUsIGxhYmVsIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGxhYmVsIGZvcmh0bWw9XCJwYXNzd29yZFwiPntsYWJlbH06IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2Zvcm0tY29udHJvbCcsIHsgJ2lzLWludmFsaWQnOiAhdmFsaWRhdGlvbi5pc1ZhbGlkIH0pfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbHVlPXt2YWx1ZX0gbmFtZT17bmFtZX0gdHlwZT17dHlwZX0gcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludmFsaWQtZmVlZGJhY2tcIj5cbiAgICAgICAgICAgIHt2YWxpZGF0aW9uLm1lc3NhZ2V9PC9kaXY+XG4gICAgPC9kaXY+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21JbnB1dCIsIlxuXG5cblxuXG5cblxuXG5jb25zdCBBc3luY0J1dHRvbiA9ICh7IHRpdGxlLCBsb2FkaW5nLCBvbkNsaWNrLCBkaXNhYmxlZCB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIn19PlxuICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIsIG1hcmdpblRvcDozLCBtYXJnaW5Cb3R0b206MyB9fSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBvbkNsaWNrPXtvbkNsaWNrfSBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgbG9hZGluZ30+e2xvYWRpbmcgPzxkaXY+PFByb2dyZXNzTG9hZGVyLz48ZGl2IHN0eWxlPXt7b3BhY2l0eTowfX0+e3RpdGxlfTwvZGl2PjwvZGl2Pjo8ZGl2Pnt0aXRsZX08L2Rpdj59PC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3luY0J1dHRvblxuXG5jb25zdCBQcm9ncmVzc0NpcmNsZSA9ICh7IHNlbGVjdGVkIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIHBhZGRpbmc6IDMsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDUwLFxuICAgICAgICAgICAgbWFyZ2luTGVmdDogNCxcbiAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZWN0ZWQgPyBcIiMxYTIzN2VcIiA6IFwiIzlmYThkYVwiXG4gICAgICAgIH19PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuXG5cblxuY2xhc3MgUHJvZ3Jlc3NMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHNlbGVjdGVkOiAwXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAwIH0pXG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAxIH0pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogMiB9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiAwIH0pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAyMDApXG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICB3aWR0aDpcIjEwMCVcIixcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRvcDoyMCxcbiAgICAgICAgICAgICAgICBsZWZ0OjBcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0NpcmNsZSBzZWxlY3RlZD17c2VsZWN0ZWQgPT09IDB9IC8+XG4gICAgICAgICAgICAgICAgPFByb2dyZXNzQ2lyY2xlIHNlbGVjdGVkPXtzZWxlY3RlZCA9PT0gMX0gLz5cbiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3NDaXJjbGUgc2VsZWN0ZWQ9e3NlbGVjdGVkID09PSAyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9yZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5cbmltcG9ydCBCb290c3RyYXBBc3luY0J1dHRvbiBmcm9tICdAeGFmL2Jvb3RzdHJhcC1hc3luYy1idXR0b24nXG5jb25zdCBMb2dpbiA9KCk9PntcbiAgICByZXR1cm4gKDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgeyh7ZW1haWwscGFzc3dvcmQsbG9naW4sb25DaGFuZ2UsdmFsaWRhdGlvbixpc0xvZ2dlZEluLGxvYWRpbmd9KT0+e1xuICAgICAgICAgICAgaWYoIWlzTG9nZ2VkSW4pXG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5Mb2dpbjo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBJbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIlBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcEFzeW5jQnV0dG9uIHRpdGxlPVwiTG9naW5cIiBvbkNsaWNrPXtsb2dpbn0gbG9hZGluZz17bG9hZGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL3JlY292ZXJcIj5Gb3Jnb3QgUGFzc3dvcmQgITwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPVwiL1wiIC8+XG4gICAgICAgIH19XG4gICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj4pXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9naW4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvcmVhY3QnXG5pbXBvcnQge0Jvb3RzdHJhcElucHV0fSBmcm9tICdAeGFmL2Jvb3RzdHJhcC1pbnB1dCdcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuY29uc3QgU2lnblVwID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgb25DaGFuZ2UsIGVtYWlsLCBwYXNzd29yZCwgc2lnbnVwLGxvYWRpbmcsIHZhbGlkYXRpb24sIGlzTG9nZ2VkSW4gfSkgPT4ge1xuICAgICAgICAgIGlmKCFpc0xvZ2dlZEluKVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5TaWduIFVwOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwQXN5bmNCdXR0b24gdGl0bGU9XCJTaWduVXBcIiBvbkNsaWNrPXtzaWdudXB9IGxvYWRpbmc9e2xvYWRpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiA8UmVkaXJlY3QgdG89XCIvXCIgLz5cbiAgICAgICAgfX08L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lnblVwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuY29uc3QgUmVjb3ZlclBhc3N3b3JkID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxFbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj57KHsgZW1haWwsIG9uQ2hhbmdlLCB2YWxpZGF0aW9uLCByZWNvdmVyLGxvYWRpbmcgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5SZWNvdmVyIFBhc3N3b3JkOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9vdHN0cmFwSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIlJlY292ZXIgUGFzc3dvcmRcIiBvbkNsaWNrPXtyZWNvdmVyfSBsb2FkaW5nPXtsb2FkaW5nfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfX08L0VtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjb3ZlclBhc3N3b3JkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBJbnB1dH0gZnJvbSAnQHhhZi9ib290c3RyYXAtaW5wdXQnXG5pbXBvcnQgQm9vdHN0cmFwQXN5bmNCdXR0b24gZnJvbSAnQHhhZi9ib290c3RyYXAtYXN5bmMtYnV0dG9uJ1xuXG5jb25zdCBSZXNldFBhc3N3b3JkID0gKCkgPT4ge1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBwYXNzd29yZCwgY29uZmlybSwgcmVzZXRQYXNzd29yZCwgdmFsaWRhdGlvbixsb2FkaW5nIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+UmVzZXQgUGFzc3dvcmQ6PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiTmV3IFBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIk5ldyBQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb3RzdHJhcElucHV0IHBsYWNlaG9sZGVyPVwiQ29uZmlybSBQYXNzd29yZFwiIG5hbWU9XCJjb25maXJtXCIgdHlwZT1cInBhc3N3b3JkXCIgdmFsdWU9e2NvbmZpcm19IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiQ29uZmlybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCb290c3RyYXBBc3luY0J1dHRvbiB0aXRsZT1cIlJlc2V0IFBhc3N3b3JkXCIgb25DbGljaz17cmVzZXRQYXNzd29yZH0gbG9hZGluZz17bG9hZGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH19PC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc2V0UGFzc3dvcmQiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmNvbnN0IG1vbmdvQ29sbGVjdGlvbiA9ICh7Y29sbGVjdGlvbixkYn0pID0+IHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbmRPbmU6ICh7ZmlsdGVyfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImZpbmRPbmVcIiwgY29sbGVjdGlvbixkYiwgZmlsdGVyIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmluZDogKHtmaWx0ZXJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiZmluZFwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIgfSB9KVxuICAgICAgICB9LFxuICAgICAgICBpbnNlcnRPbmU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcImluc2VydE9uZVwiLCBjb2xsZWN0aW9uLGRiLCBkYXRhIH0gfSlcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlT25lOiAoe2ZpbHRlcixkYXRhfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zLnB1dChgL21vbmdvZGJgLCB7IHBhcmFtczogeyByZXFUeXBlOiBcInVwZGF0ZU9uZVwiLCBjb2xsZWN0aW9uLGRiLCBmaWx0ZXIsZGF0YSB9IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZU9uZTogKHtmaWx0ZXJ9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXhpb3MuZGVsZXRlKGAvbW9uZ29kYmAsIHsgcGFyYW1zOiB7IHJlcVR5cGU6IFwiZGVsZXRlT25lXCIsIGNvbGxlY3Rpb24sZGIsIGZpbHRlciB9IH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29Db2xsZWN0aW9uXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBtb25nb1JlYWN0IGZyb20gJy4vbW9uZ29kYi1jbGllbnQnXG5leHBvcnQgY29uc3QgTW9uZ29kYkNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KClcblxuXG5jbGFzcyBNb25nb2RiUHJvdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIFxuICAgICBzdGF0ZT17b2JqZWN0czpbXSxsb2FkaW5nOmZhbHNlfVxuICBcbiAgICBmaW5kT25lPSh7ZmlsdGVyfSk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmZpbmRPbmUoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lIHJlc3VsdFwiLCByZXN1bHQpXG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgdXNlcnM6IGRhdGEucmVzdWx0LGxvYWRpbmc6ZmFsc2UgfSlcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7c2VydmVyRXJyb3I6ZXJyb3IsbG9hZGluZzpmYWxzZX0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZmluZD0oKT0+e1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgbW9uZ29SZWFjdCh7IGNvbGxlY3Rpb24sIGRifSkuZmluZCh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmRlbGV0ZU9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLnVwZGF0ZU9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnNlcnRPbmU9KCk9PntcbiAgICAgICAgY29uc3Qge2NvbGxlY3Rpb24sZGJ9PSB0aGlzLnByb3BzXG4gICAgICAgIG1vbmdvUmVhY3QoeyBjb2xsZWN0aW9uLCBkYn0pLmluc2VydE9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRJbml0aWFsU3RhdGUgPSgpPT57XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2NoaWxkcmVufT0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4oPE1vbmdvQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e1xuICAgICAgICAgICAgICBzZXRJbml0aWFsU3RhdGU6dGhpcy5zZXRJbml0aWFsU3RhdGUsXG4gICAgICAgICAgICAgIGZpbmQ6dGhpcy5maW5kLFxuICAgICAgICAgICAgICBmaW5kT25lOnRoaXMuZmluZE9uZSxcbiAgICAgICAgICAgICAgdXBkYXRlT25lOnRoaXMudXBkYXRlT25lLFxuICAgICAgICAgICAgICBpbnNlcnRPbmU6dGhpcy5pbnNlcnRPbmUsXG4gICAgICAgICAgICAgIGRlbGV0ZU9uZTp0aGlzLmRlbGV0ZU9uZVxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L01vbmdvQ29udGV4dC5Qcm92aWRlcj4pXG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTW9uZ29kYlByb3ZpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgaW5pdGlhbFZhbGlkYXRpb25TdGF0ZSB9IGZyb20gJ0BhdXRoanMvdmFsaWRhdGlvbidcbmltcG9ydCBtb25nb0RiQ2xpZW50IGZyb20gJ0Btb25nb2RianMvcmVhY3QnXG5jbGFzcyBFZGl0b3JSZWFjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0ZSA9IHsgb2JqZWN0czogW10sIHNlcnZlckVycm9yOiBcIlwiLCBsb2FkaW5nOiBmYWxzZSwgc2VsZWN0ZWRPYmplY3Q6IG51bGwsIHZhbGlkYXRpb246IGluaXRpYWxWYWxpZGF0aW9uU3RhdGUgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgY29uc3Qge2luaXRpYWxTdGF0ZX09IHRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5fc2V0SW5pdGlhbFN0YXRlKHtpbml0aWFsU3RhdGV9KVxuICAgIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRWRpdG9yIFJlYWN0IG1vdW50ZWRcIilcbiAgICAgIHRoaXMuZmluZCgpXG4gIH1cbiAgICBfc2V0SW5pdGlhbFN0YXRlPSgpPT57XG4gICAgICAgY29uc3Qge2luaXRpYWxTdGF0ZX09IHRoaXMucHJvcHNcbiAgICAgICBpZihpbml0aWFsU3RhdGUgIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+KHsuLi5wcmV2U3RhdGUsLi4uaW5pdGlhbFN0YXRlfSkpXG4gICAgICAgfVxuICAgIH1cbiAgICBvbkNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWVcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkT2JqZWN0OiB7IFtuYW1lXTogdmFsdWUgfSB9KVxuICAgIH1cblxuICAgIGZpbmQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0ge31cbiAgICAgICAgbW9uZ29EYkNsaWVudCh7IGNvbGxlY3Rpb24sIGRiIH0pLmZpbmQoeyBmaWx0ZXIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3VsdFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9iamVjdHM6IGRhdGEucmVzdWx0LCBsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yLCBsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmaW5kT25lID0gKHsgaWQgfSkgPT4ge1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBfaWQ6IGlkIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lXCIsIGlkKVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGIgfSkuZmluZE9uZSh7IGZpbHRlciB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2VsZWN0T25lID0gKHsgX2lkIH0pID0+IHsgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZE9iamVjdDogdGhpcy5zdGF0ZS5vYmplY3RzLmZpbmQoKHUpID0+IHUuX2lkID09PSBfaWQpIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlT25lID0gKHsgaWQsIGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB7Y29sbGVjdGlvbixkYn09IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBfaWQ6IGlkIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kT25lXCIsIGlkKVxuICAgICAgICBtb25nb0RiQ2xpZW50KHsgY29sbGVjdGlvbiwgZGJ9KS5maW5kT25lKHsgZmlsdGVyIH0sIHsgZGF0YSB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzdWx0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmRPbmUgcmVzdWx0XCIsIHJlc3VsdClcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VyczogZGF0YS5yZXN1bHQsbG9hZGluZzpmYWxzZSB9KVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtzZXJ2ZXJFcnJvcjplcnJvcixsb2FkaW5nOmZhbHNlfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVPbmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtjb2xsZWN0aW9uLGRifT0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IF9pZCB9ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZE9iamVjdFxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IF9pZCB9XG4gICAgICAgIG1vbmdvRGJDbGllbnQoeyBjb2xsZWN0aW9uLCBkYiB9KS5kZWxldGVPbmUoeyBmaWx0ZXIgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiAoeyBvYmplY3RzOiBzdGF0ZS5vYmplY3RzLmZpbHRlcigodSkgPT4gdS5faWQgIT09IF9pZCkgfSkpXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZU9uZSByZXN1bHRcIiwgcmVzdWx0KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZU9uZSBlcnJvclwiLCBlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgIHZhbGlkYXRpb259ID0gdGhpcy5zdGF0ZVxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXRlLS0tXCIsdGhpcy5zdGF0ZSlcbiAgICAgICAgcmV0dXJuICg8ZGl2PntjaGlsZHJlbih7b25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOnsuLi50aGlzLnN0YXRlfSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T25lOnRoaXMuc2VsZWN0T25lLFxuICAgICAgICAgICAgICAgICAgICBmaW5kOiB0aGlzLmZpbmQsXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9uZTogXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlT25lLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPbmU6IHRoaXMudXBkYXRlT25lfSl9PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yUmVhY3RcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuXG5jb25zdCBDb25maXJtYXRpb25EaWFsb2cgPSh7ZGVjbGluZSxjb25maXJtLCBjaGlsZHJlbixtb2RhbElkfSk9PntcbiAgICAgICAgcmV0dXJuKDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD17bW9kYWxJZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPkNvbmZpcm1hdGlvbiBpcyBuZWVkZWQ8L2g1PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17ZGVjbGluZX0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjb25maXJtfSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5PazwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtYXRpb25EaWFsb2ciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5jb25zdCBFZGl0b3JEaWFsb2cgPSh7Y2hpbGRyZW4sIHNhdmUsY2FuY2VsLG1vZGFsSWR9KT0+e1xuICAgIHJldHVybig8ZGl2PlxuPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e21vZGFsSWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgIDxoNSBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj5Nb2RhbCB0aXRsZTwvaDU+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17Y2FuY2VsfT5DbG9zZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtzYXZlfT5TYXZlIGNoYW5nZXM8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuICAgIDwvZGl2Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yRGlhbG9nIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuY29uc3QgVGFibGVSZW5kZXIgPSAoeyBjb2xsZWN0aW9uPVtdLHNlbGVjdE9uZSwgaGVhZGVycz1bXSwgVGFibGUsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ29sdW1uLCBUYWJsZUZvb3RlciwgVGFibGVIZWFkZXIgfSkgPT4ge1xuICAgY29uc29sZS5sb2coXCJjb2xsZWN0aW9uLS0tXCIsY29sbGVjdGlvbilcbiAgIHJldHVybiAgKDxUYWJsZT5cbiAgICAgICAgICAgIHtUYWJsZUhlYWRlciAmJiA8VGFibGVIZWFkZXI+XG4gICAgICAgICAgICAgICAge2hlYWRlcnMubGVuZ3RoPT09MCAmJmNvbGxlY3Rpb24ubGVuZ3RoPjAgJiYgT2JqZWN0LmtleXMoY29sbGVjdGlvblswXSkubWFwKChoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVDb2x1bW4ga2V5PXtpfT57aH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHtoZWFkZXJzLmxlbmd0aD4wICYmIGhlYWRlcnMubWFwKChoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVDb2x1bW4ga2V5PXtpfT57aH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9UYWJsZUhlYWRlcj59XG4gICAgICAgICAgICA8VGFibGVCb2R5PlxuICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uICE9PXVuZGVmaW5lZCAmJiBjb2xsZWN0aW9uLm1hcCgoYywgYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlUm93IHNlbGVjdE9uZT17c2VsZWN0T25lfSBfaWQ9e2MuX2lkfSBrZXk9e2F9PntPYmplY3Qua2V5cyhjKS5tYXAoKHIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPFRhYmxlQ29sdW1uIGtleT17aX0+e2Nbcl19PC9UYWJsZUNvbHVtbj4pXG4gICAgICAgICAgICAgICAgICAgIH0pfTwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1RhYmxlQm9keT5cbiAgICAgICAgICAgIHtUYWJsZUZvb3RlciAmJiA8VGFibGVGb290ZXI+XG4gICAgICAgICAgICA8L1RhYmxlRm9vdGVyPn1cbiAgICAgICAgPC9UYWJsZT4pXG4gICBcbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVSZW5kZXJcblxuIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5jb25zdCBUYWJsZSA9ICh7Y2hpbGRyZW59KSA9PiB7XG4gICAgcmV0dXJuICg8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3RhYmxlPilcbiAgfVxuXG4vL1xuICBleHBvcnQgZGVmYXVsdCBUYWJsZSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgVGFibGVCb2R5ID0oe2NoaWxkcmVufSk9PntcbiAgICByZXR1cm4gKDx0Ym9keT5cbiAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICA8L3Rib2R5Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVCb2R5IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUYWJsZUNvbHVtbiA9KHtjaGlsZHJlbn0pPT57XG4gICAgcmV0dXJuICg8dGQ+e2NoaWxkcmVufTwvdGQ+KVxufVxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb2x1bW4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRhYmxlSGVhZCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcblxuICAgIHJldHVybiAoPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvdHI+XG4gICAgPC90aGVhZD4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlSGVhZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgVGFibGVSb3cgPSh7Y2hpbGRyZW4sc2VsZWN0T25lLF9pZH0pPT57XG4gICBjb25zb2xlLmxvZyhcIl9pZC0tLS0tXCIsX2lkKVxuICAgIHJldHVybiAoPHRyPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8dGQ+PGJ1dHRvbiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjZm9ybVwiIG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0T25lKHtfaWR9KSB9fSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+RWRpdDwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgPHRkPjxidXR0b24gZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NvbmZpcm1cIiBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdE9uZSh7X2lkfSkgfX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L3RkPlxuICAgIDwvdHI+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVJvdyIsImltcG9ydCBUYWJsZVJlbmRlciBmcm9tICdAeGFmL3RhYmxlLXJlbmRlcidcbmltcG9ydCBUYWJsZSBmcm9tICcuL1RhYmxlJ1xuaW1wb3J0IFRhYmxlQm9keSBmcm9tICcuL1RhYmxlQm9keSdcbmltcG9ydCBUYWJsZUNvbHVtbiBmcm9tICcuL1RhYmxlQ29sdW1uJ1xuaW1wb3J0IFRhYmxlSGVhZGVyIGZyb20gJy4vVGFibGVIZWFkZXInXG5pbXBvcnQgVGFibGVSb3cgZnJvbSAnLi9UYWJsZVJvdydcblxuY29uc3QgQm9vdHN0cmFwVGFibGUgPSh7Y29sbGVjdGlvbixoZWFkZXJzLHNlbGVjdE9uZX0pPT57XG4gICAgcmV0dXJuKFxuICAgIDxUYWJsZVJlbmRlclxuICAgICAgc2VsZWN0T25lPXtzZWxlY3RPbmV9XG4gICAgICBoZWFkZXJzID17aGVhZGVyc31cbiAgICAgIGNvbGxlY3Rpb249e2NvbGxlY3Rpb259XG4gICAgICBUYWJsZUJvZHk9e1RhYmxlQm9keX1cbiAgICAgIFRhYmxlSGVhZGVyPXtUYWJsZUhlYWRlcn1cbiAgICAgIFRhYmxlQ29sdW1uPXtUYWJsZUNvbHVtbn1cbiAgICAgIFRhYmxlUm93PXtUYWJsZVJvd31cbiAgICAgIFRhYmxlPXtUYWJsZX1cbiAgICAgIC8+KVxufVxuZXhwb3J0IHsgQm9vdHN0cmFwVGFibGV9IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEVkaXRvclJlYWN0IGZyb20gJ0B4YWYvZWRpdG9yLXJlYWN0J1xuaW1wb3J0IHtCb290c3RyYXBGb3JtLEJvb3RzdHJhcENvbmZpcm1hdGlvbn0gZnJvbSAnQHhhZi9ib290c3RyYXAtZGlhbG9nJ1xuaW1wb3J0IHtCb290c3RyYXBUYWJsZX0gIGZyb20gJ0B4YWYvYm9vdHN0cmFwLXRhYmxlJ1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHVzZXJzOiBbXSxcbiAgZW1haWw6IFwiXCIsIHBhc3N3b3JkOiBcIlwiLCBfaWQ6IFwiXCJcbn1cbmNvbnN0IGhlYWRlcnMgPVtcIl9pZFwiLFwiUGFzc3dvcmRcIixcIkVtYWlsXCIsXCJFZGl0XCIsXCJEZWxldGVcIl1cbmNvbnN0IFVzZXJzID0gKHtjb2xsZWN0aW9uLGRifSkgPT4ge1xuICAgICAgXG4gIHJldHVybiAoPEVkaXRvclJlYWN0IGNvbGxlY3Rpb249e2NvbGxlY3Rpb259IGRiPXtkYn0gaW5pdGlhbFN0YXRlPXtpbml0aWFsU3RhdGV9Pnsoe3N0YXRlLCBkZWxldGVPbmUsIHNlbGVjdE9uZSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcnMgPXN0YXRlLm9iamVjdHMubWFwKCh1KT0+e3JldHVybiB7Li4udSwgcGFzc3dvcmQ6XCIqKioqKioqKlwiIH19KVxuICByZXR1cm4gKDxkaXY+PEJvb3RzdHJhcFRhYmxlICBoZWFkZXJzPXtoZWFkZXJzfSBjb2xsZWN0aW9uPXt1c2Vyc30gc2VsZWN0T25lPXtzZWxlY3RPbmV9IC8+XG4gIDxCb290c3RyYXBGb3JtIG1vZGFsSWQ9XCJmb3JtXCI+eHh4PC9Cb290c3RyYXBGb3JtPlxuICA8Qm9vdHN0cmFwQ29uZmlybWF0aW9uIGNvbmZpcm09e2RlbGV0ZU9uZX0gZGVjbGluZT17KCk9Pnt9fSBtb2RhbElkPVwiY29uZmlybVwiPkNvbmZpcm0gZGVsZXRpb24gb2Y6IHtzdGF0ZS5zZWxlY3RlZE9iamVjdCAmJiBzdGF0ZS5zZWxlY3RlZE9iamVjdC5lbWFpbCB9PC9Cb290c3RyYXBDb25maXJtYXRpb24+XG4gIDwvZGl2PilcbiAgfX08L0VkaXRvclJlYWN0Pilcbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcnNcbi8qXG4gICAgPEVkaXRVc2VyIHsuLi5zdGF0ZX0gdmFsaWRhdGlvbj17dmFsaWRhdGlvbn0gb25DaGFuZ2U9e29uQ2hhbmdlfSAgLz5cbiAgICAgIDxDb25maXJtYXRpb25EaWFsb2cgZGVsZXRlT25lPXtkZWxldGVPbmV9IC8+XG4qL1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgIDxkaXY+SG9tZTwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL3JlYWN0J1xuY29uc3QgTmF2QmFyID0gKCkgPT4ge1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBpc0xvZ2dlZEluLCBsb2dvdXQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPk5hdmJhcjwvYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1jb250cm9scz1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIG5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdiBtci1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW0gYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9cIj5Ib21lIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+PC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89XCIvdXNlcnNcIj5Vc2VyczwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7IWlzTG9nZ2VkSW4gJiYgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiB0bz1cIi9sb2dpblwiPkxvZ2luPC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xvZ2dlZEluICYmIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL1wiIG9uQ2xpY2s9e2xvZ291dH0+TG9nb3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshaXNMb2dnZWRJbiAmJiA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL3NpZ251cFwiPlNpZ25VcDwvTmF2TGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+fVxuXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICApXG4gICAgfX1cblxuICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlcixIYXNoUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgTG9naW4se1NpZ25VcCxSZWNvdmVyUGFzc3dvcmQsUmVjb3ZlclJlc3VsdCxSZXNldFBhc3N3b3JkLFVzZXJzfSBmcm9tICdAYXV0aGpzL3JlYWN0LXVpJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9Ib21lJ1xuaW1wb3J0IE5hdkJhciBmcm9tICcuL05hdkJhcidcbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgPEhhc2hSb3V0ZXI+XG4gICAgICAgICAgICA8bmF2IHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIiB9fT5cbiAgICAgICAgICAgIDxOYXZCYXIvPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi91c2Vyc1wiIHJlbmRlcj17KCk9PjxVc2VycyBjb2xsZWN0aW9uPVwidXNlcnNcIiBkYiA9XCJkZW1vXCIvPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbG9naW5cIiBjb21wb25lbnQ9e0xvZ2lufSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvc2lnbnVwXCIgY29tcG9uZW50PXtTaWduVXB9IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZWNvdmVyXCIgY29tcG9uZW50PXtSZWNvdmVyUGFzc3dvcmR9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3Jlc2V0cGFzcy86dXNlcm5hbWUvOnRva2VuXCIgY29tcG9uZW50PXtSZXNldFBhc3N3b3JkfS8+XG4gICAgICAgIDwvSGFzaFJvdXRlcj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcbmltcG9ydCBFbWFpbFBhc3N3b3JkUHJvdmlkZXIgZnJvbSAnQGF1dGhqcy9yZWFjdCdcblJlYWN0RE9NLnJlbmRlcihcbiAgPGRpdj5cbiAgICA8RW1haWxQYXNzd29yZFByb3ZpZGVyPlxuICAgIDxBcHAvPlxuICAgIDwvRW1haWxQYXNzd29yZFByb3ZpZGVyPlxuXG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJfaW5oZXJpdHNMb29zZSIsIm9uIiwib2ZmIiwiQ29tcG9uZW50IiwiUmVhY3QiLCJpc1Byb2R1Y3Rpb24iLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsIlJlYWN0SXMiLCJjcmVhdGVDb250ZXh0IiwicGF0aFRvUmVnZXhwIiwiaW5kZXgiLCJpc1ZhbGlkRWxlbWVudFR5cGUiLCJhZGRMZWFkaW5nU2xhc2giLCJzdHJpcEJhc2VuYW1lIiwibm9vcCIsImtleSIsIl9fUm91dGVyQ29udGV4dCIsImNvbnRleHQiLCJlbWFpbFJlZ2V4IiwicGFzc3dvcmRSZWdleCIsImVtYWlsUmVxdWlyZW1lbnRzIiwicGFzc3BvcnRSZXF1aXJlbWVudHMiLCJpbml0aWFsVmFsaWRhdGlvblN0YXRlIiwiZW1haWwiLCJpc1ZhbGlkIiwibWVzc2FnZSIsInBhc3N3b3JkIiwidW5kZWZpbmVkIiwiZW1haWxWYWxpZGF0aW9uIiwicGFzc3dvcmRWYWxpZGF0aW9uIiwidGVzdCIsIm1lc3NhZ2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvblJlc3VsdCIsInNlbGYiLCJzZXRTdGF0ZSIsInZhbGlkYXRpb24iLCJjb29raWVzIiwiZGVmYXVsdHMiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJDYW5jZWwiLCJBeGlvcyIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiRW1haWxQYXNzd29yZENvbnRleHQiLCJFbWFpbFBhc3N3b3JkUHJvdmlkZXIiLCJsb2FkaW5nIiwidG9rZW4iLCJpc0xvZ2dlZEluIiwiY29uZmlybSIsInNlcnZlckVycm9yIiwiZSIsIm5hbWUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlc2V0VmFsaWRhdGlvbiIsInN0YXRlIiwiYXhpb3MiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInNldFRva2VuIiwiZ2V0IiwicGFyYW1zIiwiZ2V0VG9rZW4iLCJpc1Rva2VuRXhwaXJlZCIsImRlY29kZWQiLCJkZWNvZGUiLCJleHAiLCJEYXRlIiwibm93IiwiaWRUb2tlbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwidXNlcm5hbWUiLCJyZW1vdmVJdGVtIiwiYW5zd2VyIiwibG9nZ2VkSW4iLCJjaGlsZHJlbiIsInByb3BzIiwibG9naW4iLCJsb2dvdXQiLCJzaWdudXAiLCJyZXNldFBhc3N3b3JkIiwicmVjb3ZlclBhc3N3b3JkIiwib25DaGFuZ2UiLCJDdXN0b21JbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsImxhYmVsIiwiY2xhc3NOYW1lcyIsIkFzeW5jQnV0dG9uIiwidGl0bGUiLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJwb3NpdGlvbiIsIndpZHRoIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwib3BhY2l0eSIsIlByb2dyZXNzQ2lyY2xlIiwic2VsZWN0ZWQiLCJoZWlnaHQiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luTGVmdCIsInRleHRBbGlnbiIsImJhY2tncm91bmRDb2xvciIsIlByb2dyZXNzTG9hZGVyIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJ0b3AiLCJsZWZ0IiwiTG9naW4iLCJCb290c3RyYXBJbnB1dCIsIkJvb3RzdHJhcEFzeW5jQnV0dG9uIiwiU2lnblVwIiwiUmVjb3ZlclBhc3N3b3JkIiwicmVjb3ZlciIsIlJlc2V0UGFzc3dvcmQiLCJtb25nb0NvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwiZGIiLCJmaW5kT25lIiwiZmlsdGVyIiwicmVxVHlwZSIsImZpbmQiLCJpbnNlcnRPbmUiLCJ1cGRhdGVPbmUiLCJwdXQiLCJkZWxldGVPbmUiLCJNb25nb2RiQ29udGV4dCIsIk1vbmdvZGJQcm92aWRlciIsIm9iamVjdHMiLCJtb25nb1JlYWN0IiwicmVzdWx0Iiwic2V0SW5pdGlhbFN0YXRlIiwiRWRpdG9yUmVhY3QiLCJzZWxlY3RlZE9iamVjdCIsImluaXRpYWxTdGF0ZSIsInByZXZTdGF0ZSIsIm1vbmdvRGJDbGllbnQiLCJpZCIsIl9pZCIsInUiLCJfc2V0SW5pdGlhbFN0YXRlIiwic2VsZWN0T25lIiwiQ29uZmlybWF0aW9uRGlhbG9nIiwiZGVjbGluZSIsIm1vZGFsSWQiLCJFZGl0b3JEaWFsb2ciLCJzYXZlIiwiY2FuY2VsIiwiVGFibGVSZW5kZXIiLCJoZWFkZXJzIiwiVGFibGUiLCJUYWJsZUJvZHkiLCJUYWJsZVJvdyIsIlRhYmxlQ29sdW1uIiwiVGFibGVGb290ZXIiLCJUYWJsZUhlYWRlciIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJoIiwiaSIsImMiLCJhIiwiciIsIlRhYmxlSGVhZCIsIkJvb3RzdHJhcFRhYmxlIiwidXNlcnMiLCJVc2VycyIsIkJvb3RzdHJhcEZvcm0iLCJCb290c3RyYXBDb25maXJtYXRpb24iLCJIb21lIiwiTmF2QmFyIiwiQXBwIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMkJBQWUsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTTtZQUN0RCxZQUFZLE9BQU8sSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJO1lBQzlDLFlBQVksT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUU7O1lDRnpEOzs7WUFHQSxTQUFTLGdCQUFnQixHQUFHO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxTQUFTLG1CQUFtQixJQUFJO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLGdCQUFnQixHQUFH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QUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztZQUMxZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFN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
