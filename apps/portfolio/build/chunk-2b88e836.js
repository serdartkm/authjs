import { a as createCommonjsModule, k as unwrapExports, b as _interopRequireDefault, d as require$$1, c as require$$0, e as require$$2, f as getPrototypeOf, g as require$$4, h as require$$5, i as require$$6, j as _preact, l as require$$0$1, o as styleInject, x as d, u as v, v as _slicedToArray, y as p, p as h } from './chunk-f15771b5.js';

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

  var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf);

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

  var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf);

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

var css$1 = ".lazy-loadable-card {\r\n    height: 90vh;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n   \r\n    border-bottom: 5px solid white;\r\n    display: flex;\r\n    overflow: hidden;\r\n}\r\n\r\n";
styleInject(css$1);

var LazyLoadableCard = function LazyLoadableCard(_ref) {
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
    className: "lazy-loadable-card"
  }, loading && LLComponent !== null ? h("div", null, "Loading") : LLComponent));
};

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

function LazyScroller(_ref) {
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
    return function () {};
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
    return h(LazyLoadableCard, {
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
  return h(LazyScroller, {
    dynamicItems: [{
      load: function load() {
        return import('./chunk-da1f9ad2.js');
      }
    }, {
      load: function load() {
        return import('./chunk-da1f9ad22.js');
      }
    }, {
      load: function load() {
        return import('./chunk-da1f9ad23.js');
      }
    }]
  });
};

export { regenerator as a, ModuleComponent as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstMmI4OGU4MzYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQnV0dG9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0NhcmQvaW5kZXguanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2xhenktbG9hZGFibGUtY2FyZC9pbmRleC5qcyIsIi4uLy4uLy4uL2NvbXBvbmVudHMvbGF6eS1zY3JvbGxlci9TY3JvbGxlckFycm93cy5qcyIsIi4uLy4uLy4uL2NvbXBvbmVudHMvbGF6eS1zY3JvbGxlci9pbmRleC5qcyIsIi4uL21vZHVsZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5CdXR0b24gPSBleHBvcnRzLkJ1dHRvbkljb24gPSB2b2lkIDA7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3ByZWFjdCA9IHJlcXVpcmUoXCJwcmVhY3RcIik7XG5cbnZhciBfTWF0ZXJpYWxDb21wb25lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQmFzZS9NYXRlcmlhbENvbXBvbmVudFwiKSk7XG5cbnZhciBfSWNvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9JY29uXCIpKTtcblxudmFyIF9nZW5lcmF0ZVRoZW1lQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi90aGVtZVV0aWxzL2dlbmVyYXRlVGhlbWVDbGFzc1wiKSk7XG5cbnZhciBCdXR0b25JY29uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfSWNvbikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShCdXR0b25JY29uLCBfSWNvbik7XG5cbiAgZnVuY3Rpb24gQnV0dG9uSWNvbigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBCdXR0b25JY29uKTtcbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQnV0dG9uSWNvbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMuY29tcG9uZW50TmFtZSA9ICdidXR0b25fX2ljb24nO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHJldHVybiBCdXR0b25JY29uO1xufShfSWNvbjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQnV0dG9uSWNvbiA9IEJ1dHRvbkljb247XG5cbnZhciBCdXR0b24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShCdXR0b24sIF9NYXRlcmlhbENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBCdXR0b24pO1xuICAgIF90aGlzMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQnV0dG9uKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdidXR0b24nO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFsnZGVuc2UnLCAncmFpc2VkJywgJ3VuZWxldmF0ZWQnLCAnb3V0bGluZWQnXTtcbiAgICBfdGhpczIudGhlbWVQcm9wcyA9IFsncHJpbWFyeScsICdzZWNvbmRhcnknXTtcbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoQnV0dG9uLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgdmFyIEJ1dHRvbkVsZW1lbnQgPSBwcm9wcy5ocmVmID8gJ2EnIDogJ2J1dHRvbic7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gJyc7XG4gICAgICB0aGlzLnRoZW1lUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAodGhlbWVQcm9wKSB7XG4gICAgICAgIGlmICh0aGVtZVByb3AgaW4gcHJvcHMgJiYgcHJvcHNbdGhlbWVQcm9wXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjbGFzc05hbWUgKz0gKDAsIF9nZW5lcmF0ZVRoZW1lQ2xhc3MuZGVmYXVsdCkodGhlbWVQcm9wKSArICcgJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoQnV0dG9uRWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICAgICAgfSksIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQnV0dG9uO1xufShfTWF0ZXJpYWxDb21wb25lbnQyLmRlZmF1bHQpO1xuXG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcblxudmFyIGRlZmF1bHRfMSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0J1dHRvbikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShkZWZhdWx0XzEsIF9CdXR0b24pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRfMSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBkZWZhdWx0XzEpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKGRlZmF1bHRfMSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdF8xO1xufShCdXR0b24pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5kZWZhdWx0XzEuSWNvbiA9IEJ1dHRvbkljb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLkNhcmQgPSBleHBvcnRzLkNhcmRNZWRpYUNvbnRlbnQgPSBleHBvcnRzLkNhcmRBY3Rpb25JY29uID0gZXhwb3J0cy5DYXJkQWN0aW9uQnV0dG9ucyA9IGV4cG9ydHMuQ2FyZEFjdGlvbkljb25zID0gZXhwb3J0cy5DYXJkQWN0aW9uQnV0dG9uID0gZXhwb3J0cy5DYXJkTWVkaWEgPSBleHBvcnRzLkNhcmRBY3Rpb25zID0gdm9pZCAwO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3ByZWFjdCA9IHJlcXVpcmUoXCJwcmVhY3RcIik7XG5cbnZhciBfTWF0ZXJpYWxDb21wb25lbnQ2ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQmFzZS9NYXRlcmlhbENvbXBvbmVudFwiKSk7XG5cbnZhciBfQnV0dG9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0J1dHRvblwiKSk7XG5cbnZhciBfSWNvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9JY29uXCIpKTtcblxudmFyIENhcmRBY3Rpb25zID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZEFjdGlvbnMsIF9NYXRlcmlhbENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ2FyZEFjdGlvbnMoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgQ2FyZEFjdGlvbnMpO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkQWN0aW9ucykuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMuY29tcG9uZW50TmFtZSA9ICdjYXJkX19hY3Rpb25zJztcbiAgICBfdGhpcy5tZGNQcm9wcyA9IFsnZnVsbC1ibGVlZCddO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmRBY3Rpb25zLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDYXJkQWN0aW9ucztcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkQWN0aW9ucyA9IENhcmRBY3Rpb25zO1xuXG52YXIgQ2FyZE1lZGlhID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKENhcmRNZWRpYSwgX01hdGVyaWFsQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gQ2FyZE1lZGlhKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkTWVkaWEpO1xuICAgIF90aGlzMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZE1lZGlhKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdjYXJkX19tZWRpYSc7XG4gICAgX3RoaXMyLm1kY1Byb3BzID0gWydzcXVhcmUnLCAnMTYtOSddO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShDYXJkTWVkaWEsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICBpZiAocHJvcHMuc2l4dGVlbkJ5TmluZSkge1xuICAgICAgICBwcm9wcy5jbGFzc05hbWUgPSAnbWRjLWNhcmRfX21lZGlhLS0xNi05JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDYXJkTWVkaWE7XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQ2FyZE1lZGlhID0gQ2FyZE1lZGlhO1xuXG52YXIgQ2FyZEFjdGlvbkJ1dHRvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0J1dHRvbikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShDYXJkQWN0aW9uQnV0dG9uLCBfQnV0dG9uKTtcblxuICBmdW5jdGlvbiBDYXJkQWN0aW9uQnV0dG9uKCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkQWN0aW9uQnV0dG9uKTtcbiAgICBfdGhpczMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmRBY3Rpb25CdXR0b24pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzMy5jb21wb25lbnROYW1lID0gJ2NhcmRfX2FjdGlvbic7XG4gICAgX3RoaXMzLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmRBY3Rpb25CdXR0b24sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJidXR0b25cIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNsYXNzTmFtZTogXCJtZGMtYnV0dG9uIG1kYy1jYXJkX19hY3Rpb24tLWJ1dHRvblwiXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmRBY3Rpb25CdXR0b247XG59KF9CdXR0b24yLmRlZmF1bHQpO1xuXG5leHBvcnRzLkNhcmRBY3Rpb25CdXR0b24gPSBDYXJkQWN0aW9uQnV0dG9uO1xuXG52YXIgQ2FyZEFjdGlvbkljb25zID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKENhcmRBY3Rpb25JY29ucywgX01hdGVyaWFsQ29tcG9uZW50Myk7XG5cbiAgZnVuY3Rpb24gQ2FyZEFjdGlvbkljb25zKCkge1xuICAgIHZhciBfdGhpczQ7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBDYXJkQWN0aW9uSWNvbnMpO1xuICAgIF90aGlzNCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZEFjdGlvbkljb25zKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczQuY29tcG9uZW50TmFtZSA9ICdjYXJkX19hY3Rpb24taWNvbnMnO1xuICAgIF90aGlzNC5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczQ7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShDYXJkQWN0aW9uSWNvbnMsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmRBY3Rpb25JY29ucztcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkQWN0aW9uSWNvbnMgPSBDYXJkQWN0aW9uSWNvbnM7XG5cbnZhciBDYXJkQWN0aW9uQnV0dG9ucyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0NhcmRBY3Rpb25JY29ucykge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShDYXJkQWN0aW9uQnV0dG9ucywgX0NhcmRBY3Rpb25JY29ucyk7XG5cbiAgZnVuY3Rpb24gQ2FyZEFjdGlvbkJ1dHRvbnMoKSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIENhcmRBY3Rpb25CdXR0b25zKTtcbiAgICBfdGhpczUgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmRBY3Rpb25CdXR0b25zKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczUuY29tcG9uZW50TmFtZSA9ICdjYXJkX19hY3Rpb24tYnV0dG9ucyc7XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gIHJldHVybiBDYXJkQWN0aW9uQnV0dG9ucztcbn0oQ2FyZEFjdGlvbkljb25zKTtcblxuZXhwb3J0cy5DYXJkQWN0aW9uQnV0dG9ucyA9IENhcmRBY3Rpb25CdXR0b25zO1xuXG52YXIgQ2FyZEFjdGlvbkljb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9JY29uKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKENhcmRBY3Rpb25JY29uLCBfSWNvbik7XG5cbiAgZnVuY3Rpb24gQ2FyZEFjdGlvbkljb24oKSB7XG4gICAgdmFyIF90aGlzNjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIENhcmRBY3Rpb25JY29uKTtcbiAgICBfdGhpczYgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENhcmRBY3Rpb25JY29uKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczYuY29tcG9uZW50TmFtZSA9ICdjYXJkX19hY3Rpb24nO1xuICAgIF90aGlzNi5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczY7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShDYXJkQWN0aW9uSWNvbiwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIGlmIChwcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgICAgcHJvcHMuY2xhc3NOYW1lICs9ICcgbWRjLWNhcmRfX2FjdGlvbi0taWNvbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wcy5jbGFzc05hbWUgPSAnbWRjLWNhcmRfX2FjdGlvbi0taWNvbic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoQ2FyZEFjdGlvbkljb24ucHJvdG90eXBlKSwgXCJtYXRlcmlhbERvbVwiLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmRBY3Rpb25JY29uO1xufShfSWNvbjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQ2FyZEFjdGlvbkljb24gPSBDYXJkQWN0aW9uSWNvbjtcblxudmFyIENhcmRNZWRpYUNvbnRlbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZE1lZGlhQ29udGVudCwgX01hdGVyaWFsQ29tcG9uZW50NCk7XG5cbiAgZnVuY3Rpb24gQ2FyZE1lZGlhQ29udGVudCgpIHtcbiAgICB2YXIgX3RoaXM3O1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgQ2FyZE1lZGlhQ29udGVudCk7XG4gICAgX3RoaXM3ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkTWVkaWFDb250ZW50KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczcuY29tcG9uZW50TmFtZSA9ICdjYXJkX19tZWRpYS1jb250ZW50JztcbiAgICBfdGhpczcubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM3O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoQ2FyZE1lZGlhQ29udGVudCwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImRpdlwiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ2FyZE1lZGlhQ29udGVudDtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5DYXJkTWVkaWFDb250ZW50ID0gQ2FyZE1lZGlhQ29udGVudDtcblxudmFyIENhcmQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDUpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoQ2FyZCwgX01hdGVyaWFsQ29tcG9uZW50NSk7XG5cbiAgZnVuY3Rpb24gQ2FyZCgpIHtcbiAgICB2YXIgX3RoaXM4O1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgQ2FyZCk7XG4gICAgX3RoaXM4ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShDYXJkKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczguY29tcG9uZW50TmFtZSA9ICdjYXJkJztcbiAgICBfdGhpczgubWRjUHJvcHMgPSBbJ291dGxpbmVkJ107XG4gICAgcmV0dXJuIF90aGlzODtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKENhcmQsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENhcmQ7XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuQ2FyZCA9IENhcmQ7XG5cbnZhciBkZWZhdWx0XzEgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9DYXJkKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKGRlZmF1bHRfMSwgX0NhcmQpO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRfMSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBkZWZhdWx0XzEpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKGRlZmF1bHRfMSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdF8xO1xufShDYXJkKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuZGVmYXVsdF8xLkFjdGlvbnMgPSBDYXJkQWN0aW9ucztcbmRlZmF1bHRfMS5BY3Rpb25CdXR0b25zID0gQ2FyZEFjdGlvbkJ1dHRvbnM7XG5kZWZhdWx0XzEuQWN0aW9uQnV0dG9uID0gQ2FyZEFjdGlvbkJ1dHRvbjtcbmRlZmF1bHRfMS5BY3Rpb25JY29ucyA9IENhcmRBY3Rpb25JY29ucztcbmRlZmF1bHRfMS5BY3Rpb25JY29uID0gQ2FyZEFjdGlvbkljb247XG5kZWZhdWx0XzEuTWVkaWEgPSBDYXJkTWVkaWE7XG5kZWZhdWx0XzEuQ2FyZE1lZGlhQ29udGVudCA9IENhcmRNZWRpYUNvbnRlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicHJlYWN0L2hvb2tzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCJwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9DYXJkXCI7XHJcbmltcG9ydCBcInByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0NhcmQvc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5jb25zdCBMYXp5TG9hZGFibGVDYXJkID0gKHtcclxuICBzY3JvbGxEaXJlY3Rpb24sXHJcbiAgc2Nyb2xsSGVpZ2h0LFxyXG4gIHNjcm9sbFRvcCxcclxuICBzY3JvbGxlZFBlcmNlbnRhZ2UsXHJcbiAgb3JkZXIsXHJcbiAgc2V0Vmlld0NhbmRpZGF0ZSxcclxuICBzY3JvbGxpbmcsXHJcbiAgbG9hZFxyXG59KSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBbb2Zmc2V0SGVpZ2h0LCBzZXRPZmZzZXRIZWlnaHRdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW29mZnNldFBlcmNlbnQsIHNldE9mZnNldFBlcmNlbnRdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2VudHJ5TGV2ZWwsIHNldEVudHJ5TGV2ZWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2NlbnRlcmVkLCBzZXRDZW50ZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW0xMQ29tcG9uZW50LCBzZXRMTENvbXBvbmVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0T2Zmc2V0SGVpZ2h0KGNhcmQuY3VycmVudC5vZmZzZXRIZWlnaHQpO1xyXG4gIH0sIFtdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0T2Zmc2V0UGVyY2VudChcclxuICAgICAgTnVtYmVyLnBhcnNlSW50KCgob2Zmc2V0SGVpZ2h0ICogMTAwKSAvIHNjcm9sbEhlaWdodCkudG9GaXhlZCgwKSlcclxuICAgICk7XHJcbiAgfSwgW3Njcm9sbEhlaWdodCwgb2Zmc2V0SGVpZ2h0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAob3JkZXIgPT09IDEpIHtcclxuICAgICAgY29uc3QgZW50TGV2ZWwgPSAxMDAgLSBzY3JvbGxlZFBlcmNlbnRhZ2U7XHJcbiAgICAgIHNldEVudHJ5TGV2ZWwoZW50TGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmRlciA+IDEpIHtcclxuICAgICAgY29uc3QgZW50TGV2ZWwgPSAxMDAgLSBzY3JvbGxlZFBlcmNlbnRhZ2UgLSBvZmZzZXRQZXJjZW50ICogKG9yZGVyIC0gMSk7XHJcbiAgICAgIHNldEVudHJ5TGV2ZWwoZW50TGV2ZWwpO1xyXG4gICAgfVxyXG4gIH0sIFtzY3JvbGxlZFBlcmNlbnRhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChvcmRlciA9PT0gMCkge1xyXG4gICAgICBzZXRDZW50ZXJlZCh0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAob3JkZXIgPiAwKSB7XHJcbiAgICAgIGlmIChlbnRyeUxldmVsID4gMCAmJiBlbnRyeUxldmVsID09PSBvZmZzZXRQZXJjZW50KSB7XHJcbiAgICAgICAgc2V0Q2VudGVyZWQodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0Q2VudGVyZWQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW2VudHJ5TGV2ZWwsIG9mZnNldFBlcmNlbnRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWREeW5hbWljRGF0YSgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoY2VudGVyZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZG1vZHVsZSA9IGF3YWl0IGxvYWQoKTtcclxuICAgICAgICAgIHNldExMQ29tcG9uZW50KGxvYWRlZG1vZHVsZS5kZWZhdWx0KTtcclxuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHNldEVycm9yKGUpO1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2FkRHluYW1pY0RhdGEoKTtcclxuICB9LCBbY2VudGVyZWQsIGxvYWRdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgcmVmPXtjYXJkfSBpZD17b3JkZXJ9PlxyXG4gICAgICA8Q2FyZCBjbGFzc05hbWU9XCJsYXp5LWxvYWRhYmxlLWNhcmRcIj5cclxuICAgICAgICB7bG9hZGluZyAmJiBMTENvbXBvbmVudCAhPT0gbnVsbCA/IDxkaXY+TG9hZGluZzwvZGl2PiA6IExMQ29tcG9uZW50fVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBMYXp5TG9hZGFibGVDYXJkO1xyXG5cclxuXHJcbiIsImltcG9ydCB7IGggfSBmcm9tIFwicHJlYWN0XCI7XHJcblxyXG5jb25zdCBTY3JvbGxlckFycm93cyA9ICh7XHJcbiAgc2Nyb2xsSGFuZGxlcixcclxuICBkaXNhYmxlZERvd25TY3JvbGwsXHJcbiAgZGlzYWJsZWRVcFNjcm9sbFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgcmlnaHQ6IFwiNSVcIiwgdG9wOiBcIjUwJVwiLHpJbmRleDoxMDAwIH19PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkVXBTY3JvbGx9XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlcihcInRvcFwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgVVBXQVJEXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkRG93blNjcm9sbH1cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICBET1dOV0FSRFxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxlckFycm93cztcclxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlciAqL1xyXG5pbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicHJlYWN0L2hvb2tzXCI7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbmFtZWQtYXMtZGVmYXVsdFxyXG5pbXBvcnQgTGF6eUxvYWRhYmxlQ2FyZCBmcm9tIFwiLi4vbGF6eS1sb2FkYWJsZS1jYXJkXCI7XHJcbmltcG9ydCBTY3JvbGxlckFycm93cyBmcm9tIFwiLi9TY3JvbGxlckFycm93c1wiO1xyXG5cclxuZnVuY3Rpb24gTGF6eVNjcm9sbGVyKHsgZHluYW1pY0l0ZW1zIH0pIHtcclxuICBjb25zdCBbc2Nyb2xsVG9wLCBzZXRTY3JvbGxUb3BdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Njcm9sbEhlaWdodCwgc2V0U2Nyb2xsSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzY3JvbGxlZFBlcmNlbnRhZ2UsIHNldFNjcm9sbGVkUGVyY2VudGFnZV0gPSB1c2VTdGF0ZSgxMDApO1xyXG4gIGNvbnN0IFtzY3JvbGxpbmcsIHNldFNjcm9sbGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Njcm9sbERpcmVjdGlvbiwgc2V0U2Nyb2xsRGlyZWN0aW9uXSA9IHVzZVN0YXRlKHVuZGVmaW5lZCk7XHJcbiAgY29uc3QgW3Njcm9sbGVkTm9kZSwgc2V0U2Nyb2xsZWROb2RlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtkaXNhYmxlZFVwU2Nyb2xsLCBzZXREaXNhYmxlZFVwU2Nyb2xsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZGlzYWJsZWREb3duU2Nyb2xsLCBzZXREaXNhYmxlZERvd25TY3JvbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHNjcm9sbGVyID0gdXNlUmVmKG51bGwpO1xyXG4gIGZ1bmN0aW9uIHNldFZpZXdDYW5kaWRhdGUoaWQpIHtcclxuICAgIHNldFNjcm9sbGluZyh0cnVlKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgc2V0U2Nyb2xsaW5nKGZhbHNlKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2Nyb2xsSGFuZGxlcihkaXJlY3Rpb24pIHtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidG9wXCIgJiYgc2Nyb2xsZWROb2RlID4gMCkge1xyXG4gICAgICBzZXRTY3JvbGxlZE5vZGUoc2Nyb2xsZWROb2RlIC0gMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTY3JvbGxlZE5vZGUoc2Nyb2xsZWROb2RlICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbChlKSB7XHJcbiAgICBzZXRTY3JvbGxUb3Aoc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxUb3ApO1xyXG5cclxuICAgIHNldFNjcm9sbFRvcChwcmV2U3RhdGUgPT4ge1xyXG4gICAgICBpZiAocHJldlN0YXRlIDwgc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxUb3ApIHtcclxuICAgICAgICBzZXRTY3JvbGxEaXJlY3Rpb24oXCJib3R0b21cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2Nyb2xsRGlyZWN0aW9uKFwidG9wXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxUb3A7XHJcbiAgICB9KTtcclxuICAgIHNldFNjcm9sbEhlaWdodChzY3JvbGxlci5jdXJyZW50LnNjcm9sbEhlaWdodCk7XHJcbiAgICBzZXRTY3JvbGxlZFBlcmNlbnRhZ2UoXHJcbiAgICAgIChcclxuICAgICAgICAoKHNjcm9sbGVyLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxUb3ApICogMTAwKSAvXHJcbiAgICAgICAgc2Nyb2xsZXIuY3VycmVudC5zY3JvbGxIZWlnaHRcclxuICAgICAgKS50b0ZpeGVkKDApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNjcm9sbGVyLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7fTtcclxuICB9LCBbXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFZpZXdDYW5kaWRhdGUoc2Nyb2xsZWROb2RlKTtcclxuICAgIGlmIChkeW5hbWljSXRlbXMubGVuZ3RoIC0gMSA9PT0gc2Nyb2xsZWROb2RlKSB7XHJcbiAgICAgIHNldERpc2FibGVkRG93blNjcm9sbCh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldERpc2FibGVkRG93blNjcm9sbChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNjcm9sbGVkTm9kZSA9PT0gMCkge1xyXG4gICAgICBzZXREaXNhYmxlZFVwU2Nyb2xsKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0RGlzYWJsZWRVcFNjcm9sbChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW3Njcm9sbGVkTm9kZV0pO1xyXG4gIHJldHVybiBbXHJcbiAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogNjcgfX0gLz4sXHJcbiAgICA8U2Nyb2xsZXJBcnJvd3NcclxuICAgICAgZGlzYWJsZWRVcFNjcm9sbD17ZGlzYWJsZWRVcFNjcm9sbH1cclxuICAgICAgZGlzYWJsZWREb3duU2Nyb2xsPXtkaXNhYmxlZERvd25TY3JvbGx9XHJcbiAgICAgIHNjcm9sbEhhbmRsZXI9e3Njcm9sbEhhbmRsZXJ9XHJcbiAgICAvPixcclxuICAgIDxkaXZcclxuICAgICAgcmVmPXtzY3JvbGxlcn1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBoZWlnaHQ6IFwiOTB2aFwiLFxyXG4gICAgICAgIG92ZXJmbG93OiBcInNjcm9sbFwiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCJcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge2R5bmFtaWNJdGVtcy5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPExhenlMb2FkYWJsZUNhcmRcclxuICAgICAgICAgICAgbG9hZD17ZC5sb2FkfVxyXG4gICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb249e3Njcm9sbERpcmVjdGlvbn1cclxuICAgICAgICAgICAgc2Nyb2xsaW5nPXtzY3JvbGxpbmd9XHJcbiAgICAgICAgICAgIHNldFZpZXdDYW5kaWRhdGU9e3NldFZpZXdDYW5kaWRhdGV9XHJcbiAgICAgICAgICAgIG9yZGVyPXtpfVxyXG4gICAgICAgICAgICBzY3JvbGxlZFBlcmNlbnRhZ2U9e3Njcm9sbGVkUGVyY2VudGFnZX1cclxuICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XHJcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodD17c2Nyb2xsSGVpZ2h0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgIDwvZGl2PlxyXG4gIF07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhenlTY3JvbGxlcjtcclxuIiwiaW1wb3J0IHsgaCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IExhenlTY3JvbGxlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9sYXp5LXNjcm9sbGVyXCI7XHJcblxyXG5jb25zdCBNb2R1bGVDb21wb25lbnQgPSAoKSA9PiB7XHJcbiAgICBcclxuICByZXR1cm4gPExhenlTY3JvbGxlciAgICAgZHluYW1pY0l0ZW1zPXtbXHJcbiAgICB7IGxvYWQ6ICgpID0+IGltcG9ydChcIi4vc29ja2V0LWlvLW1lc3NhZ2luZy9pbmRleFwiKSB9LFxyXG4gICAgeyBsb2FkOiAoKSA9PiBpbXBvcnQoXCIuL3dlYnJ0Yy1tZXNzYWdpbmcvaW5kZXhcIikgfSxcclxuICAgIHsgbG9hZDogKCkgPT4gaW1wb3J0KFwiLi93ZWJydGMtdmlkZW8tY2hhdC9pbmRleFwiKSB9XHJcbiAgXX0gLz5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZHVsZUNvbXBvbmVudDtcclxuXHJcblxyXG4iXSwibmFtZXMiOlsicnVudGltZSIsImV4cG9ydHMiLCJPcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093biIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiJFN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yU3ltYm9sIiwiaXRlcmF0b3IiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJpIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIm1vZHVsZSIsInJlZ2VuZXJhdG9yUnVudGltZSIsImFjY2lkZW50YWxTdHJpY3RNb2RlIiwiRnVuY3Rpb24iLCJyZXF1aXJlJCQwIiwiZGVmYXVsdF8xIiwiY29tcG9uZW50TmFtZSIsIkxhenlMb2FkYWJsZUNhcmQiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJzY3JvbGxlZFBlcmNlbnRhZ2UiLCJvcmRlciIsInNldFZpZXdDYW5kaWRhdGUiLCJzY3JvbGxpbmciLCJsb2FkIiwiY2FyZCIsInVzZVJlZiIsInVzZVN0YXRlIiwib2Zmc2V0SGVpZ2h0Iiwic2V0T2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0UGVyY2VudCIsInNldE9mZnNldFBlcmNlbnQiLCJlbnRyeUxldmVsIiwic2V0RW50cnlMZXZlbCIsImNlbnRlcmVkIiwic2V0Q2VudGVyZWQiLCJMTENvbXBvbmVudCIsInNldExMQ29tcG9uZW50Iiwic2V0RXJyb3IiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvRml4ZWQiLCJlbnRMZXZlbCIsImxvYWREeW5hbWljRGF0YSIsImxvYWRlZG1vZHVsZSIsIlNjcm9sbGVyQXJyb3dzIiwic2Nyb2xsSGFuZGxlciIsImRpc2FibGVkRG93blNjcm9sbCIsImRpc2FibGVkVXBTY3JvbGwiLCJwb3NpdGlvbiIsInJpZ2h0IiwidG9wIiwiekluZGV4IiwiTGF6eVNjcm9sbGVyIiwiZHluYW1pY0l0ZW1zIiwic2V0U2Nyb2xsVG9wIiwic2V0U2Nyb2xsSGVpZ2h0Iiwic2V0U2Nyb2xsZWRQZXJjZW50YWdlIiwic2V0U2Nyb2xsaW5nIiwic2V0U2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsZWROb2RlIiwic2V0U2Nyb2xsZWROb2RlIiwic2V0RGlzYWJsZWRVcFNjcm9sbCIsInNldERpc2FibGVkRG93blNjcm9sbCIsInNjcm9sbGVyIiwiaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImRpcmVjdGlvbiIsImhhbmRsZVNjcm9sbCIsImUiLCJwcmV2U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsIm1hcCIsImQiLCJNb2R1bGVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztNQU9JQSxPQUFPLEdBQUksVUFBVUMsT0FBVixFQUFtQjtBQUNoQztRQUVJQyxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBaEI7UUFDSUMsTUFBTSxHQUFHSCxFQUFFLENBQUNJLGNBQWhCO1FBQ0lDLFNBQUosQ0FMZ0M7O1FBTTVCQyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixHQUErQkEsTUFBL0IsR0FBd0MsRUFBdEQ7UUFDSUMsY0FBYyxHQUFHRixPQUFPLENBQUNHLFFBQVIsSUFBb0IsWUFBekM7UUFDSUMsbUJBQW1CLEdBQUdKLE9BQU8sQ0FBQ0ssYUFBUixJQUF5QixpQkFBbkQ7UUFDSUMsaUJBQWlCLEdBQUdOLE9BQU8sQ0FBQ08sV0FBUixJQUF1QixlQUEvQzs7YUFFU0MsSUFBVCxDQUFjQyxPQUFkLEVBQXVCQyxPQUF2QixFQUFnQ0MsSUFBaEMsRUFBc0NDLFdBQXRDLEVBQW1EOztVQUU3Q0MsY0FBYyxHQUFHSCxPQUFPLElBQUlBLE9BQU8sQ0FBQ2QsU0FBUixZQUE2QmtCLFNBQXhDLEdBQW9ESixPQUFwRCxHQUE4REksU0FBbkY7VUFDSUMsU0FBUyxHQUFHcEIsTUFBTSxDQUFDcUIsTUFBUCxDQUFjSCxjQUFjLENBQUNqQixTQUE3QixDQUFoQjtVQUNJcUIsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWU4sV0FBVyxJQUFJLEVBQTNCLENBQWQsQ0FKaUQ7OztNQVFqREcsU0FBUyxDQUFDSSxPQUFWLEdBQW9CQyxnQkFBZ0IsQ0FBQ1gsT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFwQzthQUVPRixTQUFQOzs7SUFFRnRCLE9BQU8sQ0FBQ2UsSUFBUixHQUFlQSxJQUFmLENBdkJnQzs7Ozs7Ozs7Ozs7YUFtQ3ZCYSxRQUFULENBQWtCQyxFQUFsQixFQUFzQkMsR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDO1VBQzFCO2VBQ0s7VUFBRUMsSUFBSSxFQUFFLFFBQVI7VUFBa0JELEdBQUcsRUFBRUYsRUFBRSxDQUFDSSxJQUFILENBQVFILEdBQVIsRUFBYUMsR0FBYjtTQUE5QjtPQURGLENBRUUsT0FBT0csR0FBUCxFQUFZO2VBQ0w7VUFBRUYsSUFBSSxFQUFFLE9BQVI7VUFBaUJELEdBQUcsRUFBRUc7U0FBN0I7Ozs7UUFJQUMsc0JBQXNCLEdBQUcsZ0JBQTdCO1FBQ0lDLHNCQUFzQixHQUFHLGdCQUE3QjtRQUNJQyxpQkFBaUIsR0FBRyxXQUF4QjtRQUNJQyxpQkFBaUIsR0FBRyxXQUF4QixDQTlDZ0M7OztRQWtENUJDLGdCQUFnQixHQUFHLEVBQXZCLENBbERnQzs7Ozs7YUF3RHZCbEIsU0FBVCxHQUFxQjs7YUFDWm1CLGlCQUFULEdBQTZCOzthQUNwQkMsMEJBQVQsR0FBc0MsRUExRE47Ozs7UUE4RDVCQyxpQkFBaUIsR0FBRyxFQUF4Qjs7SUFDQUEsaUJBQWlCLENBQUNqQyxjQUFELENBQWpCLEdBQW9DLFlBQVk7YUFDdkMsSUFBUDtLQURGOztRQUlJa0MsUUFBUSxHQUFHekMsTUFBTSxDQUFDMEMsY0FBdEI7UUFDSUMsdUJBQXVCLEdBQUdGLFFBQVEsSUFBSUEsUUFBUSxDQUFDQSxRQUFRLENBQUNHLE1BQU0sQ0FBQyxFQUFELENBQVAsQ0FBVCxDQUFsRDs7UUFDSUQsdUJBQXVCLElBQ3ZCQSx1QkFBdUIsS0FBSzVDLEVBRDVCLElBRUFHLE1BQU0sQ0FBQzZCLElBQVAsQ0FBWVksdUJBQVosRUFBcUNwQyxjQUFyQyxDQUZKLEVBRTBEOzs7TUFHeERpQyxpQkFBaUIsR0FBR0csdUJBQXBCOzs7UUFHRUUsRUFBRSxHQUFHTiwwQkFBMEIsQ0FBQ3RDLFNBQTNCLEdBQ1BrQixTQUFTLENBQUNsQixTQUFWLEdBQXNCRCxNQUFNLENBQUNxQixNQUFQLENBQWNtQixpQkFBZCxDQUR4QjtJQUVBRixpQkFBaUIsQ0FBQ3JDLFNBQWxCLEdBQThCNEMsRUFBRSxDQUFDQyxXQUFILEdBQWlCUCwwQkFBL0M7SUFDQUEsMEJBQTBCLENBQUNPLFdBQTNCLEdBQXlDUixpQkFBekM7SUFDQUMsMEJBQTBCLENBQUM1QixpQkFBRCxDQUExQixHQUNFMkIsaUJBQWlCLENBQUNTLFdBQWxCLEdBQWdDLG1CQURsQyxDQWpGZ0M7OzthQXNGdkJDLHFCQUFULENBQStCL0MsU0FBL0IsRUFBMEM7T0FDdkMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsUUFBbEIsRUFBNEJnRCxPQUE1QixDQUFvQyxVQUFTQyxNQUFULEVBQWlCO1FBQ25EakQsU0FBUyxDQUFDaUQsTUFBRCxDQUFULEdBQW9CLFVBQVNyQixHQUFULEVBQWM7aUJBQ3pCLEtBQUtMLE9BQUwsQ0FBYTBCLE1BQWIsRUFBcUJyQixHQUFyQixDQUFQO1NBREY7T0FERjs7O0lBT0YvQixPQUFPLENBQUNxRCxtQkFBUixHQUE4QixVQUFTQyxNQUFULEVBQWlCO1VBQ3pDQyxJQUFJLEdBQUcsT0FBT0QsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDTixXQUFsRDthQUNPTyxJQUFJLEdBQ1BBLElBQUksS0FBS2YsaUJBQVQ7O09BR0NlLElBQUksQ0FBQ04sV0FBTCxJQUFvQk0sSUFBSSxDQUFDQyxJQUExQixNQUFvQyxtQkFKN0IsR0FLUCxLQUxKO0tBRkY7O0lBVUF4RCxPQUFPLENBQUN5RCxJQUFSLEdBQWUsVUFBU0gsTUFBVCxFQUFpQjtVQUMxQnBELE1BQU0sQ0FBQ3dELGNBQVgsRUFBMkI7UUFDekJ4RCxNQUFNLENBQUN3RCxjQUFQLENBQXNCSixNQUF0QixFQUE4QmIsMEJBQTlCO09BREYsTUFFTztRQUNMYSxNQUFNLENBQUNLLFNBQVAsR0FBbUJsQiwwQkFBbkI7O1lBQ0ksRUFBRTVCLGlCQUFpQixJQUFJeUMsTUFBdkIsQ0FBSixFQUFvQztVQUNsQ0EsTUFBTSxDQUFDekMsaUJBQUQsQ0FBTixHQUE0QixtQkFBNUI7Ozs7TUFHSnlDLE1BQU0sQ0FBQ25ELFNBQVAsR0FBbUJELE1BQU0sQ0FBQ3FCLE1BQVAsQ0FBY3dCLEVBQWQsQ0FBbkI7YUFDT08sTUFBUDtLQVZGLENBeEdnQzs7Ozs7O0lBeUhoQ3RELE9BQU8sQ0FBQzRELEtBQVIsR0FBZ0IsVUFBUzdCLEdBQVQsRUFBYzthQUNyQjtRQUFFOEIsT0FBTyxFQUFFOUI7T0FBbEI7S0FERjs7YUFJUytCLGFBQVQsQ0FBdUJ4QyxTQUF2QixFQUFrQztlQUN2QnlDLE1BQVQsQ0FBZ0JYLE1BQWhCLEVBQXdCckIsR0FBeEIsRUFBNkJpQyxPQUE3QixFQUFzQ0MsTUFBdEMsRUFBOEM7WUFDeENDLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ04sU0FBUyxDQUFDOEIsTUFBRCxDQUFWLEVBQW9COUIsU0FBcEIsRUFBK0JTLEdBQS9CLENBQXJCOztZQUNJbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtVQUMzQmlDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDbkMsR0FBUixDQUFOO1NBREYsTUFFTztjQUNEb0MsTUFBTSxHQUFHRCxNQUFNLENBQUNuQyxHQUFwQjtjQUNJcUMsS0FBSyxHQUFHRCxNQUFNLENBQUNDLEtBQW5COztjQUNJQSxLQUFLLElBQ0wsT0FBT0EsS0FBUCxLQUFpQixRQURqQixJQUVBaEUsTUFBTSxDQUFDNkIsSUFBUCxDQUFZbUMsS0FBWixFQUFtQixTQUFuQixDQUZKLEVBRW1DO21CQUMxQkMsT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFLLENBQUNQLE9BQXRCLEVBQStCUyxJQUEvQixDQUFvQyxVQUFTRixLQUFULEVBQWdCO2NBQ3pETCxNQUFNLENBQUMsTUFBRCxFQUFTSyxLQUFULEVBQWdCSixPQUFoQixFQUF5QkMsTUFBekIsQ0FBTjthQURLLEVBRUosVUFBUy9CLEdBQVQsRUFBYztjQUNmNkIsTUFBTSxDQUFDLE9BQUQsRUFBVTdCLEdBQVYsRUFBZThCLE9BQWYsRUFBd0JDLE1BQXhCLENBQU47YUFISyxDQUFQOzs7aUJBT0tJLE9BQU8sQ0FBQ0wsT0FBUixDQUFnQkksS0FBaEIsRUFBdUJFLElBQXZCLENBQTRCLFVBQVNDLFNBQVQsRUFBb0I7Ozs7WUFJckRKLE1BQU0sQ0FBQ0MsS0FBUCxHQUFlRyxTQUFmO1lBQ0FQLE9BQU8sQ0FBQ0csTUFBRCxDQUFQO1dBTEssRUFNSixVQUFTSyxLQUFULEVBQWdCOzs7bUJBR1ZULE1BQU0sQ0FBQyxPQUFELEVBQVVTLEtBQVYsRUFBaUJSLE9BQWpCLEVBQTBCQyxNQUExQixDQUFiO1dBVEssQ0FBUDs7OztVQWNBUSxlQUFKOztlQUVTQyxPQUFULENBQWlCdEIsTUFBakIsRUFBeUJyQixHQUF6QixFQUE4QjtpQkFDbkI0QywwQkFBVCxHQUFzQztpQkFDN0IsSUFBSU4sT0FBSixDQUFZLFVBQVNMLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO1lBQzNDRixNQUFNLENBQUNYLE1BQUQsRUFBU3JCLEdBQVQsRUFBY2lDLE9BQWQsRUFBdUJDLE1BQXZCLENBQU47V0FESyxDQUFQOzs7ZUFLS1EsZUFBZTs7Ozs7Ozs7Ozs7O1FBYXBCQSxlQUFlLEdBQUdBLGVBQWUsQ0FBQ0gsSUFBaEIsQ0FDaEJLLDBCQURnQjs7UUFJaEJBLDBCQUpnQixDQUFILEdBS1hBLDBCQUEwQixFQWxCaEM7T0F6QzhCOzs7O1dBZ0UzQmpELE9BQUwsR0FBZWdELE9BQWY7OztJQUdGeEIscUJBQXFCLENBQUNZLGFBQWEsQ0FBQzNELFNBQWYsQ0FBckI7O0lBQ0EyRCxhQUFhLENBQUMzRCxTQUFkLENBQXdCUSxtQkFBeEIsSUFBK0MsWUFBWTthQUNsRCxJQUFQO0tBREY7O0lBR0FYLE9BQU8sQ0FBQzhELGFBQVIsR0FBd0JBLGFBQXhCLENBcE1nQzs7OztJQXlNaEM5RCxPQUFPLENBQUM0RSxLQUFSLEdBQWdCLFVBQVM1RCxPQUFULEVBQWtCQyxPQUFsQixFQUEyQkMsSUFBM0IsRUFBaUNDLFdBQWpDLEVBQThDO1VBQ3hEMEQsSUFBSSxHQUFHLElBQUlmLGFBQUosQ0FDVC9DLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxJQUFuQixFQUF5QkMsV0FBekIsQ0FESyxDQUFYO2FBSU9uQixPQUFPLENBQUNxRCxtQkFBUixDQUE0QnBDLE9BQTVCLElBQ0g0RCxJQURHO1FBRUhBLElBQUksQ0FBQ0MsSUFBTCxHQUFZUixJQUFaLENBQWlCLFVBQVNILE1BQVQsRUFBaUI7ZUFDekJBLE1BQU0sQ0FBQ1ksSUFBUCxHQUFjWixNQUFNLENBQUNDLEtBQXJCLEdBQTZCUyxJQUFJLENBQUNDLElBQUwsRUFBcEM7T0FERixDQUZKO0tBTEY7O2FBWVNuRCxnQkFBVCxDQUEwQlgsT0FBMUIsRUFBbUNFLElBQW5DLEVBQXlDTSxPQUF6QyxFQUFrRDtVQUM1Q3dELEtBQUssR0FBRzdDLHNCQUFaO2FBRU8sU0FBUzRCLE1BQVQsQ0FBZ0JYLE1BQWhCLEVBQXdCckIsR0FBeEIsRUFBNkI7WUFDOUJpRCxLQUFLLEtBQUszQyxpQkFBZCxFQUFpQztnQkFDekIsSUFBSTRDLEtBQUosQ0FBVSw4QkFBVixDQUFOOzs7WUFHRUQsS0FBSyxLQUFLMUMsaUJBQWQsRUFBaUM7Y0FDM0JjLE1BQU0sS0FBSyxPQUFmLEVBQXdCO2tCQUNoQnJCLEdBQU47V0FGNkI7Ozs7aUJBT3hCbUQsVUFBVSxFQUFqQjs7O1FBR0YxRCxPQUFPLENBQUM0QixNQUFSLEdBQWlCQSxNQUFqQjtRQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWNBLEdBQWQ7O2VBRU8sSUFBUCxFQUFhO2NBQ1BvRCxRQUFRLEdBQUczRCxPQUFPLENBQUMyRCxRQUF2Qjs7Y0FDSUEsUUFBSixFQUFjO2dCQUNSQyxjQUFjLEdBQUdDLG1CQUFtQixDQUFDRixRQUFELEVBQVczRCxPQUFYLENBQXhDOztnQkFDSTRELGNBQUosRUFBb0I7a0JBQ2RBLGNBQWMsS0FBSzdDLGdCQUF2QixFQUF5QztxQkFDbEM2QyxjQUFQOzs7O2NBSUE1RCxPQUFPLENBQUM0QixNQUFSLEtBQW1CLE1BQXZCLEVBQStCOzs7WUFHN0I1QixPQUFPLENBQUM4RCxJQUFSLEdBQWU5RCxPQUFPLENBQUMrRCxLQUFSLEdBQWdCL0QsT0FBTyxDQUFDTyxHQUF2QztXQUhGLE1BS08sSUFBSVAsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixPQUF2QixFQUFnQztnQkFDakM0QixLQUFLLEtBQUs3QyxzQkFBZCxFQUFzQztjQUNwQzZDLEtBQUssR0FBRzFDLGlCQUFSO29CQUNNZCxPQUFPLENBQUNPLEdBQWQ7OztZQUdGUCxPQUFPLENBQUNnRSxpQkFBUixDQUEwQmhFLE9BQU8sQ0FBQ08sR0FBbEM7V0FOSyxNQVFBLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsUUFBdkIsRUFBaUM7WUFDdEM1QixPQUFPLENBQUNpRSxNQUFSLENBQWUsUUFBZixFQUF5QmpFLE9BQU8sQ0FBQ08sR0FBakM7OztVQUdGaUQsS0FBSyxHQUFHM0MsaUJBQVI7Y0FFSTZCLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ1osT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFyQjs7Y0FDSTBDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7OztZQUc1QmdELEtBQUssR0FBR3hELE9BQU8sQ0FBQ3VELElBQVIsR0FDSnpDLGlCQURJLEdBRUpGLHNCQUZKOztnQkFJSThCLE1BQU0sQ0FBQ25DLEdBQVAsS0FBZVEsZ0JBQW5CLEVBQXFDOzs7O21CQUk5QjtjQUNMNkIsS0FBSyxFQUFFRixNQUFNLENBQUNuQyxHQURUO2NBRUxnRCxJQUFJLEVBQUV2RCxPQUFPLENBQUN1RDthQUZoQjtXQVhGLE1BZ0JPLElBQUliLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7WUFDbENnRCxLQUFLLEdBQUcxQyxpQkFBUixDQURrQzs7O1lBSWxDZCxPQUFPLENBQUM0QixNQUFSLEdBQWlCLE9BQWpCO1lBQ0E1QixPQUFPLENBQUNPLEdBQVIsR0FBY21DLE1BQU0sQ0FBQ25DLEdBQXJCOzs7T0FyRU47S0F4TjhCOzs7Ozs7YUF1U3ZCc0QsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDM0QsT0FBdkMsRUFBZ0Q7VUFDMUM0QixNQUFNLEdBQUcrQixRQUFRLENBQUN6RSxRQUFULENBQWtCYyxPQUFPLENBQUM0QixNQUExQixDQUFiOztVQUNJQSxNQUFNLEtBQUs5QyxTQUFmLEVBQTBCOzs7UUFHeEJrQixPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5COztZQUVJM0QsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixPQUF2QixFQUFnQzs7Y0FFMUIrQixRQUFRLENBQUN6RSxRQUFULENBQWtCLFFBQWxCLENBQUosRUFBaUM7OztZQUcvQmMsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixRQUFqQjtZQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkO1lBQ0ErRSxtQkFBbUIsQ0FBQ0YsUUFBRCxFQUFXM0QsT0FBWCxDQUFuQjs7Z0JBRUlBLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7OztxQkFHdkJiLGdCQUFQOzs7O1VBSUpmLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7VUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUkyRCxTQUFKLENBQ1osZ0RBRFksQ0FBZDs7O2VBSUtuRCxnQkFBUDs7O1VBR0UyQixNQUFNLEdBQUd0QyxRQUFRLENBQUN3QixNQUFELEVBQVMrQixRQUFRLENBQUN6RSxRQUFsQixFQUE0QmMsT0FBTyxDQUFDTyxHQUFwQyxDQUFyQjs7VUFFSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7UUFDM0JSLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7UUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjbUMsTUFBTSxDQUFDbkMsR0FBckI7UUFDQVAsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjtlQUNPNUMsZ0JBQVA7OztVQUdFb0QsSUFBSSxHQUFHekIsTUFBTSxDQUFDbkMsR0FBbEI7O1VBRUksQ0FBRTRELElBQU4sRUFBWTtRQUNWbkUsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixPQUFqQjtRQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWMsSUFBSTJELFNBQUosQ0FBYyxrQ0FBZCxDQUFkO1FBQ0FsRSxPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5CO2VBQ081QyxnQkFBUDs7O1VBR0VvRCxJQUFJLENBQUNaLElBQVQsRUFBZTs7O1FBR2J2RCxPQUFPLENBQUMyRCxRQUFRLENBQUNTLFVBQVYsQ0FBUCxHQUErQkQsSUFBSSxDQUFDdkIsS0FBcEMsQ0FIYTs7UUFNYjVDLE9BQU8sQ0FBQ3NELElBQVIsR0FBZUssUUFBUSxDQUFDVSxPQUF4QixDQU5hOzs7Ozs7O1lBY1RyRSxPQUFPLENBQUM0QixNQUFSLEtBQW1CLFFBQXZCLEVBQWlDO1VBQy9CNUIsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtVQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkOztPQWhCSixNQW1CTzs7ZUFFRXFGLElBQVA7T0F0RTRDOzs7O01BMkU5Q25FLE9BQU8sQ0FBQzJELFFBQVIsR0FBbUIsSUFBbkI7YUFDTzVDLGdCQUFQO0tBblg4Qjs7OztJQXdYaENXLHFCQUFxQixDQUFDSCxFQUFELENBQXJCO0lBRUFBLEVBQUUsQ0FBQ2xDLGlCQUFELENBQUYsR0FBd0IsV0FBeEIsQ0ExWGdDOzs7Ozs7SUFpWWhDa0MsRUFBRSxDQUFDdEMsY0FBRCxDQUFGLEdBQXFCLFlBQVc7YUFDdkIsSUFBUDtLQURGOztJQUlBc0MsRUFBRSxDQUFDK0MsUUFBSCxHQUFjLFlBQVc7YUFDaEIsb0JBQVA7S0FERjs7YUFJU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7VUFDdEJDLEtBQUssR0FBRztRQUFFQyxNQUFNLEVBQUVGLElBQUksQ0FBQyxDQUFEO09BQTFCOztVQUVJLEtBQUtBLElBQVQsRUFBZTtRQUNiQyxLQUFLLENBQUNFLFFBQU4sR0FBaUJILElBQUksQ0FBQyxDQUFELENBQXJCOzs7VUFHRSxLQUFLQSxJQUFULEVBQWU7UUFDYkMsS0FBSyxDQUFDRyxVQUFOLEdBQW1CSixJQUFJLENBQUMsQ0FBRCxDQUF2QjtRQUNBQyxLQUFLLENBQUNJLFFBQU4sR0FBaUJMLElBQUksQ0FBQyxDQUFELENBQXJCOzs7V0FHR00sVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUJOLEtBQXJCOzs7YUFHT08sYUFBVCxDQUF1QlAsS0FBdkIsRUFBOEI7VUFDeEIvQixNQUFNLEdBQUcrQixLQUFLLENBQUNRLFVBQU4sSUFBb0IsRUFBakM7TUFDQXZDLE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxRQUFkO2FBQ09rQyxNQUFNLENBQUNuQyxHQUFkO01BQ0FrRSxLQUFLLENBQUNRLFVBQU4sR0FBbUJ2QyxNQUFuQjs7O2FBR096QyxPQUFULENBQWlCTixXQUFqQixFQUE4Qjs7OztXQUl2Qm1GLFVBQUwsR0FBa0IsQ0FBQztRQUFFSixNQUFNLEVBQUU7T0FBWCxDQUFsQjtNQUNBL0UsV0FBVyxDQUFDZ0MsT0FBWixDQUFvQjRDLFlBQXBCLEVBQWtDLElBQWxDO1dBQ0tXLEtBQUwsQ0FBVyxJQUFYOzs7SUFHRjFHLE9BQU8sQ0FBQzJHLElBQVIsR0FBZSxVQUFTQyxNQUFULEVBQWlCO1VBQzFCRCxJQUFJLEdBQUcsRUFBWDs7V0FDSyxJQUFJRSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtRQUN0QkQsSUFBSSxDQUFDSixJQUFMLENBQVVNLEdBQVY7OztNQUVGRixJQUFJLENBQUNHLE9BQUwsR0FMOEI7OzthQVN2QixTQUFTaEMsSUFBVCxHQUFnQjtlQUNkNkIsSUFBSSxDQUFDSSxNQUFaLEVBQW9CO2NBQ2RGLEdBQUcsR0FBR0YsSUFBSSxDQUFDSyxHQUFMLEVBQVY7O2NBQ0lILEdBQUcsSUFBSUQsTUFBWCxFQUFtQjtZQUNqQjlCLElBQUksQ0FBQ1YsS0FBTCxHQUFheUMsR0FBYjtZQUNBL0IsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjttQkFDT0QsSUFBUDs7U0FOaUI7Ozs7O1FBYXJCQSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO2VBQ09ELElBQVA7T0FkRjtLQVRGOzthQTJCU2hDLE1BQVQsQ0FBZ0JtRSxRQUFoQixFQUEwQjtVQUNwQkEsUUFBSixFQUFjO1lBQ1JDLGNBQWMsR0FBR0QsUUFBUSxDQUFDeEcsY0FBRCxDQUE3Qjs7WUFDSXlHLGNBQUosRUFBb0I7aUJBQ1hBLGNBQWMsQ0FBQ2pGLElBQWYsQ0FBb0JnRixRQUFwQixDQUFQOzs7WUFHRSxPQUFPQSxRQUFRLENBQUNuQyxJQUFoQixLQUF5QixVQUE3QixFQUF5QztpQkFDaENtQyxRQUFQOzs7WUFHRSxDQUFDRSxLQUFLLENBQUNGLFFBQVEsQ0FBQ0YsTUFBVixDQUFWLEVBQTZCO2NBQ3ZCSyxDQUFDLEdBQUcsQ0FBQyxDQUFUO2NBQVl0QyxJQUFJLEdBQUcsU0FBU0EsSUFBVCxHQUFnQjttQkFDMUIsRUFBRXNDLENBQUYsR0FBTUgsUUFBUSxDQUFDRixNQUF0QixFQUE4QjtrQkFDeEIzRyxNQUFNLENBQUM2QixJQUFQLENBQVlnRixRQUFaLEVBQXNCRyxDQUF0QixDQUFKLEVBQThCO2dCQUM1QnRDLElBQUksQ0FBQ1YsS0FBTCxHQUFhNkMsUUFBUSxDQUFDRyxDQUFELENBQXJCO2dCQUNBdEMsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjt1QkFDT0QsSUFBUDs7OztZQUlKQSxJQUFJLENBQUNWLEtBQUwsR0FBYTlELFNBQWI7WUFDQXdFLElBQUksQ0FBQ0MsSUFBTCxHQUFZLElBQVo7bUJBRU9ELElBQVA7V0FaRjs7aUJBZU9BLElBQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUFuQjs7T0EzQm9COzs7YUFnQ2pCO1FBQUVBLElBQUksRUFBRUk7T0FBZjs7O0lBRUZsRixPQUFPLENBQUM4QyxNQUFSLEdBQWlCQSxNQUFqQjs7YUFFU29DLFVBQVQsR0FBc0I7YUFDYjtRQUFFZCxLQUFLLEVBQUU5RCxTQUFUO1FBQW9CeUUsSUFBSSxFQUFFO09BQWpDOzs7SUFHRnRELE9BQU8sQ0FBQ3RCLFNBQVIsR0FBb0I7TUFDbEI2QyxXQUFXLEVBQUV2QixPQURLO01BR2xCaUYsS0FBSyxFQUFFLFVBQVNXLGFBQVQsRUFBd0I7YUFDeEJDLElBQUwsR0FBWSxDQUFaO2FBQ0t4QyxJQUFMLEdBQVksQ0FBWixDQUY2Qjs7O2FBS3hCUSxJQUFMLEdBQVksS0FBS0MsS0FBTCxHQUFhakYsU0FBekI7YUFDS3lFLElBQUwsR0FBWSxLQUFaO2FBQ0tJLFFBQUwsR0FBZ0IsSUFBaEI7YUFFSy9CLE1BQUwsR0FBYyxNQUFkO2FBQ0tyQixHQUFMLEdBQVd6QixTQUFYO2FBRUtnRyxVQUFMLENBQWdCbkQsT0FBaEIsQ0FBd0JxRCxhQUF4Qjs7WUFFSSxDQUFDYSxhQUFMLEVBQW9CO2VBQ2IsSUFBSTdELElBQVQsSUFBaUIsSUFBakIsRUFBdUI7O2dCQUVqQkEsSUFBSSxDQUFDK0QsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsSUFDQW5ILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWSxJQUFaLEVBQWtCdUIsSUFBbEIsQ0FEQSxJQUVBLENBQUMyRCxLQUFLLENBQUMsQ0FBQzNELElBQUksQ0FBQ2dFLEtBQUwsQ0FBVyxDQUFYLENBQUYsQ0FGVixFQUU0QjttQkFDckJoRSxJQUFMLElBQWFsRCxTQUFiOzs7O09BdkJVO01BNkJsQm1ILElBQUksRUFBRSxZQUFXO2FBQ1YxQyxJQUFMLEdBQVksSUFBWjtZQUVJMkMsU0FBUyxHQUFHLEtBQUtwQixVQUFMLENBQWdCLENBQWhCLENBQWhCO1lBQ0lxQixVQUFVLEdBQUdELFNBQVMsQ0FBQ2pCLFVBQTNCOztZQUNJa0IsVUFBVSxDQUFDM0YsSUFBWCxLQUFvQixPQUF4QixFQUFpQztnQkFDekIyRixVQUFVLENBQUM1RixHQUFqQjs7O2VBR0ssS0FBSzZGLElBQVo7T0F0Q2dCO01BeUNsQnBDLGlCQUFpQixFQUFFLFVBQVNxQyxTQUFULEVBQW9CO1lBQ2pDLEtBQUs5QyxJQUFULEVBQWU7Z0JBQ1A4QyxTQUFOOzs7WUFHRXJHLE9BQU8sR0FBRyxJQUFkOztpQkFDU3NHLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixFQUE2QjtVQUMzQjlELE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxPQUFkO1VBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWE4RixTQUFiO1VBQ0FyRyxPQUFPLENBQUNzRCxJQUFSLEdBQWVpRCxHQUFmOztjQUVJQyxNQUFKLEVBQVk7OztZQUdWeEcsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtZQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWN6QixTQUFkOzs7aUJBR0ssQ0FBQyxDQUFFMEgsTUFBVjs7O2FBR0csSUFBSVosQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7Y0FDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjtjQUNJbEQsTUFBTSxHQUFHK0IsS0FBSyxDQUFDUSxVQUFuQjs7Y0FFSVIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCLE1BQXJCLEVBQTZCOzs7O21CQUlwQjRCLE1BQU0sQ0FBQyxLQUFELENBQWI7OztjQUdFN0IsS0FBSyxDQUFDQyxNQUFOLElBQWdCLEtBQUtvQixJQUF6QixFQUErQjtnQkFDekJXLFFBQVEsR0FBRzdILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWWdFLEtBQVosRUFBbUIsVUFBbkIsQ0FBZjtnQkFDSWlDLFVBQVUsR0FBRzlILE1BQU0sQ0FBQzZCLElBQVAsQ0FBWWdFLEtBQVosRUFBbUIsWUFBbkIsQ0FBakI7O2dCQUVJZ0MsUUFBUSxJQUFJQyxVQUFoQixFQUE0QjtrQkFDdEIsS0FBS1osSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQzt1QkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjtlQURGLE1BRU8sSUFBSSxLQUFLbUIsSUFBTCxHQUFZckIsS0FBSyxDQUFDRyxVQUF0QixFQUFrQzt1QkFDaEMwQixNQUFNLENBQUM3QixLQUFLLENBQUNHLFVBQVAsQ0FBYjs7YUFKSixNQU9PLElBQUk2QixRQUFKLEVBQWM7a0JBQ2YsS0FBS1gsSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQzt1QkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjs7YUFGRyxNQUtBLElBQUkrQixVQUFKLEVBQWdCO2tCQUNqQixLQUFLWixJQUFMLEdBQVlyQixLQUFLLENBQUNHLFVBQXRCLEVBQWtDO3VCQUN6QjBCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0csVUFBUCxDQUFiOzthQUZHLE1BS0E7b0JBQ0MsSUFBSW5CLEtBQUosQ0FBVSx3Q0FBVixDQUFOOzs7O09BL0ZVO01BcUdsQlEsTUFBTSxFQUFFLFVBQVN6RCxJQUFULEVBQWVELEdBQWYsRUFBb0I7YUFDckIsSUFBSXFGLENBQUMsR0FBRyxLQUFLZCxVQUFMLENBQWdCUyxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0ssQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO2NBQ2hEbkIsS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0JjLENBQWhCLENBQVo7O2NBQ0luQixLQUFLLENBQUNDLE1BQU4sSUFBZ0IsS0FBS29CLElBQXJCLElBQ0FsSCxNQUFNLENBQUM2QixJQUFQLENBQVlnRSxLQUFaLEVBQW1CLFlBQW5CLENBREEsSUFFQSxLQUFLcUIsSUFBTCxHQUFZckIsS0FBSyxDQUFDRyxVQUZ0QixFQUVrQztnQkFDNUIrQixZQUFZLEdBQUdsQyxLQUFuQjs7Ozs7WUFLQWtDLFlBQVksS0FDWG5HLElBQUksS0FBSyxPQUFULElBQ0FBLElBQUksS0FBSyxVQUZFLENBQVosSUFHQW1HLFlBQVksQ0FBQ2pDLE1BQWIsSUFBdUJuRSxHQUh2QixJQUlBQSxHQUFHLElBQUlvRyxZQUFZLENBQUMvQixVQUp4QixFQUlvQzs7O1VBR2xDK0IsWUFBWSxHQUFHLElBQWY7OztZQUdFakUsTUFBTSxHQUFHaUUsWUFBWSxHQUFHQSxZQUFZLENBQUMxQixVQUFoQixHQUE2QixFQUF0RDtRQUNBdkMsTUFBTSxDQUFDbEMsSUFBUCxHQUFjQSxJQUFkO1FBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWFBLEdBQWI7O1lBRUlvRyxZQUFKLEVBQWtCO2VBQ1gvRSxNQUFMLEdBQWMsTUFBZDtlQUNLMEIsSUFBTCxHQUFZcUQsWUFBWSxDQUFDL0IsVUFBekI7aUJBQ083RCxnQkFBUDs7O2VBR0ssS0FBSzZGLFFBQUwsQ0FBY2xFLE1BQWQsQ0FBUDtPQXBJZ0I7TUF1SWxCa0UsUUFBUSxFQUFFLFVBQVNsRSxNQUFULEVBQWlCbUMsUUFBakIsRUFBMkI7WUFDL0JuQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO2dCQUNyQmtDLE1BQU0sQ0FBQ25DLEdBQWI7OztZQUdFbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFoQixJQUNBa0MsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixVQURwQixFQUNnQztlQUN6QjhDLElBQUwsR0FBWVosTUFBTSxDQUFDbkMsR0FBbkI7U0FGRixNQUdPLElBQUltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO2VBQzlCNEYsSUFBTCxHQUFZLEtBQUs3RixHQUFMLEdBQVdtQyxNQUFNLENBQUNuQyxHQUE5QjtlQUNLcUIsTUFBTCxHQUFjLFFBQWQ7ZUFDSzBCLElBQUwsR0FBWSxLQUFaO1NBSEssTUFJQSxJQUFJWixNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQWhCLElBQTRCcUUsUUFBaEMsRUFBMEM7ZUFDMUN2QixJQUFMLEdBQVl1QixRQUFaOzs7ZUFHSzlELGdCQUFQO09BdkpnQjtNQTBKbEI4RixNQUFNLEVBQUUsVUFBU2pDLFVBQVQsRUFBcUI7YUFDdEIsSUFBSWdCLENBQUMsR0FBRyxLQUFLZCxVQUFMLENBQWdCUyxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0ssQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO2NBQ2hEbkIsS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0JjLENBQWhCLENBQVo7O2NBQ0luQixLQUFLLENBQUNHLFVBQU4sS0FBcUJBLFVBQXpCLEVBQXFDO2lCQUM5QmdDLFFBQUwsQ0FBY25DLEtBQUssQ0FBQ1EsVUFBcEIsRUFBZ0NSLEtBQUssQ0FBQ0ksUUFBdEM7WUFDQUcsYUFBYSxDQUFDUCxLQUFELENBQWI7bUJBQ08xRCxnQkFBUDs7O09BaEtZO2VBcUtULFVBQVMyRCxNQUFULEVBQWlCO2FBQ25CLElBQUlrQixDQUFDLEdBQUcsS0FBS2QsVUFBTCxDQUFnQlMsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNLLENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDtjQUNoRG5CLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCYyxDQUFoQixDQUFaOztjQUNJbkIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCQSxNQUFyQixFQUE2QjtnQkFDdkJoQyxNQUFNLEdBQUcrQixLQUFLLENBQUNRLFVBQW5COztnQkFDSXZDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7a0JBQ3ZCc0csTUFBTSxHQUFHcEUsTUFBTSxDQUFDbkMsR0FBcEI7Y0FDQXlFLGFBQWEsQ0FBQ1AsS0FBRCxDQUFiOzs7bUJBRUtxQyxNQUFQOztTQVRvQjs7OztjQWVsQixJQUFJckQsS0FBSixDQUFVLHVCQUFWLENBQU47T0FwTGdCO01BdUxsQnNELGFBQWEsRUFBRSxVQUFTdEIsUUFBVCxFQUFtQnJCLFVBQW5CLEVBQStCQyxPQUEvQixFQUF3QzthQUNoRFYsUUFBTCxHQUFnQjtVQUNkekUsUUFBUSxFQUFFb0MsTUFBTSxDQUFDbUUsUUFBRCxDQURGO1VBRWRyQixVQUFVLEVBQUVBLFVBRkU7VUFHZEMsT0FBTyxFQUFFQTtTQUhYOztZQU1JLEtBQUt6QyxNQUFMLEtBQWdCLE1BQXBCLEVBQTRCOzs7ZUFHckJyQixHQUFMLEdBQVd6QixTQUFYOzs7ZUFHS2lDLGdCQUFQOztLQXBNSixDQTNlZ0M7Ozs7O1dBdXJCekJ2QyxPQUFQO0dBdnJCYTs7OztFQThyQmdCd0ksTUFBTSxDQUFDeEksT0FBcEMsQUE5ckJhLENBQWY7O01BaXNCSTtJQUNGeUksa0JBQWtCLEdBQUcxSSxPQUFyQjtHQURGLENBRUUsT0FBTzJJLG9CQUFQLEVBQTZCOzs7Ozs7Ozs7O0lBVTdCQyxRQUFRLENBQUMsR0FBRCxFQUFNLHdCQUFOLENBQVIsQ0FBd0M1SSxPQUF4Qzs7OztBQ3B0QkYsZUFBYyxHQUFHNkksU0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDT0FDLFdBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNGYUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFRVCxNQUFBLENBQUEsYUFBQSxHQUFBLGNBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBVUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQVlJLGlCQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzthQVVKLE1BQUE7Ozs7O2FBRVNBLG9CQUFBQSxNQUFBQTs7O2VBRVI7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQU1ELE1BQUE7Ozs7Ozs7Ozs7OzsyQ0FLbUIsQ0FBQSxPQUFBLElBQUEsUUFBQSxLQUFBLEtBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdER2QixJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLE9BU25CO01BUkpDLGVBUUksUUFSSkEsZUFRSTtNQVBKQyxZQU9JLFFBUEpBLFlBT0k7TUFOSkMsU0FNSSxRQU5KQSxTQU1JO01BTEpDLGtCQUtJLFFBTEpBLGtCQUtJO01BSkpDLEtBSUksUUFKSkEsS0FJSTtNQUhKQyxnQkFHSSxRQUhKQSxnQkFHSTtNQUZKQyxTQUVJLFFBRkpBLFNBRUk7TUFESkMsSUFDSSxRQURKQSxJQUNJO01BQ0VDLElBQUksR0FBR0MsQ0FBTSxDQUFDLElBQUQsQ0FBbkI7O2tCQUN3Q0MsQ0FBUSxDQUFDLENBQUQsQ0FGNUM7O01BRUdDLFlBRkg7TUFFaUJDLGVBRmpCOzttQkFHc0NGLENBQVEsQ0FBQyxDQUFELENBSDlDOztNQUdHRyxhQUhIO01BR2tCQyxnQkFIbEI7O21CQUlnQ0osQ0FBUSxDQUFDLENBQUQsQ0FKeEM7O01BSUdLLFVBSkg7TUFJZUMsYUFKZjs7bUJBSzRCTixDQUFRLENBQUMsS0FBRCxDQUxwQzs7TUFLR08sUUFMSDtNQUthQyxXQUxiOzttQkFNa0NSLENBQVEsQ0FBQyxJQUFELENBTjFDOztNQU1HUyxXQU5IO01BTWdCQyxjQU5oQjs7b0JBT3NCVixDQUFRLENBQUMsSUFBRCxDQVA5Qjs7TUFPR2xGLEtBUEg7TUFPVTZGLFFBUFY7O29CQVEwQlgsQ0FBUSxDQUFDLEtBQUQsQ0FSbEM7O01BUUdZLE9BUkg7TUFRWUMsVUFSWjs7RUFTSkMsQ0FBUyxDQUFDLFlBQU07SUFDZFosZUFBZSxDQUFDSixJQUFJLENBQUNpQixPQUFMLENBQWFkLFlBQWQsQ0FBZjtHQURPLEVBRU4sRUFGTSxDQUFUO0VBR0FhLENBQVMsQ0FBQyxZQUFNO0lBQ2RWLGdCQUFnQixDQUNkWSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsQ0FBRWhCLFlBQVksR0FBRyxHQUFoQixHQUF1QlYsWUFBeEIsRUFBc0MyQixPQUF0QyxDQUE4QyxDQUE5QyxDQUFoQixDQURjLENBQWhCO0dBRE8sRUFJTixDQUFDM0IsWUFBRCxFQUFlVSxZQUFmLENBSk0sQ0FBVDtFQU1BYSxDQUFTLENBQUMsWUFBTTtRQUNWcEIsS0FBSyxLQUFLLENBQWQsRUFBaUI7VUFDVHlCLFFBQVEsR0FBRyxNQUFNMUIsa0JBQXZCO01BQ0FhLGFBQWEsQ0FBQ2EsUUFBRCxDQUFiOzs7UUFHRXpCLEtBQUssR0FBRyxDQUFaLEVBQWU7VUFDUHlCLFNBQVEsR0FBRyxNQUFNMUIsa0JBQU4sR0FBMkJVLGFBQWEsSUFBSVQsS0FBSyxHQUFHLENBQVosQ0FBekQ7O01BQ0FZLGFBQWEsQ0FBQ2EsU0FBRCxDQUFiOztHQVJLLEVBVU4sQ0FBQzFCLGtCQUFELENBVk0sQ0FBVDtFQVlBcUIsQ0FBUyxDQUFDLFlBQU07UUFDVnBCLEtBQUssS0FBSyxDQUFkLEVBQWlCO01BQ2ZjLFdBQVcsQ0FBQyxJQUFELENBQVg7S0FERixNQUVPLElBQUlkLEtBQUssR0FBRyxDQUFaLEVBQWU7VUFDaEJXLFVBQVUsR0FBRyxDQUFiLElBQWtCQSxVQUFVLEtBQUtGLGFBQXJDLEVBQW9EO1FBQ2xESyxXQUFXLENBQUMsSUFBRCxDQUFYO09BREYsTUFFTztRQUNMQSxXQUFXLENBQUMsS0FBRCxDQUFYOzs7R0FQRyxFQVVOLENBQUNILFVBQUQsRUFBYUYsYUFBYixDQVZNLENBQVQ7RUFZQVcsQ0FBUyxDQUFDLFlBQU07YUFDQ00sZUFBZjs7Ozs7Ozs7bUJBRVFiLFFBRlI7Ozs7Ozt1Q0FHaUNWLElBQUksRUFIckM7OztjQUdZd0IsWUFIWjtjQUlNWCxjQUFjLENBQUNXLFlBQVksV0FBYixDQUFkO2NBQ0FSLFVBQVUsQ0FBQyxLQUFELENBQVY7Ozs7Ozs7OztjQUdGRixRQUFRLGFBQVI7Y0FDQUUsVUFBVSxDQUFDLEtBQUQsQ0FBVjs7Ozs7Ozs7OztJQUdKTyxlQUFlO0dBYlIsRUFjTixDQUFDYixRQUFELEVBQVdWLElBQVgsQ0FkTSxDQUFUO1NBaUJFO0lBQUssR0FBRyxFQUFFQyxJQUFWO0lBQWdCLEVBQUUsRUFBRUo7S0FDbEIsRUFBQyxJQUFEO0lBQU0sU0FBUyxFQUFDO0tBQ2JrQixPQUFPLElBQUlILFdBQVcsS0FBSyxJQUEzQixHQUFrQyx5QkFBbEMsR0FBdURBLFdBRDFELENBREYsQ0FERjtDQW5FRjs7QUNKQSxJQUFNYSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLE9BSWpCO01BSEpDLGFBR0ksUUFISkEsYUFHSTtNQUZKQyxrQkFFSSxRQUZKQSxrQkFFSTtNQURKQyxnQkFDSSxRQURKQSxnQkFDSTtTQUVGO0lBQUssS0FBSyxFQUFFO01BQUVDLFFBQVEsRUFBRSxVQUFaO01BQXdCQyxLQUFLLEVBQUUsSUFBL0I7TUFBcUNDLEdBQUcsRUFBRSxLQUExQztNQUFnREMsTUFBTSxFQUFDOztLQUNqRTtJQUNFLFFBQVEsRUFBRUosZ0JBRFo7SUFFRSxPQUFPLEVBQUUsbUJBQU07TUFDYkYsYUFBYSxDQUFDLEtBQUQsQ0FBYjs7Y0FKTixFQVNFO0lBQ0UsUUFBUSxFQUFFQyxrQkFEWjtJQUVFLE9BQU8sRUFBRSxtQkFBTTtNQUNiRCxhQUFhLENBQUMsUUFBRCxDQUFiOztnQkFaTixDQURGO0NBTEY7O0FDTUEsU0FBU08sWUFBVCxPQUF3QztNQUFoQkMsWUFBZ0IsUUFBaEJBLFlBQWdCOztrQkFDSi9CLENBQVEsQ0FBQyxDQUFELENBREo7O01BQy9CUixTQUQrQjtNQUNwQndDLFlBRG9COzttQkFFRWhDLENBQVEsQ0FBQyxDQUFELENBRlY7O01BRS9CVCxZQUYrQjtNQUVqQjBDLGVBRmlCOzttQkFHY2pDLENBQVEsQ0FBQyxHQUFELENBSHRCOztNQUcvQlAsa0JBSCtCO01BR1h5QyxxQkFIVzs7bUJBSUpsQyxDQUFRLENBQUMsS0FBRCxDQUpKOztNQUkvQkosU0FKK0I7TUFJcEJ1QyxZQUpvQjs7bUJBS1FuQyxDQUFRLENBQUNwSixTQUFELENBTGhCOztNQUsvQjBJLGVBTCtCO01BS2Q4QyxrQkFMYzs7b0JBTUVwQyxDQUFRLENBQUMsQ0FBRCxDQU5WOztNQU0vQnFDLFlBTitCO01BTWpCQyxlQU5pQjs7b0JBT1V0QyxDQUFRLENBQUMsS0FBRCxDQVBsQjs7TUFPL0J5QixnQkFQK0I7TUFPYmMsbUJBUGE7O29CQVFjdkMsQ0FBUSxDQUFDLEtBQUQsQ0FSdEI7O01BUS9Cd0Isa0JBUitCO01BUVhnQixxQkFSVzs7TUFTaENDLFFBQVEsR0FBRzFDLENBQU0sQ0FBQyxJQUFELENBQXZCOztXQUNTSixnQkFBVCxDQUEwQitDLEVBQTFCLEVBQThCO0lBQzVCUCxZQUFZLENBQUMsSUFBRCxDQUFaO0lBQ0FRLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkYsRUFBeEIsRUFBNEJHLGNBQTVCLENBQTJDO01BQUVDLFFBQVEsRUFBRTtLQUF2RDtJQUNBWCxZQUFZLENBQUMsS0FBRCxDQUFaOzs7V0FFT1osYUFBVCxDQUF1QndCLFNBQXZCLEVBQWtDO1FBQzVCQSxTQUFTLEtBQUssS0FBZCxJQUF1QlYsWUFBWSxHQUFHLENBQTFDLEVBQTZDO01BQzNDQyxlQUFlLENBQUNELFlBQVksR0FBRyxDQUFoQixDQUFmO0tBREYsTUFFTztNQUNMQyxlQUFlLENBQUNELFlBQVksR0FBRyxDQUFoQixDQUFmOzs7O1dBR0tXLFlBQVQsQ0FBc0JDLENBQXRCLEVBQXlCO0lBQ3ZCakIsWUFBWSxDQUFDUyxRQUFRLENBQUMxQixPQUFULENBQWlCdkIsU0FBbEIsQ0FBWjtJQUVBd0MsWUFBWSxDQUFDLFVBQUFrQixTQUFTLEVBQUk7VUFDcEJBLFNBQVMsR0FBR1QsUUFBUSxDQUFDMUIsT0FBVCxDQUFpQnZCLFNBQWpDLEVBQTRDO1FBQzFDNEMsa0JBQWtCLENBQUMsUUFBRCxDQUFsQjtPQURGLE1BRU87UUFDTEEsa0JBQWtCLENBQUMsS0FBRCxDQUFsQjs7O2FBR0tLLFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ2QixTQUF4QjtLQVBVLENBQVo7SUFTQXlDLGVBQWUsQ0FBQ1EsUUFBUSxDQUFDMUIsT0FBVCxDQUFpQnhCLFlBQWxCLENBQWY7SUFDQTJDLHFCQUFxQixDQUNuQixDQUNHLENBQUNPLFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ4QixZQUFqQixHQUFnQ2tELFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUJ2QixTQUFsRCxJQUErRCxHQUFoRSxHQUNBaUQsUUFBUSxDQUFDMUIsT0FBVCxDQUFpQnhCLFlBRm5CLEVBR0UyQixPQUhGLENBR1UsQ0FIVixDQURtQixDQUFyQjs7O0VBUUZKLENBQVMsQ0FBQyxZQUFNO0lBQ2QyQixRQUFRLENBQUMxQixPQUFULENBQWlCb0MsZ0JBQWpCLENBQWtDLFFBQWxDLEVBQTRDSCxZQUE1QztXQUVPLFlBQU0sRUFBYjtHQUhPLEVBSU4sRUFKTSxDQUFUO0VBS0FsQyxDQUFTLENBQUMsWUFBTTtJQUNkbkIsZ0JBQWdCLENBQUMwQyxZQUFELENBQWhCOztRQUNJTixZQUFZLENBQUMxRSxNQUFiLEdBQXNCLENBQXRCLEtBQTRCZ0YsWUFBaEMsRUFBOEM7TUFDNUNHLHFCQUFxQixDQUFDLElBQUQsQ0FBckI7S0FERixNQUVPO01BQ0xBLHFCQUFxQixDQUFDLEtBQUQsQ0FBckI7OztRQUdFSCxZQUFZLEtBQUssQ0FBckIsRUFBd0I7TUFDdEJFLG1CQUFtQixDQUFDLElBQUQsQ0FBbkI7S0FERixNQUVPO01BQ0xBLG1CQUFtQixDQUFDLEtBQUQsQ0FBbkI7O0dBWEssRUFhTixDQUFDRixZQUFELENBYk0sQ0FBVDtTQWNPLENBQ0w7SUFBSyxLQUFLLEVBQUU7TUFBRWUsTUFBTSxFQUFFOztJQURqQixFQUVMLEVBQUMsY0FBRDtJQUNFLGdCQUFnQixFQUFFM0IsZ0JBRHBCO0lBRUUsa0JBQWtCLEVBQUVELGtCQUZ0QjtJQUdFLGFBQWEsRUFBRUQ7SUFMWixFQU9MO0lBQ0UsR0FBRyxFQUFFa0IsUUFEUDtJQUVFLEtBQUssRUFBRTtNQUNMVyxNQUFNLEVBQUUsTUFESDtNQUVMQyxRQUFRLEVBQUUsUUFGTDtNQUdMQyxPQUFPLEVBQUUsTUFISjtNQUlMQyxhQUFhLEVBQUU7O0tBR2hCeEIsWUFBWSxDQUFDeUIsR0FBYixDQUFpQixVQUFDQyxJQUFELEVBQUkvRixDQUFKLEVBQVU7V0FFeEIsRUFBQyxnQkFBRDtNQUNFLElBQUksRUFBRStGLElBQUMsQ0FBQzVELElBRFY7TUFFRSxlQUFlLEVBQUVQLGVBRm5CO01BR0UsU0FBUyxFQUFFTSxTQUhiO01BSUUsZ0JBQWdCLEVBQUVELGdCQUpwQjtNQUtFLEtBQUssRUFBRWpDLENBTFQ7TUFNRSxrQkFBa0IsRUFBRStCLGtCQU50QjtNQU9FLFNBQVMsRUFBRUQsU0FQYjtNQVFFLFlBQVksRUFBRUQ7TUFUbEI7R0FERCxDQVRILENBUEssQ0FBUDs7O0FDbkVGLElBQU1tRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07U0FFckIsRUFBQyxZQUFEO0lBQWtCLFlBQVksRUFBRSxDQUNyQztNQUFFN0QsSUFBSSxFQUFFO2VBQU0sNkJBQU47O0tBRDZCLEVBRXJDO01BQUVBLElBQUksRUFBRTtlQUFNLDhCQUFOOztLQUY2QixFQUdyQztNQUFFQSxJQUFJLEVBQUU7ZUFBTSw4QkFBTjs7S0FINkI7SUFBdkM7Q0FGRjs7OzsifQ==
