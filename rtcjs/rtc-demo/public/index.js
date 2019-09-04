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

            function getCjsExportFromNamespace (n) {
            	return n && n.default || n;
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

            function _extends$1() {
              _extends$1 = Object.assign || function (target) {
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

              return _extends$1.apply(this, arguments);
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

            function _toConsumableArray(arr) {
              return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
            }

            function _arrayWithoutHoles(arr) {
              if (Array.isArray(arr)) {
                for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

                return arr2;
              }
            }

            function _iterableToArray(iter) {
              if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
            }

            function _nonIterableSpread() {
              throw new TypeError("Invalid attempt to spread non-iterable instance");
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

            var saveToLocalStorage = function saveToLocalStorage(_ref) {
              var message = _ref.message,
                  key = _ref.key,
                  onSave = _ref.onSave;
              var messages = JSON.parse(localStorage.getItem(key)) === null ? [message] : [].concat(_toConsumableArray(JSON.parse(localStorage.getItem(key))), [message]);
              localStorage.setItem(key, JSON.stringify(messages));
              onSave({
                message: message
              });
            };

            var loadFromStorage = function loadFromStorage(_ref2) {
              var key = _ref2.key,
                  onLoad = _ref2.onLoad;
              var messages = JSON.parse(localStorage.getItem(key)) === null ? [] : _toConsumableArray(JSON.parse(localStorage.getItem(key)));
              onLoad({
                messages: messages
              });
            };

            var withChatLog = function withChatLog(ComposedComponent) {
              var _temp;

              return _temp =
              /*#__PURE__*/
              function (_React$Component) {
                _inherits(_temp, _React$Component);

                function _temp() {
                  var _getPrototypeOf2;

                  var _this;

                  _classCallCheck(this, _temp);

                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }

                  _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_temp)).call.apply(_getPrototypeOf2, [this].concat(args)));

                  _defineProperty(_assertThisInitialized(_this), "state", {
                    messages: [],
                    message: ""
                  });

                  _defineProperty(_assertThisInitialized(_this), "loadFromStorage", function (_ref) {
                    var key = _ref.key;
                    loadFromStorage({
                      key: key,
                      onLoad: function onLoad(_ref2) {
                        var messages = _ref2.messages;

                        _this.setState({
                          messages: messages
                        });
                      }
                    });
                  });

                  _defineProperty(_assertThisInitialized(_this), "saveLocalMessage", function (_ref3) {
                    var key = _ref3.key,
                        to = _ref3.to;
                    var local = true;
                    var datetime = new Date().getTime();
                    var message = _this.state.message;
                    var from = key;
                    saveToLocalStorage({
                      message: {
                        message: message,
                        from: from,
                        local: local,
                        datetime: datetime,
                        to: to
                      },
                      key: key,
                      onSave: function onSave() {
                        _this.setState(function (prevState) {
                          return {
                            messages: [].concat(_toConsumableArray(prevState.messages), [{
                              local: local,
                              datetime: datetime,
                              message: message,
                              from: from
                            }]),
                            message: ""
                          };
                        });
                      }
                    });
                  });

                  _defineProperty(_assertThisInitialized(_this), "saveRemoteMessage", function (_ref4) {
                    var from = _ref4.from,
                        key = _ref4.key,
                        datetime = _ref4.datetime,
                        message = _ref4.message,
                        to = _ref4.to;
                    console.log("----", from, key, datetime, message);
                    var local = false;
                    saveToLocalStorage({
                      message: {
                        message: message,
                        from: from,
                        local: local,
                        datetime: datetime,
                        to: to
                      },
                      key: key,
                      onSave: function onSave() {
                        _this.setState(function (prevState) {
                          return {
                            messages: [].concat(_toConsumableArray(prevState.messages), [{
                              local: local,
                              datetime: datetime,
                              message: message,
                              from: from
                            }])
                          };
                        });
                      }
                    });
                  });

                  _defineProperty(_assertThisInitialized(_this), "onTextChange", function (e) {
                    var value = e.target.value;

                    _this.setState({
                      message: value
                    });
                  });

                  return _this;
                }

                _createClass(_temp, [{
                  key: "componentWillMount",
                  value: function componentWillMount() {}
                }, {
                  key: "componentDidUpdate",
                  value: function componentDidUpdate() {}
                }, {
                  key: "render",
                  value: function render() {
                    var _this$state = this.state,
                        messages = _this$state.messages,
                        message = _this$state.message;
                    return React$1__default.createElement(ComposedComponent, _extends$1({}, this.props, {
                      loadFromStorage: this.loadFromStorage,
                      messages: messages,
                      message: message,
                      saveLocalMessage: this.saveLocalMessage,
                      saveRemoteMessage: this.saveRemoteMessage,
                      onTextChange: this.onTextChange
                    }));
                  }
                }]);

                return _temp;
              }(React$1__default.Component), _temp;
            };

            var MessagingController =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(MessagingController, _React$Component);

              function MessagingController() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, MessagingController);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MessagingController)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "sendMessage", function () {
                  var _this$props = _this.props,
                      name = _this$props.name,
                      targetName = _this$props.targetName,
                      socket = _this$props.socket;
                  var message = _this.props.message;
                  socket.emit("text_message", {
                    name: name,
                    targetName: targetName,
                    message: message,
                    datetime: new Date().getTime()
                  });

                  _this.props.saveLocalMessage({
                    key: name,
                    to: targetName
                  });
                });

                return _this;
              }

              _createClass(MessagingController, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this2 = this;

                  var _this$props2 = this.props,
                      socket = _this$props2.socket,
                      name = _this$props2.name;
                  this.props.loadFromStorage({
                    key: name
                  });
                  this.socket = socket;
                  this.socket.on("text_message", function (data) {
                    var name = data.name,
                        message = data.message,
                        datetime = data.datetime;

                    _this2.props.saveRemoteMessage({
                      from: name,
                      message: message,
                      datetime: datetime,
                      key: _this2.props.name,
                      to: _this2.props.name
                    });
                  });
                  this.socket.emit("join", name, function (data) {});
                  this.socket.on("joined", function (data) {
                    console.log("joined----", data);
                  });
                }
              }, {
                key: "render",
                value: function render() {
                  var _this$props3 = this.props,
                      children = _this$props3.children,
                      message = _this$props3.message,
                      messages = _this$props3.messages;
                  return children({
                    messages: messages,
                    sendMessage: this.sendMessage,
                    onTextChange: this.props.onTextChange,
                    message: message
                  });
                }
              }]);

              return MessagingController;
            }(React$1__default.Component);

            var MessagingController$1 = withChatLog(MessagingController);

            var DateLine = function DateLine(_ref) {
              var datetime = _ref.datetime;
              return React$1__default.createElement("div", {
                style: {
                  display: "flex"
                }
              }, React$1__default.createElement("div", {
                style: {
                  flex: "1"
                }
              }, React$1__default.createElement("hr", null)), React$1__default.createElement("div", null, new Date(datetime).toLocaleDateString()), React$1__default.createElement("div", {
                style: {
                  flex: 1
                }
              }, React$1__default.createElement("hr", null)));
            };

            var Message = function Message(_ref) {
              var children = _ref.children,
                  backgroundColor = _ref.backgroundColor,
                  datetime = _ref.datetime;
              return React$1__default.createElement("div", {
                style: {
                  backgroundColor: backgroundColor,
                  padding: 5,
                  margin: 2,
                  borderRadius: 15,
                  borderColor: "#9E9E9E",
                  borderStyle: "solid",
                  borderWidth: 2,
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  minWidth: "30%"
                }
              }, React$1__default.createElement("div", null, children), React$1__default.createElement("div", {
                style: {
                  fontSize: 10,
                  paddingTop: 2,
                  textAlign: "end"
                }
              }, React$1__default.createElement("i", {
                style: {
                  backgroundColor: "#efebe9"
                }
              }, new Date(datetime).toLocaleTimeString())));
            };

            var _style;
            var style = (_style = {
              height: 30,
              width: 50
            }, _defineProperty(_style, "height", 50), _defineProperty(_style, "padding", 3), _defineProperty(_style, "borderRadius", 25), _defineProperty(_style, "backgroundColor", "darkSmoke"), _defineProperty(_style, "borderStyle", "solid"), _defineProperty(_style, "borderWidth", 2), _defineProperty(_style, "textAlign", "center"), _defineProperty(_style, "color", "#009688"), _defineProperty(_style, "borderColor", "#80cbc4"), _style);

            var Avatar = function Avatar(_ref) {
              var from = _ref.from;
              return React$1__default.createElement("div", {
                style: style
              }, from[0]);
            };

            var FirstMessageLeft = function FirstMessageLeft(_ref) {
              var message = _ref.message,
                  datetime = _ref.datetime,
                  dateSpace = _ref.dateSpace,
                  side = _ref.side,
                  local = _ref.local,
                  from = _ref.from;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", null, dateSpace && React$1__default.createElement(DateLine, {
                datetime: datetime
              })), React$1__default.createElement("div", {
                style: {
                  display: "flex"
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center"
                }
              }, local === false && React$1__default.createElement(Avatar, {
                from: from
              }), React$1__default.createElement(Message, {
                datetime: datetime,
                backgroundColor: "#E6EE9C"
              }, message)))));
            };

            var FistMessageRight$1 = function FistMessageRight(_ref) {
              var message = _ref.message,
                  datetime = _ref.datetime,
                  dateSpace = _ref.dateSpace,
                  side = _ref.side,
                  local = _ref.local,
                  from = _ref.from;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", null, dateSpace && React$1__default.createElement(DateLine, {
                datetime: datetime
              })), React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "flex-end"
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "flex-end"
                }
              }, " ", local === false && React$1__default.createElement(Avatar, {
                from: from
              })), React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center"
                }
              }, React$1__default.createElement(Message, {
                datetime: datetime,
                backgroundColor: "#FFECB3"
              }, message))), React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center"
                }
              })));
            };

            var SubMessageRight = function SubMessageRight(_ref) {
              var message = _ref.message,
                  datetime = _ref.datetime,
                  dateSpace = _ref.dateSpace,
                  side = _ref.side;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", null, dateSpace && React$1__default.createElement(DateLine, {
                datetime: datetime
              })), React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "flex-end"
                }
              }, React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center"
                }
              }, React$1__default.createElement(Message, {
                datetime: datetime,
                backgroundColor: "#FFECB3"
              }, message))));
            };

            var SubMessageLeft = function SubMessageLeft(_ref) {
              var message = _ref.message,
                  datetime = _ref.datetime,
                  dateSpace = _ref.dateSpace,
                  side = _ref.side;
              return React$1__default.createElement("div", null, React$1__default.createElement("div", null, dateSpace && React$1__default.createElement(DateLine, {
                datetime: datetime
              })), React$1__default.createElement("div", {
                style: {
                  display: "flex"
                }
              }, React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 40
                }
              }, React$1__default.createElement(Message, {
                datetime: datetime,
                backgroundColor: "#E6EE9C"
              }, message))));
            };

            var style$1 = {
              backgroundColor: "#edeff2",
              overflow: "auto",
              width: "100%",
              flex: 10
            };

            var MessageContainer =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(MessageContainer, _React$Component);

              function MessageContainer() {
                _classCallCheck(this, MessageContainer);

                return _possibleConstructorReturn(this, _getPrototypeOf(MessageContainer).apply(this, arguments));
              }

              _createClass(MessageContainer, [{
                key: "componentWillReceiveProps",
                value: function componentWillReceiveProps() {
                  this.gotoBottom();
                }
              }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate() {
                  this.gotoBottom();
                }
              }, {
                key: "gotoBottom",
                value: function gotoBottom() {
                  var elements = document.getElementsByName("msgContainer");
                  elements.forEach(function (e) {
                    e.scrollTop = e.scrollHeight - e.clientHeight;
                  });
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  return React$1__default.createElement("div", {
                    name: "msgContainer",
                    style: style$1
                  }, children);
                }
              }]);

              return MessageContainer;
            }(React$1__default.Component);

            var messagesForRender = function messagesForRender(_ref) {
              var messages = _ref.messages,
                  localSide = _ref.localSide,
                  remoteSide = _ref.remoteSide;
              var email = messages[0].from;
              var lastDatetime = messages[0].datetime;
              return messages.sort(function (a, b) {
                return a.datetime - b.datetime;
              }).map(function (m, i) {
                if (i === 0 && m.local) {
                  return _objectSpread2({}, m, {
                    side: localSide,
                    order: "F",
                    dateSpace: true
                  });
                } else if (i === 0 && !m.local) {
                  return _objectSpread2({}, m, {
                    side: remoteSide,
                    order: "F",
                    dateSpace: true
                  });
                } //local messages
                else if (i > 0 && email === m.from && m.local) {
                    if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
                      email = m.from;
                      lastDatetime = m.datetime;
                      return _objectSpread2({}, m, {
                        side: localSide,
                        order: "S",
                        dateSpace: true
                      });
                    } else {
                      email = m.from;
                      lastDatetime = m.datetime;
                      return _objectSpread2({}, m, {
                        side: localSide,
                        order: "S",
                        dateSpace: false
                      });
                    }
                  } else if (i > 0 && email !== m.from && m.local) {
                    if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
                      email = m.from;
                      lastDatetime = m.datetime;
                      return _objectSpread2({}, m, {
                        side: localSide,
                        order: "F",
                        dateSpace: false
                      });
                    } else {
                      email = m.from;
                      lastDatetime = m.datetime;
                      return _objectSpread2({}, m, {
                        side: localSide,
                        order: "F",
                        dateSpace: true
                      });
                    }
                  } //remote messages
                  else if (i > 0 && email === m.from && !m.local) {
                      if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
                        lastDatetime = m.datetime;
                        return _objectSpread2({}, m, {
                          side: remoteSide,
                          order: "S",
                          dateSpace: true
                        });
                      } else {
                        lastDatetime = m.datetime;
                        return _objectSpread2({}, m, {
                          side: remoteSide,
                          order: "S",
                          dateSpace: false
                        });
                      }
                    } else if (i > 0 && email !== m.from && !m.local) {
                      if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
                        email = m.from;
                        lastDatetime = m.datetime;
                        return _objectSpread2({}, m, {
                          side: remoteSide,
                          order: "F",
                          dateSpace: false
                        });
                      } else {
                        email = m.from;
                        lastDatetime = m.datetime;
                        return _objectSpread2({}, m, {
                          side: remoteSide,
                          order: "F",
                          dateSpace: true
                        });
                      }
                    }
              });
            };

            var MessageRender =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(MessageRender, _React$Component);

              function MessageRender() {
                _classCallCheck(this, MessageRender);

                return _possibleConstructorReturn(this, _getPrototypeOf(MessageRender).apply(this, arguments));
              }

              _createClass(MessageRender, [{
                key: "render",
                value: function render() {
                  var _this$props = this.props,
                      messages = _this$props.messages,
                      _this$props$localSide = _this$props.localSide,
                      localSide = _this$props$localSide === void 0 ? "Right" : _this$props$localSide,
                      _this$props$remoteSid = _this$props.remoteSide,
                      remoteSide = _this$props$remoteSid === void 0 ? "Left" : _this$props$remoteSid,
                      MessageContainer = _this$props.MessageContainer,
                      FirstMessageLeft = _this$props.FirstMessageLeft,
                      FirstMessageRight = _this$props.FirstMessageRight,
                      SubMessageLeft = _this$props.SubMessageLeft,
                      SubMessageRight = _this$props.SubMessageRight;
                  var messagesForView = messages.length > 0 && messagesForRender({
                    messages: messages,
                    localSide: localSide,
                    remoteSide: remoteSide
                  });
                  if (MessageContainer) return React$1__default.createElement(MessageContainer, null, messages.length > 0 && messagesForView.map(function (m, i) {
                    //Local
                    if (m.local && m.order === "F" && m.side === "Left") {
                      if (FirstMessageLeft) return React$1__default.createElement(FirstMessageLeft, _extends$1({
                        key: i
                      }, m));
                      return React$1__default.createElement("div", null, "FistMessageLeft not provided");
                    } else if (m.local && m.order === "S" && m.side === "Left") {
                      if (SubMessageLeft) return React$1__default.createElement(SubMessageLeft, _extends$1({
                        key: i
                      }, m));
                      return React$1__default.createElement("div", null, "SubMessageLeft not provided");
                    }

                    if (m.local && m.order === "F" && m.side === "Right") {
                      if (FirstMessageRight) return React$1__default.createElement(FirstMessageRight, _extends$1({
                        key: i
                      }, m));
                      return React$1__default.createElement("div", null, "FistMessageRight not provided");
                    } else if (m.local && m.order === "S" && m.side === "Right") {
                      if (SubMessageRight) return React$1__default.createElement(SubMessageRight, _extends$1({
                        key: i
                      }, m));
                      return React$1__default.createElement("div", null, "SubMessageRight not provided");
                    } //Remote
                    else if (!m.local && m.order === "F" && m.side === "Right") {
                        if (FistMessageRight) return React$1__default.createElement(FirstMessageRight, _extends$1({
                          key: i
                        }, m));
                        return React$1__default.createElement("div", null, "FirstMessageRight not provided");
                      } else if (!m.local && m.order === "S" && m.side === "Right") {
                        if (SubMessageRight) return React$1__default.createElement(SubMessageRight, _extends$1({
                          key: i
                        }, m));
                        return React$1__default.createElement("div", null, "SubMessageRight not provided");
                      } else if (!m.local && m.order === "F" && m.side === "Left") {
                        if (FirstMessageLeft) return React$1__default.createElement(FirstMessageLeft, _extends$1({
                          key: i
                        }, m));
                        return React$1__default.createElement("div", null, "FirstMessageLeft not provided");
                      } else if (!m.local && m.order === "S" && m.side === "Left") {
                        if (SubMessageLeft) return React$1__default.createElement(SubMessageLeft, _extends$1({
                          key: i
                        }, m));
                        return React$1__default.createElement("div", null, "SubMessageLeft not provided");
                      }

                    return React$1__default.createElement("div", null, "Render error");
                  }));
                  return React$1__default.createElement("div", null, "MessageContainer not provided");
                }
              }]);

              return MessageRender;
            }(React$1__default.Component);

            var MessageDisplayer = function MessageDisplayer(_ref) {
              var messages = _ref.messages;
              return React.createElement(MessageRender, {
                messages: messages,
                MessageContainer: MessageContainer,
                DateLine: DateLine,
                FirstMessageLeft: FirstMessageLeft,
                FirstMessageRight: FistMessageRight$1,
                SubMessageLeft: SubMessageLeft,
                SubMessageRight: SubMessageRight
              });
            };

            var MessageEditorDisplayer = function MessageEditorDisplayer(_ref) {
              var onTextChange = _ref.onTextChange,
                  message = _ref.message,
                  sendMesage = _ref.sendMesage,
                  _ref$disabled = _ref.disabled,
                  disabled = _ref$disabled === void 0 ? false : _ref$disabled;
              return React$1__default.createElement("div", {
                style: {
                  marginTop: 2
                }
              }, React$1__default.createElement("div", {
                style: {
                  display: "flex"
                }
              }, React$1__default.createElement("input", {
                onKeyDown: function onKeyDown(e) {
                  e.keyCode === 13 ? sendMesage() : null;
                },
                className: "form-control",
                onChange: onTextChange,
                value: message,
                name: "message",
                type: "text",
                placeholder: "Enter message text"
              }), React$1__default.createElement("button", {
                disabled: disabled,
                style: {
                  marginLeft: 2
                },
                className: "btn btn-secondary",
                onClick: sendMesage
              }, "Send")));
            };

            var MessagingModule = function MessagingModule(_ref) {
              var name = _ref.name,
                  targetName = _ref.targetName,
                  socket = _ref.socket,
                  height = _ref.height;
              return React.createElement(MessagingController$1, {
                name: name,
                targetName: targetName,
                socket: socket
              }, function (_ref2) {
                var messages = _ref2.messages,
                    message = _ref2.message,
                    sendMessage = _ref2.sendMessage,
                    onTextChange = _ref2.onTextChange;
                return React.createElement("div", {
                  style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }
                }, React.createElement(MessageDisplayer, {
                  messages: messages
                }), React.createElement(MessageEditorDisplayer, {
                  message: message,
                  sendMesage: sendMessage,
                  onTextChange: onTextChange
                }));
              });
            };

            /**
             * Parses an URI
             *
             * @author Steven Levithan <stevenlevithan.com> (MIT license)
             * @api private
             */

            var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

            var parts = [
                'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
            ];

            var parseuri = function parseuri(str) {
                var src = str,
                    b = str.indexOf('['),
                    e = str.indexOf(']');

                if (b != -1 && e != -1) {
                    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
                }

                var m = re.exec(str || ''),
                    uri = {},
                    i = 14;

                while (i--) {
                    uri[parts[i]] = m[i] || '';
                }

                if (b != -1 && e != -1) {
                    uri.source = src;
                    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
                    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
                    uri.ipv6uri = true;
                }

                return uri;
            };

            /**
             * Helpers.
             */

            var s = 1000;
            var m = s * 60;
            var h = m * 60;
            var d = h * 24;
            var y = d * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} [options]
             * @throws {Error} throw an error if val is not a non-empty string or a number
             * @return {String|Number}
             * @api public
             */

            var ms = function(val, options) {
              options = options || {};
              var type = typeof val;
              if (type === 'string' && val.length > 0) {
                return parse$1(val);
              } else if (type === 'number' && isNaN(val) === false) {
                return options.long ? fmtLong(val) : fmtShort(val);
              }
              throw new Error(
                'val is not a non-empty string or a valid number. val=' +
                  JSON.stringify(val)
              );
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse$1(str) {
              str = String(str);
              if (str.length > 100) {
                return;
              }
              var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                str
              );
              if (!match) {
                return;
              }
              var n = parseFloat(match[1]);
              var type = (match[2] || 'ms').toLowerCase();
              switch (type) {
                case 'years':
                case 'year':
                case 'yrs':
                case 'yr':
                case 'y':
                  return n * y;
                case 'days':
                case 'day':
                case 'd':
                  return n * d;
                case 'hours':
                case 'hour':
                case 'hrs':
                case 'hr':
                case 'h':
                  return n * h;
                case 'minutes':
                case 'minute':
                case 'mins':
                case 'min':
                case 'm':
                  return n * m;
                case 'seconds':
                case 'second':
                case 'secs':
                case 'sec':
                case 's':
                  return n * s;
                case 'milliseconds':
                case 'millisecond':
                case 'msecs':
                case 'msec':
                case 'ms':
                  return n;
                default:
                  return undefined;
              }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtShort(ms) {
              if (ms >= d) {
                return Math.round(ms / d) + 'd';
              }
              if (ms >= h) {
                return Math.round(ms / h) + 'h';
              }
              if (ms >= m) {
                return Math.round(ms / m) + 'm';
              }
              if (ms >= s) {
                return Math.round(ms / s) + 's';
              }
              return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtLong(ms) {
              return plural(ms, d, 'day') ||
                plural(ms, h, 'hour') ||
                plural(ms, m, 'minute') ||
                plural(ms, s, 'second') ||
                ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural(ms, n, name) {
              if (ms < n) {
                return;
              }
              if (ms < n * 1.5) {
                return Math.floor(ms / n) + ' ' + name;
              }
              return Math.ceil(ms / n) + ' ' + name + 's';
            }

            var debug = createCommonjsModule(function (module, exports) {
            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = ms;

            /**
             * Active `debug` instances.
             */
            exports.instances = [];

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
             */

            exports.formatters = {};

            /**
             * Select a color.
             * @param {String} namespace
             * @return {Number}
             * @api private
             */

            function selectColor(namespace) {
              var hash = 0, i;

              for (i in namespace) {
                hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
              }

              return exports.colors[Math.abs(hash) % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function createDebug(namespace) {

              var prevTime;

              function debug() {
                // disabled?
                if (!debug.enabled) return;

                var self = debug;

                // set `diff` timestamp
                var curr = +new Date();
                var ms$$1 = curr - (prevTime || curr);
                self.diff = ms$$1;
                self.prev = prevTime;
                self.curr = curr;
                prevTime = curr;

                // turn the `arguments` into a proper Array
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; i++) {
                  args[i] = arguments[i];
                }

                args[0] = exports.coerce(args[0]);

                if ('string' !== typeof args[0]) {
                  // anything else let's inspect with %O
                  args.unshift('%O');
                }

                // apply any `formatters` transformations
                var index = 0;
                args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                  // if we encounter an escaped % then don't increase the array index
                  if (match === '%%') return match;
                  index++;
                  var formatter = exports.formatters[format];
                  if ('function' === typeof formatter) {
                    var val = args[index];
                    match = formatter.call(self, val);

                    // now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                  }
                  return match;
                });

                // apply env-specific formatting (colors, etc.)
                exports.formatArgs.call(self, args);

                var logFn = debug.log || exports.log || console.log.bind(console);
                logFn.apply(self, args);
              }

              debug.namespace = namespace;
              debug.enabled = exports.enabled(namespace);
              debug.useColors = exports.useColors();
              debug.color = selectColor(namespace);
              debug.destroy = destroy;

              // env-specific initialization logic for debug instances
              if ('function' === typeof exports.init) {
                exports.init(debug);
              }

              exports.instances.push(debug);

              return debug;
            }

            function destroy () {
              var index = exports.instances.indexOf(this);
              if (index !== -1) {
                exports.instances.splice(index, 1);
                return true;
              } else {
                return false;
              }
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces) {
              exports.save(namespaces);

              exports.names = [];
              exports.skips = [];

              var i;
              var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
              var len = split.length;

              for (i = 0; i < len; i++) {
                if (!split[i]) continue; // ignore empty strings
                namespaces = split[i].replace(/\*/g, '.*?');
                if (namespaces[0] === '-') {
                  exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                } else {
                  exports.names.push(new RegExp('^' + namespaces + '$'));
                }
              }

              for (i = 0; i < exports.instances.length; i++) {
                var instance = exports.instances[i];
                instance.enabled = exports.enabled(instance.namespace);
              }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable() {
              exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name) {
              if (name[name.length - 1] === '*') {
                return true;
              }
              var i, len;
              for (i = 0, len = exports.skips.length; i < len; i++) {
                if (exports.skips[i].test(name)) {
                  return false;
                }
              }
              for (i = 0, len = exports.names.length; i < len; i++) {
                if (exports.names[i].test(name)) {
                  return true;
                }
              }
              return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val) {
              if (val instanceof Error) return val.stack || val.message;
              return val;
            }
            });
            var debug_1 = debug.coerce;
            var debug_2 = debug.disable;
            var debug_3 = debug.enable;
            var debug_4 = debug.enabled;
            var debug_5 = debug.humanize;
            var debug_6 = debug.instances;
            var debug_7 = debug.names;
            var debug_8 = debug.skips;
            var debug_9 = debug.formatters;

            var browser$1 = createCommonjsModule(function (module, exports) {
            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = debug;
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome
                           && 'undefined' != typeof chrome.storage
                              ? chrome.storage.local
                              : localstorage();

            /**
             * Colors.
             */

            exports.colors = [
              '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
              '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
              '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
              '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
              '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
              '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
              '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
              '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
              '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
              '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
              '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
            ];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors() {
              // NB: In an Electron preload script, document will be defined but not fully
              // initialized. Since we know we're in Chrome, we'll just detect this case
              // explicitly
              if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
                return true;
              }

              // Internet Explorer and Edge do not support colors.
              if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                return false;
              }

              // is webkit? http://stackoverflow.com/a/16459606/376773
              // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
              return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
                // is firebug? http://stackoverflow.com/a/398120/376773
                (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
                // is firefox >= v31?
                // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
                // double check webkit in userAgent just in case we are in a worker
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function(v) {
              try {
                return JSON.stringify(v);
              } catch (err) {
                return '[UnexpectedJSONParseError]: ' + err.message;
              }
            };


            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs(args) {
              var useColors = this.useColors;

              args[0] = (useColors ? '%c' : '')
                + this.namespace
                + (useColors ? ' %c' : ' ')
                + args[0]
                + (useColors ? '%c ' : ' ')
                + '+' + exports.humanize(this.diff);

              if (!useColors) return;

              var c = 'color: ' + this.color;
              args.splice(1, 0, c, 'color: inherit');

              // the final "%c" is somewhat tricky, because there could be other
              // arguments passed either before or after the %c, so we need to
              // figure out the correct index to insert the CSS into
              var index = 0;
              var lastC = 0;
              args[0].replace(/%[a-zA-Z%]/g, function(match) {
                if ('%%' === match) return;
                index++;
                if ('%c' === match) {
                  // we only are interested in the *last* %c
                  // (the user may have provided their own)
                  lastC = index;
                }
              });

              args.splice(lastC, 0, c);
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log() {
              // this hackery is required for IE8/9, where
              // the `console.log` function doesn't have 'apply'
              return 'object' === typeof console
                && console.log
                && Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces) {
              try {
                if (null == namespaces) {
                  exports.storage.removeItem('debug');
                } else {
                  exports.storage.debug = namespaces;
                }
              } catch(e) {}
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load() {
              var r;
              try {
                r = exports.storage.debug;
              } catch(e) {}

              // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
              if (!r && typeof process !== 'undefined' && 'env' in process) {
                r = process.env.DEBUG;
              }

              return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage() {
              try {
                return window.localStorage;
              } catch (e) {}
            }
            });
            var browser_1 = browser$1.log;
            var browser_2 = browser$1.formatArgs;
            var browser_3 = browser$1.save;
            var browser_4 = browser$1.load;
            var browser_5 = browser$1.useColors;
            var browser_6 = browser$1.storage;
            var browser_7 = browser$1.colors;

            /**
             * Module dependencies.
             */


            var debug$1 = browser$1('socket.io-client:url');

            /**
             * Module exports.
             */

            var url_1 = url;

            /**
             * URL parser.
             *
             * @param {String} url
             * @param {Object} An object meant to mimic window.location.
             *                 Defaults to window.location.
             * @api public
             */

            function url (uri, loc) {
              var obj = uri;

              // default to window.location
              loc = loc || (typeof location !== 'undefined' && location);
              if (null == uri) uri = loc.protocol + '//' + loc.host;

              // relative path support
              if ('string' === typeof uri) {
                if ('/' === uri.charAt(0)) {
                  if ('/' === uri.charAt(1)) {
                    uri = loc.protocol + uri;
                  } else {
                    uri = loc.host + uri;
                  }
                }

                if (!/^(https?|wss?):\/\//.test(uri)) {
                  debug$1('protocol-less url %s', uri);
                  if ('undefined' !== typeof loc) {
                    uri = loc.protocol + '//' + uri;
                  } else {
                    uri = 'https://' + uri;
                  }
                }

                // parse
                debug$1('parse %s', uri);
                obj = parseuri(uri);
              }

              // make sure we treat `localhost:80` and `localhost` equally
              if (!obj.port) {
                if (/^(http|ws)$/.test(obj.protocol)) {
                  obj.port = '80';
                } else if (/^(http|ws)s$/.test(obj.protocol)) {
                  obj.port = '443';
                }
              }

              obj.path = obj.path || '/';

              var ipv6 = obj.host.indexOf(':') !== -1;
              var host = ipv6 ? '[' + obj.host + ']' : obj.host;

              // define unique id
              obj.id = obj.protocol + '://' + host + ':' + obj.port;
              // define href
              obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

              return obj;
            }

            /**
             * Helpers.
             */

            var s$1 = 1000;
            var m$1 = s$1 * 60;
            var h$1 = m$1 * 60;
            var d$1 = h$1 * 24;
            var y$1 = d$1 * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} [options]
             * @throws {Error} throw an error if val is not a non-empty string or a number
             * @return {String|Number}
             * @api public
             */

            var ms$1 = function(val, options) {
              options = options || {};
              var type = typeof val;
              if (type === 'string' && val.length > 0) {
                return parse$2(val);
              } else if (type === 'number' && isNaN(val) === false) {
                return options.long ? fmtLong$1(val) : fmtShort$1(val);
              }
              throw new Error(
                'val is not a non-empty string or a valid number. val=' +
                  JSON.stringify(val)
              );
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse$2(str) {
              str = String(str);
              if (str.length > 100) {
                return;
              }
              var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                str
              );
              if (!match) {
                return;
              }
              var n = parseFloat(match[1]);
              var type = (match[2] || 'ms').toLowerCase();
              switch (type) {
                case 'years':
                case 'year':
                case 'yrs':
                case 'yr':
                case 'y':
                  return n * y$1;
                case 'days':
                case 'day':
                case 'd':
                  return n * d$1;
                case 'hours':
                case 'hour':
                case 'hrs':
                case 'hr':
                case 'h':
                  return n * h$1;
                case 'minutes':
                case 'minute':
                case 'mins':
                case 'min':
                case 'm':
                  return n * m$1;
                case 'seconds':
                case 'second':
                case 'secs':
                case 'sec':
                case 's':
                  return n * s$1;
                case 'milliseconds':
                case 'millisecond':
                case 'msecs':
                case 'msec':
                case 'ms':
                  return n;
                default:
                  return undefined;
              }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtShort$1(ms) {
              if (ms >= d$1) {
                return Math.round(ms / d$1) + 'd';
              }
              if (ms >= h$1) {
                return Math.round(ms / h$1) + 'h';
              }
              if (ms >= m$1) {
                return Math.round(ms / m$1) + 'm';
              }
              if (ms >= s$1) {
                return Math.round(ms / s$1) + 's';
              }
              return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtLong$1(ms) {
              return plural$1(ms, d$1, 'day') ||
                plural$1(ms, h$1, 'hour') ||
                plural$1(ms, m$1, 'minute') ||
                plural$1(ms, s$1, 'second') ||
                ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural$1(ms, n, name) {
              if (ms < n) {
                return;
              }
              if (ms < n * 1.5) {
                return Math.floor(ms / n) + ' ' + name;
              }
              return Math.ceil(ms / n) + ' ' + name + 's';
            }

            var debug$2 = createCommonjsModule(function (module, exports) {
            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = ms$1;

            /**
             * Active `debug` instances.
             */
            exports.instances = [];

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
             */

            exports.formatters = {};

            /**
             * Select a color.
             * @param {String} namespace
             * @return {Number}
             * @api private
             */

            function selectColor(namespace) {
              var hash = 0, i;

              for (i in namespace) {
                hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
              }

              return exports.colors[Math.abs(hash) % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function createDebug(namespace) {

              var prevTime;

              function debug() {
                // disabled?
                if (!debug.enabled) return;

                var self = debug;

                // set `diff` timestamp
                var curr = +new Date();
                var ms = curr - (prevTime || curr);
                self.diff = ms;
                self.prev = prevTime;
                self.curr = curr;
                prevTime = curr;

                // turn the `arguments` into a proper Array
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; i++) {
                  args[i] = arguments[i];
                }

                args[0] = exports.coerce(args[0]);

                if ('string' !== typeof args[0]) {
                  // anything else let's inspect with %O
                  args.unshift('%O');
                }

                // apply any `formatters` transformations
                var index = 0;
                args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                  // if we encounter an escaped % then don't increase the array index
                  if (match === '%%') return match;
                  index++;
                  var formatter = exports.formatters[format];
                  if ('function' === typeof formatter) {
                    var val = args[index];
                    match = formatter.call(self, val);

                    // now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                  }
                  return match;
                });

                // apply env-specific formatting (colors, etc.)
                exports.formatArgs.call(self, args);

                var logFn = debug.log || exports.log || console.log.bind(console);
                logFn.apply(self, args);
              }

              debug.namespace = namespace;
              debug.enabled = exports.enabled(namespace);
              debug.useColors = exports.useColors();
              debug.color = selectColor(namespace);
              debug.destroy = destroy;

              // env-specific initialization logic for debug instances
              if ('function' === typeof exports.init) {
                exports.init(debug);
              }

              exports.instances.push(debug);

              return debug;
            }

            function destroy () {
              var index = exports.instances.indexOf(this);
              if (index !== -1) {
                exports.instances.splice(index, 1);
                return true;
              } else {
                return false;
              }
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces) {
              exports.save(namespaces);

              exports.names = [];
              exports.skips = [];

              var i;
              var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
              var len = split.length;

              for (i = 0; i < len; i++) {
                if (!split[i]) continue; // ignore empty strings
                namespaces = split[i].replace(/\*/g, '.*?');
                if (namespaces[0] === '-') {
                  exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                } else {
                  exports.names.push(new RegExp('^' + namespaces + '$'));
                }
              }

              for (i = 0; i < exports.instances.length; i++) {
                var instance = exports.instances[i];
                instance.enabled = exports.enabled(instance.namespace);
              }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable() {
              exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name) {
              if (name[name.length - 1] === '*') {
                return true;
              }
              var i, len;
              for (i = 0, len = exports.skips.length; i < len; i++) {
                if (exports.skips[i].test(name)) {
                  return false;
                }
              }
              for (i = 0, len = exports.names.length; i < len; i++) {
                if (exports.names[i].test(name)) {
                  return true;
                }
              }
              return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val) {
              if (val instanceof Error) return val.stack || val.message;
              return val;
            }
            });
            var debug_1$1 = debug$2.coerce;
            var debug_2$1 = debug$2.disable;
            var debug_3$1 = debug$2.enable;
            var debug_4$1 = debug$2.enabled;
            var debug_5$1 = debug$2.humanize;
            var debug_6$1 = debug$2.instances;
            var debug_7$1 = debug$2.names;
            var debug_8$1 = debug$2.skips;
            var debug_9$1 = debug$2.formatters;

            var browser$2 = createCommonjsModule(function (module, exports) {
            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = debug$2;
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome
                           && 'undefined' != typeof chrome.storage
                              ? chrome.storage.local
                              : localstorage();

            /**
             * Colors.
             */

            exports.colors = [
              '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
              '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
              '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
              '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
              '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
              '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
              '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
              '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
              '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
              '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
              '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
            ];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors() {
              // NB: In an Electron preload script, document will be defined but not fully
              // initialized. Since we know we're in Chrome, we'll just detect this case
              // explicitly
              if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
                return true;
              }

              // Internet Explorer and Edge do not support colors.
              if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                return false;
              }

              // is webkit? http://stackoverflow.com/a/16459606/376773
              // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
              return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
                // is firebug? http://stackoverflow.com/a/398120/376773
                (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
                // is firefox >= v31?
                // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
                // double check webkit in userAgent just in case we are in a worker
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function(v) {
              try {
                return JSON.stringify(v);
              } catch (err) {
                return '[UnexpectedJSONParseError]: ' + err.message;
              }
            };


            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs(args) {
              var useColors = this.useColors;

              args[0] = (useColors ? '%c' : '')
                + this.namespace
                + (useColors ? ' %c' : ' ')
                + args[0]
                + (useColors ? '%c ' : ' ')
                + '+' + exports.humanize(this.diff);

              if (!useColors) return;

              var c = 'color: ' + this.color;
              args.splice(1, 0, c, 'color: inherit');

              // the final "%c" is somewhat tricky, because there could be other
              // arguments passed either before or after the %c, so we need to
              // figure out the correct index to insert the CSS into
              var index = 0;
              var lastC = 0;
              args[0].replace(/%[a-zA-Z%]/g, function(match) {
                if ('%%' === match) return;
                index++;
                if ('%c' === match) {
                  // we only are interested in the *last* %c
                  // (the user may have provided their own)
                  lastC = index;
                }
              });

              args.splice(lastC, 0, c);
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log() {
              // this hackery is required for IE8/9, where
              // the `console.log` function doesn't have 'apply'
              return 'object' === typeof console
                && console.log
                && Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces) {
              try {
                if (null == namespaces) {
                  exports.storage.removeItem('debug');
                } else {
                  exports.storage.debug = namespaces;
                }
              } catch(e) {}
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load() {
              var r;
              try {
                r = exports.storage.debug;
              } catch(e) {}

              // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
              if (!r && typeof process !== 'undefined' && 'env' in process) {
                r = process.env.DEBUG;
              }

              return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage() {
              try {
                return window.localStorage;
              } catch (e) {}
            }
            });
            var browser_1$1 = browser$2.log;
            var browser_2$1 = browser$2.formatArgs;
            var browser_3$1 = browser$2.save;
            var browser_4$1 = browser$2.load;
            var browser_5$1 = browser$2.useColors;
            var browser_6$1 = browser$2.storage;
            var browser_7$1 = browser$2.colors;

            var componentEmitter = createCommonjsModule(function (module) {
            /**
             * Expose `Emitter`.
             */

            {
              module.exports = Emitter;
            }

            /**
             * Initialize a new `Emitter`.
             *
             * @api public
             */

            function Emitter(obj) {
              if (obj) return mixin(obj);
            }
            /**
             * Mixin the emitter properties.
             *
             * @param {Object} obj
             * @return {Object}
             * @api private
             */

            function mixin(obj) {
              for (var key in Emitter.prototype) {
                obj[key] = Emitter.prototype[key];
              }
              return obj;
            }

            /**
             * Listen on the given `event` with `fn`.
             *
             * @param {String} event
             * @param {Function} fn
             * @return {Emitter}
             * @api public
             */

            Emitter.prototype.on =
            Emitter.prototype.addEventListener = function(event, fn){
              this._callbacks = this._callbacks || {};
              (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
                .push(fn);
              return this;
            };

            /**
             * Adds an `event` listener that will be invoked a single
             * time then automatically removed.
             *
             * @param {String} event
             * @param {Function} fn
             * @return {Emitter}
             * @api public
             */

            Emitter.prototype.once = function(event, fn){
              function on() {
                this.off(event, on);
                fn.apply(this, arguments);
              }

              on.fn = fn;
              this.on(event, on);
              return this;
            };

            /**
             * Remove the given callback for `event` or all
             * registered callbacks.
             *
             * @param {String} event
             * @param {Function} fn
             * @return {Emitter}
             * @api public
             */

            Emitter.prototype.off =
            Emitter.prototype.removeListener =
            Emitter.prototype.removeAllListeners =
            Emitter.prototype.removeEventListener = function(event, fn){
              this._callbacks = this._callbacks || {};

              // all
              if (0 == arguments.length) {
                this._callbacks = {};
                return this;
              }

              // specific event
              var callbacks = this._callbacks['$' + event];
              if (!callbacks) return this;

              // remove all handlers
              if (1 == arguments.length) {
                delete this._callbacks['$' + event];
                return this;
              }

              // remove specific handler
              var cb;
              for (var i = 0; i < callbacks.length; i++) {
                cb = callbacks[i];
                if (cb === fn || cb.fn === fn) {
                  callbacks.splice(i, 1);
                  break;
                }
              }
              return this;
            };

            /**
             * Emit `event` with the given args.
             *
             * @param {String} event
             * @param {Mixed} ...
             * @return {Emitter}
             */

            Emitter.prototype.emit = function(event){
              this._callbacks = this._callbacks || {};
              var args = [].slice.call(arguments, 1)
                , callbacks = this._callbacks['$' + event];

              if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                  callbacks[i].apply(this, args);
                }
              }

              return this;
            };

            /**
             * Return array of callbacks for `event`.
             *
             * @param {String} event
             * @return {Array}
             * @api public
             */

            Emitter.prototype.listeners = function(event){
              this._callbacks = this._callbacks || {};
              return this._callbacks['$' + event] || [];
            };

            /**
             * Check if this emitter has `event` handlers.
             *
             * @param {String} event
             * @return {Boolean}
             * @api public
             */

            Emitter.prototype.hasListeners = function(event){
              return !! this.listeners(event).length;
            };
            });

            var toString$1 = {}.toString;

            var isarray$1 = Array.isArray || function (arr) {
              return toString$1.call(arr) == '[object Array]';
            };

            var lookup = [];
            var revLookup = [];
            var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
            var inited = false;
            function init () {
              inited = true;
              var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              for (var i = 0, len = code.length; i < len; ++i) {
                lookup[i] = code[i];
                revLookup[code.charCodeAt(i)] = i;
              }

              revLookup['-'.charCodeAt(0)] = 62;
              revLookup['_'.charCodeAt(0)] = 63;
            }

            function toByteArray (b64) {
              if (!inited) {
                init();
              }
              var i, j, l, tmp, placeHolders, arr;
              var len = b64.length;

              if (len % 4 > 0) {
                throw new Error('Invalid string. Length must be a multiple of 4')
              }

              // the number of equal signs (place holders)
              // if there are two placeholders, than the two characters before it
              // represent one byte
              // if there is only one, then the three characters before it represent 2 bytes
              // this is just a cheap hack to not do indexOf twice
              placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

              // base64 is 4/3 + up to two characters of the original data
              arr = new Arr(len * 3 / 4 - placeHolders);

              // if there are placeholders, only get up to the last complete 4 chars
              l = placeHolders > 0 ? len - 4 : len;

              var L = 0;

              for (i = 0, j = 0; i < l; i += 4, j += 3) {
                tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
                arr[L++] = (tmp >> 16) & 0xFF;
                arr[L++] = (tmp >> 8) & 0xFF;
                arr[L++] = tmp & 0xFF;
              }

              if (placeHolders === 2) {
                tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
                arr[L++] = tmp & 0xFF;
              } else if (placeHolders === 1) {
                tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
                arr[L++] = (tmp >> 8) & 0xFF;
                arr[L++] = tmp & 0xFF;
              }

              return arr
            }

            function tripletToBase64 (num) {
              return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
            }

            function encodeChunk (uint8, start, end) {
              var tmp;
              var output = [];
              for (var i = start; i < end; i += 3) {
                tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
                output.push(tripletToBase64(tmp));
              }
              return output.join('')
            }

            function fromByteArray (uint8) {
              if (!inited) {
                init();
              }
              var tmp;
              var len = uint8.length;
              var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
              var output = '';
              var parts = [];
              var maxChunkLength = 16383; // must be multiple of 3

              // go through the array every three bytes, we'll deal with trailing stuff later
              for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
              }

              // pad the end with zeros, but make sure to not forget the extra bytes
              if (extraBytes === 1) {
                tmp = uint8[len - 1];
                output += lookup[tmp >> 2];
                output += lookup[(tmp << 4) & 0x3F];
                output += '==';
              } else if (extraBytes === 2) {
                tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
                output += lookup[tmp >> 10];
                output += lookup[(tmp >> 4) & 0x3F];
                output += lookup[(tmp << 2) & 0x3F];
                output += '=';
              }

              parts.push(output);

              return parts.join('')
            }

            function read (buffer, offset, isLE, mLen, nBytes) {
              var e, m;
              var eLen = nBytes * 8 - mLen - 1;
              var eMax = (1 << eLen) - 1;
              var eBias = eMax >> 1;
              var nBits = -7;
              var i = isLE ? (nBytes - 1) : 0;
              var d = isLE ? -1 : 1;
              var s = buffer[offset + i];

              i += d;

              e = s & ((1 << (-nBits)) - 1);
              s >>= (-nBits);
              nBits += eLen;
              for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

              m = e & ((1 << (-nBits)) - 1);
              e >>= (-nBits);
              nBits += mLen;
              for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

              if (e === 0) {
                e = 1 - eBias;
              } else if (e === eMax) {
                return m ? NaN : ((s ? -1 : 1) * Infinity)
              } else {
                m = m + Math.pow(2, mLen);
                e = e - eBias;
              }
              return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
            }

            function write (buffer, value, offset, isLE, mLen, nBytes) {
              var e, m, c;
              var eLen = nBytes * 8 - mLen - 1;
              var eMax = (1 << eLen) - 1;
              var eBias = eMax >> 1;
              var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
              var i = isLE ? 0 : (nBytes - 1);
              var d = isLE ? 1 : -1;
              var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

              value = Math.abs(value);

              if (isNaN(value) || value === Infinity) {
                m = isNaN(value) ? 1 : 0;
                e = eMax;
              } else {
                e = Math.floor(Math.log(value) / Math.LN2);
                if (value * (c = Math.pow(2, -e)) < 1) {
                  e--;
                  c *= 2;
                }
                if (e + eBias >= 1) {
                  value += rt / c;
                } else {
                  value += rt * Math.pow(2, 1 - eBias);
                }
                if (value * c >= 2) {
                  e++;
                  c /= 2;
                }

                if (e + eBias >= eMax) {
                  m = 0;
                  e = eMax;
                } else if (e + eBias >= 1) {
                  m = (value * c - 1) * Math.pow(2, mLen);
                  e = e + eBias;
                } else {
                  m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                  e = 0;
                }
              }

              for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

              e = (e << mLen) | m;
              eLen += mLen;
              for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

              buffer[offset + i - d] |= s * 128;
            }

            var toString$2 = {}.toString;

            var isArray$1 = Array.isArray || function (arr) {
              return toString$2.call(arr) == '[object Array]';
            };

            var INSPECT_MAX_BYTES = 50;

            /**
             * If `Buffer.TYPED_ARRAY_SUPPORT`:
             *   === true    Use Uint8Array implementation (fastest)
             *   === false   Use Object implementation (most compatible, even IE6)
             *
             * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
             * Opera 11.6+, iOS 4.2+.
             *
             * Due to various browser bugs, sometimes the Object implementation will be used even
             * when the browser supports typed arrays.
             *
             * Note:
             *
             *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
             *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
             *
             *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
             *
             *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
             *     incorrect length in some situations.

             * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
             * get the Object implementation, which is slower but behaves correctly.
             */
            Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
              ? global$1.TYPED_ARRAY_SUPPORT
              : true;

            function kMaxLength () {
              return Buffer.TYPED_ARRAY_SUPPORT
                ? 0x7fffffff
                : 0x3fffffff
            }

            function createBuffer (that, length) {
              if (kMaxLength() < length) {
                throw new RangeError('Invalid typed array length')
              }
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                // Return an augmented `Uint8Array` instance, for best performance
                that = new Uint8Array(length);
                that.__proto__ = Buffer.prototype;
              } else {
                // Fallback: Return an object instance of the Buffer class
                if (that === null) {
                  that = new Buffer(length);
                }
                that.length = length;
              }

              return that
            }

            /**
             * The Buffer constructor returns instances of `Uint8Array` that have their
             * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
             * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
             * and the `Uint8Array` methods. Square bracket notation works as expected -- it
             * returns a single octet.
             *
             * The `Uint8Array` prototype remains unmodified.
             */

            function Buffer (arg, encodingOrOffset, length) {
              if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
                return new Buffer(arg, encodingOrOffset, length)
              }

              // Common case.
              if (typeof arg === 'number') {
                if (typeof encodingOrOffset === 'string') {
                  throw new Error(
                    'If encoding is specified then the first argument must be a string'
                  )
                }
                return allocUnsafe(this, arg)
              }
              return from(this, arg, encodingOrOffset, length)
            }

            Buffer.poolSize = 8192; // not used by this implementation

            // TODO: Legacy, not needed anymore. Remove in next major version.
            Buffer._augment = function (arr) {
              arr.__proto__ = Buffer.prototype;
              return arr
            };

            function from (that, value, encodingOrOffset, length) {
              if (typeof value === 'number') {
                throw new TypeError('"value" argument must not be a number')
              }

              if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
                return fromArrayBuffer(that, value, encodingOrOffset, length)
              }

              if (typeof value === 'string') {
                return fromString(that, value, encodingOrOffset)
              }

              return fromObject(that, value)
            }

            /**
             * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
             * if value is a number.
             * Buffer.from(str[, encoding])
             * Buffer.from(array)
             * Buffer.from(buffer)
             * Buffer.from(arrayBuffer[, byteOffset[, length]])
             **/
            Buffer.from = function (value, encodingOrOffset, length) {
              return from(null, value, encodingOrOffset, length)
            };

            if (Buffer.TYPED_ARRAY_SUPPORT) {
              Buffer.prototype.__proto__ = Uint8Array.prototype;
              Buffer.__proto__ = Uint8Array;
            }

            function assertSize (size) {
              if (typeof size !== 'number') {
                throw new TypeError('"size" argument must be a number')
              } else if (size < 0) {
                throw new RangeError('"size" argument must not be negative')
              }
            }

            function alloc (that, size, fill, encoding) {
              assertSize(size);
              if (size <= 0) {
                return createBuffer(that, size)
              }
              if (fill !== undefined) {
                // Only pay attention to encoding if it's a string. This
                // prevents accidentally sending in a number that would
                // be interpretted as a start offset.
                return typeof encoding === 'string'
                  ? createBuffer(that, size).fill(fill, encoding)
                  : createBuffer(that, size).fill(fill)
              }
              return createBuffer(that, size)
            }

            /**
             * Creates a new filled Buffer instance.
             * alloc(size[, fill[, encoding]])
             **/
            Buffer.alloc = function (size, fill, encoding) {
              return alloc(null, size, fill, encoding)
            };

            function allocUnsafe (that, size) {
              assertSize(size);
              that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
              if (!Buffer.TYPED_ARRAY_SUPPORT) {
                for (var i = 0; i < size; ++i) {
                  that[i] = 0;
                }
              }
              return that
            }

            /**
             * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
             * */
            Buffer.allocUnsafe = function (size) {
              return allocUnsafe(null, size)
            };
            /**
             * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
             */
            Buffer.allocUnsafeSlow = function (size) {
              return allocUnsafe(null, size)
            };

            function fromString (that, string, encoding) {
              if (typeof encoding !== 'string' || encoding === '') {
                encoding = 'utf8';
              }

              if (!Buffer.isEncoding(encoding)) {
                throw new TypeError('"encoding" must be a valid string encoding')
              }

              var length = byteLength(string, encoding) | 0;
              that = createBuffer(that, length);

              var actual = that.write(string, encoding);

              if (actual !== length) {
                // Writing a hex string, for example, that contains invalid characters will
                // cause everything after the first invalid character to be ignored. (e.g.
                // 'abxxcd' will be treated as 'ab')
                that = that.slice(0, actual);
              }

              return that
            }

            function fromArrayLike (that, array) {
              var length = array.length < 0 ? 0 : checked(array.length) | 0;
              that = createBuffer(that, length);
              for (var i = 0; i < length; i += 1) {
                that[i] = array[i] & 255;
              }
              return that
            }

            function fromArrayBuffer (that, array, byteOffset, length) {
              array.byteLength; // this throws if `array` is not a valid ArrayBuffer

              if (byteOffset < 0 || array.byteLength < byteOffset) {
                throw new RangeError('\'offset\' is out of bounds')
              }

              if (array.byteLength < byteOffset + (length || 0)) {
                throw new RangeError('\'length\' is out of bounds')
              }

              if (byteOffset === undefined && length === undefined) {
                array = new Uint8Array(array);
              } else if (length === undefined) {
                array = new Uint8Array(array, byteOffset);
              } else {
                array = new Uint8Array(array, byteOffset, length);
              }

              if (Buffer.TYPED_ARRAY_SUPPORT) {
                // Return an augmented `Uint8Array` instance, for best performance
                that = array;
                that.__proto__ = Buffer.prototype;
              } else {
                // Fallback: Return an object instance of the Buffer class
                that = fromArrayLike(that, array);
              }
              return that
            }

            function fromObject (that, obj) {
              if (internalIsBuffer(obj)) {
                var len = checked(obj.length) | 0;
                that = createBuffer(that, len);

                if (that.length === 0) {
                  return that
                }

                obj.copy(that, 0, 0, len);
                return that
              }

              if (obj) {
                if ((typeof ArrayBuffer !== 'undefined' &&
                    obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
                  if (typeof obj.length !== 'number' || isnan(obj.length)) {
                    return createBuffer(that, 0)
                  }
                  return fromArrayLike(that, obj)
                }

                if (obj.type === 'Buffer' && isArray$1(obj.data)) {
                  return fromArrayLike(that, obj.data)
                }
              }

              throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
            }

            function checked (length) {
              // Note: cannot use `length < kMaxLength()` here because that fails when
              // length is NaN (which is otherwise coerced to zero.)
              if (length >= kMaxLength()) {
                throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                                     'size: 0x' + kMaxLength().toString(16) + ' bytes')
              }
              return length | 0
            }
            Buffer.isBuffer = isBuffer$1;
            function internalIsBuffer (b) {
              return !!(b != null && b._isBuffer)
            }

            Buffer.compare = function compare (a, b) {
              if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
                throw new TypeError('Arguments must be Buffers')
              }

              if (a === b) return 0

              var x = a.length;
              var y = b.length;

              for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                if (a[i] !== b[i]) {
                  x = a[i];
                  y = b[i];
                  break
                }
              }

              if (x < y) return -1
              if (y < x) return 1
              return 0
            };

            Buffer.isEncoding = function isEncoding (encoding) {
              switch (String(encoding).toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return true
                default:
                  return false
              }
            };

            Buffer.concat = function concat (list, length) {
              if (!isArray$1(list)) {
                throw new TypeError('"list" argument must be an Array of Buffers')
              }

              if (list.length === 0) {
                return Buffer.alloc(0)
              }

              var i;
              if (length === undefined) {
                length = 0;
                for (i = 0; i < list.length; ++i) {
                  length += list[i].length;
                }
              }

              var buffer = Buffer.allocUnsafe(length);
              var pos = 0;
              for (i = 0; i < list.length; ++i) {
                var buf = list[i];
                if (!internalIsBuffer(buf)) {
                  throw new TypeError('"list" argument must be an Array of Buffers')
                }
                buf.copy(buffer, pos);
                pos += buf.length;
              }
              return buffer
            };

            function byteLength (string, encoding) {
              if (internalIsBuffer(string)) {
                return string.length
              }
              if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
                  (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
                return string.byteLength
              }
              if (typeof string !== 'string') {
                string = '' + string;
              }

              var len = string.length;
              if (len === 0) return 0

              // Use a for loop to avoid recursion
              var loweredCase = false;
              for (;;) {
                switch (encoding) {
                  case 'ascii':
                  case 'latin1':
                  case 'binary':
                    return len
                  case 'utf8':
                  case 'utf-8':
                  case undefined:
                    return utf8ToBytes(string).length
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return len * 2
                  case 'hex':
                    return len >>> 1
                  case 'base64':
                    return base64ToBytes(string).length
                  default:
                    if (loweredCase) return utf8ToBytes(string).length // assume utf8
                    encoding = ('' + encoding).toLowerCase();
                    loweredCase = true;
                }
              }
            }
            Buffer.byteLength = byteLength;

            function slowToString (encoding, start, end) {
              var loweredCase = false;

              // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
              // property of a typed array.

              // This behaves neither like String nor Uint8Array in that we set start/end
              // to their upper/lower bounds if the value passed is out of range.
              // undefined is handled specially as per ECMA-262 6th Edition,
              // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
              if (start === undefined || start < 0) {
                start = 0;
              }
              // Return early if start > this.length. Done here to prevent potential uint32
              // coercion fail below.
              if (start > this.length) {
                return ''
              }

              if (end === undefined || end > this.length) {
                end = this.length;
              }

              if (end <= 0) {
                return ''
              }

              // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
              end >>>= 0;
              start >>>= 0;

              if (end <= start) {
                return ''
              }

              if (!encoding) encoding = 'utf8';

              while (true) {
                switch (encoding) {
                  case 'hex':
                    return hexSlice(this, start, end)

                  case 'utf8':
                  case 'utf-8':
                    return utf8Slice(this, start, end)

                  case 'ascii':
                    return asciiSlice(this, start, end)

                  case 'latin1':
                  case 'binary':
                    return latin1Slice(this, start, end)

                  case 'base64':
                    return base64Slice(this, start, end)

                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return utf16leSlice(this, start, end)

                  default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                    encoding = (encoding + '').toLowerCase();
                    loweredCase = true;
                }
              }
            }

            // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
            // Buffer instances.
            Buffer.prototype._isBuffer = true;

            function swap (b, n, m) {
              var i = b[n];
              b[n] = b[m];
              b[m] = i;
            }

            Buffer.prototype.swap16 = function swap16 () {
              var len = this.length;
              if (len % 2 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 16-bits')
              }
              for (var i = 0; i < len; i += 2) {
                swap(this, i, i + 1);
              }
              return this
            };

            Buffer.prototype.swap32 = function swap32 () {
              var len = this.length;
              if (len % 4 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 32-bits')
              }
              for (var i = 0; i < len; i += 4) {
                swap(this, i, i + 3);
                swap(this, i + 1, i + 2);
              }
              return this
            };

            Buffer.prototype.swap64 = function swap64 () {
              var len = this.length;
              if (len % 8 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 64-bits')
              }
              for (var i = 0; i < len; i += 8) {
                swap(this, i, i + 7);
                swap(this, i + 1, i + 6);
                swap(this, i + 2, i + 5);
                swap(this, i + 3, i + 4);
              }
              return this
            };

            Buffer.prototype.toString = function toString () {
              var length = this.length | 0;
              if (length === 0) return ''
              if (arguments.length === 0) return utf8Slice(this, 0, length)
              return slowToString.apply(this, arguments)
            };

            Buffer.prototype.equals = function equals (b) {
              if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
              if (this === b) return true
              return Buffer.compare(this, b) === 0
            };

            Buffer.prototype.inspect = function inspect () {
              var str = '';
              var max = INSPECT_MAX_BYTES;
              if (this.length > 0) {
                str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
                if (this.length > max) str += ' ... ';
              }
              return '<Buffer ' + str + '>'
            };

            Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
              if (!internalIsBuffer(target)) {
                throw new TypeError('Argument must be a Buffer')
              }

              if (start === undefined) {
                start = 0;
              }
              if (end === undefined) {
                end = target ? target.length : 0;
              }
              if (thisStart === undefined) {
                thisStart = 0;
              }
              if (thisEnd === undefined) {
                thisEnd = this.length;
              }

              if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                throw new RangeError('out of range index')
              }

              if (thisStart >= thisEnd && start >= end) {
                return 0
              }
              if (thisStart >= thisEnd) {
                return -1
              }
              if (start >= end) {
                return 1
              }

              start >>>= 0;
              end >>>= 0;
              thisStart >>>= 0;
              thisEnd >>>= 0;

              if (this === target) return 0

              var x = thisEnd - thisStart;
              var y = end - start;
              var len = Math.min(x, y);

              var thisCopy = this.slice(thisStart, thisEnd);
              var targetCopy = target.slice(start, end);

              for (var i = 0; i < len; ++i) {
                if (thisCopy[i] !== targetCopy[i]) {
                  x = thisCopy[i];
                  y = targetCopy[i];
                  break
                }
              }

              if (x < y) return -1
              if (y < x) return 1
              return 0
            };

            // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
            // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
            //
            // Arguments:
            // - buffer - a Buffer to search
            // - val - a string, Buffer, or number
            // - byteOffset - an index into `buffer`; will be clamped to an int32
            // - encoding - an optional encoding, relevant is val is a string
            // - dir - true for indexOf, false for lastIndexOf
            function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
              // Empty buffer means no match
              if (buffer.length === 0) return -1

              // Normalize byteOffset
              if (typeof byteOffset === 'string') {
                encoding = byteOffset;
                byteOffset = 0;
              } else if (byteOffset > 0x7fffffff) {
                byteOffset = 0x7fffffff;
              } else if (byteOffset < -0x80000000) {
                byteOffset = -0x80000000;
              }
              byteOffset = +byteOffset;  // Coerce to Number.
              if (isNaN(byteOffset)) {
                // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
                byteOffset = dir ? 0 : (buffer.length - 1);
              }

              // Normalize byteOffset: negative offsets start from the end of the buffer
              if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
              if (byteOffset >= buffer.length) {
                if (dir) return -1
                else byteOffset = buffer.length - 1;
              } else if (byteOffset < 0) {
                if (dir) byteOffset = 0;
                else return -1
              }

              // Normalize val
              if (typeof val === 'string') {
                val = Buffer.from(val, encoding);
              }

              // Finally, search either indexOf (if dir is true) or lastIndexOf
              if (internalIsBuffer(val)) {
                // Special case: looking for empty string/buffer always fails
                if (val.length === 0) {
                  return -1
                }
                return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
              } else if (typeof val === 'number') {
                val = val & 0xFF; // Search for a byte value [0-255]
                if (Buffer.TYPED_ARRAY_SUPPORT &&
                    typeof Uint8Array.prototype.indexOf === 'function') {
                  if (dir) {
                    return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
                  } else {
                    return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
                  }
                }
                return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
              }

              throw new TypeError('val must be string, number or Buffer')
            }

            function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
              var indexSize = 1;
              var arrLength = arr.length;
              var valLength = val.length;

              if (encoding !== undefined) {
                encoding = String(encoding).toLowerCase();
                if (encoding === 'ucs2' || encoding === 'ucs-2' ||
                    encoding === 'utf16le' || encoding === 'utf-16le') {
                  if (arr.length < 2 || val.length < 2) {
                    return -1
                  }
                  indexSize = 2;
                  arrLength /= 2;
                  valLength /= 2;
                  byteOffset /= 2;
                }
              }

              function read$$1 (buf, i) {
                if (indexSize === 1) {
                  return buf[i]
                } else {
                  return buf.readUInt16BE(i * indexSize)
                }
              }

              var i;
              if (dir) {
                var foundIndex = -1;
                for (i = byteOffset; i < arrLength; i++) {
                  if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                    if (foundIndex === -1) foundIndex = i;
                    if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
                  } else {
                    if (foundIndex !== -1) i -= i - foundIndex;
                    foundIndex = -1;
                  }
                }
              } else {
                if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
                for (i = byteOffset; i >= 0; i--) {
                  var found = true;
                  for (var j = 0; j < valLength; j++) {
                    if (read$$1(arr, i + j) !== read$$1(val, j)) {
                      found = false;
                      break
                    }
                  }
                  if (found) return i
                }
              }

              return -1
            }

            Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
              return this.indexOf(val, byteOffset, encoding) !== -1
            };

            Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
              return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
            };

            Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
              return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
            };

            function hexWrite (buf, string, offset, length) {
              offset = Number(offset) || 0;
              var remaining = buf.length - offset;
              if (!length) {
                length = remaining;
              } else {
                length = Number(length);
                if (length > remaining) {
                  length = remaining;
                }
              }

              // must be an even number of digits
              var strLen = string.length;
              if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

              if (length > strLen / 2) {
                length = strLen / 2;
              }
              for (var i = 0; i < length; ++i) {
                var parsed = parseInt(string.substr(i * 2, 2), 16);
                if (isNaN(parsed)) return i
                buf[offset + i] = parsed;
              }
              return i
            }

            function utf8Write (buf, string, offset, length) {
              return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
            }

            function asciiWrite (buf, string, offset, length) {
              return blitBuffer(asciiToBytes(string), buf, offset, length)
            }

            function latin1Write (buf, string, offset, length) {
              return asciiWrite(buf, string, offset, length)
            }

            function base64Write (buf, string, offset, length) {
              return blitBuffer(base64ToBytes(string), buf, offset, length)
            }

            function ucs2Write (buf, string, offset, length) {
              return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
            }

            Buffer.prototype.write = function write$$1 (string, offset, length, encoding) {
              // Buffer#write(string)
              if (offset === undefined) {
                encoding = 'utf8';
                length = this.length;
                offset = 0;
              // Buffer#write(string, encoding)
              } else if (length === undefined && typeof offset === 'string') {
                encoding = offset;
                length = this.length;
                offset = 0;
              // Buffer#write(string, offset[, length][, encoding])
              } else if (isFinite(offset)) {
                offset = offset | 0;
                if (isFinite(length)) {
                  length = length | 0;
                  if (encoding === undefined) encoding = 'utf8';
                } else {
                  encoding = length;
                  length = undefined;
                }
              // legacy write(string, encoding, offset, length) - remove in v0.13
              } else {
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                )
              }

              var remaining = this.length - offset;
              if (length === undefined || length > remaining) length = remaining;

              if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
                throw new RangeError('Attempt to write outside buffer bounds')
              }

              if (!encoding) encoding = 'utf8';

              var loweredCase = false;
              for (;;) {
                switch (encoding) {
                  case 'hex':
                    return hexWrite(this, string, offset, length)

                  case 'utf8':
                  case 'utf-8':
                    return utf8Write(this, string, offset, length)

                  case 'ascii':
                    return asciiWrite(this, string, offset, length)

                  case 'latin1':
                  case 'binary':
                    return latin1Write(this, string, offset, length)

                  case 'base64':
                    // Warning: maxLength not taken into account in base64Write
                    return base64Write(this, string, offset, length)

                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return ucs2Write(this, string, offset, length)

                  default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                    encoding = ('' + encoding).toLowerCase();
                    loweredCase = true;
                }
              }
            };

            Buffer.prototype.toJSON = function toJSON () {
              return {
                type: 'Buffer',
                data: Array.prototype.slice.call(this._arr || this, 0)
              }
            };

            function base64Slice (buf, start, end) {
              if (start === 0 && end === buf.length) {
                return fromByteArray(buf)
              } else {
                return fromByteArray(buf.slice(start, end))
              }
            }

            function utf8Slice (buf, start, end) {
              end = Math.min(buf.length, end);
              var res = [];

              var i = start;
              while (i < end) {
                var firstByte = buf[i];
                var codePoint = null;
                var bytesPerSequence = (firstByte > 0xEF) ? 4
                  : (firstByte > 0xDF) ? 3
                  : (firstByte > 0xBF) ? 2
                  : 1;

                if (i + bytesPerSequence <= end) {
                  var secondByte, thirdByte, fourthByte, tempCodePoint;

                  switch (bytesPerSequence) {
                    case 1:
                      if (firstByte < 0x80) {
                        codePoint = firstByte;
                      }
                      break
                    case 2:
                      secondByte = buf[i + 1];
                      if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                        if (tempCodePoint > 0x7F) {
                          codePoint = tempCodePoint;
                        }
                      }
                      break
                    case 3:
                      secondByte = buf[i + 1];
                      thirdByte = buf[i + 2];
                      if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                          codePoint = tempCodePoint;
                        }
                      }
                      break
                    case 4:
                      secondByte = buf[i + 1];
                      thirdByte = buf[i + 2];
                      fourthByte = buf[i + 3];
                      if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                          codePoint = tempCodePoint;
                        }
                      }
                  }
                }

                if (codePoint === null) {
                  // we did not generate a valid codePoint so insert a
                  // replacement char (U+FFFD) and advance only 1 byte
                  codePoint = 0xFFFD;
                  bytesPerSequence = 1;
                } else if (codePoint > 0xFFFF) {
                  // encode to utf16 (surrogate pair dance)
                  codePoint -= 0x10000;
                  res.push(codePoint >>> 10 & 0x3FF | 0xD800);
                  codePoint = 0xDC00 | codePoint & 0x3FF;
                }

                res.push(codePoint);
                i += bytesPerSequence;
              }

              return decodeCodePointsArray(res)
            }

            // Based on http://stackoverflow.com/a/22747272/680742, the browser with
            // the lowest limit is Chrome, with 0x10000 args.
            // We go 1 magnitude less, for safety
            var MAX_ARGUMENTS_LENGTH = 0x1000;

            function decodeCodePointsArray (codePoints) {
              var len = codePoints.length;
              if (len <= MAX_ARGUMENTS_LENGTH) {
                return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
              }

              // Decode in chunks to avoid "call stack size exceeded".
              var res = '';
              var i = 0;
              while (i < len) {
                res += String.fromCharCode.apply(
                  String,
                  codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
                );
              }
              return res
            }

            function asciiSlice (buf, start, end) {
              var ret = '';
              end = Math.min(buf.length, end);

              for (var i = start; i < end; ++i) {
                ret += String.fromCharCode(buf[i] & 0x7F);
              }
              return ret
            }

            function latin1Slice (buf, start, end) {
              var ret = '';
              end = Math.min(buf.length, end);

              for (var i = start; i < end; ++i) {
                ret += String.fromCharCode(buf[i]);
              }
              return ret
            }

            function hexSlice (buf, start, end) {
              var len = buf.length;

              if (!start || start < 0) start = 0;
              if (!end || end < 0 || end > len) end = len;

              var out = '';
              for (var i = start; i < end; ++i) {
                out += toHex(buf[i]);
              }
              return out
            }

            function utf16leSlice (buf, start, end) {
              var bytes = buf.slice(start, end);
              var res = '';
              for (var i = 0; i < bytes.length; i += 2) {
                res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
              }
              return res
            }

            Buffer.prototype.slice = function slice (start, end) {
              var len = this.length;
              start = ~~start;
              end = end === undefined ? len : ~~end;

              if (start < 0) {
                start += len;
                if (start < 0) start = 0;
              } else if (start > len) {
                start = len;
              }

              if (end < 0) {
                end += len;
                if (end < 0) end = 0;
              } else if (end > len) {
                end = len;
              }

              if (end < start) end = start;

              var newBuf;
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                newBuf = this.subarray(start, end);
                newBuf.__proto__ = Buffer.prototype;
              } else {
                var sliceLen = end - start;
                newBuf = new Buffer(sliceLen, undefined);
                for (var i = 0; i < sliceLen; ++i) {
                  newBuf[i] = this[i + start];
                }
              }

              return newBuf
            };

            /*
             * Need to make sure that buffer isn't trying to write out of bounds.
             */
            function checkOffset (offset, ext, length) {
              if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
              if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
            }

            Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) checkOffset(offset, byteLength, this.length);

              var val = this[offset];
              var mul = 1;
              var i = 0;
              while (++i < byteLength && (mul *= 0x100)) {
                val += this[offset + i] * mul;
              }

              return val
            };

            Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) {
                checkOffset(offset, byteLength, this.length);
              }

              var val = this[offset + --byteLength];
              var mul = 1;
              while (byteLength > 0 && (mul *= 0x100)) {
                val += this[offset + --byteLength] * mul;
              }

              return val
            };

            Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 1, this.length);
              return this[offset]
            };

            Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 2, this.length);
              return this[offset] | (this[offset + 1] << 8)
            };

            Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 2, this.length);
              return (this[offset] << 8) | this[offset + 1]
            };

            Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);

              return ((this[offset]) |
                  (this[offset + 1] << 8) |
                  (this[offset + 2] << 16)) +
                  (this[offset + 3] * 0x1000000)
            };

            Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);

              return (this[offset] * 0x1000000) +
                ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            };

            Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) checkOffset(offset, byteLength, this.length);

              var val = this[offset];
              var mul = 1;
              var i = 0;
              while (++i < byteLength && (mul *= 0x100)) {
                val += this[offset + i] * mul;
              }
              mul *= 0x80;

              if (val >= mul) val -= Math.pow(2, 8 * byteLength);

              return val
            };

            Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) checkOffset(offset, byteLength, this.length);

              var i = byteLength;
              var mul = 1;
              var val = this[offset + --i];
              while (i > 0 && (mul *= 0x100)) {
                val += this[offset + --i] * mul;
              }
              mul *= 0x80;

              if (val >= mul) val -= Math.pow(2, 8 * byteLength);

              return val
            };

            Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 1, this.length);
              if (!(this[offset] & 0x80)) return (this[offset])
              return ((0xff - this[offset] + 1) * -1)
            };

            Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 2, this.length);
              var val = this[offset] | (this[offset + 1] << 8);
              return (val & 0x8000) ? val | 0xFFFF0000 : val
            };

            Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 2, this.length);
              var val = this[offset + 1] | (this[offset] << 8);
              return (val & 0x8000) ? val | 0xFFFF0000 : val
            };

            Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);

              return (this[offset]) |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16) |
                (this[offset + 3] << 24)
            };

            Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);

              return (this[offset] << 24) |
                (this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                (this[offset + 3])
            };

            Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);
              return read(this, offset, true, 23, 4)
            };

            Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);
              return read(this, offset, false, 23, 4)
            };

            Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 8, this.length);
              return read(this, offset, true, 52, 8)
            };

            Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 8, this.length);
              return read(this, offset, false, 52, 8)
            };

            function checkInt (buf, value, offset, ext, max, min) {
              if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
              if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
              if (offset + ext > buf.length) throw new RangeError('Index out of range')
            }

            Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
              value = +value;
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                checkInt(this, value, offset, byteLength, maxBytes, 0);
              }

              var mul = 1;
              var i = 0;
              this[offset] = value & 0xFF;
              while (++i < byteLength && (mul *= 0x100)) {
                this[offset + i] = (value / mul) & 0xFF;
              }

              return offset + byteLength
            };

            Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
              value = +value;
              offset = offset | 0;
              byteLength = byteLength | 0;
              if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                checkInt(this, value, offset, byteLength, maxBytes, 0);
              }

              var i = byteLength - 1;
              var mul = 1;
              this[offset + i] = value & 0xFF;
              while (--i >= 0 && (mul *= 0x100)) {
                this[offset + i] = (value / mul) & 0xFF;
              }

              return offset + byteLength
            };

            Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
              if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
              this[offset] = (value & 0xff);
              return offset + 1
            };

            function objectWriteUInt16 (buf, value, offset, littleEndian) {
              if (value < 0) value = 0xffff + value + 1;
              for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
                buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                  (littleEndian ? i : 1 - i) * 8;
              }
            }

            Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value & 0xff);
                this[offset + 1] = (value >>> 8);
              } else {
                objectWriteUInt16(this, value, offset, true);
              }
              return offset + 2
            };

            Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value >>> 8);
                this[offset + 1] = (value & 0xff);
              } else {
                objectWriteUInt16(this, value, offset, false);
              }
              return offset + 2
            };

            function objectWriteUInt32 (buf, value, offset, littleEndian) {
              if (value < 0) value = 0xffffffff + value + 1;
              for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
                buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
              }
            }

            Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset + 3] = (value >>> 24);
                this[offset + 2] = (value >>> 16);
                this[offset + 1] = (value >>> 8);
                this[offset] = (value & 0xff);
              } else {
                objectWriteUInt32(this, value, offset, true);
              }
              return offset + 4
            };

            Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value >>> 24);
                this[offset + 1] = (value >>> 16);
                this[offset + 2] = (value >>> 8);
                this[offset + 3] = (value & 0xff);
              } else {
                objectWriteUInt32(this, value, offset, false);
              }
              return offset + 4
            };

            Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength - 1);

                checkInt(this, value, offset, byteLength, limit - 1, -limit);
              }

              var i = 0;
              var mul = 1;
              var sub = 0;
              this[offset] = value & 0xFF;
              while (++i < byteLength && (mul *= 0x100)) {
                if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                  sub = 1;
                }
                this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
              }

              return offset + byteLength
            };

            Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength - 1);

                checkInt(this, value, offset, byteLength, limit - 1, -limit);
              }

              var i = byteLength - 1;
              var mul = 1;
              var sub = 0;
              this[offset + i] = value & 0xFF;
              while (--i >= 0 && (mul *= 0x100)) {
                if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                  sub = 1;
                }
                this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
              }

              return offset + byteLength
            };

            Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
              if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
              if (value < 0) value = 0xff + value + 1;
              this[offset] = (value & 0xff);
              return offset + 1
            };

            Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value & 0xff);
                this[offset + 1] = (value >>> 8);
              } else {
                objectWriteUInt16(this, value, offset, true);
              }
              return offset + 2
            };

            Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value >>> 8);
                this[offset + 1] = (value & 0xff);
              } else {
                objectWriteUInt16(this, value, offset, false);
              }
              return offset + 2
            };

            Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value & 0xff);
                this[offset + 1] = (value >>> 8);
                this[offset + 2] = (value >>> 16);
                this[offset + 3] = (value >>> 24);
              } else {
                objectWriteUInt32(this, value, offset, true);
              }
              return offset + 4
            };

            Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
              value = +value;
              offset = offset | 0;
              if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
              if (value < 0) value = 0xffffffff + value + 1;
              if (Buffer.TYPED_ARRAY_SUPPORT) {
                this[offset] = (value >>> 24);
                this[offset + 1] = (value >>> 16);
                this[offset + 2] = (value >>> 8);
                this[offset + 3] = (value & 0xff);
              } else {
                objectWriteUInt32(this, value, offset, false);
              }
              return offset + 4
            };

            function checkIEEE754 (buf, value, offset, ext, max, min) {
              if (offset + ext > buf.length) throw new RangeError('Index out of range')
              if (offset < 0) throw new RangeError('Index out of range')
            }

            function writeFloat (buf, value, offset, littleEndian, noAssert) {
              if (!noAssert) {
                checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
              }
              write(buf, value, offset, littleEndian, 23, 4);
              return offset + 4
            }

            Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
              return writeFloat(this, value, offset, true, noAssert)
            };

            Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
              return writeFloat(this, value, offset, false, noAssert)
            };

            function writeDouble (buf, value, offset, littleEndian, noAssert) {
              if (!noAssert) {
                checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
              }
              write(buf, value, offset, littleEndian, 52, 8);
              return offset + 8
            }

            Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
              return writeDouble(this, value, offset, true, noAssert)
            };

            Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
              return writeDouble(this, value, offset, false, noAssert)
            };

            // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
            Buffer.prototype.copy = function copy (target, targetStart, start, end) {
              if (!start) start = 0;
              if (!end && end !== 0) end = this.length;
              if (targetStart >= target.length) targetStart = target.length;
              if (!targetStart) targetStart = 0;
              if (end > 0 && end < start) end = start;

              // Copy 0 bytes; we're done
              if (end === start) return 0
              if (target.length === 0 || this.length === 0) return 0

              // Fatal error conditions
              if (targetStart < 0) {
                throw new RangeError('targetStart out of bounds')
              }
              if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
              if (end < 0) throw new RangeError('sourceEnd out of bounds')

              // Are we oob?
              if (end > this.length) end = this.length;
              if (target.length - targetStart < end - start) {
                end = target.length - targetStart + start;
              }

              var len = end - start;
              var i;

              if (this === target && start < targetStart && targetStart < end) {
                // descending copy from end
                for (i = len - 1; i >= 0; --i) {
                  target[i + targetStart] = this[i + start];
                }
              } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
                // ascending copy from start
                for (i = 0; i < len; ++i) {
                  target[i + targetStart] = this[i + start];
                }
              } else {
                Uint8Array.prototype.set.call(
                  target,
                  this.subarray(start, start + len),
                  targetStart
                );
              }

              return len
            };

            // Usage:
            //    buffer.fill(number[, offset[, end]])
            //    buffer.fill(buffer[, offset[, end]])
            //    buffer.fill(string[, offset[, end]][, encoding])
            Buffer.prototype.fill = function fill (val, start, end, encoding) {
              // Handle string cases:
              if (typeof val === 'string') {
                if (typeof start === 'string') {
                  encoding = start;
                  start = 0;
                  end = this.length;
                } else if (typeof end === 'string') {
                  encoding = end;
                  end = this.length;
                }
                if (val.length === 1) {
                  var code = val.charCodeAt(0);
                  if (code < 256) {
                    val = code;
                  }
                }
                if (encoding !== undefined && typeof encoding !== 'string') {
                  throw new TypeError('encoding must be a string')
                }
                if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                  throw new TypeError('Unknown encoding: ' + encoding)
                }
              } else if (typeof val === 'number') {
                val = val & 255;
              }

              // Invalid ranges are not set to a default, so can range check early.
              if (start < 0 || this.length < start || this.length < end) {
                throw new RangeError('Out of range index')
              }

              if (end <= start) {
                return this
              }

              start = start >>> 0;
              end = end === undefined ? this.length : end >>> 0;

              if (!val) val = 0;

              var i;
              if (typeof val === 'number') {
                for (i = start; i < end; ++i) {
                  this[i] = val;
                }
              } else {
                var bytes = internalIsBuffer(val)
                  ? val
                  : utf8ToBytes(new Buffer(val, encoding).toString());
                var len = bytes.length;
                for (i = 0; i < end - start; ++i) {
                  this[i + start] = bytes[i % len];
                }
              }

              return this
            };

            // HELPER FUNCTIONS
            // ================

            var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

            function base64clean (str) {
              // Node strips out invalid characters like \n and \t from the string, base64-js does not
              str = stringtrim(str).replace(INVALID_BASE64_RE, '');
              // Node converts strings with length < 2 to ''
              if (str.length < 2) return ''
              // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
              while (str.length % 4 !== 0) {
                str = str + '=';
              }
              return str
            }

            function stringtrim (str) {
              if (str.trim) return str.trim()
              return str.replace(/^\s+|\s+$/g, '')
            }

            function toHex (n) {
              if (n < 16) return '0' + n.toString(16)
              return n.toString(16)
            }

            function utf8ToBytes (string, units) {
              units = units || Infinity;
              var codePoint;
              var length = string.length;
              var leadSurrogate = null;
              var bytes = [];

              for (var i = 0; i < length; ++i) {
                codePoint = string.charCodeAt(i);

                // is surrogate component
                if (codePoint > 0xD7FF && codePoint < 0xE000) {
                  // last char was a lead
                  if (!leadSurrogate) {
                    // no lead yet
                    if (codePoint > 0xDBFF) {
                      // unexpected trail
                      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                      continue
                    } else if (i + 1 === length) {
                      // unpaired lead
                      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                      continue
                    }

                    // valid lead
                    leadSurrogate = codePoint;

                    continue
                  }

                  // 2 leads in a row
                  if (codePoint < 0xDC00) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    leadSurrogate = codePoint;
                    continue
                  }

                  // valid surrogate pair
                  codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
                } else if (leadSurrogate) {
                  // valid bmp char, but last char was a lead
                  if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                }

                leadSurrogate = null;

                // encode utf8
                if (codePoint < 0x80) {
                  if ((units -= 1) < 0) break
                  bytes.push(codePoint);
                } else if (codePoint < 0x800) {
                  if ((units -= 2) < 0) break
                  bytes.push(
                    codePoint >> 0x6 | 0xC0,
                    codePoint & 0x3F | 0x80
                  );
                } else if (codePoint < 0x10000) {
                  if ((units -= 3) < 0) break
                  bytes.push(
                    codePoint >> 0xC | 0xE0,
                    codePoint >> 0x6 & 0x3F | 0x80,
                    codePoint & 0x3F | 0x80
                  );
                } else if (codePoint < 0x110000) {
                  if ((units -= 4) < 0) break
                  bytes.push(
                    codePoint >> 0x12 | 0xF0,
                    codePoint >> 0xC & 0x3F | 0x80,
                    codePoint >> 0x6 & 0x3F | 0x80,
                    codePoint & 0x3F | 0x80
                  );
                } else {
                  throw new Error('Invalid code point')
                }
              }

              return bytes
            }

            function asciiToBytes (str) {
              var byteArray = [];
              for (var i = 0; i < str.length; ++i) {
                // Node's code seems to be doing this and not & 0x7F..
                byteArray.push(str.charCodeAt(i) & 0xFF);
              }
              return byteArray
            }

            function utf16leToBytes (str, units) {
              var c, hi, lo;
              var byteArray = [];
              for (var i = 0; i < str.length; ++i) {
                if ((units -= 2) < 0) break

                c = str.charCodeAt(i);
                hi = c >> 8;
                lo = c % 256;
                byteArray.push(lo);
                byteArray.push(hi);
              }

              return byteArray
            }


            function base64ToBytes (str) {
              return toByteArray(base64clean(str))
            }

            function blitBuffer (src, dst, offset, length) {
              for (var i = 0; i < length; ++i) {
                if ((i + offset >= dst.length) || (i >= src.length)) break
                dst[i + offset] = src[i];
              }
              return i
            }

            function isnan (val) {
              return val !== val // eslint-disable-line no-self-compare
            }


            // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
            // The _isBuffer check is for Safari 5-7 support, because it's missing
            // Object.prototype.constructor. Remove this eventually
            function isBuffer$1(obj) {
              return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
            }

            function isFastBuffer (obj) {
              return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
            }

            // For Node v0.10 support. Remove this eventually.
            function isSlowBuffer (obj) {
              return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
            }

            var isBuffer$2 = isBuf;

            var withNativeBuffer = typeof Buffer === 'function' && typeof isBuffer$1 === 'function';
            var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

            var isView = function (obj) {
              return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : (obj.buffer instanceof ArrayBuffer);
            };

            /**
             * Returns true if obj is a buffer or an arraybuffer.
             *
             * @api private
             */

            function isBuf(obj) {
              return (withNativeBuffer && isBuffer$1(obj)) ||
                      (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
            }

            /*global Blob,File*/

            /**
             * Module requirements
             */



            var toString$3 = Object.prototype.toString;
            var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString$3.call(Blob) === '[object BlobConstructor]');
            var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString$3.call(File) === '[object FileConstructor]');

            /**
             * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
             * Anything with blobs or files should be fed through removeBlobs before coming
             * here.
             *
             * @param {Object} packet - socket.io event packet
             * @return {Object} with deconstructed packet and list of buffers
             * @api public
             */

            var deconstructPacket = function(packet) {
              var buffers = [];
              var packetData = packet.data;
              var pack = packet;
              pack.data = _deconstructPacket(packetData, buffers);
              pack.attachments = buffers.length; // number of binary 'attachments'
              return {packet: pack, buffers: buffers};
            };

            function _deconstructPacket(data, buffers) {
              if (!data) return data;

              if (isBuffer$2(data)) {
                var placeholder = { _placeholder: true, num: buffers.length };
                buffers.push(data);
                return placeholder;
              } else if (isarray$1(data)) {
                var newData = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                  newData[i] = _deconstructPacket(data[i], buffers);
                }
                return newData;
              } else if (typeof data === 'object' && !(data instanceof Date)) {
                var newData = {};
                for (var key in data) {
                  newData[key] = _deconstructPacket(data[key], buffers);
                }
                return newData;
              }
              return data;
            }

            /**
             * Reconstructs a binary packet from its placeholder packet and buffers
             *
             * @param {Object} packet - event packet with placeholders
             * @param {Array} buffers - binary buffers to put in placeholder positions
             * @return {Object} reconstructed packet
             * @api public
             */

            var reconstructPacket = function(packet, buffers) {
              packet.data = _reconstructPacket(packet.data, buffers);
              packet.attachments = undefined; // no longer useful
              return packet;
            };

            function _reconstructPacket(data, buffers) {
              if (!data) return data;

              if (data && data._placeholder) {
                return buffers[data.num]; // appropriate buffer (should be natural order anyway)
              } else if (isarray$1(data)) {
                for (var i = 0; i < data.length; i++) {
                  data[i] = _reconstructPacket(data[i], buffers);
                }
              } else if (typeof data === 'object') {
                for (var key in data) {
                  data[key] = _reconstructPacket(data[key], buffers);
                }
              }

              return data;
            }

            /**
             * Asynchronously removes Blobs or Files from data via
             * FileReader's readAsArrayBuffer method. Used before encoding
             * data as msgpack. Calls callback with the blobless data.
             *
             * @param {Object} data
             * @param {Function} callback
             * @api private
             */

            var removeBlobs = function(data, callback) {
              function _removeBlobs(obj, curKey, containingObject) {
                if (!obj) return obj;

                // convert any blob
                if ((withNativeBlob && obj instanceof Blob) ||
                    (withNativeFile && obj instanceof File)) {
                  pendingBlobs++;

                  // async filereader
                  var fileReader = new FileReader();
                  fileReader.onload = function() { // this.result == arraybuffer
                    if (containingObject) {
                      containingObject[curKey] = this.result;
                    }
                    else {
                      bloblessData = this.result;
                    }

                    // if nothing pending its callback time
                    if(! --pendingBlobs) {
                      callback(bloblessData);
                    }
                  };

                  fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
                } else if (isarray$1(obj)) { // handle array
                  for (var i = 0; i < obj.length; i++) {
                    _removeBlobs(obj[i], i, obj);
                  }
                } else if (typeof obj === 'object' && !isBuffer$2(obj)) { // and object
                  for (var key in obj) {
                    _removeBlobs(obj[key], key, obj);
                  }
                }
              }

              var pendingBlobs = 0;
              var bloblessData = data;
              _removeBlobs(bloblessData);
              if (!pendingBlobs) {
                callback(bloblessData);
              }
            };

            var binary = {
            	deconstructPacket: deconstructPacket,
            	reconstructPacket: reconstructPacket,
            	removeBlobs: removeBlobs
            };

            var socket_ioParser = createCommonjsModule(function (module, exports) {
            /**
             * Module dependencies.
             */

            var debug = browser$2('socket.io-parser');





            /**
             * Protocol version.
             *
             * @api public
             */

            exports.protocol = 4;

            /**
             * Packet types.
             *
             * @api public
             */

            exports.types = [
              'CONNECT',
              'DISCONNECT',
              'EVENT',
              'ACK',
              'ERROR',
              'BINARY_EVENT',
              'BINARY_ACK'
            ];

            /**
             * Packet type `connect`.
             *
             * @api public
             */

            exports.CONNECT = 0;

            /**
             * Packet type `disconnect`.
             *
             * @api public
             */

            exports.DISCONNECT = 1;

            /**
             * Packet type `event`.
             *
             * @api public
             */

            exports.EVENT = 2;

            /**
             * Packet type `ack`.
             *
             * @api public
             */

            exports.ACK = 3;

            /**
             * Packet type `error`.
             *
             * @api public
             */

            exports.ERROR = 4;

            /**
             * Packet type 'binary event'
             *
             * @api public
             */

            exports.BINARY_EVENT = 5;

            /**
             * Packet type `binary ack`. For acks with binary arguments.
             *
             * @api public
             */

            exports.BINARY_ACK = 6;

            /**
             * Encoder constructor.
             *
             * @api public
             */

            exports.Encoder = Encoder;

            /**
             * Decoder constructor.
             *
             * @api public
             */

            exports.Decoder = Decoder;

            /**
             * A socket.io Encoder instance
             *
             * @api public
             */

            function Encoder() {}

            var ERROR_PACKET = exports.ERROR + '"encode error"';

            /**
             * Encode a packet as a single string if non-binary, or as a
             * buffer sequence, depending on packet type.
             *
             * @param {Object} obj - packet object
             * @param {Function} callback - function to handle encodings (likely engine.write)
             * @return Calls callback with Array of encodings
             * @api public
             */

            Encoder.prototype.encode = function(obj, callback){
              debug('encoding packet %j', obj);

              if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
                encodeAsBinary(obj, callback);
              } else {
                var encoding = encodeAsString(obj);
                callback([encoding]);
              }
            };

            /**
             * Encode packet as string.
             *
             * @param {Object} packet
             * @return {String} encoded
             * @api private
             */

            function encodeAsString(obj) {

              // first is type
              var str = '' + obj.type;

              // attachments if we have them
              if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
                str += obj.attachments + '-';
              }

              // if we have a namespace other than `/`
              // we append it followed by a comma `,`
              if (obj.nsp && '/' !== obj.nsp) {
                str += obj.nsp + ',';
              }

              // immediately followed by the id
              if (null != obj.id) {
                str += obj.id;
              }

              // json data
              if (null != obj.data) {
                var payload = tryStringify(obj.data);
                if (payload !== false) {
                  str += payload;
                } else {
                  return ERROR_PACKET;
                }
              }

              debug('encoded %j as %s', obj, str);
              return str;
            }

            function tryStringify(str) {
              try {
                return JSON.stringify(str);
              } catch(e){
                return false;
              }
            }

            /**
             * Encode packet as 'buffer sequence' by removing blobs, and
             * deconstructing packet into object with placeholders and
             * a list of buffers.
             *
             * @param {Object} packet
             * @return {Buffer} encoded
             * @api private
             */

            function encodeAsBinary(obj, callback) {

              function writeEncoding(bloblessData) {
                var deconstruction = binary.deconstructPacket(bloblessData);
                var pack = encodeAsString(deconstruction.packet);
                var buffers = deconstruction.buffers;

                buffers.unshift(pack); // add packet info to beginning of data list
                callback(buffers); // write all the buffers
              }

              binary.removeBlobs(obj, writeEncoding);
            }

            /**
             * A socket.io Decoder instance
             *
             * @return {Object} decoder
             * @api public
             */

            function Decoder() {
              this.reconstructor = null;
            }

            /**
             * Mix in `Emitter` with Decoder.
             */

            componentEmitter(Decoder.prototype);

            /**
             * Decodes an encoded packet string into packet JSON.
             *
             * @param {String} obj - encoded packet
             * @return {Object} packet
             * @api public
             */

            Decoder.prototype.add = function(obj) {
              var packet;
              if (typeof obj === 'string') {
                packet = decodeString(obj);
                if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
                  this.reconstructor = new BinaryReconstructor(packet);

                  // no attachments, labeled binary but no binary data to follow
                  if (this.reconstructor.reconPack.attachments === 0) {
                    this.emit('decoded', packet);
                  }
                } else { // non-binary full packet
                  this.emit('decoded', packet);
                }
              } else if (isBuffer$2(obj) || obj.base64) { // raw binary data
                if (!this.reconstructor) {
                  throw new Error('got binary data when not reconstructing a packet');
                } else {
                  packet = this.reconstructor.takeBinaryData(obj);
                  if (packet) { // received final buffer
                    this.reconstructor = null;
                    this.emit('decoded', packet);
                  }
                }
              } else {
                throw new Error('Unknown type: ' + obj);
              }
            };

            /**
             * Decode a packet String (JSON data)
             *
             * @param {String} str
             * @return {Object} packet
             * @api private
             */

            function decodeString(str) {
              var i = 0;
              // look up type
              var p = {
                type: Number(str.charAt(0))
              };

              if (null == exports.types[p.type]) {
                return error('unknown packet type ' + p.type);
              }

              // look up attachments if type binary
              if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
                var buf = '';
                while (str.charAt(++i) !== '-') {
                  buf += str.charAt(i);
                  if (i == str.length) break;
                }
                if (buf != Number(buf) || str.charAt(i) !== '-') {
                  throw new Error('Illegal attachments');
                }
                p.attachments = Number(buf);
              }

              // look up namespace (if any)
              if ('/' === str.charAt(i + 1)) {
                p.nsp = '';
                while (++i) {
                  var c = str.charAt(i);
                  if (',' === c) break;
                  p.nsp += c;
                  if (i === str.length) break;
                }
              } else {
                p.nsp = '/';
              }

              // look up id
              var next = str.charAt(i + 1);
              if ('' !== next && Number(next) == next) {
                p.id = '';
                while (++i) {
                  var c = str.charAt(i);
                  if (null == c || Number(c) != c) {
                    --i;
                    break;
                  }
                  p.id += str.charAt(i);
                  if (i === str.length) break;
                }
                p.id = Number(p.id);
              }

              // look up json data
              if (str.charAt(++i)) {
                var payload = tryParse(str.substr(i));
                var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray$1(payload));
                if (isPayloadValid) {
                  p.data = payload;
                } else {
                  return error('invalid payload');
                }
              }

              debug('decoded %s as %j', str, p);
              return p;
            }

            function tryParse(str) {
              try {
                return JSON.parse(str);
              } catch(e){
                return false;
              }
            }

            /**
             * Deallocates a parser's resources
             *
             * @api public
             */

            Decoder.prototype.destroy = function() {
              if (this.reconstructor) {
                this.reconstructor.finishedReconstruction();
              }
            };

            /**
             * A manager of a binary event's 'buffer sequence'. Should
             * be constructed whenever a packet of type BINARY_EVENT is
             * decoded.
             *
             * @param {Object} packet
             * @return {BinaryReconstructor} initialized reconstructor
             * @api private
             */

            function BinaryReconstructor(packet) {
              this.reconPack = packet;
              this.buffers = [];
            }

            /**
             * Method to be called when binary data received from connection
             * after a BINARY_EVENT packet.
             *
             * @param {Buffer | ArrayBuffer} binData - the raw binary data received
             * @return {null | Object} returns null if more binary data is expected or
             *   a reconstructed packet object if all buffers have been received.
             * @api private
             */

            BinaryReconstructor.prototype.takeBinaryData = function(binData) {
              this.buffers.push(binData);
              if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
                var packet = binary.reconstructPacket(this.reconPack, this.buffers);
                this.finishedReconstruction();
                return packet;
              }
              return null;
            };

            /**
             * Cleans up binary packet reconstruction variables.
             *
             * @api private
             */

            BinaryReconstructor.prototype.finishedReconstruction = function() {
              this.reconPack = null;
              this.buffers = [];
            };

            function error(msg) {
              return {
                type: exports.ERROR,
                data: 'parser error: ' + msg
              };
            }
            });
            var socket_ioParser_1 = socket_ioParser.protocol;
            var socket_ioParser_2 = socket_ioParser.types;
            var socket_ioParser_3 = socket_ioParser.CONNECT;
            var socket_ioParser_4 = socket_ioParser.DISCONNECT;
            var socket_ioParser_5 = socket_ioParser.EVENT;
            var socket_ioParser_6 = socket_ioParser.ACK;
            var socket_ioParser_7 = socket_ioParser.ERROR;
            var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
            var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
            var socket_ioParser_10 = socket_ioParser.Encoder;
            var socket_ioParser_11 = socket_ioParser.Decoder;

            var hasCors = createCommonjsModule(function (module) {
            /**
             * Module exports.
             *
             * Logic borrowed from Modernizr:
             *
             *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
             */

            try {
              module.exports = typeof XMLHttpRequest !== 'undefined' &&
                'withCredentials' in new XMLHttpRequest();
            } catch (err) {
              // if XMLHttp support is disabled in IE then it will throw
              // when trying to create
              module.exports = false;
            }
            });

            // browser shim for xmlhttprequest module



            var xmlhttprequest = function (opts) {
              var xdomain = opts.xdomain;

              // scheme must be same when usign XDomainRequest
              // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
              var xscheme = opts.xscheme;

              // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
              // https://github.com/Automattic/engine.io-client/pull/217
              var enablesXDR = opts.enablesXDR;

              // XMLHttpRequest can be disabled on IE
              try {
                if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
                  return new XMLHttpRequest();
                }
              } catch (e) { }

              // Use XDomainRequest for IE8 if enablesXDR is true
              // because loading bar keeps flashing when using jsonp-polling
              // https://github.com/yujiosaka/socke.io-ie8-loading-example
              try {
                if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
                  return new XDomainRequest();
                }
              } catch (e) { }

              if (!xdomain) {
                try {
                  return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
                } catch (e) { }
              }
            };

            /**
             * Gets the keys for an object.
             *
             * @return {Array} keys
             * @api private
             */

            var keys = Object.keys || function keys (obj){
              var arr = [];
              var has = Object.prototype.hasOwnProperty;

              for (var i in obj) {
                if (has.call(obj, i)) {
                  arr.push(i);
                }
              }
              return arr;
            };

            var toString$4 = {}.toString;

            var isarray$2 = Array.isArray || function (arr) {
              return toString$4.call(arr) == '[object Array]';
            };

            /* global Blob File */

            /*
             * Module requirements.
             */



            var toString$5 = Object.prototype.toString;
            var withNativeBlob$1 = typeof Blob === 'function' ||
                                    typeof Blob !== 'undefined' && toString$5.call(Blob) === '[object BlobConstructor]';
            var withNativeFile$1 = typeof File === 'function' ||
                                    typeof File !== 'undefined' && toString$5.call(File) === '[object FileConstructor]';

            /**
             * Module exports.
             */

            var hasBinary2 = hasBinary;

            /**
             * Checks for binary data.
             *
             * Supports Buffer, ArrayBuffer, Blob and File.
             *
             * @param {Object} anything
             * @api public
             */

            function hasBinary (obj) {
              if (!obj || typeof obj !== 'object') {
                return false;
              }

              if (isarray$2(obj)) {
                for (var i = 0, l = obj.length; i < l; i++) {
                  if (hasBinary(obj[i])) {
                    return true;
                  }
                }
                return false;
              }

              if ((typeof Buffer === 'function' && isBuffer$1 && isBuffer$1(obj)) ||
                (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
                (withNativeBlob$1 && obj instanceof Blob) ||
                (withNativeFile$1 && obj instanceof File)
              ) {
                return true;
              }

              // see: https://github.com/Automattic/has-binary/pull/4
              if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
                return hasBinary(obj.toJSON(), true);
              }

              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
                  return true;
                }
              }

              return false;
            }

            /**
             * An abstraction for slicing an arraybuffer even when
             * ArrayBuffer.prototype.slice is not supported
             *
             * @api public
             */

            var arraybuffer_slice = function(arraybuffer, start, end) {
              var bytes = arraybuffer.byteLength;
              start = start || 0;
              end = end || bytes;

              if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

              if (start < 0) { start += bytes; }
              if (end < 0) { end += bytes; }
              if (end > bytes) { end = bytes; }

              if (start >= bytes || start >= end || bytes === 0) {
                return new ArrayBuffer(0);
              }

              var abv = new Uint8Array(arraybuffer);
              var result = new Uint8Array(end - start);
              for (var i = start, ii = 0; i < end; i++, ii++) {
                result[ii] = abv[i];
              }
              return result.buffer;
            };

            var after_1 = after;

            function after(count, callback, err_cb) {
                var bail = false;
                err_cb = err_cb || noop$2;
                proxy.count = count;

                return (count === 0) ? callback() : proxy

                function proxy(err, result) {
                    if (proxy.count <= 0) {
                        throw new Error('after called too many times')
                    }
                    --proxy.count;

                    // after first error, rest are passed to err_cb
                    if (err) {
                        bail = true;
                        callback(err);
                        // future error callbacks will go to error handler
                        callback = err_cb;
                    } else if (proxy.count === 0 && !bail) {
                        callback(null, result);
                    }
                }
            }

            function noop$2() {}

            /*! https://mths.be/utf8js v2.1.2 by @mathias */

            var stringFromCharCode = String.fromCharCode;

            // Taken from https://mths.be/punycode
            function ucs2decode(string) {
            	var output = [];
            	var counter = 0;
            	var length = string.length;
            	var value;
            	var extra;
            	while (counter < length) {
            		value = string.charCodeAt(counter++);
            		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            			// high surrogate, and there is a next character
            			extra = string.charCodeAt(counter++);
            			if ((extra & 0xFC00) == 0xDC00) { // low surrogate
            				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            			} else {
            				// unmatched surrogate; only append this code unit, in case the next
            				// code unit is the high surrogate of a surrogate pair
            				output.push(value);
            				counter--;
            			}
            		} else {
            			output.push(value);
            		}
            	}
            	return output;
            }

            // Taken from https://mths.be/punycode
            function ucs2encode(array) {
            	var length = array.length;
            	var index = -1;
            	var value;
            	var output = '';
            	while (++index < length) {
            		value = array[index];
            		if (value > 0xFFFF) {
            			value -= 0x10000;
            			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
            			value = 0xDC00 | value & 0x3FF;
            		}
            		output += stringFromCharCode(value);
            	}
            	return output;
            }

            function checkScalarValue(codePoint, strict) {
            	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
            		if (strict) {
            			throw Error(
            				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
            				' is not a scalar value'
            			);
            		}
            		return false;
            	}
            	return true;
            }
            /*--------------------------------------------------------------------------*/

            function createByte(codePoint, shift) {
            	return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
            }

            function encodeCodePoint(codePoint, strict) {
            	if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
            		return stringFromCharCode(codePoint);
            	}
            	var symbol = '';
            	if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
            		symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
            	}
            	else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
            		if (!checkScalarValue(codePoint, strict)) {
            			codePoint = 0xFFFD;
            		}
            		symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
            		symbol += createByte(codePoint, 6);
            	}
            	else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
            		symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
            		symbol += createByte(codePoint, 12);
            		symbol += createByte(codePoint, 6);
            	}
            	symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
            	return symbol;
            }

            function utf8encode(string, opts) {
            	opts = opts || {};
            	var strict = false !== opts.strict;

            	var codePoints = ucs2decode(string);
            	var length = codePoints.length;
            	var index = -1;
            	var codePoint;
            	var byteString = '';
            	while (++index < length) {
            		codePoint = codePoints[index];
            		byteString += encodeCodePoint(codePoint, strict);
            	}
            	return byteString;
            }

            /*--------------------------------------------------------------------------*/

            function readContinuationByte() {
            	if (byteIndex >= byteCount) {
            		throw Error('Invalid byte index');
            	}

            	var continuationByte = byteArray[byteIndex] & 0xFF;
            	byteIndex++;

            	if ((continuationByte & 0xC0) == 0x80) {
            		return continuationByte & 0x3F;
            	}

            	// If we end up here, it’s not a continuation byte
            	throw Error('Invalid continuation byte');
            }

            function decodeSymbol(strict) {
            	var byte1;
            	var byte2;
            	var byte3;
            	var byte4;
            	var codePoint;

            	if (byteIndex > byteCount) {
            		throw Error('Invalid byte index');
            	}

            	if (byteIndex == byteCount) {
            		return false;
            	}

            	// Read first byte
            	byte1 = byteArray[byteIndex] & 0xFF;
            	byteIndex++;

            	// 1-byte sequence (no continuation bytes)
            	if ((byte1 & 0x80) == 0) {
            		return byte1;
            	}

            	// 2-byte sequence
            	if ((byte1 & 0xE0) == 0xC0) {
            		byte2 = readContinuationByte();
            		codePoint = ((byte1 & 0x1F) << 6) | byte2;
            		if (codePoint >= 0x80) {
            			return codePoint;
            		} else {
            			throw Error('Invalid continuation byte');
            		}
            	}

            	// 3-byte sequence (may include unpaired surrogates)
            	if ((byte1 & 0xF0) == 0xE0) {
            		byte2 = readContinuationByte();
            		byte3 = readContinuationByte();
            		codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
            		if (codePoint >= 0x0800) {
            			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
            		} else {
            			throw Error('Invalid continuation byte');
            		}
            	}

            	// 4-byte sequence
            	if ((byte1 & 0xF8) == 0xF0) {
            		byte2 = readContinuationByte();
            		byte3 = readContinuationByte();
            		byte4 = readContinuationByte();
            		codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
            			(byte3 << 0x06) | byte4;
            		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
            			return codePoint;
            		}
            	}

            	throw Error('Invalid UTF-8 detected');
            }

            var byteArray;
            var byteCount;
            var byteIndex;
            function utf8decode(byteString, opts) {
            	opts = opts || {};
            	var strict = false !== opts.strict;

            	byteArray = ucs2decode(byteString);
            	byteCount = byteArray.length;
            	byteIndex = 0;
            	var codePoints = [];
            	var tmp;
            	while ((tmp = decodeSymbol(strict)) !== false) {
            		codePoints.push(tmp);
            	}
            	return ucs2encode(codePoints);
            }

            var utf8 = {
            	version: '2.1.2',
            	encode: utf8encode,
            	decode: utf8decode
            };

            var base64Arraybuffer = createCommonjsModule(function (module, exports) {
            /*
             * base64-arraybuffer
             * https://github.com/niklasvh/base64-arraybuffer
             *
             * Copyright (c) 2012 Niklas von Hertzen
             * Licensed under the MIT license.
             */
            (function(){

              var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

              // Use a lookup table to find the index.
              var lookup = new Uint8Array(256);
              for (var i = 0; i < chars.length; i++) {
                lookup[chars.charCodeAt(i)] = i;
              }

              exports.encode = function(arraybuffer) {
                var bytes = new Uint8Array(arraybuffer),
                i, len = bytes.length, base64 = "";

                for (i = 0; i < len; i+=3) {
                  base64 += chars[bytes[i] >> 2];
                  base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                  base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                  base64 += chars[bytes[i + 2] & 63];
                }

                if ((len % 3) === 2) {
                  base64 = base64.substring(0, base64.length - 1) + "=";
                } else if (len % 3 === 1) {
                  base64 = base64.substring(0, base64.length - 2) + "==";
                }

                return base64;
              };

              exports.decode =  function(base64) {
                var bufferLength = base64.length * 0.75,
                len = base64.length, i, p = 0,
                encoded1, encoded2, encoded3, encoded4;

                if (base64[base64.length - 1] === "=") {
                  bufferLength--;
                  if (base64[base64.length - 2] === "=") {
                    bufferLength--;
                  }
                }

                var arraybuffer = new ArrayBuffer(bufferLength),
                bytes = new Uint8Array(arraybuffer);

                for (i = 0; i < len; i+=4) {
                  encoded1 = lookup[base64.charCodeAt(i)];
                  encoded2 = lookup[base64.charCodeAt(i+1)];
                  encoded3 = lookup[base64.charCodeAt(i+2)];
                  encoded4 = lookup[base64.charCodeAt(i+3)];

                  bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                  bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                  bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
                }

                return arraybuffer;
              };
            })();
            });
            var base64Arraybuffer_1 = base64Arraybuffer.encode;
            var base64Arraybuffer_2 = base64Arraybuffer.decode;

            /**
             * Create a blob builder even when vendor prefixes exist
             */

            var BlobBuilder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
              typeof WebKitBlobBuilder !== 'undefined' ? WebKitBlobBuilder :
              typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
              typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : 
              false;

            /**
             * Check if Blob constructor is supported
             */

            var blobSupported = (function() {
              try {
                var a = new Blob(['hi']);
                return a.size === 2;
              } catch(e) {
                return false;
              }
            })();

            /**
             * Check if Blob constructor supports ArrayBufferViews
             * Fails in Safari 6, so we need to map to ArrayBuffers there.
             */

            var blobSupportsArrayBufferView = blobSupported && (function() {
              try {
                var b = new Blob([new Uint8Array([1,2])]);
                return b.size === 2;
              } catch(e) {
                return false;
              }
            })();

            /**
             * Check if BlobBuilder is supported
             */

            var blobBuilderSupported = BlobBuilder
              && BlobBuilder.prototype.append
              && BlobBuilder.prototype.getBlob;

            /**
             * Helper function that maps ArrayBufferViews to ArrayBuffers
             * Used by BlobBuilder constructor and old browsers that didn't
             * support it in the Blob constructor.
             */

            function mapArrayBufferViews(ary) {
              return ary.map(function(chunk) {
                if (chunk.buffer instanceof ArrayBuffer) {
                  var buf = chunk.buffer;

                  // if this is a subarray, make a copy so we only
                  // include the subarray region from the underlying buffer
                  if (chunk.byteLength !== buf.byteLength) {
                    var copy = new Uint8Array(chunk.byteLength);
                    copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                    buf = copy.buffer;
                  }

                  return buf;
                }

                return chunk;
              });
            }

            function BlobBuilderConstructor(ary, options) {
              options = options || {};

              var bb = new BlobBuilder();
              mapArrayBufferViews(ary).forEach(function(part) {
                bb.append(part);
              });

              return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
            }
            function BlobConstructor(ary, options) {
              return new Blob(mapArrayBufferViews(ary), options || {});
            }
            if (typeof Blob !== 'undefined') {
              BlobBuilderConstructor.prototype = Blob.prototype;
              BlobConstructor.prototype = Blob.prototype;
            }

            var blob = (function() {
              if (blobSupported) {
                return blobSupportsArrayBufferView ? Blob : BlobConstructor;
              } else if (blobBuilderSupported) {
                return BlobBuilderConstructor;
              } else {
                return undefined;
              }
            })();

            var browser$3 = createCommonjsModule(function (module, exports) {
            /**
             * Module dependencies.
             */







            var base64encoder;
            if (typeof ArrayBuffer !== 'undefined') {
              base64encoder = base64Arraybuffer;
            }

            /**
             * Check if we are running an android browser. That requires us to use
             * ArrayBuffer with polling transports...
             *
             * http://ghinda.net/jpeg-blob-ajax-android/
             */

            var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

            /**
             * Check if we are running in PhantomJS.
             * Uploading a Blob with PhantomJS does not work correctly, as reported here:
             * https://github.com/ariya/phantomjs/issues/11395
             * @type boolean
             */
            var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

            /**
             * When true, avoids using Blobs to encode payloads.
             * @type boolean
             */
            var dontSendBlobs = isAndroid || isPhantomJS;

            /**
             * Current protocol version.
             */

            exports.protocol = 3;

            /**
             * Packet types.
             */

            var packets = exports.packets = {
                open:     0    // non-ws
              , close:    1    // non-ws
              , ping:     2
              , pong:     3
              , message:  4
              , upgrade:  5
              , noop:     6
            };

            var packetslist = keys(packets);

            /**
             * Premade error packet.
             */

            var err = { type: 'error', data: 'parser error' };

            /**
             * Create a blob api even for blob builder when vendor prefixes exist
             */



            /**
             * Encodes a packet.
             *
             *     <packet type id> [ <data> ]
             *
             * Example:
             *
             *     5hello world
             *     3
             *     4
             *
             * Binary is encoded in an identical principle
             *
             * @api private
             */

            exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
              if (typeof supportsBinary === 'function') {
                callback = supportsBinary;
                supportsBinary = false;
              }

              if (typeof utf8encode === 'function') {
                callback = utf8encode;
                utf8encode = null;
              }

              var data = (packet.data === undefined)
                ? undefined
                : packet.data.buffer || packet.data;

              if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
                return encodeArrayBuffer(packet, supportsBinary, callback);
              } else if (typeof blob !== 'undefined' && data instanceof blob) {
                return encodeBlob(packet, supportsBinary, callback);
              }

              // might be an object with { base64: true, data: dataAsBase64String }
              if (data && data.base64) {
                return encodeBase64Object(packet, callback);
              }

              // Sending data as a utf-8 string
              var encoded = packets[packet.type];

              // data fragment is optional
              if (undefined !== packet.data) {
                encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
              }

              return callback('' + encoded);

            };

            function encodeBase64Object(packet, callback) {
              // packet data is an object { base64: true, data: dataAsBase64String }
              var message = 'b' + exports.packets[packet.type] + packet.data.data;
              return callback(message);
            }

            /**
             * Encode packet helpers for binary types
             */

            function encodeArrayBuffer(packet, supportsBinary, callback) {
              if (!supportsBinary) {
                return exports.encodeBase64Packet(packet, callback);
              }

              var data = packet.data;
              var contentArray = new Uint8Array(data);
              var resultBuffer = new Uint8Array(1 + data.byteLength);

              resultBuffer[0] = packets[packet.type];
              for (var i = 0; i < contentArray.length; i++) {
                resultBuffer[i+1] = contentArray[i];
              }

              return callback(resultBuffer.buffer);
            }

            function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
              if (!supportsBinary) {
                return exports.encodeBase64Packet(packet, callback);
              }

              var fr = new FileReader();
              fr.onload = function() {
                exports.encodePacket({ type: packet.type, data: fr.result }, supportsBinary, true, callback);
              };
              return fr.readAsArrayBuffer(packet.data);
            }

            function encodeBlob(packet, supportsBinary, callback) {
              if (!supportsBinary) {
                return exports.encodeBase64Packet(packet, callback);
              }

              if (dontSendBlobs) {
                return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
              }

              var length = new Uint8Array(1);
              length[0] = packets[packet.type];
              var blob$$1 = new blob([length.buffer, packet.data]);

              return callback(blob$$1);
            }

            /**
             * Encodes a packet with binary data in a base64 string
             *
             * @param {Object} packet, has `type` and `data`
             * @return {String} base64 encoded message
             */

            exports.encodeBase64Packet = function(packet, callback) {
              var message = 'b' + exports.packets[packet.type];
              if (typeof blob !== 'undefined' && packet.data instanceof blob) {
                var fr = new FileReader();
                fr.onload = function() {
                  var b64 = fr.result.split(',')[1];
                  callback(message + b64);
                };
                return fr.readAsDataURL(packet.data);
              }

              var b64data;
              try {
                b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
              } catch (e) {
                // iPhone Safari doesn't let you apply with typed arrays
                var typed = new Uint8Array(packet.data);
                var basic = new Array(typed.length);
                for (var i = 0; i < typed.length; i++) {
                  basic[i] = typed[i];
                }
                b64data = String.fromCharCode.apply(null, basic);
              }
              message += btoa(b64data);
              return callback(message);
            };

            /**
             * Decodes a packet. Changes format to Blob if requested.
             *
             * @return {Object} with `type` and `data` (if any)
             * @api private
             */

            exports.decodePacket = function (data, binaryType, utf8decode) {
              if (data === undefined) {
                return err;
              }
              // String data
              if (typeof data === 'string') {
                if (data.charAt(0) === 'b') {
                  return exports.decodeBase64Packet(data.substr(1), binaryType);
                }

                if (utf8decode) {
                  data = tryDecode(data);
                  if (data === false) {
                    return err;
                  }
                }
                var type = data.charAt(0);

                if (Number(type) != type || !packetslist[type]) {
                  return err;
                }

                if (data.length > 1) {
                  return { type: packetslist[type], data: data.substring(1) };
                } else {
                  return { type: packetslist[type] };
                }
              }

              var asArray = new Uint8Array(data);
              var type = asArray[0];
              var rest = arraybuffer_slice(data, 1);
              if (blob && binaryType === 'blob') {
                rest = new blob([rest]);
              }
              return { type: packetslist[type], data: rest };
            };

            function tryDecode(data) {
              try {
                data = utf8.decode(data, { strict: false });
              } catch (e) {
                return false;
              }
              return data;
            }

            /**
             * Decodes a packet encoded in a base64 string
             *
             * @param {String} base64 encoded message
             * @return {Object} with `type` and `data` (if any)
             */

            exports.decodeBase64Packet = function(msg, binaryType) {
              var type = packetslist[msg.charAt(0)];
              if (!base64encoder) {
                return { type: type, data: { base64: true, data: msg.substr(1) } };
              }

              var data = base64encoder.decode(msg.substr(1));

              if (binaryType === 'blob' && blob) {
                data = new blob([data]);
              }

              return { type: type, data: data };
            };

            /**
             * Encodes multiple messages (payload).
             *
             *     <length>:data
             *
             * Example:
             *
             *     11:hello world2:hi
             *
             * If any contents are binary, they will be encoded as base64 strings. Base64
             * encoded strings are marked with a b before the length specifier
             *
             * @param {Array} packets
             * @api private
             */

            exports.encodePayload = function (packets, supportsBinary, callback) {
              if (typeof supportsBinary === 'function') {
                callback = supportsBinary;
                supportsBinary = null;
              }

              var isBinary = hasBinary2(packets);

              if (supportsBinary && isBinary) {
                if (blob && !dontSendBlobs) {
                  return exports.encodePayloadAsBlob(packets, callback);
                }

                return exports.encodePayloadAsArrayBuffer(packets, callback);
              }

              if (!packets.length) {
                return callback('0:');
              }

              function setLengthHeader(message) {
                return message.length + ':' + message;
              }

              function encodeOne(packet, doneCallback) {
                exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
                  doneCallback(null, setLengthHeader(message));
                });
              }

              map(packets, encodeOne, function(err, results) {
                return callback(results.join(''));
              });
            };

            /**
             * Async array map using after
             */

            function map(ary, each, done) {
              var result = new Array(ary.length);
              var next = after_1(ary.length, done);

              var eachWithIndex = function(i, el, cb) {
                each(el, function(error, msg) {
                  result[i] = msg;
                  cb(error, result);
                });
              };

              for (var i = 0; i < ary.length; i++) {
                eachWithIndex(i, ary[i], next);
              }
            }

            /*
             * Decodes data when a payload is maybe expected. Possible binary contents are
             * decoded from their base64 representation
             *
             * @param {String} data, callback method
             * @api public
             */

            exports.decodePayload = function (data, binaryType, callback) {
              if (typeof data !== 'string') {
                return exports.decodePayloadAsBinary(data, binaryType, callback);
              }

              if (typeof binaryType === 'function') {
                callback = binaryType;
                binaryType = null;
              }

              var packet;
              if (data === '') {
                // parser error - ignoring payload
                return callback(err, 0, 1);
              }

              var length = '', n, msg;

              for (var i = 0, l = data.length; i < l; i++) {
                var chr = data.charAt(i);

                if (chr !== ':') {
                  length += chr;
                  continue;
                }

                if (length === '' || (length != (n = Number(length)))) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                msg = data.substr(i + 1, n);

                if (length != msg.length) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                if (msg.length) {
                  packet = exports.decodePacket(msg, binaryType, false);

                  if (err.type === packet.type && err.data === packet.data) {
                    // parser error in individual packet - ignoring payload
                    return callback(err, 0, 1);
                  }

                  var ret = callback(packet, i + n, l);
                  if (false === ret) return;
                }

                // advance cursor
                i += n;
                length = '';
              }

              if (length !== '') {
                // parser error - ignoring payload
                return callback(err, 0, 1);
              }

            };

            /**
             * Encodes multiple messages (payload) as binary.
             *
             * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
             * 255><data>
             *
             * Example:
             * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
             *
             * @param {Array} packets
             * @return {ArrayBuffer} encoded payload
             * @api private
             */

            exports.encodePayloadAsArrayBuffer = function(packets, callback) {
              if (!packets.length) {
                return callback(new ArrayBuffer(0));
              }

              function encodeOne(packet, doneCallback) {
                exports.encodePacket(packet, true, true, function(data) {
                  return doneCallback(null, data);
                });
              }

              map(packets, encodeOne, function(err, encodedPackets) {
                var totalLength = encodedPackets.reduce(function(acc, p) {
                  var len;
                  if (typeof p === 'string'){
                    len = p.length;
                  } else {
                    len = p.byteLength;
                  }
                  return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
                }, 0);

                var resultArray = new Uint8Array(totalLength);

                var bufferIndex = 0;
                encodedPackets.forEach(function(p) {
                  var isString = typeof p === 'string';
                  var ab = p;
                  if (isString) {
                    var view = new Uint8Array(p.length);
                    for (var i = 0; i < p.length; i++) {
                      view[i] = p.charCodeAt(i);
                    }
                    ab = view.buffer;
                  }

                  if (isString) { // not true binary
                    resultArray[bufferIndex++] = 0;
                  } else { // true binary
                    resultArray[bufferIndex++] = 1;
                  }

                  var lenStr = ab.byteLength.toString();
                  for (var i = 0; i < lenStr.length; i++) {
                    resultArray[bufferIndex++] = parseInt(lenStr[i]);
                  }
                  resultArray[bufferIndex++] = 255;

                  var view = new Uint8Array(ab);
                  for (var i = 0; i < view.length; i++) {
                    resultArray[bufferIndex++] = view[i];
                  }
                });

                return callback(resultArray.buffer);
              });
            };

            /**
             * Encode as Blob
             */

            exports.encodePayloadAsBlob = function(packets, callback) {
              function encodeOne(packet, doneCallback) {
                exports.encodePacket(packet, true, true, function(encoded) {
                  var binaryIdentifier = new Uint8Array(1);
                  binaryIdentifier[0] = 1;
                  if (typeof encoded === 'string') {
                    var view = new Uint8Array(encoded.length);
                    for (var i = 0; i < encoded.length; i++) {
                      view[i] = encoded.charCodeAt(i);
                    }
                    encoded = view.buffer;
                    binaryIdentifier[0] = 0;
                  }

                  var len = (encoded instanceof ArrayBuffer)
                    ? encoded.byteLength
                    : encoded.size;

                  var lenStr = len.toString();
                  var lengthAry = new Uint8Array(lenStr.length + 1);
                  for (var i = 0; i < lenStr.length; i++) {
                    lengthAry[i] = parseInt(lenStr[i]);
                  }
                  lengthAry[lenStr.length] = 255;

                  if (blob) {
                    var blob$$1 = new blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                    doneCallback(null, blob$$1);
                  }
                });
              }

              map(packets, encodeOne, function(err, results) {
                return callback(new blob(results));
              });
            };

            /*
             * Decodes data when a payload is maybe expected. Strings are decoded by
             * interpreting each byte as a key code for entries marked to start with 0. See
             * description of encodePayloadAsBinary
             *
             * @param {ArrayBuffer} data, callback method
             * @api public
             */

            exports.decodePayloadAsBinary = function (data, binaryType, callback) {
              if (typeof binaryType === 'function') {
                callback = binaryType;
                binaryType = null;
              }

              var bufferTail = data;
              var buffers = [];

              while (bufferTail.byteLength > 0) {
                var tailArray = new Uint8Array(bufferTail);
                var isString = tailArray[0] === 0;
                var msgLength = '';

                for (var i = 1; ; i++) {
                  if (tailArray[i] === 255) break;

                  // 310 = char length of Number.MAX_VALUE
                  if (msgLength.length > 310) {
                    return callback(err, 0, 1);
                  }

                  msgLength += tailArray[i];
                }

                bufferTail = arraybuffer_slice(bufferTail, 2 + msgLength.length);
                msgLength = parseInt(msgLength);

                var msg = arraybuffer_slice(bufferTail, 0, msgLength);
                if (isString) {
                  try {
                    msg = String.fromCharCode.apply(null, new Uint8Array(msg));
                  } catch (e) {
                    // iPhone Safari doesn't let you apply to typed arrays
                    var typed = new Uint8Array(msg);
                    msg = '';
                    for (var i = 0; i < typed.length; i++) {
                      msg += String.fromCharCode(typed[i]);
                    }
                  }
                }

                buffers.push(msg);
                bufferTail = arraybuffer_slice(bufferTail, msgLength);
              }

              var total = buffers.length;
              buffers.forEach(function(buffer, i) {
                callback(exports.decodePacket(buffer, binaryType, true), i, total);
              });
            };
            });
            var browser_1$2 = browser$3.protocol;
            var browser_2$2 = browser$3.packets;
            var browser_3$2 = browser$3.encodePacket;
            var browser_4$2 = browser$3.encodeBase64Packet;
            var browser_5$2 = browser$3.decodePacket;
            var browser_6$2 = browser$3.decodeBase64Packet;
            var browser_7$2 = browser$3.encodePayload;
            var browser_8 = browser$3.decodePayload;
            var browser_9 = browser$3.encodePayloadAsArrayBuffer;
            var browser_10 = browser$3.encodePayloadAsBlob;
            var browser_11 = browser$3.decodePayloadAsBinary;

            /**
             * Module dependencies.
             */




            /**
             * Module exports.
             */

            var transport = Transport;

            /**
             * Transport abstract constructor.
             *
             * @param {Object} options.
             * @api private
             */

            function Transport (opts) {
              this.path = opts.path;
              this.hostname = opts.hostname;
              this.port = opts.port;
              this.secure = opts.secure;
              this.query = opts.query;
              this.timestampParam = opts.timestampParam;
              this.timestampRequests = opts.timestampRequests;
              this.readyState = '';
              this.agent = opts.agent || false;
              this.socket = opts.socket;
              this.enablesXDR = opts.enablesXDR;

              // SSL options for Node.js client
              this.pfx = opts.pfx;
              this.key = opts.key;
              this.passphrase = opts.passphrase;
              this.cert = opts.cert;
              this.ca = opts.ca;
              this.ciphers = opts.ciphers;
              this.rejectUnauthorized = opts.rejectUnauthorized;
              this.forceNode = opts.forceNode;

              // results of ReactNative environment detection
              this.isReactNative = opts.isReactNative;

              // other options for Node.js client
              this.extraHeaders = opts.extraHeaders;
              this.localAddress = opts.localAddress;
            }

            /**
             * Mix in `Emitter`.
             */

            componentEmitter(Transport.prototype);

            /**
             * Emits an error.
             *
             * @param {String} str
             * @return {Transport} for chaining
             * @api public
             */

            Transport.prototype.onError = function (msg, desc) {
              var err = new Error(msg);
              err.type = 'TransportError';
              err.description = desc;
              this.emit('error', err);
              return this;
            };

            /**
             * Opens the transport.
             *
             * @api public
             */

            Transport.prototype.open = function () {
              if ('closed' === this.readyState || '' === this.readyState) {
                this.readyState = 'opening';
                this.doOpen();
              }

              return this;
            };

            /**
             * Closes the transport.
             *
             * @api private
             */

            Transport.prototype.close = function () {
              if ('opening' === this.readyState || 'open' === this.readyState) {
                this.doClose();
                this.onClose();
              }

              return this;
            };

            /**
             * Sends multiple packets.
             *
             * @param {Array} packets
             * @api private
             */

            Transport.prototype.send = function (packets) {
              if ('open' === this.readyState) {
                this.write(packets);
              } else {
                throw new Error('Transport not open');
              }
            };

            /**
             * Called upon open
             *
             * @api private
             */

            Transport.prototype.onOpen = function () {
              this.readyState = 'open';
              this.writable = true;
              this.emit('open');
            };

            /**
             * Called with data.
             *
             * @param {String} data
             * @api private
             */

            Transport.prototype.onData = function (data) {
              var packet = browser$3.decodePacket(data, this.socket.binaryType);
              this.onPacket(packet);
            };

            /**
             * Called with a decoded packet.
             */

            Transport.prototype.onPacket = function (packet) {
              this.emit('packet', packet);
            };

            /**
             * Called upon close.
             *
             * @api private
             */

            Transport.prototype.onClose = function () {
              this.readyState = 'closed';
              this.emit('close');
            };

            /**
             * Compiles a querystring
             * Returns string representation of the object
             *
             * @param {Object}
             * @api private
             */

            var encode$1 = function (obj) {
              var str = '';

              for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                  if (str.length) str += '&';
                  str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
                }
              }

              return str;
            };

            /**
             * Parses a simple querystring into an object
             *
             * @param {String} qs
             * @api private
             */

            var decode$1 = function(qs){
              var qry = {};
              var pairs = qs.split('&');
              for (var i = 0, l = pairs.length; i < l; i++) {
                var pair = pairs[i].split('=');
                qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
              }
              return qry;
            };

            var parseqs = {
            	encode: encode$1,
            	decode: decode$1
            };

            var componentInherit = function(a, b){
              var fn = function(){};
              fn.prototype = b.prototype;
              a.prototype = new fn;
              a.prototype.constructor = a;
            };

            var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
              , length = 64
              , map = {}
              , seed = 0
              , i = 0
              , prev;

            /**
             * Return a string representing the specified number.
             *
             * @param {Number} num The number to convert.
             * @returns {String} The string representation of the number.
             * @api public
             */
            function encode$2(num) {
              var encoded = '';

              do {
                encoded = alphabet[num % length] + encoded;
                num = Math.floor(num / length);
              } while (num > 0);

              return encoded;
            }

            /**
             * Return the integer value specified by the given string.
             *
             * @param {String} str The string to convert.
             * @returns {Number} The integer value represented by the string.
             * @api public
             */
            function decode$2(str) {
              var decoded = 0;

              for (i = 0; i < str.length; i++) {
                decoded = decoded * length + map[str.charAt(i)];
              }

              return decoded;
            }

            /**
             * Yeast: A tiny growing id generator.
             *
             * @returns {String} A unique id.
             * @api public
             */
            function yeast() {
              var now = encode$2(+new Date());

              if (now !== prev) return seed = 0, prev = now;
              return now +'.'+ encode$2(seed++);
            }

            //
            // Map each character to its index.
            //
            for (; i < length; i++) map[alphabet[i]] = i;

            //
            // Expose the `yeast`, `encode` and `decode` functions.
            //
            yeast.encode = encode$2;
            yeast.decode = decode$2;
            var yeast_1 = yeast;

            /**
             * Helpers.
             */

            var s$2 = 1000;
            var m$2 = s$2 * 60;
            var h$2 = m$2 * 60;
            var d$2 = h$2 * 24;
            var y$2 = d$2 * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} [options]
             * @throws {Error} throw an error if val is not a non-empty string or a number
             * @return {String|Number}
             * @api public
             */

            var ms$2 = function(val, options) {
              options = options || {};
              var type = typeof val;
              if (type === 'string' && val.length > 0) {
                return parse$3(val);
              } else if (type === 'number' && isNaN(val) === false) {
                return options.long ? fmtLong$2(val) : fmtShort$2(val);
              }
              throw new Error(
                'val is not a non-empty string or a valid number. val=' +
                  JSON.stringify(val)
              );
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse$3(str) {
              str = String(str);
              if (str.length > 100) {
                return;
              }
              var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                str
              );
              if (!match) {
                return;
              }
              var n = parseFloat(match[1]);
              var type = (match[2] || 'ms').toLowerCase();
              switch (type) {
                case 'years':
                case 'year':
                case 'yrs':
                case 'yr':
                case 'y':
                  return n * y$2;
                case 'days':
                case 'day':
                case 'd':
                  return n * d$2;
                case 'hours':
                case 'hour':
                case 'hrs':
                case 'hr':
                case 'h':
                  return n * h$2;
                case 'minutes':
                case 'minute':
                case 'mins':
                case 'min':
                case 'm':
                  return n * m$2;
                case 'seconds':
                case 'second':
                case 'secs':
                case 'sec':
                case 's':
                  return n * s$2;
                case 'milliseconds':
                case 'millisecond':
                case 'msecs':
                case 'msec':
                case 'ms':
                  return n;
                default:
                  return undefined;
              }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtShort$2(ms) {
              if (ms >= d$2) {
                return Math.round(ms / d$2) + 'd';
              }
              if (ms >= h$2) {
                return Math.round(ms / h$2) + 'h';
              }
              if (ms >= m$2) {
                return Math.round(ms / m$2) + 'm';
              }
              if (ms >= s$2) {
                return Math.round(ms / s$2) + 's';
              }
              return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtLong$2(ms) {
              return plural$2(ms, d$2, 'day') ||
                plural$2(ms, h$2, 'hour') ||
                plural$2(ms, m$2, 'minute') ||
                plural$2(ms, s$2, 'second') ||
                ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural$2(ms, n, name) {
              if (ms < n) {
                return;
              }
              if (ms < n * 1.5) {
                return Math.floor(ms / n) + ' ' + name;
              }
              return Math.ceil(ms / n) + ' ' + name + 's';
            }

            var debug$3 = createCommonjsModule(function (module, exports) {
            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = ms$2;

            /**
             * Active `debug` instances.
             */
            exports.instances = [];

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
             */

            exports.formatters = {};

            /**
             * Select a color.
             * @param {String} namespace
             * @return {Number}
             * @api private
             */

            function selectColor(namespace) {
              var hash = 0, i;

              for (i in namespace) {
                hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
              }

              return exports.colors[Math.abs(hash) % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function createDebug(namespace) {

              var prevTime;

              function debug() {
                // disabled?
                if (!debug.enabled) return;

                var self = debug;

                // set `diff` timestamp
                var curr = +new Date();
                var ms = curr - (prevTime || curr);
                self.diff = ms;
                self.prev = prevTime;
                self.curr = curr;
                prevTime = curr;

                // turn the `arguments` into a proper Array
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; i++) {
                  args[i] = arguments[i];
                }

                args[0] = exports.coerce(args[0]);

                if ('string' !== typeof args[0]) {
                  // anything else let's inspect with %O
                  args.unshift('%O');
                }

                // apply any `formatters` transformations
                var index = 0;
                args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                  // if we encounter an escaped % then don't increase the array index
                  if (match === '%%') return match;
                  index++;
                  var formatter = exports.formatters[format];
                  if ('function' === typeof formatter) {
                    var val = args[index];
                    match = formatter.call(self, val);

                    // now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                  }
                  return match;
                });

                // apply env-specific formatting (colors, etc.)
                exports.formatArgs.call(self, args);

                var logFn = debug.log || exports.log || console.log.bind(console);
                logFn.apply(self, args);
              }

              debug.namespace = namespace;
              debug.enabled = exports.enabled(namespace);
              debug.useColors = exports.useColors();
              debug.color = selectColor(namespace);
              debug.destroy = destroy;

              // env-specific initialization logic for debug instances
              if ('function' === typeof exports.init) {
                exports.init(debug);
              }

              exports.instances.push(debug);

              return debug;
            }

            function destroy () {
              var index = exports.instances.indexOf(this);
              if (index !== -1) {
                exports.instances.splice(index, 1);
                return true;
              } else {
                return false;
              }
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces) {
              exports.save(namespaces);

              exports.names = [];
              exports.skips = [];

              var i;
              var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
              var len = split.length;

              for (i = 0; i < len; i++) {
                if (!split[i]) continue; // ignore empty strings
                namespaces = split[i].replace(/\*/g, '.*?');
                if (namespaces[0] === '-') {
                  exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                } else {
                  exports.names.push(new RegExp('^' + namespaces + '$'));
                }
              }

              for (i = 0; i < exports.instances.length; i++) {
                var instance = exports.instances[i];
                instance.enabled = exports.enabled(instance.namespace);
              }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable() {
              exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name) {
              if (name[name.length - 1] === '*') {
                return true;
              }
              var i, len;
              for (i = 0, len = exports.skips.length; i < len; i++) {
                if (exports.skips[i].test(name)) {
                  return false;
                }
              }
              for (i = 0, len = exports.names.length; i < len; i++) {
                if (exports.names[i].test(name)) {
                  return true;
                }
              }
              return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val) {
              if (val instanceof Error) return val.stack || val.message;
              return val;
            }
            });
            var debug_1$2 = debug$3.coerce;
            var debug_2$2 = debug$3.disable;
            var debug_3$2 = debug$3.enable;
            var debug_4$2 = debug$3.enabled;
            var debug_5$2 = debug$3.humanize;
            var debug_6$2 = debug$3.instances;
            var debug_7$2 = debug$3.names;
            var debug_8$2 = debug$3.skips;
            var debug_9$2 = debug$3.formatters;

            var browser$4 = createCommonjsModule(function (module, exports) {
            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = debug$3;
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome
                           && 'undefined' != typeof chrome.storage
                              ? chrome.storage.local
                              : localstorage();

            /**
             * Colors.
             */

            exports.colors = [
              '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
              '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
              '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
              '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
              '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
              '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
              '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
              '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
              '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
              '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
              '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
            ];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors() {
              // NB: In an Electron preload script, document will be defined but not fully
              // initialized. Since we know we're in Chrome, we'll just detect this case
              // explicitly
              if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
                return true;
              }

              // Internet Explorer and Edge do not support colors.
              if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                return false;
              }

              // is webkit? http://stackoverflow.com/a/16459606/376773
              // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
              return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
                // is firebug? http://stackoverflow.com/a/398120/376773
                (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
                // is firefox >= v31?
                // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
                // double check webkit in userAgent just in case we are in a worker
                (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function(v) {
              try {
                return JSON.stringify(v);
              } catch (err) {
                return '[UnexpectedJSONParseError]: ' + err.message;
              }
            };


            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs(args) {
              var useColors = this.useColors;

              args[0] = (useColors ? '%c' : '')
                + this.namespace
                + (useColors ? ' %c' : ' ')
                + args[0]
                + (useColors ? '%c ' : ' ')
                + '+' + exports.humanize(this.diff);

              if (!useColors) return;

              var c = 'color: ' + this.color;
              args.splice(1, 0, c, 'color: inherit');

              // the final "%c" is somewhat tricky, because there could be other
              // arguments passed either before or after the %c, so we need to
              // figure out the correct index to insert the CSS into
              var index = 0;
              var lastC = 0;
              args[0].replace(/%[a-zA-Z%]/g, function(match) {
                if ('%%' === match) return;
                index++;
                if ('%c' === match) {
                  // we only are interested in the *last* %c
                  // (the user may have provided their own)
                  lastC = index;
                }
              });

              args.splice(lastC, 0, c);
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log() {
              // this hackery is required for IE8/9, where
              // the `console.log` function doesn't have 'apply'
              return 'object' === typeof console
                && console.log
                && Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces) {
              try {
                if (null == namespaces) {
                  exports.storage.removeItem('debug');
                } else {
                  exports.storage.debug = namespaces;
                }
              } catch(e) {}
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load() {
              var r;
              try {
                r = exports.storage.debug;
              } catch(e) {}

              // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
              if (!r && typeof process !== 'undefined' && 'env' in process) {
                r = process.env.DEBUG;
              }

              return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage() {
              try {
                return window.localStorage;
              } catch (e) {}
            }
            });
            var browser_1$3 = browser$4.log;
            var browser_2$3 = browser$4.formatArgs;
            var browser_3$3 = browser$4.save;
            var browser_4$3 = browser$4.load;
            var browser_5$3 = browser$4.useColors;
            var browser_6$3 = browser$4.storage;
            var browser_7$3 = browser$4.colors;

            /**
             * Module dependencies.
             */






            var debug$4 = browser$4('engine.io-client:polling');

            /**
             * Module exports.
             */

            var polling = Polling;

            /**
             * Is XHR2 supported?
             */

            var hasXHR2 = (function () {
              var XMLHttpRequest = xmlhttprequest;
              var xhr = new XMLHttpRequest({ xdomain: false });
              return null != xhr.responseType;
            })();

            /**
             * Polling interface.
             *
             * @param {Object} opts
             * @api private
             */

            function Polling (opts) {
              var forceBase64 = (opts && opts.forceBase64);
              if (!hasXHR2 || forceBase64) {
                this.supportsBinary = false;
              }
              transport.call(this, opts);
            }

            /**
             * Inherits from Transport.
             */

            componentInherit(Polling, transport);

            /**
             * Transport name.
             */

            Polling.prototype.name = 'polling';

            /**
             * Opens the socket (triggers polling). We write a PING message to determine
             * when the transport is open.
             *
             * @api private
             */

            Polling.prototype.doOpen = function () {
              this.poll();
            };

            /**
             * Pauses polling.
             *
             * @param {Function} callback upon buffers are flushed and transport is paused
             * @api private
             */

            Polling.prototype.pause = function (onPause) {
              var self = this;

              this.readyState = 'pausing';

              function pause () {
                debug$4('paused');
                self.readyState = 'paused';
                onPause();
              }

              if (this.polling || !this.writable) {
                var total = 0;

                if (this.polling) {
                  debug$4('we are currently polling - waiting to pause');
                  total++;
                  this.once('pollComplete', function () {
                    debug$4('pre-pause polling complete');
                    --total || pause();
                  });
                }

                if (!this.writable) {
                  debug$4('we are currently writing - waiting to pause');
                  total++;
                  this.once('drain', function () {
                    debug$4('pre-pause writing complete');
                    --total || pause();
                  });
                }
              } else {
                pause();
              }
            };

            /**
             * Starts polling cycle.
             *
             * @api public
             */

            Polling.prototype.poll = function () {
              debug$4('polling');
              this.polling = true;
              this.doPoll();
              this.emit('poll');
            };

            /**
             * Overloads onData to detect payloads.
             *
             * @api private
             */

            Polling.prototype.onData = function (data) {
              var self = this;
              debug$4('polling got data %s', data);
              var callback = function (packet, index, total) {
                // if its the first message we consider the transport open
                if ('opening' === self.readyState) {
                  self.onOpen();
                }

                // if its a close packet, we close the ongoing requests
                if ('close' === packet.type) {
                  self.onClose();
                  return false;
                }

                // otherwise bypass onData and handle the message
                self.onPacket(packet);
              };

              // decode payload
              browser$3.decodePayload(data, this.socket.binaryType, callback);

              // if an event did not trigger closing
              if ('closed' !== this.readyState) {
                // if we got data we're not polling
                this.polling = false;
                this.emit('pollComplete');

                if ('open' === this.readyState) {
                  this.poll();
                } else {
                  debug$4('ignoring poll - transport state "%s"', this.readyState);
                }
              }
            };

            /**
             * For polling, send a close packet.
             *
             * @api private
             */

            Polling.prototype.doClose = function () {
              var self = this;

              function close () {
                debug$4('writing close packet');
                self.write([{ type: 'close' }]);
              }

              if ('open' === this.readyState) {
                debug$4('transport open - closing');
                close();
              } else {
                // in case we're trying to close while
                // handshaking is in progress (GH-164)
                debug$4('transport not open - deferring close');
                this.once('open', close);
              }
            };

            /**
             * Writes a packets payload.
             *
             * @param {Array} data packets
             * @param {Function} drain callback
             * @api private
             */

            Polling.prototype.write = function (packets) {
              var self = this;
              this.writable = false;
              var callbackfn = function () {
                self.writable = true;
                self.emit('drain');
              };

              browser$3.encodePayload(packets, this.supportsBinary, function (data) {
                self.doWrite(data, callbackfn);
              });
            };

            /**
             * Generates uri for connection.
             *
             * @api private
             */

            Polling.prototype.uri = function () {
              var query = this.query || {};
              var schema = this.secure ? 'https' : 'http';
              var port = '';

              // cache busting is forced
              if (false !== this.timestampRequests) {
                query[this.timestampParam] = yeast_1();
              }

              if (!this.supportsBinary && !query.sid) {
                query.b64 = 1;
              }

              query = parseqs.encode(query);

              // avoid port if default for schema
              if (this.port && (('https' === schema && Number(this.port) !== 443) ||
                 ('http' === schema && Number(this.port) !== 80))) {
                port = ':' + this.port;
              }

              // prepend ? to query
              if (query.length) {
                query = '?' + query;
              }

              var ipv6 = this.hostname.indexOf(':') !== -1;
              return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
            };

            /* global attachEvent */

            /**
             * Module requirements.
             */





            var debug$5 = browser$4('engine.io-client:polling-xhr');

            /**
             * Module exports.
             */

            var pollingXhr = XHR;
            var Request_1 = Request;

            /**
             * Empty function
             */

            function empty () {}

            /**
             * XHR Polling constructor.
             *
             * @param {Object} opts
             * @api public
             */

            function XHR (opts) {
              polling.call(this, opts);
              this.requestTimeout = opts.requestTimeout;
              this.extraHeaders = opts.extraHeaders;

              if (typeof location !== 'undefined') {
                var isSSL = 'https:' === location.protocol;
                var port = location.port;

                // some user agents have empty `location.port`
                if (!port) {
                  port = isSSL ? 443 : 80;
                }

                this.xd = (typeof location !== 'undefined' && opts.hostname !== location.hostname) ||
                  port !== opts.port;
                this.xs = opts.secure !== isSSL;
              }
            }

            /**
             * Inherits from Polling.
             */

            componentInherit(XHR, polling);

            /**
             * XHR supports binary
             */

            XHR.prototype.supportsBinary = true;

            /**
             * Creates a request.
             *
             * @param {String} method
             * @api private
             */

            XHR.prototype.request = function (opts) {
              opts = opts || {};
              opts.uri = this.uri();
              opts.xd = this.xd;
              opts.xs = this.xs;
              opts.agent = this.agent || false;
              opts.supportsBinary = this.supportsBinary;
              opts.enablesXDR = this.enablesXDR;

              // SSL options for Node.js client
              opts.pfx = this.pfx;
              opts.key = this.key;
              opts.passphrase = this.passphrase;
              opts.cert = this.cert;
              opts.ca = this.ca;
              opts.ciphers = this.ciphers;
              opts.rejectUnauthorized = this.rejectUnauthorized;
              opts.requestTimeout = this.requestTimeout;

              // other options for Node.js client
              opts.extraHeaders = this.extraHeaders;

              return new Request(opts);
            };

            /**
             * Sends data.
             *
             * @param {String} data to send.
             * @param {Function} called upon flush.
             * @api private
             */

            XHR.prototype.doWrite = function (data, fn) {
              var isBinary = typeof data !== 'string' && data !== undefined;
              var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
              var self = this;
              req.on('success', fn);
              req.on('error', function (err) {
                self.onError('xhr post error', err);
              });
              this.sendXhr = req;
            };

            /**
             * Starts a poll cycle.
             *
             * @api private
             */

            XHR.prototype.doPoll = function () {
              debug$5('xhr poll');
              var req = this.request();
              var self = this;
              req.on('data', function (data) {
                self.onData(data);
              });
              req.on('error', function (err) {
                self.onError('xhr poll error', err);
              });
              this.pollXhr = req;
            };

            /**
             * Request constructor
             *
             * @param {Object} options
             * @api public
             */

            function Request (opts) {
              this.method = opts.method || 'GET';
              this.uri = opts.uri;
              this.xd = !!opts.xd;
              this.xs = !!opts.xs;
              this.async = false !== opts.async;
              this.data = undefined !== opts.data ? opts.data : null;
              this.agent = opts.agent;
              this.isBinary = opts.isBinary;
              this.supportsBinary = opts.supportsBinary;
              this.enablesXDR = opts.enablesXDR;
              this.requestTimeout = opts.requestTimeout;

              // SSL options for Node.js client
              this.pfx = opts.pfx;
              this.key = opts.key;
              this.passphrase = opts.passphrase;
              this.cert = opts.cert;
              this.ca = opts.ca;
              this.ciphers = opts.ciphers;
              this.rejectUnauthorized = opts.rejectUnauthorized;

              // other options for Node.js client
              this.extraHeaders = opts.extraHeaders;

              this.create();
            }

            /**
             * Mix in `Emitter`.
             */

            componentEmitter(Request.prototype);

            /**
             * Creates the XHR object and sends the request.
             *
             * @api private
             */

            Request.prototype.create = function () {
              var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

              // SSL options for Node.js client
              opts.pfx = this.pfx;
              opts.key = this.key;
              opts.passphrase = this.passphrase;
              opts.cert = this.cert;
              opts.ca = this.ca;
              opts.ciphers = this.ciphers;
              opts.rejectUnauthorized = this.rejectUnauthorized;

              var xhr = this.xhr = new xmlhttprequest(opts);
              var self = this;

              try {
                debug$5('xhr open %s: %s', this.method, this.uri);
                xhr.open(this.method, this.uri, this.async);
                try {
                  if (this.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (var i in this.extraHeaders) {
                      if (this.extraHeaders.hasOwnProperty(i)) {
                        xhr.setRequestHeader(i, this.extraHeaders[i]);
                      }
                    }
                  }
                } catch (e) {}

                if ('POST' === this.method) {
                  try {
                    if (this.isBinary) {
                      xhr.setRequestHeader('Content-type', 'application/octet-stream');
                    } else {
                      xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
                    }
                  } catch (e) {}
                }

                try {
                  xhr.setRequestHeader('Accept', '*/*');
                } catch (e) {}

                // ie6 check
                if ('withCredentials' in xhr) {
                  xhr.withCredentials = true;
                }

                if (this.requestTimeout) {
                  xhr.timeout = this.requestTimeout;
                }

                if (this.hasXDR()) {
                  xhr.onload = function () {
                    self.onLoad();
                  };
                  xhr.onerror = function () {
                    self.onError(xhr.responseText);
                  };
                } else {
                  xhr.onreadystatechange = function () {
                    if (xhr.readyState === 2) {
                      try {
                        var contentType = xhr.getResponseHeader('Content-Type');
                        if (self.supportsBinary && contentType === 'application/octet-stream') {
                          xhr.responseType = 'arraybuffer';
                        }
                      } catch (e) {}
                    }
                    if (4 !== xhr.readyState) return;
                    if (200 === xhr.status || 1223 === xhr.status) {
                      self.onLoad();
                    } else {
                      // make sure the `error` event handler that's user-set
                      // does not throw in the same tick and gets caught here
                      setTimeout(function () {
                        self.onError(xhr.status);
                      }, 0);
                    }
                  };
                }

                debug$5('xhr data %s', this.data);
                xhr.send(this.data);
              } catch (e) {
                // Need to defer since .create() is called directly fhrom the constructor
                // and thus the 'error' event can only be only bound *after* this exception
                // occurs.  Therefore, also, we cannot throw here at all.
                setTimeout(function () {
                  self.onError(e);
                }, 0);
                return;
              }

              if (typeof document !== 'undefined') {
                this.index = Request.requestsCount++;
                Request.requests[this.index] = this;
              }
            };

            /**
             * Called upon successful response.
             *
             * @api private
             */

            Request.prototype.onSuccess = function () {
              this.emit('success');
              this.cleanup();
            };

            /**
             * Called if we have data.
             *
             * @api private
             */

            Request.prototype.onData = function (data) {
              this.emit('data', data);
              this.onSuccess();
            };

            /**
             * Called upon error.
             *
             * @api private
             */

            Request.prototype.onError = function (err) {
              this.emit('error', err);
              this.cleanup(true);
            };

            /**
             * Cleans up house.
             *
             * @api private
             */

            Request.prototype.cleanup = function (fromError) {
              if ('undefined' === typeof this.xhr || null === this.xhr) {
                return;
              }
              // xmlhttprequest
              if (this.hasXDR()) {
                this.xhr.onload = this.xhr.onerror = empty;
              } else {
                this.xhr.onreadystatechange = empty;
              }

              if (fromError) {
                try {
                  this.xhr.abort();
                } catch (e) {}
              }

              if (typeof document !== 'undefined') {
                delete Request.requests[this.index];
              }

              this.xhr = null;
            };

            /**
             * Called upon load.
             *
             * @api private
             */

            Request.prototype.onLoad = function () {
              var data;
              try {
                var contentType;
                try {
                  contentType = this.xhr.getResponseHeader('Content-Type');
                } catch (e) {}
                if (contentType === 'application/octet-stream') {
                  data = this.xhr.response || this.xhr.responseText;
                } else {
                  data = this.xhr.responseText;
                }
              } catch (e) {
                this.onError(e);
              }
              if (null != data) {
                this.onData(data);
              }
            };

            /**
             * Check if it has XDomainRequest.
             *
             * @api private
             */

            Request.prototype.hasXDR = function () {
              return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
            };

            /**
             * Aborts the request.
             *
             * @api public
             */

            Request.prototype.abort = function () {
              this.cleanup();
            };

            /**
             * Aborts pending requests when unloading the window. This is needed to prevent
             * memory leaks (e.g. when using IE) and to ensure that no spurious error is
             * emitted.
             */

            Request.requestsCount = 0;
            Request.requests = {};

            if (typeof document !== 'undefined') {
              if (typeof attachEvent === 'function') {
                attachEvent('onunload', unloadHandler);
              } else if (typeof addEventListener === 'function') {
                var terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
                addEventListener(terminationEvent, unloadHandler, false);
              }
            }

            function unloadHandler () {
              for (var i in Request.requests) {
                if (Request.requests.hasOwnProperty(i)) {
                  Request.requests[i].abort();
                }
              }
            }
            pollingXhr.Request = Request_1;

            /**
             * Module requirements.
             */




            /**
             * Module exports.
             */

            var pollingJsonp = JSONPPolling;

            /**
             * Cached regular expressions.
             */

            var rNewline = /\n/g;
            var rEscapedNewline = /\\n/g;

            /**
             * Global JSONP callbacks.
             */

            var callbacks;

            /**
             * Noop.
             */

            function empty$1 () { }

            /**
             * Until https://github.com/tc39/proposal-global is shipped.
             */
            function glob () {
              return typeof self !== 'undefined' ? self
                  : typeof window !== 'undefined' ? window
                  : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};
            }

            /**
             * JSONP Polling constructor.
             *
             * @param {Object} opts.
             * @api public
             */

            function JSONPPolling (opts) {
              polling.call(this, opts);

              this.query = this.query || {};

              // define global callbacks array if not present
              // we do this here (lazily) to avoid unneeded global pollution
              if (!callbacks) {
                // we need to consider multiple engines in the same page
                var global = glob();
                callbacks = global.___eio = (global.___eio || []);
              }

              // callback identifier
              this.index = callbacks.length;

              // add callback to jsonp global
              var self = this;
              callbacks.push(function (msg) {
                self.onData(msg);
              });

              // append to query string
              this.query.j = this.index;

              // prevent spurious errors from being emitted when the window is unloaded
              if (typeof addEventListener === 'function') {
                addEventListener('beforeunload', function () {
                  if (self.script) self.script.onerror = empty$1;
                }, false);
              }
            }

            /**
             * Inherits from Polling.
             */

            componentInherit(JSONPPolling, polling);

            /*
             * JSONP only supports binary as base64 encoded strings
             */

            JSONPPolling.prototype.supportsBinary = false;

            /**
             * Closes the socket.
             *
             * @api private
             */

            JSONPPolling.prototype.doClose = function () {
              if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null;
              }

              if (this.form) {
                this.form.parentNode.removeChild(this.form);
                this.form = null;
                this.iframe = null;
              }

              polling.prototype.doClose.call(this);
            };

            /**
             * Starts a poll cycle.
             *
             * @api private
             */

            JSONPPolling.prototype.doPoll = function () {
              var self = this;
              var script = document.createElement('script');

              if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null;
              }

              script.async = true;
              script.src = this.uri();
              script.onerror = function (e) {
                self.onError('jsonp poll error', e);
              };

              var insertAt = document.getElementsByTagName('script')[0];
              if (insertAt) {
                insertAt.parentNode.insertBefore(script, insertAt);
              } else {
                (document.head || document.body).appendChild(script);
              }
              this.script = script;

              var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

              if (isUAgecko) {
                setTimeout(function () {
                  var iframe = document.createElement('iframe');
                  document.body.appendChild(iframe);
                  document.body.removeChild(iframe);
                }, 100);
              }
            };

            /**
             * Writes with a hidden iframe.
             *
             * @param {String} data to send
             * @param {Function} called upon flush.
             * @api private
             */

            JSONPPolling.prototype.doWrite = function (data, fn) {
              var self = this;

              if (!this.form) {
                var form = document.createElement('form');
                var area = document.createElement('textarea');
                var id = this.iframeId = 'eio_iframe_' + this.index;
                var iframe;

                form.className = 'socketio';
                form.style.position = 'absolute';
                form.style.top = '-1000px';
                form.style.left = '-1000px';
                form.target = id;
                form.method = 'POST';
                form.setAttribute('accept-charset', 'utf-8');
                area.name = 'd';
                form.appendChild(area);
                document.body.appendChild(form);

                this.form = form;
                this.area = area;
              }

              this.form.action = this.uri();

              function complete () {
                initIframe();
                fn();
              }

              function initIframe () {
                if (self.iframe) {
                  try {
                    self.form.removeChild(self.iframe);
                  } catch (e) {
                    self.onError('jsonp polling iframe removal error', e);
                  }
                }

                try {
                  // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                  var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                  iframe = document.createElement(html);
                } catch (e) {
                  iframe = document.createElement('iframe');
                  iframe.name = self.iframeId;
                  iframe.src = 'javascript:0';
                }

                iframe.id = self.iframeId;

                self.form.appendChild(iframe);
                self.iframe = iframe;
              }

              initIframe();

              // escape \n to prevent it from being converted into \r\n by some UAs
              // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
              data = data.replace(rEscapedNewline, '\\\n');
              this.area.value = data.replace(rNewline, '\\n');

              try {
                this.form.submit();
              } catch (e) {}

              if (this.iframe.attachEvent) {
                this.iframe.onreadystatechange = function () {
                  if (self.iframe.readyState === 'complete') {
                    complete();
                  }
                };
              } else {
                this.iframe.onload = complete;
              }
            };

            var require$$1 = {};

            /**
             * Module dependencies.
             */






            var debug$6 = browser$4('engine.io-client:websocket');

            var BrowserWebSocket, NodeWebSocket;

            if (typeof WebSocket !== 'undefined') {
              BrowserWebSocket = WebSocket;
            } else if (typeof self !== 'undefined') {
              BrowserWebSocket = self.WebSocket || self.MozWebSocket;
            } else {
              try {
                NodeWebSocket = require$$1;
              } catch (e) { }
            }

            /**
             * Get either the `WebSocket` or `MozWebSocket` globals
             * in the browser or try to resolve WebSocket-compatible
             * interface exposed by `ws` for Node-like environment.
             */

            var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

            /**
             * Module exports.
             */

            var websocket = WS;

            /**
             * WebSocket transport constructor.
             *
             * @api {Object} connection options
             * @api public
             */

            function WS (opts) {
              var forceBase64 = (opts && opts.forceBase64);
              if (forceBase64) {
                this.supportsBinary = false;
              }
              this.perMessageDeflate = opts.perMessageDeflate;
              this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
              this.protocols = opts.protocols;
              if (!this.usingBrowserWebSocket) {
                WebSocketImpl = NodeWebSocket;
              }
              transport.call(this, opts);
            }

            /**
             * Inherits from Transport.
             */

            componentInherit(WS, transport);

            /**
             * Transport name.
             *
             * @api public
             */

            WS.prototype.name = 'websocket';

            /*
             * WebSockets support binary
             */

            WS.prototype.supportsBinary = true;

            /**
             * Opens socket.
             *
             * @api private
             */

            WS.prototype.doOpen = function () {
              if (!this.check()) {
                // let probe timeout
                return;
              }

              var uri = this.uri();
              var protocols = this.protocols;
              var opts = {
                agent: this.agent,
                perMessageDeflate: this.perMessageDeflate
              };

              // SSL options for Node.js client
              opts.pfx = this.pfx;
              opts.key = this.key;
              opts.passphrase = this.passphrase;
              opts.cert = this.cert;
              opts.ca = this.ca;
              opts.ciphers = this.ciphers;
              opts.rejectUnauthorized = this.rejectUnauthorized;
              if (this.extraHeaders) {
                opts.headers = this.extraHeaders;
              }
              if (this.localAddress) {
                opts.localAddress = this.localAddress;
              }

              try {
                this.ws =
                  this.usingBrowserWebSocket && !this.isReactNative
                    ? protocols
                      ? new WebSocketImpl(uri, protocols)
                      : new WebSocketImpl(uri)
                    : new WebSocketImpl(uri, protocols, opts);
              } catch (err) {
                return this.emit('error', err);
              }

              if (this.ws.binaryType === undefined) {
                this.supportsBinary = false;
              }

              if (this.ws.supports && this.ws.supports.binary) {
                this.supportsBinary = true;
                this.ws.binaryType = 'nodebuffer';
              } else {
                this.ws.binaryType = 'arraybuffer';
              }

              this.addEventListeners();
            };

            /**
             * Adds event listeners to the socket
             *
             * @api private
             */

            WS.prototype.addEventListeners = function () {
              var self = this;

              this.ws.onopen = function () {
                self.onOpen();
              };
              this.ws.onclose = function () {
                self.onClose();
              };
              this.ws.onmessage = function (ev) {
                self.onData(ev.data);
              };
              this.ws.onerror = function (e) {
                self.onError('websocket error', e);
              };
            };

            /**
             * Writes data to socket.
             *
             * @param {Array} array of packets.
             * @api private
             */

            WS.prototype.write = function (packets) {
              var self = this;
              this.writable = false;

              // encodePacket efficient as it uses WS framing
              // no need for encodePayload
              var total = packets.length;
              for (var i = 0, l = total; i < l; i++) {
                (function (packet) {
                  browser$3.encodePacket(packet, self.supportsBinary, function (data) {
                    if (!self.usingBrowserWebSocket) {
                      // always create a new object (GH-437)
                      var opts = {};
                      if (packet.options) {
                        opts.compress = packet.options.compress;
                      }

                      if (self.perMessageDeflate) {
                        var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < self.perMessageDeflate.threshold) {
                          opts.compress = false;
                        }
                      }
                    }

                    // Sometimes the websocket has already been closed but the browser didn't
                    // have a chance of informing us about it yet, in that case send will
                    // throw an error
                    try {
                      if (self.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        self.ws.send(data);
                      } else {
                        self.ws.send(data, opts);
                      }
                    } catch (e) {
                      debug$6('websocket closed before onclose event');
                    }

                    --total || done();
                  });
                })(packets[i]);
              }

              function done () {
                self.emit('flush');

                // fake drain
                // defer to next tick to allow Socket to clear writeBuffer
                setTimeout(function () {
                  self.writable = true;
                  self.emit('drain');
                }, 0);
              }
            };

            /**
             * Called upon close
             *
             * @api private
             */

            WS.prototype.onClose = function () {
              transport.prototype.onClose.call(this);
            };

            /**
             * Closes socket.
             *
             * @api private
             */

            WS.prototype.doClose = function () {
              if (typeof this.ws !== 'undefined') {
                this.ws.close();
              }
            };

            /**
             * Generates uri for connection.
             *
             * @api private
             */

            WS.prototype.uri = function () {
              var query = this.query || {};
              var schema = this.secure ? 'wss' : 'ws';
              var port = '';

              // avoid port if default for schema
              if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
                ('ws' === schema && Number(this.port) !== 80))) {
                port = ':' + this.port;
              }

              // append timestamp to URI
              if (this.timestampRequests) {
                query[this.timestampParam] = yeast_1();
              }

              // communicate binary support capabilities
              if (!this.supportsBinary) {
                query.b64 = 1;
              }

              query = parseqs.encode(query);

              // prepend ? to query
              if (query.length) {
                query = '?' + query;
              }

              var ipv6 = this.hostname.indexOf(':') !== -1;
              return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
            };

            /**
             * Feature detection for WebSocket.
             *
             * @return {Boolean} whether this transport is available.
             * @api public
             */

            WS.prototype.check = function () {
              return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
            };

            /**
             * Module dependencies
             */






            /**
             * Export transports.
             */

            var polling_1 = polling$1;
            var websocket_1 = websocket;

            /**
             * Polling transport polymorphic constructor.
             * Decides on xhr vs jsonp based on feature detection.
             *
             * @api private
             */

            function polling$1 (opts) {
              var xhr;
              var xd = false;
              var xs = false;
              var jsonp = false !== opts.jsonp;

              if (typeof location !== 'undefined') {
                var isSSL = 'https:' === location.protocol;
                var port = location.port;

                // some user agents have empty `location.port`
                if (!port) {
                  port = isSSL ? 443 : 80;
                }

                xd = opts.hostname !== location.hostname || port !== opts.port;
                xs = opts.secure !== isSSL;
              }

              opts.xdomain = xd;
              opts.xscheme = xs;
              xhr = new xmlhttprequest(opts);

              if ('open' in xhr && !opts.forceJSONP) {
                return new pollingXhr(opts);
              } else {
                if (!jsonp) throw new Error('JSONP disabled');
                return new pollingJsonp(opts);
              }
            }

            var transports = {
            	polling: polling_1,
            	websocket: websocket_1
            };

            var indexOf = [].indexOf;

            var indexof = function(arr, obj){
              if (indexOf) return arr.indexOf(obj);
              for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj) return i;
              }
              return -1;
            };

            /**
             * Module dependencies.
             */



            var debug$7 = browser$4('engine.io-client:socket');





            /**
             * Module exports.
             */

            var socket = Socket;

            /**
             * Socket constructor.
             *
             * @param {String|Object} uri or options
             * @param {Object} options
             * @api public
             */

            function Socket (uri, opts) {
              if (!(this instanceof Socket)) return new Socket(uri, opts);

              opts = opts || {};

              if (uri && 'object' === typeof uri) {
                opts = uri;
                uri = null;
              }

              if (uri) {
                uri = parseuri(uri);
                opts.hostname = uri.host;
                opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
                opts.port = uri.port;
                if (uri.query) opts.query = uri.query;
              } else if (opts.host) {
                opts.hostname = parseuri(opts.host).host;
              }

              this.secure = null != opts.secure ? opts.secure
                : (typeof location !== 'undefined' && 'https:' === location.protocol);

              if (opts.hostname && !opts.port) {
                // if no port is specified manually, use the protocol default
                opts.port = this.secure ? '443' : '80';
              }

              this.agent = opts.agent || false;
              this.hostname = opts.hostname ||
                (typeof location !== 'undefined' ? location.hostname : 'localhost');
              this.port = opts.port || (typeof location !== 'undefined' && location.port
                  ? location.port
                  : (this.secure ? 443 : 80));
              this.query = opts.query || {};
              if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
              this.upgrade = false !== opts.upgrade;
              this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
              this.forceJSONP = !!opts.forceJSONP;
              this.jsonp = false !== opts.jsonp;
              this.forceBase64 = !!opts.forceBase64;
              this.enablesXDR = !!opts.enablesXDR;
              this.timestampParam = opts.timestampParam || 't';
              this.timestampRequests = opts.timestampRequests;
              this.transports = opts.transports || ['polling', 'websocket'];
              this.transportOptions = opts.transportOptions || {};
              this.readyState = '';
              this.writeBuffer = [];
              this.prevBufferLen = 0;
              this.policyPort = opts.policyPort || 843;
              this.rememberUpgrade = opts.rememberUpgrade || false;
              this.binaryType = null;
              this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
              this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

              if (true === this.perMessageDeflate) this.perMessageDeflate = {};
              if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
                this.perMessageDeflate.threshold = 1024;
              }

              // SSL options for Node.js client
              this.pfx = opts.pfx || null;
              this.key = opts.key || null;
              this.passphrase = opts.passphrase || null;
              this.cert = opts.cert || null;
              this.ca = opts.ca || null;
              this.ciphers = opts.ciphers || null;
              this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
              this.forceNode = !!opts.forceNode;

              // detect ReactNative environment
              this.isReactNative = (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative');

              // other options for Node.js or ReactNative client
              if (typeof self === 'undefined' || this.isReactNative) {
                if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
                  this.extraHeaders = opts.extraHeaders;
                }

                if (opts.localAddress) {
                  this.localAddress = opts.localAddress;
                }
              }

              // set on handshake
              this.id = null;
              this.upgrades = null;
              this.pingInterval = null;
              this.pingTimeout = null;

              // set on heartbeat
              this.pingIntervalTimer = null;
              this.pingTimeoutTimer = null;

              this.open();
            }

            Socket.priorWebsocketSuccess = false;

            /**
             * Mix in `Emitter`.
             */

            componentEmitter(Socket.prototype);

            /**
             * Protocol version.
             *
             * @api public
             */

            Socket.protocol = browser$3.protocol; // this is an int

            /**
             * Expose deps for legacy compatibility
             * and standalone browser access.
             */

            Socket.Socket = Socket;
            Socket.Transport = transport;
            Socket.transports = transports;
            Socket.parser = browser$3;

            /**
             * Creates transport of the given type.
             *
             * @param {String} transport name
             * @return {Transport}
             * @api private
             */

            Socket.prototype.createTransport = function (name) {
              debug$7('creating transport "%s"', name);
              var query = clone(this.query);

              // append engine.io protocol identifier
              query.EIO = browser$3.protocol;

              // transport name
              query.transport = name;

              // per-transport options
              var options = this.transportOptions[name] || {};

              // session id if we already have one
              if (this.id) query.sid = this.id;

              var transport$$1 = new transports[name]({
                query: query,
                socket: this,
                agent: options.agent || this.agent,
                hostname: options.hostname || this.hostname,
                port: options.port || this.port,
                secure: options.secure || this.secure,
                path: options.path || this.path,
                forceJSONP: options.forceJSONP || this.forceJSONP,
                jsonp: options.jsonp || this.jsonp,
                forceBase64: options.forceBase64 || this.forceBase64,
                enablesXDR: options.enablesXDR || this.enablesXDR,
                timestampRequests: options.timestampRequests || this.timestampRequests,
                timestampParam: options.timestampParam || this.timestampParam,
                policyPort: options.policyPort || this.policyPort,
                pfx: options.pfx || this.pfx,
                key: options.key || this.key,
                passphrase: options.passphrase || this.passphrase,
                cert: options.cert || this.cert,
                ca: options.ca || this.ca,
                ciphers: options.ciphers || this.ciphers,
                rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: options.extraHeaders || this.extraHeaders,
                forceNode: options.forceNode || this.forceNode,
                localAddress: options.localAddress || this.localAddress,
                requestTimeout: options.requestTimeout || this.requestTimeout,
                protocols: options.protocols || void (0),
                isReactNative: this.isReactNative
              });

              return transport$$1;
            };

            function clone (obj) {
              var o = {};
              for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                  o[i] = obj[i];
                }
              }
              return o;
            }

            /**
             * Initializes transport to use and starts probe.
             *
             * @api private
             */
            Socket.prototype.open = function () {
              var transport$$1;
              if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
                transport$$1 = 'websocket';
              } else if (0 === this.transports.length) {
                // Emit error on next tick so it can be listened to
                var self = this;
                setTimeout(function () {
                  self.emit('error', 'No transports available');
                }, 0);
                return;
              } else {
                transport$$1 = this.transports[0];
              }
              this.readyState = 'opening';

              // Retry with the next transport if the transport is disabled (jsonp: false)
              try {
                transport$$1 = this.createTransport(transport$$1);
              } catch (e) {
                this.transports.shift();
                this.open();
                return;
              }

              transport$$1.open();
              this.setTransport(transport$$1);
            };

            /**
             * Sets the current transport. Disables the existing one (if any).
             *
             * @api private
             */

            Socket.prototype.setTransport = function (transport$$1) {
              debug$7('setting transport %s', transport$$1.name);
              var self = this;

              if (this.transport) {
                debug$7('clearing existing transport %s', this.transport.name);
                this.transport.removeAllListeners();
              }

              // set up transport
              this.transport = transport$$1;

              // set up transport listeners
              transport$$1
              .on('drain', function () {
                self.onDrain();
              })
              .on('packet', function (packet) {
                self.onPacket(packet);
              })
              .on('error', function (e) {
                self.onError(e);
              })
              .on('close', function () {
                self.onClose('transport close');
              });
            };

            /**
             * Probes a transport.
             *
             * @param {String} transport name
             * @api private
             */

            Socket.prototype.probe = function (name) {
              debug$7('probing transport "%s"', name);
              var transport$$1 = this.createTransport(name, { probe: 1 });
              var failed = false;
              var self = this;

              Socket.priorWebsocketSuccess = false;

              function onTransportOpen () {
                if (self.onlyBinaryUpgrades) {
                  var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                  failed = failed || upgradeLosesBinary;
                }
                if (failed) return;

                debug$7('probe transport "%s" opened', name);
                transport$$1.send([{ type: 'ping', data: 'probe' }]);
                transport$$1.once('packet', function (msg) {
                  if (failed) return;
                  if ('pong' === msg.type && 'probe' === msg.data) {
                    debug$7('probe transport "%s" pong', name);
                    self.upgrading = true;
                    self.emit('upgrading', transport$$1);
                    if (!transport$$1) return;
                    Socket.priorWebsocketSuccess = 'websocket' === transport$$1.name;

                    debug$7('pausing current transport "%s"', self.transport.name);
                    self.transport.pause(function () {
                      if (failed) return;
                      if ('closed' === self.readyState) return;
                      debug$7('changing transport and sending upgrade packet');

                      cleanup();

                      self.setTransport(transport$$1);
                      transport$$1.send([{ type: 'upgrade' }]);
                      self.emit('upgrade', transport$$1);
                      transport$$1 = null;
                      self.upgrading = false;
                      self.flush();
                    });
                  } else {
                    debug$7('probe transport "%s" failed', name);
                    var err = new Error('probe error');
                    err.transport = transport$$1.name;
                    self.emit('upgradeError', err);
                  }
                });
              }

              function freezeTransport () {
                if (failed) return;

                // Any callback called by transport should be ignored since now
                failed = true;

                cleanup();

                transport$$1.close();
                transport$$1 = null;
              }

              // Handle any error that happens while probing
              function onerror (err) {
                var error = new Error('probe error: ' + err);
                error.transport = transport$$1.name;

                freezeTransport();

                debug$7('probe transport "%s" failed because of error: %s', name, err);

                self.emit('upgradeError', error);
              }

              function onTransportClose () {
                onerror('transport closed');
              }

              // When the socket is closed while we're probing
              function onclose () {
                onerror('socket closed');
              }

              // When the socket is upgraded while we're probing
              function onupgrade (to) {
                if (transport$$1 && to.name !== transport$$1.name) {
                  debug$7('"%s" works - aborting "%s"', to.name, transport$$1.name);
                  freezeTransport();
                }
              }

              // Remove all listeners on the transport and on self
              function cleanup () {
                transport$$1.removeListener('open', onTransportOpen);
                transport$$1.removeListener('error', onerror);
                transport$$1.removeListener('close', onTransportClose);
                self.removeListener('close', onclose);
                self.removeListener('upgrading', onupgrade);
              }

              transport$$1.once('open', onTransportOpen);
              transport$$1.once('error', onerror);
              transport$$1.once('close', onTransportClose);

              this.once('close', onclose);
              this.once('upgrading', onupgrade);

              transport$$1.open();
            };

            /**
             * Called when connection is deemed open.
             *
             * @api public
             */

            Socket.prototype.onOpen = function () {
              debug$7('socket open');
              this.readyState = 'open';
              Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
              this.emit('open');
              this.flush();

              // we check for `readyState` in case an `open`
              // listener already closed the socket
              if ('open' === this.readyState && this.upgrade && this.transport.pause) {
                debug$7('starting upgrade probes');
                for (var i = 0, l = this.upgrades.length; i < l; i++) {
                  this.probe(this.upgrades[i]);
                }
              }
            };

            /**
             * Handles a packet.
             *
             * @api private
             */

            Socket.prototype.onPacket = function (packet) {
              if ('opening' === this.readyState || 'open' === this.readyState ||
                  'closing' === this.readyState) {
                debug$7('socket receive: type "%s", data "%s"', packet.type, packet.data);

                this.emit('packet', packet);

                // Socket is live - any packet counts
                this.emit('heartbeat');

                switch (packet.type) {
                  case 'open':
                    this.onHandshake(JSON.parse(packet.data));
                    break;

                  case 'pong':
                    this.setPing();
                    this.emit('pong');
                    break;

                  case 'error':
                    var err = new Error('server error');
                    err.code = packet.data;
                    this.onError(err);
                    break;

                  case 'message':
                    this.emit('data', packet.data);
                    this.emit('message', packet.data);
                    break;
                }
              } else {
                debug$7('packet received with socket readyState "%s"', this.readyState);
              }
            };

            /**
             * Called upon handshake completion.
             *
             * @param {Object} handshake obj
             * @api private
             */

            Socket.prototype.onHandshake = function (data) {
              this.emit('handshake', data);
              this.id = data.sid;
              this.transport.query.sid = data.sid;
              this.upgrades = this.filterUpgrades(data.upgrades);
              this.pingInterval = data.pingInterval;
              this.pingTimeout = data.pingTimeout;
              this.onOpen();
              // In case open handler closes socket
              if ('closed' === this.readyState) return;
              this.setPing();

              // Prolong liveness of socket on heartbeat
              this.removeListener('heartbeat', this.onHeartbeat);
              this.on('heartbeat', this.onHeartbeat);
            };

            /**
             * Resets ping timeout.
             *
             * @api private
             */

            Socket.prototype.onHeartbeat = function (timeout) {
              clearTimeout(this.pingTimeoutTimer);
              var self = this;
              self.pingTimeoutTimer = setTimeout(function () {
                if ('closed' === self.readyState) return;
                self.onClose('ping timeout');
              }, timeout || (self.pingInterval + self.pingTimeout));
            };

            /**
             * Pings server every `this.pingInterval` and expects response
             * within `this.pingTimeout` or closes connection.
             *
             * @api private
             */

            Socket.prototype.setPing = function () {
              var self = this;
              clearTimeout(self.pingIntervalTimer);
              self.pingIntervalTimer = setTimeout(function () {
                debug$7('writing ping packet - expecting pong within %sms', self.pingTimeout);
                self.ping();
                self.onHeartbeat(self.pingTimeout);
              }, self.pingInterval);
            };

            /**
            * Sends a ping packet.
            *
            * @api private
            */

            Socket.prototype.ping = function () {
              var self = this;
              this.sendPacket('ping', function () {
                self.emit('ping');
              });
            };

            /**
             * Called on `drain` event
             *
             * @api private
             */

            Socket.prototype.onDrain = function () {
              this.writeBuffer.splice(0, this.prevBufferLen);

              // setting prevBufferLen = 0 is very important
              // for example, when upgrading, upgrade packet is sent over,
              // and a nonzero prevBufferLen could cause problems on `drain`
              this.prevBufferLen = 0;

              if (0 === this.writeBuffer.length) {
                this.emit('drain');
              } else {
                this.flush();
              }
            };

            /**
             * Flush write buffers.
             *
             * @api private
             */

            Socket.prototype.flush = function () {
              if ('closed' !== this.readyState && this.transport.writable &&
                !this.upgrading && this.writeBuffer.length) {
                debug$7('flushing %d packets in socket', this.writeBuffer.length);
                this.transport.send(this.writeBuffer);
                // keep track of current length of writeBuffer
                // splice writeBuffer and callbackBuffer on `drain`
                this.prevBufferLen = this.writeBuffer.length;
                this.emit('flush');
              }
            };

            /**
             * Sends a message.
             *
             * @param {String} message.
             * @param {Function} callback function.
             * @param {Object} options.
             * @return {Socket} for chaining.
             * @api public
             */

            Socket.prototype.write =
            Socket.prototype.send = function (msg, options, fn) {
              this.sendPacket('message', msg, options, fn);
              return this;
            };

            /**
             * Sends a packet.
             *
             * @param {String} packet type.
             * @param {String} data.
             * @param {Object} options.
             * @param {Function} callback function.
             * @api private
             */

            Socket.prototype.sendPacket = function (type, data, options, fn) {
              if ('function' === typeof data) {
                fn = data;
                data = undefined;
              }

              if ('function' === typeof options) {
                fn = options;
                options = null;
              }

              if ('closing' === this.readyState || 'closed' === this.readyState) {
                return;
              }

              options = options || {};
              options.compress = false !== options.compress;

              var packet = {
                type: type,
                data: data,
                options: options
              };
              this.emit('packetCreate', packet);
              this.writeBuffer.push(packet);
              if (fn) this.once('flush', fn);
              this.flush();
            };

            /**
             * Closes the connection.
             *
             * @api private
             */

            Socket.prototype.close = function () {
              if ('opening' === this.readyState || 'open' === this.readyState) {
                this.readyState = 'closing';

                var self = this;

                if (this.writeBuffer.length) {
                  this.once('drain', function () {
                    if (this.upgrading) {
                      waitForUpgrade();
                    } else {
                      close();
                    }
                  });
                } else if (this.upgrading) {
                  waitForUpgrade();
                } else {
                  close();
                }
              }

              function close () {
                self.onClose('forced close');
                debug$7('socket closing - telling transport to close');
                self.transport.close();
              }

              function cleanupAndClose () {
                self.removeListener('upgrade', cleanupAndClose);
                self.removeListener('upgradeError', cleanupAndClose);
                close();
              }

              function waitForUpgrade () {
                // wait for upgrade to finish since we can't send packets while pausing a transport
                self.once('upgrade', cleanupAndClose);
                self.once('upgradeError', cleanupAndClose);
              }

              return this;
            };

            /**
             * Called upon transport error
             *
             * @api private
             */

            Socket.prototype.onError = function (err) {
              debug$7('socket error %j', err);
              Socket.priorWebsocketSuccess = false;
              this.emit('error', err);
              this.onClose('transport error', err);
            };

            /**
             * Called upon transport close.
             *
             * @api private
             */

            Socket.prototype.onClose = function (reason, desc) {
              if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
                debug$7('socket close with reason: "%s"', reason);
                var self = this;

                // clear timers
                clearTimeout(this.pingIntervalTimer);
                clearTimeout(this.pingTimeoutTimer);

                // stop event from firing again for transport
                this.transport.removeAllListeners('close');

                // ensure transport won't stay open
                this.transport.close();

                // ignore further transport communication
                this.transport.removeAllListeners();

                // set ready state
                this.readyState = 'closed';

                // clear session id
                this.id = null;

                // emit close event
                this.emit('close', reason, desc);

                // clean buffers after, so users can still
                // grab the buffers on `close` event
                self.writeBuffer = [];
                self.prevBufferLen = 0;
              }
            };

            /**
             * Filters upgrades, returning only those matching client transports.
             *
             * @param {Array} server upgrades
             * @api private
             *
             */

            Socket.prototype.filterUpgrades = function (upgrades) {
              var filteredUpgrades = [];
              for (var i = 0, j = upgrades.length; i < j; i++) {
                if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
              }
              return filteredUpgrades;
            };

            var lib = socket;

            /**
             * Exports parser
             *
             * @api public
             *
             */
            var parser = browser$3;
            lib.parser = parser;

            var toArray_1 = toArray;

            function toArray(list, index) {
                var array = [];

                index = index || 0;

                for (var i = index || 0; i < list.length; i++) {
                    array[i - index] = list[i];
                }

                return array
            }

            /**
             * Module exports.
             */

            var on_1 = on$1;

            /**
             * Helper for subscriptions.
             *
             * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
             * @param {String} event name
             * @param {Function} callback
             * @api public
             */

            function on$1 (obj, ev, fn) {
              obj.on(ev, fn);
              return {
                destroy: function () {
                  obj.removeListener(ev, fn);
                }
              };
            }

            /**
             * Slice reference.
             */

            var slice = [].slice;

            /**
             * Bind `obj` to `fn`.
             *
             * @param {Object} obj
             * @param {Function|String} fn or string
             * @return {Function}
             * @api public
             */

            var componentBind = function(obj, fn){
              if ('string' == typeof fn) fn = obj[fn];
              if ('function' != typeof fn) throw new Error('bind() requires a function');
              var args = slice.call(arguments, 2);
              return function(){
                return fn.apply(obj, args.concat(slice.call(arguments)));
              }
            };

            var socket$1 = createCommonjsModule(function (module, exports) {
            /**
             * Module dependencies.
             */






            var debug = browser$1('socket.io-client:socket');



            /**
             * Module exports.
             */

            module.exports = exports = Socket;

            /**
             * Internal events (blacklisted).
             * These events can't be emitted by the user.
             *
             * @api private
             */

            var events = {
              connect: 1,
              connect_error: 1,
              connect_timeout: 1,
              connecting: 1,
              disconnect: 1,
              error: 1,
              reconnect: 1,
              reconnect_attempt: 1,
              reconnect_failed: 1,
              reconnect_error: 1,
              reconnecting: 1,
              ping: 1,
              pong: 1
            };

            /**
             * Shortcut to `Emitter#emit`.
             */

            var emit = componentEmitter.prototype.emit;

            /**
             * `Socket` constructor.
             *
             * @api public
             */

            function Socket (io, nsp, opts) {
              this.io = io;
              this.nsp = nsp;
              this.json = this; // compat
              this.ids = 0;
              this.acks = {};
              this.receiveBuffer = [];
              this.sendBuffer = [];
              this.connected = false;
              this.disconnected = true;
              this.flags = {};
              if (opts && opts.query) {
                this.query = opts.query;
              }
              if (this.io.autoConnect) this.open();
            }

            /**
             * Mix in `Emitter`.
             */

            componentEmitter(Socket.prototype);

            /**
             * Subscribe to open, close and packet events
             *
             * @api private
             */

            Socket.prototype.subEvents = function () {
              if (this.subs) return;

              var io = this.io;
              this.subs = [
                on_1(io, 'open', componentBind(this, 'onopen')),
                on_1(io, 'packet', componentBind(this, 'onpacket')),
                on_1(io, 'close', componentBind(this, 'onclose'))
              ];
            };

            /**
             * "Opens" the socket.
             *
             * @api public
             */

            Socket.prototype.open =
            Socket.prototype.connect = function () {
              if (this.connected) return this;

              this.subEvents();
              this.io.open(); // ensure open
              if ('open' === this.io.readyState) this.onopen();
              this.emit('connecting');
              return this;
            };

            /**
             * Sends a `message` event.
             *
             * @return {Socket} self
             * @api public
             */

            Socket.prototype.send = function () {
              var args = toArray_1(arguments);
              args.unshift('message');
              this.emit.apply(this, args);
              return this;
            };

            /**
             * Override `emit`.
             * If the event is in `events`, it's emitted normally.
             *
             * @param {String} event name
             * @return {Socket} self
             * @api public
             */

            Socket.prototype.emit = function (ev) {
              if (events.hasOwnProperty(ev)) {
                emit.apply(this, arguments);
                return this;
              }

              var args = toArray_1(arguments);
              var packet = {
                type: (this.flags.binary !== undefined ? this.flags.binary : hasBinary2(args)) ? socket_ioParser.BINARY_EVENT : socket_ioParser.EVENT,
                data: args
              };

              packet.options = {};
              packet.options.compress = !this.flags || false !== this.flags.compress;

              // event ack callback
              if ('function' === typeof args[args.length - 1]) {
                debug('emitting packet with ack id %d', this.ids);
                this.acks[this.ids] = args.pop();
                packet.id = this.ids++;
              }

              if (this.connected) {
                this.packet(packet);
              } else {
                this.sendBuffer.push(packet);
              }

              this.flags = {};

              return this;
            };

            /**
             * Sends a packet.
             *
             * @param {Object} packet
             * @api private
             */

            Socket.prototype.packet = function (packet) {
              packet.nsp = this.nsp;
              this.io.packet(packet);
            };

            /**
             * Called upon engine `open`.
             *
             * @api private
             */

            Socket.prototype.onopen = function () {
              debug('transport is open - connecting');

              // write connect packet if necessary
              if ('/' !== this.nsp) {
                if (this.query) {
                  var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
                  debug('sending connect packet with query %s', query);
                  this.packet({type: socket_ioParser.CONNECT, query: query});
                } else {
                  this.packet({type: socket_ioParser.CONNECT});
                }
              }
            };

            /**
             * Called upon engine `close`.
             *
             * @param {String} reason
             * @api private
             */

            Socket.prototype.onclose = function (reason) {
              debug('close (%s)', reason);
              this.connected = false;
              this.disconnected = true;
              delete this.id;
              this.emit('disconnect', reason);
            };

            /**
             * Called with socket packet.
             *
             * @param {Object} packet
             * @api private
             */

            Socket.prototype.onpacket = function (packet) {
              var sameNamespace = packet.nsp === this.nsp;
              var rootNamespaceError = packet.type === socket_ioParser.ERROR && packet.nsp === '/';

              if (!sameNamespace && !rootNamespaceError) return;

              switch (packet.type) {
                case socket_ioParser.CONNECT:
                  this.onconnect();
                  break;

                case socket_ioParser.EVENT:
                  this.onevent(packet);
                  break;

                case socket_ioParser.BINARY_EVENT:
                  this.onevent(packet);
                  break;

                case socket_ioParser.ACK:
                  this.onack(packet);
                  break;

                case socket_ioParser.BINARY_ACK:
                  this.onack(packet);
                  break;

                case socket_ioParser.DISCONNECT:
                  this.ondisconnect();
                  break;

                case socket_ioParser.ERROR:
                  this.emit('error', packet.data);
                  break;
              }
            };

            /**
             * Called upon a server event.
             *
             * @param {Object} packet
             * @api private
             */

            Socket.prototype.onevent = function (packet) {
              var args = packet.data || [];
              debug('emitting event %j', args);

              if (null != packet.id) {
                debug('attaching ack callback to event');
                args.push(this.ack(packet.id));
              }

              if (this.connected) {
                emit.apply(this, args);
              } else {
                this.receiveBuffer.push(args);
              }
            };

            /**
             * Produces an ack callback to emit with an event.
             *
             * @api private
             */

            Socket.prototype.ack = function (id) {
              var self = this;
              var sent = false;
              return function () {
                // prevent double callbacks
                if (sent) return;
                sent = true;
                var args = toArray_1(arguments);
                debug('sending ack %j', args);

                self.packet({
                  type: hasBinary2(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK,
                  id: id,
                  data: args
                });
              };
            };

            /**
             * Called upon a server acknowlegement.
             *
             * @param {Object} packet
             * @api private
             */

            Socket.prototype.onack = function (packet) {
              var ack = this.acks[packet.id];
              if ('function' === typeof ack) {
                debug('calling ack %s with %j', packet.id, packet.data);
                ack.apply(this, packet.data);
                delete this.acks[packet.id];
              } else {
                debug('bad ack %s', packet.id);
              }
            };

            /**
             * Called upon server connect.
             *
             * @api private
             */

            Socket.prototype.onconnect = function () {
              this.connected = true;
              this.disconnected = false;
              this.emit('connect');
              this.emitBuffered();
            };

            /**
             * Emit buffered events (received and emitted).
             *
             * @api private
             */

            Socket.prototype.emitBuffered = function () {
              var i;
              for (i = 0; i < this.receiveBuffer.length; i++) {
                emit.apply(this, this.receiveBuffer[i]);
              }
              this.receiveBuffer = [];

              for (i = 0; i < this.sendBuffer.length; i++) {
                this.packet(this.sendBuffer[i]);
              }
              this.sendBuffer = [];
            };

            /**
             * Called upon server disconnect.
             *
             * @api private
             */

            Socket.prototype.ondisconnect = function () {
              debug('server disconnect (%s)', this.nsp);
              this.destroy();
              this.onclose('io server disconnect');
            };

            /**
             * Called upon forced client/server side disconnections,
             * this method ensures the manager stops tracking us and
             * that reconnections don't get triggered for this.
             *
             * @api private.
             */

            Socket.prototype.destroy = function () {
              if (this.subs) {
                // clean subscriptions to avoid reconnections
                for (var i = 0; i < this.subs.length; i++) {
                  this.subs[i].destroy();
                }
                this.subs = null;
              }

              this.io.destroy(this);
            };

            /**
             * Disconnects the socket manually.
             *
             * @return {Socket} self
             * @api public
             */

            Socket.prototype.close =
            Socket.prototype.disconnect = function () {
              if (this.connected) {
                debug('performing disconnect (%s)', this.nsp);
                this.packet({ type: socket_ioParser.DISCONNECT });
              }

              // remove socket from pool
              this.destroy();

              if (this.connected) {
                // fire events
                this.onclose('io client disconnect');
              }
              return this;
            };

            /**
             * Sets the compress flag.
             *
             * @param {Boolean} if `true`, compresses the sending data
             * @return {Socket} self
             * @api public
             */

            Socket.prototype.compress = function (compress) {
              this.flags.compress = compress;
              return this;
            };

            /**
             * Sets the binary flag
             *
             * @param {Boolean} whether the emitted data contains binary
             * @return {Socket} self
             * @api public
             */

            Socket.prototype.binary = function (binary) {
              this.flags.binary = binary;
              return this;
            };
            });

            /**
             * Expose `Backoff`.
             */

            var backo2 = Backoff;

            /**
             * Initialize backoff timer with `opts`.
             *
             * - `min` initial timeout in milliseconds [100]
             * - `max` max timeout [10000]
             * - `jitter` [0]
             * - `factor` [2]
             *
             * @param {Object} opts
             * @api public
             */

            function Backoff(opts) {
              opts = opts || {};
              this.ms = opts.min || 100;
              this.max = opts.max || 10000;
              this.factor = opts.factor || 2;
              this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
              this.attempts = 0;
            }

            /**
             * Return the backoff duration.
             *
             * @return {Number}
             * @api public
             */

            Backoff.prototype.duration = function(){
              var ms = this.ms * Math.pow(this.factor, this.attempts++);
              if (this.jitter) {
                var rand =  Math.random();
                var deviation = Math.floor(rand * this.jitter * ms);
                ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
              }
              return Math.min(ms, this.max) | 0;
            };

            /**
             * Reset the number of attempts.
             *
             * @api public
             */

            Backoff.prototype.reset = function(){
              this.attempts = 0;
            };

            /**
             * Set the minimum duration
             *
             * @api public
             */

            Backoff.prototype.setMin = function(min){
              this.ms = min;
            };

            /**
             * Set the maximum duration
             *
             * @api public
             */

            Backoff.prototype.setMax = function(max){
              this.max = max;
            };

            /**
             * Set the jitter
             *
             * @api public
             */

            Backoff.prototype.setJitter = function(jitter){
              this.jitter = jitter;
            };

            /**
             * Module dependencies.
             */







            var debug$8 = browser$1('socket.io-client:manager');



            /**
             * IE6+ hasOwnProperty
             */

            var has = Object.prototype.hasOwnProperty;

            /**
             * Module exports
             */

            var manager = Manager;

            /**
             * `Manager` constructor.
             *
             * @param {String} engine instance or engine uri/opts
             * @param {Object} options
             * @api public
             */

            function Manager (uri, opts) {
              if (!(this instanceof Manager)) return new Manager(uri, opts);
              if (uri && ('object' === typeof uri)) {
                opts = uri;
                uri = undefined;
              }
              opts = opts || {};

              opts.path = opts.path || '/socket.io';
              this.nsps = {};
              this.subs = [];
              this.opts = opts;
              this.reconnection(opts.reconnection !== false);
              this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
              this.reconnectionDelay(opts.reconnectionDelay || 1000);
              this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
              this.randomizationFactor(opts.randomizationFactor || 0.5);
              this.backoff = new backo2({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
              });
              this.timeout(null == opts.timeout ? 20000 : opts.timeout);
              this.readyState = 'closed';
              this.uri = uri;
              this.connecting = [];
              this.lastPing = null;
              this.encoding = false;
              this.packetBuffer = [];
              var _parser = opts.parser || socket_ioParser;
              this.encoder = new _parser.Encoder();
              this.decoder = new _parser.Decoder();
              this.autoConnect = opts.autoConnect !== false;
              if (this.autoConnect) this.open();
            }

            /**
             * Propagate given event to sockets and emit on `this`
             *
             * @api private
             */

            Manager.prototype.emitAll = function () {
              this.emit.apply(this, arguments);
              for (var nsp in this.nsps) {
                if (has.call(this.nsps, nsp)) {
                  this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
                }
              }
            };

            /**
             * Update `socket.id` of all sockets
             *
             * @api private
             */

            Manager.prototype.updateSocketIds = function () {
              for (var nsp in this.nsps) {
                if (has.call(this.nsps, nsp)) {
                  this.nsps[nsp].id = this.generateId(nsp);
                }
              }
            };

            /**
             * generate `socket.id` for the given `nsp`
             *
             * @param {String} nsp
             * @return {String}
             * @api private
             */

            Manager.prototype.generateId = function (nsp) {
              return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
            };

            /**
             * Mix in `Emitter`.
             */

            componentEmitter(Manager.prototype);

            /**
             * Sets the `reconnection` config.
             *
             * @param {Boolean} true/false if it should automatically reconnect
             * @return {Manager} self or value
             * @api public
             */

            Manager.prototype.reconnection = function (v) {
              if (!arguments.length) return this._reconnection;
              this._reconnection = !!v;
              return this;
            };

            /**
             * Sets the reconnection attempts config.
             *
             * @param {Number} max reconnection attempts before giving up
             * @return {Manager} self or value
             * @api public
             */

            Manager.prototype.reconnectionAttempts = function (v) {
              if (!arguments.length) return this._reconnectionAttempts;
              this._reconnectionAttempts = v;
              return this;
            };

            /**
             * Sets the delay between reconnections.
             *
             * @param {Number} delay
             * @return {Manager} self or value
             * @api public
             */

            Manager.prototype.reconnectionDelay = function (v) {
              if (!arguments.length) return this._reconnectionDelay;
              this._reconnectionDelay = v;
              this.backoff && this.backoff.setMin(v);
              return this;
            };

            Manager.prototype.randomizationFactor = function (v) {
              if (!arguments.length) return this._randomizationFactor;
              this._randomizationFactor = v;
              this.backoff && this.backoff.setJitter(v);
              return this;
            };

            /**
             * Sets the maximum delay between reconnections.
             *
             * @param {Number} delay
             * @return {Manager} self or value
             * @api public
             */

            Manager.prototype.reconnectionDelayMax = function (v) {
              if (!arguments.length) return this._reconnectionDelayMax;
              this._reconnectionDelayMax = v;
              this.backoff && this.backoff.setMax(v);
              return this;
            };

            /**
             * Sets the connection timeout. `false` to disable
             *
             * @return {Manager} self or value
             * @api public
             */

            Manager.prototype.timeout = function (v) {
              if (!arguments.length) return this._timeout;
              this._timeout = v;
              return this;
            };

            /**
             * Starts trying to reconnect if reconnection is enabled and we have not
             * started reconnecting yet
             *
             * @api private
             */

            Manager.prototype.maybeReconnectOnOpen = function () {
              // Only try to reconnect if it's the first time we're connecting
              if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
                // keeps reconnection from firing twice for the same reconnection loop
                this.reconnect();
              }
            };

            /**
             * Sets the current transport `socket`.
             *
             * @param {Function} optional, callback
             * @return {Manager} self
             * @api public
             */

            Manager.prototype.open =
            Manager.prototype.connect = function (fn, opts) {
              debug$8('readyState %s', this.readyState);
              if (~this.readyState.indexOf('open')) return this;

              debug$8('opening %s', this.uri);
              this.engine = lib(this.uri, this.opts);
              var socket = this.engine;
              var self = this;
              this.readyState = 'opening';
              this.skipReconnect = false;

              // emit `open`
              var openSub = on_1(socket, 'open', function () {
                self.onopen();
                fn && fn();
              });

              // emit `connect_error`
              var errorSub = on_1(socket, 'error', function (data) {
                debug$8('connect_error');
                self.cleanup();
                self.readyState = 'closed';
                self.emitAll('connect_error', data);
                if (fn) {
                  var err = new Error('Connection error');
                  err.data = data;
                  fn(err);
                } else {
                  // Only do this if there is no fn to handle the error
                  self.maybeReconnectOnOpen();
                }
              });

              // emit `connect_timeout`
              if (false !== this._timeout) {
                var timeout = this._timeout;
                debug$8('connect attempt will timeout after %d', timeout);

                // set timer
                var timer = setTimeout(function () {
                  debug$8('connect attempt timed out after %d', timeout);
                  openSub.destroy();
                  socket.close();
                  socket.emit('error', 'timeout');
                  self.emitAll('connect_timeout', timeout);
                }, timeout);

                this.subs.push({
                  destroy: function () {
                    clearTimeout(timer);
                  }
                });
              }

              this.subs.push(openSub);
              this.subs.push(errorSub);

              return this;
            };

            /**
             * Called upon transport open.
             *
             * @api private
             */

            Manager.prototype.onopen = function () {
              debug$8('open');

              // clear old subs
              this.cleanup();

              // mark as open
              this.readyState = 'open';
              this.emit('open');

              // add new subs
              var socket = this.engine;
              this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
              this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
              this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
              this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
              this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
              this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
            };

            /**
             * Called upon a ping.
             *
             * @api private
             */

            Manager.prototype.onping = function () {
              this.lastPing = new Date();
              this.emitAll('ping');
            };

            /**
             * Called upon a packet.
             *
             * @api private
             */

            Manager.prototype.onpong = function () {
              this.emitAll('pong', new Date() - this.lastPing);
            };

            /**
             * Called with data.
             *
             * @api private
             */

            Manager.prototype.ondata = function (data) {
              this.decoder.add(data);
            };

            /**
             * Called when parser fully decodes a packet.
             *
             * @api private
             */

            Manager.prototype.ondecoded = function (packet) {
              this.emit('packet', packet);
            };

            /**
             * Called upon socket error.
             *
             * @api private
             */

            Manager.prototype.onerror = function (err) {
              debug$8('error', err);
              this.emitAll('error', err);
            };

            /**
             * Creates a new socket for the given `nsp`.
             *
             * @return {Socket}
             * @api public
             */

            Manager.prototype.socket = function (nsp, opts) {
              var socket = this.nsps[nsp];
              if (!socket) {
                socket = new socket$1(this, nsp, opts);
                this.nsps[nsp] = socket;
                var self = this;
                socket.on('connecting', onConnecting);
                socket.on('connect', function () {
                  socket.id = self.generateId(nsp);
                });

                if (this.autoConnect) {
                  // manually call here since connecting event is fired before listening
                  onConnecting();
                }
              }

              function onConnecting () {
                if (!~indexof(self.connecting, socket)) {
                  self.connecting.push(socket);
                }
              }

              return socket;
            };

            /**
             * Called upon a socket close.
             *
             * @param {Socket} socket
             */

            Manager.prototype.destroy = function (socket) {
              var index = indexof(this.connecting, socket);
              if (~index) this.connecting.splice(index, 1);
              if (this.connecting.length) return;

              this.close();
            };

            /**
             * Writes a packet.
             *
             * @param {Object} packet
             * @api private
             */

            Manager.prototype.packet = function (packet) {
              debug$8('writing packet %j', packet);
              var self = this;
              if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

              if (!self.encoding) {
                // encode, then write to engine with result
                self.encoding = true;
                this.encoder.encode(packet, function (encodedPackets) {
                  for (var i = 0; i < encodedPackets.length; i++) {
                    self.engine.write(encodedPackets[i], packet.options);
                  }
                  self.encoding = false;
                  self.processPacketQueue();
                });
              } else { // add packet to the queue
                self.packetBuffer.push(packet);
              }
            };

            /**
             * If packet buffer is non-empty, begins encoding the
             * next packet in line.
             *
             * @api private
             */

            Manager.prototype.processPacketQueue = function () {
              if (this.packetBuffer.length > 0 && !this.encoding) {
                var pack = this.packetBuffer.shift();
                this.packet(pack);
              }
            };

            /**
             * Clean up transport subscriptions and packet buffer.
             *
             * @api private
             */

            Manager.prototype.cleanup = function () {
              debug$8('cleanup');

              var subsLength = this.subs.length;
              for (var i = 0; i < subsLength; i++) {
                var sub = this.subs.shift();
                sub.destroy();
              }

              this.packetBuffer = [];
              this.encoding = false;
              this.lastPing = null;

              this.decoder.destroy();
            };

            /**
             * Close the current socket.
             *
             * @api private
             */

            Manager.prototype.close =
            Manager.prototype.disconnect = function () {
              debug$8('disconnect');
              this.skipReconnect = true;
              this.reconnecting = false;
              if ('opening' === this.readyState) {
                // `onclose` will not fire because
                // an open event never happened
                this.cleanup();
              }
              this.backoff.reset();
              this.readyState = 'closed';
              if (this.engine) this.engine.close();
            };

            /**
             * Called upon engine close.
             *
             * @api private
             */

            Manager.prototype.onclose = function (reason) {
              debug$8('onclose');

              this.cleanup();
              this.backoff.reset();
              this.readyState = 'closed';
              this.emit('close', reason);

              if (this._reconnection && !this.skipReconnect) {
                this.reconnect();
              }
            };

            /**
             * Attempt a reconnection.
             *
             * @api private
             */

            Manager.prototype.reconnect = function () {
              if (this.reconnecting || this.skipReconnect) return this;

              var self = this;

              if (this.backoff.attempts >= this._reconnectionAttempts) {
                debug$8('reconnect failed');
                this.backoff.reset();
                this.emitAll('reconnect_failed');
                this.reconnecting = false;
              } else {
                var delay = this.backoff.duration();
                debug$8('will wait %dms before reconnect attempt', delay);

                this.reconnecting = true;
                var timer = setTimeout(function () {
                  if (self.skipReconnect) return;

                  debug$8('attempting reconnect');
                  self.emitAll('reconnect_attempt', self.backoff.attempts);
                  self.emitAll('reconnecting', self.backoff.attempts);

                  // check again for the case socket closed in above events
                  if (self.skipReconnect) return;

                  self.open(function (err) {
                    if (err) {
                      debug$8('reconnect attempt error');
                      self.reconnecting = false;
                      self.reconnect();
                      self.emitAll('reconnect_error', err.data);
                    } else {
                      debug$8('reconnect success');
                      self.onreconnect();
                    }
                  });
                }, delay);

                this.subs.push({
                  destroy: function () {
                    clearTimeout(timer);
                  }
                });
              }
            };

            /**
             * Called upon successful reconnect.
             *
             * @api private
             */

            Manager.prototype.onreconnect = function () {
              var attempt = this.backoff.attempts;
              this.reconnecting = false;
              this.backoff.reset();
              this.updateSocketIds();
              this.emitAll('reconnect', attempt);
            };

            var lib$1 = createCommonjsModule(function (module, exports) {
            /**
             * Module dependencies.
             */




            var debug = browser$1('socket.io-client');

            /**
             * Module exports.
             */

            module.exports = exports = lookup;

            /**
             * Managers cache.
             */

            var cache = exports.managers = {};

            /**
             * Looks up an existing `Manager` for multiplexing.
             * If the user summons:
             *
             *   `io('http://localhost/a');`
             *   `io('http://localhost/b');`
             *
             * We reuse the existing instance based on same scheme/port/host,
             * and we initialize sockets for each namespace.
             *
             * @api public
             */

            function lookup (uri, opts) {
              if (typeof uri === 'object') {
                opts = uri;
                uri = undefined;
              }

              opts = opts || {};

              var parsed = url_1(uri);
              var source = parsed.source;
              var id = parsed.id;
              var path = parsed.path;
              var sameNamespace = cache[id] && path in cache[id].nsps;
              var newConnection = opts.forceNew || opts['force new connection'] ||
                                  false === opts.multiplex || sameNamespace;

              var io;

              if (newConnection) {
                debug('ignoring socket cache for %s', source);
                io = manager(source, opts);
              } else {
                if (!cache[id]) {
                  debug('new io instance for %s', source);
                  cache[id] = manager(source, opts);
                }
                io = cache[id];
              }
              if (parsed.query && !opts.query) {
                opts.query = parsed.query;
              }
              return io.socket(parsed.path, opts);
            }

            /**
             * Protocol version.
             *
             * @api public
             */

            exports.protocol = socket_ioParser.protocol;

            /**
             * `connect`.
             *
             * @param {String} uri
             * @api public
             */

            exports.connect = lookup;

            /**
             * Expose constructors for standalone build.
             *
             * @api public
             */

            exports.Manager = manager;
            exports.Socket = socket$1;
            });
            var lib_1 = lib$1.managers;
            var lib_2 = lib$1.protocol;
            var lib_3 = lib$1.connect;
            var lib_4 = lib$1.Manager;
            var lib_5 = lib$1.Socket;

            var firstUser = lib$1("http://localhost:3000/", {
              query: "name=tkm.house.new@gmail.com"
            });
            var secondUser = lib$1("http://localhost:3000/", {
              query: "name=tkm.house.old@gmail.com"
            });

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
                  return React$1__default.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between"
                    }
                  }, "Home");
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
                }, React$1__default.createElement("img", {
                  style: {
                    borderRadius: 25
                  },
                  src: "./profile_logo_.JPG",
                  width: "50",
                  height: "50",
                  alt: ""
                }), React$1__default.createElement("button", {
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
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/certification"
                }, "Certifications ", React$1__default.createElement("span", {
                  className: "sr-only"
                }, "(current)"))), React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/modules"
                }, "Modules ", React$1__default.createElement("span", {
                  className: "sr-only"
                }, "(current)"))), React$1__default.createElement("li", {
                  className: "nav-item"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/projects"
                }, "Projects ", React$1__default.createElement("span", {
                  className: "sr-only"
                }, "(current)"))), React$1__default.createElement("li", {
                  className: "nav-item dropdown",
                  hidden: true
                }, React$1__default.createElement("a", {
                  className: "nav-link dropdown-toggle",
                  href: "#",
                  id: "navbarDropdown",
                  role: "button",
                  "data-toggle": "dropdown",
                  "aria-haspopup": "true",
                  "aria-expanded": "false"
                }, "Chat Modules"), React$1__default.createElement("div", {
                  className: "dropdown-menu",
                  "aria-labelledby": "navbarDropdown"
                }, React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/socketmessaging"
                }, "SocketIO Messaging Demo"), React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/webrtcmessaging"
                }, "WebRTC Messaging Demo"), React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/webrtcvideochat"
                }, "WebRTC Video Chat Demo"), React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/webrtcaudiochat"
                }, "WebRTC Audio Chat Demo"), React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/webrtcfileshare"
                }, "WebRTC FileShare Demo"), React$1__default.createElement(NavLink, {
                  className: "nav-link",
                  to: "/scroll"
                }, "Scroll  Demo"), React$1__default.createElement("div", {
                  className: "dropdown-divider"
                }), React$1__default.createElement("a", {
                  className: "dropdown-item",
                  href: "#"
                }, "Something else here"))), isLoggedIn && React$1__default.createElement("li", {
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

            function styleInject(css, ref) {
              if ( ref === void 0 ) ref = {};
              var insertAt = ref.insertAt;

              if (!css || typeof document === 'undefined') { return; }

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

            var css = ".md-iphone-5 .md-body {\n  width: 100%;\n  height: 100%;\n  border-radius: 3.75em;\n  border-style: solid;\n  border-width: 0.375em;\n  position: relative;\n}\n\n.md-iphone-5 .md-screen {\n  position: relative;\n  margin: 0 auto;\n  background-color: #161616;\n  border-radius: 0.25em;\n  overflow: hidden;\n  box-shadow: 0 0 0px 3px #161616;\n}\n.md-iphone-5 .md-screen img {\n  width: 100%;\n}\n\n.md-iphone-5 .md-home-button {\n  display: block;\n  width: 3.625em;\n  height: 3.625em;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 100%;\n  border: none;\n  cursor: default;\n  font-size: 100%;\n}\n.md-iphone-5 .md-home-button:after {\n  content: \"\";\n  display: block;\n  width: 1.125em;\n  height: 1.125em;\n  margin: 0 auto;\n  position: relative;\n  border-style: solid;\n  border-width: 0.125em;\n  border-radius: 0.25em;\n}\n\n.md-iphone-5 .md-front-camera {\n  width: 0.875em;\n  height: 0.875em;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 100%;\n}\n.md-iphone-5 .md-front-camera:after {\n  content: \"\";\n  display: block;\n  width: 0.375em;\n  height: 0.375em;\n  position: relative;\n  top: 0.25em;\n  left: 0.25em;\n  background-color: #8c8091;\n  border-radius: 100%;\n}\n\n.md-iphone-5.md-glare:before {\n  content: \"\";\n  display: block;\n  width: 50%;\n  height: 83%;\n  position: absolute;\n  top: 0.625em;\n  right: 0.625em;\n  border-radius: 0 3.125em 0 0;\n  z-index: 1;\n}\n\n.md-iphone-5:after {\n  content: \"\";\n  display: block;\n  width: 3.3125em;\n  height: 0.1875em;\n  position: absolute;\n  right: 3.625em;\n  top: -0.1875em;\n  border-radius: 0.125em 0.125em 0 0;\n}\n\n.md-iphone-5 {\n  width: 22.8125em;\n  height: 49em;\n  position: relative;\n}\n.md-iphone-5 .md-front-camera {\n  top: 1.25em;\n}\n.md-iphone-5 .md-top-speaker {\n  width: 3.75em;\n  height: 0.875em;\n  margin: 0 auto;\n  position: relative;\n  top: 2.25em;\n  border-radius: 3.125em;\n}\n.md-iphone-5 .md-top-speaker:after {\n  content: \"\";\n  display: block;\n  width: 3.25em;\n  height: 0.375em;\n  margin: 0 auto;\n  position: relative;\n  top: 0.25em;\n  background-color: #4b414a;\n  border-radius: 3.125em;\n}\n.md-iphone-5 .md-screen {\n  width: 20em;\n  height: 35.5em;\n  top: 3.75em;\n}\n.md-iphone-5 .md-home-button {\n  bottom: -5.9375em;\n}\n.md-iphone-5 .md-buttons {\n  width: 0.1875em;\n  height: 1.875em;\n  position: absolute;\n  left: -0.5em;\n  top: 5.9375em;\n  border-radius: 0.125em 0 0 0.125em;\n}\n.md-iphone-5 .md-buttons:after, .md-iphone-5 .md-buttons:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 0.1875em;\n  height: 1.5625em;\n  border-radius: 0.125em 0 0 0.125em;\n}\n.md-iphone-5 .md-buttons:after {\n  top: 3.125em;\n}\n.md-iphone-5 .md-buttons:before {\n  top: 6.25em;\n}\n.md-iphone-5.md-glare:before {\n  background: -webkit-linear-gradient(16deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -moz-linear-gradient(16deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -o-linear-gradient(16deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: linear-gradient(74deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n}\n.md-iphone-5.md-landscape {\n  -webkit-transform: rotateZ(90deg);\n  -moz-transform: rotateZ(90deg);\n  -ms-transform: rotateZ(90deg);\n  -o-transform: rotateZ(90deg);\n  transform: rotateZ(90deg);\n}\n.md-iphone-5.md-landscape.md-glare:before {\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n  left: 0.625em;\n  top: 0.625em;\n}\n\n.md-white-device .md-front-camera, .md-white-device .md-top-speaker, .md-white-device .md-home-button {\n  background: -webkit-linear-gradient(#d0d0c5, #eeeeea);\n  background: -moz-linear-gradient(#d0d0c5, #eeeeea);\n  background: -o-linear-gradient(#d0d0c5, #eeeeea);\n  background: linear-gradient(#d0d0c5, #eeeeea);\n}\n\n.md-black-device .md-front-camera, .md-black-device .md-top-speaker, .md-black-device .md-home-button {\n  background: -webkit-linear-gradient(#141917, #202623);\n  background: -moz-linear-gradient(#141917, #202623);\n  background: -o-linear-gradient(#141917, #202623);\n  background: linear-gradient(#141917, #202623);\n}\n\n.md-white-device.md-landscape .md-home-button, .md-white-device.md-landscape .md-front-camera, .md-white-device.md-landscape .md-top-speaker {\n  background: -webkit-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: -moz-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: -o-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: linear-gradient(to right, #d0d0c5, #eeeeea);\n}\n\n.md-black-device.md-landscape .md-home-button, .md-black-device.md-landscape .md-front-camera, .md-black-device.md-landscape .md-top-speaker {\n  background: -webkit-linear-gradient(left, #141917, #202623);\n  background: -moz-linear-gradient(left, #141917, #202623);\n  background: -o-linear-gradient(left, #141917, #202623);\n  background: linear-gradient(to right, #141917, #202623);\n}\n\n.md-white-device .md-body {\n  background-color: #ebebe4;\n  border-color: #f1f2eb;\n}\n.md-white-device .md-buttons {\n  background-color: #ebebe4;\n}\n.md-white-device .md-buttons:after, .md-white-device .md-buttons:before {\n  background-color: #ebebe4;\n}\n.md-white-device .md-front-camera:after {\n  background-color: #8c8091;\n}\n.md-white-device .md-top-speaker:after {\n  background-color: #4b414a;\n}\n.md-white-device .md-home-button:after {\n  border-color: #eff1e6;\n}\n.md-white-device:after {\n  background: #ebebe4;\n}\n\n.md-black-device .md-body {\n  background-color: #1b211e;\n  border-color: #282e2b;\n}\n.md-black-device .md-buttons {\n  background-color: #1b211e;\n}\n.md-black-device .md-buttons:after, .md-black-device .md-buttons:before {\n  background-color: #1b211e;\n}\n.md-black-device .md-front-camera:after {\n  background-color: #2c292f;\n}\n.md-black-device .md-top-speaker:after {\n  background-color: #191616;\n}\n.md-black-device .md-home-button:after {\n  border-color: #444a45;\n}\n.md-black-device:after {\n  background: #1b211e;\n}\n";
            styleInject(css);

            var css$1 = ".md-imac {\n  width: 62.5em;\n  height: 50em;\n  -webkit-transform: translate3d(0, 0, 0);\n}\n.md-imac .md-body {\n  width: 100%;\n  height: 43.125em;\n  background: #c6c7ca;\n  border-radius: 1.875em;\n  overflow: hidden;\n}\n.md-imac .md-top {\n  width: 100%;\n  height: 37.1875em;\n  background: #0f0f0f;\n  border-radius: 1.875em 1.875em 0 0;\n  position: relative;\n}\n.md-imac .md-screen {\n  width: 57.5em;\n  height: 32.375em;\n  margin: 0 auto;\n  position: relative;\n  top: 2.375em;\n  background: #17171a;\n  overflow: hidden;\n}\n.md-imac .md-screen img {\n  width: 100%;\n}\n.md-imac .md-camera {\n  width: 0.375em;\n  height: 0.375em;\n  margin: 0 auto;\n  position: relative;\n  top: 1.25em;\n  background: #000;\n  border-radius: 100%;\n  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.25);\n}\n.md-imac .md-camera:after {\n  content: \"\";\n  display: block;\n  width: 0.125em;\n  height: 0.125em;\n  position: absolute;\n  left: 0.125em;\n  top: 0.0625em;\n  background: #353542;\n  border-radius: 100%;\n}\n.md-imac .md-base {\n  width: 19.25em;\n  height: 6.875em;\n  margin: -0.5em auto;\n}\n.md-imac .md-stand {\n  width: 13.125em;\n  height: 6.125em;\n  margin: 0 auto;\n  background: #cccdcf;\n  background: -webkit-linear-gradient(#b7b8bb, #cccdcf 50%, #d9dadb 80%, #cccdcf, #bfc0c3);\n  background: -moz-linear-gradient(#b7b8bb, #cccdcf 50%, #d9dadb 80%, #cccdcf, #bfc0c3);\n  background: -o-linear-gradient(#b7b8bb, #cccdcf 50%, #d9dadb 80%, #cccdcf, #bfc0c3);\n  background: linear-gradient(#b7b8bb, #cccdcf 50%, #d9dadb 80%, #cccdcf, #bfc0c3);\n  -webkit-transform: perspective(50em) rotate3d(1, 0, 0, 30deg);\n  -moz-transform: perspective(50em) rotate3d(1, 0, 0, 30deg);\n  -ms-transform: perspective(50em) rotate3d(1, 0, 0, 30deg);\n  -o-transform: perspective(50em) rotate3d(1, 0, 0, 30deg);\n  transform: perspective(50em) rotate3d(1, 0, 0, 30deg);\n}\n.md-imac .md-foot {\n  width: 15em;\n  height: 3.125em;\n  margin: 0 auto;\n  position: relative;\n  bottom: 1.5em;\n  border-radius: 0 0 0.625em 0.625em;\n  background: -webkit-linear-gradient(#bfc0c3 20%, #cccdcf);\n  background: -moz-linear-gradient(#bfc0c3 20%, #cccdcf);\n  background: -o-linear-gradient(#bfc0c3 20%, #cccdcf);\n  background: linear-gradient(#bfc0c3 20%, #cccdcf);\n  -webkit-transform: perspective(11.875em) rotate3d(1, 0, 0, 70deg);\n  -moz-transform: perspective(11.875em) rotate3d(1, 0, 0, 70deg);\n  -ms-transform: perspective(11.875em) rotate3d(1, 0, 0, 70deg);\n  -o-transform: perspective(11.875em) rotate3d(1, 0, 0, 70deg);\n  transform: perspective(11.875em) rotate3d(1, 0, 0, 70deg);\n  box-shadow: 0 0.375em 0 #bfc0c3;\n}\n.md-imac.md-glare .md-top:after {\n  content: \"\";\n  display: block;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-radius: 0 1.25em 0 0;\n  background: -webkit-linear-gradient(42deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -moz-linear-gradient(42deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -o-linear-gradient(42deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: linear-gradient(48deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n}\n";
            styleInject(css$1);

            var css$2 = ".md-ipad .md-body {\n  width: 100%;\n  height: 100%;\n  border-radius: 3.75em;\n  border-style: solid;\n  border-width: 0.375em;\n  position: relative;\n}\n\n.md-ipad .md-screen {\n  position: relative;\n  margin: 0 auto;\n  background-color: #161616;\n  border-radius: 0.25em;\n  overflow: hidden;\n  box-shadow: 0 0 0px 3px #161616;\n}\n.md-ipad .md-screen img {\n  width: 100%;\n}\n\n.md-ipad .md-home-button {\n  display: block;\n  width: 3.625em;\n  height: 3.625em;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 100%;\n  border: none;\n  cursor: default;\n  font-size: 100%;\n}\n.md-ipad .md-home-button:after {\n  content: \"\";\n  display: block;\n  width: 1.125em;\n  height: 1.125em;\n  margin: 0 auto;\n  position: relative;\n  border-style: solid;\n  border-width: 0.125em;\n  border-radius: 0.25em;\n}\n\n.md-ipad .md-front-camera {\n  width: 0.875em;\n  height: 0.875em;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 100%;\n}\n.md-ipad .md-front-camera:after {\n  content: \"\";\n  display: block;\n  width: 0.375em;\n  height: 0.375em;\n  position: relative;\n  top: 0.25em;\n  left: 0.25em;\n  background-color: #8c8091;\n  border-radius: 100%;\n}\n\n.md-ipad.md-glare:before {\n  content: \"\";\n  display: block;\n  width: 50%;\n  height: 83%;\n  position: absolute;\n  top: 0.625em;\n  right: 0.625em;\n  border-radius: 0 3.125em 0 0;\n  z-index: 1;\n}\n\n.md-ipad {\n  width: 53.375em;\n  height: 79.4375em;\n  position: relative;\n}\n.md-ipad .md-front-camera {\n  top: 3.125em;\n}\n.md-ipad .md-screen {\n  width: 48em;\n  height: 64em;\n  top: 6.25em;\n}\n.md-ipad .md-home-button {\n  bottom: -8.75em;\n}\n.md-ipad.md-glare:before {\n  background: -webkit-linear-gradient(22deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -moz-linear-gradient(22deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -o-linear-gradient(22deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: linear-gradient(68deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n}\n.md-ipad.md-landscape {\n  -webkit-transform: rotateZ(90deg);\n  -moz-transform: rotateZ(90deg);\n  -ms-transform: rotateZ(90deg);\n  -o-transform: rotateZ(90deg);\n  transform: rotateZ(90deg);\n}\n.md-ipad.md-landscape.md-glare:before {\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n  left: 0.625em;\n  top: 0.625em;\n}\n\n.md-white-device .md-front-camera, .md-white-device .md-top-speaker, .md-white-device .md-home-button {\n  background: -webkit-linear-gradient(#d0d0c5, #eeeeea);\n  background: -moz-linear-gradient(#d0d0c5, #eeeeea);\n  background: -o-linear-gradient(#d0d0c5, #eeeeea);\n  background: linear-gradient(#d0d0c5, #eeeeea);\n}\n\n.md-black-device .md-front-camera, .md-black-device .md-top-speaker, .md-black-device .md-home-button {\n  background: -webkit-linear-gradient(#141917, #202623);\n  background: -moz-linear-gradient(#141917, #202623);\n  background: -o-linear-gradient(#141917, #202623);\n  background: linear-gradient(#141917, #202623);\n}\n\n.md-white-device.md-landscape .md-home-button, .md-white-device.md-landscape .md-front-camera, .md-white-device.md-landscape .md-top-speaker {\n  background: -webkit-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: -moz-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: -o-linear-gradient(left, #d0d0c5, #eeeeea);\n  background: linear-gradient(to right, #d0d0c5, #eeeeea);\n}\n\n.md-black-device.md-landscape .md-home-button, .md-black-device.md-landscape .md-front-camera, .md-black-device.md-landscape .md-top-speaker {\n  background: -webkit-linear-gradient(left, #141917, #202623);\n  background: -moz-linear-gradient(left, #141917, #202623);\n  background: -o-linear-gradient(left, #141917, #202623);\n  background: linear-gradient(to right, #141917, #202623);\n}\n\n.md-white-device .md-body {\n  background-color: #ebebe4;\n  border-color: #f1f2eb;\n}\n.md-white-device .md-buttons {\n  background-color: #ebebe4;\n}\n.md-white-device .md-buttons:after, .md-white-device .md-buttons:before {\n  background-color: #ebebe4;\n}\n.md-white-device .md-front-camera:after {\n  background-color: #8c8091;\n}\n.md-white-device .md-top-speaker:after {\n  background-color: #4b414a;\n}\n.md-white-device .md-home-button:after {\n  border-color: #eff1e6;\n}\n.md-white-device:after {\n  background: #ebebe4;\n}\n\n.md-black-device .md-body {\n  background-color: #1b211e;\n  border-color: #282e2b;\n}\n.md-black-device .md-buttons {\n  background-color: #1b211e;\n}\n.md-black-device .md-buttons:after, .md-black-device .md-buttons:before {\n  background-color: #1b211e;\n}\n.md-black-device .md-front-camera:after {\n  background-color: #2c292f;\n}\n.md-black-device .md-top-speaker:after {\n  background-color: #191616;\n}\n.md-black-device .md-home-button:after {\n  border-color: #444a45;\n}\n.md-black-device:after {\n  background: #1b211e;\n}\n";
            styleInject(css$2);

            var css$3 = ".md-macbook-pro {\n  width: 55.3125em;\n  height: 31.875em;\n}\n.md-macbook-pro .md-lid {\n  width: 45em;\n  height: 30.625em;\n  margin: 0 auto;\n  position: relative;\n  border-radius: 1.875em;\n  border: solid 0.1875em #cdced1;\n  background: #131313;\n}\n.md-macbook-pro .md-camera {\n  width: 0.375em;\n  height: 0.375em;\n  margin: 0 auto;\n  position: relative;\n  top: 1.0625em;\n  background: #000;\n  border-radius: 100%;\n  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.25);\n}\n.md-macbook-pro .md-camera:after {\n  content: \"\";\n  display: block;\n  width: 0.125em;\n  height: 0.125em;\n  position: absolute;\n  left: 0.125em;\n  top: 0.0625em;\n  background: #353542;\n  border-radius: 100%;\n}\n.md-macbook-pro .md-screen {\n  width: 42.25em;\n  height: 26.375em;\n  margin: 0 auto;\n  position: relative;\n  top: 2.0625em;\n  background: #1d1d1d;\n  overflow: hidden;\n}\n.md-macbook-pro .md-screen img {\n  width: 100%;\n}\n.md-macbook-pro .md-base {\n  width: 100%;\n  height: 0.9375em;\n  position: relative;\n  top: -0.75em;\n  background: #c6c7ca;\n}\n.md-macbook-pro .md-base:after {\n  content: \"\";\n  display: block;\n  width: 100%;\n  height: 0.5em;\n  margin: 0 auto;\n  position: relative;\n  bottom: -0.1875em;\n  background: #b9babe;\n  border-radius: 0 0 1.25em 1.25em;\n}\n.md-macbook-pro .md-base:before {\n  content: \"\";\n  display: block;\n  width: 7.6875em;\n  height: 0.625em;\n  margin: 0 auto;\n  position: relative;\n  background: #a6a8ad;\n  border-radius: 0 0 0.625em 0.625em;\n}\n.md-macbook-pro.md-glare .md-lid:after {\n  content: \"\";\n  display: block;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-radius: 0 1.25em 0 0;\n  background: -webkit-linear-gradient(37deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -moz-linear-gradient(37deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: -o-linear-gradient(37deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n  background: linear-gradient(53deg, rgba(255, 255, 255, 0) 50%, rgba(247, 248, 240, 0.025) 50%, rgba(250, 245, 252, 0.08));\n}\n";
            styleInject(css$3);

            var DeviceContainer =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(DeviceContainer, _React$Component);

              function DeviceContainer() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, DeviceContainer);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeviceContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  selected: ""
                });

                _defineProperty(_assertThisInitialized(_this), "switchDevice", function (selected) {
                  _this.setState({
                    selected: selected
                  });
                });

                return _this;
              }

              _createClass(DeviceContainer, [{
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  var _this$state = this.state,
                      selected = _this$state.selected,
                      height = _this$state.height,
                      scale = _this$state.scale;
                  return React$1__default.createElement("div", null, React$1__default.createElement(DeviceSwitcher, {
                    switchDevice: this.switchDevice
                  }), React$1__default.createElement("div", null, children({
                    selected: selected,
                    height: height,
                    scale: scale
                  })));
                }
              }]);

              return DeviceContainer;
            }(React$1__default.Component);

            var DeviceSwitcher = function DeviceSwitcher(_ref) {
              var switchDevice = _ref.switchDevice,
                  selected = _ref.selected;
              var btnStyle = {
                margin: 2
              };
              return React$1__default.createElement("div", {
                style: {
                  zoom: "50%"
                }
              }, React$1__default.createElement("button", {
                style: btnStyle,
                type: "button",
                className: classnames('btn', {
                  'btn-outline-dark': selected !== "imac",
                  'btn-dark': selected === "imac"
                }),
                onClick: function onClick() {
                  return switchDevice('imac');
                }
              }, "imac"), React$1__default.createElement("button", {
                style: btnStyle,
                type: "button",
                className: classnames('btn', {
                  'btn-outline-dark': selected !== "ipad",
                  'btn-dark': selected === "ipad"
                }),
                onClick: function onClick() {
                  return switchDevice('ipad');
                }
              }, "ipad"), React$1__default.createElement("button", {
                style: btnStyle,
                type: "button",
                className: classnames('btn', {
                  'btn-outline-dark': selected !== "iphone",
                  'btn-dark': selected === "iphone"
                }),
                onClick: function onClick() {
                  return switchDevice('iphone');
                }
              }, "iphone"), React$1__default.createElement("button", {
                style: btnStyle,
                type: "button",
                className: classnames('btn', {
                  'btn-outline-dark': selected !== "macbook",
                  'btn-dark': selected === "macbook"
                }),
                onClick: function onClick() {
                  return switchDevice('macbook');
                }
              }, "macbook"), React$1__default.createElement("button", {
                style: btnStyle,
                type: "button",
                className: classnames('btn', {
                  'btn-outline-dark': selected !== "macbook",
                  'btn-dark': selected === "default"
                }),
                onClick: function onClick() {
                  return switchDevice('default');
                }
              }, "default"));
            };

            var DevicesView = function DevicesView(_ref2) {
              var deviceType = _ref2.deviceType,
                  children = _ref2.children,
                  user = _ref2.user;

              switch (deviceType) {
                case "imac":
                  return React$1__default.createElement("div", {
                    style: {
                      padding: 3
                    }
                  }, React$1__default.createElement("div", {
                    style: {
                      textAlign: "center"
                    }
                  }, user), React$1__default.createElement(IMacView, null, children));

                case "ipad":
                  return React$1__default.createElement("div", {
                    style: {
                      padding: 3
                    }
                  }, React$1__default.createElement("div", {
                    style: {
                      textAlign: "center"
                    }
                  }, user), React$1__default.createElement(IPadView, null, children));

                case "iphone":
                  return React$1__default.createElement("div", {
                    style: {
                      padding: 3
                    }
                  }, React$1__default.createElement("div", {
                    style: {
                      textAlign: "center"
                    }
                  }, user), React$1__default.createElement(IPhoneView, null, children));

                case "macbook":
                  return React$1__default.createElement("div", {
                    style: {
                      padding: 3
                    }
                  }, React$1__default.createElement("div", {
                    style: {
                      textAlign: "center"
                    }
                  }, user), React$1__default.createElement(MacBookView, null, children));

                case "default":
                  return React$1__default.createElement(DefaultView, {
                    user: user
                  }, children);

                default:
                  return React$1__default.createElement(DefaultView, {
                    user: user
                  }, children);
              }
            };

            var IMacView = function IMacView(_ref3) {
              var children = _ref3.children;
              return React$1__default.createElement("div", {
                className: "md-imac"
              }, React$1__default.createElement("div", {
                className: "md-body"
              }, React$1__default.createElement("div", {
                className: "md-top"
              }, React$1__default.createElement("div", {
                className: "md-camera"
              }), React$1__default.createElement("div", {
                className: "md-screen"
              }, children))), React$1__default.createElement("div", {
                className: "md-base"
              }, React$1__default.createElement("div", {
                className: "md-stand"
              }), React$1__default.createElement("div", {
                className: "md-foot"
              })));
            };

            var IPadView = function IPadView(_ref4) {
              var children = _ref4.children;
              return React$1__default.createElement("div", {
                className: "md-ipad  md-white-device"
              }, React$1__default.createElement("div", {
                className: "md-body"
              }, React$1__default.createElement("div", {
                className: "md-front-camera"
              }), React$1__default.createElement("div", {
                className: "md-screen"
              }, children), React$1__default.createElement("button", {
                className: "md-home-button"
              })));
            };

            var IPhoneView = function IPhoneView(_ref5) {
              var children = _ref5.children;
              return React$1__default.createElement("div", {
                className: "md-iphone-5 md-white-device"
              }, React$1__default.createElement("div", {
                className: "md-body"
              }, React$1__default.createElement("div", {
                className: "md-buttons"
              }), React$1__default.createElement("div", {
                className: "md-front-camera"
              }), React$1__default.createElement("div", {
                className: "md-top-speaker"
              }), React$1__default.createElement("div", {
                className: "md-screen"
              }, children), React$1__default.createElement("button", {
                className: "md-home-button"
              })));
            };

            var MacBookView = function MacBookView(_ref6) {
              var children = _ref6.children;
              return React$1__default.createElement("div", {
                className: "md-macbook-pro"
              }, React$1__default.createElement("div", {
                className: "md-lid"
              }, React$1__default.createElement("div", {
                className: "md-camera"
              }), React$1__default.createElement("div", {
                className: "md-screen"
              }, children)), React$1__default.createElement("div", {
                className: "md-base"
              }));
            };

            var DefaultView = function DefaultView(_ref7) {
              var children = _ref7.children,
                  user = _ref7.user;
              return React$1__default.createElement("div", {
                style: {
                  height: "50vh",
                  width: "30%",
                  margin: 10
                }
              }, React$1__default.createElement("div", null, user), children);
            };

            React.createElement("h4", {
              style: {
                textAlign: "center",
                margin: 10
              }
            }, "Messaging Module (with SocketIO)");
            var firstUser$1 = lib$1("http://localhost:3000/", {
              query: "name=mario@gmail.com"
            });
            var secondUser$1 = lib$1("http://localhost:3000/", {
              query: "name=dragos@gmail.com"
            });

            var SocketMessagingDemo =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(SocketMessagingDemo, _React$Component);

              function SocketMessagingDemo() {
                _classCallCheck(this, SocketMessagingDemo);

                return _possibleConstructorReturn(this, _getPrototypeOf(SocketMessagingDemo).apply(this, arguments));
              }

              _createClass(SocketMessagingDemo, [{
                key: "render",
                value: function render() {
                  return React.createElement(DeviceContainer, null, function (_ref) {
                    var selected = _ref.selected;
                    return React.createElement("div", null, React.createElement("div", {
                      style: {
                        textAlign: "center",
                        margin: 10
                      }
                    }, " ", React.createElement("h6", {
                      style: {
                        backgroundColor: "#ffecb3"
                      }
                    }, "SocketIO Messaging Module."), "Developed by using ReactJS,MondoDB,Expressjs,SocketIO"), React.createElement("div", {
                      style: {
                        display: "flex",
                        justifyContent: "center",
                        zoom: "0.3"
                      }
                    }, React.createElement(DevicesView, {
                      deviceType: selected,
                      user: "mario@gmail.com"
                    }, React.createElement(MessagingModule, {
                      socket: firstUser$1,
                      name: "mario@gmail.com",
                      targetName: "dragos@gmail.com"
                    })), React.createElement(DevicesView, {
                      deviceType: selected,
                      user: "dragos@gmail.com"
                    }, React.createElement(MessagingModule, {
                      socket: secondUser$1,
                      name: "dragos@gmail.com",
                      targetName: "mario@gmail.com"
                    }))));
                  });
                }
              }]);

              return SocketMessagingDemo;
            }(React.Component);
            /*
            <h6 style={{ textAlign: "center", margin: 10 }}>Developed by using ReactJS,MondoDB,Expressjs,SocketIO</h6>import React from 'react'

            */

            var closeCall = function closeCall(_ref) {
              var self = _ref.self;

              if (self.rtcPeerConnection) {
                self.rtcPeerConnection.ontrack = null;
                self.rtcPeerConnection.onremovetrack = null;
                self.rtcPeerConnection.onremovestream = null;
                self.rtcPeerConnection.onicecandidate = null;
                self.rtcPeerConnection.oniceconnectionstatechange = null;
                self.rtcPeerConnection.onsignalingstatechange = null;
                self.rtcPeerConnection.onicegatheringstatechange = null;
                self.rtcPeerConnection.onnegotiationneeded = null;
                self.rtcPeerConnection.onconnectionstatechange = null;
                self.rtcPeerConnection.ondatachannel = null;
                self.rtcPeerConnection.close();
                self.rtcPeerConnection = null;
              }
            };

            var servers = {
              iceServers: [{
                urls: 'stun:stun.services.mozilla.com'
              }, {
                urls: 'stun:stun.l.google.com:19302'
              }]
            };

            var createAnswer = function createAnswer(_ref) {
              var offer = _ref.offer,
                  self = _ref.self,
                  sendAnswer = _ref.sendAnswer;

              if (self.rtcPeerConnection === null) {
                self.rtcPeerConnection = new RTCPeerConnection(servers);
              }

              self.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(function () {
                return self.rtcPeerConnection.createAnswer();
              }).then(function (answer) {
                // console.log("answer...",answer)
                self.rtcPeerConnection.setLocalDescription(answer);
                sendAnswer({
                  answer: answer
                });
              })["catch"](function (error) {
                self.setState(function (prevState) {
                  return {
                    errors: [].concat(_toConsumableArray(prevState.errors), [error])
                  };
                });
              });
            };

            var createOffer = function createOffer(_ref) {
              var self = _ref.self,
                  sendOffer = _ref.sendOffer;

              if (self.rtcPeerConnection === null) {
                self.rtcPeerConnection = new RTCPeerConnection(servers);
              }

              self.rtcPeerConnection.createOffer().then(function (offer) {
                self.rtcPeerConnection.setLocalDescription(offer);
                sendOffer({
                  offer: offer
                });
              })["catch"](function (error) {
                self.setState(function (prevState) {
                  return {
                    errors: [].concat(_toConsumableArray(prevState.errors), [error])
                  };
                });
              });
            };

            var compWillUpdate = function compWillUpdate(_ref) {
              var self = _ref.self,
                  nextProps = _ref.nextProps,
                  _ref$answer = _ref.answer,
                  answer = _ref$answer === void 0 ? null : _ref$answer,
                  _ref$offer = _ref.offer,
                  offer = _ref$offer === void 0 ? null : _ref$offer,
                  _ref$sendAnswer = _ref.sendAnswer,
                  sendAnswer = _ref$sendAnswer === void 0 ? null : _ref$sendAnswer,
                  _ref$autoAnswer = _ref.autoAnswer,
                  autoAnswer = _ref$autoAnswer === void 0 ? false : _ref$autoAnswer;

              if (self.rtcPeerConnection !== undefined && self.rtcPeerConnection !== null) {
                if (nextProps.closeConnection) {
                  closeCall({
                    self: self
                  });
                }

                if (nextProps.answer !== undefined && nextProps.answer !== null && answer === null) {
                  self.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(nextProps.answer));
                }

                if (nextProps.offer !== undefined && nextProps.offer !== null && offer === null && autoAnswer) {
                  var _offer = nextProps.offer;
                  createAnswer({
                    offer: _offer,
                    self: self,
                    sendAnswer: sendAnswer
                  });
                }

                if (self.rtcPeerConnection !== undefined && self.rtcPeerConnection.remoteDescription !== null) {
                  if (nextProps.candidate !== undefined && nextProps.candidate !== null) {
                    self.rtcPeerConnection.addIceCandidate(new RTCIceCandidate(nextProps.candidate));
                  }
                }
              }
            };

            var useDataChannel = function useDataChannel(_ref) {
              var self = _ref.self,
                  onMessage = _ref.onMessage,
                  sendCandidate = _ref.sendCandidate;
              self.rtcPeerConnection = new RTCPeerConnection();
              self.dataChannel = self.rtcPeerConnection.createDataChannel("channel1", {
                reliable: true
              });
              console.log("self.dataChannel", self.dataChannel);

              self.rtcPeerConnection.ondatachannel = function (event) {
                console.log("recived datachannel......");
                var receiveChannel = event.channel;

                receiveChannel.onmessage = function (event) {
                  // console.log("Got Data Channel Message:", typeof( event.data));
                  try {
                    onMessage(event);
                  } catch (error) {
                    console.log("OnMessage error--", error);
                  }
                };

                receiveChannel.onerror = function (error) {
                  self.setState(function (prevState) {
                    return {
                      errors: [].concat(_toConsumableArray(prevState.errors), [error])
                    };
                  });
                };

                receiveChannel.onclose = function () {
                  console.log("data channel is closed"); //  self.setState({ closeConnection: true })
                };

                receiveChannel.onopen = function () {
                  console.log("data channel is one");
                }; //when we receive a message from the other peer, display it on the screen 

              };

              self.rtcPeerConnection.onsignalingstatechange = function () {
                console.log("signalingStateMMMMMMMMMMMM", self.rtcPeerConnection.signalingState, self.props.name);
                self.setState({
                  signalingState: self.rtcPeerConnection.signalingState
                });
              };

              self.rtcPeerConnection.onicecandidate = function (e) {
                console.log("iceCandidate", e);

                if (e.candidate !== null) {
                  var candidate = e.candidate;
                  sendCandidate({
                    candidate: candidate
                  });
                }
              };

              self.rtcPeerConnection.onconnectionstatechange = function () {
                console.log("connectionStateLLLLLLLLLLLLL", self.rtcPeerConnection.connectionState, self.props.name);
                self.setState({
                  connectionState: self.rtcPeerConnection.connectionState
                });
              };
            };

            var useMediaStream = function useMediaStream(_ref) {
              var self = _ref.self,
                  _ref$mediaConfig = _ref.mediaConfig,
                  mediaConfig = _ref$mediaConfig === void 0 ? {
                video: true,
                audio: false
              } : _ref$mediaConfig,
                  sendCandidate = _ref.sendCandidate,
                  _ref$mediaStream = _ref.mediaStream,
                  mediaStream = _ref$mediaStream === void 0 ? null : _ref$mediaStream;
              self.rtcPeerConnection = new RTCPeerConnection(servers);

              var gotLocalMediaStream = function gotLocalMediaStream(localMediaStream) {
                self.setState({
                  localMediaStream: localMediaStream
                });
                localMediaStream.getVideoTracks().forEach(function (t) {
                  return self.rtcPeerConnection.addTrack(t, localMediaStream);
                });
              };

              var handleLocalMediaStreamError = function handleLocalMediaStreamError(error) {
                self.setState(function (prevState) {
                  return {
                    errors: [].concat(_toConsumableArray(prevState.errors), [error])
                  };
                });
              };

              if (mediaStream === null) {
                navigator.mediaDevices.getUserMedia(mediaConfig).then(gotLocalMediaStream)["catch"](handleLocalMediaStreamError);
              } else {
                mediaStream.getVideoTracks().forEach(function (t) {
                  return self.rtcPeerConnection.addTrack(t, mediaStream);
                });
                self.setState({
                  localMediaStream: mediaStream
                });
              }

              self.rtcPeerConnection.onicecandidate = function (e) {
                if (e.candidate !== null) {
                  var candidate = e.candidate;
                  sendCandidate({
                    candidate: candidate
                  });
                }
              };

              self.rtcPeerConnection.onconnectionstatechange = function () {
                console.log("connectionState.....", self.rtcPeerConnection.connectionState);
                self.setState({
                  connectionState: self.rtcPeerConnection.connectionState
                });
              };

              self.rtcPeerConnection.onsignalingstatechange = function () {
                self.setState({
                  signalingState: self.rtcPeerConnection.signalingState
                });
              };

              self.rtcPeerConnection.ontrack = function (e) {
                self.setState({
                  remoteMediaStream: e.streams[0]
                });
              };
            };

            var destroyRTC = function destroyRTC(_ref) {
              var self = _ref.self;

              if (self.rtcPeerConnection) {
                self.rtcPeerConnection.ontrack = null;
                self.rtcPeerConnection.onremovetrack = null;
                self.rtcPeerConnection.onremovestream = null;
                self.rtcPeerConnection.onicecandidate = null;
                self.rtcPeerConnection.oniceconnectionstatechange = null;
                self.rtcPeerConnection.onsignalingstatechange = null;
                self.rtcPeerConnection.onconnectionstatechange = null;
                self.rtcPeerConnection.onicegatheringstatechange = null;
                self.rtcPeerConnection.onnegotiationneeded = null;
                self.rtcPeerConnection = null;
              }
            };

            var initialState$1 = {
              connectionState: "",
              signalingState: "",
              errors: [],
              remoteMediaStream: null,
              localMediaStream: null
            };

            var sendString = function sendString(_ref) {
              var self = _ref.self,
                  message = _ref.message;
              console.log("3.Forwarding initial file...", message);
              self.dataChannel.send(JSON.stringify({
                message: message
              }));
            };

            var sendArrayBuffer = function sendArrayBuffer(_ref2) {
              var self = _ref2.self,
                  message = _ref2.message;
              self.dataChannel.binaryType = 'arraybuffer'; //  if(self.dataChannel)

              if (self.dataChannel.readyState === "open") {
                //11  console.log("sending arraybufer",message)
                try {
                  self.dataChannel.send(message);
                } catch (error) {
                  console.log("error----", error);
                }
              }
            };

            var MessagingControllerWebRTC =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(MessagingControllerWebRTC, _React$Component);

              function MessagingControllerWebRTC() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, MessagingControllerWebRTC);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MessagingControllerWebRTC)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", _objectSpread2({}, initialState$1));

                _defineProperty(_assertThisInitialized(_this), "sendMessage", function () {
                  var _this$props = _this.props,
                      name = _this$props.name,
                      targetName = _this$props.targetName;
                  var message = _this.props.message;
                  var readyState = _this.dataChannel.readyState;

                  if (readyState === "open") {
                    _this.dataChannel.send(JSON.stringify({
                      name: name,
                      targetName: targetName,
                      message: message,
                      datetime: new Date().getTime()
                    }));

                    _this.props.saveLocalMessage({
                      key: name,
                      to: targetName
                    });
                  }
                });

                return _this;
              }

              _createClass(MessagingControllerWebRTC, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this2 = this;

                  var _this$props2 = this.props,
                      name = _this$props2.name,
                      _this$props2$initiato = _this$props2.initiator,
                      initiator = _this$props2$initiato === void 0 ? false : _this$props2$initiato,
                      sendCandidate = _this$props2.sendCandidate,
                      sendOffer = _this$props2.sendOffer;
                  this.props.loadFromStorage({
                    key: name
                  });
                  useDataChannel({
                    self: this,
                    onMessage: function onMessage(e) {
                      var _JSON$parse = JSON.parse(e.data),
                          message = _JSON$parse.message,
                          datetime = _JSON$parse.datetime,
                          name = _JSON$parse.name;

                      _this2.props.saveRemoteMessage({
                        from: name,
                        message: message,
                        datetime: datetime,
                        key: _this2.props.name,
                        to: _this2.props.name
                      });
                    },
                    sendCandidate: sendCandidate
                  });

                  if (initiator) {
                    createOffer({
                      self: this,
                      sendOffer: sendOffer
                    });
                  }
                } //

              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate(nextProps) {
                  compWillUpdate(_objectSpread2({
                    self: this,
                    nextProps: nextProps
                  }, this.props, {
                    autoAnswer: true
                  }));
                } // END OF COMPONENT DID UPDATE

              }, {
                key: "render",
                value: function render() {
                  var _this$props3 = this.props,
                      children = _this$props3.children,
                      messages = _this$props3.messages,
                      message = _this$props3.message;
                  return children(_objectSpread2({}, this.state, {
                    messages: messages,
                    message: message,
                    sendMessage: this.sendMessage,
                    onTextChange: this.props.onTextChange
                  }));
                }
              }]);

              return MessagingControllerWebRTC;
            }(React$1__default.Component);

            var MessagingControllerWebRTC$1 = withChatLog(MessagingControllerWebRTC);

            var WebRTCSignaling =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(WebRTCSignaling, _React$Component);

              function WebRTCSignaling(props) {
                var _this;

                _classCallCheck(this, WebRTCSignaling);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(WebRTCSignaling).call(this, props));

                _defineProperty(_assertThisInitialized(_this), "sendCandidate", function (_ref) {
                  var candidate = _ref.candidate;
                  var _this$props = _this.props,
                      name = _this$props.name,
                      targetName = _this$props.targetName;

                  _this.socket.emit("candidate", {
                    name: name,
                    targetName: targetName,
                    candidate: candidate
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "sendClose", function () {
                  console.log("send close clicked");
                  var _this$props2 = _this.props,
                      name = _this$props2.name,
                      targetName = _this$props2.targetName;

                  _this.socket.emit("close", {
                    name: name,
                    targetName: targetName
                  });

                  _this.setState({
                    closeConnection: true,
                    offer: null,
                    answer: null,
                    candidate: null,
                    connected: false
                  });

                  _this.props.resetWebRTCConrtoller();
                });

                _defineProperty(_assertThisInitialized(_this), "sendOffer", function (_ref2) {
                  var offer = _ref2.offer;
                  var _this$props3 = _this.props,
                      name = _this$props3.name,
                      targetName = _this$props3.targetName;

                  _this.socket.emit("offer", {
                    name: name,
                    targetName: targetName,
                    offer: offer
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "sendAnswer", function (_ref3) {
                  var answer = _ref3.answer;
                  var _this$props4 = _this.props,
                      name = _this$props4.name,
                      targetName = _this$props4.targetName;

                  _this.socket.emit("answer", {
                    name: name,
                    targetName: targetName,
                    answer: answer
                  });
                });

                _this.state = {
                  offer: null,
                  answer: null,
                  connected: false,
                  candidate: null,
                  error: null,
                  closeConnection: false
                };
                return _this;
              }

              _createClass(WebRTCSignaling, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this2 = this;

                  var _this$props5 = this.props,
                      name = _this$props5.name,
                      serverUrl = _this$props5.serverUrl;

                  if (serverUrl !== undefined) {
                    this.socket = lib$1(serverUrl, {
                      query: "name=".concat(name)
                    });
                  } else {
                    this.socket = lib$1();
                  }

                  this.socket.on("offer", function (message) {
                    _this2.setState({
                      offer: message.offer
                    });
                  });
                  this.socket.on("answer", function (message) {
                    _this2.setState({
                      answer: message.answer
                    });
                  });
                  this.socket.on("candidate", function (message) {
                    _this2.setState({
                      candidate: message.candidate
                    });
                  });
                  this.socket.on("connect", function () {
                    _this2.setState({
                      connected: true
                    });
                  });
                  this.socket.on("close", function () {
                    _this2.setState({
                      closeConnection: true,
                      offer: null,
                      answer: null,
                      candidate: null
                    });

                    _this2.props.resetWebRTCConrtoller();
                  });
                } // end of componentDidMount/

              }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  this.socket = null;
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;

                  var signalingContext = _objectSpread2({}, this.state, {
                    sendOffer: this.sendOffer,
                    sendAnswer: this.sendAnswer,
                    sendClose: this.sendClose,
                    sendCandidate: this.sendCandidate
                  });

                  return children(signalingContext);
                }
              }]);

              return WebRTCSignaling;
            }(React$1__default.Component);

            var guidGenerator = (function () {
              var S4 = function S4() {
                // eslint-disable-next-line no-bitwise
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
              };

              return "".concat(S4() + S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4()).concat(S4()).concat(S4());
            });

            var UserIDGenerator =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(UserIDGenerator, _React$Component);

              function UserIDGenerator(props) {
                var _this;

                _classCallCheck(this, UserIDGenerator);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(UserIDGenerator).call(this, props));
                _this.state = {
                  clientOne: '',
                  clientTwo: ''
                };
                return _this;
              }

              _createClass(UserIDGenerator, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  this.setState({
                    clientOne: guidGenerator(),
                    clientTwo: guidGenerator()
                  });
                }
              }, {
                key: "render",
                value: function render() {
                  var _this$state = this.state,
                      clientOne = _this$state.clientOne,
                      clientTwo = _this$state.clientTwo;
                  var children = this.props.children;
                  return React$1__default.createElement("div", null, children({
                    clientOne: clientOne,
                    clientTwo: clientTwo
                  }));
                }
              }]);

              return UserIDGenerator;
            }(React$1__default.Component);
            UserIDGenerator.propTypes = {
              children: PropTypes.func.isRequired
            };

            // SignalingService 2

            var ConnectionState = function ConnectionState(_ref) {
              var signalingState = _ref.signalingState;

              if (signalingState === "stable") {
                return React$1__default.createElement("div", {
                  style: {
                    color: "white",
                    backgroundColor: "#81c784"
                  }
                }, "connected");
              } else {
                return React$1__default.createElement("div", {
                  style: {
                    color: "white",
                    backgroundColor: "red"
                  }
                }, "not connected");
              }
            };

            var MessagingModuleWebRTC = function MessagingModuleWebRTC(_ref2) {
              var initiator = _ref2.initiator,
                  name = _ref2.name,
                  targetName = _ref2.targetName,
                  serverUrl = _ref2.serverUrl;
              return React$1__default.createElement(WebRTCSignaling, {
                serverUrl: serverUrl,
                name: name,
                targetName: targetName
              }, function (_ref3) {
                var sendOffer = _ref3.sendOffer,
                    sendAnswer = _ref3.sendAnswer,
                    sendCandidate = _ref3.sendCandidate,
                    offer = _ref3.offer,
                    answer = _ref3.answer,
                    candidate = _ref3.candidate;
                return React$1__default.createElement(MessagingControllerWebRTC$1, {
                  initiator: initiator,
                  name: name,
                  targetName: targetName,
                  offer: offer,
                  answer: answer,
                  candidate: candidate,
                  sendOffer: sendOffer,
                  sendAnswer: sendAnswer,
                  sendCandidate: sendCandidate
                }, function (_ref4) {
                  var message = _ref4.message,
                      messages = _ref4.messages,
                      sendMessage = _ref4.sendMessage,
                      onTextChange = _ref4.onTextChange,
                      connectionState = _ref4.connectionState,
                      signalingState = _ref4.signalingState;
                  return React$1__default.createElement("div", {
                    style: {
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column"
                    }
                  }, React$1__default.createElement(ConnectionState, {
                    signalingState: signalingState
                  }), React$1__default.createElement(MessageDisplayer, {
                    messages: messages
                  }), React$1__default.createElement(MessageEditorDisplayer, {
                    disabled: signalingState !== "stable",
                    message: message,
                    sendMesage: sendMessage,
                    onTextChange: onTextChange
                  }));
                });
              });
            };

            var WebRTCMessagingDemo = function WebRTCMessagingDemo() {
              return React$1__default.createElement(DeviceContainer, null, function (_ref) {
                var selected = _ref.selected;
                return React$1__default.createElement("div", null, React$1__default.createElement("div", {
                  style: {
                    textAlign: "center",
                    margin: 10
                  }
                }, " ", React$1__default.createElement("h6", {
                  style: {
                    backgroundColor: "#b2dfdb"
                  }
                }, "WebRTC Messaging Module."), "Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service"), React$1__default.createElement("div", {
                  style: {
                    display: "flex",
                    justifyContent: "center"
                  }
                }, React$1__default.createElement(DevicesView, {
                  deviceType: selected,
                  user: "mario@gmail.com"
                }, React$1__default.createElement(MessagingModuleWebRTC, {
                  initiator: true,
                  serverUrl: "http://localhost:3000/",
                  name: "mario@gmail.com",
                  targetName: "dragos@gmail.com"
                })), React$1__default.createElement(DevicesView, {
                  deviceType: selected,
                  user: "dragos@gmail.com"
                }, React$1__default.createElement(MessagingModuleWebRTC, {
                  serverUrl: "http://localhost:3000/",
                  name: "dragos@gmail.com",
                  targetName: "mario@gmail.com"
                }))));
              });
            };

            var WebRTCVideoChatController =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(WebRTCVideoChatController, _React$Component);

              function WebRTCVideoChatController() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, WebRTCVideoChatController);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WebRTCVideoChatController)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", _objectSpread2({}, initialState$1));

                _defineProperty(_assertThisInitialized(_this), "createOffer", function () {
                  var sendOffer = _this.props.sendOffer;
                  createOffer({
                    self: _assertThisInitialized(_this),
                    sendOffer: sendOffer
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "closeCall", function () {
                  _this.props.sendClose();
                });

                _defineProperty(_assertThisInitialized(_this), "createAnswer", function () {
                  var _this$props = _this.props,
                      offer = _this$props.offer,
                      sendAnswer = _this$props.sendAnswer;
                  createAnswer({
                    offer: offer,
                    self: _assertThisInitialized(_this),
                    sendAnswer: sendAnswer
                  });
                });

                return _this;
              }

              _createClass(WebRTCVideoChatController, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var sendCandidate = this.props.sendCandidate;
                  useMediaStream({
                    self: this,
                    sendCandidate: sendCandidate,
                    mediaStream: this.props.localMediaStream
                  });
                } // End of componentDidMount

              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate(nextProps) {
                  compWillUpdate(_objectSpread2({
                    self: this,
                    nextProps: nextProps
                  }, this.props));
                } // END OF COMPONENT DID UPDATE

              }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  destroyRTC({
                    self: this
                  });
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  if (children) return children(_objectSpread2({}, this.state, {}, this.props, {
                    rtcPeerConnection: this.rtcPeerConnection,
                    createOffer: this.createOffer,
                    createAnswer: this.createAnswer,
                    closeCall: this.closeCall
                  }));
                  return React$1__default.createElement("div", {
                    "data-testid": "rtc"
                  }, "Loading...");
                }
              }]);

              return WebRTCVideoChatController;
            }(React$1__default.Component);

            var style$2 = {
              backgroundColor: "yellow",
              //"#eeeeee",
              position: "absolute",
              height: "auto",
              top: 25,
              right: 5,
              width: 100,
              padding: 0,
              margin: 0,
              zIndex: 50
            };

            var LocalVideo =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(LocalVideo, _React$Component);

              function LocalVideo(props) {
                var _this;

                _classCallCheck(this, LocalVideo);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalVideo).call(this, props));
                _this.videoRef = React$1__default.createRef();
                return _this;
              }

              _createClass(LocalVideo, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var localMediaStream = this.props.localMediaStream;
                  this.videoRef.current.srcObject = localMediaStream;
                }
              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate(newProps) {
                  if (newProps.close) {
                    this.videoRef.current.srcObject.getTracks().forEach(function (track) {
                      return track.stop();
                    });
                    this.videoRef.current.removeAttribute("srcObject");
                  }
                }
              }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate() {
                  var localMediaStream = this.props.localMediaStream;
                  this.videoRef.current.srcObject = localMediaStream;
                }
              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate(newProps) {
                  if (newProps.closeConnection) ;
                }
              }, {
                key: "render",
                value: function render() {
                  return React$1__default.createElement("video", {
                    style: style$2,
                    ref: this.videoRef,
                    autoPlay: true,
                    playsInline: true
                  });
                }
              }]);

              return LocalVideo;
            }(React$1__default.Component);

            var RemoteVideo =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(RemoteVideo, _React$Component);

              function RemoteVideo(props) {
                var _this;

                _classCallCheck(this, RemoteVideo);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(RemoteVideo).call(this, props));
                _this.remoteVideoRef = React$1__default.createRef();
                return _this;
              }

              _createClass(RemoteVideo, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var remoteMediaStream = this.props.remoteMediaStream;
                  this.remoteVideoRef.current.srcObject = remoteMediaStream;
                }
              }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate() {
                  var remoteMediaStream = this.props.remoteMediaStream;
                  this.remoteVideoRef.current.srcObject = remoteMediaStream;
                }
              }, {
                key: "render",
                value: function render() {
                  return React$1__default.createElement("div", {
                    style: {
                      height: "100%",
                      width: "25vh",
                      display: "flex",
                      justifyContent: "center",
                      aligntItems: "center",
                      position: "relative",
                      backgroundColor: "green"
                    }
                  }, React$1__default.createElement("video", {
                    style: {
                      height: 'auto',
                      width: '25vh',
                      flex: 1,
                      //  backgroundColor: 'brown',
                      padding: 0,
                      margin: 0,
                      position: "ansolute"
                    },
                    ref: this.remoteVideoRef,
                    autoPlay: true,
                    playsInline: true
                  }));
                }
              }]);

              return RemoteVideo;
            }(React$1__default.Component);

            var AsyncButton$1 = function AsyncButton(_ref) {
              var title = _ref.title,
                  _ref$loading = _ref.loading,
                  onClick = _ref.onClick,
                  disabled = _ref.disabled;
              return React.createElement("div", {
                style: {
                  position: "relative"
                }
              }, React.createElement(ProgressLoader$1, null));
            };

            var ProgressCircle$1 = function ProgressCircle(_ref2) {
              var selected = _ref2.selected;
              return React.createElement("div", {
                style: {
                  height: 10,
                  width: 10,
                  padding: 3,
                  borderRadius: 50,
                  margin: 6,
                  textAlign: "center",
                  backgroundColor: selected ? "#2e7d32" : "#9fa8da"
                }
              });
            };

            var ProgressLoader$1 =
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
                        selected: 3
                      });
                    } else if (_this2.state.selected === 3) {
                      _this2.setState({
                        selected: 4
                      });
                    } else if (_this2.state.selected === 4) {
                      _this2.setState({
                        selected: 0
                      });
                    }
                  }, 400);
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
                      width: "100%"
                    }
                  }, React.createElement(ProgressCircle$1, {
                    selected: selected === 4
                  }), React.createElement(ProgressCircle$1, {
                    selected: selected === 3
                  }), React.createElement(ProgressCircle$1, {
                    selected: selected === 2
                  }), React.createElement(ProgressCircle$1, {
                    selected: selected === 1
                  }), React.createElement(ProgressCircle$1, {
                    selected: selected === 0
                  }));
                }
              }]);

              return ProgressLoader;
            }(React.Component);

            var style$4 = {
              backgroundColor: "yellow",
              //"#eeeeee",
              overflow: "auto",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            };

            var Calling = function Calling(_ref) {
              var signalingState = _ref.signalingState,
                  offer = _ref.offer;
              return React$1__default.createElement("div", {
                style: style$4
              }, React$1__default.createElement("div", null, React$1__default.createElement("div", {
                style: {
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  backgroundColor: "#9e9e9e"
                }
              }), React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10
                }
              }, (signalingState === "have-local-offer" || offer !== null) && React$1__default.createElement(AsyncButton$1, null))));
            };

            var mediaStreamConstraints = {
              video: true
            };

            var LocalMediaStream =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(LocalMediaStream, _React$Component);

              function LocalMediaStream() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, LocalMediaStream);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LocalMediaStream)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  localMediaStream: null
                });

                _defineProperty(_assertThisInitialized(_this), "gotLocalMediaStream", function (mediaStream) {
                  _this.setState({
                    localMediaStream: mediaStream
                  }); //  this.localVideoRef.current.srcObject = mediaStream;

                });

                return _this;
              }

              _createClass(LocalMediaStream, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(this.gotLocalMediaStream)["catch"](this.handleLocalMediaStreamError);
                }
              }, {
                key: "componentWillMount",
                value: function componentWillMount() {
                  this.setState({
                    localMediaStream: null
                  });
                }
              }, {
                key: "render",
                value: function render() {
                  var localMediaStream = this.state.localMediaStream;
                  var children = this.props.children;

                  if (localMediaStream !== null) {
                    return children({
                      localMediaStream: localMediaStream
                    });
                  }

                  return null;
                }
              }]);

              return LocalMediaStream;
            }(React$1__default.Component);

            var ConnectionState$1 = function ConnectionState(_ref) {
              var signalingState = _ref.signalingState,
                  offer = _ref.offer;

              if (signalingState === "stable") {
                return React$1__default.createElement("div", {
                  style: {
                    color: "white",
                    backgroundColor: "#81c784"
                  }
                }, "connected");
              }

              if (signalingState === "have-local-offer") {
                return React$1__default.createElement("div", {
                  style: {
                    color: "#000000",
                    backgroundColor: "#81c784"
                  }
                }, "Waiting for answer...");
              }

              if (offer) {
                return React$1__default.createElement("div", {
                  style: {
                    color: "#000000",
                    backgroundColor: "#4fc3f7"
                  }
                }, "Please click answer button....");
              } else {
                return React$1__default.createElement("div", {
                  style: {
                    color: "#000000",
                    backgroundColor: "#ff8f00"
                  }
                }, "Please  Click Call Button");
              }
            };

            var CallBtn = function CallBtn(_ref) {
              var onClick = _ref.onClick,
                  _ref$fill = _ref.fill,
                  fill = _ref$fill === void 0 ? 'none' : _ref$fill,
                  value = _ref.value;
              return React$1__default.createElement("button", {
                type: "button",
                onClick: onClick,
                className: "btn btn-outline-success"
              }, value, React$1__default.createElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                color: "blue",
                viewBox: "0 0 24 24"
              }, React$1__default.createElement("path", {
                d: "M0 0h24v24H0z",
                fill: "none"
              }), React$1__default.createElement("path", {
                fill: fill,
                d: "M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"
              })));
            };

            CallBtn.propTypes = {
              onClick: PropTypes.func.isRequired,
              fill: PropTypes.string.isRequired
            };

            var CallEndBtn = function CallEndBtn(_ref) {
              var onClick = _ref.onClick,
                  _ref$fill = _ref.fill,
                  fill = _ref$fill === void 0 ? 'none' : _ref$fill,
                  value = _ref.value;
              return React$1__default.createElement("button", {
                type: "button",
                onClick: onClick,
                className: "btn btn-outline-danger"
              }, value, React$1__default.createElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, React$1__default.createElement("path", {
                fill: "none",
                d: "M0 0h24v24H0z"
              }), React$1__default.createElement("path", {
                fill: fill,
                d: "M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
              })));
            };

            CallEndBtn.propTypes = {
              onClick: PropTypes.func.isRequired,
              fill: PropTypes.string.isRequired
            };

            var style$5 = {
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "absolute",
              bottom: "5%",
              zIndex: 2
            };

            var VideoChatControlDisplayer = function VideoChatControlDisplayer(_ref) {
              var offer = _ref.offer,
                  createOffer = _ref.createOffer,
                  createAnswer = _ref.createAnswer,
                  closeCall = _ref.closeCall,
                  signalingState = _ref.signalingState;
              return React$1__default.createElement("div", {
                style: style$5
              }, signalingState !== "stable" && signalingState !== "have-local-offer" && offer === null && React$1__default.createElement(CallBtn, {
                onClick: createOffer,
                fill: "green",
                value: "Call"
              }), signalingState !== "stable" && offer !== null && React$1__default.createElement(CallBtn, {
                onClick: createAnswer,
                fill: "green",
                value: "Answer"
              }), signalingState === "stable" && React$1__default.createElement(CallEndBtn, {
                onClick: closeCall,
                fill: "red",
                value: "End"
              }));
            };

            var VideoChatDisplayer = function VideoChatDisplayer(props) {
              return React$1__default.createElement("div", {
                style: {
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }
              }, React$1__default.createElement(ConnectionState$1, props), React$1__default.createElement(LocalVideo, props), props.signalingState === "stable" && React$1__default.createElement(RemoteVideo, props), props.signalingState !== "stable" && React$1__default.createElement(Calling, props), React$1__default.createElement(VideoChatControlDisplayer, props));
            };

            var WebRTCVideoChatModule =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(WebRTCVideoChatModule, _React$Component);

              function WebRTCVideoChatModule() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, WebRTCVideoChatModule);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WebRTCVideoChatModule)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  reset: false
                });

                _defineProperty(_assertThisInitialized(_this), "resetWebRTCConrtoller", function () {
                  _this.setState({
                    reset: true
                  });

                  setTimeout(function () {
                    _this.setState({
                      reset: false
                    });
                  }, 0);
                });

                return _this;
              }

              _createClass(WebRTCVideoChatModule, [{
                key: "render",
                value: function render() {
                  var _this$props = this.props,
                      name = _this$props.name,
                      targetName = _this$props.targetName,
                      serverUrl = _this$props.serverUrl,
                      localMediaStream = _this$props.localMediaStream;
                  var reset = this.state.reset;
                  if (!reset) return React$1__default.createElement(WebRTCSignaling, {
                    resetWebRTCConrtoller: this.resetWebRTCConrtoller,
                    serverUrl: serverUrl,
                    name: name,
                    targetName: targetName
                  }, function (signalingContext) {
                    return React$1__default.createElement(WebRTCVideoChatController, _extends$1({
                      localMediaStream: localMediaStream,
                      name: name,
                      targetName: targetName
                    }, signalingContext), function (videoChatControllerContext) {
                      return React$1__default.createElement(VideoChatDisplayer, _extends$1({}, videoChatControllerContext, signalingContext));
                    });
                  });
                  return null;
                }
              }]);

              return WebRTCVideoChatModule;
            }(React$1__default.Component);

            var TabBar =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(TabBar, _React$Component);

              function TabBar() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, TabBar);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TabBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  selected: 0
                });

                _defineProperty(_assertThisInitialized(_this), "selectTab", function (selected) {
                  _this.setState({
                    selected: selected
                  });
                });

                return _this;
              }

              _createClass(TabBar, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  Prism.fileHighlight();
                }
              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate() {
                  Prism.fileHighlight();
                }
              }, {
                key: "render",
                value: function render() {
                  var _this2 = this,
                      _React$createElement;

                  var selected = this.state.selected;
                  var children = this.props.children;
                  return React$1__default.createElement("div", null, React$1__default.createElement("ul", {
                    className: "nav nav-tabs"
                  }, React$1__default.createElement("li", {
                    className: "nav-item"
                  }, React$1__default.createElement("button", {
                    className: classnames('nav-link', {
                      'active': selected === 0
                    }),
                    onClick: function onClick() {
                      _this2.selectTab(0);
                    }
                  }, "Front end code")), React$1__default.createElement("li", {
                    className: "nav-item"
                  }, React$1__default.createElement("button", (_React$createElement = {
                    className: classnames('nav-link', {
                      'active': selected === 1
                    })
                  }, _defineProperty(_React$createElement, "className", "nav-link"), _defineProperty(_React$createElement, "onClick", function onClick() {
                    _this2.selectTab(1);
                  }), _React$createElement), "Back end code"))), React$1__default.createElement("div", {
                    style: {
                      paddingBottom: 10
                    }
                  }, children({
                    selectedTab: selected
                  })));
                }
              }]);

              return TabBar;
            }(React$1__default.Component);

            var ViewSwitcher =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(ViewSwitcher, _React$Component);

              function ViewSwitcher() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, ViewSwitcher);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ViewSwitcher)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  selected: 0
                });

                _defineProperty(_assertThisInitialized(_this), "selectTab", function (selected) {
                  _this.setState({
                    selected: selected
                  });
                });

                return _this;
              }

              _createClass(ViewSwitcher, [{
                key: "render",
                value: function render() {
                  var _this2 = this;

                  //const { CodeComponent, DemoComponent } = this.props
                  var selected = this.state.selected;
                  var children = this.props.children;
                  return React$1__default.createElement("div", {
                    style: {
                      marginTop: 10
                    }
                  }, React$1__default.createElement("ul", {
                    className: "nav nav-pills d-flex justify-content-end "
                  }, React$1__default.createElement("li", {
                    className: "nav-item"
                  }, React$1__default.createElement("button", {
                    className: classnames('nav-link', {
                      'active': selected === 0
                    }),
                    onClick: function onClick() {
                      _this2.selectTab(0);
                    }
                  }, "Demo")), React$1__default.createElement("li", {
                    className: "nav-item"
                  }, React$1__default.createElement("button", {
                    className: classnames('nav-link', {
                      'active': selected === 1
                    }),
                    onClick: function onClick() {
                      _this2.selectTab(1);
                    }
                  }, "Code"))), React$1__default.createElement("div", null, children({
                    selected: selected
                  })));
                }
              }]);

              return ViewSwitcher;
            }(React$1__default.Component);

            var WebRTCMessagingDemo$1 = function WebRTCMessagingDemo() {
              return React$1__default.createElement(LocalMediaStream, null, function (_ref) {
                var localMediaStream = _ref.localMediaStream;
                return React$1__default.createElement("div", null, React$1__default.createElement(DeviceContainer, null, function (_ref2) {
                  var selected = _ref2.selected;
                  return React$1__default.createElement("div", null, React$1__default.createElement("div", {
                    style: {
                      textAlign: "center",
                      margin: 10
                    }
                  }, " ", React$1__default.createElement("h6", {
                    style: {
                      backgroundColor: "#b2dfdb"
                    }
                  }, "WebRTC VideoChat Module."), "Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service"), React$1__default.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "center"
                    }
                  }, React$1__default.createElement(DevicesView, {
                    deviceType: selected
                  }, React$1__default.createElement(WebRTCVideoChatModule, {
                    localMediaStream: localMediaStream,
                    initiator: true,
                    serverUrl: "http://localhost:3000/",
                    name: "mario@gmail.com",
                    targetName: "dragos@gmail.com"
                  })), React$1__default.createElement(DevicesView, {
                    deviceType: selected
                  }, React$1__default.createElement(WebRTCVideoChatModule, {
                    localMediaStream: localMediaStream,
                    serverUrl: "http://localhost:3000/",
                    name: "dragos@gmail.com",
                    targetName: "mario@gmail.com"
                  }))));
                }));
              });
            }; //export default WebRTCMessagingDemo


            var DemoView = function DemoView() {
              return React$1__default.createElement(ViewSwitcher, null, function (_ref3) {
                var selected = _ref3.selected;
                return React$1__default.createElement("div", {
                  className: "container"
                }, selected === 0 && React$1__default.createElement(WebRTCMessagingDemo$1, null), selected === 1 && React$1__default.createElement(TabBar, null, function (_ref4) {
                  var selectedTab = _ref4.selectedTab;
                  return React$1__default.createElement("div", {
                    className: "line-numbers"
                  }, React$1__default.createElement("h6", {
                    hidden: selectedTab === 1
                  }, "-----------------------------FRONT END CODE---------------------------"), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "WebRTCVideoChatModule"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./videochat-module-webrtc/WebRTCVideoChatModule.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "WebRTCSignaling Component"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./rtcjs-webrtc-signaling/WebRTCSignaling.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "WebRTCVideoChatController Component"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./videochat-controller-webrtc/index.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "WebRTCVideoChatDisplayer Component"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./videochat-displayer/index.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "WebRTCVideoChatControlDisplayer Component"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./videochat-control-displayer/index.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: closeCall func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/closeCall.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: createAnswer func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/createAnswer.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: createOffer func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/createOffer.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: destroyRTC func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/destroyRTC.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: initialState"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/initialState.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: rtcStateUpdate func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/rtcStateUpdate.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: STUN servers obj"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/servers.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: useDataChannel func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/useDataChannel.js"
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 1
                  }, "shareable-webrtc: useMediaStream func"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 1,
                    "data-src": "./shareables-webrtc/useMediaStream.js"
                  }), React$1__default.createElement("h6", {
                    hidden: selectedTab === 0
                  }, "-----------------------------BACK END CODE------------------------------"), React$1__default.createElement("h3", {
                    hidden: selectedTab === 0
                  }, "Express js server for initializing web server"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 0,
                    "data-src": "./server/index.js",
                    "data-line": "6,13",
                    "data-line-offset": true
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 0
                  }, "rtcjs-server middleware for socketio communication management"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 0,
                    "data-src": "./rtcjs-server/index.js",
                    "data-line-offset": true
                  }), React$1__default.createElement("h3", {
                    hidden: selectedTab === 0
                  }, "rtcjs-server-webrtc-signaling middleware for webrtc signaling management"), React$1__default.createElement("pre", {
                    hidden: selectedTab === 0,
                    "data-src": "./rtcjs-server-webrtc-signaling/index.js",
                    "data-line-offset": true
                  }));
                }));
              });
            };

            var initialState$2 = {
              file: "",
              currentChunk: 0,
              incomingFileInfo: "",
              incomingFileData: [],
              bytesRecieved: 0,
              bytesSent: 0,
              downloadProgress: 0,
              uploadProgress: 0,
              transferIsComplete: false,
              assembledFile: null,
              BYTES_PER_CHUNK: 100,
              start: 0,
              end: 0,
              cancelled: false,
              initiator: false,
              connectionState: "",
              signalingState: ""
            };

            var WebRTCFileShareController =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(WebRTCFileShareController, _React$Component);

              function WebRTCFileShareController() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, WebRTCFileShareController);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WebRTCFileShareController)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", _objectSpread2({}, initialState$2));

                _defineProperty(_assertThisInitialized(_this), "createDataChannel", function () {
                  var sendCandidate = _this.props.sendCandidate;
                  useDataChannel({
                    self: _assertThisInitialized(_this),
                    onMessage: function onMessage(e) {
                      if (typeof e.data === "string") {
                        var _JSON$parse = JSON.parse(e.data),
                            message = _JSON$parse.message;

                        if (message.type === "fileinfo") {
                          _this.startDownload({
                            message: message
                          });
                        } else if (message.type === "cancel") {
                          console.log("cancel message recived");

                          _this.setState({
                            cancelled: true
                          }); // closeCall({self:this})

                        }
                      } else {
                        _this.progressDownload(e);
                      }
                    },
                    sendCandidate: sendCandidate
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "onFileChange", function (e) {
                  var initiator = _this.state.initiator;

                  if (initiator) {
                    if (e.target.files[0] !== null) {
                      var file = e.target.files[0];

                      _this.setState({
                        file: e.target.files[0],
                        currentChunk: 0
                      });

                      var message = {
                        fileName: file.name,
                        fileSize: file.size,
                        type: "fileinfo"
                      };
                      sendString({
                        self: _assertThisInitialized(_this),
                        message: message
                      });

                      _this.readNextChunk(file);
                    } else {
                      console.log("file is null");
                    }
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "readNextChunk", function (file) {
                  var _this$state = _this.state,
                      currentChunk = _this$state.currentChunk,
                      BYTES_PER_CHUNK = _this$state.BYTES_PER_CHUNK;
                  var startNew = BYTES_PER_CHUNK * currentChunk;
                  var endNew = Math.min(file.size, startNew + BYTES_PER_CHUNK);

                  _this.fileReader.readAsArrayBuffer(file.slice(startNew, endNew));

                  _this.setState({
                    start: startNew,
                    end: endNew
                  });

                  _this.setState(function (prevState) {
                    return {
                      currentChunk: ++prevState.currentChunk
                    };
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "startDownload", function (_ref) {
                  var message = _ref.message;

                  _this.setState({
                    incomingFileInfo: message,
                    bytesRecieved: 0,
                    cancelled: false
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "progressDownload", function (e) {
                  var _this$state2 = _this.state,
                      bytesRecieved = _this$state2.bytesRecieved,
                      incomingFileInfo = _this$state2.incomingFileInfo;
                  var downloadProgress = ((bytesRecieved + e.data.byteLength) / incomingFileInfo.fileSize * 100).toFixed();

                  _this.setState(function (prevState) {
                    return {
                      bytesRecieved: e.data.byteLength + prevState.bytesRecieved,
                      incomingFileData: [].concat(_toConsumableArray(prevState.incomingFileData), [e.data]),
                      downloadProgress: downloadProgress
                    };
                  });

                  if (bytesRecieved + e.data.byteLength === incomingFileInfo.fileSize) {
                    _this.endDownload();
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "progressUpload", function (e) {
                  var _this$state3 = _this.state,
                      bytesSent = _this$state3.bytesSent,
                      file = _this$state3.file;
                  var uploadProgress = ((bytesSent + e.byteLength) / file.size * 100).toFixed() > 0 && ((bytesSent + e.byteLength) / file.size * 100).toFixed();

                  _this.setState(function (prevState) {
                    return {
                      bytesSent: e.byteLength + prevState.bytesSent,
                      uploadProgress: uploadProgress
                    };
                  });

                  if (bytesSent + e.byteLength === file.size) {
                    _this.setState({
                      transferIsComplete: true
                    });
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "endDownload", function () {
                  var incomingFileData = _this.state.incomingFileData;
                  var assembledFile = new Blob(incomingFileData);

                  _this.setState({
                    assembledFile: assembledFile,
                    transferIsComplete: true
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "cancelTransfer", function () {
                  var message = {
                    type: "cancel"
                  };
                  sendString({
                    self: _assertThisInitialized(_this),
                    message: message
                  });

                  _this.setState({
                    cancelled: true
                  }); //  closeCall({self:this})


                  _this.closeTransfer();
                });

                _defineProperty(_assertThisInitialized(_this), "pauseTransfer", function () {});

                _defineProperty(_assertThisInitialized(_this), "resumeTransfer", function () {});

                _defineProperty(_assertThisInitialized(_this), "resetController", function () {
                  _this.setState(function (prevState) {
                    return _objectSpread2({}, initialState$2, {
                      initiator: prevState.initiator
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "setInitiator", function () {
                  var sendOffer = _this.props.sendOffer; //   this.createDataChannel()

                  createOffer({
                    self: _assertThisInitialized(_this),
                    sendOffer: sendOffer
                  });

                  _this.setState({
                    initiator: true
                  });

                  console.log("initiator name", _this.props.name);
                });

                _defineProperty(_assertThisInitialized(_this), "closeTransfer", function () {
                  _this.setState(_objectSpread2({}, initialState$2));

                  _this.props.sendClose(); //  closeCall({self:this})

                });

                return _this;
              }

              _createClass(WebRTCFileShareController, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this2 = this;

                  //  const { downloadInProgress } = this.state
                  this._ismounted = true;
                  this.fileReader = new FileReader();

                  this.fileReader.onloadend = function (r) {
                    var _this2$state = _this2.state,
                        bytesRecieved = _this2$state.bytesRecieved,
                        incomingFileInfo = _this2$state.incomingFileInfo,
                        cancelled = _this2$state.cancelled;

                    if (r.target.readyState == FileReader.DONE) {
                      var buffer = r.target.result;
                      var _this2$state2 = _this2.state,
                          file = _this2$state2.file,
                          currentChunk = _this2$state2.currentChunk,
                          BYTES_PER_CHUNK = _this2$state2.BYTES_PER_CHUNK;

                      if (buffer.byteLength > 0 && cancelled === false) {
                        sendArrayBuffer({
                          self: _this2,
                          message: r.target.result
                        });

                        _this2.progressUpload(buffer);
                      }

                      if (Number.parseInt(BYTES_PER_CHUNK * currentChunk) <= Number.parseInt(file.size) && cancelled === false) {
                        _this2.readNextChunk(file);

                        if (bytesRecieved === incomingFileInfo.fileSize) {
                          _this2.endDownload();
                        }
                      }
                    }
                  };

                  this.createDataChannel();
                }
              }, {
                key: "componentWillUpdate",
                value: function componentWillUpdate(nextProps) {
                  if (this._ismounted = true) {
                    compWillUpdate(_objectSpread2({
                      self: this,
                      nextProps: nextProps
                    }, this.props, {
                      autoAnswer: true
                    }));

                    if (this.rtcPeerConnection === null) {
                      this.createDataChannel();
                    }
                  }
                } // END OF COMPONENT DID UPDATE

              }, {
                key: "componentWillReceiveProps",
                value: function componentWillReceiveProps(props) {
                  if (props.closeConnection != this.props.closeConnection && props.closeConnection === true) {
                    this.resetController();
                    closeCall({
                      self: this
                    });
                  }
                }
              }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  this._ismounted = false;
                  closeCall({
                    self: this
                  });
                  this.fileReader.onloadend = null;
                  this.fileReader = null;
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  console.log("this.state", this.state);
                  return children(_objectSpread2({}, this.props, {}, this.state, {
                    onFileChange: this.onFileChange,
                    cancelTransfer: this.cancelTransfer,
                    resetController: this.resetController,
                    setInitiator: this.setInitiator,
                    closeTransfer: this.closeTransfer
                  }));
                }
              }]);

              return WebRTCFileShareController;
            }(React$1__default.Component);

            var DefaultContext = {
              color: undefined,
              size: undefined,
              className: undefined,
              style: undefined,
              attr: undefined
            };
            var IconContext = React$1.createContext && React$1.createContext(DefaultContext);

            var __assign = undefined && undefined.__assign || function () {
              __assign = Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];

                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }

                return t;
              };

              return __assign.apply(this, arguments);
            };

            var __rest = undefined && undefined.__rest || function (s, e) {
              var t = {};

              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

              if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
              return t;
            };

            function Tree2Element(tree) {
              return tree && tree.map(function (node, i) {
                return React$1.createElement(node.tag, __assign({
                  key: i
                }, node.attr), Tree2Element(node.child));
              });
            }

            function GenIcon(data) {
              return function (props) {
                return React$1.createElement(IconBase, __assign({
                  attr: __assign({}, data.attr)
                }, props), Tree2Element(data.child));
              };
            }
            function IconBase(props) {
              var elem = function (conf) {
                var computedSize = props.size || conf.size || "1em";
                var className;
                if (conf.className) className = conf.className;
                if (props.className) className = (className ? className + ' ' : '') + props.className;

                var attr = props.attr,
                    title = props.title,
                    svgProps = __rest(props, ["attr", "title"]);

                return React$1.createElement("svg", __assign({
                  stroke: "currentColor",
                  fill: "currentColor",
                  strokeWidth: "0"
                }, conf.attr, attr, svgProps, {
                  className: className,
                  style: __assign({
                    color: props.color || conf.color
                  }, conf.style, props.style),
                  height: computedSize,
                  width: computedSize,
                  xmlns: "http://www.w3.org/2000/svg"
                }), title && React$1.createElement("title", null, title), props.children);
              };

              return IconContext !== undefined ? React$1.createElement(IconContext.Consumer, null, function (conf) {
                return elem(conf);
              }) : elem(DefaultContext);
            }

            // THIS FILE IS AUTO GENERATED
            var MdDone = function (props) {
              return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"d":"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}}]})(props);
            };
            MdDone.displayName = "MdDone";
            var MdFileDownload = function (props) {
              return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"d":"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}}]})(props);
            };
            MdFileDownload.displayName = "MdFileDownload";
            var MdFileUpload = function (props) {
              return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"d":"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"}}]})(props);
            };
            MdFileUpload.displayName = "MdFileUpload";

            var FileDownloader =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(FileDownloader, _React$Component);

              function FileDownloader(props) {
                var _this;

                _classCallCheck(this, FileDownloader);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(FileDownloader).call(this, props));
                _this.anchorRef = React$1__default.createRef();
                return _this;
              }

              _createClass(FileDownloader, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  var _this$props = this.props,
                      assembledFile = _this$props.assembledFile,
                      incomingFileInfo = _this$props.incomingFileInfo;

                  if (assembledFile) {
                    this.anchorRef.current.href = URL.createObjectURL(assembledFile);
                    this.anchorRef.current.download = incomingFileInfo.fileName;
                  }
                }
              }, {
                key: "render",
                value: function render() {
                  var resetController = this.props.resetController;
                  return React$1__default.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                      width: "100%"
                    },
                    className: "bg-success"
                  }, React$1__default.createElement(IconContext.Provider, {
                    value: {
                      color: "white",
                      size: '5em'
                    }
                  }, React$1__default.createElement("div", null, React$1__default.createElement(MdDone, null))), React$1__default.createElement("a", {
                    className: "btn btn-primary",
                    ref: this.anchorRef,
                    onClick: resetController
                  }, "Download file"));
                }
              }]);

              return FileDownloader;
            }(React$1__default.Component);

            var style$6 = {
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            };

            var FileSelector =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(FileSelector, _React$Component);

              function FileSelector(props) {
                var _this;

                _classCallCheck(this, FileSelector);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(FileSelector).call(this, props));

                _defineProperty(_assertThisInitialized(_this), "upload", function () {
                  if (_this.props.initiator) {
                    document.getElementById("selectFile").click();
                  }
                });

                _this.fileInputRef = React$1__default.createRef();
                return _this;
              }

              _createClass(FileSelector, [{
                key: "render",
                value: function render() {
                  var _this$props = this.props,
                      onFileChange = _this$props.onFileChange,
                      setInitiator = _this$props.setInitiator;
                  return React$1__default.createElement("div", {
                    style: style$6,
                    className: "bg-info"
                  }, React$1__default.createElement("button", {
                    className: "btn btn-primary",
                    onClick: this.upload
                  }, "Select File"), React$1__default.createElement("input", _defineProperty({
                    name: "file",
                    onChange: onFileChange,
                    hidden: true,
                    type: "file",
                    ref: this.fileInputRef,
                    className: "form-control-file",
                    id: "selectFile"
                  }, "className", "visually-hidden")));
                }
              }]);

              return FileSelector;
            }(React$1__default.Component);

            var css$4 = ".rect-auto,\n.c100.p51 .slice,\n.c100.p52 .slice,\n.c100.p53 .slice,\n.c100.p54 .slice,\n.c100.p55 .slice,\n.c100.p56 .slice,\n.c100.p57 .slice,\n.c100.p58 .slice,\n.c100.p59 .slice,\n.c100.p60 .slice,\n.c100.p61 .slice,\n.c100.p62 .slice,\n.c100.p63 .slice,\n.c100.p64 .slice,\n.c100.p65 .slice,\n.c100.p66 .slice,\n.c100.p67 .slice,\n.c100.p68 .slice,\n.c100.p69 .slice,\n.c100.p70 .slice,\n.c100.p71 .slice,\n.c100.p72 .slice,\n.c100.p73 .slice,\n.c100.p74 .slice,\n.c100.p75 .slice,\n.c100.p76 .slice,\n.c100.p77 .slice,\n.c100.p78 .slice,\n.c100.p79 .slice,\n.c100.p80 .slice,\n.c100.p81 .slice,\n.c100.p82 .slice,\n.c100.p83 .slice,\n.c100.p84 .slice,\n.c100.p85 .slice,\n.c100.p86 .slice,\n.c100.p87 .slice,\n.c100.p88 .slice,\n.c100.p89 .slice,\n.c100.p90 .slice,\n.c100.p91 .slice,\n.c100.p92 .slice,\n.c100.p93 .slice,\n.c100.p94 .slice,\n.c100.p95 .slice,\n.c100.p96 .slice,\n.c100.p97 .slice,\n.c100.p98 .slice,\n.c100.p99 .slice,\n.c100.p100 .slice {\n  clip: rect(auto, auto, auto, auto);\n}\n.pie,\n.c100 .bar,\n.c100.p51 .fill,\n.c100.p52 .fill,\n.c100.p53 .fill,\n.c100.p54 .fill,\n.c100.p55 .fill,\n.c100.p56 .fill,\n.c100.p57 .fill,\n.c100.p58 .fill,\n.c100.p59 .fill,\n.c100.p60 .fill,\n.c100.p61 .fill,\n.c100.p62 .fill,\n.c100.p63 .fill,\n.c100.p64 .fill,\n.c100.p65 .fill,\n.c100.p66 .fill,\n.c100.p67 .fill,\n.c100.p68 .fill,\n.c100.p69 .fill,\n.c100.p70 .fill,\n.c100.p71 .fill,\n.c100.p72 .fill,\n.c100.p73 .fill,\n.c100.p74 .fill,\n.c100.p75 .fill,\n.c100.p76 .fill,\n.c100.p77 .fill,\n.c100.p78 .fill,\n.c100.p79 .fill,\n.c100.p80 .fill,\n.c100.p81 .fill,\n.c100.p82 .fill,\n.c100.p83 .fill,\n.c100.p84 .fill,\n.c100.p85 .fill,\n.c100.p86 .fill,\n.c100.p87 .fill,\n.c100.p88 .fill,\n.c100.p89 .fill,\n.c100.p90 .fill,\n.c100.p91 .fill,\n.c100.p92 .fill,\n.c100.p93 .fill,\n.c100.p94 .fill,\n.c100.p95 .fill,\n.c100.p96 .fill,\n.c100.p97 .fill,\n.c100.p98 .fill,\n.c100.p99 .fill,\n.c100.p100 .fill {\n  position: absolute;\n  border: 0.08em solid #307bbb;\n  width: 0.84em;\n  height: 0.84em;\n  clip: rect(0em, 0.5em, 1em, 0em);\n  border-radius: 50%;\n  -webkit-transform: rotate(0deg);\n  -moz-transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  -o-transform: rotate(0deg);\n  transform: rotate(0deg);\n}\n.pie-fill,\n.c100.p51 .bar:after,\n.c100.p51 .fill,\n.c100.p52 .bar:after,\n.c100.p52 .fill,\n.c100.p53 .bar:after,\n.c100.p53 .fill,\n.c100.p54 .bar:after,\n.c100.p54 .fill,\n.c100.p55 .bar:after,\n.c100.p55 .fill,\n.c100.p56 .bar:after,\n.c100.p56 .fill,\n.c100.p57 .bar:after,\n.c100.p57 .fill,\n.c100.p58 .bar:after,\n.c100.p58 .fill,\n.c100.p59 .bar:after,\n.c100.p59 .fill,\n.c100.p60 .bar:after,\n.c100.p60 .fill,\n.c100.p61 .bar:after,\n.c100.p61 .fill,\n.c100.p62 .bar:after,\n.c100.p62 .fill,\n.c100.p63 .bar:after,\n.c100.p63 .fill,\n.c100.p64 .bar:after,\n.c100.p64 .fill,\n.c100.p65 .bar:after,\n.c100.p65 .fill,\n.c100.p66 .bar:after,\n.c100.p66 .fill,\n.c100.p67 .bar:after,\n.c100.p67 .fill,\n.c100.p68 .bar:after,\n.c100.p68 .fill,\n.c100.p69 .bar:after,\n.c100.p69 .fill,\n.c100.p70 .bar:after,\n.c100.p70 .fill,\n.c100.p71 .bar:after,\n.c100.p71 .fill,\n.c100.p72 .bar:after,\n.c100.p72 .fill,\n.c100.p73 .bar:after,\n.c100.p73 .fill,\n.c100.p74 .bar:after,\n.c100.p74 .fill,\n.c100.p75 .bar:after,\n.c100.p75 .fill,\n.c100.p76 .bar:after,\n.c100.p76 .fill,\n.c100.p77 .bar:after,\n.c100.p77 .fill,\n.c100.p78 .bar:after,\n.c100.p78 .fill,\n.c100.p79 .bar:after,\n.c100.p79 .fill,\n.c100.p80 .bar:after,\n.c100.p80 .fill,\n.c100.p81 .bar:after,\n.c100.p81 .fill,\n.c100.p82 .bar:after,\n.c100.p82 .fill,\n.c100.p83 .bar:after,\n.c100.p83 .fill,\n.c100.p84 .bar:after,\n.c100.p84 .fill,\n.c100.p85 .bar:after,\n.c100.p85 .fill,\n.c100.p86 .bar:after,\n.c100.p86 .fill,\n.c100.p87 .bar:after,\n.c100.p87 .fill,\n.c100.p88 .bar:after,\n.c100.p88 .fill,\n.c100.p89 .bar:after,\n.c100.p89 .fill,\n.c100.p90 .bar:after,\n.c100.p90 .fill,\n.c100.p91 .bar:after,\n.c100.p91 .fill,\n.c100.p92 .bar:after,\n.c100.p92 .fill,\n.c100.p93 .bar:after,\n.c100.p93 .fill,\n.c100.p94 .bar:after,\n.c100.p94 .fill,\n.c100.p95 .bar:after,\n.c100.p95 .fill,\n.c100.p96 .bar:after,\n.c100.p96 .fill,\n.c100.p97 .bar:after,\n.c100.p97 .fill,\n.c100.p98 .bar:after,\n.c100.p98 .fill,\n.c100.p99 .bar:after,\n.c100.p99 .fill,\n.c100.p100 .bar:after,\n.c100.p100 .fill {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.c100 {\n  position: relative;\n  font-size: 120px;\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  float: left;\n  margin: 0 0.1em 0.1em 0;\n  background-color: #cccccc;\n}\n.c100 *,\n.c100 *:before,\n.c100 *:after {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n.c100.center {\n  float: none;\n  margin: 0 auto;\n}\n.c100.big {\n  font-size: 240px;\n}\n.c100.small {\n  font-size: 80px;\n}\n.c100 > span {\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 5em;\n  line-height: 5em;\n  font-size: 0.2em;\n  color: #cccccc;\n  display: block;\n  text-align: center;\n  white-space: nowrap;\n  -webkit-transition-property: all;\n  -moz-transition-property: all;\n  -o-transition-property: all;\n  transition-property: all;\n  -webkit-transition-duration: 0.2s;\n  -moz-transition-duration: 0.2s;\n  -o-transition-duration: 0.2s;\n  transition-duration: 0.2s;\n  -webkit-transition-timing-function: ease-out;\n  -moz-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.c100:after {\n  position: absolute;\n  top: 0.08em;\n  left: 0.08em;\n  display: block;\n  content: \" \";\n  border-radius: 50%;\n  background-color: #f5f5f5;\n  width: 0.84em;\n  height: 0.84em;\n  -webkit-transition-property: all;\n  -moz-transition-property: all;\n  -o-transition-property: all;\n  transition-property: all;\n  -webkit-transition-duration: 0.2s;\n  -moz-transition-duration: 0.2s;\n  -o-transition-duration: 0.2s;\n  transition-duration: 0.2s;\n  -webkit-transition-timing-function: ease-in;\n  -moz-transition-timing-function: ease-in;\n  -o-transition-timing-function: ease-in;\n  transition-timing-function: ease-in;\n}\n.c100 .slice {\n  position: absolute;\n  width: 1em;\n  height: 1em;\n  clip: rect(0em, 1em, 1em, 0.5em);\n}\n.c100.p1 .bar {\n  -webkit-transform: rotate(3.6deg);\n  -moz-transform: rotate(3.6deg);\n  -ms-transform: rotate(3.6deg);\n  -o-transform: rotate(3.6deg);\n  transform: rotate(3.6deg);\n}\n.c100.p2 .bar {\n  -webkit-transform: rotate(7.2deg);\n  -moz-transform: rotate(7.2deg);\n  -ms-transform: rotate(7.2deg);\n  -o-transform: rotate(7.2deg);\n  transform: rotate(7.2deg);\n}\n.c100.p3 .bar {\n  -webkit-transform: rotate(10.8deg);\n  -moz-transform: rotate(10.8deg);\n  -ms-transform: rotate(10.8deg);\n  -o-transform: rotate(10.8deg);\n  transform: rotate(10.8deg);\n}\n.c100.p4 .bar {\n  -webkit-transform: rotate(14.4deg);\n  -moz-transform: rotate(14.4deg);\n  -ms-transform: rotate(14.4deg);\n  -o-transform: rotate(14.4deg);\n  transform: rotate(14.4deg);\n}\n.c100.p5 .bar {\n  -webkit-transform: rotate(18deg);\n  -moz-transform: rotate(18deg);\n  -ms-transform: rotate(18deg);\n  -o-transform: rotate(18deg);\n  transform: rotate(18deg);\n}\n.c100.p6 .bar {\n  -webkit-transform: rotate(21.6deg);\n  -moz-transform: rotate(21.6deg);\n  -ms-transform: rotate(21.6deg);\n  -o-transform: rotate(21.6deg);\n  transform: rotate(21.6deg);\n}\n.c100.p7 .bar {\n  -webkit-transform: rotate(25.2deg);\n  -moz-transform: rotate(25.2deg);\n  -ms-transform: rotate(25.2deg);\n  -o-transform: rotate(25.2deg);\n  transform: rotate(25.2deg);\n}\n.c100.p8 .bar {\n  -webkit-transform: rotate(28.8deg);\n  -moz-transform: rotate(28.8deg);\n  -ms-transform: rotate(28.8deg);\n  -o-transform: rotate(28.8deg);\n  transform: rotate(28.8deg);\n}\n.c100.p9 .bar {\n  -webkit-transform: rotate(32.4deg);\n  -moz-transform: rotate(32.4deg);\n  -ms-transform: rotate(32.4deg);\n  -o-transform: rotate(32.4deg);\n  transform: rotate(32.4deg);\n}\n.c100.p10 .bar {\n  -webkit-transform: rotate(36deg);\n  -moz-transform: rotate(36deg);\n  -ms-transform: rotate(36deg);\n  -o-transform: rotate(36deg);\n  transform: rotate(36deg);\n}\n.c100.p11 .bar {\n  -webkit-transform: rotate(39.6deg);\n  -moz-transform: rotate(39.6deg);\n  -ms-transform: rotate(39.6deg);\n  -o-transform: rotate(39.6deg);\n  transform: rotate(39.6deg);\n}\n.c100.p12 .bar {\n  -webkit-transform: rotate(43.2deg);\n  -moz-transform: rotate(43.2deg);\n  -ms-transform: rotate(43.2deg);\n  -o-transform: rotate(43.2deg);\n  transform: rotate(43.2deg);\n}\n.c100.p13 .bar {\n  -webkit-transform: rotate(46.800000000000004deg);\n  -moz-transform: rotate(46.800000000000004deg);\n  -ms-transform: rotate(46.800000000000004deg);\n  -o-transform: rotate(46.800000000000004deg);\n  transform: rotate(46.800000000000004deg);\n}\n.c100.p14 .bar {\n  -webkit-transform: rotate(50.4deg);\n  -moz-transform: rotate(50.4deg);\n  -ms-transform: rotate(50.4deg);\n  -o-transform: rotate(50.4deg);\n  transform: rotate(50.4deg);\n}\n.c100.p15 .bar {\n  -webkit-transform: rotate(54deg);\n  -moz-transform: rotate(54deg);\n  -ms-transform: rotate(54deg);\n  -o-transform: rotate(54deg);\n  transform: rotate(54deg);\n}\n.c100.p16 .bar {\n  -webkit-transform: rotate(57.6deg);\n  -moz-transform: rotate(57.6deg);\n  -ms-transform: rotate(57.6deg);\n  -o-transform: rotate(57.6deg);\n  transform: rotate(57.6deg);\n}\n.c100.p17 .bar {\n  -webkit-transform: rotate(61.2deg);\n  -moz-transform: rotate(61.2deg);\n  -ms-transform: rotate(61.2deg);\n  -o-transform: rotate(61.2deg);\n  transform: rotate(61.2deg);\n}\n.c100.p18 .bar {\n  -webkit-transform: rotate(64.8deg);\n  -moz-transform: rotate(64.8deg);\n  -ms-transform: rotate(64.8deg);\n  -o-transform: rotate(64.8deg);\n  transform: rotate(64.8deg);\n}\n.c100.p19 .bar {\n  -webkit-transform: rotate(68.4deg);\n  -moz-transform: rotate(68.4deg);\n  -ms-transform: rotate(68.4deg);\n  -o-transform: rotate(68.4deg);\n  transform: rotate(68.4deg);\n}\n.c100.p20 .bar {\n  -webkit-transform: rotate(72deg);\n  -moz-transform: rotate(72deg);\n  -ms-transform: rotate(72deg);\n  -o-transform: rotate(72deg);\n  transform: rotate(72deg);\n}\n.c100.p21 .bar {\n  -webkit-transform: rotate(75.60000000000001deg);\n  -moz-transform: rotate(75.60000000000001deg);\n  -ms-transform: rotate(75.60000000000001deg);\n  -o-transform: rotate(75.60000000000001deg);\n  transform: rotate(75.60000000000001deg);\n}\n.c100.p22 .bar {\n  -webkit-transform: rotate(79.2deg);\n  -moz-transform: rotate(79.2deg);\n  -ms-transform: rotate(79.2deg);\n  -o-transform: rotate(79.2deg);\n  transform: rotate(79.2deg);\n}\n.c100.p23 .bar {\n  -webkit-transform: rotate(82.8deg);\n  -moz-transform: rotate(82.8deg);\n  -ms-transform: rotate(82.8deg);\n  -o-transform: rotate(82.8deg);\n  transform: rotate(82.8deg);\n}\n.c100.p24 .bar {\n  -webkit-transform: rotate(86.4deg);\n  -moz-transform: rotate(86.4deg);\n  -ms-transform: rotate(86.4deg);\n  -o-transform: rotate(86.4deg);\n  transform: rotate(86.4deg);\n}\n.c100.p25 .bar {\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.c100.p26 .bar {\n  -webkit-transform: rotate(93.60000000000001deg);\n  -moz-transform: rotate(93.60000000000001deg);\n  -ms-transform: rotate(93.60000000000001deg);\n  -o-transform: rotate(93.60000000000001deg);\n  transform: rotate(93.60000000000001deg);\n}\n.c100.p27 .bar {\n  -webkit-transform: rotate(97.2deg);\n  -moz-transform: rotate(97.2deg);\n  -ms-transform: rotate(97.2deg);\n  -o-transform: rotate(97.2deg);\n  transform: rotate(97.2deg);\n}\n.c100.p28 .bar {\n  -webkit-transform: rotate(100.8deg);\n  -moz-transform: rotate(100.8deg);\n  -ms-transform: rotate(100.8deg);\n  -o-transform: rotate(100.8deg);\n  transform: rotate(100.8deg);\n}\n.c100.p29 .bar {\n  -webkit-transform: rotate(104.4deg);\n  -moz-transform: rotate(104.4deg);\n  -ms-transform: rotate(104.4deg);\n  -o-transform: rotate(104.4deg);\n  transform: rotate(104.4deg);\n}\n.c100.p30 .bar {\n  -webkit-transform: rotate(108deg);\n  -moz-transform: rotate(108deg);\n  -ms-transform: rotate(108deg);\n  -o-transform: rotate(108deg);\n  transform: rotate(108deg);\n}\n.c100.p31 .bar {\n  -webkit-transform: rotate(111.60000000000001deg);\n  -moz-transform: rotate(111.60000000000001deg);\n  -ms-transform: rotate(111.60000000000001deg);\n  -o-transform: rotate(111.60000000000001deg);\n  transform: rotate(111.60000000000001deg);\n}\n.c100.p32 .bar {\n  -webkit-transform: rotate(115.2deg);\n  -moz-transform: rotate(115.2deg);\n  -ms-transform: rotate(115.2deg);\n  -o-transform: rotate(115.2deg);\n  transform: rotate(115.2deg);\n}\n.c100.p33 .bar {\n  -webkit-transform: rotate(118.8deg);\n  -moz-transform: rotate(118.8deg);\n  -ms-transform: rotate(118.8deg);\n  -o-transform: rotate(118.8deg);\n  transform: rotate(118.8deg);\n}\n.c100.p34 .bar {\n  -webkit-transform: rotate(122.4deg);\n  -moz-transform: rotate(122.4deg);\n  -ms-transform: rotate(122.4deg);\n  -o-transform: rotate(122.4deg);\n  transform: rotate(122.4deg);\n}\n.c100.p35 .bar {\n  -webkit-transform: rotate(126deg);\n  -moz-transform: rotate(126deg);\n  -ms-transform: rotate(126deg);\n  -o-transform: rotate(126deg);\n  transform: rotate(126deg);\n}\n.c100.p36 .bar {\n  -webkit-transform: rotate(129.6deg);\n  -moz-transform: rotate(129.6deg);\n  -ms-transform: rotate(129.6deg);\n  -o-transform: rotate(129.6deg);\n  transform: rotate(129.6deg);\n}\n.c100.p37 .bar {\n  -webkit-transform: rotate(133.20000000000002deg);\n  -moz-transform: rotate(133.20000000000002deg);\n  -ms-transform: rotate(133.20000000000002deg);\n  -o-transform: rotate(133.20000000000002deg);\n  transform: rotate(133.20000000000002deg);\n}\n.c100.p38 .bar {\n  -webkit-transform: rotate(136.8deg);\n  -moz-transform: rotate(136.8deg);\n  -ms-transform: rotate(136.8deg);\n  -o-transform: rotate(136.8deg);\n  transform: rotate(136.8deg);\n}\n.c100.p39 .bar {\n  -webkit-transform: rotate(140.4deg);\n  -moz-transform: rotate(140.4deg);\n  -ms-transform: rotate(140.4deg);\n  -o-transform: rotate(140.4deg);\n  transform: rotate(140.4deg);\n}\n.c100.p40 .bar {\n  -webkit-transform: rotate(144deg);\n  -moz-transform: rotate(144deg);\n  -ms-transform: rotate(144deg);\n  -o-transform: rotate(144deg);\n  transform: rotate(144deg);\n}\n.c100.p41 .bar {\n  -webkit-transform: rotate(147.6deg);\n  -moz-transform: rotate(147.6deg);\n  -ms-transform: rotate(147.6deg);\n  -o-transform: rotate(147.6deg);\n  transform: rotate(147.6deg);\n}\n.c100.p42 .bar {\n  -webkit-transform: rotate(151.20000000000002deg);\n  -moz-transform: rotate(151.20000000000002deg);\n  -ms-transform: rotate(151.20000000000002deg);\n  -o-transform: rotate(151.20000000000002deg);\n  transform: rotate(151.20000000000002deg);\n}\n.c100.p43 .bar {\n  -webkit-transform: rotate(154.8deg);\n  -moz-transform: rotate(154.8deg);\n  -ms-transform: rotate(154.8deg);\n  -o-transform: rotate(154.8deg);\n  transform: rotate(154.8deg);\n}\n.c100.p44 .bar {\n  -webkit-transform: rotate(158.4deg);\n  -moz-transform: rotate(158.4deg);\n  -ms-transform: rotate(158.4deg);\n  -o-transform: rotate(158.4deg);\n  transform: rotate(158.4deg);\n}\n.c100.p45 .bar {\n  -webkit-transform: rotate(162deg);\n  -moz-transform: rotate(162deg);\n  -ms-transform: rotate(162deg);\n  -o-transform: rotate(162deg);\n  transform: rotate(162deg);\n}\n.c100.p46 .bar {\n  -webkit-transform: rotate(165.6deg);\n  -moz-transform: rotate(165.6deg);\n  -ms-transform: rotate(165.6deg);\n  -o-transform: rotate(165.6deg);\n  transform: rotate(165.6deg);\n}\n.c100.p47 .bar {\n  -webkit-transform: rotate(169.20000000000002deg);\n  -moz-transform: rotate(169.20000000000002deg);\n  -ms-transform: rotate(169.20000000000002deg);\n  -o-transform: rotate(169.20000000000002deg);\n  transform: rotate(169.20000000000002deg);\n}\n.c100.p48 .bar {\n  -webkit-transform: rotate(172.8deg);\n  -moz-transform: rotate(172.8deg);\n  -ms-transform: rotate(172.8deg);\n  -o-transform: rotate(172.8deg);\n  transform: rotate(172.8deg);\n}\n.c100.p49 .bar {\n  -webkit-transform: rotate(176.4deg);\n  -moz-transform: rotate(176.4deg);\n  -ms-transform: rotate(176.4deg);\n  -o-transform: rotate(176.4deg);\n  transform: rotate(176.4deg);\n}\n.c100.p50 .bar {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.c100.p51 .bar {\n  -webkit-transform: rotate(183.6deg);\n  -moz-transform: rotate(183.6deg);\n  -ms-transform: rotate(183.6deg);\n  -o-transform: rotate(183.6deg);\n  transform: rotate(183.6deg);\n}\n.c100.p52 .bar {\n  -webkit-transform: rotate(187.20000000000002deg);\n  -moz-transform: rotate(187.20000000000002deg);\n  -ms-transform: rotate(187.20000000000002deg);\n  -o-transform: rotate(187.20000000000002deg);\n  transform: rotate(187.20000000000002deg);\n}\n.c100.p53 .bar {\n  -webkit-transform: rotate(190.8deg);\n  -moz-transform: rotate(190.8deg);\n  -ms-transform: rotate(190.8deg);\n  -o-transform: rotate(190.8deg);\n  transform: rotate(190.8deg);\n}\n.c100.p54 .bar {\n  -webkit-transform: rotate(194.4deg);\n  -moz-transform: rotate(194.4deg);\n  -ms-transform: rotate(194.4deg);\n  -o-transform: rotate(194.4deg);\n  transform: rotate(194.4deg);\n}\n.c100.p55 .bar {\n  -webkit-transform: rotate(198deg);\n  -moz-transform: rotate(198deg);\n  -ms-transform: rotate(198deg);\n  -o-transform: rotate(198deg);\n  transform: rotate(198deg);\n}\n.c100.p56 .bar {\n  -webkit-transform: rotate(201.6deg);\n  -moz-transform: rotate(201.6deg);\n  -ms-transform: rotate(201.6deg);\n  -o-transform: rotate(201.6deg);\n  transform: rotate(201.6deg);\n}\n.c100.p57 .bar {\n  -webkit-transform: rotate(205.20000000000002deg);\n  -moz-transform: rotate(205.20000000000002deg);\n  -ms-transform: rotate(205.20000000000002deg);\n  -o-transform: rotate(205.20000000000002deg);\n  transform: rotate(205.20000000000002deg);\n}\n.c100.p58 .bar {\n  -webkit-transform: rotate(208.8deg);\n  -moz-transform: rotate(208.8deg);\n  -ms-transform: rotate(208.8deg);\n  -o-transform: rotate(208.8deg);\n  transform: rotate(208.8deg);\n}\n.c100.p59 .bar {\n  -webkit-transform: rotate(212.4deg);\n  -moz-transform: rotate(212.4deg);\n  -ms-transform: rotate(212.4deg);\n  -o-transform: rotate(212.4deg);\n  transform: rotate(212.4deg);\n}\n.c100.p60 .bar {\n  -webkit-transform: rotate(216deg);\n  -moz-transform: rotate(216deg);\n  -ms-transform: rotate(216deg);\n  -o-transform: rotate(216deg);\n  transform: rotate(216deg);\n}\n.c100.p61 .bar {\n  -webkit-transform: rotate(219.6deg);\n  -moz-transform: rotate(219.6deg);\n  -ms-transform: rotate(219.6deg);\n  -o-transform: rotate(219.6deg);\n  transform: rotate(219.6deg);\n}\n.c100.p62 .bar {\n  -webkit-transform: rotate(223.20000000000002deg);\n  -moz-transform: rotate(223.20000000000002deg);\n  -ms-transform: rotate(223.20000000000002deg);\n  -o-transform: rotate(223.20000000000002deg);\n  transform: rotate(223.20000000000002deg);\n}\n.c100.p63 .bar {\n  -webkit-transform: rotate(226.8deg);\n  -moz-transform: rotate(226.8deg);\n  -ms-transform: rotate(226.8deg);\n  -o-transform: rotate(226.8deg);\n  transform: rotate(226.8deg);\n}\n.c100.p64 .bar {\n  -webkit-transform: rotate(230.4deg);\n  -moz-transform: rotate(230.4deg);\n  -ms-transform: rotate(230.4deg);\n  -o-transform: rotate(230.4deg);\n  transform: rotate(230.4deg);\n}\n.c100.p65 .bar {\n  -webkit-transform: rotate(234deg);\n  -moz-transform: rotate(234deg);\n  -ms-transform: rotate(234deg);\n  -o-transform: rotate(234deg);\n  transform: rotate(234deg);\n}\n.c100.p66 .bar {\n  -webkit-transform: rotate(237.6deg);\n  -moz-transform: rotate(237.6deg);\n  -ms-transform: rotate(237.6deg);\n  -o-transform: rotate(237.6deg);\n  transform: rotate(237.6deg);\n}\n.c100.p67 .bar {\n  -webkit-transform: rotate(241.20000000000002deg);\n  -moz-transform: rotate(241.20000000000002deg);\n  -ms-transform: rotate(241.20000000000002deg);\n  -o-transform: rotate(241.20000000000002deg);\n  transform: rotate(241.20000000000002deg);\n}\n.c100.p68 .bar {\n  -webkit-transform: rotate(244.8deg);\n  -moz-transform: rotate(244.8deg);\n  -ms-transform: rotate(244.8deg);\n  -o-transform: rotate(244.8deg);\n  transform: rotate(244.8deg);\n}\n.c100.p69 .bar {\n  -webkit-transform: rotate(248.4deg);\n  -moz-transform: rotate(248.4deg);\n  -ms-transform: rotate(248.4deg);\n  -o-transform: rotate(248.4deg);\n  transform: rotate(248.4deg);\n}\n.c100.p70 .bar {\n  -webkit-transform: rotate(252deg);\n  -moz-transform: rotate(252deg);\n  -ms-transform: rotate(252deg);\n  -o-transform: rotate(252deg);\n  transform: rotate(252deg);\n}\n.c100.p71 .bar {\n  -webkit-transform: rotate(255.6deg);\n  -moz-transform: rotate(255.6deg);\n  -ms-transform: rotate(255.6deg);\n  -o-transform: rotate(255.6deg);\n  transform: rotate(255.6deg);\n}\n.c100.p72 .bar {\n  -webkit-transform: rotate(259.2deg);\n  -moz-transform: rotate(259.2deg);\n  -ms-transform: rotate(259.2deg);\n  -o-transform: rotate(259.2deg);\n  transform: rotate(259.2deg);\n}\n.c100.p73 .bar {\n  -webkit-transform: rotate(262.8deg);\n  -moz-transform: rotate(262.8deg);\n  -ms-transform: rotate(262.8deg);\n  -o-transform: rotate(262.8deg);\n  transform: rotate(262.8deg);\n}\n.c100.p74 .bar {\n  -webkit-transform: rotate(266.40000000000003deg);\n  -moz-transform: rotate(266.40000000000003deg);\n  -ms-transform: rotate(266.40000000000003deg);\n  -o-transform: rotate(266.40000000000003deg);\n  transform: rotate(266.40000000000003deg);\n}\n.c100.p75 .bar {\n  -webkit-transform: rotate(270deg);\n  -moz-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  -o-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.c100.p76 .bar {\n  -webkit-transform: rotate(273.6deg);\n  -moz-transform: rotate(273.6deg);\n  -ms-transform: rotate(273.6deg);\n  -o-transform: rotate(273.6deg);\n  transform: rotate(273.6deg);\n}\n.c100.p77 .bar {\n  -webkit-transform: rotate(277.2deg);\n  -moz-transform: rotate(277.2deg);\n  -ms-transform: rotate(277.2deg);\n  -o-transform: rotate(277.2deg);\n  transform: rotate(277.2deg);\n}\n.c100.p78 .bar {\n  -webkit-transform: rotate(280.8deg);\n  -moz-transform: rotate(280.8deg);\n  -ms-transform: rotate(280.8deg);\n  -o-transform: rotate(280.8deg);\n  transform: rotate(280.8deg);\n}\n.c100.p79 .bar {\n  -webkit-transform: rotate(284.40000000000003deg);\n  -moz-transform: rotate(284.40000000000003deg);\n  -ms-transform: rotate(284.40000000000003deg);\n  -o-transform: rotate(284.40000000000003deg);\n  transform: rotate(284.40000000000003deg);\n}\n.c100.p80 .bar {\n  -webkit-transform: rotate(288deg);\n  -moz-transform: rotate(288deg);\n  -ms-transform: rotate(288deg);\n  -o-transform: rotate(288deg);\n  transform: rotate(288deg);\n}\n.c100.p81 .bar {\n  -webkit-transform: rotate(291.6deg);\n  -moz-transform: rotate(291.6deg);\n  -ms-transform: rotate(291.6deg);\n  -o-transform: rotate(291.6deg);\n  transform: rotate(291.6deg);\n}\n.c100.p82 .bar {\n  -webkit-transform: rotate(295.2deg);\n  -moz-transform: rotate(295.2deg);\n  -ms-transform: rotate(295.2deg);\n  -o-transform: rotate(295.2deg);\n  transform: rotate(295.2deg);\n}\n.c100.p83 .bar {\n  -webkit-transform: rotate(298.8deg);\n  -moz-transform: rotate(298.8deg);\n  -ms-transform: rotate(298.8deg);\n  -o-transform: rotate(298.8deg);\n  transform: rotate(298.8deg);\n}\n.c100.p84 .bar {\n  -webkit-transform: rotate(302.40000000000003deg);\n  -moz-transform: rotate(302.40000000000003deg);\n  -ms-transform: rotate(302.40000000000003deg);\n  -o-transform: rotate(302.40000000000003deg);\n  transform: rotate(302.40000000000003deg);\n}\n.c100.p85 .bar {\n  -webkit-transform: rotate(306deg);\n  -moz-transform: rotate(306deg);\n  -ms-transform: rotate(306deg);\n  -o-transform: rotate(306deg);\n  transform: rotate(306deg);\n}\n.c100.p86 .bar {\n  -webkit-transform: rotate(309.6deg);\n  -moz-transform: rotate(309.6deg);\n  -ms-transform: rotate(309.6deg);\n  -o-transform: rotate(309.6deg);\n  transform: rotate(309.6deg);\n}\n.c100.p87 .bar {\n  -webkit-transform: rotate(313.2deg);\n  -moz-transform: rotate(313.2deg);\n  -ms-transform: rotate(313.2deg);\n  -o-transform: rotate(313.2deg);\n  transform: rotate(313.2deg);\n}\n.c100.p88 .bar {\n  -webkit-transform: rotate(316.8deg);\n  -moz-transform: rotate(316.8deg);\n  -ms-transform: rotate(316.8deg);\n  -o-transform: rotate(316.8deg);\n  transform: rotate(316.8deg);\n}\n.c100.p89 .bar {\n  -webkit-transform: rotate(320.40000000000003deg);\n  -moz-transform: rotate(320.40000000000003deg);\n  -ms-transform: rotate(320.40000000000003deg);\n  -o-transform: rotate(320.40000000000003deg);\n  transform: rotate(320.40000000000003deg);\n}\n.c100.p90 .bar {\n  -webkit-transform: rotate(324deg);\n  -moz-transform: rotate(324deg);\n  -ms-transform: rotate(324deg);\n  -o-transform: rotate(324deg);\n  transform: rotate(324deg);\n}\n.c100.p91 .bar {\n  -webkit-transform: rotate(327.6deg);\n  -moz-transform: rotate(327.6deg);\n  -ms-transform: rotate(327.6deg);\n  -o-transform: rotate(327.6deg);\n  transform: rotate(327.6deg);\n}\n.c100.p92 .bar {\n  -webkit-transform: rotate(331.2deg);\n  -moz-transform: rotate(331.2deg);\n  -ms-transform: rotate(331.2deg);\n  -o-transform: rotate(331.2deg);\n  transform: rotate(331.2deg);\n}\n.c100.p93 .bar {\n  -webkit-transform: rotate(334.8deg);\n  -moz-transform: rotate(334.8deg);\n  -ms-transform: rotate(334.8deg);\n  -o-transform: rotate(334.8deg);\n  transform: rotate(334.8deg);\n}\n.c100.p94 .bar {\n  -webkit-transform: rotate(338.40000000000003deg);\n  -moz-transform: rotate(338.40000000000003deg);\n  -ms-transform: rotate(338.40000000000003deg);\n  -o-transform: rotate(338.40000000000003deg);\n  transform: rotate(338.40000000000003deg);\n}\n.c100.p95 .bar {\n  -webkit-transform: rotate(342deg);\n  -moz-transform: rotate(342deg);\n  -ms-transform: rotate(342deg);\n  -o-transform: rotate(342deg);\n  transform: rotate(342deg);\n}\n.c100.p96 .bar {\n  -webkit-transform: rotate(345.6deg);\n  -moz-transform: rotate(345.6deg);\n  -ms-transform: rotate(345.6deg);\n  -o-transform: rotate(345.6deg);\n  transform: rotate(345.6deg);\n}\n.c100.p97 .bar {\n  -webkit-transform: rotate(349.2deg);\n  -moz-transform: rotate(349.2deg);\n  -ms-transform: rotate(349.2deg);\n  -o-transform: rotate(349.2deg);\n  transform: rotate(349.2deg);\n}\n.c100.p98 .bar {\n  -webkit-transform: rotate(352.8deg);\n  -moz-transform: rotate(352.8deg);\n  -ms-transform: rotate(352.8deg);\n  -o-transform: rotate(352.8deg);\n  transform: rotate(352.8deg);\n}\n.c100.p99 .bar {\n  -webkit-transform: rotate(356.40000000000003deg);\n  -moz-transform: rotate(356.40000000000003deg);\n  -ms-transform: rotate(356.40000000000003deg);\n  -o-transform: rotate(356.40000000000003deg);\n  transform: rotate(356.40000000000003deg);\n}\n.c100.p100 .bar {\n  -webkit-transform: rotate(360deg);\n  -moz-transform: rotate(360deg);\n  -ms-transform: rotate(360deg);\n  -o-transform: rotate(360deg);\n  transform: rotate(360deg);\n}\n.c100:hover {\n  cursor: default;\n}\n.c100:hover > span {\n  width: 3.33em;\n  line-height: 3.33em;\n  font-size: 0.3em;\n  color: #307bbb;\n}\n.c100:hover:after {\n  top: 0.04em;\n  left: 0.04em;\n  width: 0.92em;\n  height: 0.92em;\n}\n.c100.dark {\n  background-color: #777777;\n}\n.c100.dark .bar,\n.c100.dark .fill {\n  border-color: #c6ff00 !important;\n}\n.c100.dark > span {\n  color: #777777;\n}\n.c100.dark:after {\n  background-color: #666666;\n}\n.c100.dark:hover > span {\n  color: #c6ff00;\n}\n.c100.green .bar,\n.c100.green .fill {\n  border-color: #4db53c !important;\n}\n.c100.green:hover > span {\n  color: #4db53c;\n}\n.c100.green.dark .bar,\n.c100.green.dark .fill {\n  border-color: #5fd400 !important;\n}\n.c100.green.dark:hover > span {\n  color: #5fd400;\n}\n.c100.orange .bar,\n.c100.orange .fill {\n  border-color: #dd9d22 !important;\n}\n.c100.orange:hover > span {\n  color: #dd9d22;\n}\n.c100.orange.dark .bar,\n.c100.orange.dark .fill {\n  border-color: #e08833 !important;\n}\n.c100.orange.dark:hover > span {\n  color: #e08833;\n}\n";
            styleInject(css$4);

            var CircularPercentageBar = function CircularPercentageBar(_ref) {
              var percent = _ref.percent;
              // console.log("percent---",percent)
              return React$1__default.createElement("div", {
                className: classnames('c100', _defineProperty({}, "p".concat(percent), "p".concat(percent)))
              }, React$1__default.createElement("span", null, percent, "%"), React$1__default.createElement("div", {
                className: "slice"
              }, React$1__default.createElement("div", {
                className: "bar"
              }), React$1__default.createElement("div", {
                className: "fill"
              })));
            };

            var TransferOutStart = function TransferOutStart(_ref) {
              var _ref2;

              var uploadProgress = _ref.uploadProgress,
                  cancelTransfer = _ref.cancelTransfer;
              return React$1__default.createElement("div", {
                style: (_ref2 = {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }, _defineProperty(_ref2, "display", "flex"), _defineProperty(_ref2, "flexDirection", "column"), _ref2),
                className: "bg-info"
              }, React$1__default.createElement("h3", {
                style: {
                  color: "white"
                }
              }, "Sending ..."), React$1__default.createElement(CircularPercentageBar, {
                percent: uploadProgress
              }), React$1__default.createElement(IconContext.Provider, {
                value: {
                  color: "#fafafa",
                  size: '5em'
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement(MdFileUpload, null))), React$1__default.createElement("button", {
                className: "btn btn btn-info",
                onClick: cancelTransfer
              }, "Cancel"));
            };

            var TransferInStart = function TransferInStart(_ref) {
              var _ref2;

              var downloadProgress = _ref.downloadProgress,
                  cancelTransfer = _ref.cancelTransfer;
              return React$1__default.createElement("div", {
                style: (_ref2 = {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }, _defineProperty(_ref2, "display", "flex"), _defineProperty(_ref2, "flexDirection", "column"), _ref2),
                className: "bg-info"
              }, React$1__default.createElement("h3", {
                style: {
                  color: "white"
                }
              }, "Reciving ..."), React$1__default.createElement(CircularPercentageBar, {
                percent: downloadProgress
              }), React$1__default.createElement(IconContext.Provider, {
                value: {
                  color: "#fafafa",
                  size: '5em'
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement(MdFileDownload, null))), React$1__default.createElement("button", {
                className: "btn btn-info",
                onClick: cancelTransfer
              }, "Cancel"));
            };

            var TransferOutSuccess = function TransferOutSuccess(_ref) {
              var resetController = _ref.resetController;
              return React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  width: "100%"
                },
                className: "bg-success"
              }, React$1__default.createElement(IconContext.Provider, {
                value: {
                  color: "white",
                  size: '5em'
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement(MdDone, null))), React$1__default.createElement("button", {
                onClick: resetController,
                className: "btn btn-primary"
              }, "Ok"));
            };

            var TransferCancelled = function TransferCancelled(_ref) {
              var resetController = _ref.resetController;
              return React$1__default.createElement("div", {
                style: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                },
                className: "bg-warning"
              }, React$1__default.createElement(IconContext.Provider, {
                value: {
                  color: "red",
                  size: '5em'
                }
              }, React$1__default.createElement("div", null, React$1__default.createElement("button", {
                className: "btn btn-outline-info",
                onClick: resetController
              }, "Close")), React$1__default.createElement("h5", {
                className: "text-danger"
              }, " Transfer Cancelled!")));
            };

            var ReadyToRecievFile = function ReadyToRecievFile(_ref) {
              var closeTransfer = _ref.closeTransfer;
              return React$1__default.createElement("div", {
                style: {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                },
                className: "bg-info"
              }, React$1__default.createElement("h4", null, "Waiting to recieve file..."), React$1__default.createElement("button", {
                className: "btn btn-info",
                onClick: closeTransfer
              }, "Close"));
            };

            var InitiateFileSending = function InitiateFileSending(_ref) {
              var setInitiator = _ref.setInitiator;
              return React$1__default.createElement("div", {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                  alignItems: "center"
                },
                className: "bg-info"
              }, React$1__default.createElement("button", {
                className: "btn btn-info",
                onClick: setInitiator
              }, "Connect"));
            };

            var FileSender = function FileSender(props) {
              var cancelled = props.cancelled,
                  transferIsComplete = props.transferIsComplete,
                  connectionState = props.connectionState,
                  downloadProgress = props.downloadProgress,
                  incomingFileData = props.incomingFileData;
              console.log("props after cancelled", props);

              if (cancelled) {
                return React$1__default.createElement(TransferCancelled, props);
              } else if (connectionState === "connected" && downloadProgress === 0) {
                return React$1__default.createElement(ReadyToRecievFile, props);
              } else if (!transferIsComplete) {
                return React$1__default.createElement(TransferInStart, props);
              } else if (transferIsComplete) {
                return React$1__default.createElement(FileDownloader, props);
              }

              return React$1__default.createElement("div", null, "Empty inside File Recievr");
            };

            var FileSender$1 = function FileSender(props) {
              var cancelled = props.cancelled,
                  transferIsComplete = props.transferIsComplete;

              if (cancelled) {
                return React$1__default.createElement(TransferCancelled, props);
              } else if (!transferIsComplete) {
                return React$1__default.createElement(TransferOutStart, props);
              } else if (transferIsComplete) {
                return React$1__default.createElement(TransferOutSuccess, props);
              }

              return React$1__default.createElement("div", null, "FileSender");
            };

            var FileShareDisplayer = function FileShareDisplayer(props) {
              var connectionState = props.connectionState,
                  initiator = props.initiator,
                  uploadProgress = props.uploadProgress;

              if (connectionState !== "connected") {
                return React$1__default.createElement(InitiateFileSending, props);
              } else if (connectionState === "connected" && uploadProgress === 0 && initiator) {
                return React$1__default.createElement(FileSelector, props);
              } else if (connectionState === "connected" && uploadProgress > 0 && initiator) {
                return React$1__default.createElement(FileSender$1, props);
              } else if (!initiator && connectionState === "connected") {
                return React$1__default.createElement(FileSender, props);
              }

              return React$1__default.createElement("div", null, "Unknown");
            };

            var WebRTCFileShareModule =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(WebRTCFileShareModule, _React$Component);

              function WebRTCFileShareModule() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, WebRTCFileShareModule);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WebRTCFileShareModule)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  visible: true
                });

                _defineProperty(_assertThisInitialized(_this), "resetWebRTCConrtoller", function () {
                  _this.setState({
                    visible: false
                  });

                  setTimeout(function () {
                    _this.setState({
                      visible: true
                    });
                  }, 0);
                });

                return _this;
              }

              _createClass(WebRTCFileShareModule, [{
                key: "render",
                value: function render() {
                  var _this$props = this.props,
                      serverUrl = _this$props.serverUrl,
                      name = _this$props.name,
                      targetName = _this$props.targetName;
                  var visible = this.state.visible;
                  console.log("visible", visible);
                  return React$1__default.createElement("div", {
                    style: {
                      height: "100%"
                    }
                  }, visible ? React$1__default.createElement(WebRTCSignaling, {
                    resetWebRTCConrtoller: this.resetWebRTCConrtoller,
                    serverUrl: serverUrl,
                    name: name,
                    targetName: targetName
                  }, function (signalingContext) {
                    return React$1__default.createElement(WebRTCFileShareController, _extends$1({
                      name: name,
                      targetName: targetName
                    }, signalingContext), function (fileshareControllerContext) {
                      return React$1__default.createElement("div", {
                        style: {
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column"
                        }
                      }, React$1__default.createElement(FileShareDisplayer, _extends$1({}, signalingContext, fileshareControllerContext)));
                    });
                  }) : React$1__default.createElement("div", null, "NotVisible"));
                }
              }]);

              return WebRTCFileShareModule;
            }(React$1__default.Component);

            var WebRTCFileShareDemo = function WebRTCFileShareDemo() {
              return React$1__default.createElement(DeviceContainer, null, function (_ref) {
                var selected = _ref.selected;
                return React$1__default.createElement("div", null, React$1__default.createElement("div", {
                  style: {
                    textAlign: "center",
                    margin: 10
                  }
                }, " ", React$1__default.createElement("h6", {
                  style: {
                    backgroundColor: "#b2dfdb"
                  }
                }, "WebRTC FileShare Module."), "Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service"), React$1__default.createElement("div", {
                  style: {
                    display: "flex",
                    justifyContent: "center"
                  }
                }, React$1__default.createElement(DevicesView, {
                  deviceType: selected,
                  user: "mario@gmail.com"
                }, React$1__default.createElement(WebRTCFileShareModule, {
                  serverUrl: "http://localhost:3000/",
                  name: "mario@gmail.com",
                  targetName: "dragos@gmail.com"
                })), React$1__default.createElement(DevicesView, {
                  deviceType: selected,
                  user: "dragos@gmail.com"
                }, React$1__default.createElement(WebRTCFileShareModule, {
                  serverUrl: "http://localhost:3000/",
                  name: "dragos@gmail.com",
                  targetName: "mario@gmail.com"
                }))));
              });
            };

            function memoize(fn) {
              var cache = {};
              return function (arg) {
                if (cache[arg] === undefined) cache[arg] = fn(arg);
                return cache[arg];
              };
            }

            var unitlessKeys = {
              animationIterationCount: 1,
              borderImageOutset: 1,
              borderImageSlice: 1,
              borderImageWidth: 1,
              boxFlex: 1,
              boxFlexGroup: 1,
              boxOrdinalGroup: 1,
              columnCount: 1,
              columns: 1,
              flex: 1,
              flexGrow: 1,
              flexPositive: 1,
              flexShrink: 1,
              flexNegative: 1,
              flexOrder: 1,
              gridRow: 1,
              gridRowEnd: 1,
              gridRowSpan: 1,
              gridRowStart: 1,
              gridColumn: 1,
              gridColumnEnd: 1,
              gridColumnSpan: 1,
              gridColumnStart: 1,
              fontWeight: 1,
              lineHeight: 1,
              opacity: 1,
              order: 1,
              orphans: 1,
              tabSize: 1,
              widows: 1,
              zIndex: 1,
              zoom: 1,
              WebkitLineClamp: 1,
              // SVG-related properties
              fillOpacity: 1,
              floodOpacity: 1,
              stopOpacity: 1,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              strokeMiterlimit: 1,
              strokeOpacity: 1,
              strokeWidth: 1
            };

            /* eslint-disable */
            // murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
            function murmurhash2_32_gc(str) {
              var l = str.length,
                  h = l ^ l,
                  i = 0,
                  k;

              while (l >= 4) {
                k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
                k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
                k ^= k >>> 24;
                k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
                h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
                l -= 4;
                ++i;
              }

              switch (l) {
                case 3:
                  h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

                case 2:
                  h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

                case 1:
                  h ^= str.charCodeAt(i) & 0xff;
                  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
              }

              h ^= h >>> 13;
              h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
              h ^= h >>> 15;
              return (h >>> 0).toString(36);
            }

            function stylis_min (W) {
              function M(d, c, e, h, a) {
                for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
                  g = e.charCodeAt(l);
                  l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

                  if (0 === b + n + v + m) {
                    if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
                      switch (g) {
                        case 32:
                        case 9:
                        case 59:
                        case 13:
                        case 10:
                          break;

                        default:
                          f += e.charAt(l);
                      }

                      g = 59;
                    }

                    switch (g) {
                      case 123:
                        f = f.trim();
                        q = f.charCodeAt(0);
                        k = 1;

                        for (t = ++l; l < B;) {
                          switch (g = e.charCodeAt(l)) {
                            case 123:
                              k++;
                              break;

                            case 125:
                              k--;
                              break;

                            case 47:
                              switch (g = e.charCodeAt(l + 1)) {
                                case 42:
                                case 47:
                                  a: {
                                    for (u = l + 1; u < J; ++u) {
                                      switch (e.charCodeAt(u)) {
                                        case 47:
                                          if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                            l = u + 1;
                                            break a;
                                          }

                                          break;

                                        case 10:
                                          if (47 === g) {
                                            l = u + 1;
                                            break a;
                                          }

                                      }
                                    }

                                    l = u;
                                  }

                              }

                              break;

                            case 91:
                              g++;

                            case 40:
                              g++;

                            case 34:
                            case 39:
                              for (; l++ < J && e.charCodeAt(l) !== g;) {
                              }

                          }

                          if (0 === k) break;
                          l++;
                        }

                        k = e.substring(t, l);
                        0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

                        switch (q) {
                          case 64:
                            0 < r && (f = f.replace(N, ''));
                            g = f.charCodeAt(1);

                            switch (g) {
                              case 100:
                              case 109:
                              case 115:
                              case 45:
                                r = c;
                                break;

                              default:
                                r = O;
                            }

                            k = M(c, r, k, g, a + 1);
                            t = k.length;
                            0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                            if (0 < t) switch (g) {
                              case 115:
                                f = f.replace(da, ea);

                              case 100:
                              case 109:
                              case 45:
                                k = f + '{' + k + '}';
                                break;

                              case 107:
                                f = f.replace(fa, '$1 $2');
                                k = f + '{' + k + '}';
                                k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                                break;

                              default:
                                k = f + k, 112 === h && (k = (p += k, ''));
                            } else k = '';
                            break;

                          default:
                            k = M(c, X(c, f, I), k, h, a + 1);
                        }

                        F += k;
                        k = I = r = u = q = 0;
                        f = '';
                        g = e.charCodeAt(++l);
                        break;

                      case 125:
                      case 59:
                        f = (0 < r ? f.replace(N, '') : f).trim();
                        if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
                          case 0:
                            break;

                          case 64:
                            if (105 === g || 99 === g) {
                              G += f + e.charAt(l);
                              break;
                            }

                          default:
                            58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
                        }
                        I = r = u = q = 0;
                        f = '';
                        g = e.charCodeAt(++l);
                    }
                  }

                  switch (g) {
                    case 13:
                    case 10:
                      47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
                      0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
                      z = 1;
                      D++;
                      break;

                    case 59:
                    case 125:
                      if (0 === b + n + v + m) {
                        z++;
                        break;
                      }

                    default:
                      z++;
                      y = e.charAt(l);

                      switch (g) {
                        case 9:
                        case 32:
                          if (0 === n + m + b) switch (x) {
                            case 44:
                            case 58:
                            case 9:
                            case 32:
                              y = '';
                              break;

                            default:
                              32 !== g && (y = ' ');
                          }
                          break;

                        case 0:
                          y = '\\0';
                          break;

                        case 12:
                          y = '\\f';
                          break;

                        case 11:
                          y = '\\v';
                          break;

                        case 38:
                          0 === n + b + m && (r = I = 1, y = '\f' + y);
                          break;

                        case 108:
                          if (0 === n + b + m + E && 0 < u) switch (l - u) {
                            case 2:
                              112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                            case 8:
                              111 === K && (E = K);
                          }
                          break;

                        case 58:
                          0 === n + b + m && (u = l);
                          break;

                        case 44:
                          0 === b + v + n + m && (r = 1, y += '\r');
                          break;

                        case 34:
                        case 39:
                          0 === b && (n = n === g ? 0 : 0 === n ? g : n);
                          break;

                        case 91:
                          0 === n + b + v && m++;
                          break;

                        case 93:
                          0 === n + b + v && m--;
                          break;

                        case 41:
                          0 === n + b + m && v--;
                          break;

                        case 40:
                          if (0 === n + b + m) {
                            if (0 === q) switch (2 * x + 3 * K) {
                              case 533:
                                break;

                              default:
                                q = 1;
                            }
                            v++;
                          }

                          break;

                        case 64:
                          0 === b + v + n + m + u + k && (k = 1);
                          break;

                        case 42:
                        case 47:
                          if (!(0 < n + m + v)) switch (b) {
                            case 0:
                              switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                                case 235:
                                  b = 47;
                                  break;

                                case 220:
                                  t = l, b = 42;
                              }

                              break;

                            case 42:
                              47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
                          }
                      }

                      0 === b && (f += y);
                  }

                  K = x;
                  x = g;
                  l++;
                }

                t = p.length;

                if (0 < t) {
                  r = c;
                  if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
                  p = r.join(',') + '{' + p + '}';

                  if (0 !== w * E) {
                    2 !== w || L(p, 2) || (E = 0);

                    switch (E) {
                      case 111:
                        p = p.replace(ha, ':-moz-$1') + p;
                        break;

                      case 112:
                        p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
                    }

                    E = 0;
                  }
                }

                return G + p + F;
              }

              function X(d, c, e) {
                var h = c.trim().split(ia);
                c = h;
                var a = h.length,
                    m = d.length;

                switch (m) {
                  case 0:
                  case 1:
                    var b = 0;

                    for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
                      c[b] = Z(d, c[b], e, m).trim();
                    }

                    break;

                  default:
                    var v = b = 0;

                    for (c = []; b < a; ++b) {
                      for (var n = 0; n < m; ++n) {
                        c[v++] = Z(d[n] + ' ', h[b], e, m).trim();
                      }
                    }

                }

                return c;
              }

              function Z(d, c, e) {
                var h = c.charCodeAt(0);
                33 > h && (h = (c = c.trim()).charCodeAt(0));

                switch (h) {
                  case 38:
                    return c.replace(F, '$1' + d.trim());

                  case 58:
                    return d.trim() + c.replace(F, '$1' + d.trim());

                  default:
                    if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
                }

                return d + c;
              }

              function P(d, c, e, h) {
                var a = d + ';',
                    m = 2 * c + 3 * e + 4 * h;

                if (944 === m) {
                  d = a.indexOf(':', 9) + 1;
                  var b = a.substring(d, a.length - 1).trim();
                  b = a.substring(0, d).trim() + b + ';';
                  return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
                }

                if (0 === w || 2 === w && !L(a, 1)) return a;

                switch (m) {
                  case 1015:
                    return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

                  case 951:
                    return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

                  case 963:
                    return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

                  case 1009:
                    if (100 !== a.charCodeAt(4)) break;

                  case 969:
                  case 942:
                    return '-webkit-' + a + a;

                  case 978:
                    return '-webkit-' + a + '-moz-' + a + a;

                  case 1019:
                  case 983:
                    return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

                  case 883:
                    if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
                    if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
                    break;

                  case 932:
                    if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
                      case 103:
                        return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

                      case 115:
                        return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

                      case 98:
                        return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
                    }
                    return '-webkit-' + a + '-ms-' + a + a;

                  case 964:
                    return '-webkit-' + a + '-ms-flex-' + a + a;

                  case 1023:
                    if (99 !== a.charCodeAt(8)) break;
                    b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
                    return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

                  case 1005:
                    return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

                  case 1e3:
                    b = a.substring(13).trim();
                    c = b.indexOf('-') + 1;

                    switch (b.charCodeAt(0) + b.charCodeAt(c)) {
                      case 226:
                        b = a.replace(G, 'tb');
                        break;

                      case 232:
                        b = a.replace(G, 'tb-rl');
                        break;

                      case 220:
                        b = a.replace(G, 'lr');
                        break;

                      default:
                        return a;
                    }

                    return '-webkit-' + a + '-ms-' + b + a;

                  case 1017:
                    if (-1 === a.indexOf('sticky', 9)) break;

                  case 975:
                    c = (a = d).length - 10;
                    b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

                    switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
                      case 203:
                        if (111 > b.charCodeAt(8)) break;

                      case 115:
                        a = a.replace(b, '-webkit-' + b) + ';' + a;
                        break;

                      case 207:
                      case 102:
                        a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
                    }

                    return a + ';';

                  case 938:
                    if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
                      case 105:
                        return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

                      case 115:
                        return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

                      default:
                        return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
                    }
                    break;

                  case 973:
                  case 989:
                    if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

                  case 931:
                  case 953:
                    if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
                    break;

                  case 962:
                    if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
                }

                return a;
              }

              function L(d, c) {
                var e = d.indexOf(1 === c ? ':' : '{'),
                    h = d.substring(0, 3 !== c ? e : 10);
                e = d.substring(e + 1, d.length - 1);
                return R(2 !== c ? h : h.replace(na, '$1'), e, c);
              }

              function ea(d, c) {
                var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
                return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
              }

              function H(d, c, e, h, a, m, b, v, n, q) {
                for (var g = 0, x = c, w; g < A; ++g) {
                  switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
                    case void 0:
                    case !1:
                    case !0:
                    case null:
                      break;

                    default:
                      x = w;
                  }
                }

                if (x !== c) return x;
              }

              function T(d) {
                switch (d) {
                  case void 0:
                  case null:
                    A = S.length = 0;
                    break;

                  default:
                    switch (d.constructor) {
                      case Array:
                        for (var c = 0, e = d.length; c < e; ++c) {
                          T(d[c]);
                        }

                        break;

                      case Function:
                        S[A++] = d;
                        break;

                      case Boolean:
                        Y = !!d | 0;
                    }

                }

                return T;
              }

              function U(d) {
                d = d.prefix;
                void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
                return U;
              }

              function B(d, c) {
                var e = d;
                33 > e.charCodeAt(0) && (e = e.trim());
                V = e;
                e = [V];

                if (0 < A) {
                  var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
                  void 0 !== h && 'string' === typeof h && (c = h);
                }

                var a = M(O, e, c, 0, 0);
                0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
                V = '';
                E = 0;
                z = D = 1;
                return a;
              }

              var ca = /^\0+/g,
                  N = /[\0\r\f]/g,
                  aa = /: */g,
                  ka = /zoo|gra/,
                  ma = /([,: ])(transform)/g,
                  ia = /,\r+?/g,
                  F = /([\t\r\n ])*\f?&/g,
                  fa = /@(k\w+)\s*(\S*)\s*/,
                  Q = /::(place)/g,
                  ha = /:(read-only)/g,
                  G = /[svh]\w+-[tblr]{2}/,
                  da = /\(\s*(.*)\s*\)/g,
                  oa = /([\s\S]*?);/g,
                  ba = /-self|flex-/g,
                  na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
                  la = /stretch|:\s*\w+\-(?:conte|avail)/,
                  ja = /([^-])(image-set\()/,
                  z = 1,
                  D = 1,
                  E = 0,
                  w = 1,
                  O = [],
                  S = [],
                  A = 0,
                  R = null,
                  Y = 0,
                  V = '';
              B.use = T;
              B.set = U;
              void 0 !== W && U(W);
              return B;
            }

            var stylisRuleSheet = createCommonjsModule(function (module, exports) {
            (function (factory) {
            	module['exports'] = factory();
            }(function () {

            	return function (insertRule) {
            		var delimiter = '/*|*/';
            		var needle = delimiter+'}';

            		function toSheet (block) {
            			if (block)
            				try {
            					insertRule(block + '}');
            				} catch (e) {}
            		}

            		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
            			switch (context) {
            				// property
            				case 1:
            					// @import
            					if (depth === 0 && content.charCodeAt(0) === 64)
            						return insertRule(content+';'), ''
            					break
            				// selector
            				case 2:
            					if (ns === 0)
            						return content + delimiter
            					break
            				// at-rule
            				case 3:
            					switch (ns) {
            						// @font-face, @page
            						case 102:
            						case 112:
            							return insertRule(selectors[0]+content), ''
            						default:
            							return content + (at === 0 ? delimiter : '')
            					}
            				case -2:
            					content.split(needle).forEach(toSheet);
            			}
            		}
            	}
            }));
            });

            var hyphenateRegex = /[A-Z]|^ms/g;
            var processStyleName = memoize(function (styleName) {
              return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
            });
            var processStyleValue = function processStyleValue(key, value) {
              if (value == null || typeof value === 'boolean') {
                return '';
              }

              if (unitlessKeys[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
              !isNaN(value) && value !== 0) {
                return value + 'px';
              }

              return value;
            };

            if (process.env.NODE_ENV !== 'production') {
              var contentValuePattern = /(attr|calc|counters?|url)\(/;
              var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
              var oldProcessStyleValue = processStyleValue;

              processStyleValue = function processStyleValue(key, value) {
                if (key === 'content') {
                  if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
                    console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
                  }
                }

                return oldProcessStyleValue(key, value);
              };
            }

            var classnames$1 = function classnames(args) {
              var len = args.length;
              var i = 0;
              var cls = '';

              for (; i < len; i++) {
                var arg = args[i];
                if (arg == null) continue;
                var toAdd = void 0;

                switch (typeof arg) {
                  case 'boolean':
                    break;

                  case 'function':
                    if (process.env.NODE_ENV !== 'production') {
                      console.error('Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\n' + 'Please call the function before passing it to cx.');
                    }

                    toAdd = classnames([arg()]);
                    break;

                  case 'object':
                    {
                      if (Array.isArray(arg)) {
                        toAdd = classnames(arg);
                      } else {
                        toAdd = '';

                        for (var k in arg) {
                          if (arg[k] && k) {
                            toAdd && (toAdd += ' ');
                            toAdd += k;
                          }
                        }
                      }

                      break;
                    }

                  default:
                    {
                      toAdd = arg;
                    }
                }

                if (toAdd) {
                  cls && (cls += ' ');
                  cls += toAdd;
                }
              }

              return cls;
            };
            var isBrowser = typeof document !== 'undefined';

            /*

            high performance StyleSheet for css-in-js systems

            - uses multiple style tags behind the scenes for millions of rules
            - uses `insertRule` for appending in production for *much* faster performance
            - 'polyfills' on server side

            // usage

            import StyleSheet from 'glamor/lib/sheet'
            let styleSheet = new StyleSheet()

            styleSheet.inject()
            - 'injects' the stylesheet into the page (or into memory if on server)

            styleSheet.insert('#box { border: 1px solid red; }')
            - appends a css rule into the stylesheet

            styleSheet.flush()
            - empties the stylesheet of all its contents

            */
            // $FlowFixMe
            function sheetForTag(tag) {
              if (tag.sheet) {
                // $FlowFixMe
                return tag.sheet;
              } // this weirdness brought to you by firefox


              for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].ownerNode === tag) {
                  // $FlowFixMe
                  return document.styleSheets[i];
                }
              }
            }

            function makeStyleTag(opts) {
              var tag = document.createElement('style');
              tag.setAttribute('data-emotion', opts.key || '');

              if (opts.nonce !== undefined) {
                tag.setAttribute('nonce', opts.nonce);
              }

              tag.appendChild(document.createTextNode('')) // $FlowFixMe
              ;
              (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
              return tag;
            }

            var StyleSheet =
            /*#__PURE__*/
            function () {
              function StyleSheet(options) {
                this.isSpeedy = process.env.NODE_ENV === 'production'; // the big drawback here is that the css won't be editable in devtools

                this.tags = [];
                this.ctr = 0;
                this.opts = options;
              }

              var _proto = StyleSheet.prototype;

              _proto.inject = function inject() {
                if (this.injected) {
                  throw new Error('already injected!');
                }

                this.tags[0] = makeStyleTag(this.opts);
                this.injected = true;
              };

              _proto.speedy = function speedy(bool) {
                if (this.ctr !== 0) {
                  // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
                  throw new Error("cannot change speedy now");
                }

                this.isSpeedy = !!bool;
              };

              _proto.insert = function insert(rule, sourceMap) {
                // this is the ultrafast version, works across browsers
                if (this.isSpeedy) {
                  var tag = this.tags[this.tags.length - 1];
                  var sheet = sheetForTag(tag);

                  try {
                    sheet.insertRule(rule, sheet.cssRules.length);
                  } catch (e) {
                    if (process.env.NODE_ENV !== 'production') {
                      console.warn('illegal rule', rule); // eslint-disable-line no-console
                    }
                  }
                } else {
                  var _tag = makeStyleTag(this.opts);

                  this.tags.push(_tag);

                  _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
                }

                this.ctr++;

                if (this.ctr % 65000 === 0) {
                  this.tags.push(makeStyleTag(this.opts));
                }
              };

              _proto.flush = function flush() {
                // $FlowFixMe
                this.tags.forEach(function (tag) {
                  return tag.parentNode.removeChild(tag);
                });
                this.tags = [];
                this.ctr = 0; // todo - look for remnants in document.styleSheets

                this.injected = false;
              };

              return StyleSheet;
            }();

            function createEmotion(context, options) {
              if (context.__SECRET_EMOTION__ !== undefined) {
                return context.__SECRET_EMOTION__;
              }

              if (options === undefined) options = {};
              var key = options.key || 'css';

              if (process.env.NODE_ENV !== 'production') {
                if (/[^a-z-]/.test(key)) {
                  throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
                }
              }

              var current;

              function insertRule(rule) {
                current += rule;

                if (isBrowser) {
                  sheet.insert(rule, currentSourceMap);
                }
              }

              var insertionPlugin = stylisRuleSheet(insertRule);
              var stylisOptions;

              if (options.prefix !== undefined) {
                stylisOptions = {
                  prefix: options.prefix
                };
              }

              var caches = {
                registered: {},
                inserted: {},
                nonce: options.nonce,
                key: key
              };
              var sheet = new StyleSheet(options);

              if (isBrowser) {
                // 🚀
                sheet.inject();
              }

              var stylis = new stylis_min(stylisOptions);
              stylis.use(options.stylisPlugins)(insertionPlugin);
              var currentSourceMap = '';

              function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
                if (interpolation == null) {
                  return '';
                }

                switch (typeof interpolation) {
                  case 'boolean':
                    return '';

                  case 'function':
                    if (interpolation.__emotion_styles !== undefined) {
                      var selector = interpolation.toString();

                      if (selector === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
                        throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
                      }

                      return selector;
                    }

                    if (this === undefined && process.env.NODE_ENV !== 'production') {
                      console.error('Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
                    }

                    return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
                    interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

                  case 'object':
                    return createStringFromObject.call(this, interpolation);

                  default:
                    var cached = caches.registered[interpolation];
                    return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
                }
              }

              var objectToStringCache = new WeakMap();

              function createStringFromObject(obj) {
                if (objectToStringCache.has(obj)) {
                  // $FlowFixMe
                  return objectToStringCache.get(obj);
                }

                var string = '';

                if (Array.isArray(obj)) {
                  obj.forEach(function (interpolation) {
                    string += handleInterpolation.call(this, interpolation, false);
                  }, this);
                } else {
                  Object.keys(obj).forEach(function (key) {
                    if (typeof obj[key] !== 'object') {
                      if (caches.registered[obj[key]] !== undefined) {
                        string += key + "{" + caches.registered[obj[key]] + "}";
                      } else {
                        string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
                      }
                    } else {
                      if (key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
                        throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
                      }

                      if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && caches.registered[obj[key][0]] === undefined) {
                        obj[key].forEach(function (value) {
                          string += processStyleName(key) + ":" + processStyleValue(key, value) + ";";
                        });
                      } else {
                        string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
                      }
                    }
                  }, this);
                }

                objectToStringCache.set(obj, string);
                return string;
              }

              var name;
              var stylesWithLabel;
              var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

              var createClassName = function createClassName(styles, identifierName) {
                return murmurhash2_32_gc(styles + identifierName) + identifierName;
              };

              if (process.env.NODE_ENV !== 'production') {
                var oldCreateClassName = createClassName;
                var sourceMappingUrlPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;

                createClassName = function createClassName(styles, identifierName) {
                  return oldCreateClassName(styles.replace(sourceMappingUrlPattern, function (sourceMap) {
                    currentSourceMap = sourceMap;
                    return '';
                  }), identifierName);
                };
              }

              var createStyles = function createStyles(strings) {
                var stringMode = true;
                var styles = '';
                var identifierName = '';

                if (strings == null || strings.raw === undefined) {
                  stringMode = false;
                  styles += handleInterpolation.call(this, strings, false);
                } else {
                  styles += strings[0];
                }

                for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  interpolations[_key - 1] = arguments[_key];
                }

                interpolations.forEach(function (interpolation, i) {
                  styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
                  );

                  if (stringMode === true && strings[i + 1] !== undefined) {
                    styles += strings[i + 1];
                  }
                }, this);
                stylesWithLabel = styles;
                styles = styles.replace(labelPattern, function (match, p1) {
                  identifierName += "-" + p1;
                  return '';
                });
                name = createClassName(styles, identifierName);
                return styles;
              };

              if (process.env.NODE_ENV !== 'production') {
                var oldStylis = stylis;

                stylis = function stylis(selector, styles) {
                  oldStylis(selector, styles);
                  currentSourceMap = '';
                };
              }

              function insert(scope, styles) {
                if (caches.inserted[name] === undefined) {
                  current = '';
                  stylis(scope, styles);
                  caches.inserted[name] = current;
                }
              }

              var css = function css() {
                var styles = createStyles.apply(this, arguments);
                var selector = key + "-" + name;

                if (caches.registered[selector] === undefined) {
                  caches.registered[selector] = stylesWithLabel;
                }

                insert("." + selector, styles);
                return selector;
              };

              var keyframes = function keyframes() {
                var styles = createStyles.apply(this, arguments);
                var animation = "animation-" + name;
                insert('', "@keyframes " + animation + "{" + styles + "}");
                return animation;
              };

              var injectGlobal = function injectGlobal() {
                var styles = createStyles.apply(this, arguments);
                insert('', styles);
              };

              function getRegisteredStyles(registeredStyles, classNames) {
                var rawClassName = '';
                classNames.split(' ').forEach(function (className) {
                  if (caches.registered[className] !== undefined) {
                    registeredStyles.push(className);
                  } else {
                    rawClassName += className + " ";
                  }
                });
                return rawClassName;
              }

              function merge(className, sourceMap) {
                var registeredStyles = [];
                var rawClassName = getRegisteredStyles(registeredStyles, className);

                if (registeredStyles.length < 2) {
                  return className;
                }

                return rawClassName + css(registeredStyles, sourceMap);
              }

              function cx() {
                for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  classNames[_key2] = arguments[_key2];
                }

                return merge(classnames$1(classNames));
              }

              function hydrateSingleId(id) {
                caches.inserted[id] = true;
              }

              function hydrate(ids) {
                ids.forEach(hydrateSingleId);
              }

              function flush() {
                if (isBrowser) {
                  sheet.flush();
                  sheet.inject();
                }

                caches.inserted = {};
                caches.registered = {};
              }

              if (isBrowser) {
                var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
                Array.prototype.forEach.call(chunks, function (node) {
                  // $FlowFixMe
                  sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

                  node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
                });
              }

              var emotion = {
                flush: flush,
                hydrate: hydrate,
                cx: cx,
                merge: merge,
                getRegisteredStyles: getRegisteredStyles,
                injectGlobal: injectGlobal,
                keyframes: keyframes,
                css: css,
                sheet: sheet,
                caches: caches
              };
              context.__SECRET_EMOTION__ = emotion;
              return emotion;
            }

            var context$1 = typeof global$1 !== 'undefined' ? global$1 : {};

            var _createEmotion = createEmotion(context$1),
                flush = _createEmotion.flush,
                hydrate = _createEmotion.hydrate,
                cx = _createEmotion.cx,
                merge$1 = _createEmotion.merge,
                getRegisteredStyles = _createEmotion.getRegisteredStyles,
                injectGlobal = _createEmotion.injectGlobal,
                keyframes = _createEmotion.keyframes,
                css$5 = _createEmotion.css,
                sheet = _createEmotion.sheet,
                caches = _createEmotion.caches;

            var index_esm = /*#__PURE__*/Object.freeze({
                        flush: flush,
                        hydrate: hydrate,
                        cx: cx,
                        merge: merge$1,
                        getRegisteredStyles: getRegisteredStyles,
                        injectGlobal: injectGlobal,
                        keyframes: keyframes,
                        css: css$5,
                        sheet: sheet,
                        caches: caches
            });

            var style$7 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _templateObject = _taggedTemplateLiteral(['\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    font-size: 1em;\n    font-weight: 300;\n    line-height: 1.5;\n    letter-spacing: 0.05em;\n    * {\n      box-sizing: border-box;\n  \n      margin: 0;\n      padding: 0;\n      border: 0;\n      font-size: 100%;\n      font: inherit;\n      vertical-align: baseline;\n    }\n    p {\n      font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    }\n  '], ['\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    font-size: 1em;\n    font-weight: 300;\n    line-height: 1.5;\n    letter-spacing: 0.05em;\n    * {\n      box-sizing: border-box;\n  \n      margin: 0;\n      padding: 0;\n      border: 0;\n      font-size: 100%;\n      font: inherit;\n      vertical-align: baseline;\n    }\n    p {\n      font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    }\n  ']),
                _templateObject2 = _taggedTemplateLiteral(['\n    position: relative;\n    max-width: 95%;\n    list-style: none;\n    &:before {\n      background-color: black;\n      content: \'\';\n      margin-left: -1px;\n      position: absolute;\n      top: 0;\n      left: 2em;\n      width: 2px;\n      height: 100%;\n    }\n  '], ['\n    position: relative;\n    max-width: 95%;\n    list-style: none;\n    &:before {\n      background-color: black;\n      content: \'\';\n      margin-left: -1px;\n      position: absolute;\n      top: 0;\n      left: 2em;\n      width: 2px;\n      height: 100%;\n    }\n  ']),
                _templateObject3 = _taggedTemplateLiteral(['\n    position: relative;\n  '], ['\n    position: relative;\n  ']),
                _templateObject4 = _taggedTemplateLiteral(['\n    transform: rotate(45deg);\n    background-color: black;\n    outline: 10px solid white;\n    display: block;\n    margin: 0.5em 0.5em 0.5em -0.5em;\n    position: absolute;\n    top: 0;\n    left: 2em;\n    width: 1em;\n    height: 1em;\n  '], ['\n    transform: rotate(45deg);\n    background-color: black;\n    outline: 10px solid white;\n    display: block;\n    margin: 0.5em 0.5em 0.5em -0.5em;\n    position: absolute;\n    top: 0;\n    left: 2em;\n    width: 1em;\n    height: 1em;\n  ']),
                _templateObject5 = _taggedTemplateLiteral(['\n    padding: 2em 2em 0 2em;\n    position: relative;\n    top: -1.875em;\n    left: 2em;\n    width: 95%;\n    h3 {\n      font-size: 1.75em;\n    }\n    h4 {\n      font-size: 1.2em;\n      margin-bottom: 1.2em;\n    }\n  '], ['\n    padding: 2em 2em 0 2em;\n    position: relative;\n    top: -1.875em;\n    left: 2em;\n    width: 95%;\n    h3 {\n      font-size: 1.75em;\n    }\n    h4 {\n      font-size: 1.2em;\n      margin-bottom: 1.2em;\n    }\n  ']),
                _templateObject6 = _taggedTemplateLiteral(['\n    color: white;\n    background-color: black;\n    box-shadow: inset 0 0 0 0em #ef795a;\n    display: inline-block;\n    margin-bottom: 1.2em;\n    padding: 0.25em 1em 0.2em 1em;\n  '], ['\n    color: white;\n    background-color: black;\n    box-shadow: inset 0 0 0 0em #ef795a;\n    display: inline-block;\n    margin-bottom: 1.2em;\n    padding: 0.25em 1em 0.2em 1em;\n  ']),
                _templateObject7 = _taggedTemplateLiteral(['\n    strong {\n      font-weight: 700;\n    }\n    p {\n      padding-bottom: 1.2em;\n    }\n  '], ['\n    strong {\n      font-weight: 700;\n    }\n    p {\n      padding-bottom: 1.2em;\n    }\n  ']);



            function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

            exports.default = {
              container: (0, index_esm.css)(_templateObject),
              timeline: (0, index_esm.css)(_templateObject2),
              event: (0, index_esm.css)(_templateObject3),
              icon: (0, index_esm.css)(_templateObject4),
              body: (0, index_esm.css)(_templateObject5),
              date: (0, index_esm.css)(_templateObject6),
              description: (0, index_esm.css)(_templateObject7)
            };
            });

            unwrapExports(style$7);

            var build = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.Event = exports.Timeline = undefined;



            var _react2 = _interopRequireDefault(React$1__default);



            var _style2 = _interopRequireDefault(style$7);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var Timeline = exports.Timeline = function Timeline(_ref) {
              var children = _ref.children;
              return _react2.default.createElement(
                'div',
                { className: _style2.default.container },
                _react2.default.createElement(
                  'ul',
                  { className: _style2.default.timeline },
                  children
                )
              );
            };

            var Event = exports.Event = function Event(_ref2) {
              var title = _ref2.title,
                  subtitle = _ref2.subtitle,
                  interval = _ref2.interval,
                  children = _ref2.children;
              return _react2.default.createElement(
                'li',
                { className: _style2.default.event },
                _react2.default.createElement('label', { className: _style2.default.icon }),
                _react2.default.createElement(
                  'div',
                  { className: _style2.default.body },
                  _react2.default.createElement(
                    'p',
                    { className: _style2.default.date },
                    interval
                  ),
                  _react2.default.createElement(
                    'h3',
                    null,
                    title
                  ),
                  subtitle && _react2.default.createElement(
                    'h4',
                    null,
                    subtitle
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _style2.default.description },
                    children
                  )
                )
              );
            };
            });

            unwrapExports(build);
            var build_1 = build.Event;
            var build_2 = build.Timeline;

            [{
              startdate: new Date(2019, 1, 25, 13, 30, 0).getTime(),
              toolbox: ["Reactjs", "ReduxJS", "MongoDB"],
              testing: ["Cypressjs"],
              tag: "DiReact",
              title: "Text Chat App",
              description: "Peer to Peer text messaging",
              gitlink: "https://github.com/serdartkm/TextChatApp",
              codesandboxlink: "https://codesandbox.io/s/y2z9k7vvjg"
            }, {
              startdate: new Date(2018, 11, 29, 13, 30, 0).getTime(),
              toolbox: ["Reactjs", "ReduxJS", "MongoDB"],
              testing: ["Cypressjs"],
              tag: "DiMongodb",
              title: "Todo App",
              description: "Create, Read, Update, Delete tasks..",
              gitlink: "https://github.com/serdartkm/ToDoApp",
              codesandboxlink: "https://codesandbox.io/s/8z2y6zzvk0"
            }, {
              startdate: new Date(2018, 1, 8, 13, 30, 0).getTime(),
              toolbox: ["Reactjs"],
              testing: ["Cypressjs"],
              tag: "DiReact",
              title: "Sample CRUD",
              description: "Sample CRUD with React js",
              gitlink: "https://github.com/serdartkm/SampleCRUD",
              codesandboxlink: "https://codesandbox.io/s/81r0n6l112"
            }];

            var css$6 = ".vertical-timeline *{box-sizing:border-box}.vertical-timeline{width:95%;max-width:1170px;margin:2em auto;position:relative;padding:2em 0}.vertical-timeline::after{content:'';display:table;clear:both}.vertical-timeline::before{content:'';position:absolute;top:0;left:18px;height:100%;width:4px;background:#fff}@media only screen and (min-width:1170px){.vertical-timeline.vertical-timeline--two-columns{margin-top:3em;margin-bottom:3em;width:90%}.vertical-timeline.vertical-timeline--two-columns:before{left:50%;margin-left:-2px}}.vertical-timeline-element{position:relative;margin:2em 0}.vertical-timeline-element>div{min-height:1px}.vertical-timeline-element:after{content:\"\";display:table;clear:both}.vertical-timeline-element:first-child{margin-top:0}.vertical-timeline-element:last-child{margin-bottom:0}@media only screen and (min-width:1170px){.vertical-timeline-element{margin:4em 0}.vertical-timeline-element:first-child{margin-top:0}.vertical-timeline-element:last-child{margin-bottom:0}}.vertical-timeline-element-icon{position:absolute;top:0;left:0;width:40px;height:40px;border-radius:50%;box-shadow:0 0 0 4px #fff,inset 0 2px 0 rgba(0,0,0,.08),0 3px 0 4px rgba(0,0,0,.05)}.vertical-timeline-element-icon svg{display:block;width:24px;height:24px;position:relative;left:50%;top:50%;margin-left:-12px;margin-top:-12px}@media only screen and (min-width:1170px){.vertical-timeline--two-columns .vertical-timeline-element-icon{width:60px;height:60px;left:50%;margin-left:-30px}}.vertical-timeline-element-icon{-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden}.vertical-timeline--animate .vertical-timeline-element-icon.is-hidden{visibility:hidden}.vertical-timeline--animate .vertical-timeline-element-icon.bounce-in{visibility:visible;-webkit-animation:cd-bounce-1 .6s;-moz-animation:cd-bounce-1 .6s;animation:cd-bounce-1 .6s}@-webkit-keyframes cd-bounce-1{0%{opacity:0;-webkit-transform:scale(.5)}60%{opacity:1;-webkit-transform:scale(1.2)}100%{-webkit-transform:scale(1)}}@-moz-keyframes cd-bounce-1{0%{opacity:0;-moz-transform:scale(.5)}60%{opacity:1;-moz-transform:scale(1.2)}100%{-moz-transform:scale(1)}}@keyframes cd-bounce-1{0%{opacity:0;-webkit-transform:scale(.5);-moz-transform:scale(.5);-ms-transform:scale(.5);-o-transform:scale(.5);transform:scale(.5)}60%{opacity:1;-webkit-transform:scale(1.2);-moz-transform:scale(1.2);-ms-transform:scale(1.2);-o-transform:scale(1.2);transform:scale(1.2)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.vertical-timeline-element-content{position:relative;margin-left:60px;background:#fff;border-radius:.25em;padding:1em;box-shadow:0 3px 0 #ddd}.vertical-timeline-element--no-children .vertical-timeline-element-content{background:0 0;box-shadow:none}.vertical-timeline-element-content:after{content:\"\";display:table;clear:both}.vertical-timeline-element-content h2{color:#303e49}.vertical-timeline-element-content .vertical-timeline-element-date,.vertical-timeline-element-content p{font-size:13px;font-size:.8125rem;font-weight:500;color:#333}.vertical-timeline-element-content .vertical-timeline-element-date{display:inline-block}.vertical-timeline-element-content p{margin:1em 0 0;line-height:1.6}.vertical-timeline-element-title{margin:0}.vertical-timeline-element-subtitle{margin:0}.vertical-timeline-element-content .vertical-timeline-element-date{float:left;padding:.8em 0;opacity:.7}.vertical-timeline-element-content::before{content:'';position:absolute;top:16px;right:100%;height:0;width:0;border:7px solid transparent;border-right:7px solid #fff}.vertical-timeline-element--no-children .vertical-timeline-element-content::before{display:none}@media only screen and (min-width:768px){.vertical-timeline-element-content h2{font-size:20px;font-size:1.25rem}.vertical-timeline-element-content p{font-size:16px;font-size:1rem}.vertical-timeline-element-content .vertical-timeline-element-date{font-size:14px;font-size:.875rem}}@media only screen and (min-width:1170px){.vertical-timeline--two-columns .vertical-timeline-element-content{margin-left:0;padding:1.5em;width:44%}.vertical-timeline--two-columns .vertical-timeline-element-content::before{top:24px;left:100%;border-color:transparent;border-left-color:#fff}.vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date{position:absolute;width:100%;left:124%;top:6px;font-size:16px;font-size:1rem}.vertical-timeline--two-columns .vertical-timeline-element.vertical-timeline-element--right .vertical-timeline-element-content,.vertical-timeline--two-columns .vertical-timeline-element:nth-child(even):not(.vertical-timeline-element--left) .vertical-timeline-element-content{float:right}.vertical-timeline--two-columns .vertical-timeline-element.vertical-timeline-element--right .vertical-timeline-element-content::before,.vertical-timeline--two-columns .vertical-timeline-element:nth-child(even):not(.vertical-timeline-element--left) .vertical-timeline-element-content::before{top:24px;left:auto;right:100%;border-color:transparent;border-right-color:#fff}.vertical-timeline--two-columns .vertical-timeline-element.vertical-timeline-element--right .vertical-timeline-element-content .vertical-timeline-element-date,.vertical-timeline--two-columns .vertical-timeline-element:nth-child(even):not(.vertical-timeline-element--left) .vertical-timeline-element-content .vertical-timeline-element-date{left:auto;right:124%;text-align:right}}.vertical-timeline--animate .vertical-timeline-element-content.is-hidden{visibility:hidden}.vertical-timeline--animate .vertical-timeline-element-content.bounce-in{visibility:visible;-webkit-animation:cd-bounce-2 .6s;-moz-animation:cd-bounce-2 .6s;animation:cd-bounce-2 .6s}@media only screen and (min-width:1170px){.vertical-timeline--two-columns.vertical-timeline--animate .vertical-timeline-element.vertical-timeline-element--right .vertical-timeline-element-content.bounce-in,.vertical-timeline--two-columns.vertical-timeline--animate .vertical-timeline-element:nth-child(even):not(.vertical-timeline-element--left) .vertical-timeline-element-content.bounce-in{-webkit-animation:cd-bounce-2-inverse .6s;-moz-animation:cd-bounce-2-inverse .6s;animation:cd-bounce-2-inverse .6s}}@media only screen and (max-width:1169px){.vertical-timeline--animate .vertical-timeline-element-content.bounce-in{visibility:visible;-webkit-animation:cd-bounce-2-inverse .6s;-moz-animation:cd-bounce-2-inverse .6s;animation:cd-bounce-2-inverse .6s}}@-webkit-keyframes cd-bounce-2{0%{opacity:0;-webkit-transform:translateX(-100px)}60%{opacity:1;-webkit-transform:translateX(20px)}100%{-webkit-transform:translateX(0)}}@-moz-keyframes cd-bounce-2{0%{opacity:0;-moz-transform:translateX(-100px)}60%{opacity:1;-moz-transform:translateX(20px)}100%{-moz-transform:translateX(0)}}@keyframes cd-bounce-2{0%{opacity:0;-webkit-transform:translateX(-100px);-moz-transform:translateX(-100px);-ms-transform:translateX(-100px);-o-transform:translateX(-100px);transform:translateX(-100px)}60%{opacity:1;-webkit-transform:translateX(20px);-moz-transform:translateX(20px);-ms-transform:translateX(20px);-o-transform:translateX(20px);transform:translateX(20px)}100%{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes cd-bounce-2-inverse{0%{opacity:0;-webkit-transform:translateX(100px)}60%{opacity:1;-webkit-transform:translateX(-20px)}100%{-webkit-transform:translateX(0)}}@-moz-keyframes cd-bounce-2-inverse{0%{opacity:0;-moz-transform:translateX(100px)}60%{opacity:1;-moz-transform:translateX(-20px)}100%{-moz-transform:translateX(0)}}@keyframes cd-bounce-2-inverse{0%{opacity:0;-webkit-transform:translateX(100px);-moz-transform:translateX(100px);-ms-transform:translateX(100px);-o-transform:translateX(100px);transform:translateX(100px)}60%{opacity:1;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}100%{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}";
            styleInject(css$6);

            var css$7 = ".timeline--wrapper {\n  width: calc(100% - 24px);\n  padding: 12px;\n}\n.timeline {\n  width: 100%;\n  max-width: 800px;\n  padding: 15px 0 0  0;\n  position: relative;\n  /* box-shadow: 0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2); */\n  margin: 50px auto;\n}\n.timeline:before {\n  content: \"\";\n  position: absolute;\n  top: 0px;\n  left: calc(33% + 6px);\n  bottom: 0px;\n  width: 0px;\n  border: 2px solid;\n}\n.timeline:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n@media only screen and (max-width: 768px) {\n  /* For mobile phones: */\n  .timeline:before {\n    left: calc(1% + 6px);\n  }\n}\n";
            styleInject(css$7);

            var Timeline = /*#__PURE__*/Object.freeze({
                        default: css$7
            });

            getCjsExportFromNamespace(Timeline);

            var Timeline_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });



            var _react2 = _interopRequireDefault(React$1__default);



            var _propTypes2 = _interopRequireDefault(PropTypes);



            var _classnames2 = _interopRequireDefault(classnames);



            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var Timeline = function Timeline(_ref) {
              var animate = _ref.animate,
                  children = _ref.children,
                  className = _ref.className,
                  lineColor = _ref.lineColor;
              return _react2.default.createElement(
                'div',
                { className: 'timeline--wrapper' },
                _react2.default.createElement(
                  'div',
                  {
                    className: (0, _classnames2.default)(className, 'timeline', {
                      'timeline--animate': animate
                    }),
                    style: { color: '' + lineColor }
                  },
                  children
                )
              );
            };

            Timeline.propTypes = {
              children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
              className: _propTypes2.default.string,
              lineColor: _propTypes2.default.string,
              animate: _propTypes2.default.bool
            };

            Timeline.defaultProps = {
              animate: true,
              className: '',
              lineColor: '#000'
            };

            exports.default = Timeline;
            });

            unwrapExports(Timeline_1);

            var visibilitySensor = createCommonjsModule(function (module, exports) {
            (function webpackUniversalModuleDefinition(root, factory) {
            	module.exports = factory(React$1__default, ReactDOM);
            })(commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
            return /******/ (function(modules) { // webpackBootstrap
            /******/ 	// The module cache
            /******/ 	var installedModules = {};
            /******/
            /******/ 	// The require function
            /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId]) {
            /******/ 			return installedModules[moduleId].exports;
            /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
            /******/
            /******/
            /******/ 	// expose the modules object (__webpack_modules__)
            /******/ 	__webpack_require__.m = modules;
            /******/
            /******/ 	// expose the module cache
            /******/ 	__webpack_require__.c = installedModules;
            /******/
            /******/ 	// define getter function for harmony exports
            /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ 		}
            /******/ 	};
            /******/
            /******/ 	// define __esModule on exports
            /******/ 	__webpack_require__.r = function(exports) {
            /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ 		}
            /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 	};
            /******/
            /******/ 	// create a fake namespace object
            /******/ 	// mode & 1: value is a module id, require it
            /******/ 	// mode & 2: merge all properties of value into the ns
            /******/ 	// mode & 4: return value when already ns object
            /******/ 	// mode & 8|1: behave like require
            /******/ 	__webpack_require__.t = function(value, mode) {
            /******/ 		if(mode & 1) value = __webpack_require__(value);
            /******/ 		if(mode & 8) return value;
            /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/ 		var ns = Object.create(null);
            /******/ 		__webpack_require__.r(ns);
            /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
            /******/ 		return ns;
            /******/ 	};
            /******/
            /******/ 	// getDefaultExport function for compatibility with non-harmony modules
            /******/ 	__webpack_require__.n = function(module) {
            /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
            /******/
            /******/ 	// Object.prototype.hasOwnProperty.call
            /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
            /******/
            /******/ 	// __webpack_public_path__
            /******/ 	__webpack_require__.p = "";
            /******/
            /******/
            /******/ 	// Load entry module and return exports
            /******/ 	return __webpack_require__(__webpack_require__.s = 4);
            /******/ })
            /************************************************************************/
            /******/ ([
            /* 0 */
            /***/ (function(module, exports, __webpack_require__) {

            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            {
              // By explicitly using `prop-types` you are opting into new production behavior.
              // http://fb.me/prop-types-in-prod
              module.exports = __webpack_require__(5)();
            }


            /***/ }),
            /* 1 */
            /***/ (function(module, exports) {

            module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

            /***/ }),
            /* 2 */
            /***/ (function(module, exports) {

            module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

            /***/ }),
            /* 3 */
            /***/ (function(module, exports) {

            // Tell whether the rect is visible, given an offset
            //
            // return: boolean
            module.exports = function (offset, rect, containmentRect) {
              var offsetDir = offset.direction;
              var offsetVal = offset.value; // Rules for checking different kind of offsets. In example if the element is
              // 90px below viewport and offsetTop is 100, it is considered visible.

              switch (offsetDir) {
                case 'top':
                  return containmentRect.top + offsetVal < rect.top && containmentRect.bottom > rect.bottom && containmentRect.left < rect.left && containmentRect.right > rect.right;

                case 'left':
                  return containmentRect.left + offsetVal < rect.left && containmentRect.bottom > rect.bottom && containmentRect.top < rect.top && containmentRect.right > rect.right;

                case 'bottom':
                  return containmentRect.bottom - offsetVal > rect.bottom && containmentRect.left < rect.left && containmentRect.right > rect.right && containmentRect.top < rect.top;

                case 'right':
                  return containmentRect.right - offsetVal > rect.right && containmentRect.left < rect.left && containmentRect.top < rect.top && containmentRect.bottom > rect.bottom;
              }
            };

            /***/ }),
            /* 4 */
            /***/ (function(module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VisibilitySensor; });
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
            /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
            /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */ var _lib_is_visible_with_offset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
            /* harmony import */ var _lib_is_visible_with_offset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_is_visible_with_offset__WEBPACK_IMPORTED_MODULE_3__);


            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






            function normalizeRect(rect) {
              if (rect.width === undefined) {
                rect.width = rect.right - rect.left;
              }

              if (rect.height === undefined) {
                rect.height = rect.bottom - rect.top;
              }

              return rect;
            }

            var VisibilitySensor =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(VisibilitySensor, _React$Component);

              function VisibilitySensor(props) {
                var _this;

                _classCallCheck(this, VisibilitySensor);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(VisibilitySensor).call(this, props));

                _defineProperty(_assertThisInitialized(_this), "getContainer", function () {
                  return _this.props.containment || window;
                });

                _defineProperty(_assertThisInitialized(_this), "addEventListener", function (target, event, delay, throttle) {
                  if (!_this.debounceCheck) {
                    _this.debounceCheck = {};
                  }

                  var timeout;
                  var func;

                  var later = function later() {
                    timeout = null;

                    _this.check();
                  };

                  if (throttle > -1) {
                    func = function func() {
                      if (!timeout) {
                        timeout = setTimeout(later, throttle || 0);
                      }
                    };
                  } else {
                    func = function func() {
                      clearTimeout(timeout);
                      timeout = setTimeout(later, delay || 0);
                    };
                  }

                  var info = {
                    target: target,
                    fn: func,
                    getLastTimeout: function getLastTimeout() {
                      return timeout;
                    }
                  };
                  target.addEventListener(event, info.fn);
                  _this.debounceCheck[event] = info;
                });

                _defineProperty(_assertThisInitialized(_this), "startWatching", function () {
                  if (_this.debounceCheck || _this.interval) {
                    return;
                  }

                  if (_this.props.intervalCheck) {
                    _this.interval = setInterval(_this.check, _this.props.intervalDelay);
                  }

                  if (_this.props.scrollCheck) {
                    _this.addEventListener(_this.getContainer(), "scroll", _this.props.scrollDelay, _this.props.scrollThrottle);
                  }

                  if (_this.props.resizeCheck) {
                    _this.addEventListener(window, "resize", _this.props.resizeDelay, _this.props.resizeThrottle);
                  } // if dont need delayed call, check on load ( before the first interval fires )


                  !_this.props.delayedCall && _this.check();
                });

                _defineProperty(_assertThisInitialized(_this), "stopWatching", function () {
                  if (_this.debounceCheck) {
                    // clean up event listeners and their debounce callers
                    for (var debounceEvent in _this.debounceCheck) {
                      if (_this.debounceCheck.hasOwnProperty(debounceEvent)) {
                        var debounceInfo = _this.debounceCheck[debounceEvent];
                        clearTimeout(debounceInfo.getLastTimeout());
                        debounceInfo.target.removeEventListener(debounceEvent, debounceInfo.fn);
                        _this.debounceCheck[debounceEvent] = null;
                      }
                    }
                  }

                  _this.debounceCheck = null;

                  if (_this.interval) {
                    _this.interval = clearInterval(_this.interval);
                  }
                });

                _defineProperty(_assertThisInitialized(_this), "check", function () {
                  var el = _this.node;
                  var rect;
                  var containmentRect; // if the component has rendered to null, dont update visibility

                  if (!el) {
                    return _this.state;
                  }

                  rect = normalizeRect(_this.roundRectDown(el.getBoundingClientRect()));

                  if (_this.props.containment) {
                    var containmentDOMRect = _this.props.containment.getBoundingClientRect();

                    containmentRect = {
                      top: containmentDOMRect.top,
                      left: containmentDOMRect.left,
                      bottom: containmentDOMRect.bottom,
                      right: containmentDOMRect.right
                    };
                  } else {
                    containmentRect = {
                      top: 0,
                      left: 0,
                      bottom: window.innerHeight || document.documentElement.clientHeight,
                      right: window.innerWidth || document.documentElement.clientWidth
                    };
                  } // Check if visibility is wanted via offset?


                  var offset = _this.props.offset || {};
                  var hasValidOffset = _typeof(offset) === "object";

                  if (hasValidOffset) {
                    containmentRect.top += offset.top || 0;
                    containmentRect.left += offset.left || 0;
                    containmentRect.bottom -= offset.bottom || 0;
                    containmentRect.right -= offset.right || 0;
                  }

                  var visibilityRect = {
                    top: rect.top >= containmentRect.top,
                    left: rect.left >= containmentRect.left,
                    bottom: rect.bottom <= containmentRect.bottom,
                    right: rect.right <= containmentRect.right
                  }; // https://github.com/joshwnj/react-visibility-sensor/pull/114

                  var hasSize = rect.height > 0 && rect.width > 0;
                  var isVisible = hasSize && visibilityRect.top && visibilityRect.left && visibilityRect.bottom && visibilityRect.right; // check for partial visibility

                  if (hasSize && _this.props.partialVisibility) {
                    var partialVisible = rect.top <= containmentRect.bottom && rect.bottom >= containmentRect.top && rect.left <= containmentRect.right && rect.right >= containmentRect.left; // account for partial visibility on a single edge

                    if (typeof _this.props.partialVisibility === "string") {
                      partialVisible = visibilityRect[_this.props.partialVisibility];
                    } // if we have minimum top visibility set by props, lets check, if it meets the passed value
                    // so if for instance element is at least 200px in viewport, then show it.


                    isVisible = _this.props.minTopValue ? partialVisible && rect.top <= containmentRect.bottom - _this.props.minTopValue : partialVisible;
                  } // Deprecated options for calculating offset.


                  if (typeof offset.direction === "string" && typeof offset.value === "number") {
                    console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }", offset.direction, offset.value);
                    isVisible = _lib_is_visible_with_offset__WEBPACK_IMPORTED_MODULE_3___default()(offset, rect, containmentRect);
                  }

                  var state = _this.state; // notify the parent when the value changes

                  if (_this.state.isVisible !== isVisible) {
                    state = {
                      isVisible: isVisible,
                      visibilityRect: visibilityRect
                    };

                    _this.setState(state);

                    if (_this.props.onChange) _this.props.onChange(isVisible);
                  }

                  return state;
                });

                _this.state = {
                  isVisible: null,
                  visibilityRect: {}
                };
                return _this;
              }

              _createClass(VisibilitySensor, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  this.node = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);

                  if (this.props.active) {
                    this.startWatching();
                  }
                }
              }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  this.stopWatching();
                }
              }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate(prevProps) {
                  // re-register node in componentDidUpdate if children diffs [#103]
                  this.node = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);

                  if (this.props.active && !prevProps.active) {
                    this.setState({
                      isVisible: null,
                      visibilityRect: {}
                    });
                    this.startWatching();
                  } else if (!this.props.active) {
                    this.stopWatching();
                  }
                }
              }, {
                key: "roundRectDown",
                value: function roundRectDown(rect) {
                  return {
                    top: Math.floor(rect.top),
                    left: Math.floor(rect.left),
                    bottom: Math.floor(rect.bottom),
                    right: Math.floor(rect.right)
                  };
                }
                /**
                 * Check if the element is within the visible viewport
                 */

              }, {
                key: "render",
                value: function render() {
                  if (this.props.children instanceof Function) {
                    return this.props.children({
                      isVisible: this.state.isVisible,
                      visibilityRect: this.state.visibilityRect
                    });
                  }

                  return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(this.props.children);
                }
              }]);

              return VisibilitySensor;
            }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

            _defineProperty(VisibilitySensor, "defaultProps", {
              active: true,
              partialVisibility: false,
              minTopValue: 0,
              scrollCheck: false,
              scrollDelay: 250,
              scrollThrottle: -1,
              resizeCheck: false,
              resizeDelay: 250,
              resizeThrottle: -1,
              intervalCheck: true,
              intervalDelay: 100,
              delayedCall: false,
              offset: {},
              containment: null,
              children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
            });

            _defineProperty(VisibilitySensor, "propTypes", {
              onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
              active: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
              partialVisibility: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(["top", "right", "bottom", "left"])]),
              delayedCall: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
              offset: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
                top: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
                left: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
                bottom: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
                right: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
              }), // deprecated offset property
              prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
                direction: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(["top", "right", "bottom", "left"]),
                value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
              })]),
              scrollCheck: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
              scrollDelay: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
              scrollThrottle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
              resizeCheck: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
              resizeDelay: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
              resizeThrottle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
              intervalCheck: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
              intervalDelay: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
              containment: typeof window !== "undefined" ? prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.instanceOf(window.Element) : prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any,
              children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func]),
              minTopValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
            });



            /***/ }),
            /* 5 */
            /***/ (function(module, exports, __webpack_require__) {
            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */



            var ReactPropTypesSecret = __webpack_require__(6);

            function emptyFunction() {}
            function emptyFunctionWithReset() {}
            emptyFunctionWithReset.resetWarningCache = emptyFunction;

            module.exports = function() {
              function shim(props, propName, componentName, location, propFullName, secret) {
                if (secret === ReactPropTypesSecret) {
                  // It is still safe when called from React.
                  return;
                }
                var err = new Error(
                  'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                  'Use PropTypes.checkPropTypes() to call them. ' +
                  'Read more at http://fb.me/use-check-prop-types'
                );
                err.name = 'Invariant Violation';
                throw err;
              }  shim.isRequired = shim;
              function getShim() {
                return shim;
              }  // Important!
              // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
              var ReactPropTypes = {
                array: shim,
                bool: shim,
                func: shim,
                number: shim,
                object: shim,
                string: shim,
                symbol: shim,

                any: shim,
                arrayOf: getShim,
                element: shim,
                elementType: shim,
                instanceOf: getShim,
                node: shim,
                objectOf: getShim,
                oneOf: getShim,
                oneOfType: getShim,
                shape: getShim,
                exact: getShim,

                checkPropTypes: emptyFunctionWithReset,
                resetWarningCache: emptyFunction
              };

              ReactPropTypes.PropTypes = ReactPropTypes;

              return ReactPropTypes;
            };


            /***/ }),
            /* 6 */
            /***/ (function(module, exports, __webpack_require__) {
            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */



            var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

            module.exports = ReactPropTypesSecret;


            /***/ })
            /******/ ]);
            });
            });

            unwrapExports(visibilitySensor);

            var css$8 = ".body-container {\n  position: relative;\n  margin-left: 30px;\n}\n.timeline-item--no-children .body-container {\n  background: transparent;\n  box-shadow: none;\n}\n.body-container:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.timeline-item-date {\n  position: absolute;\n  top: -12px;\n  left: 0;\n  background: #ddd;\n  padding: 1px;\n  -webkit-clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);\n  clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);\n  height: 52px;  \n  box-sizing: border-box;\n  width: 90%;\n}\n.timeline-item-dateinner {\n  background: #e86971;\n  color: #fff;\n  padding: 0;\n  font-size: 16px;\n  font-weight: bold;\n  margin: 0;\n  border-right-color: transparent;\n  -webkit-clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);\n  clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);\n  height: 50px;\n  width: 100%;\n  display: block;\n  line-height: 52px;\n  text-indent: 15px;\n}\n\n.timeline-item--no-children .body-container::before {\n  display: none;\n}\n.entry {\n  clear: both;\n  text-align: left;\n  position: relative;\n}\n.timeline--animate .entry .is-hidden {\n  visibility: hidden;\n}\n.timeline--animate .entry .bounce-in {\n  visibility: visible;\n  -webkit-animation: bounce-in 0.4s;\n  -moz-animation: bounce-in 0.4s;\n  animation: bounce-in 0.4s;\n}\n.entry .title {\n  margin-bottom: 0.5em;\n  float: left;\n  width: 34%;\n  position: relative;\n  height: 32px;\n}\n.entry .title:before {\n  content: \"\";\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  border: 4px solid;\n  background-color: #ffffff;\n  border-radius: 100%;\n  top: 15%;\n  right: -8px;\n  z-index: 99;\n  box-sizing: content-box;\n}\n.entry .body {\n  margin: 0 0 3em;\n  float: right;\n  width: 66%;\n  color: #333;\n}\n.entry .body p {\n  line-height: 1.4em;\n}\n.entry .body h1, .entry .body h2, .entry .body h3, .entry .body h4, .entry .body h5, .entry .body h6 {\n  margin: 0;\n}\n.entry .body p:first-child {\n  margin-top: 0;\n  font-weight: 400;\n}\n@-o-keyframes bounce-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n  }\n}\n\n@-webkit-keyframes bounce-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n  }\n}\n@-moz-keyframes bounce-in {\n  0% {\n    opacity: 0;\n    -moz-transform: scale(0.5);\n  }\n\n  100% {\n    -moz-transform: scale(1);\n  }\n}\n@keyframes bounce-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    -moz-transform: scale(0.5);\n    -ms-transform: scale(0.5);\n    -o-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  /* For mobile phones: */\n  .entry .title {\n    float: left;\n    width: 70%;\n  }\n  .timeline-item-date {\n    margin-left: 30px;\n  }\n  .entry .title:before {\n    top: 15%;\n    left: 3px;\n    right: auto;\n    z-index: 99;\n  }\n  .entry .body {\n    margin: 20px 0 3em;\n    float: right;\n    width: 99%;\n  }\n}\n";
            styleInject(css$8);

            var TimelineItem = /*#__PURE__*/Object.freeze({
                        default: css$8
            });

            getCjsExportFromNamespace(TimelineItem);

            var TimelineItem_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



            var _react2 = _interopRequireDefault(React$1__default);



            var _propTypes2 = _interopRequireDefault(PropTypes);



            var _classnames2 = _interopRequireDefault(classnames);



            var _reactVisibilitySensor2 = _interopRequireDefault(visibilitySensor);



            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

            var TimelineItem = function (_Component) {
              _inherits(TimelineItem, _Component);

              function TimelineItem(props) {
                _classCallCheck(this, TimelineItem);

                var _this = _possibleConstructorReturn(this, (TimelineItem.__proto__ || Object.getPrototypeOf(TimelineItem)).call(this, props));

                _this.onVisibilitySensorChange = _this.onVisibilitySensorChange.bind(_this);
                _this.state = { visible: false };
                return _this;
              }

              _createClass(TimelineItem, [{
                key: 'onVisibilitySensorChange',
                value: function onVisibilitySensorChange(isVisible) {
                  if (isVisible) {
                    this.setState({ visible: true });
                  }
                }
              }, {
                key: 'render',
                value: function render() {
                  var _props = this.props,
                      id = _props.id,
                      children = _props.children,
                      dateText = _props.dateText,
                      dateStyle = _props.dateStyle,
                      dateComponent = _props.dateComponent,
                      dateInnerStyle = _props.dateInnerStyle,
                      bodyContainerStyle = _props.bodyContainerStyle,
                      style = _props.style,
                      className = _props.className,
                      visibilitySensorProps = _props.visibilitySensorProps;
                  var visible = this.state.visible;

                  return _react2.default.createElement(
                    'div',
                    {
                      id: id,
                      className: (0, _classnames2.default)(className, 'entry', {
                        'timeline-item--no-children': children === ''
                      }),
                      style: style
                    },
                    _react2.default.createElement(
                      _reactVisibilitySensor2.default,
                      _extends({}, visibilitySensorProps, {
                        onChange: this.onVisibilitySensorChange
                      }),
                      _react2.default.createElement(
                        React$1__default.Fragment,
                        null,
                        _react2.default.createElement(
                          'div',
                          { className: 'title' },
                          _react2.default.createElement(
                            'div',
                            { className: '' + (visible ? 'bounce-in' : 'is-hidden') },
                            dateComponent !== null ? dateComponent : _react2.default.createElement(
                              'span',
                              { style: dateStyle, className: 'timeline-item-date' },
                              _react2.default.createElement(
                                'time',
                                {
                                  style: dateInnerStyle,
                                  className: 'timeline-item-dateinner',
                                  title: dateText
                                },
                                dateText
                              )
                            )
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'body' },
                          _react2.default.createElement(
                            'div',
                            {
                              className: 'body-container ' + (visible ? 'bounce-in' : 'is-hidden'),
                              style: bodyContainerStyle
                            },
                            children
                          )
                        )
                      )
                    )
                  );
                }
              }]);

              return TimelineItem;
            }(React$1__default.Component);

            TimelineItem.propTypes = {
              id: _propTypes2.default.string,
              children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
              className: _propTypes2.default.string,
              dateStyle: _propTypes2.default.shape({}),
              dateInnerStyle: _propTypes2.default.shape({}),
              bodyContainerStyle: _propTypes2.default.shape({}),
              style: _propTypes2.default.shape({}),
              dateText: _propTypes2.default.string,
              dateComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.node]),
              visibilitySensorProps: _propTypes2.default.shape({})
            };

            TimelineItem.defaultProps = {
              id: '',
              children: '',
              dateComponent: null,
              className: '',
              dateStyle: null,
              bodyContainerStyle: null,
              dateInnerStyle: null,
              style: null,
              dateText: '',
              visibilitySensorProps: { partialVisibility: true, offset: { bottom: 50 } }
            };

            exports.default = TimelineItem;
            });

            unwrapExports(TimelineItem_1);

            var dist = {
              Timeline: Timeline_1.default, // eslint-disable-line global-require
              TimelineItem: TimelineItem_1.default // eslint-disable-line global-require
            };
            var dist_1 = dist.Timeline;
            var dist_2 = dist.TimelineItem;

            var AboutMe =
            /*#__PURE__*/
            function (_Component) {
              _inherits(AboutMe, _Component);

              function AboutMe() {
                _classCallCheck(this, AboutMe);

                return _possibleConstructorReturn(this, _getPrototypeOf(AboutMe).apply(this, arguments));
              }

              _createClass(AboutMe, [{
                key: "render",
                value: function render() {
                  return React$1__default.createElement("div", null, "About Me", React$1__default.createElement(dist_1, {
                    lineColor: '#ddd'
                  }, React$1__default.createElement(dist_2, {
                    key: "001",
                    dateText: "September 25, 2018",
                    style: {
                      color: '#e86971'
                    }
                  }, React$1__default.createElement("h3", {
                    className: "vertical-timeline-element-title"
                  }, "MongoDB for Node.js Developers"), React$1__default.createElement("h4", {
                    className: "vertical-timeline-element-subtitle"
                  }, "MongoDB University"), React$1__default.createElement("p", null, "MongoDB for Node.js Developers Course Completion"), React$1__default.createElement("a", {
                    target: "_blank",
                    className: "btn btn-primary",
                    href: "http://university.mongodb.com/course_completion/b1ff6663-8c16-410b-8deb-aed20fbe",
                    variant: "outline-primary"
                  }, "  View Certificate")), React$1__default.createElement(dist_2, {
                    key: "002",
                    dateText: " Nov 21, 2017",
                    style: {
                      color: '#e86971'
                    }
                  }, React$1__default.createElement("h3", {
                    className: "vertical-timeline-element-title"
                  }, "MongoDB Basics"), React$1__default.createElement("h4", {
                    className: "vertical-timeline-element-subtitle"
                  }, "MongoDB University"), React$1__default.createElement("p", null, "MongoDB Basics Course Completion"), React$1__default.createElement("a", {
                    target: "_blank",
                    className: "btn btn-primary",
                    href: "http://university.mongodb.com/course_completion/b7e390a6-1591-4c54-b4bd-f6a92e7b",
                    variant: "outline-primary"
                  }, "  View Certificate")), React$1__default.createElement(dist_2, {
                    key: "003",
                    dateText: "October 20, 2017",
                    style: {
                      color: '#e86971'
                    }
                  }, React$1__default.createElement("h3", {
                    className: "vertical-timeline-element-title"
                  }, "Front End Development"), React$1__default.createElement("h4", {
                    className: "vertical-timeline-element-subtitle"
                  }, "freeCodeCamp's"), React$1__default.createElement("p", null, "Certification, representing approximately 400 hours of coursework"), React$1__default.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between"
                    }
                  }, React$1__default.createElement("a", {
                    target: "_blank",
                    className: "btn btn-primary",
                    href: "https://www.freecodecamp.org/certification/serdartkm/legacy-front-end",
                    variant: "outline-primary"
                  }, "  View Certificate"), React$1__default.createElement("a", {
                    target: "_blank",
                    className: "btn btn-primary",
                    href: "https://www.freecodecamp.org/serdartkm",
                    variant: "outline-primary"
                  }, "  See Timeline")))));
                }
              }]);

              return AboutMe;
            }(React$1.Component);

            var VerticalTimeline_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });



            var _react2 = _interopRequireDefault(React$1__default);



            var _propTypes2 = _interopRequireDefault(PropTypes);



            var _classnames2 = _interopRequireDefault(classnames);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var VerticalTimeline = function VerticalTimeline(_ref) {
              var animate = _ref.animate,
                  children = _ref.children,
                  className = _ref.className,
                  layout = _ref.layout;
              return _react2.default.createElement(
                'div',
                {
                  className: (0, _classnames2.default)(className, 'vertical-timeline', {
                    'vertical-timeline--animate': animate,
                    'vertical-timeline--two-columns': layout === '2-columns',
                    'vertical-timeline--one-column': layout === '1-column'
                  })
                },
                children
              );
            };

            VerticalTimeline.propTypes = {
              children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
              className: _propTypes2.default.string,
              animate: _propTypes2.default.bool,
              layout: _propTypes2.default.oneOf(['1-column', '2-columns'])
            };

            VerticalTimeline.defaultProps = {
              animate: true,
              className: '',
              layout: '2-columns'
            };

            exports.default = VerticalTimeline;
            });

            unwrapExports(VerticalTimeline_1);

            var VerticalTimelineElement_1 = createCommonjsModule(function (module, exports) {

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



            var _react2 = _interopRequireDefault(React$1__default);



            var _propTypes2 = _interopRequireDefault(PropTypes);



            var _classnames2 = _interopRequireDefault(classnames);



            var _reactVisibilitySensor2 = _interopRequireDefault(visibilitySensor);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

            var VerticalTimelineElement = function (_Component) {
              _inherits(VerticalTimelineElement, _Component);

              function VerticalTimelineElement(props) {
                _classCallCheck(this, VerticalTimelineElement);

                var _this = _possibleConstructorReturn(this, (VerticalTimelineElement.__proto__ || Object.getPrototypeOf(VerticalTimelineElement)).call(this, props));

                _this.onVisibilitySensorChange = _this.onVisibilitySensorChange.bind(_this);
                _this.state = { visible: false };
                return _this;
              }

              _createClass(VerticalTimelineElement, [{
                key: 'onVisibilitySensorChange',
                value: function onVisibilitySensorChange(isVisible) {
                  if (isVisible) {
                    this.setState({ visible: true });
                  }
                }
              }, {
                key: 'render',
                value: function render() {
                  var _props = this.props,
                      id = _props.id,
                      children = _props.children,
                      icon = _props.icon,
                      iconStyle = _props.iconStyle,
                      iconOnClick = _props.iconOnClick,
                      date = _props.date,
                      position = _props.position,
                      style = _props.style,
                      className = _props.className,
                      visibilitySensorProps = _props.visibilitySensorProps;
                  var visible = this.state.visible;


                  return _react2.default.createElement(
                    'div',
                    {
                      id: id,
                      className: (0, _classnames2.default)(className, 'vertical-timeline-element', {
                        'vertical-timeline-element--left': position === 'left',
                        'vertical-timeline-element--right': position === 'right',
                        'vertical-timeline-element--no-children': children === ''
                      }),
                      style: style
                    },
                    _react2.default.createElement(
                      _reactVisibilitySensor2.default,
                      _extends({}, visibilitySensorProps, {
                        onChange: this.onVisibilitySensorChange
                      }),
                      _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                          'span',
                          { // eslint-disable-line jsx-a11y/no-static-element-interactions
                            style: iconStyle,
                            onClick: iconOnClick,
                            className: 'vertical-timeline-element-icon ' + (visible ? 'bounce-in' : 'is-hidden')
                          },
                          icon
                        ),
                        _react2.default.createElement(
                          'div',
                          {
                            className: 'vertical-timeline-element-content ' + (visible ? 'bounce-in' : 'is-hidden')
                          },
                          children,
                          _react2.default.createElement(
                            'span',
                            { className: 'vertical-timeline-element-date' },
                            date
                          )
                        )
                      )
                    )
                  );
                }
              }]);

              return VerticalTimelineElement;
            }(React$1__default.Component);

            VerticalTimelineElement.propTypes = {
              id: _propTypes2.default.string,
              children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
              className: _propTypes2.default.string,
              icon: _propTypes2.default.element,
              iconStyle: _propTypes2.default.shape({}),
              iconOnClick: _propTypes2.default.func,
              style: _propTypes2.default.shape({}),
              date: _propTypes2.default.node,
              position: _propTypes2.default.string,
              visibilitySensorProps: _propTypes2.default.shape({})
            };

            VerticalTimelineElement.defaultProps = {
              id: '',
              children: '',
              className: '',
              icon: null,
              iconStyle: null,
              style: null,
              date: '',
              position: '',
              iconOnClick: null,
              visibilitySensorProps: { partialVisibility: true, offset: { bottom: 80 } }
            };

            exports.default = VerticalTimelineElement;
            });

            unwrapExports(VerticalTimelineElement_1);

            // this should be the entry point to your library
            var distEs6 = {
              VerticalTimeline: VerticalTimeline_1.default, // eslint-disable-line global-require
              VerticalTimelineElement: VerticalTimelineElement_1.default // eslint-disable-line global-require
            };
            var distEs6_1 = distEs6.VerticalTimeline;
            var distEs6_2 = distEs6.VerticalTimelineElement;

            // THIS FILE IS AUTO GENERATED

            var IconColor = function IconColor(_ref2) {
              var icon = _ref2.icon;

              switch (icon) {
                case "DiReact":
                  return "#00bcd4";

                case "DiMongodb":
                  return "#4caf50";

                case "DiJavascript1":
                  return "#f9a825";

                default:
                  return "#29b6f6";
              }
            };

            var TimeLine = function TimeLine(_ref3) {
              var data = _ref3.data;
              return React$1__default.createElement("div", null, React$1__default.createElement(distEs6_1, null, data.sort(function (a, b) {
                return new Date(b.startdate) - new Date(a.startdate);
              }).map(function (c, i) {
                var tools = c.toolbox.map(function (r) {
                  return r;
                });
                var testing = c.testing.map(function (t) {
                  return t;
                });
                return React$1__default.createElement(distEs6_2, {
                  key: i,
                  date: c.workingon ? new Date(c.startdate).toLocaleDateString() + " working on " : new Date(c.startdate).toLocaleDateString(),
                  iconStyle: {
                    background: IconColor({
                      icon: c.tag
                    }),
                    color: "#fafafa"
                  },
                  icon: React$1__default.createElement("img", {
                    src: "./icons/".concat(c.tag, ".png"),
                    className: "rounded",
                    style: {
                      width: 80,
                      height: 80
                    }
                  })
                }, React$1__default.createElement("h3", {
                  className: "vertical-timeline-element-title"
                }, c.title), React$1__default.createElement("p", {
                  className: "vertical-timeline-element-subtitle"
                }, "DEV TOOLS USED: ", ' ', " ", tools.join(', ')), React$1__default.createElement("p", {
                  className: "vertical-timeline-element-subtitle"
                }, "TEST TOOLS USED: ", ' ', " Cypress.io"), React$1__default.createElement("p", {
                  className: "vertical-timeline-element-subtitle"
                }, "CI/CD : ", ' ', " Travice CI"), React$1__default.createElement("p", null, "DESCRIPTION: ", c.description), React$1__default.createElement("br", null), React$1__default.createElement("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between"
                  }
                }, c.gitlink && React$1__default.createElement(Link, {
                  className: "btn btn-primary",
                  target: "_blank",
                  to: c.gitlink
                }, " View Source Code"), React$1__default.createElement(Link, {
                  className: "btn btn-primary",
                  to: c.codesandboxlink
                }, "View Demo")));
              })));
            };

            var data$1 = [{
              startdate: new Date(2019, 8, 10, 13, 30, 0).getTime(),
              toolbox: ["Reactjs", "SocketIO", "Expressjs", "MongoDB"],
              testing: ["Cypressjs"],
              tag: "socketio",
              title: "SocketIO Text Messaging Module",
              description: "Reusable Text messaging module.",
              gitlink: "https://github.com/serdartkm/authjs",
              codesandboxlink: "/socketmessaging"
            }, {
              startdate: new Date(2019, 8, 20, 13, 30, 0).getTime(),
              toolbox: ["Reactjs", "SocketIO", "Expressjs", "MongoDB", "WebRTC"],
              testing: ["Cypressjs"],
              tag: "webrtc",
              title: "WebRTC Text Messaging Module",
              description: "Reusable Text messaging module.",
              gitlink: "https://github.com/serdartkm/authjs",
              codesandboxlink: "/webrtcmessaging"
            }, {
              startdate: new Date(2019, 8, 25, 13, 30, 0).getTime(),
              toolbox: ["Reactjs", "SocketIO", "Expressjs", "MongoDB", "WebRTC"],
              testing: ["Cypressjs"],
              tag: "webrtc",
              title: "WebRTC Video Chat Module",
              description: "Reusable P2P videochat module.",
              gitlink: "",
              codesandboxlink: "/webrtcvideochat"
            }, {
              startdate: new Date(2019, 9, 10, 13, 30, 0).getTime(),
              workingon: true,
              toolbox: ["Reactjs", "SocketIO", "Expressjs", "MongoDB", "WebRTC"],
              testing: ["Cypressjs"],
              tag: "webrtc",
              title: "WebRTC File share Module",
              description: "Reusable P2P file share module.",
              gitlink: "",
              codesandboxlink: "/webrtcfileshare"
              /*
              {startdate : new Date(2019, 9, 11, 13, 30, 0).getTime(),
                  workingon:true,
                  toolbox:["Reactjs","SocketIO","Expressjs","MongoDB","WebRTC"],
                  testing:["Cypressjs"],
                  tag:"DiReact",
                  title:"GPS location sharing Module",
                  description:"Reusable P2P GPS location sharing module.",
                  gitlink:"https://github.com/serdartkm/authjs",
                  codesandboxlink:"/webrtcvideochat",
              
              },
              ,
              {startdate : new Date(2019, 9, 11, 13, 30, 0).getTime(),
                  workingon:true,
                  toolbox:["Reactjs","SocketIO","Expressjs","MongoDB","WebRTC"],
                  testing:["Cypressjs"],
                  tag:"DiReact",
                  title:"Video Chat with modified video Module",
                  description:"Reusable P2P video chat with modified face  module.",
                  gitlink:"https://github.com/serdartkm/authjs",
                  codesandboxlink:"/webrtcvideochat",
              
              },
              ,
              {startdate : new Date(2019, 9, 11, 13, 30, 0).getTime(),
                  workingon:true,
                  toolbox:["Reactjs","SocketIO","Expressjs","MongoDB","WebRTC"],
                  testing:["Cypressjs"],
                  tag:"DiReact",
                  title:"Share Drawing desk Module",
                  description:"Reusable P2P  Drawing desk  module.",
                  gitlink:"https://github.com/serdartkm/authjs",
                  codesandboxlink:"/webrtcvideochat",
              
              }
              ,
              {startdate : new Date(2019, 9, 13, 13, 30, 0).getTime(),
                  workingon:true,
                  toolbox:["Reactjs","SocketIO","Expressjs","MongoDB","WebRTC"],
                  testing:["Cypressjs"],
                  tag:"DiReact",
                  title:"Photo sharing Module",
                  description:"Reusable P2P Photo sharing  module.",
                  gitlink:"https://github.com/serdartkm/authjs",
                  codesandboxlink:"/webrtcvideochat",
              
              }
              */

            }];

            var Modules = function Modules() {
              return React$1__default.createElement("div", null, "Modules", React$1__default.createElement(TimeLine, {
                data: data$1
              }));
            };

            var Projects = function Projects() {
              return React$1__default.createElement("div", null, "Projects");
            };

            var App$1 = function App() {
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
                path: "/socketmessaging",
                component: SocketMessagingDemo
              }), React$1__default.createElement(Route, {
                path: "/webrtcmessaging",
                component: WebRTCMessagingDemo
              }), React$1__default.createElement(Route, {
                path: "/webrtcvideochat",
                component: DemoView
              }), React$1__default.createElement(Route, {
                path: "/webrtcfileshare",
                component: WebRTCFileShareDemo
              }), React$1__default.createElement(Route, {
                path: "/certification",
                component: AboutMe
              }), React$1__default.createElement(Route, {
                path: "/modules",
                component: Modules
              }), React$1__default.createElement(Route, {
                path: "/projects",
                component: Projects
              }), React$1__default.createElement(Route, {
                path: "/resetpass/:username/:token",
                component: ResetPassword
              })));
            };

            ReactDOM.render(React$1__default.createElement("div", null, React$1__default.createElement(EmailPasswordProvider, null, React$1__default.createElement(App$1, null))), document.getElementById('root'));

}(React, ReactDOM, PropTypes));