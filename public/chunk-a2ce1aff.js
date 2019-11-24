import { f as createCommonjsModule, g as commonjsGlobal, c as y, i as n, d as h } from './chunk-10a91b1b.js';

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

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
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
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
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
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
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
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
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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
        var i = -1, next = function next() {
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
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
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
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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

        return !! caught;
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
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

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
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
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports
));

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

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
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

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

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

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

var defineProperty = _defineProperty;

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

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h$1 = m * 60;
var d = h$1 * 24;
var w = d * 7;
var y$1 = d * 365.25;

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
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
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

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n$$1 = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n$$1 * y$1;
    case 'weeks':
    case 'week':
    case 'w':
      return n$$1 * w;
    case 'days':
    case 'day':
    case 'd':
      return n$$1 * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n$$1 * h$1;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n$$1 * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n$$1 * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n$$1;
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
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h$1) {
    return Math.round(ms / h$1) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
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
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h$1) {
    return plural(ms, msAbs, h$1, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n$$1, name) {
  var isPlural = msAbs >= n$$1 * 1.5;
  return Math.round(ms / n$$1) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms$$1 = curr - (prevTime || curr);
			self.diff = ms$$1;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
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

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

var common = setup;

var browser$1 = createCommonjsModule(function (module, exports) {
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
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
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

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
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};
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


var debug = browser$1('socket.io-client:url');

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
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
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
var h$2 = m$1 * 60;
var d$1 = h$2 * 24;
var y$2 = d$1 * 365.25;

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
    return parse$1(val);
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
  var n$$1 = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n$$1 * y$2;
    case 'days':
    case 'day':
    case 'd':
      return n$$1 * d$1;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n$$1 * h$2;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n$$1 * m$1;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n$$1 * s$1;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n$$1;
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
  if (ms >= h$2) {
    return Math.round(ms / h$2) + 'h';
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
    plural$1(ms, h$2, 'hour') ||
    plural$1(ms, m$1, 'minute') ||
    plural$1(ms, s$1, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural$1(ms, n$$1, name) {
  if (ms < n$$1) {
    return;
  }
  if (ms < n$$1 * 1.5) {
    return Math.floor(ms / n$$1) + ' ' + name;
  }
  return Math.ceil(ms / n$$1) + ' ' + name + 's';
}

var debug$1 = createCommonjsModule(function (module, exports) {
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
var debug_1 = debug$1.coerce;
var debug_2 = debug$1.disable;
var debug_3 = debug$1.enable;
var debug_4 = debug$1.enabled;
var debug_5 = debug$1.humanize;
var debug_6 = debug$1.instances;
var debug_7 = debug$1.names;
var debug_8 = debug$1.skips;
var debug_9 = debug$1.formatters;

var browser$2 = createCommonjsModule(function (module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug$1;
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

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
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

var toString$1 = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString$1.call(arr) == '[object Array]';
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

    if (obj.type === 'Buffer' && isArray(obj.data)) {
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
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y$$1 = b.length;

  for (var i = 0, len = Math.min(x, y$$1); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y$$1 = b[i];
      break
    }
  }

  if (x < y$$1) return -1
  if (y$$1 < x) return 1
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
  if (!isArray(list)) {
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

function swap (b, n$$1, m) {
  var i = b[n$$1];
  b[n$$1] = b[m];
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
  var y$$1 = end - start;
  var len = Math.min(x, y$$1);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y$$1 = targetCopy[i];
      break
    }
  }

  if (x < y$$1) return -1
  if (y$$1 < x) return 1
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

function toHex (n$$1) {
  if (n$$1 < 16) return '0' + n$$1.toString(16)
  return n$$1.toString(16)
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
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var isBuffer$1 = isBuf;

var withNativeBuffer = typeof Buffer === 'function' && typeof isBuffer === 'function';
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
  return (withNativeBuffer && isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
}

/*global Blob,File*/

/**
 * Module requirements
 */



var toString$2 = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString$2.call(Blob) === '[object BlobConstructor]');
var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString$2.call(File) === '[object FileConstructor]');

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

  if (isBuffer$1(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isarray(data)) {
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
  } else if (isarray(data)) {
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
    } else if (isarray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuffer$1(obj)) { // and object
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
  } else if (isBuffer$1(obj) || obj.base64) { // raw binary data
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
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray(payload));
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

var toString$3 = {}.toString;

var isarray$1 = Array.isArray || function (arr) {
  return toString$3.call(arr) == '[object Array]';
};

/* global Blob File */

/*
 * Module requirements.
 */



var toString$4 = Object.prototype.toString;
var withNativeBlob$1 = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString$4.call(Blob) === '[object BlobConstructor]';
var withNativeFile$1 = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString$4.call(File) === '[object FileConstructor]';

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

  if (isarray$1(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && isBuffer && isBuffer(obj)) ||
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
    err_cb = err_cb || noop$1;
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

function noop$1() {}

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

  var length = '', n$$1, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n$$1 = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n$$1);

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

      var ret = callback(packet, i + n$$1, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n$$1;
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
  this.withCredentials = opts.withCredentials;

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

var encode = function (obj) {
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

var decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

var parseqs = {
	encode: encode,
	decode: decode
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
function encode$1(num) {
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
function decode$1(str) {
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
  var now = encode$1(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode$1(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode$1;
yeast.decode = decode$1;
var yeast_1 = yeast;

/**
 * Module dependencies.
 */






var debug$2 = browser$1('engine.io-client:polling');

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
    debug$2('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug$2('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug$2('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug$2('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug$2('pre-pause writing complete');
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
  debug$2('polling');
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
  debug$2('polling got data %s', data);
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
      debug$2('ignoring poll - transport state "%s"', this.readyState);
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
    debug$2('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug$2('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug$2('transport not open - deferring close');
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





var debug$3 = browser$1('engine.io-client:polling-xhr');

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
  opts.withCredentials = this.withCredentials;

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
  debug$3('xhr poll');
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
  this.withCredentials = opts.withCredentials;
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
    debug$3('xhr open %s: %s', this.method, this.uri);
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
      xhr.withCredentials = this.withCredentials;
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
            if (self.supportsBinary && contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
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
            self.onError(typeof xhr.status === 'number' ? xhr.status : 0);
          }, 0);
        }
      };
    }

    debug$3('xhr data %s', this.data);
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
    if (contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
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






var debug$4 = browser$1('engine.io-client:websocket');

var BrowserWebSocket, NodeWebSocket;

if (typeof WebSocket !== 'undefined') {
  BrowserWebSocket = WebSocket;
} else if (typeof self !== 'undefined') {
  BrowserWebSocket = self.WebSocket || self.MozWebSocket;
}

if (typeof window === 'undefined') {
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
          debug$4('websocket closed before onclose event');
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



var debug$5 = browser$1('engine.io-client:socket');





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
  this.withCredentials = false !== opts.withCredentials;
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
  debug$5('creating transport "%s"', name);
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
    withCredentials: options.withCredentials || this.withCredentials,
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
  debug$5('setting transport %s', transport$$1.name);
  var self = this;

  if (this.transport) {
    debug$5('clearing existing transport %s', this.transport.name);
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
  debug$5('probing transport "%s"', name);
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

    debug$5('probe transport "%s" opened', name);
    transport$$1.send([{ type: 'ping', data: 'probe' }]);
    transport$$1.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug$5('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport$$1);
        if (!transport$$1) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport$$1.name;

        debug$5('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug$5('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport$$1);
          transport$$1.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport$$1);
          transport$$1 = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug$5('probe transport "%s" failed', name);
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

    debug$5('probe transport "%s" failed because of error: %s', name, err);

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
      debug$5('"%s" works - aborting "%s"', to.name, transport$$1.name);
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
  debug$5('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug$5('starting upgrade probes');
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
    debug$5('socket receive: type "%s", data "%s"', packet.type, packet.data);

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
    debug$5('packet received with socket readyState "%s"', this.readyState);
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
    debug$5('writing ping packet - expecting pong within %sms', self.pingTimeout);
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
    debug$5('flushing %d packets in socket', this.writeBuffer.length);
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
    debug$5('socket closing - telling transport to close');
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
  debug$5('socket error %j', err);
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
    debug$5('socket close with reason: "%s"', reason);
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







var debug$6 = browser$1('socket.io-client:manager');



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
  debug$6('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug$6('opening %s', this.uri);
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
    debug$6('connect_error');
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
    debug$6('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug$6('connect attempt timed out after %d', timeout);
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
  debug$6('open');

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
  debug$6('error', err);
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
  debug$6('writing packet %j', packet);
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
  debug$6('cleanup');

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
  debug$6('disconnect');
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
  debug$6('onclose');

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
    debug$6('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug$6('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug$6('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug$6('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug$6('reconnect success');
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

var SocketComponent =
/*#__PURE__*/
function (_Component) {
  inherits(SocketComponent, _Component);

  function SocketComponent() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, SocketComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(SocketComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "state", {
      token: null,
      socket: null,
      connected: false
    });

    return _this;
  }

  createClass(SocketComponent, [{
    key: "componentWillMount",
    value: function () {
      var _componentWillMount = asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee() {
        var _this2 = this;

        var username, response, data;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = this.props.username;
                _context.prev = 1;
                _context.next = 4;
                return fetch("http://localhost:3000".concat("/anonymous"), {
                  method: 'POST',
                  body: JSON.stringify({
                    username: username
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.json();

              case 7:
                data = _context.sent;
                this.socket = lib$1("http://localhost:3000", {
                  query: "token=".concat(data.token)
                });
                this.socket.on('error', function (error) {
                  console.log("error from socket", error);
                });
                this.socket.on('connect', function () {
                  _this2.setState({
                    connected: true
                  });
                });
                this.setState({
                  socket: this.socket
                });
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.log("error....", _context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14]]);
      }));

      function componentWillMount() {
        return _componentWillMount.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var connected = this.state.connected;
      return children({
        socket: this.state.socket,
        connected: connected
      });
    }
  }]);

  return SocketComponent;
}(y);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

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

var t,u,r,i$1=[],o=n.__r,f=n.diffed,c=n.__c,e=n.unmount;function a(t){n.__h&&n.__h(u);var r=u.__H||(u.__H={t:[],u:[]});return t>=r.t.length&&r.t.push({}),r.t[t]}function v(n$$1){return m$2(x,n$$1)}function m$2(n$$1,r,i){var o=a(t++);return o.__c||(o.__c=u,o.i=[i?i(r):x(void 0,r),function(t){var u=n$$1(o.i[0],t);o.i[0]!==u&&(o.i[0]=u,o.__c.setState({}));}]),o.i}function p(n$$1,r){var i=a(t++);q(i.o,r)&&(i.i=n$$1,i.o=r,u.__H.u.push(i));}function F(){i$1.some(function(n$$1){n$$1.__P&&(n$$1.__H.u.forEach(_),n$$1.__H.u.forEach(g),n$$1.__H.u=[]);}),i$1=[];}function _(n$$1){n$$1.m&&n$$1.m();}function g(n$$1){var t=n$$1.i();"function"==typeof t&&(n$$1.m=t);}function q(n$$1,t){return !n$$1||t.some(function(t,u){return t!==n$$1[u]})}function x(n$$1,t){return "function"==typeof t?t(n$$1):t}n.__r=function(n$$1){o&&o(n$$1),t=0,(u=n$$1.__c).__H&&(u.__H.u.forEach(_),u.__H.u.forEach(g),u.__H.u=[]);},n.diffed=function(t){f&&f(t);var u=t.__c;if(u){var o=u.__H;o&&o.u.length&&(1!==i$1.push(u)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n$$1){var t,u=function(){clearTimeout(r),cancelAnimationFrame(t),setTimeout(n$$1);},r=setTimeout(u,100);"undefined"!=typeof window&&(t=requestAnimationFrame(u));})(F));}},n.__c=function(n$$1,t){t.some(function(n$$1){n$$1.__h.forEach(_),n$$1.__h=n$$1.__h.filter(function(n$$1){return !n$$1.i||g(n$$1)});}),c&&c(n$$1,t);},n.unmount=function(n$$1){e&&e(n$$1);var t=n$$1.__c;if(t){var u=t.__H;u&&u.t.forEach(function(n$$1){return n$$1.m&&n$$1.m()});}};

var useSocket = function useSocket(_ref) {
  var socket = _ref.socket,
      targetName = _ref.targetName;

  var _useState = v(''),
      _useState2 = slicedToArray(_useState, 2),
      messageText = _useState2[0],
      setMessageText = _useState2[1];

  var _useState3 = v(null),
      _useState4 = slicedToArray(_useState3, 2),
      messageRecieved = _useState4[0],
      setMessageRecieved = _useState4[1];

  var _useState5 = v(null),
      _useState6 = slicedToArray(_useState5, 2),
      messageSent = _useState6[0],
      setMessageSent = _useState6[1];

  var _useState7 = v(false),
      _useState8 = slicedToArray(_useState7, 2),
      connected = _useState8[0],
      setConnected = _useState8[1];

  var _useState9 = v([]),
      _useState10 = slicedToArray(_useState9, 2),
      errors = _useState10[0],
      setError = _useState10[1];

  var sendMessage = function sendMessage() {
    var datetime = new Date().getTime();
    socket.emit("text_message", {
      reciever: targetName,
      message: messageText,
      datetime: datetime
    });
    setMessageSent({
      reciever: targetName,
      datetime: datetime,
      message: messageText
    });
    setMessageText('');
  };

  var handleMessageChange = function handleMessageChange(e) {
    setMessageText(e.target.value);
  };

  p(function () {
    if (socket !== null) {
      socket.on("text_message", function (data) {
        var sender = data.sender,
            message = data.message,
            datetime = data.datetime;
        setMessageRecieved({
          sender: sender,
          message: message,
          datetime: datetime
        });
      });
      socket.on("connect", function () {
        setConnected(true);
      });
      socket.on("disconnect", function () {
        setConnected(false);
      });
      socket.on('error', function (error) {
        setError([].concat(toConsumableArray(errors), [error]));
      });
    }
  });
  return {
    messageRecieved: messageRecieved,
    messageSent: messageSent,
    messageText: messageText,
    sendMessage: sendMessage,
    handleMessageChange: handleMessageChange,
    errors: errors,
    connected: connected
  };
};

var DateLinebreak = function DateLinebreak(_ref) {
  var datetime = _ref.datetime;
  return h("div", {
    style: {
      display: "flex"
    }
  }, h("div", {
    style: {
      flex: "1"
    }
  }, h("hr", null)), h("div", null, new Date(datetime).toLocaleDateString()), h("div", {
    style: {
      flex: 1
    }
  }, h("hr", null)));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MessageAligner = function MessageAligner(_ref) {
  var children = _ref.children,
      side = _ref.side,
      style = _ref.style;
  var alignment = side === "left" ? "flex-start" : "flex-end";
  return h("div", {
    style: _objectSpread({
      display: "flex",
      justifyContent: alignment
    }, style)
  }, children);
};

var MessageView = function MessageView(_ref) {
  var message = _ref.message,
      backgroundColor = _ref.backgroundColor,
      datetime = _ref.datetime;
  return h("div", {
    style: {
      backgroundColor: backgroundColor,
      padding: 5,
      margin: 2,
      borderRadius: 15,
      borderColor: '#9E9E9E',
      borderStyle: 'solid',
      borderWidth: 2,
      maxWidth: '100%',
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      minWidth: '30%'
    }
  }, h("div", null, message), h("div", {
    style: {
      fontSize: 10,
      paddingTop: 2,
      textAlign: 'end'
    }
  }, h("i", {
    style: {
      backgroundColor: '#efebe9'
    }
  }, new Date(datetime).toLocaleTimeString())));
};

var SubsequentMessage = function SubsequentMessage(_ref) {
  var message = _ref.message,
      datetime = _ref.datetime;
  return h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginLeft: 45
    }
  }, h(MessageView, {
    message: message,
    datetime: datetime,
    backgroundColor: "#FFECB3"
  }));
};

var style = {
  height: 30,
  width: 40,
  padding: 3,
  borderRadius: 30,
  backgroundColor: 'darkSmoke',
  borderStyle: 'solid',
  borderWidth: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#009688',
  borderColor: '#80cbc4'
};

var MessageAvatar = function MessageAvatar(_ref) {
  var _ref$letter = _ref.letter,
      letter = _ref$letter === void 0 ? 'U' : _ref$letter;
  return h("div", {
    style: style
  }, h("div", null, letter.toUpperCase()));
};

var FirstMessage = function FirstMessage(_ref) {
  var message = _ref.message,
      datetime = _ref.datetime,
      letter = _ref.letter,
      local = _ref.local;
  return h("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, !local && h(MessageAvatar, {
    letter: letter
  }), h(MessageView, {
    message: message,
    datetime: datetime,
    backgroundColor: "#FFECB3"
  }));
};

/* eslint-disable react/jsx-props-no-spreading */

var MessageObjectMappter = function MessageObjectMappter(props) {
  var order = props.order,
      dateSpace = props.dateSpace;
  return h("div", null, dateSpace && h(DateLinebreak, props), h(MessageAligner, props, order === 'F' ? h(FirstMessage, props) : h(SubsequentMessage, props)));
};

var useMessageSorter = function useMessageSorter(messages) {
  var _useState = v(messages),
      _useState2 = slicedToArray(_useState, 2),
      sortedMessages = _useState2[0],
      setSortedMessages = _useState2[1];

  p(function () {
    setSortedMessages(messages.sort(function (a, b) {
      return a.datetime - b.datetime;
    }));
  }, [messages]);
  return {
    sortedMessages: sortedMessages
  };
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useMessagesMapper = function useMessagesMapper(messages) {
  var _useState = v(messages),
      _useState2 = slicedToArray(_useState, 2),
      mappedMessages = _useState2[0],
      setMappedMessages = _useState2[1];

  var mapMessages = function mapMessages() {
    var localSide = "right";
    var remoteSide = "left";

    if (messages.length === 0) {
      return [];
    }

    var email = messages[0].from;
    var lastDatetime = messages[0].datetime;
    return messages.map(function (m, i) {
      if (i === 0 && m.local) {
        return _objectSpread$1({}, m, {
          side: localSide,
          order: "F",
          dateSpace: true
        });
      }

      if (i === 0 && !m.local) {
        var letter = m.from[0] !== undefined ? m.from[0] : "";
        return _objectSpread$1({}, m, {
          side: remoteSide,
          order: "F",
          dateSpace: true,
          letter: letter
        });
      }

      if (i > 0 && email === m.from && m.local) {
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
          email = m.from;
          lastDatetime = m.datetime;
          return _objectSpread$1({}, m, {
            side: localSide,
            order: "S",
            dateSpace: true
          });
        }

        email = m.from;
        lastDatetime = m.datetime;
        return _objectSpread$1({}, m, {
          side: localSide,
          order: "S",
          dateSpace: false
        });
      }

      if (i > 0 && email !== m.from && m.local) {
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
          email = m.from;
          lastDatetime = m.datetime;
          return _objectSpread$1({}, m, {
            side: localSide,
            order: "F",
            dateSpace: false
          });
        }

        email = m.from;
        lastDatetime = m.datetime;
        return _objectSpread$1({}, m, {
          side: localSide,
          order: "F",
          dateSpace: true
        });
      }

      if (i > 0 && email === m.from && !m.local) {
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
          var _letter2 = m.from[0] !== undefined ? m.from[0] : "";

          lastDatetime = m.datetime;
          return _objectSpread$1({}, m, {
            side: remoteSide,
            order: "S",
            dateSpace: true,
            letter: _letter2
          });
        }

        var _letter = m.from[0] !== undefined ? m.from[0] : "";

        lastDatetime = m.datetime;
        return _objectSpread$1({}, m, {
          side: remoteSide,
          order: "S",
          dateSpace: false,
          letter: _letter
        });
      }

      if (i > 0 && email !== m.from && !m.local) {
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
          var _letter4 = m.from[0] !== undefined ? m.from[0] : "";

          email = m.from;
          lastDatetime = m.datetime;
          return _objectSpread$1({}, m, {
            side: remoteSide,
            order: "F",
            dateSpace: false,
            letter: _letter4
          });
        }

        var _letter3 = m.from[0] !== undefined ? m.from[0] : "";

        email = m.from;
        lastDatetime = m.datetime;
        return _objectSpread$1({}, m, {
          side: remoteSide,
          order: "F",
          dateSpace: true,
          letter: _letter3
        });
      }

      return null;
    });
  };

  p(function () {
    setMappedMessages(mapMessages());
  }, [messages]);
  return {
    mappedMessages: mappedMessages
  };
};

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

module.exports = _extends;
});

var MessageCollectionView = function MessageCollectionView(_ref) {
  var messages = _ref.messages;

  if (messages.length > 0) {
    return messages.map(function (message, i) {
      return h(MessageObjectMappter, _extends_1({}, message, {
        key: i
      }));
    });
  }

  return null;
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MessageViewScroller =
/*#__PURE__*/
function (_Component) {
  inherits(MessageViewScroller, _Component);

  function MessageViewScroller() {
    classCallCheck(this, MessageViewScroller);

    return possibleConstructorReturn(this, getPrototypeOf(MessageViewScroller).apply(this, arguments));
  }

  createClass(MessageViewScroller, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.gotoBottom();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.gotoBottom();
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "gotoBottom",
    value: function gotoBottom() {
      var elements = document.getElementsByName("msgViewScroller");
      elements.forEach(function (e) {
        e.scrollTop = e.scrollHeight - e.clientHeight;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          style = _this$props.style;
      return h("div", {
        name: "msgViewScroller",
        style: _objectSpread$2({
          backgroundColor: "#edeff2",
          overflow: "auto",
          width: "100%",
          height: "100%"
        }, style)
      }, children);
    }
  }]);

  return MessageViewScroller;
}(y);

/* eslint-disable no-shadow */

var MessagesDisplayer = function MessagesDisplayer(_ref) {
  var messages = _ref.messages;

  var _useMessageSorter = useMessageSorter(messages),
      sortedMessages = _useMessageSorter.sortedMessages;

  var _useMessageMapper = useMessagesMapper(sortedMessages),
      mappedMessages = _useMessageMapper.mappedMessages;

  return h(MessageViewScroller, null, h(MessageCollectionView, {
    messages: mappedMessages
  }));
};

var MessageEditorDisplayer = function MessageEditorDisplayer(_ref) {
  var onMessageChange = _ref.onMessageChange,
      message = _ref.message,
      sendMessage = _ref.sendMessage,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 0 : _ref$id,
      disabled = _ref.disabled;
  return h("div", {
    style: {
      display: 'flex'
    }
  }, h("input", {
    style: {
      flex: 1
    },
    "data-testid": "message".concat(id),
    onInput: onMessageChange,
    value: message,
    name: "message",
    type: "text",
    placeholder: "Enter message text"
  }), h("div", {
    style: {
      display: 'flex'
    }
  }, h("button", {
    "data-testid": "sendMessage".concat(id),
    disabled: message === '' || disabled,
    style: {
      marginLeft: 2,
      width: '100%'
    },
    onClick: sendMessage
  }, h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, h("path", {
    d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
  }), h("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })))));
};

var useChatLog = function useChatLog(_ref) {
  var name = _ref.name,
      messageRecieved = _ref.messageRecieved,
      messageSent = _ref.messageSent;

  var _useState = v([]),
      _useState2 = slicedToArray(_useState, 2),
      messages = _useState2[0],
      setMessages = _useState2[1];

  var saveToLocalStorage = function saveToLocalStorage(m, key) {
    var persistedMessages = JSON.parse(localStorage.getItem(key)) === null ? [m] : [].concat(toConsumableArray(JSON.parse(localStorage.getItem(key))), [m]);
    localStorage.setItem(key, JSON.stringify(persistedMessages));
    return persistedMessages;
  }; // componentDidMount


  p(function () {
    setMessages(JSON.parse(localStorage.getItem(name)) === null ? [] : toConsumableArray(JSON.parse(localStorage.getItem(name))));
  }, []); // saveRemoteMessage

  p(function () {
    if (messageRecieved !== null) {
      var datetime = messageRecieved.datetime,
          message = messageRecieved.message,
          sender = messageRecieved.sender;
      var local = false;
      setMessages(saveToLocalStorage({
        message: message,
        from: sender,
        local: local,
        datetime: datetime,
        to: name
      }, name));
    }
  }, [messageRecieved]); // saveLocalMessage

  p(function () {
    if (messageSent !== null) {
      var datetime = messageSent.datetime,
          message = messageSent.message,
          reciever = messageSent.reciever;
      var local = true;
      var from = name;
      setMessages(saveToLocalStorage({
        message: message,
        from: from,
        local: local,
        datetime: datetime,
        to: reciever
      }, name));
    }
  }, [messageSent]);
  return {
    messages: messages
  };
};

var MessagingModuleSocket = function MessagingModuleSocket(_ref) {
  var name = _ref.name,
      targetName = _ref.targetName,
      socket = _ref.socket,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 0 : _ref$id,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? "96vh" : _ref$height;

  var _useSocket = useSocket({
    socket: socket,
    targetName: targetName
  }),
      messageSent = _useSocket.messageSent,
      messageRecieved = _useSocket.messageRecieved,
      messageText = _useSocket.messageText,
      sendMessage = _useSocket.sendMessage,
      handleMessageChange = _useSocket.handleMessageChange;

  var _useChatLog = useChatLog({
    name: name,
    messageRecieved: messageRecieved,
    messageSent: messageSent
  }),
      messages = _useChatLog.messages;

  return h("div", {
    style: {
      height: height,
      width: "100%"
    }
  }, h(MessagesDisplayer, {
    messages: messages
  }), h(MessageEditorDisplayer, {
    disabled: socket === null,
    id: id,
    message: messageText,
    sendMessage: sendMessage,
    onMessageChange: handleMessageChange
  }));
};

var ChatUser = function ChatUser(_ref) {
  var name = _ref.name,
      targetName = _ref.targetName;
  return h(SocketComponent, {
    username: name
  }, function (_ref2) {
    var socket = _ref2.socket,
        connected = _ref2.connected;
    return h("div", {
      style: {
        flex: 1,
        margin: 10
      }
    }, h("div", null, "User:", name), h("div", null, connected ? h("i", {
      style: {
        color: "green"
      }
    }, "connected") : h("i", {
      style: {
        color: "orange"
      }
    }, "connecting...")), h(MessagingModuleSocket, {
      height: "50vh",
      name: name,
      targetName: targetName,
      socket: socket
    }));
  });
};

var ChatRoom = function ChatRoom() {
  return h("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, h(ChatUser, {
    name: "mario",
    targetName: "dragos"
  }), h(ChatUser, {
    name: "dragos",
    targetName: "mario"
  }));
};

export default ChatRoom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstYTJjZTFhZmYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wYXJzZXVyaS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtZ2xvYmFscy9zcmMvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MtZXM2L2Jyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2NvbW1vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi91cmwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYnVmZmVyLWVzNi9iYXNlNjQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYnVmZmVyLWVzNi9pZWVlNzU0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2J1ZmZlci1lczYvaXNBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9idWZmZXItZXM2L2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvaXMtYnVmZmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYmluYXJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaGFzLWNvcnMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIva2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9oYXMtYmluYXJ5Mi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9oYXMtYmluYXJ5Mi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci5zbGljZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hZnRlci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi91dGY4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Jsb2IvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIvYnJvd3Nlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtaW5oZXJpdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy95ZWFzdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmctanNvbnAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmUvc3JjL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9zb2NrZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdG8tYXJyYXkvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWJpbmQvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL2luZGV4LmpzIiwiLi4vU29ja2V0Q29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwiLi4vLi4vLi4vcnRjanMvbWVzc2FnaW5nLW1vZHVsZS1zb2NrZXQvdXNlU29ja2V0LmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZS1vYmplY3QtbWFwcGVyL2RhdGUtbGluZWJyZWFrLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZS1vYmplY3QtbWFwcGVyL21lc3NhZ2UtYWxpZ25lci5qcyIsIi4uLy4uLy4uL3J0Y2pzL3NoYXJlYWJsZS11aS9tZXNzYWdlcy1kaXNwbGF5ZXIvbGliL21lc3NhZ2Utb2JqZWN0LW1hcHBlci9tZXNzYWdlLXZpZXcuanMiLCIuLi8uLi8uLi9ydGNqcy9zaGFyZWFibGUtdWkvbWVzc2FnZXMtZGlzcGxheWVyL2xpYi9tZXNzYWdlLW9iamVjdC1tYXBwZXIvc3Vic2VxdWVudC1tZXNzYWdlLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZS1vYmplY3QtbWFwcGVyL21lc3NhZ2UtYXZhdGFyLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZS1vYmplY3QtbWFwcGVyL2ZpcnN0LW1lc3NhZ2UuanMiLCIuLi8uLi8uLi9ydGNqcy9zaGFyZWFibGUtdWkvbWVzc2FnZXMtZGlzcGxheWVyL2xpYi9tZXNzYWdlLW9iamVjdC1tYXBwZXIvbWVzc2FnZS1vYmplY3QtbWFwcGVyLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvdXNlTWVzc2FnZVNvcnRlci5qcyIsIi4uLy4uLy4uL3J0Y2pzL3NoYXJlYWJsZS11aS9tZXNzYWdlcy1kaXNwbGF5ZXIvbGliL3VzZU1lc3NhZ2VNYXBwZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZS1jb2xsZWN0aW9uLXZpZXcuanMiLCIuLi8uLi8uLi9ydGNqcy9zaGFyZWFibGUtdWkvbWVzc2FnZXMtZGlzcGxheWVyL2xpYi9tZXNzYWdlcy12aWV3LXNjcm9sbGVyLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2VzLWRpc3BsYXllci9saWIvbWVzc2FnZXMtZGlzcGxheWVyLmpzIiwiLi4vLi4vLi4vcnRjanMvc2hhcmVhYmxlLXVpL21lc3NhZ2UtZWRpdG9yLWRpc3BsYXllci9pbmRleC5qcyIsIi4uLy4uLy4uL3J0Y2pzL3NoYXJlYWJsZS1ob29rcy91c2VDaGF0TG9nLmpzIiwiLi4vLi4vLi4vcnRjanMvbWVzc2FnaW5nLW1vZHVsZS1zb2NrZXQvaW5kZXguanMiLCIuLi9DaGF0VXNlci5qcyIsIi4uL0NoYXRSb29tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiLyoqXHJcbiAqIFBhcnNlcyBhbiBVUklcclxuICpcclxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcclxuXHJcbnZhciBwYXJ0cyA9IFtcclxuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcclxuICAgIHZhciBzcmMgPSBzdHIsXHJcbiAgICAgICAgYiA9IHN0ci5pbmRleE9mKCdbJyksXHJcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XHJcblxyXG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXHJcbiAgICAgICAgdXJpID0ge30sXHJcbiAgICAgICAgaSA9IDE0O1xyXG5cclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcclxuICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XHJcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVyaTtcclxufTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbi8vIGJhc2VkIG9mZiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXByb2Nlc3MvYmxvYi9tYXN0ZXIvYnJvd3Nlci5qc1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbnZhciBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuaWYgKHR5cGVvZiBnbG9iYWwuc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xufVxuaWYgKHR5cGVvZiBnbG9iYWwuY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xufVxuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn1cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5leHBvcnQgdmFyIHRpdGxlID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBwbGF0Zm9ybSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgYnJvd3NlciA9IHRydWU7XG5leHBvcnQgdmFyIGVudiA9IHt9O1xuZXhwb3J0IHZhciBhcmd2ID0gW107XG5leHBvcnQgdmFyIHZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbmV4cG9ydCB2YXIgdmVyc2lvbnMgPSB7fTtcbmV4cG9ydCB2YXIgcmVsZWFzZSA9IHt9O1xuZXhwb3J0IHZhciBjb25maWcgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmV4cG9ydCB2YXIgb24gPSBub29wO1xuZXhwb3J0IHZhciBhZGRMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIG9uY2UgPSBub29wO1xuZXhwb3J0IHZhciBvZmYgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5leHBvcnQgdmFyIGVtaXQgPSBub29wO1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZyhuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3dkICgpIHsgcmV0dXJuICcvJyB9XG5leHBvcnQgZnVuY3Rpb24gY2hkaXIgKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHVtYXNrKCkgeyByZXR1cm4gMDsgfVxuXG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9rdW1hdmlzL2Jyb3dzZXItcHJvY2Vzcy1ocnRpbWUvYmxvYi9tYXN0ZXIvaW5kZXguanNcbnZhciBwZXJmb3JtYW5jZSA9IGdsb2JhbC5wZXJmb3JtYW5jZSB8fCB7fVxudmFyIHBlcmZvcm1hbmNlTm93ID1cbiAgcGVyZm9ybWFuY2Uubm93ICAgICAgICB8fFxuICBwZXJmb3JtYW5jZS5tb3pOb3cgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1zTm93ICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uub05vdyAgICAgICB8fFxuICBwZXJmb3JtYW5jZS53ZWJraXROb3cgIHx8XG4gIGZ1bmN0aW9uKCl7IHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpIH1cblxuLy8gZ2VuZXJhdGUgdGltZXN0YW1wIG9yIGRlbHRhXG4vLyBzZWUgaHR0cDovL25vZGVqcy5vcmcvYXBpL3Byb2Nlc3MuaHRtbCNwcm9jZXNzX3Byb2Nlc3NfaHJ0aW1lXG5leHBvcnQgZnVuY3Rpb24gaHJ0aW1lKHByZXZpb3VzVGltZXN0YW1wKXtcbiAgdmFyIGNsb2NrdGltZSA9IHBlcmZvcm1hbmNlTm93LmNhbGwocGVyZm9ybWFuY2UpKjFlLTNcbiAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKGNsb2NrdGltZSlcbiAgdmFyIG5hbm9zZWNvbmRzID0gTWF0aC5mbG9vcigoY2xvY2t0aW1lJTEpKjFlOSlcbiAgaWYgKHByZXZpb3VzVGltZXN0YW1wKSB7XG4gICAgc2Vjb25kcyA9IHNlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFswXVxuICAgIG5hbm9zZWNvbmRzID0gbmFub3NlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFsxXVxuICAgIGlmIChuYW5vc2Vjb25kczwwKSB7XG4gICAgICBzZWNvbmRzLS1cbiAgICAgIG5hbm9zZWNvbmRzICs9IDFlOVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3NlY29uZHMsbmFub3NlY29uZHNdXG59XG5cbnZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuZXhwb3J0IGZ1bmN0aW9uIHVwdGltZSgpIHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcbiAgdmFyIGRpZiA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4gZGlmIC8gMTAwMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuZXh0VGljazogbmV4dFRpY2ssXG4gIHRpdGxlOiB0aXRsZSxcbiAgYnJvd3NlcjogYnJvd3NlcixcbiAgZW52OiBlbnYsXG4gIGFyZ3Y6IGFyZ3YsXG4gIHZlcnNpb246IHZlcnNpb24sXG4gIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgb246IG9uLFxuICBhZGRMaXN0ZW5lcjogYWRkTGlzdGVuZXIsXG4gIG9uY2U6IG9uY2UsXG4gIG9mZjogb2ZmLFxuICByZW1vdmVMaXN0ZW5lcjogcmVtb3ZlTGlzdGVuZXIsXG4gIHJlbW92ZUFsbExpc3RlbmVyczogcmVtb3ZlQWxsTGlzdGVuZXJzLFxuICBlbWl0OiBlbWl0LFxuICBiaW5kaW5nOiBiaW5kaW5nLFxuICBjd2Q6IGN3ZCxcbiAgY2hkaXI6IGNoZGlyLFxuICB1bWFzazogdW1hc2ssXG4gIGhydGltZTogaHJ0aW1lLFxuICBwbGF0Zm9ybTogcGxhdGZvcm0sXG4gIHJlbGVhc2U6IHJlbGVhc2UsXG4gIGNvbmZpZzogY29uZmlnLFxuICB1cHRpbWU6IHVwdGltZVxufTtcbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG5cdE9iamVjdC5rZXlzKGVudikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGNyZWF0ZURlYnVnW2tleV0gPSBlbnZba2V5XTtcblx0fSk7XG5cblx0LyoqXG5cdCogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMgPSBbXTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cdFx0XHRcdGlmICh0eXBlb2YgZm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYXJnc1tpbmRleF07XG5cdFx0XHRcdFx0bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG5cdFx0XHRcdFx0Ly8gTm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuXHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXHRcdFx0Y3JlYXRlRGVidWcuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG5cdFx0XHRjb25zdCBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcblx0XHRcdGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHRkZWJ1Zy5lbmFibGVkID0gY3JlYXRlRGVidWcuZW5hYmxlZChuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0Ly8gRGVidWcuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5cdFx0Ly8gZGVidWcucmF3TG9nID0gcmF3TG9nO1xuXG5cdFx0Ly8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdGNyZWF0ZURlYnVnLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcblx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgY3JlYXRlRGVidWcuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBpbnN0YW5jZSA9IGNyZWF0ZURlYnVnLmluc3RhbmNlc1tpXTtcblx0XHRcdGluc3RhbmNlLmVuYWJsZWQgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG5cdCpcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBkaXNhYmxlKCkge1xuXHRcdGNvbnN0IG5hbWVzcGFjZXMgPSBbXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5uYW1lcy5tYXAodG9OYW1lc3BhY2UpLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKHRvTmFtZXNwYWNlKS5tYXAobmFtZXNwYWNlID0+ICctJyArIG5hbWVzcGFjZSlcblx0XHRdLmpvaW4oJywnKTtcblx0XHRjcmVhdGVEZWJ1Zy5lbmFibGUoJycpO1xuXHRcdHJldHVybiBuYW1lc3BhY2VzO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0KiBAcmV0dXJuIHtCb29sZWFufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuXHRcdGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0bGV0IGk7XG5cdFx0bGV0IGxlbjtcblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvbnZlcnQgcmVnZXhwIHRvIG5hbWVzcGFjZVxuXHQqXG5cdCogQHBhcmFtIHtSZWdFeHB9IHJlZ3hlcFxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHRvTmFtZXNwYWNlKHJlZ2V4cCkge1xuXHRcdHJldHVybiByZWdleHAudG9TdHJpbmcoKVxuXHRcdFx0LnN1YnN0cmluZygyLCByZWdleHAudG9TdHJpbmcoKS5sZW5ndGggLSAyKVxuXHRcdFx0LnJlcGxhY2UoL1xcLlxcKlxcPyQvLCAnKicpO1xuXHR9XG5cblx0LyoqXG5cdCogQ29lcmNlIGB2YWxgLlxuXHQqXG5cdCogQHBhcmFtIHtNaXhlZH0gdmFsXG5cdCogQHJldHVybiB7TWl4ZWR9XG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcblx0XHRpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG5cdFx0fVxuXHRcdHJldHVybiB2YWw7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcblx0JyMwMDAwQ0MnLFxuXHQnIzAwMDBGRicsXG5cdCcjMDAzM0NDJyxcblx0JyMwMDMzRkYnLFxuXHQnIzAwNjZDQycsXG5cdCcjMDA2NkZGJyxcblx0JyMwMDk5Q0MnLFxuXHQnIzAwOTlGRicsXG5cdCcjMDBDQzAwJyxcblx0JyMwMENDMzMnLFxuXHQnIzAwQ0M2NicsXG5cdCcjMDBDQzk5Jyxcblx0JyMwMENDQ0MnLFxuXHQnIzAwQ0NGRicsXG5cdCcjMzMwMENDJyxcblx0JyMzMzAwRkYnLFxuXHQnIzMzMzNDQycsXG5cdCcjMzMzM0ZGJyxcblx0JyMzMzY2Q0MnLFxuXHQnIzMzNjZGRicsXG5cdCcjMzM5OUNDJyxcblx0JyMzMzk5RkYnLFxuXHQnIzMzQ0MwMCcsXG5cdCcjMzNDQzMzJyxcblx0JyMzM0NDNjYnLFxuXHQnIzMzQ0M5OScsXG5cdCcjMzNDQ0NDJyxcblx0JyMzM0NDRkYnLFxuXHQnIzY2MDBDQycsXG5cdCcjNjYwMEZGJyxcblx0JyM2NjMzQ0MnLFxuXHQnIzY2MzNGRicsXG5cdCcjNjZDQzAwJyxcblx0JyM2NkNDMzMnLFxuXHQnIzk5MDBDQycsXG5cdCcjOTkwMEZGJyxcblx0JyM5OTMzQ0MnLFxuXHQnIzk5MzNGRicsXG5cdCcjOTlDQzAwJyxcblx0JyM5OUNDMzMnLFxuXHQnI0NDMDAwMCcsXG5cdCcjQ0MwMDMzJyxcblx0JyNDQzAwNjYnLFxuXHQnI0NDMDA5OScsXG5cdCcjQ0MwMENDJyxcblx0JyNDQzAwRkYnLFxuXHQnI0NDMzMwMCcsXG5cdCcjQ0MzMzMzJyxcblx0JyNDQzMzNjYnLFxuXHQnI0NDMzM5OScsXG5cdCcjQ0MzM0NDJyxcblx0JyNDQzMzRkYnLFxuXHQnI0NDNjYwMCcsXG5cdCcjQ0M2NjMzJyxcblx0JyNDQzk5MDAnLFxuXHQnI0NDOTkzMycsXG5cdCcjQ0NDQzAwJyxcblx0JyNDQ0NDMzMnLFxuXHQnI0ZGMDAwMCcsXG5cdCcjRkYwMDMzJyxcblx0JyNGRjAwNjYnLFxuXHQnI0ZGMDA5OScsXG5cdCcjRkYwMENDJyxcblx0JyNGRjAwRkYnLFxuXHQnI0ZGMzMwMCcsXG5cdCcjRkYzMzMzJyxcblx0JyNGRjMzNjYnLFxuXHQnI0ZGMzM5OScsXG5cdCcjRkYzM0NDJyxcblx0JyNGRjMzRkYnLFxuXHQnI0ZGNjYwMCcsXG5cdCcjRkY2NjMzJyxcblx0JyNGRjk5MDAnLFxuXHQnI0ZGOTkzMycsXG5cdCcjRkZDQzAwJyxcblx0JyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcblx0Ly8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2Vcblx0Ly8gZXhwbGljaXRseVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgKHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgd2luZG93LnByb2Nlc3MuX19ud2pzKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Ly8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuXHRpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuXHQvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuXHRyZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcblx0XHQvLyBJcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG5cdFx0KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcblx0XHQvLyBJcyBmaXJlZm94ID49IHYzMT9cblx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuXHQvLyBUaGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuXHQvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuXHRyZXR1cm4gdHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnICYmXG5cdFx0Y29uc29sZS5sb2cgJiZcblx0XHRjb25zb2xlLmxvZyguLi5hcmdzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG5cblx0Ly8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuXHRpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcblx0XHRyID0gcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cblxuXHRyZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG5cdHRyeSB7XG5cdFx0Ly8gVFZNTEtpdCAoQXBwbGUgVFYgSlMgUnVudGltZSkgZG9lcyBub3QgaGF2ZSBhIHdpbmRvdyBvYmplY3QsIGp1c3QgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dFxuXHRcdC8vIFRoZSBCcm93c2VyIGFsc28gaGFzIGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHQuXG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbW1vbicpKGV4cG9ydHMpO1xuXG5jb25zdCB7Zm9ybWF0dGVyc30gPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24gKHYpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVycm9yLm1lc3NhZ2U7XG5cdH1cbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2V1cmkgPSByZXF1aXJlKCdwYXJzZXVyaScpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDp1cmwnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVybDtcblxuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxuICogICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gdXJsICh1cmksIGxvYykge1xuICB2YXIgb2JqID0gdXJpO1xuXG4gIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBsb2NhdGlvbik7XG4gIGlmIChudWxsID09IHVyaSkgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0O1xuXG4gIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB1cmkpIHtcbiAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICBkZWJ1ZygncHJvdG9jb2wtbGVzcyB1cmwgJXMnLCB1cmkpO1xuICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSAnaHR0cHM6Ly8nICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlXG4gICAgZGVidWcoJ3BhcnNlICVzJywgdXJpKTtcbiAgICBvYmogPSBwYXJzZXVyaSh1cmkpO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gIGlmICghb2JqLnBvcnQpIHtcbiAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzgwJztcbiAgICB9IGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnNDQzJztcbiAgICB9XG4gIH1cblxuICBvYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJztcblxuICB2YXIgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHZhciBob3N0ID0gaXB2NiA/ICdbJyArIG9iai5ob3N0ICsgJ10nIDogb2JqLmhvc3Q7XG5cbiAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAnOicgKyBvYmoucG9ydDtcbiAgLy8gZGVmaW5lIGhyZWZcbiAgb2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/ICcnIDogKCc6JyArIG9iai5wb3J0KSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJyMwMDAwQ0MnLCAnIzAwMDBGRicsICcjMDAzM0NDJywgJyMwMDMzRkYnLCAnIzAwNjZDQycsICcjMDA2NkZGJywgJyMwMDk5Q0MnLFxuICAnIzAwOTlGRicsICcjMDBDQzAwJywgJyMwMENDMzMnLCAnIzAwQ0M2NicsICcjMDBDQzk5JywgJyMwMENDQ0MnLCAnIzAwQ0NGRicsXG4gICcjMzMwMENDJywgJyMzMzAwRkYnLCAnIzMzMzNDQycsICcjMzMzM0ZGJywgJyMzMzY2Q0MnLCAnIzMzNjZGRicsICcjMzM5OUNDJyxcbiAgJyMzMzk5RkYnLCAnIzMzQ0MwMCcsICcjMzNDQzMzJywgJyMzM0NDNjYnLCAnIzMzQ0M5OScsICcjMzNDQ0NDJywgJyMzM0NDRkYnLFxuICAnIzY2MDBDQycsICcjNjYwMEZGJywgJyM2NjMzQ0MnLCAnIzY2MzNGRicsICcjNjZDQzAwJywgJyM2NkNDMzMnLCAnIzk5MDBDQycsXG4gICcjOTkwMEZGJywgJyM5OTMzQ0MnLCAnIzk5MzNGRicsICcjOTlDQzAwJywgJyM5OUNDMzMnLCAnI0NDMDAwMCcsICcjQ0MwMDMzJyxcbiAgJyNDQzAwNjYnLCAnI0NDMDA5OScsICcjQ0MwMENDJywgJyNDQzAwRkYnLCAnI0NDMzMwMCcsICcjQ0MzMzMzJywgJyNDQzMzNjYnLFxuICAnI0NDMzM5OScsICcjQ0MzM0NDJywgJyNDQzMzRkYnLCAnI0NDNjYwMCcsICcjQ0M2NjMzJywgJyNDQzk5MDAnLCAnI0NDOTkzMycsXG4gICcjQ0NDQzAwJywgJyNDQ0NDMzMnLCAnI0ZGMDAwMCcsICcjRkYwMDMzJywgJyNGRjAwNjYnLCAnI0ZGMDA5OScsICcjRkYwMENDJyxcbiAgJyNGRjAwRkYnLCAnI0ZGMzMwMCcsICcjRkYzMzMzJywgJyNGRjMzNjYnLCAnI0ZGMzM5OScsICcjRkYzM0NDJywgJyNGRjMzRkYnLFxuICAnI0ZGNjYwMCcsICcjRkY2NjMzJywgJyNGRjk5MDAnLCAnI0ZGOTkzMycsICcjRkZDQzAwJywgJyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIlxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcbnZhciBpbml0ZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIGluaXQgKCkge1xuICBpbml0ZWQgPSB0cnVlO1xuICB2YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbiAgfVxuXG4gIHJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxuICByZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgaWYgKCFpbml0ZWQpIHtcbiAgICBpbml0KCk7XG4gIH1cbiAgdmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcGxhY2VIb2xkZXJzID0gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxuXG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIGlmICghaW5pdGVkKSB7XG4gICAgaW5pdCgpO1xuICB9XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIHJlYWQgKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGUgKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG5cbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICcuL2Jhc2U2NCdcbmltcG9ydCAqIGFzIGllZWU3NTQgZnJvbSAnLi9pZWVlNzU0J1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5J1xuXG5leHBvcnQgdmFyIElOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0cnVlXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbnZhciBfa01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuZXhwb3J0IHtfa01heExlbmd0aCBhcyBrTWF4TGVuZ3RofTtcbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgcmV0dXJuIHRydWU7XG4gIC8vIHJvbGx1cCBpc3N1ZXNcbiAgLy8gdHJ5IHtcbiAgLy8gICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgLy8gICBhcnIuX19wcm90b19fID0ge1xuICAvLyAgICAgX19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSxcbiAgLy8gICAgIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAvLyAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAvLyAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICAvLyB9IGNhdGNoIChlKSB7XG4gIC8vICAgcmV0dXJuIGZhbHNlXG4gIC8vIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAvLyAgIHZhbHVlOiBudWxsLFxuICAgIC8vICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgLy8gfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoaW50ZXJuYWxJc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cbkJ1ZmZlci5pc0J1ZmZlciA9IGlzQnVmZmVyO1xuZnVuY3Rpb24gaW50ZXJuYWxJc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFpbnRlcm5hbElzQnVmZmVyKGEpIHx8ICFpbnRlcm5hbElzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIWludGVybmFsSXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKGludGVybmFsSXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghaW50ZXJuYWxJc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghaW50ZXJuYWxJc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKGludGVybmFsSXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFpbnRlcm5hbElzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gaW50ZXJuYWxJc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG4vLyB0aGUgZm9sbG93aW5nIGlzIGZyb20gaXMtYnVmZmVyLCBhbHNvIGJ5IEZlcm9zcyBBYm91a2hhZGlqZWggYW5kIHdpdGggc2FtZSBsaXNlbmNlXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5leHBvcnQgZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoISFvYmouX2lzQnVmZmVyIHx8IGlzRmFzdEJ1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopKVxufVxuXG5mdW5jdGlvbiBpc0Zhc3RCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0Zhc3RCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmO1xuXG52YXIgd2l0aE5hdGl2ZUJ1ZmZlciA9IHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIEJ1ZmZlci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJztcbnZhciB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbic7XG5cbnZhciBpc1ZpZXcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iaikgOiAob2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZihvYmopIHtcbiAgcmV0dXJuICh3aXRoTmF0aXZlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICAgICAgICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSk7XG59XG4iLCIvKmdsb2JhbCBCbG9iLEZpbGUqL1xuXG4vKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHNcbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB0b1N0cmluZy5jYWxsKEJsb2IpID09PSAnW29iamVjdCBCbG9iQ29uc3RydWN0b3JdJyk7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nKTtcblxuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xuICogaGVyZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCkge1xuICB2YXIgYnVmZmVycyA9IFtdO1xuICB2YXIgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICB2YXIgcGFjayA9IHBhY2tldDtcbiAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICByZXR1cm4ge3BhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVyc307XG59O1xuXG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gIGlmIChpc0J1ZihkYXRhKSkge1xuICAgIHZhciBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgYnVmZmVycykge1xuICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICByZXR1cm4gcGFja2V0O1xufTtcblxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlcikge1xuICAgIHJldHVybiBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IHJlbW92ZXMgQmxvYnMgb3IgRmlsZXMgZnJvbSBkYXRhIHZpYVxuICogRmlsZVJlYWRlcidzIHJlYWRBc0FycmF5QnVmZmVyIG1ldGhvZC4gVXNlZCBiZWZvcmUgZW5jb2RpbmdcbiAqIGRhdGEgYXMgbXNncGFjay4gQ2FsbHMgY2FsbGJhY2sgd2l0aCB0aGUgYmxvYmxlc3MgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmVtb3ZlQmxvYnMgPSBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBfcmVtb3ZlQmxvYnMob2JqLCBjdXJLZXksIGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIG9iajtcblxuICAgIC8vIGNvbnZlcnQgYW55IGJsb2JcbiAgICBpZiAoKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSkge1xuICAgICAgcGVuZGluZ0Jsb2JzKys7XG5cbiAgICAgIC8vIGFzeW5jIGZpbGVyZWFkZXJcbiAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7IC8vIHRoaXMucmVzdWx0ID09IGFycmF5YnVmZmVyXG4gICAgICAgIGlmIChjb250YWluaW5nT2JqZWN0KSB7XG4gICAgICAgICAgY29udGFpbmluZ09iamVjdFtjdXJLZXldID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYmxvYmxlc3NEYXRhID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3RoaW5nIHBlbmRpbmcgaXRzIGNhbGxiYWNrIHRpbWVcbiAgICAgICAgaWYoISAtLXBlbmRpbmdCbG9icykge1xuICAgICAgICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIob2JqKTsgLy8gYmxvYiAtPiBhcnJheWJ1ZmZlclxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7IC8vIGhhbmRsZSBhcnJheVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFpc0J1ZihvYmopKSB7IC8vIGFuZCBvYmplY3RcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHBlbmRpbmdCbG9icyA9IDA7XG4gIHZhciBibG9ibGVzc0RhdGEgPSBkYXRhO1xuICBfcmVtb3ZlQmxvYnMoYmxvYmxlc3NEYXRhKTtcbiAgaWYgKCFwZW5kaW5nQmxvYnMpIHtcbiAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICB9XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGJpbmFyeSA9IHJlcXVpcmUoJy4vYmluYXJ5Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudHlwZXMgPSBbXG4gICdDT05ORUNUJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRVZFTlQnLFxuICAnQUNLJyxcbiAgJ0VSUk9SJyxcbiAgJ0JJTkFSWV9FVkVOVCcsXG4gICdCSU5BUllfQUNLJ1xuXTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkNPTk5FQ1QgPSAwO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRElTQ09OTkVDVCA9IDE7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVZFTlQgPSAyO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBhY2tgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5BQ0sgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVSUk9SID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfRVZFTlQgPSA1O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBiaW5hcnkgYWNrYC4gRm9yIGFja3Mgd2l0aCBiaW5hcnkgYXJndW1lbnRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfQUNLID0gNjtcblxuLyoqXG4gKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxuLyoqXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcblxuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbmNvZGVyKCkge31cblxudmFyIEVSUk9SX1BBQ0tFVCA9IGV4cG9ydHMuRVJST1IgKyAnXCJlbmNvZGUgZXJyb3JcIic7XG5cbi8qKlxuICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBoYW5kbGUgZW5jb2RpbmdzIChsaWtlbHkgZW5naW5lLndyaXRlKVxuICogQHJldHVybiBDYWxscyBjYWxsYmFjayB3aXRoIEFycmF5IG9mIGVuY29kaW5nc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihvYmosIGNhbGxiYWNrKXtcbiAgZGVidWcoJ2VuY29kaW5nIHBhY2tldCAlaicsIG9iaik7XG5cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IG9iai50eXBlKSB7XG4gICAgZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGVuY29kaW5nID0gZW5jb2RlQXNTdHJpbmcob2JqKTtcbiAgICBjYWxsYmFjayhbZW5jb2RpbmddKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iaikge1xuXG4gIC8vIGZpcnN0IGlzIHR5cGVcbiAgdmFyIHN0ciA9ICcnICsgb2JqLnR5cGU7XG5cbiAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyAnLSc7XG4gIH1cblxuICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICBpZiAob2JqLm5zcCAmJiAnLycgIT09IG9iai5uc3ApIHtcbiAgICBzdHIgKz0gb2JqLm5zcCArICcsJztcbiAgfVxuXG4gIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICBzdHIgKz0gb2JqLmlkO1xuICB9XG5cbiAgLy8ganNvbiBkYXRhXG4gIGlmIChudWxsICE9IG9iai5kYXRhKSB7XG4gICAgdmFyIHBheWxvYWQgPSB0cnlTdHJpbmdpZnkob2JqLmRhdGEpO1xuICAgIGlmIChwYXlsb2FkICE9PSBmYWxzZSkge1xuICAgICAgc3RyICs9IHBheWxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBFUlJPUl9QQUNLRVQ7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoJ2VuY29kZWQgJWogYXMgJXMnLCBvYmosIHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHRyeVN0cmluZ2lmeShzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3RyKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjaykge1xuXG4gIGZ1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKSB7XG4gICAgdmFyIGRlY29uc3RydWN0aW9uID0gYmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7XG4gICAgdmFyIHBhY2sgPSBlbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgIHZhciBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcblxuICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICBjYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gIH1cblxuICBiaW5hcnkucmVtb3ZlQmxvYnMob2JqLCB3cml0ZUVuY29kaW5nKTtcbn1cblxuLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIERlY29kZXIoKSB7XG4gIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYCB3aXRoIERlY29kZXIuXG4gKi9cblxuRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkRlY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcGFja2V0O1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICBwYWNrZXQgPSBkZWNvZGVTdHJpbmcob2JqKTtcbiAgICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IHBhY2tldC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gcGFja2V0LnR5cGUpIHsgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG5cbiAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yLnJlY29uUGFjay5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbiAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQnVmKG9iaikgfHwgb2JqLmJhc2U2NCkgeyAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICBpZiAoIXRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICBpZiAocGFja2V0KSB7IC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG9iaik7XG4gIH1cbn07XG5cbi8qKlxuICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBkZWNvZGVTdHJpbmcoc3RyKSB7XG4gIHZhciBpID0gMDtcbiAgLy8gbG9vayB1cCB0eXBlXG4gIHZhciBwID0ge1xuICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKVxuICB9O1xuXG4gIGlmIChudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSkge1xuICAgIHJldHVybiBlcnJvcigndW5rbm93biBwYWNrZXQgdHlwZSAnICsgcC50eXBlKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBwLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBwLnR5cGUpIHtcbiAgICB2YXIgYnVmID0gJyc7XG4gICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gJy0nKSB7XG4gICAgICBidWYgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT09ICctJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGF0dGFjaG1lbnRzJyk7XG4gICAgfVxuICAgIHAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gIGlmICgnLycgPT09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgcC5uc3AgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoJywnID09PSBjKSBicmVhaztcbiAgICAgIHAubnNwICs9IGM7XG4gICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHAubnNwID0gJy8nO1xuICB9XG5cbiAgLy8gbG9vayB1cCBpZFxuICB2YXIgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICBpZiAoJycgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICBwLmlkID0gJyc7XG4gICAgd2hpbGUgKCsraSkge1xuICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAtLWk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcC5pZCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgICBwLmlkID0gTnVtYmVyKHAuaWQpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgIHZhciBwYXlsb2FkID0gdHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgdmFyIGlzUGF5bG9hZFZhbGlkID0gcGF5bG9hZCAhPT0gZmFsc2UgJiYgKHAudHlwZSA9PT0gZXhwb3J0cy5FUlJPUiB8fCBpc0FycmF5KHBheWxvYWQpKTtcbiAgICBpZiAoaXNQYXlsb2FkVmFsaWQpIHtcbiAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlcnJvcignaW52YWxpZCBwYXlsb2FkJyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoJ2RlY29kZWQgJXMgYXMgJWonLCBzdHIsIHApO1xuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gdHJ5UGFyc2Uoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXG4gKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICogZGVjb2RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCkge1xuICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgdGhpcy5idWZmZXJzID0gW107XG59XG5cbi8qKlxuICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxuICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS50YWtlQmluYXJ5RGF0YSA9IGZ1bmN0aW9uKGJpbkRhdGEpIHtcbiAgdGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7XG4gIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykgeyAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICB2YXIgcGFja2V0ID0gYmluYXJ5LnJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgIHRoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgIHJldHVybiBwYWNrZXQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS5maW5pc2hlZFJlY29uc3RydWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgdGhpcy5idWZmZXJzID0gW107XG59O1xuXG5mdW5jdGlvbiBlcnJvcihtc2cpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBleHBvcnRzLkVSUk9SLFxuICAgIGRhdGE6ICdwYXJzZXIgZXJyb3I6ICcgKyBtc2dcbiAgfTtcbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqXG4gKiBMb2dpYyBib3Jyb3dlZCBmcm9tIE1vZGVybml6cjpcbiAqXG4gKiAgIC0gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2NvcnMuanNcbiAqL1xuXG50cnkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn0gY2F0Y2ggKGVycikge1xuICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gIC8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xufVxuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcblxudmFyIGhhc0NPUlMgPSByZXF1aXJlKCdoYXMtY29ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAvLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG4gIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKSB7XG4gICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICBpZiAoIXhkb21haW4pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBzZWxmW1snQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG59O1xuIiwiXG4vKipcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzIChvYmope1xuICB2YXIgYXJyID0gW107XG4gIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwgaSkpIHtcbiAgICAgIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLyogZ2xvYmFsIEJsb2IgRmlsZSAqL1xuXG4vKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXSc7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXG4gKlxuICogU3VwcG9ydHMgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQmxvYiBhbmQgRmlsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaGFzQmluYXJ5IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBCdWZmZXIuaXNCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHxcbiAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG4gIGlmIChvYmoudG9KU09OICYmIHR5cGVvZiBvYmoudG9KU09OID09PSAnZnVuY3Rpb24nICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgZW5kID0gZW5kIHx8IGJ5dGVzO1xuXG4gIGlmIChhcnJheWJ1ZmZlci5zbGljZSkgeyByZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7IH1cblxuICBpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPCAwKSB7IGVuZCArPSBieXRlczsgfVxuICBpZiAoZW5kID4gYnl0ZXMpIHsgZW5kID0gYnl0ZXM7IH1cblxuICBpZiAoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgfVxuXG4gIHZhciBhYnYgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7XG4gIGZvciAodmFyIGkgPSBzdGFydCwgaWkgPSAwOyBpIDwgZW5kOyBpKyssIGlpKyspIHtcbiAgICByZXN1bHRbaWldID0gYWJ2W2ldO1xuICB9XG4gIHJldHVybiByZXN1bHQuYnVmZmVyO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYWZ0ZXJcblxuZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrLCBlcnJfY2IpIHtcbiAgICB2YXIgYmFpbCA9IGZhbHNlXG4gICAgZXJyX2NiID0gZXJyX2NiIHx8IG5vb3BcbiAgICBwcm94eS5jb3VudCA9IGNvdW50XG5cbiAgICByZXR1cm4gKGNvdW50ID09PSAwKSA/IGNhbGxiYWNrKCkgOiBwcm94eVxuXG4gICAgZnVuY3Rpb24gcHJveHkoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgaWYgKHByb3h5LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWZ0ZXIgY2FsbGVkIHRvbyBtYW55IHRpbWVzJylcbiAgICAgICAgfVxuICAgICAgICAtLXByb3h5LmNvdW50XG5cbiAgICAgICAgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYmFpbCA9IHRydWVcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGVycl9jYlxuICAgICAgICB9IGVsc2UgaWYgKHByb3h5LmNvdW50ID09PSAwICYmICFiYWlsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMS4yIGJ5IEBtYXRoaWFzICovXG5cbnZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4vLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXHR2YXIgY291bnRlciA9IDA7XG5cdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHR2YXIgdmFsdWU7XG5cdHZhciBleHRyYTtcblx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5mdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdHZhciBpbmRleCA9IC0xO1xuXHR2YXIgdmFsdWU7XG5cdHZhciBvdXRwdXQgPSAnJztcblx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHR2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHR9XG5cdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkge1xuXHRpZiAoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB7XG5cdFx0aWYgKHN0cmljdCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoXG5cdFx0XHRcdCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgK1xuXHRcdFx0XHQnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZSdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBjcmVhdGVCeXRlKGNvZGVQb2ludCwgc2hpZnQpIHtcblx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiBzaGlmdCkgJiAweDNGKSB8IDB4ODApO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGRjgwKSA9PSAwKSB7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxuXHRcdHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0fVxuXHR2YXIgc3ltYm9sID0gJyc7XG5cdGlmICgoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCkgeyAvLyAyLWJ5dGUgc2VxdWVuY2Vcblx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gNikgJiAweDFGKSB8IDB4QzApO1xuXHR9XG5cdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKSB7IC8vIDMtYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICghY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkpIHtcblx0XHRcdGNvZGVQb2ludCA9IDB4RkZGRDtcblx0XHR9XG5cdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDEyKSAmIDB4MEYpIHwgMHhFMCk7XG5cdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0fVxuXHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCkgeyAvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTgpICYgMHgwNykgfCAweEYwKTtcblx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDEyKTtcblx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHR9XG5cdHN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoKGNvZGVQb2ludCAmIDB4M0YpIHwgMHg4MCk7XG5cdHJldHVybiBzeW1ib2w7XG59XG5cbmZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nLCBvcHRzKSB7XG5cdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdHZhciBjb2RlUG9pbnRzID0gdWNzMmRlY29kZShzdHJpbmcpO1xuXHR2YXIgbGVuZ3RoID0gY29kZVBvaW50cy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IC0xO1xuXHR2YXIgY29kZVBvaW50O1xuXHR2YXIgYnl0ZVN0cmluZyA9ICcnO1xuXHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdGNvZGVQb2ludCA9IGNvZGVQb2ludHNbaW5kZXhdO1xuXHRcdGJ5dGVTdHJpbmcgKz0gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KTtcblx0fVxuXHRyZXR1cm4gYnl0ZVN0cmluZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIHJlYWRDb250aW51YXRpb25CeXRlKCkge1xuXHRpZiAoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCkge1xuXHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0fVxuXG5cdHZhciBjb250aW51YXRpb25CeXRlID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRieXRlSW5kZXgrKztcblxuXHRpZiAoKGNvbnRpbnVhdGlvbkJ5dGUgJiAweEMwKSA9PSAweDgwKSB7XG5cdFx0cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO1xuXHR9XG5cblx0Ly8gSWYgd2UgZW5kIHVwIGhlcmUsIGl04oCZcyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxuXHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVTeW1ib2woc3RyaWN0KSB7XG5cdHZhciBieXRlMTtcblx0dmFyIGJ5dGUyO1xuXHR2YXIgYnl0ZTM7XG5cdHZhciBieXRlNDtcblx0dmFyIGNvZGVQb2ludDtcblxuXHRpZiAoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KSB7XG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHR9XG5cblx0aWYgKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBSZWFkIGZpcnN0IGJ5dGVcblx0Ynl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdGJ5dGVJbmRleCsrO1xuXG5cdC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuXHRpZiAoKGJ5dGUxICYgMHg4MCkgPT0gMCkge1xuXHRcdHJldHVybiBieXRlMTtcblx0fVxuXG5cdC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRpZiAoKGJ5dGUxICYgMHhFMCkgPT0gMHhDMCkge1xuXHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgxRikgPDwgNikgfCBieXRlMjtcblx0XHRpZiAoY29kZVBvaW50ID49IDB4ODApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuXHRpZiAoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCkge1xuXHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MEYpIDw8IDEyKSB8IChieXRlMiA8PCA2KSB8IGJ5dGUzO1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwODAwKSB7XG5cdFx0XHRyZXR1cm4gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkgPyBjb2RlUG9pbnQgOiAweEZGRkQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gNC1ieXRlIHNlcXVlbmNlXG5cdGlmICgoYnl0ZTEgJiAweEY4KSA9PSAweEYwKSB7XG5cdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MDcpIDw8IDB4MTIpIHwgKGJ5dGUyIDw8IDB4MEMpIHxcblx0XHRcdChieXRlMyA8PCAweDA2KSB8IGJ5dGU0O1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwMTAwMDAgJiYgY29kZVBvaW50IDw9IDB4MTBGRkZGKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdH1cblx0fVxuXG5cdHRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7XG59XG5cbnZhciBieXRlQXJyYXk7XG52YXIgYnl0ZUNvdW50O1xudmFyIGJ5dGVJbmRleDtcbmZ1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZywgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblx0dmFyIHN0cmljdCA9IGZhbHNlICE9PSBvcHRzLnN0cmljdDtcblxuXHRieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuXHRieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO1xuXHRieXRlSW5kZXggPSAwO1xuXHR2YXIgY29kZVBvaW50cyA9IFtdO1xuXHR2YXIgdG1wO1xuXHR3aGlsZSAoKHRtcCA9IGRlY29kZVN5bWJvbChzdHJpY3QpKSAhPT0gZmFsc2UpIHtcblx0XHRjb2RlUG9pbnRzLnB1c2godG1wKTtcblx0fVxuXHRyZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHZlcnNpb246ICcyLjEuMicsXG5cdGVuY29kZTogdXRmOGVuY29kZSxcblx0ZGVjb2RlOiB1dGY4ZGVjb2RlXG59O1xuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuXG4gIC8vIFVzZSBhIGxvb2t1cCB0YWJsZSB0byBmaW5kIHRoZSBpbmRleC5cbiAgdmFyIGxvb2t1cCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICB9XG5cbiAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcikge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSxcbiAgICBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9IFwiXCI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuXG4gICAgaWYgKChsZW4gJSAzKSA9PT0gMikge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjtcbiAgICB9IGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgXCI9PVwiO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjQ7XG4gIH07XG5cbiAgZXhwb3J0cy5kZWNvZGUgPSAgZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LFxuICAgIGxlbiA9IGJhc2U2NC5sZW5ndGgsIGksIHAgPSAwLFxuICAgIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuXG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09IFwiPVwiKSB7XG4gICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIikge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSxcbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTQpIHtcbiAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMSldO1xuICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsyKV07XG4gICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzMpXTtcblxuICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG4gIH07XG59KSgpO1xuIiwiLyoqXHJcbiAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XHJcbiAqL1xyXG5cclxudmFyIEJsb2JCdWlsZGVyID0gdHlwZW9mIEJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IEJsb2JCdWlsZGVyIDpcclxuICB0eXBlb2YgV2ViS2l0QmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gV2ViS2l0QmxvYkJ1aWxkZXIgOlxyXG4gIHR5cGVvZiBNU0Jsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IE1TQmxvYkJ1aWxkZXIgOlxyXG4gIHR5cGVvZiBNb3pCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBNb3pCbG9iQnVpbGRlciA6IFxyXG4gIGZhbHNlO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3IgaXMgc3VwcG9ydGVkXHJcbiAqL1xyXG5cclxudmFyIGJsb2JTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XHJcbiAgdHJ5IHtcclxuICAgIHZhciBhID0gbmV3IEJsb2IoWydoaSddKTtcclxuICAgIHJldHVybiBhLnNpemUgPT09IDI7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3Igc3VwcG9ydHMgQXJyYXlCdWZmZXJWaWV3c1xyXG4gKiBGYWlscyBpbiBTYWZhcmkgNiwgc28gd2UgbmVlZCB0byBtYXAgdG8gQXJyYXlCdWZmZXJzIHRoZXJlLlxyXG4gKi9cclxuXHJcbnZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPSBibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbigpIHtcclxuICB0cnkge1xyXG4gICAgdmFyIGIgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsMl0pXSk7XHJcbiAgICByZXR1cm4gYi5zaXplID09PSAyO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcclxuICovXHJcblxyXG52YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQgPSBCbG9iQnVpbGRlclxyXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmRcclxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXHJcbiAqIFVzZWQgYnkgQmxvYkJ1aWxkZXIgY29uc3RydWN0b3IgYW5kIG9sZCBicm93c2VycyB0aGF0IGRpZG4ndFxyXG4gKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSB7XHJcbiAgcmV0dXJuIGFyeS5tYXAoZnVuY3Rpb24oY2h1bmspIHtcclxuICAgIGlmIChjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICB2YXIgYnVmID0gY2h1bmsuYnVmZmVyO1xyXG5cclxuICAgICAgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XHJcbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN1YmFycmF5IHJlZ2lvbiBmcm9tIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxyXG4gICAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCAhPT0gYnVmLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICB2YXIgY29weSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZiwgY2h1bmsuYnl0ZU9mZnNldCwgY2h1bmsuYnl0ZUxlbmd0aCkpO1xyXG4gICAgICAgIGJ1ZiA9IGNvcHkuYnVmZmVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjaHVuaztcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgdmFyIGJiID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcbiAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpLmZvckVhY2goZnVuY3Rpb24ocGFydCkge1xyXG4gICAgYmIuYXBwZW5kKHBhcnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gKG9wdGlvbnMudHlwZSkgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBCbG9iQ29uc3RydWN0b3IoYXJ5LCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBCbG9iKG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSwgb3B0aW9ucyB8fCB7fSk7XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgQmxvYkJ1aWxkZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBCbG9iLnByb3RvdHlwZTtcclxuICBCbG9iQ29uc3RydWN0b3IucHJvdG90eXBlID0gQmxvYi5wcm90b3R5cGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG4gIGlmIChibG9iU3VwcG9ydGVkKSB7XHJcbiAgICByZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID8gQmxvYiA6IEJsb2JDb25zdHJ1Y3RvcjtcclxuICB9IGVsc2UgaWYgKGJsb2JCdWlsZGVyU3VwcG9ydGVkKSB7XHJcbiAgICByZXR1cm4gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcjtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn0pKCk7XHJcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xudmFyIGhhc0JpbmFyeSA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG52YXIgc2xpY2VCdWZmZXIgPSByZXF1aXJlKCdhcnJheWJ1ZmZlci5zbGljZScpO1xudmFyIGFmdGVyID0gcmVxdWlyZSgnYWZ0ZXInKTtcbnZhciB1dGY4ID0gcmVxdWlyZSgnLi91dGY4Jyk7XG5cbnZhciBiYXNlNjRlbmNvZGVyO1xuaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgYmFzZTY0ZW5jb2RlciA9IHJlcXVpcmUoJ2Jhc2U2NC1hcnJheWJ1ZmZlcicpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGFuIGFuZHJvaWQgYnJvd3Nlci4gVGhhdCByZXF1aXJlcyB1cyB0byB1c2VcbiAqIEFycmF5QnVmZmVyIHdpdGggcG9sbGluZyB0cmFuc3BvcnRzLi4uXG4gKlxuICogaHR0cDovL2doaW5kYS5uZXQvanBlZy1ibG9iLWFqYXgtYW5kcm9pZC9cbiAqL1xuXG52YXIgaXNBbmRyb2lkID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL0FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cbiAqIFVwbG9hZGluZyBhIEJsb2Igd2l0aCBQaGFudG9tSlMgZG9lcyBub3Qgd29yayBjb3JyZWN0bHksIGFzIHJlcG9ydGVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgaXNQaGFudG9tSlMgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBkb250U2VuZEJsb2JzID0gaXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvdG9jb2wgdmVyc2lvbi5cbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKi9cblxudmFyIHBhY2tldHMgPSBleHBvcnRzLnBhY2tldHMgPSB7XG4gICAgb3BlbjogICAgIDAgICAgLy8gbm9uLXdzXG4gICwgY2xvc2U6ICAgIDEgICAgLy8gbm9uLXdzXG4gICwgcGluZzogICAgIDJcbiAgLCBwb25nOiAgICAgM1xuICAsIG1lc3NhZ2U6ICA0XG4gICwgdXBncmFkZTogIDVcbiAgLCBub29wOiAgICAgNlxufTtcblxudmFyIHBhY2tldHNsaXN0ID0ga2V5cyhwYWNrZXRzKTtcblxuLyoqXG4gKiBQcmVtYWRlIGVycm9yIHBhY2tldC5cbiAqL1xuXG52YXIgZXJyID0geyB0eXBlOiAnZXJyb3InLCBkYXRhOiAncGFyc2VyIGVycm9yJyB9O1xuXG4vKipcbiAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovXG5cbnZhciBCbG9iID0gcmVxdWlyZSgnYmxvYicpO1xuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQuXG4gKlxuICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDVoZWxsbyB3b3JsZFxuICogICAgIDNcbiAqICAgICA0XG4gKlxuICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHV0ZjhlbmNvZGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHV0ZjhlbmNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHV0ZjhlbmNvZGU7XG4gICAgdXRmOGVuY29kZSA9IG51bGw7XG4gIH1cblxuICB2YXIgZGF0YSA9IChwYWNrZXQuZGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiBwYWNrZXQuZGF0YS5idWZmZXIgfHwgcGFja2V0LmRhdGE7XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICByZXR1cm4gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBtaWdodCBiZSBhbiBvYmplY3Qgd2l0aCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgaWYgKGRhdGEgJiYgZGF0YS5iYXNlNjQpIHtcbiAgICByZXR1cm4gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG4gIHZhciBlbmNvZGVkID0gcGFja2V0c1twYWNrZXQudHlwZV07XG5cbiAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuICBpZiAodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSkge1xuICAgIGVuY29kZWQgKz0gdXRmOGVuY29kZSA/IHV0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSksIHsgc3RyaWN0OiBmYWxzZSB9KSA6IFN0cmluZyhwYWNrZXQuZGF0YSk7XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2soJycgKyBlbmNvZGVkKTtcblxufTtcblxuZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgLy8gcGFja2V0IGRhdGEgaXMgYW4gb2JqZWN0IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBoZWxwZXJzIGZvciBiaW5hcnkgdHlwZXNcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGRhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIGNvbnRlbnRBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgcmVzdWx0QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7XG5cbiAgcmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0QnVmZmVyW2krMV0gPSBjb250ZW50QXJyYXlbaV07XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2socmVzdWx0QnVmZmVyLmJ1ZmZlcik7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldCh7IHR5cGU6IHBhY2tldC50eXBlLCBkYXRhOiBmci5yZXN1bHQgfSwgc3VwcG9ydHNCaW5hcnksIHRydWUsIGNhbGxiYWNrKTtcbiAgfTtcbiAgcmV0dXJuIGZyLnJlYWRBc0FycmF5QnVmZmVyKHBhY2tldC5kYXRhKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKGRvbnRTZW5kQmxvYnMpIHtcbiAgICByZXR1cm4gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IG5ldyBVaW50OEFycmF5KDEpO1xuICBsZW5ndGhbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgdmFyIGJsb2IgPSBuZXcgQmxvYihbbGVuZ3RoLmJ1ZmZlciwgcGFja2V0LmRhdGFdKTtcblxuICByZXR1cm4gY2FsbGJhY2soYmxvYik7XG59XG5cbi8qKlxuICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQsIGhhcyBgdHlwZWAgYW5kIGBkYXRhYFxuICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGI2NCA9IGZyLnJlc3VsdC5zcGxpdCgnLCcpWzFdO1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSArIGI2NCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnIucmVhZEFzRGF0YVVSTChwYWNrZXQuZGF0YSk7XG4gIH1cblxuICB2YXIgYjY0ZGF0YTtcbiAgdHJ5IHtcbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgd2l0aCB0eXBlZCBhcnJheXNcbiAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSk7XG4gICAgdmFyIGJhc2ljID0gbmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgYmFzaWNbaV0gPSB0eXBlZFtpXTtcbiAgICB9XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYmFzaWMpO1xuICB9XG4gIG1lc3NhZ2UgKz0gYnRvYShiNjRkYXRhKTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufTtcblxuLyoqXG4gKiBEZWNvZGVzIGEgcGFja2V0LiBDaGFuZ2VzIGZvcm1hdCB0byBCbG9iIGlmIHJlcXVlc3RlZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIHV0ZjhkZWNvZGUpIHtcbiAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbiAgLy8gU3RyaW5nIGRhdGFcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIGlmIChkYXRhLmNoYXJBdCgwKSA9PT0gJ2InKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQoZGF0YS5zdWJzdHIoMSksIGJpbmFyeVR5cGUpO1xuICAgIH1cblxuICAgIGlmICh1dGY4ZGVjb2RlKSB7XG4gICAgICBkYXRhID0gdHJ5RGVjb2RlKGRhdGEpO1xuICAgICAgaWYgKGRhdGEgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0eXBlID0gZGF0YS5jaGFyQXQoMCk7XG5cbiAgICBpZiAoTnVtYmVyKHR5cGUpICE9IHR5cGUgfHwgIXBhY2tldHNsaXN0W3R5cGVdKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiBkYXRhLnN1YnN0cmluZygxKSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBhc0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gIHZhciB0eXBlID0gYXNBcnJheVswXTtcbiAgdmFyIHJlc3QgPSBzbGljZUJ1ZmZlcihkYXRhLCAxKTtcbiAgaWYgKEJsb2IgJiYgYmluYXJ5VHlwZSA9PT0gJ2Jsb2InKSB7XG4gICAgcmVzdCA9IG5ldyBCbG9iKFtyZXN0XSk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IHJlc3QgfTtcbn07XG5cbmZ1bmN0aW9uIHRyeURlY29kZShkYXRhKSB7XG4gIHRyeSB7XG4gICAgZGF0YSA9IHV0ZjguZGVjb2RlKGRhdGEsIHsgc3RyaWN0OiBmYWxzZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBEZWNvZGVzIGEgcGFja2V0IGVuY29kZWQgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxuICovXG5cbmV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24obXNnLCBiaW5hcnlUeXBlKSB7XG4gIHZhciB0eXBlID0gcGFja2V0c2xpc3RbbXNnLmNoYXJBdCgwKV07XG4gIGlmICghYmFzZTY0ZW5jb2Rlcikge1xuICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBtc2cuc3Vic3RyKDEpIH0gfTtcbiAgfVxuXG4gIHZhciBkYXRhID0gYmFzZTY0ZW5jb2Rlci5kZWNvZGUobXNnLnN1YnN0cigxKSk7XG5cbiAgaWYgKGJpbmFyeVR5cGUgPT09ICdibG9iJyAmJiBCbG9iKSB7XG4gICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gIH1cblxuICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH07XG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxuICpcbiAqICAgICA8bGVuZ3RoPjpkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgMTE6aGVsbG8gd29ybGQyOmhpXG4gKlxuICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcbiAqIGVuY29kZWQgc3RyaW5ncyBhcmUgbWFya2VkIHdpdGggYSBiIGJlZm9yZSB0aGUgbGVuZ3RoIHNwZWNpZmllclxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChwYWNrZXRzLCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBudWxsO1xuICB9XG5cbiAgdmFyIGlzQmluYXJ5ID0gaGFzQmluYXJ5KHBhY2tldHMpO1xuXG4gIGlmIChzdXBwb3J0c0JpbmFyeSAmJiBpc0JpbmFyeSkge1xuICAgIGlmIChCbG9iICYmICFkb250U2VuZEJsb2JzKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlcihwYWNrZXRzLCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCcwOicpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5sZW5ndGggKyAnOicgKyBtZXNzYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCAhaXNCaW5hcnkgPyBmYWxzZSA6IHN1cHBvcnRzQmluYXJ5LCBmYWxzZSwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0cy5qb2luKCcnKSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBBc3luYyBhcnJheSBtYXAgdXNpbmcgYWZ0ZXJcbiAqL1xuXG5mdW5jdGlvbiBtYXAoYXJ5LCBlYWNoLCBkb25lKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoYXJ5Lmxlbmd0aCk7XG4gIHZhciBuZXh0ID0gYWZ0ZXIoYXJ5Lmxlbmd0aCwgZG9uZSk7XG5cbiAgdmFyIGVhY2hXaXRoSW5kZXggPSBmdW5jdGlvbihpLCBlbCwgY2IpIHtcbiAgICBlYWNoKGVsLCBmdW5jdGlvbihlcnJvciwgbXNnKSB7XG4gICAgICByZXN1bHRbaV0gPSBtc2c7XG4gICAgICBjYihlcnJvciwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgIGVhY2hXaXRoSW5kZXgoaSwgYXJ5W2ldLCBuZXh0KTtcbiAgfVxufVxuXG4vKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXG4gKiBkZWNvZGVkIGZyb20gdGhlaXIgYmFzZTY0IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBheWxvYWQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgcGFja2V0O1xuICBpZiAoZGF0YSA9PT0gJycpIHtcbiAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gJycsIG4sIG1zZztcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNociA9IGRhdGEuY2hhckF0KGkpO1xuXG4gICAgaWYgKGNociAhPT0gJzonKSB7XG4gICAgICBsZW5ndGggKz0gY2hyO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gJycgfHwgKGxlbmd0aCAhPSAobiA9IE51bWJlcihsZW5ndGgpKSkpIHtcbiAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgIH1cblxuICAgIG1zZyA9IGRhdGEuc3Vic3RyKGkgKyAxLCBuKTtcblxuICAgIGlmIChsZW5ndGggIT0gbXNnLmxlbmd0aCkge1xuICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKG1zZy5sZW5ndGgpIHtcbiAgICAgIHBhY2tldCA9IGV4cG9ydHMuZGVjb2RlUGFja2V0KG1zZywgYmluYXJ5VHlwZSwgZmFsc2UpO1xuXG4gICAgICBpZiAoZXJyLnR5cGUgPT09IHBhY2tldC50eXBlICYmIGVyci5kYXRhID09PSBwYWNrZXQuZGF0YSkge1xuICAgICAgICAvLyBwYXJzZXIgZXJyb3IgaW4gaW5kaXZpZHVhbCBwYWNrZXQgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmV0ID0gY2FsbGJhY2socGFja2V0LCBpICsgbiwgbCk7XG4gICAgICBpZiAoZmFsc2UgPT09IHJldCkgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkdmFuY2UgY3Vyc29yXG4gICAgaSArPSBuO1xuICAgIGxlbmd0aCA9ICcnO1xuICB9XG5cbiAgaWYgKGxlbmd0aCAhPT0gJycpIHtcbiAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKSBhcyBiaW5hcnkuXG4gKlxuICogPDEgPSBiaW5hcnksIDAgPSBzdHJpbmc+PG51bWJlciBmcm9tIDAtOT48bnVtYmVyIGZyb20gMC05PlsuLi5dPG51bWJlclxuICogMjU1PjxkYXRhPlxuICpcbiAqIEV4YW1wbGU6XG4gKiAxIDMgMjU1IDEgMiAzLCBpZiB0aGUgYmluYXJ5IGNvbnRlbnRzIGFyZSBpbnRlcnByZXRlZCBhcyA4IGJpdCBpbnRlZ2Vyc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBlbmNvZGVkIHBheWxvYWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBBcnJheUJ1ZmZlcigwKSk7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBkb25lQ2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIGVuY29kZWRQYWNrZXRzKSB7XG4gICAgdmFyIHRvdGFsTGVuZ3RoID0gZW5jb2RlZFBhY2tldHMucmVkdWNlKGZ1bmN0aW9uKGFjYywgcCkge1xuICAgICAgdmFyIGxlbjtcbiAgICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycpe1xuICAgICAgICBsZW4gPSBwLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IHAuYnl0ZUxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2MgKyBsZW4udG9TdHJpbmcoKS5sZW5ndGggKyBsZW4gKyAyOyAvLyBzdHJpbmcvYmluYXJ5IGlkZW50aWZpZXIgKyBzZXBhcmF0b3IgPSAyXG4gICAgfSwgMCk7XG5cbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7XG5cbiAgICB2YXIgYnVmZmVySW5kZXggPSAwO1xuICAgIGVuY29kZWRQYWNrZXRzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHAgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGFiID0gcDtcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KHAubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYiA9IHZpZXcuYnVmZmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTdHJpbmcpIHsgLy8gbm90IHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDtcbiAgICAgIH0gZWxzZSB7IC8vIHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlblN0ciA9IGFiLmJ5dGVMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMjU1O1xuXG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0QXJyYXkuYnVmZmVyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEVuY29kZSBhcyBCbG9iXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihlbmNvZGVkKSB7XG4gICAgICB2YXIgYmluYXJ5SWRlbnRpZmllciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDE7XG4gICAgICBpZiAodHlwZW9mIGVuY29kZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW5jb2RlZC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gZW5jb2RlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGVuY29kZWQgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW4gPSAoZW5jb2RlZCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKVxuICAgICAgICA/IGVuY29kZWQuYnl0ZUxlbmd0aFxuICAgICAgICA6IGVuY29kZWQuc2l6ZTtcblxuICAgICAgdmFyIGxlblN0ciA9IGxlbi50b1N0cmluZygpO1xuICAgICAgdmFyIGxlbmd0aEFyeSA9IG5ldyBVaW50OEFycmF5KGxlblN0ci5sZW5ndGggKyAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxlbmd0aEFyeVtpXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICBsZW5ndGhBcnlbbGVuU3RyLmxlbmd0aF0gPSAyNTU7XG5cbiAgICAgIGlmIChCbG9iKSB7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2JpbmFyeUlkZW50aWZpZXIuYnVmZmVyLCBsZW5ndGhBcnkuYnVmZmVyLCBlbmNvZGVkXSk7XG4gICAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBibG9iKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQmxvYihyZXN1bHRzKSk7XG4gIH0pO1xufTtcblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gU3RyaW5ncyBhcmUgZGVjb2RlZCBieVxuICogaW50ZXJwcmV0aW5nIGVhY2ggYnl0ZSBhcyBhIGtleSBjb2RlIGZvciBlbnRyaWVzIG1hcmtlZCB0byBzdGFydCB3aXRoIDAuIFNlZVxuICogZGVzY3JpcHRpb24gb2YgZW5jb2RlUGF5bG9hZEFzQmluYXJ5XG4gKlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBidWZmZXJUYWlsID0gZGF0YTtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcblxuICB3aGlsZSAoYnVmZmVyVGFpbC5ieXRlTGVuZ3RoID4gMCkge1xuICAgIHZhciB0YWlsQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJUYWlsKTtcbiAgICB2YXIgaXNTdHJpbmcgPSB0YWlsQXJyYXlbMF0gPT09IDA7XG4gICAgdmFyIG1zZ0xlbmd0aCA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IDsgaSsrKSB7XG4gICAgICBpZiAodGFpbEFycmF5W2ldID09PSAyNTUpIGJyZWFrO1xuXG4gICAgICAvLyAzMTAgPSBjaGFyIGxlbmd0aCBvZiBOdW1iZXIuTUFYX1ZBTFVFXG4gICAgICBpZiAobXNnTGVuZ3RoLmxlbmd0aCA+IDMxMCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgbXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTtcbiAgICB9XG5cbiAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgMiArIG1zZ0xlbmd0aC5sZW5ndGgpO1xuICAgIG1zZ0xlbmd0aCA9IHBhcnNlSW50KG1zZ0xlbmd0aCk7XG5cbiAgICB2YXIgbXNnID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgMCwgbXNnTGVuZ3RoKTtcbiAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG1zZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkobXNnKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHRvIHR5cGVkIGFycmF5c1xuICAgICAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShtc2cpO1xuICAgICAgICBtc2cgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1zZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHR5cGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGJ1ZmZlcnMucHVzaChtc2cpO1xuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCBtc2dMZW5ndGgpO1xuICB9XG5cbiAgdmFyIHRvdGFsID0gYnVmZmVycy5sZW5ndGg7XG4gIGJ1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbihidWZmZXIsIGkpIHtcbiAgICBjYWxsYmFjayhleHBvcnRzLmRlY29kZVBhY2tldChidWZmZXIsIGJpbmFyeVR5cGUsIHRydWUpLCBpLCB0b3RhbCk7XG4gIH0pO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuXG4vKipcbiAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFRyYW5zcG9ydCAob3B0cykge1xuICB0aGlzLnBhdGggPSBvcHRzLnBhdGg7XG4gIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQ7XG4gIHRoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbTtcbiAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLndpdGhDcmVkZW50aWFscyA9IG9wdHMud2l0aENyZWRlbnRpYWxzO1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgdGhpcy5mb3JjZU5vZGUgPSBvcHRzLmZvcmNlTm9kZTtcblxuICAvLyByZXN1bHRzIG9mIFJlYWN0TmF0aXZlIGVudmlyb25tZW50IGRldGVjdGlvblxuICB0aGlzLmlzUmVhY3ROYXRpdmUgPSBvcHRzLmlzUmVhY3ROYXRpdmU7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRW1pdHMgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKG1zZywgZGVzYykge1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci50eXBlID0gJ1RyYW5zcG9ydEVycm9yJztcbiAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICAgIHRoaXMuZG9PcGVuKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgdGhpcy5vbkNsb3NlKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IG5vdCBvcGVuJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gb3BlblxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgcGFja2V0ID0gcGFyc2VyLmRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcbiIsIi8qKlxyXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXHJcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gIHZhciBzdHIgPSAnJztcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgaWYgKHN0ci5sZW5ndGgpIHN0ciArPSAnJic7XHJcbiAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzdHI7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHFzKXtcclxuICB2YXIgcXJ5ID0ge307XHJcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgfVxyXG4gIHJldHVybiBxcnk7XHJcbn07XHJcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLCBiKXtcbiAgdmFyIGZuID0gZnVuY3Rpb24oKXt9O1xuICBmbi5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcbiAgYS5wcm90b3R5cGUgPSBuZXcgZm47XG4gIGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gYTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgeWVhc3QgPSByZXF1aXJlKCd5ZWFzdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nO1xuXG4vKipcbiAqIElzIFhIUjIgc3VwcG9ydGVkP1xuICovXG5cbnZhciBoYXNYSFIyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoeyB4ZG9tYWluOiBmYWxzZSB9KTtcbiAgcmV0dXJuIG51bGwgIT0geGhyLnJlc3BvbnNlVHlwZTtcbn0pKCk7XG5cbi8qKlxuICogUG9sbGluZyBpbnRlcmZhY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmICghaGFzWEhSMiB8fCBmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAqL1xuXG5pbmhlcml0KFBvbGxpbmcsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdwb2xsaW5nJztcblxuLyoqXG4gKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucG9sbCgpO1xufTtcblxuLyoqXG4gKiBQYXVzZXMgcG9sbGluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKG9uUGF1c2UpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztcblxuICBmdW5jdGlvbiBwYXVzZSAoKSB7XG4gICAgZGVidWcoJ3BhdXNlZCcpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgIG9uUGF1c2UoKTtcbiAgfVxuXG4gIGlmICh0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ3BvbGxDb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhdXNlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygncG9sbGluZycpO1xuICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICB0aGlzLmRvUG9sbCgpO1xuICB0aGlzLmVtaXQoJ3BvbGwnKTtcbn07XG5cbi8qKlxuICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBkZWJ1ZygncG9sbGluZyBnb3QgZGF0YSAlcycsIGRhdGEpO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAocGFja2V0LCBpbmRleCwgdG90YWwpIHtcbiAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgaWYgKCdvcGVuaW5nJyA9PT0gc2VsZi5yZWFkeVN0YXRlKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICBpZiAoJ2Nsb3NlJyA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLy8gZGVjb2RlIHBheWxvYWRcbiAgcGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuXG4gIC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG4gIGlmICgnY2xvc2VkJyAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BvbGxDb21wbGV0ZScpO1xuXG4gICAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICB0aGlzLnBvbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICBkZWJ1Zygnd3JpdGluZyBjbG9zZSBwYWNrZXQnKTtcbiAgICBzZWxmLndyaXRlKFt7IHR5cGU6ICdjbG9zZScgfV0pO1xuICB9XG5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO1xuICAgIGNsb3NlKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgIGRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTtcbiAgICB0aGlzLm9uY2UoJ29wZW4nLCBjbG9zZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgcGFja2V0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gIHZhciBjYWxsYmFja2ZuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgfTtcblxuICBwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHNlbGYuZG9Xcml0ZShkYXRhLCBjYWxsYmFja2ZuKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gIGlmIChmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnaHR0cHMnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAgKCdodHRwJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgfVxuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG4iLCIvKiBnbG9iYWwgYXR0YWNoRXZlbnQgKi9cblxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcbm1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEVtcHR5IGZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkgKCkge31cblxuLyoqXG4gKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBYSFIgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB0aGlzLnhkID0gKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KFhIUiwgUG9sbGluZyk7XG5cbi8qKlxuICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICovXG5cblhIUi5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBvcHRzLnVyaSA9IHRoaXMudXJpKCk7XG4gIG9wdHMueGQgPSB0aGlzLnhkO1xuICBvcHRzLnhzID0gdGhpcy54cztcbiAgb3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7XG4gIG9wdHMuc3VwcG9ydHNCaW5hcnkgPSB0aGlzLnN1cHBvcnRzQmluYXJ5O1xuICBvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7XG4gIG9wdHMud2l0aENyZWRlbnRpYWxzID0gdGhpcy53aXRoQ3JlZGVudGlhbHM7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBvcHRzLnJlcXVlc3RUaW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLmV4dHJhSGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuXG4gIHJldHVybiBuZXcgUmVxdWVzdChvcHRzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgdmFyIGlzQmluYXJ5ID0gdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGRhdGEgIT09IHVuZGVmaW5lZDtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiBkYXRhLCBpc0JpbmFyeTogaXNCaW5hcnkgfSk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdzdWNjZXNzJywgZm4pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvc3QgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5zZW5kWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygneGhyIHBvbGwnKTtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgc2VsZi5vbkRhdGEoZGF0YSk7XG4gIH0pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvbGwgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5wb2xsWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdCAob3B0cykge1xuICB0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO1xuICB0aGlzLnVyaSA9IG9wdHMudXJpO1xuICB0aGlzLnhkID0gISFvcHRzLnhkO1xuICB0aGlzLnhzID0gISFvcHRzLnhzO1xuICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gIHRoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPT0gb3B0cy5kYXRhID8gb3B0cy5kYXRhIDogbnVsbDtcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQ7XG4gIHRoaXMuaXNCaW5hcnkgPSBvcHRzLmlzQmluYXJ5O1xuICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gb3B0cy5zdXBwb3J0c0JpbmFyeTtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLndpdGhDcmVkZW50aWFscyA9IG9wdHMud2l0aENyZWRlbnRpYWxzO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgWEhSIG9iamVjdCBhbmQgc2VuZHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0cyA9IHsgYWdlbnQ6IHRoaXMuYWdlbnQsIHhkb21haW46IHRoaXMueGQsIHhzY2hlbWU6IHRoaXMueHMsIGVuYWJsZXNYRFI6IHRoaXMuZW5hYmxlc1hEUiB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICB2YXIgeGhyID0gdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0cnkge1xuICAgIGRlYnVnKCd4aHIgb3BlbiAlczogJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmkpO1xuICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrICYmIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMuZXh0cmFIZWFkZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKCdQT1NUJyA9PT0gdGhpcy5tZXRob2QpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmluYXJ5KSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJyovKicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAvLyBpZTYgY2hlY2tcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdXBwb3J0c0JpbmFyeSAmJiBjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgfHwgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07IGNoYXJzZXQ9VVRGLTgnKSB7XG4gICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHR5cGVvZiB4aHIuc3RhdHVzID09PSAnbnVtYmVyJyA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWJ1ZygneGhyIGRhdGEgJXMnLCB0aGlzLmRhdGEpO1xuICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZmhyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnc3VjY2VzcycpO1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbiAgdGhpcy5vblN1Y2Nlc3MoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMuY2xlYW51cCh0cnVlKTtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGhvdXNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoZnJvbUVycm9yKSB7XG4gIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHhtbGh0dHByZXF1ZXN0XG4gIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICB9IGVsc2Uge1xuICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICB9XG5cbiAgaWYgKGZyb21FcnJvcikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO1xuICB9XG5cbiAgdGhpcy54aHIgPSBudWxsO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRhdGE7XG4gIHRyeSB7XG4gICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgIHRyeSB7XG4gICAgICBjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGlmIChjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgfHwgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07IGNoYXJzZXQ9VVRGLTgnKSB7XG4gICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2UgfHwgdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMub25FcnJvcihlKTtcbiAgfVxuICBpZiAobnVsbCAhPSBkYXRhKSB7XG4gICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaXQgaGFzIFhEb21haW5SZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmhhc1hEUiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcgJiYgIXRoaXMueHMgJiYgdGhpcy5lbmFibGVzWERSO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcbiAqIG1lbW9yeSBsZWFrcyAoZS5nLiB3aGVuIHVzaW5nIElFKSBhbmQgdG8gZW5zdXJlIHRoYXQgbm8gc3B1cmlvdXMgZXJyb3IgaXNcbiAqIGVtaXR0ZWQuXG4gKi9cblxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKHR5cGVvZiBhdHRhY2hFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGF0dGFjaEV2ZW50KCdvbnVubG9hZCcsIHVubG9hZEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHRlcm1pbmF0aW9uRXZlbnQgPSAnb25wYWdlaGlkZScgaW4gc2VsZiA/ICdwYWdlaGlkZScgOiAndW5sb2FkJztcbiAgICBhZGRFdmVudExpc3RlbmVyKHRlcm1pbmF0aW9uRXZlbnQsIHVubG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bmxvYWRIYW5kbGVyICgpIHtcbiAgZm9yICh2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7XG4gICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4vKipcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICovXG5cbnZhciByTmV3bGluZSA9IC9cXG4vZztcbnZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuLyoqXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxuICovXG5cbnZhciBjYWxsYmFja3M7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7IH1cblxuLyoqXG4gKiBVbnRpbCBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1nbG9iYWwgaXMgc2hpcHBlZC5cbiAqL1xuZnVuY3Rpb24gZ2xvYiAoKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmXG4gICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93XG4gICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307XG59XG5cbi8qKlxuICogSlNPTlAgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gSlNPTlBQb2xsaW5nIChvcHRzKSB7XG4gIFBvbGxpbmcuY2FsbCh0aGlzLCBvcHRzKTtcblxuICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcblxuICAvLyBkZWZpbmUgZ2xvYmFsIGNhbGxiYWNrcyBhcnJheSBpZiBub3QgcHJlc2VudFxuICAvLyB3ZSBkbyB0aGlzIGhlcmUgKGxhemlseSkgdG8gYXZvaWQgdW5uZWVkZWQgZ2xvYmFsIHBvbGx1dGlvblxuICBpZiAoIWNhbGxiYWNrcykge1xuICAgIC8vIHdlIG5lZWQgdG8gY29uc2lkZXIgbXVsdGlwbGUgZW5naW5lcyBpbiB0aGUgc2FtZSBwYWdlXG4gICAgdmFyIGdsb2JhbCA9IGdsb2IoKTtcbiAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvID0gKGdsb2JhbC5fX19laW8gfHwgW10pO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgIHNlbGYub25EYXRhKG1zZyk7XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgdGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDtcblxuICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNjcmlwdCkgc2VsZi5zY3JpcHQub25lcnJvciA9IGVtcHR5O1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KEpTT05QUG9sbGluZywgUG9sbGluZyk7XG5cbi8qXG4gKiBKU09OUCBvbmx5IHN1cHBvcnRzIGJpbmFyeSBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuXG4vKipcbiAqIENsb3NlcyB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgaWYgKHRoaXMuZm9ybSkge1xuICAgIHRoaXMuZm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZm9ybSk7XG4gICAgdGhpcy5mb3JtID0gbnVsbDtcbiAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG4gIH1cblxuICBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gIGlmICh0aGlzLnNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuXG4gIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gIHNjcmlwdC5zcmMgPSB0aGlzLnVyaSgpO1xuICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJywgZSk7XG4gIH07XG5cbiAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICBpZiAoaW5zZXJ0QXQpIHtcbiAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcbiAgfSBlbHNlIHtcbiAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG4gIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gIHZhciBpc1VBZ2Vja28gPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIGlmIChpc1VBZ2Vja28pIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICB9LCAxMDApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyB3aXRoIGEgaGlkZGVuIGlmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB2YXIgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgdmFyIGlkID0gdGhpcy5pZnJhbWVJZCA9ICdlaW9faWZyYW1lXycgKyB0aGlzLmluZGV4O1xuICAgIHZhciBpZnJhbWU7XG5cbiAgICBmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG4gICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZm9ybS5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgZm9ybS5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xuICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdC1jaGFyc2V0JywgJ3V0Zi04Jyk7XG4gICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgfVxuXG4gIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnVyaSgpO1xuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlICgpIHtcbiAgICBpbml0SWZyYW1lKCk7XG4gICAgZm4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJZnJhbWUgKCkge1xuICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgdmFyIGh0bWwgPSAnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7XG4gICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7XG4gICAgfVxuXG4gICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICB9XG5cbiAgaW5pdElmcmFtZSgpO1xuXG4gIC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuICAvLyBkb3VibGUgZXNjYXBpbmcgaXMgcmVxdWlyZWQgZm9yIGVzY2FwZWQgbmV3IGxpbmVzIGJlY2F1c2UgdW5lc2NhcGluZyBvZiBuZXcgbGluZXMgY2FuIGJlIGRvbmUgc2FmZWx5IG9uIHNlcnZlci1zaWRlXG4gIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCAnXFxcXFxcbicpO1xuICB0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpO1xuXG4gIHRyeSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIGlmICh0aGlzLmlmcmFtZS5hdHRhY2hFdmVudCkge1xuICAgIHRoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO1xuXG52YXIgQnJvd3NlcldlYlNvY2tldCwgTm9kZVdlYlNvY2tldDtcblxuaWYgKHR5cGVvZiBXZWJTb2NrZXQgIT09ICd1bmRlZmluZWQnKSB7XG4gIEJyb3dzZXJXZWJTb2NrZXQgPSBXZWJTb2NrZXQ7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICBCcm93c2VyV2ViU29ja2V0ID0gc2VsZi5XZWJTb2NrZXQgfHwgc2VsZi5Nb3pXZWJTb2NrZXQ7XG59XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB0cnkge1xuICAgIE5vZGVXZWJTb2NrZXQgPSByZXF1aXJlKCd3cycpO1xuICB9IGNhdGNoIChlKSB7IH1cbn1cblxuLyoqXG4gKiBHZXQgZWl0aGVyIHRoZSBgV2ViU29ja2V0YCBvciBgTW96V2ViU29ja2V0YCBnbG9iYWxzXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0cnkgdG8gcmVzb2x2ZSBXZWJTb2NrZXQtY29tcGF0aWJsZVxuICogaW50ZXJmYWNlIGV4cG9zZWQgYnkgYHdzYCBmb3IgTm9kZS1saWtlIGVudmlyb25tZW50LlxuICovXG5cbnZhciBXZWJTb2NrZXRJbXBsID0gQnJvd3NlcldlYlNvY2tldCB8fCBOb2RlV2ViU29ja2V0O1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gV1M7XG5cbi8qKlxuICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBXUyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1xuICB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQgJiYgIW9wdHMuZm9yY2VOb2RlO1xuICB0aGlzLnByb3RvY29scyA9IG9wdHMucHJvdG9jb2xzO1xuICBpZiAoIXRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgV2ViU29ja2V0SW1wbCA9IE5vZGVXZWJTb2NrZXQ7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChXUywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8qXG4gKiBXZWJTb2NrZXRzIHN1cHBvcnQgYmluYXJ5XG4gKi9cblxuV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBPcGVucyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB1cmkgPSB0aGlzLnVyaSgpO1xuICB2YXIgcHJvdG9jb2xzID0gdGhpcy5wcm90b2NvbHM7XG4gIHZhciBvcHRzID0ge1xuICAgIGFnZW50OiB0aGlzLmFnZW50LFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlXG4gIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcbiAgfVxuICBpZiAodGhpcy5sb2NhbEFkZHJlc3MpIHtcbiAgICBvcHRzLmxvY2FsQWRkcmVzcyA9IHRoaXMubG9jYWxBZGRyZXNzO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB0aGlzLndzID1cbiAgICAgIHRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICF0aGlzLmlzUmVhY3ROYXRpdmVcbiAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICA/IG5ldyBXZWJTb2NrZXRJbXBsKHVyaSwgcHJvdG9jb2xzKVxuICAgICAgICAgIDogbmV3IFdlYlNvY2tldEltcGwodXJpKVxuICAgICAgICA6IG5ldyBXZWJTb2NrZXRJbXBsKHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgaWYgKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnbm9kZWJ1ZmZlcic7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgfVxuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25PcGVuKCk7XG4gIH07XG4gIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgfTtcbiAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsIGUpO1xuICB9O1xufTtcblxuLyoqXG4gKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgdmFyIHRvdGFsID0gcGFja2V0cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdG90YWw7IGkgPCBsOyBpKyspIHtcbiAgICAoZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgcGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQsIHNlbGYuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICghc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgIHZhciBvcHRzID0ge307XG4gICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAnc3RyaW5nJyA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbiA8IHNlbGYucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzZWxmLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEsIG9wdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAtLXRvdGFsIHx8IGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pKHBhY2tldHNbaV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgc2VsZi5lbWl0KCdmbHVzaCcpO1xuXG4gICAgLy8gZmFrZSBkcmFpblxuICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy53cy5jbG9zZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnd3NzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgKCd3cycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICBpZiAodGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICBxdWVyeS5iNjQgPSAxO1xuICB9XG5cbiAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIVdlYlNvY2tldEltcGwgJiYgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXRJbXBsICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFhIUiA9IHJlcXVpcmUoJy4vcG9sbGluZy14aHInKTtcbnZhciBKU09OUCA9IHJlcXVpcmUoJy4vcG9sbGluZy1qc29ucCcpO1xudmFyIHdlYnNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0IHRyYW5zcG9ydHMuXG4gKi9cblxuZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztcbmV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4vKipcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9sbGluZyAob3B0cykge1xuICB2YXIgeGhyO1xuICB2YXIgeGQgPSBmYWxzZTtcbiAgdmFyIHhzID0gZmFsc2U7XG4gIHZhciBqc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHhkID0gb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG5cbiAgb3B0cy54ZG9tYWluID0geGQ7XG4gIG9wdHMueHNjaGVtZSA9IHhzO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgaWYgKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICB9XG59XG4iLCJcbnZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07IiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0ICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpIHJldHVybiBuZXcgU29ja2V0KHVyaSwgb3B0cyk7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gbnVsbDtcbiAgfVxuXG4gIGlmICh1cmkpIHtcbiAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgIG9wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtcbiAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gJ2h0dHBzJyB8fCB1cmkucHJvdG9jb2wgPT09ICd3c3MnO1xuICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gIH0gZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgfVxuXG4gIHRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZSA/IG9wdHMuc2VjdXJlXG4gICAgOiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2wpO1xuXG4gIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyAnNDQzJyA6ICc4MCc7XG4gIH1cblxuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHxcbiAgICAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyA/IGxvY2F0aW9uLmhvc3RuYW1lIDogJ2xvY2FsaG9zdCcpO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICA6ICh0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKSk7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLnF1ZXJ5KSB0aGlzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5xdWVyeSk7XG4gIHRoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7XG4gIHRoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nO1xuICB0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDtcbiAgdGhpcy5qc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuICB0aGlzLmZvcmNlQmFzZTY0ID0gISFvcHRzLmZvcmNlQmFzZTY0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZSAhPT0gb3B0cy53aXRoQ3JlZGVudGlhbHM7XG4gIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtIHx8ICd0JztcbiAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbJ3BvbGxpbmcnLCAnd2Vic29ja2V0J107XG4gIHRoaXMudHJhbnNwb3J0T3B0aW9ucyA9IG9wdHMudHJhbnNwb3J0T3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgdGhpcy5wb2xpY3lQb3J0ID0gb3B0cy5wb2xpY3lQb3J0IHx8IDg0MztcbiAgdGhpcy5yZW1lbWJlclVwZ3JhZGUgPSBvcHRzLnJlbWVtYmVyVXBncmFkZSB8fCBmYWxzZTtcbiAgdGhpcy5iaW5hcnlUeXBlID0gbnVsbDtcbiAgdGhpcy5vbmx5QmluYXJ5VXBncmFkZXMgPSBvcHRzLm9ubHlCaW5hcnlVcGdyYWRlcztcbiAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IGZhbHNlICE9PSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlID8gKG9wdHMucGVyTWVzc2FnZURlZmxhdGUgfHwge30pIDogZmFsc2U7XG5cbiAgaWYgKHRydWUgPT09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUpIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSB7fTtcbiAgaWYgKHRoaXMucGVyTWVzc2FnZURlZmxhdGUgJiYgbnVsbCA9PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgIHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkID0gMTAyNDtcbiAgfVxuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXkgfHwgbnVsbDtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlIHx8IG51bGw7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO1xuICB0aGlzLmNhID0gb3B0cy5jYSB8fCBudWxsO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnMgfHwgbnVsbDtcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuICB0aGlzLmZvcmNlTm9kZSA9ICEhb3B0cy5mb3JjZU5vZGU7XG5cbiAgLy8gZGV0ZWN0IFJlYWN0TmF0aXZlIGVudmlyb25tZW50XG4gIHRoaXMuaXNSZWFjdE5hdGl2ZSA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdzdHJpbmcnICYmIG5hdmlnYXRvci5wcm9kdWN0LnRvTG93ZXJDYXNlKCkgPT09ICdyZWFjdG5hdGl2ZScpO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgb3IgUmVhY3ROYXRpdmUgY2xpZW50XG4gIGlmICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5pc1JlYWN0TmF0aXZlKSB7XG4gICAgaWYgKG9wdHMuZXh0cmFIZWFkZXJzICYmIE9iamVjdC5rZXlzKG9wdHMuZXh0cmFIZWFkZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmxvY2FsQWRkcmVzcykge1xuICAgICAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgb24gaGFuZHNoYWtlXG4gIHRoaXMuaWQgPSBudWxsO1xuICB0aGlzLnVwZ3JhZGVzID0gbnVsbDtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucGluZ0ludGVydmFsVGltZXIgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSBudWxsO1xuXG4gIHRoaXMub3BlbigpO1xufVxuXG5Tb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG5cbi8qKlxuICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XG4gKiBhbmQgc3RhbmRhbG9uZSBicm93c2VyIGFjY2Vzcy5cbiAqL1xuXG5Tb2NrZXQuU29ja2V0ID0gU29ja2V0O1xuU29ja2V0LlRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5Tb2NrZXQudHJhbnNwb3J0cyA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0cy9pbmRleCcpO1xuU29ja2V0LnBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRyYW5zcG9ydCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVidWcoJ2NyZWF0aW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHF1ZXJ5ID0gY2xvbmUodGhpcy5xdWVyeSk7XG5cbiAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gIHF1ZXJ5LkVJTyA9IHBhcnNlci5wcm90b2NvbDtcblxuICAvLyB0cmFuc3BvcnQgbmFtZVxuICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuXG4gIC8vIHBlci10cmFuc3BvcnQgb3B0aW9uc1xuICB2YXIgb3B0aW9ucyA9IHRoaXMudHJhbnNwb3J0T3B0aW9uc1tuYW1lXSB8fCB7fTtcblxuICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgaWYgKHRoaXMuaWQpIHF1ZXJ5LnNpZCA9IHRoaXMuaWQ7XG5cbiAgdmFyIHRyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRzW25hbWVdKHtcbiAgICBxdWVyeTogcXVlcnksXG4gICAgc29ja2V0OiB0aGlzLFxuICAgIGFnZW50OiBvcHRpb25zLmFnZW50IHx8IHRoaXMuYWdlbnQsXG4gICAgaG9zdG5hbWU6IG9wdGlvbnMuaG9zdG5hbWUgfHwgdGhpcy5ob3N0bmFtZSxcbiAgICBwb3J0OiBvcHRpb25zLnBvcnQgfHwgdGhpcy5wb3J0LFxuICAgIHNlY3VyZTogb3B0aW9ucy5zZWN1cmUgfHwgdGhpcy5zZWN1cmUsXG4gICAgcGF0aDogb3B0aW9ucy5wYXRoIHx8IHRoaXMucGF0aCxcbiAgICBmb3JjZUpTT05QOiBvcHRpb25zLmZvcmNlSlNPTlAgfHwgdGhpcy5mb3JjZUpTT05QLFxuICAgIGpzb25wOiBvcHRpb25zLmpzb25wIHx8IHRoaXMuanNvbnAsXG4gICAgZm9yY2VCYXNlNjQ6IG9wdGlvbnMuZm9yY2VCYXNlNjQgfHwgdGhpcy5mb3JjZUJhc2U2NCxcbiAgICBlbmFibGVzWERSOiBvcHRpb25zLmVuYWJsZXNYRFIgfHwgdGhpcy5lbmFibGVzWERSLFxuICAgIHdpdGhDcmVkZW50aWFsczogb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgfHwgdGhpcy53aXRoQ3JlZGVudGlhbHMsXG4gICAgdGltZXN0YW1wUmVxdWVzdHM6IG9wdGlvbnMudGltZXN0YW1wUmVxdWVzdHMgfHwgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyxcbiAgICB0aW1lc3RhbXBQYXJhbTogb3B0aW9ucy50aW1lc3RhbXBQYXJhbSB8fCB0aGlzLnRpbWVzdGFtcFBhcmFtLFxuICAgIHBvbGljeVBvcnQ6IG9wdGlvbnMucG9saWN5UG9ydCB8fCB0aGlzLnBvbGljeVBvcnQsXG4gICAgcGZ4OiBvcHRpb25zLnBmeCB8fCB0aGlzLnBmeCxcbiAgICBrZXk6IG9wdGlvbnMua2V5IHx8IHRoaXMua2V5LFxuICAgIHBhc3NwaHJhc2U6IG9wdGlvbnMucGFzc3BocmFzZSB8fCB0aGlzLnBhc3NwaHJhc2UsXG4gICAgY2VydDogb3B0aW9ucy5jZXJ0IHx8IHRoaXMuY2VydCxcbiAgICBjYTogb3B0aW9ucy5jYSB8fCB0aGlzLmNhLFxuICAgIGNpcGhlcnM6IG9wdGlvbnMuY2lwaGVycyB8fCB0aGlzLmNpcGhlcnMsXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCB8fCB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgIGV4dHJhSGVhZGVyczogb3B0aW9ucy5leHRyYUhlYWRlcnMgfHwgdGhpcy5leHRyYUhlYWRlcnMsXG4gICAgZm9yY2VOb2RlOiBvcHRpb25zLmZvcmNlTm9kZSB8fCB0aGlzLmZvcmNlTm9kZSxcbiAgICBsb2NhbEFkZHJlc3M6IG9wdGlvbnMubG9jYWxBZGRyZXNzIHx8IHRoaXMubG9jYWxBZGRyZXNzLFxuICAgIHJlcXVlc3RUaW1lb3V0OiBvcHRpb25zLnJlcXVlc3RUaW1lb3V0IHx8IHRoaXMucmVxdWVzdFRpbWVvdXQsXG4gICAgcHJvdG9jb2xzOiBvcHRpb25zLnByb3RvY29scyB8fCB2b2lkICgwKSxcbiAgICBpc1JlYWN0TmF0aXZlOiB0aGlzLmlzUmVhY3ROYXRpdmVcbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn07XG5cbmZ1bmN0aW9uIGNsb25lIChvYmopIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBvW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYW5zcG9ydDtcbiAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9PSAtMSkge1xuICAgIHRyYW5zcG9ydCA9ICd3ZWJzb2NrZXQnO1xuICB9IGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgfVxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG5cbiAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICB0cnkge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cmFuc3BvcnQub3BlbigpO1xuICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJywgdHJhbnNwb3J0Lm5hbWUpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICB0cmFuc3BvcnRcbiAgLm9uKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uRHJhaW4oKTtcbiAgfSlcbiAgLm9uKCdwYWNrZXQnLCBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9KVxuICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoZSk7XG4gIH0pXG4gIC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLCB7IHByb2JlOiAxIH0pO1xuICB2YXIgZmFpbGVkID0gZmFsc2U7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuICgpIHtcbiAgICBpZiAoc2VsZi5vbmx5QmluYXJ5VXBncmFkZXMpIHtcbiAgICAgIHZhciB1cGdyYWRlTG9zZXNCaW5hcnkgPSAhdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtcbiAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgfVxuICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICdwaW5nJywgZGF0YTogJ3Byb2JlJyB9XSk7XG4gICAgdHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgIGlmICgncG9uZycgPT09IG1zZy50eXBlICYmICdwcm9iZScgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLCBuYW1lKTtcbiAgICAgICAgc2VsZi51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGluZycsIHRyYW5zcG9ydCk7XG4gICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgIHNlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICBkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7XG5cbiAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICd1cGdyYWRlJyB9XSk7XG4gICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCAoKSB7XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG4gICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgIGNsZWFudXAoKTtcblxuICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9uZXJyb3IgKGVycikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO1xuICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuXG4gICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlICgpIHtcbiAgICBvbmVycm9yKCd0cmFuc3BvcnQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25jbG9zZSAoKSB7XG4gICAgb25lcnJvcignc29ja2V0IGNsb3NlZCcpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb251cGdyYWRlICh0bykge1xuICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgIGRlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLCB0by5uYW1lLCB0cmFuc3BvcnQubmFtZSk7XG4gICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG4gIH1cblxuICB0cmFuc3BvcnQub25jZSgnb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gIHRyYW5zcG9ydC5vbmNlKCdlcnJvcicsIG9uZXJyb3IpO1xuICB0cmFuc3BvcnQub25jZSgnY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcblxuICB0aGlzLm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIHRoaXMub25jZSgndXBncmFkaW5nJywgb251cGdyYWRlKTtcblxuICB0cmFuc3BvcnQub3BlbigpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzb2NrZXQgb3BlbicpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4gIC8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSkge1xuICAgIGRlYnVnKCdzdGFydGluZyB1cGdyYWRlIHByb2JlcycpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgcmVjZWl2ZTogdHlwZSBcIiVzXCIsIGRhdGEgXCIlc1wiJywgcGFja2V0LnR5cGUsIHBhY2tldC5kYXRhKTtcblxuICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcblxuICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICB0aGlzLmVtaXQoJ2hlYXJ0YmVhdCcpO1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICB0aGlzLmVtaXQoJ3BvbmcnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignc2VydmVyIGVycm9yJyk7XG4gICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgIHRoaXMub25FcnJvcihlcnIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgcGFja2V0LmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2hhbmRzaGFrZScsIGRhdGEpO1xuICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gIHRoaXMub25PcGVuKCk7XG4gIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgdGhpcy5zZXRQaW5nKCk7XG5cbiAgLy8gUHJvbG9uZyBsaXZlbmVzcyBvZiBzb2NrZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xuICB0aGlzLm9uKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbn07XG5cbi8qKlxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICBzZWxmLm9uQ2xvc2UoJ3BpbmcgdGltZW91dCcpO1xuICB9LCB0aW1lb3V0IHx8IChzZWxmLnBpbmdJbnRlcnZhbCArIHNlbGYucGluZ1RpbWVvdXQpKTtcbn07XG5cbi8qKlxuICogUGluZ3Mgc2VydmVyIGV2ZXJ5IGB0aGlzLnBpbmdJbnRlcnZhbGAgYW5kIGV4cGVjdHMgcmVzcG9uc2VcbiAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgc2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIHBpbmcgcGFja2V0IC0gZXhwZWN0aW5nIHBvbmcgd2l0aGluICVzbXMnLCBzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICBzZWxmLnBpbmcoKTtcbiAgICBzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO1xuICB9LCBzZWxmLnBpbmdJbnRlcnZhbCk7XG59O1xuXG4vKipcbiogU2VuZHMgYSBwaW5nIHBhY2tldC5cbipcbiogQGFwaSBwcml2YXRlXG4qL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5zZW5kUGFja2V0KCdwaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuZW1pdCgncGluZycpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsIHRoaXMucHJldkJ1ZmZlckxlbik7XG5cbiAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICBkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7XG4gICAgdGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7XG4gICAgdGhpcy5lbWl0KCdmbHVzaCcpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS53cml0ZSA9XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnLCBvcHRpb25zLCBmbikge1xuICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZFBhY2tldCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIGlmICgnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICB2YXIgcGFja2V0ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG4gIHRoaXMuZW1pdCgncGFja2V0Q3JlYXRlJywgcGFja2V0KTtcbiAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIGlmIChmbikgdGhpcy5vbmNlKCdmbHVzaCcsIGZuKTtcbiAgdGhpcy5mbHVzaCgpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIHNlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICBzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlICgpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIGNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSAoKSB7XG4gICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICBzZWxmLm9uY2UoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYub25jZSgndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdzb2NrZXQgZXJyb3IgJWonLCBlcnIpO1xuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsIGVycik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAocmVhc29uLCBkZXNjKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgY2xvc2Ugd2l0aCByZWFzb246IFwiJXNcIicsIHJlYXNvbik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gY2xlYXIgdGltZXJzXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ0ludGVydmFsVGltZXIpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpO1xuXG4gICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuXG4gICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24sIGRlc2MpO1xuXG4gICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG4gICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgIHNlbGYucHJldkJ1ZmZlckxlbiA9IDA7XG4gIH1cbn07XG5cbi8qKlxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uICh1cGdyYWRlcykge1xuICB2YXIgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IHVwZ3JhZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgIGlmICh+aW5kZXgodGhpcy50cmFuc3BvcnRzLCB1cGdyYWRlc1tpXSkpIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0cyBwYXJzZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5XG5cbmZ1bmN0aW9uIHRvQXJyYXkobGlzdCwgaW5kZXgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaW5kZXggPSBpbmRleCB8fCAwXG5cbiAgICBmb3IgKHZhciBpID0gaW5kZXggfHwgMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaSAtIGluZGV4XSA9IGxpc3RbaV1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9uO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG9uIChvYmosIGV2LCBmbikge1xuICBvYmoub24oZXYsIGZuKTtcbiAgcmV0dXJuIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICBvYmoucmVtb3ZlTGlzdGVuZXIoZXYsIGZuKTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIFNsaWNlIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcblxuLyoqXG4gKiBCaW5kIGBvYmpgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGZuIG9yIHN0cmluZ1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBmbil7XG4gIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZm4pIGZuID0gb2JqW2ZuXTtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7XG4gIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgfVxufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgdG9BcnJheSA9IHJlcXVpcmUoJ3RvLWFycmF5Jyk7XG52YXIgb24gPSByZXF1aXJlKCcuL29uJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1iaW5kJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgaGFzQmluID0gcmVxdWlyZSgnaGFzLWJpbmFyeTInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBTb2NrZXQ7XG5cbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZXZlbnRzID0ge1xuICBjb25uZWN0OiAxLFxuICBjb25uZWN0X2Vycm9yOiAxLFxuICBjb25uZWN0X3RpbWVvdXQ6IDEsXG4gIGNvbm5lY3Rpbmc6IDEsXG4gIGRpc2Nvbm5lY3Q6IDEsXG4gIGVycm9yOiAxLFxuICByZWNvbm5lY3Q6IDEsXG4gIHJlY29ubmVjdF9hdHRlbXB0OiAxLFxuICByZWNvbm5lY3RfZmFpbGVkOiAxLFxuICByZWNvbm5lY3RfZXJyb3I6IDEsXG4gIHJlY29ubmVjdGluZzogMSxcbiAgcGluZzogMSxcbiAgcG9uZzogMVxufTtcblxuLyoqXG4gKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cbiAqL1xuXG52YXIgZW1pdCA9IEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7XG5cbi8qKlxuICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKGlvLCBuc3AsIG9wdHMpIHtcbiAgdGhpcy5pbyA9IGlvO1xuICB0aGlzLm5zcCA9IG5zcDtcbiAgdGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG4gIHRoaXMuaWRzID0gMDtcbiAgdGhpcy5hY2tzID0ge307XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICB0aGlzLmZsYWdzID0ge307XG4gIGlmIChvcHRzICYmIG9wdHMucXVlcnkpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgfVxuICBpZiAodGhpcy5pby5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdWJzKSByZXR1cm47XG5cbiAgdmFyIGlvID0gdGhpcy5pbztcbiAgdGhpcy5zdWJzID0gW1xuICAgIG9uKGlvLCAnb3BlbicsIGJpbmQodGhpcywgJ29ub3BlbicpKSxcbiAgICBvbihpbywgJ3BhY2tldCcsIGJpbmQodGhpcywgJ29ucGFja2V0JykpLFxuICAgIG9uKGlvLCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpXG4gIF07XG59O1xuXG4vKipcbiAqIFwiT3BlbnNcIiB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vcGVuID1cblNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSByZXR1cm4gdGhpcztcblxuICB0aGlzLnN1YkV2ZW50cygpO1xuICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5pby5yZWFkeVN0YXRlKSB0aGlzLm9ub3BlbigpO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgYG1lc3NhZ2VgIGV2ZW50LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICBhcmdzLnVuc2hpZnQoJ21lc3NhZ2UnKTtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgYGVtaXRgLlxuICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgdmFyIHBhY2tldCA9IHtcbiAgICB0eXBlOiAodGhpcy5mbGFncy5iaW5hcnkgIT09IHVuZGVmaW5lZCA/IHRoaXMuZmxhZ3MuYmluYXJ5IDogaGFzQmluKGFyZ3MpKSA/IHBhcnNlci5CSU5BUllfRVZFTlQgOiBwYXJzZXIuRVZFTlQsXG4gICAgZGF0YTogYXJnc1xuICB9O1xuXG4gIHBhY2tldC5vcHRpb25zID0ge307XG4gIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7XG5cbiAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsIHRoaXMuaWRzKTtcbiAgICB0aGlzLmFja3NbdGhpcy5pZHNdID0gYXJncy5wb3AoKTtcbiAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG5cbiAgdGhpcy5mbGFncyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICB0aGlzLmlvLnBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygndHJhbnNwb3J0IGlzIG9wZW4gLSBjb25uZWN0aW5nJyk7XG5cbiAgLy8gd3JpdGUgY29ubmVjdCBwYWNrZXQgaWYgbmVjZXNzYXJ5XG4gIGlmICgnLycgIT09IHRoaXMubnNwKSB7XG4gICAgaWYgKHRoaXMucXVlcnkpIHtcbiAgICAgIHZhciBxdWVyeSA9IHR5cGVvZiB0aGlzLnF1ZXJ5ID09PSAnb2JqZWN0JyA/IHBhcnNlcXMuZW5jb2RlKHRoaXMucXVlcnkpIDogdGhpcy5xdWVyeTtcbiAgICAgIGRlYnVnKCdzZW5kaW5nIGNvbm5lY3QgcGFja2V0IHdpdGggcXVlcnkgJXMnLCBxdWVyeSk7XG4gICAgICB0aGlzLnBhY2tldCh7dHlwZTogcGFyc2VyLkNPTk5FQ1QsIHF1ZXJ5OiBxdWVyeX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhY2tldCh7dHlwZTogcGFyc2VyLkNPTk5FQ1R9KTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvblxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICBkZWJ1ZygnY2xvc2UgKCVzKScsIHJlYXNvbik7XG4gIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgZGVsZXRlIHRoaXMuaWQ7XG4gIHRoaXMuZW1pdCgnZGlzY29ubmVjdCcsIHJlYXNvbik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgdmFyIHJvb3ROYW1lc3BhY2VFcnJvciA9IHBhY2tldC50eXBlID09PSBwYXJzZXIuRVJST1IgJiYgcGFja2V0Lm5zcCA9PT0gJy8nO1xuXG4gIGlmICghc2FtZU5hbWVzcGFjZSAmJiAhcm9vdE5hbWVzcGFjZUVycm9yKSByZXR1cm47XG5cbiAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgIGNhc2UgcGFyc2VyLkNPTk5FQ1Q6XG4gICAgICB0aGlzLm9uY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5ESVNDT05ORUNUOlxuICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVJST1I6XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgcGFja2V0LmRhdGEpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICBkZWJ1ZygnZW1pdHRpbmcgZXZlbnQgJWonLCBhcmdzKTtcblxuICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICBkZWJ1ZygnYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudCcpO1xuICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgfVxuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIGVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goYXJncyk7XG4gIH1cbn07XG5cbi8qKlxuICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uIChpZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBzZW50ID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgaWYgKHNlbnQpIHJldHVybjtcbiAgICBzZW50ID0gdHJ1ZTtcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICBkZWJ1Zygnc2VuZGluZyBhY2sgJWonLCBhcmdzKTtcblxuICAgIHNlbGYucGFja2V0KHtcbiAgICAgIHR5cGU6IGhhc0JpbihhcmdzKSA/IHBhcnNlci5CSU5BUllfQUNLIDogcGFyc2VyLkFDSyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGRhdGE6IGFyZ3NcbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmFjayA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGFjaykge1xuICAgIGRlYnVnKCdjYWxsaW5nIGFjayAlcyB3aXRoICVqJywgcGFja2V0LmlkLCBwYWNrZXQuZGF0YSk7XG4gICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ2JhZCBhY2sgJXMnLCBwYWNrZXQuaWQpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xuICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xufTtcblxuLyoqXG4gKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdEJ1ZmZlcmVkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucmVjZWl2ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIGVtaXQuYXBwbHkodGhpcywgdGhpcy5yZWNlaXZlQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgdGhpcy5vbmNsb3NlKCdpbyBzZXJ2ZXIgZGlzY29ubmVjdCcpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZS5cbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN1YnMpIHtcbiAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zdWJzW2ldLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzID0gbnVsbDtcbiAgfVxuXG4gIHRoaXMuaW8uZGVzdHJveSh0aGlzKTtcbn07XG5cbi8qKlxuICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9XG5Tb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIGRlYnVnKCdwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHBhcnNlci5ESVNDT05ORUNUIH0pO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgdGhpcy5kZXN0cm95KCk7XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgLy8gZmlyZSBldmVudHNcbiAgICB0aGlzLm9uY2xvc2UoJ2lvIGNsaWVudCBkaXNjb25uZWN0Jyk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbiAoY29tcHJlc3MpIHtcbiAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgYmluYXJ5IGZsYWdcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHdoZXRoZXIgdGhlIGVtaXR0ZWQgZGF0YSBjb250YWlucyBiaW5hcnlcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmJpbmFyeSA9IGZ1bmN0aW9uIChiaW5hcnkpIHtcbiAgdGhpcy5mbGFncy5iaW5hcnkgPSBiaW5hcnk7XG4gIHJldHVybiB0aGlzO1xufTtcbiIsIlxuLyoqXG4gKiBFeHBvc2UgYEJhY2tvZmZgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja29mZjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEJhY2tvZmYob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgdGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDtcbiAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBtcyA9IHRoaXMubXMgKiBNYXRoLnBvdyh0aGlzLmZhY3RvciwgdGhpcy5hdHRlbXB0cysrKTtcbiAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgdmFyIHJhbmQgPSAgTWF0aC5yYW5kb20oKTtcbiAgICB2YXIgZGV2aWF0aW9uID0gTWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7XG4gICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCAgPyBtcyAtIGRldmlhdGlvbiA6IG1zICsgZGV2aWF0aW9uO1xuICB9XG4gIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24obWluKXtcbiAgdGhpcy5tcyA9IG1pbjtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNYXggPSBmdW5jdGlvbihtYXgpe1xuICB0aGlzLm1heCA9IG1heDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7XG4gIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcblxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVpbyA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKTtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6bWFuYWdlcicpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgQmFja29mZiA9IHJlcXVpcmUoJ2JhY2tvMicpO1xuXG4vKipcbiAqIElFNisgaGFzT3duUHJvcGVydHlcbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIE1hbmFnZXIgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpIHJldHVybiBuZXcgTWFuYWdlcih1cmksIG9wdHMpO1xuICBpZiAodXJpICYmICgnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO1xuICB0aGlzLm5zcHMgPSB7fTtcbiAgdGhpcy5zdWJzID0gW107XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpXG4gIH0pO1xuICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLnVyaSA9IHVyaTtcbiAgdGhpcy5jb25uZWN0aW5nID0gW107XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHZhciBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgdGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICBpZiAodGhpcy5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZW1pdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGUgYHNvY2tldC5pZGAgb2YgYWxsIHNvY2tldHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZW5lcmF0ZSBgc29ja2V0LmlkYCBmb3IgdGhlIGdpdmVuIGBuc3BgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5zcFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIChuc3ApIHtcbiAgcmV0dXJuIChuc3AgPT09ICcvJyA/ICcnIDogKG5zcCArICcjJykpICsgdGhpcy5lbmdpbmUuaWQ7XG59O1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1heCh2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXG4gKlxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgdGhpcy5fdGltZW91dCA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gIGlmICghdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID1cbk1hbmFnZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4sIG9wdHMpIHtcbiAgZGVidWcoJ3JlYWR5U3RhdGUgJXMnLCB0aGlzLnJlYWR5U3RhdGUpO1xuICBpZiAofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpIHJldHVybiB0aGlzO1xuXG4gIGRlYnVnKCdvcGVuaW5nICVzJywgdGhpcy51cmkpO1xuICB0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG5cbiAgLy8gZW1pdCBgb3BlbmBcbiAgdmFyIG9wZW5TdWIgPSBvbihzb2NrZXQsICdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25vcGVuKCk7XG4gICAgZm4gJiYgZm4oKTtcbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbiAgdmFyIGVycm9yU3ViID0gb24oc29ja2V0LCAnZXJyb3InLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRlYnVnKCdjb25uZWN0X2Vycm9yJyk7XG4gICAgc2VsZi5jbGVhbnVwKCk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJywgZGF0YSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdDb25uZWN0aW9uIGVycm9yJyk7XG4gICAgICBlcnIuZGF0YSA9IGRhdGE7XG4gICAgICBmbihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcblxuICAgIC8vIHNldCB0aW1lclxuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgIG9wZW5TdWIuZGVzdHJveSgpO1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLCB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO1xuICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ29wZW4nKTtcblxuICAvLyBjbGVhciBvbGQgc3Vic1xuICB0aGlzLmNsZWFudXAoKTtcblxuICAvLyBtYXJrIGFzIG9wZW5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcblxuICAvLyBhZGQgbmV3IHN1YnNcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdkYXRhJywgYmluZCh0aGlzLCAnb25kYXRhJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAncGluZycsIGJpbmQodGhpcywgJ29ucGluZycpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BvbmcnLCBiaW5kKHRoaXMsICdvbnBvbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdlcnJvcicsIGJpbmQodGhpcywgJ29uZXJyb3InKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0UGluZyA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZW1pdEFsbCgncGluZycpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdEFsbCgncG9uZycsIG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdlcnJvcicsIGVycik7XG4gIHRoaXMuZW1pdEFsbCgnZXJyb3InLCBlcnIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuc29ja2V0ID0gZnVuY3Rpb24gKG5zcCwgb3B0cykge1xuICB2YXIgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gIGlmICghc29ja2V0KSB7XG4gICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLCBvbkNvbm5lY3RpbmcpO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNvY2tldC5pZCA9IHNlbGYuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGNhbGwgaGVyZSBzaW5jZSBjb25uZWN0aW5nIGV2ZW50IGlzIGZpcmVkIGJlZm9yZSBsaXN0ZW5pbmdcbiAgICAgIG9uQ29ubmVjdGluZygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdGluZyAoKSB7XG4gICAgaWYgKCF+aW5kZXhPZihzZWxmLmNvbm5lY3RpbmcsIHNvY2tldCkpIHtcbiAgICAgIHNlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gKlxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5jb25uZWN0aW5nLCBzb2NrZXQpO1xuICBpZiAofmluZGV4KSB0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzLmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHBhY2tldC5xdWVyeSAmJiBwYWNrZXQudHlwZSA9PT0gMCkgcGFja2V0Lm5zcCArPSAnPycgKyBwYWNrZXQucXVlcnk7XG5cbiAgaWYgKCFzZWxmLmVuY29kaW5nKSB7XG4gICAgLy8gZW5jb2RlLCB0aGVuIHdyaXRlIHRvIGVuZ2luZSB3aXRoIHJlc3VsdFxuICAgIHNlbGYuZW5jb2RpbmcgPSB0cnVlO1xuICAgIHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LCBmdW5jdGlvbiAoZW5jb2RlZFBhY2tldHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG59O1xuXG4vKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucGFja2V0QnVmZmVyLmxlbmd0aCA+IDAgJiYgIXRoaXMuZW5jb2RpbmcpIHtcbiAgICB2YXIgcGFjayA9IHRoaXMucGFja2V0QnVmZmVyLnNoaWZ0KCk7XG4gICAgdGhpcy5wYWNrZXQocGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NsZWFudXAnKTtcblxuICB2YXIgc3Vic0xlbmd0aCA9IHRoaXMuc3Vicy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpO1xuICAgIHN1Yi5kZXN0cm95KCk7XG4gIH1cblxuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuXG4gIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG59O1xuXG4vKipcbiAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9XG5NYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnZGlzY29ubmVjdCcpO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4gICAgLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxuICAgIHRoaXMuY2xlYW51cCgpO1xuICB9XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgaWYgKHRoaXMuZW5naW5lKSB0aGlzLmVuZ2luZS5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ29uY2xvc2UnKTtcblxuICB0aGlzLmNsZWFudXAoKTtcbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uKTtcblxuICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KSByZXR1cm4gdGhpcztcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgIGRlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7XG4gICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICBkZWJ1Zygnd2lsbCB3YWl0ICVkbXMgYmVmb3JlIHJlY29ubmVjdCBhdHRlbXB0JywgZGVsYXkpO1xuXG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICBkZWJ1ZygnYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuXG4gICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgc2VsZi5vcGVuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsIGVyci5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGRlbGF5KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnVwZGF0ZVNvY2tldElkcygpO1xuICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsIGF0dGVtcHQpO1xufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB1cmwgPSByZXF1aXJlKCcuL3VybCcpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBNYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gbG9va3VwO1xuXG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5cbnZhciBjYWNoZSA9IGV4cG9ydHMubWFuYWdlcnMgPSB7fTtcblxuLyoqXG4gKiBMb29rcyB1cCBhbiBleGlzdGluZyBgTWFuYWdlcmAgZm9yIG11bHRpcGxleGluZy5cbiAqIElmIHRoZSB1c2VyIHN1bW1vbnM6XG4gKlxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYScpO2BcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2InKTtgXG4gKlxuICogV2UgcmV1c2UgdGhlIGV4aXN0aW5nIGluc3RhbmNlIGJhc2VkIG9uIHNhbWUgc2NoZW1lL3BvcnQvaG9zdCxcbiAqIGFuZCB3ZSBpbml0aWFsaXplIHNvY2tldHMgZm9yIGVhY2ggbmFtZXNwYWNlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9va3VwICh1cmksIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiB1cmkgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICB2YXIgcGFyc2VkID0gdXJsKHVyaSk7XG4gIHZhciBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICB2YXIgaWQgPSBwYXJzZWQuaWQ7XG4gIHZhciBwYXRoID0gcGFyc2VkLnBhdGg7XG4gIHZhciBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdLm5zcHM7XG4gIHZhciBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fCBvcHRzWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8IHNhbWVOYW1lc3BhY2U7XG5cbiAgdmFyIGlvO1xuXG4gIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgZGVidWcoJ2lnbm9yaW5nIHNvY2tldCBjYWNoZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgIGlvID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICBkZWJ1ZygnbmV3IGlvIGluc3RhbmNlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgICBjYWNoZVtpZF0gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGlvID0gY2FjaGVbaWRdO1xuICB9XG4gIGlmIChwYXJzZWQucXVlcnkgJiYgIW9wdHMucXVlcnkpIHtcbiAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5O1xuICB9XG4gIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sO1xuXG4vKipcbiAqIGBjb25uZWN0YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuY29ubmVjdCA9IGxvb2t1cDtcblxuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5NYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyk7XG5leHBvcnRzLlNvY2tldCA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG4iLCJpbXBvcnQge2gsQ29tcG9uZW50fSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIlxuXG5cbmNsYXNzIFNvY2tldENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGUgPSB7IHRva2VuOiBudWxsLCBzb2NrZXQ6IG51bGwsY29ubmVjdGVkOmZhbHNlIH1cbiAgICBhc3luYyAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuXG4gICAgICAgIGNvbnN0IHsgdXNlcm5hbWUgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7UkVBQ1RfQVBQX1NPQ0tFVF9VUkx9L2Fub255bW91c2AsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVzZXJuYW1lIH0pLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gaW8oUkVBQ1RfQVBQX1NPQ0tFVF9VUkwsIHsgcXVlcnk6IGB0b2tlbj0ke2RhdGEudG9rZW59YCB9KTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZnJvbSBzb2NrZXRcIiwgZXJyb3IpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb25uZWN0ZWQ6dHJ1ZX0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc29ja2V0OiB0aGlzLnNvY2tldCB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvci4uLi5cIiwgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3R7Y29ubmVjdGVkfT10aGlzLnN0YXRlXG4gICAgXG5cbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbih7IHNvY2tldDogdGhpcy5zdGF0ZS5zb2NrZXQsY29ubmVjdGVkIH0pXG4gICAgICAgIFxuIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU29ja2V0Q29tcG9uZW50IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAoIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCx1LHIsaT1bXSxvPW4uX19yLGY9bi5kaWZmZWQsYz1uLl9fYyxlPW4udW5tb3VudDtmdW5jdGlvbiBhKHQpe24uX19oJiZuLl9faCh1KTt2YXIgcj11Ll9fSHx8KHUuX19IPXt0OltdLHU6W119KTtyZXR1cm4gdD49ci50Lmxlbmd0aCYmci50LnB1c2goe30pLHIudFt0XX1mdW5jdGlvbiB2KG4pe3JldHVybiBtKHgsbil9ZnVuY3Rpb24gbShuLHIsaSl7dmFyIG89YSh0KyspO3JldHVybiBvLl9fY3x8KG8uX19jPXUsby5pPVtpP2kocik6eCh2b2lkIDAsciksZnVuY3Rpb24odCl7dmFyIHU9bihvLmlbMF0sdCk7by5pWzBdIT09dSYmKG8uaVswXT11LG8uX19jLnNldFN0YXRlKHt9KSl9XSksby5pfWZ1bmN0aW9uIHAobixyKXt2YXIgaT1hKHQrKyk7cShpLm8scikmJihpLmk9bixpLm89cix1Ll9fSC51LnB1c2goaSkpfWZ1bmN0aW9uIGwobixyKXt2YXIgaT1hKHQrKyk7cShpLm8scikmJihpLmk9bixpLm89cix1Ll9faC5wdXNoKGkpKX1mdW5jdGlvbiBkKG4pe3JldHVybiB5KGZ1bmN0aW9uKCl7cmV0dXJue2N1cnJlbnQ6bn19LFtdKX1mdW5jdGlvbiBzKG4sdCx1KXtsKGZ1bmN0aW9uKCl7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uKHQoKSk6biYmKG4uY3VycmVudD10KCkpfSxudWxsPT11P3U6dS5jb25jYXQobikpfWZ1bmN0aW9uIHkobix1KXt2YXIgcj1hKHQrKyk7cmV0dXJuIHEoci5vLHUpPyhyLm89dSxyLnY9bixyLmk9bigpKTpyLml9ZnVuY3Rpb24gVChuLHQpe3JldHVybiB5KGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHcobil7dmFyIHI9dS5jb250ZXh0W24uX19jXTtpZighcilyZXR1cm4gbi5fXzt2YXIgaT1hKHQrKyk7cmV0dXJuIG51bGw9PWkuaSYmKGkuaT0hMCxyLnN1Yih1KSksci5wcm9wcy52YWx1ZX1mdW5jdGlvbiBBKHQsdSl7bi51c2VEZWJ1Z1ZhbHVlJiZuLnVzZURlYnVnVmFsdWUodT91KHQpOnQpfWZ1bmN0aW9uIEYoKXtpLnNvbWUoZnVuY3Rpb24obil7bi5fX1AmJihuLl9fSC51LmZvckVhY2goXyksbi5fX0gudS5mb3JFYWNoKGcpLG4uX19ILnU9W10pfSksaT1bXX1mdW5jdGlvbiBfKG4pe24ubSYmbi5tKCl9ZnVuY3Rpb24gZyhuKXt2YXIgdD1uLmkoKTtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYobi5tPXQpfWZ1bmN0aW9uIHEobix0KXtyZXR1cm4hbnx8dC5zb21lKGZ1bmN0aW9uKHQsdSl7cmV0dXJuIHQhPT1uW3VdfSl9ZnVuY3Rpb24geChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fW4uX19yPWZ1bmN0aW9uKG4pe28mJm8obiksdD0wLCh1PW4uX19jKS5fX0gmJih1Ll9fSC51LmZvckVhY2goXyksdS5fX0gudS5mb3JFYWNoKGcpLHUuX19ILnU9W10pfSxuLmRpZmZlZD1mdW5jdGlvbih0KXtmJiZmKHQpO3ZhciB1PXQuX19jO2lmKHUpe3ZhciBvPXUuX19IO28mJm8udS5sZW5ndGgmJigxIT09aS5wdXNoKHUpJiZyPT09bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgocj1uLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fGZ1bmN0aW9uKG4pe3ZhciB0LHU9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQociksY2FuY2VsQW5pbWF0aW9uRnJhbWUodCksc2V0VGltZW91dChuKX0scj1zZXRUaW1lb3V0KHUsMTAwKTtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodSkpfSkoRikpfX0sbi5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7bi5fX2guZm9yRWFjaChfKSxuLl9faD1uLl9faC5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIW4uaXx8ZyhuKX0pfSksYyYmYyhuLHQpfSxuLnVubW91bnQ9ZnVuY3Rpb24obil7ZSYmZShuKTt2YXIgdD1uLl9fYztpZih0KXt2YXIgdT10Ll9fSDt1JiZ1LnQuZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gbi5tJiZuLm0oKX0pfX07ZXhwb3J0e3YgYXMgdXNlU3RhdGUsbSBhcyB1c2VSZWR1Y2VyLHAgYXMgdXNlRWZmZWN0LGwgYXMgdXNlTGF5b3V0RWZmZWN0LGQgYXMgdXNlUmVmLHMgYXMgdXNlSW1wZXJhdGl2ZUhhbmRsZSx5IGFzIHVzZU1lbW8sVCBhcyB1c2VDYWxsYmFjayx3IGFzIHVzZUNvbnRleHQsQSBhcyB1c2VEZWJ1Z1ZhbHVlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydCB7aCwgQ29tcG9uZW50fSBmcm9tICdwcmVhY3QnXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VFZmZlY3R9IGZyb20gJ3ByZWFjdC9ob29rcydcblxuY29uc3QgdXNlU29ja2V0ID0oe3NvY2tldCx0YXJnZXROYW1lfSk9PntcbmNvbnN0IFttZXNzYWdlVGV4dCxzZXRNZXNzYWdlVGV4dF09dXNlU3RhdGUoJycpXG5jb25zdCBbbWVzc2FnZVJlY2lldmVkLHNldE1lc3NhZ2VSZWNpZXZlZF09dXNlU3RhdGUobnVsbClcbmNvbnN0IFttZXNzYWdlU2VudCxzZXRNZXNzYWdlU2VudF09dXNlU3RhdGUobnVsbClcbmNvbnN0IFtjb25uZWN0ZWQsc2V0Q29ubmVjdGVkXT11c2VTdGF0ZShmYWxzZSlcbmNvbnN0IFtlcnJvcnMsc2V0RXJyb3JdPXVzZVN0YXRlKFtdKVxuICBjb25zdCAgIHNlbmRNZXNzYWdlID0gKCkgPT4ge1xuICBjb25zdCBkYXRldGltZSA9ICBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICBzb2NrZXQuZW1pdChcInRleHRfbWVzc2FnZVwiLHtcbiAgICByZWNpZXZlcjp0YXJnZXROYW1lLFxuICAgIG1lc3NhZ2U6IG1lc3NhZ2VUZXh0LFxuICAgIGRhdGV0aW1lfSk7XG4gIHNldE1lc3NhZ2VTZW50KHtyZWNpZXZlcjp0YXJnZXROYW1lLGRhdGV0aW1lLG1lc3NhZ2U6bWVzc2FnZVRleHR9KVxuICBzZXRNZXNzYWdlVGV4dCgnJylcbn1cblxuY29uc3QgaGFuZGxlTWVzc2FnZUNoYW5nZSA9KGUpPT57XG5zZXRNZXNzYWdlVGV4dChlLnRhcmdldC52YWx1ZSlcblxufVxuXG4gIHVzZUVmZmVjdCgoKT0+e1xuICAgIGlmKHNvY2tldCAhPT1udWxsKXtcblxuICAgICBcbiAgICAgIHNvY2tldC5vbihcInRleHRfbWVzc2FnZVwiLCBkYXRhID0+IHtcbiAgICAgICAgY29uc3QgeyBzZW5kZXIgLCBtZXNzYWdlLCBkYXRldGltZSB9ID0gZGF0YTtcbiAgICAgICBcbiAgICAgIHNldE1lc3NhZ2VSZWNpZXZlZCh7c2VuZGVyLG1lc3NhZ2UsZGF0ZXRpbWV9KVxuICAgICAgfSk7XG4gICAgICBzb2NrZXQub24oXCJjb25uZWN0XCIsKCk9PntcbiAgICAgICBcbiAgICAgICAgc2V0Q29ubmVjdGVkKHRydWUpXG4gICAgICB9KVxuICBcbiAgICAgIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwoKT0+e1xuICAgICAgICBcbiAgICAgICAgc2V0Q29ubmVjdGVkKGZhbHNlKVxuICAgICAgfSlcblxuICAgICAgc29ja2V0Lm9uKCdlcnJvcicsKGVycm9yKT0+e1xuICAgICAgICBzZXRFcnJvcihbLi4uZXJyb3JzLGVycm9yXSlcbiAgICAgIH0pXG4gICAgfVxuXG4gIH0pXG5cblxuXG5yZXR1cm4ge21lc3NhZ2VSZWNpZXZlZCxtZXNzYWdlU2VudCxtZXNzYWdlVGV4dCxzZW5kTWVzc2FnZSxoYW5kbGVNZXNzYWdlQ2hhbmdlLGVycm9ycyxjb25uZWN0ZWR9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IHVzZVNvY2tldFxuXG4iLCJcblxuaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5cbmNvbnN0IERhdGVMaW5lYnJlYWsgPSh7ZGF0ZXRpbWV9KT0+e1xuICAgIHJldHVybiAoXG48ZGl2IHN0eWxlPXt7ZGlzcGxheTpcImZsZXhcIn19PlxuPGRpdiBzdHlsZT17e2ZsZXg6XCIxXCJ9fT48aHIgLz48L2Rpdj5cbjxkaXY+e25ldyBEYXRlKGRhdGV0aW1lKS50b0xvY2FsZURhdGVTdHJpbmcoKX08L2Rpdj5cbjxkaXYgc3R5bGU9e3tmbGV4OjF9fT48aHIgLz48L2Rpdj5cbjwvZGl2PlxuKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlTGluZWJyZWFrIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5cbmNvbnN0IE1lc3NhZ2VBbGlnbmVyID0gKHsgY2hpbGRyZW4sIHNpZGUsIHN0eWxlIH0pID0+IHtcbiAgICBjb25zdCBhbGlnbm1lbnQgPSBzaWRlID09PSBcImxlZnRcIiA/IFwiZmxleC1zdGFydFwiIDogXCJmbGV4LWVuZFwiXG4gICAgcmV0dXJuIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBhbGlnbm1lbnQsIC4uLnN0eWxlIH19PntjaGlsZHJlbn08L2Rpdj5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlQWxpZ25lciIsImltcG9ydCB7IGggfSBmcm9tICdwcmVhY3QnO1xuXG5cbmNvbnN0IE1lc3NhZ2VWaWV3ID0gKHsgbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yLCBkYXRldGltZSB9KSA9PiAoXG48ZGl2IHN0eWxlPXt7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgcGFkZGluZzogNSxcbiAgbWFyZ2luOiAyLFxuICBib3JkZXJSYWRpdXM6IDE1LFxuICBib3JkZXJDb2xvcjogJyM5RTlFOUUnLFxuICBib3JkZXJTdHlsZTogJ3NvbGlkJyxcbiAgYm9yZGVyV2lkdGg6IDIsXG4gIG1heFdpZHRoOiAnMTAwJScsXG4gIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gIG1pbldpZHRoOiAnMzAlJyxcbn19XG4+XG4gICAgPGRpdj57bWVzc2FnZX08L2Rpdj5cbiAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICBmb250U2l6ZTogMTAsXG4gICAgICBwYWRkaW5nVG9wOiAyLFxuICAgICAgdGV4dEFsaWduOiAnZW5kJyxcbiAgICB9fVxuICAgID5cbjxpIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJyNlZmViZTknIH19PntuZXcgRGF0ZShkYXRldGltZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9pPlxuXG4gICAgPC9kaXY+XG48L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VWaWV3O1xuIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UtdmlldydcblxuY29uc3QgU3Vic2VxdWVudE1lc3NhZ2UgPSAoeyBtZXNzYWdlLCBkYXRldGltZSB9KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIG1hcmdpbkxlZnQ6NDUgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBtZXNzYWdlPXttZXNzYWdlfSBkYXRldGltZT17ZGF0ZXRpbWV9IGJhY2tncm91bmRDb2xvcj1cIiNGRkVDQjNcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2VxdWVudE1lc3NhZ2UiLCJpbXBvcnQgeyBoIH0gZnJvbSAncHJlYWN0JztcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGhlaWdodDogMzAsXG4gIHdpZHRoOiA0MCxcbiAgcGFkZGluZzogMyxcbiAgYm9yZGVyUmFkaXVzOiAzMCxcbiAgYmFja2dyb3VuZENvbG9yOiAnZGFya1Ntb2tlJyxcbiAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gIGJvcmRlcldpZHRoOiAyLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGNvbG9yOiAnIzAwOTY4OCcsXG4gIGJvcmRlckNvbG9yOiAnIzgwY2JjNCcsXG59O1xuXG5cbmNvbnN0IE1lc3NhZ2VBdmF0YXIgPSAoeyBsZXR0ZXIgPSAnVScgfSkgPT4gKDxkaXYgc3R5bGU9e3N0eWxlfT48ZGl2PntsZXR0ZXIudG9VcHBlckNhc2UoKX08L2Rpdj48L2Rpdj4pO1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlQXZhdGFyO1xuIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UtdmlldydcbmltcG9ydCBNZXNzYWdlQXZhdGFyIGZyb20gJy4vbWVzc2FnZS1hdmF0YXInXG5cbmNvbnN0IEZpcnN0TWVzc2FnZSA9ICh7IG1lc3NhZ2UsIGRhdGV0aW1lLGxldHRlcixsb2NhbCB9KSA9PiB7XG5cbiAgICByZXR1cm4gKFxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICB7IWxvY2FsICYmPE1lc3NhZ2VBdmF0YXIgbGV0dGVyPXtsZXR0ZXJ9IC8+fVxuICAgICAgICAgICAgPE1lc3NhZ2UgbWVzc2FnZT17bWVzc2FnZX0gZGF0ZXRpbWU9e2RhdGV0aW1lfSBiYWNrZ3JvdW5kQ29sb3I9XCIjRkZFQ0IzXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpcnN0TWVzc2FnZSIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2pzeC1wcm9wcy1uby1zcHJlYWRpbmcgKi9cbmltcG9ydCB7IGggfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IE1lc3NhZ2VBbGlnbmVyIGZyb20gJy4vbWVzc2FnZS1hbGlnbmVyJztcbmltcG9ydCBGaXJzdE1lc3NhZ2UgZnJvbSAnLi9maXJzdC1tZXNzYWdlJztcbmltcG9ydCBTdWJzZXF1ZW50TWVzc2FnZSBmcm9tICcuL3N1YnNlcXVlbnQtbWVzc2FnZSc7XG5pbXBvcnQgRGF0ZUxpbmVicmVhayBmcm9tICcuL2RhdGUtbGluZWJyZWFrJztcblxuY29uc3QgTWVzc2FnZU9iamVjdE1hcHB0ZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG9yZGVyLCBkYXRlU3BhY2UgfSA9IHByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7ZGF0ZVNwYWNlICYmIDxEYXRlTGluZWJyZWFrIHsuLi5wcm9wc30gLz59XG4gICAgICAgICAgICA8TWVzc2FnZUFsaWduZXIgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgb3JkZXIgPT09ICdGJyA/IDxGaXJzdE1lc3NhZ2Ugey4uLnByb3BzfSAvPiA6IDxTdWJzZXF1ZW50TWVzc2FnZSB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L01lc3NhZ2VBbGlnbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZU9iamVjdE1hcHB0ZXI7XG4iLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7dXNlRWZmZWN0LHVzZVN0YXRlfSBmcm9tICdwcmVhY3QvaG9va3MnXG5cbmNvbnN0IHVzZU1lc3NhZ2VTb3J0ZXIgPShtZXNzYWdlcyk9PntcbmNvbnN0IFtzb3J0ZWRNZXNzYWdlcyxzZXRTb3J0ZWRNZXNzYWdlc109dXNlU3RhdGUobWVzc2FnZXMpXG51c2VFZmZlY3QoKCk9PntcblxuICAgIHNldFNvcnRlZE1lc3NhZ2VzKG1lc3NhZ2VzLnNvcnQoKGEsIGIpPT4gYS5kYXRldGltZSAtIGIuZGF0ZXRpbWUpKVxufSxbbWVzc2FnZXNdKVxuXG5yZXR1cm57c29ydGVkTWVzc2FnZXN9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZU1lc3NhZ2VTb3J0ZXJcblxuIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5pbXBvcnQge3VzZVN0YXRlLHVzZUVmZmVjdH0gZnJvbSAncHJlYWN0L2hvb2tzJ1xuXG5jb25zdCB1c2VNZXNzYWdlc01hcHBlciA9KG1lc3NhZ2VzKT0+e1xuICBjb25zdCBbbWFwcGVkTWVzc2FnZXMsc2V0TWFwcGVkTWVzc2FnZXNdPXVzZVN0YXRlKG1lc3NhZ2VzKVxuICBjb25zdCBtYXBNZXNzYWdlcyA9KCk9PntcbiAgICBjb25zdCBsb2NhbFNpZGUgPVwicmlnaHRcIlxuICAgIGNvbnN0IHJlbW90ZVNpZGU9XCJsZWZ0XCJcbiAgICBpZihtZXNzYWdlcy5sZW5ndGg9PT0wKXtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgICAgIGxldCBlbWFpbCA9IG1lc3NhZ2VzWzBdLmZyb21cbiAgICAgIGxldCBsYXN0RGF0ZXRpbWUgPSBtZXNzYWdlc1swXS5kYXRldGltZVxuICAgIHJldHVybiBtZXNzYWdlcy5tYXAoKG0sIGkpID0+IHtcbiAgXG4gICAgICBpZiAoaSA9PT0gMCAmJiBtLmxvY2FsKSB7XG4gICAgICBcbiAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiBsb2NhbFNpZGUsIG9yZGVyOiBcIkZcIiwgZGF0ZVNwYWNlOiB0cnVlIH1cbiAgICAgIH1cbiAgICAgIGlmIChpID09PSAwICYmICFtLmxvY2FsKSB7XG4gICAgIFxuICAgICAgICBjb25zdCBsZXR0ZXIgPSBtLmZyb21bMF0gIT09dW5kZWZpbmVkID8gbS5mcm9tWzBdOlwiXCJcbiAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiByZW1vdGVTaWRlLCBvcmRlcjogXCJGXCIsIGRhdGVTcGFjZTogdHJ1ZSxsZXR0ZXIgfVxuICAgICAgfVxuICAgXG4gICAgICBpZiAoaSA+IDAgJiYgZW1haWwgPT09IG0uZnJvbSAmJiBtLmxvY2FsKSB7XG4gICAgICAgICAgaWYgKG5ldyBEYXRlKGxhc3REYXRldGltZSkuZ2V0RGF0ZSgpICE9PSBuZXcgRGF0ZShtLmRhdGV0aW1lKS5nZXREYXRlKCkpIHtcbiAgICAgICAgICBcbiAgICAgICAgICAgICAgZW1haWwgPSBtLmZyb21cbiAgICAgICAgICAgICAgbGFzdERhdGV0aW1lID0gbS5kYXRldGltZVxuICAgICAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiBsb2NhbFNpZGUsIG9yZGVyOiBcIlNcIiwgZGF0ZVNwYWNlOiB0cnVlIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgICAgIGVtYWlsID0gbS5mcm9tXG4gICAgICAgICAgICAgIGxhc3REYXRldGltZSA9IG0uZGF0ZXRpbWVcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ubSwgc2lkZTogbG9jYWxTaWRlLCBvcmRlcjogXCJTXCIsIGRhdGVTcGFjZTogZmFsc2UgfVxuICAgICAgICAgIFxuICAgICAgfVxuICBcbiAgICAgIGlmIChpID4gMCAmJiBlbWFpbCAhPT0gbS5mcm9tICYmIG0ubG9jYWwpIHtcbiAgICAgICAgXG4gICAgICAgICAgaWYgKG5ldyBEYXRlKGxhc3REYXRldGltZSkuZ2V0RGF0ZSgpID09PSBuZXcgRGF0ZShtLmRhdGV0aW1lKS5nZXREYXRlKCkpIHtcbiAgICAgICAgIFxuICAgICAgICAgICAgICBlbWFpbCA9IG0uZnJvbVxuICAgICAgICAgICAgICBsYXN0RGF0ZXRpbWUgPSBtLmRhdGV0aW1lXG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLm0sIHNpZGU6IGxvY2FsU2lkZSwgb3JkZXI6IFwiRlwiLCBkYXRlU3BhY2U6IGZhbHNlIH1cbiAgICAgICAgICB9IFxuICAgICAgICAgICAgICBlbWFpbCA9IG0uZnJvbVxuICAgICAgICAgICAgICBsYXN0RGF0ZXRpbWUgPSBtLmRhdGV0aW1lXG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLm0sIHNpZGU6IGxvY2FsU2lkZSwgb3JkZXI6IFwiRlwiLCBkYXRlU3BhY2U6IHRydWUgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoaSA+IDAgJiYgZW1haWwgPT09IG0uZnJvbSAmJiAhbS5sb2NhbCkge1xuICAgICAgICBcbiAgICAgICAgICBpZiAobmV3IERhdGUobGFzdERhdGV0aW1lKS5nZXREYXRlKCkgIT09IG5ldyBEYXRlKG0uZGF0ZXRpbWUpLmdldERhdGUoKSkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSBtLmZyb21bMF0gIT09dW5kZWZpbmVkID8gbS5mcm9tWzBdOlwiXCJcbiAgICAgICAgICAgICAgbGFzdERhdGV0aW1lID0gbS5kYXRldGltZVxuICAgICAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiByZW1vdGVTaWRlLCBvcmRlcjogXCJTXCIsIGRhdGVTcGFjZTogdHJ1ZSxsZXR0ZXIgfVxuICAgICAgICAgIH0gXG4gICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSBtLmZyb21bMF0gIT09dW5kZWZpbmVkID8gbS5mcm9tWzBdOlwiXCJcbiAgICAgICAgICAgICAgbGFzdERhdGV0aW1lID0gbS5kYXRldGltZVxuICAgICAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiByZW1vdGVTaWRlLCBvcmRlcjogXCJTXCIsIGRhdGVTcGFjZTogZmFsc2UsbGV0dGVyIH1cbiAgICAgICAgICBcbiAgICAgIH1cbiAgICAgIGlmIChpID4gMCAmJiBlbWFpbCAhPT0gbS5mcm9tICYmICFtLmxvY2FsKSB7XG4gICAgICAgIFxuICAgICAgICAgIGlmIChuZXcgRGF0ZShsYXN0RGF0ZXRpbWUpLmdldERhdGUoKSA9PT0gbmV3IERhdGUobS5kYXRldGltZSkuZ2V0RGF0ZSgpKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSBtLmZyb21bMF0gIT09dW5kZWZpbmVkID8gbS5mcm9tWzBdOlwiXCJcbiAgICAgICAgICAgICAgZW1haWwgPSBtLmZyb21cbiAgICAgICAgICAgICAgbGFzdERhdGV0aW1lID0gbS5kYXRldGltZVxuICAgICAgICAgICAgICByZXR1cm4geyAuLi5tLCBzaWRlOiByZW1vdGVTaWRlLCBvcmRlcjogXCJGXCIsIGRhdGVTcGFjZTogZmFsc2UsbGV0dGVyIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgICAgY29uc3QgbGV0dGVyID0gbS5mcm9tWzBdICE9PXVuZGVmaW5lZCA/IG0uZnJvbVswXTpcIlwiXG4gICAgICAgICAgICAgIGVtYWlsID0gbS5mcm9tXG4gICAgICAgICAgICAgIGxhc3REYXRldGltZSA9IG0uZGF0ZXRpbWVcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ubSwgc2lkZTogcmVtb3RlU2lkZSwgb3JkZXI6IFwiRlwiLCBkYXRlU3BhY2U6IHRydWUsbGV0dGVyIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gIH0pXG4gIH1cblxuICB1c2VFZmZlY3QoKCk9PntcbiAgICBzZXRNYXBwZWRNZXNzYWdlcyhtYXBNZXNzYWdlcygpKVxuICB9LFttZXNzYWdlc10pXG5yZXR1cm4ge21hcHBlZE1lc3NhZ2VzfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VNZXNzYWdlc01hcHBlclxuIiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvanN4LXByb3BzLW5vLXNwcmVhZGluZyAqL1xuaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgTWVzc2FnZU9iamVjdE1hcHBlciBmcm9tICcuL21lc3NhZ2Utb2JqZWN0LW1hcHBlcidcblxuY29uc3QgTWVzc2FnZUNvbGxlY3Rpb25WaWV3ID0gKHsgbWVzc2FnZXMgfSkgPT57XG5cbiAgICBpZihtZXNzYWdlcy5sZW5ndGg+MCl7XG4gICAgICAgXG4gICAgICAgIHJldHVybiAgbWVzc2FnZXMubWFwKChtZXNzYWdlLCBpKSA9PiA8TWVzc2FnZU9iamVjdE1hcHBlciB7Li4ubWVzc2FnZX0ga2V5PXtpfSAvPilcbiAgICB9XG4gICAgIHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VDb2xsZWN0aW9uVmlldyIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRlcHJlY2F0ZWQgKi9cbmltcG9ydCB7aCwgQ29tcG9uZW50fSBmcm9tICdwcmVhY3QnXG5cblxuXG5jbGFzcyBNZXNzYWdlVmlld1Njcm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgIHRoaXMuZ290b0JvdHRvbSgpXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5nb3RvQm90dG9tKClcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIGdvdG9Cb3R0b20gKCkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJtc2dWaWV3U2Nyb2xsZXJcIik7XG4gICAgZWxlbWVudHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5zY3JvbGxUb3AgPSBlLnNjcm9sbEhlaWdodCAtIGUuY2xpZW50SGVpZ2h0O1xuICAgIH0pXG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBzdHlsZSB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiAoXG48ZGl2XG4gIG5hbWU9XCJtc2dWaWV3U2Nyb2xsZXJcIlxuICBzdHlsZT17e1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNlZGVmZjJcIixcbiAgICAgIG92ZXJmbG93OiBcImF1dG9cIixcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsIC4uLnN0eWxlXG4gICAgfX1cbj5cbntjaGlsZHJlbn1cblxuPC9kaXY+XG4pXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlVmlld1Njcm9sbGVyIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2hhZG93ICovXG5pbXBvcnQge2h9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB1c2VNZXNzYWdlU29ydGVyIGZyb20gJy4vdXNlTWVzc2FnZVNvcnRlcidcbmltcG9ydCB1c2VNZXNzYWdlTWFwcGVyIGZyb20gJy4vdXNlTWVzc2FnZU1hcHBlcidcbmltcG9ydCBNZXNzYWdlQ29sbGVjdGlvblZpZXcgZnJvbSAnLi9tZXNzYWdlLWNvbGxlY3Rpb24tdmlldydcbmltcG9ydCBNZXNzYWdlVmlld1Njcm9sbGVyIGZyb20gJy4vbWVzc2FnZXMtdmlldy1zY3JvbGxlcidcblxuY29uc3QgTWVzc2FnZXNEaXNwbGF5ZXIgPSAoeyBtZXNzYWdlcyB9KSA9PiB7XG4gICAgY29uc3Qge3NvcnRlZE1lc3NhZ2VzfT0gdXNlTWVzc2FnZVNvcnRlcihtZXNzYWdlcylcbiAgICBjb25zdCB7bWFwcGVkTWVzc2FnZXN9PXVzZU1lc3NhZ2VNYXBwZXIoc29ydGVkTWVzc2FnZXMpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZVZpZXdTY3JvbGxlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlQ29sbGVjdGlvblZpZXcgbWVzc2FnZXM9e21hcHBlZE1lc3NhZ2VzfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2VWaWV3U2Nyb2xsZXI+XG5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlc0Rpc3BsYXllclxuXG4iLCJcbmltcG9ydCB7IGggfSBmcm9tICdwcmVhY3QnO1xuXG5jb25zdCBNZXNzYWdlRWRpdG9yRGlzcGxheWVyID0gKHtcbiAgb25NZXNzYWdlQ2hhbmdlLCBtZXNzYWdlLCBzZW5kTWVzc2FnZSwgaWQgPSAwLCBkaXNhYmxlZCxcbn0pID0+IChcbiAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcgfX0+XG4gICAgPGlucHV0IHN0eWxlPXt7IGZsZXg6IDEgfX0gZGF0YS10ZXN0aWQ9e2BtZXNzYWdlJHtpZH1gfSBvbklucHV0PXtvbk1lc3NhZ2VDaGFuZ2V9IHZhbHVlPXttZXNzYWdlfSBuYW1lPVwibWVzc2FnZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFbnRlciBtZXNzYWdlIHRleHRcIiAvPlxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnIH19PlxuICAgICAgICAgIDxidXR0b24gZGF0YS10ZXN0aWQ9e2BzZW5kTWVzc2FnZSR7aWR9YH0gZGlzYWJsZWQ9e21lc3NhZ2UgPT09ICcnIHx8IGRpc2FibGVkfSBzdHlsZT17eyBtYXJnaW5MZWZ0OiAyLCB3aWR0aDogJzEwMCUnIH19IG9uQ2xpY2s9e3NlbmRNZXNzYWdlfT5cblxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yLjAxIDIxTDIzIDEyIDIuMDEgMyAyIDEwbDE1IDItMTUgMnpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUVkaXRvckRpc3BsYXllcjtcbiIsImltcG9ydCB7aH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHt1c2VTdGF0ZSx1c2VFZmZlY3R9IGZyb20gJ3ByZWFjdC9ob29rcydcblxuY29uc3QgdXNlQ2hhdExvZyA9KHtuYW1lLG1lc3NhZ2VSZWNpZXZlZCxtZXNzYWdlU2VudH0pPT57XG4gIGNvbnN0IFttZXNzYWdlcyxzZXRNZXNzYWdlc109dXNlU3RhdGUoW10pXG4gIFxuICBjb25zdCBzYXZlVG9Mb2NhbFN0b3JhZ2UgPSAobSwga2V5KSA9PiB7XG4gICAgY29uc3QgcGVyc2lzdGVkTWVzc2FnZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpID09PSBudWxsID8gW21dIDogWy4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSksIG1dXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShwZXJzaXN0ZWRNZXNzYWdlcykpO1xuICAgIHJldHVybiBwZXJzaXN0ZWRNZXNzYWdlc1xufVxuICAvLyBjb21wb25lbnREaWRNb3VudFxuICB1c2VFZmZlY3QoKCk9PntcbiAgICBzZXRNZXNzYWdlcyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpKSA9PT0gbnVsbCA/XG4gICAgIFtdIDogWy4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkpXSlcbiAgICAgXG4gIH0sW10pXG4gIC8vIHNhdmVSZW1vdGVNZXNzYWdlXG4gdXNlRWZmZWN0KCgpPT57XG4gICBpZihtZXNzYWdlUmVjaWV2ZWQhPT1udWxsKVxuICAge1xuICAgIGNvbnN0IHsgZGF0ZXRpbWUsIG1lc3NhZ2UsIHNlbmRlciB9ID0gbWVzc2FnZVJlY2lldmVkXG4gICAgY29uc3QgbG9jYWwgPSBmYWxzZVxuICBzZXRNZXNzYWdlcyhzYXZlVG9Mb2NhbFN0b3JhZ2UoIHsgbWVzc2FnZSwgZnJvbTogc2VuZGVyLCBsb2NhbCwgZGF0ZXRpbWUsIHRvOiBuYW1lIH0sbmFtZSkpXG4gICB9XG4gIFxuIH0sW21lc3NhZ2VSZWNpZXZlZF0pXG5cbiAgLy8gc2F2ZUxvY2FsTWVzc2FnZVxuICB1c2VFZmZlY3QoKCk9PntcbiAgICBpZihtZXNzYWdlU2VudCE9PW51bGwpe1xuICAgICBcbiAgICAgIGNvbnN0IHsgZGF0ZXRpbWUsIG1lc3NhZ2UsIHJlY2lldmVyIH0gPSBtZXNzYWdlU2VudFxuICAgICAgY29uc3QgbG9jYWwgPSB0cnVlXG4gICAgICBjb25zdCBmcm9tID1uYW1lXG4gICAgc2V0TWVzc2FnZXMoc2F2ZVRvTG9jYWxTdG9yYWdlKCB7IG1lc3NhZ2UsIGZyb20sIGxvY2FsLCBkYXRldGltZSwgdG86IHJlY2lldmVyIH0sbmFtZSkpXG5cbiAgICB9XG59LFttZXNzYWdlU2VudF0pXG4gXG4gIHJldHVybiB7bWVzc2FnZXN9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNoYXRMb2dcblxuIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgdXNlU29ja2V0IGZyb20gJy4vdXNlU29ja2V0J1xuaW1wb3J0IE1lc3NhZ2VzRGlzcGxheWVyIGZyb20gJy4uL3NoYXJlYWJsZS11aS9tZXNzYWdlcy1kaXNwbGF5ZXInXG5pbXBvcnQgTWVzc2FnZUVkaXRvckRpc3BsYXllciBmcm9tICcuLi9zaGFyZWFibGUtdWkvbWVzc2FnZS1lZGl0b3ItZGlzcGxheWVyJ1xuaW1wb3J0IHVzZUNoYXRMb2cgZnJvbSAnLi4vc2hhcmVhYmxlLWhvb2tzL3VzZUNoYXRMb2cnXG5cbmNvbnN0IE1lc3NhZ2luZ01vZHVsZVNvY2tldCA9ICh7IG5hbWUsIHRhcmdldE5hbWUsIHNvY2tldCwgaWQ9MCAsaGVpZ2h0PVwiOTZ2aFwifSkgPT4ge1xuICBjb25zdCB7bWVzc2FnZVNlbnQsbWVzc2FnZVJlY2lldmVkLCBtZXNzYWdlVGV4dCxzZW5kTWVzc2FnZSxoYW5kbGVNZXNzYWdlQ2hhbmdlfSA9dXNlU29ja2V0KHtzb2NrZXQsdGFyZ2V0TmFtZX0pXG4gIGNvbnN0IHttZXNzYWdlc30gPXVzZUNoYXRMb2coe25hbWUsbWVzc2FnZVJlY2lldmVkLG1lc3NhZ2VTZW50fSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQsIHdpZHRoOlwiMTAwJVwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VzRGlzcGxheWVyIG1lc3NhZ2VzPXttZXNzYWdlc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlRWRpdG9yRGlzcGxheWVyIGRpc2FibGVkPXtzb2NrZXQ9PT1udWxsfSBpZD17aWR9IG1lc3NhZ2U9e21lc3NhZ2VUZXh0fSBzZW5kTWVzc2FnZT17c2VuZE1lc3NhZ2V9IG9uTWVzc2FnZUNoYW5nZT17aGFuZGxlTWVzc2FnZUNoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnaW5nTW9kdWxlU29ja2V0XG4iLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCBTb2NrZXRDb21wb25lbnQgZnJvbSAnLi9Tb2NrZXRDb21wb25lbnQnXG5pbXBvcnQgTWVzc2FnZU1vZHVsZVNvY2tldCBmcm9tICcuLi8uLi9ydGNqcy9tZXNzYWdpbmctbW9kdWxlLXNvY2tldCdcbmNvbnN0IENoYXRVc2VyID0gKHsgbmFtZSwgdGFyZ2V0TmFtZSB9KSA9PiB7XG4gICAgcmV0dXJuICg8U29ja2V0Q29tcG9uZW50IHVzZXJuYW1lPXtuYW1lfT57KCh7IHNvY2tldCxjb25uZWN0ZWQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiAgc3R5bGU9e3tmbGV4OjEsbWFyZ2luOjEwfX0+XG4gICAgICAgICAgICAgICAgPGRpdj5Vc2VyOntuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e2Nvbm5lY3RlZCA/IDxpIHN0eWxlPXt7Y29sb3I6XCJncmVlblwifX0+Y29ubmVjdGVkPC9pPjo8aSBzdHlsZT17e2NvbG9yOlwib3JhbmdlXCJ9fT5jb25uZWN0aW5nLi4uPC9pPn08L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVzc2FnZU1vZHVsZVNvY2tldCBoZWlnaHQ9XCI1MHZoXCIgbmFtZT17bmFtZX0gdGFyZ2V0TmFtZT17dGFyZ2V0TmFtZX0gc29ja2V0PXtzb2NrZXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApXG4gICAgfSl9PC9Tb2NrZXRDb21wb25lbnQ+KVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0VXNlciIsImltcG9ydCB7aH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IENoYXRVc2VyIGZyb20gJy4vQ2hhdFVzZXInXG5jb25zdCBDaGF0Um9vbSA9KCk9PntcbnJldHVybihcblxuICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZmxleFwiLGFsaWduSXRlbXM6XCJjZW50ZXJcIn19PlxuICAgICAgICA8Q2hhdFVzZXIgbmFtZSA9XCJtYXJpb1wiIHRhcmdldE5hbWU9XCJkcmFnb3NcIi8+XG4gICAgICAgIDxDaGF0VXNlciBuYW1lID1cImRyYWdvc1wiIHRhcmdldE5hbWU9XCJtYXJpb1wiLz5cbiAgICA8L2Rpdj5cbilcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdFJvb21cbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiX3R5cGVvZiIsImdsb2JhbCIsImgiLCJ5IiwibiIsIm1zIiwicyIsIm0iLCJkIiwicGFyc2UiLCJmbXRMb25nIiwiZm10U2hvcnQiLCJwbHVyYWwiLCJ0b1N0cmluZyIsInJlYWQiLCJ3cml0ZSIsImJhc2U2NC5mcm9tQnl0ZUFycmF5IiwiaWVlZTc1NC5yZWFkIiwiaWVlZTc1NC53cml0ZSIsImJhc2U2NC50b0J5dGVBcnJheSIsIkJ1ZmZlci5pc0J1ZmZlciIsImlzQnVmIiwiaXNBcnJheSIsIkVtaXR0ZXIiLCJoYXNDT1JTIiwid2l0aE5hdGl2ZUJsb2IiLCJ3aXRoTmF0aXZlRmlsZSIsIm5vb3AiLCJCbG9iIiwiYmxvYiIsInNsaWNlQnVmZmVyIiwiaGFzQmluYXJ5IiwiYWZ0ZXIiLCJwYXJzZXIiLCJlbmNvZGUiLCJkZWNvZGUiLCJkZWJ1ZyIsInJlcXVpcmUkJDEiLCJUcmFuc3BvcnQiLCJpbmhlcml0IiwieWVhc3QiLCJQb2xsaW5nIiwiWE1MSHR0cFJlcXVlc3QiLCJlbXB0eSIsInBvbGxpbmciLCJYSFIiLCJKU09OUCIsInRyYW5zcG9ydCIsImluZGV4Iiwib24iLCJiaW5kIiwidG9BcnJheSIsImhhc0JpbiIsIkJhY2tvZmYiLCJlaW8iLCJTb2NrZXQiLCJpbmRleE9mIiwidXJsIiwiTWFuYWdlciIsIlNvY2tldENvbXBvbmVudCIsInRva2VuIiwic29ja2V0IiwiY29ubmVjdGVkIiwidXNlcm5hbWUiLCJwcm9wcyIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImlvIiwicXVlcnkiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsImNoaWxkcmVuIiwic3RhdGUiLCJDb21wb25lbnQiLCJpIiwidXNlU29ja2V0IiwidGFyZ2V0TmFtZSIsInVzZVN0YXRlIiwibWVzc2FnZVRleHQiLCJzZXRNZXNzYWdlVGV4dCIsIm1lc3NhZ2VSZWNpZXZlZCIsInNldE1lc3NhZ2VSZWNpZXZlZCIsIm1lc3NhZ2VTZW50Iiwic2V0TWVzc2FnZVNlbnQiLCJzZXRDb25uZWN0ZWQiLCJlcnJvcnMiLCJzZXRFcnJvciIsInNlbmRNZXNzYWdlIiwiZGF0ZXRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImVtaXQiLCJyZWNpZXZlciIsIm1lc3NhZ2UiLCJoYW5kbGVNZXNzYWdlQ2hhbmdlIiwiZSIsInRhcmdldCIsInZhbHVlIiwidXNlRWZmZWN0Iiwic2VuZGVyIiwiRGF0ZUxpbmVicmVhayIsImRpc3BsYXkiLCJmbGV4IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiTWVzc2FnZUFsaWduZXIiLCJzaWRlIiwic3R5bGUiLCJhbGlnbm1lbnQiLCJqdXN0aWZ5Q29udGVudCIsIk1lc3NhZ2VWaWV3IiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsIm1hcmdpbiIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJXaWR0aCIsIm1heFdpZHRoIiwid29yZFdyYXAiLCJ3b3JkQnJlYWsiLCJtaW5XaWR0aCIsImZvbnRTaXplIiwicGFkZGluZ1RvcCIsInRleHRBbGlnbiIsInRvTG9jYWxlVGltZVN0cmluZyIsIlN1YnNlcXVlbnRNZXNzYWdlIiwiYWxpZ25JdGVtcyIsIm1hcmdpbkxlZnQiLCJNZXNzYWdlIiwiaGVpZ2h0Iiwid2lkdGgiLCJjb2xvciIsIk1lc3NhZ2VBdmF0YXIiLCJsZXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsIkZpcnN0TWVzc2FnZSIsImxvY2FsIiwiTWVzc2FnZU9iamVjdE1hcHB0ZXIiLCJvcmRlciIsImRhdGVTcGFjZSIsInVzZU1lc3NhZ2VTb3J0ZXIiLCJtZXNzYWdlcyIsInNvcnRlZE1lc3NhZ2VzIiwic2V0U29ydGVkTWVzc2FnZXMiLCJzb3J0IiwiYSIsImIiLCJ1c2VNZXNzYWdlc01hcHBlciIsIm1hcHBlZE1lc3NhZ2VzIiwic2V0TWFwcGVkTWVzc2FnZXMiLCJtYXBNZXNzYWdlcyIsImxvY2FsU2lkZSIsInJlbW90ZVNpZGUiLCJsZW5ndGgiLCJlbWFpbCIsImZyb20iLCJsYXN0RGF0ZXRpbWUiLCJtYXAiLCJ1bmRlZmluZWQiLCJnZXREYXRlIiwiTWVzc2FnZUNvbGxlY3Rpb25WaWV3IiwiTWVzc2FnZU9iamVjdE1hcHBlciIsIk1lc3NhZ2VWaWV3U2Nyb2xsZXIiLCJnb3RvQm90dG9tIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlOYW1lIiwiZm9yRWFjaCIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsIm92ZXJmbG93IiwiTWVzc2FnZXNEaXNwbGF5ZXIiLCJ1c2VNZXNzYWdlTWFwcGVyIiwiTWVzc2FnZUVkaXRvckRpc3BsYXllciIsIm9uTWVzc2FnZUNoYW5nZSIsImlkIiwiZGlzYWJsZWQiLCJ1c2VDaGF0TG9nIiwibmFtZSIsInNldE1lc3NhZ2VzIiwic2F2ZVRvTG9jYWxTdG9yYWdlIiwia2V5IiwicGVyc2lzdGVkTWVzc2FnZXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInRvIiwiTWVzc2FnaW5nTW9kdWxlU29ja2V0IiwiQ2hhdFVzZXIiLCJNZXNzYWdlTW9kdWxlU29ja2V0IiwiQ2hhdFJvb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQSxJQUFJLE9BQU8sSUFBSSxVQUFVLE9BQU8sRUFBRTs7RUFHaEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUMxQixJQUFJ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QUFLLENBQUMsR0FBRyxFQUFFO0NBQ25CLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0NBQ2hDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0NBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQzVCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzlCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQzVCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzlCLFdBQVcsQ0FBQyxRQUFRLEdBQUdMLEVBQWEsQ0FBQzs7Q0FFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJO0VBQy9CLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDNUIsQ0FBQyxDQUFDOzs7OztDQUtILFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Q0FNM0IsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDdkIsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Q0FPdkIsV0FBVyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O0NBUTVCLFNBQVMsV0FBVyxDQUFDLFNBQVMsRUFBRTtFQUMvQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7O0VBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7R0FDMUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3RELElBQUksSUFBSSxDQUFDLENBQUM7R0FDVjs7RUFFRCxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FB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LENBQUMsQ0FBQyxDQUFDLEVBQUU7O0lBRWQsU0FBUztJQUNUOztHQUVELFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7R0FFNUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0lBQzFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckUsTUFBTTtJQUNOLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRDtHQUNEOztFQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7R0FDbEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUMxQyxRQUFRLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzNEO0VBQ0Q7Ozs7Ozs7O0NBUUQsU0FBUyxPQUFPLEdBQUc7RUFDbEIsTUFBTSxVQUFVLEdBQUc7R0FDbEIsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7R0FDckMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7R0FDdkUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDWixXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZCLE9BQU8sVUFBVSxD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QUM7Ozs7OztBQU1uQyxjQUFjLEdBQUc7RUFDZixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO0VBQzNFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7RUFDM0UsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztFQUMzRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO0VBQzNFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7RUFDM0UsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztFQUMzRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO0VBQzNFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7RUFDM0UsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztFQUMzRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO0VBQzNFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztDQUNqRSxDQUFDOzs7Ozs7Ozs7O0FBVUYsU0FBUyxTQUFTLEdBQUc7Ozs7RUFJbkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENB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QUssQ0FBQyxnREFBZ0QsQ0FBQztHQUNsRTs7Ozs7OztFQU9ELFlBQVksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUM7OztFQUd0RSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFDOzs7RUFHekMsQ0FBQyxHQUFHLFlBQVksR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFHOztFQUVwQyxJQUFJLENBQUMsR0FBRyxFQUFDOztFQUVULEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3hDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztJQUNsSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksS0FBSTtJQUM3QixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSTtJQUM1QixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSTtHQUN0Qjs7RUFFRCxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7SUFDdEIsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO0lBQ25GLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFJO0dBQ3RCLE1BQU0sSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO0lBQzdCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztJQUM5SCxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSTtJQUM1QixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSTtHQUN0Qjs7RUFFRCxPQUFPLEdBQUc7Q0FDWDs7QUFFRCxTQUFTLGVBQWUsRUFBRSxHQUFHLEVBQUU7RUFDN0IsT0FBTyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztDQUMxRzs7QUFFRCxTQUFTLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtFQUN2QyxJQUFJLElBQUc7RUFDUCxJQUFJLE1BQU0sR0FBRyxHQUFFO0VBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ25DLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFDO0dBQ2xDO0VBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUN2Qjs7QUFFRCxBQUFPLFNBQVMsYUFBYSxFQUFFLEtBQUssRUFBRTtFQUNwQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ1gsSUFBSSxFQUFFLENBQUM7R0FDUjtFQUNELElBQUksSUFBRztFQUNQLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFNO0VBQ3RCLElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFDO0VBQ3hCLElBQUksTUFBTSxHQUFHLEdBQUU7RUFDZixJQUFJLEtBQUssR0FBRyxHQUFFO0VBQ2QsSUFBSSxjQUFjLEdBQUcsTUFBSzs7O0VBRzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtJQUN0RSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLGNBQWMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFDO0dBQzdGOzs7RUFHRCxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7SUFDcEIsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFDO0lBQ3BCLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBQztJQUMxQixNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUM7SUFDbkMsTUFBTSxJQUFJLEtBQUk7R0FDZixNQUFNLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtJQUMzQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFDO0lBQzlDLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBQztJQUMzQixNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUM7SUFDbkMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFDO0lBQ25DLE1BQU0sSUFBSSxJQUFHO0dBQ2Q7O0VBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUM7O0VBRWxCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDdEI7O0FDNUdNLFNBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7RUFDeEQsSUFBSSxDQUFDLEVBQUUsRUFBQztFQUNSLElBQUksSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUM7RUFDaEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUM7RUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUM7RUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFDO0VBQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBQztFQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBQztFQUNyQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQzs7RUFFMUIsQ0FBQyxJQUFJLEVBQUM7O0VBRU4sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQztFQUM3QixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUM7RUFDZCxLQUFLLElBQUksS0FBSTtFQUNiLE9BQU8sS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFOztFQUUxRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDO0VBQzdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQztFQUNkLEtBQUssSUFBSSxLQUFJO0VBQ2IsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7O0VBRTFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNYLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBSztHQUNkLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDO0dBQzNDLE1BQU07SUFDTCxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBQztJQUN6QixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQUs7R0FDZDtFQUNELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ2hEOztBQUVELEFBQU8sU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7RUFDaEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7RUFDWCxJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFDO0VBQ2hDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFDO0VBQzFCLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFDO0VBQ3JCLElBQUksRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQztFQUNoRSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUM7RUFDL0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7RUFDckIsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUM7O0VBRTNELEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQzs7RUFFdkIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUN0QyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDO0lBQ3hCLENBQUMsR0FBRyxLQUFJO0dBQ1QsTUFBTTtJQUNMLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztJQUMxQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNyQyxDQUFDLEdBQUU7TUFDSCxDQUFDLElBQUksRUFBQztLQUNQO0lBQ0QsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsRUFBRTtNQUNsQixLQUFLLElBQUksRUFBRSxHQUFHLEVBQUM7S0FDaEIsTUFBTTtNQUNMLEtBQUssSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBQztLQUNyQztJQUNELElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDbEIsQ0FBQyxHQUFFO01BQ0gsQ0FBQyxJQUFJLEVBQUM7S0FDUDs7SUFFRCxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxFQUFFO01BQ3JCLENBQUMsR0FBRyxFQUFDO01BQ0wsQ0FBQyxHQUFHLEtBQUk7S0FDVCxNQUFNLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEVBQUU7TUFDekIsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFDO01BQ3ZDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBSztLQUNkLE1BQU07TUFDTCxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENB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LENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDM0I7O0FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtFQUNyRSxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUM7O0VBRWxELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtLQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3JCOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDO0VBQ2xELE9BQU9DLElBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQy9DOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDO0VBQ2xELE9BQU9BLElBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQ2hEOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDO0VBQ2xELE9BQU9BLElBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQy9DOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDO0VBQ2xELE9BQU9BLElBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQ2hEOztBQUVELFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLDZDQUE2QyxDQUFDO0VBQzlGLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFLE1BQU0sSUFBSSxVQUFVLENBQUMsbUNBQW1DLENBQUM7RUFDekYsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztDQUMxRTs7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7RUFDeEYsS0FBSyxHQUFHLENBQUMsTUFBSztFQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBQztFQUNuQixVQUFVLEdBQUcsVUFBVSxHQUFHLEVBQUM7RUFDM0IsSUFBSSxDQUFDLFFBQVEsRUFBRTtJQUNiLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFDO0lBQzlDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBQztHQUN2RDs7RUFFRCxJQUFJLEdBQUcsR0FBRyxFQUFDO0VBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBQztFQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSTtFQUMzQixPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUU7SUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksS0FBSTtHQUN4Qzs7RUFFRCxPQUFPLE1BQU0sR0FBRyxVQUFVO0VBQzNCOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtFQUN4RixLQUFLLEdBQUcsQ0FBQyxNQUFLO0VBQ2QsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFDO0VBQ25CLFVBQVUsR0FBRyxVQUFVLEdBQUcsRUFBQztFQUMzQixJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUM7SUFDOUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDO0dBQ3ZEOztFQUVELElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxFQUFDO0VBQ3RCLElBQUksR0FBRyxHQUFHLEVBQUM7RUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFJO0VBQy9CLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRTtJQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFJO0dBQ3hDOztFQUVELE9BQU8sTUFBTSxHQUFHLFVBQVU7RUFDM0I7O0FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDMUUsS0FBSyxHQUFHLENBQUMsTUFBSztFQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBQztFQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQztFQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQztFQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksRUFBQztFQUM3QixPQUFPLE1BQU0sR0FBRyxDQUFDO0VBQ2xCOztBQUVELFNBQVMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFO0VBQzVELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxFQUFDO0VBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDaEUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDbkUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztHQUNqQztDQUNGOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0VBQ2hGLEtBQUssR0FBRyxDQUFDLE1BQUs7RUFDZCxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUM7RUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7RUFDMUQsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUM7SUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFDO0dBQ2pDLE1BQU07SUFDTCxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7R0FDN0M7RUFDRCxPQUFPLE1BQU0sR0FBRyxDQUFDO0VBQ2xCOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0VBQ2hGLEtBQUssR0FBRyxDQUFDLE1BQUs7RUFDZCxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUM7RUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7RUFDMUQsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUM7SUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFDO0dBQ2xDLE1BQU07SUFDTCxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7R0FDOUM7RUFDRCxPQUFPLE1BQU0sR0FBRyxDQUFDO0VBQ2xCOztBQUVELFNBQVMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFO0VBQzVELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsVUFBVSxHQUFHLEtBQUssR0FBRyxFQUFDO0VBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDaEUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSTtHQUNwRTtDQUNGOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0VBQ2hGLEtBQUssR0FBRyxDQUFDLE1BQUs7RUFDZCxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUM7RUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUM7RUFDOUQsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFDO0lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBQztJQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUM7SUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUM7R0FDOUIsTUFBTTtJQUNMLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztHQUM3QztFQUNELE9BQU8sTUFBTSxHQUFHLENBQUM7RUFDbEI7O0FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDaEYsS0FBSyxHQUFHLENBQUMsTUFBSztFQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBQztFQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBQztFQUM5RCxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtJQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBQztJQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUM7SUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFDO0lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksRUFBQztHQUNsQyxNQUFNO0lBQ0wsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO0dBQzlDO0VBQ0QsT0FBTyxNQUFNLEdBQUcsQ0FBQztFQUNsQjs7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7RUFDdEYsS0FBSyxHQUFHLENBQUMsTUFBSztFQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBQztFQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEVBQUM7O0lBRTNDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQztHQUM3RDs7RUFFRCxJQUFJLENBQUMsR0FBRyxFQUFDO0VBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBQztFQUNYLElBQUksR0FBRyxHQUFHLEVBQUM7RUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUk7RUFDM0IsT0FBTyxFQUFFLENBQUMsR0FBRyxVQUFVLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO0lBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUN4RCxHQUFHLEdBQUcsRUFBQztLQUNSO0lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUk7R0FDckQ7O0VBRUQsT0FBTyxNQUFNLEdBQUcsVUFBVTtFQUMzQjs7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7RUFDdEYsS0FBSyxHQUFHLENBQUMsTUFBSztFQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBQztFQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEVBQUM7O0lBRTNDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQztHQUM3RDs7RUFFRCxJQUFJLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBQztFQUN0QixJQUFJLEdBQUcsR0FBRyxFQUFDO0VBQ1gsSUFBSSxHQUFHLEdBQUcsRUFBQztFQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUk7RUFDL0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO0lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUN4RCxHQUFHLEdBQUcsRUFBQztLQUNSO0lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUk7R0FDckQ7O0VBRUQsT0FBTyxNQUFNLEdBQUcsVUFBVTtFQUMzQjs7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtFQUN4RSxLQUFLLEdBQUcsQ0FBQyxNQUFLO0VBQ2QsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFDO0VBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUM7RUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7RUFDMUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEVBQUM7RUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUM7RUFDN0IsT0FBTyxNQUFNLEdBQUcsQ0FBQztFQUNsQjs7QUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtFQUM5RSxLQUFLLEdBQUcsQ0FBQyxNQUFLO0VBQ2QsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFDO0VBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUM7RUFDaEUsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUM7SUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFDO0dBQ2pDLE1BQU07SUFDTCxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7R0FDN0M7RUFDRCxPQUFPLE1BQU0sR0FBRyxDQUFDO0VBQ2xCOztBQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsWUFBWSxFQUFFLEtBQUss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Q0FBQy9FLElBQUMsQ0FBQyxDQUFDLE9BQU9HLEdBQUMsQ0FBQyxDQUFDLENBQUNILElBQUMsQ0FBQyxDQUFDLFNBQVNHLEdBQUMsQ0FBQ0gsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNBLElBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLElBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxBQUEyZ0IsU0FBUyxDQUFDLEVBQUUsQ0FBQytFLEdBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUy9FLElBQUMsQ0FBQyxDQUFDQSxJQUFDLENBQUMsR0FBRyxHQUFHQSxJQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNBLElBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDK0UsR0FBQyxDQUFDLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQy9FLElBQUMsQ0FBQyxDQUFDQSxJQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQUNBLElBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDQSxJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHQSxJQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDQSxJQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDQSxJQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBR0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBU0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcrRSxHQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEdBQUcsU0FBUy9FLElBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQ0EsSUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVNBLElBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVNBLElBQUMsQ0FBQyxDQUFDQSxJQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBQyxDQUFDLEdBQUcsQ0FBQ0EsSUFBQyxDQUFDLEdBQUcsQ0FBQyxN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
