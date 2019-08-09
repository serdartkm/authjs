
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (React, ReactDOM, PropTypes) {
            'use strict';

            var React__default = 'default' in React ? React['default'] : React;
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
              }(React.Component);

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
              }(React.Component);

              Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = PropTypes.object, _Consumer$contextType);
              return {
                Provider: Provider,
                Consumer: Consumer
              };
            }

            var index = React__default.createContext || createReactContext;

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
                return React__default.createElement(context.Provider, {
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
            }(React__default.Component);

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
                return React__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return MemoryRouter;
            }(React__default.Component);

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
            }(React__default.Component);

            /**
             * The public API for prompting the user before navigating away from a screen.
             */

            function Prompt(_ref) {
              var message = _ref.message,
                  _ref$when = _ref.when,
                  when = _ref$when === void 0 ? true : _ref$when;
              return React__default.createElement(context.Consumer, null, function (context$$1) {
                !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Prompt> outside a <Router>") : invariant(false) : void 0;
                if (!when || context$$1.staticContext) return null;
                var method = context$$1.history.block;
                return React__default.createElement(Lifecycle, {
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
              return React__default.createElement(context.Consumer, null, function (context$$1) {
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

                return React__default.createElement(Lifecycle, {
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
              return React__default.Children.count(children) === 0;
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

                return React__default.createElement(context.Consumer, null, function (context$$1) {
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

                  return React__default.createElement(context.Provider, {
                    value: props
                  }, children && !isEmptyChildren(children) ? children : props.match ? component ? React__default.createElement(component, props) : render ? render(props) : null : null);
                });
              };

              return Route;
            }(React__default.Component);

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
                return React__default.createElement(Router, _extends({}, rest, {
                  history: history,
                  staticContext: context
                }));
              };

              return StaticRouter;
            }(React__default.Component);

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

                return React__default.createElement(context.Consumer, null, function (context$$1) {
                  !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Switch> outside a <Router>") : invariant(false) : void 0;
                  var location = _this.props.location || context$$1.location;
                  var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
                  // here because toArray adds keys to all child elements and we do not want
                  // to trigger an unmount/remount for two <Route>s that render the same
                  // component at different URLs.

                  React__default.Children.forEach(_this.props.children, function (child) {
                    if (match == null && React__default.isValidElement(child)) {
                      element = child;
                      var path = child.props.path || child.props.from;
                      match = path ? matchPath(location.pathname, _extends({}, child.props, {
                        path: path
                      })) : context$$1.match;
                    }
                  });
                  return match ? React__default.cloneElement(element, {
                    location: location,
                    computedMatch: match
                  }) : null;
                });
              };

              return Switch;
            }(React__default.Component);

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
                return React__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return BrowserRouter;
            }(React__default.Component);

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
                return React__default.createElement(Router, {
                  history: this.history,
                  children: this.props.children
                });
              };

              return HashRouter;
            }(React__default.Component);

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


                return React__default.createElement(context.Consumer, null, function (context$$1) {
                  !context$$1 ? process.env.NODE_ENV !== "production" ? invariant(false, "You should not use <Link> outside a <Router>") : invariant(false) : void 0;
                  var location = typeof to === "string" ? createLocation(to, null, null, context$$1.location) : to;
                  var href = location ? context$$1.history.createHref(location) : "";
                  return React__default.createElement("a", _extends({}, rest, {
                    onClick: function onClick(event) {
                      return _this.handleClick(event, context$$1.history);
                    },
                    href: href,
                    ref: innerRef
                  }));
                });
              };

              return Link;
            }(React__default.Component);

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
              return React__default.createElement(context.Consumer, null, function (context$$1) {
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
                return React__default.createElement(Link, _extends({
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

            var credentialValidation = function credentialValidation(_ref) {
              var email = _ref.email,
                  password = _ref.password;
              var em = emailRegex.test(email) ? {
                isValid: true
              } : {
                isValid: false,
                message: emailRequirements
              };
              var pass = passwordRegex.test(password) ? {
                isValid: true
              } : {
                isValid: false,
                message: passportRequirements
              };
              return {
                email: em,
                password: pass
              };
            };

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

            var EmailPasswordContext = React__default.createContext();
            var initValidation = {
              email: {
                isValid: true,
                message: ""
              },
              password: {
                isValid: true,
                message: ""
              }
            };

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
                  validation: initValidation
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
                    validation: initValidation
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "recoverPassword", function () {
                  var email = _this.state.email;
                  var validationResult = credentialValidation({
                    email: email
                  });

                  _this.setState({
                    validation: _objectSpread2({}, validationResult)
                  });

                  if (!validationResult.email.isValid) {
                    return;
                  }

                  _this.setState({
                    loading: true
                  });

                  return axios$1.post('/recover', {
                    email: email
                  }).then(function (response) {
                    var data = response.data;

                    if (data.validation.email.isValid) {
                      _this.setState({
                        validation: _objectSpread2({}, data.validation)
                      });
                    }
                  })["catch"](function (error) {
                    _this.setState({
                      serverError: error
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "resetPassword", function () {
                  var _this$state = _this.state,
                      password = _this$state.password,
                      token = _this$state.token;
                  var validationResult = credentialValidation({
                    password: password
                  });

                  _this.setState({
                    validation: _objectSpread2({}, validationResult)
                  });

                  if (!validationResult.password.isValid) {
                    return;
                  }

                  _this.setState({
                    loading: true
                  });

                  return axios$1.post('/change', {
                    password: password,
                    token: token
                  }).then(function (response) {
                    var data = response.data;

                    _this.setState({
                      message: data
                    });
                  })["catch"](function (error) {
                    _this.setState({
                      serverError: error
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "signup", function () {
                  var _this$state2 = _this.state,
                      email = _this$state2.email,
                      password = _this$state2.password;
                  var validationResult = credentialValidation({
                    email: email,
                    password: password
                  });

                  _this.setState({
                    validation: _objectSpread2({}, validationResult)
                  }); //Client side validation


                  if (!validationResult.email.isValid | !validationResult.password.isValid) {
                    return;
                  }

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
                        validation: _objectSpread2({}, data.validation)
                      });

                      return;
                    }

                    _this.setState({
                      isLoggedIn: true
                    });

                    _this.setToken(data.token); // Setting the token in localStorage

                  })["catch"](function (error) {
                    _this.setState({
                      serverError: error
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "login", function () {
                  var _this$state3 = _this.state,
                      email = _this$state3.email,
                      password = _this$state3.password;
                  var validationResult = credentialValidation({
                    email: email,
                    password: password
                  });

                  _this.setState({
                    validation: _objectSpread2({}, validationResult)
                  }); //Client side validation


                  if (!validationResult.email.isValid | !validationResult.password.isValid) {
                    return;
                  } // Get a token from api server using the fetch api


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
                        validation: _objectSpread2({}, data.validation)
                      });

                      return;
                    }

                    _this.setState({
                      isLoggedIn: true
                    });

                    _this.setToken(data.token); // Setting the token in localStorage

                  })["catch"](function (error) {
                    _this.setState({
                      serverError: error
                    });
                  });
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
                  return React__default.createElement(EmailPasswordContext.Provider, {
                    value: {
                      login: this.login,
                      isLoggedIn: isLoggedIn,
                      loggedIn: this.loggedIn,
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
                  }, React__default.createElement("div", null, children));
                }
              }]);

              return EmailPasswordProvider;
            }(React__default.Component);

            var UserAdminContext = React__default.createContext();

            var UserAdministration =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(UserAdministration, _React$Component);

              function UserAdministration() {
                var _getPrototypeOf2;

                var _this;

                _classCallCheck(this, UserAdministration);

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UserAdministration)).call.apply(_getPrototypeOf2, [this].concat(args)));

                _defineProperty(_assertThisInitialized(_this), "state", {
                  users: []
                });

                _defineProperty(_assertThisInitialized(_this), "getUsers", function () {
                  return _this.fetch("/users", {
                    method: "GET"
                  }).then(function (res) {
                    console.log("res---", res);

                    _this.setState({
                      users: res.users
                    });

                    return Promise.resolve(res);
                  })["catch"](function (error) {
                    console.log("error login---....", error);

                    _this.setState({
                      serverError: error
                    });
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "findUser", function (id) {});

                _defineProperty(_assertThisInitialized(_this), "updateUser", function () {});

                _defineProperty(_assertThisInitialized(_this), "deleteUser", function (id) {});

                _defineProperty(_assertThisInitialized(_this), "fetch", function (url, options) {
                  // performs api calls sending the required authentication headers
                  var headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  }; // Setting Authorization header
                  // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

                  return fetch(url, _objectSpread2({
                    headers: headers
                  }, options)).then(_this._checkStatus).then(function (response) {
                    return response.json();
                  });
                });

                _defineProperty(_assertThisInitialized(_this), "_checkStatus", function (response) {
                  _this.setState({
                    loading: false
                  }); // raises an error in case response status is not a success


                  if (response.status >= 200 && response.status < 300) {
                    // Success status lies between 200 to 300
                    return response;
                  } else {
                    var error = new Error(response.statusText);

                    _this.setState({
                      error: error
                    });

                    error.response = response;
                    throw error;
                  }
                });

                return _this;
              }

              _createClass(UserAdministration, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                  console.log("UserAdministration loaded");
                  this.getUsers();
                }
              }, {
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  var users = this.state.users;
                  return React__default.createElement("div", null, children({
                    users: users,
                    getUsers: this.getUsers,
                    findUser: this.findUser,
                    deleteUser: this.deleteUser,
                    updateUser: this.updateUser
                  }));
                }
              }]);

              return UserAdministration;
            }(React__default.Component);

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
              return React__default.createElement("div", {
                className: "form-group"
              }, React__default.createElement("label", {
                forhtml: "password"
              }, label, ": "), React__default.createElement("input", {
                className: classnames('form-control', {
                  'is-invalid': !validation.isValid
                }),
                onChange: onChange,
                value: value,
                name: name,
                type: type,
                placeholder: placeholder
              }), React__default.createElement("div", {
                className: "invalid-feedback"
              }, validation.message));
            };

            var Login = function Login() {
              return React__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var email = _ref.email,
                    password = _ref.password,
                    login = _ref.login,
                    onChange = _ref.onChange,
                    validation = _ref.validation,
                    isLoggedIn = _ref.isLoggedIn;
                if (!isLoggedIn) return React__default.createElement("div", {
                  className: "container"
                }, React__default.createElement("div", {
                  className: "row justify-content-center"
                }, React__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React__default.createElement("fieldset", null, React__default.createElement("legend", null, "Login:"), React__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React__default.createElement(CustomInput, {
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Password"
                }), React__default.createElement("div", null, React__default.createElement("button", {
                  type: "submit",
                  className: "btn btn-primary",
                  onClick: login
                }, "Login")), React__default.createElement(Link, {
                  to: "/recover"
                }, "Forgot Password !")))));
                return React__default.createElement(Redirect, {
                  to: "/"
                });
              });
            };

            var SignUp = function SignUp() {
              return React__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var onChange = _ref.onChange,
                    email = _ref.email,
                    password = _ref.password,
                    signup = _ref.signup,
                    validation = _ref.validation,
                    isLoggedIn = _ref.isLoggedIn;
                if (!isLoggedIn) return React__default.createElement("div", {
                  className: "container"
                }, React__default.createElement("div", {
                  className: "row justify-content-center"
                }, React__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React__default.createElement("fieldset", null, React__default.createElement("legend", null, "Sign Up:"), React__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React__default.createElement(CustomInput, {
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Password"
                }), React__default.createElement("div", null, React__default.createElement("button", {
                  className: "btn btn-primary",
                  onClick: signup
                }, "Sign Up"))))));
                return React__default.createElement(Redirect, {
                  to: "/"
                });
              });
            };

            var AuthState = function AuthState() {
              return React__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var isLoggedIn = _ref.isLoggedIn,
                    logout = _ref.logout;
                console.log("isloggedIn", isLoggedIn);
                return React__default.createElement("div", null, isLoggedIn ? React__default.createElement(NavLink, {
                  to: "/",
                  onClick: logout
                }, "LogOut") : React__default.createElement("div", null, React__default.createElement(NavLink, {
                  to: "/login"
                }, "Login"), React__default.createElement(NavLink, {
                  to: "/signup"
                }, "SignUp")));
              });
            };

            var ResetPassword = function ResetPassword() {
              return React__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var password = _ref.password,
                    confirm = _ref.confirm,
                    resetPassword = _ref.resetPassword,
                    validation = _ref.validation;
                return React__default.createElement("div", {
                  className: "container"
                }, React__default.createElement("div", {
                  className: "row justify-content-center"
                }, React__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React__default.createElement("fieldset", null, React__default.createElement("legend", null, "Reset Password:"), React__default.createElement(CustomInput, {
                  placeholder: "New Password",
                  name: "password",
                  type: "password",
                  value: password,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "New Password"
                }), React__default.createElement(CustomInput, {
                  placeholder: "Confirm Password",
                  name: "confirm",
                  type: "password",
                  value: confirm,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.password),
                  label: "Confirm"
                }), React__default.createElement("div", null, React__default.createElement("button", {
                  className: "btn btn-primary",
                  onClick: resetPassword
                }, "Reset Password"))))));
              });
            };

            var RecoverPassword = function RecoverPassword() {
              return React__default.createElement(EmailPasswordContext.Consumer, null, function (_ref) {
                var email = _ref.email,
                    onChange = _ref.onChange,
                    validation = _ref.validation,
                    recover = _ref.recover;
                return React__default.createElement("div", {
                  className: "container"
                }, React__default.createElement("div", {
                  className: "row justify-content-center"
                }, React__default.createElement("div", {
                  className: "col-sm-12 col-md-6"
                }, React__default.createElement("fieldset", null, React__default.createElement("legend", null, "Recover Password:"), React__default.createElement(CustomInput, {
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: onChange,
                  validation: _objectSpread2({}, validation.email),
                  label: "Email Address"
                }), React__default.createElement("div", null, React__default.createElement("button", {
                  className: "btn btn-primary",
                  onClick: recover
                }, "Recover Password"))))));
              });
            };

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
                  return React__default.createElement("div", null, "Home");
                }
              }]);

              return Home;
            }(React__default.Component);

            var Users = function Users() {
              return React__default.createElement(UserAdministration, null, function (_ref) {
                var users = _ref.users;
                return React__default.createElement(UserTable, {
                  users: users
                });
              });
            };

            var UserTable = function UserTable(_ref2) {
              var users = _ref2.users;
              return React__default.createElement("table", {
                "class": "table"
              }, React__default.createElement("thead", null, React__default.createElement("tr", null, React__default.createElement("th", {
                scope: "col"
              }, "#_id"), React__default.createElement("th", {
                scope: "col"
              }, "Email"), React__default.createElement("th", {
                scope: "col"
              }, "Password"), React__default.createElement("th", {
                scope: "col"
              }, "Edit"), React__default.createElement("th", {
                scope: "col"
              }, "Delete"))), React__default.createElement("tbody", null, users.map(function (u, i) {
                return React__default.createElement("tr", {
                  key: i
                }, React__default.createElement("td", null, u._id), React__default.createElement("td", null, u.email), React__default.createElement("td", null, "******************"), React__default.createElement("td", null, React__default.createElement("button", {
                  className: "btn btn-primary"
                }, "Edit")), React__default.createElement("td", null, React__default.createElement("button", {
                  className: "btn btn-danger"
                }, "Delete")));
              })));
            };

            var App = function App() {
              return React__default.createElement("div", null, React__default.createElement(HashRouter, null, React__default.createElement("nav", {
                style: {
                  display: "flex",
                  justifyContent: "space-around"
                }
              }, React__default.createElement(AuthState, null), React__default.createElement(Link, {
                to: "/useradmin"
              }, "Users")), React__default.createElement(Route, {
                path: "/useradmin",
                component: Users
              }), React__default.createElement(Route, {
                exact: true,
                path: "/",
                component: Home
              }), React__default.createElement(Route, {
                path: "/login",
                component: Login
              }), React__default.createElement(Route, {
                path: "/signup",
                component: SignUp
              }), React__default.createElement(Route, {
                path: "/recover",
                component: RecoverPassword
              }), React__default.createElement(Route, {
                path: "/resetpass/:username/:token",
                component: ResetPassword
              })));
            };

            ReactDOM.render(React__default.createElement("div", null, React__default.createElement(EmailPasswordProvider, null, React__default.createElement(App, null))), document.getElementById('root'));

}(React, ReactDOM, PropTypes));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdmFsdWUtZXF1YWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lc20vaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9wYXRoLXRvLXJlZ2V4cC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzbS9yZWFjdC1yb3V0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lc20vcmVhY3Qtcm91dGVyLWRvbS5qcyIsIi4uLy4uL3ZhbGlkYXRpb24vbGliL3ZhbGlkYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vLi4vbWVybi1yZWFjdC9saWIvRW1haWxQYXNzd29yZFByb3ZpZGVyLmpzIiwiLi4vLi4vbWVybi1yZWFjdC9saWIvVXNlckFkbWluaXN0cmF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIuLi9jbGllbnQvQ3VzdG9tSW5wdXQuanMiLCIuLi9jbGllbnQvTG9naW4uanMiLCIuLi9jbGllbnQvU2lnbnVwLmpzIiwiLi4vY2xpZW50L0F1dGhTdGF0ZS5qcyIsIi4uL2NsaWVudC9SZXNldFBhc3N3b3JkLmpzIiwiLi4vY2xpZW50L1JlY292ZXJQYXNzd29yZC5qcyIsIi4uL2NsaWVudC9Ib21lLmpzIiwiLi4vY2xpZW50L1VzZXJzLmpzIiwiLi4vY2xpZW50L0FwcC5qcyIsIi4uL2NsaWVudC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuLy8gYmFzZWQgb2ZmIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzXG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxudmFyIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5pZiAodHlwZW9mIGdsb2JhbC5zZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG59XG5pZiAodHlwZW9mIGdsb2JhbC5jbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0VGljayhmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbmV4cG9ydCB2YXIgdGl0bGUgPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIHBsYXRmb3JtID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBicm93c2VyID0gdHJ1ZTtcbmV4cG9ydCB2YXIgZW52ID0ge307XG5leHBvcnQgdmFyIGFyZ3YgPSBbXTtcbmV4cG9ydCB2YXIgdmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuZXhwb3J0IHZhciB2ZXJzaW9ucyA9IHt9O1xuZXhwb3J0IHZhciByZWxlYXNlID0ge307XG5leHBvcnQgdmFyIGNvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IHZhciBvbiA9IG5vb3A7XG5leHBvcnQgdmFyIGFkZExpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgb25jZSA9IG5vb3A7XG5leHBvcnQgdmFyIG9mZiA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbmV4cG9ydCB2YXIgZW1pdCA9IG5vb3A7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjd2QgKCkgeyByZXR1cm4gJy8nIH1cbmV4cG9ydCBmdW5jdGlvbiBjaGRpciAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdW1hc2soKSB7IHJldHVybiAwOyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2t1bWF2aXMvYnJvd3Nlci1wcm9jZXNzLWhydGltZS9ibG9iL21hc3Rlci9pbmRleC5qc1xudmFyIHBlcmZvcm1hbmNlID0gZ2xvYmFsLnBlcmZvcm1hbmNlIHx8IHt9XG52YXIgcGVyZm9ybWFuY2VOb3cgPVxuICBwZXJmb3JtYW5jZS5ub3cgICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1vek5vdyAgICAgfHxcbiAgcGVyZm9ybWFuY2UubXNOb3cgICAgICB8fFxuICBwZXJmb3JtYW5jZS5vTm93ICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLndlYmtpdE5vdyAgfHxcbiAgZnVuY3Rpb24oKXsgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfVxuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmV4cG9ydCBmdW5jdGlvbiBocnRpbWUocHJldmlvdXNUaW1lc3RhbXApe1xuICB2YXIgY2xvY2t0aW1lID0gcGVyZm9ybWFuY2VOb3cuY2FsbChwZXJmb3JtYW5jZSkqMWUtM1xuICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICB2YXIgbmFub3NlY29uZHMgPSBNYXRoLmZsb29yKChjbG9ja3RpbWUlMSkqMWU5KVxuICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgbmFub3NlY29uZHMgPSBuYW5vc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzFdXG4gICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgIHNlY29uZHMtLVxuICAgICAgbmFub3NlY29uZHMgKz0gMWU5XG4gICAgfVxuICB9XG4gIHJldHVybiBbc2Vjb25kcyxuYW5vc2Vjb25kc11cbn1cblxudmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gdXB0aW1lKCkge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICB2YXIgZGlmID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiBkaWYgLyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5leHRUaWNrOiBuZXh0VGljayxcbiAgdGl0bGU6IHRpdGxlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBlbnY6IGVudixcbiAgYXJndjogYXJndixcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICBvbjogb24sXG4gIGFkZExpc3RlbmVyOiBhZGRMaXN0ZW5lcixcbiAgb25jZTogb25jZSxcbiAgb2ZmOiBvZmYsXG4gIHJlbW92ZUxpc3RlbmVyOiByZW1vdmVMaXN0ZW5lcixcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIGVtaXQ6IGVtaXQsXG4gIGJpbmRpbmc6IGJpbmRpbmcsXG4gIGN3ZDogY3dkLFxuICBjaGRpcjogY2hkaXIsXG4gIHVtYXNrOiB1bWFzayxcbiAgaHJ0aW1lOiBocnRpbWUsXG4gIHBsYXRmb3JtOiBwbGF0Zm9ybSxcbiAgcmVsZWFzZTogcmVsZWFzZSxcbiAgY29uZmlnOiBjb25maWcsXG4gIHVwdGltZTogdXB0aW1lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHNMb29zZTsiLCIvLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5ID0gJ19fZ2xvYmFsX3VuaXF1ZV9pZF9fJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFtrZXldID0gKGdsb2JhbFtrZXldIHx8IDApICsgMTtcbn07XG4iLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbmZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghaXNQcm9kdWN0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0ZXh0ID0gXCJXYXJuaW5nOiBcIiArIG1lc3NhZ2U7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4odGV4dCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRocm93IEVycm9yKHRleHQpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2FybmluZztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZ3VkIGZyb20gJ2d1ZCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuXG52YXIgTUFYX1NJR05FRF8zMV9CSVRfSU5UID0gMTA3Mzc0MTgyMztcblxuZnVuY3Rpb24gb2JqZWN0SXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RW1pdHRlcih2YWx1ZSkge1xuICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBvbjogZnVuY3Rpb24gb24oaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXJzID0gaGFuZGxlcnMuZmlsdGVyKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiBoICE9PSBoYW5kbGVyO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIodmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuWzBdIDogY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0Q29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXgsIF9Db25zdW1lciRjb250ZXh0VHlwZTtcblxuICB2YXIgY29udGV4dFByb3AgPSAnX19jcmVhdGUtcmVhY3QtY29udGV4dC0nICsgZ3VkKCkgKyAnX18nO1xuXG4gIHZhciBQcm92aWRlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQcm92aWRlcigpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzLmVtaXR0ZXIgPSBjcmVhdGVFdmVudEVtaXR0ZXIoX3RoaXMucHJvcHMudmFsdWUpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8gPSBQcm92aWRlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbY29udGV4dFByb3BdID0gdGhpcy5lbWl0dGVyLCBfcmVmO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSAhPT0gbmV4dFByb3BzLnZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIGNoYW5nZWRCaXRzO1xuXG4gICAgICAgIGlmIChvYmplY3RJcyhvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5nZWRCaXRzID0gdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSAnZnVuY3Rpb24nID8gY2FsY3VsYXRlQ2hhbmdlZEJpdHMob2xkVmFsdWUsIG5ld1ZhbHVlKSA6IE1BWF9TSUdORURfMzFfQklUX0lOVDtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuaW5nKChjaGFuZ2VkQml0cyAmIE1BWF9TSUdORURfMzFfQklUX0lOVCkgPT09IGNoYW5nZWRCaXRzLCAnY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IEV4cGVjdGVkIHRoZSByZXR1cm4gdmFsdWUgdG8gYmUgYSAnICsgJzMxLWJpdCBpbnRlZ2VyLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgY2hhbmdlZEJpdHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoYW5nZWRCaXRzIHw9IDA7XG5cbiAgICAgICAgICBpZiAoY2hhbmdlZEJpdHMgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zZXQobmV4dFByb3BzLnZhbHVlLCBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgdmFyIENvbnN1bWVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDb25zdW1lciwgX0NvbXBvbmVudDIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICBfdGhpczIgPSBfQ29tcG9uZW50Mi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIuc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiBfdGhpczIuZ2V0VmFsdWUoKVxuICAgICAgfTtcblxuICAgICAgX3RoaXMyLm9uVXBkYXRlID0gZnVuY3Rpb24gKG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gX3RoaXMyLm9ic2VydmVkQml0cyB8IDA7XG5cbiAgICAgICAgaWYgKChvYnNlcnZlZEJpdHMgJiBjaGFuZ2VkQml0cykgIT09IDApIHtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIgPSBDb25zdW1lci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IG5leHRQcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vbih0aGlzLm9uVXBkYXRlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IHRoaXMucHJvcHMub2JzZXJ2ZWRCaXRzO1xuICAgICAgdGhpcy5vYnNlcnZlZEJpdHMgPSBvYnNlcnZlZEJpdHMgPT09IHVuZGVmaW5lZCB8fCBvYnNlcnZlZEJpdHMgPT09IG51bGwgPyBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgOiBvYnNlcnZlZEJpdHM7XG4gICAgfTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0ub2ZmKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5nZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG9ubHlDaGlsZCh0aGlzLnByb3BzLmNoaWxkcmVuKSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnN1bWVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgQ29uc3VtZXIuY29udGV4dFR5cGVzID0gKF9Db25zdW1lciRjb250ZXh0VHlwZSA9IHt9LCBfQ29uc3VtZXIkY29udGV4dFR5cGVbY29udGV4dFByb3BdID0gUHJvcFR5cGVzLm9iamVjdCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlKTtcbiAgcmV0dXJuIHtcbiAgICBQcm92aWRlcjogUHJvdmlkZXIsXG4gICAgQ29uc3VtZXI6IENvbnN1bWVyXG4gIH07XG59XG5cbnZhciBpbmRleCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQgfHwgY3JlYXRlUmVhY3RDb250ZXh0O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bykge1xuICB2YXIgZnJvbSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgdmFyIHRvUGFydHMgPSB0byAmJiB0by5zcGxpdCgnLycpIHx8IFtdO1xuICB2YXIgZnJvbVBhcnRzID0gZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykgfHwgW107XG5cbiAgdmFyIGlzVG9BYnMgPSB0byAmJiBpc0Fic29sdXRlKHRvKTtcbiAgdmFyIGlzRnJvbUFicyA9IGZyb20gJiYgaXNBYnNvbHV0ZShmcm9tKTtcbiAgdmFyIG11c3RFbmRBYnMgPSBpc1RvQWJzIHx8IGlzRnJvbUFicztcblxuICBpZiAodG8gJiYgaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAvLyB0byBpcyBhYnNvbHV0ZVxuICAgIGZyb21QYXJ0cyA9IHRvUGFydHM7XG4gIH0gZWxzZSBpZiAodG9QYXJ0cy5sZW5ndGgpIHtcbiAgICAvLyB0byBpcyByZWxhdGl2ZSwgZHJvcCB0aGUgZmlsZW5hbWVcbiAgICBmcm9tUGFydHMucG9wKCk7XG4gICAgZnJvbVBhcnRzID0gZnJvbVBhcnRzLmNvbmNhdCh0b1BhcnRzKTtcbiAgfVxuXG4gIGlmICghZnJvbVBhcnRzLmxlbmd0aCkgcmV0dXJuICcvJztcblxuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IHZvaWQgMDtcbiAgaWYgKGZyb21QYXJ0cy5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdCA9IGZyb21QYXJ0c1tmcm9tUGFydHMubGVuZ3RoIC0gMV07XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nIHx8IGxhc3QgPT09ICcnO1xuICB9IGVsc2Uge1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBmcm9tUGFydHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIHZhciBwYXJ0ID0gZnJvbVBhcnRzW2ldO1xuXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbXVzdEVuZEFicykgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gIH1pZiAobXVzdEVuZEFicyAmJiBmcm9tUGFydHNbMF0gIT09ICcnICYmICghZnJvbVBhcnRzWzBdIHx8ICFpc0Fic29sdXRlKGZyb21QYXJ0c1swXSkpKSBmcm9tUGFydHMudW5zaGlmdCgnJyk7XG5cbiAgdmFyIHJlc3VsdCA9IGZyb21QYXJ0cy5qb2luKCcvJyk7XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgcmVzdWx0LnN1YnN0cigtMSkgIT09ICcvJykgcmVzdWx0ICs9ICcvJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlUGF0aG5hbWU7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGl0ZW0sIGJbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhVHlwZSA9IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKTtcbiAgdmFyIGJUeXBlID0gdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGIpO1xuXG4gIGlmIChhVHlwZSAhPT0gYlR5cGUpIHJldHVybiBmYWxzZTtcblxuICBpZiAoYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IGEudmFsdWVPZigpO1xuICAgIHZhciBiVmFsdWUgPSBiLnZhbHVlT2YoKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGFLZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVFcXVhbDsiLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBwcmVmaXggPSAnSW52YXJpYW50IGZhaWxlZCc7XG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmIChjb25kaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCArIFwiOiBcIiArIChtZXNzYWdlIHx8ICcnKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW52YXJpYW50O1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHJlc29sdmVQYXRobmFtZSBmcm9tICdyZXNvbHZlLXBhdGhuYW1lJztcbmltcG9ydCB2YWx1ZUVxdWFsIGZyb20gJ3ZhbHVlLWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcHJlZml4ICsgJyhcXFxcL3xcXFxcP3wjfCQpJywgJ2knKS50ZXN0KHBhdGgpO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJykgOiB2b2lkIDA7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpIDogdm9pZCAwO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufVxuXG52YXIgUG9wU3RhdGVFdmVudCA9ICdwb3BzdGF0ZSc7XG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG5mdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgICBuZXh0S2V5cy5wdXNoKGxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgYWxsS2V5cyA9IG5leHRLZXlzO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxLZXlzW3ByZXZJbmRleF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxudmFyIEhhc2hDaGFuZ2VFdmVudCQxID0gJ2hhc2hjaGFuZ2UnO1xudmFyIEhhc2hQYXRoQ29kZXJzID0ge1xuICBoYXNoYmFuZzoge1xuICAgIGVuY29kZVBhdGg6IGZ1bmN0aW9uIGVuY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoIDogJyEvJyArIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBzdHJpcExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfSxcbiAgc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpO1xufVxuXG5mdW5jdGlvbiBwdXNoSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHZhciBoYXNoSW5kZXggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKDAsIGhhc2hJbmRleCA+PSAwID8gaGFzaEluZGV4IDogMCkgKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gX3Byb3BzLmhhc2hUeXBlLFxuICAgICAgaGFzaFR5cGUgPSBfcHJvcHMkaGFzaFR5cGUgPT09IHZvaWQgMCA/ICdzbGFzaCcgOiBfcHJvcHMkaGFzaFR5cGU7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG4gIHZhciBfSGFzaFBhdGhDb2RlcnMkaGFzaFQgPSBIYXNoUGF0aENvZGVyc1toYXNoVHlwZV0sXG4gICAgICBlbmNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmVuY29kZVBhdGgsXG4gICAgICBkZWNvZGVQYXRoID0gX0hhc2hQYXRoQ29kZXJzJGhhc2hULmRlY29kZVBhdGg7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBkZWNvZGVQYXRoKGdldEhhc2hQYXRoKCkpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgpO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkge1xuICAgICAgLy8gRW5zdXJlIHdlIGFsd2F5cyBoYXZlIGEgcHJvcGVybHktZW5jb2RlZCBoYXNoLlxuICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKHRvTG9jYXRpb24pKTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9IC8vIEVuc3VyZSB0aGUgaGFzaCBpcyBlbmNvZGVkIHByb3Blcmx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxuXG5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICB2YXIgYWxsUGF0aHMgPSBbY3JlYXRlUGF0aChpbml0aWFsTG9jYXRpb24pXTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBQVVNILCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICBwdXNoSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICAgIHZhciBuZXh0UGF0aHMgPSBhbGxQYXRocy5zbGljZSgwLCBwcmV2SW5kZXggPT09IC0xID8gMCA6IHByZXZJbmRleCArIDEpO1xuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGg7IGEgbmV3IGVudHJ5IHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrJykgOiB2b2lkIDA7XG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoY2FuR29XaXRob3V0UmVsb2FkLCAnSGFzaCBoaXN0b3J5IGdvKG4pIGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQgaW4gdGhpcyBicm93c2VyJykgOiB2b2lkIDA7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIF9wcm9wcyRpbml0aWFsRW50cmllcyA9IF9wcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB2b2lkIDAgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBfcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdm9pZCAwID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgaW5kZXggPSBjbGFtcChpbml0aWFsSW5kZXgsIDAsIGluaXRpYWxFbnRyaWVzLmxlbmd0aCAtIDEpO1xuICB2YXIgZW50cmllcyA9IGluaXRpYWxFbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJyA/IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGVudHJ5LmtleSB8fCBjcmVhdGVLZXkoKSk7XG4gIH0pOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBjcmVhdGVQYXRoO1xuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuXG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gY2xhbXAoaGlzdG9yeS5pbmRleCArIG4sIDAsIGhpc3RvcnkuZW50cmllcy5sZW5ndGggLSAxKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgdmFyIGxvY2F0aW9uID0gaGlzdG9yeS5lbnRyaWVzW25leHRJbmRleF07XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGhpc3RvcnkuaW5kZXggKyBuO1xuICAgIHJldHVybiBuZXh0SW5kZXggPj0gMCAmJiBuZXh0SW5kZXggPCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIHBhcnNlUGF0aCwgY3JlYXRlUGF0aCB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwidmFyIGlzYXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFRvUmVnZXhwXG5tb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZVxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvUmVnRXhwID0gdG9rZW5zVG9SZWdFeHBcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKVxuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4geyFBcnJheX1cbiAqL1xuZnVuY3Rpb24gcGFyc2UgKHN0ciwgb3B0aW9ucykge1xuICB2YXIgdG9rZW5zID0gW11cbiAgdmFyIGtleSA9IDBcbiAgdmFyIGluZGV4ID0gMFxuICB2YXIgcGF0aCA9ICcnXG4gIHZhciBkZWZhdWx0RGVsaW1pdGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlbGltaXRlciB8fCAnLydcbiAgdmFyIHJlc1xuXG4gIHdoaWxlICgocmVzID0gUEFUSF9SRUdFWFAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgdmFyIG0gPSByZXNbMF1cbiAgICB2YXIgZXNjYXBlZCA9IHJlc1sxXVxuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXhcbiAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGhcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIG5leHQgPSBzdHJbaW5kZXhdXG4gICAgdmFyIHByZWZpeCA9IHJlc1syXVxuICAgIHZhciBuYW1lID0gcmVzWzNdXG4gICAgdmFyIGNhcHR1cmUgPSByZXNbNF1cbiAgICB2YXIgZ3JvdXAgPSByZXNbNV1cbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl1cbiAgICB2YXIgYXN0ZXJpc2sgPSByZXNbN11cblxuICAgIC8vIFB1c2ggdGhlIGN1cnJlbnQgcGF0aCBvbnRvIHRoZSB0b2tlbnMuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gICAgICBwYXRoID0gJydcbiAgICB9XG5cbiAgICB2YXIgcGFydGlhbCA9IHByZWZpeCAhPSBudWxsICYmIG5leHQgIT0gbnVsbCAmJiBuZXh0ICE9PSBwcmVmaXhcbiAgICB2YXIgcmVwZWF0ID0gbW9kaWZpZXIgPT09ICcrJyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonXG4gICAgdmFyIGRlbGltaXRlciA9IHJlc1syXSB8fCBkZWZhdWx0RGVsaW1pdGVyXG4gICAgdmFyIHBhdHRlcm4gPSBjYXB0dXJlIHx8IGdyb3VwXG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pXG4gIH1cblxuICAvLyBNYXRjaCBhbnkgY2hhcmFjdGVycyBzdGlsbCByZW1haW5pbmcuXG4gIGlmIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICBwYXRoICs9IHN0ci5zdWJzdHIoaW5kZXgpXG4gIH1cblxuICAvLyBJZiB0aGUgcGF0aCBleGlzdHMsIHB1c2ggaXQgb250byB0aGUgZW5kLlxuICBpZiAocGF0aCkge1xuICAgIHRva2Vucy5wdXNoKHBhdGgpXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aClcblxuICAvLyBDb21waWxlIGFsbCB0aGUgcGF0dGVybnMgYmVmb3JlIGNvbXBpbGF0aW9uLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgbWF0Y2hlc1tpXSA9IG5ldyBSZWdFeHAoJ14oPzonICsgdG9rZW5zW2ldLnBhdHRlcm4gKyAnKSQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSAnJ1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9XG4gICAgdmFyIGVuY29kZSA9IG9wdGlvbnMucHJldHR5ID8gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IDogZW5jb2RlVVJJQ29tcG9uZW50XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggKz0gdG9rZW5cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBkYXRhW3Rva2VuLm5hbWVdXG4gICAgICB2YXIgc2VnbWVudFxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAvLyBQcmVwZW5kIHBhcnRpYWwgc2VnbWVudCBwcmVmaXhlcy5cbiAgICAgICAgICBpZiAodG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXhcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICghdG9rZW4ucmVwZWF0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnYCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUodmFsdWVbal0pXG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzZWdtZW50ID0gdG9rZW4uYXN0ZXJpc2sgPyBlbmNvZGVBc3Rlcmlzayh2YWx1ZSkgOiBlbmNvZGUodmFsdWUpXG5cbiAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxuICAgICAgfVxuXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5c1xuICByZXR1cm4gcmVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zZW5zaXRpdmUgPyAnJyA6ICdpJ1xufVxuXG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZylcblxuICBpZiAoZ3JvdXBzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGksXG4gICAgICAgIHByZWZpeDogbnVsbCxcbiAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxuICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgIHBhcnRpYWw6IGZhbHNlLFxuICAgICAgICBhc3RlcmlzazogZmFsc2UsXG4gICAgICAgIHBhdHRlcm46IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydHMucHVzaChwYXRoVG9SZWdleHAocGF0aFtpXSwga2V5cywgb3B0aW9ucykuc291cmNlKVxuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0XG4gIHZhciBlbmQgPSBvcHRpb25zLmVuZCAhPT0gZmFsc2VcbiAgdmFyIHJvdXRlID0gJydcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyh0b2tlbilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHByZWZpeCA9IGVzY2FwZVN0cmluZyh0b2tlbi5wcmVmaXgpXG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJ1xuXG4gICAgICBrZXlzLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgY2FwdHVyZSArPSAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonXG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpPydcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSdcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZVxuICAgIH1cbiAgfVxuXG4gIHZhciBkZWxpbWl0ZXIgPSBlc2NhcGVTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nKVxuICB2YXIgZW5kc1dpdGhEZWxpbWl0ZXIgPSByb3V0ZS5zbGljZSgtZGVsaW1pdGVyLmxlbmd0aCkgPT09IGRlbGltaXRlclxuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nXG4gIH1cblxuICBpZiAoZW5kKSB7XG4gICAgcm91dGUgKz0gJyQnXG4gIH0gZWxzZSB7XG4gICAgLy8gSW4gbm9uLWVuZGluZyBtb2RlLCB3ZSBuZWVkIHRoZSBjYXB0dXJpbmcgZ3JvdXBzIHRvIG1hdGNoIGFzIG11Y2ggYXNcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aERlbGltaXRlciA/ICcnIDogJyg/PScgKyBkZWxpbWl0ZXIgKyAnfCQpJ1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtcbnZhciBiPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5mb3IsYz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpOjYwMTAzLGQ9Yj9TeW1ib2wuZm9yKFwicmVhY3QucG9ydGFsXCIpOjYwMTA2LGU9Yj9TeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIik6NjAxMDcsZj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5zdHJpY3RfbW9kZVwiKTo2MDEwOCxnPWI/U3ltYm9sLmZvcihcInJlYWN0LnByb2ZpbGVyXCIpOjYwMTE0LGg9Yj9TeW1ib2wuZm9yKFwicmVhY3QucHJvdmlkZXJcIik6NjAxMDksaz1iP1N5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpOjYwMTEwLGw9Yj9TeW1ib2wuZm9yKFwicmVhY3QuYXN5bmNfbW9kZVwiKTo2MDExMSxtPWI/U3ltYm9sLmZvcihcInJlYWN0LmNvbmN1cnJlbnRfbW9kZVwiKTo2MDExMSxuPWI/U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpOjYwMTEyLHA9Yj9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIik6NjAxMTMscT1iP1N5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpOlxuNjAxMTUscj1iP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2O2Z1bmN0aW9uIHQoYSl7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSl7dmFyIHU9YS4kJHR5cGVvZjtzd2l0Y2godSl7Y2FzZSBjOnN3aXRjaChhPWEudHlwZSxhKXtjYXNlIGw6Y2FzZSBtOmNhc2UgZTpjYXNlIGc6Y2FzZSBmOmNhc2UgcDpyZXR1cm4gYTtkZWZhdWx0OnN3aXRjaChhPWEmJmEuJCR0eXBlb2YsYSl7Y2FzZSBrOmNhc2UgbjpjYXNlIGg6cmV0dXJuIGE7ZGVmYXVsdDpyZXR1cm4gdX19Y2FzZSByOmNhc2UgcTpjYXNlIGQ6cmV0dXJuIHV9fX1mdW5jdGlvbiB2KGEpe3JldHVybiB0KGEpPT09bX1leHBvcnRzLnR5cGVPZj10O2V4cG9ydHMuQXN5bmNNb2RlPWw7ZXhwb3J0cy5Db25jdXJyZW50TW9kZT1tO2V4cG9ydHMuQ29udGV4dENvbnN1bWVyPWs7ZXhwb3J0cy5Db250ZXh0UHJvdmlkZXI9aDtleHBvcnRzLkVsZW1lbnQ9YztleHBvcnRzLkZvcndhcmRSZWY9bjtcbmV4cG9ydHMuRnJhZ21lbnQ9ZTtleHBvcnRzLkxhenk9cjtleHBvcnRzLk1lbW89cTtleHBvcnRzLlBvcnRhbD1kO2V4cG9ydHMuUHJvZmlsZXI9ZztleHBvcnRzLlN0cmljdE1vZGU9ZjtleHBvcnRzLlN1c3BlbnNlPXA7ZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgYXx8YT09PWV8fGE9PT1tfHxhPT09Z3x8YT09PWZ8fGE9PT1wfHxcIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiYoYS4kJHR5cGVvZj09PXJ8fGEuJCR0eXBlb2Y9PT1xfHxhLiQkdHlwZW9mPT09aHx8YS4kJHR5cGVvZj09PWt8fGEuJCR0eXBlb2Y9PT1uKX07ZXhwb3J0cy5pc0FzeW5jTW9kZT1mdW5jdGlvbihhKXtyZXR1cm4gdihhKXx8dChhKT09PWx9O2V4cG9ydHMuaXNDb25jdXJyZW50TW9kZT12O2V4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1rfTtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1ofTtleHBvcnRzLmlzRWxlbWVudD1mdW5jdGlvbihhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiZhLiQkdHlwZW9mPT09Y307ZXhwb3J0cy5pc0ZvcndhcmRSZWY9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1ufTtleHBvcnRzLmlzRnJhZ21lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1lfTtleHBvcnRzLmlzTGF6eT1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PXJ9O2V4cG9ydHMuaXNNZW1vPWZ1bmN0aW9uKGEpe3JldHVybiB0KGEpPT09cX07ZXhwb3J0cy5pc1BvcnRhbD1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PWR9O2V4cG9ydHMuaXNQcm9maWxlcj1mdW5jdGlvbihhKXtyZXR1cm4gdChhKT09PWd9O2V4cG9ydHMuaXNTdHJpY3RNb2RlPWZ1bmN0aW9uKGEpe3JldHVybiB0KGEpPT09Zn07XG5leHBvcnRzLmlzU3VzcGVuc2U9ZnVuY3Rpb24oYSl7cmV0dXJuIHQoYSk9PT1wfTtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZTogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IHRydWUsXG4gICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBjYWxsZWU6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgRk9SV0FSRF9SRUZfU1RBVElDUyA9IHtcbiAgICAnJCR0eXBlb2YnOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlXG59O1xuXG52YXIgTUVNT19TVEFUSUNTID0ge1xuICAgICckJHR5cGVvZic6IHRydWUsXG4gICAgY29tcGFyZTogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tSZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblxuZnVuY3Rpb24gZ2V0U3RhdGljcyhjb21wb25lbnQpIHtcbiAgICBpZiAoUmVhY3RJcy5pc01lbW8oY29tcG9uZW50KSkge1xuICAgICAgICByZXR1cm4gTUVNT19TVEFUSUNTO1xuICAgIH1cbiAgICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuXG4gICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXRTdGF0aWNzID0gZ2V0U3RhdGljcyh0YXJnZXRDb21wb25lbnQpO1xuICAgICAgICB2YXIgc291cmNlU3RhdGljcyA9IGdldFN0YXRpY3Moc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFLTk9XTl9TVEFUSUNTW2tleV0gJiYgIShibGFja2xpc3QgJiYgYmxhY2tsaXN0W2tleV0pICYmICEoc291cmNlU3RhdGljcyAmJiBzb3VyY2VTdGF0aWNzW2tleV0pICYmICEodGFyZ2V0U3RhdGljcyAmJiB0YXJnZXRTdGF0aWNzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG4iLCJpbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdtaW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgY3JlYXRlUGF0aCB9IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9IGZyb20gJ3JlYWN0LWlzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG4vLyBUT0RPOiBSZXBsYWNlIHdpdGggUmVhY3QuY3JlYXRlQ29udGV4dCBvbmNlIHdlIGNhbiBhc3N1bWUgUmVhY3QgMTYrXG5cbnZhciBjcmVhdGVOYW1lZENvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVOYW1lZENvbnRleHQobmFtZSkge1xuICB2YXIgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcbiAgY29udGV4dC5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gIHJldHVybiBjb250ZXh0O1xufTtcblxudmFyIGNvbnRleHQgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlTmFtZWRDb250ZXh0KFwiUm91dGVyXCIpO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBwdXR0aW5nIGhpc3Rvcnkgb24gY29udGV4dC5cbiAqL1xuXG52YXIgUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgUm91dGVyLmNvbXB1dGVSb290TWF0Y2ggPSBmdW5jdGlvbiBjb21wdXRlUm9vdE1hdGNoKHBhdGhuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgdXJsOiBcIi9cIixcbiAgICAgIHBhcmFtczoge30sXG4gICAgICBpc0V4YWN0OiBwYXRobmFtZSA9PT0gXCIvXCJcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIFJvdXRlcihwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgbG9jYXRpb246IHByb3BzLmhpc3RvcnkubG9jYXRpb25cbiAgICB9OyAvLyBUaGlzIGlzIGEgYml0IG9mIGEgaGFjay4gV2UgaGF2ZSB0byBzdGFydCBsaXN0ZW5pbmcgZm9yIGxvY2F0aW9uXG4gICAgLy8gY2hhbmdlcyBoZXJlIGluIHRoZSBjb25zdHJ1Y3RvciBpbiBjYXNlIHRoZXJlIGFyZSBhbnkgPFJlZGlyZWN0PnNcbiAgICAvLyBvbiB0aGUgaW5pdGlhbCByZW5kZXIuIElmIHRoZXJlIGFyZSwgdGhleSB3aWxsIHJlcGxhY2UvcHVzaCB3aGVuXG4gICAgLy8gdGhleSBtb3VudCBhbmQgc2luY2UgY0RNIGZpcmVzIGluIGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLCB3ZSBtYXlcbiAgICAvLyBnZXQgYSBuZXcgbG9jYXRpb24gYmVmb3JlIHRoZSA8Um91dGVyPiBpcyBtb3VudGVkLlxuXG4gICAgX3RoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xuICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBudWxsO1xuXG4gICAgaWYgKCFwcm9wcy5zdGF0aWNDb250ZXh0KSB7XG4gICAgICBfdGhpcy51bmxpc3RlbiA9IHByb3BzLmhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICBpZiAoX3RoaXMuX2lzTW91bnRlZCkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLl9wZW5kaW5nTG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5faXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9wZW5kaW5nTG9jYXRpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsb2NhdGlvbjogdGhpcy5fcGVuZGluZ0xvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHRoaXMudW5saXN0ZW4oKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IG51bGwsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBoaXN0b3J5OiB0aGlzLnByb3BzLmhpc3RvcnksXG4gICAgICAgIGxvY2F0aW9uOiB0aGlzLnN0YXRlLmxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogUm91dGVyLmNvbXB1dGVSb290TWF0Y2godGhpcy5zdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSksXG4gICAgICAgIHN0YXRpY0NvbnRleHQ6IHRoaXMucHJvcHMuc3RhdGljQ29udGV4dFxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgaGlzdG9yeTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByZXZQcm9wcy5oaXN0b3J5ID09PSB0aGlzLnByb3BzLmhpc3RvcnksIFwiWW91IGNhbm5vdCBjaGFuZ2UgPFJvdXRlciBoaXN0b3J5PlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHN0b3JlcyBsb2NhdGlvbiBpbiBtZW1vcnkuXG4gKi9cblxudmFyIE1lbW9yeVJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShNZW1vcnlSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1lbW9yeVJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1lbW9yeVJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1lbW9yeVJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBNZW1vcnlSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGluaXRpYWxFbnRyaWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5pdGlhbEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbiAgfTtcblxuICBNZW1vcnlSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8TWVtb3J5Um91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgTWVtb3J5Um91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbnZhciBMaWZlY3ljbGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTGlmZWN5Y2xlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IExpZmVjeWNsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VudCkgdGhpcy5wcm9wcy5vbk1vdW50LmNhbGwodGhpcywgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVwZGF0ZSkgdGhpcy5wcm9wcy5vblVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMsIHByZXZQcm9wcyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Vbm1vdW50KSB0aGlzLnByb3BzLm9uVW5tb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIExpZmVjeWNsZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHJvbXB0aW5nIHRoZSB1c2VyIGJlZm9yZSBuYXZpZ2F0aW5nIGF3YXkgZnJvbSBhIHNjcmVlbi5cbiAqL1xuXG5mdW5jdGlvbiBQcm9tcHQoX3JlZikge1xuICB2YXIgbWVzc2FnZSA9IF9yZWYubWVzc2FnZSxcbiAgICAgIF9yZWYkd2hlbiA9IF9yZWYud2hlbixcbiAgICAgIHdoZW4gPSBfcmVmJHdoZW4gPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJHdoZW47XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxQcm9tcHQ+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgaWYgKCF3aGVuIHx8IGNvbnRleHQkJDEuc3RhdGljQ29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG1ldGhvZCA9IGNvbnRleHQkJDEuaGlzdG9yeS5ibG9jaztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLm1lc3NhZ2UgIT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgICAgICBzZWxmLnJlbGVhc2UgPSBtZXRob2QobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblVubW91bnQ6IGZ1bmN0aW9uIG9uVW5tb3VudChzZWxmKSB7XG4gICAgICAgIHNlbGYucmVsZWFzZSgpO1xuICAgICAgfSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIG1lc3NhZ2VUeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5zdHJpbmddKTtcbiAgUHJvbXB0LnByb3BUeXBlcyA9IHtcbiAgICB3aGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtZXNzYWdlOiBtZXNzYWdlVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSA9IHt9O1xudmFyIGNhY2hlTGltaXQgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50ID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0aCkge1xuICBpZiAoY2FjaGVbcGF0aF0pIHJldHVybiBjYWNoZVtwYXRoXTtcbiAgdmFyIGdlbmVyYXRvciA9IHBhdGhUb1JlZ2V4cC5jb21waWxlKHBhdGgpO1xuXG4gIGlmIChjYWNoZUNvdW50IDwgY2FjaGVMaW1pdCkge1xuICAgIGNhY2hlW3BhdGhdID0gZ2VuZXJhdG9yO1xuICAgIGNhY2hlQ291bnQrKztcbiAgfVxuXG4gIHJldHVybiBnZW5lcmF0b3I7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIGdlbmVyYXRpbmcgYSBVUkwgcGF0aG5hbWUgZnJvbSBhIHBhdGggYW5kIHBhcmFtZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBhdGgocGF0aCwgcGFyYW1zKSB7XG4gIGlmIChwYXRoID09PSB2b2lkIDApIHtcbiAgICBwYXRoID0gXCIvXCI7XG4gIH1cblxuICBpZiAocGFyYW1zID09PSB2b2lkIDApIHtcbiAgICBwYXJhbXMgPSB7fTtcbiAgfVxuXG4gIHJldHVybiBwYXRoID09PSBcIi9cIiA/IHBhdGggOiBjb21waWxlUGF0aChwYXRoKShwYXJhbXMsIHtcbiAgICBwcmV0dHk6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG5hdmlnYXRpbmcgcHJvZ3JhbW1hdGljYWxseSB3aXRoIGEgY29tcG9uZW50LlxuICovXG5cbmZ1bmN0aW9uIFJlZGlyZWN0KF9yZWYpIHtcbiAgdmFyIGNvbXB1dGVkTWF0Y2ggPSBfcmVmLmNvbXB1dGVkTWF0Y2gsXG4gICAgICB0byA9IF9yZWYudG8sXG4gICAgICBfcmVmJHB1c2ggPSBfcmVmLnB1c2gsXG4gICAgICBwdXNoID0gX3JlZiRwdXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkcHVzaDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQkJDEpIHtcbiAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJlZGlyZWN0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dCQkMS5oaXN0b3J5LFxuICAgICAgICBzdGF0aWNDb250ZXh0ID0gY29udGV4dCQkMS5zdGF0aWNDb250ZXh0O1xuICAgIHZhciBtZXRob2QgPSBwdXNoID8gaGlzdG9yeS5wdXNoIDogaGlzdG9yeS5yZXBsYWNlO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKGNvbXB1dGVkTWF0Y2ggPyB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBnZW5lcmF0ZVBhdGgodG8sIGNvbXB1dGVkTWF0Y2gucGFyYW1zKSA6IF9leHRlbmRzKHt9LCB0bywge1xuICAgICAgcGF0aG5hbWU6IGdlbmVyYXRlUGF0aCh0by5wYXRobmFtZSwgY29tcHV0ZWRNYXRjaC5wYXJhbXMpXG4gICAgfSkgOiB0byk7IC8vIFdoZW4gcmVuZGVyaW5nIGluIGEgc3RhdGljIGNvbnRleHQsXG4gICAgLy8gc2V0IHRoZSBuZXcgbG9jYXRpb24gaW1tZWRpYXRlbHkuXG5cbiAgICBpZiAoc3RhdGljQ29udGV4dCkge1xuICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpZmVjeWNsZSwge1xuICAgICAgb25Nb3VudDogZnVuY3Rpb24gb25Nb3VudCgpIHtcbiAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIH0sXG4gICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoc2VsZiwgcHJldlByb3BzKSB7XG4gICAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwcmV2UHJvcHMudG8pO1xuXG4gICAgICAgIGlmICghbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICAgICAgICBrZXk6IHByZXZMb2NhdGlvbi5rZXlcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvOiB0b1xuICAgIH0pO1xuICB9KTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gICAgcHVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZnJvbTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0bzogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLmlzUmVxdWlyZWRcbiAgfTtcbn1cblxudmFyIGNhY2hlJDEgPSB7fTtcbnZhciBjYWNoZUxpbWl0JDEgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50JDEgPSAwO1xuXG5mdW5jdGlvbiBjb21waWxlUGF0aCQxKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJcIiArIG9wdGlvbnMuZW5kICsgb3B0aW9ucy5zdHJpY3QgKyBvcHRpb25zLnNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhDYWNoZSA9IGNhY2hlJDFbY2FjaGVLZXldIHx8IChjYWNoZSQxW2NhY2hlS2V5XSA9IHt9KTtcbiAgaWYgKHBhdGhDYWNoZVtwYXRoXSkgcmV0dXJuIHBhdGhDYWNoZVtwYXRoXTtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHJlZ2V4cCA9IHBhdGhUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICByZWdleHA6IHJlZ2V4cCxcbiAgICBrZXlzOiBrZXlzXG4gIH07XG5cbiAgaWYgKGNhY2hlQ291bnQkMSA8IGNhY2hlTGltaXQkMSkge1xuICAgIHBhdGhDYWNoZVtwYXRoXSA9IHJlc3VsdDtcbiAgICBjYWNoZUNvdW50JDErKztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgVVJMIHBhdGhuYW1lIHRvIGEgcGF0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoUGF0aChwYXRobmFtZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSBvcHRpb25zID0ge1xuICAgIHBhdGg6IG9wdGlvbnNcbiAgfTtcbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBhdGggPSBfb3B0aW9ucy5wYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0LFxuICAgICAgX29wdGlvbnMkc2Vuc2l0aXZlID0gX29wdGlvbnMuc2Vuc2l0aXZlLFxuICAgICAgc2Vuc2l0aXZlID0gX29wdGlvbnMkc2Vuc2l0aXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhzID0gW10uY29uY2F0KHBhdGgpO1xuICByZXR1cm4gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAobWF0Y2hlZCkgcmV0dXJuIG1hdGNoZWQ7XG5cbiAgICB2YXIgX2NvbXBpbGVQYXRoID0gY29tcGlsZVBhdGgkMShwYXRoLCB7XG4gICAgICBlbmQ6IGV4YWN0LFxuICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICBzZW5zaXRpdmU6IHNlbnNpdGl2ZVxuICAgIH0pLFxuICAgICAgICByZWdleHAgPSBfY29tcGlsZVBhdGgucmVnZXhwLFxuICAgICAgICBrZXlzID0gX2NvbXBpbGVQYXRoLmtleXM7XG5cbiAgICB2YXIgbWF0Y2ggPSByZWdleHAuZXhlYyhwYXRobmFtZSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHVybCA9IG1hdGNoWzBdLFxuICAgICAgICB2YWx1ZXMgPSBtYXRjaC5zbGljZSgxKTtcbiAgICB2YXIgaXNFeGFjdCA9IHBhdGhuYW1lID09PSB1cmw7XG4gICAgaWYgKGV4YWN0ICYmICFpc0V4YWN0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIC8vIHRoZSBwYXRoIHVzZWQgdG8gbWF0Y2hcbiAgICAgIHVybDogcGF0aCA9PT0gXCIvXCIgJiYgdXJsID09PSBcIlwiID8gXCIvXCIgOiB1cmwsXG4gICAgICAvLyB0aGUgbWF0Y2hlZCBwb3J0aW9uIG9mIHRoZSBVUkxcbiAgICAgIGlzRXhhY3Q6IGlzRXhhY3QsXG4gICAgICAvLyB3aGV0aGVyIG9yIG5vdCB3ZSBtYXRjaGVkIGV4YWN0bHlcbiAgICAgIHBhcmFtczoga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSwgaW5kZXgpIHtcbiAgICAgICAgbWVtb1trZXkubmFtZV0gPSB2YWx1ZXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgIH0sIHt9KVxuICAgIH07XG4gIH0sIG51bGwpO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA9PT0gMDtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG5cbnZhciBSb3V0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZT4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQkJDEubG9jYXRpb247XG4gICAgICB2YXIgbWF0Y2ggPSBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoID8gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCAvLyA8U3dpdGNoPiBhbHJlYWR5IGNvbXB1dGVkIHRoZSBtYXRjaCBmb3IgdXNcbiAgICAgIDogX3RoaXMucHJvcHMucGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX3RoaXMucHJvcHMpIDogY29udGV4dCQkMS5tYXRjaDtcblxuICAgICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIGNvbnRleHQkJDEsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBtYXRjaDogbWF0Y2hcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNvbXBvbmVudCA9IF90aGlzJHByb3BzLmNvbXBvbmVudCxcbiAgICAgICAgICByZW5kZXIgPSBfdGhpcyRwcm9wcy5yZW5kZXI7IC8vIFByZWFjdCB1c2VzIGFuIGVtcHR5IGFycmF5IGFzIGNoaWxkcmVuIGJ5XG4gICAgICAvLyBkZWZhdWx0LCBzbyB1c2UgbnVsbCBpZiB0aGF0J3MgdGhlIGNhc2UuXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbihwcm9wcyk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IF90aGlzLnByb3BzLnBhdGg7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCBcIllvdSByZXR1cm5lZCBgdW5kZWZpbmVkYCBmcm9tIHRoZSBgY2hpbGRyZW5gIGZ1bmN0aW9uIG9mIFwiICsgKFwiPFJvdXRlXCIgKyAocGF0aCA/IFwiIHBhdGg9XFxcIlwiICsgcGF0aCArIFwiXFxcIlwiIDogXCJcIikgKyBcIj4sIGJ1dCB5b3UgXCIpICsgXCJzaG91bGQgaGF2ZSByZXR1cm5lZCBhIFJlYWN0IGVsZW1lbnQgb3IgYG51bGxgXCIpIDogdm9pZCAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIHZhbHVlOiBwcm9wc1xuICAgICAgfSwgY2hpbGRyZW4gJiYgIWlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikgPyBjaGlsZHJlbiA6IHByb3BzLm1hdGNoID8gY29tcG9uZW50ID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKSA6IHJlbmRlciA/IHJlbmRlcihwcm9wcykgOiBudWxsIDogbnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY29tcG9uZW50OiBmdW5jdGlvbiBjb21wb25lbnQocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICYmICFpc1ZhbGlkRWxlbWVudFR5cGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wICdjb21wb25lbnQnIHN1cHBsaWVkIHRvICdSb3V0ZSc6IHRoZSBwcm9wIGlzIG5vdCBhIHZhbGlkIFJlYWN0IGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwYXRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuICAgIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2Vuc2l0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5jb21wb25lbnQpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNvbXBvbmVudD4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgcmVuZGVyPiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgcmVuZGVyPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIiA/IHBhdGggOiBcIi9cIiArIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKSArIGxvY2F0aW9uLnBhdGhuYW1lXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoYmFzZS5sZW5ndGgpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXRpY0hhbmRsZXIobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3UgY2Fubm90ICVzIHdpdGggPFN0YXRpY1JvdXRlcj5cIiwgbWV0aG9kTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxuICogVGhlIHB1YmxpYyB0b3AtbGV2ZWwgQVBJIGZvciBhIFwic3RhdGljXCIgPFJvdXRlcj4sIHNvLWNhbGxlZCBiZWNhdXNlIGl0XG4gKiBjYW4ndCBhY3R1YWxseSBjaGFuZ2UgdGhlIGN1cnJlbnQgbG9jYXRpb24uIEluc3RlYWQsIGl0IGp1c3QgcmVjb3Jkc1xuICogbG9jYXRpb24gY2hhbmdlcyBpbiBhIGNvbnRleHQgb2JqZWN0LiBVc2VmdWwgbWFpbmx5IGluIHRlc3RpbmcgYW5kXG4gKiBzZXJ2ZXItcmVuZGVyaW5nIHNjZW5hcmlvcy5cbiAqL1xuXG5cbnZhciBTdGF0aWNSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoU3RhdGljUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTdGF0aWNSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfdGhpcy5oYW5kbGVQdXNoID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJQVVNIXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVSZXBsYWNlID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoaXMubmF2aWdhdGVUbyhsb2NhdGlvbiwgXCJSRVBMQUNFXCIpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVMaXN0ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFN0YXRpY1JvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm5hdmlnYXRlVG8gPSBmdW5jdGlvbiBuYXZpZ2F0ZVRvKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICB2YXIgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wcyRiYXNlbmFtZSA9IF90aGlzJHByb3BzLmJhc2VuYW1lLFxuICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzJGNvbnRleHQgPSBfdGhpcyRwcm9wcy5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wcyRjb250ZXh0O1xuICAgIGNvbnRleHQuYWN0aW9uID0gYWN0aW9uO1xuICAgIGNvbnRleHQubG9jYXRpb24gPSBhZGRCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKTtcbiAgICBjb250ZXh0LnVybCA9IGNyZWF0ZVVSTChjb250ZXh0LmxvY2F0aW9uKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMyJGJhc2VuYW1lID09PSB2b2lkIDAgPyBcIlwiIDogX3RoaXMkcHJvcHMyJGJhc2VuYW1lLFxuICAgICAgICBfdGhpcyRwcm9wczIkY29udGV4dCA9IF90aGlzJHByb3BzMi5jb250ZXh0LFxuICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMyJGNvbnRleHQgPT09IHZvaWQgMCA/IHt9IDogX3RoaXMkcHJvcHMyJGNvbnRleHQsXG4gICAgICAgIF90aGlzJHByb3BzMiRsb2NhdGlvbiA9IF90aGlzJHByb3BzMi5sb2NhdGlvbixcbiAgICAgICAgbG9jYXRpb24gPSBfdGhpcyRwcm9wczIkbG9jYXRpb24gPT09IHZvaWQgMCA/IFwiL1wiIDogX3RoaXMkcHJvcHMyJGxvY2F0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMyLCBbXCJiYXNlbmFtZVwiLCBcImNvbnRleHRcIiwgXCJsb2NhdGlvblwiXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IHtcbiAgICAgIGNyZWF0ZUhyZWY6IGZ1bmN0aW9uIGNyZWF0ZUhyZWYocGF0aCkge1xuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lICsgY3JlYXRlVVJMKHBhdGgpKTtcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IFwiUE9QXCIsXG4gICAgICBsb2NhdGlvbjogc3RyaXBCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKSxcbiAgICAgIHB1c2g6IHRoaXMuaGFuZGxlUHVzaCxcbiAgICAgIHJlcGxhY2U6IHRoaXMuaGFuZGxlUmVwbGFjZSxcbiAgICAgIGdvOiBzdGF0aWNIYW5kbGVyKFwiZ29cIiksXG4gICAgICBnb0JhY2s6IHN0YXRpY0hhbmRsZXIoXCJnb0JhY2tcIiksXG4gICAgICBnb0ZvcndhcmQ6IHN0YXRpY0hhbmRsZXIoXCJnb0ZvcndhcmRcIiksXG4gICAgICBsaXN0ZW46IHRoaXMuaGFuZGxlTGlzdGVuLFxuICAgICAgYmxvY2s6IHRoaXMuaGFuZGxlQmxvY2tcbiAgICB9O1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgIGhpc3Rvcnk6IGhpc3RvcnksXG4gICAgICBzdGF0aWNDb250ZXh0OiBjb250ZXh0XG4gICAgfSkpO1xuICB9O1xuXG4gIHJldHVybiBTdGF0aWNSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3RhdGljUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSlcbiAgfTtcblxuICBTdGF0aWNSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8U3RhdGljUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgU3RhdGljUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHJlbmRlcmluZyB0aGUgZmlyc3QgPFJvdXRlPiB0aGF0IG1hdGNoZXMuXG4gKi9cblxudmFyIFN3aXRjaCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTd2l0Y2gsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN3aXRjaCgpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3dpdGNoLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQkMSkge1xuICAgICAgIWNvbnRleHQkJDEgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxTd2l0Y2g+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JCQxLmxvY2F0aW9uO1xuICAgICAgdmFyIGVsZW1lbnQsIG1hdGNoOyAvLyBXZSB1c2UgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCBpbnN0ZWFkIG9mIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoKS5maW5kKClcbiAgICAgIC8vIGhlcmUgYmVjYXVzZSB0b0FycmF5IGFkZHMga2V5cyB0byBhbGwgY2hpbGQgZWxlbWVudHMgYW5kIHdlIGRvIG5vdCB3YW50XG4gICAgICAvLyB0byB0cmlnZ2VyIGFuIHVubW91bnQvcmVtb3VudCBmb3IgdHdvIDxSb3V0ZT5zIHRoYXQgcmVuZGVyIHRoZSBzYW1lXG4gICAgICAvLyBjb21wb25lbnQgYXQgZGlmZmVyZW50IFVSTHMuXG5cbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goX3RoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAobWF0Y2ggPT0gbnVsbCAmJiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICBlbGVtZW50ID0gY2hpbGQ7XG4gICAgICAgICAgdmFyIHBhdGggPSBjaGlsZC5wcm9wcy5wYXRoIHx8IGNoaWxkLnByb3BzLmZyb207XG4gICAgICAgICAgbWF0Y2ggPSBwYXRoID8gbWF0Y2hQYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBfZXh0ZW5kcyh7fSwgY2hpbGQucHJvcHMsIHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgICB9KSkgOiBjb250ZXh0JCQxLm1hdGNoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaCA/IFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgY29tcHV0ZWRNYXRjaDogbWF0Y2hcbiAgICAgIH0pIDogbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3dpdGNoO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgU3dpdGNoLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISghdGhpcy5wcm9wcy5sb2NhdGlvbiAmJiBwcmV2UHJvcHMubG9jYXRpb24pLCAnPFN3aXRjaD4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBwcm92aWRlZCBhIFwibG9jYXRpb25cIiBwcm9wIGluaXRpYWxseSBidXQgb21pdHRlZCBpdCBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIEEgcHVibGljIGhpZ2hlci1vcmRlciBjb21wb25lbnQgdG8gYWNjZXNzIHRoZSBpbXBlcmF0aXZlIEFQSVxuICovXG5cbmZ1bmN0aW9uIHdpdGhSb3V0ZXIoQ29tcG9uZW50KSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IFwid2l0aFJvdXRlcihcIiArIChDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUpICsgXCIpXCI7XG5cbiAgdmFyIEMgPSBmdW5jdGlvbiBDKHByb3BzKSB7XG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnRSZWYgPSBwcm9wcy53cmFwcGVkQ29tcG9uZW50UmVmLFxuICAgICAgICByZW1haW5pbmdQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHByb3BzLCBbXCJ3cmFwcGVkQ29tcG9uZW50UmVmXCJdKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0JCQxKSB7XG4gICAgICAhY29udGV4dCQkMSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFwiICsgZGlzcGxheU5hbWUgKyBcIiAvPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVtYWluaW5nUHJvcHMsIGNvbnRleHQkJDEsIHtcbiAgICAgICAgcmVmOiB3cmFwcGVkQ29tcG9uZW50UmVmXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICBDLldyYXBwZWRDb21wb25lbnQgPSBDb21wb25lbnQ7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIEMucHJvcFR5cGVzID0ge1xuICAgICAgd3JhcHBlZENvbXBvbmVudFJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5vYmplY3RdKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9pc3RTdGF0aWNzKEMsIENvbXBvbmVudCk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgZ2xvYmFsID0gd2luZG93O1xuICAgIHZhciBrZXkgPSBcIl9fcmVhY3Rfcm91dGVyX2J1aWxkX19cIjtcbiAgICB2YXIgYnVpbGROYW1lcyA9IHtcbiAgICAgIGNqczogXCJDb21tb25KU1wiLFxuICAgICAgZXNtOiBcIkVTIG1vZHVsZXNcIixcbiAgICAgIHVtZDogXCJVTURcIlxuICAgIH07XG5cbiAgICBpZiAoZ2xvYmFsW2tleV0gJiYgZ2xvYmFsW2tleV0gIT09IFwiZXNtXCIpIHtcbiAgICAgIHZhciBpbml0aWFsQnVpbGROYW1lID0gYnVpbGROYW1lc1tnbG9iYWxba2V5XV07XG4gICAgICB2YXIgc2Vjb25kYXJ5QnVpbGROYW1lID0gYnVpbGROYW1lc1tcImVzbVwiXTsgLy8gVE9ETzogQWRkIGxpbmsgdG8gYXJ0aWNsZSB0aGF0IGV4cGxhaW5zIGluIGRldGFpbCBob3cgdG8gYXZvaWRcbiAgICAgIC8vIGxvYWRpbmcgMiBkaWZmZXJlbnQgYnVpbGRzLlxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlIGxvYWRpbmcgdGhlIFwiICsgc2Vjb25kYXJ5QnVpbGROYW1lICsgXCIgYnVpbGQgb2YgUmVhY3QgUm91dGVyIFwiICsgKFwib24gYSBwYWdlIHRoYXQgaXMgYWxyZWFkeSBydW5uaW5nIHRoZSBcIiArIGluaXRpYWxCdWlsZE5hbWUgKyBcIiBcIikgKyBcImJ1aWxkLCBzbyB0aGluZ3Mgd29uJ3Qgd29yayByaWdodC5cIik7XG4gICAgfVxuXG4gICAgZ2xvYmFsW2tleV0gPSBcImVzbVwiO1xuICB9XG59XG5cbmV4cG9ydCB7IE1lbW9yeVJvdXRlciwgUHJvbXB0LCBSZWRpcmVjdCwgUm91dGUsIFJvdXRlciwgU3RhdGljUm91dGVyLCBTd2l0Y2gsIGdlbmVyYXRlUGF0aCwgbWF0Y2hQYXRoLCB3aXRoUm91dGVyLCBjb250ZXh0IGFzIF9fUm91dGVyQ29udGV4dCB9O1xuIiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlciwgX19Sb3V0ZXJDb250ZXh0LCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuZXhwb3J0ICogZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgY3JlYXRlTG9jYXRpb24gfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIEhUTUw1IGhpc3RvcnkuXG4gKi9cblxudmFyIEJyb3dzZXJSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoQnJvd3NlclJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQnJvd3NlclJvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcbiAgICBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBCcm93c2VyUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQnJvd3NlclJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBCcm93c2VyUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9yY2VSZWZyZXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXJcbiAgfTtcblxuICBCcm93c2VyUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPEJyb3dzZXJSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9YC5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCB1c2VzIHdpbmRvdy5sb2NhdGlvbi5oYXNoLlxuICovXG5cbnZhciBIYXNoUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEhhc2hSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEhhc2hSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSGFzaFJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEhhc2hSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgSGFzaFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhc2hUeXBlOiBQcm9wVHlwZXMub25lT2YoW1wiaGFzaGJhbmdcIiwgXCJub3NsYXNoXCIsIFwic2xhc2hcIl0pXG4gIH07XG5cbiAgSGFzaFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxIYXNoUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgSGFzaFJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIGEgaGlzdG9yeS1hd2FyZSA8YT4uXG4gKi9cblxuXG52YXIgTGluayA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaW5rKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaW5rLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCwgaGlzdG9yeSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuXG4gICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBpZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgICAhdGhpcy5wcm9wcy50YXJnZXQgfHwgdGhpcy5wcm9wcy50YXJnZXQgPT09IFwiX3NlbGZcIikgJiYgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAhaXNNb2RpZmllZEV2ZW50KGV2ZW50KSAvLyBpZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wcm9wcy5yZXBsYWNlID8gaGlzdG9yeS5yZXBsYWNlIDogaGlzdG9yeS5wdXNoO1xuICAgICAgICBtZXRob2QodGhpcy5wcm9wcy50byk7XG4gICAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgaW5uZXJSZWYgPSBfdGhpcyRwcm9wcy5pbm5lclJlZixcbiAgICAgICAgcmVwbGFjZSA9IF90aGlzJHByb3BzLnJlcGxhY2UsXG4gICAgICAgIHRvID0gX3RoaXMkcHJvcHMudG8sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wcywgW1wiaW5uZXJSZWZcIiwgXCJyZXBsYWNlXCIsIFwidG9cIl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGNyZWF0ZUxvY2F0aW9uKHRvLCBudWxsLCBudWxsLCBjb250ZXh0LmxvY2F0aW9uKSA6IHRvO1xuICAgICAgdmFyIGhyZWYgPSBsb2NhdGlvbiA/IGNvbnRleHQuaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKSA6IFwiXCI7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVDbGljayhldmVudCwgY29udGV4dC5oaXN0b3J5KTtcbiAgICAgICAgfSxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgcmVmOiBpbm5lclJlZlxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBMaW5rO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciB0b1R5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSk7XG4gIHZhciBpbm5lclJlZlR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBjdXJyZW50OiBQcm9wVHlwZXMuYW55XG4gIH0pXSk7XG4gIExpbmsucHJvcFR5cGVzID0ge1xuICAgIGlubmVyUmVmOiBpbm5lclJlZlR5cGUsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVwbGFjZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvOiB0b1R5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBqb2luQ2xhc3NuYW1lcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzbmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2xhc3NuYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc25hbWVzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5qb2luKFwiIFwiKTtcbn1cbi8qKlxuICogQSA8TGluaz4gd3JhcHBlciB0aGF0IGtub3dzIGlmIGl0J3MgXCJhY3RpdmVcIiBvciBub3QuXG4gKi9cblxuXG5mdW5jdGlvbiBOYXZMaW5rKF9yZWYpIHtcbiAgdmFyIF9yZWYkYXJpYUN1cnJlbnQgPSBfcmVmW1wiYXJpYS1jdXJyZW50XCJdLFxuICAgICAgYXJpYUN1cnJlbnQgPSBfcmVmJGFyaWFDdXJyZW50ID09PSB2b2lkIDAgPyBcInBhZ2VcIiA6IF9yZWYkYXJpYUN1cnJlbnQsXG4gICAgICBfcmVmJGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYuYWN0aXZlQ2xhc3NOYW1lLFxuICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3JlZiRhY3RpdmVDbGFzc05hbWUgPT09IHZvaWQgMCA/IFwiYWN0aXZlXCIgOiBfcmVmJGFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZVN0eWxlID0gX3JlZi5hY3RpdmVTdHlsZSxcbiAgICAgIGNsYXNzTmFtZVByb3AgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGV4YWN0ID0gX3JlZi5leGFjdCxcbiAgICAgIGlzQWN0aXZlUHJvcCA9IF9yZWYuaXNBY3RpdmUsXG4gICAgICBsb2NhdGlvblByb3AgPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgc3RyaWN0ID0gX3JlZi5zdHJpY3QsXG4gICAgICBzdHlsZVByb3AgPSBfcmVmLnN0eWxlLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImFyaWEtY3VycmVudFwiLCBcImFjdGl2ZUNsYXNzTmFtZVwiLCBcImFjdGl2ZVN0eWxlXCIsIFwiY2xhc3NOYW1lXCIsIFwiZXhhY3RcIiwgXCJpc0FjdGl2ZVwiLCBcImxvY2F0aW9uXCIsIFwic3RyaWN0XCIsIFwic3R5bGVcIiwgXCJ0b1wiXSk7XG5cbiAgdmFyIHBhdGggPSB0eXBlb2YgdG8gPT09IFwib2JqZWN0XCIgPyB0by5wYXRobmFtZSA6IHRvOyAvLyBSZWdleCB0YWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vcGlsbGFyanMvcGF0aC10by1yZWdleHAvYmxvYi9tYXN0ZXIvaW5kZXguanMjTDIwMlxuXG4gIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9fUm91dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPE5hdkxpbms+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHBhdGhUb01hdGNoID0gbG9jYXRpb25Qcm9wID8gbG9jYXRpb25Qcm9wLnBhdGhuYW1lIDogY29udGV4dC5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgbWF0Y2ggPSBlc2NhcGVkUGF0aCA/IG1hdGNoUGF0aChwYXRoVG9NYXRjaCwge1xuICAgICAgcGF0aDogZXNjYXBlZFBhdGgsXG4gICAgICBleGFjdDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdFxuICAgIH0pIDogbnVsbDtcbiAgICB2YXIgaXNBY3RpdmUgPSAhIShpc0FjdGl2ZVByb3AgPyBpc0FjdGl2ZVByb3AobWF0Y2gsIGNvbnRleHQubG9jYXRpb24pIDogbWF0Y2gpO1xuICAgIHZhciBjbGFzc05hbWUgPSBpc0FjdGl2ZSA/IGpvaW5DbGFzc25hbWVzKGNsYXNzTmFtZVByb3AsIGFjdGl2ZUNsYXNzTmFtZSkgOiBjbGFzc05hbWVQcm9wO1xuICAgIHZhciBzdHlsZSA9IGlzQWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlUHJvcCwgYWN0aXZlU3R5bGUpIDogc3R5bGVQcm9wO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIF9leHRlbmRzKHtcbiAgICAgIFwiYXJpYS1jdXJyZW50XCI6IGlzQWN0aXZlICYmIGFyaWFDdXJyZW50IHx8IG51bGwsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHRvOiB0b1xuICAgIH0sIHJlc3QpKTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgdmFyIGFyaWFDdXJyZW50VHlwZSA9IFByb3BUeXBlcy5vbmVPZihbXCJwYWdlXCIsIFwic3RlcFwiLCBcImxvY2F0aW9uXCIsIFwiZGF0ZVwiLCBcInRpbWVcIiwgXCJ0cnVlXCJdKTtcbiAgTmF2TGluay5wcm9wVHlwZXMgPSBfZXh0ZW5kcyh7fSwgTGluay5wcm9wVHlwZXMsIHtcbiAgICBcImFyaWEtY3VycmVudFwiOiBhcmlhQ3VycmVudFR5cGUsXG4gICAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIExpbmssIE5hdkxpbmsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZW1haWxSZWdleCA9IC9bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8vXG5jb25zdCBwYXNzd29yZFJlZ2V4ID0vKCg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKltcXFddKS57OCw2NH0pL2dcbmNvbnN0IGVtYWlsUmVxdWlyZW1lbnRzPVwid3JvbmcgZW1haWwgZm9ybWF0XCJcbmNvbnN0IHBhc3Nwb3J0UmVxdWlyZW1lbnRzPVwiRW5zdXJlIHRoYXQgcGFzc3dvcmQgaXMgOCB0byA2NCBjaGFyYWN0ZXJzIGxvbmcgYW5kIGNvbnRhaW5zIGEgbWl4IG9mIHVwcGVyIGFuZCBsb3dlciBjYXNlIGNoYXJhY3RlcnMsIG9uZSBudW1lcmljIGFuZCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIlxuXG5jb25zdCBjcmVkZW50aWFsVmFsaWRhdGlvbj0oe2VtYWlsLHBhc3N3b3JkfSk9PiB7XG4gICAgbGV0IGVtID1lbWFpbFJlZ2V4LnRlc3QoZW1haWwpPyB7aXNWYWxpZDp0cnVlfTp7aXNWYWxpZDpmYWxzZSxtZXNzYWdlOmVtYWlsUmVxdWlyZW1lbnRzfVxuICAgIGxldCBwYXNzID0gcGFzc3dvcmRSZWdleC50ZXN0KHBhc3N3b3JkKT8ge2lzVmFsaWQ6dHJ1ZX06e2lzVmFsaWQ6ZmFsc2UsbWVzc2FnZTpwYXNzcG9ydFJlcXVpcmVtZW50c31cbiAgICByZXR1cm4ge2VtYWlsOmVtLHBhc3N3b3JkOnBhc3N9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWRlbnRpYWxWYWxpZGF0aW9uXG5cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGRlZXBNZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIC8vIE9ubHkgTm9kZS5KUyBoYXMgYSBwcm9jZXNzIHZhcmlhYmxlIHRoYXQgaXMgb2YgW1tDbGFzc11dIHByb2Nlc3NcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHV0aWxzLmZvckVhY2goWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ10sIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J10sIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsXG4gICAgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsXG4gICAgJ3NvY2tldFBhdGgnXG4gIF0sIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kID8gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ2dldCc7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ0BhdXRoanMvdmFsaWRhdGlvbidcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmV4cG9ydCBjb25zdCBFbWFpbFBhc3N3b3JkQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKVxuXG5jb25zdCBpbml0VmFsaWRhdGlvbiA9IHtcbiAgICBlbWFpbDogeyBpc1ZhbGlkOiB0cnVlLCBtZXNzYWdlOiBcIlwiIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgaXNWYWxpZDogdHJ1ZSwgbWVzc2FnZTogXCJcIlxuICAgIH1cbn1cbmNsYXNzIEVtYWlsUGFzc3dvcmRQcm92aWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGUgPSB7IGxvYWRpbmc6IGZhbHNlLCB0b2tlbjogXCJcIiwgaXNMb2dnZWRJbjogZmFsc2UsIGVtYWlsOiBcIlwiLCBwYXNzd29yZDogXCJcIiwgY29uZmlybTogXCJcIiwgc2VydmVyRXJyb3I6IFwiXCIsIHZhbGlkYXRpb246IGluaXRWYWxpZGF0aW9uIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ2dlZEluKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvZ2dlZEluOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgc2V0VG9rZW4gPSAoeyB0b2tlbiB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2tlbiB9KVxuICAgIH1cbiAgICBvbkNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiB2YWx1ZSB9KVxuICAgICAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgfVxuICAgIHJlc2V0VmFsaWRhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IGluaXRWYWxpZGF0aW9uIH0pXG4gICAgfVxuICAgIHJlY292ZXJQYXNzd29yZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0ID0gdmFsaWRhdGUoeyBlbWFpbCB9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0LmVtYWlsLmlzVmFsaWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9yZWNvdmVyJywgeyBlbWFpbCB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZGF0aW9uLmVtYWlsLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4uZGF0YS52YWxpZGF0aW9uIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVzZXRQYXNzd29yZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBwYXNzd29yZCwgdG9rZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHZhbGlkYXRlKHsgcGFzc3dvcmQgfSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHsgLi4udmFsaWRhdGlvblJlc3VsdCB9IH0pXG4gICAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdC5wYXNzd29yZC5pc1ZhbGlkKSB7XG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvY2hhbmdlJywgeyBwYXNzd29yZCwgdG9rZW4gfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2U6IGRhdGEgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzaWdudXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB2YWxpZGF0ZSh7IGVtYWlsLCBwYXNzd29yZCB9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgLy9DbGllbnQgc2lkZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdC5lbWFpbC5pc1ZhbGlkIHwgIXZhbGlkYXRpb25SZXN1bHQucGFzc3dvcmQuaXNWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9zaWdudXAnLCB7IGVtYWlsLCBwYXNzd29yZCB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAvL1NlcnZlciBzaWRlIHZhbGlkYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9IH0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oZGF0YS50b2tlbik7IC8vIFNldHRpbmcgdGhlIHRva2VuIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJFcnJvcjogZXJyb3IgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgbG9naW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB2YWxpZGF0ZSh7IGVtYWlsLCBwYXNzd29yZCB9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsaWRhdGlvbjogeyAuLi52YWxpZGF0aW9uUmVzdWx0IH0gfSlcbiAgICAgICAgLy9DbGllbnQgc2lkZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdC5lbWFpbC5pc1ZhbGlkIHwgIXZhbGlkYXRpb25SZXN1bHQucGFzc3dvcmQuaXNWYWxpZCkge1xuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgYSB0b2tlbiBmcm9tIGFwaSBzZXJ2ZXIgdXNpbmcgdGhlIGZldGNoIGFwaVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KVxuXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9sb2ctaW4nLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJheGlvcyByZXNwb25zZVwiLCByZXNwb25zZSlcbiAgICAgICAgICAgIC8vU2VydmVyIHNpZGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgaWYgKGRhdGEudG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWxpZGF0aW9uOiB7IC4uLmRhdGEudmFsaWRhdGlvbiB9IH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMb2dnZWRJbjogdHJ1ZSB9KVxuICAgICAgICAgICAgdGhpcy5zZXRUb2tlbihkYXRhLnRva2VuKTsgLy8gU2V0dGluZyB0aGUgdG9rZW4gaW4gbG9jYWxTdG9yYWdlXG5cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGxvZ2dlZEluID0gKCkgPT4ge1xuICAgICAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgYSBzYXZlZCB0b2tlbiBhbmQgaXQncyBzdGlsbCB2YWxpZFxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTsgLy8gR2V0dGluZyB0b2tlbiBmcm9tIGxvY2Fsc3RvcmFnZVxuICAgICAgICByZXR1cm4gISF0b2tlbiAmJiAhdGhpcy5pc1Rva2VuRXhwaXJlZCh0b2tlbik7IC8vIGhhbmR3YWl2aW5nIGhlcmVcbiAgICB9O1xuXG4gICAgaXNUb2tlbkV4cGlyZWQgPSB0b2tlbiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlKHRva2VuKTtcbiAgICAgICAgICAgIGlmIChkZWNvZGVkLmV4cCA8IERhdGUubm93KCkgLyAxMDAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdG9rZW4gaXMgZXhwaXJlZC5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNldFRva2VuID0gaWRUb2tlbiA9PiB7XG4gICAgICAgIC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRfdG9rZW5cIiwgaWRUb2tlbik7XG4gICAgfTtcblxuICAgIGdldFRva2VuID0gKCkgPT4ge1xuICAgICAgICAvLyBSZXRyaWV2ZXMgdGhlIHVzZXIgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTG9nZ2VkSW46IGZhbHNlLCB1c2VybmFtZTogXCJcIiwgZXJyb3I6IFwiXCIsIG1lc3NhZ2U6IFwiXCIgfSlcbiAgICAgICAgLy8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaWRfdG9rZW5cIik7XG4gICAgfTtcblxuICAgIGdldENvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgIC8vIFVzaW5nIGp3dC1kZWNvZGUgbnBtIHBhY2thZ2UgdG8gZGVjb2RlIHRoZSB0b2tlblxuICAgICAgICBsZXQgYW5zd2VyID0gZGVjb2RlKHRoaXMuZ2V0VG9rZW4oKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYW5zd2VyIVwiKTtcbiAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICB9O1xuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBpc0xvZ2dlZEluLCBlbWFpbCwgcGFzc3dvcmQsIHZhbGlkYXRpb24sIGNvbmZpcm0gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tcbiAgICAgICAgICAgIGxvZ2luOiB0aGlzLmxvZ2luLFxuICAgICAgICAgICAgaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGxvZ2dlZEluOiB0aGlzLmxvZ2dlZEluLFxuICAgICAgICAgICAgbG9nb3V0OiB0aGlzLmxvZ291dCxcbiAgICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgICBzaWdudXA6IHRoaXMuc2lnbnVwLFxuICAgICAgICAgICAgcmVzZXRQYXNzd29yZDogdGhpcy5yZXNldFBhc3N3b3JkLFxuICAgICAgICAgICAgcmVjb3ZlclBhc3N3b3JkOiB0aGlzLnJlY292ZXJQYXNzd29yZCxcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBjb25maXJtLFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsXG4gICAgICAgICAgICB2YWxpZGF0aW9uLFxuICAgICAgICAgICAgc2V0VG9rZW46IHRoaXMuc2V0VG9rZW5cbiAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Qcm92aWRlcj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW1haWxQYXNzd29yZFByb3ZpZGVyIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuZXhwb3J0IGNvbnN0IFVzZXJBZG1pbkNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KClcbmNsYXNzIFVzZXJBZG1pbmlzdHJhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0ZSA9IHsgdXNlcnM6IFtdIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VyQWRtaW5pc3RyYXRpb24gbG9hZGVkXCIpXG4gICAgICAgIHRoaXMuZ2V0VXNlcnMoKVxuICAgIH1cbiAgICBnZXRVc2VycyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2goYC91c2Vyc2AsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcy0tLVwiLHJlcylcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJzOnJlcy51c2Vyc30pXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2dpbi0tLS4uLi5cIiwgZXJyb3IpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyRXJyb3I6IGVycm9yIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZmluZFVzZXIgPSAoaWQpID0+IHtcblxuICAgIH1cblxuICAgIHVwZGF0ZVVzZXIgPSAoKSA9PiB7XG4gICAgfVxuXG4gICAgZGVsZXRlVXNlciA9IChpZCkgPT4ge1xuXG4gICAgfVxuXG4gICAgZmV0Y2ggPSAodXJsLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIC8vIHBlcmZvcm1zIGFwaSBjYWxscyBzZW5kaW5nIHRoZSByZXF1aXJlZCBhdXRoZW50aWNhdGlvbiBoZWFkZXJzXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU2V0dGluZyBBdXRob3JpemF0aW9uIGhlYWRlclxuICAgICAgICAvLyBBdXRob3JpemF0aW9uOiBCZWFyZXIgeHh4eHh4eC54eHh4eHh4eC54eHh4eHhcbiAgXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cylcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfTtcblxuICAgIF9jaGVja1N0YXR1cyA9IHJlc3BvbnNlID0+IHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSlcbiAgICAgICAgLy8gcmFpc2VzIGFuIGVycm9yIGluIGNhc2UgcmVzcG9uc2Ugc3RhdHVzIGlzIG5vdCBhIHN1Y2Nlc3NcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG5cbiAgICAgICAgICAgIC8vIFN1Y2Nlc3Mgc3RhdHVzIGxpZXMgYmV0d2VlbiAyMDAgdG8gMzAwXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KVxuICAgICAgICAgICAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3Qge3VzZXJzfT0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj57Y2hpbGRyZW4oeyB1c2VycyxnZXRVc2VyczogdGhpcy5nZXRVc2VycywgZmluZFVzZXI6IHRoaXMuZmluZFVzZXIsIGRlbGV0ZVVzZXI6IHRoaXMuZGVsZXRlVXNlciwgdXBkYXRlVXNlcjogdGhpcy51cGRhdGVVc2VyIH0pfTwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJBZG1pbmlzdHJhdGlvbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5jb25zdCBDdXN0b21JbnB1dCA9ICh7IHR5cGUsIHBsYWNlaG9sZGVyLCBuYW1lLCB2YWxpZGF0aW9uLCBvbkNoYW5nZSwgdmFsdWUsIGxhYmVsIH0pID0+IHtcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yaHRtbD1cInBhc3N3b3JkXCI+e2xhYmVsfTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZm9ybS1jb250cm9sJywgeyAnaXMtaW52YWxpZCc6ICF2YWxpZGF0aW9uLmlzVmFsaWQgfSl9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsdWU9e3ZhbHVlfSBuYW1lPXtuYW1lfSB0eXBlPXt0eXBlfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnZhbGlkLWZlZWRiYWNrXCI+XG4gICAgICAgICAgICB7dmFsaWRhdGlvbi5tZXNzYWdlfTwvZGl2PlxuXG4gICAgPC9kaXY+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21JbnB1dCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVtYWlsUGFzc3dvcmRDb250ZXh0IH0gZnJvbSAnQGF1dGhqcy9tZXJuLXJlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgQ3VzdG9tSW5wdXQgZnJvbSAnLi9DdXN0b21JbnB1dCdcblxuY29uc3QgTG9naW4gPSgpPT57XG4gICAgcmV0dXJuICg8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgIHsoe2VtYWlsLHBhc3N3b3JkLGxvZ2luLG9uQ2hhbmdlLHZhbGlkYXRpb24saXNMb2dnZWRJbn0pPT57XG4gICAgICAgICAgICBpZighaXNMb2dnZWRJbilcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPkxvZ2luOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21JbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLmVtYWlsIH19IGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEN1c3RvbUlucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gdmFsaWRhdGlvbj17eyAuLi52YWxpZGF0aW9uLnBhc3N3b3JkIH19IGxhYmVsPVwiUGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nc3VibWl0JyBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtsb2dpbn0+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9yZWNvdmVyXCI+Rm9yZ290IFBhc3N3b3JkICE8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz1cIi9cIiAvPlxuICAgICAgICB9fVxuICAgIDwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL21lcm4tcmVhY3QnXG5pbXBvcnQgQ3VzdG9tSW5wdXQgZnJvbSAnLi9DdXN0b21JbnB1dCdcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5jb25zdCBTaWduVXAgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBvbkNoYW5nZSwgZW1haWwsIHBhc3N3b3JkLCBzaWdudXAsIHZhbGlkYXRpb24sIGlzTG9nZ2VkSW4gfSkgPT4ge1xuICAgICAgICAgIGlmKCFpc0xvZ2dlZEluKVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5TaWduIFVwOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3VzdG9tSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3VzdG9tSW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3NpZ251cH0+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz1cIi9cIiAvPlxuICAgICAgICB9fTwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWduVXAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBFbWFpbFBhc3N3b3JkQ29udGV4dCB9IGZyb20gJ0BhdXRoanMvbWVybi1yZWFjdCdcbmltcG9ydCB7IE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuY29uc3QgQXV0aFN0YXRlID0gKCkgPT4ge1xuICAgIHJldHVybiA8RW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+eyh7IGlzTG9nZ2VkSW4sIGxvZ291dCB9KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzbG9nZ2VkSW5cIixpc0xvZ2dlZEluKVxuICAgICAgICByZXR1cm4gPGRpdj57aXNMb2dnZWRJbiA/IDxOYXZMaW5rIHRvPVwiL1wiIG9uQ2xpY2s9e2xvZ291dH0+TG9nT3V0PC9OYXZMaW5rPiA6IDxkaXY+PE5hdkxpbmsgdG89XCIvbG9naW5cIj5Mb2dpbjwvTmF2TGluaz48TmF2TGluayB0bz1cIi9zaWdudXBcIj5TaWduVXA8L05hdkxpbms+PC9kaXY+fTwvZGl2PlxuICAgIH19XG4gICAgPC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0aFN0YXRlIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL21lcm4tcmVhY3QnXG5pbXBvcnQgQ3VzdG9tSW5wdXQgZnJvbSAnLi9DdXN0b21JbnB1dCdcblxuXG5jb25zdCBSZXNldFBhc3N3b3JkID0gKCkgPT4ge1xuICAgIHJldHVybiAoPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBwYXNzd29yZCwgY29uZmlybSwgcmVzZXRQYXNzd29yZCwgdmFsaWRhdGlvbiB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlJlc2V0IFBhc3N3b3JkOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21JbnB1dCBwbGFjZWhvbGRlcj1cIk5ldyBQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtwYXNzd29yZH0gb25DaGFuZ2U9e29uQ2hhbmdlfSB2YWxpZGF0aW9uPXt7IC4uLnZhbGlkYXRpb24ucGFzc3dvcmQgfX0gbGFiZWw9XCJOZXcgUGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21JbnB1dCBwbGFjZWhvbGRlcj1cIkNvbmZpcm0gUGFzc3dvcmRcIiBuYW1lPVwiY29uZmlybVwiIHR5cGU9XCJwYXNzd29yZFwiIHZhbHVlPXtjb25maXJtfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5wYXNzd29yZCB9fSBsYWJlbD1cIkNvbmZpcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17cmVzZXRQYXNzd29yZH0+UmVzZXQgUGFzc3dvcmQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9fTwvRW1haWxQYXNzd29yZENvbnRleHQuQ29uc3VtZXI+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXNldFBhc3N3b3JkIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRW1haWxQYXNzd29yZENvbnRleHQgfSBmcm9tICdAYXV0aGpzL21lcm4tcmVhY3QnXG5pbXBvcnQgQ3VzdG9tSW5wdXQgZnJvbSAnLi9DdXN0b21JbnB1dCdcblxuXG5jb25zdCBSZWNvdmVyUGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEVtYWlsUGFzc3dvcmRDb250ZXh0LkNvbnN1bWVyPnsoeyBlbWFpbCwgb25DaGFuZ2UsIHZhbGlkYXRpb24sIHJlY292ZXIgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5SZWNvdmVyIFBhc3N3b3JkOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3VzdG9tSW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17b25DaGFuZ2V9IHZhbGlkYXRpb249e3sgLi4udmFsaWRhdGlvbi5lbWFpbCB9fSBsYWJlbD1cIkVtYWlsIEFkZHJlc3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17cmVjb3Zlcn0+UmVjb3ZlciBQYXNzd29yZDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH19PC9FbWFpbFBhc3N3b3JkQ29udGV4dC5Db25zdW1lcj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY292ZXJQYXNzd29yZCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdj5Ib21lPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7VXNlckFkbWluaXN0cmF0aW9ufSBmcm9tICdAYXV0aGpzL21lcm4tcmVhY3QnXG5cbmNvbnN0IFVzZXJzID0oKT0+e1xucmV0dXJuICg8VXNlckFkbWluaXN0cmF0aW9uPnsoe3VzZXJzfSk9PntcbiAgICByZXR1cm4gPFVzZXJUYWJsZSB1c2Vycz17dXNlcnN9Lz5cbn19PC9Vc2VyQWRtaW5pc3RyYXRpb24+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBVc2Vyc1xuXG5cbmNvbnN0IFVzZXJUYWJsZSA9KHt1c2Vyc30pPT57XG5cbiAgICByZXR1cm4gKDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj4jX2lkPC90aD5cbiAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+RW1haWw8L3RoPlxuICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5QYXNzd29yZDwvdGg+XG4gICAgICAgIDx0aCBzY29wZT1cImNvbFwiPkVkaXQ8L3RoPlxuICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5EZWxldGU8L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPiAgICBcbiAgICA8dGJvZHk+e3VzZXJzLm1hcCgodSxpKT0+e1xuICAgICAgICByZXR1cm4gKCA8dHIga2V5PXtpfT4gXG4gICAgICAgICAgICA8dGQ+e3UuX2lkfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3UuZW1haWx9PC90ZD5cbiAgICAgICAgICAgIDx0ZD4qKioqKioqKioqKioqKioqKio8L3RkPlxuICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+RWRpdDwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgPC90cj4pXG4gICAgfSl9XG4gICAgIFxuXG4gICAgXG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT4pXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsSGFzaFJvdXRlciwgUm91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IExvZ2luIGZyb20gJy4vTG9naW4nXG5pbXBvcnQgU2lnblVwIGZyb20gJy4vU2lnbnVwJ1xuaW1wb3J0IEF1dGhTdGF0ZSBmcm9tICcuL0F1dGhTdGF0ZSdcbmltcG9ydCBSZXNldFBhc3N3b3JkIGZyb20gJy4vUmVzZXRQYXNzd29yZCdcbmltcG9ydCBSZWNvdmVyUGFzc3dvcmQgZnJvbSAnLi9SZWNvdmVyUGFzc3dvcmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuL0hvbWUnXG5pbXBvcnQgVXNlcnMgZnJvbSAnLi9Vc2VycydcbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgPEhhc2hSb3V0ZXI+XG4gICAgICAgICAgICA8bmF2IHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIiB9fT5cbiAgICAgICAgICAgICAgIDxBdXRoU3RhdGUvPlxuICAgICAgICAgICAgICAgPExpbmsgdG89XCIvdXNlcmFkbWluXCI+VXNlcnM8L0xpbms+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3VzZXJhZG1pblwiIGNvbXBvbmVudD17VXNlcnN9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiIGNvbXBvbmVudD17SG9tZX0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2xvZ2luXCIgY29tcG9uZW50PXtMb2dpbn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3NpZ251cFwiIGNvbXBvbmVudD17U2lnblVwfSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVjb3ZlclwiIGNvbXBvbmVudD17UmVjb3ZlclBhc3N3b3JkfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZXNldHBhc3MvOnVzZXJuYW1lLzp0b2tlblwiIGNvbXBvbmVudD17UmVzZXRQYXNzd29yZH0vPlxuICAgICAgICA8L0hhc2hSb3V0ZXI+XG4gICAgPC9kaXY+XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXG5pbXBvcnQgRW1haWxQYXNzd29yZFByb3ZpZGVyIGZyb20gJ0BhdXRoanMvbWVybi1yZWFjdCdcblJlYWN0RE9NLnJlbmRlcihcbiAgPGRpdj5cbiAgICA8RW1haWxQYXNzd29yZFByb3ZpZGVyPlxuICAgIDxBcHAvPlxuICAgIDwvRW1haWxQYXNzd29yZFByb3ZpZGVyPlxuXG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJfaW5oZXJpdHNMb29zZSIsIm9uIiwib2ZmIiwiQ29tcG9uZW50IiwiUmVhY3QiLCJpc1Byb2R1Y3Rpb24iLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsIlJlYWN0SXMiLCJjcmVhdGVDb250ZXh0IiwicGF0aFRvUmVnZXhwIiwiaW5kZXgiLCJpc1ZhbGlkRWxlbWVudFR5cGUiLCJhZGRMZWFkaW5nU2xhc2giLCJzdHJpcEJhc2VuYW1lIiwibm9vcCIsImtleSIsIl9fUm91dGVyQ29udGV4dCIsImNvbnRleHQiLCJlbWFpbFJlZ2V4IiwicGFzc3dvcmRSZWdleCIsImVtYWlsUmVxdWlyZW1lbnRzIiwicGFzc3BvcnRSZXF1aXJlbWVudHMiLCJjcmVkZW50aWFsVmFsaWRhdGlvbiIsImVtYWlsIiwicGFzc3dvcmQiLCJlbSIsInRlc3QiLCJpc1ZhbGlkIiwibWVzc2FnZSIsInBhc3MiLCJjb29raWVzIiwiZGVmYXVsdHMiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJDYW5jZWwiLCJBeGlvcyIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiRW1haWxQYXNzd29yZENvbnRleHQiLCJpbml0VmFsaWRhdGlvbiIsIkVtYWlsUGFzc3dvcmRQcm92aWRlciIsImxvYWRpbmciLCJ0b2tlbiIsImlzTG9nZ2VkSW4iLCJjb25maXJtIiwic2VydmVyRXJyb3IiLCJ2YWxpZGF0aW9uIiwic2V0U3RhdGUiLCJlIiwibmFtZSIsInRhcmdldCIsInZhbHVlIiwicmVzZXRWYWxpZGF0aW9uIiwic3RhdGUiLCJ2YWxpZGF0aW9uUmVzdWx0IiwidmFsaWRhdGUiLCJheGlvcyIsInBvc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJzZXRUb2tlbiIsImdldCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRUb2tlbiIsImlzVG9rZW5FeHBpcmVkIiwiZGVjb2RlZCIsImRlY29kZSIsImV4cCIsIkRhdGUiLCJub3ciLCJpZFRva2VuIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJ1c2VybmFtZSIsInJlbW92ZUl0ZW0iLCJhbnN3ZXIiLCJsb2dnZWRJbiIsImNoaWxkcmVuIiwicHJvcHMiLCJsb2dpbiIsImxvZ291dCIsInNpZ251cCIsInJlc2V0UGFzc3dvcmQiLCJyZWNvdmVyUGFzc3dvcmQiLCJvbkNoYW5nZSIsIlVzZXJBZG1pbkNvbnRleHQiLCJVc2VyQWRtaW5pc3RyYXRpb24iLCJ1c2VycyIsImZldGNoIiwibWV0aG9kIiwicmVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpZCIsInVybCIsIm9wdGlvbnMiLCJoZWFkZXJzIiwiQWNjZXB0IiwiX2NoZWNrU3RhdHVzIiwianNvbiIsInN0YXR1cyIsIkVycm9yIiwic3RhdHVzVGV4dCIsImdldFVzZXJzIiwiZmluZFVzZXIiLCJkZWxldGVVc2VyIiwidXBkYXRlVXNlciIsIkN1c3RvbUlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibGFiZWwiLCJjbGFzc05hbWVzIiwiTG9naW4iLCJTaWduVXAiLCJBdXRoU3RhdGUiLCJSZXNldFBhc3N3b3JkIiwiUmVjb3ZlclBhc3N3b3JkIiwicmVjb3ZlciIsIkhvbWUiLCJVc2VycyIsIlVzZXJUYWJsZSIsIm1hcCIsInUiLCJpIiwiX2lkIiwiQXBwIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBZSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNO1lBQ3RELFlBQVksT0FBTyxJQUFJLEtBQUssV0FBVyxHQUFHLElBQUk7WUFDOUMsWUFBWSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRTs7WUNGekQ7OztZQUdBLFNBQVMsZ0JBQWdCLEdBQUc7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUN0RDtZQUNELFNBQVMsbUJBQW1CLElBQUk7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUN4RDtZQUNELElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDeEMsSUFBSSxrQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztZQUM3QyxJQUFJLE9BQU9BLFFBQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUN6QyxnQkFBZ0IsR0FBRyxVQUFVLENBQUM7YUFDakM7WUFDRCxJQUFJLE9BQU9BLFFB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QyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUNqZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxPQUFP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
