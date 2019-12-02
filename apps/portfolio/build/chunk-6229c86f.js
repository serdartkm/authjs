import { c as createCommonjsModule, m as unwrapExports, d as _interopRequireDefault, f as require$$1, e as require$$0, g as require$$2, h as require$$3, i as require$$4, j as require$$5, k as require$$6, l as _preact, n as require$$0$1, q as styleInject, A as d, x as v, y as _slicedToArray, B as p, r as h } from './chunk-42fdbf08.js';

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports);

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

var generateThemeClass = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _default;

  function _default(prop) {
    return "mdc-theme--".concat(prop, "-bg");
  }
});
unwrapExports(generateThemeClass);

var Button_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Button = exports.ButtonIcon = void 0;

  var _createClass2 = _interopRequireDefault(require$$1);

  var _classCallCheck2 = _interopRequireDefault(require$$0);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _MaterialComponent2 = _interopRequireDefault(require$$5);

  var _Icon2 = _interopRequireDefault(require$$6);

  var _generateThemeClass = _interopRequireDefault(generateThemeClass);

  var ButtonIcon =
  /*#__PURE__*/
  function (_Icon) {
    (0, _inherits2.default)(ButtonIcon, _Icon);

    function ButtonIcon() {
      var _this;

      (0, _classCallCheck2.default)(this, ButtonIcon);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ButtonIcon).apply(this, arguments));
      _this.componentName = 'button__icon';
      return _this;
    }

    return ButtonIcon;
  }(_Icon2.default);

  exports.ButtonIcon = ButtonIcon;

  var Button =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(Button, _MaterialComponent);

    function Button() {
      var _this2;

      (0, _classCallCheck2.default)(this, Button);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Button).apply(this, arguments));
      _this2.componentName = 'button';
      _this2.mdcProps = ['dense', 'raised', 'unelevated', 'outlined'];
      _this2.themeProps = ['primary', 'secondary'];
      return _this2;
    }

    (0, _createClass2.default)(Button, [{
      key: "materialDom",
      value: function materialDom(props) {
        var ButtonElement = props.href ? 'a' : 'button';
        var className = '';
        this.themeProps.forEach(function (themeProp) {
          if (themeProp in props && props[themeProp] !== false) {
            className += (0, _generateThemeClass.default)(themeProp) + ' ';
          }
        });
        return (0, _preact.h)(ButtonElement, Object.assign({
          ref: this.setControlRef
        }, props, {
          className: className
        }), this.props.children);
      }
    }]);
    return Button;
  }(_MaterialComponent2.default);

  exports.Button = Button;

  var default_1 =
  /*#__PURE__*/
  function (_Button) {
    (0, _inherits2.default)(default_1, _Button);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(Button);

  exports.default = default_1;
  default_1.Icon = ButtonIcon;
});
unwrapExports(Button_1);
var Button_2 = Button_1.Button;
var Button_3 = Button_1.ButtonIcon;

var Card_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Card = exports.CardMediaContent = exports.CardActionIcon = exports.CardActionButtons = exports.CardActionIcons = exports.CardActionButton = exports.CardMedia = exports.CardActions = void 0;

  var _get2 = _interopRequireDefault(require$$0$1);

  var _classCallCheck2 = _interopRequireDefault(require$$0);

  var _createClass2 = _interopRequireDefault(require$$1);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _MaterialComponent6 = _interopRequireDefault(require$$5);

  var _Button2 = _interopRequireDefault(Button_1);

  var _Icon2 = _interopRequireDefault(require$$6);

  var CardActions =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(CardActions, _MaterialComponent);

    function CardActions() {
      var _this;

      (0, _classCallCheck2.default)(this, CardActions);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActions).apply(this, arguments));
      _this.componentName = 'card__actions';
      _this.mdcProps = ['full-bleed'];
      return _this;
    }

    (0, _createClass2.default)(CardActions, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return CardActions;
  }(_MaterialComponent6.default);

  exports.CardActions = CardActions;

  var CardMedia =
  /*#__PURE__*/
  function (_MaterialComponent2) {
    (0, _inherits2.default)(CardMedia, _MaterialComponent2);

    function CardMedia() {
      var _this2;

      (0, _classCallCheck2.default)(this, CardMedia);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardMedia).apply(this, arguments));
      _this2.componentName = 'card__media';
      _this2.mdcProps = ['square', '16-9'];
      return _this2;
    }

    (0, _createClass2.default)(CardMedia, [{
      key: "materialDom",
      value: function materialDom(props) {
        if (props.sixteenByNine) {
          props.className = 'mdc-card__media--16-9';
        }

        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return CardMedia;
  }(_MaterialComponent6.default);

  exports.CardMedia = CardMedia;

  var CardActionButton =
  /*#__PURE__*/
  function (_Button) {
    (0, _inherits2.default)(CardActionButton, _Button);

    function CardActionButton() {
      var _this3;

      (0, _classCallCheck2.default)(this, CardActionButton);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionButton).apply(this, arguments));
      _this3.componentName = 'card__action';
      _this3.mdcProps = [];
      return _this3;
    }

    (0, _createClass2.default)(CardActionButton, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("button", Object.assign({
          className: "mdc-button mdc-card__action--button"
        }, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return CardActionButton;
  }(_Button2.default);

  exports.CardActionButton = CardActionButton;

  var CardActionIcons =
  /*#__PURE__*/
  function (_MaterialComponent3) {
    (0, _inherits2.default)(CardActionIcons, _MaterialComponent3);

    function CardActionIcons() {
      var _this4;

      (0, _classCallCheck2.default)(this, CardActionIcons);
      _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionIcons).apply(this, arguments));
      _this4.componentName = 'card__action-icons';
      _this4.mdcProps = [];
      return _this4;
    }

    (0, _createClass2.default)(CardActionIcons, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return CardActionIcons;
  }(_MaterialComponent6.default);

  exports.CardActionIcons = CardActionIcons;

  var CardActionButtons =
  /*#__PURE__*/
  function (_CardActionIcons) {
    (0, _inherits2.default)(CardActionButtons, _CardActionIcons);

    function CardActionButtons() {
      var _this5;

      (0, _classCallCheck2.default)(this, CardActionButtons);
      _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionButtons).apply(this, arguments));
      _this5.componentName = 'card__action-buttons';
      return _this5;
    }

    return CardActionButtons;
  }(CardActionIcons);

  exports.CardActionButtons = CardActionButtons;

  var CardActionIcon =
  /*#__PURE__*/
  function (_Icon) {
    (0, _inherits2.default)(CardActionIcon, _Icon);

    function CardActionIcon() {
      var _this6;

      (0, _classCallCheck2.default)(this, CardActionIcon);
      _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionIcon).apply(this, arguments));
      _this6.componentName = 'card__action';
      _this6.mdcProps = [];
      return _this6;
    }

    (0, _createClass2.default)(CardActionIcon, [{
      key: "materialDom",
      value: function materialDom(props) {
        if (props.className) {
          props.className += ' mdc-card__action--icon';
        } else {
          props.className = 'mdc-card__action--icon';
        }

        return (0, _get2.default)((0, _getPrototypeOf2.default)(CardActionIcon.prototype), "materialDom", this).call(this, props);
      }
    }]);
    return CardActionIcon;
  }(_Icon2.default);

  exports.CardActionIcon = CardActionIcon;

  var CardMediaContent =
  /*#__PURE__*/
  function (_MaterialComponent4) {
    (0, _inherits2.default)(CardMediaContent, _MaterialComponent4);

    function CardMediaContent() {
      var _this7;

      (0, _classCallCheck2.default)(this, CardMediaContent);
      _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardMediaContent).apply(this, arguments));
      _this7.componentName = 'card__media-content';
      _this7.mdcProps = [];
      return _this7;
    }

    (0, _createClass2.default)(CardMediaContent, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return CardMediaContent;
  }(_MaterialComponent6.default);

  exports.CardMediaContent = CardMediaContent;

  var Card =
  /*#__PURE__*/
  function (_MaterialComponent5) {
    (0, _inherits2.default)(Card, _MaterialComponent5);

    function Card() {
      var _this8;

      (0, _classCallCheck2.default)(this, Card);
      _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Card).apply(this, arguments));
      _this8.componentName = 'card';
      _this8.mdcProps = ['outlined'];
      return _this8;
    }

    (0, _createClass2.default)(Card, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return Card;
  }(_MaterialComponent6.default);

  exports.Card = Card;

  var default_1 =
  /*#__PURE__*/
  function (_Card) {
    (0, _inherits2.default)(default_1, _Card);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(Card);

  exports.default = default_1;
  default_1.Actions = CardActions;
  default_1.ActionButtons = CardActionButtons;
  default_1.ActionButton = CardActionButton;
  default_1.ActionIcons = CardActionIcons;
  default_1.ActionIcon = CardActionIcon;
  default_1.Media = CardMedia;
  default_1.CardMediaContent = CardMediaContent;
});
var Card = unwrapExports(Card_1);
var Card_2 = Card_1.Card;
var Card_3 = Card_1.CardMediaContent;
var Card_4 = Card_1.CardActionIcon;
var Card_5 = Card_1.CardActionButtons;
var Card_6 = Card_1.CardActionIcons;
var Card_7 = Card_1.CardActionButton;
var Card_8 = Card_1.CardMedia;
var Card_9 = Card_1.CardActions;

