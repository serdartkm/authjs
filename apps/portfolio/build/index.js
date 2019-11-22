import { a as b, b as I, c as y, d as h, e as preact_module, f as createCommonjsModule, g as commonjsGlobal, h as E } from './chunk-7f0399f9.js';

var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
		c = url.match(reg),
		matches = {},
		ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i=0; i<p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1=0; i$1<max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0)===':') {
			var param = route[i$1].replace(/(^:|[+*?]+$)/g, ''),
				flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
				plus = ~flags.indexOf('+'),
				star = ~flags.indexOf('*'),
				val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?')<0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		}
		else if (route[i$1]!==url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default!==true && ret===false) { return false; }
	return matches;
}

function pathRankSort(a, b$$1) {
	return (
		(a.rank < b$$1.rank) ? 1 :
			(a.rank > b$$1.rank) ? -1 :
				(a.index - b$$1.index)
	);
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.props;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0)==':' ? (1 + '*+?'.indexOf(segment.charAt(segment.length-1))) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.props.default ? 0 : rank(vnode.props.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function setUrl(url, type) {
	if ( type === void 0 ) type='push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history!=='undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}


function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location!=='undefined' ? location : EMPTY;
	}
	return ("" + (url.pathname || '') + (url.search || ''));
}



function route(url, replace) {
	if ( replace === void 0 ) replace=false;

	if (typeof url!=='string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}


/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i=ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) { return true; }
	}
	return false;
}


/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i=0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)===true) {
			didRoute = true;
		}
	}
	for (var i$1=subscribers.length; i$1--; ) {
		subscribers[i$1](url);
	}
	return didRoute;
}


function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) { return; }

	var href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) { return; }

	// attempt to route, if no match simply cede control to browser
	return route(href);
}


function handleLinkClick(e) {
	if (e.button==0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}


function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		e.preventDefault();
	}
	return false;
}


function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button!==0) { return; }

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase()==='A' && t.getAttribute('href')) {
			if (t.hasAttribute('native')) { return; }
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t=t.parentNode));
}


