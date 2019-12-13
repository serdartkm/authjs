import { a as createCommonjsModule, b as _interopRequireDefault, c as require$$1, d as require$$0, e as require$$2, f as require$$3, g as require$$4, h as require$$5, i as require$$6, j as _preact, k as unwrapExports, l as require$$0$1, m as require$$5$1, n as _bindDecorator, o as styleInject, p as h, q as MDCRipple, r as b, s as I, t as y, u as commonjsGlobal, v, w as _slicedToArray, x as E } from './chunk-f15771b5.js';

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @template F
 */

class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-drawer',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  ANIMATE: 'mdc-drawer--animate',
  OPENING: 'mdc-drawer--opening',
  CLOSING: 'mdc-drawer--closing'
};
/** @enum {string} */

const strings = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  SCRIM_SELECTOR: '.mdc-drawer-scrim',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCFoundation<!MDCDrawerAdapter>}
 */

class MDCDismissibleDrawerFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses;
  }

  static get defaultAdapter() {
    return (
      /** @type {!MDCDrawerAdapter} */
      {
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        hasClass: () =>
        /* className: string */
        {},
        elementHasClass: () =>
        /* element: !Element, className: string */
        {},
        computeBoundingRect: () => {},
        notifyClose: () => {},
        notifyOpen: () => {},
        saveFocus: () => {},
        restoreFocus: () => {},
        focusActiveNavigationItem: () => {},
        trapFocus: () => {},
        releaseFocus: () => {}
      }
    );
  }
  /**
   * Function to open the drawer.
   */


  open() {
    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses.OPEN);
    this.adapter_.addClass(cssClasses.ANIMATE);
    this.adapter_.computeBoundingRect(); // Force reflow.

    this.adapter_.addClass(cssClasses.OPENING);
    this.adapter_.saveFocus();
  }
  /**
   * Function to close the drawer.
   */


  close() {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses.CLOSING);
  }
  /**
   * Extension point for when drawer finishes open animation.
   * @protected
   */


  opened() {}
  /**
   * Extension point for when drawer finishes close animation.
   * @protected
   */


  closed() {}
  /**
   * Returns true if drawer is in open state.
   * @return {boolean}
   */


  isOpen() {
    return this.adapter_.hasClass(cssClasses.OPEN);
  }
  /**
   * Returns true if drawer is animating open.
   * @return {boolean}
   */


  isOpening() {
    return this.adapter_.hasClass(cssClasses.OPENING);
  }
  /**
   * Returns true if drawer is animating closed.
   * @return {boolean}
   */


  isClosing() {
    return this.adapter_.hasClass(cssClasses.CLOSING);
  }
  /**
   * Keydown handler to close drawer when key is escape.
   * @param evt
   */


  handleKeydown(evt) {
    const {
      keyCode,
      key
    } = evt;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  }
  /**
   * Handles a transition end event on the root element.
   * @param {!Event} evt
   */


  handleTransitionEnd(evt) {
    const {
      OPENING,
      CLOSING,
      OPEN,
      ANIMATE,
      ROOT
    } = cssClasses; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    const isElement = evt.target instanceof Element;

    if (!isElement || !this.adapter_.elementHasClass(
    /** @type {!Element} */
    evt.target, ROOT)) {
      return;
    }

    if (this.isClosing()) {
      this.adapter_.removeClass(OPEN);
      this.adapter_.restoreFocus();
      this.closed();
      this.adapter_.notifyClose();
    } else {
      this.adapter_.focusActiveNavigationItem();
      this.opened();
      this.adapter_.notifyOpen();
    }

    this.adapter_.removeClass(ANIMATE);
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(CLOSING);
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCDismissibleDrawerFoundation<!MDCDrawerAdapter>}
 */

class MDCModalDrawerFoundation extends MDCDismissibleDrawerFoundation {
  /**
   * Called when drawer finishes open animation.
   * @override
   */
  opened() {
    this.adapter_.trapFocus();
  }
  /**
   * Called when drawer finishes close animation.
   * @override
   */


  closed() {
    this.adapter_.releaseFocus();
  }
  /**
   * Handles click event on scrim.
   */


  handleScrimClick() {
    this.close();
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation$1 {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @template F
 */

class MDCComponent$1 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$1(root, new MDCFoundation$1());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses$1 = {
  ROOT: 'mdc-list',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated'
};
/** @enum {string} */

const strings$1 = {
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_SELECTED: 'aria-selected',
  FOCUSABLE_CHILD_ELEMENTS: `.${cssClasses$1.LIST_ITEM_CLASS} button:not(:disabled), .${cssClasses$1.LIST_ITEM_CLASS} a`,
  ENABLED_ITEMS_SELECTOR: '.mdc-list-item:not(.mdc-list-item--disabled)'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

class MDCListFoundation extends MDCFoundation$1 {
  /** @return enum {string} */
  static get strings() {
    return strings$1;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$1;
  }
  /**
   * {@see MDCListAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCListAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCListAdapter} */
      {
        getListItemCount: () => {},
        getFocusedElementIndex: () => {},
        setAttributeForElementIndex: () => {},
        removeAttributeForElementIndex: () => {},
        addClassForElementIndex: () => {},
        removeClassForElementIndex: () => {},
        focusItemAtIndex: () => {},
        setTabIndexForListItemChildren: () => {},
        followHref: () => {}
      }
    );
  }
  /**
   * @param {!MDCListAdapter=} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCListFoundation.defaultAdapter, adapter));
    /** {boolean} */

    this.wrapFocus_ = false;
    /** {boolean} */

    this.isVertical_ = true;
    /** {boolean} */

    this.isSingleSelectionList_ = false;
    /** {number} */

    this.selectedIndex_ = -1;
    /** {boolean} */

    this.useActivatedClass_ = false;
  }
  /**
   * Sets the private wrapFocus_ variable.
   * @param {boolean} value
   */


  setWrapFocus(value) {
    this.wrapFocus_ = value;
  }
  /**
   * Sets the isVertical_ private variable.
   * @param {boolean} value
   */


  setVerticalOrientation(value) {
    this.isVertical_ = value;
  }
  /**
   * Sets the isSingleSelectionList_ private variable.
   * @param {boolean} value
   */


  setSingleSelection(value) {
    this.isSingleSelectionList_ = value;
  }
  /**
   * Sets the useActivatedClass_ private variable.
   * @param {boolean} useActivated
   */


  setUseActivatedClass(useActivated) {
    this.useActivatedClass_ = useActivated;
  }
  /** @param {number} index */


  setSelectedIndex(index) {
    if (index === this.selectedIndex_) {
      return;
    }

    const className = this.useActivatedClass_ ? cssClasses$1.LIST_ITEM_ACTIVATED_CLASS : cssClasses$1.LIST_ITEM_SELECTED_CLASS;

    if (this.selectedIndex_ >= 0) {
      this.adapter_.removeAttributeForElementIndex(this.selectedIndex_, strings$1.ARIA_SELECTED);
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, className);
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', -1);
    }

    if (index >= 0 && this.adapter_.getListItemCount() > index) {
      this.selectedIndex_ = index;
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, strings$1.ARIA_SELECTED, true);
      this.adapter_.addClassForElementIndex(this.selectedIndex_, className);
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', 0);

      if (this.selectedIndex_ !== 0) {
        this.adapter_.setAttributeForElementIndex(0, 'tabindex', -1);
      }
    }
  }
  /**
   * Focus in handler for the list items.
   * @param evt
   * @param {number} listItemIndex
   */


  handleFocusIn(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, 0);
    }
  }
  /**
   * Focus out handler for the list items.
   * @param {Event} evt
   * @param {number} listItemIndex
   */


  handleFocusOut(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, -1);
    }
  }
  /**
   * Key handler for the list.
   * @param {Event} evt
   * @param {boolean} isRootListItem
   * @param {number} listItemIndex
   */


  handleKeydown(evt, isRootListItem, listItemIndex) {
    const arrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    const arrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const arrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    const arrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    const isHome = evt.key === 'Home' || evt.keyCode === 36;
    const isEnd = evt.key === 'End' || evt.keyCode === 35;
    const isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    const isSpace = evt.key === 'Space' || evt.keyCode === 32;
    let currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    if (this.isVertical_ && arrowDown || !this.isVertical_ && arrowRight) {
      this.preventDefaultEvent_(evt);
      this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && arrowUp || !this.isVertical_ && arrowLeft) {
      this.preventDefaultEvent_(evt);
      this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      this.focusLastElement();
    } else if (this.isSingleSelectionList_ && (isEnter || isSpace)) {
      this.preventDefaultEvent_(evt); // Check if the space key was pressed on the list item or a child element.

      if (isRootListItem) {
        this.setSelectedIndex(currentIndex); // Explicitly activate links, since we're preventing default on Enter, and Space doesn't activate them.

        this.adapter_.followHref(currentIndex);
      }
    }
  }
  /**
   * Click handler for the list.
   */


  handleClick() {
    const currentIndex = this.adapter_.getFocusedElementIndex();
    if (currentIndex === -1) return;
    this.setSelectedIndex(currentIndex);
  }
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   * @param {Event} evt
   * @private
   */


  preventDefaultEvent_(evt) {
    const tagName = `${evt.target.tagName}`.toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  }
  /**
   * Focuses the next element on the list.
   * @param {number} index
   */


  focusNextElement(index) {
    const count = this.adapter_.getListItemCount();
    let nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
  }
  /**
   * Focuses the previous element on the list.
   * @param {number} index
   */


  focusPrevElement(index) {
    let prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
  }

  focusFirstElement() {
    if (this.adapter_.getListItemCount() > 0) {
      this.adapter_.focusItemAtIndex(0);
    }
  }

  focusLastElement() {
    const lastIndex = this.adapter_.getListItemCount() - 1;

    if (lastIndex >= 0) {
      this.adapter_.focusItemAtIndex(lastIndex);
    }
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends MDCComponent<!MDCListFoundation>
 */

class MDCList extends MDCComponent$1 {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleClick_;
    /** @private {!Function} */

    this.focusInEventListener_;
    /** @private {!Function} */

    this.focusOutEventListener_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCList}
   */


  static attachTo(root) {
    return new MDCList(root);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('click', this.handleClick_);
    this.root_.removeEventListener('focusin', this.focusInEventListener_);
    this.root_.removeEventListener('focusout', this.focusOutEventListener_);
  }

  initialSyncWithDOM() {
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('focusin', this.focusInEventListener_);
    this.root_.addEventListener('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  }

  layout() {
    const direction = this.root_.getAttribute(strings$1.ARIA_ORIENTATION);
    this.vertical = direction !== strings$1.ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(ele => {
      ele.setAttribute('tabindex', -1);
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(strings$1.FOCUSABLE_CHILD_ELEMENTS)).forEach(ele => ele.setAttribute('tabindex', -1));
  }
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   * @param {Event} evt
   * @private
   */


  getListItemIndex_(evt) {
    let eventTarget =
    /** @type {HTMLElement} */
    evt.target;
    let index = -1; // Find the first ancestor that is a list item or the list.

    while (!eventTarget.classList.contains(cssClasses$1.LIST_ITEM_CLASS) && !eventTarget.classList.contains(cssClasses$1.ROOT)) {
      eventTarget = eventTarget.parentElement;
    } // Get the index of the element if it is a list item.


    if (eventTarget.classList.contains(cssClasses$1.LIST_ITEM_CLASS)) {
      index = this.listElements.indexOf(eventTarget);
    }

    return index;
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusInEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusOutEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleKeydownEvent_(evt) {
    const index = this.getListItemIndex_(evt);

    if (index >= 0) {
      this.foundation_.handleKeydown(evt, evt.target.classList.contains(cssClasses$1.LIST_ITEM_CLASS), index);
    }
  }

  initializeListType() {
    // Automatically set single selection if selected/activated classes are present.
    const preselectedElement = this.root_.querySelector(`.${cssClasses$1.LIST_ITEM_ACTIVATED_CLASS}, .${cssClasses$1.LIST_ITEM_SELECTED_CLASS}`);

    if (preselectedElement) {
      if (preselectedElement.classList.contains(cssClasses$1.LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(preselectedElement);
    }
  }
  /** @param {boolean} value */


  set vertical(value) {
    this.foundation_.setVerticalOrientation(value);
  }
  /** @return Array<!Element>*/


  get listElements() {
    return [].slice.call(this.root_.querySelectorAll(strings$1.ENABLED_ITEMS_SELECTOR));
  }
  /** @param {boolean} value */


  set wrapFocus(value) {
    this.foundation_.setWrapFocus(value);
  }
  /** @param {boolean} isSingleSelectionList */


  set singleSelection(isSingleSelectionList) {
    if (isSingleSelectionList) {
      this.root_.addEventListener('click', this.handleClick_);
    } else {
      this.root_.removeEventListener('click', this.handleClick_);
    }

    this.foundation_.setSingleSelection(isSingleSelectionList);
  }
  /** @param {number} index */


  set selectedIndex(index) {
    this.foundation_.setSelectedIndex(index);
  }
  /** @return {!MDCListFoundation} */


  getDefaultFoundation() {
    return new MDCListFoundation(
    /** @type {!MDCListAdapter} */
    Object.assign({
      getListItemCount: () => this.listElements.length,
      getFocusedElementIndex: () => this.listElements.indexOf(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const element = this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      removeAttributeForElementIndex: (index, attr) => {
        const element = this.listElements[index];

        if (element) {
          element.removeAttribute(attr);
        }
      },
      addClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      focusItemAtIndex: index => {
        const element = this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const element = this.listElements[listItemIndex];
        const listItemChildren = [].slice.call(element.querySelectorAll(strings$1.FOCUSABLE_CHILD_ELEMENTS));
        listItemChildren.forEach(ele => ele.setAttribute('tabindex', tabIndexValue));
      },
      followHref: index => {
        const listItem = this.listElements[index];

        if (listItem && listItem.href) {
          listItem.click();
        }
      }
    }));
  }

}

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var elementDocument = el.ownerDocument || el;
  var regularTabbables = [];
  var orderedTabbables = [];
  var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
  if (!isNodeMatchingSelectorFocusable(node, untouchabilityChecker) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
}

function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
  untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);

  if (node.disabled || isHiddenInput(node) || untouchabilityChecker.isUntouchable(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b$$1) {
  return a.tabIndex === b$$1.tabIndex ? a.documentOrder - b$$1.documentOrder : a.tabIndex - b$$1.tabIndex;
} // Array.prototype.find not available in IE.


function find(list, predicate) {
  for (var i = 0, length = list.length; i < length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
} // An element is "untouchable" if *it or one of its ancestors* has
// `visibility: hidden` or `display: none`.


function UntouchabilityChecker(elementDocument) {
  this.doc = elementDocument; // Node cache must be refreshed on every check, in case
  // the content of the element has changed. The cache contains tuples
  // mapping nodes to their boolean result.

  this.cache = [];
} // getComputedStyle accurately reflects `visibility: hidden` of ancestors
// but not `display: none`, so we need to recursively check parents.


UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
  if (node.nodeType !== Node.ELEMENT_NODE) return false; // Search for a cached result.

  var cached = find(this.cache, function (item) {
    return item === node;
  });
  if (cached) return cached[1];
  nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);
  var result = false;

  if (nodeComputedStyle.display === 'none') {
    result = true;
  } else if (node.parentNode) {
    result = this.hasDisplayNone(node.parentNode);
  }

  this.cache.push([node, result]);
  return result;
};

UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
  if (node === this.doc.documentElement) return false;
  var computedStyle = this.doc.defaultView.getComputedStyle(node);
  if (this.hasDisplayNone(node, computedStyle)) return true;
  return computedStyle.visibility === 'hidden';
};

var tabbable_1 = tabbable;

var immutable = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = immutable({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    removeListeners();
    state.active = false;
    state.paused = false;
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }

    listeningFocusTrap = trap;
    updateTabbableNodes(); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, true);
    doc.addEventListener('touchstart', checkPointerDown, true);
    doc.addEventListener('click', checkClick, true);
    doc.addEventListener('keydown', checkKey, true);
    return trap;
  }

  function removeListeners() {
    if (!state.active || listeningFocusTrap !== trap) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    listeningFocusTrap = null;
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error("You can't have a focus-trap without at least one focusable element");
    }

    return node;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable_1.isFocusable(e.target)
      });
    } else {
      e.preventDefault();
    }
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable_1(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

var focusTrap_1 = focusTrap;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @param {!Element} surfaceEl
 * @param {!Function} focusTrapFactory
 * @return {!FocusTrapInstance}
 */

function createFocusTrapInstance(surfaceEl, focusTrapFactory = focusTrap_1) {
  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    initialFocus: false,
    // Navigation drawer handles focusing on active nav item.
    escapeDeactivates: false,
    // Navigation drawer handles ESC.
    returnFocusOnDeactivate: false // Navigation drawer handles restore focus.

  });
}

var util = /*#__PURE__*/Object.freeze({
  createFocusTrapInstance: createFocusTrapInstance
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCComponent<!MDCDismissibleDrawerFoundation>}
 * @final
 */

class MDCDrawer extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {!Element} */

    this.previousFocus_;
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleTransitionEnd_;
    /** @private {!Function} */

    this.focusTrapFactory_;
    /** @private {!FocusTrapInstance} */

    this.focusTrap_;
    /** @private {?Element} */

    this.scrim_;
    /** @private {?Function} */

    this.handleScrimClick_;
    /** @private {?MDCList} */

    this.list_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCDrawer}
   */


  static attachTo(root) {
    return new MDCDrawer(root);
  }
  /**
   * Returns true if drawer is in the open position.
   * @return {boolean}
   */


  get open() {
    return this.foundation_.isOpen();
  }
  /**
   * Toggles the drawer open and closed.
   * @param {boolean} isOpen
   */


  set open(isOpen) {
    if (isOpen) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  initialize(focusTrapFactory = focusTrap_1, listFactory = el => new MDCList(el)) {
    const listEl =
    /** @type {!Element} */
    this.root_.querySelector(`.${MDCListFoundation.cssClasses.ROOT}`);

    if (listEl) {
      this.list_ = listFactory(listEl);
      this.list_.wrapFocus = true;
    }

    this.focusTrapFactory_ = focusTrapFactory;
  }

  initialSyncWithDOM() {
    const {
      MODAL
    } = MDCDismissibleDrawerFoundation.cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      const {
        SCRIM_SELECTOR
      } = MDCDismissibleDrawerFoundation.strings;
      this.scrim_ =
      /** @type {!Element} */
      this.root_.parentElement.querySelector(SCRIM_SELECTOR);

      this.handleScrimClick_ = () =>
      /** @type {!MDCModalDrawerFoundation} */
      this.foundation_.handleScrimClick();

      this.scrim_.addEventListener('click', this.handleScrimClick_);
      this.focusTrap_ = createFocusTrapInstance(this.root_, this.focusTrapFactory_);
    }

    this.handleKeydown_ = evt => this.foundation_.handleKeydown(evt);

    this.handleTransitionEnd_ = evt => this.foundation_.handleTransitionEnd(evt);

    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('transitionend', this.handleTransitionEnd_);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('transitionend', this.handleTransitionEnd_);

    if (this.list_) {
      this.list_.destroy();
    }

    const {
      MODAL
    } = MDCDismissibleDrawerFoundation.cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      this.scrim_.removeEventListener('click',
      /** @type {!Function} */
      this.handleScrimClick_); // Ensure drawer is closed to hide scrim and release focus

      this.open = false;
    }
  }

  getDefaultFoundation() {
    /** @type {!MDCDrawerAdapter} */
    const adapter =
    /** @type {!MDCDrawerAdapter} */
    Object.assign({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      computeBoundingRect: () => this.root_.getBoundingClientRect(),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus_ && this.previousFocus_.focus;

        if (this.root_.contains(document.activeElement) && previousFocus) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.root_.querySelector(`.${MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);

        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => this.emit(strings.CLOSE_EVENT, {}, true
      /* shouldBubble */
      ),
      notifyOpen: () => this.emit(strings.OPEN_EVENT, {}, true
      /* shouldBubble */
      ),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate()
    });
    const {
      DISMISSIBLE,
      MODAL
    } = MDCDismissibleDrawerFoundation.cssClasses;

    if (this.root_.classList.contains(DISMISSIBLE)) {
      return new MDCDismissibleDrawerFoundation(adapter);
    } else if (this.root_.classList.contains(MODAL)) {
      return new MDCModalDrawerFoundation(adapter);
    } else {
      throw new Error(`MDCDrawer: Failed to instantiate component. Supported variants are ${DISMISSIBLE} and ${MODAL}.`);
    }
  }

}

var drawer = /*#__PURE__*/Object.freeze({
  MDCDrawer: MDCDrawer,
  MDCDismissibleDrawerFoundation: MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation: MDCModalDrawerFoundation,
  util: util
});

var List_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.List = exports.ListGroupHeader = exports.ListGroup = exports.ListSecondaryText = exports.ListPrimaryText = exports.ListTextContainer = exports.ListDivider = exports.ListItemMetaText = exports.ListItemMeta = exports.ListItemGraphic = exports.ListLinkItem = exports.ListItem = void 0;

  var _classCallCheck2 = _interopRequireDefault(require$$1);

  var _createClass2 = _interopRequireDefault(require$$0);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _MaterialComponent10 = _interopRequireDefault(require$$5);

  var _Icon = _interopRequireDefault(require$$6);

  var ListItem =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(ListItem, _MaterialComponent);

    function ListItem() {
      var _this;

      (0, _classCallCheck2.default)(this, ListItem);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItem).apply(this, arguments));
      _this.componentName = 'list-item';
      _this.mdcProps = [];
      return _this;
    }

    (0, _createClass2.default)(ListItem, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("li", Object.assign({
          role: "option"
        }, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return ListItem;
  }(_MaterialComponent10.default);

  exports.ListItem = ListItem;

  var ListLinkItem =
  /*#__PURE__*/
  function (_MaterialComponent2) {
    (0, _inherits2.default)(ListLinkItem, _MaterialComponent2);

    function ListLinkItem() {
      var _this2;

      (0, _classCallCheck2.default)(this, ListLinkItem);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListLinkItem).apply(this, arguments));
      _this2.componentName = 'list-item';
      _this2.mdcProps = [];
      return _this2;
    }

    (0, _createClass2.default)(ListLinkItem, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("a", Object.assign({
          role: "option"
        }, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return ListLinkItem;
  }(_MaterialComponent10.default);

  exports.ListLinkItem = ListLinkItem;

  var ListItemGraphic =
  /*#__PURE__*/
  function (_MaterialComponent3) {
    (0, _inherits2.default)(ListItemGraphic, _MaterialComponent3);

    function ListItemGraphic() {
      var _this3;

      (0, _classCallCheck2.default)(this, ListItemGraphic);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemGraphic).apply(this, arguments));
      _this3.componentName = 'list-item__graphic';
      _this3.mdcProps = [];
      return _this3;
    }

    (0, _createClass2.default)(ListItemGraphic, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({}, props, {
          ref: this.setControlRef,
          role: "presentation"
        }), (0, _preact.h)(_Icon.default, {
          "aria-hidden": "true"
        }, props.children));
      }
    }]);
    return ListItemGraphic;
  }(_MaterialComponent10.default);

  exports.ListItemGraphic = ListItemGraphic;

  var ListItemMeta =
  /*#__PURE__*/
  function (_ListItemGraphic) {
    (0, _inherits2.default)(ListItemMeta, _ListItemGraphic);

    function ListItemMeta() {
      var _this4;

      (0, _classCallCheck2.default)(this, ListItemMeta);
      _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemMeta).apply(this, arguments));
      _this4.componentName = 'list-item__meta';
      return _this4;
    }

    return ListItemMeta;
  }(ListItemGraphic);

  exports.ListItemMeta = ListItemMeta;

  var ListItemMetaText =
  /*#__PURE__*/
  function (_MaterialComponent4) {
    (0, _inherits2.default)(ListItemMetaText, _MaterialComponent4);

    function ListItemMetaText() {
      var _this5;

      (0, _classCallCheck2.default)(this, ListItemMetaText);
      _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemMetaText).apply(this, arguments));
      _this5.componentName = 'list-item__meta';
      _this5.mdcProps = [];
      return _this5;
    }

    (0, _createClass2.default)(ListItemMetaText, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({}, props, {
          ref: this.setControlRef,
          role: "presentation"
        }), props.children);
      }
    }]);
    return ListItemMetaText;
  }(_MaterialComponent10.default);

  exports.ListItemMetaText = ListItemMetaText;

  var ListDivider =
  /*#__PURE__*/
  function (_MaterialComponent5) {
    (0, _inherits2.default)(ListDivider, _MaterialComponent5);

    function ListDivider() {
      var _this6;

      (0, _classCallCheck2.default)(this, ListDivider);
      _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListDivider).apply(this, arguments));
      _this6.componentName = 'list-divider';
      _this6.mdcProps = ['inset'];
      return _this6;
    }

    (0, _createClass2.default)(ListDivider, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("li", Object.assign({
          role: "separator"
        }, props, {
          ref: this.setControlRef
        }));
      }
    }]);
    return ListDivider;
  }(_MaterialComponent10.default);

  exports.ListDivider = ListDivider;

  var ListTextContainer =
  /*#__PURE__*/
  function (_MaterialComponent6) {
    (0, _inherits2.default)(ListTextContainer, _MaterialComponent6);

    function ListTextContainer() {
      var _this7;

      (0, _classCallCheck2.default)(this, ListTextContainer);
      _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListTextContainer).apply(this, arguments));
      _this7.componentName = 'list-item__text';
      _this7.mdcProps = [];
      return _this7;
    }

    (0, _createClass2.default)(ListTextContainer, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({}, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return ListTextContainer;
  }(_MaterialComponent10.default);

  exports.ListTextContainer = ListTextContainer;

  var ListPrimaryText =
  /*#__PURE__*/
  function (_ListTextContainer) {
    (0, _inherits2.default)(ListPrimaryText, _ListTextContainer);

    function ListPrimaryText() {
      var _this8;

      (0, _classCallCheck2.default)(this, ListPrimaryText);
      _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListPrimaryText).apply(this, arguments));
      _this8.componentName = 'list-item__primary-text';
      return _this8;
    }

    return ListPrimaryText;
  }(ListTextContainer);

  exports.ListPrimaryText = ListPrimaryText;

  var ListSecondaryText =
  /*#__PURE__*/
  function (_ListTextContainer2) {
    (0, _inherits2.default)(ListSecondaryText, _ListTextContainer2);

    function ListSecondaryText() {
      var _this9;

      (0, _classCallCheck2.default)(this, ListSecondaryText);
      _this9 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListSecondaryText).apply(this, arguments));
      _this9.componentName = 'list-item__secondary-text';
      return _this9;
    }

    return ListSecondaryText;
  }(ListTextContainer);

  exports.ListSecondaryText = ListSecondaryText;

  var ListGroup =
  /*#__PURE__*/
  function (_MaterialComponent7) {
    (0, _inherits2.default)(ListGroup, _MaterialComponent7);

    function ListGroup() {
      var _this10;

      (0, _classCallCheck2.default)(this, ListGroup);
      _this10 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListGroup).apply(this, arguments));
      _this10.componentName = 'list-group';
      _this10.mdcProps = [];
      return _this10;
    }

    (0, _createClass2.default)(ListGroup, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return ListGroup;
  }(_MaterialComponent10.default);

  exports.ListGroup = ListGroup;

  var ListGroupHeader =
  /*#__PURE__*/
  function (_MaterialComponent8) {
    (0, _inherits2.default)(ListGroupHeader, _MaterialComponent8);

    function ListGroupHeader() {
      var _this11;

      (0, _classCallCheck2.default)(this, ListGroupHeader);
      _this11 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListGroupHeader).apply(this, arguments));
      _this11.componentName = 'list-group__subheader';
      _this11.mdcProps = [];
      return _this11;
    }

    (0, _createClass2.default)(ListGroupHeader, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("h3", Object.assign({}, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return ListGroupHeader;
  }(_MaterialComponent10.default);

  exports.ListGroupHeader = ListGroupHeader;

  var List =
  /*#__PURE__*/
  function (_MaterialComponent9) {
    (0, _inherits2.default)(List, _MaterialComponent9);

    function List() {
      var _this12;

      (0, _classCallCheck2.default)(this, List);
      _this12 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).apply(this, arguments));
      _this12.componentName = 'list';
      _this12.mdcProps = ['dense', 'two-line', 'avatar-list'];
      return _this12;
    }

    (0, _createClass2.default)(List, [{
      key: "materialDom",
      value: function materialDom(props) {
        if (props.interactive) {
          return (0, _preact.h)("nav", Object.assign({
            ref: this.setControlRef
          }, props), props.children);
        }

        return (0, _preact.h)("ul", Object.assign({}, props, {
          ref: this.setControlRef
        }), props.children);
      }
    }]);
    return List;
  }(_MaterialComponent10.default);

  exports.List = List;

  var default_1 =
  /*#__PURE__*/
  function (_List) {
    (0, _inherits2.default)(default_1, _List);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(List);

  exports.default = default_1;
  default_1.Item = ListItem;
  default_1.LinkItem = ListLinkItem;
  default_1.ItemGraphic = ListItemGraphic;
  default_1.ItemMeta = ListItemMeta;
  default_1.ItemMetaText = ListItemMetaText;
  default_1.Divider = ListDivider;
  default_1.TextContainer = ListTextContainer;
  default_1.PrimaryText = ListPrimaryText;
  default_1.SecondaryText = ListSecondaryText;
  default_1.Group = ListGroup;
  default_1.GroupHeader = ListGroupHeader;
});
unwrapExports(List_1);
var List_2 = List_1.List;
var List_3 = List_1.ListGroupHeader;
var List_4 = List_1.ListGroup;
var List_5 = List_1.ListSecondaryText;
var List_6 = List_1.ListPrimaryText;
var List_7 = List_1.ListTextContainer;
var List_8 = List_1.ListDivider;
var List_9 = List_1.ListItemMetaText;
var List_10 = List_1.ListItemMeta;
var List_11 = List_1.ListItemGraphic;
var List_12 = List_1.ListLinkItem;
var List_13 = List_1.ListItem;

var Drawer_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Drawer = exports.DrawerItem = exports.DrawerContent = exports.DrawerHeader = void 0;

  var _get2 = _interopRequireDefault(require$$0$1);

  var _classCallCheck2 = _interopRequireDefault(require$$1);

  var _createClass2 = _interopRequireDefault(require$$0);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _typeof2 = _interopRequireDefault(require$$5$1);

  var _MaterialComponent4 = _interopRequireDefault(require$$5);

  var __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var DrawerHeader =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(DrawerHeader, _MaterialComponent);

    function DrawerHeader() {
      var _this;

      (0, _classCallCheck2.default)(this, DrawerHeader);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerHeader).apply(this, arguments));
      _this.componentName = 'drawer__header';
      _this.mdcProps = [];
      return _this;
    }

    (0, _createClass2.default)(DrawerHeader, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("header", Object.assign({
          ref: this.setControlRef
        }, props), (0, _preact.h)("div", {
          className: "mdc-drawer__header-content"
        }, props.children));
      }
    }]);
    return DrawerHeader;
  }(_MaterialComponent4.default);

  exports.DrawerHeader = DrawerHeader;

  var DrawerContent =
  /*#__PURE__*/
  function (_MaterialComponent2) {
    (0, _inherits2.default)(DrawerContent, _MaterialComponent2);

    function DrawerContent() {
      var _this2;

      (0, _classCallCheck2.default)(this, DrawerContent);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerContent).apply(this, arguments));
      _this2.componentName = 'drawer__content';
      _this2.mdcProps = [];
      return _this2;
    }

    (0, _createClass2.default)(DrawerContent, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", {
          class: "mdc-drawer__content"
        }, (0, _preact.h)("nav", Object.assign({
          className: "mdc-list",
          ref: this.setControlRef
        }, props), props.children));
      }
    }]);
    return DrawerContent;
  }(_MaterialComponent4.default);

  exports.DrawerContent = DrawerContent;

  var DrawerItem =
  /*#__PURE__*/
  function (_ListLinkItem) {
    (0, _inherits2.default)(DrawerItem, _ListLinkItem);

    function DrawerItem() {
      (0, _classCallCheck2.default)(this, DrawerItem);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerItem).apply(this, arguments));
    }

    (0, _createClass2.default)(DrawerItem, [{
      key: "materialDom",
      value: function materialDom(props) {
        var returnedNode = (0, _get2.default)((0, _getPrototypeOf2.default)(DrawerItem.prototype), "materialDom", this).call(this, props);
        /* Logic to add selected class */

        if (props.selected) {
          // @ts-ignore
          (returnedNode.props || returnedNode.attributes).className = 'mdc-list-item--activated';
        }

        return returnedNode;
      }
    }]);
    return DrawerItem;
  }(List_1.ListLinkItem);

  exports.DrawerItem = DrawerItem;

  var Drawer =
  /*#__PURE__*/
  function (_MaterialComponent3) {
    (0, _inherits2.default)(Drawer, _MaterialComponent3);

    function Drawer() {
      var _this3;

      (0, _classCallCheck2.default)(this, Drawer);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Drawer).apply(this, arguments));
      _this3.componentName = 'drawer-container';
      _this3.mdcProps = [];
      _this3.mdcNotifyProps = ['open'];
      return _this3;
    }

    (0, _createClass2.default)(Drawer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        (0, _get2.default)((0, _getPrototypeOf2.default)(Drawer.prototype), "componentDidMount", this).call(this);

        if (this.control && (this.props.modal || this.props.dismissible)) {
          this.MDComponent = new drawer.MDCDrawer(this.control);
          this.MDComponent.listen('MDCDrawer:opened', this.onOpen);
          this.MDComponent.listen('MDCDrawer:closed', this.onClose);
        }
      }
    }, {
      key: "onOpen",
      value: function onOpen(e) {
        if (this.props.onOpen) {
          this.props.onOpen(e);
        }
      }
    }, {
      key: "onClose",
      value: function onClose(e) {
        if (this.props.onClose) {
          this.props.onClose(e);
        }
      }
    }, {
      key: "materialDom",
      value: function materialDom(props) {
        var classes = ['mdc-drawer']; // cant use mdcProps cuz classes need to be on the inner child and not on root level

        if (props.modal) {
          classes.push('mdc-drawer--modal');
        } else if (props.dismissible) {
          classes.push('mdc-drawer--dismissible');
        }

        return (0, _preact.h)("div", null, (0, _preact.h)("aside", Object.assign({
          class: classes.join(' '),
          ref: this.setControlRef
        }, props), props.children), props.modal && (0, _preact.h)("div", {
          class: "mdc-drawer-scrim"
        }));
      }
    }]);
    return Drawer;
  }(_MaterialComponent4.default);

  exports.Drawer = Drawer;
  Drawer.DrawerContent = DrawerContent;
  Drawer.DrawerHeader = DrawerHeader;
  Drawer.DrawerItem = DrawerItem;

  __decorate([_bindDecorator.bind], Drawer.prototype, "onOpen", null);

  __decorate([_bindDecorator.bind], Drawer.prototype, "onClose", null);

  var default_1 =
  /*#__PURE__*/
  function (_Drawer) {
    (0, _inherits2.default)(default_1, _Drawer);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(Drawer);

  exports.default = default_1;
  default_1.DrawerContent = DrawerContent;
  default_1.DrawerHeader = DrawerHeader;
  default_1.DrawerItem = DrawerItem;
});
var Drawer = unwrapExports(Drawer_1);
var Drawer_2 = Drawer_1.Drawer;
var Drawer_3 = Drawer_1.DrawerItem;
var Drawer_4 = Drawer_1.DrawerContent;
var Drawer_5 = Drawer_1.DrawerHeader;

var css = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n.mdc-drawer {\n  border-color: rgba(0, 0, 0, 0.12);\n  background-color: #fff;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 256px;\n  max-width: 256px;\n  height: 100%;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  border-right-width: 1px;\n  border-right-style: solid;\n  overflow: hidden;\n  z-index: 6; }\n  .mdc-drawer .mdc-drawer__title {\n    color: rgba(0, 0, 0, 0.87); }\n  .mdc-drawer .mdc-list-group__subheader {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-drawer__subtitle {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-list-item__graphic {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-list-item {\n    color: rgba(0, 0, 0, 0.87); }\n  .mdc-drawer .mdc-list-item--activated .mdc-list-item__graphic {\n    color: #6200ee; }\n  .mdc-drawer .mdc-list-item--activated {\n    color: rgba(98, 0, 238, 0.87); }\n  .mdc-drawer .mdc-list-item {\n    border-radius: 4px; }\n  [dir=\"rtl\"] .mdc-drawer, .mdc-drawer[dir=\"rtl\"] {\n    border-right-width: 0;\n    border-left-width: 1px;\n    border-right-style: none;\n    border-left-style: solid; }\n  .mdc-drawer .mdc-list-item {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    line-height: 1.375rem;\n    font-weight: 500;\n    letter-spacing: 0.00714em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    height: calc(48px - 2 * 4px);\n    margin: 8px 8px;\n    padding: 0 8px; }\n  .mdc-drawer .mdc-list-item:nth-child(1) {\n    margin-top: 2px; }\n  .mdc-drawer .mdc-list-item:nth-last-child(1) {\n    margin-bottom: 0; }\n  .mdc-drawer .mdc-list-group__subheader {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n    font-weight: 400;\n    letter-spacing: 0.01786em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    display: block;\n    margin-top: 0;\n    line-height: normal;\n    margin: 0;\n    padding: 0 16px; }\n    .mdc-drawer .mdc-list-group__subheader::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n  .mdc-drawer .mdc-list-divider {\n    margin: 3px 0 4px 0; }\n  .mdc-drawer .mdc-list-item__text,\n  .mdc-drawer .mdc-list-item__graphic {\n    pointer-events: none; }\n\n.mdc-drawer--open {\n  transition: -webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdc-drawer--animate {\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%); }\n  [dir=\"rtl\"] .mdc-drawer--animate, .mdc-drawer--animate[dir=\"rtl\"] {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%); }\n\n.mdc-drawer--opening {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  transition-duration: 250ms; }\n  [dir=\"rtl\"] .mdc-drawer--opening, .mdc-drawer--opening[dir=\"rtl\"] {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n\n.mdc-drawer--closing {\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  transition-duration: 200ms; }\n  [dir=\"rtl\"] .mdc-drawer--closing, .mdc-drawer--closing[dir=\"rtl\"] {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%); }\n\n.mdc-drawer__header {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  min-height: 64px;\n  padding: 0 16px 4px; }\n\n.mdc-drawer__title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  display: block;\n  margin-top: 0;\n  line-height: normal;\n  margin-bottom: -20px; }\n  .mdc-drawer__title::before {\n    display: inline-block;\n    width: 0;\n    height: 36px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-drawer__title::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n\n.mdc-drawer__subtitle {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  display: block;\n  margin-top: 0;\n  line-height: normal;\n  margin-bottom: 0; }\n  .mdc-drawer__subtitle::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n\n.mdc-drawer__content {\n  height: 100%;\n  overflow-y: auto; }\n\n.mdc-drawer--dismissible {\n  /* @noflip */\n  left: 0;\n  /* @noflip */\n  right: initial;\n  display: none;\n  position: absolute;\n  top: 0; }\n  [dir=\"rtl\"] .mdc-drawer--dismissible, .mdc-drawer--dismissible[dir=\"rtl\"] {\n    /* @noflip */\n    left: initial;\n    /* @noflip */\n    right: 0; }\n  .mdc-drawer--dismissible.mdc-drawer--open {\n    display: flex; }\n\n.mdc-drawer-app-content {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 0;\n  position: relative; }\n  [dir=\"rtl\"] .mdc-drawer-app-content, .mdc-drawer-app-content[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 0; }\n  .mdc-drawer--open + .mdc-drawer-app-content {\n    /* @noflip */\n    margin-left: 256px;\n    /* @noflip */\n    margin-right: 0; }\n    [dir=\"rtl\"] .mdc-drawer--open + .mdc-drawer-app-content, .mdc-drawer--open + .mdc-drawer-app-content[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 0;\n      /* @noflip */\n      margin-right: 256px; }\n  .mdc-drawer--closing + .mdc-drawer-app-content {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 0; }\n    [dir=\"rtl\"] .mdc-drawer--closing + .mdc-drawer-app-content, .mdc-drawer--closing + .mdc-drawer-app-content[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 0;\n      /* @noflip */\n      margin-right: 0; }\n\n.mdc-drawer--modal {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n  /* @noflip */\n  left: 0;\n  /* @noflip */\n  right: initial;\n  display: none;\n  position: fixed; }\n  .mdc-drawer--modal + .mdc-drawer-scrim {\n    background-color: rgba(0, 0, 0, 0.32); }\n  [dir=\"rtl\"] .mdc-drawer--modal, .mdc-drawer--modal[dir=\"rtl\"] {\n    /* @noflip */\n    left: initial;\n    /* @noflip */\n    right: 0; }\n  .mdc-drawer--modal.mdc-drawer--open {\n    display: flex; }\n\n.mdc-drawer-scrim {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 5; }\n  .mdc-drawer--open + .mdc-drawer-scrim {\n    display: block; }\n  .mdc-drawer--animate + .mdc-drawer-scrim {\n    opacity: 0; }\n  .mdc-drawer--opening + .mdc-drawer-scrim {\n    transition-duration: 250ms;\n    opacity: 1; }\n  .mdc-drawer--closing + .mdc-drawer-scrim {\n    transition-duration: 200ms;\n    opacity: 0; }";
styleInject(css);

var css$1 = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-list {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));\n  margin: 0;\n  padding: 8px 0;\n  /* @alternate */\n  line-height: 1.5rem;\n  list-style-type: none; }\n\n.mdc-list-item__secondary-text {\n  color: rgba(0, 0, 0, 0.54);\n  /* @alternate */\n  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n\n.mdc-list-item__graphic {\n  background-color: transparent; }\n\n.mdc-list-item__graphic {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__meta {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list--dense {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  font-size: .812rem; }\n\n.mdc-list-item {\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  height: 48px;\n  padding: 0 16px;\n  overflow: hidden; }\n  .mdc-list-item:focus {\n    outline: none; }\n\n.mdc-list-item--selected,\n.mdc-list-item--activated {\n  color: #6200ee;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #6200ee); }\n  .mdc-list-item--selected .mdc-list-item__graphic,\n  .mdc-list-item--activated .mdc-list-item__graphic {\n    color: #6200ee;\n    /* @alternate */\n    color: var(--mdc-theme-primary, #6200ee); }\n\n.mdc-list-item--disabled {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 32px;\n  width: 24px;\n  height: 24px;\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  fill: currentColor; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 32px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list-item__meta {\n  /* @noflip */\n  margin-left: auto;\n  /* @noflip */\n  margin-right: 0; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__meta,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__meta {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: auto; }\n\n.mdc-list-item__text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.mdc-list-item__primary-text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  line-height: normal;\n  margin-bottom: -20px;\n  display: block; }\n  .mdc-list-item__primary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 32px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list-item__primary-text::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n  .mdc-list--dense .mdc-list-item__primary-text {\n    display: block;\n    margin-top: 0;\n    line-height: normal;\n    margin-bottom: -20px; }\n    .mdc-list--dense .mdc-list-item__primary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n    .mdc-list--dense .mdc-list-item__primary-text::after {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: -20px; }\n\n.mdc-list-item__secondary-text {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  line-height: normal;\n  display: block; }\n  .mdc-list-item__secondary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list--dense .mdc-list-item__secondary-text {\n    display: block;\n    margin-top: 0;\n    line-height: normal;\n    font-size: inherit; }\n    .mdc-list--dense .mdc-list-item__secondary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: 0; }\n\n.mdc-list--dense .mdc-list-item {\n  height: 40px; }\n\n.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 36px;\n  width: 20px;\n  height: 20px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 36px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--avatar-list .mdc-list-item {\n  height: 56px; }\n\n.mdc-list--avatar-list .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 16px;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 16px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--two-line .mdc-list-item__text {\n  align-self: flex-start; }\n\n.mdc-list--two-line .mdc-list-item {\n  height: 72px; }\n\n.mdc-list--two-line.mdc-list--dense .mdc-list-item {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 20px;\n  width: 36px;\n  height: 36px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 20px;\n    /* @noflip */\n    margin-right: 0; }\n\n:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before {\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n            transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n            animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n            animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    background-color: black; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:hover::before {\n    opacity: 0.04; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n    background-color: #6200ee; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {\n    opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.28; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.28; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before {\n    opacity: 0.08; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n    background-color: #6200ee; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.2; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.24; }\n\na.mdc-list-item {\n  color: inherit;\n  text-decoration: none; }\n\n.mdc-list-divider {\n  height: 0;\n  margin: 0;\n  border: none;\n  border-bottom-width: 1px;\n  border-bottom-style: solid; }\n\n.mdc-list-divider {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n\n.mdc-list-divider--padded {\n  margin: 0 16px; }\n\n.mdc-list-divider--inset {\n  /* @noflip */\n  margin-left: 72px;\n  /* @noflip */\n  margin-right: 0;\n  width: calc(100% - 72px); }\n  .mdc-list-group[dir=\"rtl\"] .mdc-list-divider--inset,\n  [dir=\"rtl\"] .mdc-list-group .mdc-list-divider--inset {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 72px; }\n\n.mdc-list-divider--inset.mdc-list-divider--padded {\n  width: calc(100% - 72px - 16px); }\n\n.mdc-list-group .mdc-list {\n  padding: 0; }\n\n.mdc-list-group__subheader {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin: 0.75rem 16px; }\n\n.mdc-list-group__subheader {\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }";
styleInject(css$1);

var css$2 = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-button {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  padding: 0 8px 0 8px;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  height: 36px;\n  border: none;\n  outline: none;\n  /* @alternate */\n  line-height: inherit;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-appearance: none;\n  overflow: hidden;\n  vertical-align: middle;\n  border-radius: 2px; }\n  .mdc-button::before, .mdc-button::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-button::before {\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .mdc-button.mdc-ripple-upgraded::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n            transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-button.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n  .mdc-button.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  .mdc-button.mdc-ripple-upgraded--foreground-activation::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n            animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-button.mdc-ripple-upgraded--foreground-deactivation::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n            animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-button::before, .mdc-button::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-button.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-button::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n  .mdc-button:active {\n    outline: none; }\n  .mdc-button:hover {\n    cursor: pointer; }\n  .mdc-button:disabled {\n    background-color: transparent;\n    color: rgba(0, 0, 0, 0.37);\n    cursor: default;\n    pointer-events: none; }\n  .mdc-button:not(:disabled) {\n    background-color: transparent; }\n  .mdc-button:not(:disabled) {\n    color: #6200ee;\n    /* @alternate */\n    color: var(--mdc-theme-primary, #6200ee); }\n  .mdc-button::before, .mdc-button::after {\n    background-color: #6200ee; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button::before, .mdc-button::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  .mdc-button:hover::before {\n    opacity: 0.04; }\n  .mdc-button:not(.mdc-ripple-upgraded):focus::before, .mdc-button.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-button:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-button:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  .mdc-button.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  .mdc-button .mdc-button__icon {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 8px;\n    display: inline-block;\n    width: 18px;\n    height: 18px;\n    font-size: 18px;\n    vertical-align: top; }\n    [dir=\"rtl\"] .mdc-button .mdc-button__icon, .mdc-button .mdc-button__icon[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 8px;\n      /* @noflip */\n      margin-right: 0; }\n  .mdc-button svg.mdc-button__icon {\n    fill: currentColor; }\n\n.mdc-button--raised .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__icon,\n.mdc-button--outlined .mdc-button__icon {\n  /* @noflip */\n  margin-left: -4px;\n  /* @noflip */\n  margin-right: 8px; }\n  [dir=\"rtl\"] .mdc-button--raised .mdc-button__icon, .mdc-button--raised .mdc-button__icon[dir=\"rtl\"], [dir=\"rtl\"]\n  .mdc-button--unelevated .mdc-button__icon,\n  .mdc-button--unelevated .mdc-button__icon[dir=\"rtl\"], [dir=\"rtl\"]\n  .mdc-button--outlined .mdc-button__icon,\n  .mdc-button--outlined .mdc-button__icon[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 8px;\n    /* @noflip */\n    margin-right: -4px; }\n\n.mdc-button--raised,\n.mdc-button--unelevated {\n  padding: 0 16px 0 16px; }\n  .mdc-button--raised:disabled,\n  .mdc-button--unelevated:disabled {\n    background-color: rgba(0, 0, 0, 0.12);\n    color: rgba(0, 0, 0, 0.37); }\n  .mdc-button--raised:not(:disabled),\n  .mdc-button--unelevated:not(:disabled) {\n    background-color: #6200ee; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button--raised:not(:disabled),\n      .mdc-button--unelevated:not(:disabled) {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  .mdc-button--raised:not(:disabled),\n  .mdc-button--unelevated:not(:disabled) {\n    color: #fff;\n    /* @alternate */\n    color: var(--mdc-theme-on-primary, #fff); }\n  .mdc-button--raised::before, .mdc-button--raised::after,\n  .mdc-button--unelevated::before,\n  .mdc-button--unelevated::after {\n    background-color: #fff; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button--raised::before, .mdc-button--raised::after,\n      .mdc-button--unelevated::before,\n      .mdc-button--unelevated::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-on-primary, #fff); } }\n  .mdc-button--raised:hover::before,\n  .mdc-button--unelevated:hover::before {\n    opacity: 0.08; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded):focus::before, .mdc-button--raised.mdc-ripple-upgraded--background-focused::before,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded):focus::before,\n  .mdc-button--unelevated.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded)::after,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded):active::after,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.32; }\n  .mdc-button--raised.mdc-ripple-upgraded,\n  .mdc-button--unelevated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.32; }\n\n.mdc-button--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-button--raised:hover, .mdc-button--raised:focus {\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-button--raised:active {\n    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n  .mdc-button--raised:disabled {\n    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n\n.mdc-button--outlined {\n  border-style: solid;\n  padding: 0 14px 0 14px;\n  border-width: 2px; }\n  .mdc-button--outlined:disabled {\n    border-color: rgba(0, 0, 0, 0.37); }\n  .mdc-button--outlined:not(:disabled) {\n    border-color: #6200ee;\n    /* @alternate */\n    border-color: var(--mdc-theme-primary, #6200ee); }\n\n.mdc-button--dense {\n  height: 32px;\n  font-size: .8125rem; }";
styleInject(css$2);

var DrawerPage = function DrawerPage(_ref) {
  var open = _ref.open,
      setToggle = _ref.setToggle,
      items = _ref.items;
  return h("div", null, h(Drawer, {
    modal: true,
    open: open,
    onClose: function onClose() {//  setToggle(false) 
    }
  }, h(Drawer.DrawerHeader, {
    className: "mdc-theme--primary-bg"
  }, "Portfolio", h("input", {
    type: "text",
    style: {
      opacity: 0
    }
  })), h(Drawer.DrawerContent, null, items && items.map(function (item, i) {
    return h(Drawer.DrawerItem, {
      onClick: setToggle,
      href: "".concat(item.route)
    }, item.title);
  }))));
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation$2 {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @template F
 */

class MDCComponent$2 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$2(root, new MDCFoundation$2());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses$2 = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
};
/** @enum {number} */

const numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
/** @enum {string} */

const strings$2 = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
 */

class MDCTopAppBarBaseFoundation extends MDCFoundation$2 {
  /** @return enum {string} */
  static get strings() {
    return strings$2;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$2;
  }
  /** @return enum {number} */


  static get numbers() {
    return numbers;
  }
  /**
   * {@see MDCTopAppBarAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTopAppBarAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTopAppBarAdapter} */
      {
        hasClass: () =>
        /* className: string */
        {},
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        setStyle: () =>
        /* property: string, value: string */
        {},
        getTopAppBarHeight: () => {},
        registerNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        deregisterNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        notifyNavigationIconClicked: () => {},
        registerScrollHandler: () =>
        /* handler: EventListener */
        {},
        deregisterScrollHandler: () =>
        /* handler: EventListener */
        {},
        registerResizeHandler: () =>
        /* handler: EventListener */
        {},
        deregisterResizeHandler: () =>
        /* handler: EventListener */
        {},
        getViewportScrollY: () =>
        /* number */
        0,
        getTotalActionItems: () =>
        /* number */
        0
      }
    );
  }
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */


  constructor(
  /** @type {!MDCTopAppBarAdapter} */
  adapter) {
    super(Object.assign(MDCTopAppBarBaseFoundation.defaultAdapter, adapter));

    this.navClickHandler_ = () => this.adapter_.notifyNavigationIconClicked();

    this.scrollHandler_ = () => {};
  }

  init() {
    this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  destroy() {
    this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  initScrollHandler() {
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroyScrollHandler() {
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCTopAppBarFoundation<!MDCFixedTopAppBarFoundation>}
 * @final
 */

class MDCFixedTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /** State variable for the previous scroll iteration top app bar state */

    this.wasScrolled_ = false;

    this.scrollHandler_ = () => this.fixedScrollHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the modifier class
   * on the fixed top app bar.
   */


  fixedScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(cssClasses$2.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(cssClasses$2.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
 * @final
 */

class MDCShortTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter); // State variable for the current top app bar state

    this.isCollapsed = false;

    this.scrollHandler_ = () => this.shortAppBarScrollHandler_();
  }

  init() {
    super.init();
    const isAlwaysCollapsed = this.adapter_.hasClass(cssClasses$2.SHORT_COLLAPSED_CLASS);

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(cssClasses$2.SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!isAlwaysCollapsed) {
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the collapsed modifier class
   * on the short top app bar.
   * @private
   */


  shortAppBarScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(cssClasses$2.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(cssClasses$2.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const INITIAL_VALUE = 0;
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCTopAppBarFoundation>}
 * @final
 */

class MDCTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /**
     * Used for diffs of current scroll position vs previous scroll position
     * @private {number}
     */

    this.lastScrollPosition_ = this.adapter_.getViewportScrollY();
    /**
     * Used to verify when the top app bar is completely showing or completely hidden
     * @private {number}
     */

    this.topAppBarHeight_ = this.adapter_.getTopAppBarHeight();
    /**
     * wasDocked_ is used to indicate if the top app bar was docked in the previous
     * scroll handler iteration.
     * @private {boolean}
     */

    this.wasDocked_ = true;
    /**
     * isDockedShowing_ is used to indicate if the top app bar is docked in the fully
     * shown position.
     * @private {boolean}
     */

    this.isDockedShowing_ = true;
    /**
     * Variable for current scroll position of the top app bar
     * @private {number}
     */

    this.currentAppBarOffsetTop_ = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     * @private {boolean} */

    this.isCurrentlyBeingResized_ = false;
    /**
     * The timeout that's used to throttle the resize events
     * @private {number}
     */

    this.resizeThrottleId_ = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     * @private {number}
     */

    this.resizeDebounceId_ = INITIAL_VALUE;

    this.scrollHandler_ = () => this.topAppBarScrollHandler_();

    this.resizeHandler_ = () => this.topAppBarResizeHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.setStyle('top', '');
  }
  /**
   * Function to determine if the DOM needs to update.
   * @return {boolean}
   * @private
   */


  checkForUpdate_() {
    const offscreenBoundaryTop = -this.topAppBarHeight_;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }
  /**
   * Function to move the top app bar if needed.
   * @private
   */


  moveTopAppBar_() {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop_;

      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  }
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @private
   */


  topAppBarScrollHandler_() {
    const currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition; // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.

    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  }
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @private
   */


  topAppBarResizeHandler_() {
    // Throttle resize events 10 p/s
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(() => {
        this.resizeThrottleId_ = INITIAL_VALUE;
        this.throttledResizeHandler_();
      }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(() => {
      this.topAppBarScrollHandler_();
      this.isCurrentlyBeingResized_ = false;
      this.resizeDebounceId_ = INITIAL_VALUE;
    }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  }
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   * @private
   */


  throttledResizeHandler_() {
    const currentHeight = this.adapter_.getTopAppBarHeight();

    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }

    this.topAppBarScrollHandler_();
  }

}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @extends {MDCComponent<!MDCTopAppBarBaseFoundation>}
 * @final
 */

class MDCTopAppBar extends MDCComponent$2 {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?Element} */

    this.navIcon_;
    /** @type {?Array<MDCRipple>} */

    this.iconRipples_;
    /** @type {Object} */

    this.scrollTarget_;
  }

  initialize(rippleFactory = el => MDCRipple.attachTo(el)) {
    this.navIcon_ = this.root_.querySelector(strings$2.NAVIGATION_ICON_SELECTOR); // Get all icons in the toolbar and instantiate the ripples

    const icons = [].slice.call(this.root_.querySelectorAll(strings$2.ACTION_ITEM_SELECTOR));

    if (this.navIcon_) {
      icons.push(this.navIcon_);
    }

    this.iconRipples_ = icons.map(icon => {
      const ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
  }

  destroy() {
    this.iconRipples_.forEach(iconRipple => iconRipple.destroy());
    super.destroy();
  }

  setScrollTarget(target) {
    this.foundation_.destroyScrollHandler();
    this.scrollTarget_ = target;
    this.foundation_.initScrollHandler();
  }
  /**
   * @param {!Element} root
   * @return {!MDCTopAppBar}
   */


  static attachTo(root) {
    return new MDCTopAppBar(root);
  }
  /**
   * @return {!MDCTopAppBarBaseFoundation}
   */


  getDefaultFoundation() {
    /** @type {!MDCTopAppBarAdapter} */
    const adapter =
    /** @type {!MDCTopAppBarAdapter} */
    Object.assign({
      hasClass: className => this.root_.classList.contains(className),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setStyle: (property, value) => this.root_.style.setProperty(property, value),
      getTopAppBarHeight: () => this.root_.clientHeight,
      registerNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.addEventListener(evtType, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.removeEventListener(evtType, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        this.emit(strings$2.NAVIGATION_EVENT, {});
      },
      registerScrollHandler: handler => this.scrollTarget_.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => this.scrollTarget_.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportScrollY: () => this.scrollTarget_[this.scrollTarget_ === window ? 'pageYOffset' : 'scrollTop'],
      getTotalActionItems: () => this.root_.querySelectorAll(strings$2.ACTION_ITEM_SELECTOR).length
    });
    this.scrollTarget_ = window;
    /** @type {!MDCTopAppBarBaseFoundation} */

    let foundation;

    if (this.root_.classList.contains(cssClasses$2.SHORT_CLASS)) {
      foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.root_.classList.contains(cssClasses$2.FIXED_CLASS)) {
      foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      foundation = new MDCTopAppBarFoundation(adapter);
    }

    return foundation;
  }

}

var topAppBar = /*#__PURE__*/Object.freeze({
  MDCTopAppBar: MDCTopAppBar,
  MDCTopAppBarBaseFoundation: MDCTopAppBarBaseFoundation,
  MDCTopAppBarFoundation: MDCTopAppBarFoundation,
  MDCFixedTopAppBarFoundation: MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation: MDCShortTopAppBarFoundation
});

var TopAppBar_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.TopAppBar = exports.TopAppBarTitle = exports.TopAppBarIcon = exports.TopAppBarSection = exports.TopAppBarRow = void 0;

  var _get2 = _interopRequireDefault(require$$0$1);

  var _classCallCheck2 = _interopRequireDefault(require$$1);

  var _createClass2 = _interopRequireDefault(require$$0);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _typeof2 = _interopRequireDefault(require$$5$1);

  var _MaterialComponent6 = _interopRequireDefault(require$$5);

  var __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var TopAppBarRow =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(TopAppBarRow, _MaterialComponent);

    function TopAppBarRow() {
      var _this;

      (0, _classCallCheck2.default)(this, TopAppBarRow);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarRow).apply(this, arguments));
      _this.componentName = 'top-app-bar__row';
      _this.mdcProps = [];
      return _this;
    }

    (0, _createClass2.default)(TopAppBarRow, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
      }
    }]);
    return TopAppBarRow;
  }(_MaterialComponent6.default);

  exports.TopAppBarRow = TopAppBarRow;

  var TopAppBarSection =
  /*#__PURE__*/
  function (_MaterialComponent2) {
    (0, _inherits2.default)(TopAppBarSection, _MaterialComponent2);

    function TopAppBarSection() {
      var _this2;

      (0, _classCallCheck2.default)(this, TopAppBarSection);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarSection).apply(this, arguments));
      _this2.componentName = 'top-app-bar__section';
      _this2.mdcProps = ['align-start', 'align-end'];
      return _this2;
    }

    (0, _createClass2.default)(TopAppBarSection, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("section", Object.assign({}, props), props.children);
      }
    }]);
    return TopAppBarSection;
  }(_MaterialComponent6.default);

  exports.TopAppBarSection = TopAppBarSection;

  var TopAppBarIcon =
  /*#__PURE__*/
  function (_MaterialComponent3) {
    (0, _inherits2.default)(TopAppBarIcon, _MaterialComponent3);

    function TopAppBarIcon() {
      var _this3;

      (0, _classCallCheck2.default)(this, TopAppBarIcon);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarIcon).apply(this, arguments));
      _this3.componentName = 'top-app-bar__icon';
      _this3.mdcProps = [];
      return _this3;
    }

    (0, _createClass2.default)(TopAppBarIcon, [{
      key: "materialDom",
      value: function materialDom(props) {
        var className = props.navigation ? 'material-icons mdc-top-app-bar__navigation-icon' : 'material-icons';
        return (0, _preact.h)("a", Object.assign({
          className: className
        }, props), props.children);
      }
    }]);
    return TopAppBarIcon;
  }(_MaterialComponent6.default);

  exports.TopAppBarIcon = TopAppBarIcon;

  var TopAppBarTitle =
  /*#__PURE__*/
  function (_MaterialComponent4) {
    (0, _inherits2.default)(TopAppBarTitle, _MaterialComponent4);

    function TopAppBarTitle() {
      var _this4;

      (0, _classCallCheck2.default)(this, TopAppBarTitle);
      _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarTitle).apply(this, arguments));
      _this4.componentName = 'top-app-bar__title';
      _this4.mdcProps = [];
      return _this4;
    }

    (0, _createClass2.default)(TopAppBarTitle, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({}, props), props.children);
      }
    }]);
    return TopAppBarTitle;
  }(_MaterialComponent6.default);

  exports.TopAppBarTitle = TopAppBarTitle;

  var TopAppBar =
  /*#__PURE__*/
  function (_MaterialComponent5) {
    (0, _inherits2.default)(TopAppBar, _MaterialComponent5);

    function TopAppBar() {
      var _this5;

      (0, _classCallCheck2.default)(this, TopAppBar);
      _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBar).apply(this, arguments));
      _this5.componentName = 'top-app-bar';
      _this5.mdcProps = ['short', 'short-collapsed', 'fixed', 'prominent'];
      return _this5;
    }

    (0, _createClass2.default)(TopAppBar, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentDidMount", this).call(this);

        if (this.control) {
          var comp = new topAppBar.MDCTopAppBar(this.control);
          comp.listen('MDCTopAppBar:nav', this.onNav);
          this.MDComponent = comp;
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentWillUnmount", this).call(this);

        if (this.MDComponent) {
          this.MDComponent.unlisten('MDCTopAppBar:nav', this.onNav);
          this.MDComponent.destroy();
        }
      }
    }, {
      key: "onNav",
      value: function onNav(e) {
        if (this.props.onNav) {
          this.props.onNav(e);
        }
      }
    }, {
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("header", Object.assign({
          ref: this.setControlRef
        }, props), props.children);
      }
    }]);
    return TopAppBar;
  }(_MaterialComponent6.default);

  exports.TopAppBar = TopAppBar;

  __decorate([_bindDecorator.bind], TopAppBar.prototype, "onNav", null);

  var default_1 =
  /*#__PURE__*/
  function (_TopAppBar) {
    (0, _inherits2.default)(default_1, _TopAppBar);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(TopAppBar);

  exports.default = default_1;
  default_1.Section = TopAppBarSection;
  default_1.Icon = TopAppBarIcon;
  default_1.Title = TopAppBarTitle;
  default_1.Row = TopAppBarRow;
});
var TopAppBar = unwrapExports(TopAppBar_1);
var TopAppBar_2 = TopAppBar_1.TopAppBar;
var TopAppBar_3 = TopAppBar_1.TopAppBarTitle;
var TopAppBar_4 = TopAppBar_1.TopAppBarIcon;
var TopAppBar_5 = TopAppBar_1.TopAppBarSection;
var TopAppBar_6 = TopAppBar_1.TopAppBarRow;

var css$3 = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n.mdc-top-app-bar {\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-theme-primary, #6200ee);\n  color: white;\n  display: flex;\n  position: fixed;\n  flex-direction: column;\n  justify-content: space-between;\n  box-sizing: border-box;\n  width: 100%;\n  z-index: 4; }\n  .mdc-top-app-bar .mdc-top-app-bar__action-item,\n  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon {\n    color: #fff;\n    /* @alternate */\n    color: var(--mdc-theme-on-primary, #fff); }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item::before, .mdc-top-app-bar .mdc-top-app-bar__action-item::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {\n      background-color: #fff; }\n      @supports not (-ms-ime-align: auto) {\n        .mdc-top-app-bar .mdc-top-app-bar__action-item::before, .mdc-top-app-bar .mdc-top-app-bar__action-item::after,\n        .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,\n        .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {\n          /* @alternate */\n          background-color: var(--mdc-theme-on-primary, #fff); } }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before {\n      opacity: 0.08; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before, .mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before {\n      transition-duration: 75ms;\n      opacity: 0.24; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after {\n      transition: opacity 150ms linear; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after {\n      transition-duration: 75ms;\n      opacity: 0.32; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded {\n      --mdc-ripple-fg-opacity: 0.32; }\n  .mdc-top-app-bar__row {\n    display: flex;\n    position: relative;\n    box-sizing: border-box;\n    width: 100%;\n    height: 64px; }\n  .mdc-top-app-bar__section {\n    display: inline-flex;\n    flex: 1 1 auto;\n    align-items: center;\n    min-width: 0;\n    padding: 8px 12px;\n    z-index: 1; }\n    .mdc-top-app-bar__section--align-start {\n      justify-content: flex-start;\n      order: -1; }\n    .mdc-top-app-bar__section--align-end {\n      justify-content: flex-end;\n      order: 1; }\n  .mdc-top-app-bar__title {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.25rem;\n    line-height: 2rem;\n    font-weight: 500;\n    letter-spacing: 0.0125em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    /* @noflip */\n    padding-left: 20px;\n    /* @noflip */\n    padding-right: 0;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    z-index: 1; }\n    [dir=\"rtl\"] .mdc-top-app-bar__title, .mdc-top-app-bar__title[dir=\"rtl\"] {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 20px; }\n  .mdc-top-app-bar__action-item, .mdc-top-app-bar__navigation-icon {\n    --mdc-ripple-fg-size: 0;\n    --mdc-ripple-left: 0;\n    --mdc-ripple-top: 0;\n    --mdc-ripple-fg-scale: 1;\n    --mdc-ripple-fg-translate-end: 0;\n    --mdc-ripple-fg-translate-start: 0;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    will-change: transform, opacity;\n    display: flex;\n    position: relative;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    width: 48px;\n    height: 48px;\n    padding: 12px;\n    border: none;\n    outline: none;\n    background-color: transparent;\n    fill: currentColor;\n    color: inherit;\n    text-decoration: none;\n    cursor: pointer; }\n    .mdc-top-app-bar__action-item::before, .mdc-top-app-bar__action-item::after, .mdc-top-app-bar__navigation-icon::before, .mdc-top-app-bar__navigation-icon::after {\n      position: absolute;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: \"\"; }\n    .mdc-top-app-bar__action-item::before, .mdc-top-app-bar__navigation-icon::before {\n      transition: opacity 15ms linear;\n      z-index: 1; }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded::before, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::before {\n      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n              transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {\n      top: 0;\n      /* @noflip */\n      left: 0;\n      -webkit-transform: scale(0);\n              transform: scale(0);\n      -webkit-transform-origin: center center;\n              transform-origin: center center; }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded--unbounded::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--unbounded::after {\n      top: var(--mdc-ripple-top, 0);\n      /* @noflip */\n      left: var(--mdc-ripple-left, 0); }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded--foreground-activation::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--foreground-activation::after {\n      -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n              animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded--foreground-deactivation::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--foreground-deactivation::after {\n      -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n              animation: 150ms mdc-ripple-fg-opacity-out;\n      -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n              transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n    .mdc-top-app-bar__action-item::before, .mdc-top-app-bar__action-item::after, .mdc-top-app-bar__navigation-icon::before, .mdc-top-app-bar__navigation-icon::after {\n      top: calc(50% - 50%);\n      /* @noflip */\n      left: calc(50% - 50%);\n      width: 100%;\n      height: 100%; }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded::before, .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::before, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      /* @noflip */\n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: var(--mdc-ripple-fg-size, 100%); }\n    .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after, .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: var(--mdc-ripple-fg-size, 100%); }\n\n.mdc-top-app-bar--short {\n  top: 0;\n  right: auto;\n  left: 0;\n  width: 100%;\n  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1); }\n  [dir=\"rtl\"] .mdc-top-app-bar--short, .mdc-top-app-bar--short[dir=\"rtl\"] {\n    right: 0;\n    left: auto; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__row {\n    height: 56px; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__section {\n    padding: 4px; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__title {\n    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    opacity: 1; }\n\n.mdc-top-app-bar--short-collapsed {\n  /* @noflip */\n  border-bottom-left-radius: 0;\n  /* @noflip */\n  border-bottom-right-radius: 4px;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  width: 56px;\n  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1); }\n  [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed, .mdc-top-app-bar--short-collapsed[dir=\"rtl\"] {\n    /* @noflip */\n    border-bottom-left-radius: 4px;\n    /* @noflip */\n    border-bottom-right-radius: 0; }\n  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title {\n    display: none; }\n  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item {\n    transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item {\n  width: 112px; }\n  .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 12px; }\n    [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end, .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=\"rtl\"] {\n      /* @noflip */\n      padding-left: 12px;\n      /* @noflip */\n      padding-right: 0; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__row {\n  height: 48px; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__section {\n  padding: 0 4px; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__title {\n  /* @noflip */\n  padding-left: 12px;\n  /* @noflip */\n  padding-right: 0; }\n  [dir=\"rtl\"] .mdc-top-app-bar--dense .mdc-top-app-bar__title, .mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=\"rtl\"] {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 12px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__row {\n  height: 128px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n  align-self: flex-end;\n  padding-bottom: 2px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,\n.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon {\n  align-self: flex-start; }\n\n.mdc-top-app-bar--fixed {\n  transition: box-shadow 200ms linear; }\n\n.mdc-top-app-bar--fixed-scrolled {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 200ms linear; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row {\n  height: 96px; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section {\n  padding: 0 12px; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n  /* @noflip */\n  padding-left: 20px;\n  /* @noflip */\n  padding-right: 0;\n  padding-bottom: 9px; }\n  [dir=\"rtl\"] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title, .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=\"rtl\"] {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 20px; }\n\n.mdc-top-app-bar--fixed-adjust {\n  padding-top: 64px; }\n\n.mdc-top-app-bar--dense-fixed-adjust {\n  padding-top: 48px; }\n\n.mdc-top-app-bar--short-fixed-adjust {\n  padding-top: 56px; }\n\n.mdc-top-app-bar--prominent-fixed-adjust {\n  padding-top: 128px; }\n\n.mdc-top-app-bar--dense-prominent-fixed-adjust {\n  padding-top: 96px; }\n\n@media (max-width: 599px) {\n  .mdc-top-app-bar__row {\n    height: 56px; }\n  .mdc-top-app-bar__section {\n    padding: 4px; }\n  .mdc-top-app-bar--short {\n    transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-top-app-bar--short-collapsed {\n    transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1); }\n    .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 12px; }\n      [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end, .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=\"rtl\"] {\n        /* @noflip */\n        padding-left: 12px;\n        /* @noflip */\n        padding-right: 0; }\n  .mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n    padding-bottom: 6px; }\n  .mdc-top-app-bar--fixed-adjust {\n    padding-top: 56px; } }";
styleInject(css$3);

var css$4 = ".fixed{\r\n    position: fixed;\r\n    top:0\r\n}\r\n\r\n.top-bar{\r\n    margin-left: 0;\r\n    width: 100%;\r\n}\r\nbody{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.feedback-messages{\r\n   position: absolute;\r\n   bottom:0;\r\n   left:0; \r\n}\r\n\r\n.app-shell{\r\n    position: relative;\r\n}";
styleInject(css$4);

var TopAppBarNav = function TopAppBarNav(_ref) {
  var toggle = _ref.toggle,
      setToggle = _ref.setToggle,
      title = _ref.title;
  return h(TopAppBar, {
    className: "topappbar fixed top-bar",
    onNav: function onNav() {
      setToggle(!toggle);
    }
  }, h(TopAppBar.Row, null, h(TopAppBar.Section, {
    "align-start": true
  }, h(TopAppBar.Icon, {
    navigation: true
  }, h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, h("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), h("path", {
    d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
  }))), h(TopAppBar.Title, null, title)), h(TopAppBar.Section, {
    "align-end": true
  }, h(TopAppBar.Icon, null, h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, h("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), h("path", {
    d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }))))));
};

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

    for (var i = 0; i < p.length; i++) {
      var r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }

  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  var max = Math.max(url.length, route.length);

  for (var i$1 = 0; i$1 < max; i$1++) {
    if (route[i$1] && route[i$1].charAt(0) === ':') {
      var param = route[i$1].replace(/(^:|[+*?]+$)/g, ''),
          flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
          plus = ~flags.indexOf('+'),
          star = ~flags.indexOf('*'),
          val = url[i$1] || '';

      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }

      matches[param] = decodeURIComponent(val);

      if (plus || star) {
        matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
        break;
      }
    } else if (route[i$1] !== url[i$1]) {
      ret = false;
      break;
    }
  }

  if (opts.default !== true && ret === false) {
    return false;
  }

  return matches;
}

function pathRankSort(a, b$$1) {
  return a.rank < b$$1.rank ? 1 : a.rank > b$$1.rank ? -1 : a.index - b$$1.index;
} // filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.


function prepareVNodeForRanking(vnode, index) {
  vnode.index = index;
  vnode.rank = rankChild(vnode);
  return vnode.props;
}

function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
  return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
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
  if (type === void 0) type = 'push';

  if (customHistory && customHistory[type]) {
    customHistory[type](url);
  } else if (typeof history !== 'undefined' && history[type + 'State']) {
    history[type + 'State'](null, null, url);
  }
}

function getCurrentUrl() {
  var url;

  if (customHistory && customHistory.location) {
    url = customHistory.location;
  } else if (customHistory && customHistory.getCurrentLocation) {
    url = customHistory.getCurrentLocation();
  } else {
    url = typeof location !== 'undefined' ? location : EMPTY;
  }

  return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
  if (replace === void 0) replace = false;

  if (typeof url !== 'string' && url.url) {
    replace = url.replace;
    url = url.url;
  } // only push URL into history if we can handle it


  if (canRoute(url)) {
    setUrl(url, replace ? 'replace' : 'push');
  }

  return routeTo(url);
}
/** Check if the given URL can be handled by any router instances. */


function canRoute(url) {
  for (var i = ROUTERS.length; i--;) {
    if (ROUTERS[i].canRoute(url)) {
      return true;
    }
  }

  return false;
}
/** Tell all router instances to handle the given URL.  */


function routeTo(url) {
  var didRoute = false;

  for (var i = 0; i < ROUTERS.length; i++) {
    if (ROUTERS[i].routeTo(url) === true) {
      didRoute = true;
    }
  }

  for (var i$1 = subscribers.length; i$1--;) {
    subscribers[i$1](url);
  }

  return didRoute;
}

function routeFromLink(node) {
  // only valid elements
  if (!node || !node.getAttribute) {
    return;
  }

  var href = node.getAttribute('href'),
      target = node.getAttribute('target'); // ignore links with targets and non-path URLs

  if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
    return;
  } // attempt to route, if no match simply cede control to browser


  return route(href);
}

function handleLinkClick(e) {
  if (e.button == 0) {
    routeFromLink(e.currentTarget || e.target || this);
    return prevent(e);
  }
}

function prevent(e) {
  if (e) {
    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    e.preventDefault();
  }

  return false;
}

function delegateLinkHandler(e) {
  // ignore events the browser takes care of already:
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
    return;
  }

  var t = e.target;

  do {
    if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href')) {
      if (t.hasAttribute('native')) {
        return;
      } // if link is handled by the router, prevent browser defaults


      if (routeFromLink(t)) {
        return prevent(e);
      }
    }
  } while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
  if (eventListenersInitialized) {
    return;
  }

  if (typeof addEventListener === 'function') {
    if (!customHistory) {
      addEventListener('popstate', function () {
        routeTo(getCurrentUrl());
      });
    }

    addEventListener('click', delegateLinkHandler);
  }

  eventListenersInitialized = true;
}

var Router = function (Component$$1) {
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

  if (Component$$1) Router.__proto__ = Component$$1;
  Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
  Router.prototype.constructor = Router;

  Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
    if (props.static !== true) {
      return true;
    }

    return props.url !== this.props.url || props.onChange !== this.props.onChange;
  };
  /** Check if the given URL can be matched against any children */


  Router.prototype.canRoute = function canRoute(url) {
    var children = b(this.props.children);
    return this.getMatchingChildren(children, url, false).length > 0;
  };
  /** Re-render children with a new URL to match against. */


  Router.prototype.routeTo = function routeTo(url) {
    this.setState({
      url: url
    });
    var didRoute = this.canRoute(url); // trigger a manual re-route if we're not in the middle of an update:

    if (!this.updating) {
      this.forceUpdate();
    }

    return didRoute;
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    ROUTERS.push(this);
    this.updating = true;
  };

  Router.prototype.componentDidMount = function componentDidMount() {
    var this$1 = this;

    if (customHistory) {
      this.unlisten = customHistory.listen(function (location) {
        this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
      });
    }

    this.updating = false;
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    if (typeof this.unlisten === 'function') {
      this.unlisten();
    }

    ROUTERS.splice(ROUTERS.indexOf(this), 1);
  };

  Router.prototype.componentWillUpdate = function componentWillUpdate() {
    this.updating = true;
  };

  Router.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updating = false;
  };

  Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
    return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
      var matches = exec(url, vnode.props.path, vnode.props);

      if (matches) {
        if (invoke !== false) {
          var newProps = {
            url: url,
            matches: matches
          };
          assign(newProps, matches);
          delete newProps.ref;
          delete newProps.key;
          return I(vnode, newProps);
        }

        return vnode;
      }
    }).filter(Boolean);
  };

  Router.prototype.render = function render(ref, ref$1) {
    var children = ref.children;
    var onChange = ref.onChange;
    var url = ref$1.url;
    var active = this.getMatchingChildren(b(children), url, true);
    var current = active[0] || null;
    var previous = this.previousUrl;

    if (url !== previous) {
      this.previousUrl = url;

      if (typeof onChange === 'function') {
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
}(y);

var Link = function (props) {
  return h('a', assign({
    onClick: handleLinkClick
  }, props));
};

var Route = function (props) {
  return h(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

var dist = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory(_preact);
  })(commonjsGlobal, function (preact) {

    var _extends = Object.assign || function (target) {
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

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

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
          var component = _ref.component; // Named param for making callback future proof

          if (component) {
            _this2.setState({
              componentData: component
            });
          }
        }, _extends({}, this.props, this.props.matches)); // In case returned value was a promise

        if (componentData && componentData.then) {
          // IIFE to check if a later ending promise was creating a race condition
          // Check test case for more info
          (function (url) {
            componentData.then(function (component) {
              if (url !== _this2.props.url) {
                _this2.setState({
                  componentData: null
                }, function () {
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
  });
});

var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
} // v8 likes predictible objects

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
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
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
} // About 1.5x faster than the two-arg version of Array#splice()


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
} // This implementation is based heavily on node's url.parse


function resolvePathname(to, from) {
  if (from === undefined) from = '';
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
  var hasTrailingSlash;

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

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');
  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
  var result = fromParts.join('/');
  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
  return result;
}

function warning(condition, message) {
  {
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

var prefix = 'Invariant failed';

function invariant(condition, message) {
  if (condition) {
    return;
  }

  {
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
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
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
 * Returns false if using go(n) with hash history causes a full page reload.
 */


function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
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

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

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
  window.location.replace(stripHash(window.location.href) + '#' + path);
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

  function locationsAreEqual$$1(a, b$$1) {
    return a.pathname === b$$1.pathname && a.search === b$$1.search && a.hash === b$$1.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

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
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
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
        var nextPaths = allPaths.slice(0, prevIndex + 1);
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

var RouterComponent = function RouterComponent(_ref) {
  var routes = _ref.routes;
  return h(Router, {
    history: createHashHistory()
  }, routes && routes.map(function (route$$1, i) {
    return h(dist, {
      path: route$$1.path,
      getComponent: function getComponent() {
        return route$$1.load().then(function (module) {
          return module["default"];
        });
      }
    });
  }));
};

var AppShell = function AppShell(_ref) {
  var drawerItems = _ref.drawerItems,
      appTitle = _ref.appTitle,
      routes = _ref.routes;

  var _useState = v(false),
      _useState2 = _slicedToArray(_useState, 2),
      toggle = _useState2[0],
      _setToggle = _useState2[1];

  return [h(DrawerPage, {
    open: toggle,
    setToggle: function setToggle() {
      return _setToggle(!toggle);
    },
    items: drawerItems
  }), h(TopAppBarNav, {
    toggle: toggle,
    setToggle: _setToggle,
    title: appTitle
  }), h(RouterComponent, {
    routes: routes
  })];
};

E(h("div", null, h(AppShell, {
  drawerItems: [{
    route: "/modules",
    title: "Modules"
  }, {
    route: "/projects",
    title: "Projects"
  }],
  appTitle: "Portfolio",
  routes: [{
    path: "/modules",
    load: function load() {
      return import('./chunk-24206f97.js');
    }
  }, {
    path: "/projects",
    load: function load() {
      return import('./chunk-24206f97.js');
    }
  }]
})), document.getElementById("root"));

export { process as a, global$1 as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtZGRkYWM4NzIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL2FkYXB0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvbW9kYWwvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGlzdC9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGlzdC9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saXN0L2FkYXB0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpc3QvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saXN0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9ub2RlX21vZHVsZXMvdGFiYmFibGUvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvbm9kZV9tb2R1bGVzL2ZvY3VzLXRyYXAvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci91dGlsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvTGlzdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9EcmF3ZXIvaW5kZXguanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9EcmF3ZXJQYWdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9hZGFwdGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9maXhlZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9zaG9ydC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9zdGFuZGFyZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9Ub3BBcHBCYXIvaW5kZXguanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9Ub3BBcHBCYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LXJvdXRlci9kaXN0L3ByZWFjdC1yb3V0ZXIuZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LWFzeW5jLXJvdXRlL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWdsb2JhbHMvc3JjL2dsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzLWVzNi9icm93c2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1wYXRobmFtZS9lc20vcmVzb2x2ZS1wYXRobmFtZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXdhcm5pbmcvZGlzdC90aW55LXdhcm5pbmcuZXNtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RpbnktaW52YXJpYW50L2Rpc3QvdGlueS1pbnZhcmlhbnQuZXNtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvZXNtL2hpc3RvcnkuanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9Sb3V0ZXJDb21wb25lbnQuanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9pbmRleC5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgRHJhd2VyXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgRHJhd2VyIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENEcmF3ZXJBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IEVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnQgdGFyZ2V0IGVsZW1lbnQgdG8gdmVyaWZ5IGNsYXNzIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBjbGFzcyBuYW1lXG4gICAqL1xuICBlbGVtZW50SGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSBmb2N1cyBvZiBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQuXG4gICAqL1xuICBzYXZlRm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyBmb2N1cyB0byBlbGVtZW50IHByZXZpb3VzbHkgc2F2ZWQgd2l0aCAnc2F2ZUZvY3VzJy5cbiAgICovXG4gIHJlc3RvcmVGb2N1cygpIHt9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGFjdGl2ZSAvIHNlbGVjdGVkIG5hdmlnYXRpb24gaXRlbS5cbiAgICovXG4gIGZvY3VzQWN0aXZlTmF2aWdhdGlvbkl0ZW0oKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBcIk1EQ0RyYXdlcjpjbG9zZWRcIiBkZW5vdGluZyB0aGUgZHJhd2VyIGhhcyBjbG9zZWQuXG4gICAqL1xuICBub3RpZnlDbG9zZSgpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIGV2ZW50IFwiTURDRHJhd2VyOm9wZW5lZFwiIGRlbm90aW5nIHRoZSBkcmF3ZXIgaGFzIG9wZW5lZC5cbiAgICovXG4gIG5vdGlmeU9wZW4oKSB7fVxuXG4gIC8qKlxuICAgKiBUcmFwcyBmb2N1cyBvbiByb290IGVsZW1lbnQgYW5kIGZvY3VzZXMgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGVsZW1lbnQuXG4gICAqL1xuICB0cmFwRm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBmb2N1cyB0cmFwIGZyb20gcm9vdCBlbGVtZW50IHdoaWNoIHdhcyBzZXQgYnkgYHRyYXBGb2N1c2BcbiAgICogYW5kIHJlc3RvcmVzIGZvY3VzIHRvIHdoZXJlIGl0IHdhcyBwcmlvciB0byBjYWxsaW5nIGB0cmFwRm9jdXNgLlxuICAgKi9cbiAgcmVsZWFzZUZvY3VzKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRHJhd2VyQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRyYXdlcicsXG4gIERJU01JU1NJQkxFOiAnbWRjLWRyYXdlci0tZGlzbWlzc2libGUnLFxuICBNT0RBTDogJ21kYy1kcmF3ZXItLW1vZGFsJyxcbiAgT1BFTjogJ21kYy1kcmF3ZXItLW9wZW4nLFxuICBBTklNQVRFOiAnbWRjLWRyYXdlci0tYW5pbWF0ZScsXG4gIE9QRU5JTkc6ICdtZGMtZHJhd2VyLS1vcGVuaW5nJyxcbiAgQ0xPU0lORzogJ21kYy1kcmF3ZXItLWNsb3NpbmcnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUFBfQ09OVEVOVF9TRUxFQ1RPUjogJy5tZGMtZHJhd2VyLWFwcC1jb250ZW50JyxcbiAgU0NSSU1fU0VMRUNUT1I6ICcubWRjLWRyYXdlci1zY3JpbScsXG4gIENMT1NFX0VWRU5UOiAnTURDRHJhd2VyOmNsb3NlZCcsXG4gIE9QRU5fRVZFTlQ6ICdNRENEcmF3ZXI6b3BlbmVkJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0RyYXdlckFkYXB0ZXIgZnJvbSAnLi4vYWRhcHRlcic7XG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRHJhd2VyQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDRHJhd2VyQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGVsZW1lbnRIYXNDbGFzczogKC8qIGVsZW1lbnQ6ICFFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeU9wZW46ICgpID0+IHt9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge30sXG4gICAgICBmb2N1c0FjdGl2ZU5hdmlnYXRpb25JdGVtOiAoKSA9PiB7fSxcbiAgICAgIHRyYXBGb2N1czogKCkgPT4ge30sXG4gICAgICByZWxlYXNlRm9jdXM6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIG9wZW4gdGhlIGRyYXdlci5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkgfHwgdGhpcy5pc09wZW5pbmcoKSB8fCB0aGlzLmlzQ2xvc2luZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLk9QRU4pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5BTklNQVRFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTsgLy8gRm9yY2UgcmVmbG93LlxuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcblxuICAgIHRoaXMuYWRhcHRlcl8uc2F2ZUZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xvc2UgdGhlIGRyYXdlci5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSB8fCB0aGlzLmlzT3BlbmluZygpIHx8IHRoaXMuaXNDbG9zaW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQ0xPU0lORyk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5zaW9uIHBvaW50IGZvciB3aGVuIGRyYXdlciBmaW5pc2hlcyBvcGVuIGFuaW1hdGlvbi5cbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgb3BlbmVkKCkge31cblxuICAvKipcbiAgICogRXh0ZW5zaW9uIHBvaW50IGZvciB3aGVuIGRyYXdlciBmaW5pc2hlcyBjbG9zZSBhbmltYXRpb24uXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIGNsb3NlZCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgaW4gb3BlbiBzdGF0ZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgYW5pbWF0aW5nIG9wZW4uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc09wZW5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZHJhd2VyIGlzIGFuaW1hdGluZyBjbG9zZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0Nsb3NpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DTE9TSU5HKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZXlkb3duIGhhbmRsZXIgdG8gY2xvc2UgZHJhd2VyIHdoZW4ga2V5IGlzIGVzY2FwZS5cbiAgICogQHBhcmFtIGV2dFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bihldnQpIHtcbiAgICBjb25zdCB7a2V5Q29kZSwga2V5fSA9IGV2dDtcblxuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcbiAgICBpZiAoaXNFc2NhcGUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgY29uc3Qge09QRU5JTkcsIENMT1NJTkcsIE9QRU4sIEFOSU1BVEUsIFJPT1R9ID0gY3NzQ2xhc3NlcztcblxuICAgIC8vIEluIEVkZ2UsIHRyYW5zaXRpb25lbmQgb24gcmlwcGxlIHBzZXVkby1lbGVtZW50cyB5aWVsZHMgYSB0YXJnZXQgd2l0aG91dCBjbGFzc0xpc3QsIHNvIGNoZWNrIGZvciBFbGVtZW50IGZpcnN0LlxuICAgIGNvbnN0IGlzRWxlbWVudCA9IGV2dC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50O1xuICAgIGlmICghaXNFbGVtZW50IHx8ICF0aGlzLmFkYXB0ZXJfLmVsZW1lbnRIYXNDbGFzcygvKiogQHR5cGUgeyFFbGVtZW50fSAqLyAoZXZ0LnRhcmdldCksIFJPT1QpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDbG9zaW5nKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoT1BFTik7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlc3RvcmVGb2N1cygpO1xuICAgICAgdGhpcy5jbG9zZWQoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0FjdGl2ZU5hdmlnYXRpb25JdGVtKCk7XG4gICAgICB0aGlzLm9wZW5lZCgpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlPcGVuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhBTklNQVRFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9QRU5JTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQ0xPU0lORyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENEcmF3ZXJBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbiBmcm9tICcuLi9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uPCFNRENEcmF3ZXJBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uIHtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGRyYXdlciBmaW5pc2hlcyBvcGVuIGFuaW1hdGlvbi5cbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBvcGVuZWQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy50cmFwRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBkcmF3ZXIgZmluaXNoZXMgY2xvc2UgYW5pbWF0aW9uLlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGNsb3NlZCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbGVhc2VGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgY2xpY2sgZXZlbnQgb24gc2NyaW0uXG4gICAqL1xuICBoYW5kbGVTY3JpbUNsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENNb2RhbERyYXdlckZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIExpc3QuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmcgZm9jdXMuXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENMaXN0QWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldExpc3RJdGVtQ291bnQoKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldEZvY3VzZWRFbGVtZW50SW5kZXgoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgYXR0cmlidXRlLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgYXR0cmlidXRlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgoaW5kZXgsIGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgbGlzdCBpdGVtIGF0IHRoZSBpbmRleCBzcGVjaWZpZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKi9cbiAgZm9jdXNJdGVtQXRJbmRleChpbmRleCkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGFiaW5kZXggdG8gdGhlIHZhbHVlIHNwZWNpZmllZCBmb3IgYWxsIGJ1dHRvbi9hIGVsZW1lbnQgY2hpbGRyZW4gb2ZcbiAgICogdGhlIGxpc3QgaXRlbSBhdCB0aGUgaW5kZXggc3BlY2lmaWVkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlzdEl0ZW1JbmRleFxuICAgKiBAcGFyYW0ge251bWJlcn0gdGFiSW5kZXhWYWx1ZVxuICAgKi9cbiAgc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuKGxpc3RJdGVtSW5kZXgsIHRhYkluZGV4VmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBnaXZlbiBlbGVtZW50IGhhcyBhbiBocmVmLCBmb2xsb3dzIHRoZSBsaW5rLlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVcbiAgICovXG4gIGZvbGxvd0hyZWYoZWxlKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaXN0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtbGlzdCcsXG4gIExJU1RfSVRFTV9DTEFTUzogJ21kYy1saXN0LWl0ZW0nLFxuICBMSVNUX0lURU1fU0VMRUNURURfQ0xBU1M6ICdtZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCcsXG4gIExJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1M6ICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX09SSUVOVEFUSU9OOiAnYXJpYS1vcmllbnRhdGlvbicsXG4gIEFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDogJ2hvcml6b250YWwnLFxuICBBUklBX1NFTEVDVEVEOiAnYXJpYS1zZWxlY3RlZCcsXG4gIEZPQ1VTQUJMRV9DSElMRF9FTEVNRU5UUzogYC4ke2Nzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTfSBidXR0b246bm90KDpkaXNhYmxlZCksIC4ke2Nzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTfSBhYCxcbiAgRU5BQkxFRF9JVEVNU19TRUxFQ1RPUjogJy5tZGMtbGlzdC1pdGVtOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDTGlzdEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBFTEVNRU5UU19LRVlfQUxMT1dFRF9JTiA9IFsnaW5wdXQnLCAnYnV0dG9uJywgJ3RleHRhcmVhJywgJ3NlbGVjdCddO1xuXG5jbGFzcyBNRENMaXN0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpc3RBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpc3RBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGlzdEFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRMaXN0SXRlbUNvdW50OiAoKSA9PiB7fSxcbiAgICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXg6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzc0ZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzc0ZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbjogKCkgPT4ge30sXG4gICAgICBmb2xsb3dIcmVmOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENMaXN0QWRhcHRlcj19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0xpc3RGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gICAgLyoqIHtib29sZWFufSAqL1xuICAgIHRoaXMud3JhcEZvY3VzXyA9IGZhbHNlO1xuICAgIC8qKiB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzVmVydGljYWxfID0gdHJ1ZTtcbiAgICAvKioge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc1NpbmdsZVNlbGVjdGlvbkxpc3RfID0gZmFsc2U7XG4gICAgLyoqIHtudW1iZXJ9ICovXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IC0xO1xuICAgIC8qKiB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVzZUFjdGl2YXRlZENsYXNzXyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHByaXZhdGUgd3JhcEZvY3VzXyB2YXJpYWJsZS5cbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgc2V0V3JhcEZvY3VzKHZhbHVlKSB7XG4gICAgdGhpcy53cmFwRm9jdXNfID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaXNWZXJ0aWNhbF8gcHJpdmF0ZSB2YXJpYWJsZS5cbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgc2V0VmVydGljYWxPcmllbnRhdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuaXNWZXJ0aWNhbF8gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpc1NpbmdsZVNlbGVjdGlvbkxpc3RfIHByaXZhdGUgdmFyaWFibGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIHNldFNpbmdsZVNlbGVjdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHVzZUFjdGl2YXRlZENsYXNzXyBwcml2YXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUFjdGl2YXRlZFxuICAgKi9cbiAgc2V0VXNlQWN0aXZhdGVkQ2xhc3ModXNlQWN0aXZhdGVkKSB7XG4gICAgdGhpcy51c2VBY3RpdmF0ZWRDbGFzc18gPSB1c2VBY3RpdmF0ZWQ7XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IGluZGV4ICovXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnVzZUFjdGl2YXRlZENsYXNzX1xuICAgICAgPyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MgOiBjc3NDbGFzc2VzLkxJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUztcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIHN0cmluZ3MuQVJJQV9TRUxFQ1RFRCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIGNsYXNzTmFtZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXhfLCAndGFiaW5kZXgnLCAtMSk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy5hZGFwdGVyXy5nZXRMaXN0SXRlbUNvdW50KCkgPiBpbmRleCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IGluZGV4O1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xywgc3RyaW5ncy5BUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgY2xhc3NOYW1lKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICd0YWJpbmRleCcsIDApO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyAhPT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCgwLCAndGFiaW5kZXgnLCAtMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIGluIGhhbmRsZXIgZm9yIHRoZSBsaXN0IGl0ZW1zLlxuICAgKiBAcGFyYW0gZXZ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaXN0SXRlbUluZGV4XG4gICAqL1xuICBoYW5kbGVGb2N1c0luKGV2dCwgbGlzdEl0ZW1JbmRleCkge1xuICAgIGlmIChsaXN0SXRlbUluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuKGxpc3RJdGVtSW5kZXgsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBvdXQgaGFuZGxlciBmb3IgdGhlIGxpc3QgaXRlbXMuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlzdEl0ZW1JbmRleFxuICAgKi9cbiAgaGFuZGxlRm9jdXNPdXQoZXZ0LCBsaXN0SXRlbUluZGV4KSB7XG4gICAgaWYgKGxpc3RJdGVtSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW4obGlzdEl0ZW1JbmRleCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBLZXkgaGFuZGxlciBmb3IgdGhlIGxpc3QuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdExpc3RJdGVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaXN0SXRlbUluZGV4XG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2dCwgaXNSb290TGlzdEl0ZW0sIGxpc3RJdGVtSW5kZXgpIHtcbiAgICBjb25zdCBhcnJvd0xlZnQgPSBldnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldnQua2V5Q29kZSA9PT0gMzc7XG4gICAgY29uc3QgYXJyb3dVcCA9IGV2dC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldnQua2V5Q29kZSA9PT0gMzg7XG4gICAgY29uc3QgYXJyb3dSaWdodCA9IGV2dC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldnQua2V5Q29kZSA9PT0gMzk7XG4gICAgY29uc3QgYXJyb3dEb3duID0gZXZ0LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZ0LmtleUNvZGUgPT09IDQwO1xuICAgIGNvbnN0IGlzSG9tZSA9IGV2dC5rZXkgPT09ICdIb21lJyB8fCBldnQua2V5Q29kZSA9PT0gMzY7XG4gICAgY29uc3QgaXNFbmQgPSBldnQua2V5ID09PSAnRW5kJyB8fCBldnQua2V5Q29kZSA9PT0gMzU7XG4gICAgY29uc3QgaXNFbnRlciA9IGV2dC5rZXkgPT09ICdFbnRlcicgfHwgZXZ0LmtleUNvZGUgPT09IDEzO1xuICAgIGNvbnN0IGlzU3BhY2UgPSBldnQua2V5ID09PSAnU3BhY2UnIHx8IGV2dC5rZXlDb2RlID09PSAzMjtcblxuICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzZWRFbGVtZW50SW5kZXgoKTtcbiAgICBpZiAoY3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgY3VycmVudEluZGV4ID0gbGlzdEl0ZW1JbmRleDtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgZG9lc24ndCBoYXZlIGEgbWRjLWxpc3QtaXRlbSBhbmNlc3RvciBmcm9tIHRoZVxuICAgICAgICAvLyBjdXJyZW50IGxpc3QgKG5vdCBmcm9tIGEgc3VibGlzdCksIHJldHVybiBlYXJseS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgodGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd0Rvd24pIHx8ICghdGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd1JpZ2h0KSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgdGhpcy5mb2N1c05leHRFbGVtZW50KGN1cnJlbnRJbmRleCk7XG4gICAgfSBlbHNlIGlmICgodGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd1VwKSB8fCAoIXRoaXMuaXNWZXJ0aWNhbF8gJiYgYXJyb3dMZWZ0KSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgdGhpcy5mb2N1c1ByZXZFbGVtZW50KGN1cnJlbnRJbmRleCk7XG4gICAgfSBlbHNlIGlmIChpc0hvbWUpIHtcbiAgICAgIHRoaXMucHJldmVudERlZmF1bHRFdmVudF8oZXZ0KTtcbiAgICAgIHRoaXMuZm9jdXNGaXJzdEVsZW1lbnQoKTtcbiAgICB9IGVsc2UgaWYgKGlzRW5kKSB7XG4gICAgICB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCk7XG4gICAgICB0aGlzLmZvY3VzTGFzdEVsZW1lbnQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyAmJiAoaXNFbnRlciB8fCBpc1NwYWNlKSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNwYWNlIGtleSB3YXMgcHJlc3NlZCBvbiB0aGUgbGlzdCBpdGVtIG9yIGEgY2hpbGQgZWxlbWVudC5cbiAgICAgIGlmIChpc1Jvb3RMaXN0SXRlbSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoY3VycmVudEluZGV4KTtcblxuICAgICAgICAvLyBFeHBsaWNpdGx5IGFjdGl2YXRlIGxpbmtzLCBzaW5jZSB3ZSdyZSBwcmV2ZW50aW5nIGRlZmF1bHQgb24gRW50ZXIsIGFuZCBTcGFjZSBkb2Vzbid0IGFjdGl2YXRlIHRoZW0uXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9sbG93SHJlZihjdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGljayBoYW5kbGVyIGZvciB0aGUgbGlzdC5cbiAgICovXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNlZEVsZW1lbnRJbmRleCgpO1xuXG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gLTEpIHJldHVybjtcblxuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleChjdXJyZW50SW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCBwcmV2ZW50RGVmYXVsdCBpcyBvbmx5IGNhbGxlZCBpZiB0aGUgY29udGFpbmluZyBlbGVtZW50IGRvZXNuJ3RcbiAgICogY29uc3VtZSB0aGUgZXZlbnQsIGFuZCBpdCB3aWxsIGNhdXNlIGFuIHVuaW50ZW5kZWQgc2Nyb2xsLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBgJHtldnQudGFyZ2V0LnRhZ05hbWV9YC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChFTEVNRU5UU19LRVlfQUxMT1dFRF9JTi5pbmRleE9mKHRhZ05hbWUpID09PSAtMSkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIG5leHQgZWxlbWVudCBvbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqL1xuICBmb2N1c05leHRFbGVtZW50KGluZGV4KSB7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxO1xuICAgIGlmIChuZXh0SW5kZXggPj0gY291bnQpIHtcbiAgICAgIGlmICh0aGlzLndyYXBGb2N1c18pIHtcbiAgICAgICAgbmV4dEluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBlYXJseSBiZWNhdXNlIGxhc3QgaXRlbSBpcyBhbHJlYWR5IGZvY3VzZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KG5leHRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBvbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqL1xuICBmb2N1c1ByZXZFbGVtZW50KGluZGV4KSB7XG4gICAgbGV0IHByZXZJbmRleCA9IGluZGV4IC0gMTtcbiAgICBpZiAocHJldkluZGV4IDwgMCkge1xuICAgICAgaWYgKHRoaXMud3JhcEZvY3VzXykge1xuICAgICAgICBwcmV2SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZWFybHkgYmVjYXVzZSBmaXJzdCBpdGVtIGlzIGFscmVhZHkgZm9jdXNlZC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgocHJldkluZGV4KTtcbiAgfVxuXG4gIGZvY3VzRmlyc3RFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKSA+IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICB9XG4gIH1cblxuICBmb2N1c0xhc3RFbGVtZW50KCkge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGlzdEl0ZW1Db3VudCgpIC0gMTtcbiAgICBpZiAobGFzdEluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChsYXN0SW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaXN0Rm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDTGlzdEZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaXN0QWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENMaXN0Rm91bmRhdGlvbj5cbiAqL1xuY2xhc3MgTURDTGlzdCBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuaGFuZGxlS2V5ZG93bl87XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVDbGlja187XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5mb2N1c0luRXZlbnRMaXN0ZW5lcl87XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0xpc3R9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDTGlzdChyb290KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duXyk7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmZvY3VzSW5FdmVudExpc3RlbmVyXyk7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuZm9jdXNPdXRFdmVudExpc3RlbmVyXyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy5oYW5kbGVDbGlja18gPSB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUNsaWNrLmJpbmQodGhpcy5mb3VuZGF0aW9uXyk7XG4gICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IHRoaXMuaGFuZGxlS2V5ZG93bkV2ZW50Xy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZm9jdXNJbkV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c0luRXZlbnRfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c091dEV2ZW50Xy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuZm9jdXNJbkV2ZW50TGlzdGVuZXJfKTtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfKTtcbiAgICB0aGlzLmxheW91dCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxpc3RUeXBlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5yb290Xy5nZXRBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX09SSUVOVEFUSU9OKTtcbiAgICB0aGlzLnZlcnRpY2FsID0gZGlyZWN0aW9uICE9PSBzdHJpbmdzLkFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDtcblxuICAgIC8vIExpc3QgaXRlbXMgbmVlZCB0byBoYXZlIGF0IGxlYXN0IHRhYmluZGV4PS0xIHRvIGJlIGZvY3VzYWJsZS5cbiAgICBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1saXN0LWl0ZW06bm90KFt0YWJpbmRleF0pJykpXG4gICAgICAuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgfSk7XG5cbiAgICAvLyBDaGlsZCBidXR0b24vYSBlbGVtZW50cyBhcmUgbm90IHRhYmJhYmxlIHVudGlsIHRoZSBsaXN0IGl0ZW0gaXMgZm9jdXNlZC5cbiAgICBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkZPQ1VTQUJMRV9DSElMRF9FTEVNRU5UUykpXG4gICAgICAuZm9yRWFjaCgoZWxlKSA9PiBlbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGxpc3QgaXRlbSB0aGlzIGV2ZW50IGlzIHRhcmdldHRpbmcuIE9yIHJldHVybnMgLTEgaWZcbiAgICogdGhlcmUgaXMgbm8gbGlzdCBpdGVtXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TGlzdEl0ZW1JbmRleF8oZXZ0KSB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKGV2dC50YXJnZXQpO1xuICAgIGxldCBpbmRleCA9IC0xO1xuXG4gICAgLy8gRmluZCB0aGUgZmlyc3QgYW5jZXN0b3IgdGhhdCBpcyBhIGxpc3QgaXRlbSBvciB0aGUgbGlzdC5cbiAgICB3aGlsZSAoIWV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkxJU1RfSVRFTV9DTEFTUylcbiAgICAmJiAhZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuUk9PVCkpIHtcbiAgICAgIGV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGlmIGl0IGlzIGEgbGlzdCBpdGVtLlxuICAgIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MpKSB7XG4gICAgICBpbmRleCA9IHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YoZXZlbnRUYXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZpZ3VyZSBvdXQgd2hpY2ggZWxlbWVudCB3YXMgY2xpY2tlZCBiZWZvcmUgc2VuZGluZyB0aGUgZXZlbnQgdG8gdGhlIGZvdW5kYXRpb24uXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlRm9jdXNJbkV2ZW50XyhldnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGlzdEl0ZW1JbmRleF8oZXZ0KTtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUZvY3VzSW4oZXZ0LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUZvY3VzT3V0RXZlbnRfKGV2dCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMaXN0SXRlbUluZGV4XyhldnQpO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlRm9jdXNPdXQoZXZ0LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWRvd25FdmVudF8oZXZ0KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExpc3RJdGVtSW5kZXhfKGV2dCk7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVLZXlkb3duKGV2dCwgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MpLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUxpc3RUeXBlKCkge1xuICAgIC8vIEF1dG9tYXRpY2FsbHkgc2V0IHNpbmdsZSBzZWxlY3Rpb24gaWYgc2VsZWN0ZWQvYWN0aXZhdGVkIGNsYXNzZXMgYXJlIHByZXNlbnQuXG4gICAgY29uc3QgcHJlc2VsZWN0ZWRFbGVtZW50ID1cbiAgICAgIHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihgLiR7Y3NzQ2xhc3Nlcy5MSVNUX0lURU1fQUNUSVZBVEVEX0NMQVNTfSwgLiR7Y3NzQ2xhc3Nlcy5MSVNUX0lURU1fU0VMRUNURURfQ0xBU1N9YCk7XG5cbiAgICBpZiAocHJlc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICBpZiAocHJlc2VsZWN0ZWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MpKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VXNlQWN0aXZhdGVkQ2xhc3ModHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2luZ2xlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YocHJlc2VsZWN0ZWRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzZXQgdmVydGljYWwodmFsdWUpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFZlcnRpY2FsT3JpZW50YXRpb24odmFsdWUpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gQXJyYXk8IUVsZW1lbnQ+Ki9cbiAgZ2V0IGxpc3RFbGVtZW50cygpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbCh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyaW5ncy5FTkFCTEVEX0lURU1TX1NFTEVDVE9SKSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzZXQgd3JhcEZvY3VzKHZhbHVlKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRXcmFwRm9jdXModmFsdWUpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTaW5nbGVTZWxlY3Rpb25MaXN0ICovXG4gIHNldCBzaW5nbGVTZWxlY3Rpb24oaXNTaW5nbGVTZWxlY3Rpb25MaXN0KSB7XG4gICAgaWYgKGlzU2luZ2xlU2VsZWN0aW9uTGlzdCkge1xuICAgICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB9XG5cbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFNpbmdsZVNlbGVjdGlvbihpc1NpbmdsZVNlbGVjdGlvbkxpc3QpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0U2VsZWN0ZWRJbmRleChpbmRleCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ0xpc3RGb3VuZGF0aW9ufSAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ0xpc3RGb3VuZGF0aW9uKC8qKiBAdHlwZSB7IU1EQ0xpc3RBZGFwdGVyfSAqLyAoT2JqZWN0LmFzc2lnbih7XG4gICAgICBnZXRMaXN0SXRlbUNvdW50OiAoKSA9PiB0aGlzLmxpc3RFbGVtZW50cy5sZW5ndGgsXG4gICAgICBnZXRGb2N1c2VkRWxlbWVudEluZGV4OiAoKSA9PiB0aGlzLmxpc3RFbGVtZW50cy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGF0dHIpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3NGb3JFbGVtZW50SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW46IChsaXN0SXRlbUluZGV4LCB0YWJJbmRleFZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tsaXN0SXRlbUluZGV4XTtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW1DaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuRk9DVVNBQkxFX0NISUxEX0VMRU1FTlRTKSk7XG4gICAgICAgIGxpc3RJdGVtQ2hpbGRyZW4uZm9yRWFjaCgoZWxlKSA9PiBlbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHRhYkluZGV4VmFsdWUpKTtcbiAgICAgIH0sXG4gICAgICBmb2xsb3dIcmVmOiAoaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChsaXN0SXRlbSAmJiBsaXN0SXRlbS5ocmVmKSB7XG4gICAgICAgICAgbGlzdEl0ZW0uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSkpO1xuICB9XG59XG5cbmV4cG9ydCB7TURDTGlzdCwgTURDTGlzdEZvdW5kYXRpb259O1xuIiwidmFyIGNhbmRpZGF0ZVNlbGVjdG9ycyA9IFtcbiAgJ2lucHV0JyxcbiAgJ3NlbGVjdCcsXG4gICd0ZXh0YXJlYScsXG4gICdhW2hyZWZdJyxcbiAgJ2J1dHRvbicsXG4gICdbdGFiaW5kZXhdJyxcbiAgJ2F1ZGlvW2NvbnRyb2xzXScsXG4gICd2aWRlb1tjb250cm9sc10nLFxuICAnW2NvbnRlbnRlZGl0YWJsZV06bm90KFtjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiXSknLFxuXTtcbnZhciBjYW5kaWRhdGVTZWxlY3RvciA9IGNhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJyk7XG5cbnZhciBtYXRjaGVzID0gdHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnXG4gID8gZnVuY3Rpb24gKCkge31cbiAgOiBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gdGFiYmFibGUoZWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGVsZW1lbnREb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gIHZhciByZWd1bGFyVGFiYmFibGVzID0gW107XG4gIHZhciBvcmRlcmVkVGFiYmFibGVzID0gW107XG5cbiAgdmFyIHVudG91Y2hhYmlsaXR5Q2hlY2tlciA9IG5ldyBVbnRvdWNoYWJpbGl0eUNoZWNrZXIoZWxlbWVudERvY3VtZW50KTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9yKTtcblxuICBpZiAob3B0aW9ucy5pbmNsdWRlQ29udGFpbmVyKSB7XG4gICAgaWYgKG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpKSB7XG4gICAgICBjYW5kaWRhdGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGNhbmRpZGF0ZXMpO1xuICAgICAgY2FuZGlkYXRlcy51bnNoaWZ0KGVsKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaSwgY2FuZGlkYXRlLCBjYW5kaWRhdGVUYWJpbmRleDtcbiAgZm9yIChpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xuXG4gICAgaWYgKCFpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUoY2FuZGlkYXRlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpKSBjb250aW51ZTtcblxuICAgIGNhbmRpZGF0ZVRhYmluZGV4ID0gZ2V0VGFiaW5kZXgoY2FuZGlkYXRlKTtcbiAgICBpZiAoY2FuZGlkYXRlVGFiaW5kZXggPT09IDApIHtcbiAgICAgIHJlZ3VsYXJUYWJiYWJsZXMucHVzaChjYW5kaWRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmRlcmVkVGFiYmFibGVzLnB1c2goe1xuICAgICAgICBkb2N1bWVudE9yZGVyOiBpLFxuICAgICAgICB0YWJJbmRleDogY2FuZGlkYXRlVGFiaW5kZXgsXG4gICAgICAgIG5vZGU6IGNhbmRpZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0YWJiYWJsZU5vZGVzID0gb3JkZXJlZFRhYmJhYmxlc1xuICAgIC5zb3J0KHNvcnRPcmRlcmVkVGFiYmFibGVzKVxuICAgIC5tYXAoZnVuY3Rpb24oYSkgeyByZXR1cm4gYS5ub2RlIH0pXG4gICAgLmNvbmNhdChyZWd1bGFyVGFiYmFibGVzKTtcblxuICByZXR1cm4gdGFiYmFibGVOb2Rlcztcbn1cblxudGFiYmFibGUuaXNUYWJiYWJsZSA9IGlzVGFiYmFibGU7XG50YWJiYWJsZS5pc0ZvY3VzYWJsZSA9IGlzRm9jdXNhYmxlO1xuXG5mdW5jdGlvbiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKSB7XG4gIGlmIChcbiAgICAhaXNOb2RlTWF0Y2hpbmdTZWxlY3RvckZvY3VzYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpXG4gICAgfHwgaXNOb25UYWJiYWJsZVJhZGlvKG5vZGUpXG4gICAgfHwgZ2V0VGFiaW5kZXgobm9kZSkgPCAwXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNUYWJiYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpIHtcbiAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoJ05vIG5vZGUgcHJvdmlkZWQnKTtcbiAgaWYgKG1hdGNoZXMuY2FsbChub2RlLCBjYW5kaWRhdGVTZWxlY3RvcikgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlTWF0Y2hpbmdTZWxlY3RvckZvY3VzYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpIHtcbiAgdW50b3VjaGFiaWxpdHlDaGVja2VyID0gdW50b3VjaGFiaWxpdHlDaGVja2VyIHx8IG5ldyBVbnRvdWNoYWJpbGl0eUNoZWNrZXIobm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUpO1xuICBpZiAoXG4gICAgbm9kZS5kaXNhYmxlZFxuICAgIHx8IGlzSGlkZGVuSW5wdXQobm9kZSlcbiAgICB8fCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIuaXNVbnRvdWNoYWJsZShub2RlKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBmb2N1c2FibGVDYW5kaWRhdGVTZWxlY3RvciA9IGNhbmRpZGF0ZVNlbGVjdG9ycy5jb25jYXQoJ2lmcmFtZScpLmpvaW4oJywnKTtcbmZ1bmN0aW9uIGlzRm9jdXNhYmxlKG5vZGUsIHVudG91Y2hhYmlsaXR5Q2hlY2tlcikge1xuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignTm8gbm9kZSBwcm92aWRlZCcpO1xuICBpZiAobWF0Y2hlcy5jYWxsKG5vZGUsIGZvY3VzYWJsZUNhbmRpZGF0ZVNlbGVjdG9yKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFiaW5kZXgobm9kZSkge1xuICB2YXIgdGFiaW5kZXhBdHRyID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKTtcbiAgaWYgKCFpc05hTih0YWJpbmRleEF0dHIpKSByZXR1cm4gdGFiaW5kZXhBdHRyO1xuICAvLyBCcm93c2VycyBkbyBub3QgcmV0dXJuIGB0YWJJbmRleGAgY29ycmVjdGx5IGZvciBjb250ZW50RWRpdGFibGUgbm9kZXM7XG4gIC8vIHNvIGlmIHRoZXkgZG9uJ3QgaGF2ZSBhIHRhYmluZGV4IGF0dHJpYnV0ZSBzcGVjaWZpY2FsbHkgc2V0LCBhc3N1bWUgaXQncyAwLlxuICBpZiAoaXNDb250ZW50RWRpdGFibGUobm9kZSkpIHJldHVybiAwO1xuICByZXR1cm4gbm9kZS50YWJJbmRleDtcbn1cblxuZnVuY3Rpb24gc29ydE9yZGVyZWRUYWJiYWJsZXMoYSwgYikge1xuICByZXR1cm4gYS50YWJJbmRleCA9PT0gYi50YWJJbmRleCA/IGEuZG9jdW1lbnRPcmRlciAtIGIuZG9jdW1lbnRPcmRlciA6IGEudGFiSW5kZXggLSBiLnRhYkluZGV4O1xufVxuXG4vLyBBcnJheS5wcm90b3R5cGUuZmluZCBub3QgYXZhaWxhYmxlIGluIElFLlxuZnVuY3Rpb24gZmluZChsaXN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocHJlZGljYXRlKGxpc3RbaV0pKSByZXR1cm4gbGlzdFtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0NvbnRlbnRFZGl0YWJsZShub2RlKSB7XG4gIHJldHVybiBub2RlLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnO1xufVxuXG5mdW5jdGlvbiBpc0lucHV0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ0lOUFVUJztcbn1cblxuZnVuY3Rpb24gaXNIaWRkZW5JbnB1dChub2RlKSB7XG4gIHJldHVybiBpc0lucHV0KG5vZGUpICYmIG5vZGUudHlwZSA9PT0gJ2hpZGRlbic7XG59XG5cbmZ1bmN0aW9uIGlzUmFkaW8obm9kZSkge1xuICByZXR1cm4gaXNJbnB1dChub2RlKSAmJiBub2RlLnR5cGUgPT09ICdyYWRpbyc7XG59XG5cbmZ1bmN0aW9uIGlzTm9uVGFiYmFibGVSYWRpbyhub2RlKSB7XG4gIHJldHVybiBpc1JhZGlvKG5vZGUpICYmICFpc1RhYmJhYmxlUmFkaW8obm9kZSk7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZWRSYWRpbyhub2Rlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGVzW2ldLmNoZWNrZWQpIHtcbiAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNUYWJiYWJsZVJhZGlvKG5vZGUpIHtcbiAgaWYgKCFub2RlLm5hbWUpIHJldHVybiB0cnVlO1xuICAvLyBUaGlzIHdvbid0IGFjY291bnQgZm9yIHRoZSBlZGdlIGNhc2Ugd2hlcmUgeW91IGhhdmUgcmFkaW8gZ3JvdXBzIHdpdGggdGhlIHNhbWVcbiAgLy8gaW4gc2VwYXJhdGUgZm9ybXMgb24gdGhlIHNhbWUgcGFnZS5cbiAgdmFyIHJhZGlvU2V0ID0gbm9kZS5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtuYW1lPVwiJyArIG5vZGUubmFtZSArICdcIl0nKTtcbiAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkUmFkaW8ocmFkaW9TZXQpO1xuICByZXR1cm4gIWNoZWNrZWQgfHwgY2hlY2tlZCA9PT0gbm9kZTtcbn1cblxuLy8gQW4gZWxlbWVudCBpcyBcInVudG91Y2hhYmxlXCIgaWYgKml0IG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzKiBoYXNcbi8vIGB2aXNpYmlsaXR5OiBoaWRkZW5gIG9yIGBkaXNwbGF5OiBub25lYC5cbmZ1bmN0aW9uIFVudG91Y2hhYmlsaXR5Q2hlY2tlcihlbGVtZW50RG9jdW1lbnQpIHtcbiAgdGhpcy5kb2MgPSBlbGVtZW50RG9jdW1lbnQ7XG4gIC8vIE5vZGUgY2FjaGUgbXVzdCBiZSByZWZyZXNoZWQgb24gZXZlcnkgY2hlY2ssIGluIGNhc2VcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaGFzIGNoYW5nZWQuIFRoZSBjYWNoZSBjb250YWlucyB0dXBsZXNcbiAgLy8gbWFwcGluZyBub2RlcyB0byB0aGVpciBib29sZWFuIHJlc3VsdC5cbiAgdGhpcy5jYWNoZSA9IFtdO1xufVxuXG4vLyBnZXRDb21wdXRlZFN0eWxlIGFjY3VyYXRlbHkgcmVmbGVjdHMgYHZpc2liaWxpdHk6IGhpZGRlbmAgb2YgYW5jZXN0b3JzXG4vLyBidXQgbm90IGBkaXNwbGF5OiBub25lYCwgc28gd2UgbmVlZCB0byByZWN1cnNpdmVseSBjaGVjayBwYXJlbnRzLlxuVW50b3VjaGFiaWxpdHlDaGVja2VyLnByb3RvdHlwZS5oYXNEaXNwbGF5Tm9uZSA9IGZ1bmN0aW9uIGhhc0Rpc3BsYXlOb25lKG5vZGUsIG5vZGVDb21wdXRlZFN0eWxlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciBhIGNhY2hlZCByZXN1bHQuXG4gICAgdmFyIGNhY2hlZCA9IGZpbmQodGhpcy5jYWNoZSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gPT09IG5vZGU7XG4gICAgfSk7XG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZFsxXTtcblxuICAgIG5vZGVDb21wdXRlZFN0eWxlID0gbm9kZUNvbXB1dGVkU3R5bGUgfHwgdGhpcy5kb2MuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaGFzRGlzcGxheU5vbmUobm9kZS5wYXJlbnROb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhY2hlLnB1c2goW25vZGUsIHJlc3VsdF0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVW50b3VjaGFiaWxpdHlDaGVja2VyLnByb3RvdHlwZS5pc1VudG91Y2hhYmxlID0gZnVuY3Rpb24gaXNVbnRvdWNoYWJsZShub2RlKSB7XG4gIGlmIChub2RlID09PSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSB0aGlzLmRvYy5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBpZiAodGhpcy5oYXNEaXNwbGF5Tm9uZShub2RlLCBjb21wdXRlZFN0eWxlKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYmJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsInZhciB0YWJiYWJsZSA9IHJlcXVpcmUoJ3RhYmJhYmxlJyk7XG52YXIgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpO1xuXG52YXIgbGlzdGVuaW5nRm9jdXNUcmFwID0gbnVsbDtcblxuZnVuY3Rpb24gZm9jdXNUcmFwKGVsZW1lbnQsIHVzZXJPcHRpb25zKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIGNvbnRhaW5lciA9XG4gICAgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gZG9jLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gIHZhciBjb25maWcgPSB4dGVuZChcbiAgICB7XG4gICAgICByZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTogdHJ1ZSxcbiAgICAgIGVzY2FwZURlYWN0aXZhdGVzOiB0cnVlXG4gICAgfSxcbiAgICB1c2VyT3B0aW9uc1xuICApO1xuXG4gIHZhciBzdGF0ZSA9IHtcbiAgICBmaXJzdFRhYmJhYmxlTm9kZTogbnVsbCxcbiAgICBsYXN0VGFiYmFibGVOb2RlOiBudWxsLFxuICAgIG5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbjogbnVsbCxcbiAgICBtb3N0UmVjZW50bHlGb2N1c2VkTm9kZTogbnVsbCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBhdXNlZDogZmFsc2VcbiAgfTtcblxuICB2YXIgdHJhcCA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGUsXG4gICAgZGVhY3RpdmF0ZTogZGVhY3RpdmF0ZSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgdW5wYXVzZTogdW5wYXVzZVxuICB9O1xuXG4gIHJldHVybiB0cmFwO1xuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKGFjdGl2YXRlT3B0aW9ucykge1xuICAgIGlmIChzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcblxuICAgIHN0YXRlLmFjdGl2ZSA9IHRydWU7XG4gICAgc3RhdGUucGF1c2VkID0gZmFsc2U7XG4gICAgc3RhdGUubm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICB2YXIgb25BY3RpdmF0ZSA9XG4gICAgICBhY3RpdmF0ZU9wdGlvbnMgJiYgYWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGVcbiAgICAgICAgPyBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkFjdGl2YXRlO1xuICAgIGlmIChvbkFjdGl2YXRlKSB7XG4gICAgICBvbkFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBkZWFjdGl2YXRlKGRlYWN0aXZhdGVPcHRpb25zKSB7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHN0YXRlLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgdmFyIG9uRGVhY3RpdmF0ZSA9XG4gICAgICBkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGRlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkRlYWN0aXZhdGU7XG4gICAgaWYgKG9uRGVhY3RpdmF0ZSkge1xuICAgICAgb25EZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIHJldHVybkZvY3VzID1cbiAgICAgIGRlYWN0aXZhdGVPcHRpb25zICYmIGRlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1c1xuICAgICAgICA6IGNvbmZpZy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTtcbiAgICBpZiAocmV0dXJuRm9jdXMpIHtcbiAgICAgIGRlbGF5KGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnlGb2N1cyhzdGF0ZS5ub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAoc3RhdGUucGF1c2VkIHx8ICFzdGF0ZS5hY3RpdmUpIHJldHVybjtcbiAgICBzdGF0ZS5wYXVzZWQgPSB0cnVlO1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5wYXVzZSgpIHtcbiAgICBpZiAoIXN0YXRlLnBhdXNlZCB8fCAhc3RhdGUuYWN0aXZlKSByZXR1cm47XG4gICAgc3RhdGUucGF1c2VkID0gZmFsc2U7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBsaXN0ZW5pbmcgZm9jdXMgdHJhcCBhdCBhIHRpbWVcbiAgICBpZiAobGlzdGVuaW5nRm9jdXNUcmFwKSB7XG4gICAgICBsaXN0ZW5pbmdGb2N1c1RyYXAucGF1c2UoKTtcbiAgICB9XG4gICAgbGlzdGVuaW5nRm9jdXNUcmFwID0gdHJhcDtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcblxuICAgIC8vIERlbGF5IGVuc3VyZXMgdGhhdCB0aGUgZm9jdXNlZCBlbGVtZW50IGRvZXNuJ3QgY2FwdHVyZSB0aGUgZXZlbnRcbiAgICAvLyB0aGF0IGNhdXNlZCB0aGUgZm9jdXMgdHJhcCBhY3RpdmF0aW9uLlxuICAgIGRlbGF5KGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICB9KTtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIGNoZWNrRm9jdXNJbiwgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBsaXN0ZW5pbmdGb2N1c1RyYXAgIT09IHRyYXApIHJldHVybjtcblxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgY2hlY2tGb2N1c0luLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNoZWNrS2V5LCB0cnVlKTtcblxuICAgIGxpc3RlbmluZ0ZvY3VzVHJhcCA9IG51bGw7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5vZGVGb3JPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgIHZhciBvcHRpb25WYWx1ZSA9IGNvbmZpZ1tvcHRpb25OYW1lXTtcbiAgICB2YXIgbm9kZSA9IG9wdGlvblZhbHVlO1xuICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgbm9kZSA9IGRvYy5xdWVyeVNlbGVjdG9yKG9wdGlvblZhbHVlKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2AnICsgb3B0aW9uTmFtZSArICdgIHJlZmVycyB0byBubyBrbm93biBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUgPSBvcHRpb25WYWx1ZSgpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgZGlkIG5vdCByZXR1cm4gYSBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbEZvY3VzTm9kZSgpIHtcbiAgICB2YXIgbm9kZTtcbiAgICBpZiAoZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJykgIT09IG51bGwpIHtcbiAgICAgIG5vZGUgPSBnZXROb2RlRm9yT3B0aW9uKCdpbml0aWFsRm9jdXMnKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5jb250YWlucyhkb2MuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIG5vZGUgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlIHx8IGdldE5vZGVGb3JPcHRpb24oJ2ZhbGxiYWNrRm9jdXMnKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJZb3UgY2FuJ3QgaGF2ZSBhIGZvY3VzLXRyYXAgd2l0aG91dCBhdCBsZWFzdCBvbmUgZm9jdXNhYmxlIGVsZW1lbnRcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSBvbiBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnQgaW5zdGVhZCBvZiBjbGlja1xuICAvLyBzbyB0aGF0IGl0IHByZWNlZGVzIHRoZSBmb2N1cyBldmVudC5cbiAgZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSB7XG4gICAgICBkZWFjdGl2YXRlKHtcbiAgICAgICAgcmV0dXJuRm9jdXM6ICF0YWJiYWJsZS5pc0ZvY3VzYWJsZShlLnRhcmdldClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gSW4gY2FzZSBmb2N1cyBlc2NhcGVzIHRoZSB0cmFwIGZvciBzb21lIHN0cmFuZ2UgcmVhc29uLCBwdWxsIGl0IGJhY2sgaW4uXG4gIGZ1bmN0aW9uIGNoZWNrRm9jdXNJbihlKSB7XG4gICAgLy8gSW4gRmlyZWZveCB3aGVuIHlvdSBUYWIgb3V0IG9mIGFuIGlmcmFtZSB0aGUgRG9jdW1lbnQgaXMgYnJpZWZseSBmb2N1c2VkLlxuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpIHx8IGUudGFyZ2V0IGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB0cnlGb2N1cyhzdGF0ZS5tb3N0UmVjZW50bHlGb2N1c2VkTm9kZSB8fCBnZXRJbml0aWFsRm9jdXNOb2RlKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgIGlmIChjb25maWcuZXNjYXBlRGVhY3RpdmF0ZXMgIT09IGZhbHNlICYmIGlzRXNjYXBlRXZlbnQoZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRlYWN0aXZhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzVGFiRXZlbnQoZSkpIHtcbiAgICAgIGNoZWNrVGFiKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhpamFjayBUYWIgZXZlbnRzIG9uIHRoZSBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgbm9kZXMgb2YgdGhlIHRyYXAsXG4gIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgZm9jdXMgZnJvbSBlc2NhcGluZy4gSWYgaXQgZXNjYXBlcyBmb3IgZXZlbiBhXG4gIC8vIG1vbWVudCBpdCBjYW4gZW5kIHVwIHNjcm9sbGluZyB0aGUgcGFnZSBhbmQgY2F1c2luZyBjb25mdXNpb24gc28gd2VcbiAgLy8ga2luZCBvZiBuZWVkIHRvIGNhcHR1cmUgdGhlIGFjdGlvbiBhdCB0aGUga2V5ZG93biBwaGFzZS5cbiAgZnVuY3Rpb24gY2hlY2tUYWIoZSkge1xuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICBpZiAoZS5zaGlmdEtleSAmJiBlLnRhcmdldCA9PT0gc3RhdGUuZmlyc3RUYWJiYWJsZU5vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRyeUZvY3VzKHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRyeUZvY3VzKHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKSB7XG4gICAgdmFyIHRhYmJhYmxlTm9kZXMgPSB0YWJiYWJsZShjb250YWluZXIpO1xuICAgIHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlID0gdGFiYmFibGVOb2Rlc1swXSB8fCBnZXRJbml0aWFsRm9jdXNOb2RlKCk7XG4gICAgc3RhdGUubGFzdFRhYmJhYmxlTm9kZSA9XG4gICAgICB0YWJiYWJsZU5vZGVzW3RhYmJhYmxlTm9kZXMubGVuZ3RoIC0gMV0gfHwgZ2V0SW5pdGlhbEZvY3VzTm9kZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5Rm9jdXMobm9kZSkge1xuICAgIGlmIChub2RlID09PSBkb2MuYWN0aXZlRWxlbWVudCkgcmV0dXJuO1xuICAgIGlmICghbm9kZSB8fCAhbm9kZS5mb2N1cykge1xuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmZvY3VzKCk7XG4gICAgc3RhdGUubW9zdFJlY2VudGx5Rm9jdXNlZE5vZGUgPSBub2RlO1xuICAgIGlmIChpc1NlbGVjdGFibGVJbnB1dChub2RlKSkge1xuICAgICAgbm9kZS5zZWxlY3QoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUudGFnTmFtZSAmJlxuICAgIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnICYmXG4gICAgdHlwZW9mIG5vZGUuc2VsZWN0ID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzRXNjYXBlRXZlbnQoZSkge1xuICByZXR1cm4gZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5ID09PSAnRXNjJyB8fCBlLmtleUNvZGUgPT09IDI3O1xufVxuXG5mdW5jdGlvbiBpc1RhYkV2ZW50KGUpIHtcbiAgcmV0dXJuIGUua2V5ID09PSAnVGFiJyB8fCBlLmtleUNvZGUgPT09IDk7XG59XG5cbmZ1bmN0aW9uIGRlbGF5KGZuKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KGZuLCAwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb2N1c1RyYXA7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwJztcblxuLyoqXG4gKiBAcGFyYW0geyFFbGVtZW50fSBzdXJmYWNlRWxcbiAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBmb2N1c1RyYXBGYWN0b3J5XG4gKiBAcmV0dXJuIHshRm9jdXNUcmFwSW5zdGFuY2V9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKHN1cmZhY2VFbCwgZm9jdXNUcmFwRmFjdG9yeSA9IGNyZWF0ZUZvY3VzVHJhcCkge1xuICByZXR1cm4gZm9jdXNUcmFwRmFjdG9yeShzdXJmYWNlRWwsIHtcbiAgICBjbGlja091dHNpZGVEZWFjdGl2YXRlczogdHJ1ZSxcbiAgICBpbml0aWFsRm9jdXM6IGZhbHNlLCAvLyBOYXZpZ2F0aW9uIGRyYXdlciBoYW5kbGVzIGZvY3VzaW5nIG9uIGFjdGl2ZSBuYXYgaXRlbS5cbiAgICBlc2NhcGVEZWFjdGl2YXRlczogZmFsc2UsIC8vIE5hdmlnYXRpb24gZHJhd2VyIGhhbmRsZXMgRVNDLlxuICAgIHJldHVybkZvY3VzT25EZWFjdGl2YXRlOiBmYWxzZSwgLy8gTmF2aWdhdGlvbiBkcmF3ZXIgaGFuZGxlcyByZXN0b3JlIGZvY3VzLlxuICB9KTtcbn1cblxuZXhwb3J0IHtjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7TURDQ29tcG9uZW50fSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uIGZyb20gJy4vZGlzbWlzc2libGUvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIGZyb20gJy4vbW9kYWwvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRHJhd2VyQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtNRENMaXN0fSBmcm9tICdAbWF0ZXJpYWwvbGlzdC9pbmRleCc7XG5pbXBvcnQgTURDTGlzdEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2xpc3QvZm91bmRhdGlvbic7XG5pbXBvcnQge3N0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBjcmVhdGVGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcCc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0NvbXBvbmVudDwhTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENEcmF3ZXIgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNGb2N1c187XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmhhbmRsZUtleWRvd25fO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kXztcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuZm9jdXNUcmFwRmFjdG9yeV87XG5cbiAgICAvKiogQHByaXZhdGUgeyFGb2N1c1RyYXBJbnN0YW5jZX0gKi9cbiAgICB0aGlzLmZvY3VzVHJhcF87XG5cbiAgICAvKiogQHByaXZhdGUgez9FbGVtZW50fSAqL1xuICAgIHRoaXMuc2NyaW1fO1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVTY3JpbUNsaWNrXztcblxuICAgIC8qKiBAcHJpdmF0ZSB7P01EQ0xpc3R9ICovXG4gICAgdGhpcy5saXN0XztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENEcmF3ZXJ9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDRHJhd2VyKHJvb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgaW4gdGhlIG9wZW4gcG9zaXRpb24uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5pc09wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkcmF3ZXIgb3BlbiBhbmQgY2xvc2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3BlblxuICAgKi9cbiAgc2V0IG9wZW4oaXNPcGVuKSB7XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbl8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplKFxuICAgIGZvY3VzVHJhcEZhY3RvcnkgPSBjcmVhdGVGb2N1c1RyYXAsXG4gICAgbGlzdEZhY3RvcnkgPSAoZWwpID0+IG5ldyBNRENMaXN0KGVsKSkge1xuICAgIGNvbnN0IGxpc3RFbCA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovICh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoYC4ke01EQ0xpc3RGb3VuZGF0aW9uLmNzc0NsYXNzZXMuUk9PVH1gKSk7XG4gICAgaWYgKGxpc3RFbCkge1xuICAgICAgdGhpcy5saXN0XyA9IGxpc3RGYWN0b3J5KGxpc3RFbCk7XG4gICAgICB0aGlzLmxpc3RfLndyYXBGb2N1cyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNUcmFwRmFjdG9yeV8gPSBmb2N1c1RyYXBGYWN0b3J5O1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIGNvbnN0IHtNT0RBTH0gPSBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3NlcztcblxuICAgIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcbiAgICAgIGNvbnN0IHtTQ1JJTV9TRUxFQ1RPUn0gPSBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24uc3RyaW5ncztcbiAgICAgIHRoaXMuc2NyaW1fID0gLyoqIEB0eXBlIHshRWxlbWVudH0gKi8gKHRoaXMucm9vdF8ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFNDUklNX1NFTEVDVE9SKSk7XG4gICAgICB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfID0gKCkgPT4gLyoqIEB0eXBlIHshTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9ufSAqLyAodGhpcy5mb3VuZGF0aW9uXykuaGFuZGxlU2NyaW1DbGljaygpO1xuICAgICAgdGhpcy5zY3JpbV8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfKTtcbiAgICAgIHRoaXMuZm9jdXNUcmFwXyA9IHV0aWwuY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UodGhpcy5yb290XywgdGhpcy5mb2N1c1RyYXBGYWN0b3J5Xyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IChldnQpID0+IHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlS2V5ZG93bihldnQpO1xuICAgIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZF8gPSAoZXZ0KSA9PiB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KTtcblxuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZF8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd25fKTtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKTtcblxuICAgIGlmICh0aGlzLmxpc3RfKSB7XG4gICAgICB0aGlzLmxpc3RfLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBjb25zdCB7TU9EQUx9ID0gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKE1PREFMKSkge1xuICAgICAgdGhpcy5zY3JpbV8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAvKiogQHR5cGUgeyFGdW5jdGlvbn0gKi8gKHRoaXMuaGFuZGxlU2NyaW1DbGlja18pKTtcbiAgICAgIC8vIEVuc3VyZSBkcmF3ZXIgaXMgY2xvc2VkIHRvIGhpZGUgc2NyaW0gYW5kIHJlbGVhc2UgZm9jdXNcbiAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8qKiBAdHlwZSB7IU1EQ0RyYXdlckFkYXB0ZXJ9ICovXG4gICAgY29uc3QgYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ0RyYXdlckFkYXB0ZXJ9ICovIChPYmplY3QuYXNzaWduKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgZWxlbWVudEhhc0NsYXNzOiAoZWxlbWVudCwgY2xhc3NOYW1lKSA9PiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gdGhpcy5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHNhdmVGb2N1czogKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzRm9jdXNfID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb2N1cyA9IHRoaXMucHJldmlvdXNGb2N1c18gJiYgdGhpcy5wcmV2aW91c0ZvY3VzXy5mb2N1cztcbiAgICAgICAgaWYgKHRoaXMucm9vdF8uY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiYgcHJldmlvdXNGb2N1cykge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNGb2N1c18uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZvY3VzQWN0aXZlTmF2aWdhdGlvbkl0ZW06ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlTmF2SXRlbUVsID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKGAuJHtNRENMaXN0Rm91bmRhdGlvbi5jc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1N9YCk7XG4gICAgICAgIGlmIChhY3RpdmVOYXZJdGVtRWwpIHtcbiAgICAgICAgICBhY3RpdmVOYXZJdGVtRWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB0aGlzLmVtaXQoc3RyaW5ncy5DTE9TRV9FVkVOVCwge30sIHRydWUgLyogc2hvdWxkQnViYmxlICovKSxcbiAgICAgIG5vdGlmeU9wZW46ICgpID0+IHRoaXMuZW1pdChzdHJpbmdzLk9QRU5fRVZFTlQsIHt9LCB0cnVlIC8qIHNob3VsZEJ1YmJsZSAqLyksXG4gICAgICB0cmFwRm9jdXM6ICgpID0+IHRoaXMuZm9jdXNUcmFwXy5hY3RpdmF0ZSgpLFxuICAgICAgcmVsZWFzZUZvY3VzOiAoKSA9PiB0aGlzLmZvY3VzVHJhcF8uZGVhY3RpdmF0ZSgpLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHtESVNNSVNTSUJMRSwgTU9EQUx9ID0gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKERJU01JU1NJQkxFKSkge1xuICAgICAgcmV0dXJuIG5ldyBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcbiAgICAgIHJldHVybiBuZXcgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBNRENEcmF3ZXI6IEZhaWxlZCB0byBpbnN0YW50aWF0ZSBjb21wb25lbnQuIFN1cHBvcnRlZCB2YXJpYW50cyBhcmUgJHtESVNNSVNTSUJMRX0gYW5kICR7TU9EQUx9LmApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge01EQ0RyYXdlciwgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLCBNRENNb2RhbERyYXdlckZvdW5kYXRpb24sIHV0aWx9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5MaXN0ID0gZXhwb3J0cy5MaXN0R3JvdXBIZWFkZXIgPSBleHBvcnRzLkxpc3RHcm91cCA9IGV4cG9ydHMuTGlzdFNlY29uZGFyeVRleHQgPSBleHBvcnRzLkxpc3RQcmltYXJ5VGV4dCA9IGV4cG9ydHMuTGlzdFRleHRDb250YWluZXIgPSBleHBvcnRzLkxpc3REaXZpZGVyID0gZXhwb3J0cy5MaXN0SXRlbU1ldGFUZXh0ID0gZXhwb3J0cy5MaXN0SXRlbU1ldGEgPSBleHBvcnRzLkxpc3RJdGVtR3JhcGhpYyA9IGV4cG9ydHMuTGlzdExpbmtJdGVtID0gZXhwb3J0cy5MaXN0SXRlbSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfcHJlYWN0ID0gcmVxdWlyZShcInByZWFjdFwiKTtcblxudmFyIF9NYXRlcmlhbENvbXBvbmVudDEwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQmFzZS9NYXRlcmlhbENvbXBvbmVudFwiKSk7XG5cbnZhciBfSWNvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0ljb25cIikpO1xuXG52YXIgTGlzdEl0ZW0gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0SXRlbSwgX01hdGVyaWFsQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbSgpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbSk7XG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RJdGVtKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpcy5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbSc7XG4gICAgX3RoaXMubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0SXRlbSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImxpXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByb2xlOiBcIm9wdGlvblwiXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RJdGVtO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0SXRlbSA9IExpc3RJdGVtO1xuXG52YXIgTGlzdExpbmtJdGVtID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKExpc3RMaW5rSXRlbSwgX01hdGVyaWFsQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gTGlzdExpbmtJdGVtKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0TGlua0l0ZW0pO1xuICAgIF90aGlzMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdExpbmtJdGVtKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW0nO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0TGlua0l0ZW0sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJhXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByb2xlOiBcIm9wdGlvblwiXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RMaW5rSXRlbTtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdExpbmtJdGVtID0gTGlzdExpbmtJdGVtO1xuXG52YXIgTGlzdEl0ZW1HcmFwaGljID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKExpc3RJdGVtR3JhcGhpYywgX01hdGVyaWFsQ29tcG9uZW50Myk7XG5cbiAgZnVuY3Rpb24gTGlzdEl0ZW1HcmFwaGljKCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbUdyYXBoaWMpO1xuICAgIF90aGlzMyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEl0ZW1HcmFwaGljKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczMuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX2dyYXBoaWMnO1xuICAgIF90aGlzMy5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0SXRlbUdyYXBoaWMsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmLFxuICAgICAgICByb2xlOiBcInByZXNlbnRhdGlvblwiXG4gICAgICB9KSwgKDAsIF9wcmVhY3QuaCkoX0ljb24uZGVmYXVsdCwge1xuICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiXG4gICAgICB9LCBwcm9wcy5jaGlsZHJlbikpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdEl0ZW1HcmFwaGljO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0SXRlbUdyYXBoaWMgPSBMaXN0SXRlbUdyYXBoaWM7XG5cbnZhciBMaXN0SXRlbU1ldGEgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9MaXN0SXRlbUdyYXBoaWMpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoTGlzdEl0ZW1NZXRhLCBfTGlzdEl0ZW1HcmFwaGljKTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbU1ldGEoKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RJdGVtTWV0YSk7XG4gICAgX3RoaXM0ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShMaXN0SXRlbU1ldGEpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNC5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbV9fbWV0YSc7XG4gICAgcmV0dXJuIF90aGlzNDtcbiAgfVxuXG4gIHJldHVybiBMaXN0SXRlbU1ldGE7XG59KExpc3RJdGVtR3JhcGhpYyk7XG5cbmV4cG9ydHMuTGlzdEl0ZW1NZXRhID0gTGlzdEl0ZW1NZXRhO1xuXG52YXIgTGlzdEl0ZW1NZXRhVGV4dCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0SXRlbU1ldGFUZXh0LCBfTWF0ZXJpYWxDb21wb25lbnQ0KTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbU1ldGFUZXh0KCkge1xuICAgIHZhciBfdGhpczU7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbU1ldGFUZXh0KTtcbiAgICBfdGhpczUgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RJdGVtTWV0YVRleHQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNS5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbV9fbWV0YSc7XG4gICAgX3RoaXM1Lm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKExpc3RJdGVtTWV0YVRleHQsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmLFxuICAgICAgICByb2xlOiBcInByZXNlbnRhdGlvblwiXG4gICAgICB9KSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dDtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdEl0ZW1NZXRhVGV4dCA9IExpc3RJdGVtTWV0YVRleHQ7XG5cbnZhciBMaXN0RGl2aWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0RGl2aWRlciwgX01hdGVyaWFsQ29tcG9uZW50NSk7XG5cbiAgZnVuY3Rpb24gTGlzdERpdmlkZXIoKSB7XG4gICAgdmFyIF90aGlzNjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3REaXZpZGVyKTtcbiAgICBfdGhpczYgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3REaXZpZGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczYuY29tcG9uZW50TmFtZSA9ICdsaXN0LWRpdmlkZXInO1xuICAgIF90aGlzNi5tZGNQcm9wcyA9IFsnaW5zZXQnXTtcbiAgICByZXR1cm4gX3RoaXM2O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdERpdmlkZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJsaVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcm9sZTogXCJzZXBhcmF0b3JcIlxuICAgICAgfSwgcHJvcHMsIHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3REaXZpZGVyO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0RGl2aWRlciA9IExpc3REaXZpZGVyO1xuXG52YXIgTGlzdFRleHRDb250YWluZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDYpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoTGlzdFRleHRDb250YWluZXIsIF9NYXRlcmlhbENvbXBvbmVudDYpO1xuXG4gIGZ1bmN0aW9uIExpc3RUZXh0Q29udGFpbmVyKCkge1xuICAgIHZhciBfdGhpczc7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0VGV4dENvbnRhaW5lcik7XG4gICAgX3RoaXM3ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShMaXN0VGV4dENvbnRhaW5lcikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXM3LmNvbXBvbmVudE5hbWUgPSAnbGlzdC1pdGVtX190ZXh0JztcbiAgICBfdGhpczcubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM3O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdFRleHRDb250YWluZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9KSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdFRleHRDb250YWluZXI7XG59KF9NYXRlcmlhbENvbXBvbmVudDEwLmRlZmF1bHQpO1xuXG5leHBvcnRzLkxpc3RUZXh0Q29udGFpbmVyID0gTGlzdFRleHRDb250YWluZXI7XG5cbnZhciBMaXN0UHJpbWFyeVRleHQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9MaXN0VGV4dENvbnRhaW5lcikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0UHJpbWFyeVRleHQsIF9MaXN0VGV4dENvbnRhaW5lcik7XG5cbiAgZnVuY3Rpb24gTGlzdFByaW1hcnlUZXh0KCkge1xuICAgIHZhciBfdGhpczg7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0UHJpbWFyeVRleHQpO1xuICAgIF90aGlzOCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdFByaW1hcnlUZXh0KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczguY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX3ByaW1hcnktdGV4dCc7XG4gICAgcmV0dXJuIF90aGlzODtcbiAgfVxuXG4gIHJldHVybiBMaXN0UHJpbWFyeVRleHQ7XG59KExpc3RUZXh0Q29udGFpbmVyKTtcblxuZXhwb3J0cy5MaXN0UHJpbWFyeVRleHQgPSBMaXN0UHJpbWFyeVRleHQ7XG5cbnZhciBMaXN0U2Vjb25kYXJ5VGV4dCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3RUZXh0Q29udGFpbmVyMikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0U2Vjb25kYXJ5VGV4dCwgX0xpc3RUZXh0Q29udGFpbmVyMik7XG5cbiAgZnVuY3Rpb24gTGlzdFNlY29uZGFyeVRleHQoKSB7XG4gICAgdmFyIF90aGlzOTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RTZWNvbmRhcnlUZXh0KTtcbiAgICBfdGhpczkgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RTZWNvbmRhcnlUZXh0KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczkuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JztcbiAgICByZXR1cm4gX3RoaXM5O1xuICB9XG5cbiAgcmV0dXJuIExpc3RTZWNvbmRhcnlUZXh0O1xufShMaXN0VGV4dENvbnRhaW5lcik7XG5cbmV4cG9ydHMuTGlzdFNlY29uZGFyeVRleHQgPSBMaXN0U2Vjb25kYXJ5VGV4dDtcblxudmFyIExpc3RHcm91cCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50Nykge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0R3JvdXAsIF9NYXRlcmlhbENvbXBvbmVudDcpO1xuXG4gIGZ1bmN0aW9uIExpc3RHcm91cCgpIHtcbiAgICB2YXIgX3RoaXMxMDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RHcm91cCk7XG4gICAgX3RoaXMxMCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEdyb3VwKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczEwLmNvbXBvbmVudE5hbWUgPSAnbGlzdC1ncm91cCc7XG4gICAgX3RoaXMxMC5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczEwO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdEdyb3VwLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMaXN0R3JvdXA7XG59KF9NYXRlcmlhbENvbXBvbmVudDEwLmRlZmF1bHQpO1xuXG5leHBvcnRzLkxpc3RHcm91cCA9IExpc3RHcm91cDtcblxudmFyIExpc3RHcm91cEhlYWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50OCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0R3JvdXBIZWFkZXIsIF9NYXRlcmlhbENvbXBvbmVudDgpO1xuXG4gIGZ1bmN0aW9uIExpc3RHcm91cEhlYWRlcigpIHtcbiAgICB2YXIgX3RoaXMxMTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RHcm91cEhlYWRlcik7XG4gICAgX3RoaXMxMSA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEdyb3VwSGVhZGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczExLmNvbXBvbmVudE5hbWUgPSAnbGlzdC1ncm91cF9fc3ViaGVhZGVyJztcbiAgICBfdGhpczExLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzMTE7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0R3JvdXBIZWFkZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJoM1wiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RHcm91cEhlYWRlcjtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdEdyb3VwSGVhZGVyID0gTGlzdEdyb3VwSGVhZGVyO1xuXG52YXIgTGlzdCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50OSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0LCBfTWF0ZXJpYWxDb21wb25lbnQ5KTtcblxuICBmdW5jdGlvbiBMaXN0KCkge1xuICAgIHZhciBfdGhpczEyO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgTGlzdCk7XG4gICAgX3RoaXMxMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMxMi5jb21wb25lbnROYW1lID0gJ2xpc3QnO1xuICAgIF90aGlzMTIubWRjUHJvcHMgPSBbJ2RlbnNlJywgJ3R3by1saW5lJywgJ2F2YXRhci1saXN0J107XG4gICAgcmV0dXJuIF90aGlzMTI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgaWYgKHByb3BzLmludGVyYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcIm5hdlwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgICB9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwidWxcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0pLCBwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMaXN0O1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0ID0gTGlzdDtcblxudmFyIGRlZmF1bHRfMSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3QpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoZGVmYXVsdF8xLCBfTGlzdCk7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KExpc3QpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5kZWZhdWx0XzEuSXRlbSA9IExpc3RJdGVtO1xuZGVmYXVsdF8xLkxpbmtJdGVtID0gTGlzdExpbmtJdGVtO1xuZGVmYXVsdF8xLkl0ZW1HcmFwaGljID0gTGlzdEl0ZW1HcmFwaGljO1xuZGVmYXVsdF8xLkl0ZW1NZXRhID0gTGlzdEl0ZW1NZXRhO1xuZGVmYXVsdF8xLkl0ZW1NZXRhVGV4dCA9IExpc3RJdGVtTWV0YVRleHQ7XG5kZWZhdWx0XzEuRGl2aWRlciA9IExpc3REaXZpZGVyO1xuZGVmYXVsdF8xLlRleHRDb250YWluZXIgPSBMaXN0VGV4dENvbnRhaW5lcjtcbmRlZmF1bHRfMS5QcmltYXJ5VGV4dCA9IExpc3RQcmltYXJ5VGV4dDtcbmRlZmF1bHRfMS5TZWNvbmRhcnlUZXh0ID0gTGlzdFNlY29uZGFyeVRleHQ7XG5kZWZhdWx0XzEuR3JvdXAgPSBMaXN0R3JvdXA7XG5kZWZhdWx0XzEuR3JvdXBIZWFkZXIgPSBMaXN0R3JvdXBIZWFkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLkRyYXdlciA9IGV4cG9ydHMuRHJhd2VySXRlbSA9IGV4cG9ydHMuRHJhd2VyQ29udGVudCA9IGV4cG9ydHMuRHJhd2VySGVhZGVyID0gdm9pZCAwO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfZHJhd2VyID0gcmVxdWlyZShcIkBtYXRlcmlhbC9kcmF3ZXJcIik7XG5cbnZhciBfYmluZERlY29yYXRvciA9IHJlcXVpcmUoXCJiaW5kLWRlY29yYXRvclwiKTtcblxudmFyIF9wcmVhY3QgPSByZXF1aXJlKFwicHJlYWN0XCIpO1xuXG52YXIgX01hdGVyaWFsQ29tcG9uZW50NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0Jhc2UvTWF0ZXJpYWxDb21wb25lbnRcIikpO1xuXG52YXIgX0xpc3QgPSByZXF1aXJlKFwiLi4vTGlzdFwiKTtcblxudmFyIF9fZGVjb3JhdGUgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19kZWNvcmF0ZSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsXG4gICAgICBkO1xuICBpZiAoKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMi5kZWZhdWx0KShSZWZsZWN0KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO2Vsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICB9XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuXG52YXIgRHJhd2VySGVhZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoRHJhd2VySGVhZGVyLCBfTWF0ZXJpYWxDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIERyYXdlckhlYWRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBEcmF3ZXJIZWFkZXIpO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShEcmF3ZXJIZWFkZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzLmNvbXBvbmVudE5hbWUgPSAnZHJhd2VyX19oZWFkZXInO1xuICAgIF90aGlzLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoRHJhd2VySGVhZGVyLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiaGVhZGVyXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSwgcHJvcHMpLCAoMCwgX3ByZWFjdC5oKShcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJtZGMtZHJhd2VyX19oZWFkZXItY29udGVudFwiXG4gICAgICB9LCBwcm9wcy5jaGlsZHJlbikpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhd2VySGVhZGVyO1xufShfTWF0ZXJpYWxDb21wb25lbnQ0LmRlZmF1bHQpO1xuXG5leHBvcnRzLkRyYXdlckhlYWRlciA9IERyYXdlckhlYWRlcjtcblxudmFyIERyYXdlckNvbnRlbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoRHJhd2VyQ29udGVudCwgX01hdGVyaWFsQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhd2VyQ29udGVudCgpIHtcbiAgICB2YXIgX3RoaXMyO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgRHJhd2VyQ29udGVudCk7XG4gICAgX3RoaXMyID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShEcmF3ZXJDb250ZW50KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdkcmF3ZXJfX2NvbnRlbnQnO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShEcmF3ZXJDb250ZW50LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlcl9fY29udGVudFwiXG4gICAgICB9LCAoMCwgX3ByZWFjdC5oKShcIm5hdlwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIm1kYy1saXN0XCIsXG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmF3ZXJDb250ZW50O1xufShfTWF0ZXJpYWxDb21wb25lbnQ0LmRlZmF1bHQpO1xuXG5leHBvcnRzLkRyYXdlckNvbnRlbnQgPSBEcmF3ZXJDb250ZW50O1xuXG52YXIgRHJhd2VySXRlbSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3RMaW5rSXRlbSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShEcmF3ZXJJdGVtLCBfTGlzdExpbmtJdGVtKTtcblxuICBmdW5jdGlvbiBEcmF3ZXJJdGVtKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIERyYXdlckl0ZW0pO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKERyYXdlckl0ZW0pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoRHJhd2VySXRlbSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHZhciByZXR1cm5lZE5vZGUgPSAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoRHJhd2VySXRlbS5wcm90b3R5cGUpLCBcIm1hdGVyaWFsRG9tXCIsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMpO1xuICAgICAgLyogTG9naWMgdG8gYWRkIHNlbGVjdGVkIGNsYXNzICovXG5cbiAgICAgIGlmIChwcm9wcy5zZWxlY3RlZCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIChyZXR1cm5lZE5vZGUucHJvcHMgfHwgcmV0dXJuZWROb2RlLmF0dHJpYnV0ZXMpLmNsYXNzTmFtZSA9ICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuZWROb2RlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhd2VySXRlbTtcbn0oX0xpc3QuTGlzdExpbmtJdGVtKTtcblxuZXhwb3J0cy5EcmF3ZXJJdGVtID0gRHJhd2VySXRlbTtcblxudmFyIERyYXdlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50Mykge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShEcmF3ZXIsIF9NYXRlcmlhbENvbXBvbmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYXdlcigpIHtcbiAgICB2YXIgX3RoaXMzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgRHJhd2VyKTtcbiAgICBfdGhpczMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKERyYXdlcikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMzLmNvbXBvbmVudE5hbWUgPSAnZHJhd2VyLWNvbnRhaW5lcic7XG4gICAgX3RoaXMzLm1kY1Byb3BzID0gW107XG4gICAgX3RoaXMzLm1kY05vdGlmeVByb3BzID0gWydvcGVuJ107XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKERyYXdlciwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoRHJhd2VyLnByb3RvdHlwZSksIFwiY29tcG9uZW50RGlkTW91bnRcIiwgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiAodGhpcy5wcm9wcy5tb2RhbCB8fCB0aGlzLnByb3BzLmRpc21pc3NpYmxlKSkge1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50ID0gbmV3IF9kcmF3ZXIuTURDRHJhd2VyKHRoaXMuY29udHJvbCk7XG4gICAgICAgIHRoaXMuTURDb21wb25lbnQubGlzdGVuKCdNRENEcmF3ZXI6b3BlbmVkJywgdGhpcy5vbk9wZW4pO1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50Lmxpc3RlbignTURDRHJhd2VyOmNsb3NlZCcsIHRoaXMub25DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25PcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcGVuKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2UoZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25DbG9zZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IFsnbWRjLWRyYXdlciddOyAvLyBjYW50IHVzZSBtZGNQcm9wcyBjdXogY2xhc3NlcyBuZWVkIHRvIGJlIG9uIHRoZSBpbm5lciBjaGlsZCBhbmQgbm90IG9uIHJvb3QgbGV2ZWxcblxuICAgICAgaWYgKHByb3BzLm1vZGFsKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnbWRjLWRyYXdlci0tbW9kYWwnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcHMuZGlzbWlzc2libGUpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdtZGMtZHJhd2VyLS1kaXNtaXNzaWJsZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgbnVsbCwgKDAsIF9wcmVhY3QuaCkoXCJhc2lkZVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMuam9pbignICcpLFxuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSwgcHJvcHMpLCBwcm9wcy5jaGlsZHJlbiksIHByb3BzLm1vZGFsICYmICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlci1zY3JpbVwiXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmF3ZXI7XG59KF9NYXRlcmlhbENvbXBvbmVudDQuZGVmYXVsdCk7XG5cbmV4cG9ydHMuRHJhd2VyID0gRHJhd2VyO1xuRHJhd2VyLkRyYXdlckNvbnRlbnQgPSBEcmF3ZXJDb250ZW50O1xuRHJhd2VyLkRyYXdlckhlYWRlciA9IERyYXdlckhlYWRlcjtcbkRyYXdlci5EcmF3ZXJJdGVtID0gRHJhd2VySXRlbTtcblxuX19kZWNvcmF0ZShbX2JpbmREZWNvcmF0b3IuYmluZF0sIERyYXdlci5wcm90b3R5cGUsIFwib25PcGVuXCIsIG51bGwpO1xuXG5fX2RlY29yYXRlKFtfYmluZERlY29yYXRvci5iaW5kXSwgRHJhd2VyLnByb3RvdHlwZSwgXCJvbkNsb3NlXCIsIG51bGwpO1xuXG52YXIgZGVmYXVsdF8xID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRHJhd2VyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKGRlZmF1bHRfMSwgX0RyYXdlcik7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KERyYXdlcik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbmRlZmF1bHRfMS5EcmF3ZXJDb250ZW50ID0gRHJhd2VyQ29udGVudDtcbmRlZmF1bHRfMS5EcmF3ZXJIZWFkZXIgPSBEcmF3ZXJIZWFkZXI7XG5kZWZhdWx0XzEuRHJhd2VySXRlbSA9IERyYXdlckl0ZW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCc7XHJcbmltcG9ydCBEcmF3ZXIgZnJvbSAncHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvRHJhd2VyJztcclxuaW1wb3J0ICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9EcmF3ZXIvc3R5bGUuY3NzJztcclxuaW1wb3J0ICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9MaXN0L3N0eWxlLmNzcyc7XHJcbmltcG9ydCAncHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvQnV0dG9uL3N0eWxlLmNzcyc7XHJcblxyXG5jb25zdCBEcmF3ZXJQYWdlID0oe29wZW4sc2V0VG9nZ2xlLCBpdGVtc30pPT4ge1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgXHJcbiAgICAgICAgPERyYXdlclxyXG4gICAgICAgICAgbW9kYWxcclxuICAgICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XHJcbiAgICAgICAgICAvLyAgc2V0VG9nZ2xlKGZhbHNlKSBcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPERyYXdlci5EcmF3ZXJIZWFkZXIgY2xhc3NOYW1lPVwibWRjLXRoZW1lLS1wcmltYXJ5LWJnXCI+XHJcbiAgICAgICAgICAgUG9ydGZvbGlvXHJcbiAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3tvcGFjaXR5OiAwfX0gLz5cclxuICAgICAgICAgIDwvRHJhd2VyLkRyYXdlckhlYWRlcj5cclxuICAgICAgICAgIDxEcmF3ZXIuRHJhd2VyQ29udGVudD5cclxuICAgICAgICAgICAge2l0ZW1zICYmIGl0ZW1zLm1hcCgoaXRlbSxpKT0+e1xyXG4gICAgICAgICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgICAgIDxEcmF3ZXIuRHJhd2VySXRlbSBvbkNsaWNrPXtzZXRUb2dnbGV9IGhyZWY9e2Ake2l0ZW0ucm91dGV9YH0+XHJcbiAgICAgICAgICAgICAgICB7aXRlbS50aXRsZX1cclxuICAgICAgICAgICAgICAgIDwvRHJhd2VyLkRyYXdlckl0ZW0+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvRHJhd2VyLkRyYXdlckNvbnRlbnQ+XHJcbiAgICAgICAgPC9EcmF3ZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBEcmF3ZXJQYWdlIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUb3AgQXBwIEJhclxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRvcCBBcHAgQmFyIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUb3BBcHBCYXJBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IEVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNwZWNpZmllZCBpbmxpbmUgc3R5bGUgcHJvcGVydHkgb24gdGhlIHJvb3QgRWxlbWVudCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFN0eWxlKHByb3BlcnR5LCB2YWx1ZSkge31cblxuICAvKipcbiAgICogR2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSB0b3AgYXBwIGJhci5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0VG9wQXBwQmFySGVpZ2h0KCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIG5hdmlnYXRpb24gaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBuYXZpZ2F0aW9uIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBuYXZpZ2F0aW9uIGljb24gaXMgY2xpY2tlZC5cbiAgICovXG4gIG5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICByZWdpc3RlclNjcm9sbEhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyICovXG4gIGRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0Vmlld3BvcnRTY3JvbGxZKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRUb3RhbEFjdGlvbkl0ZW1zKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVG9wQXBwQmFyQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEZJWEVEX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1maXhlZCcsXG4gIEZJWEVEX1NDUk9MTEVEX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1maXhlZC1zY3JvbGxlZCcsXG4gIFNIT1JUX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1zaG9ydCcsXG4gIFNIT1JUX0hBU19BQ1RJT05fSVRFTV9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tc2hvcnQtaGFzLWFjdGlvbi1pdGVtJyxcbiAgU0hPUlRfQ09MTEFQU0VEX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBERUJPVU5DRV9USFJPVFRMRV9SRVNJWkVfVElNRV9NUzogMTAwLFxuICBNQVhfVE9QX0FQUF9CQVJfSEVJR0hUOiAxMjgsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIEFDVElPTl9JVEVNX1NFTEVDVE9SOiAnLm1kYy10b3AtYXBwLWJhcl9fYWN0aW9uLWl0ZW0nLFxuICBOQVZJR0FUSU9OX0VWRU5UOiAnTURDVG9wQXBwQmFyOm5hdicsXG4gIE5BVklHQVRJT05fSUNPTl9TRUxFQ1RPUjogJy5tZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbicsXG4gIFJPT1RfU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyJyxcbiAgVElUTEVfU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyX190aXRsZScsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXMsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7c3RyaW5ncywgY3NzQ2xhc3NlcywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IE1EQ1RvcEFwcEJhckFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUb3BBcHBCYXJBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcn0gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RvcEFwcEJhckFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVG9wQXBwQmFyQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9ICovICh7XG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZTogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0VG9wQXBwQmFySGVpZ2h0OiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3Rlck5hdmlnYXRpb25JY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIG5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclNjcm9sbEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRWaWV3cG9ydFNjcm9sbFk6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0VG90YWxBY3Rpb25JdGVtczogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDVG9wQXBwQmFyQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoLyoqIEB0eXBlIHshTURDVG9wQXBwQmFyQWRhcHRlcn0gKi8gYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIHRoaXMubmF2Q2xpY2tIYW5kbGVyXyA9ICgpID0+IHRoaXMuYWRhcHRlcl8ubm90aWZ5TmF2aWdhdGlvbkljb25DbGlja2VkKCk7XG5cbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4ge307XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLm5hdkNsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLm5hdkNsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgaW5pdFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95U2Nyb2xsSGFuZGxlcigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7Y3NzQ2xhc3Nlc30gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBNRENUb3BBcHBCYXJBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1RvcEFwcEJhckZvdW5kYXRpb24gZnJvbSAnLi4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ1RvcEFwcEJhckZvdW5kYXRpb248IU1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDVG9wQXBwQmFyRm91bmRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUb3BBcHBCYXJBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoYWRhcHRlcik7XG4gICAgLyoqIFN0YXRlIHZhcmlhYmxlIGZvciB0aGUgcHJldmlvdXMgc2Nyb2xsIGl0ZXJhdGlvbiB0b3AgYXBwIGJhciBzdGF0ZSAqL1xuICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gZmFsc2U7XG5cbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4gdGhpcy5maXhlZFNjcm9sbEhhbmRsZXJfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGhhbmRsZXIgZm9yIGFwcGx5aW5nL3JlbW92aW5nIHRoZSBtb2RpZmllciBjbGFzc1xuICAgKiBvbiB0aGUgZml4ZWQgdG9wIGFwcCBiYXIuXG4gICAqL1xuICBmaXhlZFNjcm9sbEhhbmRsZXJfKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTY3JvbGwgPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPD0gMCkge1xuICAgICAgaWYgKHRoaXMud2FzU2Nyb2xsZWRfKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5GSVhFRF9TQ1JPTExFRF9DTEFTUyk7XG4gICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy53YXNTY3JvbGxlZF8pIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkZJWEVEX1NDUk9MTEVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy53YXNTY3JvbGxlZF8gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ1RvcEFwcEJhckFkYXB0ZXIgZnJvbSAnLi4vYWRhcHRlcic7XG5pbXBvcnQgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24gZnJvbSAnLi4vZm91bmRhdGlvbic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uPCFNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbiBleHRlbmRzIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihhZGFwdGVyKTtcbiAgICAvLyBTdGF0ZSB2YXJpYWJsZSBmb3IgdGhlIGN1cnJlbnQgdG9wIGFwcCBiYXIgc3RhdGVcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4gdGhpcy5zaG9ydEFwcEJhclNjcm9sbEhhbmRsZXJfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICBjb25zdCBpc0Fsd2F5c0NvbGxhcHNlZCA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5TSE9SVF9DT0xMQVBTRURfQ0xBU1MpO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0VG90YWxBY3Rpb25JdGVtcygpID4gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlNIT1JUX0hBU19BQ1RJT05fSVRFTV9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0Fsd2F5c0NvbGxhcHNlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gICAgICB0aGlzLnNob3J0QXBwQmFyU2Nyb2xsSGFuZGxlcl8oKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG5cblxuICAvKipcbiAgICogU2Nyb2xsIGhhbmRsZXIgZm9yIGFwcGx5aW5nL3JlbW92aW5nIHRoZSBjb2xsYXBzZWQgbW9kaWZpZXIgY2xhc3NcbiAgICogb24gdGhlIHNob3J0IHRvcCBhcHAgYmFyLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2hvcnRBcHBCYXJTY3JvbGxIYW5kbGVyXygpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsID0gdGhpcy5hZGFwdGVyXy5nZXRWaWV3cG9ydFNjcm9sbFkoKTtcblxuICAgIGlmIChjdXJyZW50U2Nyb2xsIDw9IDApIHtcbiAgICAgIGlmICh0aGlzLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5TSE9SVF9DT0xMQVBTRURfQ0xBU1MpO1xuICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5pc0NvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuU0hPUlRfQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDVG9wQXBwQmFyQWRhcHRlciBmcm9tICcuLi9hZGFwdGVyJztcbmltcG9ydCBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiBmcm9tICcuLi9mb3VuZGF0aW9uJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuY29uc3QgSU5JVElBTF9WQUxVRSA9IDA7XG4vKipcbiAqIEBleHRlbmRzIHtNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbjwhTURDVG9wQXBwQmFyRm91bmRhdGlvbj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVG9wQXBwQmFyRm91bmRhdGlvbiBleHRlbmRzIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihhZGFwdGVyKTtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBkaWZmcyBvZiBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB2cyBwcmV2aW91cyBzY3JvbGwgcG9zaXRpb25cbiAgICAgKiBAcHJpdmF0ZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uXyA9IHRoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRTY3JvbGxZKCk7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZlcmlmeSB3aGVuIHRoZSB0b3AgYXBwIGJhciBpcyBjb21wbGV0ZWx5IHNob3dpbmcgb3IgY29tcGxldGVseSBoaWRkZW5cbiAgICAgKiBAcHJpdmF0ZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMudG9wQXBwQmFySGVpZ2h0XyA9IHRoaXMuYWRhcHRlcl8uZ2V0VG9wQXBwQmFySGVpZ2h0KCk7XG5cbiAgICAvKipcbiAgICAgKiB3YXNEb2NrZWRfIGlzIHVzZWQgdG8gaW5kaWNhdGUgaWYgdGhlIHRvcCBhcHAgYmFyIHdhcyBkb2NrZWQgaW4gdGhlIHByZXZpb3VzXG4gICAgICogc2Nyb2xsIGhhbmRsZXIgaXRlcmF0aW9uLlxuICAgICAqIEBwcml2YXRlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMud2FzRG9ja2VkXyA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBpc0RvY2tlZFNob3dpbmdfIGlzIHVzZWQgdG8gaW5kaWNhdGUgaWYgdGhlIHRvcCBhcHAgYmFyIGlzIGRvY2tlZCBpbiB0aGUgZnVsbHlcbiAgICAgKiBzaG93biBwb3NpdGlvbi5cbiAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmlzRG9ja2VkU2hvd2luZ18gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVmFyaWFibGUgZm9yIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSB0b3AgYXBwIGJhclxuICAgICAqIEBwcml2YXRlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHByZXZlbnQgdGhlIHRvcCBhcHAgYmFyIGZyb20gYmVpbmcgc2Nyb2xsZWQgb3V0IG9mIHZpZXcgZHVyaW5nIHJlc2l6ZSBldmVudHNcbiAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXQgdGhhdCdzIHVzZWQgdG8gdGhyb3R0bGUgdGhlIHJlc2l6ZSBldmVudHNcbiAgICAgKiBAcHJpdmF0ZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmVzaXplVGhyb3R0bGVJZF8gPSBJTklUSUFMX1ZBTFVFO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWVvdXQgdGhhdCdzIHVzZWQgdG8gZGVib3VuY2UgdG9nZ2xpbmcgdGhlIGlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyB2YXJpYWJsZSBhZnRlciBhIHJlc2l6ZVxuICAgICAqIEBwcml2YXRlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yZXNpemVEZWJvdW5jZUlkXyA9IElOSVRJQUxfVkFMVUU7XG5cbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4gdGhpcy50b3BBcHBCYXJTY3JvbGxIYW5kbGVyXygpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLnRvcEFwcEJhclJlc2l6ZUhhbmRsZXJfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHN1cGVyLmluaXQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0b3AnLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZSBET00gbmVlZHMgdG8gdXBkYXRlLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tGb3JVcGRhdGVfKCkge1xuICAgIGNvbnN0IG9mZnNjcmVlbkJvdW5kYXJ5VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0XztcbiAgICBjb25zdCBoYXNBbnlQaXhlbHNPZmZzY3JlZW4gPSB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfIDwgMDtcbiAgICBjb25zdCBoYXNBbnlQaXhlbHNPbnNjcmVlbiA9IHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPiBvZmZzY3JlZW5Cb3VuZGFyeVRvcDtcbiAgICBjb25zdCBwYXJ0aWFsbHlTaG93aW5nID0gaGFzQW55UGl4ZWxzT2Zmc2NyZWVuICYmIGhhc0FueVBpeGVsc09uc2NyZWVuO1xuXG4gICAgLy8gSWYgaXQncyBwYXJ0aWFsbHkgc2hvd2luZywgaXQgY2FuJ3QgYmUgZG9ja2VkLlxuICAgIGlmIChwYXJ0aWFsbHlTaG93aW5nKSB7XG4gICAgICB0aGlzLndhc0RvY2tlZF8gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IHByZXZpb3VzbHkgZG9ja2VkIGFuZCBub3QgcGFydGlhbGx5IHNob3dpbmcsIGl0J3Mgbm93IGRvY2tlZC5cbiAgICAgIGlmICghdGhpcy53YXNEb2NrZWRfKSB7XG4gICAgICAgIHRoaXMud2FzRG9ja2VkXyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRG9ja2VkU2hvd2luZ18gIT09IGhhc0FueVBpeGVsc09uc2NyZWVuKSB7XG4gICAgICAgIHRoaXMuaXNEb2NrZWRTaG93aW5nXyA9IGhhc0FueVBpeGVsc09uc2NyZWVuO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFydGlhbGx5U2hvd2luZztcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBtb3ZlIHRoZSB0b3AgYXBwIGJhciBpZiBuZWVkZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtb3ZlVG9wQXBwQmFyXygpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvclVwZGF0ZV8oKSkge1xuICAgICAgLy8gT25jZSB0aGUgdG9wIGFwcCBiYXIgaXMgZnVsbHkgaGlkZGVuIHdlIHVzZSB0aGUgbWF4IHBvdGVudGlhbCB0b3AgYXBwIGJhciBoZWlnaHQgYXMgb3VyIG9mZnNldFxuICAgICAgLy8gc28gdGhlIHRvcCBhcHAgYmFyIGRvZXNuJ3Qgc2hvdyBpZiB0aGUgd2luZG93IHJlc2l6ZXMgYW5kIHRoZSBuZXcgaGVpZ2h0ID4gdGhlIG9sZCBoZWlnaHQuXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXztcbiAgICAgIGlmIChNYXRoLmFicyhvZmZzZXQpID49IHRoaXMudG9wQXBwQmFySGVpZ2h0Xykge1xuICAgICAgICBvZmZzZXQgPSAtbnVtYmVycy5NQVhfVE9QX0FQUF9CQVJfSEVJR0hUO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0b3AnLCBvZmZzZXQgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGhhbmRsZXIgZm9yIHRoZSBkZWZhdWx0IHNjcm9sbCBiZWhhdmlvciBvZiB0aGUgdG9wIGFwcCBiYXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0b3BBcHBCYXJTY3JvbGxIYW5kbGVyXygpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcbiAgICBjb25zdCBkaWZmID0gY3VycmVudFNjcm9sbFBvc2l0aW9uIC0gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb25fO1xuICAgIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uXyA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcblxuICAgIC8vIElmIHRoZSB3aW5kb3cgaXMgYmVpbmcgcmVzaXplZCB0aGUgbGFzdFNjcm9sbFBvc2l0aW9uXyBuZWVkcyB0byBiZSB1cGRhdGVkIGJ1dCB0aGVcbiAgICAvLyBjdXJyZW50IHNjcm9sbCBvZiB0aGUgdG9wIGFwcCBiYXIgc2hvdWxkIHN0YXkgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkXykge1xuICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyAtPSBkaWZmO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8pID4gdGhpcy50b3BBcHBCYXJIZWlnaHRfKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPSAtdGhpcy50b3BBcHBCYXJIZWlnaHRfO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vdmVUb3BBcHBCYXJfKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvcCBhcHAgYmFyIHJlc2l6ZSBoYW5kbGVyIHRoYXQgdGhyb3R0bGUvZGVib3VuY2UgZnVuY3Rpb25zIHRoYXQgZXhlY3V0ZSB1cGRhdGVzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdG9wQXBwQmFyUmVzaXplSGFuZGxlcl8oKSB7XG4gICAgLy8gVGhyb3R0bGUgcmVzaXplIGV2ZW50cyAxMCBwL3NcbiAgICBpZiAoIXRoaXMucmVzaXplVGhyb3R0bGVJZF8pIHtcbiAgICAgIHRoaXMucmVzaXplVGhyb3R0bGVJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNpemVUaHJvdHRsZUlkXyA9IElOSVRJQUxfVkFMVUU7XG4gICAgICAgIHRoaXMudGhyb3R0bGVkUmVzaXplSGFuZGxlcl8oKTtcbiAgICAgIH0sIG51bWJlcnMuREVCT1VOQ0VfVEhST1RUTEVfUkVTSVpFX1RJTUVfTVMpO1xuICAgIH1cblxuICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWRfID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnJlc2l6ZURlYm91bmNlSWRfKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVEZWJvdW5jZUlkXyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNpemVEZWJvdW5jZUlkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b3BBcHBCYXJTY3JvbGxIYW5kbGVyXygpO1xuICAgICAgdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZF8gPSBmYWxzZTtcbiAgICAgIHRoaXMucmVzaXplRGVib3VuY2VJZF8gPSBJTklUSUFMX1ZBTFVFO1xuICAgIH0sIG51bWJlcnMuREVCT1VOQ0VfVEhST1RUTEVfUkVTSVpFX1RJTUVfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm90dGxlZCBmdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIHRvcCBhcHAgYmFyIHNjcm9sbGVkIHZhbHVlcyBpZiB0aGVcbiAgICogdG9wIGFwcCBiYXIgaGVpZ2h0IGNoYW5nZXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aHJvdHRsZWRSZXNpemVIYW5kbGVyXygpIHtcbiAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gdGhpcy5hZGFwdGVyXy5nZXRUb3BBcHBCYXJIZWlnaHQoKTtcbiAgICBpZiAodGhpcy50b3BBcHBCYXJIZWlnaHRfICE9PSBjdXJyZW50SGVpZ2h0KSB7XG4gICAgICB0aGlzLndhc0RvY2tlZF8gPSBmYWxzZTtcblxuICAgICAgLy8gU2luY2UgdGhlIHRvcCBhcHAgYmFyIGhhcyBhIGRpZmZlcmVudCBoZWlnaHQgZGVwZW5kaW5nIG9uIHRoZSBzY3JlZW4gd2lkdGgsIHRoaXNcbiAgICAgIC8vIHdpbGwgZW5zdXJlIHRoYXQgdGhlIHRvcCBhcHAgYmFyIHJlbWFpbnMgaW4gdGhlIGNvcnJlY3QgbG9jYXRpb24gaWZcbiAgICAgIC8vIGNvbXBsZXRlbHkgaGlkZGVuIGFuZCBhIHJlc2l6ZSBtYWtlcyB0aGUgdG9wIGFwcCBiYXIgYSBkaWZmZXJlbnQgaGVpZ2h0LlxuICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyAtPSB0aGlzLnRvcEFwcEJhckhlaWdodF8gLSBjdXJyZW50SGVpZ2h0O1xuICAgICAgdGhpcy50b3BBcHBCYXJIZWlnaHRfID0gY3VycmVudEhlaWdodDtcbiAgICB9XG4gICAgdGhpcy50b3BBcHBCYXJTY3JvbGxIYW5kbGVyXygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RvcEFwcEJhckZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ1RvcEFwcEJhckFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uIGZyb20gJy4vZml4ZWQvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDU2hvcnRUb3BBcHBCYXJGb3VuZGF0aW9uIGZyb20gJy4vc2hvcnQvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVG9wQXBwQmFyRm91bmRhdGlvbiBmcm9tICcuL3N0YW5kYXJkL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENDb21wb25lbnQ8IU1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUb3BBcHBCYXIgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgLyoqIEBwcml2YXRlIHs/RWxlbWVudH0gKi9cbiAgICB0aGlzLm5hdkljb25fO1xuICAgIC8qKiBAdHlwZSB7P0FycmF5PE1EQ1JpcHBsZT59ICovXG4gICAgdGhpcy5pY29uUmlwcGxlc187XG4gICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgdGhpcy5zY3JvbGxUYXJnZXRfO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShcbiAgICByaXBwbGVGYWN0b3J5ID0gKGVsKSA9PiBNRENSaXBwbGUuYXR0YWNoVG8oZWwpKSB7XG4gICAgdGhpcy5uYXZJY29uXyA9IHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihzdHJpbmdzLk5BVklHQVRJT05fSUNPTl9TRUxFQ1RPUik7XG5cbiAgICAvLyBHZXQgYWxsIGljb25zIGluIHRoZSB0b29sYmFyIGFuZCBpbnN0YW50aWF0ZSB0aGUgcmlwcGxlc1xuICAgIGNvbnN0IGljb25zID0gW10uc2xpY2UuY2FsbCh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyaW5ncy5BQ1RJT05fSVRFTV9TRUxFQ1RPUikpO1xuICAgIGlmICh0aGlzLm5hdkljb25fKSB7XG4gICAgICBpY29ucy5wdXNoKHRoaXMubmF2SWNvbl8pO1xuICAgIH1cblxuICAgIHRoaXMuaWNvblJpcHBsZXNfID0gaWNvbnMubWFwKChpY29uKSA9PiB7XG4gICAgICBjb25zdCByaXBwbGUgPSByaXBwbGVGYWN0b3J5KGljb24pO1xuICAgICAgcmlwcGxlLnVuYm91bmRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gcmlwcGxlO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmljb25SaXBwbGVzXy5mb3JFYWNoKChpY29uUmlwcGxlKSA9PiBpY29uUmlwcGxlLmRlc3Ryb3koKSk7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgc2V0U2Nyb2xsVGFyZ2V0KHRhcmdldCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveVNjcm9sbEhhbmRsZXIoKTtcbiAgICB0aGlzLnNjcm9sbFRhcmdldF8gPSB0YXJnZXQ7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0U2Nyb2xsSGFuZGxlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ1RvcEFwcEJhcn1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgcmV0dXJuIG5ldyBNRENUb3BBcHBCYXIocm9vdCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9ufVxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLyoqIEB0eXBlIHshTURDVG9wQXBwQmFyQWRhcHRlcn0gKi9cbiAgICBjb25zdCBhZGFwdGVyID0gLyoqIEB0eXBlIHshTURDVG9wQXBwQmFyQWRhcHRlcn0gKi8gKE9iamVjdC5hc3NpZ24oe1xuICAgICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSkgPT4gdGhpcy5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpLFxuICAgICAgZ2V0VG9wQXBwQmFySGVpZ2h0OiAoKSA9PiB0aGlzLnJvb3RfLmNsaWVudEhlaWdodCxcbiAgICAgIHJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm5hdkljb25fKSB7XG4gICAgICAgICAgdGhpcy5uYXZJY29uXy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3Rlck5hdmlnYXRpb25JY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5uYXZJY29uXykge1xuICAgICAgICAgIHRoaXMubmF2SWNvbl8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZDogKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoc3RyaW5ncy5OQVZJR0FUSU9OX0VWRU5ULCB7fSk7XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy5zY3JvbGxUYXJnZXRfLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclNjcm9sbEhhbmRsZXI6IChoYW5kbGVyKSA9PiB0aGlzLnNjcm9sbFRhcmdldF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlciksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGdldFZpZXdwb3J0U2Nyb2xsWTogKCkgPT5cbiAgICAgICAgdGhpcy5zY3JvbGxUYXJnZXRfW3RoaXMuc2Nyb2xsVGFyZ2V0XyA9PT0gd2luZG93ID8gJ3BhZ2VZT2Zmc2V0JyA6ICdzY3JvbGxUb3AnXSxcbiAgICAgIGdldFRvdGFsQWN0aW9uSXRlbXM6ICgpID0+XG4gICAgICAgIHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkFDVElPTl9JVEVNX1NFTEVDVE9SKS5sZW5ndGgsXG4gICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zY3JvbGxUYXJnZXRfID0gd2luZG93O1xuXG4gICAgLyoqIEB0eXBlIHshTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb259ICovXG4gICAgbGV0IGZvdW5kYXRpb247XG4gICAgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuU0hPUlRfQ0xBU1MpKSB7XG4gICAgICBmb3VuZGF0aW9uID0gbmV3IE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuRklYRURfQ0xBU1MpKSB7XG4gICAgICBmb3VuZGF0aW9uID0gbmV3IE1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm91bmRhdGlvbiA9IG5ldyBNRENUb3BBcHBCYXJGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZGF0aW9uO1xuICB9XG59XG5cbmV4cG9ydCB7TURDVG9wQXBwQmFyLCBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbixcbiAgTURDVG9wQXBwQmFyRm91bmRhdGlvbiwgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uLFxuICBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb259O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5Ub3BBcHBCYXIgPSBleHBvcnRzLlRvcEFwcEJhclRpdGxlID0gZXhwb3J0cy5Ub3BBcHBCYXJJY29uID0gZXhwb3J0cy5Ub3BBcHBCYXJTZWN0aW9uID0gZXhwb3J0cy5Ub3BBcHBCYXJSb3cgPSB2b2lkIDA7XG5cbnZhciBfZ2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfdHlwZW9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpKTtcblxudmFyIF90b3BBcHBCYXIgPSByZXF1aXJlKFwiQG1hdGVyaWFsL3RvcC1hcHAtYmFyXCIpO1xuXG52YXIgX2JpbmREZWNvcmF0b3IgPSByZXF1aXJlKFwiYmluZC1kZWNvcmF0b3JcIik7XG5cbnZhciBfcHJlYWN0ID0gcmVxdWlyZShcInByZWFjdFwiKTtcblxudmFyIF9NYXRlcmlhbENvbXBvbmVudDYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9CYXNlL01hdGVyaWFsQ29tcG9uZW50XCIpKTtcblxudmFyIF9fZGVjb3JhdGUgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19kZWNvcmF0ZSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsXG4gICAgICBkO1xuICBpZiAoKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMi5kZWZhdWx0KShSZWZsZWN0KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO2Vsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICB9XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuXG52YXIgVG9wQXBwQmFyUm93ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoVG9wQXBwQmFyUm93LCBfTWF0ZXJpYWxDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRvcEFwcEJhclJvdygpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBUb3BBcHBCYXJSb3cpO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShUb3BBcHBCYXJSb3cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzLmNvbXBvbmVudE5hbWUgPSAndG9wLWFwcC1iYXJfX3Jvdyc7XG4gICAgX3RoaXMubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShUb3BBcHBCYXJSb3csIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRvcEFwcEJhclJvdztcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5Ub3BBcHBCYXJSb3cgPSBUb3BBcHBCYXJSb3c7XG5cbnZhciBUb3BBcHBCYXJTZWN0aW9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRvcEFwcEJhclNlY3Rpb24sIF9NYXRlcmlhbENvbXBvbmVudDIpO1xuXG4gIGZ1bmN0aW9uIFRvcEFwcEJhclNlY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFRvcEFwcEJhclNlY3Rpb24pO1xuICAgIF90aGlzMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyU2VjdGlvbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMyLmNvbXBvbmVudE5hbWUgPSAndG9wLWFwcC1iYXJfX3NlY3Rpb24nO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFsnYWxpZ24tc3RhcnQnLCAnYWxpZ24tZW5kJ107XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFRvcEFwcEJhclNlY3Rpb24sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzZWN0aW9uXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9wQXBwQmFyU2VjdGlvbjtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5Ub3BBcHBCYXJTZWN0aW9uID0gVG9wQXBwQmFyU2VjdGlvbjtcblxudmFyIFRvcEFwcEJhckljb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoVG9wQXBwQmFySWNvbiwgX01hdGVyaWFsQ29tcG9uZW50Myk7XG5cbiAgZnVuY3Rpb24gVG9wQXBwQmFySWNvbigpIHtcbiAgICB2YXIgX3RoaXMzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgVG9wQXBwQmFySWNvbik7XG4gICAgX3RoaXMzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShUb3BBcHBCYXJJY29uKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczMuY29tcG9uZW50TmFtZSA9ICd0b3AtYXBwLWJhcl9faWNvbic7XG4gICAgX3RoaXMzLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFRvcEFwcEJhckljb24sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gcHJvcHMubmF2aWdhdGlvbiA/ICdtYXRlcmlhbC1pY29ucyBtZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbicgOiAnbWF0ZXJpYWwtaWNvbnMnO1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiYVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcbiAgICAgIH0sIHByb3BzKSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9wQXBwQmFySWNvbjtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5Ub3BBcHBCYXJJY29uID0gVG9wQXBwQmFySWNvbjtcblxudmFyIFRvcEFwcEJhclRpdGxlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRvcEFwcEJhclRpdGxlLCBfTWF0ZXJpYWxDb21wb25lbnQ0KTtcblxuICBmdW5jdGlvbiBUb3BBcHBCYXJUaXRsZSgpIHtcbiAgICB2YXIgX3RoaXM0O1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgVG9wQXBwQmFyVGl0bGUpO1xuICAgIF90aGlzNCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyVGl0bGUpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNC5jb21wb25lbnROYW1lID0gJ3RvcC1hcHAtYmFyX190aXRsZSc7XG4gICAgX3RoaXM0Lm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzNDtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFRvcEFwcEJhclRpdGxlLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwic3BhblwiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRvcEFwcEJhclRpdGxlO1xufShfTWF0ZXJpYWxDb21wb25lbnQ2LmRlZmF1bHQpO1xuXG5leHBvcnRzLlRvcEFwcEJhclRpdGxlID0gVG9wQXBwQmFyVGl0bGU7XG5cbnZhciBUb3BBcHBCYXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDUpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoVG9wQXBwQmFyLCBfTWF0ZXJpYWxDb21wb25lbnQ1KTtcblxuICBmdW5jdGlvbiBUb3BBcHBCYXIoKSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFRvcEFwcEJhcik7XG4gICAgX3RoaXM1ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShUb3BBcHBCYXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNS5jb21wb25lbnROYW1lID0gJ3RvcC1hcHAtYmFyJztcbiAgICBfdGhpczUubWRjUHJvcHMgPSBbJ3Nob3J0JywgJ3Nob3J0LWNvbGxhcHNlZCcsICdmaXhlZCcsICdwcm9taW5lbnQnXTtcbiAgICByZXR1cm4gX3RoaXM1O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoVG9wQXBwQmFyLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICgwLCBfZ2V0Mi5kZWZhdWx0KSgoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShUb3BBcHBCYXIucHJvdG90eXBlKSwgXCJjb21wb25lbnREaWRNb3VudFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgIHZhciBjb21wID0gbmV3IF90b3BBcHBCYXIuTURDVG9wQXBwQmFyKHRoaXMuY29udHJvbCk7XG4gICAgICAgIGNvbXAubGlzdGVuKCdNRENUb3BBcHBCYXI6bmF2JywgdGhpcy5vbk5hdik7XG4gICAgICAgIHRoaXMuTURDb21wb25lbnQgPSBjb21wO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICgwLCBfZ2V0Mi5kZWZhdWx0KSgoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShUb3BBcHBCYXIucHJvdG90eXBlKSwgXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5NRENvbXBvbmVudCkge1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50LnVubGlzdGVuKCdNRENUb3BBcHBCYXI6bmF2JywgdGhpcy5vbk5hdik7XG4gICAgICAgIHRoaXMuTURDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbk5hdlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk5hdihlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbk5hdikge1xuICAgICAgICB0aGlzLnByb3BzLm9uTmF2KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiaGVhZGVyXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSwgcHJvcHMpLCBwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb3BBcHBCYXI7XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuVG9wQXBwQmFyID0gVG9wQXBwQmFyO1xuXG5fX2RlY29yYXRlKFtfYmluZERlY29yYXRvci5iaW5kXSwgVG9wQXBwQmFyLnByb3RvdHlwZSwgXCJvbk5hdlwiLCBudWxsKTtcblxudmFyIGRlZmF1bHRfMSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1RvcEFwcEJhcikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShkZWZhdWx0XzEsIF9Ub3BBcHBCYXIpO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRfMSgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBkZWZhdWx0XzEpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKGRlZmF1bHRfMSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdF8xO1xufShUb3BBcHBCYXIpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5kZWZhdWx0XzEuU2VjdGlvbiA9IFRvcEFwcEJhclNlY3Rpb247XG5kZWZhdWx0XzEuSWNvbiA9IFRvcEFwcEJhckljb247XG5kZWZhdWx0XzEuVGl0bGUgPSBUb3BBcHBCYXJUaXRsZTtcbmRlZmF1bHRfMS5Sb3cgPSBUb3BBcHBCYXJSb3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCc7XHJcbmltcG9ydCBUb3BBcHBCYXIgZnJvbSAncHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvVG9wQXBwQmFyJztcclxuaW1wb3J0ICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9Ub3BBcHBCYXIvc3R5bGUuY3NzJztcclxuaW1wb3J0ICcuL2FwcC1zaGVsbC5jc3MnXHJcblxyXG5jb25zdCBUb3BBcHBCYXJOYXYgPSAoe3RvZ2dsZSxzZXRUb2dnbGUsdGl0bGV9KT0+IHtcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgXHJcbiAgICAgICAgPFRvcEFwcEJhciBjbGFzc05hbWU9XCJ0b3BhcHBiYXIgZml4ZWQgdG9wLWJhclwiIG9uTmF2PXsoKT0+e3NldFRvZ2dsZSghdG9nZ2xlKX19PlxyXG4gICAgICAgICAgICA8VG9wQXBwQmFyLlJvdz5cclxuICAgICAgICAgICAgICA8VG9wQXBwQmFyLlNlY3Rpb24gYWxpZ24tc3RhcnQ+XHJcbiAgICAgICAgICAgICAgICA8VG9wQXBwQmFyLkljb24gbmF2aWdhdGlvbj5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz48cGF0aCBkPVwiTTMgMThoMTh2LTJIM3Yyem0wLTVoMTh2LTJIM3Yyem0wLTd2MmgxOFY2SDN6XCIgLz48L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvVG9wQXBwQmFyLkljb24+XHJcbiAgICAgICAgICAgICAgICA8VG9wQXBwQmFyLlRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICB7dGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8L1RvcEFwcEJhci5UaXRsZT5cclxuICAgICAgICAgICAgICA8L1RvcEFwcEJhci5TZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxUb3BBcHBCYXIuU2VjdGlvbiBhbGlnbi1lbmQ+XHJcbiAgICAgICAgICAgICAgICA8VG9wQXBwQmFyLkljb24+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+PHBhdGggZD1cIk0xMiA4YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnptMCAyYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptMCA2Yy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnpcIiAvPjwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9Ub3BBcHBCYXIuSWNvbj5cclxuICAgICAgICAgICAgICA8L1RvcEFwcEJhci5TZWN0aW9uPlxyXG4gICAgICAgICAgICA8L1RvcEFwcEJhci5Sb3c+XHJcbiAgICAgICAgPC9Ub3BBcHBCYXI+XHJcbiAgXHJcbiAgICApO1xyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBCYXJOYXYiLCJpbXBvcnQgeyBDb21wb25lbnQsIGNsb25lRWxlbWVudCwgY3JlYXRlRWxlbWVudCwgdG9DaGlsZEFycmF5IH0gZnJvbSAncHJlYWN0JztcblxudmFyIEVNUFRZJDEgPSB7fTtcblxuZnVuY3Rpb24gYXNzaWduKG9iaiwgcHJvcHMpIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGd1YXJkLWZvci1pblxuXHRmb3IgKHZhciBpIGluIHByb3BzKSB7XG5cdFx0b2JqW2ldID0gcHJvcHNbaV07XG5cdH1cblx0cmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZXhlYyh1cmwsIHJvdXRlLCBvcHRzKSB7XG5cdHZhciByZWcgPSAvKD86XFw/KFteI10qKSk/KCMuKik/JC8sXG5cdFx0YyA9IHVybC5tYXRjaChyZWcpLFxuXHRcdG1hdGNoZXMgPSB7fSxcblx0XHRyZXQ7XG5cdGlmIChjICYmIGNbMV0pIHtcblx0XHR2YXIgcCA9IGNbMV0uc3BsaXQoJyYnKTtcblx0XHRmb3IgKHZhciBpPTA7IGk8cC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHIgPSBwW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRtYXRjaGVzW2RlY29kZVVSSUNvbXBvbmVudChyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQoci5zbGljZSgxKS5qb2luKCc9JykpO1xuXHRcdH1cblx0fVxuXHR1cmwgPSBzZWdtZW50aXplKHVybC5yZXBsYWNlKHJlZywgJycpKTtcblx0cm91dGUgPSBzZWdtZW50aXplKHJvdXRlIHx8ICcnKTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHVybC5sZW5ndGgsIHJvdXRlLmxlbmd0aCk7XG5cdGZvciAodmFyIGkkMT0wOyBpJDE8bWF4OyBpJDErKykge1xuXHRcdGlmIChyb3V0ZVtpJDFdICYmIHJvdXRlW2kkMV0uY2hhckF0KDApPT09JzonKSB7XG5cdFx0XHR2YXIgcGFyYW0gPSByb3V0ZVtpJDFdLnJlcGxhY2UoLyheOnxbKyo/XSskKS9nLCAnJyksXG5cdFx0XHRcdGZsYWdzID0gKHJvdXRlW2kkMV0ubWF0Y2goL1srKj9dKyQvKSB8fCBFTVBUWSQxKVswXSB8fCAnJyxcblx0XHRcdFx0cGx1cyA9IH5mbGFncy5pbmRleE9mKCcrJyksXG5cdFx0XHRcdHN0YXIgPSB+ZmxhZ3MuaW5kZXhPZignKicpLFxuXHRcdFx0XHR2YWwgPSB1cmxbaSQxXSB8fCAnJztcblx0XHRcdGlmICghdmFsICYmICFzdGFyICYmIChmbGFncy5pbmRleE9mKCc/Jyk8MCB8fCBwbHVzKSkge1xuXHRcdFx0XHRyZXQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVzW3BhcmFtXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXHRcdFx0aWYgKHBsdXMgfHwgc3Rhcikge1xuXHRcdFx0XHRtYXRjaGVzW3BhcmFtXSA9IHVybC5zbGljZShpJDEpLm1hcChkZWNvZGVVUklDb21wb25lbnQpLmpvaW4oJy8nKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJvdXRlW2kkMV0hPT11cmxbaSQxXSkge1xuXHRcdFx0cmV0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0aWYgKG9wdHMuZGVmYXVsdCE9PXRydWUgJiYgcmV0PT09ZmFsc2UpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHJldHVybiBtYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBwYXRoUmFua1NvcnQoYSwgYikge1xuXHRyZXR1cm4gKFxuXHRcdChhLnJhbmsgPCBiLnJhbmspID8gMSA6XG5cdFx0XHQoYS5yYW5rID4gYi5yYW5rKSA/IC0xIDpcblx0XHRcdFx0KGEuaW5kZXggLSBiLmluZGV4KVxuXHQpO1xufVxuXG4vLyBmaWx0ZXIgb3V0IFZOb2RlcyB3aXRob3V0IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB1bnJhbmtlYWJsZSksIGFuZCBhZGQgYGluZGV4YC9gcmFua2AgcHJvcGVydGllcyB0byBiZSB1c2VkIGluIHNvcnRpbmcuXG5mdW5jdGlvbiBwcmVwYXJlVk5vZGVGb3JSYW5raW5nKHZub2RlLCBpbmRleCkge1xuXHR2bm9kZS5pbmRleCA9IGluZGV4O1xuXHR2bm9kZS5yYW5rID0gcmFua0NoaWxkKHZub2RlKTtcblx0cmV0dXJuIHZub2RlLnByb3BzO1xufVxuXG5mdW5jdGlvbiBzZWdtZW50aXplKHVybCkge1xuXHRyZXR1cm4gdXJsLnJlcGxhY2UoLyheXFwvK3xcXC8rJCkvZywgJycpLnNwbGl0KCcvJyk7XG59XG5cbmZ1bmN0aW9uIHJhbmtTZWdtZW50KHNlZ21lbnQpIHtcblx0cmV0dXJuIHNlZ21lbnQuY2hhckF0KDApPT0nOicgPyAoMSArICcqKz8nLmluZGV4T2Yoc2VnbWVudC5jaGFyQXQoc2VnbWVudC5sZW5ndGgtMSkpKSB8fCA0IDogNTtcbn1cblxuZnVuY3Rpb24gcmFuayhwYXRoKSB7XG5cdHJldHVybiBzZWdtZW50aXplKHBhdGgpLm1hcChyYW5rU2VnbWVudCkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHJhbmtDaGlsZCh2bm9kZSkge1xuXHRyZXR1cm4gdm5vZGUucHJvcHMuZGVmYXVsdCA/IDAgOiByYW5rKHZub2RlLnByb3BzLnBhdGgpO1xufVxuXG52YXIgY3VzdG9tSGlzdG9yeSA9IG51bGw7XG5cbnZhciBST1VURVJTID0gW107XG5cbnZhciBzdWJzY3JpYmVycyA9IFtdO1xuXG52YXIgRU1QVFkgPSB7fTtcblxuZnVuY3Rpb24gc2V0VXJsKHVybCwgdHlwZSkge1xuXHRpZiAoIHR5cGUgPT09IHZvaWQgMCApIHR5cGU9J3B1c2gnO1xuXG5cdGlmIChjdXN0b21IaXN0b3J5ICYmIGN1c3RvbUhpc3RvcnlbdHlwZV0pIHtcblx0XHRjdXN0b21IaXN0b3J5W3R5cGVdKHVybCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGhpc3RvcnkhPT0ndW5kZWZpbmVkJyAmJiBoaXN0b3J5W3R5cGUrJ1N0YXRlJ10pIHtcblx0XHRoaXN0b3J5W3R5cGUrJ1N0YXRlJ10obnVsbCwgbnVsbCwgdXJsKTtcblx0fVxufVxuXG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRVcmwoKSB7XG5cdHZhciB1cmw7XG5cdGlmIChjdXN0b21IaXN0b3J5ICYmIGN1c3RvbUhpc3RvcnkubG9jYXRpb24pIHtcblx0XHR1cmwgPSBjdXN0b21IaXN0b3J5LmxvY2F0aW9uO1xuXHR9XG5cdGVsc2UgaWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeS5nZXRDdXJyZW50TG9jYXRpb24pIHtcblx0XHR1cmwgPSBjdXN0b21IaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbigpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHVybCA9IHR5cGVvZiBsb2NhdGlvbiE9PSd1bmRlZmluZWQnID8gbG9jYXRpb24gOiBFTVBUWTtcblx0fVxuXHRyZXR1cm4gKFwiXCIgKyAodXJsLnBhdGhuYW1lIHx8ICcnKSArICh1cmwuc2VhcmNoIHx8ICcnKSk7XG59XG5cblxuXG5mdW5jdGlvbiByb3V0ZSh1cmwsIHJlcGxhY2UpIHtcblx0aWYgKCByZXBsYWNlID09PSB2b2lkIDAgKSByZXBsYWNlPWZhbHNlO1xuXG5cdGlmICh0eXBlb2YgdXJsIT09J3N0cmluZycgJiYgdXJsLnVybCkge1xuXHRcdHJlcGxhY2UgPSB1cmwucmVwbGFjZTtcblx0XHR1cmwgPSB1cmwudXJsO1xuXHR9XG5cblx0Ly8gb25seSBwdXNoIFVSTCBpbnRvIGhpc3RvcnkgaWYgd2UgY2FuIGhhbmRsZSBpdFxuXHRpZiAoY2FuUm91dGUodXJsKSkge1xuXHRcdHNldFVybCh1cmwsIHJlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCcpO1xuXHR9XG5cblx0cmV0dXJuIHJvdXRlVG8odXJsKTtcbn1cblxuXG4vKiogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBjYW4gYmUgaGFuZGxlZCBieSBhbnkgcm91dGVyIGluc3RhbmNlcy4gKi9cbmZ1bmN0aW9uIGNhblJvdXRlKHVybCkge1xuXHRmb3IgKHZhciBpPVJPVVRFUlMubGVuZ3RoOyBpLS07ICkge1xuXHRcdGlmIChST1VURVJTW2ldLmNhblJvdXRlKHVybCkpIHsgcmV0dXJuIHRydWU7IH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqIFRlbGwgYWxsIHJvdXRlciBpbnN0YW5jZXMgdG8gaGFuZGxlIHRoZSBnaXZlbiBVUkwuICAqL1xuZnVuY3Rpb24gcm91dGVUbyh1cmwpIHtcblx0dmFyIGRpZFJvdXRlID0gZmFsc2U7XG5cdGZvciAodmFyIGk9MDsgaTxST1VURVJTLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKFJPVVRFUlNbaV0ucm91dGVUbyh1cmwpPT09dHJ1ZSkge1xuXHRcdFx0ZGlkUm91dGUgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHRmb3IgKHZhciBpJDE9c3Vic2NyaWJlcnMubGVuZ3RoOyBpJDEtLTsgKSB7XG5cdFx0c3Vic2NyaWJlcnNbaSQxXSh1cmwpO1xuXHR9XG5cdHJldHVybiBkaWRSb3V0ZTtcbn1cblxuXG5mdW5jdGlvbiByb3V0ZUZyb21MaW5rKG5vZGUpIHtcblx0Ly8gb25seSB2YWxpZCBlbGVtZW50c1xuXHRpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0QXR0cmlidXRlKSB7IHJldHVybjsgfVxuXG5cdHZhciBocmVmID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcblx0XHR0YXJnZXQgPSBub2RlLmdldEF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG5cblx0Ly8gaWdub3JlIGxpbmtzIHdpdGggdGFyZ2V0cyBhbmQgbm9uLXBhdGggVVJMc1xuXHRpZiAoIWhyZWYgfHwgIWhyZWYubWF0Y2goL15cXC8vZykgfHwgKHRhcmdldCAmJiAhdGFyZ2V0Lm1hdGNoKC9eXz9zZWxmJC9pKSkpIHsgcmV0dXJuOyB9XG5cblx0Ly8gYXR0ZW1wdCB0byByb3V0ZSwgaWYgbm8gbWF0Y2ggc2ltcGx5IGNlZGUgY29udHJvbCB0byBicm93c2VyXG5cdHJldHVybiByb3V0ZShocmVmKTtcbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVMaW5rQ2xpY2soZSkge1xuXHRpZiAoZS5idXR0b249PTApIHtcblx0XHRyb3V0ZUZyb21MaW5rKGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldCB8fCB0aGlzKTtcblx0XHRyZXR1cm4gcHJldmVudChlKTtcblx0fVxufVxuXG5cbmZ1bmN0aW9uIHByZXZlbnQoZSkge1xuXHRpZiAoZSkge1xuXHRcdGlmIChlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikgeyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpOyB9XG5cdFx0aWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH1cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5cbmZ1bmN0aW9uIGRlbGVnYXRlTGlua0hhbmRsZXIoZSkge1xuXHQvLyBpZ25vcmUgZXZlbnRzIHRoZSBicm93c2VyIHRha2VzIGNhcmUgb2YgYWxyZWFkeTpcblx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmJ1dHRvbiE9PTApIHsgcmV0dXJuOyB9XG5cblx0dmFyIHQgPSBlLnRhcmdldDtcblx0ZG8ge1xuXHRcdGlmIChTdHJpbmcodC5ub2RlTmFtZSkudG9VcHBlckNhc2UoKT09PSdBJyAmJiB0LmdldEF0dHJpYnV0ZSgnaHJlZicpKSB7XG5cdFx0XHRpZiAodC5oYXNBdHRyaWJ1dGUoJ25hdGl2ZScpKSB7IHJldHVybjsgfVxuXHRcdFx0Ly8gaWYgbGluayBpcyBoYW5kbGVkIGJ5IHRoZSByb3V0ZXIsIHByZXZlbnQgYnJvd3NlciBkZWZhdWx0c1xuXHRcdFx0aWYgKHJvdXRlRnJvbUxpbmsodCkpIHtcblx0XHRcdFx0cmV0dXJuIHByZXZlbnQoZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IHdoaWxlICgodD10LnBhcmVudE5vZGUpKTtcbn1cblxuXG52YXIgZXZlbnRMaXN0ZW5lcnNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XG5cdGlmIChldmVudExpc3RlbmVyc0luaXRpYWxpemVkKSB7IHJldHVybjsgfVxuXG5cdGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lcj09PSdmdW5jdGlvbicpIHtcblx0XHRpZiAoIWN1c3RvbUhpc3RvcnkpIHtcblx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyb3V0ZVRvKGdldEN1cnJlbnRVcmwoKSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0YWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxlZ2F0ZUxpbmtIYW5kbGVyKTtcblx0fVxuXHRldmVudExpc3RlbmVyc0luaXRpYWxpemVkID0gdHJ1ZTtcbn1cblxuXG52YXIgUm91dGVyID0gKGZ1bmN0aW9uIChDb21wb25lbnQkJDEpIHtcblx0ZnVuY3Rpb24gUm91dGVyKHByb3BzKSB7XG5cdFx0Q29tcG9uZW50JCQxLmNhbGwodGhpcywgcHJvcHMpO1xuXHRcdGlmIChwcm9wcy5oaXN0b3J5KSB7XG5cdFx0XHRjdXN0b21IaXN0b3J5ID0gcHJvcHMuaGlzdG9yeTtcblx0XHR9XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0dXJsOiBwcm9wcy51cmwgfHwgZ2V0Q3VycmVudFVybCgpXG5cdFx0fTtcblxuXHRcdGluaXRFdmVudExpc3RlbmVycygpO1xuXHR9XG5cblx0aWYgKCBDb21wb25lbnQkJDEgKSBSb3V0ZXIuX19wcm90b19fID0gQ29tcG9uZW50JCQxO1xuXHRSb3V0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29tcG9uZW50JCQxICYmIENvbXBvbmVudCQkMS5wcm90b3R5cGUgKTtcblx0Um91dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJvdXRlcjtcblxuXHRSb3V0ZXIucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSAocHJvcHMpIHtcblx0XHRpZiAocHJvcHMuc3RhdGljIT09dHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdHJldHVybiBwcm9wcy51cmwhPT10aGlzLnByb3BzLnVybCB8fCBwcm9wcy5vbkNoYW5nZSE9PXRoaXMucHJvcHMub25DaGFuZ2U7XG5cdH07XG5cblx0LyoqIENoZWNrIGlmIHRoZSBnaXZlbiBVUkwgY2FuIGJlIG1hdGNoZWQgYWdhaW5zdCBhbnkgY2hpbGRyZW4gKi9cblx0Um91dGVyLnByb3RvdHlwZS5jYW5Sb3V0ZSA9IGZ1bmN0aW9uIGNhblJvdXRlICh1cmwpIHtcblx0XHR2YXIgY2hpbGRyZW4gPSB0b0NoaWxkQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWF0Y2hpbmdDaGlsZHJlbihjaGlsZHJlbiwgdXJsLCBmYWxzZSkubGVuZ3RoID4gMDtcblx0fTtcblxuXHQvKiogUmUtcmVuZGVyIGNoaWxkcmVuIHdpdGggYSBuZXcgVVJMIHRvIG1hdGNoIGFnYWluc3QuICovXG5cdFJvdXRlci5wcm90b3R5cGUucm91dGVUbyA9IGZ1bmN0aW9uIHJvdXRlVG8gKHVybCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB1cmw6IHVybCB9KTtcblxuXHRcdHZhciBkaWRSb3V0ZSA9IHRoaXMuY2FuUm91dGUodXJsKTtcblxuXHRcdC8vIHRyaWdnZXIgYSBtYW51YWwgcmUtcm91dGUgaWYgd2UncmUgbm90IGluIHRoZSBtaWRkbGUgb2YgYW4gdXBkYXRlOlxuXHRcdGlmICghdGhpcy51cGRhdGluZykgeyB0aGlzLmZvcmNlVXBkYXRlKCk7IH1cblxuXHRcdHJldHVybiBkaWRSb3V0ZTtcblx0fTtcblxuXHRSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cdFx0Uk9VVEVSUy5wdXNoKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0XHRpZiAoY3VzdG9tSGlzdG9yeSkge1xuXHRcdFx0dGhpcy51bmxpc3RlbiA9IGN1c3RvbUhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuXHRcdFx0XHR0aGlzJDEucm91dGVUbygoXCJcIiArIChsb2NhdGlvbi5wYXRobmFtZSB8fCAnJykgKyAobG9jYXRpb24uc2VhcmNoIHx8ICcnKSkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcblx0fTtcblxuXHRSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy51bmxpc3Rlbj09PSdmdW5jdGlvbicpIHsgdGhpcy51bmxpc3RlbigpOyB9XG5cdFx0Uk9VVEVSUy5zcGxpY2UoUk9VVEVSUy5pbmRleE9mKHRoaXMpLCAxKTtcblx0fTtcblxuXHRSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlICgpIHtcblx0XHR0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcblx0fTtcblxuXHRSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cdFx0dGhpcy51cGRhdGluZyA9IGZhbHNlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuZ2V0TWF0Y2hpbmdDaGlsZHJlbiA9IGZ1bmN0aW9uIGdldE1hdGNoaW5nQ2hpbGRyZW4gKGNoaWxkcmVuLCB1cmwsIGludm9rZSkge1xuXHRcdHJldHVybiBjaGlsZHJlblxuXHRcdFx0LmZpbHRlcihwcmVwYXJlVk5vZGVGb3JSYW5raW5nKVxuXHRcdFx0LnNvcnQocGF0aFJhbmtTb3J0KVxuXHRcdFx0Lm1hcCggZnVuY3Rpb24gKHZub2RlKSB7XG5cdFx0XHRcdHZhciBtYXRjaGVzID0gZXhlYyh1cmwsIHZub2RlLnByb3BzLnBhdGgsIHZub2RlLnByb3BzKTtcblx0XHRcdFx0aWYgKG1hdGNoZXMpIHtcblx0XHRcdFx0XHRpZiAoaW52b2tlICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0dmFyIG5ld1Byb3BzID0geyB1cmw6IHVybCwgbWF0Y2hlczogbWF0Y2hlcyB9O1xuXHRcdFx0XHRcdFx0YXNzaWduKG5ld1Byb3BzLCBtYXRjaGVzKTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBuZXdQcm9wcy5yZWY7XG5cdFx0XHRcdFx0XHRkZWxldGUgbmV3UHJvcHMua2V5O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNsb25lRWxlbWVudCh2bm9kZSwgbmV3UHJvcHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdm5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZpbHRlcihCb29sZWFuKTtcblx0fTtcblxuXHRSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAocmVmLCByZWYkMSkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHJlZi5jaGlsZHJlbjtcblx0XHR2YXIgb25DaGFuZ2UgPSByZWYub25DaGFuZ2U7XG5cdFx0dmFyIHVybCA9IHJlZiQxLnVybDtcblxuXHRcdHZhciBhY3RpdmUgPSB0aGlzLmdldE1hdGNoaW5nQ2hpbGRyZW4odG9DaGlsZEFycmF5KGNoaWxkcmVuKSwgdXJsLCB0cnVlKTtcblxuXHRcdHZhciBjdXJyZW50ID0gYWN0aXZlWzBdIHx8IG51bGw7XG5cblx0XHR2YXIgcHJldmlvdXMgPSB0aGlzLnByZXZpb3VzVXJsO1xuXHRcdGlmICh1cmwhPT1wcmV2aW91cykge1xuXHRcdFx0dGhpcy5wcmV2aW91c1VybCA9IHVybDtcblx0XHRcdGlmICh0eXBlb2Ygb25DaGFuZ2U9PT0nZnVuY3Rpb24nKSB7XG5cdFx0XHRcdG9uQ2hhbmdlKHtcblx0XHRcdFx0XHRyb3V0ZXI6IHRoaXMsXG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0cHJldmlvdXM6IHByZXZpb3VzLFxuXHRcdFx0XHRcdGFjdGl2ZTogYWN0aXZlLFxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdH07XG5cblx0cmV0dXJuIFJvdXRlcjtcbn0oQ29tcG9uZW50KSk7XG5cbnZhciBMaW5rID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAoXG5cdGNyZWF0ZUVsZW1lbnQoJ2EnLCBhc3NpZ24oeyBvbkNsaWNrOiBoYW5kbGVMaW5rQ2xpY2sgfSwgcHJvcHMpKVxuKTsgfTtcblxudmFyIFJvdXRlID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHByb3BzLmNvbXBvbmVudCwgcHJvcHMpOyB9O1xuXG5Sb3V0ZXIuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycztcblJvdXRlci5nZXRDdXJyZW50VXJsID0gZ2V0Q3VycmVudFVybDtcblJvdXRlci5yb3V0ZSA9IHJvdXRlO1xuUm91dGVyLlJvdXRlciA9IFJvdXRlcjtcblJvdXRlci5Sb3V0ZSA9IFJvdXRlO1xuUm91dGVyLkxpbmsgPSBMaW5rO1xuXG5leHBvcnQgeyBzdWJzY3JpYmVycywgZ2V0Q3VycmVudFVybCwgcm91dGUsIFJvdXRlciwgUm91dGUsIExpbmssIGV4ZWMgfTtleHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3Qtcm91dGVyLmVzLmpzLm1hcFxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ3ByZWFjdCcpKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ3ByZWFjdCddLCBmYWN0b3J5KSA6XG5cdChnbG9iYWxbJ3ByZWFjdC1hc3luYy1yb3V0ZSddID0gZmFjdG9yeShnbG9iYWwucHJlYWN0KSk7XG59KHRoaXMsIChmdW5jdGlvbiAocHJlYWN0KSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQXN5bmNSb3V0ZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG5cdF9pbmhlcml0cyhBc3luY1JvdXRlLCBfQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBBc3luY1JvdXRlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3luY1JvdXRlKTtcblxuXHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzKSk7XG5cblx0XHRfdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGNvbXBvbmVudERhdGE6IG51bGxcblx0XHR9O1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdEFzeW5jUm91dGUucHJvdG90eXBlLmxvYWRDb21wb25lbnQgPSBmdW5jdGlvbiBsb2FkQ29tcG9uZW50KCkge1xuXHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGNvbXBvbmVudERhdGE6IHRoaXMucHJvcHMuY29tcG9uZW50XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dmFyIGNvbXBvbmVudERhdGEgPSB0aGlzLnByb3BzLmdldENvbXBvbmVudCh0aGlzLnByb3BzLnVybCwgZnVuY3Rpb24gKF9yZWYpIHtcblx0XHRcdHZhciBjb21wb25lbnQgPSBfcmVmLmNvbXBvbmVudDtcblxuXHRcdFx0Ly8gTmFtZWQgcGFyYW0gZm9yIG1ha2luZyBjYWxsYmFjayBmdXR1cmUgcHJvb2Zcblx0XHRcdGlmIChjb21wb25lbnQpIHtcblx0XHRcdFx0X3RoaXMyLnNldFN0YXRlKHtcblx0XHRcdFx0XHRjb21wb25lbnREYXRhOiBjb21wb25lbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHRoaXMucHJvcHMubWF0Y2hlcykpO1xuXG5cdFx0Ly8gSW4gY2FzZSByZXR1cm5lZCB2YWx1ZSB3YXMgYSBwcm9taXNlXG5cdFx0aWYgKGNvbXBvbmVudERhdGEgJiYgY29tcG9uZW50RGF0YS50aGVuKSB7XG5cdFx0XHQvLyBJSUZFIHRvIGNoZWNrIGlmIGEgbGF0ZXIgZW5kaW5nIHByb21pc2Ugd2FzIGNyZWF0aW5nIGEgcmFjZSBjb25kaXRpb25cblx0XHRcdC8vIENoZWNrIHRlc3QgY2FzZSBmb3IgbW9yZSBpbmZvXG5cdFx0XHQoZnVuY3Rpb24gKHVybCkge1xuXHRcdFx0XHRjb21wb25lbnREYXRhLnRoZW4oZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHRcdFx0XHRcdGlmICh1cmwgIT09IF90aGlzMi5wcm9wcy51cmwpIHtcblx0XHRcdFx0XHRcdF90aGlzMi5zZXRTdGF0ZSh7IGNvbXBvbmVudERhdGE6IG51bGwgfSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRfdGhpczIubG9hZENvbXBvbmVudCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF90aGlzMi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRjb21wb25lbnREYXRhOiBjb21wb25lbnRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KSh0aGlzLnByb3BzLnVybCk7XG5cdFx0fVxuXHR9O1xuXG5cdEFzeW5jUm91dGUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMucGF0aCAmJiB0aGlzLnByb3BzLnBhdGggIT09IG5leHRQcm9wcy5wYXRoKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y29tcG9uZW50RGF0YTogbnVsbFxuXHRcdFx0fSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfdGhpczMubG9hZENvbXBvbmVudCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdEFzeW5jUm91dGUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHR0aGlzLmxvYWRDb21wb25lbnQoKTtcblx0fTtcblxuXHRBc3luY1JvdXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY29tcG9uZW50RGF0YSkge1xuXHRcdFx0cmV0dXJuIHByZWFjdC5oKHRoaXMuc3RhdGUuY29tcG9uZW50RGF0YSwgdGhpcy5wcm9wcyk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmxvYWRpbmcpIHtcblx0XHRcdHZhciBsb2FkaW5nQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5sb2FkaW5nKCk7XG5cdFx0XHRyZXR1cm4gbG9hZGluZ0NvbXBvbmVudDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG5cblx0cmV0dXJuIEFzeW5jUm91dGU7XG59KHByZWFjdC5Db21wb25lbnQpO1xuXG5yZXR1cm4gQXN5bmNSb3V0ZTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiZXhwb3J0IGRlZmF1bHQgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbi8vIGJhc2VkIG9mZiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXByb2Nlc3MvYmxvYi9tYXN0ZXIvYnJvd3Nlci5qc1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbnZhciBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuaWYgKHR5cGVvZiBnbG9iYWwuc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xufVxuaWYgKHR5cGVvZiBnbG9iYWwuY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xufVxuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn1cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5leHBvcnQgdmFyIHRpdGxlID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBwbGF0Zm9ybSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgYnJvd3NlciA9IHRydWU7XG5leHBvcnQgdmFyIGVudiA9IHt9O1xuZXhwb3J0IHZhciBhcmd2ID0gW107XG5leHBvcnQgdmFyIHZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbmV4cG9ydCB2YXIgdmVyc2lvbnMgPSB7fTtcbmV4cG9ydCB2YXIgcmVsZWFzZSA9IHt9O1xuZXhwb3J0IHZhciBjb25maWcgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmV4cG9ydCB2YXIgb24gPSBub29wO1xuZXhwb3J0IHZhciBhZGRMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIG9uY2UgPSBub29wO1xuZXhwb3J0IHZhciBvZmYgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5leHBvcnQgdmFyIGVtaXQgPSBub29wO1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZyhuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3dkICgpIHsgcmV0dXJuICcvJyB9XG5leHBvcnQgZnVuY3Rpb24gY2hkaXIgKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHVtYXNrKCkgeyByZXR1cm4gMDsgfVxuXG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9rdW1hdmlzL2Jyb3dzZXItcHJvY2Vzcy1ocnRpbWUvYmxvYi9tYXN0ZXIvaW5kZXguanNcbnZhciBwZXJmb3JtYW5jZSA9IGdsb2JhbC5wZXJmb3JtYW5jZSB8fCB7fVxudmFyIHBlcmZvcm1hbmNlTm93ID1cbiAgcGVyZm9ybWFuY2Uubm93ICAgICAgICB8fFxuICBwZXJmb3JtYW5jZS5tb3pOb3cgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1zTm93ICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uub05vdyAgICAgICB8fFxuICBwZXJmb3JtYW5jZS53ZWJraXROb3cgIHx8XG4gIGZ1bmN0aW9uKCl7IHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpIH1cblxuLy8gZ2VuZXJhdGUgdGltZXN0YW1wIG9yIGRlbHRhXG4vLyBzZWUgaHR0cDovL25vZGVqcy5vcmcvYXBpL3Byb2Nlc3MuaHRtbCNwcm9jZXNzX3Byb2Nlc3NfaHJ0aW1lXG5leHBvcnQgZnVuY3Rpb24gaHJ0aW1lKHByZXZpb3VzVGltZXN0YW1wKXtcbiAgdmFyIGNsb2NrdGltZSA9IHBlcmZvcm1hbmNlTm93LmNhbGwocGVyZm9ybWFuY2UpKjFlLTNcbiAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKGNsb2NrdGltZSlcbiAgdmFyIG5hbm9zZWNvbmRzID0gTWF0aC5mbG9vcigoY2xvY2t0aW1lJTEpKjFlOSlcbiAgaWYgKHByZXZpb3VzVGltZXN0YW1wKSB7XG4gICAgc2Vjb25kcyA9IHNlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFswXVxuICAgIG5hbm9zZWNvbmRzID0gbmFub3NlY29uZHMgLSBwcmV2aW91c1RpbWVzdGFtcFsxXVxuICAgIGlmIChuYW5vc2Vjb25kczwwKSB7XG4gICAgICBzZWNvbmRzLS1cbiAgICAgIG5hbm9zZWNvbmRzICs9IDFlOVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3NlY29uZHMsbmFub3NlY29uZHNdXG59XG5cbnZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuZXhwb3J0IGZ1bmN0aW9uIHVwdGltZSgpIHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcbiAgdmFyIGRpZiA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4gZGlmIC8gMTAwMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuZXh0VGljazogbmV4dFRpY2ssXG4gIHRpdGxlOiB0aXRsZSxcbiAgYnJvd3NlcjogYnJvd3NlcixcbiAgZW52OiBlbnYsXG4gIGFyZ3Y6IGFyZ3YsXG4gIHZlcnNpb246IHZlcnNpb24sXG4gIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgb246IG9uLFxuICBhZGRMaXN0ZW5lcjogYWRkTGlzdGVuZXIsXG4gIG9uY2U6IG9uY2UsXG4gIG9mZjogb2ZmLFxuICByZW1vdmVMaXN0ZW5lcjogcmVtb3ZlTGlzdGVuZXIsXG4gIHJlbW92ZUFsbExpc3RlbmVyczogcmVtb3ZlQWxsTGlzdGVuZXJzLFxuICBlbWl0OiBlbWl0LFxuICBiaW5kaW5nOiBiaW5kaW5nLFxuICBjd2Q6IGN3ZCxcbiAgY2hkaXI6IGNoZGlyLFxuICB1bWFzazogdW1hc2ssXG4gIGhydGltZTogaHJ0aW1lLFxuICBwbGF0Zm9ybTogcGxhdGZvcm0sXG4gIHJlbGVhc2U6IHJlbGVhc2UsXG4gIGNvbmZpZzogY29uZmlnLFxuICB1cHRpbWU6IHVwdGltZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bywgZnJvbSkge1xuICBpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSBmcm9tID0gJyc7XG5cbiAgdmFyIHRvUGFydHMgPSAodG8gJiYgdG8uc3BsaXQoJy8nKSkgfHwgW107XG4gIHZhciBmcm9tUGFydHMgPSAoZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2g7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG5cbiAgaWYgKFxuICAgIG11c3RFbmRBYnMgJiZcbiAgICBmcm9tUGFydHNbMF0gIT09ICcnICYmXG4gICAgKCFmcm9tUGFydHNbMF0gfHwgIWlzQWJzb2x1dGUoZnJvbVBhcnRzWzBdKSlcbiAgKVxuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcnKTtcblxuICB2YXIgcmVzdWx0ID0gZnJvbVBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiByZXN1bHQuc3Vic3RyKC0xKSAhPT0gJy8nKSByZXN1bHQgKz0gJy8nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVQYXRobmFtZTtcbiIsInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFpc1Byb2R1Y3Rpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHQgPSBcIldhcm5pbmc6IFwiICsgbWVzc2FnZTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhyb3cgRXJyb3IodGV4dCk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3YXJuaW5nO1xuIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG52YXIgcHJlZml4ID0gJ0ludmFyaWFudCBmYWlsZWQnO1xuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihwcmVmaXggKyBcIjogXCIgKyAobWVzc2FnZSB8fCAnJykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludmFyaWFudDtcbiIsImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCByZXNvbHZlUGF0aG5hbWUgZnJvbSAncmVzb2x2ZS1wYXRobmFtZSc7XG5pbXBvcnQgdmFsdWVFcXVhbCBmcm9tICd2YWx1ZS1lcXVhbCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbmZ1bmN0aW9uIGFkZExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aCA6ICcvJyArIHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBwYXRoLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwcmVmaXgudG9Mb3dlckNhc2UoKSkgPT09IDAgJiYgJy8/IycuaW5kZXhPZihwYXRoLmNoYXJBdChwcmVmaXgubGVuZ3RoKSkgIT09IC0xO1xufVxuZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkgPyBwYXRoLnN1YnN0cihwcmVmaXgubGVuZ3RoKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gcGF0aCB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcblxuICBpZiAoaGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGhhc2ggPSBwYXRobmFtZS5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignPycpO1xuXG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgdmFyIHBhdGggPSBwYXRobmFtZSB8fCAnLyc7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6IFwiI1wiICsgaGFzaDtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgbG9jYXRpb247XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcmVzb2x2ZVBhdGhuYW1lKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59XG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJykgOiB2b2lkIDA7XG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByb21wdCA9PT0gbmV4dFByb21wdCkgcHJvbXB0ID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IElmIGFub3RoZXIgdHJhbnNpdGlvbiBzdGFydHMgd2hpbGUgd2UncmUgc3RpbGwgY29uZmlybWluZ1xuICAgIC8vIHRoZSBwcmV2aW91cyBvbmUsIHdlIG1heSBlbmQgdXAgaW4gYSB3ZWlyZCBzdGF0ZS4gRmlndXJlIG91dCB0aGVcbiAgICAvLyBiZXN0IHdheSB0byBoYW5kbGUgdGhpcy5cbiAgICBpZiAocHJvbXB0ICE9IG51bGwpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2YgcHJvbXB0ID09PSAnZnVuY3Rpb24nID8gcHJvbXB0KGxvY2F0aW9uLCBhY3Rpb24pIDogcHJvbXB0O1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRVc2VyQ29uZmlybWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnQSBoaXN0b3J5IG5lZWRzIGEgZ2V0VXNlckNvbmZpcm1hdGlvbiBmdW5jdGlvbiBpbiBvcmRlciB0byB1c2UgYSBwcm9tcHQgbWVzc2FnZScpIDogdm9pZCAwO1xuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYXBwZW5kTGlzdGVuZXIoZm4pIHtcbiAgICB2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoaXNBY3RpdmUpIGZuLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBpcyBhbiBleHRyYW5lb3VzIFdlYktpdCBldmVudC5cbiAqIEFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IENocm9tZSBvbiBpT1MgZmlyZXMgcmVhbCBwb3BzdGF0ZSBldmVudHNcbiAqIGNvbnRhaW5pbmcgdW5kZWZpbmVkIHN0YXRlIHdoZW4gcHJlc3NpbmcgdGhlIGJhY2sgYnV0dG9uLlxuICovXG5cbmZ1bmN0aW9uIGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LnN0YXRlID09PSB1bmRlZmluZWQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID09PSAtMTtcbn1cblxudmFyIFBvcFN0YXRlRXZlbnQgPSAncG9wc3RhdGUnO1xudmFyIEhhc2hDaGFuZ2VFdmVudCA9ICdoYXNoY2hhbmdlJztcblxuZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElFIDExIHNvbWV0aW1lcyB0aHJvd3Mgd2hlbiBhY2Nlc3Npbmcgd2luZG93Lmhpc3Rvcnkuc3RhdGVcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvaGlzdG9yeS9wdWxsLzI4OVxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpbmNsdWRpbmdcbiAqIHB1c2hTdGF0ZSwgcmVwbGFjZVN0YXRlLCBhbmQgdGhlIHBvcHN0YXRlIGV2ZW50LlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlQnJvd3Nlckhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgIWNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0Jyb3dzZXIgaGlzdG9yeSBuZWVkcyBhIERPTScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhblVzZUhpc3RvcnkgPSBzdXBwb3J0c0hpc3RvcnkoKTtcbiAgdmFyIG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyID0gIXN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGZvcmNlUmVmcmVzaCA9IF9wcm9wcy5mb3JjZVJlZnJlc2gsXG4gICAgICBmb3JjZVJlZnJlc2ggPSBfcHJvcHMkZm9yY2VSZWZyZXNoID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRmb3JjZVJlZnJlc2gsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG5cbiAgZnVuY3Rpb24gZ2V0RE9NTG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgdmFyIF9yZWYgPSBoaXN0b3J5U3RhdGUgfHwge30sXG4gICAgICAgIGtleSA9IF9yZWYua2V5LFxuICAgICAgICBzdGF0ZSA9IF9yZWYuc3RhdGU7XG5cbiAgICB2YXIgX3dpbmRvdyRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgICAgcGF0aG5hbWUgPSBfd2luZG93JGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2ggPSBfd2luZG93JGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgaGFzaCA9IF93aW5kb3ckbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgcGF0aCA9IHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwga2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuICAgIC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG4gICAgaWYgKGlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQoZXZlbnQpKSByZXR1cm47XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSkpO1xuICB9XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIGtleXMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3Iga2V5cyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxLZXlzLmluZGV4T2YodG9Mb2NhdGlvbi5rZXkpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbEtleXMuaW5kZXhPZihmcm9tTG9jYXRpb24ua2V5KTtcbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSk7XG4gIHZhciBhbGxLZXlzID0gW2luaXRpYWxMb2NhdGlvbi5rZXldOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiBiYXNlbmFtZSArIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucHVzaFN0YXRlKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICB2YXIgbmV4dEtleXMgPSBhbGxLZXlzLnNsaWNlKDAsIHByZXZJbmRleCArIDEpO1xuICAgICAgICAgIG5leHRLZXlzLnB1c2gobG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBhbGxLZXlzID0gbmV4dEtleXM7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnQnJvd3NlciBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgSFRNTDUgaGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIGFsbEtleXNbcHJldkluZGV4XSA9IGxvY2F0aW9uLmtleTtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGhyZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxICYmIGRlbHRhID09PSAxKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGJsb2NrKHByb21wdCkge1xuICAgIGlmIChwcm9tcHQgPT09IHZvaWQgMCkge1xuICAgICAgcHJvbXB0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG52YXIgSGFzaENoYW5nZUV2ZW50JDEgPSAnaGFzaGNoYW5nZSc7XG52YXIgSGFzaFBhdGhDb2RlcnMgPSB7XG4gIGhhc2hiYW5nOiB7XG4gICAgZW5jb2RlUGF0aDogZnVuY3Rpb24gZW5jb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGggOiAnIS8nICsgc3RyaXBMZWFkaW5nU2xhc2gocGF0aCk7XG4gICAgfSxcbiAgICBkZWNvZGVQYXRoOiBmdW5jdGlvbiBkZWNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xuICAgIH1cbiAgfSxcbiAgbm9zbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IHN0cmlwTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9LFxuICBzbGFzaDoge1xuICAgIGVuY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RyaXBIYXNoKHVybCkge1xuICB2YXIgaGFzaEluZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyB1cmwgOiB1cmwuc2xpY2UoMCwgaGFzaEluZGV4KTtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIGhhc2hJbmRleCA9IGhyZWYuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/ICcnIDogaHJlZi5zdWJzdHJpbmcoaGFzaEluZGV4ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHB1c2hIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3RyaXBIYXNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArICcjJyArIHBhdGgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIYXNoSGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnSGFzaCBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuR29XaXRob3V0UmVsb2FkID0gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2goKTtcbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gX3Byb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB2b2lkIDAgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMkaGFzaFR5cGUgPSBfcHJvcHMuaGFzaFR5cGUsXG4gICAgICBoYXNoVHlwZSA9IF9wcm9wcyRoYXNoVHlwZSA9PT0gdm9pZCAwID8gJ3NsYXNoJyA6IF9wcm9wcyRoYXNoVHlwZTtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcbiAgdmFyIF9IYXNoUGF0aENvZGVycyRoYXNoVCA9IEhhc2hQYXRoQ29kZXJzW2hhc2hUeXBlXSxcbiAgICAgIGVuY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZW5jb2RlUGF0aCxcbiAgICAgIGRlY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZGVjb2RlUGF0aDtcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbigpIHtcbiAgICB2YXIgcGF0aCA9IGRlY29kZVBhdGgoZ2V0SGFzaFBhdGgoKSk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKSA6IHZvaWQgMDtcbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24ocGF0aCk7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gIHZhciBpZ25vcmVQYXRoID0gbnVsbDtcblxuICBmdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbCQkMShhLCBiKSB7XG4gICAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCA9PT0gYi5oYXNoO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkge1xuICAgICAgLy8gRW5zdXJlIHdlIGFsd2F5cyBoYXZlIGEgcHJvcGVybHktZW5jb2RlZCBoYXNoLlxuICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgICAgIHZhciBwcmV2TG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwkJDEocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVQb3AobG9jYXRpb24pIHtcbiAgICBpZiAoZm9yY2VOZXh0UG9wKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0UG9wKGZyb21Mb2NhdGlvbikge1xuICAgIHZhciB0b0xvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjsgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKHRvTG9jYXRpb24pKTtcbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9IC8vIEVuc3VyZSB0aGUgaGFzaCBpcyBlbmNvZGVkIHByb3Blcmx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxuXG5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICB2YXIgYWxsUGF0aHMgPSBbY3JlYXRlUGF0aChpbml0aWFsTG9jYXRpb24pXTsgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICB2YXIgYmFzZVRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKTtcbiAgICB2YXIgaHJlZiA9ICcnO1xuXG4gICAgaWYgKGJhc2VUYWcgJiYgYmFzZVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkge1xuICAgICAgaHJlZiA9IHN0cmlwSGFzaCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhyZWYgKyAnIycgKyBlbmNvZGVQYXRoKGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFBVU0gsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHB1c2hIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgICAgdmFyIG5leHRQYXRocyA9IGFsbFBhdGhzLnNsaWNlKDAsIHByZXZJbmRleCArIDEpO1xuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGZhbHNlLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGg7IGEgbmV3IGVudHJ5IHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrJykgOiB2b2lkIDA7XG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoY2FuR29XaXRob3V0UmVsb2FkLCAnSGFzaCBoaXN0b3J5IGdvKG4pIGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQgaW4gdGhpcyBicm93c2VyJykgOiB2b2lkIDA7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEhhc2hDaGFuZ2VFdmVudCQxLCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIF9wcm9wcyRpbml0aWFsRW50cmllcyA9IF9wcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB2b2lkIDAgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBfcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdm9pZCAwID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gX3Byb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHZvaWQgMCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH1cblxuICB2YXIgaW5kZXggPSBjbGFtcChpbml0aWFsSW5kZXgsIDAsIGluaXRpYWxFbnRyaWVzLmxlbmd0aCAtIDEpO1xuICB2YXIgZW50cmllcyA9IGluaXRpYWxFbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJyA/IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6IGNyZWF0ZUxvY2F0aW9uKGVudHJ5LCB1bmRlZmluZWQsIGVudHJ5LmtleSB8fCBjcmVhdGVLZXkoKSk7XG4gIH0pOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBjcmVhdGVQYXRoO1xuXG4gIGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuXG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gY2xhbXAoaGlzdG9yeS5pbmRleCArIG4sIDAsIGhpc3RvcnkuZW50cmllcy5sZW5ndGggLSAxKTtcbiAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgdmFyIGxvY2F0aW9uID0gaGlzdG9yeS5lbnRyaWVzW25leHRJbmRleF07XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGhpc3RvcnkuaW5kZXggKyBuO1xuICAgIHJldHVybiBuZXh0SW5kZXggPj0gMCAmJiBuZXh0SW5kZXggPCBoaXN0b3J5LmVudHJpZXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnksIGNyZWF0ZUhhc2hIaXN0b3J5LCBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIHBhcnNlUGF0aCwgY3JlYXRlUGF0aCB9O1xuIiwiaW1wb3J0IHsgaCB9IGZyb20gXCJwcmVhY3RcIjtcclxuaW1wb3J0IFJvdXRlciBmcm9tIFwicHJlYWN0LXJvdXRlclwiO1xyXG5pbXBvcnQgQXN5bmNSb3V0ZSBmcm9tIFwicHJlYWN0LWFzeW5jLXJvdXRlXCI7XHJcbmltcG9ydCB7Y3JlYXRlSGFzaEhpc3Rvcnl9IGZyb20gJ2hpc3RvcnknXHJcblxyXG5jb25zdCBSb3V0ZXJDb21wb25lbnQgPSAoe3JvdXRlc30pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFJvdXRlciBoaXN0b3J5PXtjcmVhdGVIYXNoSGlzdG9yeSgpfT5cclxuICAgICAge3JvdXRlcyYmIHJvdXRlcy5tYXAoKHJvdXRlLGkpPT57XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgPEFzeW5jUm91dGVcclxuICAgICAgICAgICAgcGF0aD17cm91dGUucGF0aH1cclxuICAgICAgICAgICAgZ2V0Q29tcG9uZW50PXsoKSA9PiByb3V0ZS5sb2FkKCkudGhlbihtb2R1bGU9PiBtb2R1bGUuZGVmYXVsdCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgICAgfSl9XHJcbiAgICA8L1JvdXRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm91dGVyQ29tcG9uZW50XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lZC1hcy1kZWZhdWx0ICovXHJcbmltcG9ydCB7IGggfSBmcm9tIFwicHJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInByZWFjdC9ob29rc1wiO1xyXG5pbXBvcnQgRHJhd2VyUGFnZSBmcm9tIFwiLi9EcmF3ZXJQYWdlXCI7XHJcbmltcG9ydCBUb3BBcHBCYXIgZnJvbSBcIi4vVG9wQXBwQmFyXCI7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbmFtZWQtYXMtZGVmYXVsdFxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyXHJcbmltcG9ydCBSb3V0ZXJDb21wb25lbnQgZnJvbSBcIi4vUm91dGVyQ29tcG9uZW50XCI7XHJcblxyXG5cclxuY29uc3QgQXBwU2hlbGwgPSAoe2RyYXdlckl0ZW1zLGFwcFRpdGxlLHJvdXRlc30pID0+IHtcclxuICBjb25zdCBbdG9nZ2xlLCBzZXRUb2dnbGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICByZXR1cm4gW1xyXG4gICAgPERyYXdlclBhZ2Ugb3Blbj17dG9nZ2xlfSBzZXRUb2dnbGU9eygpPT5zZXRUb2dnbGUoIXRvZ2dsZSl9IGl0ZW1zPXtkcmF3ZXJJdGVtc30gLz4sXHJcbiAgICA8VG9wQXBwQmFyIHRvZ2dsZT17dG9nZ2xlfSBzZXRUb2dnbGU9e3NldFRvZ2dsZX0gdGl0bGU9e2FwcFRpdGxlfSAvPixcclxuICAgIDxSb3V0ZXJDb21wb25lbnQgcm91dGVzPXtyb3V0ZXN9IC8+XHJcbiAgXTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFNoZWxsO1xyXG4iLCJpbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tIFwicHJlYWN0XCI7XHJcbmltcG9ydCBBcHBTaGVsbCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9hcHAtc2hlbGxcIjtcclxuXHJcbnJlbmRlcihcclxuICA8ZGl2PlxyXG4gICAgPEFwcFNoZWxsXHJcbiAgICAgIGRyYXdlckl0ZW1zPXtbeyByb3V0ZTogXCIvbW9kdWxlc1wiLCB0aXRsZTogXCJNb2R1bGVzXCIgfSx7IHJvdXRlOiBcIi9wcm9qZWN0c1wiLCB0aXRsZTogXCJQcm9qZWN0c1wiIH1dfVxyXG4gICAgICBhcHBUaXRsZT1cIlBvcnRmb2xpb1wiXHJcbiAgICAgIHJvdXRlcz17W3sgcGF0aDogXCIvbW9kdWxlc1wiLCBsb2FkOiAoKSA9PiBpbXBvcnQoXCIuL21vZHVsZXMvaW5kZXhcIikgfSx7IHBhdGg6IFwiL3Byb2plY3RzXCIsIGxvYWQ6ICgpID0+IGltcG9ydChcIi4vbW9kdWxlcy9pbmRleFwiKSB9XX1cclxuICAgIC8+XHJcbiAgPC9kaXY+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxyXG4pO1xyXG4iXSwibmFtZXMiOlsiTURDRm91bmRhdGlvbiIsImNzc0NsYXNzZXMiLCJzdHJpbmdzIiwibnVtYmVycyIsImRlZmF1bHRBZGFwdGVyIiwiY29uc3RydWN0b3IiLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJpbml0IiwiZGVzdHJveSIsIk1EQ0NvbXBvbmVudCIsImF0dGFjaFRvIiwicm9vdCIsImZvdW5kYXRpb24iLCJ1bmRlZmluZWQiLCJhcmdzIiwicm9vdF8iLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXRpYWxTeW5jV2l0aERPTSIsIkVycm9yIiwibGlzdGVuIiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidW5saXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZW1pdCIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlJPT1QiLCJESVNNSVNTSUJMRSIsIk1PREFMIiwiT1BFTiIsIkFOSU1BVEUiLCJPUEVOSU5HIiwiQ0xPU0lORyIsIkFQUF9DT05URU5UX1NFTEVDVE9SIiwiU0NSSU1fU0VMRUNUT1IiLCJDTE9TRV9FVkVOVCIsIk9QRU5fRVZFTlQiLCJNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJlbGVtZW50SGFzQ2xhc3MiLCJjb21wdXRlQm91bmRpbmdSZWN0Iiwibm90aWZ5Q2xvc2UiLCJub3RpZnlPcGVuIiwic2F2ZUZvY3VzIiwicmVzdG9yZUZvY3VzIiwiZm9jdXNBY3RpdmVOYXZpZ2F0aW9uSXRlbSIsInRyYXBGb2N1cyIsInJlbGVhc2VGb2N1cyIsIm9wZW4iLCJpc09wZW4iLCJpc09wZW5pbmciLCJpc0Nsb3NpbmciLCJjbG9zZSIsIm9wZW5lZCIsImNsb3NlZCIsImhhbmRsZUtleWRvd24iLCJrZXlDb2RlIiwia2V5IiwiaXNFc2NhcGUiLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwiaXNFbGVtZW50IiwidGFyZ2V0IiwiRWxlbWVudCIsIk1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbiIsImhhbmRsZVNjcmltQ2xpY2siLCJMSVNUX0lURU1fQ0xBU1MiLCJMSVNUX0lURU1fU0VMRUNURURfQ0xBU1MiLCJMSVNUX0lURU1fQUNUSVZBVEVEX0NMQVNTIiwiQVJJQV9PUklFTlRBVElPTiIsIkFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTCIsIkFSSUFfU0VMRUNURUQiLCJGT0NVU0FCTEVfQ0hJTERfRUxFTUVOVFMiLCJFTkFCTEVEX0lURU1TX1NFTEVDVE9SIiwiRUxFTUVOVFNfS0VZX0FMTE9XRURfSU4iLCJNRENMaXN0Rm91bmRhdGlvbiIsImdldExpc3RJdGVtQ291bnQiLCJnZXRGb2N1c2VkRWxlbWVudEluZGV4Iiwic2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4IiwicmVtb3ZlQXR0cmlidXRlRm9yRWxlbWVudEluZGV4IiwiYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgiLCJyZW1vdmVDbGFzc0ZvckVsZW1lbnRJbmRleCIsImZvY3VzSXRlbUF0SW5kZXgiLCJzZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW4iLCJmb2xsb3dIcmVmIiwiT2JqZWN0IiwiYXNzaWduIiwid3JhcEZvY3VzXyIsImlzVmVydGljYWxfIiwiaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyIsInNlbGVjdGVkSW5kZXhfIiwidXNlQWN0aXZhdGVkQ2xhc3NfIiwic2V0V3JhcEZvY3VzIiwidmFsdWUiLCJzZXRWZXJ0aWNhbE9yaWVudGF0aW9uIiwic2V0U2luZ2xlU2VsZWN0aW9uIiwic2V0VXNlQWN0aXZhdGVkQ2xhc3MiLCJ1c2VBY3RpdmF0ZWQiLCJzZXRTZWxlY3RlZEluZGV4IiwiaW5kZXgiLCJjbGFzc05hbWUiLCJoYW5kbGVGb2N1c0luIiwibGlzdEl0ZW1JbmRleCIsImhhbmRsZUZvY3VzT3V0IiwiaXNSb290TGlzdEl0ZW0iLCJhcnJvd0xlZnQiLCJhcnJvd1VwIiwiYXJyb3dSaWdodCIsImFycm93RG93biIsImlzSG9tZSIsImlzRW5kIiwiaXNFbnRlciIsImlzU3BhY2UiLCJjdXJyZW50SW5kZXgiLCJwcmV2ZW50RGVmYXVsdEV2ZW50XyIsImZvY3VzTmV4dEVsZW1lbnQiLCJmb2N1c1ByZXZFbGVtZW50IiwiZm9jdXNGaXJzdEVsZW1lbnQiLCJmb2N1c0xhc3RFbGVtZW50IiwiaGFuZGxlQ2xpY2siLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwicHJldmVudERlZmF1bHQiLCJjb3VudCIsIm5leHRJbmRleCIsInByZXZJbmRleCIsImxhc3RJbmRleCIsIk1EQ0xpc3QiLCJoYW5kbGVLZXlkb3duXyIsImhhbmRsZUNsaWNrXyIsImZvY3VzSW5FdmVudExpc3RlbmVyXyIsImZvY3VzT3V0RXZlbnRMaXN0ZW5lcl8iLCJiaW5kIiwiaGFuZGxlS2V5ZG93bkV2ZW50XyIsImhhbmRsZUZvY3VzSW5FdmVudF8iLCJoYW5kbGVGb2N1c091dEV2ZW50XyIsImxheW91dCIsImluaXRpYWxpemVMaXN0VHlwZSIsImRpcmVjdGlvbiIsImdldEF0dHJpYnV0ZSIsInZlcnRpY2FsIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRMaXN0SXRlbUluZGV4XyIsImV2ZW50VGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50IiwibGlzdEVsZW1lbnRzIiwicHJlc2VsZWN0ZWRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInNpbmdsZVNlbGVjdGlvbiIsInNlbGVjdGVkSW5kZXgiLCJ3cmFwRm9jdXMiLCJpc1NpbmdsZVNlbGVjdGlvbkxpc3QiLCJsZW5ndGgiLCJhY3RpdmVFbGVtZW50IiwiYXR0ciIsImVsZW1lbnQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhZGQiLCJyZW1vdmUiLCJmb2N1cyIsInRhYkluZGV4VmFsdWUiLCJsaXN0SXRlbUNoaWxkcmVuIiwibGlzdEl0ZW0iLCJocmVmIiwiY2xpY2siLCJjYW5kaWRhdGVTZWxlY3RvcnMiLCJjYW5kaWRhdGVTZWxlY3RvciIsImpvaW4iLCJtYXRjaGVzIiwicHJvdG90eXBlIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJ0YWJiYWJsZSIsImVsIiwib3B0aW9ucyIsImVsZW1lbnREb2N1bWVudCIsIm93bmVyRG9jdW1lbnQiLCJyZWd1bGFyVGFiYmFibGVzIiwib3JkZXJlZFRhYmJhYmxlcyIsInVudG91Y2hhYmlsaXR5Q2hlY2tlciIsIlVudG91Y2hhYmlsaXR5Q2hlY2tlciIsImNhbmRpZGF0ZXMiLCJpbmNsdWRlQ29udGFpbmVyIiwiQXJyYXkiLCJhcHBseSIsInVuc2hpZnQiLCJpIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlVGFiaW5kZXgiLCJpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUiLCJnZXRUYWJpbmRleCIsInB1c2giLCJkb2N1bWVudE9yZGVyIiwidGFiSW5kZXgiLCJub2RlIiwidGFiYmFibGVOb2RlcyIsInNvcnQiLCJzb3J0T3JkZXJlZFRhYmJhYmxlcyIsIm1hcCIsImEiLCJjb25jYXQiLCJpc1RhYmJhYmxlIiwiaXNGb2N1c2FibGUiLCJpc05vZGVNYXRjaGluZ1NlbGVjdG9yRm9jdXNhYmxlIiwiaXNOb25UYWJiYWJsZVJhZGlvIiwiZGlzYWJsZWQiLCJpc0hpZGRlbklucHV0IiwiaXNVbnRvdWNoYWJsZSIsImZvY3VzYWJsZUNhbmRpZGF0ZVNlbGVjdG9yIiwidGFiaW5kZXhBdHRyIiwicGFyc2VJbnQiLCJpc05hTiIsImlzQ29udGVudEVkaXRhYmxlIiwiYiIsImZpbmQiLCJsaXN0IiwicHJlZGljYXRlIiwiY29udGVudEVkaXRhYmxlIiwiaXNJbnB1dCIsInR5cGUiLCJpc1JhZGlvIiwiaXNUYWJiYWJsZVJhZGlvIiwiZ2V0Q2hlY2tlZFJhZGlvIiwibm9kZXMiLCJjaGVja2VkIiwibmFtZSIsInJhZGlvU2V0IiwiZG9jIiwiY2FjaGUiLCJoYXNEaXNwbGF5Tm9uZSIsIm5vZGVDb21wdXRlZFN0eWxlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiY2FjaGVkIiwiaXRlbSIsImRlZmF1bHRWaWV3IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJlc3VsdCIsImRpc3BsYXkiLCJwYXJlbnROb2RlIiwiZG9jdW1lbnRFbGVtZW50IiwiY29tcHV0ZWRTdHlsZSIsInZpc2liaWxpdHkiLCJleHRlbmQiLCJoYXNPd25Qcm9wZXJ0eSIsImFyZ3VtZW50cyIsInNvdXJjZSIsImxpc3RlbmluZ0ZvY3VzVHJhcCIsImZvY3VzVHJhcCIsInVzZXJPcHRpb25zIiwiY29udGFpbmVyIiwiY29uZmlnIiwieHRlbmQiLCJyZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSIsImVzY2FwZURlYWN0aXZhdGVzIiwic3RhdGUiLCJmaXJzdFRhYmJhYmxlTm9kZSIsImxhc3RUYWJiYWJsZU5vZGUiLCJub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24iLCJtb3N0UmVjZW50bHlGb2N1c2VkTm9kZSIsImFjdGl2ZSIsInBhdXNlZCIsInRyYXAiLCJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJwYXVzZSIsInVucGF1c2UiLCJhY3RpdmF0ZU9wdGlvbnMiLCJ1cGRhdGVUYWJiYWJsZU5vZGVzIiwib25BY3RpdmF0ZSIsImFkZExpc3RlbmVycyIsImRlYWN0aXZhdGVPcHRpb25zIiwicmVtb3ZlTGlzdGVuZXJzIiwib25EZWFjdGl2YXRlIiwicmV0dXJuRm9jdXMiLCJkZWxheSIsInRyeUZvY3VzIiwiZ2V0SW5pdGlhbEZvY3VzTm9kZSIsImNoZWNrRm9jdXNJbiIsImNoZWNrUG9pbnRlckRvd24iLCJjaGVja0NsaWNrIiwiY2hlY2tLZXkiLCJnZXROb2RlRm9yT3B0aW9uIiwib3B0aW9uTmFtZSIsIm9wdGlvblZhbHVlIiwiZSIsImNsaWNrT3V0c2lkZURlYWN0aXZhdGVzIiwiRG9jdW1lbnQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJpc0VzY2FwZUV2ZW50IiwiaXNUYWJFdmVudCIsImNoZWNrVGFiIiwic2hpZnRLZXkiLCJpc1NlbGVjdGFibGVJbnB1dCIsInNlbGVjdCIsImZuIiwic2V0VGltZW91dCIsImNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlIiwic3VyZmFjZUVsIiwiZm9jdXNUcmFwRmFjdG9yeSIsImNyZWF0ZUZvY3VzVHJhcCIsImluaXRpYWxGb2N1cyIsIk1EQ0RyYXdlciIsInByZXZpb3VzRm9jdXNfIiwiaGFuZGxlVHJhbnNpdGlvbkVuZF8iLCJmb2N1c1RyYXBGYWN0b3J5XyIsImZvY3VzVHJhcF8iLCJzY3JpbV8iLCJoYW5kbGVTY3JpbUNsaWNrXyIsImxpc3RfIiwibGlzdEZhY3RvcnkiLCJsaXN0RWwiLCJ1dGlsIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicHJldmlvdXNGb2N1cyIsImFjdGl2ZU5hdkl0ZW1FbCIsImNvbXBvbmVudE5hbWUiLCJwcm9wcyIsIkdyb3VwSGVhZGVyIiwiRHJhd2VyUGFnZSIsInNldFRvZ2dsZSIsIml0ZW1zIiwib3BhY2l0eSIsInJvdXRlIiwidGl0bGUiLCJGSVhFRF9DTEFTUyIsIkZJWEVEX1NDUk9MTEVEX0NMQVNTIiwiU0hPUlRfQ0xBU1MiLCJTSE9SVF9IQVNfQUNUSU9OX0lURU1fQ0xBU1MiLCJTSE9SVF9DT0xMQVBTRURfQ0xBU1MiLCJERUJPVU5DRV9USFJPVFRMRV9SRVNJWkVfVElNRV9NUyIsIk1BWF9UT1BfQVBQX0JBUl9IRUlHSFQiLCJBQ1RJT05fSVRFTV9TRUxFQ1RPUiIsIk5BVklHQVRJT05fRVZFTlQiLCJOQVZJR0FUSU9OX0lDT05fU0VMRUNUT1IiLCJST09UX1NFTEVDVE9SIiwiVElUTEVfU0VMRUNUT1IiLCJNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiIsInNldFN0eWxlIiwiZ2V0VG9wQXBwQmFySGVpZ2h0IiwicmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZCIsInJlZ2lzdGVyU2Nyb2xsSGFuZGxlciIsImRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJnZXRWaWV3cG9ydFNjcm9sbFkiLCJnZXRUb3RhbEFjdGlvbkl0ZW1zIiwibmF2Q2xpY2tIYW5kbGVyXyIsInNjcm9sbEhhbmRsZXJfIiwiaW5pdFNjcm9sbEhhbmRsZXIiLCJkZXN0cm95U2Nyb2xsSGFuZGxlciIsIk1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbiIsIk1EQ1RvcEFwcEJhckZvdW5kYXRpb24iLCJ3YXNTY3JvbGxlZF8iLCJmaXhlZFNjcm9sbEhhbmRsZXJfIiwiY3VycmVudFNjcm9sbCIsIk1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbiIsImlzQ29sbGFwc2VkIiwic2hvcnRBcHBCYXJTY3JvbGxIYW5kbGVyXyIsImlzQWx3YXlzQ29sbGFwc2VkIiwiSU5JVElBTF9WQUxVRSIsImxhc3RTY3JvbGxQb3NpdGlvbl8iLCJ0b3BBcHBCYXJIZWlnaHRfIiwid2FzRG9ja2VkXyIsImlzRG9ja2VkU2hvd2luZ18iLCJjdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyIsImlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyIsInJlc2l6ZVRocm90dGxlSWRfIiwicmVzaXplRGVib3VuY2VJZF8iLCJ0b3BBcHBCYXJTY3JvbGxIYW5kbGVyXyIsInJlc2l6ZUhhbmRsZXJfIiwidG9wQXBwQmFyUmVzaXplSGFuZGxlcl8iLCJjaGVja0ZvclVwZGF0ZV8iLCJvZmZzY3JlZW5Cb3VuZGFyeVRvcCIsImhhc0FueVBpeGVsc09mZnNjcmVlbiIsImhhc0FueVBpeGVsc09uc2NyZWVuIiwicGFydGlhbGx5U2hvd2luZyIsIm1vdmVUb3BBcHBCYXJfIiwib2Zmc2V0IiwiTWF0aCIsImFicyIsImN1cnJlbnRTY3JvbGxQb3NpdGlvbiIsIm1heCIsImRpZmYiLCJ0aHJvdHRsZWRSZXNpemVIYW5kbGVyXyIsImNsZWFyVGltZW91dCIsImN1cnJlbnRIZWlnaHQiLCJNRENUb3BBcHBCYXIiLCJuYXZJY29uXyIsImljb25SaXBwbGVzXyIsInNjcm9sbFRhcmdldF8iLCJyaXBwbGVGYWN0b3J5IiwiTURDUmlwcGxlIiwiaWNvbnMiLCJpY29uIiwicmlwcGxlIiwidW5ib3VuZGVkIiwiaWNvblJpcHBsZSIsInNldFNjcm9sbFRhcmdldCIsInByb3BlcnR5Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImNsaWVudEhlaWdodCIsIndpbmRvdyIsImNvbXAiLCJUb3BBcHBCYXJOYXYiLCJ0b2dnbGUiLCJjb25zdCIsIkVNUFRZIiwibGV0IiwibG9hZENvbXBvbmVudCIsInVybCIsInNldFN0YXRlIiwiZ2xvYmFsIiwic2VsZiIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwibGVuIiwicnVuIiwibmV4dFRpY2siLCJJdGVtIiwiYXJyYXkiLCJwbGF0Zm9ybSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwicmVsZWFzZSIsIm5vb3AiLCJvbiIsImFkZExpc3RlbmVyIiwib25jZSIsIm9mZiIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJwZXJmb3JtYW5jZSIsInBlcmZvcm1hbmNlTm93Iiwibm93IiwibW96Tm93IiwibXNOb3ciLCJvTm93Iiwid2Via2l0Tm93IiwiRGF0ZSIsImdldFRpbWUiLCJocnRpbWUiLCJwcmV2aW91c1RpbWVzdGFtcCIsImNsb2NrdGltZSIsInNlY29uZHMiLCJmbG9vciIsIm5hbm9zZWNvbmRzIiwic3RhcnRUaW1lIiwidXB0aW1lIiwiY3VycmVudFRpbWUiLCJkaWYiLCJfZXh0ZW5kcyIsImlzQWJzb2x1dGUiLCJwYXRobmFtZSIsImNoYXJBdCIsInNwbGljZU9uZSIsImsiLCJuIiwicG9wIiwicmVzb2x2ZVBhdGhuYW1lIiwidG8iLCJmcm9tIiwidG9QYXJ0cyIsInNwbGl0IiwiZnJvbVBhcnRzIiwiaXNUb0FicyIsImlzRnJvbUFicyIsIm11c3RFbmRBYnMiLCJoYXNUcmFpbGluZ1NsYXNoIiwibGFzdCIsInVwIiwicGFydCIsInN1YnN0ciIsIndhcm5pbmciLCJjb25kaXRpb24iLCJtZXNzYWdlIiwidGV4dCIsImNvbnNvbGUiLCJ3YXJuIiwieCIsInByZWZpeCIsImludmFyaWFudCIsImFkZExlYWRpbmdTbGFzaCIsInBhdGgiLCJzdHJpcExlYWRpbmdTbGFzaCIsImhhc0Jhc2VuYW1lIiwic3RyaXBCYXNlbmFtZSIsInN0cmlwVHJhaWxpbmdTbGFzaCIsInBhcnNlUGF0aCIsInNlYXJjaCIsImhhc2giLCJoYXNoSW5kZXgiLCJzZWFyY2hJbmRleCIsImNyZWF0ZVBhdGgiLCJsb2NhdGlvbiIsImNyZWF0ZUxvY2F0aW9uIiwiY3VycmVudExvY2F0aW9uIiwiZGVjb2RlVVJJIiwiVVJJRXJyb3IiLCJjcmVhdGVUcmFuc2l0aW9uTWFuYWdlciIsInByb21wdCIsInNldFByb21wdCIsIm5leHRQcm9tcHQiLCJwcm9jZXNzIiwiTk9ERV9FTlYiLCJjb25maXJtVHJhbnNpdGlvblRvIiwiYWN0aW9uIiwiZ2V0VXNlckNvbmZpcm1hdGlvbiIsImNhbGxiYWNrIiwibGlzdGVuZXJzIiwiYXBwZW5kTGlzdGVuZXIiLCJpc0FjdGl2ZSIsImxpc3RlbmVyIiwiZmlsdGVyIiwibm90aWZ5TGlzdGVuZXJzIiwiX2xlbiIsIl9rZXkiLCJjYW5Vc2VET00iLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29uZmlybWF0aW9uIiwiY29uZmlybSIsInN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiSGFzaENoYW5nZUV2ZW50JDEiLCJIYXNoUGF0aENvZGVycyIsImhhc2hiYW5nIiwiZW5jb2RlUGF0aCIsImRlY29kZVBhdGgiLCJub3NsYXNoIiwic2xhc2giLCJzdHJpcEhhc2giLCJnZXRIYXNoUGF0aCIsInN1YnN0cmluZyIsInB1c2hIYXNoUGF0aCIsInJlcGxhY2VIYXNoUGF0aCIsInJlcGxhY2UiLCJjcmVhdGVIYXNoSGlzdG9yeSIsImdsb2JhbEhpc3RvcnkiLCJoaXN0b3J5IiwiY2FuR29XaXRob3V0UmVsb2FkIiwiX3Byb3BzIiwiX3Byb3BzJGdldFVzZXJDb25maXJtIiwiX3Byb3BzJGhhc2hUeXBlIiwiaGFzaFR5cGUiLCJiYXNlbmFtZSIsIl9IYXNoUGF0aENvZGVycyRoYXNoVCIsImdldERPTUxvY2F0aW9uIiwidHJhbnNpdGlvbk1hbmFnZXIiLCJuZXh0U3RhdGUiLCJmb3JjZU5leHRQb3AiLCJpZ25vcmVQYXRoIiwibG9jYXRpb25zQXJlRXF1YWwkJDEiLCJoYW5kbGVIYXNoQ2hhbmdlIiwiZW5jb2RlZFBhdGgiLCJwcmV2TG9jYXRpb24iLCJoYW5kbGVQb3AiLCJvayIsInJldmVydFBvcCIsImZyb21Mb2NhdGlvbiIsInRvTG9jYXRpb24iLCJ0b0luZGV4IiwiYWxsUGF0aHMiLCJsYXN0SW5kZXhPZiIsImZyb21JbmRleCIsImRlbHRhIiwiZ28iLCJpbml0aWFsTG9jYXRpb24iLCJjcmVhdGVIcmVmIiwiYmFzZVRhZyIsImhhc2hDaGFuZ2VkIiwibmV4dFBhdGhzIiwiZ29CYWNrIiwiZ29Gb3J3YXJkIiwibGlzdGVuZXJDb3VudCIsImNoZWNrRE9NTGlzdGVuZXJzIiwiaXNCbG9ja2VkIiwiYmxvY2siLCJ1bmJsb2NrIiwiUm91dGVyQ29tcG9uZW50Iiwicm91dGVzIiwiQXN5bmNSb3V0ZSIsImxvYWQiLCJ0aGVuIiwibW9kdWxlIiwiQXBwU2hlbGwiLCJkcmF3ZXJJdGVtcyIsImFwcFRpdGxlIiwidXNlU3RhdGUiLCJUb3BBcHBCYXIiLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsYUFBTixDQUFvQjs7YUFFUEMsVUFBWCxHQUF3Qjs7O1dBR2YsRUFBUDs7Ozs7YUFJU0MsT0FBWCxHQUFxQjs7O1dBR1osRUFBUDs7Ozs7YUFJU0MsT0FBWCxHQUFxQjs7O1dBR1osRUFBUDs7Ozs7YUFJU0MsY0FBWCxHQUE0Qjs7OztXQUluQixFQUFQOzs7Ozs7O0VBTUZDLFdBQVcsQ0FBQ0MsT0FBTyxHQUFHLEVBQVgsRUFBZTs7U0FFbkJDLFFBQUwsR0FBZ0JELE9BQWhCOzs7RUFHRkUsSUFBSSxHQUFHOzs7RUFJUEMsT0FBTyxHQUFHOzs7OztBQ3BFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxBQUVBOzs7O0FBR0EsTUFBTUMsWUFBTixDQUFtQjs7Ozs7U0FLVkMsUUFBUCxDQUFnQkMsSUFBaEIsRUFBc0I7Ozs7O1dBS2IsSUFBSUYsWUFBSixDQUFpQkUsSUFBakIsRUFBdUIsSUFBSVosYUFBSixFQUF2QixDQUFQOzs7Ozs7Ozs7RUFRRkssV0FBVyxDQUFDTyxJQUFELEVBQU9DLFVBQVUsR0FBR0MsU0FBcEIsRUFBK0IsR0FBR0MsSUFBbEMsRUFBd0M7O1NBRTVDQyxLQUFMLEdBQWFKLElBQWI7U0FDS0ssVUFBTCxDQUFnQixHQUFHRixJQUFuQixFQUhpRDs7Ozs7U0FPNUNHLFdBQUwsR0FBbUJMLFVBQVUsS0FBS0MsU0FBZixHQUEyQixLQUFLSyxvQkFBTCxFQUEzQixHQUF5RE4sVUFBNUU7U0FDS0ssV0FBTCxDQUFpQlYsSUFBakI7U0FDS1ksa0JBQUw7OztFQUdGSCxVQUFVOztJQUFBOzs7Ozs7Ozs7RUFTVkUsb0JBQW9CLEdBQUc7OztVQUdmLElBQUlFLEtBQUosQ0FBVSxtRkFDZCxrQkFESSxDQUFOOzs7RUFJRkQsa0JBQWtCLEdBQUc7Ozs7OztFQU9yQlgsT0FBTyxHQUFHOzs7U0FHSFMsV0FBTCxDQUFpQlQsT0FBakI7Ozs7Ozs7Ozs7RUFTRmEsTUFBTSxDQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBbUI7U0FDbEJSLEtBQUwsQ0FBV1MsZ0JBQVgsQ0FBNEJGLE9BQTVCLEVBQXFDQyxPQUFyQzs7Ozs7Ozs7OztFQVNGRSxRQUFRLENBQUNILE9BQUQsRUFBVUMsT0FBVixFQUFtQjtTQUNwQlIsS0FBTCxDQUFXVyxtQkFBWCxDQUErQkosT0FBL0IsRUFBd0NDLE9BQXhDOzs7Ozs7Ozs7OztFQVVGSSxJQUFJLENBQUNMLE9BQUQsRUFBVU0sT0FBVixFQUFtQkMsWUFBWSxHQUFHLEtBQWxDLEVBQXlDO1FBQ3ZDQyxHQUFKOztRQUNJLE9BQU9DLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7TUFDckNELEdBQUcsR0FBRyxJQUFJQyxXQUFKLENBQWdCVCxPQUFoQixFQUF5QjtRQUM3QlUsTUFBTSxFQUFFSixPQURxQjtRQUU3QkssT0FBTyxFQUFFSjtPQUZMLENBQU47S0FERixNQUtPO01BQ0xDLEdBQUcsR0FBR0ksUUFBUSxDQUFDQyxXQUFULENBQXFCLGFBQXJCLENBQU47TUFDQUwsR0FBRyxDQUFDTSxlQUFKLENBQW9CZCxPQUFwQixFQUE2Qk8sWUFBN0IsRUFBMkMsS0FBM0MsRUFBa0RELE9BQWxEOzs7U0FHR2IsS0FBTCxDQUFXc0IsYUFBWCxDQUF5QlAsR0FBekI7Ozs7O0FDOUhKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTTlCLFVBQVUsR0FBRztFQUNqQnNDLElBQUksRUFBRSxZQURXO0VBRWpCQyxXQUFXLEVBQUUseUJBRkk7RUFHakJDLEtBQUssRUFBRSxtQkFIVTtFQUlqQkMsSUFBSSxFQUFFLGtCQUpXO0VBS2pCQyxPQUFPLEVBQUUscUJBTFE7RUFNakJDLE9BQU8sRUFBRSxxQkFOUTtFQU9qQkMsT0FBTyxFQUFFO0NBUFg7OztBQVdBLE1BQU0zQyxPQUFPLEdBQUc7RUFDZDRDLG9CQUFvQixFQUFFLHlCQURSO0VBRWRDLGNBQWMsRUFBRSxtQkFGRjtFQUdkQyxXQUFXLEVBQUUsa0JBSEM7RUFJZEMsVUFBVSxFQUFFO0NBSmQ7O0FDbENBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLEFBSUE7Ozs7QUFHQSxNQUFNQyw4QkFBTixTQUE2Q2xELGFBQTdDLENBQTJEOzthQUU5Q0UsT0FBWCxHQUFxQjtXQUNaQSxPQUFQOzs7OzthQUlTRCxVQUFYLEdBQXdCO1dBQ2ZBLFVBQVA7OzthQUdTRyxjQUFYLEdBQTRCOzs7O1FBRXhCK0MsUUFBUSxFQUFFOztVQUQ2QjtRQUV2Q0MsV0FBVyxFQUFFOztVQUYwQjtRQUd2Q0MsUUFBUSxFQUFFOztVQUg2QjtRQUl2Q0MsZUFBZSxFQUFFOztVQUpzQjtRQUt2Q0MsbUJBQW1CLEVBQUUsTUFBTSxFQUxZO1FBTXZDQyxXQUFXLEVBQUUsTUFBTSxFQU5vQjtRQU92Q0MsVUFBVSxFQUFFLE1BQU0sRUFQcUI7UUFRdkNDLFNBQVMsRUFBRSxNQUFNLEVBUnNCO1FBU3ZDQyxZQUFZLEVBQUUsTUFBTSxFQVRtQjtRQVV2Q0MseUJBQXlCLEVBQUUsTUFBTSxFQVZNO1FBV3ZDQyxTQUFTLEVBQUUsTUFBTSxFQVhzQjtRQVl2Q0MsWUFBWSxFQUFFLE1BQU07Ozs7Ozs7OztFQU94QkMsSUFBSSxHQUFHO1FBQ0QsS0FBS0MsTUFBTCxNQUFpQixLQUFLQyxTQUFMLEVBQWpCLElBQXFDLEtBQUtDLFNBQUwsRUFBekMsRUFBMkQ7Ozs7U0FJdEQzRCxRQUFMLENBQWM0QyxRQUFkLENBQXVCbEQsVUFBVSxDQUFDeUMsSUFBbEM7U0FDS25DLFFBQUwsQ0FBYzRDLFFBQWQsQ0FBdUJsRCxVQUFVLENBQUMwQyxPQUFsQztTQUNLcEMsUUFBTCxDQUFjZ0QsbUJBQWQsR0FQSzs7U0FRQWhELFFBQUwsQ0FBYzRDLFFBQWQsQ0FBdUJsRCxVQUFVLENBQUMyQyxPQUFsQztTQUVLckMsUUFBTCxDQUFjbUQsU0FBZDs7Ozs7OztFQU1GUyxLQUFLLEdBQUc7UUFDRixDQUFDLEtBQUtILE1BQUwsRUFBRCxJQUFrQixLQUFLQyxTQUFMLEVBQWxCLElBQXNDLEtBQUtDLFNBQUwsRUFBMUMsRUFBNEQ7Ozs7U0FJdkQzRCxRQUFMLENBQWM0QyxRQUFkLENBQXVCbEQsVUFBVSxDQUFDNEMsT0FBbEM7Ozs7Ozs7O0VBT0Z1QixNQUFNLEdBQUc7Ozs7Ozs7RUFNVEMsTUFBTSxHQUFHOzs7Ozs7O0VBTVRMLE1BQU0sR0FBRztXQUNBLEtBQUt6RCxRQUFMLENBQWM4QyxRQUFkLENBQXVCcEQsVUFBVSxDQUFDeUMsSUFBbEMsQ0FBUDs7Ozs7Ozs7RUFPRnVCLFNBQVMsR0FBRztXQUNILEtBQUsxRCxRQUFMLENBQWM4QyxRQUFkLENBQXVCcEQsVUFBVSxDQUFDMkMsT0FBbEMsQ0FBUDs7Ozs7Ozs7RUFPRnNCLFNBQVMsR0FBRztXQUNILEtBQUszRCxRQUFMLENBQWM4QyxRQUFkLENBQXVCcEQsVUFBVSxDQUFDNEMsT0FBbEMsQ0FBUDs7Ozs7Ozs7RUFPRnlCLGFBQWEsQ0FBQ3ZDLEdBQUQsRUFBTTtVQUNYO01BQUN3QyxPQUFEO01BQVVDO1FBQU96QyxHQUF2QjtVQUVNMEMsUUFBUSxHQUFHRCxHQUFHLEtBQUssUUFBUixJQUFvQkQsT0FBTyxLQUFLLEVBQWpEOztRQUNJRSxRQUFKLEVBQWM7V0FDUE4sS0FBTDs7Ozs7Ozs7O0VBUUpPLG1CQUFtQixDQUFDM0MsR0FBRCxFQUFNO1VBQ2pCO01BQUNhLE9BQUQ7TUFBVUMsT0FBVjtNQUFtQkgsSUFBbkI7TUFBeUJDLE9BQXpCO01BQWtDSjtRQUFRdEMsVUFBaEQsQ0FEdUI7O1VBSWpCMEUsU0FBUyxHQUFHNUMsR0FBRyxDQUFDNkMsTUFBSixZQUFzQkMsT0FBeEM7O1FBQ0ksQ0FBQ0YsU0FBRCxJQUFjLENBQUMsS0FBS3BFLFFBQUwsQ0FBYytDLGVBQWQ7O0lBQXVEdkIsR0FBRyxDQUFDNkMsTUFBM0QsRUFBb0VyQyxJQUFwRSxDQUFuQixFQUE4Rjs7OztRQUkxRixLQUFLMkIsU0FBTCxFQUFKLEVBQXNCO1dBQ2YzRCxRQUFMLENBQWM2QyxXQUFkLENBQTBCVixJQUExQjtXQUNLbkMsUUFBTCxDQUFjb0QsWUFBZDtXQUNLVSxNQUFMO1dBQ0s5RCxRQUFMLENBQWNpRCxXQUFkO0tBSkYsTUFLTztXQUNBakQsUUFBTCxDQUFjcUQseUJBQWQ7V0FDS1EsTUFBTDtXQUNLN0QsUUFBTCxDQUFja0QsVUFBZDs7O1NBR0dsRCxRQUFMLENBQWM2QyxXQUFkLENBQTBCVCxPQUExQjtTQUNLcEMsUUFBTCxDQUFjNkMsV0FBZCxDQUEwQlIsT0FBMUI7U0FDS3JDLFFBQUwsQ0FBYzZDLFdBQWQsQ0FBMEJQLE9BQTFCOzs7OztBQ2hLSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxBQUdBOzs7O0FBR0EsTUFBTWlDLHdCQUFOLFNBQXVDNUIsOEJBQXZDLENBQXNFOzs7OztFQUtwRWtCLE1BQU0sR0FBRztTQUNGN0QsUUFBTCxDQUFjc0QsU0FBZDs7Ozs7Ozs7RUFPRlEsTUFBTSxHQUFHO1NBQ0Y5RCxRQUFMLENBQWN1RCxZQUFkOzs7Ozs7O0VBTUZpQixnQkFBZ0IsR0FBRztTQUNaWixLQUFMOzs7OztBQ2xESjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTW5FLGVBQU4sQ0FBb0I7O2FBRVBDLFVBQVgsR0FBd0I7OztXQUdmLEVBQVA7Ozs7O2FBSVNDLE9BQVgsR0FBcUI7OztXQUdaLEVBQVA7Ozs7O2FBSVNDLE9BQVgsR0FBcUI7OztXQUdaLEVBQVA7Ozs7O2FBSVNDLGNBQVgsR0FBNEI7Ozs7V0FJbkIsRUFBUDs7Ozs7OztFQU1GQyxXQUFXLENBQUNDLE9BQU8sR0FBRyxFQUFYLEVBQWU7O1NBRW5CQyxRQUFMLEdBQWdCRCxPQUFoQjs7O0VBR0ZFLElBQUksR0FBRzs7O0VBSVBDLE9BQU8sR0FBRzs7Ozs7QUNwRVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsQUFFQTs7OztBQUdBLE1BQU1DLGNBQU4sQ0FBbUI7Ozs7O1NBS1ZDLFFBQVAsQ0FBZ0JDLElBQWhCLEVBQXNCOzs7OztXQUtiLElBQUlGLGNBQUosQ0FBaUJFLElBQWpCLEVBQXVCLElBQUlaLGVBQUosRUFBdkIsQ0FBUDs7Ozs7Ozs7O0VBUUZLLFdBQVcsQ0FBQ08sSUFBRCxFQUFPQyxVQUFVLEdBQUdDLFNBQXBCLEVBQStCLEdBQUdDLElBQWxDLEVBQXdDOztTQUU1Q0MsS0FBTCxHQUFhSixJQUFiO1NBQ0tLLFVBQUwsQ0FBZ0IsR0FBR0YsSUFBbkIsRUFIaUQ7Ozs7O1NBTzVDRyxXQUFMLEdBQW1CTCxVQUFVLEtBQUtDLFNBQWYsR0FBMkIsS0FBS0ssb0JBQUwsRUFBM0IsR0FBeUROLFVBQTVFO1NBQ0tLLFdBQUwsQ0FBaUJWLElBQWpCO1NBQ0tZLGtCQUFMOzs7RUFHRkgsVUFBVTs7SUFBQTs7Ozs7Ozs7O0VBU1ZFLG9CQUFvQixHQUFHOzs7VUFHZixJQUFJRSxLQUFKLENBQVUsbUZBQ2Qsa0JBREksQ0FBTjs7O0VBSUZELGtCQUFrQixHQUFHOzs7Ozs7RUFPckJYLE9BQU8sR0FBRzs7O1NBR0hTLFdBQUwsQ0FBaUJULE9BQWpCOzs7Ozs7Ozs7O0VBU0ZhLE1BQU0sQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CO1NBQ2xCUixLQUFMLENBQVdTLGdCQUFYLENBQTRCRixPQUE1QixFQUFxQ0MsT0FBckM7Ozs7Ozs7Ozs7RUFTRkUsUUFBUSxDQUFDSCxPQUFELEVBQVVDLE9BQVYsRUFBbUI7U0FDcEJSLEtBQUwsQ0FBV1csbUJBQVgsQ0FBK0JKLE9BQS9CLEVBQXdDQyxPQUF4Qzs7Ozs7Ozs7Ozs7RUFVRkksSUFBSSxDQUFDTCxPQUFELEVBQVVNLE9BQVYsRUFBbUJDLFlBQVksR0FBRyxLQUFsQyxFQUF5QztRQUN2Q0MsR0FBSjs7UUFDSSxPQUFPQyxXQUFQLEtBQXVCLFVBQTNCLEVBQXVDO01BQ3JDRCxHQUFHLEdBQUcsSUFBSUMsV0FBSixDQUFnQlQsT0FBaEIsRUFBeUI7UUFDN0JVLE1BQU0sRUFBRUosT0FEcUI7UUFFN0JLLE9BQU8sRUFBRUo7T0FGTCxDQUFOO0tBREYsTUFLTztNQUNMQyxHQUFHLEdBQUdJLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQixhQUFyQixDQUFOO01BQ0FMLEdBQUcsQ0FBQ00sZUFBSixDQUFvQmQsT0FBcEIsRUFBNkJPLFlBQTdCLEVBQTJDLEtBQTNDLEVBQWtERCxPQUFsRDs7O1NBR0diLEtBQUwsQ0FBV3NCLGFBQVgsQ0FBeUJQLEdBQXpCOzs7OztBQzlISjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU05QixZQUFVLEdBQUc7RUFDakJzQyxJQUFJLEVBQUUsVUFEVztFQUVqQnlDLGVBQWUsRUFBRSxlQUZBO0VBR2pCQyx3QkFBd0IsRUFBRSx5QkFIVDtFQUlqQkMseUJBQXlCLEVBQUU7Q0FKN0I7OztBQVFBLE1BQU1oRixTQUFPLEdBQUc7RUFDZGlGLGdCQUFnQixFQUFFLGtCQURKO0VBRWRDLDJCQUEyQixFQUFFLFlBRmY7RUFHZEMsYUFBYSxFQUFFLGVBSEQ7RUFJZEMsd0JBQXdCLEVBQUcsSUFBR3JGLFlBQVUsQ0FBQytFLGVBQWdCLDRCQUEyQi9FLFlBQVUsQ0FBQytFLGVBQWdCLElBSmpHO0VBS2RPLHNCQUFzQixFQUFFO0NBTDFCOztBQ2hDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxBQUlBLE1BQU1DLHVCQUF1QixHQUFHLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsVUFBcEIsRUFBZ0MsUUFBaEMsQ0FBaEM7O0FBRUEsTUFBTUMsaUJBQU4sU0FBZ0N6RixlQUFoQyxDQUE4Qzs7YUFFakNFLE9BQVgsR0FBcUI7V0FDWkEsU0FBUDs7Ozs7YUFJU0QsVUFBWCxHQUF3QjtXQUNmQSxZQUFQOzs7Ozs7Ozs7YUFRU0csY0FBWCxHQUE0Qjs7OztRQUV4QnNGLGdCQUFnQixFQUFFLE1BQU0sRUFEYTtRQUVyQ0Msc0JBQXNCLEVBQUUsTUFBTSxFQUZPO1FBR3JDQywyQkFBMkIsRUFBRSxNQUFNLEVBSEU7UUFJckNDLDhCQUE4QixFQUFFLE1BQU0sRUFKRDtRQUtyQ0MsdUJBQXVCLEVBQUUsTUFBTSxFQUxNO1FBTXJDQywwQkFBMEIsRUFBRSxNQUFNLEVBTkc7UUFPckNDLGdCQUFnQixFQUFFLE1BQU0sRUFQYTtRQVFyQ0MsOEJBQThCLEVBQUUsTUFBTSxFQVJEO1FBU3JDQyxVQUFVLEVBQUUsTUFBTTs7Ozs7Ozs7O0VBT3RCN0YsV0FBVyxDQUFDQyxPQUFELEVBQVU7VUFDYjZGLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjWCxpQkFBaUIsQ0FBQ3JGLGNBQWhDLEVBQWdERSxPQUFoRCxDQUFOOzs7U0FFSytGLFVBQUwsR0FBa0IsS0FBbEI7OztTQUVLQyxXQUFMLEdBQW1CLElBQW5COzs7U0FFS0Msc0JBQUwsR0FBOEIsS0FBOUI7OztTQUVLQyxjQUFMLEdBQXNCLENBQUMsQ0FBdkI7OztTQUVLQyxrQkFBTCxHQUEwQixLQUExQjs7Ozs7Ozs7RUFPRkMsWUFBWSxDQUFDQyxLQUFELEVBQVE7U0FDYk4sVUFBTCxHQUFrQk0sS0FBbEI7Ozs7Ozs7O0VBT0ZDLHNCQUFzQixDQUFDRCxLQUFELEVBQVE7U0FDdkJMLFdBQUwsR0FBbUJLLEtBQW5COzs7Ozs7OztFQU9GRSxrQkFBa0IsQ0FBQ0YsS0FBRCxFQUFRO1NBQ25CSixzQkFBTCxHQUE4QkksS0FBOUI7Ozs7Ozs7O0VBT0ZHLG9CQUFvQixDQUFDQyxZQUFELEVBQWU7U0FDNUJOLGtCQUFMLEdBQTBCTSxZQUExQjs7Ozs7RUFJRkMsZ0JBQWdCLENBQUNDLEtBQUQsRUFBUTtRQUNsQkEsS0FBSyxLQUFLLEtBQUtULGNBQW5CLEVBQW1DOzs7O1VBSTdCVSxTQUFTLEdBQUcsS0FBS1Qsa0JBQUwsR0FDZHhHLFlBQVUsQ0FBQ2lGLHlCQURHLEdBQ3lCakYsWUFBVSxDQUFDZ0Ysd0JBRHREOztRQUdJLEtBQUt1QixjQUFMLElBQXVCLENBQTNCLEVBQThCO1dBQ3ZCakcsUUFBTCxDQUFjc0YsOEJBQWQsQ0FBNkMsS0FBS1csY0FBbEQsRUFBa0V0RyxTQUFPLENBQUNtRixhQUExRTtXQUNLOUUsUUFBTCxDQUFjd0YsMEJBQWQsQ0FBeUMsS0FBS1MsY0FBOUMsRUFBOERVLFNBQTlEO1dBQ0szRyxRQUFMLENBQWNxRiwyQkFBZCxDQUEwQyxLQUFLWSxjQUEvQyxFQUErRCxVQUEvRCxFQUEyRSxDQUFDLENBQTVFOzs7UUFHRVMsS0FBSyxJQUFJLENBQVQsSUFBYyxLQUFLMUcsUUFBTCxDQUFjbUYsZ0JBQWQsS0FBbUN1QixLQUFyRCxFQUE0RDtXQUNyRFQsY0FBTCxHQUFzQlMsS0FBdEI7V0FDSzFHLFFBQUwsQ0FBY3FGLDJCQUFkLENBQTBDLEtBQUtZLGNBQS9DLEVBQStEdEcsU0FBTyxDQUFDbUYsYUFBdkUsRUFBc0YsSUFBdEY7V0FDSzlFLFFBQUwsQ0FBY3VGLHVCQUFkLENBQXNDLEtBQUtVLGNBQTNDLEVBQTJEVSxTQUEzRDtXQUNLM0csUUFBTCxDQUFjcUYsMkJBQWQsQ0FBMEMsS0FBS1ksY0FBL0MsRUFBK0QsVUFBL0QsRUFBMkUsQ0FBM0U7O1VBRUksS0FBS0EsY0FBTCxLQUF3QixDQUE1QixFQUErQjthQUN4QmpHLFFBQUwsQ0FBY3FGLDJCQUFkLENBQTBDLENBQTFDLEVBQTZDLFVBQTdDLEVBQXlELENBQUMsQ0FBMUQ7Ozs7Ozs7Ozs7O0VBVU51QixhQUFhLENBQUNwRixHQUFELEVBQU1xRixhQUFOLEVBQXFCO1FBQzVCQSxhQUFhLElBQUksQ0FBckIsRUFBd0I7V0FDakI3RyxRQUFMLENBQWMwRiw4QkFBZCxDQUE2Q21CLGFBQTdDLEVBQTRELENBQTVEOzs7Ozs7Ozs7O0VBU0pDLGNBQWMsQ0FBQ3RGLEdBQUQsRUFBTXFGLGFBQU4sRUFBcUI7UUFDN0JBLGFBQWEsSUFBSSxDQUFyQixFQUF3QjtXQUNqQjdHLFFBQUwsQ0FBYzBGLDhCQUFkLENBQTZDbUIsYUFBN0MsRUFBNEQsQ0FBQyxDQUE3RDs7Ozs7Ozs7Ozs7RUFVSjlDLGFBQWEsQ0FBQ3ZDLEdBQUQsRUFBTXVGLGNBQU4sRUFBc0JGLGFBQXRCLEVBQXFDO1VBQzFDRyxTQUFTLEdBQUd4RixHQUFHLENBQUN5QyxHQUFKLEtBQVksV0FBWixJQUEyQnpDLEdBQUcsQ0FBQ3dDLE9BQUosS0FBZ0IsRUFBN0Q7VUFDTWlELE9BQU8sR0FBR3pGLEdBQUcsQ0FBQ3lDLEdBQUosS0FBWSxTQUFaLElBQXlCekMsR0FBRyxDQUFDd0MsT0FBSixLQUFnQixFQUF6RDtVQUNNa0QsVUFBVSxHQUFHMUYsR0FBRyxDQUFDeUMsR0FBSixLQUFZLFlBQVosSUFBNEJ6QyxHQUFHLENBQUN3QyxPQUFKLEtBQWdCLEVBQS9EO1VBQ01tRCxTQUFTLEdBQUczRixHQUFHLENBQUN5QyxHQUFKLEtBQVksV0FBWixJQUEyQnpDLEdBQUcsQ0FBQ3dDLE9BQUosS0FBZ0IsRUFBN0Q7VUFDTW9ELE1BQU0sR0FBRzVGLEdBQUcsQ0FBQ3lDLEdBQUosS0FBWSxNQUFaLElBQXNCekMsR0FBRyxDQUFDd0MsT0FBSixLQUFnQixFQUFyRDtVQUNNcUQsS0FBSyxHQUFHN0YsR0FBRyxDQUFDeUMsR0FBSixLQUFZLEtBQVosSUFBcUJ6QyxHQUFHLENBQUN3QyxPQUFKLEtBQWdCLEVBQW5EO1VBQ01zRCxPQUFPLEdBQUc5RixHQUFHLENBQUN5QyxHQUFKLEtBQVksT0FBWixJQUF1QnpDLEdBQUcsQ0FBQ3dDLE9BQUosS0FBZ0IsRUFBdkQ7VUFDTXVELE9BQU8sR0FBRy9GLEdBQUcsQ0FBQ3lDLEdBQUosS0FBWSxPQUFaLElBQXVCekMsR0FBRyxDQUFDd0MsT0FBSixLQUFnQixFQUF2RDtRQUVJd0QsWUFBWSxHQUFHLEtBQUt4SCxRQUFMLENBQWNvRixzQkFBZCxFQUFuQjs7UUFDSW9DLFlBQVksS0FBSyxDQUFDLENBQXRCLEVBQXlCO01BQ3ZCQSxZQUFZLEdBQUdYLGFBQWY7O1VBQ0lXLFlBQVksR0FBRyxDQUFuQixFQUFzQjs7Ozs7OztRQU9uQixLQUFLekIsV0FBTCxJQUFvQm9CLFNBQXJCLElBQW9DLENBQUMsS0FBS3BCLFdBQU4sSUFBcUJtQixVQUE3RCxFQUEwRTtXQUNuRU8sb0JBQUwsQ0FBMEJqRyxHQUExQjtXQUNLa0csZ0JBQUwsQ0FBc0JGLFlBQXRCO0tBRkYsTUFHTyxJQUFLLEtBQUt6QixXQUFMLElBQW9Ca0IsT0FBckIsSUFBa0MsQ0FBQyxLQUFLbEIsV0FBTixJQUFxQmlCLFNBQTNELEVBQXVFO1dBQ3ZFUyxvQkFBTCxDQUEwQmpHLEdBQTFCO1dBQ0ttRyxnQkFBTCxDQUFzQkgsWUFBdEI7S0FGSyxNQUdBLElBQUlKLE1BQUosRUFBWTtXQUNaSyxvQkFBTCxDQUEwQmpHLEdBQTFCO1dBQ0tvRyxpQkFBTDtLQUZLLE1BR0EsSUFBSVAsS0FBSixFQUFXO1dBQ1hJLG9CQUFMLENBQTBCakcsR0FBMUI7V0FDS3FHLGdCQUFMO0tBRkssTUFHQSxJQUFJLEtBQUs3QixzQkFBTCxLQUFnQ3NCLE9BQU8sSUFBSUMsT0FBM0MsQ0FBSixFQUF5RDtXQUN6REUsb0JBQUwsQ0FBMEJqRyxHQUExQixFQUQ4RDs7VUFHMUR1RixjQUFKLEVBQW9CO2FBQ2JOLGdCQUFMLENBQXNCZSxZQUF0QixFQURrQjs7YUFJYnhILFFBQUwsQ0FBYzJGLFVBQWQsQ0FBeUI2QixZQUF6Qjs7Ozs7Ozs7O0VBUU5NLFdBQVcsR0FBRztVQUNOTixZQUFZLEdBQUcsS0FBS3hILFFBQUwsQ0FBY29GLHNCQUFkLEVBQXJCO1FBRUlvQyxZQUFZLEtBQUssQ0FBQyxDQUF0QixFQUF5QjtTQUVwQmYsZ0JBQUwsQ0FBc0JlLFlBQXRCOzs7Ozs7Ozs7O0VBU0ZDLG9CQUFvQixDQUFDakcsR0FBRCxFQUFNO1VBQ2xCdUcsT0FBTyxHQUFJLEdBQUV2RyxHQUFHLENBQUM2QyxNQUFKLENBQVcwRCxPQUFRLEVBQXRCLENBQXdCQyxXQUF4QixFQUFoQjs7UUFDSS9DLHVCQUF1QixDQUFDZ0QsT0FBeEIsQ0FBZ0NGLE9BQWhDLE1BQTZDLENBQUMsQ0FBbEQsRUFBcUQ7TUFDbkR2RyxHQUFHLENBQUMwRyxjQUFKOzs7Ozs7Ozs7RUFRSlIsZ0JBQWdCLENBQUNoQixLQUFELEVBQVE7VUFDaEJ5QixLQUFLLEdBQUcsS0FBS25JLFFBQUwsQ0FBY21GLGdCQUFkLEVBQWQ7UUFDSWlELFNBQVMsR0FBRzFCLEtBQUssR0FBRyxDQUF4Qjs7UUFDSTBCLFNBQVMsSUFBSUQsS0FBakIsRUFBd0I7VUFDbEIsS0FBS3JDLFVBQVQsRUFBcUI7UUFDbkJzQyxTQUFTLEdBQUcsQ0FBWjtPQURGLE1BRU87Ozs7OztTQUtKcEksUUFBTCxDQUFjeUYsZ0JBQWQsQ0FBK0IyQyxTQUEvQjs7Ozs7Ozs7RUFPRlQsZ0JBQWdCLENBQUNqQixLQUFELEVBQVE7UUFDbEIyQixTQUFTLEdBQUczQixLQUFLLEdBQUcsQ0FBeEI7O1FBQ0kyQixTQUFTLEdBQUcsQ0FBaEIsRUFBbUI7VUFDYixLQUFLdkMsVUFBVCxFQUFxQjtRQUNuQnVDLFNBQVMsR0FBRyxLQUFLckksUUFBTCxDQUFjbUYsZ0JBQWQsS0FBbUMsQ0FBL0M7T0FERixNQUVPOzs7Ozs7U0FLSm5GLFFBQUwsQ0FBY3lGLGdCQUFkLENBQStCNEMsU0FBL0I7OztFQUdGVCxpQkFBaUIsR0FBRztRQUNkLEtBQUs1SCxRQUFMLENBQWNtRixnQkFBZCxLQUFtQyxDQUF2QyxFQUEwQztXQUNuQ25GLFFBQUwsQ0FBY3lGLGdCQUFkLENBQStCLENBQS9COzs7O0VBSUpvQyxnQkFBZ0IsR0FBRztVQUNYUyxTQUFTLEdBQUcsS0FBS3RJLFFBQUwsQ0FBY21GLGdCQUFkLEtBQW1DLENBQXJEOztRQUNJbUQsU0FBUyxJQUFJLENBQWpCLEVBQW9CO1dBQ2J0SSxRQUFMLENBQWN5RixnQkFBZCxDQUErQjZDLFNBQS9COzs7Ozs7QUNuUk47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsQUFLQTs7OztBQUdBLE1BQU1DLE9BQU4sU0FBc0JwSSxjQUF0QixDQUFtQzs7RUFFakNMLFdBQVcsQ0FBQyxHQUFHVSxJQUFKLEVBQVU7VUFDYixHQUFHQSxJQUFUOzs7U0FFS2dJLGNBQUw7OztTQUVLQyxZQUFMOzs7U0FFS0MscUJBQUw7OztTQUVLQyxzQkFBTDs7Ozs7Ozs7U0FPS3ZJLFFBQVAsQ0FBZ0JDLElBQWhCLEVBQXNCO1dBQ2IsSUFBSWtJLE9BQUosQ0FBWWxJLElBQVosQ0FBUDs7O0VBR0ZILE9BQU8sR0FBRztTQUNITyxLQUFMLENBQVdXLG1CQUFYLENBQStCLFNBQS9CLEVBQTBDLEtBQUtvSCxjQUEvQztTQUNLL0gsS0FBTCxDQUFXVyxtQkFBWCxDQUErQixPQUEvQixFQUF3QyxLQUFLcUgsWUFBN0M7U0FDS2hJLEtBQUwsQ0FBV1csbUJBQVgsQ0FBK0IsU0FBL0IsRUFBMEMsS0FBS3NILHFCQUEvQztTQUNLakksS0FBTCxDQUFXVyxtQkFBWCxDQUErQixVQUEvQixFQUEyQyxLQUFLdUgsc0JBQWhEOzs7RUFHRjlILGtCQUFrQixHQUFHO1NBQ2Q0SCxZQUFMLEdBQW9CLEtBQUs5SCxXQUFMLENBQWlCbUgsV0FBakIsQ0FBNkJjLElBQTdCLENBQWtDLEtBQUtqSSxXQUF2QyxDQUFwQjtTQUNLNkgsY0FBTCxHQUFzQixLQUFLSyxtQkFBTCxDQUF5QkQsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBdEI7U0FDS0YscUJBQUwsR0FBNkIsS0FBS0ksbUJBQUwsQ0FBeUJGLElBQXpCLENBQThCLElBQTlCLENBQTdCO1NBQ0tELHNCQUFMLEdBQThCLEtBQUtJLG9CQUFMLENBQTBCSCxJQUExQixDQUErQixJQUEvQixDQUE5QjtTQUNLbkksS0FBTCxDQUFXUyxnQkFBWCxDQUE0QixTQUE1QixFQUF1QyxLQUFLc0gsY0FBNUM7U0FDSy9ILEtBQUwsQ0FBV1MsZ0JBQVgsQ0FBNEIsU0FBNUIsRUFBdUMsS0FBS3dILHFCQUE1QztTQUNLakksS0FBTCxDQUFXUyxnQkFBWCxDQUE0QixVQUE1QixFQUF3QyxLQUFLeUgsc0JBQTdDO1NBQ0tLLE1BQUw7U0FDS0Msa0JBQUw7OztFQUdGRCxNQUFNLEdBQUc7VUFDREUsU0FBUyxHQUFHLEtBQUt6SSxLQUFMLENBQVcwSSxZQUFYLENBQXdCeEosU0FBTyxDQUFDaUYsZ0JBQWhDLENBQWxCO1NBQ0t3RSxRQUFMLEdBQWdCRixTQUFTLEtBQUt2SixTQUFPLENBQUNrRiwyQkFBdEMsQ0FGTzs7T0FLSndFLEtBQUgsQ0FBU0MsSUFBVCxDQUFjLEtBQUs3SSxLQUFMLENBQVc4SSxnQkFBWCxDQUE0QixnQ0FBNUIsQ0FBZCxFQUNHQyxPQURILENBQ1lDLEdBQUQsSUFBUztNQUNoQkEsR0FBRyxDQUFDQyxZQUFKLENBQWlCLFVBQWpCLEVBQTZCLENBQUMsQ0FBOUI7S0FGSixFQUxPOztPQVdKTCxLQUFILENBQVNDLElBQVQsQ0FBYyxLQUFLN0ksS0FBTCxDQUFXOEksZ0JBQVgsQ0FBNEI1SixTQUFPLENBQUNvRix3QkFBcEMsQ0FBZCxFQUNHeUUsT0FESCxDQUNZQyxHQUFELElBQVNBLEdBQUcsQ0FBQ0MsWUFBSixDQUFpQixVQUFqQixFQUE2QixDQUFDLENBQTlCLENBRHBCOzs7Ozs7Ozs7O0VBVUZDLGlCQUFpQixDQUFDbkksR0FBRCxFQUFNO1FBQ2pCb0ksV0FBVzs7SUFBK0JwSSxHQUFHLENBQUM2QyxNQUFsRDtRQUNJcUMsS0FBSyxHQUFHLENBQUMsQ0FBYixDQUZxQjs7V0FLZCxDQUFDa0QsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxRQUF0QixDQUErQnBLLFlBQVUsQ0FBQytFLGVBQTFDLENBQUQsSUFDSixDQUFDbUYsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxRQUF0QixDQUErQnBLLFlBQVUsQ0FBQ3NDLElBQTFDLENBREosRUFDcUQ7TUFDbkQ0SCxXQUFXLEdBQUdBLFdBQVcsQ0FBQ0csYUFBMUI7S0FQbUI7OztRQVdqQkgsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxRQUF0QixDQUErQnBLLFlBQVUsQ0FBQytFLGVBQTFDLENBQUosRUFBZ0U7TUFDOURpQyxLQUFLLEdBQUcsS0FBS3NELFlBQUwsQ0FBa0IvQixPQUFsQixDQUEwQjJCLFdBQTFCLENBQVI7OztXQUdLbEQsS0FBUDs7Ozs7Ozs7O0VBUUZvQyxtQkFBbUIsQ0FBQ3RILEdBQUQsRUFBTTtVQUNqQmtGLEtBQUssR0FBRyxLQUFLaUQsaUJBQUwsQ0FBdUJuSSxHQUF2QixDQUFkO1NBQ0tiLFdBQUwsQ0FBaUJpRyxhQUFqQixDQUErQnBGLEdBQS9CLEVBQW9Da0YsS0FBcEM7Ozs7Ozs7OztFQVFGcUMsb0JBQW9CLENBQUN2SCxHQUFELEVBQU07VUFDbEJrRixLQUFLLEdBQUcsS0FBS2lELGlCQUFMLENBQXVCbkksR0FBdkIsQ0FBZDtTQUNLYixXQUFMLENBQWlCbUcsY0FBakIsQ0FBZ0N0RixHQUFoQyxFQUFxQ2tGLEtBQXJDOzs7Ozs7Ozs7RUFRRm1DLG1CQUFtQixDQUFDckgsR0FBRCxFQUFNO1VBQ2pCa0YsS0FBSyxHQUFHLEtBQUtpRCxpQkFBTCxDQUF1Qm5JLEdBQXZCLENBQWQ7O1FBRUlrRixLQUFLLElBQUksQ0FBYixFQUFnQjtXQUNUL0YsV0FBTCxDQUFpQm9ELGFBQWpCLENBQStCdkMsR0FBL0IsRUFBb0NBLEdBQUcsQ0FBQzZDLE1BQUosQ0FBV3dGLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCcEssWUFBVSxDQUFDK0UsZUFBekMsQ0FBcEMsRUFBK0ZpQyxLQUEvRjs7OztFQUlKdUMsa0JBQWtCLEdBQUc7O1VBRWJnQixrQkFBa0IsR0FDdEIsS0FBS3hKLEtBQUwsQ0FBV3lKLGFBQVgsQ0FBMEIsSUFBR3hLLFlBQVUsQ0FBQ2lGLHlCQUEwQixNQUFLakYsWUFBVSxDQUFDZ0Ysd0JBQXlCLEVBQTNHLENBREY7O1FBR0l1RixrQkFBSixFQUF3QjtVQUNsQkEsa0JBQWtCLENBQUNKLFNBQW5CLENBQTZCQyxRQUE3QixDQUFzQ3BLLFlBQVUsQ0FBQ2lGLHlCQUFqRCxDQUFKLEVBQWlGO2FBQzFFaEUsV0FBTCxDQUFpQjRGLG9CQUFqQixDQUFzQyxJQUF0Qzs7O1dBR0c0RCxlQUFMLEdBQXVCLElBQXZCO1dBQ0tDLGFBQUwsR0FBcUIsS0FBS0osWUFBTCxDQUFrQi9CLE9BQWxCLENBQTBCZ0Msa0JBQTFCLENBQXJCOzs7Ozs7TUFLQWIsUUFBSixDQUFhaEQsS0FBYixFQUFvQjtTQUNiekYsV0FBTCxDQUFpQjBGLHNCQUFqQixDQUF3Q0QsS0FBeEM7Ozs7O01BSUU0RCxZQUFKLEdBQW1CO1dBQ1YsR0FBR1gsS0FBSCxDQUFTQyxJQUFULENBQWMsS0FBSzdJLEtBQUwsQ0FBVzhJLGdCQUFYLENBQTRCNUosU0FBTyxDQUFDcUYsc0JBQXBDLENBQWQsQ0FBUDs7Ozs7TUFJRXFGLFNBQUosQ0FBY2pFLEtBQWQsRUFBcUI7U0FDZHpGLFdBQUwsQ0FBaUJ3RixZQUFqQixDQUE4QkMsS0FBOUI7Ozs7O01BSUUrRCxlQUFKLENBQW9CRyxxQkFBcEIsRUFBMkM7UUFDckNBLHFCQUFKLEVBQTJCO1dBQ3BCN0osS0FBTCxDQUFXUyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxLQUFLdUgsWUFBMUM7S0FERixNQUVPO1dBQ0FoSSxLQUFMLENBQVdXLG1CQUFYLENBQStCLE9BQS9CLEVBQXdDLEtBQUtxSCxZQUE3Qzs7O1NBR0c5SCxXQUFMLENBQWlCMkYsa0JBQWpCLENBQW9DZ0UscUJBQXBDOzs7OztNQUlFRixhQUFKLENBQWtCMUQsS0FBbEIsRUFBeUI7U0FDbEIvRixXQUFMLENBQWlCOEYsZ0JBQWpCLENBQWtDQyxLQUFsQzs7Ozs7RUFJRjlGLG9CQUFvQixHQUFHO1dBQ2QsSUFBSXNFLGlCQUFKOztJQUFzRFUsTUFBTSxDQUFDQyxNQUFQLENBQWM7TUFDekVWLGdCQUFnQixFQUFFLE1BQU0sS0FBSzZFLFlBQUwsQ0FBa0JPLE1BRCtCO01BRXpFbkYsc0JBQXNCLEVBQUUsTUFBTSxLQUFLNEUsWUFBTCxDQUFrQi9CLE9BQWxCLENBQTBCckcsUUFBUSxDQUFDNEksYUFBbkMsQ0FGMkM7TUFHekVuRiwyQkFBMkIsRUFBRSxDQUFDcUIsS0FBRCxFQUFRK0QsSUFBUixFQUFjckUsS0FBZCxLQUF3QjtjQUM3Q3NFLE9BQU8sR0FBRyxLQUFLVixZQUFMLENBQWtCdEQsS0FBbEIsQ0FBaEI7O1lBQ0lnRSxPQUFKLEVBQWE7VUFDWEEsT0FBTyxDQUFDaEIsWUFBUixDQUFxQmUsSUFBckIsRUFBMkJyRSxLQUEzQjs7T0FOcUU7TUFTekVkLDhCQUE4QixFQUFFLENBQUNvQixLQUFELEVBQVErRCxJQUFSLEtBQWlCO2NBQ3pDQyxPQUFPLEdBQUcsS0FBS1YsWUFBTCxDQUFrQnRELEtBQWxCLENBQWhCOztZQUNJZ0UsT0FBSixFQUFhO1VBQ1hBLE9BQU8sQ0FBQ0MsZUFBUixDQUF3QkYsSUFBeEI7O09BWnFFO01BZXpFbEYsdUJBQXVCLEVBQUUsQ0FBQ21CLEtBQUQsRUFBUUMsU0FBUixLQUFzQjtjQUN2QytELE9BQU8sR0FBRyxLQUFLVixZQUFMLENBQWtCdEQsS0FBbEIsQ0FBaEI7O1lBQ0lnRSxPQUFKLEVBQWE7VUFDWEEsT0FBTyxDQUFDYixTQUFSLENBQWtCZSxHQUFsQixDQUFzQmpFLFNBQXRCOztPQWxCcUU7TUFxQnpFbkIsMEJBQTBCLEVBQUUsQ0FBQ2tCLEtBQUQsRUFBUUMsU0FBUixLQUFzQjtjQUMxQytELE9BQU8sR0FBRyxLQUFLVixZQUFMLENBQWtCdEQsS0FBbEIsQ0FBaEI7O1lBQ0lnRSxPQUFKLEVBQWE7VUFDWEEsT0FBTyxDQUFDYixTQUFSLENBQWtCZ0IsTUFBbEIsQ0FBeUJsRSxTQUF6Qjs7T0F4QnFFO01BMkJ6RWxCLGdCQUFnQixFQUFHaUIsS0FBRCxJQUFXO2NBQ3JCZ0UsT0FBTyxHQUFHLEtBQUtWLFlBQUwsQ0FBa0J0RCxLQUFsQixDQUFoQjs7WUFDSWdFLE9BQUosRUFBYTtVQUNYQSxPQUFPLENBQUNJLEtBQVI7O09BOUJxRTtNQWlDekVwRiw4QkFBOEIsRUFBRSxDQUFDbUIsYUFBRCxFQUFnQmtFLGFBQWhCLEtBQWtDO2NBQzFETCxPQUFPLEdBQUcsS0FBS1YsWUFBTCxDQUFrQm5ELGFBQWxCLENBQWhCO2NBQ01tRSxnQkFBZ0IsR0FBRyxHQUFHM0IsS0FBSCxDQUFTQyxJQUFULENBQWNvQixPQUFPLENBQUNuQixnQkFBUixDQUF5QjVKLFNBQU8sQ0FBQ29GLHdCQUFqQyxDQUFkLENBQXpCO1FBQ0FpRyxnQkFBZ0IsQ0FBQ3hCLE9BQWpCLENBQTBCQyxHQUFELElBQVNBLEdBQUcsQ0FBQ0MsWUFBSixDQUFpQixVQUFqQixFQUE2QnFCLGFBQTdCLENBQWxDO09BcEN1RTtNQXNDekVwRixVQUFVLEVBQUdlLEtBQUQsSUFBVztjQUNmdUUsUUFBUSxHQUFHLEtBQUtqQixZQUFMLENBQWtCdEQsS0FBbEIsQ0FBakI7O1lBQ0l1RSxRQUFRLElBQUlBLFFBQVEsQ0FBQ0MsSUFBekIsRUFBK0I7VUFDN0JELFFBQVEsQ0FBQ0UsS0FBVDs7O0tBekN1RCxDQUF0RCxDQUFQOzs7OztBQ2hNSixJQUFJQyxrQkFBa0IsR0FBRyxDQUN2QixPQUR1QixFQUV2QixRQUZ1QixFQUd2QixVQUh1QixFQUl2QixTQUp1QixFQUt2QixRQUx1QixFQU12QixZQU51QixFQU92QixpQkFQdUIsRUFRdkIsaUJBUnVCLEVBU3ZCLGtEQVR1QixDQUF6QjtBQVdBLElBQUlDLGlCQUFpQixHQUFHRCxrQkFBa0IsQ0FBQ0UsSUFBbkIsQ0FBd0IsR0FBeEIsQ0FBeEI7QUFFQSxJQUFJQyxPQUFPLEdBQUcsT0FBT2pILE9BQVAsS0FBbUIsV0FBbkIsR0FDVixZQUFZLEVBREYsR0FFVkEsT0FBTyxDQUFDa0gsU0FBUixDQUFrQkQsT0FBbEIsSUFBNkJqSCxPQUFPLENBQUNrSCxTQUFSLENBQWtCQyxpQkFBL0MsSUFBb0VuSCxPQUFPLENBQUNrSCxTQUFSLENBQWtCRSxxQkFGMUY7O0FBSUEsU0FBU0MsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLE9BQXRCLEVBQStCO0VBQzdCQSxPQUFPLEdBQUdBLE9BQU8sSUFBSSxFQUFyQjtNQUVJQyxlQUFlLEdBQUdGLEVBQUUsQ0FBQ0csYUFBSCxJQUFvQkgsRUFBMUM7TUFDSUksZ0JBQWdCLEdBQUcsRUFBdkI7TUFDSUMsZ0JBQWdCLEdBQUcsRUFBdkI7TUFFSUMscUJBQXFCLEdBQUcsSUFBSUMscUJBQUosQ0FBMEJMLGVBQTFCLENBQTVCO01BQ0lNLFVBQVUsR0FBR1IsRUFBRSxDQUFDckMsZ0JBQUgsQ0FBb0I4QixpQkFBcEIsQ0FBakI7O01BRUlRLE9BQU8sQ0FBQ1EsZ0JBQVosRUFBOEI7UUFDeEJkLE9BQU8sQ0FBQ2pDLElBQVIsQ0FBYXNDLEVBQWIsRUFBaUJQLGlCQUFqQixDQUFKLEVBQXlDO01BQ3ZDZSxVQUFVLEdBQUdFLEtBQUssQ0FBQ2QsU0FBTixDQUFnQm5DLEtBQWhCLENBQXNCa0QsS0FBdEIsQ0FBNEJILFVBQTVCLENBQWI7TUFDQUEsVUFBVSxDQUFDSSxPQUFYLENBQW1CWixFQUFuQjs7OztNQUlBYSxDQUFKLEVBQU9DLFNBQVAsRUFBa0JDLGlCQUFsQjs7T0FDS0YsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHTCxVQUFVLENBQUM3QixNQUEzQixFQUFtQ2tDLENBQUMsRUFBcEMsRUFBd0M7SUFDdENDLFNBQVMsR0FBR04sVUFBVSxDQUFDSyxDQUFELENBQXRCO1FBRUksQ0FBQ0csOEJBQThCLENBQUNGLFNBQUQsRUFBWVIscUJBQVosQ0FBbkMsRUFBdUU7SUFFdkVTLGlCQUFpQixHQUFHRSxXQUFXLENBQUNILFNBQUQsQ0FBL0I7O1FBQ0lDLGlCQUFpQixLQUFLLENBQTFCLEVBQTZCO01BQzNCWCxnQkFBZ0IsQ0FBQ2MsSUFBakIsQ0FBc0JKLFNBQXRCO0tBREYsTUFFTztNQUNMVCxnQkFBZ0IsQ0FBQ2EsSUFBakIsQ0FBc0I7UUFDcEJDLGFBQWEsRUFBRU4sQ0FESztRQUVwQk8sUUFBUSxFQUFFTCxpQkFGVTtRQUdwQk0sSUFBSSxFQUFFUDtPQUhSOzs7O01BUUFRLGFBQWEsR0FBR2pCLGdCQUFnQixDQUNqQ2tCLElBRGlCLENBQ1pDLG9CQURZLEVBRWpCQyxHQUZpQixDQUViLFVBQVNDLENBQVQsRUFBWTtXQUFTQSxDQUFDLENBQUNMLElBQVQ7R0FGRCxFQUdqQk0sTUFIaUIsQ0FHVnZCLGdCQUhVLENBQXBCO1NBS09rQixhQUFQOzs7QUFHRnZCLFFBQVEsQ0FBQzZCLFVBQVQsR0FBc0JBLFVBQXRCO0FBQ0E3QixRQUFRLENBQUM4QixXQUFULEdBQXVCQSxXQUF2Qjs7QUFFQSxTQUFTYiw4QkFBVCxDQUF3Q0ssSUFBeEMsRUFBOENmLHFCQUE5QyxFQUFxRTtNQUVqRSxDQUFDd0IsK0JBQStCLENBQUNULElBQUQsRUFBT2YscUJBQVAsQ0FBaEMsSUFDR3lCLGtCQUFrQixDQUFDVixJQUFELENBRHJCLElBRUdKLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLEdBQW9CLENBSHpCLEVBSUU7V0FDTyxLQUFQOzs7U0FFSyxJQUFQOzs7QUFHRixTQUFTTyxVQUFULENBQW9CUCxJQUFwQixFQUEwQmYscUJBQTFCLEVBQWlEO01BQzNDLENBQUNlLElBQUwsRUFBVyxNQUFNLElBQUluTSxLQUFKLENBQVUsa0JBQVYsQ0FBTjtNQUNQeUssT0FBTyxDQUFDakMsSUFBUixDQUFhMkQsSUFBYixFQUFtQjVCLGlCQUFuQixNQUEwQyxLQUE5QyxFQUFxRCxPQUFPLEtBQVA7U0FDOUN1Qiw4QkFBOEIsQ0FBQ0ssSUFBRCxFQUFPZixxQkFBUCxDQUFyQzs7O0FBR0YsU0FBU3dCLCtCQUFULENBQXlDVCxJQUF6QyxFQUErQ2YscUJBQS9DLEVBQXNFO0VBQ3BFQSxxQkFBcUIsR0FBR0EscUJBQXFCLElBQUksSUFBSUMscUJBQUosQ0FBMEJjLElBQUksQ0FBQ2xCLGFBQUwsSUFBc0JrQixJQUFoRCxDQUFqRDs7TUFFRUEsSUFBSSxDQUFDVyxRQUFMLElBQ0dDLGFBQWEsQ0FBQ1osSUFBRCxDQURoQixJQUVHZixxQkFBcUIsQ0FBQzRCLGFBQXRCLENBQW9DYixJQUFwQyxDQUhMLEVBSUU7V0FDTyxLQUFQOzs7U0FFSyxJQUFQOzs7QUFHRixJQUFJYywwQkFBMEIsR0FBRzNDLGtCQUFrQixDQUFDbUMsTUFBbkIsQ0FBMEIsUUFBMUIsRUFBb0NqQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFqQzs7QUFDQSxTQUFTbUMsV0FBVCxDQUFxQlIsSUFBckIsRUFBMkJmLHFCQUEzQixFQUFrRDtNQUM1QyxDQUFDZSxJQUFMLEVBQVcsTUFBTSxJQUFJbk0sS0FBSixDQUFVLGtCQUFWLENBQU47TUFDUHlLLE9BQU8sQ0FBQ2pDLElBQVIsQ0FBYTJELElBQWIsRUFBbUJjLDBCQUFuQixNQUFtRCxLQUF2RCxFQUE4RCxPQUFPLEtBQVA7U0FDdkRMLCtCQUErQixDQUFDVCxJQUFELEVBQU9mLHFCQUFQLENBQXRDOzs7QUFHRixTQUFTVyxXQUFULENBQXFCSSxJQUFyQixFQUEyQjtNQUNyQmUsWUFBWSxHQUFHQyxRQUFRLENBQUNoQixJQUFJLENBQUM5RCxZQUFMLENBQWtCLFVBQWxCLENBQUQsRUFBZ0MsRUFBaEMsQ0FBM0I7TUFDSSxDQUFDK0UsS0FBSyxDQUFDRixZQUFELENBQVYsRUFBMEIsT0FBT0EsWUFBUCxDQUZEOzs7TUFLckJHLGlCQUFpQixDQUFDbEIsSUFBRCxDQUFyQixFQUE2QixPQUFPLENBQVA7U0FDdEJBLElBQUksQ0FBQ0QsUUFBWjs7O0FBR0YsU0FBU0ksb0JBQVQsQ0FBOEJFLENBQTlCLEVBQWlDYyxJQUFqQyxFQUFvQztTQUMzQmQsQ0FBQyxDQUFDTixRQUFGLEtBQWVvQixJQUFDLENBQUNwQixRQUFqQixHQUE0Qk0sQ0FBQyxDQUFDUCxhQUFGLEdBQWtCcUIsSUFBQyxDQUFDckIsYUFBaEQsR0FBZ0VPLENBQUMsQ0FBQ04sUUFBRixHQUFhb0IsSUFBQyxDQUFDcEIsUUFBdEY7Ozs7QUFJRixTQUFTcUIsSUFBVCxDQUFjQyxJQUFkLEVBQW9CQyxTQUFwQixFQUErQjtPQUN4QixJQUFJOUIsQ0FBQyxHQUFHLENBQVIsRUFBV2xDLE1BQU0sR0FBRytELElBQUksQ0FBQy9ELE1BQTlCLEVBQXNDa0MsQ0FBQyxHQUFHbEMsTUFBMUMsRUFBa0RrQyxDQUFDLEVBQW5ELEVBQXVEO1FBQ2pEOEIsU0FBUyxDQUFDRCxJQUFJLENBQUM3QixDQUFELENBQUwsQ0FBYixFQUF3QixPQUFPNkIsSUFBSSxDQUFDN0IsQ0FBRCxDQUFYOzs7O0FBSTVCLFNBQVMwQixpQkFBVCxDQUEyQmxCLElBQTNCLEVBQWlDO1NBQ3hCQSxJQUFJLENBQUN1QixlQUFMLEtBQXlCLE1BQWhDOzs7QUFHRixTQUFTQyxPQUFULENBQWlCeEIsSUFBakIsRUFBdUI7U0FDZEEsSUFBSSxDQUFDbEYsT0FBTCxLQUFpQixPQUF4Qjs7O0FBR0YsU0FBUzhGLGFBQVQsQ0FBdUJaLElBQXZCLEVBQTZCO1NBQ3BCd0IsT0FBTyxDQUFDeEIsSUFBRCxDQUFQLElBQWlCQSxJQUFJLENBQUN5QixJQUFMLEtBQWMsUUFBdEM7OztBQUdGLFNBQVNDLE9BQVQsQ0FBaUIxQixJQUFqQixFQUF1QjtTQUNkd0IsT0FBTyxDQUFDeEIsSUFBRCxDQUFQLElBQWlCQSxJQUFJLENBQUN5QixJQUFMLEtBQWMsT0FBdEM7OztBQUdGLFNBQVNmLGtCQUFULENBQTRCVixJQUE1QixFQUFrQztTQUN6QjBCLE9BQU8sQ0FBQzFCLElBQUQsQ0FBUCxJQUFpQixDQUFDMkIsZUFBZSxDQUFDM0IsSUFBRCxDQUF4Qzs7O0FBR0YsU0FBUzRCLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDO09BQ3pCLElBQUlyQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcUMsS0FBSyxDQUFDdkUsTUFBMUIsRUFBa0NrQyxDQUFDLEVBQW5DLEVBQXVDO1FBQ2pDcUMsS0FBSyxDQUFDckMsQ0FBRCxDQUFMLENBQVNzQyxPQUFiLEVBQXNCO2FBQ2JELEtBQUssQ0FBQ3JDLENBQUQsQ0FBWjs7Ozs7QUFLTixTQUFTbUMsZUFBVCxDQUF5QjNCLElBQXpCLEVBQStCO01BQ3pCLENBQUNBLElBQUksQ0FBQytCLElBQVYsRUFBZ0IsT0FBTyxJQUFQLENBRGE7OztNQUl6QkMsUUFBUSxHQUFHaEMsSUFBSSxDQUFDbEIsYUFBTCxDQUFtQnhDLGdCQUFuQixDQUFvQywrQkFBK0IwRCxJQUFJLENBQUMrQixJQUFwQyxHQUEyQyxJQUEvRSxDQUFmO01BQ0lELE9BQU8sR0FBR0YsZUFBZSxDQUFDSSxRQUFELENBQTdCO1NBQ08sQ0FBQ0YsT0FBRCxJQUFZQSxPQUFPLEtBQUs5QixJQUEvQjs7Ozs7QUFLRixTQUFTZCxxQkFBVCxDQUErQkwsZUFBL0IsRUFBZ0Q7T0FDekNvRCxHQUFMLEdBQVdwRCxlQUFYLENBRDhDOzs7O09BS3pDcUQsS0FBTCxHQUFhLEVBQWI7Ozs7O0FBS0ZoRCxxQkFBcUIsQ0FBQ1gsU0FBdEIsQ0FBZ0M0RCxjQUFoQyxHQUFpRCxTQUFTQSxjQUFULENBQXdCbkMsSUFBeEIsRUFBOEJvQyxpQkFBOUIsRUFBaUQ7TUFDNUZwQyxJQUFJLENBQUNxQyxRQUFMLEtBQWtCQyxJQUFJLENBQUNDLFlBQTNCLEVBQXlDLE9BQU8sS0FBUCxDQUR1RDs7TUFJMUZDLE1BQU0sR0FBR3BCLElBQUksQ0FBQyxLQUFLYyxLQUFOLEVBQWEsVUFBU08sSUFBVCxFQUFlO1dBQ3BDQSxJQUFJLEtBQUt6QyxJQUFoQjtHQURlLENBQWpCO01BR0l3QyxNQUFKLEVBQVksT0FBT0EsTUFBTSxDQUFDLENBQUQsQ0FBYjtFQUVaSixpQkFBaUIsR0FBR0EsaUJBQWlCLElBQUksS0FBS0gsR0FBTCxDQUFTUyxXQUFULENBQXFCQyxnQkFBckIsQ0FBc0MzQyxJQUF0QyxDQUF6QztNQUVJNEMsTUFBTSxHQUFHLEtBQWI7O01BRUlSLGlCQUFpQixDQUFDUyxPQUFsQixLQUE4QixNQUFsQyxFQUEwQztJQUN4Q0QsTUFBTSxHQUFHLElBQVQ7R0FERixNQUVPLElBQUk1QyxJQUFJLENBQUM4QyxVQUFULEVBQXFCO0lBQzFCRixNQUFNLEdBQUcsS0FBS1QsY0FBTCxDQUFvQm5DLElBQUksQ0FBQzhDLFVBQXpCLENBQVQ7OztPQUdHWixLQUFMLENBQVdyQyxJQUFYLENBQWdCLENBQUNHLElBQUQsRUFBTzRDLE1BQVAsQ0FBaEI7U0FFT0EsTUFBUDtDQXJCSjs7QUF3QkExRCxxQkFBcUIsQ0FBQ1gsU0FBdEIsQ0FBZ0NzQyxhQUFoQyxHQUFnRCxTQUFTQSxhQUFULENBQXVCYixJQUF2QixFQUE2QjtNQUN2RUEsSUFBSSxLQUFLLEtBQUtpQyxHQUFMLENBQVNjLGVBQXRCLEVBQXVDLE9BQU8sS0FBUDtNQUNuQ0MsYUFBYSxHQUFHLEtBQUtmLEdBQUwsQ0FBU1MsV0FBVCxDQUFxQkMsZ0JBQXJCLENBQXNDM0MsSUFBdEMsQ0FBcEI7TUFDSSxLQUFLbUMsY0FBTCxDQUFvQm5DLElBQXBCLEVBQTBCZ0QsYUFBMUIsQ0FBSixFQUE4QyxPQUFPLElBQVA7U0FDdkNBLGFBQWEsQ0FBQ0MsVUFBZCxLQUE2QixRQUFwQztDQUpGOztBQU9BLGNBQWMsR0FBR3ZFLFFBQWpCOztBQ3ZNQSxhQUFjLEdBQUd3RSxNQUFqQjtBQUVBLElBQUlDLGNBQWMsR0FBR3hLLE1BQU0sQ0FBQzRGLFNBQVAsQ0FBaUI0RSxjQUF0Qzs7QUFFQSxTQUFTRCxNQUFULEdBQWtCO01BQ1Y5TCxNQUFNLEdBQUcsRUFBYjs7T0FFSyxJQUFJb0ksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRELFNBQVMsQ0FBQzlGLE1BQTlCLEVBQXNDa0MsQ0FBQyxFQUF2QyxFQUEyQztRQUNuQzZELE1BQU0sR0FBR0QsU0FBUyxDQUFDNUQsQ0FBRCxDQUF0Qjs7U0FFSyxJQUFJeEksR0FBVCxJQUFnQnFNLE1BQWhCLEVBQXdCO1VBQ2hCRixjQUFjLENBQUM5RyxJQUFmLENBQW9CZ0gsTUFBcEIsRUFBNEJyTSxHQUE1QixDQUFKLEVBQXNDO1FBQ2xDSSxNQUFNLENBQUNKLEdBQUQsQ0FBTixHQUFjcU0sTUFBTSxDQUFDck0sR0FBRCxDQUFwQjs7Ozs7U0FLTEksTUFBUDs7O0FDZEosSUFBSWtNLGtCQUFrQixHQUFHLElBQXpCOztBQUVBLFNBQVNDLFNBQVQsQ0FBbUI5RixPQUFuQixFQUE0QitGLFdBQTVCLEVBQXlDO01BQ25DdkIsR0FBRyxHQUFHdE4sUUFBVjtNQUNJOE8sU0FBUyxHQUNYLE9BQU9oRyxPQUFQLEtBQW1CLFFBQW5CLEdBQThCd0UsR0FBRyxDQUFDaEYsYUFBSixDQUFrQlEsT0FBbEIsQ0FBOUIsR0FBMkRBLE9BRDdEO01BR0lpRyxNQUFNLEdBQUdDLFNBQUssQ0FDaEI7SUFDRUMsdUJBQXVCLEVBQUUsSUFEM0I7SUFFRUMsaUJBQWlCLEVBQUU7R0FITCxFQUtoQkwsV0FMZ0IsQ0FBbEI7TUFRSU0sS0FBSyxHQUFHO0lBQ1ZDLGlCQUFpQixFQUFFLElBRFQ7SUFFVkMsZ0JBQWdCLEVBQUUsSUFGUjtJQUdWQywyQkFBMkIsRUFBRSxJQUhuQjtJQUlWQyx1QkFBdUIsRUFBRSxJQUpmO0lBS1ZDLE1BQU0sRUFBRSxLQUxFO0lBTVZDLE1BQU0sRUFBRTtHQU5WO01BU0lDLElBQUksR0FBRztJQUNUQyxRQUFRLEVBQUVBLFFBREQ7SUFFVEMsVUFBVSxFQUFFQSxVQUZIO0lBR1RDLEtBQUssRUFBRUEsS0FIRTtJQUlUQyxPQUFPLEVBQUVBO0dBSlg7U0FPT0osSUFBUDs7V0FFU0MsUUFBVCxDQUFrQkksZUFBbEIsRUFBbUM7UUFDN0JaLEtBQUssQ0FBQ0ssTUFBVixFQUFrQjtJQUVsQlEsbUJBQW1CO0lBRW5CYixLQUFLLENBQUNLLE1BQU4sR0FBZSxJQUFmO0lBQ0FMLEtBQUssQ0FBQ00sTUFBTixHQUFlLEtBQWY7SUFDQU4sS0FBSyxDQUFDRywyQkFBTixHQUFvQ2hDLEdBQUcsQ0FBQzFFLGFBQXhDO1FBRUlxSCxVQUFVLEdBQ1pGLGVBQWUsSUFBSUEsZUFBZSxDQUFDRSxVQUFuQyxHQUNJRixlQUFlLENBQUNFLFVBRHBCLEdBRUlsQixNQUFNLENBQUNrQixVQUhiOztRQUlJQSxVQUFKLEVBQWdCO01BQ2RBLFVBQVU7OztJQUdaQyxZQUFZO1dBQ0xSLElBQVA7OztXQUdPRSxVQUFULENBQW9CTyxpQkFBcEIsRUFBdUM7UUFDakMsQ0FBQ2hCLEtBQUssQ0FBQ0ssTUFBWCxFQUFtQjtJQUVuQlksZUFBZTtJQUNmakIsS0FBSyxDQUFDSyxNQUFOLEdBQWUsS0FBZjtJQUNBTCxLQUFLLENBQUNNLE1BQU4sR0FBZSxLQUFmO1FBRUlZLFlBQVksR0FDZEYsaUJBQWlCLElBQUlBLGlCQUFpQixDQUFDRSxZQUFsQixLQUFtQzFSLFNBQXhELEdBQ0l3UixpQkFBaUIsQ0FBQ0UsWUFEdEIsR0FFSXRCLE1BQU0sQ0FBQ3NCLFlBSGI7O1FBSUlBLFlBQUosRUFBa0I7TUFDaEJBLFlBQVk7OztRQUdWQyxXQUFXLEdBQ2JILGlCQUFpQixJQUFJQSxpQkFBaUIsQ0FBQ0csV0FBbEIsS0FBa0MzUixTQUF2RCxHQUNJd1IsaUJBQWlCLENBQUNHLFdBRHRCLEdBRUl2QixNQUFNLENBQUNFLHVCQUhiOztRQUlJcUIsV0FBSixFQUFpQjtNQUNmQyxLQUFLLENBQUMsWUFBVztRQUNmQyxRQUFRLENBQUNyQixLQUFLLENBQUNHLDJCQUFQLENBQVI7T0FERyxDQUFMOzs7V0FLS0ksSUFBUDs7O1dBR09HLEtBQVQsR0FBaUI7UUFDWFYsS0FBSyxDQUFDTSxNQUFOLElBQWdCLENBQUNOLEtBQUssQ0FBQ0ssTUFBM0IsRUFBbUM7SUFDbkNMLEtBQUssQ0FBQ00sTUFBTixHQUFlLElBQWY7SUFDQVcsZUFBZTs7O1dBR1JOLE9BQVQsR0FBbUI7UUFDYixDQUFDWCxLQUFLLENBQUNNLE1BQVAsSUFBaUIsQ0FBQ04sS0FBSyxDQUFDSyxNQUE1QixFQUFvQztJQUNwQ0wsS0FBSyxDQUFDTSxNQUFOLEdBQWUsS0FBZjtJQUNBUyxZQUFZOzs7V0FHTEEsWUFBVCxHQUF3QjtRQUNsQixDQUFDZixLQUFLLENBQUNLLE1BQVgsRUFBbUIsT0FERzs7UUFJbEJiLGtCQUFKLEVBQXdCO01BQ3RCQSxrQkFBa0IsQ0FBQ2tCLEtBQW5COzs7SUFFRmxCLGtCQUFrQixHQUFHZSxJQUFyQjtJQUVBTSxtQkFBbUIsR0FURzs7O0lBYXRCTyxLQUFLLENBQUMsWUFBVztNQUNmQyxRQUFRLENBQUNDLG1CQUFtQixFQUFwQixDQUFSO0tBREcsQ0FBTDtJQUdBbkQsR0FBRyxDQUFDaE8sZ0JBQUosQ0FBcUIsU0FBckIsRUFBZ0NvUixZQUFoQyxFQUE4QyxJQUE5QztJQUNBcEQsR0FBRyxDQUFDaE8sZ0JBQUosQ0FBcUIsV0FBckIsRUFBa0NxUixnQkFBbEMsRUFBb0QsSUFBcEQ7SUFDQXJELEdBQUcsQ0FBQ2hPLGdCQUFKLENBQXFCLFlBQXJCLEVBQW1DcVIsZ0JBQW5DLEVBQXFELElBQXJEO0lBQ0FyRCxHQUFHLENBQUNoTyxnQkFBSixDQUFxQixPQUFyQixFQUE4QnNSLFVBQTlCLEVBQTBDLElBQTFDO0lBQ0F0RCxHQUFHLENBQUNoTyxnQkFBSixDQUFxQixTQUFyQixFQUFnQ3VSLFFBQWhDLEVBQTBDLElBQTFDO1dBRU9uQixJQUFQOzs7V0FHT1UsZUFBVCxHQUEyQjtRQUNyQixDQUFDakIsS0FBSyxDQUFDSyxNQUFQLElBQWlCYixrQkFBa0IsS0FBS2UsSUFBNUMsRUFBa0Q7SUFFbERwQyxHQUFHLENBQUM5TixtQkFBSixDQUF3QixTQUF4QixFQUFtQ2tSLFlBQW5DLEVBQWlELElBQWpEO0lBQ0FwRCxHQUFHLENBQUM5TixtQkFBSixDQUF3QixXQUF4QixFQUFxQ21SLGdCQUFyQyxFQUF1RCxJQUF2RDtJQUNBckQsR0FBRyxDQUFDOU4sbUJBQUosQ0FBd0IsWUFBeEIsRUFBc0NtUixnQkFBdEMsRUFBd0QsSUFBeEQ7SUFDQXJELEdBQUcsQ0FBQzlOLG1CQUFKLENBQXdCLE9BQXhCLEVBQWlDb1IsVUFBakMsRUFBNkMsSUFBN0M7SUFDQXRELEdBQUcsQ0FBQzlOLG1CQUFKLENBQXdCLFNBQXhCLEVBQW1DcVIsUUFBbkMsRUFBNkMsSUFBN0M7SUFFQWxDLGtCQUFrQixHQUFHLElBQXJCO1dBRU9lLElBQVA7OztXQUdPb0IsZ0JBQVQsQ0FBMEJDLFVBQTFCLEVBQXNDO1FBQ2hDQyxXQUFXLEdBQUdqQyxNQUFNLENBQUNnQyxVQUFELENBQXhCO1FBQ0kxRixJQUFJLEdBQUcyRixXQUFYOztRQUNJLENBQUNBLFdBQUwsRUFBa0I7YUFDVCxJQUFQOzs7UUFFRSxPQUFPQSxXQUFQLEtBQXVCLFFBQTNCLEVBQXFDO01BQ25DM0YsSUFBSSxHQUFHaUMsR0FBRyxDQUFDaEYsYUFBSixDQUFrQjBJLFdBQWxCLENBQVA7O1VBQ0ksQ0FBQzNGLElBQUwsRUFBVztjQUNILElBQUluTSxLQUFKLENBQVUsTUFBTTZSLFVBQU4sR0FBbUIsMkJBQTdCLENBQU47Ozs7UUFHQSxPQUFPQyxXQUFQLEtBQXVCLFVBQTNCLEVBQXVDO01BQ3JDM0YsSUFBSSxHQUFHMkYsV0FBVyxFQUFsQjs7VUFDSSxDQUFDM0YsSUFBTCxFQUFXO2NBQ0gsSUFBSW5NLEtBQUosQ0FBVSxNQUFNNlIsVUFBTixHQUFtQix5QkFBN0IsQ0FBTjs7OztXQUdHMUYsSUFBUDs7O1dBR09vRixtQkFBVCxHQUErQjtRQUN6QnBGLElBQUo7O1FBQ0l5RixnQkFBZ0IsQ0FBQyxjQUFELENBQWhCLEtBQXFDLElBQXpDLEVBQStDO01BQzdDekYsSUFBSSxHQUFHeUYsZ0JBQWdCLENBQUMsY0FBRCxDQUF2QjtLQURGLE1BRU8sSUFBSWhDLFNBQVMsQ0FBQzVHLFFBQVYsQ0FBbUJvRixHQUFHLENBQUMxRSxhQUF2QixDQUFKLEVBQTJDO01BQ2hEeUMsSUFBSSxHQUFHaUMsR0FBRyxDQUFDMUUsYUFBWDtLQURLLE1BRUE7TUFDTHlDLElBQUksR0FBRzhELEtBQUssQ0FBQ0MsaUJBQU4sSUFBMkIwQixnQkFBZ0IsQ0FBQyxlQUFELENBQWxEOzs7UUFHRSxDQUFDekYsSUFBTCxFQUFXO1lBQ0gsSUFBSW5NLEtBQUosQ0FDSixvRUFESSxDQUFOOzs7V0FLS21NLElBQVA7R0F4S3FDOzs7O1dBNks5QnNGLGdCQUFULENBQTBCTSxDQUExQixFQUE2QjtRQUN2Qm5DLFNBQVMsQ0FBQzVHLFFBQVYsQ0FBbUIrSSxDQUFDLENBQUN4TyxNQUFyQixDQUFKLEVBQWtDOztRQUM5QnNNLE1BQU0sQ0FBQ21DLHVCQUFYLEVBQW9DO01BQ2xDdEIsVUFBVSxDQUFDO1FBQ1RVLFdBQVcsRUFBRSxDQUFDdkcsVUFBUSxDQUFDOEIsV0FBVCxDQUFxQm9GLENBQUMsQ0FBQ3hPLE1BQXZCO09BRE4sQ0FBVjtLQURGLE1BSU87TUFDTHdPLENBQUMsQ0FBQzNLLGNBQUY7O0dBcExtQzs7O1dBeUw5Qm9LLFlBQVQsQ0FBc0JPLENBQXRCLEVBQXlCOztRQUVuQm5DLFNBQVMsQ0FBQzVHLFFBQVYsQ0FBbUIrSSxDQUFDLENBQUN4TyxNQUFyQixLQUFnQ3dPLENBQUMsQ0FBQ3hPLE1BQUYsWUFBb0IwTyxRQUF4RCxFQUFrRTs7OztJQUdsRUYsQ0FBQyxDQUFDRyx3QkFBRjtJQUNBWixRQUFRLENBQUNyQixLQUFLLENBQUNJLHVCQUFOLElBQWlDa0IsbUJBQW1CLEVBQXJELENBQVI7OztXQUdPSSxRQUFULENBQWtCSSxDQUFsQixFQUFxQjtRQUNmbEMsTUFBTSxDQUFDRyxpQkFBUCxLQUE2QixLQUE3QixJQUFzQ21DLGFBQWEsQ0FBQ0osQ0FBRCxDQUF2RCxFQUE0RDtNQUMxREEsQ0FBQyxDQUFDM0ssY0FBRjtNQUNBc0osVUFBVTs7OztRQUdSMEIsVUFBVSxDQUFDTCxDQUFELENBQWQsRUFBbUI7TUFDakJNLFFBQVEsQ0FBQ04sQ0FBRCxDQUFSOzs7R0F6TW1DOzs7Ozs7V0FrTjlCTSxRQUFULENBQWtCTixDQUFsQixFQUFxQjtJQUNuQmpCLG1CQUFtQjs7UUFDZmlCLENBQUMsQ0FBQ08sUUFBRixJQUFjUCxDQUFDLENBQUN4TyxNQUFGLEtBQWEwTSxLQUFLLENBQUNDLGlCQUFyQyxFQUF3RDtNQUN0RDZCLENBQUMsQ0FBQzNLLGNBQUY7TUFDQWtLLFFBQVEsQ0FBQ3JCLEtBQUssQ0FBQ0UsZ0JBQVAsQ0FBUjs7OztRQUdFLENBQUM0QixDQUFDLENBQUNPLFFBQUgsSUFBZVAsQ0FBQyxDQUFDeE8sTUFBRixLQUFhME0sS0FBSyxDQUFDRSxnQkFBdEMsRUFBd0Q7TUFDdEQ0QixDQUFDLENBQUMzSyxjQUFGO01BQ0FrSyxRQUFRLENBQUNyQixLQUFLLENBQUNDLGlCQUFQLENBQVI7Ozs7O1dBS0t3QixVQUFULENBQW9CSyxDQUFwQixFQUF1QjtRQUNqQmxDLE1BQU0sQ0FBQ21DLHVCQUFYLEVBQW9DO1FBQ2hDcEMsU0FBUyxDQUFDNUcsUUFBVixDQUFtQitJLENBQUMsQ0FBQ3hPLE1BQXJCLENBQUosRUFBa0M7SUFDbEN3TyxDQUFDLENBQUMzSyxjQUFGO0lBQ0EySyxDQUFDLENBQUNHLHdCQUFGOzs7V0FHT3BCLG1CQUFULEdBQStCO1FBQ3pCMUUsYUFBYSxHQUFHdkIsVUFBUSxDQUFDK0UsU0FBRCxDQUE1QjtJQUNBSyxLQUFLLENBQUNDLGlCQUFOLEdBQTBCOUQsYUFBYSxDQUFDLENBQUQsQ0FBYixJQUFvQm1GLG1CQUFtQixFQUFqRTtJQUNBdEIsS0FBSyxDQUFDRSxnQkFBTixHQUNFL0QsYUFBYSxDQUFDQSxhQUFhLENBQUMzQyxNQUFkLEdBQXVCLENBQXhCLENBQWIsSUFBMkM4SCxtQkFBbUIsRUFEaEU7OztXQUlPRCxRQUFULENBQWtCbkYsSUFBbEIsRUFBd0I7UUFDbEJBLElBQUksS0FBS2lDLEdBQUcsQ0FBQzFFLGFBQWpCLEVBQWdDOztRQUM1QixDQUFDeUMsSUFBRCxJQUFTLENBQUNBLElBQUksQ0FBQ25DLEtBQW5CLEVBQTBCO01BQ3hCc0gsUUFBUSxDQUFDQyxtQkFBbUIsRUFBcEIsQ0FBUjs7OztJQUlGcEYsSUFBSSxDQUFDbkMsS0FBTDtJQUNBaUcsS0FBSyxDQUFDSSx1QkFBTixHQUFnQ2xFLElBQWhDOztRQUNJb0csaUJBQWlCLENBQUNwRyxJQUFELENBQXJCLEVBQTZCO01BQzNCQSxJQUFJLENBQUNxRyxNQUFMOzs7OztBQUtOLFNBQVNELGlCQUFULENBQTJCcEcsSUFBM0IsRUFBaUM7U0FFN0JBLElBQUksQ0FBQ2xGLE9BQUwsSUFDQWtGLElBQUksQ0FBQ2xGLE9BQUwsQ0FBYUMsV0FBYixPQUErQixPQUQvQixJQUVBLE9BQU9pRixJQUFJLENBQUNxRyxNQUFaLEtBQXVCLFVBSHpCOzs7QUFPRixTQUFTTCxhQUFULENBQXVCSixDQUF2QixFQUEwQjtTQUNqQkEsQ0FBQyxDQUFDNU8sR0FBRixLQUFVLFFBQVYsSUFBc0I0TyxDQUFDLENBQUM1TyxHQUFGLEtBQVUsS0FBaEMsSUFBeUM0TyxDQUFDLENBQUM3TyxPQUFGLEtBQWMsRUFBOUQ7OztBQUdGLFNBQVNrUCxVQUFULENBQW9CTCxDQUFwQixFQUF1QjtTQUNkQSxDQUFDLENBQUM1TyxHQUFGLEtBQVUsS0FBVixJQUFtQjRPLENBQUMsQ0FBQzdPLE9BQUYsS0FBYyxDQUF4Qzs7O0FBR0YsU0FBU21PLEtBQVQsQ0FBZW9CLEVBQWYsRUFBbUI7U0FDVkMsVUFBVSxDQUFDRCxFQUFELEVBQUssQ0FBTCxDQUFqQjs7O0FBR0YsZUFBYyxHQUFHL0MsU0FBakI7O0FDdFJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLEFBRUE7Ozs7OztBQUtBLFNBQVNpRCx1QkFBVCxDQUFpQ0MsU0FBakMsRUFBNENDLGdCQUFnQixHQUFHQyxXQUEvRCxFQUFnRjtTQUN2RUQsZ0JBQWdCLENBQUNELFNBQUQsRUFBWTtJQUNqQ1osdUJBQXVCLEVBQUUsSUFEUTtJQUVqQ2UsWUFBWSxFQUFFLEtBRm1COztJQUdqQy9DLGlCQUFpQixFQUFFLEtBSGM7O0lBSWpDRCx1QkFBdUIsRUFBRSxLQUpROztHQUFaLENBQXZCOzs7Ozs7O0FDL0JGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLEFBVUE7Ozs7O0FBSUEsTUFBTWlELFNBQU4sU0FBd0IzVCxZQUF4QixDQUFxQzs7OztFQUluQ0wsV0FBVyxDQUFDLEdBQUdVLElBQUosRUFBVTtVQUNiLEdBQUdBLElBQVQ7OztTQUdLdVQsY0FBTDs7O1NBR0t2TCxjQUFMOzs7U0FHS3dMLG9CQUFMOzs7U0FHS0MsaUJBQUw7OztTQUdLQyxVQUFMOzs7U0FHS0MsTUFBTDs7O1NBR0tDLGlCQUFMOzs7U0FHS0MsS0FBTDs7Ozs7Ozs7U0FPS2pVLFFBQVAsQ0FBZ0JDLElBQWhCLEVBQXNCO1dBQ2IsSUFBSXlULFNBQUosQ0FBY3pULElBQWQsQ0FBUDs7Ozs7Ozs7TUFPRW1ELElBQUosR0FBVztXQUNGLEtBQUs3QyxXQUFMLENBQWlCOEMsTUFBakIsRUFBUDs7Ozs7Ozs7TUFPRUQsSUFBSixDQUFTQyxNQUFULEVBQWlCO1FBQ1hBLE1BQUosRUFBWTtXQUNMOUMsV0FBTCxDQUFpQjZDLElBQWpCO0tBREYsTUFFTztXQUNBN0MsV0FBTCxDQUFpQmlELEtBQWpCOzs7O0VBSUpsRCxVQUFVLENBQ1JpVCxnQkFBZ0IsR0FBR0MsV0FEWCxFQUVSVSxXQUFXLEdBQUkxSSxFQUFELElBQVEsSUFBSXJELE9BQUosQ0FBWXFELEVBQVosQ0FGZCxFQUUrQjtVQUNqQzJJLE1BQU07O1NBQWlDOVQsS0FBTCxDQUFXeUosYUFBWCxDQUEwQixJQUFHaEYsaUJBQWlCLENBQUN4RixVQUFsQixDQUE2QnNDLElBQUssRUFBL0QsQ0FBeEM7O1FBQ0l1UyxNQUFKLEVBQVk7V0FDTEYsS0FBTCxHQUFhQyxXQUFXLENBQUNDLE1BQUQsQ0FBeEI7V0FDS0YsS0FBTCxDQUFXaEssU0FBWCxHQUF1QixJQUF2Qjs7O1NBRUc0SixpQkFBTCxHQUF5Qk4sZ0JBQXpCOzs7RUFHRjlTLGtCQUFrQixHQUFHO1VBQ2I7TUFBQ3FCO1FBQVNTLDhCQUE4QixDQUFDakQsVUFBL0M7O1FBRUksS0FBS2UsS0FBTCxDQUFXb0osU0FBWCxDQUFxQkMsUUFBckIsQ0FBOEI1SCxLQUE5QixDQUFKLEVBQTBDO1lBQ2xDO1FBQUNNO1VBQWtCRyw4QkFBOEIsQ0FBQ2hELE9BQXhEO1dBQ0t3VSxNQUFMOztXQUE0QzFULEtBQUwsQ0FBV3NKLGFBQVgsQ0FBeUJHLGFBQXpCLENBQXVDMUgsY0FBdkMsQ0FBdkM7O1dBQ0s0UixpQkFBTCxHQUF5Qjs7V0FBcUR6VCxXQUFOLENBQW1CNkQsZ0JBQW5CLEVBQXhFOztXQUNLMlAsTUFBTCxDQUFZalQsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS2tULGlCQUEzQztXQUNLRixVQUFMLEdBQWtCTSx1QkFBQSxDQUE2QixLQUFLL1QsS0FBbEMsRUFBeUMsS0FBS3dULGlCQUE5QyxDQUFsQjs7O1NBR0d6TCxjQUFMLEdBQXVCaEgsR0FBRCxJQUFTLEtBQUtiLFdBQUwsQ0FBaUJvRCxhQUFqQixDQUErQnZDLEdBQS9CLENBQS9COztTQUNLd1Msb0JBQUwsR0FBNkJ4UyxHQUFELElBQVMsS0FBS2IsV0FBTCxDQUFpQndELG1CQUFqQixDQUFxQzNDLEdBQXJDLENBQXJDOztTQUVLZixLQUFMLENBQVdTLGdCQUFYLENBQTRCLFNBQTVCLEVBQXVDLEtBQUtzSCxjQUE1QztTQUNLL0gsS0FBTCxDQUFXUyxnQkFBWCxDQUE0QixlQUE1QixFQUE2QyxLQUFLOFMsb0JBQWxEOzs7RUFHRjlULE9BQU8sR0FBRztTQUNITyxLQUFMLENBQVdXLG1CQUFYLENBQStCLFNBQS9CLEVBQTBDLEtBQUtvSCxjQUEvQztTQUNLL0gsS0FBTCxDQUFXVyxtQkFBWCxDQUErQixlQUEvQixFQUFnRCxLQUFLNFMsb0JBQXJEOztRQUVJLEtBQUtLLEtBQVQsRUFBZ0I7V0FDVEEsS0FBTCxDQUFXblUsT0FBWDs7O1VBR0k7TUFBQ2dDO1FBQVNTLDhCQUE4QixDQUFDakQsVUFBL0M7O1FBQ0ksS0FBS2UsS0FBTCxDQUFXb0osU0FBWCxDQUFxQkMsUUFBckIsQ0FBOEI1SCxLQUE5QixDQUFKLEVBQTBDO1dBQ25DaVMsTUFBTCxDQUFZL1MsbUJBQVosQ0FBZ0MsT0FBaEM7O1dBQXdFZ1QsaUJBQXhFLEVBRHdDOztXQUduQzVRLElBQUwsR0FBWSxLQUFaOzs7O0VBSUo1QyxvQkFBb0IsR0FBRzs7VUFFZmIsT0FBTzs7SUFBcUM2RixNQUFNLENBQUNDLE1BQVAsQ0FBYztNQUM5RGpELFFBQVEsRUFBRytELFNBQUQsSUFBZSxLQUFLbEcsS0FBTCxDQUFXb0osU0FBWCxDQUFxQmUsR0FBckIsQ0FBeUJqRSxTQUF6QixDQURxQztNQUU5RDlELFdBQVcsRUFBRzhELFNBQUQsSUFBZSxLQUFLbEcsS0FBTCxDQUFXb0osU0FBWCxDQUFxQmdCLE1BQXJCLENBQTRCbEUsU0FBNUIsQ0FGa0M7TUFHOUQ3RCxRQUFRLEVBQUc2RCxTQUFELElBQWUsS0FBS2xHLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCbkQsU0FBOUIsQ0FIcUM7TUFJOUQ1RCxlQUFlLEVBQUUsQ0FBQzJILE9BQUQsRUFBVS9ELFNBQVYsS0FBd0IrRCxPQUFPLENBQUNiLFNBQVIsQ0FBa0JDLFFBQWxCLENBQTJCbkQsU0FBM0IsQ0FKcUI7TUFLOUQzRCxtQkFBbUIsRUFBRSxNQUFNLEtBQUt2QyxLQUFMLENBQVdnVSxxQkFBWCxFQUxtQztNQU05RHRSLFNBQVMsRUFBRSxNQUFNO2FBQ1Y0USxjQUFMLEdBQXNCblMsUUFBUSxDQUFDNEksYUFBL0I7T0FQNEQ7TUFTOURwSCxZQUFZLEVBQUUsTUFBTTtjQUNac1IsYUFBYSxHQUFHLEtBQUtYLGNBQUwsSUFBdUIsS0FBS0EsY0FBTCxDQUFvQmpKLEtBQWpFOztZQUNJLEtBQUtySyxLQUFMLENBQVdxSixRQUFYLENBQW9CbEksUUFBUSxDQUFDNEksYUFBN0IsS0FBK0NrSyxhQUFuRCxFQUFrRTtlQUMzRFgsY0FBTCxDQUFvQmpKLEtBQXBCOztPQVowRDtNQWU5RHpILHlCQUF5QixFQUFFLE1BQU07Y0FDekJzUixlQUFlLEdBQUcsS0FBS2xVLEtBQUwsQ0FBV3lKLGFBQVgsQ0FBMEIsSUFBR2hGLGlCQUFpQixDQUFDeEYsVUFBbEIsQ0FBNkJpRix5QkFBMEIsRUFBcEYsQ0FBeEI7O1lBQ0lnUSxlQUFKLEVBQXFCO1VBQ25CQSxlQUFlLENBQUM3SixLQUFoQjs7T0FsQjBEO01BcUI5RDdILFdBQVcsRUFBRSxNQUFNLEtBQUs1QixJQUFMLENBQVUxQixPQUFPLENBQUM4QyxXQUFsQixFQUErQixFQUEvQixFQUFtQzs7T0FyQlE7TUFzQjlEUyxVQUFVLEVBQUUsTUFBTSxLQUFLN0IsSUFBTCxDQUFVMUIsT0FBTyxDQUFDK0MsVUFBbEIsRUFBOEIsRUFBOUIsRUFBa0M7O09BdEJVO01BdUI5RFksU0FBUyxFQUFFLE1BQU0sS0FBSzRRLFVBQUwsQ0FBZ0IzQyxRQUFoQixFQXZCNkM7TUF3QjlEaE8sWUFBWSxFQUFFLE1BQU0sS0FBSzJRLFVBQUwsQ0FBZ0IxQyxVQUFoQjtLQXhCNEIsQ0FBbEQ7VUEyQk07TUFBQ3ZQLFdBQUQ7TUFBY0M7UUFBU1MsOEJBQThCLENBQUNqRCxVQUE1RDs7UUFDSSxLQUFLZSxLQUFMLENBQVdvSixTQUFYLENBQXFCQyxRQUFyQixDQUE4QjdILFdBQTlCLENBQUosRUFBZ0Q7YUFDdkMsSUFBSVUsOEJBQUosQ0FBbUM1QyxPQUFuQyxDQUFQO0tBREYsTUFFTyxJQUFJLEtBQUtVLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCNUgsS0FBOUIsQ0FBSixFQUEwQzthQUN4QyxJQUFJcUMsd0JBQUosQ0FBNkJ4RSxPQUE3QixDQUFQO0tBREssTUFFQTtZQUNDLElBQUllLEtBQUosQ0FDSCxzRUFBcUVtQixXQUFZLFFBQU9DLEtBQU0sR0FEM0YsQ0FBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0MzS08wUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BMEJMLEtBQUEsRUFBQSxTQUFBLFdBQUEsQ0FBQSxLQUFBLEVBQUE7O1VBRUEsVUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQVlRQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUtFLEdBQUEsYUFBQSxDQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLENBQUE7d0JBQUE7O2VBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQTs7U0FBQSxDQUFBLGdCQUFBLENBQUE7O0tBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQWNMRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BUVQsT0FBQSxDQUFBLGFBQUEsR0FBQSxZQUFBOzs7OztLQUVJLEdBQUEsY0FBQSxPQUFBLFdBQUEsR0FBQTt3QkFBQTs7OztNQUFBOzt5QkFHUUM7Ozs7TUFFWCxlQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBQUE7Ozs7Ozs7S0FZRyxHQUFBLGtCQUFBLE1BQUEscUJBQUE7O29CQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFlRUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDakdFLEtBQUEsRUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFRUixVQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFxQlEsTUFBQSxPQUFBLDJCQUFBLENBQUEsU0FBQSxNQUFBLENBQUEsR0FBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLEVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDWixJQUFNQyxVQUFVLEdBQUUsU0FBWkEsVUFBWSxPQUE0QjtNQUExQnZSLElBQTBCLFFBQTFCQSxJQUEwQjtNQUFyQndSLFNBQXFCLFFBQXJCQSxTQUFxQjtNQUFWQyxLQUFVLFFBQVZBLEtBQVU7U0FHeEMsZUFFRSxFQUFDLE1BQUQ7SUFDRSxLQUFLLE1BRFA7SUFFRSxJQUFJLEVBQUV6UixJQUZSO0lBR0UsT0FBTyxFQUFFLG1CQUFNOztLQUlmLEVBQUMsTUFBRCxDQUFRLFlBQVI7SUFBcUIsU0FBUyxFQUFDO2tCQUU5QjtJQUFPLElBQUksRUFBQyxNQUFaO0lBQW1CLEtBQUssRUFBRTtNQUFDMFIsT0FBTyxFQUFFOztJQUZyQyxDQVBGLEVBV0UsRUFBQyxNQUFELENBQVEsYUFBUixRQUNHRCxLQUFLLElBQUlBLEtBQUssQ0FBQzVILEdBQU4sQ0FBVSxVQUFDcUMsSUFBRCxFQUFNakQsQ0FBTixFQUFVO1dBRTFCLEVBQUMsTUFBRCxDQUFRLFVBQVI7TUFBbUIsT0FBTyxFQUFFdUksU0FBNUI7TUFBdUMsSUFBSSxZQUFLdEYsSUFBSSxDQUFDeUYsS0FBVjtPQUMxQ3pGLElBQUksQ0FBQzBGLEtBRE4sQ0FERjtHQURRLENBRFosQ0FYRixDQUZGLENBREY7Q0FGSjs7QUNOQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTTNWLGVBQU4sQ0FBb0I7O2FBRVBDLFVBQVgsR0FBd0I7OztXQUdmLEVBQVA7Ozs7O2FBSVNDLE9BQVgsR0FBcUI7OztXQUdaLEVBQVA7Ozs7O2FBSVNDLE9BQVgsR0FBcUI7OztXQUdaLEVBQVA7Ozs7O2FBSVNDLGNBQVgsR0FBNEI7Ozs7V0FJbkIsRUFBUDs7Ozs7OztFQU1GQyxXQUFXLENBQUNDLE9BQU8sR0FBRyxFQUFYLEVBQWU7O1NBRW5CQyxRQUFMLEdBQWdCRCxPQUFoQjs7O0VBR0ZFLElBQUksR0FBRzs7O0VBSVBDLE9BQU8sR0FBRzs7Ozs7QUNwRVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsQUFFQTs7OztBQUdBLE1BQU1DLGNBQU4sQ0FBbUI7Ozs7O1NBS1ZDLFFBQVAsQ0FBZ0JDLElBQWhCLEVBQXNCOzs7OztXQUtiLElBQUlGLGNBQUosQ0FBaUJFLElBQWpCLEVBQXVCLElBQUlaLGVBQUosRUFBdkIsQ0FBUDs7Ozs7Ozs7O0VBUUZLLFdBQVcsQ0FBQ08sSUFBRCxFQUFPQyxVQUFVLEdBQUdDLFNBQXBCLEVBQStCLEdBQUdDLElBQWxDLEVBQXdDOztTQUU1Q0MsS0FBTCxHQUFhSixJQUFiO1NBQ0tLLFVBQUwsQ0FBZ0IsR0FBR0YsSUFBbkIsRUFIaUQ7Ozs7O1NBTzVDRyxXQUFMLEdBQW1CTCxVQUFVLEtBQUtDLFNBQWYsR0FBMkIsS0FBS0ssb0JBQUwsRUFBM0IsR0FBeUROLFVBQTVFO1NBQ0tLLFdBQUwsQ0FBaUJWLElBQWpCO1NBQ0tZLGtCQUFMOzs7RUFHRkgsVUFBVTs7SUFBQTs7Ozs7Ozs7O0VBU1ZFLG9CQUFvQixHQUFHOzs7VUFHZixJQUFJRSxLQUFKLENBQVUsbUZBQ2Qsa0JBREksQ0FBTjs7O0VBSUZELGtCQUFrQixHQUFHOzs7Ozs7RUFPckJYLE9BQU8sR0FBRzs7O1NBR0hTLFdBQUwsQ0FBaUJULE9BQWpCOzs7Ozs7Ozs7O0VBU0ZhLE1BQU0sQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CO1NBQ2xCUixLQUFMLENBQVdTLGdCQUFYLENBQTRCRixPQUE1QixFQUFxQ0MsT0FBckM7Ozs7Ozs7Ozs7RUFTRkUsUUFBUSxDQUFDSCxPQUFELEVBQVVDLE9BQVYsRUFBbUI7U0FDcEJSLEtBQUwsQ0FBV1csbUJBQVgsQ0FBK0JKLE9BQS9CLEVBQXdDQyxPQUF4Qzs7Ozs7Ozs7Ozs7RUFVRkksSUFBSSxDQUFDTCxPQUFELEVBQVVNLE9BQVYsRUFBbUJDLFlBQVksR0FBRyxLQUFsQyxFQUF5QztRQUN2Q0MsR0FBSjs7UUFDSSxPQUFPQyxXQUFQLEtBQXVCLFVBQTNCLEVBQXVDO01BQ3JDRCxHQUFHLEdBQUcsSUFBSUMsV0FBSixDQUFnQlQsT0FBaEIsRUFBeUI7UUFDN0JVLE1BQU0sRUFBRUosT0FEcUI7UUFFN0JLLE9BQU8sRUFBRUo7T0FGTCxDQUFOO0tBREYsTUFLTztNQUNMQyxHQUFHLEdBQUdJLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQixhQUFyQixDQUFOO01BQ0FMLEdBQUcsQ0FBQ00sZUFBSixDQUFvQmQsT0FBcEIsRUFBNkJPLFlBQTdCLEVBQTJDLEtBQTNDLEVBQWtERCxPQUFsRDs7O1NBR0diLEtBQUwsQ0FBV3NCLGFBQVgsQ0FBeUJQLEdBQXpCOzs7OztBQzlISjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU05QixZQUFVLEdBQUc7RUFDakIyVixXQUFXLEVBQUUsd0JBREk7RUFFakJDLG9CQUFvQixFQUFFLGlDQUZMO0VBR2pCQyxXQUFXLEVBQUUsd0JBSEk7RUFJakJDLDJCQUEyQixFQUFFLHdDQUpaO0VBS2pCQyxxQkFBcUIsRUFBRTtDQUx6Qjs7O0FBU0EsTUFBTTdWLE9BQU8sR0FBRztFQUNkOFYsZ0NBQWdDLEVBQUUsR0FEcEI7RUFFZEMsc0JBQXNCLEVBQUU7Q0FGMUI7OztBQU1BLE1BQU1oVyxTQUFPLEdBQUc7RUFDZGlXLG9CQUFvQixFQUFFLCtCQURSO0VBRWRDLGdCQUFnQixFQUFFLGtCQUZKO0VBR2RDLHdCQUF3QixFQUFFLG1DQUhaO0VBSWRDLGFBQWEsRUFBRSxrQkFKRDtFQUtkQyxjQUFjLEVBQUU7Q0FMbEI7O0FDdkNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLEFBSUE7Ozs7QUFHQSxNQUFNQywwQkFBTixTQUF5Q3hXLGVBQXpDLENBQXVEOzthQUUxQ0UsT0FBWCxHQUFxQjtXQUNaQSxTQUFQOzs7OzthQUlTRCxVQUFYLEdBQXdCO1dBQ2ZBLFlBQVA7Ozs7O2FBSVNFLE9BQVgsR0FBcUI7V0FDWkEsT0FBUDs7Ozs7Ozs7O2FBUVNDLGNBQVgsR0FBNEI7Ozs7UUFFeEJpRCxRQUFRLEVBQUU7O1VBRGdDO1FBRTFDRixRQUFRLEVBQUU7O1VBRmdDO1FBRzFDQyxXQUFXLEVBQUU7O1VBSDZCO1FBSTFDcVQsUUFBUSxFQUFFOztVQUpnQztRQUsxQ0Msa0JBQWtCLEVBQUUsTUFBTSxFQUxnQjtRQU0xQ0Msd0NBQXdDLEVBQUU7O1VBTkE7UUFPMUNDLDBDQUEwQyxFQUFFOztVQVBGO1FBUTFDQywyQkFBMkIsRUFBRSxNQUFNLEVBUk87UUFTMUNDLHFCQUFxQixFQUFFOztVQVRtQjtRQVUxQ0MsdUJBQXVCLEVBQUU7O1VBVmlCO1FBVzFDQyxxQkFBcUIsRUFBRTs7VUFYbUI7UUFZMUNDLHVCQUF1QixFQUFFOztVQVppQjtRQWExQ0Msa0JBQWtCLEVBQUU7O1NBYnNCO1FBYzFDQyxtQkFBbUIsRUFBRTs7Ozs7Ozs7Ozs7RUFPekI5VyxXQUFXOztFQUFxQ0MsT0FBckMsRUFBOEM7VUFDakQ2RixNQUFNLENBQUNDLE1BQVAsQ0FBY29RLDBCQUEwQixDQUFDcFcsY0FBekMsRUFBeURFLE9BQXpELENBQU47O1NBRUs4VyxnQkFBTCxHQUF3QixNQUFNLEtBQUs3VyxRQUFMLENBQWNzVywyQkFBZCxFQUE5Qjs7U0FFS1EsY0FBTCxHQUFzQixNQUFNLEVBQTVCOzs7RUFHRjdXLElBQUksR0FBRztTQUNBRCxRQUFMLENBQWNvVyx3Q0FBZCxDQUF1RCxPQUF2RCxFQUFnRSxLQUFLUyxnQkFBckU7OztFQUdGM1csT0FBTyxHQUFHO1NBQ0hGLFFBQUwsQ0FBY3FXLDBDQUFkLENBQXlELE9BQXpELEVBQWtFLEtBQUtRLGdCQUF2RTs7O0VBR0ZFLGlCQUFpQixHQUFHO1NBQ2IvVyxRQUFMLENBQWN1VyxxQkFBZCxDQUFvQyxLQUFLTyxjQUF6Qzs7O0VBR0ZFLG9CQUFvQixHQUFHO1NBQ2hCaFgsUUFBTCxDQUFjd1csdUJBQWQsQ0FBc0MsS0FBS00sY0FBM0M7Ozs7O0FDOUZKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLEFBSUE7Ozs7O0FBSUEsTUFBTUcsMkJBQU4sU0FBMENDLDBCQUExQyxDQUFpRTs7OztFQUkvRHBYLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO1VBQ2JBLE9BQU47OztTQUVLb1gsWUFBTCxHQUFvQixLQUFwQjs7U0FFS0wsY0FBTCxHQUFzQixNQUFNLEtBQUtNLG1CQUFMLEVBQTVCOzs7RUFHRm5YLElBQUksR0FBRztVQUNDQSxJQUFOO1NBQ0tELFFBQUwsQ0FBY3VXLHFCQUFkLENBQW9DLEtBQUtPLGNBQXpDOzs7RUFHRjVXLE9BQU8sR0FBRztVQUNGQSxPQUFOO1NBQ0tGLFFBQUwsQ0FBY3dXLHVCQUFkLENBQXNDLEtBQUtNLGNBQTNDOzs7Ozs7OztFQU9GTSxtQkFBbUIsR0FBRztVQUNkQyxhQUFhLEdBQUcsS0FBS3JYLFFBQUwsQ0FBYzJXLGtCQUFkLEVBQXRCOztRQUVJVSxhQUFhLElBQUksQ0FBckIsRUFBd0I7VUFDbEIsS0FBS0YsWUFBVCxFQUF1QjthQUNoQm5YLFFBQUwsQ0FBYzZDLFdBQWQsQ0FBMEJuRCxZQUFVLENBQUM0VixvQkFBckM7YUFDSzZCLFlBQUwsR0FBb0IsS0FBcEI7O0tBSEosTUFLTztVQUNELENBQUMsS0FBS0EsWUFBVixFQUF3QjthQUNqQm5YLFFBQUwsQ0FBYzRDLFFBQWQsQ0FBdUJsRCxZQUFVLENBQUM0VixvQkFBbEM7YUFDSzZCLFlBQUwsR0FBb0IsSUFBcEI7Ozs7Ozs7QUNwRVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsQUFJQTs7Ozs7QUFJQSxNQUFNRywyQkFBTixTQUEwQ3JCLDBCQUExQyxDQUFxRTs7OztFQUluRW5XLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO1VBQ2JBLE9BQU4sRUFEbUI7O1NBR2R3WCxXQUFMLEdBQW1CLEtBQW5COztTQUVLVCxjQUFMLEdBQXNCLE1BQU0sS0FBS1UseUJBQUwsRUFBNUI7OztFQUdGdlgsSUFBSSxHQUFHO1VBQ0NBLElBQU47VUFDTXdYLGlCQUFpQixHQUFHLEtBQUt6WCxRQUFMLENBQWM4QyxRQUFkLENBQXVCcEQsWUFBVSxDQUFDK1YscUJBQWxDLENBQTFCOztRQUVJLEtBQUt6VixRQUFMLENBQWM0VyxtQkFBZCxLQUFzQyxDQUExQyxFQUE2QztXQUN0QzVXLFFBQUwsQ0FBYzRDLFFBQWQsQ0FBdUJsRCxZQUFVLENBQUM4ViwyQkFBbEM7OztRQUdFLENBQUNpQyxpQkFBTCxFQUF3QjtXQUNqQnpYLFFBQUwsQ0FBY3VXLHFCQUFkLENBQW9DLEtBQUtPLGNBQXpDO1dBQ0tVLHlCQUFMOzs7O0VBSUp0WCxPQUFPLEdBQUc7VUFDRkEsT0FBTjtTQUNLRixRQUFMLENBQWN3Vyx1QkFBZCxDQUFzQyxLQUFLTSxjQUEzQzs7Ozs7Ozs7O0VBU0ZVLHlCQUF5QixHQUFHO1VBQ3BCSCxhQUFhLEdBQUcsS0FBS3JYLFFBQUwsQ0FBYzJXLGtCQUFkLEVBQXRCOztRQUVJVSxhQUFhLElBQUksQ0FBckIsRUFBd0I7VUFDbEIsS0FBS0UsV0FBVCxFQUFzQjthQUNmdlgsUUFBTCxDQUFjNkMsV0FBZCxDQUEwQm5ELFlBQVUsQ0FBQytWLHFCQUFyQzthQUNLOEIsV0FBTCxHQUFtQixLQUFuQjs7S0FISixNQUtPO1VBQ0QsQ0FBQyxLQUFLQSxXQUFWLEVBQXVCO2FBQ2hCdlgsUUFBTCxDQUFjNEMsUUFBZCxDQUF1QmxELFlBQVUsQ0FBQytWLHFCQUFsQzthQUNLOEIsV0FBTCxHQUFtQixJQUFuQjs7Ozs7OztBQy9FUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxBQUlBLE1BQU1HLGFBQWEsR0FBRyxDQUF0Qjs7Ozs7O0FBS0EsTUFBTVIsc0JBQU4sU0FBcUNqQiwwQkFBckMsQ0FBZ0U7Ozs7RUFJOURuVyxXQUFXLENBQUNDLE9BQUQsRUFBVTtVQUNiQSxPQUFOOzs7Ozs7U0FLSzRYLG1CQUFMLEdBQTJCLEtBQUszWCxRQUFMLENBQWMyVyxrQkFBZCxFQUEzQjs7Ozs7O1NBTUtpQixnQkFBTCxHQUF3QixLQUFLNVgsUUFBTCxDQUFjbVcsa0JBQWQsRUFBeEI7Ozs7Ozs7U0FPSzBCLFVBQUwsR0FBa0IsSUFBbEI7Ozs7Ozs7U0FPS0MsZ0JBQUwsR0FBd0IsSUFBeEI7Ozs7OztTQU1LQyx1QkFBTCxHQUErQixDQUEvQjs7Ozs7U0FLS0Msd0JBQUwsR0FBZ0MsS0FBaEM7Ozs7OztTQU1LQyxpQkFBTCxHQUF5QlAsYUFBekI7Ozs7OztTQU1LUSxpQkFBTCxHQUF5QlIsYUFBekI7O1NBRUtaLGNBQUwsR0FBc0IsTUFBTSxLQUFLcUIsdUJBQUwsRUFBNUI7O1NBQ0tDLGNBQUwsR0FBc0IsTUFBTSxLQUFLQyx1QkFBTCxFQUE1Qjs7O0VBR0ZwWSxJQUFJLEdBQUc7VUFDQ0EsSUFBTjtTQUNLRCxRQUFMLENBQWN1VyxxQkFBZCxDQUFvQyxLQUFLTyxjQUF6QztTQUNLOVcsUUFBTCxDQUFjeVcscUJBQWQsQ0FBb0MsS0FBSzJCLGNBQXpDOzs7RUFHRmxZLE9BQU8sR0FBRztVQUNGQSxPQUFOO1NBQ0tGLFFBQUwsQ0FBY3dXLHVCQUFkLENBQXNDLEtBQUtNLGNBQTNDO1NBQ0s5VyxRQUFMLENBQWMwVyx1QkFBZCxDQUFzQyxLQUFLMEIsY0FBM0M7U0FDS3BZLFFBQUwsQ0FBY2tXLFFBQWQsQ0FBdUIsS0FBdkIsRUFBOEIsRUFBOUI7Ozs7Ozs7OztFQVFGb0MsZUFBZSxHQUFHO1VBQ1ZDLG9CQUFvQixHQUFHLENBQUMsS0FBS1gsZ0JBQW5DO1VBQ01ZLHFCQUFxQixHQUFHLEtBQUtULHVCQUFMLEdBQStCLENBQTdEO1VBQ01VLG9CQUFvQixHQUFHLEtBQUtWLHVCQUFMLEdBQStCUSxvQkFBNUQ7VUFDTUcsZ0JBQWdCLEdBQUdGLHFCQUFxQixJQUFJQyxvQkFBbEQsQ0FKZ0I7O1FBT1pDLGdCQUFKLEVBQXNCO1dBQ2ZiLFVBQUwsR0FBa0IsS0FBbEI7S0FERixNQUVPOztVQUVELENBQUMsS0FBS0EsVUFBVixFQUFzQjthQUNmQSxVQUFMLEdBQWtCLElBQWxCO2VBQ08sSUFBUDtPQUZGLE1BR08sSUFBSSxLQUFLQyxnQkFBTCxLQUEwQlcsb0JBQTlCLEVBQW9EO2FBQ3BEWCxnQkFBTCxHQUF3Qlcsb0JBQXhCO2VBQ08sSUFBUDs7OztXQUlHQyxnQkFBUDs7Ozs7Ozs7RUFPRkMsY0FBYyxHQUFHO1FBQ1gsS0FBS0wsZUFBTCxFQUFKLEVBQTRCOzs7VUFHdEJNLE1BQU0sR0FBRyxLQUFLYix1QkFBbEI7O1VBQ0ljLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixNQUFULEtBQW9CLEtBQUtoQixnQkFBN0IsRUFBK0M7UUFDN0NnQixNQUFNLEdBQUcsQ0FBQ2haLE9BQU8sQ0FBQytWLHNCQUFsQjs7O1dBR0czVixRQUFMLENBQWNrVyxRQUFkLENBQXVCLEtBQXZCLEVBQThCMEMsTUFBTSxHQUFHLElBQXZDOzs7Ozs7Ozs7RUFRSlQsdUJBQXVCLEdBQUc7VUFDbEJZLHFCQUFxQixHQUFHRixJQUFJLENBQUNHLEdBQUwsQ0FBUyxLQUFLaFosUUFBTCxDQUFjMlcsa0JBQWQsRUFBVCxFQUE2QyxDQUE3QyxDQUE5QjtVQUNNc0MsSUFBSSxHQUFHRixxQkFBcUIsR0FBRyxLQUFLcEIsbUJBQTFDO1NBQ0tBLG1CQUFMLEdBQTJCb0IscUJBQTNCLENBSHdCOzs7UUFPcEIsQ0FBQyxLQUFLZix3QkFBVixFQUFvQztXQUM3QkQsdUJBQUwsSUFBZ0NrQixJQUFoQzs7VUFFSSxLQUFLbEIsdUJBQUwsR0FBK0IsQ0FBbkMsRUFBc0M7YUFDL0JBLHVCQUFMLEdBQStCLENBQS9CO09BREYsTUFFTyxJQUFJYyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLZix1QkFBZCxJQUF5QyxLQUFLSCxnQkFBbEQsRUFBb0U7YUFDcEVHLHVCQUFMLEdBQStCLENBQUMsS0FBS0gsZ0JBQXJDOzs7V0FHR2UsY0FBTDs7Ozs7Ozs7O0VBUUpOLHVCQUF1QixHQUFHOztRQUVwQixDQUFDLEtBQUtKLGlCQUFWLEVBQTZCO1dBQ3RCQSxpQkFBTCxHQUF5QnpFLFVBQVUsQ0FBQyxNQUFNO2FBQ25DeUUsaUJBQUwsR0FBeUJQLGFBQXpCO2FBQ0t3Qix1QkFBTDtPQUZpQyxFQUdoQ3RaLE9BQU8sQ0FBQzhWLGdDQUh3QixDQUFuQzs7O1NBTUdzQyx3QkFBTCxHQUFnQyxJQUFoQzs7UUFFSSxLQUFLRSxpQkFBVCxFQUE0QjtNQUMxQmlCLFlBQVksQ0FBQyxLQUFLakIsaUJBQU4sQ0FBWjs7O1NBR0dBLGlCQUFMLEdBQXlCMUUsVUFBVSxDQUFDLE1BQU07V0FDbkMyRSx1QkFBTDtXQUNLSCx3QkFBTCxHQUFnQyxLQUFoQztXQUNLRSxpQkFBTCxHQUF5QlIsYUFBekI7S0FIaUMsRUFJaEM5WCxPQUFPLENBQUM4VixnQ0FKd0IsQ0FBbkM7Ozs7Ozs7OztFQVlGd0QsdUJBQXVCLEdBQUc7VUFDbEJFLGFBQWEsR0FBRyxLQUFLcFosUUFBTCxDQUFjbVcsa0JBQWQsRUFBdEI7O1FBQ0ksS0FBS3lCLGdCQUFMLEtBQTBCd0IsYUFBOUIsRUFBNkM7V0FDdEN2QixVQUFMLEdBQWtCLEtBQWxCLENBRDJDOzs7O1dBTXRDRSx1QkFBTCxJQUFnQyxLQUFLSCxnQkFBTCxHQUF3QndCLGFBQXhEO1dBQ0t4QixnQkFBTCxHQUF3QndCLGFBQXhCOzs7U0FFR2pCLHVCQUFMOzs7OztBQ3ZOSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxBQVNBOzs7OztBQUlBLE1BQU1rQixZQUFOLFNBQTJCbFosY0FBM0IsQ0FBd0M7Ozs7RUFJdENMLFdBQVcsQ0FBQyxHQUFHVSxJQUFKLEVBQVU7VUFDYixHQUFHQSxJQUFUOzs7U0FFSzhZLFFBQUw7OztTQUVLQyxZQUFMOzs7U0FFS0MsYUFBTDs7O0VBR0Y5WSxVQUFVLENBQ1IrWSxhQUFhLEdBQUk3TixFQUFELElBQVE4TixTQUFTLENBQUN0WixRQUFWLENBQW1Cd0wsRUFBbkIsQ0FEaEIsRUFDd0M7U0FDM0MwTixRQUFMLEdBQWdCLEtBQUs3WSxLQUFMLENBQVd5SixhQUFYLENBQXlCdkssU0FBTyxDQUFDbVcsd0JBQWpDLENBQWhCLENBRGdEOztVQUkxQzZELEtBQUssR0FBRyxHQUFHdFEsS0FBSCxDQUFTQyxJQUFULENBQWMsS0FBSzdJLEtBQUwsQ0FBVzhJLGdCQUFYLENBQTRCNUosU0FBTyxDQUFDaVcsb0JBQXBDLENBQWQsQ0FBZDs7UUFDSSxLQUFLMEQsUUFBVCxFQUFtQjtNQUNqQkssS0FBSyxDQUFDN00sSUFBTixDQUFXLEtBQUt3TSxRQUFoQjs7O1NBR0dDLFlBQUwsR0FBb0JJLEtBQUssQ0FBQ3RNLEdBQU4sQ0FBV3VNLElBQUQsSUFBVTtZQUNoQ0MsTUFBTSxHQUFHSixhQUFhLENBQUNHLElBQUQsQ0FBNUI7TUFDQUMsTUFBTSxDQUFDQyxTQUFQLEdBQW1CLElBQW5CO2FBQ09ELE1BQVA7S0FIa0IsQ0FBcEI7OztFQU9GM1osT0FBTyxHQUFHO1NBQ0hxWixZQUFMLENBQWtCL1AsT0FBbEIsQ0FBMkJ1USxVQUFELElBQWdCQSxVQUFVLENBQUM3WixPQUFYLEVBQTFDO1VBQ01BLE9BQU47OztFQUdGOFosZUFBZSxDQUFDM1YsTUFBRCxFQUFTO1NBQ2pCMUQsV0FBTCxDQUFpQnFXLG9CQUFqQjtTQUNLd0MsYUFBTCxHQUFxQm5WLE1BQXJCO1NBQ0sxRCxXQUFMLENBQWlCb1csaUJBQWpCOzs7Ozs7OztTQU9LM1csUUFBUCxDQUFnQkMsSUFBaEIsRUFBc0I7V0FDYixJQUFJZ1osWUFBSixDQUFpQmhaLElBQWpCLENBQVA7Ozs7Ozs7RUFNRk8sb0JBQW9CLEdBQUc7O1VBRWZiLE9BQU87O0lBQXdDNkYsTUFBTSxDQUFDQyxNQUFQLENBQWM7TUFDakUvQyxRQUFRLEVBQUc2RCxTQUFELElBQWUsS0FBS2xHLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCbkQsU0FBOUIsQ0FEd0M7TUFFakUvRCxRQUFRLEVBQUcrRCxTQUFELElBQWUsS0FBS2xHLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJlLEdBQXJCLENBQXlCakUsU0FBekIsQ0FGd0M7TUFHakU5RCxXQUFXLEVBQUc4RCxTQUFELElBQWUsS0FBS2xHLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJnQixNQUFyQixDQUE0QmxFLFNBQTVCLENBSHFDO01BSWpFdVAsUUFBUSxFQUFFLENBQUMrRCxRQUFELEVBQVc3VCxLQUFYLEtBQXFCLEtBQUszRixLQUFMLENBQVd5WixLQUFYLENBQWlCQyxXQUFqQixDQUE2QkYsUUFBN0IsRUFBdUM3VCxLQUF2QyxDQUprQztNQUtqRStQLGtCQUFrQixFQUFFLE1BQU0sS0FBSzFWLEtBQUwsQ0FBVzJaLFlBTDRCO01BTWpFaEUsd0NBQXdDLEVBQUUsQ0FBQ3BWLE9BQUQsRUFBVUMsT0FBVixLQUFzQjtZQUMxRCxLQUFLcVksUUFBVCxFQUFtQjtlQUNaQSxRQUFMLENBQWNwWSxnQkFBZCxDQUErQkYsT0FBL0IsRUFBd0NDLE9BQXhDOztPQVI2RDtNQVdqRW9WLDBDQUEwQyxFQUFFLENBQUNyVixPQUFELEVBQVVDLE9BQVYsS0FBc0I7WUFDNUQsS0FBS3FZLFFBQVQsRUFBbUI7ZUFDWkEsUUFBTCxDQUFjbFksbUJBQWQsQ0FBa0NKLE9BQWxDLEVBQTJDQyxPQUEzQzs7T0FiNkQ7TUFnQmpFcVYsMkJBQTJCLEVBQUUsTUFBTTthQUM1QmpWLElBQUwsQ0FBVTFCLFNBQU8sQ0FBQ2tXLGdCQUFsQixFQUFvQyxFQUFwQztPQWpCK0Q7TUFtQmpFVSxxQkFBcUIsRUFBR3RWLE9BQUQsSUFBYSxLQUFLdVksYUFBTCxDQUFtQnRZLGdCQUFuQixDQUFvQyxRQUFwQyxFQUE4Q0QsT0FBOUMsQ0FuQjZCO01Bb0JqRXVWLHVCQUF1QixFQUFHdlYsT0FBRCxJQUFhLEtBQUt1WSxhQUFMLENBQW1CcFksbUJBQW5CLENBQXVDLFFBQXZDLEVBQWlESCxPQUFqRCxDQXBCMkI7TUFxQmpFd1YscUJBQXFCLEVBQUd4VixPQUFELElBQWFvWixNQUFNLENBQUNuWixnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0QsT0FBbEMsQ0FyQjZCO01Bc0JqRXlWLHVCQUF1QixFQUFHelYsT0FBRCxJQUFhb1osTUFBTSxDQUFDalosbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNILE9BQXJDLENBdEIyQjtNQXVCakUwVixrQkFBa0IsRUFBRSxNQUNsQixLQUFLNkMsYUFBTCxDQUFtQixLQUFLQSxhQUFMLEtBQXVCYSxNQUF2QixHQUFnQyxhQUFoQyxHQUFnRCxXQUFuRSxDQXhCK0Q7TUF5QmpFekQsbUJBQW1CLEVBQUUsTUFDbkIsS0FBS25XLEtBQUwsQ0FBVzhJLGdCQUFYLENBQTRCNUosU0FBTyxDQUFDaVcsb0JBQXBDLEVBQTBEckw7S0ExQlQsQ0FBckQ7U0E4QktpUCxhQUFMLEdBQXFCYSxNQUFyQjs7O1FBR0kvWixVQUFKOztRQUNJLEtBQUtHLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCcEssWUFBVSxDQUFDNlYsV0FBekMsQ0FBSixFQUEyRDtNQUN6RGpWLFVBQVUsR0FBRyxJQUFJZ1gsMkJBQUosQ0FBZ0N2WCxPQUFoQyxDQUFiO0tBREYsTUFFTyxJQUFJLEtBQUtVLEtBQUwsQ0FBV29KLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCcEssWUFBVSxDQUFDMlYsV0FBekMsQ0FBSixFQUEyRDtNQUNoRS9VLFVBQVUsR0FBRyxJQUFJMlcsMkJBQUosQ0FBZ0NsWCxPQUFoQyxDQUFiO0tBREssTUFFQTtNQUNMTyxVQUFVLEdBQUcsSUFBSTRXLHNCQUFKLENBQTJCblgsT0FBM0IsQ0FBYjs7O1dBR0tPLFVBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0NqR1FnYSxjQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztrQ0FXQyxtQkFBQSxTQUFBOzs7Ozs7OytDQUtVLENBQUEsU0FBQSxTQUFBLENBQUEsWUFBQSxxQkFBQSxNQUFBLEtBQUE7OztjQUNQLElBQUE7Ozs7Ozs7O2lCQUlaMVIsQ0FBQUEsU0FBQUEsQ0FBQUEsMkJBQUFBLHFCQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BESixJQUFNMlIsWUFBWSxHQUFHLFNBQWZBLFlBQWUsT0FBNkI7TUFBM0JDLE1BQTJCLFFBQTNCQSxNQUEyQjtNQUFwQnhGLFNBQW9CLFFBQXBCQSxTQUFvQjtNQUFWSSxLQUFVLFFBQVZBLEtBQVU7U0FJMUMsRUFBQyxTQUFEO0lBQVcsU0FBUyxFQUFDLHlCQUFyQjtJQUErQyxLQUFLLEVBQUUsaUJBQUk7TUFBQ0osU0FBUyxDQUFDLENBQUN3RixNQUFGLENBQVQ7O0tBQ3ZELEVBQUMsU0FBRCxDQUFXLEdBQVgsUUFDRSxFQUFDLFNBQUQsQ0FBVyxPQUFYOztLQUNFLEVBQUMsU0FBRCxDQUFXLElBQVg7SUFBZ0IsVUFBVTtLQUMxQjtJQUFLLEtBQUssRUFBQyw0QkFBWDtJQUF3QyxLQUFLLEVBQUMsSUFBOUM7SUFBbUQsTUFBTSxFQUFDLElBQTFEO0lBQStELE9BQU8sRUFBQztLQUFZO0lBQU0sQ0FBQyxFQUFDLGVBQVI7SUFBd0IsSUFBSSxFQUFDO0lBQWhILEVBQXlIO0lBQU0sQ0FBQyxFQUFDO0lBQWpJLENBREEsQ0FERixFQUlFLEVBQUMsU0FBRCxDQUFXLEtBQVgsUUFDR3BGLEtBREgsQ0FKRixDQURGLEVBU0UsRUFBQyxTQUFELENBQVcsT0FBWDs7S0FDRSxFQUFDLFNBQUQsQ0FBVyxJQUFYLFFBQ0E7SUFBSyxLQUFLLEVBQUMsNEJBQVg7SUFBd0MsS0FBSyxFQUFDLElBQTlDO0lBQW1ELE1BQU0sRUFBQyxJQUExRDtJQUErRCxPQUFPLEVBQUM7S0FBWTtJQUFNLENBQUMsRUFBQyxlQUFSO0lBQXdCLElBQUksRUFBQztJQUFoSCxFQUF5SDtJQUFNLENBQUMsRUFBQztJQUFqSSxDQURBLENBREYsQ0FURixDQURKLENBRko7Q0FGSjs7QUNKQXFGLElBQU1DLE9BQUssR0FBRyxFQUFkRDs7QUFFQSxTQUFnQixNQUFoQixDQUF1QixHQUF2QixFQUE0QixLQUE1QixFQUFtQzs7T0FFN0JFLElBQUksQ0FBVCxJQUFjLEtBQWQsRUFBcUI7SUFDcEIsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTLEtBQUssQ0FBQyxDQUFELENBQWQ7OztTQUVNLEdBQVA7OztBQUdELFNBQWdCLElBQWhCLENBQXFCLEdBQXJCLEVBQTBCLEtBQTFCLEVBQWlDLElBQWpDLEVBQXVDO01BQ2xDLEdBQUcsR0FBRyx1QkFBVkE7TUFDQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBRExBO01BRUMsT0FBTyxHQUFHLEVBRlhBO01BR0MsR0FIREE7O01BSUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBZTtRQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUssS0FBTCxDQUFXLEdBQVgsQ0FBUkE7O1NBQ0tBLElBQUksQ0FBQyxHQUFDLENBQVgsRUFBYyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQWxCLEVBQTBCLENBQUMsRUFBM0IsRUFBK0I7VUFDMUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFELENBQUQsQ0FBSyxLQUFMLENBQVcsR0FBWCxDQUFSQTtNQUNBLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBRCxDQUFGLENBQW5CLENBQVAsR0FBb0Msa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFSLEVBQVcsSUFBWCxDQUFnQixHQUFoQixDQUFELENBQXREOzs7O0VBR0YsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBSixDQUFZLEdBQVosRUFBaUIsRUFBakIsQ0FBRCxDQUFoQjtFQUNBLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQVYsQ0FBbEI7TUFDSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxHQUFHLENBQUMsTUFBYixFQUFxQixLQUFLLENBQUMsTUFBM0IsQ0FBVkE7O09BQ0tBLElBQUlsTyxHQUFDLEdBQUMsQ0FBWCxFQUFjQSxHQUFDLEdBQUMsR0FBaEIsRUFBcUJBLEdBQUMsRUFBdEIsRUFBMEI7UUFDckIsS0FBSyxDQUFDQSxHQUFELENBQUwsSUFBWSxLQUFLLENBQUNBLEdBQUQsQ0FBTCxDQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsTUFBcUIsR0FBckMsRUFBMEM7VUFDckMsS0FBSyxHQUFHLEtBQUssQ0FBQ0EsR0FBRCxDQUFMLENBQVMsT0FBVCxDQUFpQixlQUFqQixFQUFrQyxFQUFsQyxDQUFaa087VUFDQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUNsTyxHQUFELENBQUwsQ0FBUyxLQUFULENBQWUsU0FBZixLQUE2QmlPLE9BQTlCLEVBQXFDLENBQXJDLEtBQTJDLEVBRHBEQztVQUVDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFOLENBQWMsR0FBZCxDQUZUQTtVQUdDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFOLENBQWMsR0FBZCxDQUhUQTtVQUlDLEdBQUcsR0FBRyxHQUFHLENBQUNsTyxHQUFELENBQUgsSUFBVSxFQUpqQmtPOztVQUtJLENBQUMsR0FBRCxJQUFRLENBQUMsSUFBVCxLQUFrQixLQUFLLENBQUMsT0FBTixDQUFjLEdBQWQsSUFBbUIsQ0FBbkIsSUFBd0IsSUFBMUMsQ0FBSixFQUFxRDtRQUNwRCxHQUFHLEdBQUcsS0FBTjs7OztNQUdELE9BQU8sQ0FBQyxLQUFELENBQVAsR0FBaUIsa0JBQWtCLENBQUMsR0FBRCxDQUFuQzs7VUFDSSxJQUFJLElBQUksSUFBWixFQUFrQjtRQUNqQixPQUFPLENBQUMsS0FBRCxDQUFQLEdBQWlCLEdBQUcsQ0FBQyxLQUFKLENBQVVsTyxHQUFWLEVBQWEsR0FBYixDQUFpQixrQkFBakIsRUFBcUMsSUFBckMsQ0FBMEMsR0FBMUMsQ0FBakI7OztLQVpGLE1BZ0JLLElBQUksS0FBSyxDQUFDQSxHQUFELENBQUwsS0FBVyxHQUFHLENBQUNBLEdBQUQsQ0FBbEIsRUFBdUI7TUFDM0IsR0FBRyxHQUFHLEtBQU47Ozs7O01BSUUsSUFBSSxDQUFDLE9BQUwsS0FBZSxJQUFmLElBQXVCLEdBQUcsS0FBRyxLQUFqQyxFQUF3QztXQUFPLEtBQVA7OztTQUNqQyxPQUFQOzs7QUFHRCxTQUFnQixZQUFoQixDQUE2QixDQUE3QixFQUFnQzJCLElBQWhDLEVBQW1DO1NBRWhDLENBQUMsQ0FBQyxJQUFGLEdBQVNBLElBQUMsQ0FBQyxJQUFaLEdBQW9CLENBQXBCLEdBQ0UsQ0FBQyxDQUFDLElBQUYsR0FBU0EsSUFBQyxDQUFDLElBQVosR0FBb0IsQ0FBQyxDQUFyQixHQUNFLENBQUMsQ0FBQyxLQUFGLEdBQVVBLElBQUMsQ0FBQyxLQUhoQjs7OztBQVFELFNBQWdCLHNCQUFoQixDQUF1QyxLQUF2QyxFQUE4QyxLQUE5QyxFQUFxRDtFQUNwRCxLQUFLLENBQUMsS0FBTixHQUFjLEtBQWQ7RUFDQSxLQUFLLENBQUMsSUFBTixHQUFhLFNBQVMsQ0FBQyxLQUFELENBQXRCO1NBQ08sS0FBSyxDQUFDLEtBQWI7OztBQUdELFNBQWdCLFVBQWhCLENBQTJCLEdBQTNCLEVBQWdDO1NBQ3hCLEdBQUcsQ0FBQyxPQUFKLENBQVksY0FBWixFQUE0QixFQUE1QixFQUFnQyxLQUFoQyxDQUFzQyxHQUF0QyxDQUFQOzs7QUFHRCxTQUFnQixXQUFoQixDQUE0QixPQUE1QixFQUFxQztTQUM3QixPQUFPLENBQUMsTUFBUixDQUFlLENBQWYsS0FBbUIsR0FBbkIsR0FBMEIsSUFBSSxNQUFNLE9BQU4sQ0FBYyxPQUFPLENBQUMsTUFBUixDQUFlLE9BQU8sQ0FBQyxNQUFSLEdBQWUsQ0FBOUIsQ0FBZCxDQUFMLElBQXlELENBQWxGLEdBQXNGLENBQTdGOzs7QUFHRCxTQUFnQixJQUFoQixDQUFxQixJQUFyQixFQUEyQjtTQUNuQixVQUFVLENBQUMsSUFBRCxDQUFWLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLEVBQWtDLElBQWxDLENBQXVDLEVBQXZDLENBQVA7OztBQUdELFNBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtTQUNsQixLQUFLLENBQUMsS0FBTixDQUFZLE9BQVosR0FBc0IsQ0FBdEIsR0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBYixDQUFyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDNUVBd007Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXFCUUM7Ozs7OztzQkFNQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQVVTLFVBQUEsNEJBQUEsU0FBQSx5QkFBQSxDQUFBLFNBQUEsRUFBQTt5QkFEaEI7O1lBQUEsS0FBQSxLQUFBLENBQUEsSUFBQSxJQUFBLEtBQUEsS0FBQSxDQUFBLElBQUEsS0FBQSxTQUFBLENBQUEsSUFBQSxFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENILGVBQWdCLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQ0osT0FBT0MsSUFBUCxLQUFnQixXQUFoQixHQUE4QkEsSUFBOUIsR0FDQSxPQUFPWCxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxHQUF5QyxFQUZyRDs7QUNBQTs7QUFHQSxTQUFTWSxnQkFBVCxHQUE0QjtRQUNsQixJQUFJbmEsS0FBSixDQUFVLGlDQUFWLENBQU47OztBQUVKLFNBQVNvYSxtQkFBVCxHQUFnQztRQUN0QixJQUFJcGEsS0FBSixDQUFVLG1DQUFWLENBQU47OztBQUVKLElBQUlxYSxnQkFBZ0IsR0FBR0YsZ0JBQXZCO0FBQ0EsSUFBSUcsa0JBQWtCLEdBQUdGLG1CQUF6Qjs7QUFDQSxJQUFJLE9BQU9ILFFBQU0sQ0FBQ3ZILFVBQWQsS0FBNkIsVUFBakMsRUFBNkM7RUFDekMySCxnQkFBZ0IsR0FBRzNILFVBQW5COzs7QUFFSixJQUFJLE9BQU91SCxRQUFNLENBQUM1QixZQUFkLEtBQStCLFVBQW5DLEVBQStDO0VBQzNDaUMsa0JBQWtCLEdBQUdqQyxZQUFyQjs7O0FBR0osU0FBU2tDLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO01BQ2pCSCxnQkFBZ0IsS0FBSzNILFVBQXpCLEVBQXFDOztXQUUxQkEsVUFBVSxDQUFDOEgsR0FBRCxFQUFNLENBQU4sQ0FBakI7R0FIaUI7OztNQU1qQixDQUFDSCxnQkFBZ0IsS0FBS0YsZ0JBQXJCLElBQXlDLENBQUNFLGdCQUEzQyxLQUFnRTNILFVBQXBFLEVBQWdGO0lBQzVFMkgsZ0JBQWdCLEdBQUczSCxVQUFuQjtXQUNPQSxVQUFVLENBQUM4SCxHQUFELEVBQU0sQ0FBTixDQUFqQjs7O01BRUE7O1dBRU9ILGdCQUFnQixDQUFDRyxHQUFELEVBQU0sQ0FBTixDQUF2QjtHQUZKLENBR0UsT0FBTXpJLENBQU4sRUFBUTtRQUNGOzthQUVPc0ksZ0JBQWdCLENBQUM3UixJQUFqQixDQUFzQixJQUF0QixFQUE0QmdTLEdBQTVCLEVBQWlDLENBQWpDLENBQVA7S0FGSixDQUdFLE9BQU16SSxDQUFOLEVBQVE7O2FBRUNzSSxnQkFBZ0IsQ0FBQzdSLElBQWpCLENBQXNCLElBQXRCLEVBQTRCZ1MsR0FBNUIsRUFBaUMsQ0FBakMsQ0FBUDs7Ozs7QUFNWixTQUFTQyxlQUFULENBQXlCQyxNQUF6QixFQUFpQztNQUN6Qkosa0JBQWtCLEtBQUtqQyxZQUEzQixFQUF5Qzs7V0FFOUJBLFlBQVksQ0FBQ3FDLE1BQUQsQ0FBbkI7R0FIeUI7OztNQU16QixDQUFDSixrQkFBa0IsS0FBS0YsbUJBQXZCLElBQThDLENBQUNFLGtCQUFoRCxLQUF1RWpDLFlBQTNFLEVBQXlGO0lBQ3JGaUMsa0JBQWtCLEdBQUdqQyxZQUFyQjtXQUNPQSxZQUFZLENBQUNxQyxNQUFELENBQW5COzs7TUFFQTs7V0FFT0osa0JBQWtCLENBQUNJLE1BQUQsQ0FBekI7R0FGSixDQUdFLE9BQU8zSSxDQUFQLEVBQVM7UUFDSDs7YUFFT3VJLGtCQUFrQixDQUFDOVIsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJrUyxNQUE5QixDQUFQO0tBRkosQ0FHRSxPQUFPM0ksQ0FBUCxFQUFTOzs7YUFHQXVJLGtCQUFrQixDQUFDOVIsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJrUyxNQUE5QixDQUFQOzs7OztBQU9aLElBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFKO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBbEI7O0FBRUEsU0FBU0MsZUFBVCxHQUEyQjtNQUNuQixDQUFDSCxRQUFELElBQWEsQ0FBQ0MsWUFBbEIsRUFBZ0M7Ozs7RUFHaENELFFBQVEsR0FBRyxLQUFYOztNQUNJQyxZQUFZLENBQUNwUixNQUFqQixFQUF5QjtJQUNyQmtSLEtBQUssR0FBR0UsWUFBWSxDQUFDcE8sTUFBYixDQUFvQmtPLEtBQXBCLENBQVI7R0FESixNQUVPO0lBQ0hHLFVBQVUsR0FBRyxDQUFDLENBQWQ7OztNQUVBSCxLQUFLLENBQUNsUixNQUFWLEVBQWtCO0lBQ2R1UixVQUFVOzs7O0FBSWxCLFNBQVNBLFVBQVQsR0FBc0I7TUFDZEosUUFBSixFQUFjOzs7O01BR1ZLLE9BQU8sR0FBR1YsVUFBVSxDQUFDUSxlQUFELENBQXhCO0VBQ0FILFFBQVEsR0FBRyxJQUFYO01BRUlNLEdBQUcsR0FBR1AsS0FBSyxDQUFDbFIsTUFBaEI7O1NBQ015UixHQUFOLEVBQVc7SUFDUEwsWUFBWSxHQUFHRixLQUFmO0lBQ0FBLEtBQUssR0FBRyxFQUFSOztXQUNPLEVBQUVHLFVBQUYsR0FBZUksR0FBdEIsRUFBMkI7VUFDbkJMLFlBQUosRUFBa0I7UUFDZEEsWUFBWSxDQUFDQyxVQUFELENBQVosQ0FBeUJLLEdBQXpCOzs7O0lBR1JMLFVBQVUsR0FBRyxDQUFDLENBQWQ7SUFDQUksR0FBRyxHQUFHUCxLQUFLLENBQUNsUixNQUFaOzs7RUFFSm9SLFlBQVksR0FBRyxJQUFmO0VBQ0FELFFBQVEsR0FBRyxLQUFYO0VBQ0FILGVBQWUsQ0FBQ1EsT0FBRCxDQUFmOzs7QUFFSixBQUFPLFNBQVNHLFFBQVQsQ0FBa0JaLEdBQWxCLEVBQXVCO01BQ3RCOWEsSUFBSSxHQUFHLElBQUk4TCxLQUFKLENBQVUrRCxTQUFTLENBQUM5RixNQUFWLEdBQW1CLENBQTdCLENBQVg7O01BQ0k4RixTQUFTLENBQUM5RixNQUFWLEdBQW1CLENBQXZCLEVBQTBCO1NBQ2pCLElBQUlrQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNEQsU0FBUyxDQUFDOUYsTUFBOUIsRUFBc0NrQyxDQUFDLEVBQXZDLEVBQTJDO01BQ3ZDak0sSUFBSSxDQUFDaU0sQ0FBQyxHQUFHLENBQUwsQ0FBSixHQUFjNEQsU0FBUyxDQUFDNUQsQ0FBRCxDQUF2Qjs7OztFQUdSZ1AsS0FBSyxDQUFDM08sSUFBTixDQUFXLElBQUlxUCxJQUFKLENBQVNiLEdBQVQsRUFBYzlhLElBQWQsQ0FBWDs7TUFDSWliLEtBQUssQ0FBQ2xSLE1BQU4sS0FBaUIsQ0FBakIsSUFBc0IsQ0FBQ21SLFFBQTNCLEVBQXFDO0lBQ2pDTCxVQUFVLENBQUNTLFVBQUQsQ0FBVjs7OztBQUlSLFNBQVNLLElBQVQsQ0FBY2IsR0FBZCxFQUFtQmMsS0FBbkIsRUFBMEI7T0FDakJkLEdBQUwsR0FBV0EsR0FBWDtPQUNLYyxLQUFMLEdBQWFBLEtBQWI7OztBQUVKRCxJQUFJLENBQUMzUSxTQUFMLENBQWV5USxHQUFmLEdBQXFCLFlBQVk7T0FDeEJYLEdBQUwsQ0FBUy9PLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEtBQUs2UCxLQUExQjtDQURKOztBQUdBLEFBQU8sSUFBSWhILEtBQUssR0FBRyxTQUFaO0FBQ1AsQUFBTyxJQUFJaUgsUUFBUSxHQUFHLFNBQWY7QUFDUCxBQUFPLElBQUlDLE9BQU8sR0FBRyxJQUFkO0FBQ1AsQUFBTyxJQUFJQyxHQUFHLEdBQUcsRUFBVjtBQUNQLEFBQU8sSUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFDUCxBQUFPLElBQUlDLE9BQU8sR0FBRyxFQUFkOztBQUNQLEFBQU8sSUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDUCxBQUFPLElBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ1AsQUFBTyxJQUFJaE0sTUFBTSxHQUFHLEVBQWI7O0FBRVAsU0FBU2lNLElBQVQsR0FBZ0I7O0FBRWhCLEFBQU8sSUFBSUMsRUFBRSxHQUFHRCxJQUFUO0FBQ1AsQUFBTyxJQUFJRSxXQUFXLEdBQUdGLElBQWxCO0FBQ1AsQUFBTyxJQUFJRyxJQUFJLEdBQUdILElBQVg7QUFDUCxBQUFPLElBQUlJLEdBQUcsR0FBR0osSUFBVjtBQUNQLEFBQU8sSUFBSUssY0FBYyxHQUFHTCxJQUFyQjtBQUNQLEFBQU8sSUFBSU0sa0JBQWtCLEdBQUdOLElBQXpCO0FBQ1AsQUFBTyxJQUFJdmIsSUFBSSxHQUFHdWIsSUFBWDtBQUVQLEFBQU8sU0FBU08sT0FBVCxDQUFpQm5PLElBQWpCLEVBQXVCO1FBQ3BCLElBQUlsTyxLQUFKLENBQVUsa0NBQVYsQ0FBTjs7QUFHSixBQUFPLFNBQVNzYyxHQUFULEdBQWdCO1NBQVMsR0FBUDs7QUFDekIsQUFBTyxTQUFTQyxLQUFULENBQWdCQyxHQUFoQixFQUFxQjtRQUNsQixJQUFJeGMsS0FBSixDQUFVLGdDQUFWLENBQU47O0FBQ0gsQUFDTSxTQUFTeWMsS0FBVCxHQUFpQjtTQUFTLENBQVA7OztBQUcxQixJQUFJQyxXQUFXLEdBQUd6QyxRQUFNLENBQUN5QyxXQUFQLElBQXNCLEVBQXhDOztBQUNBLElBQUlDLGNBQWMsR0FDaEJELFdBQVcsQ0FBQ0UsR0FBWixJQUNBRixXQUFXLENBQUNHLE1BRFosSUFFQUgsV0FBVyxDQUFDSSxLQUZaLElBR0FKLFdBQVcsQ0FBQ0ssSUFIWixJQUlBTCxXQUFXLENBQUNNLFNBSlosSUFLQSxZQUFVO1NBQVUsSUFBSUMsSUFBSixFQUFELENBQWFDLE9BQWIsRUFBUDtDQU5kOzs7O0FBVUEsQUFBTyxTQUFTQyxNQUFULENBQWdCQyxpQkFBaEIsRUFBa0M7TUFDbkNDLFNBQVMsR0FBR1YsY0FBYyxDQUFDblUsSUFBZixDQUFvQmtVLFdBQXBCLElBQWlDLElBQWpEO01BQ0lZLE9BQU8sR0FBR3ZGLElBQUksQ0FBQ3dGLEtBQUwsQ0FBV0YsU0FBWCxDQUFkO01BQ0lHLFdBQVcsR0FBR3pGLElBQUksQ0FBQ3dGLEtBQUwsQ0FBWUYsU0FBUyxHQUFDLENBQVgsR0FBYyxHQUF6QixDQUFsQjs7TUFDSUQsaUJBQUosRUFBdUI7SUFDckJFLE9BQU8sR0FBR0EsT0FBTyxHQUFHRixpQkFBaUIsQ0FBQyxDQUFELENBQXJDO0lBQ0FJLFdBQVcsR0FBR0EsV0FBVyxHQUFHSixpQkFBaUIsQ0FBQyxDQUFELENBQTdDOztRQUNJSSxXQUFXLEdBQUMsQ0FBaEIsRUFBbUI7TUFDakJGLE9BQU87TUFDUEUsV0FBVyxJQUFJLEdBQWY7Ozs7U0FHRyxDQUFDRixPQUFELEVBQVNFLFdBQVQsQ0FBUDs7QUFHRixJQUFJQyxTQUFTLEdBQUcsSUFBSVIsSUFBSixFQUFoQjtBQUNBLEFBQU8sU0FBU1MsTUFBVCxHQUFrQjtNQUNuQkMsV0FBVyxHQUFHLElBQUlWLElBQUosRUFBbEI7TUFDSVcsR0FBRyxHQUFHRCxXQUFXLEdBQUdGLFNBQXhCO1NBQ09HLEdBQUcsR0FBRyxJQUFiOztBQUdGLGNBQWU7RUFDYnhDLFFBQVEsRUFBRUEsUUFERztFQUViOUcsS0FBSyxFQUFFQSxLQUZNO0VBR2JrSCxPQUFPLEVBQUVBLE9BSEk7RUFJYkMsR0FBRyxFQUFFQSxHQUpRO0VBS2JDLElBQUksRUFBRUEsSUFMTztFQU1iQyxPQUFPLEVBQUVBLE9BTkk7RUFPYkMsUUFBUSxFQUFFQSxRQVBHO0VBUWJHLEVBQUUsRUFBRUEsRUFSUztFQVNiQyxXQUFXLEVBQUVBLFdBVEE7RUFVYkMsSUFBSSxFQUFFQSxJQVZPO0VBV2JDLEdBQUcsRUFBRUEsR0FYUTtFQVliQyxjQUFjLEVBQUVBLGNBWkg7RUFhYkMsa0JBQWtCLEVBQUVBLGtCQWJQO0VBY2I3YixJQUFJLEVBQUVBLElBZE87RUFlYjhiLE9BQU8sRUFBRUEsT0FmSTtFQWdCYkMsR0FBRyxFQUFFQSxHQWhCUTtFQWlCYkMsS0FBSyxFQUFFQSxLQWpCTTtFQWtCYkUsS0FBSyxFQUFFQSxLQWxCTTtFQW1CYlUsTUFBTSxFQUFFQSxNQW5CSztFQW9CYjVCLFFBQVEsRUFBRUEsUUFwQkc7RUFxQmJNLE9BQU8sRUFBRUEsT0FyQkk7RUFzQmJoTSxNQUFNLEVBQUVBLE1BdEJLO0VBdUJiNk4sTUFBTSxFQUFFQTtDQXZCVjs7QUNyTWUsU0FBU0csUUFBVCxHQUFvQjtFQUNqQ0EsUUFBUSxHQUFHL1ksTUFBTSxDQUFDQyxNQUFQLElBQWlCLFVBQVV4QixNQUFWLEVBQWtCO1NBQ3ZDLElBQUlvSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNEQsU0FBUyxDQUFDOUYsTUFBOUIsRUFBc0NrQyxDQUFDLEVBQXZDLEVBQTJDO1VBQ3JDNkQsTUFBTSxHQUFHRCxTQUFTLENBQUM1RCxDQUFELENBQXRCOztXQUVLLElBQUl4SSxHQUFULElBQWdCcU0sTUFBaEIsRUFBd0I7WUFDbEIxSyxNQUFNLENBQUM0RixTQUFQLENBQWlCNEUsY0FBakIsQ0FBZ0M5RyxJQUFoQyxDQUFxQ2dILE1BQXJDLEVBQTZDck0sR0FBN0MsQ0FBSixFQUF1RDtVQUNyREksTUFBTSxDQUFDSixHQUFELENBQU4sR0FBY3FNLE1BQU0sQ0FBQ3JNLEdBQUQsQ0FBcEI7Ozs7O1dBS0NJLE1BQVA7R0FYRjs7U0FjT3NhLFFBQVEsQ0FBQ3BTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCOEQsU0FBckIsQ0FBUDs7O0FDZkYsU0FBU3VPLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO1NBQ3JCQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0IsQ0FBaEIsTUFBdUIsR0FBOUI7Ozs7QUFJRixTQUFTQyxTQUFULENBQW1CelEsSUFBbkIsRUFBeUI1SCxLQUF6QixFQUFnQztPQUN6QixJQUFJK0YsQ0FBQyxHQUFHL0YsS0FBUixFQUFlc1ksQ0FBQyxHQUFHdlMsQ0FBQyxHQUFHLENBQXZCLEVBQTBCd1MsQ0FBQyxHQUFHM1EsSUFBSSxDQUFDL0QsTUFBeEMsRUFBZ0R5VSxDQUFDLEdBQUdDLENBQXBELEVBQXVEeFMsQ0FBQyxJQUFJLENBQUwsRUFBUXVTLENBQUMsSUFBSSxDQUFwRSxFQUF1RTtJQUNyRTFRLElBQUksQ0FBQzdCLENBQUQsQ0FBSixHQUFVNkIsSUFBSSxDQUFDMFEsQ0FBRCxDQUFkOzs7RUFHRjFRLElBQUksQ0FBQzRRLEdBQUw7Ozs7QUFJRixTQUFTQyxlQUFULENBQXlCQyxFQUF6QixFQUE2QkMsSUFBN0IsRUFBbUM7TUFDN0JBLElBQUksS0FBSzllLFNBQWIsRUFBd0I4ZSxJQUFJLEdBQUcsRUFBUDtNQUVwQkMsT0FBTyxHQUFJRixFQUFFLElBQUlBLEVBQUUsQ0FBQ0csS0FBSCxDQUFTLEdBQVQsQ0FBUCxJQUF5QixFQUF2QztNQUNJQyxTQUFTLEdBQUlILElBQUksSUFBSUEsSUFBSSxDQUFDRSxLQUFMLENBQVcsR0FBWCxDQUFULElBQTZCLEVBQTdDO01BRUlFLE9BQU8sR0FBR0wsRUFBRSxJQUFJUixVQUFVLENBQUNRLEVBQUQsQ0FBOUI7TUFDSU0sU0FBUyxHQUFHTCxJQUFJLElBQUlULFVBQVUsQ0FBQ1MsSUFBRCxDQUFsQztNQUNJTSxVQUFVLEdBQUdGLE9BQU8sSUFBSUMsU0FBNUI7O01BRUlOLEVBQUUsSUFBSVIsVUFBVSxDQUFDUSxFQUFELENBQXBCLEVBQTBCOztJQUV4QkksU0FBUyxHQUFHRixPQUFaO0dBRkYsTUFHTyxJQUFJQSxPQUFPLENBQUMvVSxNQUFaLEVBQW9COztJQUV6QmlWLFNBQVMsQ0FBQ04sR0FBVjtJQUNBTSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ2pTLE1BQVYsQ0FBaUIrUixPQUFqQixDQUFaOzs7TUFHRSxDQUFDRSxTQUFTLENBQUNqVixNQUFmLEVBQXVCLE9BQU8sR0FBUDtNQUVuQnFWLGdCQUFKOztNQUNJSixTQUFTLENBQUNqVixNQUFkLEVBQXNCO1FBQ2hCc1YsSUFBSSxHQUFHTCxTQUFTLENBQUNBLFNBQVMsQ0FBQ2pWLE1BQVYsR0FBbUIsQ0FBcEIsQ0FBcEI7SUFDQXFWLGdCQUFnQixHQUFHQyxJQUFJLEtBQUssR0FBVCxJQUFnQkEsSUFBSSxLQUFLLElBQXpCLElBQWlDQSxJQUFJLEtBQUssRUFBN0Q7R0FGRixNQUdPO0lBQ0xELGdCQUFnQixHQUFHLEtBQW5COzs7TUFHRUUsRUFBRSxHQUFHLENBQVQ7O09BQ0ssSUFBSXJULENBQUMsR0FBRytTLFNBQVMsQ0FBQ2pWLE1BQXZCLEVBQStCa0MsQ0FBQyxJQUFJLENBQXBDLEVBQXVDQSxDQUFDLEVBQXhDLEVBQTRDO1FBQ3RDc1QsSUFBSSxHQUFHUCxTQUFTLENBQUMvUyxDQUFELENBQXBCOztRQUVJc1QsSUFBSSxLQUFLLEdBQWIsRUFBa0I7TUFDaEJoQixTQUFTLENBQUNTLFNBQUQsRUFBWS9TLENBQVosQ0FBVDtLQURGLE1BRU8sSUFBSXNULElBQUksS0FBSyxJQUFiLEVBQW1CO01BQ3hCaEIsU0FBUyxDQUFDUyxTQUFELEVBQVkvUyxDQUFaLENBQVQ7TUFDQXFULEVBQUU7S0FGRyxNQUdBLElBQUlBLEVBQUosRUFBUTtNQUNiZixTQUFTLENBQUNTLFNBQUQsRUFBWS9TLENBQVosQ0FBVDtNQUNBcVQsRUFBRTs7OztNQUlGLENBQUNILFVBQUwsRUFBaUIsT0FBT0csRUFBRSxFQUFULEVBQWFBLEVBQWIsRUFBaUJOLFNBQVMsQ0FBQ2hULE9BQVYsQ0FBa0IsSUFBbEI7TUFHaENtVCxVQUFVLElBQ1ZILFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUIsRUFEakIsS0FFQyxDQUFDQSxTQUFTLENBQUMsQ0FBRCxDQUFWLElBQWlCLENBQUNaLFVBQVUsQ0FBQ1ksU0FBUyxDQUFDLENBQUQsQ0FBVixDQUY3QixDQURGLEVBS0VBLFNBQVMsQ0FBQ2hULE9BQVYsQ0FBa0IsRUFBbEI7TUFFRXFELE1BQU0sR0FBRzJQLFNBQVMsQ0FBQ2xVLElBQVYsQ0FBZSxHQUFmLENBQWI7TUFFSXNVLGdCQUFnQixJQUFJL1AsTUFBTSxDQUFDbVEsTUFBUCxDQUFjLENBQUMsQ0FBZixNQUFzQixHQUE5QyxFQUFtRG5RLE1BQU0sSUFBSSxHQUFWO1NBRTVDQSxNQUFQOzs7QUN0RUYsU0FBU29RLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQTRCQyxPQUE1QixFQUFxQztFQUNoQjtRQUNiRCxTQUFKLEVBQWU7Ozs7UUFJWEUsSUFBSSxHQUFHLGNBQWNELE9BQXpCOztRQUVJLE9BQU9FLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7TUFDbENBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRixJQUFiOzs7UUFHRTtZQUNJdGYsS0FBSyxDQUFDc2YsSUFBRCxDQUFYO0tBREYsQ0FFRSxPQUFPRyxDQUFQLEVBQVU7Ozs7QUNkaEIsSUFBSUMsTUFBTSxHQUFHLGtCQUFiOztBQUNBLFNBQVNDLFNBQVQsQ0FBbUJQLFNBQW5CLEVBQThCQyxPQUE5QixFQUF1QztNQUNqQ0QsU0FBSixFQUFlOzs7O0VBTVI7VUFDQyxJQUFJcGYsS0FBSixDQUFVMGYsTUFBTSxHQUFHLElBQVQsSUFBaUJMLE9BQU8sSUFBSSxFQUE1QixDQUFWLENBQU47Ozs7QUNKSixTQUFTTyxlQUFULENBQXlCQyxJQUF6QixFQUErQjtTQUN0QkEsSUFBSSxDQUFDN0IsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsR0FBeUI2QixJQUF6QixHQUFnQyxNQUFNQSxJQUE3Qzs7O0FBRUYsU0FBU0MsaUJBQVQsQ0FBMkJELElBQTNCLEVBQWlDO1NBQ3hCQSxJQUFJLENBQUM3QixNQUFMLENBQVksQ0FBWixNQUFtQixHQUFuQixHQUF5QjZCLElBQUksQ0FBQ1gsTUFBTCxDQUFZLENBQVosQ0FBekIsR0FBMENXLElBQWpEOzs7QUFFRixTQUFTRSxXQUFULENBQXFCRixJQUFyQixFQUEyQkgsTUFBM0IsRUFBbUM7U0FDMUJHLElBQUksQ0FBQzNZLFdBQUwsR0FBbUJDLE9BQW5CLENBQTJCdVksTUFBTSxDQUFDeFksV0FBUCxFQUEzQixNQUFxRCxDQUFyRCxJQUEwRCxNQUFNQyxPQUFOLENBQWMwWSxJQUFJLENBQUM3QixNQUFMLENBQVkwQixNQUFNLENBQUNqVyxNQUFuQixDQUFkLE1BQThDLENBQUMsQ0FBaEg7OztBQUVGLFNBQVN1VyxhQUFULENBQXVCSCxJQUF2QixFQUE2QkgsTUFBN0IsRUFBcUM7U0FDNUJLLFdBQVcsQ0FBQ0YsSUFBRCxFQUFPSCxNQUFQLENBQVgsR0FBNEJHLElBQUksQ0FBQ1gsTUFBTCxDQUFZUSxNQUFNLENBQUNqVyxNQUFuQixDQUE1QixHQUF5RG9XLElBQWhFOzs7QUFFRixTQUFTSSxrQkFBVCxDQUE0QkosSUFBNUIsRUFBa0M7U0FDekJBLElBQUksQ0FBQzdCLE1BQUwsQ0FBWTZCLElBQUksQ0FBQ3BXLE1BQUwsR0FBYyxDQUExQixNQUFpQyxHQUFqQyxHQUF1Q29XLElBQUksQ0FBQ3RYLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQXZDLEdBQTJEc1gsSUFBbEU7OztBQUVGLFNBQVNLLFNBQVQsQ0FBbUJMLElBQW5CLEVBQXlCO01BQ25COUIsUUFBUSxHQUFHOEIsSUFBSSxJQUFJLEdBQXZCO01BQ0lNLE1BQU0sR0FBRyxFQUFiO01BQ0lDLElBQUksR0FBRyxFQUFYO01BQ0lDLFNBQVMsR0FBR3RDLFFBQVEsQ0FBQzVXLE9BQVQsQ0FBaUIsR0FBakIsQ0FBaEI7O01BRUlrWixTQUFTLEtBQUssQ0FBQyxDQUFuQixFQUFzQjtJQUNwQkQsSUFBSSxHQUFHckMsUUFBUSxDQUFDbUIsTUFBVCxDQUFnQm1CLFNBQWhCLENBQVA7SUFDQXRDLFFBQVEsR0FBR0EsUUFBUSxDQUFDbUIsTUFBVCxDQUFnQixDQUFoQixFQUFtQm1CLFNBQW5CLENBQVg7OztNQUdFQyxXQUFXLEdBQUd2QyxRQUFRLENBQUM1VyxPQUFULENBQWlCLEdBQWpCLENBQWxCOztNQUVJbVosV0FBVyxLQUFLLENBQUMsQ0FBckIsRUFBd0I7SUFDdEJILE1BQU0sR0FBR3BDLFFBQVEsQ0FBQ21CLE1BQVQsQ0FBZ0JvQixXQUFoQixDQUFUO0lBQ0F2QyxRQUFRLEdBQUdBLFFBQVEsQ0FBQ21CLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJvQixXQUFuQixDQUFYOzs7U0FHSztJQUNMdkMsUUFBUSxFQUFFQSxRQURMO0lBRUxvQyxNQUFNLEVBQUVBLE1BQU0sS0FBSyxHQUFYLEdBQWlCLEVBQWpCLEdBQXNCQSxNQUZ6QjtJQUdMQyxJQUFJLEVBQUVBLElBQUksS0FBSyxHQUFULEdBQWUsRUFBZixHQUFvQkE7R0FINUI7OztBQU1GLFNBQVNHLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO01BQ3hCekMsUUFBUSxHQUFHeUMsUUFBUSxDQUFDekMsUUFBeEI7TUFDSW9DLE1BQU0sR0FBR0ssUUFBUSxDQUFDTCxNQUR0QjtNQUVJQyxJQUFJLEdBQUdJLFFBQVEsQ0FBQ0osSUFGcEI7TUFHSVAsSUFBSSxHQUFHOUIsUUFBUSxJQUFJLEdBQXZCO01BQ0lvQyxNQUFNLElBQUlBLE1BQU0sS0FBSyxHQUF6QixFQUE4Qk4sSUFBSSxJQUFJTSxNQUFNLENBQUNuQyxNQUFQLENBQWMsQ0FBZCxNQUFxQixHQUFyQixHQUEyQm1DLE1BQTNCLEdBQW9DLE1BQU1BLE1BQWxEO01BQzFCQyxJQUFJLElBQUlBLElBQUksS0FBSyxHQUFyQixFQUEwQlAsSUFBSSxJQUFJTyxJQUFJLENBQUNwQyxNQUFMLENBQVksQ0FBWixNQUFtQixHQUFuQixHQUF5Qm9DLElBQXpCLEdBQWdDLE1BQU1BLElBQTlDO1NBQ25CUCxJQUFQOzs7QUFHRixTQUFTWSxjQUFULENBQXdCWixJQUF4QixFQUE4QjVQLEtBQTlCLEVBQXFDOU0sR0FBckMsRUFBMEN1ZCxlQUExQyxFQUEyRDtNQUNyREYsUUFBSjs7TUFFSSxPQUFPWCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCOztJQUU1QlcsUUFBUSxHQUFHTixTQUFTLENBQUNMLElBQUQsQ0FBcEI7SUFDQVcsUUFBUSxDQUFDdlEsS0FBVCxHQUFpQkEsS0FBakI7R0FIRixNQUlPOztJQUVMdVEsUUFBUSxHQUFHM0MsUUFBUSxDQUFDLEVBQUQsRUFBS2dDLElBQUwsQ0FBbkI7UUFDSVcsUUFBUSxDQUFDekMsUUFBVCxLQUFzQnRlLFNBQTFCLEVBQXFDK2dCLFFBQVEsQ0FBQ3pDLFFBQVQsR0FBb0IsRUFBcEI7O1FBRWpDeUMsUUFBUSxDQUFDTCxNQUFiLEVBQXFCO1VBQ2ZLLFFBQVEsQ0FBQ0wsTUFBVCxDQUFnQm5DLE1BQWhCLENBQXVCLENBQXZCLE1BQThCLEdBQWxDLEVBQXVDd0MsUUFBUSxDQUFDTCxNQUFULEdBQWtCLE1BQU1LLFFBQVEsQ0FBQ0wsTUFBakM7S0FEekMsTUFFTztNQUNMSyxRQUFRLENBQUNMLE1BQVQsR0FBa0IsRUFBbEI7OztRQUdFSyxRQUFRLENBQUNKLElBQWIsRUFBbUI7VUFDYkksUUFBUSxDQUFDSixJQUFULENBQWNwQyxNQUFkLENBQXFCLENBQXJCLE1BQTRCLEdBQWhDLEVBQXFDd0MsUUFBUSxDQUFDSixJQUFULEdBQWdCLE1BQU1JLFFBQVEsQ0FBQ0osSUFBL0I7S0FEdkMsTUFFTztNQUNMSSxRQUFRLENBQUNKLElBQVQsR0FBZ0IsRUFBaEI7OztRQUdFblEsS0FBSyxLQUFLeFEsU0FBVixJQUF1QitnQixRQUFRLENBQUN2USxLQUFULEtBQW1CeFEsU0FBOUMsRUFBeUQrZ0IsUUFBUSxDQUFDdlEsS0FBVCxHQUFpQkEsS0FBakI7OztNQUd2RDtJQUNGdVEsUUFBUSxDQUFDekMsUUFBVCxHQUFvQjRDLFNBQVMsQ0FBQ0gsUUFBUSxDQUFDekMsUUFBVixDQUE3QjtHQURGLENBRUUsT0FBT2hNLENBQVAsRUFBVTtRQUNOQSxDQUFDLFlBQVk2TyxRQUFqQixFQUEyQjtZQUNuQixJQUFJQSxRQUFKLENBQWEsZUFBZUosUUFBUSxDQUFDekMsUUFBeEIsR0FBbUMsMEJBQW5DLEdBQWdFLHVEQUE3RSxDQUFOO0tBREYsTUFFTztZQUNDaE0sQ0FBTjs7OztNQUlBNU8sR0FBSixFQUFTcWQsUUFBUSxDQUFDcmQsR0FBVCxHQUFlQSxHQUFmOztNQUVMdWQsZUFBSixFQUFxQjs7UUFFZixDQUFDRixRQUFRLENBQUN6QyxRQUFkLEVBQXdCO01BQ3RCeUMsUUFBUSxDQUFDekMsUUFBVCxHQUFvQjJDLGVBQWUsQ0FBQzNDLFFBQXBDO0tBREYsTUFFTyxJQUFJeUMsUUFBUSxDQUFDekMsUUFBVCxDQUFrQkMsTUFBbEIsQ0FBeUIsQ0FBekIsTUFBZ0MsR0FBcEMsRUFBeUM7TUFDOUN3QyxRQUFRLENBQUN6QyxRQUFULEdBQW9CTSxlQUFlLENBQUNtQyxRQUFRLENBQUN6QyxRQUFWLEVBQW9CMkMsZUFBZSxDQUFDM0MsUUFBcEMsQ0FBbkM7O0dBTEosTUFPTzs7UUFFRCxDQUFDeUMsUUFBUSxDQUFDekMsUUFBZCxFQUF3QjtNQUN0QnlDLFFBQVEsQ0FBQ3pDLFFBQVQsR0FBb0IsR0FBcEI7Ozs7U0FJR3lDLFFBQVA7OztBQU1GLFNBQVNLLHVCQUFULEdBQW1DO01BQzdCQyxNQUFNLEdBQUcsSUFBYjs7V0FFU0MsU0FBVCxDQUFtQkMsVUFBbkIsRUFBK0I7SUFDN0JDLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0MvQixPQUFPLENBQUMyQixNQUFNLElBQUksSUFBWCxFQUFpQiw4Q0FBakIsQ0FBL0MsR0FBa0gsS0FBSyxDQUF2SDtJQUNBQSxNQUFNLEdBQUdFLFVBQVQ7V0FDTyxZQUFZO1VBQ2JGLE1BQU0sS0FBS0UsVUFBZixFQUEyQkYsTUFBTSxHQUFHLElBQVQ7S0FEN0I7OztXQUtPSyxtQkFBVCxDQUE2QlgsUUFBN0IsRUFBdUNZLE1BQXZDLEVBQStDQyxtQkFBL0MsRUFBb0VDLFFBQXBFLEVBQThFOzs7O1FBSXhFUixNQUFNLElBQUksSUFBZCxFQUFvQjtVQUNkL1IsTUFBTSxHQUFHLE9BQU8rUixNQUFQLEtBQWtCLFVBQWxCLEdBQStCQSxNQUFNLENBQUNOLFFBQUQsRUFBV1ksTUFBWCxDQUFyQyxHQUEwRE4sTUFBdkU7O1VBRUksT0FBTy9SLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7WUFDMUIsT0FBT3NTLG1CQUFQLEtBQStCLFVBQW5DLEVBQStDO1VBQzdDQSxtQkFBbUIsQ0FBQ3RTLE1BQUQsRUFBU3VTLFFBQVQsQ0FBbkI7U0FERixNQUVPO1VBQ0xMLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0MvQixPQUFPLENBQUMsS0FBRCxFQUFRLGlGQUFSLENBQS9DLEdBQTRJLEtBQUssQ0FBako7VUFDQW1DLFFBQVEsQ0FBQyxJQUFELENBQVI7O09BTEosTUFPTzs7UUFFTEEsUUFBUSxDQUFDdlMsTUFBTSxLQUFLLEtBQVosQ0FBUjs7S0FaSixNQWNPO01BQ0x1UyxRQUFRLENBQUMsSUFBRCxDQUFSOzs7O01BSUFDLFNBQVMsR0FBRyxFQUFoQjs7V0FFU0MsY0FBVCxDQUF3Qi9PLEVBQXhCLEVBQTRCO1FBQ3RCZ1AsUUFBUSxHQUFHLElBQWY7O2FBRVNDLFFBQVQsR0FBb0I7VUFDZEQsUUFBSixFQUFjaFAsRUFBRSxDQUFDaEgsS0FBSCxDQUFTLEtBQUssQ0FBZCxFQUFpQjhELFNBQWpCOzs7SUFHaEJnUyxTQUFTLENBQUN2VixJQUFWLENBQWUwVixRQUFmO1dBQ08sWUFBWTtNQUNqQkQsUUFBUSxHQUFHLEtBQVg7TUFDQUYsU0FBUyxHQUFHQSxTQUFTLENBQUNJLE1BQVYsQ0FBaUIsVUFBVS9TLElBQVYsRUFBZ0I7ZUFDcENBLElBQUksS0FBSzhTLFFBQWhCO09BRFUsQ0FBWjtLQUZGOzs7V0FRT0UsZUFBVCxHQUEyQjtTQUNwQixJQUFJQyxJQUFJLEdBQUd0UyxTQUFTLENBQUM5RixNQUFyQixFQUE2Qi9KLElBQUksR0FBRyxJQUFJOEwsS0FBSixDQUFVcVcsSUFBVixDQUFwQyxFQUFxREMsSUFBSSxHQUFHLENBQWpFLEVBQW9FQSxJQUFJLEdBQUdELElBQTNFLEVBQWlGQyxJQUFJLEVBQXJGLEVBQXlGO01BQ3ZGcGlCLElBQUksQ0FBQ29pQixJQUFELENBQUosR0FBYXZTLFNBQVMsQ0FBQ3VTLElBQUQsQ0FBdEI7OztJQUdGUCxTQUFTLENBQUM3WSxPQUFWLENBQWtCLFVBQVVnWixRQUFWLEVBQW9CO2FBQzdCQSxRQUFRLENBQUNqVyxLQUFULENBQWUsS0FBSyxDQUFwQixFQUF1Qi9MLElBQXZCLENBQVA7S0FERjs7O1NBS0s7SUFDTHFoQixTQUFTLEVBQUVBLFNBRE47SUFFTEksbUJBQW1CLEVBQUVBLG1CQUZoQjtJQUdMSyxjQUFjLEVBQUVBLGNBSFg7SUFJTEksZUFBZSxFQUFFQTtHQUpuQjs7O0FBUUYsSUFBSUcsU0FBUyxHQUFHLENBQUMsRUFBRSxPQUFPeEksTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxDQUFDelksUUFBeEMsSUFBb0R5WSxNQUFNLENBQUN6WSxRQUFQLENBQWdCa2hCLGFBQXRFLENBQWpCOztBQUNBLFNBQVNDLGVBQVQsQ0FBeUI1QyxPQUF6QixFQUFrQ2lDLFFBQWxDLEVBQTRDO0VBQzFDQSxRQUFRLENBQUMvSCxNQUFNLENBQUMySSxPQUFQLENBQWU3QyxPQUFmLENBQUQsQ0FBUixDQUQwQzs7Ozs7OztBQTRCNUMsU0FBUzhDLGdDQUFULEdBQTRDO1NBQ25DNUksTUFBTSxDQUFDNkksU0FBUCxDQUFpQkMsU0FBakIsQ0FBMkJsYixPQUEzQixDQUFtQyxTQUFuQyxNQUFrRCxDQUFDLENBQTFEOzs7QUFrUkYsSUFBSW1iLGlCQUFpQixHQUFHLFlBQXhCO0FBQ0EsSUFBSUMsY0FBYyxHQUFHO0VBQ25CQyxRQUFRLEVBQUU7SUFDUkMsVUFBVSxFQUFFLFNBQVNBLFVBQVQsQ0FBb0I1QyxJQUFwQixFQUEwQjthQUM3QkEsSUFBSSxDQUFDN0IsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsR0FBeUI2QixJQUF6QixHQUFnQyxPQUFPQyxpQkFBaUIsQ0FBQ0QsSUFBRCxDQUEvRDtLQUZNO0lBSVI2QyxVQUFVLEVBQUUsU0FBU0EsVUFBVCxDQUFvQjdDLElBQXBCLEVBQTBCO2FBQzdCQSxJQUFJLENBQUM3QixNQUFMLENBQVksQ0FBWixNQUFtQixHQUFuQixHQUF5QjZCLElBQUksQ0FBQ1gsTUFBTCxDQUFZLENBQVosQ0FBekIsR0FBMENXLElBQWpEOztHQU5lO0VBU25COEMsT0FBTyxFQUFFO0lBQ1BGLFVBQVUsRUFBRTNDLGlCQURMO0lBRVA0QyxVQUFVLEVBQUU5QztHQVhLO0VBYW5CZ0QsS0FBSyxFQUFFO0lBQ0xILFVBQVUsRUFBRTdDLGVBRFA7SUFFTDhDLFVBQVUsRUFBRTlDOztDQWZoQjs7QUFtQkEsU0FBU2lELFNBQVQsQ0FBbUI5SSxHQUFuQixFQUF3QjtNQUNsQnNHLFNBQVMsR0FBR3RHLEdBQUcsQ0FBQzVTLE9BQUosQ0FBWSxHQUFaLENBQWhCO1NBQ09rWixTQUFTLEtBQUssQ0FBQyxDQUFmLEdBQW1CdEcsR0FBbkIsR0FBeUJBLEdBQUcsQ0FBQ3hSLEtBQUosQ0FBVSxDQUFWLEVBQWE4WCxTQUFiLENBQWhDOzs7QUFHRixTQUFTeUMsV0FBVCxHQUF1Qjs7O01BR2pCMVksSUFBSSxHQUFHbVAsTUFBTSxDQUFDaUgsUUFBUCxDQUFnQnBXLElBQTNCO01BQ0lpVyxTQUFTLEdBQUdqVyxJQUFJLENBQUNqRCxPQUFMLENBQWEsR0FBYixDQUFoQjtTQUNPa1osU0FBUyxLQUFLLENBQUMsQ0FBZixHQUFtQixFQUFuQixHQUF3QmpXLElBQUksQ0FBQzJZLFNBQUwsQ0FBZTFDLFNBQVMsR0FBRyxDQUEzQixDQUEvQjs7O0FBR0YsU0FBUzJDLFlBQVQsQ0FBc0JuRCxJQUF0QixFQUE0QjtFQUMxQnRHLE1BQU0sQ0FBQ2lILFFBQVAsQ0FBZ0JKLElBQWhCLEdBQXVCUCxJQUF2Qjs7O0FBR0YsU0FBU29ELGVBQVQsQ0FBeUJwRCxJQUF6QixFQUErQjtFQUM3QnRHLE1BQU0sQ0FBQ2lILFFBQVAsQ0FBZ0IwQyxPQUFoQixDQUF3QkwsU0FBUyxDQUFDdEosTUFBTSxDQUFDaUgsUUFBUCxDQUFnQnBXLElBQWpCLENBQVQsR0FBa0MsR0FBbEMsR0FBd0N5VixJQUFoRTs7O0FBR0YsU0FBU3NELGlCQUFULENBQTJCcFAsS0FBM0IsRUFBa0M7TUFDNUJBLEtBQUssS0FBSyxLQUFLLENBQW5CLEVBQXNCO0lBQ3BCQSxLQUFLLEdBQUcsRUFBUjs7O0dBR0RnTyxTQUFELEdBQWFkLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0N2QixTQUFTLENBQUMsS0FBRCxFQUFRLDBCQUFSLENBQWpELEdBQXVGQSxTQUFTLENBQUMsS0FBRCxDQUE3RyxHQUF1SCxLQUFLLENBQTVIO01BQ0l5RCxhQUFhLEdBQUc3SixNQUFNLENBQUM4SixPQUEzQjtNQUNJQyxrQkFBa0IsR0FBR25CLGdDQUFnQyxFQUF6RDtNQUNJb0IsTUFBTSxHQUFHeFAsS0FBYjtNQUNJeVAscUJBQXFCLEdBQUdELE1BQU0sQ0FBQ2xDLG1CQURuQztNQUVJQSxtQkFBbUIsR0FBR21DLHFCQUFxQixLQUFLLEtBQUssQ0FBL0IsR0FBbUN2QixlQUFuQyxHQUFxRHVCLHFCQUYvRTtNQUdJQyxlQUFlLEdBQUdGLE1BQU0sQ0FBQ0csUUFIN0I7TUFJSUEsUUFBUSxHQUFHRCxlQUFlLEtBQUssS0FBSyxDQUF6QixHQUE2QixPQUE3QixHQUF1Q0EsZUFKdEQ7TUFLSUUsUUFBUSxHQUFHNVAsS0FBSyxDQUFDNFAsUUFBTixHQUFpQjFELGtCQUFrQixDQUFDTCxlQUFlLENBQUM3TCxLQUFLLENBQUM0UCxRQUFQLENBQWhCLENBQW5DLEdBQXVFLEVBQXRGO01BQ0lDLHFCQUFxQixHQUFHckIsY0FBYyxDQUFDbUIsUUFBRCxDQUExQztNQUNJakIsVUFBVSxHQUFHbUIscUJBQXFCLENBQUNuQixVQUR2QztNQUVJQyxVQUFVLEdBQUdrQixxQkFBcUIsQ0FBQ2xCLFVBRnZDOztXQUlTbUIsY0FBVCxHQUEwQjtRQUNwQmhFLElBQUksR0FBRzZDLFVBQVUsQ0FBQ0ksV0FBVyxFQUFaLENBQXJCO0lBQ0E3QixPQUFPLENBQUN4RixHQUFSLENBQVl5RixRQUFaLEtBQXlCLFlBQXpCLEdBQXdDL0IsT0FBTyxDQUFDLENBQUN3RSxRQUFELElBQWE1RCxXQUFXLENBQUNGLElBQUQsRUFBTzhELFFBQVAsQ0FBekIsRUFBMkMsa0ZBQWtGLG9DQUFsRixHQUF5SDlELElBQXpILEdBQWdJLG1CQUFoSSxHQUFzSjhELFFBQXRKLEdBQWlLLElBQTVNLENBQS9DLEdBQW1RLEtBQUssQ0FBeFE7UUFDSUEsUUFBSixFQUFjOUQsSUFBSSxHQUFHRyxhQUFhLENBQUNILElBQUQsRUFBTzhELFFBQVAsQ0FBcEI7V0FDUGxELGNBQWMsQ0FBQ1osSUFBRCxDQUFyQjs7O01BR0VpRSxpQkFBaUIsR0FBR2pELHVCQUF1QixFQUEvQzs7V0FFUzdHLFFBQVQsQ0FBa0IrSixTQUFsQixFQUE2QjtJQUMzQmxHLFFBQVEsQ0FBQ3dGLE9BQUQsRUFBVVUsU0FBVixDQUFSOztJQUVBVixPQUFPLENBQUM1WixNQUFSLEdBQWlCMlosYUFBYSxDQUFDM1osTUFBL0I7SUFDQXFhLGlCQUFpQixDQUFDbEMsZUFBbEIsQ0FBa0N5QixPQUFPLENBQUM3QyxRQUExQyxFQUFvRDZDLE9BQU8sQ0FBQ2pDLE1BQTVEOzs7TUFHRTRDLFlBQVksR0FBRyxLQUFuQjtNQUNJQyxVQUFVLEdBQUcsSUFBakI7O1dBRVNDLG9CQUFULENBQThCMVgsQ0FBOUIsRUFBaUNjLElBQWpDLEVBQW9DO1dBQzNCZCxDQUFDLENBQUN1UixRQUFGLEtBQWV6USxJQUFDLENBQUN5USxRQUFqQixJQUE2QnZSLENBQUMsQ0FBQzJULE1BQUYsS0FBYTdTLElBQUMsQ0FBQzZTLE1BQTVDLElBQXNEM1QsQ0FBQyxDQUFDNFQsSUFBRixLQUFXOVMsSUFBQyxDQUFDOFMsSUFBMUU7OztXQUdPK0QsZ0JBQVQsR0FBNEI7UUFDdEJ0RSxJQUFJLEdBQUdpRCxXQUFXLEVBQXRCO1FBQ0lzQixXQUFXLEdBQUczQixVQUFVLENBQUM1QyxJQUFELENBQTVCOztRQUVJQSxJQUFJLEtBQUt1RSxXQUFiLEVBQTBCOztNQUV4Qm5CLGVBQWUsQ0FBQ21CLFdBQUQsQ0FBZjtLQUZGLE1BR087VUFDRDVELFFBQVEsR0FBR3FELGNBQWMsRUFBN0I7VUFDSVEsWUFBWSxHQUFHaEIsT0FBTyxDQUFDN0MsUUFBM0I7VUFDSSxDQUFDd0QsWUFBRCxJQUFpQkUsb0JBQW9CLENBQUNHLFlBQUQsRUFBZTdELFFBQWYsQ0FBekMsRUFBbUUsT0FIOUQ7O1VBS0R5RCxVQUFVLEtBQUsxRCxVQUFVLENBQUNDLFFBQUQsQ0FBN0IsRUFBeUMsT0FMcEM7O01BT0x5RCxVQUFVLEdBQUcsSUFBYjtNQUNBSyxTQUFTLENBQUM5RCxRQUFELENBQVQ7Ozs7V0FJSzhELFNBQVQsQ0FBbUI5RCxRQUFuQixFQUE2QjtRQUN2QndELFlBQUosRUFBa0I7TUFDaEJBLFlBQVksR0FBRyxLQUFmO01BQ0FoSyxRQUFRO0tBRlYsTUFHTztVQUNEb0gsTUFBTSxHQUFHLEtBQWI7TUFDQTBDLGlCQUFpQixDQUFDM0MsbUJBQWxCLENBQXNDWCxRQUF0QyxFQUFnRFksTUFBaEQsRUFBd0RDLG1CQUF4RCxFQUE2RSxVQUFVa0QsRUFBVixFQUFjO1lBQ3JGQSxFQUFKLEVBQVE7VUFDTnZLLFFBQVEsQ0FBQztZQUNQb0gsTUFBTSxFQUFFQSxNQUREO1lBRVBaLFFBQVEsRUFBRUE7V0FGSixDQUFSO1NBREYsTUFLTztVQUNMZ0UsU0FBUyxDQUFDaEUsUUFBRCxDQUFUOztPQVBKOzs7O1dBYUtnRSxTQUFULENBQW1CQyxZQUFuQixFQUFpQztRQUMzQkMsVUFBVSxHQUFHckIsT0FBTyxDQUFDN0MsUUFBekIsQ0FEK0I7Ozs7UUFLM0JtRSxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQnRFLFVBQVUsQ0FBQ21FLFVBQUQsQ0FBL0IsQ0FBZDtRQUNJQyxPQUFPLEtBQUssQ0FBQyxDQUFqQixFQUFvQkEsT0FBTyxHQUFHLENBQVY7UUFDaEJHLFNBQVMsR0FBR0YsUUFBUSxDQUFDQyxXQUFULENBQXFCdEUsVUFBVSxDQUFDa0UsWUFBRCxDQUEvQixDQUFoQjtRQUNJSyxTQUFTLEtBQUssQ0FBQyxDQUFuQixFQUFzQkEsU0FBUyxHQUFHLENBQVo7UUFDbEJDLEtBQUssR0FBR0osT0FBTyxHQUFHRyxTQUF0Qjs7UUFFSUMsS0FBSixFQUFXO01BQ1RmLFlBQVksR0FBRyxJQUFmO01BQ0FnQixFQUFFLENBQUNELEtBQUQsQ0FBRjs7R0E1RjRCOzs7TUFpRzVCbEYsSUFBSSxHQUFHaUQsV0FBVyxFQUF0QjtNQUNJc0IsV0FBVyxHQUFHM0IsVUFBVSxDQUFDNUMsSUFBRCxDQUE1QjtNQUNJQSxJQUFJLEtBQUt1RSxXQUFiLEVBQTBCbkIsZUFBZSxDQUFDbUIsV0FBRCxDQUFmO01BQ3RCYSxlQUFlLEdBQUdwQixjQUFjLEVBQXBDO01BQ0llLFFBQVEsR0FBRyxDQUFDckUsVUFBVSxDQUFDMEUsZUFBRCxDQUFYLENBQWYsQ0FyR2dDOztXQXVHdkJDLFVBQVQsQ0FBb0IxRSxRQUFwQixFQUE4QjtRQUN4QjJFLE9BQU8sR0FBR3JrQixRQUFRLENBQUNzSSxhQUFULENBQXVCLE1BQXZCLENBQWQ7UUFDSWdCLElBQUksR0FBRyxFQUFYOztRQUVJK2EsT0FBTyxJQUFJQSxPQUFPLENBQUM5YyxZQUFSLENBQXFCLE1BQXJCLENBQWYsRUFBNkM7TUFDM0MrQixJQUFJLEdBQUd5WSxTQUFTLENBQUN0SixNQUFNLENBQUNpSCxRQUFQLENBQWdCcFcsSUFBakIsQ0FBaEI7OztXQUdLQSxJQUFJLEdBQUcsR0FBUCxHQUFhcVksVUFBVSxDQUFDa0IsUUFBUSxHQUFHcEQsVUFBVSxDQUFDQyxRQUFELENBQXRCLENBQTlCOzs7V0FHT3hVLElBQVQsQ0FBYzZULElBQWQsRUFBb0I1UCxLQUFwQixFQUEyQjtJQUN6QmdSLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0MvQixPQUFPLENBQUNsUCxLQUFLLEtBQUt4USxTQUFYLEVBQXNCLCtDQUF0QixDQUEvQyxHQUF3SCxLQUFLLENBQTdIO1FBQ0kyaEIsTUFBTSxHQUFHLE1BQWI7UUFDSVosUUFBUSxHQUFHQyxjQUFjLENBQUNaLElBQUQsRUFBT3BnQixTQUFQLEVBQWtCQSxTQUFsQixFQUE2QjRqQixPQUFPLENBQUM3QyxRQUFyQyxDQUE3QjtJQUNBc0QsaUJBQWlCLENBQUMzQyxtQkFBbEIsQ0FBc0NYLFFBQXRDLEVBQWdEWSxNQUFoRCxFQUF3REMsbUJBQXhELEVBQTZFLFVBQVVrRCxFQUFWLEVBQWM7VUFDckYsQ0FBQ0EsRUFBTCxFQUFTO1VBQ0wxRSxJQUFJLEdBQUdVLFVBQVUsQ0FBQ0MsUUFBRCxDQUFyQjtVQUNJNEQsV0FBVyxHQUFHM0IsVUFBVSxDQUFDa0IsUUFBUSxHQUFHOUQsSUFBWixDQUE1QjtVQUNJdUYsV0FBVyxHQUFHdEMsV0FBVyxPQUFPc0IsV0FBcEM7O1VBRUlnQixXQUFKLEVBQWlCOzs7O1FBSWZuQixVQUFVLEdBQUdwRSxJQUFiO1FBQ0FtRCxZQUFZLENBQUNvQixXQUFELENBQVo7WUFDSTdjLFNBQVMsR0FBR3FkLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQnRFLFVBQVUsQ0FBQzhDLE9BQU8sQ0FBQzdDLFFBQVQsQ0FBL0IsQ0FBaEI7WUFDSTZFLFNBQVMsR0FBR1QsUUFBUSxDQUFDcmMsS0FBVCxDQUFlLENBQWYsRUFBa0JoQixTQUFTLEdBQUcsQ0FBOUIsQ0FBaEI7UUFDQThkLFNBQVMsQ0FBQ3JaLElBQVYsQ0FBZTZULElBQWY7UUFDQStFLFFBQVEsR0FBR1MsU0FBWDtRQUNBckwsUUFBUSxDQUFDO1VBQ1BvSCxNQUFNLEVBQUVBLE1BREQ7VUFFUFosUUFBUSxFQUFFQTtTQUZKLENBQVI7T0FWRixNQWNPO1FBQ0xTLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0MvQixPQUFPLENBQUMsS0FBRCxFQUFRLDRGQUFSLENBQS9DLEdBQXVKLEtBQUssQ0FBNUo7UUFDQW5GLFFBQVE7O0tBdEJaOzs7V0EyQk9rSixPQUFULENBQWlCckQsSUFBakIsRUFBdUI1UCxLQUF2QixFQUE4QjtJQUM1QmdSLE9BQU8sQ0FBQ3hGLEdBQVIsQ0FBWXlGLFFBQVosS0FBeUIsWUFBekIsR0FBd0MvQixPQUFPLENBQUNsUCxLQUFLLEtBQUt4USxTQUFYLEVBQXNCLGtEQUF0QixDQUEvQyxHQUEySCxLQUFLLENBQWhJO1FBQ0kyaEIsTUFBTSxHQUFHLFNBQWI7UUFDSVosUUFBUSxHQUFHQyxjQUFjLENBQUNaLElBQUQsRUFBT3BnQixTQUFQLEVBQWtCQSxTQUFsQixFQUE2QjRqQixPQUFPLENBQUM3QyxRQUFyQyxDQUE3QjtJQUNBc0QsaUJBQWlCLENBQUMzQyxtQkFBbEIsQ0FBc0NYLFFBQXRDLEVBQWdEWSxNQUFoRCxFQUF3REMsbUJBQXhELEVBQTZFLFVBQVVrRCxFQUFWLEVBQWM7VUFDckYsQ0FBQ0EsRUFBTCxFQUFTO1VBQ0wxRSxJQUFJLEdBQUdVLFVBQVUsQ0FBQ0MsUUFBRCxDQUFyQjtVQUNJNEQsV0FBVyxHQUFHM0IsVUFBVSxDQUFDa0IsUUFBUSxHQUFHOUQsSUFBWixDQUE1QjtVQUNJdUYsV0FBVyxHQUFHdEMsV0FBVyxPQUFPc0IsV0FBcEM7O1VBRUlnQixXQUFKLEVBQWlCOzs7O1FBSWZuQixVQUFVLEdBQUdwRSxJQUFiO1FBQ0FvRCxlQUFlLENBQUNtQixXQUFELENBQWY7OztVQUdFN2MsU0FBUyxHQUFHcWQsUUFBUSxDQUFDemQsT0FBVCxDQUFpQm9aLFVBQVUsQ0FBQzhDLE9BQU8sQ0FBQzdDLFFBQVQsQ0FBM0IsQ0FBaEI7VUFDSWpaLFNBQVMsS0FBSyxDQUFDLENBQW5CLEVBQXNCcWQsUUFBUSxDQUFDcmQsU0FBRCxDQUFSLEdBQXNCc1ksSUFBdEI7TUFDdEI3RixRQUFRLENBQUM7UUFDUG9ILE1BQU0sRUFBRUEsTUFERDtRQUVQWixRQUFRLEVBQUVBO09BRkosQ0FBUjtLQWhCRjs7O1dBdUJPd0UsRUFBVCxDQUFZN0csQ0FBWixFQUFlO0lBQ2I4QyxPQUFPLENBQUN4RixHQUFSLENBQVl5RixRQUFaLEtBQXlCLFlBQXpCLEdBQXdDL0IsT0FBTyxDQUFDbUUsa0JBQUQsRUFBcUIsOERBQXJCLENBQS9DLEdBQXNJLEtBQUssQ0FBM0k7SUFDQUYsYUFBYSxDQUFDNEIsRUFBZCxDQUFpQjdHLENBQWpCOzs7V0FHT21ILE1BQVQsR0FBa0I7SUFDaEJOLEVBQUUsQ0FBQyxDQUFDLENBQUYsQ0FBRjs7O1dBR09PLFNBQVQsR0FBcUI7SUFDbkJQLEVBQUUsQ0FBQyxDQUFELENBQUY7OztNQUdFUSxhQUFhLEdBQUcsQ0FBcEI7O1dBRVNDLGlCQUFULENBQTJCVixLQUEzQixFQUFrQztJQUNoQ1MsYUFBYSxJQUFJVCxLQUFqQjs7UUFFSVMsYUFBYSxLQUFLLENBQWxCLElBQXVCVCxLQUFLLEtBQUssQ0FBckMsRUFBd0M7TUFDdEN4TCxNQUFNLENBQUNuWixnQkFBUCxDQUF3QmtpQixpQkFBeEIsRUFBMkM2QixnQkFBM0M7S0FERixNQUVPLElBQUlxQixhQUFhLEtBQUssQ0FBdEIsRUFBeUI7TUFDOUJqTSxNQUFNLENBQUNqWixtQkFBUCxDQUEyQmdpQixpQkFBM0IsRUFBOEM2QixnQkFBOUM7Ozs7TUFJQXVCLFNBQVMsR0FBRyxLQUFoQjs7V0FFU0MsS0FBVCxDQUFlN0UsTUFBZixFQUF1QjtRQUNqQkEsTUFBTSxLQUFLLEtBQUssQ0FBcEIsRUFBdUI7TUFDckJBLE1BQU0sR0FBRyxLQUFUOzs7UUFHRThFLE9BQU8sR0FBRzlCLGlCQUFpQixDQUFDL0MsU0FBbEIsQ0FBNEJELE1BQTVCLENBQWQ7O1FBRUksQ0FBQzRFLFNBQUwsRUFBZ0I7TUFDZEQsaUJBQWlCLENBQUMsQ0FBRCxDQUFqQjtNQUNBQyxTQUFTLEdBQUcsSUFBWjs7O1dBR0ssWUFBWTtVQUNiQSxTQUFKLEVBQWU7UUFDYkEsU0FBUyxHQUFHLEtBQVo7UUFDQUQsaUJBQWlCLENBQUMsQ0FBQyxDQUFGLENBQWpCOzs7YUFHS0csT0FBTyxFQUFkO0tBTkY7OztXQVVPM2xCLE1BQVQsQ0FBZ0J5aEIsUUFBaEIsRUFBMEI7UUFDcEJyaEIsUUFBUSxHQUFHeWpCLGlCQUFpQixDQUFDdEMsY0FBbEIsQ0FBaUNFLFFBQWpDLENBQWY7SUFDQStELGlCQUFpQixDQUFDLENBQUQsQ0FBakI7V0FDTyxZQUFZO01BQ2pCQSxpQkFBaUIsQ0FBQyxDQUFDLENBQUYsQ0FBakI7TUFDQXBsQixRQUFRO0tBRlY7OztNQU1FZ2pCLE9BQU8sR0FBRztJQUNaNVosTUFBTSxFQUFFMlosYUFBYSxDQUFDM1osTUFEVjtJQUVaMlgsTUFBTSxFQUFFLEtBRkk7SUFHWlosUUFBUSxFQUFFeUUsZUFIRTtJQUlaQyxVQUFVLEVBQUVBLFVBSkE7SUFLWmxaLElBQUksRUFBRUEsSUFMTTtJQU1aa1gsT0FBTyxFQUFFQSxPQU5HO0lBT1o4QixFQUFFLEVBQUVBLEVBUFE7SUFRWk0sTUFBTSxFQUFFQSxNQVJJO0lBU1pDLFNBQVMsRUFBRUEsU0FUQztJQVVaSSxLQUFLLEVBQUVBLEtBVks7SUFXWjFsQixNQUFNLEVBQUVBO0dBWFY7U0FhT29qQixPQUFQOzs7QUMvdkJGLElBQU13QyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLE9BQWM7TUFBWkMsTUFBWSxRQUFaQSxNQUFZO1NBRWxDLEVBQUMsTUFBRDtJQUFRLE9BQU8sRUFBRTNDLGlCQUFpQjtLQUMvQjJDLE1BQU0sSUFBR0EsTUFBTSxDQUFDdlosR0FBUCxDQUFXLFVBQUM4SCxRQUFELEVBQU8xSSxDQUFQLEVBQVc7V0FFNUIsRUFBQ29hLElBQUQ7TUFDRSxJQUFJLEVBQUUxUixRQUFLLENBQUN3TCxJQURkO01BRUUsWUFBWSxFQUFFO2VBQU14TCxRQUFLLENBQUMyUixJQUFOLEdBQWFDLElBQWIsQ0FBa0IsVUFBQUMsTUFBTTtpQkFBR0EsTUFBTSxXQUFUO1NBQXhCLENBQU47O01BSGxCO0dBRFEsQ0FEWixDQURGO0NBREY7O0FDS0EsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsT0FBbUM7TUFBakNDLFdBQWlDLFFBQWpDQSxXQUFpQztNQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO01BQVpQLE1BQVksUUFBWkEsTUFBWTs7a0JBQ3RCUSxDQUFRLENBQUMsS0FBRCxDQURjOztNQUMzQzVNLE1BRDJDO01BQ25DeEYsVUFEbUM7O1NBRzNDLENBQ0wsRUFBQyxVQUFEO0lBQVksSUFBSSxFQUFFd0YsTUFBbEI7SUFBMEIsU0FBUyxFQUFFO2FBQUl4RixVQUFTLENBQUMsQ0FBQ3dGLE1BQUYsQ0FBYjtLQUFyQztJQUE2RCxLQUFLLEVBQUUwTTtJQUQvRCxFQUVMLEVBQUNHLFlBQUQ7SUFBVyxNQUFNLEVBQUU3TSxNQUFuQjtJQUEyQixTQUFTLEVBQUV4RixVQUF0QztJQUFpRCxLQUFLLEVBQUVtUztJQUZuRCxFQUdMLEVBQUMsZUFBRDtJQUFpQixNQUFNLEVBQUVQO0lBSHBCLENBQVA7Q0FIRjs7QUNQQVUsQ0FBTSxDQUNKLGVBQ0UsRUFBQyxRQUFEO0VBQ0UsV0FBVyxFQUFFLENBQUM7SUFBRW5TLEtBQUssRUFBRSxVQUFUO0lBQXFCQyxLQUFLLEVBQUU7R0FBN0IsRUFBeUM7SUFBRUQsS0FBSyxFQUFFLFdBQVQ7SUFBc0JDLEtBQUssRUFBRTtHQUF0RSxDQURmO0VBRUUsUUFBUSxFQUFDLFdBRlg7RUFHRSxNQUFNLEVBQUUsQ0FBQztJQUFFdUwsSUFBSSxFQUFFLFVBQVI7SUFBb0JtRyxJQUFJLEVBQUU7YUFBTSw2QkFBTjs7R0FBM0IsRUFBNkQ7SUFBRW5HLElBQUksRUFBRSxXQUFSO0lBQXFCbUcsSUFBSSxFQUFFO2FBQU0sNkJBQU47O0dBQXhGO0VBSlosQ0FESSxFQVFKbGxCLFFBQVEsQ0FBQzJsQixjQUFULENBQXdCLE1BQXhCLENBUkksQ0FBTjs7OzsifQ==