var css = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n.mdc-card {\n  background-color: #fff;\n  /* @alternate */\n  background-color: var(--mdc-theme-surface, #fff);\n  border-radius: 2px;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box; }\n\n.mdc-card--outlined {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  border: 1px solid #e0e0e0; }\n\n.mdc-card__media {\n  position: relative;\n  box-sizing: border-box;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover; }\n  .mdc-card__media::before {\n    display: block;\n    content: \"\"; }\n\n.mdc-card__media:first-child {\n  border-top-left-radius: inherit;\n  border-top-right-radius: inherit; }\n\n.mdc-card__media:last-child {\n  border-bottom-left-radius: inherit;\n  border-bottom-right-radius: inherit; }\n\n.mdc-card__media--square::before {\n  margin-top: 100%; }\n\n.mdc-card__media--16-9::before {\n  margin-top: 56.25%; }\n\n.mdc-card__media-content {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  box-sizing: border-box; }\n\n.mdc-card__primary-action {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  position: relative;\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  overflow: hidden; }\n  .mdc-card__primary-action::before, .mdc-card__primary-action::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-card__primary-action::before {\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .mdc-card__primary-action.mdc-ripple-upgraded::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n            transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-card__primary-action.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n  .mdc-card__primary-action.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  .mdc-card__primary-action.mdc-ripple-upgraded--foreground-activation::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n            animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-card__primary-action.mdc-ripple-upgraded--foreground-deactivation::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n            animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-card__primary-action::before, .mdc-card__primary-action::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-card__primary-action.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-card__primary-action::before, .mdc-card__primary-action::after {\n    background-color: black; }\n  .mdc-card__primary-action:hover::before {\n    opacity: 0.04; }\n  .mdc-card__primary-action:not(.mdc-ripple-upgraded):focus::before, .mdc-card__primary-action.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-card__primary-action:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-card__primary-action:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  .mdc-card__primary-action.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n\n.mdc-card__primary-action:first-child {\n  border-top-left-radius: inherit;\n  border-top-right-radius: inherit; }\n\n.mdc-card__primary-action:last-child {\n  border-bottom-left-radius: inherit;\n  border-bottom-right-radius: inherit; }\n\n.mdc-card__actions {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 52px;\n  padding: 8px; }\n\n.mdc-card__actions--full-bleed {\n  padding: 0; }\n\n.mdc-card__action-buttons,\n.mdc-card__action-icons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box; }\n\n.mdc-card__action-icons {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));\n  flex-grow: 1;\n  justify-content: flex-end; }\n\n.mdc-card__action-buttons + .mdc-card__action-icons {\n  /* @noflip */\n  margin-left: 16px;\n  /* @noflip */\n  margin-right: 0; }\n  [dir=\"rtl\"] .mdc-card__action-buttons + .mdc-card__action-icons, .mdc-card__action-buttons + .mdc-card__action-icons[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 16px; }\n\n.mdc-card__action {\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n  justify-content: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .mdc-card__action:focus {\n    outline: none; }\n\n.mdc-card__action--button {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 8px;\n  padding: 0 8px; }\n  [dir=\"rtl\"] .mdc-card__action--button, .mdc-card__action--button[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 8px;\n    /* @noflip */\n    margin-right: 0; }\n  .mdc-card__action--button:last-child {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 0; }\n    [dir=\"rtl\"] .mdc-card__action--button:last-child, .mdc-card__action--button:last-child[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 0;\n      /* @noflip */\n      margin-right: 0; }\n\n.mdc-card__actions--full-bleed .mdc-card__action--button {\n  justify-content: space-between;\n  width: 100%;\n  height: auto;\n  max-height: none;\n  margin: 0;\n  padding: 8px 16px;\n  text-align: left; }\n  [dir=\"rtl\"] .mdc-card__actions--full-bleed .mdc-card__action--button, .mdc-card__actions--full-bleed .mdc-card__action--button[dir=\"rtl\"] {\n    text-align: right; }\n\n.mdc-card__action--icon {\n  margin: -6px 0;\n  padding: 12px; }\n\n.mdc-card__action--icon:not(:disabled) {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)); }";
styleInject(css);

var css$1 = ".card-dynamic {\n    height: 90vh;\n    padding-left: 3px;\n    padding-right: 3px;\n   \n    border-bottom: 5px solid white;\n    display: flex;\n}\n\n";
styleInject(css$1);

var DynamicCard = function DynamicCard(_ref) {
  var scrollDirection = _ref.scrollDirection,
      scrollHeight = _ref.scrollHeight,
      scrollTop = _ref.scrollTop,
      scrolledPercentage = _ref.scrolledPercentage,
      order = _ref.order,
      setViewCandidate = _ref.setViewCandidate,
      scrolling = _ref.scrolling,
      load = _ref.load;
  var card = d(null);

  var _useState = v(0),
      _useState2 = _slicedToArray(_useState, 2),
      offsetHeight = _useState2[0],
      setOffsetHeight = _useState2[1];

  var _useState3 = v(0),
      _useState4 = _slicedToArray(_useState3, 2),
      offsetPercent = _useState4[0],
      setOffsetPercent = _useState4[1];

  var _useState5 = v(0),
      _useState6 = _slicedToArray(_useState5, 2),
      entryLevel = _useState6[0],
      setEntryLevel = _useState6[1];

  var _useState7 = v(false),
      _useState8 = _slicedToArray(_useState7, 2),
      centered = _useState8[0],
      setCentered = _useState8[1];

  var _useState9 = v(null),
      _useState10 = _slicedToArray(_useState9, 2),
      LLComponent = _useState10[0],
      setLLComponent = _useState10[1];

  var _useState11 = v(null),
      _useState12 = _slicedToArray(_useState11, 2),
      error = _useState12[0],
      setError = _useState12[1];

  var _useState13 = v(false),
      _useState14 = _slicedToArray(_useState13, 2),
      loading = _useState14[0],
      setLoading = _useState14[1];

  p(function () {
    setOffsetHeight(card.current.offsetHeight);
  }, []);
  p(function () {
    setOffsetPercent(Number.parseInt((offsetHeight * 100 / scrollHeight).toFixed(0)));
  }, [scrollHeight, offsetHeight]);
  p(function () {
    if (order === 1) {
      var entLevel = 100 - scrolledPercentage;
      setEntryLevel(entLevel);
    }

    if (order > 1) {
      var _entLevel = 100 - scrolledPercentage - offsetPercent * (order - 1);

      setEntryLevel(_entLevel);
    }
  }, [scrolledPercentage]);
  p(function () {
    if (order === 0) {
      setCentered(true);
    } else if (order > 0) {
      if (entryLevel > 0 && entryLevel === offsetPercent) {
        setCentered(true);
      } else {
        setCentered(false);
      }
    }
  }, [entryLevel, offsetPercent]);
  p(function () {
    function loadDynamicData() {
      var loadedmodule;
      return regenerator.async(function loadDynamicData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!centered) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return regenerator.awrap(load());

            case 4:
              loadedmodule = _context.sent;
              setLLComponent(loadedmodule["default"]);
              setLoading(false);

            case 7:
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              setError(_context.t0);
              setLoading(false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }

    loadDynamicData();
  }, [centered, load]);
  return h("div", {
    ref: card,
    id: order
  }, h(Card, {
    className: "card-dynamic"
  }, loading && LLComponent !== null ? h("div", null, "Loading") : LLComponent));
};
/*
      <Card className="card-dynamic">
        <div className="content">
          <div>
            <h3>
              ScrollDirec:
              {scrollDirection}
            </h3>
            <h3>Order: {order}</h3>
            <h3>Centered: {centered.toString()}</h3>
            <h3>EntryLevel: {entryLevel}</h3>
            <h3>scrollHeight: {scrollHeight}</h3>
            <h3>scrollTop: {scrollTop}</h3>
            <h3>offsetHeight: {offsetHeight}</h3>
            offsetHeigtht in % :{offsetPercent}
            <h3>scrolledPercentage: {scrolledPercentage}</h3>
          </div>
        </div>
      </Card>
*/

var ScrollerArrows = function ScrollerArrows(_ref) {
  var scrollHandler = _ref.scrollHandler,
      disabledDownScroll = _ref.disabledDownScroll,
      disabledUpScroll = _ref.disabledUpScroll;
  return h("div", {
    style: {
      position: "absolute",
      right: "5%",
      top: "50%",
      zIndex: 1000
    }
  }, h("button", {
    disabled: disabledUpScroll,
    onClick: function onClick() {
      scrollHandler("top");
    }
  }, "UPWARD"), h("button", {
    disabled: disabledDownScroll,
    onClick: function onClick() {
      scrollHandler("bottom");
    }
  }, "DOWNWARD"));
};

function SmartScroller(_ref) {
  var dynamicItems = _ref.dynamicItems;

  var _useState = v(0),
      _useState2 = _slicedToArray(_useState, 2),
      scrollTop = _useState2[0],
      setScrollTop = _useState2[1];

  var _useState3 = v(0),
      _useState4 = _slicedToArray(_useState3, 2),
      scrollHeight = _useState4[0],
      setScrollHeight = _useState4[1];

  var _useState5 = v(100),
      _useState6 = _slicedToArray(_useState5, 2),
      scrolledPercentage = _useState6[0],
      setScrolledPercentage = _useState6[1];

  var _useState7 = v(false),
      _useState8 = _slicedToArray(_useState7, 2),
      scrolling = _useState8[0],
      setScrolling = _useState8[1];

  var _useState9 = v(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      scrollDirection = _useState10[0],
      setScrollDirection = _useState10[1];

  var _useState11 = v(0),
      _useState12 = _slicedToArray(_useState11, 2),
      scrolledNode = _useState12[0],
      setScrolledNode = _useState12[1];

  var _useState13 = v(false),
      _useState14 = _slicedToArray(_useState13, 2),
      disabledUpScroll = _useState14[0],
      setDisabledUpScroll = _useState14[1];

  var _useState15 = v(false),
      _useState16 = _slicedToArray(_useState15, 2),
      disabledDownScroll = _useState16[0],
      setDisabledDownScroll = _useState16[1];

  var scroller = d(null);

  function setViewCandidate(id) {
    setScrolling(true);
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
    setScrolling(false);
  }

  function scrollHandler(direction) {
    if (direction === "top" && scrolledNode > 0) {
      setScrolledNode(scrolledNode - 1);
    } else {
      setScrolledNode(scrolledNode + 1);
    }
  }

  function handleScroll(e) {
    setScrollTop(scroller.current.scrollTop);
    setScrollTop(function (prevState) {
      if (prevState < scroller.current.scrollTop) {
        setScrollDirection("bottom");
      } else {
        setScrollDirection("top");
      }

      return scroller.current.scrollTop;
    });
    setScrollHeight(scroller.current.scrollHeight);
    setScrolledPercentage(((scroller.current.scrollHeight - scroller.current.scrollTop) * 100 / scroller.current.scrollHeight).toFixed(0));
  }

  p(function () {
    scroller.current.addEventListener("scroll", handleScroll);
    return function () {//  scroller.current.removeEventListener(handleScroll)
    };
  }, []);
  p(function () {
    setViewCandidate(scrolledNode);

    if (dynamicItems.length - 1 === scrolledNode) {
      setDisabledDownScroll(true);
    } else {
      setDisabledDownScroll(false);
    }

    if (scrolledNode === 0) {
      setDisabledUpScroll(true);
    } else {
      setDisabledUpScroll(false);
    }
  }, [scrolledNode]);
  return [h("div", {
    style: {
      height: 67
    }
  }), h(ScrollerArrows, {
    disabledUpScroll: disabledUpScroll,
    disabledDownScroll: disabledDownScroll,
    scrollHandler: scrollHandler
  }), h("div", {
    ref: scroller,
    style: {
      height: "90vh",
      overflow: "scroll",
      display: "flex",
      flexDirection: "column"
    }
  }, dynamicItems.map(function (d$$1, i) {
    return h(DynamicCard, {
      load: d$$1.load,
      scrollDirection: scrollDirection,
      scrolling: scrolling,
      setViewCandidate: setViewCandidate,
      order: i,
      scrolledPercentage: scrolledPercentage,
      scrollTop: scrollTop,
      scrollHeight: scrollHeight
    });
  }))];
}

var ModuleComponent = function ModuleComponent() {
  return h(SmartScroller, {
    dynamicItems: [{
      load: function load() {
        return import('./chunk-1473c5e0.js');
      }
    }, {
      load: function load() {
        return import('./chunk-1473c5e02.js');
      }
    }, {
      load: function load() {
        return import('./chunk-1473c5e03.js');
      }
    }]
  });
};
// import TimeLine from './TimeLine'
// import data from './data'
// const Modules =()=>{
//     return (<div>Modules
//         <TimeLine data={data}/>
//     </div>)
// }
// export default Modules

export { regenerator as a, ModuleComponent as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstNjIyOWM4NmYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQnV0dG9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0NhcmQvaW5kZXguanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2R5bmFtaWMtY2FyZC9pbmRleC5qcyIsIi4uLy4uLy4uL2NvbXBvbmVudHMvc21hcnQtc2Nyb2xsZXIvU2Nyb2xsZXJBcnJvd3MuanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL3NtYXJ0LXNjcm9sbGVyL2luZGV4LmpzIiwiLi4vbW9kdWxlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLkJ1dHRvbiA9IGV4cG9ydHMuQnV0dG9uSWNvbiA9IHZvaWQgMDtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfcHJlYWN0ID0gcmVxdWlyZShcInByZWFjdFwiKTtcblxudmFyIF9NYXRlcmlhbENvbXBvbmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9CYXNlL01hdGVyaWFsQ29tcG9uZW50XCIpKTtcblxudmFyIF9JY29uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0ljb25cIikpO1xuXG52YXIgX2dlbmVyYXRlVGhlbWVDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3RoZW1lVXRpbHMvZ2VuZXJhdGVUaGVtZUNsYXNzXCIpKTtcblxudmFyIEJ1dHRvbkljb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9JY29uKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKEJ1dHRvbkljb24sIF9JY29uKTtcblxuICBmdW5jdGlvbiBCdXR0b25JY29uKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIEJ1dHRvbkljb24pO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShCdXR0b25JY29uKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpcy5jb21wb25lbnROYW1lID0gJ2J1dHRvbl9faWNvbic7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgcmV0dXJuIEJ1dHRvbkljb247XG59KF9JY29uMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5CdXR0b25JY29uID0gQnV0dG9uSWNvbjtcblxudmFyIEJ1dHRvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50KSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKEJ1dHRvbiwgX01hdGVyaWFsQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBCdXR0b24oKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIEJ1dHRvbik7XG4gICAgX3RoaXMyID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShCdXR0b24pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzMi5jb21wb25lbnROYW1lID0gJ2J1dHRvbic7XG4gICAgX3RoaXMyLm1kY1Byb3BzID0gWydkZW5zZScsICdyYWlzZWQnLCAndW5lbGV2YXRlZCcsICdvdXRsaW5lZCddO1xuICAgIF90aGlzMi50aGVtZVByb3BzID0gWydwcmltYXJ5JywgJ3NlY29uZGFyeSddO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShCdXR0b24sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICB2YXIgQnV0dG9uRWxlbWVudCA9IHByb3BzLmhyZWYgPyAnYScgOiAnYnV0dG9uJztcbiAgICAgIHZhciBjbGFzc05hbWUgPSAnJztcbiAgICAgIHRoaXMudGhlbWVQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uICh0aGVtZVByb3ApIHtcbiAgICAgICAgaWYgKHRoZW1lUHJvcCBpbiBwcm9wcyAmJiBwcm9wc1t0aGVtZVByb3BdICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNsYXNzTmFtZSArPSAoMCwgX2dlbmVyYXRlVGhlbWVDbGFzcy5kZWZhdWx0KSh0aGVtZVByb3ApICsgJyAnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShCdXR0b25FbGVtZW50LCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0sIHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICB9KSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBCdXR0b247XG59KF9NYXRlcmlhbENvbXBvbmVudDIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuXG52YXIgZGVmYXVsdF8xID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQnV0dG9uKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKGRlZmF1bHRfMSwgX0J1dHRvbik7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KEJ1dHRvbik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbmRlZmF1bHRfMS5JY29uID0gQnV0dG9uSWNvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuQ2FyZCA9IGV4cG9ydHMuQ2FyZE1lZGlhQ29udGVudCA9IGV4cG9ydHMuQ2FyZEFjdGlvbkljb24gPSBleHBvcnRzLkNhcmRBY3Rpb25CdXR0b25zID0gZXhwb3J0cy5DYXJkQWN0aW9uSWNvbnMgPSBleHBvcnRzLkNhcmRBY3Rpb25CdXR0b24gPSBleHBvcnRzLkNhcmRNZWRpYSA9IGV4cG9ydHMuQ2FyZEFjdGlvbnMgPSB2b2lkIDA7XG5cbnZhciBfZ2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfcHJlYWN0ID0gcmVxdWlyZShcInByZWFjdFwiKTtcblxudmFyIF9NYXRlcmlhbENvbXBvbmVudDYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9CYXNlL01hdGVyaWFsQ29tcG9uZW50XCIpKTtcblxudmFyIF9CdXR0b24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQnV0dG9uXCIpKTtcblxudmFyIF9JY29uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0ljb25cIikpO1xuXG52YXIgQ2FyZEFjdGlvbnMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShDYXJkQWN0aW9ucywgX01hdGVyaWFsQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDYXJkQWN0aW9ucygpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkQWN0aW9ucyk7XG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmRBY3Rpb25zKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpcy5jb21wb25lbnROYW1lID0gJ2NhcmRfX2FjdGlvbnMnO1xuICAgIF90aGlzLm1kY1Byb3BzID0gWydmdWxsLWJsZWVkJ107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoQ2FyZEFjdGlvbnMsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmRBY3Rpb25zO1xufShfTWF0ZXJpYWxDb21wb25lbnQ2LmRlZmF1bHQpO1xuXG5leHBvcnRzLkNhcmRBY3Rpb25zID0gQ2FyZEFjdGlvbnM7XG5cbnZhciBDYXJkTWVkaWEgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZE1lZGlhLCBfTWF0ZXJpYWxDb21wb25lbnQyKTtcblxuICBmdW5jdGlvbiBDYXJkTWVkaWEoKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIENhcmRNZWRpYSk7XG4gICAgX3RoaXMyID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkTWVkaWEpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzMi5jb21wb25lbnROYW1lID0gJ2NhcmRfX21lZGlhJztcbiAgICBfdGhpczIubWRjUHJvcHMgPSBbJ3NxdWFyZScsICcxNi05J107XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmRNZWRpYSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIGlmIChwcm9wcy5zaXh0ZWVuQnlOaW5lKSB7XG4gICAgICAgIHByb3BzLmNsYXNzTmFtZSA9ICdtZGMtY2FyZF9fbWVkaWEtLTE2LTknO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmRNZWRpYTtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkTWVkaWEgPSBDYXJkTWVkaWE7XG5cbnZhciBDYXJkQWN0aW9uQnV0dG9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQnV0dG9uKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKENhcmRBY3Rpb25CdXR0b24sIF9CdXR0b24pO1xuXG4gIGZ1bmN0aW9uIENhcmRBY3Rpb25CdXR0b24oKSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIENhcmRBY3Rpb25CdXR0b24pO1xuICAgIF90aGlzMyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZEFjdGlvbkJ1dHRvbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMzLmNvbXBvbmVudE5hbWUgPSAnY2FyZF9fYWN0aW9uJztcbiAgICBfdGhpczMubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXMzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoQ2FyZEFjdGlvbkJ1dHRvbiwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImJ1dHRvblwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIm1kYy1idXR0b24gbWRjLWNhcmRfX2FjdGlvbi0tYnV0dG9uXCJcbiAgICAgIH0sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9KSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ2FyZEFjdGlvbkJ1dHRvbjtcbn0oX0J1dHRvbjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQ2FyZEFjdGlvbkJ1dHRvbiA9IENhcmRBY3Rpb25CdXR0b247XG5cbnZhciBDYXJkQWN0aW9uSWNvbnMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZEFjdGlvbkljb25zLCBfTWF0ZXJpYWxDb21wb25lbnQzKTtcblxuICBmdW5jdGlvbiBDYXJkQWN0aW9uSWNvbnMoKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIENhcmRBY3Rpb25JY29ucyk7XG4gICAgX3RoaXM0ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkQWN0aW9uSWNvbnMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNC5jb21wb25lbnROYW1lID0gJ2NhcmRfX2FjdGlvbi1pY29ucyc7XG4gICAgX3RoaXM0Lm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzNDtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmRBY3Rpb25JY29ucywgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImRpdlwiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ2FyZEFjdGlvbkljb25zO1xufShfTWF0ZXJpYWxDb21wb25lbnQ2LmRlZmF1bHQpO1xuXG5leHBvcnRzLkNhcmRBY3Rpb25JY29ucyA9IENhcmRBY3Rpb25JY29ucztcblxudmFyIENhcmRBY3Rpb25CdXR0b25zID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQ2FyZEFjdGlvbkljb25zKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKENhcmRBY3Rpb25CdXR0b25zLCBfQ2FyZEFjdGlvbkljb25zKTtcblxuICBmdW5jdGlvbiBDYXJkQWN0aW9uQnV0dG9ucygpIHtcbiAgICB2YXIgX3RoaXM1O1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgQ2FyZEFjdGlvbkJ1dHRvbnMpO1xuICAgIF90aGlzNSA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZEFjdGlvbkJ1dHRvbnMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNS5jb21wb25lbnROYW1lID0gJ2NhcmRfX2FjdGlvbi1idXR0b25zJztcbiAgICByZXR1cm4gX3RoaXM1O1xuICB9XG5cbiAgcmV0dXJuIENhcmRBY3Rpb25CdXR0b25zO1xufShDYXJkQWN0aW9uSWNvbnMpO1xuXG5leHBvcnRzLkNhcmRBY3Rpb25CdXR0b25zID0gQ2FyZEFjdGlvbkJ1dHRvbnM7XG5cbnZhciBDYXJkQWN0aW9uSWNvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0ljb24pIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZEFjdGlvbkljb24sIF9JY29uKTtcblxuICBmdW5jdGlvbiBDYXJkQWN0aW9uSWNvbigpIHtcbiAgICB2YXIgX3RoaXM2O1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgQ2FyZEFjdGlvbkljb24pO1xuICAgIF90aGlzNiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZEFjdGlvbkljb24pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNi5jb21wb25lbnROYW1lID0gJ2NhcmRfX2FjdGlvbic7XG4gICAgX3RoaXM2Lm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzNjtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmRBY3Rpb25JY29uLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgaWYgKHByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICBwcm9wcy5jbGFzc05hbWUgKz0gJyBtZGMtY2FyZF9fYWN0aW9uLS1pY29uJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BzLmNsYXNzTmFtZSA9ICdtZGMtY2FyZF9fYWN0aW9uLS1pY29uJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfZ2V0Mi5kZWZhdWx0KSgoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkQWN0aW9uSWNvbi5wcm90b3R5cGUpLCBcIm1hdGVyaWFsRG9tXCIsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ2FyZEFjdGlvbkljb247XG59KF9JY29uMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkQWN0aW9uSWNvbiA9IENhcmRBY3Rpb25JY29uO1xuXG52YXIgQ2FyZE1lZGlhQ29udGVudCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShDYXJkTWVkaWFDb250ZW50LCBfTWF0ZXJpYWxDb21wb25lbnQ0KTtcblxuICBmdW5jdGlvbiBDYXJkTWVkaWFDb250ZW50KCkge1xuICAgIHZhciBfdGhpczc7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkTWVkaWFDb250ZW50KTtcbiAgICBfdGhpczcgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmRNZWRpYUNvbnRlbnQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNy5jb21wb25lbnROYW1lID0gJ2NhcmRfX21lZGlhLWNvbnRlbnQnO1xuICAgIF90aGlzNy5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczc7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShDYXJkTWVkaWFDb250ZW50LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDYXJkTWVkaWFDb250ZW50O1xufShfTWF0ZXJpYWxDb21wb25lbnQ2LmRlZmF1bHQpO1xuXG5leHBvcnRzLkNhcmRNZWRpYUNvbnRlbnQgPSBDYXJkTWVkaWFDb250ZW50O1xuXG52YXIgQ2FyZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShDYXJkLCBfTWF0ZXJpYWxDb21wb25lbnQ1KTtcblxuICBmdW5jdGlvbiBDYXJkKCkge1xuICAgIHZhciBfdGhpczg7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkKTtcbiAgICBfdGhpczggPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzOC5jb21wb25lbnROYW1lID0gJ2NhcmQnO1xuICAgIF90aGlzOC5tZGNQcm9wcyA9IFsnb3V0bGluZWQnXTtcbiAgICByZXR1cm4gX3RoaXM4O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoQ2FyZCwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImRpdlwiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ2FyZDtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkID0gQ2FyZDtcblxudmFyIGRlZmF1bHRfMSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0NhcmQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoZGVmYXVsdF8xLCBfQ2FyZCk7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KENhcmQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5kZWZhdWx0XzEuQWN0aW9ucyA9IENhcmRBY3Rpb25zO1xuZGVmYXVsdF8xLkFjdGlvbkJ1dHRvbnMgPSBDYXJkQWN0aW9uQnV0dG9ucztcbmRlZmF1bHRfMS5BY3Rpb25CdXR0b24gPSBDYXJkQWN0aW9uQnV0dG9uO1xuZGVmYXVsdF8xLkFjdGlvbkljb25zID0gQ2FyZEFjdGlvbkljb25zO1xuZGVmYXVsdF8xLkFjdGlvbkljb24gPSBDYXJkQWN0aW9uSWNvbjtcbmRlZmF1bHRfMS5NZWRpYSA9IENhcmRNZWRpYTtcbmRlZmF1bHRfMS5DYXJkTWVkaWFDb250ZW50ID0gQ2FyZE1lZGlhQ29udGVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IGggfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicHJlYWN0L2hvb2tzXCI7XG5pbXBvcnQgQ2FyZCBmcm9tIFwicHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IFwicHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQ2FyZC9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmNvbnN0IER5bmFtaWNDYXJkID0gKHtcbiAgc2Nyb2xsRGlyZWN0aW9uLFxuICBzY3JvbGxIZWlnaHQsXG4gIHNjcm9sbFRvcCxcbiAgc2Nyb2xsZWRQZXJjZW50YWdlLFxuICBvcmRlcixcbiAgc2V0Vmlld0NhbmRpZGF0ZSxcbiAgc2Nyb2xsaW5nLFxuICBsb2FkXG59KSA9PiB7XG4gIGNvbnN0IGNhcmQgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtvZmZzZXRIZWlnaHQsIHNldE9mZnNldEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW29mZnNldFBlcmNlbnQsIHNldE9mZnNldFBlcmNlbnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtlbnRyeUxldmVsLCBzZXRFbnRyeUxldmVsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY2VudGVyZWQsIHNldENlbnRlcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW0xMQ29tcG9uZW50LCBzZXRMTENvbXBvbmVudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldE9mZnNldEhlaWdodChjYXJkLmN1cnJlbnQub2Zmc2V0SGVpZ2h0KTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldE9mZnNldFBlcmNlbnQoXG4gICAgICBOdW1iZXIucGFyc2VJbnQoKChvZmZzZXRIZWlnaHQgKiAxMDApIC8gc2Nyb2xsSGVpZ2h0KS50b0ZpeGVkKDApKVxuICAgICk7XG4gIH0sIFtzY3JvbGxIZWlnaHQsIG9mZnNldEhlaWdodF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG9yZGVyID09PSAxKSB7XG4gICAgICBjb25zdCBlbnRMZXZlbCA9IDEwMCAtIHNjcm9sbGVkUGVyY2VudGFnZTtcbiAgICAgIHNldEVudHJ5TGV2ZWwoZW50TGV2ZWwpO1xuICAgIH1cblxuICAgIGlmIChvcmRlciA+IDEpIHtcbiAgICAgIGNvbnN0IGVudExldmVsID0gMTAwIC0gc2Nyb2xsZWRQZXJjZW50YWdlIC0gb2Zmc2V0UGVyY2VudCAqIChvcmRlciAtIDEpO1xuICAgICAgc2V0RW50cnlMZXZlbChlbnRMZXZlbCk7XG4gICAgfVxuICB9LCBbc2Nyb2xsZWRQZXJjZW50YWdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAob3JkZXIgPT09IDApIHtcbiAgICAgIHNldENlbnRlcmVkKHRydWUpO1xuICAgIH0gZWxzZSBpZiAob3JkZXIgPiAwKSB7XG4gICAgICBpZiAoZW50cnlMZXZlbCA+IDAgJiYgZW50cnlMZXZlbCA9PT0gb2Zmc2V0UGVyY2VudCkge1xuICAgICAgICBzZXRDZW50ZXJlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldENlbnRlcmVkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtlbnRyeUxldmVsLCBvZmZzZXRQZXJjZW50XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkRHluYW1pY0RhdGEoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoY2VudGVyZWQpIHtcbiAgICAgICAgICBjb25zdCBsb2FkZWRtb2R1bGUgPSBhd2FpdCBsb2FkKCk7XG4gICAgICAgICAgc2V0TExDb21wb25lbnQobG9hZGVkbW9kdWxlLmRlZmF1bHQpO1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHNldEVycm9yKGUpO1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZER5bmFtaWNEYXRhKCk7XG4gIH0sIFtjZW50ZXJlZCwgbG9hZF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e2NhcmR9IGlkPXtvcmRlcn0+XG4gICAgICA8Q2FyZCBjbGFzc05hbWU9XCJjYXJkLWR5bmFtaWNcIj5cbiAgICAgICAge2xvYWRpbmcgJiYgTExDb21wb25lbnQgIT09IG51bGwgPyA8ZGl2PkxvYWRpbmc8L2Rpdj4gOiBMTENvbXBvbmVudH1cbiAgICAgIDwvQ2FyZD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBEeW5hbWljQ2FyZDtcblxuLypcbiAgICAgIDxDYXJkIGNsYXNzTmFtZT1cImNhcmQtZHluYW1pY1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICBTY3JvbGxEaXJlYzpcbiAgICAgICAgICAgICAge3Njcm9sbERpcmVjdGlvbn1cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8aDM+T3JkZXI6IHtvcmRlcn08L2gzPlxuICAgICAgICAgICAgPGgzPkNlbnRlcmVkOiB7Y2VudGVyZWQudG9TdHJpbmcoKX08L2gzPlxuICAgICAgICAgICAgPGgzPkVudHJ5TGV2ZWw6IHtlbnRyeUxldmVsfTwvaDM+XG4gICAgICAgICAgICA8aDM+c2Nyb2xsSGVpZ2h0OiB7c2Nyb2xsSGVpZ2h0fTwvaDM+XG4gICAgICAgICAgICA8aDM+c2Nyb2xsVG9wOiB7c2Nyb2xsVG9wfTwvaDM+XG4gICAgICAgICAgICA8aDM+b2Zmc2V0SGVpZ2h0OiB7b2Zmc2V0SGVpZ2h0fTwvaDM+XG4gICAgICAgICAgICBvZmZzZXRIZWlndGh0IGluICUgOntvZmZzZXRQZXJjZW50fVxuICAgICAgICAgICAgPGgzPnNjcm9sbGVkUGVyY2VudGFnZToge3Njcm9sbGVkUGVyY2VudGFnZX08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiovXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xuXG5jb25zdCBTY3JvbGxlckFycm93cyA9ICh7XG4gIHNjcm9sbEhhbmRsZXIsXG4gIGRpc2FibGVkRG93blNjcm9sbCxcbiAgZGlzYWJsZWRVcFNjcm9sbFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgcmlnaHQ6IFwiNSVcIiwgdG9wOiBcIjUwJVwiLHpJbmRleDoxMDAwIH19PlxuICAgICAgPGJ1dHRvblxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWRVcFNjcm9sbH1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIHNjcm9sbEhhbmRsZXIoXCJ0b3BcIik7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIFVQV0FSRFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZERvd25TY3JvbGx9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyKFwiYm90dG9tXCIpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBET1dOV0FSRFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxlckFycm93cztcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyICovXG5pbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInByZWFjdC9ob29rc1wiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1uYW1lZC1hcy1kZWZhdWx0XG5pbXBvcnQgRHluYW1pY0NhcmQgZnJvbSBcIi4uL2R5bmFtaWMtY2FyZFwiO1xuaW1wb3J0IFNjcm9sbGVyQXJyb3dzIGZyb20gXCIuL1Njcm9sbGVyQXJyb3dzXCI7XG5cbmZ1bmN0aW9uIFNtYXJ0U2Nyb2xsZXIoeyBkeW5hbWljSXRlbXMgfSkge1xuICBjb25zdCBbc2Nyb2xsVG9wLCBzZXRTY3JvbGxUb3BdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzY3JvbGxIZWlnaHQsIHNldFNjcm9sbEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3Njcm9sbGVkUGVyY2VudGFnZSwgc2V0U2Nyb2xsZWRQZXJjZW50YWdlXSA9IHVzZVN0YXRlKDEwMCk7XG4gIGNvbnN0IFtzY3JvbGxpbmcsIHNldFNjcm9sbGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzY3JvbGxEaXJlY3Rpb24sIHNldFNjcm9sbERpcmVjdGlvbl0gPSB1c2VTdGF0ZSh1bmRlZmluZWQpO1xuICBjb25zdCBbc2Nyb2xsZWROb2RlLCBzZXRTY3JvbGxlZE5vZGVdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtkaXNhYmxlZFVwU2Nyb2xsLCBzZXREaXNhYmxlZFVwU2Nyb2xsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Rpc2FibGVkRG93blNjcm9sbCwgc2V0RGlzYWJsZWREb3duU2Nyb2xsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgc2Nyb2xsZXIgPSB1c2VSZWYobnVsbCk7XG4gIGZ1bmN0aW9uIHNldFZpZXdDYW5kaWRhdGUoaWQpIHtcbiAgICBzZXRTY3JvbGxpbmcodHJ1ZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgc2V0U2Nyb2xsaW5nKGZhbHNlKTtcbiAgfVxuICBmdW5jdGlvbiBzY3JvbGxIYW5kbGVyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidG9wXCIgJiYgc2Nyb2xsZWROb2RlID4gMCkge1xuICAgICAgc2V0U2Nyb2xsZWROb2RlKHNjcm9sbGVkTm9kZSAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTY3JvbGxlZE5vZGUoc2Nyb2xsZWROb2RlICsgMSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgc2V0U2Nyb2xsVG9wKHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsVG9wKTtcblxuICAgIHNldFNjcm9sbFRvcChwcmV2U3RhdGUgPT4ge1xuICAgICAgaWYgKHByZXZTdGF0ZSA8IHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHNldFNjcm9sbERpcmVjdGlvbihcImJvdHRvbVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNjcm9sbERpcmVjdGlvbihcInRvcFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsVG9wO1xuICAgIH0pO1xuICAgIHNldFNjcm9sbEhlaWdodChzY3JvbGxlci5jdXJyZW50LnNjcm9sbEhlaWdodCk7XG4gICAgc2V0U2Nyb2xsZWRQZXJjZW50YWdlKFxuICAgICAgKFxuICAgICAgICAoKHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxUb3ApICogMTAwKSAvXG4gICAgICAgIHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0XG4gICAgICApLnRvRml4ZWQoMClcbiAgICApO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzY3JvbGxlci5jdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAvLyAgc2Nyb2xsZXIuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZVNjcm9sbClcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Vmlld0NhbmRpZGF0ZShzY3JvbGxlZE5vZGUpO1xuICAgIGlmIChkeW5hbWljSXRlbXMubGVuZ3RoIC0gMSA9PT0gc2Nyb2xsZWROb2RlKSB7XG4gICAgICBzZXREaXNhYmxlZERvd25TY3JvbGwodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldERpc2FibGVkRG93blNjcm9sbChmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbGVkTm9kZSA9PT0gMCkge1xuICAgICAgc2V0RGlzYWJsZWRVcFNjcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RGlzYWJsZWRVcFNjcm9sbChmYWxzZSk7XG4gICAgfVxuICB9LCBbc2Nyb2xsZWROb2RlXSk7XG4gIHJldHVybiBbXG4gICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDY3IH19IC8+LFxuICAgIDxTY3JvbGxlckFycm93c1xuICAgICAgZGlzYWJsZWRVcFNjcm9sbD17ZGlzYWJsZWRVcFNjcm9sbH1cbiAgICAgIGRpc2FibGVkRG93blNjcm9sbD17ZGlzYWJsZWREb3duU2Nyb2xsfVxuICAgICAgc2Nyb2xsSGFuZGxlcj17c2Nyb2xsSGFuZGxlcn1cbiAgICAvPixcbiAgICA8ZGl2IHJlZj17c2Nyb2xsZXJ9IHN0eWxlPXt7IGhlaWdodDogXCI5MHZoXCIsIG92ZXJmbG93OiBcInNjcm9sbFwiLCBkaXNwbGF5OlwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOlwiY29sdW1uXCIgfX0+XG4gICAgICB7ZHluYW1pY0l0ZW1zLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEeW5hbWljQ2FyZFxuICAgICAgICAgICAgbG9hZD17ZC5sb2FkfVxuICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uPXtzY3JvbGxEaXJlY3Rpb259XG4gICAgICAgICAgICBzY3JvbGxpbmc9e3Njcm9sbGluZ31cbiAgICAgICAgICAgIHNldFZpZXdDYW5kaWRhdGU9e3NldFZpZXdDYW5kaWRhdGV9XG4gICAgICAgICAgICBvcmRlcj17aX1cbiAgICAgICAgICAgIHNjcm9sbGVkUGVyY2VudGFnZT17c2Nyb2xsZWRQZXJjZW50YWdlfVxuICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQ9e3Njcm9sbEhlaWdodH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNtYXJ0U2Nyb2xsZXI7XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IFNtYXJ0U2Nyb2xsZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvc21hcnQtc2Nyb2xsZXJcIjtcblxuY29uc3QgTW9kdWxlQ29tcG9uZW50ID0gKCkgPT4ge1xuICAgIFxuICByZXR1cm4gPFNtYXJ0U2Nyb2xsZXIgICAgIGR5bmFtaWNJdGVtcz17W1xuICAgIHsgbG9hZDogKCkgPT4gaW1wb3J0KFwiLi9zb2NrZXQtaW8tbWVzc2FnaW5nL2luZGV4XCIpIH0sXG4gICAgeyBsb2FkOiAoKSA9PiBpbXBvcnQoXCIuL3dlYnJ0Yy1tZXNzYWdpbmcvaW5kZXhcIikgfSxcbiAgICB7IGxvYWQ6ICgpID0+IGltcG9ydChcIi4vd2VicnRjLXZpZGVvLWNoYXQvaW5kZXhcIikgfVxuICBdfSAvPlxufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlQ29tcG9uZW50O1xuXG4vLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgVGltZUxpbmUgZnJvbSAnLi9UaW1lTGluZSdcbi8vIGltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSdcbi8vIGNvbnN0IE1vZHVsZXMgPSgpPT57XG4vLyAgICAgcmV0dXJuICg8ZGl2Pk1vZHVsZXNcblxuLy8gICAgICAgICA8VGltZUxpbmUgZGF0YT17ZGF0YX0vPlxuLy8gICAgIDwvZGl2Pilcbi8vIH1cblxuLy8gZXhwb3J0IGRlZmF1bHQgTW9kdWxlc1xuIl0sIm5hbWVzIjpbInJ1bnRpbWUiLCJleHBvcnRzIiwiT3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsInVuZGVmaW5lZCIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIl9pbnZva2UiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsIm9iaiIsImFyZyIsInR5cGUiLCJjYWxsIiwiZXJyIiwiR2VuU3RhdGVTdXNwZW5kZWRTdGFydCIsIkdlblN0YXRlU3VzcGVuZGVkWWllbGQiLCJHZW5TdGF0ZUV4ZWN1dGluZyIsIkdlblN0YXRlQ29tcGxldGVkIiwiQ29udGludWVTZW50aW5lbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJJdGVyYXRvclByb3RvdHlwZSIsImdldFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJOYXRpdmVJdGVyYXRvclByb3RvdHlwZSIsInZhbHVlcyIsIkdwIiwiY29uc3RydWN0b3IiLCJkaXNwbGF5TmFtZSIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJtZXRob2QiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsIl9fYXdhaXQiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZCIsInJlc3VsdCIsInZhbHVlIiwiUHJvbWlzZSIsInRoZW4iLCJ1bndyYXBwZWQiLCJlcnJvciIsInByZXZpb3VzUHJvbWlzZSIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsImFzeW5jIiwiaXRlciIsIm5leHQiLCJkb25lIiwic3RhdGUiLCJFcnJvciIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0TG9jIiwidG9TdHJpbmciLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImtleXMiLCJvYmplY3QiLCJrZXkiLCJyZXZlcnNlIiwibGVuZ3RoIiwicG9wIiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsImlzTmFOIiwiaSIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdEVudHJ5Iiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJtb2R1bGUiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJhY2NpZGVudGFsU3RyaWN0TW9kZSIsIkZ1bmN0aW9uIiwicmVxdWlyZSQkMCIsImRlZmF1bHRfMSIsImNvbXBvbmVudE5hbWUiLCJEeW5hbWljQ2FyZCIsInNjcm9sbERpcmVjdGlvbiIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsInNjcm9sbGVkUGVyY2VudGFnZSIsIm9yZGVyIiwic2V0Vmlld0NhbmRpZGF0ZSIsInNjcm9sbGluZyIsImxvYWQiLCJjYXJkIiwidXNlUmVmIiwidXNlU3RhdGUiLCJvZmZzZXRIZWlnaHQiLCJzZXRPZmZzZXRIZWlnaHQiLCJvZmZzZXRQZXJjZW50Iiwic2V0T2Zmc2V0UGVyY2VudCIsImVudHJ5TGV2ZWwiLCJzZXRFbnRyeUxldmVsIiwiY2VudGVyZWQiLCJzZXRDZW50ZXJlZCIsIkxMQ29tcG9uZW50Iiwic2V0TExDb21wb25lbnQiLCJzZXRFcnJvciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiY3VycmVudCIsIk51bWJlciIsInBhcnNlSW50IiwidG9GaXhlZCIsImVudExldmVsIiwibG9hZER5bmFtaWNEYXRhIiwibG9hZGVkbW9kdWxlIiwiU2Nyb2xsZXJBcnJvd3MiLCJzY3JvbGxIYW5kbGVyIiwiZGlzYWJsZWREb3duU2Nyb2xsIiwiZGlzYWJsZWRVcFNjcm9sbCIsInBvc2l0aW9uIiwicmlnaHQiLCJ0b3AiLCJ6SW5kZXgiLCJTbWFydFNjcm9sbGVyIiwiZHluYW1pY0l0ZW1zIiwic2V0U2Nyb2xsVG9wIiwic2V0U2Nyb2xsSGVpZ2h0Iiwic2V0U2Nyb2xsZWRQZXJjZW50YWdlIiwic2V0U2Nyb2xsaW5nIiwic2V0U2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsZWROb2RlIiwic2V0U2Nyb2xsZWROb2RlIiwic2V0RGlzYWJsZWRVcFNjcm9sbCIsInNldERpc2FibGVkRG93blNjcm9sbCIsInNjcm9sbGVyIiwiaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImRpcmVjdGlvbiIsImhhbmRsZVNjcm9sbCIsImUiLCJwcmV2U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsIm1hcCIsImQiLCJNb2R1bGVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztNQU9JQSxPQUFPLEdBQUksVUFBVUMsT0FBVixFQUFtQjtBQUNoQztRQUVJQyxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBaEI7UUFDSUMsTUFBTSxHQUFHSCxFQUFFLENBQUNJLGNBQWhCO1FBQ0lDLFNBQUosQ0FMZ0M7O1FBTTVCQyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixHQUErQkEsTUFBL0IsR0FBd0MsRUFBdEQ7UUFDSUMsY0FBYyxHQUFHRixPQUFPLENBQUNHLFFBQVIsSUFBb0IsWUFBekM7UUFDSUMsbUJBQW1CLEdBQUdKLE9BQU8sQ0FBQ0ssYUFBUixJQUF5QixpQkFBbkQ7UUFDSUMsaUJBQWlCLEdBQUdOLE9BQU8sQ0FBQ08sV0FBUixJQUF1QixlQUEvQzs7YUFFU0MsSUFBVCxDQUFjQyxPQUFkLEVBQXVCQyxPQUF2QixFQUFnQ0MsSUFBaEMsRUFBc0NDLFdBQXRDLEVBQW1EOztVQUU3Q0MsY0FBYyxHQUFHSCxPQUFPLElBQUlBLE9BQU8sQ0FBQ2QsU0FBUixZQUE2QmtCLFNBQXhDLEdBQW9ESixPQUFwRCxHQUE4REksU0FBbkY7VUFDSUMsU0FBUyxHQUFHcEIsTUFBTSxDQUFDcUIsTUFBUCxDQUFjSCxjQUFjLENBQUNqQixTQUE3QixDQUFoQjtVQUNJcUIsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWU4sV0FBVyxJQUFJLEVBQTNCLENBQWQsQ0FKaUQ7OztNQVFqREcsU0FBUyxDQUFDSSxPQUFWLEdBQW9CQyxnQkFBZ0IsQ0FBQ1gsT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFwQzthQUVPRixTQUFQOzs7SUFFRnRCLE9BQU8sQ0FBQ2UsSUFBUixHQUFlQSxJQUFmLENBdkJnQzs7Ozs7Ozs7Ozs7YUFtQ3ZCYSxRQUFULENBQWtCQyxFQUFsQixFQUFzQkMsR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDO1VBQzFCO2VBQ0s7VUFBRUMsSUFBSSxFQUFFLFFBQVI7VUFBa0JELEdBQUcsRUFBRUYsRUFBRSxDQUFDSSxJQUFILENBQVFILEdBQVIsRUFBYUMsR0FBYjtTQUE5QjtPQURGLENBRUUsT0FBT0csR0FBUCxFQUFZO2VBQ0w7VUFBRUYsSUFBSSxFQUFFLE9BQVI7VUFBaUJELEdBQUcsRUFBRUc7U0FBN0I7Ozs7UUFJQUMsc0JBQXNCLEdBQUcsZ0JBQTdCO1FBQ0lDLHNCQUFzQixHQUFHLGdCQUE3QjtRQUNJQyxpQkFBaUIsR0FBRyxXQUF4QjtRQUNJQyxpQkFBaUIsR0FBRyxXQUF4QixDQTlDZ0M7OztRQWtENUJDLGdCQUFnQixHQUFHLEVBQXZCLENBbERnQzs7Ozs7YUF3RHZCbEIsU0FBVCxHQUFxQjs7YUFDWm1CLGlCQUFULEdBQTZCOzthQUNwQkMsMEJBQVQsR0FBc0MsRUExRE47Ozs7UUE4RDVCQyxpQkFBaUIsR0FBRyxFQUF4Qjs7SUFDQUEsaUJBQWlCLENBQUNqQyxjQUFELENBQWpCLEdBQW9DLFlBQVk7YUFDdkMsSUFBUDtLQURGOztRQUlJa0MsUUFBUSxHQUFHekMsTUFBTSxDQUFDMEMsY0FBdEI7UUFDSUMsdUJBQXVCLEdBQUdGLFFBQVEsSUFBSUEsUUFBUSxDQUFDQSxRQUFRLENBQUNHLE1BQU0sQ0FBQyxFQUFELENBQVAsQ0FBVCxDQUFsRDs7UUFDSUQsdUJBQXVCLElBQ3ZCQSx1QkFBdUIsS0FBSzVDLEVBRDVCLElBRUFHLE1BQU0sQ0FBQzZCLElBQVAsQ0FBWVksdUJBQVosRUFBcUNwQyxjQUFyQyxDQUZKLEVBRTBEOzs7TUFHeERpQyxpQkFBaUIsR0FBR0csdUJBQXBCOzs7UUFHRUUsRUFBRSxHQUFHTiwwQkFBMEIsQ0FBQ3RDLFNBQTNCLEdBQ1BrQixTQUFTLENBQUNsQixTQUFWLEdBQXNCRCxNQUFNLENBQUNxQixNQUFQLENBQWNtQixpQkFBZCxDQUR4QjtJQUVBRixpQkFBaUIsQ0FBQ3JDLFNBQWxCLEdBQThCNEMsRUFBRSxDQUFDQyxXQUFILEdBQWlCUCwwQkFBL0M7SUFDQUEsMEJBQTBCLENBQUNPLFdBQTNCLEdBQXlDUixpQkFBekM7SUFDQUMsMEJBQTBCLENBQUM1QixpQkFBRCxDQUExQixHQUNFMkIsaUJBQWlCLENBQUNTLFdBQWxCLEdBQWdDLG1CQURsQyxDQWpGZ0M7OzthQXNGdkJDLHFCQUFULENBQStCL0MsU0FBL0IsRUFBMEM7T0FDdkMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsUUFBbEIsRUFBNEJnRCxPQUE1QixDQUFvQyxVQUFTQyxNQUFULEVBQWlCO1FBQ25EakQsU0FBUyxDQUFDaUQsTUFBRCxDQUFULEdBQW9CLFVBQVNyQixHQUFULEVBQWM7aUJBQ3pCLEtBQUtMLE9BQUwsQ0FBYTBCLE1BQWIsRUFBcUJyQixHQUFyQixDQUFQO1NBREY7T0FERjs7O0lBT0YvQixPQUFPLENBQUNxRCxtQkFBUixHQUE4QixVQUFTQyxNQUFULEVBQWlCO1VBQ3pDQyxJQUFJLEdBQUcsT0FBT0QsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDTixXQUFsRDthQUNPTyxJQUFJLEdBQ1BBLElBQUksS0FBS2YsaUJBQVQ7O09BR0NlLElBQUksQ0FBQ04sV0FBTCxJQUFvQk0sSUFBSSxDQUFDQyxJQUExQixNQUFvQyxtQkFKN0IsR0FLUCxLQUxKO0tBRkY7O0lBVUF4RCxPQUFPLENBQUN5RCxJQUFSLEdBQWUsVUFBU0gsTUFBVCxFQUFpQjtVQUMxQnBELE1BQU0sQ0FBQ3dELGNBQVgsRUFBMkI7UUFDekJ4RCxNQUFNLENBQUN3RCxjQUFQLENBQXNCSixNQUF0QixFQUE4QmIsMEJBQTlCO09BREYsTUFFTztRQUNMYSxNQUFNLENBQUNLLFNBQVAsR0FBbUJsQiwwQkFBbkI7O1lBQ0ksRUFBRTVCLGlCQUFpQixJQUFJeUMsTUFBdkIsQ0FBSixFQUFvQztVQUNsQ0EsTUFBTSxDQUFDekMsaUJBQUQsQ0FBTixHQUE0QixtQkFBNUI7Ozs7TUFHSnlDLE1BQU0sQ0FBQ25ELFNBQVAsR0FBbUJELE1BQU0sQ0FBQ3FCLE1BQVAsQ0FBY3dCLEVBQWQsQ0FBbkI7YUFDT08sTUFBUDtLQVZGLENBeEdnQzs7Ozs7O0lBeUhoQ3RELE9BQU8sQ0FBQzRELEtBQVIsR0FBZ0IsVUFBUzdCLEdBQVQsRUFBYzthQUNyQjtRQUFFOEIsT0FBTyxFQUFFOUI7T0FBbEI7S0FERjs7YUFJUytCLGFBQVQsQ0FBdUJ4QyxTQUF2QixFQUFrQztlQUN2QnlDLE1BQVQsQ0FBZ0JYLE1BQWhCLEVBQXdCckIsR0FBeEIsRUFBNkJpQyxPQUE3QixFQUFzQ0MsTUFBdEMsRUFBOEM7WUFDeENDLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ04sU0FBUyxDQUFDOEIsTUFBRCxDQUFWLEVBQW9COUIsU0FBcEIsRUFBK0JTLEdBQS9CLENBQXJCOztZQUNJbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtVQUMzQmlDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDbkMsR0FBUixDQUFOO1NBREYsTUFFTztjQUNEb0MsTUFBTSxHQUFHRCxNQUFNLENBQUNuQyxHQUFwQjtjQUNJcUMsS0FBSyxHQUFHRCxNQUFNLENBQUNDLEtBQW5COztjQUNJQSxLQUFLLElBQ0wsT0FBT0EsS0FBUCxLQUFpQixRQURqQixJQUVBaEUsTUFBTSxDQUFDNkIsSUFBUCxDQUFZbUMsS0FBWixFQUFtQixTQUFuQixDQUZKLEVBRW1DO21CQUMxQkMsT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFLLENBQUNQLE9BQXRCLEVBQStCUyxJQUEvQixDQUFvQyxVQUFTRixLQUFULEVBQWdCO2NBQ3pETCxNQUFNLENBQUMsTUFBRCxFQUFTSyxLQUFULEVBQWdCSixPQUFoQixFQUF5QkMsTUFBekIsQ0FBTjthQURLLEVBRUosVUFBUy9CLEdBQVQsRUFBYztjQUNmNkIsTUFBTSxDQUFDLE9BQUQsRUFBVTdCLEdBQVYsRUFBZThCLE9BQWYsRUFBd0JDLE1BQXhCLENBQU47YUFISyxDQUFQOzs7aUJBT0tJLE9BQU8sQ0FBQ0wsT0FBUixDQUFnQkksS0FBaEIsRUFBdUJFLElBQXZCLENBQTRCLFVBQVNDLFNBQVQsRUFBb0I7Ozs7WUFJckRKLE1BQU0sQ0FBQ0MsS0FBUCxHQUFlRyxTQUFmO1lBQ0FQLE9BQU8sQ0FBQ0csTUFBRCxDQUFQO1dBTEssRUFNSixVQUFTSyxLQUFULEVBQWdCOzs7bUJBR1ZULE1BQU0sQ0FBQyxPQUFELEVBQVVTLEtBQVYsRUFBaUJSLE9BQWpCLEVBQTBCQyxNQUExQixDQUFiO1dBVEssQ0FBUDs7OztVQWNBUSxlQUFKOztlQUVTQyxPQUFULENBQWlCdEIsTUFBakIsRUFBeUJyQixHQUF6QixFQUE4QjtpQkFDbkI0QywwQkFBVCxHQUFzQztpQkFDN0IsSUFBSU4sT0FBSixDQUFZLFVBQVNMLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO1lBQzNDRixNQUFNLENBQUNYLE1BQUQsRUFBU3JCLEdBQVQsRUFBY2lDLE9BQWQsRUFBdUJDLE1BQXZCLENBQU47V0FESyxDQUFQOzs7ZUFLS1EsZUFBZTs7Ozs7Ozs7Ozs7O1FBYXBCQSxlQUFlLEdBQUdBLGVBQWUsQ0FBQ0gsSUFBaEIsQ0FDaEJLLDBCQURnQjs7UUFJaEJBLDBCQUpnQixDQUFILEdBS1hBLDBCQUEwQixFQWxCaEM7T0F6QzhCOzs7O1dBZ0UzQmpELE9BQUwsR0FBZWdELE9BQWY7OztJQUdGeEIscUJBQXFCLENBQUNZLGFBQWEsQ0FBQzNELFNBQWYsQ0FBckI7O0lBQ0EyRCxhQUFhLENBQUMzRCxTQUFkLENBQXdCUSxtQkFBeEIsSUFBK0MsWUFBWTthQUNsRCxJQUFQO0tBREY7O0lBR0FYLE9BQU8sQ0FBQzhELGFBQVIsR0FBd0JBLGFBQXhCLENBcE1nQzs7OztJQXlNaEM5RCxPQUFPLENBQUM0RSxLQUFSLEdBQWdCLFVBQVM1RCxPQUFULEVBQWtCQyxPQUFsQixFQUEyQkMsSUFBM0IsRUFBaUNDLFdBQWpDLEVBQThDO1VBQ3hEMEQsSUFBSSxHQUFHLElBQUlmLGFBQUosQ0FDVC9DLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxJQUFuQixFQUF5QkMsV0FBekIsQ0FESyxDQUFYO2FBSU9uQixPQUFPLENBQUNxRCxtQkFBUixDQUE0QnBDLE9BQTVCLElBQ0g0RCxJQURHO1FBRUhBLElBQUksQ0FBQ0MsSUFBTCxHQUFZUixJQUFaLENBQWlCLFVBQVNILE1BQVQsRUFBaUI7ZUFDekJBLE1BQU0sQ0FBQ1ksSUFBUCxHQUFjWixNQUFNLENBQUNDLEtBQXJCLEdBQTZCUyxJQUFJLENBQUNDLElBQUwsRUFBcEM7T0FERixDQUZKO0tBTEY7O2FBWVNuRCxnQkFBVCxDQUEwQlgsT0FBMUIsRUFBbUNFLElBQW5DLEVBQXlDTSxPQUF6QyxFQUFrRDtVQUM1Q3dELEtBQUssR0FBRzdDLHNCQUFaO2FBRU8sU0FBUzRCLE1BQVQsQ0FBZ0JYLE1BQWhCLEVBQXdCckIsR0FBeEIsRUFBNkI7WUFDOUJpRCxLQUFLLEtBQUszQyxpQkFBZCxFQUFpQztnQkFDekIsSUFBSTRDLEtBQUosQ0FBVSw4QkFBVixDQUFOOzs7WUFHRUQsS0FBSyxLQUFLMUMsaUJBQWQsRUFBaUM7Y0FDM0JjLE1BQU0sS0FBSyxPQUFmLEVBQXdCO2tCQUNoQnJCLEdBQU47V0FGNkI7Ozs7aUJBT3hCbUQsVUFBVSxFQUFqQjs7O1FBR0YxRCxPQUFPLENBQUM0QixNQUFSLEdBQWlCQSxNQUFqQjtRQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWNBLEdBQWQ7O2VBRU8sSUFBUCxFQUFhO2NBQ1BvRCxRQUFRLEdBQUczRCxPQUFPLENBQUMyRCxRQUF2Qjs7Y0FDSUEsUUFBSixFQUFjO2dCQUNSQyxjQUFjLEdBQUdDLG1CQUFtQixDQUFDRixRQUFELEVBQVczRCxPQUFYLENBQXhDOztnQkFDSTRELGNBQUosRUFBb0I7a0JBQ2RBLGNBQWMsS0FBSzdDLGdCQUF2QixFQUF5QztxQkFDbEM2QyxjQUFQOzs7O2NBSUE1RCxPQUFPLENBQUM0QixNQUFSLEtBQW1CLE1BQXZCLEVBQStCOzs7WUFHN0I1QixPQUFPLENBQUM4RCxJQUFSLEdBQWU5RCxPQUFPLENBQUMrRCxLQUFSLEdBQWdCL0QsT0FBTyxDQUFDTyxHQUF2QztXQUhGLE1BS08sSUFBSVAsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixPQUF2QixFQUFnQztnQkFDakM0QixLQUFLLEtBQUs3QyxzQkFBZCxFQUFzQztjQUNwQzZDLEtBQUssR0FBRzFDLGlCQUFSO29CQUNNZCxPQUFPLENBQUNPLEdBQWQ7OztZQUdGUCxPQUFPLENBQUNnRSxpQkFBUixDQUEwQmhFLE9BQU8sQ0FBQ08sR0FBbEM7V0FOSyxNQVFBLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsUUFBdkIsRUFBaUM7WUFDdEM1QixPQUFPLENBQUNpRSxNQUFSLENBQWUsUUFBZixFQUF5QmpFLE9BQU8sQ0FBQ08sR0FBakM7OztVQUdGaUQsS0FBSyxHQUFHM0MsaUJBQVI7Y0FFSTZCLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ1osT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFyQjs7Y0FDSTBDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7OztZQUc1QmdELEtBQUssR0FBR3hELE9BQU8sQ0FBQ3VELElBQVIsR0FDSnpDLGlCQURJLEdBRUpGLHNCQUZKOztnQkFJSThCLE1BQU0sQ0FBQ25DLEdBQVAsS0FBZVEsZ0JBQW5CLEVBQXFDOzs7O21CQUk5QjtjQUNMNkIsS0FBSyxFQUFFRixNQUFNLENBQUNuQyxHQURUO2NBRUxnRCxJQUFJLEVBQUV2RCxPQUFPLENBQUN1RDthQUZoQjtXQVhGLE1BZ0JPLElBQUliLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7WUFDbENnRCxLQUFLLEdBQUcxQyxpQkFBUixDQURrQzs7O1lBSWxDZCxPQUFPLENBQUM0QixNQUFSLEdBQWlCLE9BQWpCO1lBQ0E1QixPQUFPLENBQUNPLEdBQVIsR0FBY21DLE1BQU0sQ0FBQ25DLEdBQXJCOzs7T0FyRU47S0F4TjhCOzs7Ozs7YUF1U3ZCc0QsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDM0QsT0FBdkMsRUFBZ0Q7VUFDMUM0QixNQUFNLEdBQUcrQixRQUFRLENBQUN6RSxRQUFULENBQWtCYyxPQUFPLENBQUM0QixNQUExQixDQUFiOztVQUNJQSxNQUFNLEtBQUs5QyxTQUFmLEVBQTBCOzs7UUFHeEJrQixPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5COztZQUVJM0QsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixPQUF2QixFQUFnQzs7Y0FFMUIrQixRQUFRLENBQUN6RSxRQUFULENBQWtCLFFBQWxCLENBQUosRUFBaUM7OztZQUcvQmMsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixRQUFqQjtZQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkO1lBQ0ErRSxtQkFBbUIsQ0FBQ0YsUUFBRCxFQUFXM0QsT0FBWCxDQUFuQjs7Z0JBRUlBLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7OztxQkFHdkJiLGdCQUFQOzs7O1VBSUpmLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7VUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUkyRCxTQUFKLENBQ1osZ0RBRFksQ0FBZDs7O2VBSUtuRCxnQkFBUDs7O1VBR0UyQixNQUFNLEdBQUd0QyxRQUFRLENBQUN3QixNQUFELEVBQVMrQixRQUFRLENBQUN6RSxRQUFsQixFQUE0QmMsT0FBTyxDQUFDTyxHQUFwQyxDQUFyQjs7VUFFSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7UUFDM0JSLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7UUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjbUMsTUFBTSxDQUFDbkMsR0FBckI7UUFDQVAsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjtlQUNPNUMsZ0JBQVA7OztVQUdFb0QsSUFBSSxHQUFHekIsTUFBTSxDQUFDbkMsR0FBbEI7O1VBRUksQ0FBRTRELElBQU4sRUFBWTtRQUNWbkUsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixPQUFqQjtRQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWMsSUFBSTJELFNBQUosQ0FBYyxrQ0FBZCxDQUFkO1FBQ0FsRSxPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5CO2VBQ081QyxnQkFBUDs7O1VBR0VvRCxJQUFJLENBQUNaLElBQVQsRUFBZTs7O1FBR2J2RCxPQUFPLENBQUMyRCxRQUFRLENBQUNTLFVBQVYsQ0FBUCxHQUErQkQsSUFBSSxDQUFDdkIsS0FBcEMsQ0FIYTs7UUFNYjVDLE9BQU8sQ0FBQ3NELElBQVIsR0FBZUssUUFBUSxDQUFDVSxPQUF4QixDQU5hOzs7Ozs7O1lBY1RyRSxPQUFPLENBQUM0QixNQUFSLEtBQW1CLFFBQXZCLEVBQWlDO1VBQy9CNUIsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtVQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkOztPQWhCSixNQW1CTzs7ZUFFRXFGLElBQVA7T0F0RTRDOzs7O01BMkU5Q25FLE9BQU8sQ0FBQzJELFFBQVIsR0FBbUIsSUFBbkI7YUFDTzVDLGdCQUFQO0tBblg4Qjs7OztJQXdYaENXLHFCQUFxQixDQUFDSCxFQUFELENBQXJCO0lBRUFBLEVBQUUsQ0FBQ2xDLGlCQUFELENBQUYsR0FBd0IsV0FBeEIsQ0ExWGdDOzs7Ozs7SUFpWWhDa0MsRUFBRSxDQUFDdEMsY0FBRCxDQUFGLEdBQXFCLFlBQVc7YUFDdkIsSUFBUDtLQURGOztJQUlBc0MsRUFBRSxDQUFDK0MsUUFBSCxHQUFjLFlBQVc7YUFDaEIsb0JBQVA7S0FERjs7YUFJU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7VUFDdEJDLEtBQUssR0FBRztRQUFFQyxNQUFNLEVBQUVGLElBQUksQ0FBQyxDQUFEO09BQTFCOztVQUVJLEtBQUtBLElBQVQsRUFBZTtRQUNiQyxLQUFLLENBQUNFLFFBQU4sR0FBaUJILElBQUksQ0FBQyxDQUFELENBQXJCOzs7VUFHRSxLQUFLQSxJQUFULEVBQWU7UUFDYkMsS0FBSyxDQUFDRyxVQUFOLEdBQW1CSixJQUFJLENBQUMsQ0FBRCxDQUF2QjtRQUNBQyxLQUFLLENBQUNJLFFBQU4sR0FBaUJMLElBQUksQ0FBQyxDQUFELENBQXJCOzs7V0FHR00sVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUJOLEtBQXJCOzs7YUFHT08sYUFBVCxDQUF1QlAsS0FBdkIsRUFBOEI7VUFDeEIvQixNQUFNLEdBQUcrQixLQUFLLENBQUNRLFVBQU4sSUFBb0IsRUFBakM7TUFDQXZDLE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxRQUFkO2FBQ09rQyxNQUFNLENBQUNuQyxHQUFkO01BQ0FrRSxLQUFLLENBQUNRLFVBQU4sR0FBbUJ2QyxNQUFuQjs7O2FBR096QyxPQUFULENBQWlCTixXQUFqQixFQUE4Qjs7OztXQUl2Qm1GLFVBQUwsR0FBa0IsQ0FBQztRQUFFSixNQUFNLEVBQUU7T0FBWCxDQUFsQjtNQUNBL0UsV0FBVyxDQUFDZ0MsT0FBWixDQUFvQjRDLFlBQXBCLEVBQWtDLElBQWxDO1dBQ0tXLEtBQUwsQ0FBVyxJQUFYOzs7SUFHRjFHLE9BQU8sQ0FBQzJHLElBQVIsR0FBZSxVQUFTQyxNQUFULEVBQWlCO1VBQzFCRCxJQUFJLEdBQUcsRUFBWDs7V0FDSyxJQUFJRSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtRQUN0QkQsSUFBSSxDQUFDSixJQUFMLENBQVVNLEdBQVY7OztNQUVGRixJQUFJLENBQUNHLE9BQUwsR0FMOEI7OzthQVN2QixTQUFTaEMsSUFBVCxHQUFnQjtlQUNkNkIsSUFBSSxDQUFDSSxNQUFaLEVBQW9CO2NBQ2RGLEdBQUcsR0FBR0YsSUFBSSxDQUFDSyxHQUFMLEVBQVY7O2NBQ0lILEdBQUcsSUFBSUQsTUFBWCxFQUFtQjtZQUNqQjlCLElBQUksQ0FBQ1YsS0FBTCxHQUFheUMsR0FBYjtZQUNBL0IsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjttQkFDT0QsSUFBUDs7U0FOaUI7Ozs7O1FBYXJCQSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO2VBQ09ELElBQVA7T0FkRjtLQVRGOzthQTJCU2hDLE1BQVQsQ0FBZ0JtRSxRQUFoQixFQUEwQjtVQUNwQkEsUUFBSixFQUFjO1lBQ1JDLGNBQWMsR0FBR0QsUUFBUSxDQUFDeEcsY0FBRCxDQUE3Qjs7WUFDSXlHLGNBQUosRUFBb0I7aUJBQ1hBLGNBQWMsQ0FBQ2pGLElBQWYsQ0FBb0JnRixRQUFwQixDQUFQOzs7WUFHRSxPQUFPQSxRQUFRLENBQUNuQyxJQUFoQixLQUF5QixVQUE3QixFQUF5QztpQkFDaENtQyxRQUFQOzs7WUFHRSxDQUFDRSxLQUFLLENBQUNGLFFBQVEsQ0FBQ0YsTUFBVixDQUFWLEVBQTZCO2NBQ3ZCSyxDQUFDLEdBQUcsQ0FBQyxDQUFUO2NBQVl0QyxJQUFJLEdBQUcsU0FBU0EsSUFBVCxHQUFnQjttQkFDMUIsRUFBRXNDLENBQUYsR0FBTUgsUUFBUSxDQUFDRixNQUF0QixFQUE4QjtrQkFDeEIzRyxNQUFNLENBQUM2QixJQUFQLENBQVlnRixRQUFaLEVBQXNCRyxDQUF0QixDQUFKLEVBQThCO2dCQUM1QnRDLElBQUksQ0FBQ1YsS0FBTCxHQUFhNkMsUUFBUSxDQUFDRyxDQUFELENBQXJCO2dCQUNBdEMsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjt1QkFDT0QsSUFBUDs7OztZQUlKQSxJQUFJLENBQUNWLEtBQUwsR0FBYTlELFNBQWI7WUFDQXdFLElBQUksQ0FBQ0MsSUFBTCxHQUFZLElBQVo7bUJBRU9ELElBQVA7V0FaRjs7aUJBZU9BLElBQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUFuQjs7T0EzQm9COzs7YUFnQ2pCO1FBQUVBLElBQUksRUFBRUk7T0FBZjs7O0lBRUZsRixPQUFPLENBQUM4QyxNQUFSLEdBQWlCQSxNQUFqQjs7YUFFU29DLFVBQVQsR0FBc0I7YUFDYjtRQUFFZCxLQUFLLEVBQUU5RCxTQUFUO1FBQW9CeUUsSUFBSSxFQUFFO09BQWpDOzs7SUFHRnRELE9BQU8sQ0FBQ3RCLFNBQVIsR0FBb0I7TUFDbEI2QyxXQUFXLEVBQUV2QixPQURLO01BR2xCaUYsS0FBSyxFQUFFLFVBQVNXLGFBQVQsRUFBd0I7YUFDeEJDLElBQUwsR0FBWSxDQUFaO2FBQ0t4QyxJQUFMLEdBQVksQ0FBWixDQUY2Qjs7O2FBS3hCUSxJQUFMLEdBQVksS0FBS0MsS0FBTCxHQUFhakYsU0FBekI7YUFDS3lFLElBQUwsR0FBWSxLQUFaO2FBQ0tJLFFBQUwsR0FBZ0IsSUFBaEI7YUFFSy9CLE1BQUwsR0FBYyxNQUFkO2FBQ0tyQixHQUFMLEdBQVd6QixTQUFYO2FBRUtnRyxVQUFMLENBQWdCbkQsT0FBaEIsQ0FBd0JxRCxhQUF4Qjs7WUFFSSxDQUFDYSxhQUFMLEVBQW9CO2VBQ2IsSUFBSTdELElBQVQsSUFBaUIsSUFBakIsRUFBdUI7O2dCQUVqQkEsSUFBSSxDQUFDK0QsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsSUFDQW5ILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWSxJQUFaLEVBQWtCdUIsSUFBbEIsQ0FEQSxJQUVBLENBQUMyRCxLQUFLLENBQUMsQ0FBQzNELElBQUksQ0FBQ2dFLEtBQUwsQ0FBVyxDQUFYLENBQUYsQ0FGVixFQUU0QjttQkFDckJoRSxJQUFMLElBQWFsRCxTQUFiOzs7O09BdkJVO01BNkJsQm1ILElBQUksRUFBRSxZQUFXO2FBQ1YxQyxJQUFMLEdBQVksSUFBWjtZQUVJMkMsU0FBUyxHQUFHLEtBQUtwQixVQUFMLENBQWdCLENBQWhCLENBQWhCO1lBQ0lxQixVQUFVLEdBQUdELFNBQVMsQ0FBQ2pCLFVBQTNCOztZQUNJa0IsVUFBVSxDQUFDM0YsSUFBWCxLQUFvQixPQUF4QixFQUFpQztnQkFDekIyRixVQUFVLENBQUM1RixHQUFqQjs7O2VBR0ssS0FBSzZGLElBQVo7T0F0Q2dCO01BeUNsQnBDLGlCQUFpQixFQUFFLFVBQVNxQyxTQUFULEVBQW9CO1lBQ2pDLEtBQUs5QyxJQUFULEVBQWU7Z0JBQ1A4QyxTQUFOOzs7WUFHRXJHLE9BQU8sR0FBRyxJQUFkOztpQkFDU3NHLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixFQUE2QjtVQUMzQjlELE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxPQUFkO1VBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWE4RixTQUFiO1VBQ0FyRyxPQUFPLENBQUNzRCxJQUFSLEdBQWVpRCxHQUFmOztjQUVJQyxNQUFKLEVBQVk7OztZQUdWeEcsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtZQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkOzs7aUJBR0ssQ0FBQyxDQUFFMEgsTUFBVjs7O2FBR0csSUFBSVosQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7Y0FDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjtjQUNJbEQsTUFBTSxHQUFHK0IsS0FBSyxDQUFDUSxVQUFuQjs7Y0FFSVIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCLE1BQXJCLEVBQTZCOzs7O21CQUlwQjRCLE1BQU0sQ0FBQyxLQUFELENBQWI7OztjQUdFN0IsS0FBSyxDQUFDQyxNQUFOLElBQWdCLEtBQUtvQixJQUF6QixFQUErQjtnQkFDekJXLFFBQVEsR0FBRzdILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWWdFLEtBQVosRUFBbUIsVUFBbkIsQ0FBZjtnQkFDSWlDLFVBQVUsR0FBRzlILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWWdFLEtBQVosRUFBbUIsWUFBbkIsQ0FBakI7O2dCQUVJZ0MsUUFBUSxJQUFJQyxVQUFoQixFQUE0QjtrQkFDdEIsS0FBS1osSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQzt1QkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjtlQURGLE1BRU8sSUFBSSxLQUFLbUIsSUFBTCxHQUFZckIsS0FBSyxDQUFDRyxVQUF0QixFQUFrQzt1QkFDaEMwQixNQUFNLENBQUM3QixLQUFLLENBQUNHLFVBQVAsQ0FBYjs7YUFKSixNQU9PLElBQUk2QixRQUFKLEVBQWM7a0JBQ2YsS0FBS1gsSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQzt1QkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjs7YUFGRyxNQUtBLElBQUkrQixVQUFKLEVBQWdCO2tCQUNqQixLQUFLWixJQUFMLEdBQVlyQixLQUFLLENBQUNHLFVBQXRCLEVBQWtDO3VCQUN6QjBCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0csVUFBUCxDQUFiOzthQUZHLE1BS0E7b0JBQ0MsSUFBSW5CLEtBQUosQ0FBVSx3Q0FBVixDQUFOOzs7O09BL0ZVO01BcUdsQlEsTUFBTSxFQUFFLFVBQVN6RCxJQUFULEVBQWVELEdBQWYsRUFBb0I7YUFDckIsSUFBSXFGLENBQUMsR0FBRyxLQUFLZCxVQUFMLENBQWdCUyxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0ssQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO2NBQ2hEbkIsS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0JjLENBQWhCLENBQVo7O2NBQ0luQixLQUFLLENBQUNDLE1BQU4sSUFBZ0IsS0FBS29CLElBQXJCLElBQ0FsSCxNQUFNLENBQUM2QixJQUFQLENBQVlnRSxLQUFaLEVBQW1CLFlBQW5CLENBREEsSUFFQSxLQUFLcUIsSUFBTCxHQUFZckIsS0FBSyxDQUFDRyxVQUZ0QixFQUVrQztnQkFDNUIrQixZQUFZLEdBQUdsQyxLQUFuQjs7Ozs7WUFLQWtDLFlBQVksS0FDWG5HLElBQUksS0FBSyxPQUFULElBQ0FBLElBQUksS0FBSyxVQUZFLENBQVosSUFHQW1HLFlBQVksQ0FBQ2pDLE1BQWIsSUFBdUJuRSxHQUh2QixJQUlBQSxHQUFHLElBQUlvRyxZQUFZLENBQUMvQixVQUp4QixFQUlvQzs7O1VBR2xDK0IsWUFBWSxHQUFHLElBQWY7OztZQUdFakUsTUFBTSxHQUFHaUUsWUFBWSxHQUFHQSxZQUFZLENBQUMxQixVQUFoQixHQUE2QixFQUF0RDtRQUNBdkMsTUFBTSxDQUFDbEMsSUFBUCxHQUFjQSxJQUFkO1FBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWFBLEdBQWI7O1lBRUlvRyxZQUFKLEVBQWtCO2VBQ1gvRSxNQUFMLEdBQWMsTUFBZDtlQUNLMEIsSUFBTCxHQUFZcUQsWUFBWSxDQUFDL0IsVUFBekI7aUJBQ083RCxnQkFBUDs7O2VBR0ssS0FBSzZGLFFBQUwsQ0FBY2xFLE1BQWQsQ0FBUDtPQXBJZ0I7TUF1SWxCa0UsUUFBUSxFQUFFLFVBQVNsRSxNQUFULEVBQWlCbUMsUUFBakIsRUFBMkI7WUFDL0JuQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO2dCQUNyQmtDLE1BQU0sQ0FBQ25DLEdBQWI7OztZQUdFbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFoQixJQUNBa0MsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixVQURwQixFQUNnQztlQUN6QjhDLElBQUwsR0FBWVosTUFBTSxDQUFDbkMsR0FBbkI7U0FGRixNQUdPLElBQUltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO2VBQzlCNEYsSUFBTCxHQUFZLEtBQUs3RixHQUFMLEdBQVdtQyxNQUFNLENBQUNuQyxHQUE5QjtlQUNLcUIsTUFBTCxHQUFjLFFBQWQ7ZUFDSzBCLElBQUwsR0FBWSxLQUFaO1NBSEssTUFJQSxJQUFJWixNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQWhCLElBQTRCcUUsUUFBaEMsRUFBMEM7ZUFDMUN2QixJQUFMLEdBQVl1QixRQUFaOzs7ZUFHSzlELGdCQUFQO09BdkpnQjtNQTBKbEI4RixNQUFNLEVBQUUsVUFBU2pDLFVBQVQsRUFBcUI7YUFDdEIsSUFBSWdCLENBQUMsR0FBRyxLQUFLZCxVQUFMLENBQWdCUyxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0ssQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO2NBQ2hEbkIsS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0JjLENBQWhCLENBQVo7O2NBQ0luQixLQUFLLENBQUNHLFVBQU4sS0FBcUJBLFVBQXpCLEVBQXFDO2lCQUM5QmdDLFFBQUwsQ0FBY25DLEtBQUssQ0FBQ1EsVUFBcEIsRUFBZ0NSLEtBQUssQ0FBQ0ksUUFBdEM7WUFDQUcsYUFBYSxDQUFDUCxLQUFELENBQWI7bUJBQ08xRCxnQkFBUDs7O09BaEtZO2VBcUtULFVBQVMyRCxNQUFULEVBQWlCO2FBQ25CLElBQUlrQixDQUFDLEdBQUcsS0FBS2QsVUFBTCxDQUFnQlMsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNLLENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDtjQUNoRG5CLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCYyxDQUFoQixDQUFaOztjQUNJbkIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCQSxNQUFyQixFQUE2QjtnQkFDdkJoQyxNQUFNLEdBQUcrQixLQUFLLENBQUNRLFVBQW5COztnQkFDSXZDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7a0JBQ3ZCc0csTUFBTSxHQUFHcEUsTUFBTSxDQUFDbkMsR0FBcEI7Y0FDQXlFLGFBQWEsQ0FBQ1AsS0FBRCxDQUFiOzs7bUJBRUtxQyxNQUFQOztTQVRvQjs7OztjQWVsQixJQUFJckQsS0FBSixDQUFVLHVCQUFWLENBQU47T0FwTGdCO01BdUxsQnNELGFBQWEsRUFBRSxVQUFTdEIsUUFBVCxFQUFtQnJCLFVBQW5CLEVBQStCQyxPQUEvQixFQUF3QzthQUNoRFYsUUFBTCxHQUFnQjtVQUNkekUsUUFBUSxFQUFFb0MsTUFBTSxDQUFDbUUsUUFBRCxDQURGO1VBRWRyQixVQUFVLEVBQUVBLFVBRkU7VUFHZEMsT0FBTyxFQUFFQTtTQUhYOztZQU1JLEtBQUt6QyxNQUFMLEtBQWdCLE1BQXBCLEVBQTRCOzs7ZUFHckJyQixHQUFMLEdBQVd6QixTQUFYOzs7ZUFHS2lDLGdCQUFQOztLQXBNSixDQTNlZ0M7Ozs7O1dBdXJCekJ2QyxPQUFQO0dBdnJCYTs7OztFQThyQmdCd0ksTUFBTSxDQUFDeEksT0FBcEMsQUE5ckJhLENBQWY7O01BaXNCSTtJQUNGeUksa0JBQWtCLEdBQUcxSSxPQUFyQjtHQURGLENBRUUsT0FBTzJJLG9CQUFQLEVBQTZCOzs7Ozs7Ozs7O0lBVTdCQyxRQUFRLENBQUMsR0FBRCxFQUFNLHdCQUFOLENBQVIsQ0FBd0M1SSxPQUF4Qzs7OztBQ3B0QkYsZUFBYyxHQUFHNkksU0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDT0FDLFdBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNGYUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFRVCxNQUFBLENBQUEsYUFBQSxHQUFBLGNBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBVUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQVlJLGlCQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzthQVVKLE1BQUE7Ozs7O2FBRVNBLG9CQUFBQSxNQUFBQTs7O2VBRVI7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQU1ELE1BQUE7Ozs7Ozs7Ozs7OzsyQ0FLbUIsQ0FBQSxPQUFBLElBQUEsUUFBQSxLQUFBLEtBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdER2QixJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxPQVNkO01BUkpDLGVBUUksUUFSSkEsZUFRSTtNQVBKQyxZQU9JLFFBUEpBLFlBT0k7TUFOSkMsU0FNSSxRQU5KQSxTQU1JO01BTEpDLGtCQUtJLFFBTEpBLGtCQUtJO01BSkpDLEtBSUksUUFKSkEsS0FJSTtNQUhKQyxnQkFHSSxRQUhKQSxnQkFHSTtNQUZKQyxTQUVJLFFBRkpBLFNBRUk7TUFESkMsSUFDSSxRQURKQSxJQUNJO01BQ0VDLElBQUksR0FBR0MsQ0FBTSxDQUFDLElBQUQsQ0FBbkI7O2tCQUN3Q0MsQ0FBUSxDQUFDLENBQUQsQ0FGNUM7O01BRUdDLFlBRkg7TUFFaUJDLGVBRmpCOzttQkFHc0NGLENBQVEsQ0FBQyxDQUFELENBSDlDOztNQUdHRyxhQUhIO01BR2tCQyxnQkFIbEI7O21CQUlnQ0osQ0FBUSxDQUFDLENBQUQsQ0FKeEM7O01BSUdLLFVBSkg7TUFJZUMsYUFKZjs7bUJBSzRCTixDQUFRLENBQUMsS0FBRCxDQUxwQzs7TUFLR08sUUFMSDtNQUthQyxXQUxiOzttQkFNa0NSLENBQVEsQ0FBQyxJQUFELENBTjFDOztNQU1HUyxXQU5IO01BTWdCQyxjQU5oQjs7b0JBT3NCVixDQUFRLENBQUMsSUFBRCxDQVA5Qjs7TUFPR2xGLEtBUEg7TUFPVTZGLFFBUFY7O29CQVEwQlgsQ0FBUSxDQUFDLEtBQUQsQ0FSbEM7O01BUUdZLE9BUkg7TUFRWUMsVUFSWjs7RUFTSkMsQ0FBUyxDQUFDLFlBQU07SUFDZFosZUFBZSxDQUFDSixJQUFJLENBQUNpQixPQUFMLENBQWFkLFlBQWQsQ0FBZjtHQURPLEVBRU4sRUFGTSxDQUFUO0VBR0FhLENBQVMsQ0FBQyxZQUFNO0lBQ2RWLGdCQUFnQixDQUNkWSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsQ0FBRWhCLFlBQVksR0FBRyxHQUFoQixHQUF1QlYsWUFBeEIsRUFBc0MyQixPQUF0QyxDQUE4QyxDQUE5QyxDQUFoQixDQURjLENBQWhCO0dBRE8sRUFJTixDQUFDM0IsWUFBRCxFQUFlVSxZQUFmLENBSk0sQ0FBVDtFQU1BYSxDQUFTLENBQUMsWUFBTTtRQUNWcEIsS0FBSyxLQUFLLENBQWQsRUFBaUI7VUFDVHlCLFFBQVEsR0FBRyxNQUFNMUIsa0JBQXZCO01BQ0FhLGFBQWEsQ0FBQ2EsUUFBRCxDQUFiOzs7UUFHRXpCLEtBQUssR0FBRyxDQUFaLEVBQWU7VUFDUHlCLFNBQVEsR0FBRyxNQUFNMUIsa0JBQU4sR0FBMkJVLGFBQWEsSUFBSVQsS0FBSyxHQUFHLENBQVosQ0FBekQ7O01BQ0FZLGFBQWEsQ0FBQ2EsU0FBRCxDQUFiOztHQVJLLEVBVU4sQ0FBQzFCLGtCQUFELENBVk0sQ0FBVDtFQVlBcUIsQ0FBUyxDQUFDLFlBQU07UUFDVnBCLEtBQUssS0FBSyxDQUFkLEVBQWlCO01BQ2ZjLFdBQVcsQ0FBQyxJQUFELENBQVg7S0FERixNQUVPLElBQUlkLEtBQUssR0FBRyxDQUFaLEVBQWU7VUFDaEJXLFVBQVUsR0FBRyxDQUFiLElBQWtCQSxVQUFVLEtBQUtGLGFBQXJDLEVBQW9EO1FBQ2xESyxXQUFXLENBQUMsSUFBRCxDQUFYO09BREYsTUFFTztRQUNMQSxXQUFXLENBQUMsS0FBRCxDQUFYOzs7R0FQRyxFQVVOLENBQUNILFVBQUQsRUFBYUYsYUFBYixDQVZNLENBQVQ7RUFZQVcsQ0FBUyxDQUFDLFlBQU07YUFDQ00sZUFBZjs7Ozs7Ozs7bUJBRVFiLFFBRlI7Ozs7Ozt1Q0FHaUNWLElBQUksRUFIckM7OztjQUdZd0IsWUFIWjtjQUlNWCxjQUFjLENBQUNXLFlBQVksV0FBYixDQUFkO2NBQ0FSLFVBQVUsQ0FBQyxLQUFELENBQVY7Ozs7Ozs7OztjQUdGRixRQUFRLGFBQVI7Y0FDQUUsVUFBVSxDQUFDLEtBQUQsQ0FBVjs7Ozs7Ozs7OztJQUdKTyxlQUFlO0dBYlIsRUFjTixDQUFDYixRQUFELEVBQVdWLElBQVgsQ0FkTSxDQUFUO1NBaUJFO0lBQUssR0FBRyxFQUFFQyxJQUFWO0lBQWdCLEVBQUUsRUFBRUo7S0FDbEIsRUFBQyxJQUFEO0lBQU0sU0FBUyxFQUFDO0tBQ2JrQixPQUFPLElBQUlILFdBQVcsS0FBSyxJQUEzQixHQUFrQyx5QkFBbEMsR0FBdURBLFdBRDFELENBREYsQ0FERjtDQW5FRjtBQTZFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLElBQU1hLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FJakI7TUFISkMsYUFHSSxRQUhKQSxhQUdJO01BRkpDLGtCQUVJLFFBRkpBLGtCQUVJO01BREpDLGdCQUNJLFFBREpBLGdCQUNJO1NBRUY7SUFBSyxLQUFLLEVBQUU7TUFBRUMsUUFBUSxFQUFFLFVBQVo7TUFBd0JDLEtBQUssRUFBRSxJQUEvQjtNQUFxQ0MsR0FBRyxFQUFFLEtBQTFDO01BQWdEQyxNQUFNLEVBQUM7O0tBQ2pFO0lBQ0UsUUFBUSxFQUFFSixnQkFEWjtJQUVFLE9BQU8sRUFBRSxtQkFBTTtNQUNiRixhQUFhLENBQUMsS0FBRCxDQUFiOztjQUpOLEVBU0U7SUFDRSxRQUFRLEVBQUVDLGtCQURaO0lBRUUsT0FBTyxFQUFFLG1CQUFNO01BQ2JELGFBQWEsQ0FBQyxRQUFELENBQWI7O2dCQVpOLENBREY7Q0FMRjs7QUNNQSxTQUFTTyxhQUFULE9BQXlDO01BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7O2tCQUNML0IsQ0FBUSxDQUFDLENBQUQsQ0FESDs7TUFDaENSLFNBRGdDO01BQ3JCd0MsWUFEcUI7O21CQUVDaEMsQ0FBUSxDQUFDLENBQUQsQ0FGVDs7TUFFaENULFlBRmdDO01BRWxCMEMsZUFGa0I7O21CQUdhakMsQ0FBUSxDQUFDLEdBQUQsQ0FIckI7O01BR2hDUCxrQkFIZ0M7TUFHWnlDLHFCQUhZOzttQkFJTGxDLENBQVEsQ0FBQyxLQUFELENBSkg7O01BSWhDSixTQUpnQztNQUlyQnVDLFlBSnFCOzttQkFLT25DLENBQVEsQ0FBQ3BKLFNBQUQsQ0FMZjs7TUFLaEMwSSxlQUxnQztNQUtmOEMsa0JBTGU7O29CQU1DcEMsQ0FBUSxDQUFDLENBQUQsQ0FOVDs7TUFNaENxQyxZQU5nQztNQU1sQkMsZUFOa0I7O29CQU9TdEMsQ0FBUSxDQUFDLEtBQUQsQ0FQakI7O01BT2hDeUIsZ0JBUGdDO01BT2RjLG1CQVBjOztvQkFRYXZDLENBQVEsQ0FBQyxLQUFELENBUnJCOztNQVFoQ3dCLGtCQVJnQztNQVFaZ0IscUJBUlk7O01BU2pDQyxRQUFRLEdBQUcxQyxDQUFNLENBQUMsSUFBRCxDQUF2Qjs7V0FDU0osZ0JBQVQsQ0FBMEIrQyxFQUExQixFQUE4QjtJQUM1QlAsWUFBWSxDQUFDLElBQUQsQ0FBWjtJQUNBUSxRQUFRLENBQUNDLGNBQVQsQ0FBd0JGLEVBQXhCLEVBQTRCRyxjQUE1QixDQUEyQztNQUFFQyxRQUFRLEVBQUU7S0FBdkQ7SUFDQVgsWUFBWSxDQUFDLEtBQUQsQ0FBWjs7O1dBRU9aLGFBQVQsQ0FBdUJ3QixTQUF2QixFQUFrQztRQUM1QkEsU0FBUyxLQUFLLEtBQWQsSUFBdUJWLFlBQVksR0FBRyxDQUExQyxFQUE2QztNQUMzQ0MsZUFBZSxDQUFDRCxZQUFZLEdBQUcsQ0FBaEIsQ0FBZjtLQURGLE1BRU87TUFDTEMsZUFBZSxDQUFDRCxZQUFZLEdBQUcsQ0FBaEIsQ0FBZjs7OztXQUdLVyxZQUFULENBQXNCQyxDQUF0QixFQUF5QjtJQUN2QmpCLFlBQVksQ0FBQ1MsUUFBUSxDQUFDMUIsT0FBVCxDQUFpQnZCLFNBQWxCLENBQVo7SUFFQXdDLFlBQVksQ0FBQyxVQUFBa0IsU0FBUyxFQUFJO1VBQ3BCQSxTQUFTLEdBQUdULFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ2QixTQUFqQyxFQUE0QztRQUMxQzRDLGtCQUFrQixDQUFDLFFBQUQsQ0FBbEI7T0FERixNQUVPO1FBQ0xBLGtCQUFrQixDQUFDLEtBQUQsQ0FBbEI7OzthQUdLSyxRQUFRLENBQUMxQixPQUFULENBQWlCdkIsU0FBeEI7S0FQVSxDQUFaO0lBU0F5QyxlQUFlLENBQUNRLFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ4QixZQUFsQixDQUFmO0lBQ0EyQyxxQkFBcUIsQ0FDbkIsQ0FDRyxDQUFDTyxRQUFRLENBQUMxQixPQUFULENBQWlCeEIsWUFBakIsR0FBZ0NrRCxRQUFRLENBQUMxQixPQUFULENBQWlCdkIsU0FBbEQsSUFBK0QsR0FBaEUsR0FDQWlELFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ4QixZQUZuQixFQUdFMkIsT0FIRixDQUdVLENBSFYsQ0FEbUIsQ0FBckI7OztFQVFGSixDQUFTLENBQUMsWUFBTTtJQUNkMkIsUUFBUSxDQUFDMUIsT0FBVCxDQUFpQm9DLGdCQUFqQixDQUFrQyxRQUFsQyxFQUE0Q0gsWUFBNUM7V0FFTyxZQUFNO0tBQWI7R0FITyxFQU1OLEVBTk0sQ0FBVDtFQU9BbEMsQ0FBUyxDQUFDLFlBQU07SUFDZG5CLGdCQUFnQixDQUFDMEMsWUFBRCxDQUFoQjs7UUFDSU4sWUFBWSxDQUFDMUUsTUFBYixHQUFzQixDQUF0QixLQUE0QmdGLFlBQWhDLEVBQThDO01BQzVDRyxxQkFBcUIsQ0FBQyxJQUFELENBQXJCO0tBREYsTUFFTztNQUNMQSxxQkFBcUIsQ0FBQyxLQUFELENBQXJCOzs7UUFHRUgsWUFBWSxLQUFLLENBQXJCLEVBQXdCO01BQ3RCRSxtQkFBbUIsQ0FBQyxJQUFELENBQW5CO0tBREYsTUFFTztNQUNMQSxtQkFBbUIsQ0FBQyxLQUFELENBQW5COztHQVhLLEVBYU4sQ0FBQ0YsWUFBRCxDQWJNLENBQVQ7U0FjTyxDQUNMO0lBQUssS0FBSyxFQUFFO01BQUVlLE1BQU0sRUFBRTs7SUFEakIsRUFFTCxFQUFDLGNBQUQ7SUFDRSxnQkFBZ0IsRUFBRTNCLGdCQURwQjtJQUVFLGtCQUFrQixFQUFFRCxrQkFGdEI7SUFHRSxhQUFhLEVBQUVEO0lBTFosRUFPTDtJQUFLLEdBQUcsRUFBRWtCLFFBQVY7SUFBb0IsS0FBSyxFQUFFO01BQUVXLE1BQU0sRUFBRSxNQUFWO01BQWtCQyxRQUFRLEVBQUUsUUFBNUI7TUFBc0NDLE9BQU8sRUFBQyxNQUE5QztNQUFzREMsYUFBYSxFQUFDOztLQUM1RnhCLFlBQVksQ0FBQ3lCLEdBQWIsQ0FBaUIsVUFBQ0MsSUFBRCxFQUFJL0YsQ0FBSixFQUFVO1dBRXhCLEVBQUMsV0FBRDtNQUNFLElBQUksRUFBRStGLElBQUMsQ0FBQzVELElBRFY7TUFFRSxlQUFlLEVBQUVQLGVBRm5CO01BR0UsU0FBUyxFQUFFTSxTQUhiO01BSUUsZ0JBQWdCLEVBQUVELGdCQUpwQjtNQUtFLEtBQUssRUFBRWpDLENBTFQ7TUFNRSxrQkFBa0IsRUFBRStCLGtCQU50QjtNQU9FLFNBQVMsRUFBRUQsU0FQYjtNQVFFLFlBQVksRUFBRUQ7TUFUbEI7R0FERCxDQURILENBUEssQ0FBUDs7O0FDckVGLElBQU1tRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07U0FFckIsRUFBQyxhQUFEO0lBQW1CLFlBQVksRUFBRSxDQUN0QztNQUFFN0QsSUFBSSxFQUFFO2VBQU0sNkJBQU47O0tBRDhCLEVBRXRDO01BQUVBLElBQUksRUFBRTtlQUFNLDhCQUFOOztLQUY4QixFQUd0QztNQUFFQSxJQUFJLEVBQUU7ZUFBTSw4QkFBTjs7S0FIOEI7SUFBeEM7Q0FGRjtBQVlBOzs7Ozs7Ozs7OzsifQ==