var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) { return; }

	if (typeof addEventListener==='function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}


var Router = (function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if ( Component$$1 ) Router.__proto__ = Component$$1;
	Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate (props) {
		if (props.static!==true) { return true; }
		return props.url!==this.props.url || props.onChange!==this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute (url) {
		var children = b(this.props.children);
		return this.getMatchingChildren(children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo (url) {
		this.setState({ url: url });

		var didRoute = this.canRoute(url);

		// trigger a manual re-route if we're not in the middle of an update:
		if (!this.updating) { this.forceUpdate(); }

		return didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount () {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount () {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo(("" + (location.pathname || '') + (location.search || '')));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount () {
		if (typeof this.unlisten==='function') { this.unlisten(); }
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate () {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate () {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren (children, url, invoke) {
		return children
			.filter(prepareVNodeForRanking)
			.sort(pathRankSort)
			.map( function (vnode) {
				var matches = exec(url, vnode.props.path, vnode.props);
				if (matches) {
					if (invoke !== false) {
						var newProps = { url: url, matches: matches };
						assign(newProps, matches);
						delete newProps.ref;
						delete newProps.key;
						return I(vnode, newProps);
					}
					return vnode;
				}
			}).filter(Boolean);
	};

	Router.prototype.render = function render (ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(b(children), url, true);

		var current = active[0] || null;

		var previous = this.previousUrl;
		if (url!==previous) {
			this.previousUrl = url;
			if (typeof onChange==='function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(y));

var Link = function (props) { return (
	h('a', assign({ onClick: handleLinkClick }, props))
); };

var Route = function (props) { return h(props.component, props); };

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;
//# sourceMappingURL=preact-router.es.js.map

var dist = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(preact_module);
}(commonjsGlobal, (function (preact) {
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncRoute = function (_Component) {
	_inherits(AsyncRoute, _Component);

	function AsyncRoute() {
		_classCallCheck(this, AsyncRoute);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.state = {
			componentData: null
		};
		return _this;
	}

	AsyncRoute.prototype.loadComponent = function loadComponent() {
		var _this2 = this;

		if (this.props.component) {
			return this.setState({
				componentData: this.props.component
			});
		}
		var componentData = this.props.getComponent(this.props.url, function (_ref) {
			var component = _ref.component;

			// Named param for making callback future proof
			if (component) {
				_this2.setState({
					componentData: component
				});
			}
		}, _extends({}, this.props, this.props.matches));

		// In case returned value was a promise
		if (componentData && componentData.then) {
			// IIFE to check if a later ending promise was creating a race condition
			// Check test case for more info
			(function (url) {
				componentData.then(function (component) {
					if (url !== _this2.props.url) {
						_this2.setState({ componentData: null }, function () {
							_this2.loadComponent();
						});
						return;
					}
					_this2.setState({
						componentData: component
					});
				});
			})(this.props.url);
		}
	};

	AsyncRoute.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this3 = this;

		if (this.props.path && this.props.path !== nextProps.path) {
			this.setState({
				componentData: null
			}, function () {
				_this3.loadComponent();
			});
		}
	};

	AsyncRoute.prototype.componentWillMount = function componentWillMount() {
		this.loadComponent();
	};

	AsyncRoute.prototype.render = function render() {
		if (this.state.componentData) {
			return preact.h(this.state.componentData, this.props);
		} else if (this.props.loading) {
			var loadingComponent = this.props.loading();
			return loadingComponent;
		}
		return null;
	};

	return AsyncRoute;
}(preact.Component);

return AsyncRoute;

})));
//# sourceMappingURL=index.js.map
});

var Nav = function Nav() {
  return h("div", {
    style: {
      width: "100%"
    }
  }, "Nav", h("a", {
    href: "/chatroom"
  }, "chat room"), h(Router, null, h(dist, {
    path: "/chatroom",
    getComponent: function getComponent() {
      return import('./chunk-efe16782.js').then(function (module) {
        return module["default"];
      });
    }
  })));
};

E(h("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 70
  }
}, h("div", {
  style: {
    display: "flex",
    justifyContent: "center"
  }
}, h("h3", null, "SocketIO text messaging demo")), h(Nav, null)), document.getElementById('root'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3Qtcm91dGVyL2Rpc3QvcHJlYWN0LXJvdXRlci5lcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtYXN5bmMtcm91dGUvZGlzdC9pbmRleC5qcyIsIi4uL05hdi5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgY2xvbmVFbGVtZW50LCBjcmVhdGVFbGVtZW50LCB0b0NoaWxkQXJyYXkgfSBmcm9tICdwcmVhY3QnO1xuXG52YXIgRU1QVFkkMSA9IHt9O1xuXG5mdW5jdGlvbiBhc3NpZ24ob2JqLCBwcm9wcykge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluXG5cdGZvciAodmFyIGkgaW4gcHJvcHMpIHtcblx0XHRvYmpbaV0gPSBwcm9wc1tpXTtcblx0fVxuXHRyZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBleGVjKHVybCwgcm91dGUsIG9wdHMpIHtcblx0dmFyIHJlZyA9IC8oPzpcXD8oW14jXSopKT8oIy4qKT8kLyxcblx0XHRjID0gdXJsLm1hdGNoKHJlZyksXG5cdFx0bWF0Y2hlcyA9IHt9LFxuXHRcdHJldDtcblx0aWYgKGMgJiYgY1sxXSkge1xuXHRcdHZhciBwID0gY1sxXS5zcGxpdCgnJicpO1xuXHRcdGZvciAodmFyIGk9MDsgaTxwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgciA9IHBbaV0uc3BsaXQoJz0nKTtcblx0XHRcdG1hdGNoZXNbZGVjb2RlVVJJQ29tcG9uZW50KHJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChyLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG5cdFx0fVxuXHR9XG5cdHVybCA9IHNlZ21lbnRpemUodXJsLnJlcGxhY2UocmVnLCAnJykpO1xuXHRyb3V0ZSA9IHNlZ21lbnRpemUocm91dGUgfHwgJycpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgodXJsLmxlbmd0aCwgcm91dGUubGVuZ3RoKTtcblx0Zm9yICh2YXIgaSQxPTA7IGkkMTxtYXg7IGkkMSsrKSB7XG5cdFx0aWYgKHJvdXRlW2kkMV0gJiYgcm91dGVbaSQxXS5jaGFyQXQoMCk9PT0nOicpIHtcblx0XHRcdHZhciBwYXJhbSA9IHJvdXRlW2kkMV0ucmVwbGFjZSgvKF46fFsrKj9dKyQpL2csICcnKSxcblx0XHRcdFx0ZmxhZ3MgPSAocm91dGVbaSQxXS5tYXRjaCgvWysqP10rJC8pIHx8IEVNUFRZJDEpWzBdIHx8ICcnLFxuXHRcdFx0XHRwbHVzID0gfmZsYWdzLmluZGV4T2YoJysnKSxcblx0XHRcdFx0c3RhciA9IH5mbGFncy5pbmRleE9mKCcqJyksXG5cdFx0XHRcdHZhbCA9IHVybFtpJDFdIHx8ICcnO1xuXHRcdFx0aWYgKCF2YWwgJiYgIXN0YXIgJiYgKGZsYWdzLmluZGV4T2YoJz8nKTwwIHx8IHBsdXMpKSB7XG5cdFx0XHRcdHJldCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZXNbcGFyYW1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cdFx0XHRpZiAocGx1cyB8fCBzdGFyKSB7XG5cdFx0XHRcdG1hdGNoZXNbcGFyYW1dID0gdXJsLnNsaWNlKGkkMSkubWFwKGRlY29kZVVSSUNvbXBvbmVudCkuam9pbignLycpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAocm91dGVbaSQxXSE9PXVybFtpJDFdKSB7XG5cdFx0XHRyZXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRpZiAob3B0cy5kZWZhdWx0IT09dHJ1ZSAmJiByZXQ9PT1mYWxzZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0cmV0dXJuIG1hdGNoZXM7XG59XG5cbmZ1bmN0aW9uIHBhdGhSYW5rU29ydChhLCBiKSB7XG5cdHJldHVybiAoXG5cdFx0KGEucmFuayA8IGIucmFuaykgPyAxIDpcblx0XHRcdChhLnJhbmsgPiBiLnJhbmspID8gLTEgOlxuXHRcdFx0XHQoYS5pbmRleCAtIGIuaW5kZXgpXG5cdCk7XG59XG5cbi8vIGZpbHRlciBvdXQgVk5vZGVzIHdpdGhvdXQgYXR0cmlidXRlcyAod2hpY2ggYXJlIHVucmFua2VhYmxlKSwgYW5kIGFkZCBgaW5kZXhgL2ByYW5rYCBwcm9wZXJ0aWVzIHRvIGJlIHVzZWQgaW4gc29ydGluZy5cbmZ1bmN0aW9uIHByZXBhcmVWTm9kZUZvclJhbmtpbmcodm5vZGUsIGluZGV4KSB7XG5cdHZub2RlLmluZGV4ID0gaW5kZXg7XG5cdHZub2RlLnJhbmsgPSByYW5rQ2hpbGQodm5vZGUpO1xuXHRyZXR1cm4gdm5vZGUucHJvcHM7XG59XG5cbmZ1bmN0aW9uIHNlZ21lbnRpemUodXJsKSB7XG5cdHJldHVybiB1cmwucmVwbGFjZSgvKF5cXC8rfFxcLyskKS9nLCAnJykuc3BsaXQoJy8nKTtcbn1cblxuZnVuY3Rpb24gcmFua1NlZ21lbnQoc2VnbWVudCkge1xuXHRyZXR1cm4gc2VnbWVudC5jaGFyQXQoMCk9PSc6JyA/ICgxICsgJyorPycuaW5kZXhPZihzZWdtZW50LmNoYXJBdChzZWdtZW50Lmxlbmd0aC0xKSkpIHx8IDQgOiA1O1xufVxuXG5mdW5jdGlvbiByYW5rKHBhdGgpIHtcblx0cmV0dXJuIHNlZ21lbnRpemUocGF0aCkubWFwKHJhbmtTZWdtZW50KS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gcmFua0NoaWxkKHZub2RlKSB7XG5cdHJldHVybiB2bm9kZS5wcm9wcy5kZWZhdWx0ID8gMCA6IHJhbmsodm5vZGUucHJvcHMucGF0aCk7XG59XG5cbnZhciBjdXN0b21IaXN0b3J5ID0gbnVsbDtcblxudmFyIFJPVVRFUlMgPSBbXTtcblxudmFyIHN1YnNjcmliZXJzID0gW107XG5cbnZhciBFTVBUWSA9IHt9O1xuXG5mdW5jdGlvbiBzZXRVcmwodXJsLCB0eXBlKSB7XG5cdGlmICggdHlwZSA9PT0gdm9pZCAwICkgdHlwZT0ncHVzaCc7XG5cblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeVt0eXBlXSkge1xuXHRcdGN1c3RvbUhpc3RvcnlbdHlwZV0odXJsKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgaGlzdG9yeSE9PSd1bmRlZmluZWQnICYmIGhpc3RvcnlbdHlwZSsnU3RhdGUnXSkge1xuXHRcdGhpc3RvcnlbdHlwZSsnU3RhdGUnXShudWxsLCBudWxsLCB1cmwpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFVybCgpIHtcblx0dmFyIHVybDtcblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeS5sb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkubG9jYXRpb247XG5cdH1cblx0ZWxzZSBpZiAoY3VzdG9tSGlzdG9yeSAmJiBjdXN0b21IaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dXJsID0gdHlwZW9mIGxvY2F0aW9uIT09J3VuZGVmaW5lZCcgPyBsb2NhdGlvbiA6IEVNUFRZO1xuXHR9XG5cdHJldHVybiAoXCJcIiArICh1cmwucGF0aG5hbWUgfHwgJycpICsgKHVybC5zZWFyY2ggfHwgJycpKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJvdXRlKHVybCwgcmVwbGFjZSkge1xuXHRpZiAoIHJlcGxhY2UgPT09IHZvaWQgMCApIHJlcGxhY2U9ZmFsc2U7XG5cblx0aWYgKHR5cGVvZiB1cmwhPT0nc3RyaW5nJyAmJiB1cmwudXJsKSB7XG5cdFx0cmVwbGFjZSA9IHVybC5yZXBsYWNlO1xuXHRcdHVybCA9IHVybC51cmw7XG5cdH1cblxuXHQvLyBvbmx5IHB1c2ggVVJMIGludG8gaGlzdG9yeSBpZiB3ZSBjYW4gaGFuZGxlIGl0XG5cdGlmIChjYW5Sb3V0ZSh1cmwpKSB7XG5cdFx0c2V0VXJsKHVybCwgcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyk7XG5cdH1cblxuXHRyZXR1cm4gcm91dGVUbyh1cmwpO1xufVxuXG5cbi8qKiBDaGVjayBpZiB0aGUgZ2l2ZW4gVVJMIGNhbiBiZSBoYW5kbGVkIGJ5IGFueSByb3V0ZXIgaW5zdGFuY2VzLiAqL1xuZnVuY3Rpb24gY2FuUm91dGUodXJsKSB7XG5cdGZvciAodmFyIGk9Uk9VVEVSUy5sZW5ndGg7IGktLTsgKSB7XG5cdFx0aWYgKFJPVVRFUlNbaV0uY2FuUm91dGUodXJsKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuXG4vKiogVGVsbCBhbGwgcm91dGVyIGluc3RhbmNlcyB0byBoYW5kbGUgdGhlIGdpdmVuIFVSTC4gICovXG5mdW5jdGlvbiByb3V0ZVRvKHVybCkge1xuXHR2YXIgZGlkUm91dGUgPSBmYWxzZTtcblx0Zm9yICh2YXIgaT0wOyBpPFJPVVRFUlMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoUk9VVEVSU1tpXS5yb3V0ZVRvKHVybCk9PT10cnVlKSB7XG5cdFx0XHRkaWRSb3V0ZSA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdGZvciAodmFyIGkkMT1zdWJzY3JpYmVycy5sZW5ndGg7IGkkMS0tOyApIHtcblx0XHRzdWJzY3JpYmVyc1tpJDFdKHVybCk7XG5cdH1cblx0cmV0dXJuIGRpZFJvdXRlO1xufVxuXG5cbmZ1bmN0aW9uIHJvdXRlRnJvbUxpbmsobm9kZSkge1xuXHQvLyBvbmx5IHZhbGlkIGVsZW1lbnRzXG5cdGlmICghbm9kZSB8fCAhbm9kZS5nZXRBdHRyaWJ1dGUpIHsgcmV0dXJuOyB9XG5cblx0dmFyIGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuXHRcdHRhcmdldCA9IG5vZGUuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcblxuXHQvLyBpZ25vcmUgbGlua3Mgd2l0aCB0YXJnZXRzIGFuZCBub24tcGF0aCBVUkxzXG5cdGlmICghaHJlZiB8fCAhaHJlZi5tYXRjaCgvXlxcLy9nKSB8fCAodGFyZ2V0ICYmICF0YXJnZXQubWF0Y2goL15fP3NlbGYkL2kpKSkgeyByZXR1cm47IH1cblxuXHQvLyBhdHRlbXB0IHRvIHJvdXRlLCBpZiBubyBtYXRjaCBzaW1wbHkgY2VkZSBjb250cm9sIHRvIGJyb3dzZXJcblx0cmV0dXJuIHJvdXRlKGhyZWYpO1xufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpbmtDbGljayhlKSB7XG5cdGlmIChlLmJ1dHRvbj09MCkge1xuXHRcdHJvdXRlRnJvbUxpbmsoZS5jdXJyZW50VGFyZ2V0IHx8IGUudGFyZ2V0IHx8IHRoaXMpO1xuXHRcdHJldHVybiBwcmV2ZW50KGUpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gcHJldmVudChlKSB7XG5cdGlmIChlKSB7XG5cdFx0aWYgKGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7IGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7IH1cblx0XHRpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblxuZnVuY3Rpb24gZGVsZWdhdGVMaW5rSGFuZGxlcihlKSB7XG5cdC8vIGlnbm9yZSBldmVudHMgdGhlIGJyb3dzZXIgdGFrZXMgY2FyZSBvZiBhbHJlYWR5OlxuXHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYnV0dG9uIT09MCkgeyByZXR1cm47IH1cblxuXHR2YXIgdCA9IGUudGFyZ2V0O1xuXHRkbyB7XG5cdFx0aWYgKFN0cmluZyh0Lm5vZGVOYW1lKS50b1VwcGVyQ2FzZSgpPT09J0EnICYmIHQuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcblx0XHRcdGlmICh0Lmhhc0F0dHJpYnV0ZSgnbmF0aXZlJykpIHsgcmV0dXJuOyB9XG5cdFx0XHQvLyBpZiBsaW5rIGlzIGhhbmRsZWQgYnkgdGhlIHJvdXRlciwgcHJldmVudCBicm93c2VyIGRlZmF1bHRzXG5cdFx0XHRpZiAocm91dGVGcm9tTGluayh0KSkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmVudChlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gd2hpbGUgKCh0PXQucGFyZW50Tm9kZSkpO1xufVxuXG5cbnZhciBldmVudExpc3RlbmVyc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcblx0aWYgKGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG5cblx0aWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyPT09J2Z1bmN0aW9uJykge1xuXHRcdGlmICghY3VzdG9tSGlzdG9yeSkge1xuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJvdXRlVG8oZ2V0Q3VycmVudFVybCgpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGVnYXRlTGlua0hhbmRsZXIpO1xuXHR9XG5cdGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xufVxuXG5cbnZhciBSb3V0ZXIgPSAoZnVuY3Rpb24gKENvbXBvbmVudCQkMSkge1xuXHRmdW5jdGlvbiBSb3V0ZXIocHJvcHMpIHtcblx0XHRDb21wb25lbnQkJDEuY2FsbCh0aGlzLCBwcm9wcyk7XG5cdFx0aWYgKHByb3BzLmhpc3RvcnkpIHtcblx0XHRcdGN1c3RvbUhpc3RvcnkgPSBwcm9wcy5oaXN0b3J5O1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR1cmw6IHByb3BzLnVybCB8fCBnZXRDdXJyZW50VXJsKClcblx0XHR9O1xuXG5cdFx0aW5pdEV2ZW50TGlzdGVuZXJzKCk7XG5cdH1cblxuXHRpZiAoIENvbXBvbmVudCQkMSApIFJvdXRlci5fX3Byb3RvX18gPSBDb21wb25lbnQkJDE7XG5cdFJvdXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb21wb25lbnQkJDEgJiYgQ29tcG9uZW50JCQxLnByb3RvdHlwZSApO1xuXHRSb3V0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUm91dGVyO1xuXG5cdFJvdXRlci5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlIChwcm9wcykge1xuXHRcdGlmIChwcm9wcy5zdGF0aWMhPT10cnVlKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0cmV0dXJuIHByb3BzLnVybCE9PXRoaXMucHJvcHMudXJsIHx8IHByb3BzLm9uQ2hhbmdlIT09dGhpcy5wcm9wcy5vbkNoYW5nZTtcblx0fTtcblxuXHQvKiogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBjYW4gYmUgbWF0Y2hlZCBhZ2FpbnN0IGFueSBjaGlsZHJlbiAqL1xuXHRSb3V0ZXIucHJvdG90eXBlLmNhblJvdXRlID0gZnVuY3Rpb24gY2FuUm91dGUgKHVybCkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHRvQ2hpbGRBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRNYXRjaGluZ0NoaWxkcmVuKGNoaWxkcmVuLCB1cmwsIGZhbHNlKS5sZW5ndGggPiAwO1xuXHR9O1xuXG5cdC8qKiBSZS1yZW5kZXIgY2hpbGRyZW4gd2l0aCBhIG5ldyBVUkwgdG8gbWF0Y2ggYWdhaW5zdC4gKi9cblx0Um91dGVyLnByb3RvdHlwZS5yb3V0ZVRvID0gZnVuY3Rpb24gcm91dGVUbyAodXJsKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHVybDogdXJsIH0pO1xuXG5cdFx0dmFyIGRpZFJvdXRlID0gdGhpcy5jYW5Sb3V0ZSh1cmwpO1xuXG5cdFx0Ly8gdHJpZ2dlciBhIG1hbnVhbCByZS1yb3V0ZSBpZiB3ZSdyZSBub3QgaW4gdGhlIG1pZGRsZSBvZiBhbiB1cGRhdGU6XG5cdFx0aWYgKCF0aGlzLnVwZGF0aW5nKSB7IHRoaXMuZm9yY2VVcGRhdGUoKTsgfVxuXG5cdFx0cmV0dXJuIGRpZFJvdXRlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50ICgpIHtcblx0XHRST1VURVJTLnB1c2godGhpcyk7XG5cdFx0dGhpcy51cGRhdGluZyA9IHRydWU7XG5cdH07XG5cblx0Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHRcdGlmIChjdXN0b21IaXN0b3J5KSB7XG5cdFx0XHR0aGlzLnVubGlzdGVuID0gY3VzdG9tSGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG5cdFx0XHRcdHRoaXMkMS5yb3V0ZVRvKChcIlwiICsgKGxvY2F0aW9uLnBhdGhuYW1lIHx8ICcnKSArIChsb2NhdGlvbi5zZWFyY2ggfHwgJycpKSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy51cGRhdGluZyA9IGZhbHNlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnVubGlzdGVuPT09J2Z1bmN0aW9uJykgeyB0aGlzLnVubGlzdGVuKCk7IH1cblx0XHRST1VURVJTLnNwbGljZShST1VURVJTLmluZGV4T2YodGhpcyksIDEpO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUgKCkge1xuXHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlICgpIHtcblx0XHR0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG5cdH07XG5cblx0Um91dGVyLnByb3RvdHlwZS5nZXRNYXRjaGluZ0NoaWxkcmVuID0gZnVuY3Rpb24gZ2V0TWF0Y2hpbmdDaGlsZHJlbiAoY2hpbGRyZW4sIHVybCwgaW52b2tlKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuXG5cdFx0XHQuZmlsdGVyKHByZXBhcmVWTm9kZUZvclJhbmtpbmcpXG5cdFx0XHQuc29ydChwYXRoUmFua1NvcnQpXG5cdFx0XHQubWFwKCBmdW5jdGlvbiAodm5vZGUpIHtcblx0XHRcdFx0dmFyIG1hdGNoZXMgPSBleGVjKHVybCwgdm5vZGUucHJvcHMucGF0aCwgdm5vZGUucHJvcHMpO1xuXHRcdFx0XHRpZiAobWF0Y2hlcykge1xuXHRcdFx0XHRcdGlmIChpbnZva2UgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3UHJvcHMgPSB7IHVybDogdXJsLCBtYXRjaGVzOiBtYXRjaGVzIH07XG5cdFx0XHRcdFx0XHRhc3NpZ24obmV3UHJvcHMsIG1hdGNoZXMpO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIG5ld1Byb3BzLnJlZjtcblx0XHRcdFx0XHRcdGRlbGV0ZSBuZXdQcm9wcy5rZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KHZub2RlLCBuZXdQcm9wcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2bm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmlsdGVyKEJvb2xlYW4pO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyIChyZWYsIHJlZiQxKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gcmVmLmNoaWxkcmVuO1xuXHRcdHZhciBvbkNoYW5nZSA9IHJlZi5vbkNoYW5nZTtcblx0XHR2YXIgdXJsID0gcmVmJDEudXJsO1xuXG5cdFx0dmFyIGFjdGl2ZSA9IHRoaXMuZ2V0TWF0Y2hpbmdDaGlsZHJlbih0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLCB1cmwsIHRydWUpO1xuXG5cdFx0dmFyIGN1cnJlbnQgPSBhY3RpdmVbMF0gfHwgbnVsbDtcblxuXHRcdHZhciBwcmV2aW91cyA9IHRoaXMucHJldmlvdXNVcmw7XG5cdFx0aWYgKHVybCE9PXByZXZpb3VzKSB7XG5cdFx0XHR0aGlzLnByZXZpb3VzVXJsID0gdXJsO1xuXHRcdFx0aWYgKHR5cGVvZiBvbkNoYW5nZT09PSdmdW5jdGlvbicpIHtcblx0XHRcdFx0b25DaGFuZ2Uoe1xuXHRcdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRwcmV2aW91czogcHJldmlvdXMsXG5cdFx0XHRcdFx0YWN0aXZlOiBhY3RpdmUsXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3VycmVudDtcblx0fTtcblxuXHRyZXR1cm4gUm91dGVyO1xufShDb21wb25lbnQpKTtcblxudmFyIExpbmsgPSBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIChcblx0Y3JlYXRlRWxlbWVudCgnYScsIGFzc2lnbih7IG9uQ2xpY2s6IGhhbmRsZUxpbmtDbGljayB9LCBwcm9wcykpXG4pOyB9O1xuXG52YXIgUm91dGUgPSBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQocHJvcHMuY29tcG9uZW50LCBwcm9wcyk7IH07XG5cblJvdXRlci5zdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzO1xuUm91dGVyLmdldEN1cnJlbnRVcmwgPSBnZXRDdXJyZW50VXJsO1xuUm91dGVyLnJvdXRlID0gcm91dGU7XG5Sb3V0ZXIuUm91dGVyID0gUm91dGVyO1xuUm91dGVyLlJvdXRlID0gUm91dGU7XG5Sb3V0ZXIuTGluayA9IExpbms7XG5cbmV4cG9ydCB7IHN1YnNjcmliZXJzLCBnZXRDdXJyZW50VXJsLCByb3V0ZSwgUm91dGVyLCBSb3V0ZSwgTGluaywgZXhlYyB9O2V4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC1yb3V0ZXIuZXMuanMubWFwXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgncHJlYWN0JykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsncHJlYWN0J10sIGZhY3RvcnkpIDpcblx0KGdsb2JhbFsncHJlYWN0LWFzeW5jLXJvdXRlJ10gPSBmYWN0b3J5KGdsb2JhbC5wcmVhY3QpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChwcmVhY3QpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBBc3luY1JvdXRlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0X2luaGVyaXRzKEFzeW5jUm91dGUsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEFzeW5jUm91dGUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFzeW5jUm91dGUpO1xuXG5cdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMpKTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29tcG9uZW50RGF0YTogbnVsbFxuXHRcdH07XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUubG9hZENvbXBvbmVudCA9IGZ1bmN0aW9uIGxvYWRDb21wb25lbnQoKSB7XG5cdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y29tcG9uZW50RGF0YTogdGhpcy5wcm9wcy5jb21wb25lbnRcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR2YXIgY29tcG9uZW50RGF0YSA9IHRoaXMucHJvcHMuZ2V0Q29tcG9uZW50KHRoaXMucHJvcHMudXJsLCBmdW5jdGlvbiAoX3JlZikge1xuXHRcdFx0dmFyIGNvbXBvbmVudCA9IF9yZWYuY29tcG9uZW50O1xuXG5cdFx0XHQvLyBOYW1lZCBwYXJhbSBmb3IgbWFraW5nIGNhbGxiYWNrIGZ1dHVyZSBwcm9vZlxuXHRcdFx0aWYgKGNvbXBvbmVudCkge1xuXHRcdFx0XHRfdGhpczIuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGNvbXBvbmVudERhdGE6IGNvbXBvbmVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgdGhpcy5wcm9wcy5tYXRjaGVzKSk7XG5cblx0XHQvLyBJbiBjYXNlIHJldHVybmVkIHZhbHVlIHdhcyBhIHByb21pc2Vcblx0XHRpZiAoY29tcG9uZW50RGF0YSAmJiBjb21wb25lbnREYXRhLnRoZW4pIHtcblx0XHRcdC8vIElJRkUgdG8gY2hlY2sgaWYgYSBsYXRlciBlbmRpbmcgcHJvbWlzZSB3YXMgY3JlYXRpbmcgYSByYWNlIGNvbmRpdGlvblxuXHRcdFx0Ly8gQ2hlY2sgdGVzdCBjYXNlIGZvciBtb3JlIGluZm9cblx0XHRcdChmdW5jdGlvbiAodXJsKSB7XG5cdFx0XHRcdGNvbXBvbmVudERhdGEudGhlbihmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdFx0aWYgKHVybCAhPT0gX3RoaXMyLnByb3BzLnVybCkge1xuXHRcdFx0XHRcdFx0X3RoaXMyLnNldFN0YXRlKHsgY29tcG9uZW50RGF0YTogbnVsbCB9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzMi5sb2FkQ29tcG9uZW50KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3RoaXMyLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudERhdGE6IGNvbXBvbmVudFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKHRoaXMucHJvcHMudXJsKTtcblx0XHR9XG5cdH07XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5wYXRoICYmIHRoaXMucHJvcHMucGF0aCAhPT0gbmV4dFByb3BzLnBhdGgpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wb25lbnREYXRhOiBudWxsXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdF90aGlzMy5sb2FkQ29tcG9uZW50KCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdHRoaXMubG9hZENvbXBvbmVudCgpO1xuXHR9O1xuXG5cdEFzeW5jUm91dGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5jb21wb25lbnREYXRhKSB7XG5cdFx0XHRyZXR1cm4gcHJlYWN0LmgodGhpcy5zdGF0ZS5jb21wb25lbnREYXRhLCB0aGlzLnByb3BzKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubG9hZGluZykge1xuXHRcdFx0dmFyIGxvYWRpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxvYWRpbmcoKTtcblx0XHRcdHJldHVybiBsb2FkaW5nQ29tcG9uZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcblxuXHRyZXR1cm4gQXN5bmNSb3V0ZTtcbn0ocHJlYWN0LkNvbXBvbmVudCk7XG5cbnJldHVybiBBc3luY1JvdXRlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCBSb3V0ZXIgZnJvbSAncHJlYWN0LXJvdXRlcidcbmltcG9ydCBBc3luY1JvdXRlIGZyb20gJ3ByZWFjdC1hc3luYy1yb3V0ZSdcblxuY29uc3QgTmF2ID0oKT0+e1xucmV0dXJuKFxuPGRpdiBzdHlsZT17e3dpZHRoOlwiMTAwJVwifX0+TmF2XG48YSBocmVmPVwiL2NoYXRyb29tXCI+Y2hhdCByb29tPC9hPlxuPFJvdXRlcj5cbjxBc3luY1JvdXRlIHBhdGg9XCIvY2hhdHJvb21cIiBcbmdldENvbXBvbmVudCA9eygpPT4gaW1wb3J0KCcuL0NoYXRSb29tJykudGhlbihtb2R1bGU9PiBtb2R1bGUuZGVmYXVsdCl9XG4vPlxuPC9Sb3V0ZXI+XG48L2Rpdj5cbilcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOYXYiLCJcblxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuLy8gaW1wb3J0IENoYXRSb29tIGZyb20gJy4vQ2hhdFJvb20nXG5pbXBvcnQgTmF2IGZyb20gJy4vTmF2J1xuICAgIHJlbmRlcihcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIixmbGV4RGlyZWN0aW9uOlwiY29sdW1uXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsbWFyZ2luVG9wOjcwIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJmbGV4XCIsanVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIn19PlxuICAgICAgICAgICAgICAgIDxoMz5Tb2NrZXRJTyB0ZXh0IG1lc3NhZ2luZyBkZW1vPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPE5hdiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4gICAgKTtcblxuXG5cblxuIl0sIm5hbWVzIjpbImIiLCJ0b0NoaWxkQXJyYXkiLCJjbG9uZUVsZW1lbnQiLCJDb21wb25lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVxdWlyZSQkMCIsInRoaXMiLCJOYXYiLCJ3aWR0aCIsIkFzeW5jUm91dGUiLCJ0aGVuIiwibW9kdWxlIiwicmVuZGVyIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwibWFyZ2luVG9wIiwianVzdGlmeUNvbnRlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTs7Q0FFM0IsS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7RUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQjtDQUNELE9BQU8sR0FBRyxDQUFDO0NBQ1g7O0FBRUQsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Q0FDL0IsSUFBSSxHQUFHLEdBQUcsdUJBQXVCO0VBQ2hDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNsQixPQUFPLEdBQUcsRUFBRTtFQUNaLEdBQUcsQ0FBQztDQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksQ0FBQyxHQUFHLENBQUMs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
