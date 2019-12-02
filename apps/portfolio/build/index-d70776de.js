import { a as MDCFoundation, b as MDCComponent, c as createCommonjsModule, d as _interopRequireDefault, e as require$$0, f as require$$1, g as require$$2, h as require$$3, i as require$$4, j as require$$5, k as require$$6, l as _preact, m as unwrapExports, n as require$$0$1, o as _typeof, p as _bindDecorator, q as styleInject, r as h, s as MDCRipple, t as b, u as I, v as y, w as commonjsGlobal, x as v, y as _slicedToArray, z as E } from './chunk-42fdbf08.js';

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

class MDCListFoundation extends MDCFoundation {
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

class MDCList extends MDCComponent {
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

  var _classCallCheck2 = _interopRequireDefault(require$$0);

  var _createClass2 = _interopRequireDefault(require$$1);

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

  var _classCallCheck2 = _interopRequireDefault(require$$0);

  var _createClass2 = _interopRequireDefault(require$$1);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _typeof2 = _interopRequireDefault(_typeof);

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
    onClose: function onClose() {
      setToggle(false);
    }
  }, h(Drawer.DrawerHeader, {
    className: "mdc-theme--primary-bg"
  }, "Portfolio", h("input", null)), h(Drawer.DrawerContent, null, items && items.map(function (item, i) {
    return h(Drawer.DrawerItem, {
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

class MDCTopAppBarBaseFoundation extends MDCFoundation {
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

class MDCTopAppBar extends MDCComponent {
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

  var _classCallCheck2 = _interopRequireDefault(require$$0);

  var _createClass2 = _interopRequireDefault(require$$1);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _typeof2 = _interopRequireDefault(_typeof);

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

var css$4 = ".fixed{\n    position: fixed;\n    top:0\n}\n\n.top-bar{\n    margin-left: 0;\n    width: 100%;\n}\nbody{\n    margin: 0;\n    padding: 0;\n}";
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
      setToggle = _useState2[1];

  return [h(DrawerPage, {
    open: toggle,
    setToggle: setToggle,
    items: drawerItems
  }), h(TopAppBarNav, {
    toggle: toggle,
    setToggle: setToggle,
    title: appTitle
  }), h(RouterComponent, {
    routes: routes
  })];
};

E(h("div", null, h(AppShell, {
  drawerItems: [{
    route: "/modules",
    title: "Modules"
  }],
  appTitle: "Portfolio",
  routes: [{
    path: "/modules",
    load: function load() {
      return import('./chunk-65ea7787.js');
    }
  }]
})), document.getElementById("root"));

export { process as a, global$1 as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtZDcwNzc2ZGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL2FkYXB0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvbW9kYWwvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGlzdC9hZGFwdGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saXN0L2NvbnN0YW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGlzdC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvbm9kZV9tb2R1bGVzL3RhYmJhYmxlL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL25vZGVfbW9kdWxlcy9mb2N1cy10cmFwL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdXRpbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0xpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LW1hdGVyaWFsLWNvbXBvbmVudHMvRHJhd2VyL2luZGV4LmpzIiwiLi4vLi4vLi4vY29tcG9uZW50cy9hcHAtc2hlbGwvRHJhd2VyUGFnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvYWRhcHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9maXhlZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9zaG9ydC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9zdGFuZGFyZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9Ub3BBcHBCYXIvaW5kZXguanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9Ub3BBcHBCYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LXJvdXRlci9kaXN0L3ByZWFjdC1yb3V0ZXIuZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJlYWN0LWFzeW5jLXJvdXRlL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWdsb2JhbHMvc3JjL2dsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzLWVzNi9icm93c2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1wYXRobmFtZS9lc20vcmVzb2x2ZS1wYXRobmFtZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXdhcm5pbmcvZGlzdC90aW55LXdhcm5pbmcuZXNtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RpbnktaW52YXJpYW50L2Rpc3QvdGlueS1pbnZhcmlhbnQuZXNtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvZXNtL2hpc3RvcnkuanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9Sb3V0ZXJDb21wb25lbnQuanMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbC9pbmRleC5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgRHJhd2VyXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgRHJhd2VyIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENEcmF3ZXJBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IEVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnQgdGFyZ2V0IGVsZW1lbnQgdG8gdmVyaWZ5IGNsYXNzIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBjbGFzcyBuYW1lXG4gICAqL1xuICBlbGVtZW50SGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSBmb2N1cyBvZiBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQuXG4gICAqL1xuICBzYXZlRm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyBmb2N1cyB0byBlbGVtZW50IHByZXZpb3VzbHkgc2F2ZWQgd2l0aCAnc2F2ZUZvY3VzJy5cbiAgICovXG4gIHJlc3RvcmVGb2N1cygpIHt9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGFjdGl2ZSAvIHNlbGVjdGVkIG5hdmlnYXRpb24gaXRlbS5cbiAgICovXG4gIGZvY3VzQWN0aXZlTmF2aWdhdGlvbkl0ZW0oKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBcIk1EQ0RyYXdlcjpjbG9zZWRcIiBkZW5vdGluZyB0aGUgZHJhd2VyIGhhcyBjbG9zZWQuXG4gICAqL1xuICBub3RpZnlDbG9zZSgpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIGV2ZW50IFwiTURDRHJhd2VyOm9wZW5lZFwiIGRlbm90aW5nIHRoZSBkcmF3ZXIgaGFzIG9wZW5lZC5cbiAgICovXG4gIG5vdGlmeU9wZW4oKSB7fVxuXG4gIC8qKlxuICAgKiBUcmFwcyBmb2N1cyBvbiByb290IGVsZW1lbnQgYW5kIGZvY3VzZXMgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGVsZW1lbnQuXG4gICAqL1xuICB0cmFwRm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBmb2N1cyB0cmFwIGZyb20gcm9vdCBlbGVtZW50IHdoaWNoIHdhcyBzZXQgYnkgYHRyYXBGb2N1c2BcbiAgICogYW5kIHJlc3RvcmVzIGZvY3VzIHRvIHdoZXJlIGl0IHdhcyBwcmlvciB0byBjYWxsaW5nIGB0cmFwRm9jdXNgLlxuICAgKi9cbiAgcmVsZWFzZUZvY3VzKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRHJhd2VyQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRyYXdlcicsXG4gIERJU01JU1NJQkxFOiAnbWRjLWRyYXdlci0tZGlzbWlzc2libGUnLFxuICBNT0RBTDogJ21kYy1kcmF3ZXItLW1vZGFsJyxcbiAgT1BFTjogJ21kYy1kcmF3ZXItLW9wZW4nLFxuICBBTklNQVRFOiAnbWRjLWRyYXdlci0tYW5pbWF0ZScsXG4gIE9QRU5JTkc6ICdtZGMtZHJhd2VyLS1vcGVuaW5nJyxcbiAgQ0xPU0lORzogJ21kYy1kcmF3ZXItLWNsb3NpbmcnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUFBfQ09OVEVOVF9TRUxFQ1RPUjogJy5tZGMtZHJhd2VyLWFwcC1jb250ZW50JyxcbiAgU0NSSU1fU0VMRUNUT1I6ICcubWRjLWRyYXdlci1zY3JpbScsXG4gIENMT1NFX0VWRU5UOiAnTURDRHJhd2VyOmNsb3NlZCcsXG4gIE9QRU5fRVZFTlQ6ICdNRENEcmF3ZXI6b3BlbmVkJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0RyYXdlckFkYXB0ZXIgZnJvbSAnLi4vYWRhcHRlcic7XG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRHJhd2VyQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDRHJhd2VyQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGVsZW1lbnRIYXNDbGFzczogKC8qIGVsZW1lbnQ6ICFFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeU9wZW46ICgpID0+IHt9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge30sXG4gICAgICBmb2N1c0FjdGl2ZU5hdmlnYXRpb25JdGVtOiAoKSA9PiB7fSxcbiAgICAgIHRyYXBGb2N1czogKCkgPT4ge30sXG4gICAgICByZWxlYXNlRm9jdXM6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIG9wZW4gdGhlIGRyYXdlci5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkgfHwgdGhpcy5pc09wZW5pbmcoKSB8fCB0aGlzLmlzQ2xvc2luZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLk9QRU4pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5BTklNQVRFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTsgLy8gRm9yY2UgcmVmbG93LlxuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcblxuICAgIHRoaXMuYWRhcHRlcl8uc2F2ZUZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xvc2UgdGhlIGRyYXdlci5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSB8fCB0aGlzLmlzT3BlbmluZygpIHx8IHRoaXMuaXNDbG9zaW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQ0xPU0lORyk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5zaW9uIHBvaW50IGZvciB3aGVuIGRyYXdlciBmaW5pc2hlcyBvcGVuIGFuaW1hdGlvbi5cbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgb3BlbmVkKCkge31cblxuICAvKipcbiAgICogRXh0ZW5zaW9uIHBvaW50IGZvciB3aGVuIGRyYXdlciBmaW5pc2hlcyBjbG9zZSBhbmltYXRpb24uXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIGNsb3NlZCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgaW4gb3BlbiBzdGF0ZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgYW5pbWF0aW5nIG9wZW4uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc09wZW5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZHJhd2VyIGlzIGFuaW1hdGluZyBjbG9zZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0Nsb3NpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DTE9TSU5HKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZXlkb3duIGhhbmRsZXIgdG8gY2xvc2UgZHJhd2VyIHdoZW4ga2V5IGlzIGVzY2FwZS5cbiAgICogQHBhcmFtIGV2dFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bihldnQpIHtcbiAgICBjb25zdCB7a2V5Q29kZSwga2V5fSA9IGV2dDtcblxuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcbiAgICBpZiAoaXNFc2NhcGUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgY29uc3Qge09QRU5JTkcsIENMT1NJTkcsIE9QRU4sIEFOSU1BVEUsIFJPT1R9ID0gY3NzQ2xhc3NlcztcblxuICAgIC8vIEluIEVkZ2UsIHRyYW5zaXRpb25lbmQgb24gcmlwcGxlIHBzZXVkby1lbGVtZW50cyB5aWVsZHMgYSB0YXJnZXQgd2l0aG91dCBjbGFzc0xpc3QsIHNvIGNoZWNrIGZvciBFbGVtZW50IGZpcnN0LlxuICAgIGNvbnN0IGlzRWxlbWVudCA9IGV2dC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50O1xuICAgIGlmICghaXNFbGVtZW50IHx8ICF0aGlzLmFkYXB0ZXJfLmVsZW1lbnRIYXNDbGFzcygvKiogQHR5cGUgeyFFbGVtZW50fSAqLyAoZXZ0LnRhcmdldCksIFJPT1QpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDbG9zaW5nKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoT1BFTik7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlc3RvcmVGb2N1cygpO1xuICAgICAgdGhpcy5jbG9zZWQoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0FjdGl2ZU5hdmlnYXRpb25JdGVtKCk7XG4gICAgICB0aGlzLm9wZW5lZCgpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlPcGVuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhBTklNQVRFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9QRU5JTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQ0xPU0lORyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENEcmF3ZXJBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbiBmcm9tICcuLi9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uPCFNRENEcmF3ZXJBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uIHtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGRyYXdlciBmaW5pc2hlcyBvcGVuIGFuaW1hdGlvbi5cbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBvcGVuZWQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy50cmFwRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBkcmF3ZXIgZmluaXNoZXMgY2xvc2UgYW5pbWF0aW9uLlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGNsb3NlZCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbGVhc2VGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgY2xpY2sgZXZlbnQgb24gc2NyaW0uXG4gICAqL1xuICBoYW5kbGVTY3JpbUNsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENNb2RhbERyYXdlckZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIExpc3QuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmcgZm9jdXMuXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENMaXN0QWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldExpc3RJdGVtQ291bnQoKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldEZvY3VzZWRFbGVtZW50SW5kZXgoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgYXR0cmlidXRlLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgYXR0cmlidXRlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgoaW5kZXgsIGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgbGlzdCBpdGVtIGF0IHRoZSBpbmRleCBzcGVjaWZpZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKi9cbiAgZm9jdXNJdGVtQXRJbmRleChpbmRleCkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGFiaW5kZXggdG8gdGhlIHZhbHVlIHNwZWNpZmllZCBmb3IgYWxsIGJ1dHRvbi9hIGVsZW1lbnQgY2hpbGRyZW4gb2ZcbiAgICogdGhlIGxpc3QgaXRlbSBhdCB0aGUgaW5kZXggc3BlY2lmaWVkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlzdEl0ZW1JbmRleFxuICAgKiBAcGFyYW0ge251bWJlcn0gdGFiSW5kZXhWYWx1ZVxuICAgKi9cbiAgc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuKGxpc3RJdGVtSW5kZXgsIHRhYkluZGV4VmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBnaXZlbiBlbGVtZW50IGhhcyBhbiBocmVmLCBmb2xsb3dzIHRoZSBsaW5rLlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVcbiAgICovXG4gIGZvbGxvd0hyZWYoZWxlKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaXN0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtbGlzdCcsXG4gIExJU1RfSVRFTV9DTEFTUzogJ21kYy1saXN0LWl0ZW0nLFxuICBMSVNUX0lURU1fU0VMRUNURURfQ0xBU1M6ICdtZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCcsXG4gIExJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1M6ICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX09SSUVOVEFUSU9OOiAnYXJpYS1vcmllbnRhdGlvbicsXG4gIEFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDogJ2hvcml6b250YWwnLFxuICBBUklBX1NFTEVDVEVEOiAnYXJpYS1zZWxlY3RlZCcsXG4gIEZPQ1VTQUJMRV9DSElMRF9FTEVNRU5UUzogYC4ke2Nzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTfSBidXR0b246bm90KDpkaXNhYmxlZCksIC4ke2Nzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTfSBhYCxcbiAgRU5BQkxFRF9JVEVNU19TRUxFQ1RPUjogJy5tZGMtbGlzdC1pdGVtOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDTGlzdEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBFTEVNRU5UU19LRVlfQUxMT1dFRF9JTiA9IFsnaW5wdXQnLCAnYnV0dG9uJywgJ3RleHRhcmVhJywgJ3NlbGVjdCddO1xuXG5jbGFzcyBNRENMaXN0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpc3RBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpc3RBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGlzdEFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRMaXN0SXRlbUNvdW50OiAoKSA9PiB7fSxcbiAgICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXg6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzc0ZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzc0ZvckVsZW1lbnRJbmRleDogKCkgPT4ge30sXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbjogKCkgPT4ge30sXG4gICAgICBmb2xsb3dIcmVmOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENMaXN0QWRhcHRlcj19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0xpc3RGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gICAgLyoqIHtib29sZWFufSAqL1xuICAgIHRoaXMud3JhcEZvY3VzXyA9IGZhbHNlO1xuICAgIC8qKiB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzVmVydGljYWxfID0gdHJ1ZTtcbiAgICAvKioge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc1NpbmdsZVNlbGVjdGlvbkxpc3RfID0gZmFsc2U7XG4gICAgLyoqIHtudW1iZXJ9ICovXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IC0xO1xuICAgIC8qKiB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVzZUFjdGl2YXRlZENsYXNzXyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHByaXZhdGUgd3JhcEZvY3VzXyB2YXJpYWJsZS5cbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgc2V0V3JhcEZvY3VzKHZhbHVlKSB7XG4gICAgdGhpcy53cmFwRm9jdXNfID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaXNWZXJ0aWNhbF8gcHJpdmF0ZSB2YXJpYWJsZS5cbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgc2V0VmVydGljYWxPcmllbnRhdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuaXNWZXJ0aWNhbF8gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpc1NpbmdsZVNlbGVjdGlvbkxpc3RfIHByaXZhdGUgdmFyaWFibGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIHNldFNpbmdsZVNlbGVjdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHVzZUFjdGl2YXRlZENsYXNzXyBwcml2YXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUFjdGl2YXRlZFxuICAgKi9cbiAgc2V0VXNlQWN0aXZhdGVkQ2xhc3ModXNlQWN0aXZhdGVkKSB7XG4gICAgdGhpcy51c2VBY3RpdmF0ZWRDbGFzc18gPSB1c2VBY3RpdmF0ZWQ7XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IGluZGV4ICovXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnVzZUFjdGl2YXRlZENsYXNzX1xuICAgICAgPyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MgOiBjc3NDbGFzc2VzLkxJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUztcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIHN0cmluZ3MuQVJJQV9TRUxFQ1RFRCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIGNsYXNzTmFtZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXhfLCAndGFiaW5kZXgnLCAtMSk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy5hZGFwdGVyXy5nZXRMaXN0SXRlbUNvdW50KCkgPiBpbmRleCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IGluZGV4O1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xywgc3RyaW5ncy5BUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgY2xhc3NOYW1lKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICd0YWJpbmRleCcsIDApO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyAhPT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCgwLCAndGFiaW5kZXgnLCAtMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIGluIGhhbmRsZXIgZm9yIHRoZSBsaXN0IGl0ZW1zLlxuICAgKiBAcGFyYW0gZXZ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaXN0SXRlbUluZGV4XG4gICAqL1xuICBoYW5kbGVGb2N1c0luKGV2dCwgbGlzdEl0ZW1JbmRleCkge1xuICAgIGlmIChsaXN0SXRlbUluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuKGxpc3RJdGVtSW5kZXgsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBvdXQgaGFuZGxlciBmb3IgdGhlIGxpc3QgaXRlbXMuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlzdEl0ZW1JbmRleFxuICAgKi9cbiAgaGFuZGxlRm9jdXNPdXQoZXZ0LCBsaXN0SXRlbUluZGV4KSB7XG4gICAgaWYgKGxpc3RJdGVtSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW4obGlzdEl0ZW1JbmRleCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBLZXkgaGFuZGxlciBmb3IgdGhlIGxpc3QuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdExpc3RJdGVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaXN0SXRlbUluZGV4XG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2dCwgaXNSb290TGlzdEl0ZW0sIGxpc3RJdGVtSW5kZXgpIHtcbiAgICBjb25zdCBhcnJvd0xlZnQgPSBldnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldnQua2V5Q29kZSA9PT0gMzc7XG4gICAgY29uc3QgYXJyb3dVcCA9IGV2dC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldnQua2V5Q29kZSA9PT0gMzg7XG4gICAgY29uc3QgYXJyb3dSaWdodCA9IGV2dC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldnQua2V5Q29kZSA9PT0gMzk7XG4gICAgY29uc3QgYXJyb3dEb3duID0gZXZ0LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZ0LmtleUNvZGUgPT09IDQwO1xuICAgIGNvbnN0IGlzSG9tZSA9IGV2dC5rZXkgPT09ICdIb21lJyB8fCBldnQua2V5Q29kZSA9PT0gMzY7XG4gICAgY29uc3QgaXNFbmQgPSBldnQua2V5ID09PSAnRW5kJyB8fCBldnQua2V5Q29kZSA9PT0gMzU7XG4gICAgY29uc3QgaXNFbnRlciA9IGV2dC5rZXkgPT09ICdFbnRlcicgfHwgZXZ0LmtleUNvZGUgPT09IDEzO1xuICAgIGNvbnN0IGlzU3BhY2UgPSBldnQua2V5ID09PSAnU3BhY2UnIHx8IGV2dC5rZXlDb2RlID09PSAzMjtcblxuICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzZWRFbGVtZW50SW5kZXgoKTtcbiAgICBpZiAoY3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgY3VycmVudEluZGV4ID0gbGlzdEl0ZW1JbmRleDtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgZG9lc24ndCBoYXZlIGEgbWRjLWxpc3QtaXRlbSBhbmNlc3RvciBmcm9tIHRoZVxuICAgICAgICAvLyBjdXJyZW50IGxpc3QgKG5vdCBmcm9tIGEgc3VibGlzdCksIHJldHVybiBlYXJseS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgodGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd0Rvd24pIHx8ICghdGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd1JpZ2h0KSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgdGhpcy5mb2N1c05leHRFbGVtZW50KGN1cnJlbnRJbmRleCk7XG4gICAgfSBlbHNlIGlmICgodGhpcy5pc1ZlcnRpY2FsXyAmJiBhcnJvd1VwKSB8fCAoIXRoaXMuaXNWZXJ0aWNhbF8gJiYgYXJyb3dMZWZ0KSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgdGhpcy5mb2N1c1ByZXZFbGVtZW50KGN1cnJlbnRJbmRleCk7XG4gICAgfSBlbHNlIGlmIChpc0hvbWUpIHtcbiAgICAgIHRoaXMucHJldmVudERlZmF1bHRFdmVudF8oZXZ0KTtcbiAgICAgIHRoaXMuZm9jdXNGaXJzdEVsZW1lbnQoKTtcbiAgICB9IGVsc2UgaWYgKGlzRW5kKSB7XG4gICAgICB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCk7XG4gICAgICB0aGlzLmZvY3VzTGFzdEVsZW1lbnQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyAmJiAoaXNFbnRlciB8fCBpc1NwYWNlKSkge1xuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNwYWNlIGtleSB3YXMgcHJlc3NlZCBvbiB0aGUgbGlzdCBpdGVtIG9yIGEgY2hpbGQgZWxlbWVudC5cbiAgICAgIGlmIChpc1Jvb3RMaXN0SXRlbSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoY3VycmVudEluZGV4KTtcblxuICAgICAgICAvLyBFeHBsaWNpdGx5IGFjdGl2YXRlIGxpbmtzLCBzaW5jZSB3ZSdyZSBwcmV2ZW50aW5nIGRlZmF1bHQgb24gRW50ZXIsIGFuZCBTcGFjZSBkb2Vzbid0IGFjdGl2YXRlIHRoZW0uXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9sbG93SHJlZihjdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGljayBoYW5kbGVyIGZvciB0aGUgbGlzdC5cbiAgICovXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNlZEVsZW1lbnRJbmRleCgpO1xuXG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gLTEpIHJldHVybjtcblxuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleChjdXJyZW50SW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCBwcmV2ZW50RGVmYXVsdCBpcyBvbmx5IGNhbGxlZCBpZiB0aGUgY29udGFpbmluZyBlbGVtZW50IGRvZXNuJ3RcbiAgICogY29uc3VtZSB0aGUgZXZlbnQsIGFuZCBpdCB3aWxsIGNhdXNlIGFuIHVuaW50ZW5kZWQgc2Nyb2xsLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBgJHtldnQudGFyZ2V0LnRhZ05hbWV9YC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChFTEVNRU5UU19LRVlfQUxMT1dFRF9JTi5pbmRleE9mKHRhZ05hbWUpID09PSAtMSkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIG5leHQgZWxlbWVudCBvbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqL1xuICBmb2N1c05leHRFbGVtZW50KGluZGV4KSB7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxO1xuICAgIGlmIChuZXh0SW5kZXggPj0gY291bnQpIHtcbiAgICAgIGlmICh0aGlzLndyYXBGb2N1c18pIHtcbiAgICAgICAgbmV4dEluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBlYXJseSBiZWNhdXNlIGxhc3QgaXRlbSBpcyBhbHJlYWR5IGZvY3VzZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KG5leHRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBvbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqL1xuICBmb2N1c1ByZXZFbGVtZW50KGluZGV4KSB7XG4gICAgbGV0IHByZXZJbmRleCA9IGluZGV4IC0gMTtcbiAgICBpZiAocHJldkluZGV4IDwgMCkge1xuICAgICAgaWYgKHRoaXMud3JhcEZvY3VzXykge1xuICAgICAgICBwcmV2SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKSAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZWFybHkgYmVjYXVzZSBmaXJzdCBpdGVtIGlzIGFscmVhZHkgZm9jdXNlZC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgocHJldkluZGV4KTtcbiAgfVxuXG4gIGZvY3VzRmlyc3RFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldExpc3RJdGVtQ291bnQoKSA+IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICB9XG4gIH1cblxuICBmb2N1c0xhc3RFbGVtZW50KCkge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGlzdEl0ZW1Db3VudCgpIC0gMTtcbiAgICBpZiAobGFzdEluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChsYXN0SW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaXN0Rm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDTGlzdEZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaXN0QWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENMaXN0Rm91bmRhdGlvbj5cbiAqL1xuY2xhc3MgTURDTGlzdCBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuaGFuZGxlS2V5ZG93bl87XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVDbGlja187XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5mb2N1c0luRXZlbnRMaXN0ZW5lcl87XG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0xpc3R9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDTGlzdChyb290KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duXyk7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmZvY3VzSW5FdmVudExpc3RlbmVyXyk7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuZm9jdXNPdXRFdmVudExpc3RlbmVyXyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy5oYW5kbGVDbGlja18gPSB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUNsaWNrLmJpbmQodGhpcy5mb3VuZGF0aW9uXyk7XG4gICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IHRoaXMuaGFuZGxlS2V5ZG93bkV2ZW50Xy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZm9jdXNJbkV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c0luRXZlbnRfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c091dEV2ZW50Xy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuZm9jdXNJbkV2ZW50TGlzdGVuZXJfKTtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfKTtcbiAgICB0aGlzLmxheW91dCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxpc3RUeXBlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5yb290Xy5nZXRBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX09SSUVOVEFUSU9OKTtcbiAgICB0aGlzLnZlcnRpY2FsID0gZGlyZWN0aW9uICE9PSBzdHJpbmdzLkFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDtcblxuICAgIC8vIExpc3QgaXRlbXMgbmVlZCB0byBoYXZlIGF0IGxlYXN0IHRhYmluZGV4PS0xIHRvIGJlIGZvY3VzYWJsZS5cbiAgICBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1saXN0LWl0ZW06bm90KFt0YWJpbmRleF0pJykpXG4gICAgICAuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgfSk7XG5cbiAgICAvLyBDaGlsZCBidXR0b24vYSBlbGVtZW50cyBhcmUgbm90IHRhYmJhYmxlIHVudGlsIHRoZSBsaXN0IGl0ZW0gaXMgZm9jdXNlZC5cbiAgICBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkZPQ1VTQUJMRV9DSElMRF9FTEVNRU5UUykpXG4gICAgICAuZm9yRWFjaCgoZWxlKSA9PiBlbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGxpc3QgaXRlbSB0aGlzIGV2ZW50IGlzIHRhcmdldHRpbmcuIE9yIHJldHVybnMgLTEgaWZcbiAgICogdGhlcmUgaXMgbm8gbGlzdCBpdGVtXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TGlzdEl0ZW1JbmRleF8oZXZ0KSB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKGV2dC50YXJnZXQpO1xuICAgIGxldCBpbmRleCA9IC0xO1xuXG4gICAgLy8gRmluZCB0aGUgZmlyc3QgYW5jZXN0b3IgdGhhdCBpcyBhIGxpc3QgaXRlbSBvciB0aGUgbGlzdC5cbiAgICB3aGlsZSAoIWV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkxJU1RfSVRFTV9DTEFTUylcbiAgICAmJiAhZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuUk9PVCkpIHtcbiAgICAgIGV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGlmIGl0IGlzIGEgbGlzdCBpdGVtLlxuICAgIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MpKSB7XG4gICAgICBpbmRleCA9IHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YoZXZlbnRUYXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZpZ3VyZSBvdXQgd2hpY2ggZWxlbWVudCB3YXMgY2xpY2tlZCBiZWZvcmUgc2VuZGluZyB0aGUgZXZlbnQgdG8gdGhlIGZvdW5kYXRpb24uXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlRm9jdXNJbkV2ZW50XyhldnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TGlzdEl0ZW1JbmRleF8oZXZ0KTtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUZvY3VzSW4oZXZ0LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUZvY3VzT3V0RXZlbnRfKGV2dCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRMaXN0SXRlbUluZGV4XyhldnQpO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlRm9jdXNPdXQoZXZ0LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWRvd25FdmVudF8oZXZ0KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldExpc3RJdGVtSW5kZXhfKGV2dCk7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVLZXlkb3duKGV2dCwgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MpLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUxpc3RUeXBlKCkge1xuICAgIC8vIEF1dG9tYXRpY2FsbHkgc2V0IHNpbmdsZSBzZWxlY3Rpb24gaWYgc2VsZWN0ZWQvYWN0aXZhdGVkIGNsYXNzZXMgYXJlIHByZXNlbnQuXG4gICAgY29uc3QgcHJlc2VsZWN0ZWRFbGVtZW50ID1cbiAgICAgIHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihgLiR7Y3NzQ2xhc3Nlcy5MSVNUX0lURU1fQUNUSVZBVEVEX0NMQVNTfSwgLiR7Y3NzQ2xhc3Nlcy5MSVNUX0lURU1fU0VMRUNURURfQ0xBU1N9YCk7XG5cbiAgICBpZiAocHJlc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICBpZiAocHJlc2VsZWN0ZWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MpKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VXNlQWN0aXZhdGVkQ2xhc3ModHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2luZ2xlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YocHJlc2VsZWN0ZWRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzZXQgdmVydGljYWwodmFsdWUpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFZlcnRpY2FsT3JpZW50YXRpb24odmFsdWUpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gQXJyYXk8IUVsZW1lbnQ+Ki9cbiAgZ2V0IGxpc3RFbGVtZW50cygpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbCh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyaW5ncy5FTkFCTEVEX0lURU1TX1NFTEVDVE9SKSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzZXQgd3JhcEZvY3VzKHZhbHVlKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRXcmFwRm9jdXModmFsdWUpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTaW5nbGVTZWxlY3Rpb25MaXN0ICovXG4gIHNldCBzaW5nbGVTZWxlY3Rpb24oaXNTaW5nbGVTZWxlY3Rpb25MaXN0KSB7XG4gICAgaWYgKGlzU2luZ2xlU2VsZWN0aW9uTGlzdCkge1xuICAgICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2tfKTtcbiAgICB9XG5cbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFNpbmdsZVNlbGVjdGlvbihpc1NpbmdsZVNlbGVjdGlvbkxpc3QpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0U2VsZWN0ZWRJbmRleChpbmRleCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ0xpc3RGb3VuZGF0aW9ufSAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ0xpc3RGb3VuZGF0aW9uKC8qKiBAdHlwZSB7IU1EQ0xpc3RBZGFwdGVyfSAqLyAoT2JqZWN0LmFzc2lnbih7XG4gICAgICBnZXRMaXN0SXRlbUNvdW50OiAoKSA9PiB0aGlzLmxpc3RFbGVtZW50cy5sZW5ndGgsXG4gICAgICBnZXRGb2N1c2VkRWxlbWVudEluZGV4OiAoKSA9PiB0aGlzLmxpc3RFbGVtZW50cy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGF0dHIpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3NGb3JFbGVtZW50SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW46IChsaXN0SXRlbUluZGV4LCB0YWJJbmRleFZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RFbGVtZW50c1tsaXN0SXRlbUluZGV4XTtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW1DaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuRk9DVVNBQkxFX0NISUxEX0VMRU1FTlRTKSk7XG4gICAgICAgIGxpc3RJdGVtQ2hpbGRyZW4uZm9yRWFjaCgoZWxlKSA9PiBlbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHRhYkluZGV4VmFsdWUpKTtcbiAgICAgIH0sXG4gICAgICBmb2xsb3dIcmVmOiAoaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChsaXN0SXRlbSAmJiBsaXN0SXRlbS5ocmVmKSB7XG4gICAgICAgICAgbGlzdEl0ZW0uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSkpO1xuICB9XG59XG5cbmV4cG9ydCB7TURDTGlzdCwgTURDTGlzdEZvdW5kYXRpb259O1xuIiwidmFyIGNhbmRpZGF0ZVNlbGVjdG9ycyA9IFtcbiAgJ2lucHV0JyxcbiAgJ3NlbGVjdCcsXG4gICd0ZXh0YXJlYScsXG4gICdhW2hyZWZdJyxcbiAgJ2J1dHRvbicsXG4gICdbdGFiaW5kZXhdJyxcbiAgJ2F1ZGlvW2NvbnRyb2xzXScsXG4gICd2aWRlb1tjb250cm9sc10nLFxuICAnW2NvbnRlbnRlZGl0YWJsZV06bm90KFtjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiXSknLFxuXTtcbnZhciBjYW5kaWRhdGVTZWxlY3RvciA9IGNhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJyk7XG5cbnZhciBtYXRjaGVzID0gdHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnXG4gID8gZnVuY3Rpb24gKCkge31cbiAgOiBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gdGFiYmFibGUoZWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGVsZW1lbnREb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gIHZhciByZWd1bGFyVGFiYmFibGVzID0gW107XG4gIHZhciBvcmRlcmVkVGFiYmFibGVzID0gW107XG5cbiAgdmFyIHVudG91Y2hhYmlsaXR5Q2hlY2tlciA9IG5ldyBVbnRvdWNoYWJpbGl0eUNoZWNrZXIoZWxlbWVudERvY3VtZW50KTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9yKTtcblxuICBpZiAob3B0aW9ucy5pbmNsdWRlQ29udGFpbmVyKSB7XG4gICAgaWYgKG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpKSB7XG4gICAgICBjYW5kaWRhdGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGNhbmRpZGF0ZXMpO1xuICAgICAgY2FuZGlkYXRlcy51bnNoaWZ0KGVsKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaSwgY2FuZGlkYXRlLCBjYW5kaWRhdGVUYWJpbmRleDtcbiAgZm9yIChpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xuXG4gICAgaWYgKCFpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUoY2FuZGlkYXRlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpKSBjb250aW51ZTtcblxuICAgIGNhbmRpZGF0ZVRhYmluZGV4ID0gZ2V0VGFiaW5kZXgoY2FuZGlkYXRlKTtcbiAgICBpZiAoY2FuZGlkYXRlVGFiaW5kZXggPT09IDApIHtcbiAgICAgIHJlZ3VsYXJUYWJiYWJsZXMucHVzaChjYW5kaWRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmRlcmVkVGFiYmFibGVzLnB1c2goe1xuICAgICAgICBkb2N1bWVudE9yZGVyOiBpLFxuICAgICAgICB0YWJJbmRleDogY2FuZGlkYXRlVGFiaW5kZXgsXG4gICAgICAgIG5vZGU6IGNhbmRpZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0YWJiYWJsZU5vZGVzID0gb3JkZXJlZFRhYmJhYmxlc1xuICAgIC5zb3J0KHNvcnRPcmRlcmVkVGFiYmFibGVzKVxuICAgIC5tYXAoZnVuY3Rpb24oYSkgeyByZXR1cm4gYS5ub2RlIH0pXG4gICAgLmNvbmNhdChyZWd1bGFyVGFiYmFibGVzKTtcblxuICByZXR1cm4gdGFiYmFibGVOb2Rlcztcbn1cblxudGFiYmFibGUuaXNUYWJiYWJsZSA9IGlzVGFiYmFibGU7XG50YWJiYWJsZS5pc0ZvY3VzYWJsZSA9IGlzRm9jdXNhYmxlO1xuXG5mdW5jdGlvbiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKSB7XG4gIGlmIChcbiAgICAhaXNOb2RlTWF0Y2hpbmdTZWxlY3RvckZvY3VzYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpXG4gICAgfHwgaXNOb25UYWJiYWJsZVJhZGlvKG5vZGUpXG4gICAgfHwgZ2V0VGFiaW5kZXgobm9kZSkgPCAwXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNUYWJiYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpIHtcbiAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoJ05vIG5vZGUgcHJvdmlkZWQnKTtcbiAgaWYgKG1hdGNoZXMuY2FsbChub2RlLCBjYW5kaWRhdGVTZWxlY3RvcikgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlTWF0Y2hpbmdTZWxlY3RvckZvY3VzYWJsZShub2RlLCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIpIHtcbiAgdW50b3VjaGFiaWxpdHlDaGVja2VyID0gdW50b3VjaGFiaWxpdHlDaGVja2VyIHx8IG5ldyBVbnRvdWNoYWJpbGl0eUNoZWNrZXIobm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUpO1xuICBpZiAoXG4gICAgbm9kZS5kaXNhYmxlZFxuICAgIHx8IGlzSGlkZGVuSW5wdXQobm9kZSlcbiAgICB8fCB1bnRvdWNoYWJpbGl0eUNoZWNrZXIuaXNVbnRvdWNoYWJsZShub2RlKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBmb2N1c2FibGVDYW5kaWRhdGVTZWxlY3RvciA9IGNhbmRpZGF0ZVNlbGVjdG9ycy5jb25jYXQoJ2lmcmFtZScpLmpvaW4oJywnKTtcbmZ1bmN0aW9uIGlzRm9jdXNhYmxlKG5vZGUsIHVudG91Y2hhYmlsaXR5Q2hlY2tlcikge1xuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignTm8gbm9kZSBwcm92aWRlZCcpO1xuICBpZiAobWF0Y2hlcy5jYWxsKG5vZGUsIGZvY3VzYWJsZUNhbmRpZGF0ZVNlbGVjdG9yKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUobm9kZSwgdW50b3VjaGFiaWxpdHlDaGVja2VyKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFiaW5kZXgobm9kZSkge1xuICB2YXIgdGFiaW5kZXhBdHRyID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKTtcbiAgaWYgKCFpc05hTih0YWJpbmRleEF0dHIpKSByZXR1cm4gdGFiaW5kZXhBdHRyO1xuICAvLyBCcm93c2VycyBkbyBub3QgcmV0dXJuIGB0YWJJbmRleGAgY29ycmVjdGx5IGZvciBjb250ZW50RWRpdGFibGUgbm9kZXM7XG4gIC8vIHNvIGlmIHRoZXkgZG9uJ3QgaGF2ZSBhIHRhYmluZGV4IGF0dHJpYnV0ZSBzcGVjaWZpY2FsbHkgc2V0LCBhc3N1bWUgaXQncyAwLlxuICBpZiAoaXNDb250ZW50RWRpdGFibGUobm9kZSkpIHJldHVybiAwO1xuICByZXR1cm4gbm9kZS50YWJJbmRleDtcbn1cblxuZnVuY3Rpb24gc29ydE9yZGVyZWRUYWJiYWJsZXMoYSwgYikge1xuICByZXR1cm4gYS50YWJJbmRleCA9PT0gYi50YWJJbmRleCA/IGEuZG9jdW1lbnRPcmRlciAtIGIuZG9jdW1lbnRPcmRlciA6IGEudGFiSW5kZXggLSBiLnRhYkluZGV4O1xufVxuXG4vLyBBcnJheS5wcm90b3R5cGUuZmluZCBub3QgYXZhaWxhYmxlIGluIElFLlxuZnVuY3Rpb24gZmluZChsaXN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocHJlZGljYXRlKGxpc3RbaV0pKSByZXR1cm4gbGlzdFtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0NvbnRlbnRFZGl0YWJsZShub2RlKSB7XG4gIHJldHVybiBub2RlLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnO1xufVxuXG5mdW5jdGlvbiBpc0lucHV0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ0lOUFVUJztcbn1cblxuZnVuY3Rpb24gaXNIaWRkZW5JbnB1dChub2RlKSB7XG4gIHJldHVybiBpc0lucHV0KG5vZGUpICYmIG5vZGUudHlwZSA9PT0gJ2hpZGRlbic7XG59XG5cbmZ1bmN0aW9uIGlzUmFkaW8obm9kZSkge1xuICByZXR1cm4gaXNJbnB1dChub2RlKSAmJiBub2RlLnR5cGUgPT09ICdyYWRpbyc7XG59XG5cbmZ1bmN0aW9uIGlzTm9uVGFiYmFibGVSYWRpbyhub2RlKSB7XG4gIHJldHVybiBpc1JhZGlvKG5vZGUpICYmICFpc1RhYmJhYmxlUmFkaW8obm9kZSk7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZWRSYWRpbyhub2Rlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGVzW2ldLmNoZWNrZWQpIHtcbiAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNUYWJiYWJsZVJhZGlvKG5vZGUpIHtcbiAgaWYgKCFub2RlLm5hbWUpIHJldHVybiB0cnVlO1xuICAvLyBUaGlzIHdvbid0IGFjY291bnQgZm9yIHRoZSBlZGdlIGNhc2Ugd2hlcmUgeW91IGhhdmUgcmFkaW8gZ3JvdXBzIHdpdGggdGhlIHNhbWVcbiAgLy8gaW4gc2VwYXJhdGUgZm9ybXMgb24gdGhlIHNhbWUgcGFnZS5cbiAgdmFyIHJhZGlvU2V0ID0gbm9kZS5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtuYW1lPVwiJyArIG5vZGUubmFtZSArICdcIl0nKTtcbiAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkUmFkaW8ocmFkaW9TZXQpO1xuICByZXR1cm4gIWNoZWNrZWQgfHwgY2hlY2tlZCA9PT0gbm9kZTtcbn1cblxuLy8gQW4gZWxlbWVudCBpcyBcInVudG91Y2hhYmxlXCIgaWYgKml0IG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzKiBoYXNcbi8vIGB2aXNpYmlsaXR5OiBoaWRkZW5gIG9yIGBkaXNwbGF5OiBub25lYC5cbmZ1bmN0aW9uIFVudG91Y2hhYmlsaXR5Q2hlY2tlcihlbGVtZW50RG9jdW1lbnQpIHtcbiAgdGhpcy5kb2MgPSBlbGVtZW50RG9jdW1lbnQ7XG4gIC8vIE5vZGUgY2FjaGUgbXVzdCBiZSByZWZyZXNoZWQgb24gZXZlcnkgY2hlY2ssIGluIGNhc2VcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaGFzIGNoYW5nZWQuIFRoZSBjYWNoZSBjb250YWlucyB0dXBsZXNcbiAgLy8gbWFwcGluZyBub2RlcyB0byB0aGVpciBib29sZWFuIHJlc3VsdC5cbiAgdGhpcy5jYWNoZSA9IFtdO1xufVxuXG4vLyBnZXRDb21wdXRlZFN0eWxlIGFjY3VyYXRlbHkgcmVmbGVjdHMgYHZpc2liaWxpdHk6IGhpZGRlbmAgb2YgYW5jZXN0b3JzXG4vLyBidXQgbm90IGBkaXNwbGF5OiBub25lYCwgc28gd2UgbmVlZCB0byByZWN1cnNpdmVseSBjaGVjayBwYXJlbnRzLlxuVW50b3VjaGFiaWxpdHlDaGVja2VyLnByb3RvdHlwZS5oYXNEaXNwbGF5Tm9uZSA9IGZ1bmN0aW9uIGhhc0Rpc3BsYXlOb25lKG5vZGUsIG5vZGVDb21wdXRlZFN0eWxlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciBhIGNhY2hlZCByZXN1bHQuXG4gICAgdmFyIGNhY2hlZCA9IGZpbmQodGhpcy5jYWNoZSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gPT09IG5vZGU7XG4gICAgfSk7XG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZFsxXTtcblxuICAgIG5vZGVDb21wdXRlZFN0eWxlID0gbm9kZUNvbXB1dGVkU3R5bGUgfHwgdGhpcy5kb2MuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuaGFzRGlzcGxheU5vbmUobm9kZS5wYXJlbnROb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhY2hlLnB1c2goW25vZGUsIHJlc3VsdF0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVW50b3VjaGFiaWxpdHlDaGVja2VyLnByb3RvdHlwZS5pc1VudG91Y2hhYmxlID0gZnVuY3Rpb24gaXNVbnRvdWNoYWJsZShub2RlKSB7XG4gIGlmIChub2RlID09PSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSB0aGlzLmRvYy5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBpZiAodGhpcy5oYXNEaXNwbGF5Tm9uZShub2RlLCBjb21wdXRlZFN0eWxlKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYmJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsInZhciB0YWJiYWJsZSA9IHJlcXVpcmUoJ3RhYmJhYmxlJyk7XG52YXIgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpO1xuXG52YXIgbGlzdGVuaW5nRm9jdXNUcmFwID0gbnVsbDtcblxuZnVuY3Rpb24gZm9jdXNUcmFwKGVsZW1lbnQsIHVzZXJPcHRpb25zKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIGNvbnRhaW5lciA9XG4gICAgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gZG9jLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gIHZhciBjb25maWcgPSB4dGVuZChcbiAgICB7XG4gICAgICByZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTogdHJ1ZSxcbiAgICAgIGVzY2FwZURlYWN0aXZhdGVzOiB0cnVlXG4gICAgfSxcbiAgICB1c2VyT3B0aW9uc1xuICApO1xuXG4gIHZhciBzdGF0ZSA9IHtcbiAgICBmaXJzdFRhYmJhYmxlTm9kZTogbnVsbCxcbiAgICBsYXN0VGFiYmFibGVOb2RlOiBudWxsLFxuICAgIG5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbjogbnVsbCxcbiAgICBtb3N0UmVjZW50bHlGb2N1c2VkTm9kZTogbnVsbCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBhdXNlZDogZmFsc2VcbiAgfTtcblxuICB2YXIgdHJhcCA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGUsXG4gICAgZGVhY3RpdmF0ZTogZGVhY3RpdmF0ZSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgdW5wYXVzZTogdW5wYXVzZVxuICB9O1xuXG4gIHJldHVybiB0cmFwO1xuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKGFjdGl2YXRlT3B0aW9ucykge1xuICAgIGlmIChzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcblxuICAgIHN0YXRlLmFjdGl2ZSA9IHRydWU7XG4gICAgc3RhdGUucGF1c2VkID0gZmFsc2U7XG4gICAgc3RhdGUubm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICB2YXIgb25BY3RpdmF0ZSA9XG4gICAgICBhY3RpdmF0ZU9wdGlvbnMgJiYgYWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGVcbiAgICAgICAgPyBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkFjdGl2YXRlO1xuICAgIGlmIChvbkFjdGl2YXRlKSB7XG4gICAgICBvbkFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBkZWFjdGl2YXRlKGRlYWN0aXZhdGVPcHRpb25zKSB7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHN0YXRlLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgdmFyIG9uRGVhY3RpdmF0ZSA9XG4gICAgICBkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGRlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkRlYWN0aXZhdGU7XG4gICAgaWYgKG9uRGVhY3RpdmF0ZSkge1xuICAgICAgb25EZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIHJldHVybkZvY3VzID1cbiAgICAgIGRlYWN0aXZhdGVPcHRpb25zICYmIGRlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1c1xuICAgICAgICA6IGNvbmZpZy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTtcbiAgICBpZiAocmV0dXJuRm9jdXMpIHtcbiAgICAgIGRlbGF5KGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnlGb2N1cyhzdGF0ZS5ub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAoc3RhdGUucGF1c2VkIHx8ICFzdGF0ZS5hY3RpdmUpIHJldHVybjtcbiAgICBzdGF0ZS5wYXVzZWQgPSB0cnVlO1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5wYXVzZSgpIHtcbiAgICBpZiAoIXN0YXRlLnBhdXNlZCB8fCAhc3RhdGUuYWN0aXZlKSByZXR1cm47XG4gICAgc3RhdGUucGF1c2VkID0gZmFsc2U7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHJldHVybjtcblxuICAgIC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBsaXN0ZW5pbmcgZm9jdXMgdHJhcCBhdCBhIHRpbWVcbiAgICBpZiAobGlzdGVuaW5nRm9jdXNUcmFwKSB7XG4gICAgICBsaXN0ZW5pbmdGb2N1c1RyYXAucGF1c2UoKTtcbiAgICB9XG4gICAgbGlzdGVuaW5nRm9jdXNUcmFwID0gdHJhcDtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcblxuICAgIC8vIERlbGF5IGVuc3VyZXMgdGhhdCB0aGUgZm9jdXNlZCBlbGVtZW50IGRvZXNuJ3QgY2FwdHVyZSB0aGUgZXZlbnRcbiAgICAvLyB0aGF0IGNhdXNlZCB0aGUgZm9jdXMgdHJhcCBhY3RpdmF0aW9uLlxuICAgIGRlbGF5KGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICB9KTtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIGNoZWNrRm9jdXNJbiwgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBsaXN0ZW5pbmdGb2N1c1RyYXAgIT09IHRyYXApIHJldHVybjtcblxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgY2hlY2tGb2N1c0luLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrLCB0cnVlKTtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNoZWNrS2V5LCB0cnVlKTtcblxuICAgIGxpc3RlbmluZ0ZvY3VzVHJhcCA9IG51bGw7XG5cbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5vZGVGb3JPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgIHZhciBvcHRpb25WYWx1ZSA9IGNvbmZpZ1tvcHRpb25OYW1lXTtcbiAgICB2YXIgbm9kZSA9IG9wdGlvblZhbHVlO1xuICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgbm9kZSA9IGRvYy5xdWVyeVNlbGVjdG9yKG9wdGlvblZhbHVlKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2AnICsgb3B0aW9uTmFtZSArICdgIHJlZmVycyB0byBubyBrbm93biBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUgPSBvcHRpb25WYWx1ZSgpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgZGlkIG5vdCByZXR1cm4gYSBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbEZvY3VzTm9kZSgpIHtcbiAgICB2YXIgbm9kZTtcbiAgICBpZiAoZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJykgIT09IG51bGwpIHtcbiAgICAgIG5vZGUgPSBnZXROb2RlRm9yT3B0aW9uKCdpbml0aWFsRm9jdXMnKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5jb250YWlucyhkb2MuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIG5vZGUgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlIHx8IGdldE5vZGVGb3JPcHRpb24oJ2ZhbGxiYWNrRm9jdXMnKTtcbiAgICB9XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJZb3UgY2FuJ3QgaGF2ZSBhIGZvY3VzLXRyYXAgd2l0aG91dCBhdCBsZWFzdCBvbmUgZm9jdXNhYmxlIGVsZW1lbnRcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8vIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSBvbiBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnQgaW5zdGVhZCBvZiBjbGlja1xuICAvLyBzbyB0aGF0IGl0IHByZWNlZGVzIHRoZSBmb2N1cyBldmVudC5cbiAgZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSB7XG4gICAgICBkZWFjdGl2YXRlKHtcbiAgICAgICAgcmV0dXJuRm9jdXM6ICF0YWJiYWJsZS5pc0ZvY3VzYWJsZShlLnRhcmdldClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gSW4gY2FzZSBmb2N1cyBlc2NhcGVzIHRoZSB0cmFwIGZvciBzb21lIHN0cmFuZ2UgcmVhc29uLCBwdWxsIGl0IGJhY2sgaW4uXG4gIGZ1bmN0aW9uIGNoZWNrRm9jdXNJbihlKSB7XG4gICAgLy8gSW4gRmlyZWZveCB3aGVuIHlvdSBUYWIgb3V0IG9mIGFuIGlmcmFtZSB0aGUgRG9jdW1lbnQgaXMgYnJpZWZseSBmb2N1c2VkLlxuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpIHx8IGUudGFyZ2V0IGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB0cnlGb2N1cyhzdGF0ZS5tb3N0UmVjZW50bHlGb2N1c2VkTm9kZSB8fCBnZXRJbml0aWFsRm9jdXNOb2RlKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgIGlmIChjb25maWcuZXNjYXBlRGVhY3RpdmF0ZXMgIT09IGZhbHNlICYmIGlzRXNjYXBlRXZlbnQoZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRlYWN0aXZhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzVGFiRXZlbnQoZSkpIHtcbiAgICAgIGNoZWNrVGFiKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhpamFjayBUYWIgZXZlbnRzIG9uIHRoZSBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgbm9kZXMgb2YgdGhlIHRyYXAsXG4gIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgZm9jdXMgZnJvbSBlc2NhcGluZy4gSWYgaXQgZXNjYXBlcyBmb3IgZXZlbiBhXG4gIC8vIG1vbWVudCBpdCBjYW4gZW5kIHVwIHNjcm9sbGluZyB0aGUgcGFnZSBhbmQgY2F1c2luZyBjb25mdXNpb24gc28gd2VcbiAgLy8ga2luZCBvZiBuZWVkIHRvIGNhcHR1cmUgdGhlIGFjdGlvbiBhdCB0aGUga2V5ZG93biBwaGFzZS5cbiAgZnVuY3Rpb24gY2hlY2tUYWIoZSkge1xuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICBpZiAoZS5zaGlmdEtleSAmJiBlLnRhcmdldCA9PT0gc3RhdGUuZmlyc3RUYWJiYWJsZU5vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRyeUZvY3VzKHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRyeUZvY3VzKHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKSB7XG4gICAgdmFyIHRhYmJhYmxlTm9kZXMgPSB0YWJiYWJsZShjb250YWluZXIpO1xuICAgIHN0YXRlLmZpcnN0VGFiYmFibGVOb2RlID0gdGFiYmFibGVOb2Rlc1swXSB8fCBnZXRJbml0aWFsRm9jdXNOb2RlKCk7XG4gICAgc3RhdGUubGFzdFRhYmJhYmxlTm9kZSA9XG4gICAgICB0YWJiYWJsZU5vZGVzW3RhYmJhYmxlTm9kZXMubGVuZ3RoIC0gMV0gfHwgZ2V0SW5pdGlhbEZvY3VzTm9kZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5Rm9jdXMobm9kZSkge1xuICAgIGlmIChub2RlID09PSBkb2MuYWN0aXZlRWxlbWVudCkgcmV0dXJuO1xuICAgIGlmICghbm9kZSB8fCAhbm9kZS5mb2N1cykge1xuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmZvY3VzKCk7XG4gICAgc3RhdGUubW9zdFJlY2VudGx5Rm9jdXNlZE5vZGUgPSBub2RlO1xuICAgIGlmIChpc1NlbGVjdGFibGVJbnB1dChub2RlKSkge1xuICAgICAgbm9kZS5zZWxlY3QoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUudGFnTmFtZSAmJlxuICAgIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnICYmXG4gICAgdHlwZW9mIG5vZGUuc2VsZWN0ID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzRXNjYXBlRXZlbnQoZSkge1xuICByZXR1cm4gZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5ID09PSAnRXNjJyB8fCBlLmtleUNvZGUgPT09IDI3O1xufVxuXG5mdW5jdGlvbiBpc1RhYkV2ZW50KGUpIHtcbiAgcmV0dXJuIGUua2V5ID09PSAnVGFiJyB8fCBlLmtleUNvZGUgPT09IDk7XG59XG5cbmZ1bmN0aW9uIGRlbGF5KGZuKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KGZuLCAwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb2N1c1RyYXA7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwJztcblxuLyoqXG4gKiBAcGFyYW0geyFFbGVtZW50fSBzdXJmYWNlRWxcbiAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBmb2N1c1RyYXBGYWN0b3J5XG4gKiBAcmV0dXJuIHshRm9jdXNUcmFwSW5zdGFuY2V9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKHN1cmZhY2VFbCwgZm9jdXNUcmFwRmFjdG9yeSA9IGNyZWF0ZUZvY3VzVHJhcCkge1xuICByZXR1cm4gZm9jdXNUcmFwRmFjdG9yeShzdXJmYWNlRWwsIHtcbiAgICBjbGlja091dHNpZGVEZWFjdGl2YXRlczogdHJ1ZSxcbiAgICBpbml0aWFsRm9jdXM6IGZhbHNlLCAvLyBOYXZpZ2F0aW9uIGRyYXdlciBoYW5kbGVzIGZvY3VzaW5nIG9uIGFjdGl2ZSBuYXYgaXRlbS5cbiAgICBlc2NhcGVEZWFjdGl2YXRlczogZmFsc2UsIC8vIE5hdmlnYXRpb24gZHJhd2VyIGhhbmRsZXMgRVNDLlxuICAgIHJldHVybkZvY3VzT25EZWFjdGl2YXRlOiBmYWxzZSwgLy8gTmF2aWdhdGlvbiBkcmF3ZXIgaGFuZGxlcyByZXN0b3JlIGZvY3VzLlxuICB9KTtcbn1cblxuZXhwb3J0IHtjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7TURDQ29tcG9uZW50fSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uIGZyb20gJy4vZGlzbWlzc2libGUvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIGZyb20gJy4vbW9kYWwvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRHJhd2VyQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtNRENMaXN0fSBmcm9tICdAbWF0ZXJpYWwvbGlzdC9pbmRleCc7XG5pbXBvcnQgTURDTGlzdEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2xpc3QvZm91bmRhdGlvbic7XG5pbXBvcnQge3N0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBjcmVhdGVGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcCc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0NvbXBvbmVudDwhTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENEcmF3ZXIgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNGb2N1c187XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmhhbmRsZUtleWRvd25fO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kXztcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuZm9jdXNUcmFwRmFjdG9yeV87XG5cbiAgICAvKiogQHByaXZhdGUgeyFGb2N1c1RyYXBJbnN0YW5jZX0gKi9cbiAgICB0aGlzLmZvY3VzVHJhcF87XG5cbiAgICAvKiogQHByaXZhdGUgez9FbGVtZW50fSAqL1xuICAgIHRoaXMuc2NyaW1fO1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RnVuY3Rpb259ICovXG4gICAgdGhpcy5oYW5kbGVTY3JpbUNsaWNrXztcblxuICAgIC8qKiBAcHJpdmF0ZSB7P01EQ0xpc3R9ICovXG4gICAgdGhpcy5saXN0XztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENEcmF3ZXJ9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDRHJhd2VyKHJvb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgaW4gdGhlIG9wZW4gcG9zaXRpb24uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5pc09wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkcmF3ZXIgb3BlbiBhbmQgY2xvc2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3BlblxuICAgKi9cbiAgc2V0IG9wZW4oaXNPcGVuKSB7XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbl8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplKFxuICAgIGZvY3VzVHJhcEZhY3RvcnkgPSBjcmVhdGVGb2N1c1RyYXAsXG4gICAgbGlzdEZhY3RvcnkgPSAoZWwpID0+IG5ldyBNRENMaXN0KGVsKSkge1xuICAgIGNvbnN0IGxpc3RFbCA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovICh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoYC4ke01EQ0xpc3RGb3VuZGF0aW9uLmNzc0NsYXNzZXMuUk9PVH1gKSk7XG4gICAgaWYgKGxpc3RFbCkge1xuICAgICAgdGhpcy5saXN0XyA9IGxpc3RGYWN0b3J5KGxpc3RFbCk7XG4gICAgICB0aGlzLmxpc3RfLndyYXBGb2N1cyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNUcmFwRmFjdG9yeV8gPSBmb2N1c1RyYXBGYWN0b3J5O1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIGNvbnN0IHtNT0RBTH0gPSBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3NlcztcblxuICAgIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcbiAgICAgIGNvbnN0IHtTQ1JJTV9TRUxFQ1RPUn0gPSBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24uc3RyaW5ncztcbiAgICAgIHRoaXMuc2NyaW1fID0gLyoqIEB0eXBlIHshRWxlbWVudH0gKi8gKHRoaXMucm9vdF8ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFNDUklNX1NFTEVDVE9SKSk7XG4gICAgICB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfID0gKCkgPT4gLyoqIEB0eXBlIHshTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9ufSAqLyAodGhpcy5mb3VuZGF0aW9uXykuaGFuZGxlU2NyaW1DbGljaygpO1xuICAgICAgdGhpcy5zY3JpbV8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfKTtcbiAgICAgIHRoaXMuZm9jdXNUcmFwXyA9IHV0aWwuY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UodGhpcy5yb290XywgdGhpcy5mb2N1c1RyYXBGYWN0b3J5Xyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IChldnQpID0+IHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlS2V5ZG93bihldnQpO1xuICAgIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZF8gPSAoZXZ0KSA9PiB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KTtcblxuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZF8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd25fKTtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKTtcblxuICAgIGlmICh0aGlzLmxpc3RfKSB7XG4gICAgICB0aGlzLmxpc3RfLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBjb25zdCB7TU9EQUx9ID0gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKE1PREFMKSkge1xuICAgICAgdGhpcy5zY3JpbV8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAvKiogQHR5cGUgeyFGdW5jdGlvbn0gKi8gKHRoaXMuaGFuZGxlU2NyaW1DbGlja18pKTtcbiAgICAgIC8vIEVuc3VyZSBkcmF3ZXIgaXMgY2xvc2VkIHRvIGhpZGUgc2NyaW0gYW5kIHJlbGVhc2UgZm9jdXNcbiAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8qKiBAdHlwZSB7IU1EQ0RyYXdlckFkYXB0ZXJ9ICovXG4gICAgY29uc3QgYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ0RyYXdlckFkYXB0ZXJ9ICovIChPYmplY3QuYXNzaWduKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgZWxlbWVudEhhc0NsYXNzOiAoZWxlbWVudCwgY2xhc3NOYW1lKSA9PiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gdGhpcy5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHNhdmVGb2N1czogKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzRm9jdXNfID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb2N1cyA9IHRoaXMucHJldmlvdXNGb2N1c18gJiYgdGhpcy5wcmV2aW91c0ZvY3VzXy5mb2N1cztcbiAgICAgICAgaWYgKHRoaXMucm9vdF8uY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiYgcHJldmlvdXNGb2N1cykge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNGb2N1c18uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZvY3VzQWN0aXZlTmF2aWdhdGlvbkl0ZW06ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlTmF2SXRlbUVsID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKGAuJHtNRENMaXN0Rm91bmRhdGlvbi5jc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1N9YCk7XG4gICAgICAgIGlmIChhY3RpdmVOYXZJdGVtRWwpIHtcbiAgICAgICAgICBhY3RpdmVOYXZJdGVtRWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB0aGlzLmVtaXQoc3RyaW5ncy5DTE9TRV9FVkVOVCwge30sIHRydWUgLyogc2hvdWxkQnViYmxlICovKSxcbiAgICAgIG5vdGlmeU9wZW46ICgpID0+IHRoaXMuZW1pdChzdHJpbmdzLk9QRU5fRVZFTlQsIHt9LCB0cnVlIC8qIHNob3VsZEJ1YmJsZSAqLyksXG4gICAgICB0cmFwRm9jdXM6ICgpID0+IHRoaXMuZm9jdXNUcmFwXy5hY3RpdmF0ZSgpLFxuICAgICAgcmVsZWFzZUZvY3VzOiAoKSA9PiB0aGlzLmZvY3VzVHJhcF8uZGVhY3RpdmF0ZSgpLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHtESVNNSVNTSUJMRSwgTU9EQUx9ID0gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKERJU01JU1NJQkxFKSkge1xuICAgICAgcmV0dXJuIG5ldyBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcbiAgICAgIHJldHVybiBuZXcgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBNRENEcmF3ZXI6IEZhaWxlZCB0byBpbnN0YW50aWF0ZSBjb21wb25lbnQuIFN1cHBvcnRlZCB2YXJpYW50cyBhcmUgJHtESVNNSVNTSUJMRX0gYW5kICR7TU9EQUx9LmApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge01EQ0RyYXdlciwgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLCBNRENNb2RhbERyYXdlckZvdW5kYXRpb24sIHV0aWx9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5MaXN0ID0gZXhwb3J0cy5MaXN0R3JvdXBIZWFkZXIgPSBleHBvcnRzLkxpc3RHcm91cCA9IGV4cG9ydHMuTGlzdFNlY29uZGFyeVRleHQgPSBleHBvcnRzLkxpc3RQcmltYXJ5VGV4dCA9IGV4cG9ydHMuTGlzdFRleHRDb250YWluZXIgPSBleHBvcnRzLkxpc3REaXZpZGVyID0gZXhwb3J0cy5MaXN0SXRlbU1ldGFUZXh0ID0gZXhwb3J0cy5MaXN0SXRlbU1ldGEgPSBleHBvcnRzLkxpc3RJdGVtR3JhcGhpYyA9IGV4cG9ydHMuTGlzdExpbmtJdGVtID0gZXhwb3J0cy5MaXN0SXRlbSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfcHJlYWN0ID0gcmVxdWlyZShcInByZWFjdFwiKTtcblxudmFyIF9NYXRlcmlhbENvbXBvbmVudDEwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQmFzZS9NYXRlcmlhbENvbXBvbmVudFwiKSk7XG5cbnZhciBfSWNvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0ljb25cIikpO1xuXG52YXIgTGlzdEl0ZW0gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0SXRlbSwgX01hdGVyaWFsQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbSgpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbSk7XG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RJdGVtKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpcy5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbSc7XG4gICAgX3RoaXMubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0SXRlbSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImxpXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByb2xlOiBcIm9wdGlvblwiXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RJdGVtO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0SXRlbSA9IExpc3RJdGVtO1xuXG52YXIgTGlzdExpbmtJdGVtID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKExpc3RMaW5rSXRlbSwgX01hdGVyaWFsQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gTGlzdExpbmtJdGVtKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0TGlua0l0ZW0pO1xuICAgIF90aGlzMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdExpbmtJdGVtKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW0nO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0TGlua0l0ZW0sIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJhXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByb2xlOiBcIm9wdGlvblwiXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RMaW5rSXRlbTtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdExpbmtJdGVtID0gTGlzdExpbmtJdGVtO1xuXG52YXIgTGlzdEl0ZW1HcmFwaGljID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKExpc3RJdGVtR3JhcGhpYywgX01hdGVyaWFsQ29tcG9uZW50Myk7XG5cbiAgZnVuY3Rpb24gTGlzdEl0ZW1HcmFwaGljKCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbUdyYXBoaWMpO1xuICAgIF90aGlzMyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEl0ZW1HcmFwaGljKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczMuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX2dyYXBoaWMnO1xuICAgIF90aGlzMy5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0SXRlbUdyYXBoaWMsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmLFxuICAgICAgICByb2xlOiBcInByZXNlbnRhdGlvblwiXG4gICAgICB9KSwgKDAsIF9wcmVhY3QuaCkoX0ljb24uZGVmYXVsdCwge1xuICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiXG4gICAgICB9LCBwcm9wcy5jaGlsZHJlbikpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdEl0ZW1HcmFwaGljO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0SXRlbUdyYXBoaWMgPSBMaXN0SXRlbUdyYXBoaWM7XG5cbnZhciBMaXN0SXRlbU1ldGEgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9MaXN0SXRlbUdyYXBoaWMpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoTGlzdEl0ZW1NZXRhLCBfTGlzdEl0ZW1HcmFwaGljKTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbU1ldGEoKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RJdGVtTWV0YSk7XG4gICAgX3RoaXM0ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShMaXN0SXRlbU1ldGEpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNC5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbV9fbWV0YSc7XG4gICAgcmV0dXJuIF90aGlzNDtcbiAgfVxuXG4gIHJldHVybiBMaXN0SXRlbU1ldGE7XG59KExpc3RJdGVtR3JhcGhpYyk7XG5cbmV4cG9ydHMuTGlzdEl0ZW1NZXRhID0gTGlzdEl0ZW1NZXRhO1xuXG52YXIgTGlzdEl0ZW1NZXRhVGV4dCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0SXRlbU1ldGFUZXh0LCBfTWF0ZXJpYWxDb21wb25lbnQ0KTtcblxuICBmdW5jdGlvbiBMaXN0SXRlbU1ldGFUZXh0KCkge1xuICAgIHZhciBfdGhpczU7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0SXRlbU1ldGFUZXh0KTtcbiAgICBfdGhpczUgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RJdGVtTWV0YVRleHQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzNS5jb21wb25lbnROYW1lID0gJ2xpc3QtaXRlbV9fbWV0YSc7XG4gICAgX3RoaXM1Lm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKExpc3RJdGVtTWV0YVRleHQsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmLFxuICAgICAgICByb2xlOiBcInByZXNlbnRhdGlvblwiXG4gICAgICB9KSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdEl0ZW1NZXRhVGV4dDtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdEl0ZW1NZXRhVGV4dCA9IExpc3RJdGVtTWV0YVRleHQ7XG5cbnZhciBMaXN0RGl2aWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0RGl2aWRlciwgX01hdGVyaWFsQ29tcG9uZW50NSk7XG5cbiAgZnVuY3Rpb24gTGlzdERpdmlkZXIoKSB7XG4gICAgdmFyIF90aGlzNjtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3REaXZpZGVyKTtcbiAgICBfdGhpczYgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3REaXZpZGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczYuY29tcG9uZW50TmFtZSA9ICdsaXN0LWRpdmlkZXInO1xuICAgIF90aGlzNi5tZGNQcm9wcyA9IFsnaW5zZXQnXTtcbiAgICByZXR1cm4gX3RoaXM2O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdERpdmlkZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJsaVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcm9sZTogXCJzZXBhcmF0b3JcIlxuICAgICAgfSwgcHJvcHMsIHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3REaXZpZGVyO1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0RGl2aWRlciA9IExpc3REaXZpZGVyO1xuXG52YXIgTGlzdFRleHRDb250YWluZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDYpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoTGlzdFRleHRDb250YWluZXIsIF9NYXRlcmlhbENvbXBvbmVudDYpO1xuXG4gIGZ1bmN0aW9uIExpc3RUZXh0Q29udGFpbmVyKCkge1xuICAgIHZhciBfdGhpczc7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0VGV4dENvbnRhaW5lcik7XG4gICAgX3RoaXM3ID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShMaXN0VGV4dENvbnRhaW5lcikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXM3LmNvbXBvbmVudE5hbWUgPSAnbGlzdC1pdGVtX190ZXh0JztcbiAgICBfdGhpczcubWRjUHJvcHMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM3O1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdFRleHRDb250YWluZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9KSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGlzdFRleHRDb250YWluZXI7XG59KF9NYXRlcmlhbENvbXBvbmVudDEwLmRlZmF1bHQpO1xuXG5leHBvcnRzLkxpc3RUZXh0Q29udGFpbmVyID0gTGlzdFRleHRDb250YWluZXI7XG5cbnZhciBMaXN0UHJpbWFyeVRleHQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9MaXN0VGV4dENvbnRhaW5lcikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0UHJpbWFyeVRleHQsIF9MaXN0VGV4dENvbnRhaW5lcik7XG5cbiAgZnVuY3Rpb24gTGlzdFByaW1hcnlUZXh0KCkge1xuICAgIHZhciBfdGhpczg7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBMaXN0UHJpbWFyeVRleHQpO1xuICAgIF90aGlzOCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdFByaW1hcnlUZXh0KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczguY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX3ByaW1hcnktdGV4dCc7XG4gICAgcmV0dXJuIF90aGlzODtcbiAgfVxuXG4gIHJldHVybiBMaXN0UHJpbWFyeVRleHQ7XG59KExpc3RUZXh0Q29udGFpbmVyKTtcblxuZXhwb3J0cy5MaXN0UHJpbWFyeVRleHQgPSBMaXN0UHJpbWFyeVRleHQ7XG5cbnZhciBMaXN0U2Vjb25kYXJ5VGV4dCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3RUZXh0Q29udGFpbmVyMikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0U2Vjb25kYXJ5VGV4dCwgX0xpc3RUZXh0Q29udGFpbmVyMik7XG5cbiAgZnVuY3Rpb24gTGlzdFNlY29uZGFyeVRleHQoKSB7XG4gICAgdmFyIF90aGlzOTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RTZWNvbmRhcnlUZXh0KTtcbiAgICBfdGhpczkgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKExpc3RTZWNvbmRhcnlUZXh0KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczkuY29tcG9uZW50TmFtZSA9ICdsaXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JztcbiAgICByZXR1cm4gX3RoaXM5O1xuICB9XG5cbiAgcmV0dXJuIExpc3RTZWNvbmRhcnlUZXh0O1xufShMaXN0VGV4dENvbnRhaW5lcik7XG5cbmV4cG9ydHMuTGlzdFNlY29uZGFyeVRleHQgPSBMaXN0U2Vjb25kYXJ5VGV4dDtcblxudmFyIExpc3RHcm91cCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50Nykge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0R3JvdXAsIF9NYXRlcmlhbENvbXBvbmVudDcpO1xuXG4gIGZ1bmN0aW9uIExpc3RHcm91cCgpIHtcbiAgICB2YXIgX3RoaXMxMDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RHcm91cCk7XG4gICAgX3RoaXMxMCA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEdyb3VwKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczEwLmNvbXBvbmVudE5hbWUgPSAnbGlzdC1ncm91cCc7XG4gICAgX3RoaXMxMC5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczEwO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoTGlzdEdyb3VwLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMaXN0R3JvdXA7XG59KF9NYXRlcmlhbENvbXBvbmVudDEwLmRlZmF1bHQpO1xuXG5leHBvcnRzLkxpc3RHcm91cCA9IExpc3RHcm91cDtcblxudmFyIExpc3RHcm91cEhlYWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50OCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0R3JvdXBIZWFkZXIsIF9NYXRlcmlhbENvbXBvbmVudDgpO1xuXG4gIGZ1bmN0aW9uIExpc3RHcm91cEhlYWRlcigpIHtcbiAgICB2YXIgX3RoaXMxMTtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIExpc3RHcm91cEhlYWRlcik7XG4gICAgX3RoaXMxMSA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdEdyb3VwSGVhZGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczExLmNvbXBvbmVudE5hbWUgPSAnbGlzdC1ncm91cF9fc3ViaGVhZGVyJztcbiAgICBfdGhpczExLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzMTE7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0R3JvdXBIZWFkZXIsIFt7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJoM1wiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpc3RHcm91cEhlYWRlcjtcbn0oX01hdGVyaWFsQ29tcG9uZW50MTAuZGVmYXVsdCk7XG5cbmV4cG9ydHMuTGlzdEdyb3VwSGVhZGVyID0gTGlzdEdyb3VwSGVhZGVyO1xuXG52YXIgTGlzdCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50OSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShMaXN0LCBfTWF0ZXJpYWxDb21wb25lbnQ5KTtcblxuICBmdW5jdGlvbiBMaXN0KCkge1xuICAgIHZhciBfdGhpczEyO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgTGlzdCk7XG4gICAgX3RoaXMxMiA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoTGlzdCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMxMi5jb21wb25lbnROYW1lID0gJ2xpc3QnO1xuICAgIF90aGlzMTIubWRjUHJvcHMgPSBbJ2RlbnNlJywgJ3R3by1saW5lJywgJ2F2YXRhci1saXN0J107XG4gICAgcmV0dXJuIF90aGlzMTI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXN0LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgaWYgKHByb3BzLmludGVyYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcIm5hdlwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgICB9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwidWxcIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0pLCBwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMaXN0O1xufShfTWF0ZXJpYWxDb21wb25lbnQxMC5kZWZhdWx0KTtcblxuZXhwb3J0cy5MaXN0ID0gTGlzdDtcblxudmFyIGRlZmF1bHRfMSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3QpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoZGVmYXVsdF8xLCBfTGlzdCk7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KExpc3QpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5kZWZhdWx0XzEuSXRlbSA9IExpc3RJdGVtO1xuZGVmYXVsdF8xLkxpbmtJdGVtID0gTGlzdExpbmtJdGVtO1xuZGVmYXVsdF8xLkl0ZW1HcmFwaGljID0gTGlzdEl0ZW1HcmFwaGljO1xuZGVmYXVsdF8xLkl0ZW1NZXRhID0gTGlzdEl0ZW1NZXRhO1xuZGVmYXVsdF8xLkl0ZW1NZXRhVGV4dCA9IExpc3RJdGVtTWV0YVRleHQ7XG5kZWZhdWx0XzEuRGl2aWRlciA9IExpc3REaXZpZGVyO1xuZGVmYXVsdF8xLlRleHRDb250YWluZXIgPSBMaXN0VGV4dENvbnRhaW5lcjtcbmRlZmF1bHRfMS5QcmltYXJ5VGV4dCA9IExpc3RQcmltYXJ5VGV4dDtcbmRlZmF1bHRfMS5TZWNvbmRhcnlUZXh0ID0gTGlzdFNlY29uZGFyeVRleHQ7XG5kZWZhdWx0XzEuR3JvdXAgPSBMaXN0R3JvdXA7XG5kZWZhdWx0XzEuR3JvdXBIZWFkZXIgPSBMaXN0R3JvdXBIZWFkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLkRyYXdlciA9IGV4cG9ydHMuRHJhd2VySXRlbSA9IGV4cG9ydHMuRHJhd2VyQ29udGVudCA9IGV4cG9ydHMuRHJhd2VySGVhZGVyID0gdm9pZCAwO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfZHJhd2VyID0gcmVxdWlyZShcIkBtYXRlcmlhbC9kcmF3ZXJcIik7XG5cbnZhciBfYmluZERlY29yYXRvciA9IHJlcXVpcmUoXCJiaW5kLWRlY29yYXRvclwiKTtcblxudmFyIF9wcmVhY3QgPSByZXF1aXJlKFwicHJlYWN0XCIpO1xuXG52YXIgX01hdGVyaWFsQ29tcG9uZW50NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL0Jhc2UvTWF0ZXJpYWxDb21wb25lbnRcIikpO1xuXG52YXIgX0xpc3QgPSByZXF1aXJlKFwiLi4vTGlzdFwiKTtcblxudmFyIF9fZGVjb3JhdGUgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19kZWNvcmF0ZSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsXG4gICAgICBkO1xuICBpZiAoKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMi5kZWZhdWx0KShSZWZsZWN0KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO2Vsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICB9XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuXG52YXIgRHJhd2VySGVhZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoRHJhd2VySGVhZGVyLCBfTWF0ZXJpYWxDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIERyYXdlckhlYWRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBEcmF3ZXJIZWFkZXIpO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShEcmF3ZXJIZWFkZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzLmNvbXBvbmVudE5hbWUgPSAnZHJhd2VyX19oZWFkZXInO1xuICAgIF90aGlzLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoRHJhd2VySGVhZGVyLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiaGVhZGVyXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSwgcHJvcHMpLCAoMCwgX3ByZWFjdC5oKShcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJtZGMtZHJhd2VyX19oZWFkZXItY29udGVudFwiXG4gICAgICB9LCBwcm9wcy5jaGlsZHJlbikpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhd2VySGVhZGVyO1xufShfTWF0ZXJpYWxDb21wb25lbnQ0LmRlZmF1bHQpO1xuXG5leHBvcnRzLkRyYXdlckhlYWRlciA9IERyYXdlckhlYWRlcjtcblxudmFyIERyYXdlckNvbnRlbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9NYXRlcmlhbENvbXBvbmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoRHJhd2VyQ29udGVudCwgX01hdGVyaWFsQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhd2VyQ29udGVudCgpIHtcbiAgICB2YXIgX3RoaXMyO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgRHJhd2VyQ29udGVudCk7XG4gICAgX3RoaXMyID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShEcmF3ZXJDb250ZW50KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczIuY29tcG9uZW50TmFtZSA9ICdkcmF3ZXJfX2NvbnRlbnQnO1xuICAgIF90aGlzMi5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShEcmF3ZXJDb250ZW50LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlcl9fY29udGVudFwiXG4gICAgICB9LCAoMCwgX3ByZWFjdC5oKShcIm5hdlwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIm1kYy1saXN0XCIsXG4gICAgICAgIHJlZjogdGhpcy5zZXRDb250cm9sUmVmXG4gICAgICB9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmF3ZXJDb250ZW50O1xufShfTWF0ZXJpYWxDb21wb25lbnQ0LmRlZmF1bHQpO1xuXG5leHBvcnRzLkRyYXdlckNvbnRlbnQgPSBEcmF3ZXJDb250ZW50O1xuXG52YXIgRHJhd2VySXRlbSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xpc3RMaW5rSXRlbSkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShEcmF3ZXJJdGVtLCBfTGlzdExpbmtJdGVtKTtcblxuICBmdW5jdGlvbiBEcmF3ZXJJdGVtKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIERyYXdlckl0ZW0pO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKERyYXdlckl0ZW0pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoRHJhd2VySXRlbSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHZhciByZXR1cm5lZE5vZGUgPSAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoRHJhd2VySXRlbS5wcm90b3R5cGUpLCBcIm1hdGVyaWFsRG9tXCIsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMpO1xuICAgICAgLyogTG9naWMgdG8gYWRkIHNlbGVjdGVkIGNsYXNzICovXG5cbiAgICAgIGlmIChwcm9wcy5zZWxlY3RlZCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIChyZXR1cm5lZE5vZGUucHJvcHMgfHwgcmV0dXJuZWROb2RlLmF0dHJpYnV0ZXMpLmNsYXNzTmFtZSA9ICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuZWROb2RlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhd2VySXRlbTtcbn0oX0xpc3QuTGlzdExpbmtJdGVtKTtcblxuZXhwb3J0cy5EcmF3ZXJJdGVtID0gRHJhd2VySXRlbTtcblxudmFyIERyYXdlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50Mykge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShEcmF3ZXIsIF9NYXRlcmlhbENvbXBvbmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYXdlcigpIHtcbiAgICB2YXIgX3RoaXMzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgRHJhd2VyKTtcbiAgICBfdGhpczMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKERyYXdlcikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMzLmNvbXBvbmVudE5hbWUgPSAnZHJhd2VyLWNvbnRhaW5lcic7XG4gICAgX3RoaXMzLm1kY1Byb3BzID0gW107XG4gICAgX3RoaXMzLm1kY05vdGlmeVByb3BzID0gWydvcGVuJ107XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKERyYXdlciwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoRHJhd2VyLnByb3RvdHlwZSksIFwiY29tcG9uZW50RGlkTW91bnRcIiwgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiAodGhpcy5wcm9wcy5tb2RhbCB8fCB0aGlzLnByb3BzLmRpc21pc3NpYmxlKSkge1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50ID0gbmV3IF9kcmF3ZXIuTURDRHJhd2VyKHRoaXMuY29udHJvbCk7XG4gICAgICAgIHRoaXMuTURDb21wb25lbnQubGlzdGVuKCdNRENEcmF3ZXI6b3BlbmVkJywgdGhpcy5vbk9wZW4pO1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50Lmxpc3RlbignTURDRHJhd2VyOmNsb3NlZCcsIHRoaXMub25DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25PcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcGVuKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2UoZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25DbG9zZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1hdGVyaWFsRG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hdGVyaWFsRG9tKHByb3BzKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IFsnbWRjLWRyYXdlciddOyAvLyBjYW50IHVzZSBtZGNQcm9wcyBjdXogY2xhc3NlcyBuZWVkIHRvIGJlIG9uIHRoZSBpbm5lciBjaGlsZCBhbmQgbm90IG9uIHJvb3QgbGV2ZWxcblxuICAgICAgaWYgKHByb3BzLm1vZGFsKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnbWRjLWRyYXdlci0tbW9kYWwnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcHMuZGlzbWlzc2libGUpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdtZGMtZHJhd2VyLS1kaXNtaXNzaWJsZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKDAsIF9wcmVhY3QuaCkoXCJkaXZcIiwgbnVsbCwgKDAsIF9wcmVhY3QuaCkoXCJhc2lkZVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMuam9pbignICcpLFxuICAgICAgICByZWY6IHRoaXMuc2V0Q29udHJvbFJlZlxuICAgICAgfSwgcHJvcHMpLCBwcm9wcy5jaGlsZHJlbiksIHByb3BzLm1vZGFsICYmICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3M6IFwibWRjLWRyYXdlci1zY3JpbVwiXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmF3ZXI7XG59KF9NYXRlcmlhbENvbXBvbmVudDQuZGVmYXVsdCk7XG5cbmV4cG9ydHMuRHJhd2VyID0gRHJhd2VyO1xuRHJhd2VyLkRyYXdlckNvbnRlbnQgPSBEcmF3ZXJDb250ZW50O1xuRHJhd2VyLkRyYXdlckhlYWRlciA9IERyYXdlckhlYWRlcjtcbkRyYXdlci5EcmF3ZXJJdGVtID0gRHJhd2VySXRlbTtcblxuX19kZWNvcmF0ZShbX2JpbmREZWNvcmF0b3IuYmluZF0sIERyYXdlci5wcm90b3R5cGUsIFwib25PcGVuXCIsIG51bGwpO1xuXG5fX2RlY29yYXRlKFtfYmluZERlY29yYXRvci5iaW5kXSwgRHJhd2VyLnByb3RvdHlwZSwgXCJvbkNsb3NlXCIsIG51bGwpO1xuXG52YXIgZGVmYXVsdF8xID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRHJhd2VyKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKGRlZmF1bHRfMSwgX0RyYXdlcik7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIGRlZmF1bHRfMSk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoZGVmYXVsdF8xKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0XzE7XG59KERyYXdlcik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbmRlZmF1bHRfMS5EcmF3ZXJDb250ZW50ID0gRHJhd2VyQ29udGVudDtcbmRlZmF1bHRfMS5EcmF3ZXJIZWFkZXIgPSBEcmF3ZXJIZWFkZXI7XG5kZWZhdWx0XzEuRHJhd2VySXRlbSA9IERyYXdlckl0ZW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQge2h9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgRHJhd2VyIGZyb20gJ3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0RyYXdlcic7XG5pbXBvcnQgJ3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0RyYXdlci9zdHlsZS5jc3MnO1xuaW1wb3J0ICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9MaXN0L3N0eWxlLmNzcyc7XG5pbXBvcnQgJ3ByZWFjdC1tYXRlcmlhbC1jb21wb25lbnRzL0J1dHRvbi9zdHlsZS5jc3MnO1xuXG5jb25zdCBEcmF3ZXJQYWdlID0oe29wZW4sc2V0VG9nZ2xlLCBpdGVtc30pPT4ge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgIFxuICAgICAgICA8RHJhd2VyXG4gICAgICAgICAgbW9kYWxcbiAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldFRvZ2dsZShmYWxzZSkgXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxEcmF3ZXIuRHJhd2VySGVhZGVyIGNsYXNzTmFtZT1cIm1kYy10aGVtZS0tcHJpbWFyeS1iZ1wiPlxuICAgICAgICAgICBQb3J0Zm9saW9cbiAgICAgICAgICAgPGlucHV0IC8+XG4gICAgICAgICAgPC9EcmF3ZXIuRHJhd2VySGVhZGVyPlxuICAgICAgICAgIDxEcmF3ZXIuRHJhd2VyQ29udGVudD5cbiAgICAgICAgICAgIHtpdGVtcyAmJiBpdGVtcy5tYXAoKGl0ZW0saSk9PntcbiAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgIDxEcmF3ZXIuRHJhd2VySXRlbSBocmVmPXtgJHtpdGVtLnJvdXRlfWB9PlxuICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgIDwvRHJhd2VyLkRyYXdlckl0ZW0+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRHJhd2VyLkRyYXdlckNvbnRlbnQ+XG4gICAgICAgIDwvRHJhd2VyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG5cbiAgZXhwb3J0IGRlZmF1bHQgRHJhd2VyUGFnZSIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVG9wIEFwcCBCYXJcbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBUb3AgQXBwIEJhciBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVG9wQXBwQmFyQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcm9vdCBFbGVtZW50IGNvbnRhaW5zIHRoZSBnaXZlbiBjbGFzcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzcGVjaWZpZWQgaW5saW5lIHN0eWxlIHByb3BlcnR5IG9uIHRoZSByb290IEVsZW1lbnQgdG8gdGhlIGdpdmVuIHZhbHVlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgdG9wIGFwcCBiYXIuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFRvcEFwcEJhckhlaWdodCgpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBuYXZpZ2F0aW9uIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgbmF2aWdhdGlvbiBpY29uIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgbmF2aWdhdGlvbiBpY29uIGlzIGNsaWNrZWQuXG4gICAqL1xuICBub3RpZnlOYXZpZ2F0aW9uSWNvbkNsaWNrZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICBkZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFZpZXdwb3J0U2Nyb2xsWSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0VG90YWxBY3Rpb25JdGVtcygpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RvcEFwcEJhckFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBGSVhFRF9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tZml4ZWQnLFxuICBGSVhFRF9TQ1JPTExFRF9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tZml4ZWQtc2Nyb2xsZWQnLFxuICBTSE9SVF9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tc2hvcnQnLFxuICBTSE9SVF9IQVNfQUNUSU9OX0lURU1fQ0xBU1M6ICdtZGMtdG9wLWFwcC1iYXItLXNob3J0LWhhcy1hY3Rpb24taXRlbScsXG4gIFNIT1JUX0NPTExBUFNFRF9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkJyxcbn07XG5cbi8qKiBAZW51bSB7bnVtYmVyfSAqL1xuY29uc3QgbnVtYmVycyA9IHtcbiAgREVCT1VOQ0VfVEhST1RUTEVfUkVTSVpFX1RJTUVfTVM6IDEwMCxcbiAgTUFYX1RPUF9BUFBfQkFSX0hFSUdIVDogMTI4LFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBQ1RJT05fSVRFTV9TRUxFQ1RPUjogJy5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtJyxcbiAgTkFWSUdBVElPTl9FVkVOVDogJ01EQ1RvcEFwcEJhcjpuYXYnLFxuICBOQVZJR0FUSU9OX0lDT05fU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb24nLFxuICBST09UX1NFTEVDVE9SOiAnLm1kYy10b3AtYXBwLWJhcicsXG4gIFRJVExFX1NFTEVDVE9SOiAnLm1kYy10b3AtYXBwLWJhcl9fdGl0bGUnLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXMsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBNRENUb3BBcHBCYXJBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVG9wQXBwQmFyQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtudW1iZXJ9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUb3BBcHBCYXJBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUb3BBcHBCYXJBZGFwdGVyfSAqLyAoe1xuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGU6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldFRvcEFwcEJhckhlaWdodDogKCkgPT4ge30sXG4gICAgICByZWdpc3Rlck5hdmlnYXRpb25JY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBub3RpZnlOYXZpZ2F0aW9uSWNvbkNsaWNrZWQ6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldFRvdGFsQWN0aW9uSXRlbXM6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKC8qKiBAdHlwZSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9ICovIGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLm5hdkNsaWNrSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmFkYXB0ZXJfLm5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZCgpO1xuXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyXyA9ICgpID0+IHt9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5uYXZDbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyTmF2aWdhdGlvbkljb25JbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5uYXZDbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIGluaXRTY3JvbGxIYW5kbGVyKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveVNjcm9sbEhhbmRsZXIoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgTURDVG9wQXBwQmFyQWRhcHRlciBmcm9tICcuLi9hZGFwdGVyJztcbmltcG9ydCBNRENUb3BBcHBCYXJGb3VuZGF0aW9uIGZyb20gJy4uL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENUb3BBcHBCYXJGb3VuZGF0aW9uPCFNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb24+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbiBleHRlbmRzIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHshTURDVG9wQXBwQmFyQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKGFkYXB0ZXIpO1xuICAgIC8qKiBTdGF0ZSB2YXJpYWJsZSBmb3IgdGhlIHByZXZpb3VzIHNjcm9sbCBpdGVyYXRpb24gdG9wIGFwcCBiYXIgc3RhdGUgKi9cbiAgICB0aGlzLndhc1Njcm9sbGVkXyA9IGZhbHNlO1xuXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyXyA9ICgpID0+IHRoaXMuZml4ZWRTY3JvbGxIYW5kbGVyXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBoYW5kbGVyIGZvciBhcHBseWluZy9yZW1vdmluZyB0aGUgbW9kaWZpZXIgY2xhc3NcbiAgICogb24gdGhlIGZpeGVkIHRvcCBhcHAgYmFyLlxuICAgKi9cbiAgZml4ZWRTY3JvbGxIYW5kbGVyXygpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsID0gdGhpcy5hZGFwdGVyXy5nZXRWaWV3cG9ydFNjcm9sbFkoKTtcblxuICAgIGlmIChjdXJyZW50U2Nyb2xsIDw9IDApIHtcbiAgICAgIGlmICh0aGlzLndhc1Njcm9sbGVkXykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRklYRURfU0NST0xMRURfQ0xBU1MpO1xuICAgICAgICB0aGlzLndhc1Njcm9sbGVkXyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMud2FzU2Nyb2xsZWRfKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5GSVhFRF9TQ1JPTExFRF9DTEFTUyk7XG4gICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENUb3BBcHBCYXJBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIGZyb20gJy4uL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbjwhTURDU2hvcnRUb3BBcHBCYXJGb3VuZGF0aW9uPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24gZXh0ZW5kcyBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUb3BBcHBCYXJBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoYWRhcHRlcik7XG4gICAgLy8gU3RhdGUgdmFyaWFibGUgZm9yIHRoZSBjdXJyZW50IHRvcCBhcHAgYmFyIHN0YXRlXG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyXyA9ICgpID0+IHRoaXMuc2hvcnRBcHBCYXJTY3JvbGxIYW5kbGVyXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgY29uc3QgaXNBbHdheXNDb2xsYXBzZWQgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuU0hPUlRfQ09MTEFQU0VEX0NMQVNTKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldFRvdGFsQWN0aW9uSXRlbXMoKSA+IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5TSE9SVF9IQVNfQUNUSU9OX0lURU1fQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmICghaXNBbHdheXNDb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICAgICAgdGhpcy5zaG9ydEFwcEJhclNjcm9sbEhhbmRsZXJfKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNjcm9sbCBoYW5kbGVyIGZvciBhcHBseWluZy9yZW1vdmluZyB0aGUgY29sbGFwc2VkIG1vZGlmaWVyIGNsYXNzXG4gICAqIG9uIHRoZSBzaG9ydCB0b3AgYXBwIGJhci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNob3J0QXBwQmFyU2Nyb2xsSGFuZGxlcl8oKSB7XG4gICAgY29uc3QgY3VycmVudFNjcm9sbCA9IHRoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRTY3JvbGxZKCk7XG5cbiAgICBpZiAoY3VycmVudFNjcm9sbCA8PSAwKSB7XG4gICAgICBpZiAodGhpcy5pc0NvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuU0hPUlRfQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlNIT1JUX0NPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ1RvcEFwcEJhckFkYXB0ZXIgZnJvbSAnLi4vYWRhcHRlcic7XG5pbXBvcnQgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24gZnJvbSAnLi4vZm91bmRhdGlvbic7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IElOSVRJQUxfVkFMVUUgPSAwO1xuLyoqXG4gKiBAZXh0ZW5kcyB7TURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb248IU1EQ1RvcEFwcEJhckZvdW5kYXRpb24+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24gZXh0ZW5kcyBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUb3BBcHBCYXJBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoYWRhcHRlcik7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgZGlmZnMgb2YgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gdnMgcHJldmlvdXMgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICogQHByaXZhdGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbl8gPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2ZXJpZnkgd2hlbiB0aGUgdG9wIGFwcCBiYXIgaXMgY29tcGxldGVseSBzaG93aW5nIG9yIGNvbXBsZXRlbHkgaGlkZGVuXG4gICAgICogQHByaXZhdGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnRvcEFwcEJhckhlaWdodF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRvcEFwcEJhckhlaWdodCgpO1xuXG4gICAgLyoqXG4gICAgICogd2FzRG9ja2VkXyBpcyB1c2VkIHRvIGluZGljYXRlIGlmIHRoZSB0b3AgYXBwIGJhciB3YXMgZG9ja2VkIGluIHRoZSBwcmV2aW91c1xuICAgICAqIHNjcm9sbCBoYW5kbGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLndhc0RvY2tlZF8gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogaXNEb2NrZWRTaG93aW5nXyBpcyB1c2VkIHRvIGluZGljYXRlIGlmIHRoZSB0b3AgYXBwIGJhciBpcyBkb2NrZWQgaW4gdGhlIGZ1bGx5XG4gICAgICogc2hvd24gcG9zaXRpb24uXG4gICAgICogQHByaXZhdGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pc0RvY2tlZFNob3dpbmdfID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFZhcmlhYmxlIGZvciBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgdG9wIGFwcCBiYXJcbiAgICAgKiBAcHJpdmF0ZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPSAwO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBwcmV2ZW50IHRoZSB0b3AgYXBwIGJhciBmcm9tIGJlaW5nIHNjcm9sbGVkIG91dCBvZiB2aWV3IGR1cmluZyByZXNpemUgZXZlbnRzXG4gICAgICogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZF8gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lb3V0IHRoYXQncyB1c2VkIHRvIHRocm90dGxlIHRoZSByZXNpemUgZXZlbnRzXG4gICAgICogQHByaXZhdGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc2l6ZVRocm90dGxlSWRfID0gSU5JVElBTF9WQUxVRTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lb3V0IHRoYXQncyB1c2VkIHRvIGRlYm91bmNlIHRvZ2dsaW5nIHRoZSBpc0N1cnJlbnRseUJlaW5nUmVzaXplZF8gdmFyaWFibGUgYWZ0ZXIgYSByZXNpemVcbiAgICAgKiBAcHJpdmF0ZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmVzaXplRGVib3VuY2VJZF8gPSBJTklUSUFMX1ZBTFVFO1xuXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyXyA9ICgpID0+IHRoaXMudG9wQXBwQmFyU2Nyb2xsSGFuZGxlcl8oKTtcbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy50b3BBcHBCYXJSZXNpemVIYW5kbGVyXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzdXBlci5pbml0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZSgndG9wJywgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGUgRE9NIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRm9yVXBkYXRlXygpIHtcbiAgICBjb25zdCBvZmZzY3JlZW5Cb3VuZGFyeVRvcCA9IC10aGlzLnRvcEFwcEJhckhlaWdodF87XG4gICAgY29uc3QgaGFzQW55UGl4ZWxzT2Zmc2NyZWVuID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA8IDA7XG4gICAgY29uc3QgaGFzQW55UGl4ZWxzT25zY3JlZW4gPSB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfID4gb2Zmc2NyZWVuQm91bmRhcnlUb3A7XG4gICAgY29uc3QgcGFydGlhbGx5U2hvd2luZyA9IGhhc0FueVBpeGVsc09mZnNjcmVlbiAmJiBoYXNBbnlQaXhlbHNPbnNjcmVlbjtcblxuICAgIC8vIElmIGl0J3MgcGFydGlhbGx5IHNob3dpbmcsIGl0IGNhbid0IGJlIGRvY2tlZC5cbiAgICBpZiAocGFydGlhbGx5U2hvd2luZykge1xuICAgICAgdGhpcy53YXNEb2NrZWRfID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vdCBwcmV2aW91c2x5IGRvY2tlZCBhbmQgbm90IHBhcnRpYWxseSBzaG93aW5nLCBpdCdzIG5vdyBkb2NrZWQuXG4gICAgICBpZiAoIXRoaXMud2FzRG9ja2VkXykge1xuICAgICAgICB0aGlzLndhc0RvY2tlZF8gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RvY2tlZFNob3dpbmdfICE9PSBoYXNBbnlQaXhlbHNPbnNjcmVlbikge1xuICAgICAgICB0aGlzLmlzRG9ja2VkU2hvd2luZ18gPSBoYXNBbnlQaXhlbHNPbnNjcmVlbjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRpYWxseVNob3dpbmc7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gbW92ZSB0aGUgdG9wIGFwcCBiYXIgaWYgbmVlZGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbW92ZVRvcEFwcEJhcl8oKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JVcGRhdGVfKCkpIHtcbiAgICAgIC8vIE9uY2UgdGhlIHRvcCBhcHAgYmFyIGlzIGZ1bGx5IGhpZGRlbiB3ZSB1c2UgdGhlIG1heCBwb3RlbnRpYWwgdG9wIGFwcCBiYXIgaGVpZ2h0IGFzIG91ciBvZmZzZXRcbiAgICAgIC8vIHNvIHRoZSB0b3AgYXBwIGJhciBkb2Vzbid0IHNob3cgaWYgdGhlIHdpbmRvdyByZXNpemVzIGFuZCB0aGUgbmV3IGhlaWdodCA+IHRoZSBvbGQgaGVpZ2h0LlxuICAgICAgbGV0IG9mZnNldCA9IHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF87XG4gICAgICBpZiAoTWF0aC5hYnMob2Zmc2V0KSA+PSB0aGlzLnRvcEFwcEJhckhlaWdodF8pIHtcbiAgICAgICAgb2Zmc2V0ID0gLW51bWJlcnMuTUFYX1RPUF9BUFBfQkFSX0hFSUdIVDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZSgndG9wJywgb2Zmc2V0ICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBoYW5kbGVyIGZvciB0aGUgZGVmYXVsdCBzY3JvbGwgYmVoYXZpb3Igb2YgdGhlIHRvcCBhcHAgYmFyLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdG9wQXBwQmFyU2Nyb2xsSGFuZGxlcl8oKSB7XG4gICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gTWF0aC5tYXgodGhpcy5hZGFwdGVyXy5nZXRWaWV3cG9ydFNjcm9sbFkoKSwgMCk7XG4gICAgY29uc3QgZGlmZiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiAtIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uXztcbiAgICB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbl8gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IGlzIGJlaW5nIHJlc2l6ZWQgdGhlIGxhc3RTY3JvbGxQb3NpdGlvbl8gbmVlZHMgdG8gYmUgdXBkYXRlZCBidXQgdGhlXG4gICAgLy8gY3VycmVudCBzY3JvbGwgb2YgdGhlIHRvcCBhcHAgYmFyIHNob3VsZCBzdGF5IGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgIGlmICghdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZF8pIHtcbiAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gLT0gZGlmZjtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPSAwO1xuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyh0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfKSA+IHRoaXMudG9wQXBwQmFySGVpZ2h0Xykge1xuICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0XztcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3ZlVG9wQXBwQmFyXygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3AgYXBwIGJhciByZXNpemUgaGFuZGxlciB0aGF0IHRocm90dGxlL2RlYm91bmNlIGZ1bmN0aW9ucyB0aGF0IGV4ZWN1dGUgdXBkYXRlcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRvcEFwcEJhclJlc2l6ZUhhbmRsZXJfKCkge1xuICAgIC8vIFRocm90dGxlIHJlc2l6ZSBldmVudHMgMTAgcC9zXG4gICAgaWYgKCF0aGlzLnJlc2l6ZVRocm90dGxlSWRfKSB7XG4gICAgICB0aGlzLnJlc2l6ZVRocm90dGxlSWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzaXplVGhyb3R0bGVJZF8gPSBJTklUSUFMX1ZBTFVFO1xuICAgICAgICB0aGlzLnRocm90dGxlZFJlc2l6ZUhhbmRsZXJfKCk7XG4gICAgICB9LCBudW1iZXJzLkRFQk9VTkNFX1RIUk9UVExFX1JFU0laRV9USU1FX01TKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5yZXNpemVEZWJvdW5jZUlkXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2VJZF8pO1xuICAgIH1cblxuICAgIHRoaXMucmVzaXplRGVib3VuY2VJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9wQXBwQmFyU2Nyb2xsSGFuZGxlcl8oKTtcbiAgICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWRfID0gZmFsc2U7XG4gICAgICB0aGlzLnJlc2l6ZURlYm91bmNlSWRfID0gSU5JVElBTF9WQUxVRTtcbiAgICB9LCBudW1iZXJzLkRFQk9VTkNFX1RIUk9UVExFX1JFU0laRV9USU1FX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdHRsZWQgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSB0b3AgYXBwIGJhciBzY3JvbGxlZCB2YWx1ZXMgaWYgdGhlXG4gICAqIHRvcCBhcHAgYmFyIGhlaWdodCBjaGFuZ2VzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhyb3R0bGVkUmVzaXplSGFuZGxlcl8oKSB7XG4gICAgY29uc3QgY3VycmVudEhlaWdodCA9IHRoaXMuYWRhcHRlcl8uZ2V0VG9wQXBwQmFySGVpZ2h0KCk7XG4gICAgaWYgKHRoaXMudG9wQXBwQmFySGVpZ2h0XyAhPT0gY3VycmVudEhlaWdodCkge1xuICAgICAgdGhpcy53YXNEb2NrZWRfID0gZmFsc2U7XG5cbiAgICAgIC8vIFNpbmNlIHRoZSB0b3AgYXBwIGJhciBoYXMgYSBkaWZmZXJlbnQgaGVpZ2h0IGRlcGVuZGluZyBvbiB0aGUgc2NyZWVuIHdpZHRoLCB0aGlzXG4gICAgICAvLyB3aWxsIGVuc3VyZSB0aGF0IHRoZSB0b3AgYXBwIGJhciByZW1haW5zIGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uIGlmXG4gICAgICAvLyBjb21wbGV0ZWx5IGhpZGRlbiBhbmQgYSByZXNpemUgbWFrZXMgdGhlIHRvcCBhcHAgYmFyIGEgZGlmZmVyZW50IGhlaWdodC5cbiAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gLT0gdGhpcy50b3BBcHBCYXJIZWlnaHRfIC0gY3VycmVudEhlaWdodDtcbiAgICAgIHRoaXMudG9wQXBwQmFySGVpZ2h0XyA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMudG9wQXBwQmFyU2Nyb2xsSGFuZGxlcl8oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUb3BBcHBCYXJGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENUb3BBcHBCYXJBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQge01EQ1JpcHBsZX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbiBmcm9tICcuL2ZpeGVkL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbiBmcm9tICcuL3Nob3J0L2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RvcEFwcEJhckZvdW5kYXRpb24gZnJvbSAnLi9zdGFuZGFyZC9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDQ29tcG9uZW50PCFNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVG9wQXBwQmFyIGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIC8qKiBAcHJpdmF0ZSB7P0VsZW1lbnR9ICovXG4gICAgdGhpcy5uYXZJY29uXztcbiAgICAvKiogQHR5cGUgez9BcnJheTxNRENSaXBwbGU+fSAqL1xuICAgIHRoaXMuaWNvblJpcHBsZXNfO1xuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICAgIHRoaXMuc2Nyb2xsVGFyZ2V0XztcbiAgfVxuXG4gIGluaXRpYWxpemUoXG4gICAgcmlwcGxlRmFjdG9yeSA9IChlbCkgPT4gTURDUmlwcGxlLmF0dGFjaFRvKGVsKSkge1xuICAgIHRoaXMubmF2SWNvbl8gPSB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3Ioc3RyaW5ncy5OQVZJR0FUSU9OX0lDT05fU0VMRUNUT1IpO1xuXG4gICAgLy8gR2V0IGFsbCBpY29ucyBpbiB0aGUgdG9vbGJhciBhbmQgaW5zdGFudGlhdGUgdGhlIHJpcHBsZXNcbiAgICBjb25zdCBpY29ucyA9IFtdLnNsaWNlLmNhbGwodGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuQUNUSU9OX0lURU1fU0VMRUNUT1IpKTtcbiAgICBpZiAodGhpcy5uYXZJY29uXykge1xuICAgICAgaWNvbnMucHVzaCh0aGlzLm5hdkljb25fKTtcbiAgICB9XG5cbiAgICB0aGlzLmljb25SaXBwbGVzXyA9IGljb25zLm1hcCgoaWNvbikgPT4ge1xuICAgICAgY29uc3QgcmlwcGxlID0gcmlwcGxlRmFjdG9yeShpY29uKTtcbiAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHJpcHBsZTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5pY29uUmlwcGxlc18uZm9yRWFjaCgoaWNvblJpcHBsZSkgPT4gaWNvblJpcHBsZS5kZXN0cm95KCkpO1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHNldFNjcm9sbFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3lTY3JvbGxIYW5kbGVyKCk7XG4gICAgdGhpcy5zY3JvbGxUYXJnZXRfID0gdGFyZ2V0O1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdFNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENUb3BBcHBCYXJ9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDVG9wQXBwQmFyKHJvb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbn1cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8qKiBAdHlwZSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9ICovXG4gICAgY29uc3QgYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ1RvcEFwcEJhckFkYXB0ZXJ9ICovIChPYmplY3QuYXNzaWduKHtcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgc2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUpID0+IHRoaXMucm9vdF8uc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSxcbiAgICAgIGdldFRvcEFwcEJhckhlaWdodDogKCkgPT4gdGhpcy5yb290Xy5jbGllbnRIZWlnaHQsXG4gICAgICByZWdpc3Rlck5hdmlnYXRpb25JY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5uYXZJY29uXykge1xuICAgICAgICAgIHRoaXMubmF2SWNvbl8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubmF2SWNvbl8pIHtcbiAgICAgICAgICB0aGlzLm5hdkljb25fLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub3RpZnlOYXZpZ2F0aW9uSWNvbkNsaWNrZWQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KHN0cmluZ3MuTkFWSUdBVElPTl9FVkVOVCwge30pO1xuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKGhhbmRsZXIpID0+IHRoaXMuc2Nyb2xsVGFyZ2V0Xy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy5zY3JvbGxUYXJnZXRfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICBnZXRWaWV3cG9ydFNjcm9sbFk6ICgpID0+XG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0X1t0aGlzLnNjcm9sbFRhcmdldF8gPT09IHdpbmRvdyA/ICdwYWdlWU9mZnNldCcgOiAnc2Nyb2xsVG9wJ10sXG4gICAgICBnZXRUb3RhbEFjdGlvbkl0ZW1zOiAoKSA9PlxuICAgICAgICB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyaW5ncy5BQ1RJT05fSVRFTV9TRUxFQ1RPUikubGVuZ3RoLFxuICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc2Nyb2xsVGFyZ2V0XyA9IHdpbmRvdztcblxuICAgIC8qKiBAdHlwZSB7IU1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9ufSAqL1xuICAgIGxldCBmb3VuZGF0aW9uO1xuICAgIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLlNIT1JUX0NMQVNTKSkge1xuICAgICAgZm91bmRhdGlvbiA9IG5ldyBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkZJWEVEX0NMQVNTKSkge1xuICAgICAgZm91bmRhdGlvbiA9IG5ldyBNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvdW5kYXRpb24gPSBuZXcgTURDVG9wQXBwQmFyRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmRhdGlvbjtcbiAgfVxufVxuXG5leHBvcnQge01EQ1RvcEFwcEJhciwgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24sXG4gIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24sIE1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbixcbiAgTURDU2hvcnRUb3BBcHBCYXJGb3VuZGF0aW9ufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuVG9wQXBwQmFyID0gZXhwb3J0cy5Ub3BBcHBCYXJUaXRsZSA9IGV4cG9ydHMuVG9wQXBwQmFySWNvbiA9IGV4cG9ydHMuVG9wQXBwQmFyU2VjdGlvbiA9IGV4cG9ydHMuVG9wQXBwQmFyUm93ID0gdm9pZCAwO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFwiKSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3R5cGVvZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKSk7XG5cbnZhciBfdG9wQXBwQmFyID0gcmVxdWlyZShcIkBtYXRlcmlhbC90b3AtYXBwLWJhclwiKTtcblxudmFyIF9iaW5kRGVjb3JhdG9yID0gcmVxdWlyZShcImJpbmQtZGVjb3JhdG9yXCIpO1xuXG52YXIgX3ByZWFjdCA9IHJlcXVpcmUoXCJwcmVhY3RcIik7XG5cbnZhciBfTWF0ZXJpYWxDb21wb25lbnQ2ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vQmFzZS9NYXRlcmlhbENvbXBvbmVudFwiKSk7XG5cbnZhciBfX2RlY29yYXRlID0gdm9pZCAwICYmICh2b2lkIDApLl9fZGVjb3JhdGUgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLFxuICAgICAgZDtcbiAgaWYgKCh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjIuZGVmYXVsdCkoUmVmbGVjdCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgfVxuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcblxudmFyIFRvcEFwcEJhclJvdyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50KSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRvcEFwcEJhclJvdywgX01hdGVyaWFsQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUb3BBcHBCYXJSb3coKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgVG9wQXBwQmFyUm93KTtcbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyUm93KS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpcy5jb21wb25lbnROYW1lID0gJ3RvcC1hcHAtYmFyX19yb3cnO1xuICAgIF90aGlzLm1kY1Byb3BzID0gW107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoVG9wQXBwQmFyUm93LCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb3BBcHBCYXJSb3c7XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuVG9wQXBwQmFyUm93ID0gVG9wQXBwQmFyUm93O1xuXG52YXIgVG9wQXBwQmFyU2VjdGlvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50Mikge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShUb3BBcHBCYXJTZWN0aW9uLCBfTWF0ZXJpYWxDb21wb25lbnQyKTtcblxuICBmdW5jdGlvbiBUb3BBcHBCYXJTZWN0aW9uKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBUb3BBcHBCYXJTZWN0aW9uKTtcbiAgICBfdGhpczIgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKFRvcEFwcEJhclNlY3Rpb24pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzMi5jb21wb25lbnROYW1lID0gJ3RvcC1hcHAtYmFyX19zZWN0aW9uJztcbiAgICBfdGhpczIubWRjUHJvcHMgPSBbJ2FsaWduLXN0YXJ0JywgJ2FsaWduLWVuZCddO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShUb3BBcHBCYXJTZWN0aW9uLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgcmV0dXJuICgwLCBfcHJlYWN0LmgpKFwic2VjdGlvblwiLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRvcEFwcEJhclNlY3Rpb247XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuVG9wQXBwQmFyU2VjdGlvbiA9IFRvcEFwcEJhclNlY3Rpb247XG5cbnZhciBUb3BBcHBCYXJJY29uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRvcEFwcEJhckljb24sIF9NYXRlcmlhbENvbXBvbmVudDMpO1xuXG4gIGZ1bmN0aW9uIFRvcEFwcEJhckljb24oKSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFRvcEFwcEJhckljb24pO1xuICAgIF90aGlzMyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFySWNvbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgX3RoaXMzLmNvbXBvbmVudE5hbWUgPSAndG9wLWFwcC1iYXJfX2ljb24nO1xuICAgIF90aGlzMy5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShUb3BBcHBCYXJJY29uLCBbe1xuICAgIGtleTogXCJtYXRlcmlhbERvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRlcmlhbERvbShwcm9wcykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHByb3BzLm5hdmlnYXRpb24gPyAnbWF0ZXJpYWwtaWNvbnMgbWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb24nIDogJ21hdGVyaWFsLWljb25zJztcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImFcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICB9LCBwcm9wcyksIHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRvcEFwcEJhckljb247XG59KF9NYXRlcmlhbENvbXBvbmVudDYuZGVmYXVsdCk7XG5cbmV4cG9ydHMuVG9wQXBwQmFySWNvbiA9IFRvcEFwcEJhckljb247XG5cbnZhciBUb3BBcHBCYXJUaXRsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX01hdGVyaWFsQ29tcG9uZW50NCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShUb3BBcHBCYXJUaXRsZSwgX01hdGVyaWFsQ29tcG9uZW50NCk7XG5cbiAgZnVuY3Rpb24gVG9wQXBwQmFyVGl0bGUoKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFRvcEFwcEJhclRpdGxlKTtcbiAgICBfdGhpczQgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKFRvcEFwcEJhclRpdGxlKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczQuY29tcG9uZW50TmFtZSA9ICd0b3AtYXBwLWJhcl9fdGl0bGUnO1xuICAgIF90aGlzNC5tZGNQcm9wcyA9IFtdO1xuICAgIHJldHVybiBfdGhpczQ7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShUb3BBcHBCYXJUaXRsZSwgW3tcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcInNwYW5cIiwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMpLCBwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb3BBcHBCYXJUaXRsZTtcbn0oX01hdGVyaWFsQ29tcG9uZW50Ni5kZWZhdWx0KTtcblxuZXhwb3J0cy5Ub3BBcHBCYXJUaXRsZSA9IFRvcEFwcEJhclRpdGxlO1xuXG52YXIgVG9wQXBwQmFyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTWF0ZXJpYWxDb21wb25lbnQ1KSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRvcEFwcEJhciwgX01hdGVyaWFsQ29tcG9uZW50NSk7XG5cbiAgZnVuY3Rpb24gVG9wQXBwQmFyKCkge1xuICAgIHZhciBfdGhpczU7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBUb3BBcHBCYXIpO1xuICAgIF90aGlzNSA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICBfdGhpczUuY29tcG9uZW50TmFtZSA9ICd0b3AtYXBwLWJhcic7XG4gICAgX3RoaXM1Lm1kY1Byb3BzID0gWydzaG9ydCcsICdzaG9ydC1jb2xsYXBzZWQnLCAnZml4ZWQnLCAncHJvbWluZW50J107XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFRvcEFwcEJhciwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyLnByb3RvdHlwZSksIFwiY29tcG9uZW50RGlkTW91bnRcIiwgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICB2YXIgY29tcCA9IG5ldyBfdG9wQXBwQmFyLk1EQ1RvcEFwcEJhcih0aGlzLmNvbnRyb2wpO1xuICAgICAgICBjb21wLmxpc3RlbignTURDVG9wQXBwQmFyOm5hdicsIHRoaXMub25OYXYpO1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50ID0gY29tcDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAoMCwgX2dldDIuZGVmYXVsdCkoKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVG9wQXBwQmFyLnByb3RvdHlwZSksIFwiY29tcG9uZW50V2lsbFVubW91bnRcIiwgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuTURDb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5NRENvbXBvbmVudC51bmxpc3RlbignTURDVG9wQXBwQmFyOm5hdicsIHRoaXMub25OYXYpO1xuICAgICAgICB0aGlzLk1EQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25OYXZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25OYXYoZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25OYXYpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk5hdihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibWF0ZXJpYWxEb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF0ZXJpYWxEb20ocHJvcHMpIHtcbiAgICAgIHJldHVybiAoMCwgX3ByZWFjdC5oKShcImhlYWRlclwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcmVmOiB0aGlzLnNldENvbnRyb2xSZWZcbiAgICAgIH0sIHByb3BzKSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9wQXBwQmFyO1xufShfTWF0ZXJpYWxDb21wb25lbnQ2LmRlZmF1bHQpO1xuXG5leHBvcnRzLlRvcEFwcEJhciA9IFRvcEFwcEJhcjtcblxuX19kZWNvcmF0ZShbX2JpbmREZWNvcmF0b3IuYmluZF0sIFRvcEFwcEJhci5wcm90b3R5cGUsIFwib25OYXZcIiwgbnVsbCk7XG5cbnZhciBkZWZhdWx0XzEgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Ub3BBcHBCYXIpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoZGVmYXVsdF8xLCBfVG9wQXBwQmFyKTtcblxuICBmdW5jdGlvbiBkZWZhdWx0XzEoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgZGVmYXVsdF8xKTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShkZWZhdWx0XzEpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIGRlZmF1bHRfMTtcbn0oVG9wQXBwQmFyKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuZGVmYXVsdF8xLlNlY3Rpb24gPSBUb3BBcHBCYXJTZWN0aW9uO1xuZGVmYXVsdF8xLkljb24gPSBUb3BBcHBCYXJJY29uO1xuZGVmYXVsdF8xLlRpdGxlID0gVG9wQXBwQmFyVGl0bGU7XG5kZWZhdWx0XzEuUm93ID0gVG9wQXBwQmFyUm93O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHtofSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFRvcEFwcEJhciBmcm9tICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9Ub3BBcHBCYXInO1xuaW1wb3J0ICdwcmVhY3QtbWF0ZXJpYWwtY29tcG9uZW50cy9Ub3BBcHBCYXIvc3R5bGUuY3NzJztcbmltcG9ydCAnLi9hcHAtc2hlbGwuY3NzJ1xuXG5jb25zdCBUb3BBcHBCYXJOYXYgPSAoe3RvZ2dsZSxzZXRUb2dnbGUsdGl0bGV9KT0+IHtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgXG4gICAgICAgIDxUb3BBcHBCYXIgY2xhc3NOYW1lPVwidG9wYXBwYmFyIGZpeGVkIHRvcC1iYXJcIiBvbk5hdj17KCk9PntzZXRUb2dnbGUoIXRvZ2dsZSl9fT5cbiAgICAgICAgICAgIDxUb3BBcHBCYXIuUm93PlxuICAgICAgICAgICAgICA8VG9wQXBwQmFyLlNlY3Rpb24gYWxpZ24tc3RhcnQ+XG4gICAgICAgICAgICAgICAgPFRvcEFwcEJhci5JY29uIG5hdmlnYXRpb24+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPjxwYXRoIGQ9XCJNMyAxOGgxOHYtMkgzdjJ6bTAtNWgxOHYtMkgzdjJ6bTAtN3YyaDE4VjZIM3pcIiAvPjwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvVG9wQXBwQmFyLkljb24+XG4gICAgICAgICAgICAgICAgPFRvcEFwcEJhci5UaXRsZT5cbiAgICAgICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgICAgICA8L1RvcEFwcEJhci5UaXRsZT5cbiAgICAgICAgICAgICAgPC9Ub3BBcHBCYXIuU2VjdGlvbj5cbiAgICAgICAgICAgICAgPFRvcEFwcEJhci5TZWN0aW9uIGFsaWduLWVuZD5cbiAgICAgICAgICAgICAgICA8VG9wQXBwQmFyLkljb24+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPjxwYXRoIGQ9XCJNMTIgOGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6bTAgMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTAgNmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6XCIgLz48L3N2Zz5cbiAgICAgICAgICAgICAgICA8L1RvcEFwcEJhci5JY29uPlxuICAgICAgICAgICAgICA8L1RvcEFwcEJhci5TZWN0aW9uPlxuICAgICAgICAgICAgPC9Ub3BBcHBCYXIuUm93PlxuICAgICAgICA8L1RvcEFwcEJhcj5cbiAgXG4gICAgKTtcbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvcEFwcEJhck5hdiIsImltcG9ydCB7IENvbXBvbmVudCwgY2xvbmVFbGVtZW50LCBjcmVhdGVFbGVtZW50LCB0b0NoaWxkQXJyYXkgfSBmcm9tICdwcmVhY3QnO1xuXG52YXIgRU1QVFkkMSA9IHt9O1xuXG5mdW5jdGlvbiBhc3NpZ24ob2JqLCBwcm9wcykge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluXG5cdGZvciAodmFyIGkgaW4gcHJvcHMpIHtcblx0XHRvYmpbaV0gPSBwcm9wc1tpXTtcblx0fVxuXHRyZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBleGVjKHVybCwgcm91dGUsIG9wdHMpIHtcblx0dmFyIHJlZyA9IC8oPzpcXD8oW14jXSopKT8oIy4qKT8kLyxcblx0XHRjID0gdXJsLm1hdGNoKHJlZyksXG5cdFx0bWF0Y2hlcyA9IHt9LFxuXHRcdHJldDtcblx0aWYgKGMgJiYgY1sxXSkge1xuXHRcdHZhciBwID0gY1sxXS5zcGxpdCgnJicpO1xuXHRcdGZvciAodmFyIGk9MDsgaTxwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgciA9IHBbaV0uc3BsaXQoJz0nKTtcblx0XHRcdG1hdGNoZXNbZGVjb2RlVVJJQ29tcG9uZW50KHJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChyLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG5cdFx0fVxuXHR9XG5cdHVybCA9IHNlZ21lbnRpemUodXJsLnJlcGxhY2UocmVnLCAnJykpO1xuXHRyb3V0ZSA9IHNlZ21lbnRpemUocm91dGUgfHwgJycpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgodXJsLmxlbmd0aCwgcm91dGUubGVuZ3RoKTtcblx0Zm9yICh2YXIgaSQxPTA7IGkkMTxtYXg7IGkkMSsrKSB7XG5cdFx0aWYgKHJvdXRlW2kkMV0gJiYgcm91dGVbaSQxXS5jaGFyQXQoMCk9PT0nOicpIHtcblx0XHRcdHZhciBwYXJhbSA9IHJvdXRlW2kkMV0ucmVwbGFjZSgvKF46fFsrKj9dKyQpL2csICcnKSxcblx0XHRcdFx0ZmxhZ3MgPSAocm91dGVbaSQxXS5tYXRjaCgvWysqP10rJC8pIHx8IEVNUFRZJDEpWzBdIHx8ICcnLFxuXHRcdFx0XHRwbHVzID0gfmZsYWdzLmluZGV4T2YoJysnKSxcblx0XHRcdFx0c3RhciA9IH5mbGFncy5pbmRleE9mKCcqJyksXG5cdFx0XHRcdHZhbCA9IHVybFtpJDFdIHx8ICcnO1xuXHRcdFx0aWYgKCF2YWwgJiYgIXN0YXIgJiYgKGZsYWdzLmluZGV4T2YoJz8nKTwwIHx8IHBsdXMpKSB7XG5cdFx0XHRcdHJldCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZXNbcGFyYW1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cdFx0XHRpZiAocGx1cyB8fCBzdGFyKSB7XG5cdFx0XHRcdG1hdGNoZXNbcGFyYW1dID0gdXJsLnNsaWNlKGkkMSkubWFwKGRlY29kZVVSSUNvbXBvbmVudCkuam9pbignLycpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAocm91dGVbaSQxXSE9PXVybFtpJDFdKSB7XG5cdFx0XHRyZXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRpZiAob3B0cy5kZWZhdWx0IT09dHJ1ZSAmJiByZXQ9PT1mYWxzZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0cmV0dXJuIG1hdGNoZXM7XG59XG5cbmZ1bmN0aW9uIHBhdGhSYW5rU29ydChhLCBiKSB7XG5cdHJldHVybiAoXG5cdFx0KGEucmFuayA8IGIucmFuaykgPyAxIDpcblx0XHRcdChhLnJhbmsgPiBiLnJhbmspID8gLTEgOlxuXHRcdFx0XHQoYS5pbmRleCAtIGIuaW5kZXgpXG5cdCk7XG59XG5cbi8vIGZpbHRlciBvdXQgVk5vZGVzIHdpdGhvdXQgYXR0cmlidXRlcyAod2hpY2ggYXJlIHVucmFua2VhYmxlKSwgYW5kIGFkZCBgaW5kZXhgL2ByYW5rYCBwcm9wZXJ0aWVzIHRvIGJlIHVzZWQgaW4gc29ydGluZy5cbmZ1bmN0aW9uIHByZXBhcmVWTm9kZUZvclJhbmtpbmcodm5vZGUsIGluZGV4KSB7XG5cdHZub2RlLmluZGV4ID0gaW5kZXg7XG5cdHZub2RlLnJhbmsgPSByYW5rQ2hpbGQodm5vZGUpO1xuXHRyZXR1cm4gdm5vZGUucHJvcHM7XG59XG5cbmZ1bmN0aW9uIHNlZ21lbnRpemUodXJsKSB7XG5cdHJldHVybiB1cmwucmVwbGFjZSgvKF5cXC8rfFxcLyskKS9nLCAnJykuc3BsaXQoJy8nKTtcbn1cblxuZnVuY3Rpb24gcmFua1NlZ21lbnQoc2VnbWVudCkge1xuXHRyZXR1cm4gc2VnbWVudC5jaGFyQXQoMCk9PSc6JyA/ICgxICsgJyorPycuaW5kZXhPZihzZWdtZW50LmNoYXJBdChzZWdtZW50Lmxlbmd0aC0xKSkpIHx8IDQgOiA1O1xufVxuXG5mdW5jdGlvbiByYW5rKHBhdGgpIHtcblx0cmV0dXJuIHNlZ21lbnRpemUocGF0aCkubWFwKHJhbmtTZWdtZW50KS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gcmFua0NoaWxkKHZub2RlKSB7XG5cdHJldHVybiB2bm9kZS5wcm9wcy5kZWZhdWx0ID8gMCA6IHJhbmsodm5vZGUucHJvcHMucGF0aCk7XG59XG5cbnZhciBjdXN0b21IaXN0b3J5ID0gbnVsbDtcblxudmFyIFJPVVRFUlMgPSBbXTtcblxudmFyIHN1YnNjcmliZXJzID0gW107XG5cbnZhciBFTVBUWSA9IHt9O1xuXG5mdW5jdGlvbiBzZXRVcmwodXJsLCB0eXBlKSB7XG5cdGlmICggdHlwZSA9PT0gdm9pZCAwICkgdHlwZT0ncHVzaCc7XG5cblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeVt0eXBlXSkge1xuXHRcdGN1c3RvbUhpc3RvcnlbdHlwZV0odXJsKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgaGlzdG9yeSE9PSd1bmRlZmluZWQnICYmIGhpc3RvcnlbdHlwZSsnU3RhdGUnXSkge1xuXHRcdGhpc3RvcnlbdHlwZSsnU3RhdGUnXShudWxsLCBudWxsLCB1cmwpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFVybCgpIHtcblx0dmFyIHVybDtcblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeS5sb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkubG9jYXRpb247XG5cdH1cblx0ZWxzZSBpZiAoY3VzdG9tSGlzdG9yeSAmJiBjdXN0b21IaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dXJsID0gdHlwZW9mIGxvY2F0aW9uIT09J3VuZGVmaW5lZCcgPyBsb2NhdGlvbiA6IEVNUFRZO1xuXHR9XG5cdHJldHVybiAoXCJcIiArICh1cmwucGF0aG5hbWUgfHwgJycpICsgKHVybC5zZWFyY2ggfHwgJycpKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJvdXRlKHVybCwgcmVwbGFjZSkge1xuXHRpZiAoIHJlcGxhY2UgPT09IHZvaWQgMCApIHJlcGxhY2U9ZmFsc2U7XG5cblx0aWYgKHR5cGVvZiB1cmwhPT0nc3RyaW5nJyAmJiB1cmwudXJsKSB7XG5cdFx0cmVwbGFjZSA9IHVybC5yZXBsYWNlO1xuXHRcdHVybCA9IHVybC51cmw7XG5cdH1cblxuXHQvLyBvbmx5IHB1c2ggVVJMIGludG8gaGlzdG9yeSBpZiB3ZSBjYW4gaGFuZGxlIGl0XG5cdGlmIChjYW5Sb3V0ZSh1cmwpKSB7XG5cdFx0c2V0VXJsKHVybCwgcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyk7XG5cdH1cblxuXHRyZXR1cm4gcm91dGVUbyh1cmwpO1xufVxuXG5cbi8qKiBDaGVjayBpZiB0aGUgZ2l2ZW4gVVJMIGNhbiBiZSBoYW5kbGVkIGJ5IGFueSByb3V0ZXIgaW5zdGFuY2VzLiAqL1xuZnVuY3Rpb24gY2FuUm91dGUodXJsKSB7XG5cdGZvciAodmFyIGk9Uk9VVEVSUy5sZW5ndGg7IGktLTsgKSB7XG5cdFx0aWYgKFJPVVRFUlNbaV0uY2FuUm91dGUodXJsKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuXG4vKiogVGVsbCBhbGwgcm91dGVyIGluc3RhbmNlcyB0byBoYW5kbGUgdGhlIGdpdmVuIFVSTC4gICovXG5mdW5jdGlvbiByb3V0ZVRvKHVybCkge1xuXHR2YXIgZGlkUm91dGUgPSBmYWxzZTtcblx0Zm9yICh2YXIgaT0wOyBpPFJPVVRFUlMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoUk9VVEVSU1tpXS5yb3V0ZVRvKHVybCk9PT10cnVlKSB7XG5cdFx0XHRkaWRSb3V0ZSA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdGZvciAodmFyIGkkMT1zdWJzY3JpYmVycy5sZW5ndGg7IGkkMS0tOyApIHtcblx0XHRzdWJzY3JpYmVyc1tpJDFdKHVybCk7XG5cdH1cblx0cmV0dXJuIGRpZFJvdXRlO1xufVxuXG5cbmZ1bmN0aW9uIHJvdXRlRnJvbUxpbmsobm9kZSkge1xuXHQvLyBvbmx5IHZhbGlkIGVsZW1lbnRzXG5cdGlmICghbm9kZSB8fCAhbm9kZS5nZXRBdHRyaWJ1dGUpIHsgcmV0dXJuOyB9XG5cblx0dmFyIGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuXHRcdHRhcmdldCA9IG5vZGUuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcblxuXHQvLyBpZ25vcmUgbGlua3Mgd2l0aCB0YXJnZXRzIGFuZCBub24tcGF0aCBVUkxzXG5cdGlmICghaHJlZiB8fCAhaHJlZi5tYXRjaCgvXlxcLy9nKSB8fCAodGFyZ2V0ICYmICF0YXJnZXQubWF0Y2goL15fP3NlbGYkL2kpKSkgeyByZXR1cm47IH1cblxuXHQvLyBhdHRlbXB0IHRvIHJvdXRlLCBpZiBubyBtYXRjaCBzaW1wbHkgY2VkZSBjb250cm9sIHRvIGJyb3dzZXJcblx0cmV0dXJuIHJvdXRlKGhyZWYpO1xufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpbmtDbGljayhlKSB7XG5cdGlmIChlLmJ1dHRvbj09MCkge1xuXHRcdHJvdXRlRnJvbUxpbmsoZS5jdXJyZW50VGFyZ2V0IHx8IGUudGFyZ2V0IHx8IHRoaXMpO1xuXHRcdHJldHVybiBwcmV2ZW50KGUpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gcHJldmVudChlKSB7XG5cdGlmIChlKSB7XG5cdFx0aWYgKGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7IGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7IH1cblx0XHRpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblxuZnVuY3Rpb24gZGVsZWdhdGVMaW5rSGFuZGxlcihlKSB7XG5cdC8vIGlnbm9yZSBldmVudHMgdGhlIGJyb3dzZXIgdGFrZXMgY2FyZSBvZiBhbHJlYWR5OlxuXHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYnV0dG9uIT09MCkgeyByZXR1cm47IH1cblxuXHR2YXIgdCA9IGUudGFyZ2V0O1xuXHRkbyB7XG5cdFx0aWYgKFN0cmluZyh0Lm5vZGVOYW1lKS50b1VwcGVyQ2FzZSgpPT09J0EnICYmIHQuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcblx0XHRcdGlmICh0Lmhhc0F0dHJpYnV0ZSgnbmF0aXZlJykpIHsgcmV0dXJuOyB9XG5cdFx0XHQvLyBpZiBsaW5rIGlzIGhhbmRsZWQgYnkgdGhlIHJvdXRlciwgcHJldmVudCBicm93c2VyIGRlZmF1bHRzXG5cdFx0XHRpZiAocm91dGVGcm9tTGluayh0KSkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmVudChlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gd2hpbGUgKCh0PXQucGFyZW50Tm9kZSkpO1xufVxuXG5cbnZhciBldmVudExpc3RlbmVyc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcblx0aWYgKGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG5cblx0aWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyPT09J2Z1bmN0aW9uJykge1xuXHRcdGlmICghY3VzdG9tSGlzdG9yeSkge1xuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJvdXRlVG8oZ2V0Q3VycmVudFVybCgpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGVnYXRlTGlua0hhbmRsZXIpO1xuXHR9XG5cdGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xufVxuXG5cbnZhciBSb3V0ZXIgPSAoZnVuY3Rpb24gKENvbXBvbmVudCQkMSkge1xuXHRmdW5jdGlvbiBSb3V0ZXIocHJvcHMpIHtcblx0XHRDb21wb25lbnQkJDEuY2FsbCh0aGlzLCBwcm9wcyk7XG5cdFx0aWYgKHByb3BzLmhpc3RvcnkpIHtcblx0XHRcdGN1c3RvbUhpc3RvcnkgPSBwcm9wcy5oaXN0b3J5O1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR1cmw6IHByb3BzLnVybCB8fCBnZXRDdXJyZW50VXJsKClcblx0XHR9O1xuXG5cdFx0aW5pdEV2ZW50TGlzdGVuZXJzKCk7XG5cdH1cblxuXHRpZiAoIENvbXBvbmVudCQkMSApIFJvdXRlci5fX3Byb3RvX18gPSBDb21wb25lbnQkJDE7XG5cdFJvdXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb21wb25lbnQkJDEgJiYgQ29tcG9uZW50JCQxLnByb3RvdHlwZSApO1xuXHRSb3V0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUm91dGVyO1xuXG5cdFJvdXRlci5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlIChwcm9wcykge1xuXHRcdGlmIChwcm9wcy5zdGF0aWMhPT10cnVlKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0cmV0dXJuIHByb3BzLnVybCE9PXRoaXMucHJvcHMudXJsIHx8IHByb3BzLm9uQ2hhbmdlIT09dGhpcy5wcm9wcy5vbkNoYW5nZTtcblx0fTtcblxuXHQvKiogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBjYW4gYmUgbWF0Y2hlZCBhZ2FpbnN0IGFueSBjaGlsZHJlbiAqL1xuXHRSb3V0ZXIucHJvdG90eXBlLmNhblJvdXRlID0gZnVuY3Rpb24gY2FuUm91dGUgKHVybCkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHRvQ2hpbGRBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRNYXRjaGluZ0NoaWxkcmVuKGNoaWxkcmVuLCB1cmwsIGZhbHNlKS5sZW5ndGggPiAwO1xuXHR9O1xuXG5cdC8qKiBSZS1yZW5kZXIgY2hpbGRyZW4gd2l0aCBhIG5ldyBVUkwgdG8gbWF0Y2ggYWdhaW5zdC4gKi9cblx0Um91dGVyLnByb3RvdHlwZS5yb3V0ZVRvID0gZnVuY3Rpb24gcm91dGVUbyAodXJsKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHVybDogdXJsIH0pO1xuXG5cdFx0dmFyIGRpZFJvdXRlID0gdGhpcy5jYW5Sb3V0ZSh1cmwpO1xuXG5cdFx0Ly8gdHJpZ2dlciBhIG1hbnVhbCByZS1yb3V0ZSBpZiB3ZSdyZSBub3QgaW4gdGhlIG1pZGRsZSBvZiBhbiB1cGRhdGU6XG5cdFx0aWYgKCF0aGlzLnVwZGF0aW5nKSB7IHRoaXMuZm9yY2VVcGRhdGUoKTsgfVxuXG5cdFx0cmV0dXJuIGRpZFJvdXRlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50ICgpIHtcblx0XHRST1VURVJTLnB1c2godGhpcyk7XG5cdFx0dGhpcy51cGRhdGluZyA9IHRydWU7XG5cdH07XG5cblx0Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHRcdGlmIChjdXN0b21IaXN0b3J5KSB7XG5cdFx0XHR0aGlzLnVubGlzdGVuID0gY3VzdG9tSGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG5cdFx0XHRcdHRoaXMkMS5yb3V0ZVRvKChcIlwiICsgKGxvY2F0aW9uLnBhdGhuYW1lIHx8ICcnKSArIChsb2NhdGlvbi5zZWFyY2ggfHwgJycpKSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy51cGRhdGluZyA9IGZhbHNlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnVubGlzdGVuPT09J2Z1bmN0aW9uJykgeyB0aGlzLnVubGlzdGVuKCk7IH1cblx0XHRST1VURVJTLnNwbGljZShST1VURVJTLmluZGV4T2YodGhpcyksIDEpO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUgKCkge1xuXHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlICgpIHtcblx0XHR0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG5cdH07XG5cblx0Um91dGVyLnByb3RvdHlwZS5nZXRNYXRjaGluZ0NoaWxkcmVuID0gZnVuY3Rpb24gZ2V0TWF0Y2hpbmdDaGlsZHJlbiAoY2hpbGRyZW4sIHVybCwgaW52b2tlKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuXG5cdFx0XHQuZmlsdGVyKHByZXBhcmVWTm9kZUZvclJhbmtpbmcpXG5cdFx0XHQuc29ydChwYXRoUmFua1NvcnQpXG5cdFx0XHQubWFwKCBmdW5jdGlvbiAodm5vZGUpIHtcblx0XHRcdFx0dmFyIG1hdGNoZXMgPSBleGVjKHVybCwgdm5vZGUucHJvcHMucGF0aCwgdm5vZGUucHJvcHMpO1xuXHRcdFx0XHRpZiAobWF0Y2hlcykge1xuXHRcdFx0XHRcdGlmIChpbnZva2UgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3UHJvcHMgPSB7IHVybDogdXJsLCBtYXRjaGVzOiBtYXRjaGVzIH07XG5cdFx0XHRcdFx0XHRhc3NpZ24obmV3UHJvcHMsIG1hdGNoZXMpO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIG5ld1Byb3BzLnJlZjtcblx0XHRcdFx0XHRcdGRlbGV0ZSBuZXdQcm9wcy5rZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KHZub2RlLCBuZXdQcm9wcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2bm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmlsdGVyKEJvb2xlYW4pO1xuXHR9O1xuXG5cdFJvdXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyIChyZWYsIHJlZiQxKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gcmVmLmNoaWxkcmVuO1xuXHRcdHZhciBvbkNoYW5nZSA9IHJlZi5vbkNoYW5nZTtcblx0XHR2YXIgdXJsID0gcmVmJDEudXJsO1xuXG5cdFx0dmFyIGFjdGl2ZSA9IHRoaXMuZ2V0TWF0Y2hpbmdDaGlsZHJlbih0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLCB1cmwsIHRydWUpO1xuXG5cdFx0dmFyIGN1cnJlbnQgPSBhY3RpdmVbMF0gfHwgbnVsbDtcblxuXHRcdHZhciBwcmV2aW91cyA9IHRoaXMucHJldmlvdXNVcmw7XG5cdFx0aWYgKHVybCE9PXByZXZpb3VzKSB7XG5cdFx0XHR0aGlzLnByZXZpb3VzVXJsID0gdXJsO1xuXHRcdFx0aWYgKHR5cGVvZiBvbkNoYW5nZT09PSdmdW5jdGlvbicpIHtcblx0XHRcdFx0b25DaGFuZ2Uoe1xuXHRcdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRwcmV2aW91czogcHJldmlvdXMsXG5cdFx0XHRcdFx0YWN0aXZlOiBhY3RpdmUsXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3VycmVudDtcblx0fTtcblxuXHRyZXR1cm4gUm91dGVyO1xufShDb21wb25lbnQpKTtcblxudmFyIExpbmsgPSBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIChcblx0Y3JlYXRlRWxlbWVudCgnYScsIGFzc2lnbih7IG9uQ2xpY2s6IGhhbmRsZUxpbmtDbGljayB9LCBwcm9wcykpXG4pOyB9O1xuXG52YXIgUm91dGUgPSBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQocHJvcHMuY29tcG9uZW50LCBwcm9wcyk7IH07XG5cblJvdXRlci5zdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzO1xuUm91dGVyLmdldEN1cnJlbnRVcmwgPSBnZXRDdXJyZW50VXJsO1xuUm91dGVyLnJvdXRlID0gcm91dGU7XG5Sb3V0ZXIuUm91dGVyID0gUm91dGVyO1xuUm91dGVyLlJvdXRlID0gUm91dGU7XG5Sb3V0ZXIuTGluayA9IExpbms7XG5cbmV4cG9ydCB7IHN1YnNjcmliZXJzLCBnZXRDdXJyZW50VXJsLCByb3V0ZSwgUm91dGVyLCBSb3V0ZSwgTGluaywgZXhlYyB9O2V4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC1yb3V0ZXIuZXMuanMubWFwXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgncHJlYWN0JykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsncHJlYWN0J10sIGZhY3RvcnkpIDpcblx0KGdsb2JhbFsncHJlYWN0LWFzeW5jLXJvdXRlJ10gPSBmYWN0b3J5KGdsb2JhbC5wcmVhY3QpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChwcmVhY3QpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBBc3luY1JvdXRlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0X2luaGVyaXRzKEFzeW5jUm91dGUsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEFzeW5jUm91dGUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFzeW5jUm91dGUpO1xuXG5cdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMpKTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29tcG9uZW50RGF0YTogbnVsbFxuXHRcdH07XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUubG9hZENvbXBvbmVudCA9IGZ1bmN0aW9uIGxvYWRDb21wb25lbnQoKSB7XG5cdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y29tcG9uZW50RGF0YTogdGhpcy5wcm9wcy5jb21wb25lbnRcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR2YXIgY29tcG9uZW50RGF0YSA9IHRoaXMucHJvcHMuZ2V0Q29tcG9uZW50KHRoaXMucHJvcHMudXJsLCBmdW5jdGlvbiAoX3JlZikge1xuXHRcdFx0dmFyIGNvbXBvbmVudCA9IF9yZWYuY29tcG9uZW50O1xuXG5cdFx0XHQvLyBOYW1lZCBwYXJhbSBmb3IgbWFraW5nIGNhbGxiYWNrIGZ1dHVyZSBwcm9vZlxuXHRcdFx0aWYgKGNvbXBvbmVudCkge1xuXHRcdFx0XHRfdGhpczIuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGNvbXBvbmVudERhdGE6IGNvbXBvbmVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgdGhpcy5wcm9wcy5tYXRjaGVzKSk7XG5cblx0XHQvLyBJbiBjYXNlIHJldHVybmVkIHZhbHVlIHdhcyBhIHByb21pc2Vcblx0XHRpZiAoY29tcG9uZW50RGF0YSAmJiBjb21wb25lbnREYXRhLnRoZW4pIHtcblx0XHRcdC8vIElJRkUgdG8gY2hlY2sgaWYgYSBsYXRlciBlbmRpbmcgcHJvbWlzZSB3YXMgY3JlYXRpbmcgYSByYWNlIGNvbmRpdGlvblxuXHRcdFx0Ly8gQ2hlY2sgdGVzdCBjYXNlIGZvciBtb3JlIGluZm9cblx0XHRcdChmdW5jdGlvbiAodXJsKSB7XG5cdFx0XHRcdGNvbXBvbmVudERhdGEudGhlbihmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdFx0aWYgKHVybCAhPT0gX3RoaXMyLnByb3BzLnVybCkge1xuXHRcdFx0XHRcdFx0X3RoaXMyLnNldFN0YXRlKHsgY29tcG9uZW50RGF0YTogbnVsbCB9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzMi5sb2FkQ29tcG9uZW50KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3RoaXMyLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudERhdGE6IGNvbXBvbmVudFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKHRoaXMucHJvcHMudXJsKTtcblx0XHR9XG5cdH07XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5wYXRoICYmIHRoaXMucHJvcHMucGF0aCAhPT0gbmV4dFByb3BzLnBhdGgpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wb25lbnREYXRhOiBudWxsXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdF90aGlzMy5sb2FkQ29tcG9uZW50KCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0QXN5bmNSb3V0ZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdHRoaXMubG9hZENvbXBvbmVudCgpO1xuXHR9O1xuXG5cdEFzeW5jUm91dGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5jb21wb25lbnREYXRhKSB7XG5cdFx0XHRyZXR1cm4gcHJlYWN0LmgodGhpcy5zdGF0ZS5jb21wb25lbnREYXRhLCB0aGlzLnByb3BzKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubG9hZGluZykge1xuXHRcdFx0dmFyIGxvYWRpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxvYWRpbmcoKTtcblx0XHRcdHJldHVybiBsb2FkaW5nQ29tcG9uZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcblxuXHRyZXR1cm4gQXN5bmNSb3V0ZTtcbn0ocHJlYWN0LkNvbXBvbmVudCk7XG5cbnJldHVybiBBc3luY1JvdXRlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJleHBvcnQgZGVmYXVsdCAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuLy8gYmFzZWQgb2ZmIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzXG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxudmFyIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5pZiAodHlwZW9mIGdsb2JhbC5zZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG59XG5pZiAodHlwZW9mIGdsb2JhbC5jbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0VGljayhmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbmV4cG9ydCB2YXIgdGl0bGUgPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIHBsYXRmb3JtID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBicm93c2VyID0gdHJ1ZTtcbmV4cG9ydCB2YXIgZW52ID0ge307XG5leHBvcnQgdmFyIGFyZ3YgPSBbXTtcbmV4cG9ydCB2YXIgdmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuZXhwb3J0IHZhciB2ZXJzaW9ucyA9IHt9O1xuZXhwb3J0IHZhciByZWxlYXNlID0ge307XG5leHBvcnQgdmFyIGNvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IHZhciBvbiA9IG5vb3A7XG5leHBvcnQgdmFyIGFkZExpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgb25jZSA9IG5vb3A7XG5leHBvcnQgdmFyIG9mZiA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbmV4cG9ydCB2YXIgZW1pdCA9IG5vb3A7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjd2QgKCkgeyByZXR1cm4gJy8nIH1cbmV4cG9ydCBmdW5jdGlvbiBjaGRpciAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdW1hc2soKSB7IHJldHVybiAwOyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2t1bWF2aXMvYnJvd3Nlci1wcm9jZXNzLWhydGltZS9ibG9iL21hc3Rlci9pbmRleC5qc1xudmFyIHBlcmZvcm1hbmNlID0gZ2xvYmFsLnBlcmZvcm1hbmNlIHx8IHt9XG52YXIgcGVyZm9ybWFuY2VOb3cgPVxuICBwZXJmb3JtYW5jZS5ub3cgICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1vek5vdyAgICAgfHxcbiAgcGVyZm9ybWFuY2UubXNOb3cgICAgICB8fFxuICBwZXJmb3JtYW5jZS5vTm93ICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLndlYmtpdE5vdyAgfHxcbiAgZnVuY3Rpb24oKXsgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfVxuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmV4cG9ydCBmdW5jdGlvbiBocnRpbWUocHJldmlvdXNUaW1lc3RhbXApe1xuICB2YXIgY2xvY2t0aW1lID0gcGVyZm9ybWFuY2VOb3cuY2FsbChwZXJmb3JtYW5jZSkqMWUtM1xuICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICB2YXIgbmFub3NlY29uZHMgPSBNYXRoLmZsb29yKChjbG9ja3RpbWUlMSkqMWU5KVxuICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgbmFub3NlY29uZHMgPSBuYW5vc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzFdXG4gICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgIHNlY29uZHMtLVxuICAgICAgbmFub3NlY29uZHMgKz0gMWU5XG4gICAgfVxuICB9XG4gIHJldHVybiBbc2Vjb25kcyxuYW5vc2Vjb25kc11cbn1cblxudmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gdXB0aW1lKCkge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICB2YXIgZGlmID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiBkaWYgLyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5leHRUaWNrOiBuZXh0VGljayxcbiAgdGl0bGU6IHRpdGxlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBlbnY6IGVudixcbiAgYXJndjogYXJndixcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICBvbjogb24sXG4gIGFkZExpc3RlbmVyOiBhZGRMaXN0ZW5lcixcbiAgb25jZTogb25jZSxcbiAgb2ZmOiBvZmYsXG4gIHJlbW92ZUxpc3RlbmVyOiByZW1vdmVMaXN0ZW5lcixcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIGVtaXQ6IGVtaXQsXG4gIGJpbmRpbmc6IGJpbmRpbmcsXG4gIGN3ZDogY3dkLFxuICBjaGRpcjogY2hkaXIsXG4gIHVtYXNrOiB1bWFzayxcbiAgaHJ0aW1lOiBocnRpbWUsXG4gIHBsYXRmb3JtOiBwbGF0Zm9ybSxcbiAgcmVsZWFzZTogcmVsZWFzZSxcbiAgY29uZmlnOiBjb25maWcsXG4gIHVwdGltZTogdXB0aW1lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn0iLCJmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGhuYW1lKSB7XG4gIHJldHVybiBwYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJztcbn1cblxuLy8gQWJvdXQgMS41eCBmYXN0ZXIgdGhhbiB0aGUgdHdvLWFyZyB2ZXJzaW9uIG9mIEFycmF5I3NwbGljZSgpXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICh2YXIgaSA9IGluZGV4LCBrID0gaSArIDEsIG4gPSBsaXN0Lmxlbmd0aDsgayA8IG47IGkgKz0gMSwgayArPSAxKSB7XG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIH1cblxuICBsaXN0LnBvcCgpO1xufVxuXG4vLyBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIGhlYXZpbHkgb24gbm9kZSdzIHVybC5wYXJzZVxuZnVuY3Rpb24gcmVzb2x2ZVBhdGhuYW1lKHRvLCBmcm9tKSB7XG4gIGlmIChmcm9tID09PSB1bmRlZmluZWQpIGZyb20gPSAnJztcblxuICB2YXIgdG9QYXJ0cyA9ICh0byAmJiB0by5zcGxpdCgnLycpKSB8fCBbXTtcbiAgdmFyIGZyb21QYXJ0cyA9IChmcm9tICYmIGZyb20uc3BsaXQoJy8nKSkgfHwgW107XG5cbiAgdmFyIGlzVG9BYnMgPSB0byAmJiBpc0Fic29sdXRlKHRvKTtcbiAgdmFyIGlzRnJvbUFicyA9IGZyb20gJiYgaXNBYnNvbHV0ZShmcm9tKTtcbiAgdmFyIG11c3RFbmRBYnMgPSBpc1RvQWJzIHx8IGlzRnJvbUFicztcblxuICBpZiAodG8gJiYgaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAvLyB0byBpcyBhYnNvbHV0ZVxuICAgIGZyb21QYXJ0cyA9IHRvUGFydHM7XG4gIH0gZWxzZSBpZiAodG9QYXJ0cy5sZW5ndGgpIHtcbiAgICAvLyB0byBpcyByZWxhdGl2ZSwgZHJvcCB0aGUgZmlsZW5hbWVcbiAgICBmcm9tUGFydHMucG9wKCk7XG4gICAgZnJvbVBhcnRzID0gZnJvbVBhcnRzLmNvbmNhdCh0b1BhcnRzKTtcbiAgfVxuXG4gIGlmICghZnJvbVBhcnRzLmxlbmd0aCkgcmV0dXJuICcvJztcblxuICB2YXIgaGFzVHJhaWxpbmdTbGFzaDtcbiAgaWYgKGZyb21QYXJ0cy5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdCA9IGZyb21QYXJ0c1tmcm9tUGFydHMubGVuZ3RoIC0gMV07XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nIHx8IGxhc3QgPT09ICcnO1xuICB9IGVsc2Uge1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBmcm9tUGFydHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIHZhciBwYXJ0ID0gZnJvbVBhcnRzW2ldO1xuXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbXVzdEVuZEFicykgZm9yICg7IHVwLS07IHVwKSBmcm9tUGFydHMudW5zaGlmdCgnLi4nKTtcblxuICBpZiAoXG4gICAgbXVzdEVuZEFicyAmJlxuICAgIGZyb21QYXJ0c1swXSAhPT0gJycgJiZcbiAgICAoIWZyb21QYXJ0c1swXSB8fCAhaXNBYnNvbHV0ZShmcm9tUGFydHNbMF0pKVxuICApXG4gICAgZnJvbVBhcnRzLnVuc2hpZnQoJycpO1xuXG4gIHZhciByZXN1bHQgPSBmcm9tUGFydHMuam9pbignLycpO1xuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIHJlc3VsdC5zdWJzdHIoLTEpICE9PSAnLycpIHJlc3VsdCArPSAnLyc7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVzb2x2ZVBhdGhuYW1lO1xuIiwidmFyIGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5mdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWlzUHJvZHVjdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGV4dCA9IFwiV2FybmluZzogXCIgKyBtZXNzYWdlO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKHRleHQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aHJvdyBFcnJvcih0ZXh0KTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdhcm5pbmc7XG4iLCJ2YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBwcmVmaXggPSAnSW52YXJpYW50IGZhaWxlZCc7XG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmIChjb25kaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCArIFwiOiBcIiArIChtZXNzYWdlIHx8ICcnKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW52YXJpYW50O1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHJlc29sdmVQYXRobmFtZSBmcm9tICdyZXNvbHZlLXBhdGhuYW1lJztcbmltcG9ydCB2YWx1ZUVxdWFsIGZyb20gJ3ZhbHVlLWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIHBhdGgudG9Mb3dlckNhc2UoKS5pbmRleE9mKHByZWZpeC50b0xvd2VyQ2FzZSgpKSA9PT0gMCAmJiAnLz8jJy5pbmRleE9mKHBhdGguY2hhckF0KHByZWZpeC5sZW5ndGgpKSAhPT0gLTE7XG59XG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSA/IHBhdGguc3Vic3RyKHByZWZpeC5sZW5ndGgpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpID09PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBwYXRoIHx8ICcvJztcbiAgdmFyIHNlYXJjaCA9ICcnO1xuICB2YXIgaGFzaCA9ICcnO1xuICB2YXIgaGFzaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignIycpO1xuXG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cihoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG5cbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cihzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2ggPT09ICc/JyA/ICcnIDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2ggPT09ICcjJyA/ICcnIDogaGFzaFxuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICB2YXIgcGF0aCA9IHBhdGhuYW1lIHx8ICcvJztcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2ggIT09ICc/JykgcGF0aCArPSBzZWFyY2guY2hhckF0KDApID09PSAnPycgPyBzZWFyY2ggOiBcIj9cIiArIHNlYXJjaDtcbiAgaWYgKGhhc2ggJiYgaGFzaCAhPT0gJyMnKSBwYXRoICs9IGhhc2guY2hhckF0KDApID09PSAnIycgPyBoYXNoIDogXCIjXCIgKyBoYXNoO1xuICByZXR1cm4gcGF0aDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSwgY3VycmVudExvY2F0aW9uKSB7XG4gIHZhciBsb2NhdGlvbjtcblxuICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVHdvLWFyZyBmb3JtOiBwdXNoKHBhdGgsIHN0YXRlKVxuICAgIGxvY2F0aW9uID0gcGFyc2VQYXRoKHBhdGgpO1xuICAgIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25lLWFyZyBmb3JtOiBwdXNoKGxvY2F0aW9uKVxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIHBhdGgpO1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5wYXRobmFtZSA9ICcnO1xuXG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5jaGFyQXQoMCkgIT09ICc/JykgbG9jYXRpb24uc2VhcmNoID0gJz8nICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5zZWFyY2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLmhhc2guY2hhckF0KDApICE9PSAnIycpIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBsb2NhdGlvbi5oYXNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQgJiYgbG9jYXRpb24uc3RhdGUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbG9jYXRpb24ucGF0aG5hbWUgPSBkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBVUklFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFVSSUVycm9yKCdQYXRobmFtZSBcIicgKyBsb2NhdGlvbi5wYXRobmFtZSArICdcIiBjb3VsZCBub3QgYmUgZGVjb2RlZC4gJyArICdUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgYW4gaW52YWxpZCBwZXJjZW50LWVuY29kaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkpIGxvY2F0aW9uLmtleSA9IGtleTtcblxuICBpZiAoY3VycmVudExvY2F0aW9uKSB7XG4gICAgLy8gUmVzb2x2ZSBpbmNvbXBsZXRlL3JlbGF0aXZlIHBhdGhuYW1lIHJlbGF0aXZlIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSByZXNvbHZlUGF0aG5hbWUobG9jYXRpb24ucGF0aG5hbWUsIGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdoZW4gdGhlcmUgaXMgbm8gcHJpb3IgbG9jYXRpb24gYW5kIHBhdGhuYW1lIGlzIGVtcHR5LCBzZXQgaXQgdG8gL1xuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsb2NhdGlvbjtcbn1cbmZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCA9PT0gYi5oYXNoICYmIGEua2V5ID09PSBiLmtleSAmJiB2YWx1ZUVxdWFsKGEuc3RhdGUsIGIuc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpIHtcbiAgdmFyIHByb21wdCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0UHJvbXB0KG5leHRQcm9tcHQpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByb21wdCA9PSBudWxsLCAnQSBoaXN0b3J5IHN1cHBvcnRzIG9ubHkgb25lIHByb21wdCBhdCBhIHRpbWUnKSA6IHZvaWQgMDtcbiAgICBwcm9tcHQgPSBuZXh0UHJvbXB0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvbXB0ID09PSBuZXh0UHJvbXB0KSBwcm9tcHQgPSBudWxsO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgLy8gVE9ETzogSWYgYW5vdGhlciB0cmFuc2l0aW9uIHN0YXJ0cyB3aGlsZSB3ZSdyZSBzdGlsbCBjb25maXJtaW5nXG4gICAgLy8gdGhlIHByZXZpb3VzIG9uZSwgd2UgbWF5IGVuZCB1cCBpbiBhIHdlaXJkIHN0YXRlLiBGaWd1cmUgb3V0IHRoZVxuICAgIC8vIGJlc3Qgd2F5IHRvIGhhbmRsZSB0aGlzLlxuICAgIGlmIChwcm9tcHQgIT0gbnVsbCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHR5cGVvZiBwcm9tcHQgPT09ICdmdW5jdGlvbicgPyBwcm9tcHQobG9jYXRpb24sIGFjdGlvbikgOiBwcm9tcHQ7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGdldFVzZXJDb25maXJtYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKHJlc3VsdCwgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdBIGhpc3RvcnkgbmVlZHMgYSBnZXRVc2VyQ29uZmlybWF0aW9uIGZ1bmN0aW9uIGluIG9yZGVyIHRvIHVzZSBhIHByb21wdCBtZXNzYWdlJykgOiB2b2lkIDA7XG4gICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBmYWxzZSBmcm9tIGEgdHJhbnNpdGlvbiBob29rIHRvIGNhbmNlbCB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0ICE9PSBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBhcHBlbmRMaXN0ZW5lcihmbikge1xuICAgIHZhciBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmIChpc0FjdGl2ZSkgZm4uYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0UHJvbXB0OiBzZXRQcm9tcHQsXG4gICAgY29uZmlybVRyYW5zaXRpb25UbzogY29uZmlybVRyYW5zaXRpb25UbyxcbiAgICBhcHBlbmRMaXN0ZW5lcjogYXBwZW5kTGlzdGVuZXIsXG4gICAgbm90aWZ5TGlzdGVuZXJzOiBub3RpZnlMaXN0ZW5lcnNcbiAgfTtcbn1cblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBnZXRDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sod2luZG93LmNvbmZpcm0obWVzc2FnZSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaXMgc3VwcG9ydGVkLiBUYWtlbiBmcm9tIE1vZGVybml6ci5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yb3V0ZXIvaXNzdWVzLzU4NlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gd2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3Rvcnk7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBicm93c2VyIGZpcmVzIHBvcHN0YXRlIG9uIGhhc2ggY2hhbmdlLlxuICogSUUxMCBhbmQgSUUxMSBkbyBub3QuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGdpdmVuIHBvcHN0YXRlIGV2ZW50IGlzIGFuIGV4dHJhbmVvdXMgV2ViS2l0IGV2ZW50LlxuICogQWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgQ2hyb21lIG9uIGlPUyBmaXJlcyByZWFsIHBvcHN0YXRlIGV2ZW50c1xuICogY29udGFpbmluZyB1bmRlZmluZWQgc3RhdGUgd2hlbiBwcmVzc2luZyB0aGUgYmFjayBidXR0b24uXG4gKi9cblxuZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufVxuXG52YXIgUG9wU3RhdGVFdmVudCA9ICdwb3BzdGF0ZSc7XG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG5mdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgbmV4dEtleXMucHVzaChsb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGFsbEtleXMgPSBuZXh0S2V5cztcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnJlcGxhY2VTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsS2V5c1twcmV2SW5kZXhdID0gbG9jYXRpb24ua2V5O1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbnZhciBIYXNoQ2hhbmdlRXZlbnQkMSA9ICdoYXNoY2hhbmdlJztcbnZhciBIYXNoUGF0aENvZGVycyA9IHtcbiAgaGFzaGJhbmc6IHtcbiAgICBlbmNvZGVQYXRoOiBmdW5jdGlvbiBlbmNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aCA6ICchLycgKyBzdHJpcExlYWRpbmdTbGFzaChwYXRoKTtcbiAgICB9LFxuICAgIGRlY29kZVBhdGg6IGZ1bmN0aW9uIGRlY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG4gICAgfVxuICB9LFxuICBub3NsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogc3RyaXBMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH0sXG4gIHNsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJpcEhhc2godXJsKSB7XG4gIHZhciBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBoYXNoSW5kZXgpO1xufVxuXG5mdW5jdGlvbiBnZXRIYXNoUGF0aCgpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBoYXNoSW5kZXggPT09IC0xID8gJycgOiBocmVmLnN1YnN0cmluZyhoYXNoSW5kZXggKyAxKTtcbn1cblxuZnVuY3Rpb24gcHVzaEhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShzdHJpcEhhc2god2luZG93LmxvY2F0aW9uLmhyZWYpICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdIYXNoIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHZhciBnbG9iYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHZhciBjYW5Hb1dpdGhvdXRSZWxvYWQgPSBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRoYXNoVHlwZSA9IF9wcm9wcy5oYXNoVHlwZSxcbiAgICAgIGhhc2hUeXBlID0gX3Byb3BzJGhhc2hUeXBlID09PSB2b2lkIDAgPyAnc2xhc2gnIDogX3Byb3BzJGhhc2hUeXBlO1xuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuICB2YXIgX0hhc2hQYXRoQ29kZXJzJGhhc2hUID0gSGFzaFBhdGhDb2RlcnNbaGFzaFR5cGVdLFxuICAgICAgZW5jb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5lbmNvZGVQYXRoLFxuICAgICAgZGVjb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5kZWNvZGVQYXRoO1xuXG4gIGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZGVjb2RlUGF0aChnZXRIYXNoUGF0aCgpKTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgdmFyIGlnbm9yZVBhdGggPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsJCQxKGEsIGIpIHtcbiAgICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoID09PSBiLmhhc2g7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gICAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSB7XG4gICAgICAvLyBFbnN1cmUgd2UgYWx3YXlzIGhhdmUgYSBwcm9wZXJseS1lbmNvZGVkIGhhc2guXG4gICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICAgICAgdmFyIHByZXZMb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG4gICAgICBpZiAoIWZvcmNlTmV4dFBvcCAmJiBsb2NhdGlvbnNBcmVFcXVhbCQkMShwcmV2TG9jYXRpb24sIGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBBIGhhc2hjaGFuZ2UgZG9lc24ndCBhbHdheXMgPT0gbG9jYXRpb24gY2hhbmdlLlxuXG4gICAgICBpZiAoaWdub3JlUGF0aCA9PT0gY3JlYXRlUGF0aChsb2NhdGlvbikpIHJldHVybjsgLy8gSWdub3JlIHRoaXMgY2hhbmdlOyB3ZSBhbHJlYWR5IHNldFN0YXRlIGluIHB1c2gvcmVwbGFjZS5cblxuICAgICAgaWdub3JlUGF0aCA9IG51bGw7XG4gICAgICBoYW5kbGVQb3AobG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIHBhdGhzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIHBhdGhzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgodG9Mb2NhdGlvbikpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoZnJvbUxvY2F0aW9uKSk7XG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG4gICAgdmFyIGRlbHRhID0gdG9JbmRleCAtIGZyb21JbmRleDtcblxuICAgIGlmIChkZWx0YSkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gdHJ1ZTtcbiAgICAgIGdvKGRlbHRhKTtcbiAgICB9XG4gIH0gLy8gRW5zdXJlIHRoZSBoYXNoIGlzIGVuY29kZWQgcHJvcGVybHkgYmVmb3JlIGRvaW5nIGFueXRoaW5nIGVsc2UuXG5cblxuICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG4gIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gIHZhciBhbGxQYXRocyA9IFtjcmVhdGVQYXRoKGluaXRpYWxMb2NhdGlvbildOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHZhciBiYXNlVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpO1xuICAgIHZhciBocmVmID0gJyc7XG5cbiAgICBpZiAoYmFzZVRhZyAmJiBiYXNlVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpKSB7XG4gICAgICBocmVmID0gc3RyaXBIYXNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHJlZiArICcjJyArIGVuY29kZVBhdGgoYmFzZW5hbWUgKyBjcmVhdGVQYXRoKGxvY2F0aW9uKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUFVTSCwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcHVzaEhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgICB2YXIgbmV4dFBhdGhzID0gYWxsUGF0aHMuc2xpY2UoMCwgcHJldkluZGV4ICsgMSk7XG4gICAgICAgIG5leHRQYXRocy5wdXNoKHBhdGgpO1xuICAgICAgICBhbGxQYXRocyA9IG5leHRQYXRocztcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdIYXNoIGhpc3RvcnkgY2Fubm90IFBVU0ggdGhlIHNhbWUgcGF0aDsgYSBuZXcgZW50cnkgd2lsbCBub3QgYmUgYWRkZWQgdG8gdGhlIGhpc3Rvcnkgc3RhY2snKSA6IHZvaWQgMDtcbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBSRVBMQUNFLCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMuaW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxQYXRoc1twcmV2SW5kZXhdID0gcGF0aDtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhjYW5Hb1dpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKSA6IHZvaWQgMDtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobiwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobiwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCBzdG9yZXMgbG9jYXRpb25zIGluIG1lbW9yeS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZU1lbW9yeUhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgX3Byb3BzJGluaXRpYWxFbnRyaWVzID0gX3Byb3BzLmluaXRpYWxFbnRyaWVzLFxuICAgICAgaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPT09IHZvaWQgMCA/IFsnLyddIDogX3Byb3BzJGluaXRpYWxFbnRyaWVzLFxuICAgICAgX3Byb3BzJGluaXRpYWxJbmRleCA9IF9wcm9wcy5pbml0aWFsSW5kZXgsXG4gICAgICBpbml0aWFsSW5kZXggPSBfcHJvcHMkaW5pdGlhbEluZGV4ID09PSB2b2lkIDAgPyAwIDogX3Byb3BzJGluaXRpYWxJbmRleCxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciBpbmRleCA9IGNsYW1wKGluaXRpYWxJbmRleCwgMCwgaW5pdGlhbEVudHJpZXMubGVuZ3RoIC0gMSk7XG4gIHZhciBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgY3JlYXRlS2V5KCkpIDogY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgZW50cnkua2V5IHx8IGNyZWF0ZUtleSgpKTtcbiAgfSk7IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICB2YXIgY3JlYXRlSHJlZiA9IGNyZWF0ZVBhdGg7XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBoaXN0b3J5LmluZGV4O1xuICAgICAgdmFyIG5leHRJbmRleCA9IHByZXZJbmRleCArIDE7XG4gICAgICB2YXIgbmV4dEVudHJpZXMgPSBoaXN0b3J5LmVudHJpZXMuc2xpY2UoMCk7XG5cbiAgICAgIGlmIChuZXh0RW50cmllcy5sZW5ndGggPiBuZXh0SW5kZXgpIHtcbiAgICAgICAgbmV4dEVudHJpZXMuc3BsaWNlKG5leHRJbmRleCwgbmV4dEVudHJpZXMubGVuZ3RoIC0gbmV4dEluZGV4LCBsb2NhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RW50cmllcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgICBlbnRyaWVzOiBuZXh0RW50cmllc1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgaGlzdG9yeS5lbnRyaWVzW2hpc3RvcnkuaW5kZXhdID0gbG9jYXRpb247XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBjbGFtcChoaXN0b3J5LmluZGV4ICsgbiwgMCwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aCAtIDEpO1xuICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICB2YXIgbG9jYXRpb24gPSBoaXN0b3J5LmVudHJpZXNbbmV4dEluZGV4XTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgICAgaW5kZXg6IG5leHRJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1pbWljIHRoZSBiZWhhdmlvciBvZiBET00gaGlzdG9yaWVzIGJ5XG4gICAgICAgIC8vIGNhdXNpbmcgYSByZW5kZXIgYWZ0ZXIgYSBjYW5jZWxsZWQgUE9QLlxuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gaGlzdG9yeS5pbmRleCArIG47XG4gICAgcmV0dXJuIG5leHRJbmRleCA+PSAwICYmIG5leHRJbmRleCA8IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGVudHJpZXMubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGVudHJpZXNbaW5kZXhdLFxuICAgIGluZGV4OiBpbmRleCxcbiAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBjYW5HbzogY2FuR28sXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5leHBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgcGFyc2VQYXRoLCBjcmVhdGVQYXRoIH07XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwicHJlYWN0LXJvdXRlclwiO1xuaW1wb3J0IEFzeW5jUm91dGUgZnJvbSBcInByZWFjdC1hc3luYy1yb3V0ZVwiO1xuaW1wb3J0IHtjcmVhdGVIYXNoSGlzdG9yeX0gZnJvbSAnaGlzdG9yeSdcblxuY29uc3QgUm91dGVyQ29tcG9uZW50ID0gKHtyb3V0ZXN9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFJvdXRlciBoaXN0b3J5PXtjcmVhdGVIYXNoSGlzdG9yeSgpfT5cbiAgICAgIHtyb3V0ZXMmJiByb3V0ZXMubWFwKChyb3V0ZSxpKT0+e1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgPEFzeW5jUm91dGVcbiAgICAgICAgICAgIHBhdGg9e3JvdXRlLnBhdGh9XG4gICAgICAgICAgICBnZXRDb21wb25lbnQ9eygpID0+IHJvdXRlLmxvYWQoKS50aGVuKG1vZHVsZT0+IG1vZHVsZS5kZWZhdWx0KX1cbiAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgICB9KX1cbiAgICA8L1JvdXRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlckNvbXBvbmVudFxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLW5hbWVkLWFzLWRlZmF1bHQgKi9cbmltcG9ydCB7IGggfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJwcmVhY3QvaG9va3NcIjtcbmltcG9ydCBEcmF3ZXJQYWdlIGZyb20gXCIuL0RyYXdlclBhZ2VcIjtcbmltcG9ydCBUb3BBcHBCYXIgZnJvbSBcIi4vVG9wQXBwQmFyXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLW5hbWVkLWFzLWRlZmF1bHRcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbmFtZWQtYXMtZGVmYXVsdC1tZW1iZXJcbmltcG9ydCBSb3V0ZXJDb21wb25lbnQgZnJvbSBcIi4vUm91dGVyQ29tcG9uZW50XCI7XG5cblxuY29uc3QgQXBwU2hlbGwgPSAoe2RyYXdlckl0ZW1zLGFwcFRpdGxlLHJvdXRlc30pID0+IHtcbiAgY29uc3QgW3RvZ2dsZSwgc2V0VG9nZ2xlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICByZXR1cm4gW1xuICAgIDxEcmF3ZXJQYWdlIG9wZW49e3RvZ2dsZX0gc2V0VG9nZ2xlPXtzZXRUb2dnbGV9IGl0ZW1zPXtkcmF3ZXJJdGVtc30gLz4sXG4gICAgPFRvcEFwcEJhciB0b2dnbGU9e3RvZ2dsZX0gc2V0VG9nZ2xlPXtzZXRUb2dnbGV9IHRpdGxlPXthcHBUaXRsZX0gLz4sXG4gICAgPFJvdXRlckNvbXBvbmVudCByb3V0ZXM9e3JvdXRlc30gLz5cbiAgXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNoZWxsO1xuIiwiaW1wb3J0IHsgaCwgcmVuZGVyIH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IEFwcFNoZWxsIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2FwcC1zaGVsbFwiO1xuXG5yZW5kZXIoXG4gIDxkaXY+XG4gICAgPEFwcFNoZWxsXG4gICAgICBkcmF3ZXJJdGVtcz17W3sgcm91dGU6IFwiL21vZHVsZXNcIiwgdGl0bGU6IFwiTW9kdWxlc1wiIH1dfVxuICAgICAgYXBwVGl0bGU9XCJQb3J0Zm9saW9cIlxuICAgICAgcm91dGVzPXtbeyBwYXRoOiBcIi9tb2R1bGVzXCIsIGxvYWQ6ICgpID0+IGltcG9ydChcIi4vbW9kdWxlcy9pbmRleFwiKSB9XX1cbiAgICAvPlxuICA8L2Rpdj4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuKTtcbiJdLCJuYW1lcyI6WyJjc3NDbGFzc2VzIiwiUk9PVCIsIkRJU01JU1NJQkxFIiwiTU9EQUwiLCJPUEVOIiwiQU5JTUFURSIsIk9QRU5JTkciLCJDTE9TSU5HIiwic3RyaW5ncyIsIkFQUF9DT05URU5UX1NFTEVDVE9SIiwiU0NSSU1fU0VMRUNUT1IiLCJDTE9TRV9FVkVOVCIsIk9QRU5fRVZFTlQiLCJNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24iLCJNRENGb3VuZGF0aW9uIiwiZGVmYXVsdEFkYXB0ZXIiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJlbGVtZW50SGFzQ2xhc3MiLCJjb21wdXRlQm91bmRpbmdSZWN0Iiwibm90aWZ5Q2xvc2UiLCJub3RpZnlPcGVuIiwic2F2ZUZvY3VzIiwicmVzdG9yZUZvY3VzIiwiZm9jdXNBY3RpdmVOYXZpZ2F0aW9uSXRlbSIsInRyYXBGb2N1cyIsInJlbGVhc2VGb2N1cyIsIm9wZW4iLCJpc09wZW4iLCJpc09wZW5pbmciLCJpc0Nsb3NpbmciLCJhZGFwdGVyXyIsImNsb3NlIiwib3BlbmVkIiwiY2xvc2VkIiwiaGFuZGxlS2V5ZG93biIsImV2dCIsImtleUNvZGUiLCJrZXkiLCJpc0VzY2FwZSIsImhhbmRsZVRyYW5zaXRpb25FbmQiLCJpc0VsZW1lbnQiLCJ0YXJnZXQiLCJFbGVtZW50IiwiTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIiwiaGFuZGxlU2NyaW1DbGljayIsIkxJU1RfSVRFTV9DTEFTUyIsIkxJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUyIsIkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MiLCJBUklBX09SSUVOVEFUSU9OIiwiQVJJQV9PUklFTlRBVElPTl9IT1JJWk9OVEFMIiwiQVJJQV9TRUxFQ1RFRCIsIkZPQ1VTQUJMRV9DSElMRF9FTEVNRU5UUyIsIkVOQUJMRURfSVRFTVNfU0VMRUNUT1IiLCJFTEVNRU5UU19LRVlfQUxMT1dFRF9JTiIsIk1EQ0xpc3RGb3VuZGF0aW9uIiwiZ2V0TGlzdEl0ZW1Db3VudCIsImdldEZvY3VzZWRFbGVtZW50SW5kZXgiLCJzZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgiLCJyZW1vdmVBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgiLCJhZGRDbGFzc0ZvckVsZW1lbnRJbmRleCIsInJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4IiwiZm9jdXNJdGVtQXRJbmRleCIsInNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbiIsImZvbGxvd0hyZWYiLCJjb25zdHJ1Y3RvciIsImFkYXB0ZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJ3cmFwRm9jdXNfIiwiaXNWZXJ0aWNhbF8iLCJpc1NpbmdsZVNlbGVjdGlvbkxpc3RfIiwic2VsZWN0ZWRJbmRleF8iLCJ1c2VBY3RpdmF0ZWRDbGFzc18iLCJzZXRXcmFwRm9jdXMiLCJ2YWx1ZSIsInNldFZlcnRpY2FsT3JpZW50YXRpb24iLCJzZXRTaW5nbGVTZWxlY3Rpb24iLCJzZXRVc2VBY3RpdmF0ZWRDbGFzcyIsInVzZUFjdGl2YXRlZCIsInNldFNlbGVjdGVkSW5kZXgiLCJpbmRleCIsImNsYXNzTmFtZSIsImhhbmRsZUZvY3VzSW4iLCJsaXN0SXRlbUluZGV4IiwiaGFuZGxlRm9jdXNPdXQiLCJpc1Jvb3RMaXN0SXRlbSIsImFycm93TGVmdCIsImFycm93VXAiLCJhcnJvd1JpZ2h0IiwiYXJyb3dEb3duIiwiaXNIb21lIiwiaXNFbmQiLCJpc0VudGVyIiwiaXNTcGFjZSIsImN1cnJlbnRJbmRleCIsInByZXZlbnREZWZhdWx0RXZlbnRfIiwiZm9jdXNOZXh0RWxlbWVudCIsImZvY3VzUHJldkVsZW1lbnQiLCJmb2N1c0ZpcnN0RWxlbWVudCIsImZvY3VzTGFzdEVsZW1lbnQiLCJoYW5kbGVDbGljayIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJwcmV2ZW50RGVmYXVsdCIsImNvdW50IiwibmV4dEluZGV4IiwicHJldkluZGV4IiwibGFzdEluZGV4IiwiTURDTGlzdCIsIk1EQ0NvbXBvbmVudCIsImFyZ3MiLCJoYW5kbGVLZXlkb3duXyIsImhhbmRsZUNsaWNrXyIsImZvY3VzSW5FdmVudExpc3RlbmVyXyIsImZvY3VzT3V0RXZlbnRMaXN0ZW5lcl8iLCJhdHRhY2hUbyIsInJvb3QiLCJkZXN0cm95Iiwicm9vdF8iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiZm91bmRhdGlvbl8iLCJiaW5kIiwiaGFuZGxlS2V5ZG93bkV2ZW50XyIsImhhbmRsZUZvY3VzSW5FdmVudF8iLCJoYW5kbGVGb2N1c091dEV2ZW50XyIsImFkZEV2ZW50TGlzdGVuZXIiLCJsYXlvdXQiLCJpbml0aWFsaXplTGlzdFR5cGUiLCJkaXJlY3Rpb24iLCJnZXRBdHRyaWJ1dGUiLCJ2ZXJ0aWNhbCIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlIiwic2V0QXR0cmlidXRlIiwiZ2V0TGlzdEl0ZW1JbmRleF8iLCJldmVudFRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicGFyZW50RWxlbWVudCIsImxpc3RFbGVtZW50cyIsInByZXNlbGVjdGVkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzaW5nbGVTZWxlY3Rpb24iLCJzZWxlY3RlZEluZGV4Iiwid3JhcEZvY3VzIiwiaXNTaW5nbGVTZWxlY3Rpb25MaXN0IiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJsZW5ndGgiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJhdHRyIiwiZWxlbWVudCIsInJlbW92ZUF0dHJpYnV0ZSIsImFkZCIsInJlbW92ZSIsImZvY3VzIiwidGFiSW5kZXhWYWx1ZSIsImxpc3RJdGVtQ2hpbGRyZW4iLCJsaXN0SXRlbSIsImhyZWYiLCJjbGljayIsImNhbmRpZGF0ZVNlbGVjdG9ycyIsImNhbmRpZGF0ZVNlbGVjdG9yIiwiam9pbiIsIm1hdGNoZXMiLCJwcm90b3R5cGUiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInRhYmJhYmxlIiwiZWwiLCJvcHRpb25zIiwiZWxlbWVudERvY3VtZW50Iiwib3duZXJEb2N1bWVudCIsInJlZ3VsYXJUYWJiYWJsZXMiLCJvcmRlcmVkVGFiYmFibGVzIiwidW50b3VjaGFiaWxpdHlDaGVja2VyIiwiVW50b3VjaGFiaWxpdHlDaGVja2VyIiwiY2FuZGlkYXRlcyIsImluY2x1ZGVDb250YWluZXIiLCJBcnJheSIsImFwcGx5IiwidW5zaGlmdCIsImkiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVUYWJpbmRleCIsImlzTm9kZU1hdGNoaW5nU2VsZWN0b3JUYWJiYWJsZSIsImdldFRhYmluZGV4IiwicHVzaCIsImRvY3VtZW50T3JkZXIiLCJ0YWJJbmRleCIsIm5vZGUiLCJ0YWJiYWJsZU5vZGVzIiwic29ydCIsInNvcnRPcmRlcmVkVGFiYmFibGVzIiwibWFwIiwiYSIsImNvbmNhdCIsImlzVGFiYmFibGUiLCJpc0ZvY3VzYWJsZSIsImlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUiLCJpc05vblRhYmJhYmxlUmFkaW8iLCJFcnJvciIsImRpc2FibGVkIiwiaXNIaWRkZW5JbnB1dCIsImlzVW50b3VjaGFibGUiLCJmb2N1c2FibGVDYW5kaWRhdGVTZWxlY3RvciIsInRhYmluZGV4QXR0ciIsInBhcnNlSW50IiwiaXNOYU4iLCJpc0NvbnRlbnRFZGl0YWJsZSIsImIiLCJmaW5kIiwibGlzdCIsInByZWRpY2F0ZSIsImNvbnRlbnRFZGl0YWJsZSIsImlzSW5wdXQiLCJ0eXBlIiwiaXNSYWRpbyIsImlzVGFiYmFibGVSYWRpbyIsImdldENoZWNrZWRSYWRpbyIsIm5vZGVzIiwiY2hlY2tlZCIsIm5hbWUiLCJyYWRpb1NldCIsImRvYyIsImNhY2hlIiwiaGFzRGlzcGxheU5vbmUiLCJub2RlQ29tcHV0ZWRTdHlsZSIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsImNhY2hlZCIsIml0ZW0iLCJkZWZhdWx0VmlldyIsImdldENvbXB1dGVkU3R5bGUiLCJyZXN1bHQiLCJkaXNwbGF5IiwicGFyZW50Tm9kZSIsImRvY3VtZW50RWxlbWVudCIsImNvbXB1dGVkU3R5bGUiLCJ2aXNpYmlsaXR5IiwiZXh0ZW5kIiwiaGFzT3duUHJvcGVydHkiLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJsaXN0ZW5pbmdGb2N1c1RyYXAiLCJmb2N1c1RyYXAiLCJ1c2VyT3B0aW9ucyIsImNvbnRhaW5lciIsImNvbmZpZyIsInh0ZW5kIiwicmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUiLCJlc2NhcGVEZWFjdGl2YXRlcyIsInN0YXRlIiwiZmlyc3RUYWJiYWJsZU5vZGUiLCJsYXN0VGFiYmFibGVOb2RlIiwibm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uIiwibW9zdFJlY2VudGx5Rm9jdXNlZE5vZGUiLCJhY3RpdmUiLCJwYXVzZWQiLCJ0cmFwIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwicGF1c2UiLCJ1bnBhdXNlIiwiYWN0aXZhdGVPcHRpb25zIiwidXBkYXRlVGFiYmFibGVOb2RlcyIsIm9uQWN0aXZhdGUiLCJhZGRMaXN0ZW5lcnMiLCJkZWFjdGl2YXRlT3B0aW9ucyIsInJlbW92ZUxpc3RlbmVycyIsIm9uRGVhY3RpdmF0ZSIsInVuZGVmaW5lZCIsInJldHVybkZvY3VzIiwiZGVsYXkiLCJ0cnlGb2N1cyIsImdldEluaXRpYWxGb2N1c05vZGUiLCJjaGVja0ZvY3VzSW4iLCJjaGVja1BvaW50ZXJEb3duIiwiY2hlY2tDbGljayIsImNoZWNrS2V5IiwiZ2V0Tm9kZUZvck9wdGlvbiIsIm9wdGlvbk5hbWUiLCJvcHRpb25WYWx1ZSIsImUiLCJjbGlja091dHNpZGVEZWFjdGl2YXRlcyIsIkRvY3VtZW50Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiaXNFc2NhcGVFdmVudCIsImlzVGFiRXZlbnQiLCJjaGVja1RhYiIsInNoaWZ0S2V5IiwiaXNTZWxlY3RhYmxlSW5wdXQiLCJzZWxlY3QiLCJmbiIsInNldFRpbWVvdXQiLCJjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZSIsInN1cmZhY2VFbCIsImZvY3VzVHJhcEZhY3RvcnkiLCJjcmVhdGVGb2N1c1RyYXAiLCJpbml0aWFsRm9jdXMiLCJNRENEcmF3ZXIiLCJwcmV2aW91c0ZvY3VzXyIsImhhbmRsZVRyYW5zaXRpb25FbmRfIiwiZm9jdXNUcmFwRmFjdG9yeV8iLCJmb2N1c1RyYXBfIiwic2NyaW1fIiwiaGFuZGxlU2NyaW1DbGlja18iLCJsaXN0XyIsImluaXRpYWxpemUiLCJsaXN0RmFjdG9yeSIsImxpc3RFbCIsInV0aWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwcmV2aW91c0ZvY3VzIiwiYWN0aXZlTmF2SXRlbUVsIiwiZW1pdCIsImNvbXBvbmVudE5hbWUiLCJwcm9wcyIsIkdyb3VwSGVhZGVyIiwiRHJhd2VyUGFnZSIsInNldFRvZ2dsZSIsIml0ZW1zIiwicm91dGUiLCJ0aXRsZSIsIkZJWEVEX0NMQVNTIiwiRklYRURfU0NST0xMRURfQ0xBU1MiLCJTSE9SVF9DTEFTUyIsIlNIT1JUX0hBU19BQ1RJT05fSVRFTV9DTEFTUyIsIlNIT1JUX0NPTExBUFNFRF9DTEFTUyIsIm51bWJlcnMiLCJERUJPVU5DRV9USFJPVFRMRV9SRVNJWkVfVElNRV9NUyIsIk1BWF9UT1BfQVBQX0JBUl9IRUlHSFQiLCJBQ1RJT05fSVRFTV9TRUxFQ1RPUiIsIk5BVklHQVRJT05fRVZFTlQiLCJOQVZJR0FUSU9OX0lDT05fU0VMRUNUT1IiLCJST09UX1NFTEVDVE9SIiwiVElUTEVfU0VMRUNUT1IiLCJNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiIsInNldFN0eWxlIiwiZ2V0VG9wQXBwQmFySGVpZ2h0IiwicmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJOYXZpZ2F0aW9uSWNvbkludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZCIsInJlZ2lzdGVyU2Nyb2xsSGFuZGxlciIsImRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJnZXRWaWV3cG9ydFNjcm9sbFkiLCJnZXRUb3RhbEFjdGlvbkl0ZW1zIiwibmF2Q2xpY2tIYW5kbGVyXyIsInNjcm9sbEhhbmRsZXJfIiwiaW5pdCIsImluaXRTY3JvbGxIYW5kbGVyIiwiZGVzdHJveVNjcm9sbEhhbmRsZXIiLCJNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb24iLCJNRENUb3BBcHBCYXJGb3VuZGF0aW9uIiwid2FzU2Nyb2xsZWRfIiwiZml4ZWRTY3JvbGxIYW5kbGVyXyIsImN1cnJlbnRTY3JvbGwiLCJNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24iLCJpc0NvbGxhcHNlZCIsInNob3J0QXBwQmFyU2Nyb2xsSGFuZGxlcl8iLCJpc0Fsd2F5c0NvbGxhcHNlZCIsIklOSVRJQUxfVkFMVUUiLCJsYXN0U2Nyb2xsUG9zaXRpb25fIiwidG9wQXBwQmFySGVpZ2h0XyIsIndhc0RvY2tlZF8iLCJpc0RvY2tlZFNob3dpbmdfIiwiY3VycmVudEFwcEJhck9mZnNldFRvcF8iLCJpc0N1cnJlbnRseUJlaW5nUmVzaXplZF8iLCJyZXNpemVUaHJvdHRsZUlkXyIsInJlc2l6ZURlYm91bmNlSWRfIiwidG9wQXBwQmFyU2Nyb2xsSGFuZGxlcl8iLCJyZXNpemVIYW5kbGVyXyIsInRvcEFwcEJhclJlc2l6ZUhhbmRsZXJfIiwiY2hlY2tGb3JVcGRhdGVfIiwib2Zmc2NyZWVuQm91bmRhcnlUb3AiLCJoYXNBbnlQaXhlbHNPZmZzY3JlZW4iLCJoYXNBbnlQaXhlbHNPbnNjcmVlbiIsInBhcnRpYWxseVNob3dpbmciLCJtb3ZlVG9wQXBwQmFyXyIsIm9mZnNldCIsIk1hdGgiLCJhYnMiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJtYXgiLCJkaWZmIiwidGhyb3R0bGVkUmVzaXplSGFuZGxlcl8iLCJjbGVhclRpbWVvdXQiLCJjdXJyZW50SGVpZ2h0IiwiTURDVG9wQXBwQmFyIiwibmF2SWNvbl8iLCJpY29uUmlwcGxlc18iLCJzY3JvbGxUYXJnZXRfIiwicmlwcGxlRmFjdG9yeSIsIk1EQ1JpcHBsZSIsImljb25zIiwiaWNvbiIsInJpcHBsZSIsInVuYm91bmRlZCIsImljb25SaXBwbGUiLCJzZXRTY3JvbGxUYXJnZXQiLCJwcm9wZXJ0eSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJjbGllbnRIZWlnaHQiLCJldnRUeXBlIiwiaGFuZGxlciIsIndpbmRvdyIsImZvdW5kYXRpb24iLCJjb21wIiwiVG9wQXBwQmFyTmF2IiwidG9nZ2xlIiwiY29uc3QiLCJFTVBUWSIsImxldCIsImxvYWRDb21wb25lbnQiLCJ1cmwiLCJzZXRTdGF0ZSIsImdsb2JhbCIsInNlbGYiLCJkZWZhdWx0U2V0VGltb3V0IiwiZGVmYXVsdENsZWFyVGltZW91dCIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwicnVuQ2xlYXJUaW1lb3V0IiwibWFya2VyIiwicXVldWUiLCJkcmFpbmluZyIsImN1cnJlbnRRdWV1ZSIsInF1ZXVlSW5kZXgiLCJjbGVhblVwTmV4dFRpY2siLCJkcmFpblF1ZXVlIiwidGltZW91dCIsImxlbiIsInJ1biIsIm5leHRUaWNrIiwiSXRlbSIsImFycmF5IiwicGxhdGZvcm0iLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsInJlbGVhc2UiLCJub29wIiwib24iLCJhZGRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImJpbmRpbmciLCJjd2QiLCJjaGRpciIsImRpciIsInVtYXNrIiwicGVyZm9ybWFuY2UiLCJwZXJmb3JtYW5jZU5vdyIsIm5vdyIsIm1vek5vdyIsIm1zTm93Iiwib05vdyIsIndlYmtpdE5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiaHJ0aW1lIiwicHJldmlvdXNUaW1lc3RhbXAiLCJjbG9ja3RpbWUiLCJzZWNvbmRzIiwiZmxvb3IiLCJuYW5vc2Vjb25kcyIsInN0YXJ0VGltZSIsInVwdGltZSIsImN1cnJlbnRUaW1lIiwiZGlmIiwiX2V4dGVuZHMiLCJpc0Fic29sdXRlIiwicGF0aG5hbWUiLCJjaGFyQXQiLCJzcGxpY2VPbmUiLCJrIiwibiIsInBvcCIsInJlc29sdmVQYXRobmFtZSIsInRvIiwiZnJvbSIsInRvUGFydHMiLCJzcGxpdCIsImZyb21QYXJ0cyIsImlzVG9BYnMiLCJpc0Zyb21BYnMiLCJtdXN0RW5kQWJzIiwiaGFzVHJhaWxpbmdTbGFzaCIsImxhc3QiLCJ1cCIsInBhcnQiLCJzdWJzdHIiLCJ3YXJuaW5nIiwiY29uZGl0aW9uIiwibWVzc2FnZSIsInRleHQiLCJjb25zb2xlIiwid2FybiIsIngiLCJwcmVmaXgiLCJpbnZhcmlhbnQiLCJhZGRMZWFkaW5nU2xhc2giLCJwYXRoIiwic3RyaXBMZWFkaW5nU2xhc2giLCJoYXNCYXNlbmFtZSIsInN0cmlwQmFzZW5hbWUiLCJzdHJpcFRyYWlsaW5nU2xhc2giLCJwYXJzZVBhdGgiLCJzZWFyY2giLCJoYXNoIiwiaGFzaEluZGV4Iiwic2VhcmNoSW5kZXgiLCJjcmVhdGVQYXRoIiwibG9jYXRpb24iLCJjcmVhdGVMb2NhdGlvbiIsImN1cnJlbnRMb2NhdGlvbiIsImRlY29kZVVSSSIsIlVSSUVycm9yIiwiY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIiLCJwcm9tcHQiLCJzZXRQcm9tcHQiLCJuZXh0UHJvbXB0IiwicHJvY2VzcyIsIk5PREVfRU5WIiwiY29uZmlybVRyYW5zaXRpb25UbyIsImFjdGlvbiIsImdldFVzZXJDb25maXJtYXRpb24iLCJjYWxsYmFjayIsImxpc3RlbmVycyIsImFwcGVuZExpc3RlbmVyIiwiaXNBY3RpdmUiLCJsaXN0ZW5lciIsImZpbHRlciIsIm5vdGlmeUxpc3RlbmVycyIsIl9sZW4iLCJfa2V5IiwiY2FuVXNlRE9NIiwiY3JlYXRlRWxlbWVudCIsImdldENvbmZpcm1hdGlvbiIsImNvbmZpcm0iLCJzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIkhhc2hDaGFuZ2VFdmVudCQxIiwiSGFzaFBhdGhDb2RlcnMiLCJoYXNoYmFuZyIsImVuY29kZVBhdGgiLCJkZWNvZGVQYXRoIiwibm9zbGFzaCIsInNsYXNoIiwic3RyaXBIYXNoIiwiZ2V0SGFzaFBhdGgiLCJzdWJzdHJpbmciLCJwdXNoSGFzaFBhdGgiLCJyZXBsYWNlSGFzaFBhdGgiLCJyZXBsYWNlIiwiY3JlYXRlSGFzaEhpc3RvcnkiLCJnbG9iYWxIaXN0b3J5IiwiaGlzdG9yeSIsImNhbkdvV2l0aG91dFJlbG9hZCIsIl9wcm9wcyIsIl9wcm9wcyRnZXRVc2VyQ29uZmlybSIsIl9wcm9wcyRoYXNoVHlwZSIsImhhc2hUeXBlIiwiYmFzZW5hbWUiLCJfSGFzaFBhdGhDb2RlcnMkaGFzaFQiLCJnZXRET01Mb2NhdGlvbiIsInRyYW5zaXRpb25NYW5hZ2VyIiwibmV4dFN0YXRlIiwiZm9yY2VOZXh0UG9wIiwiaWdub3JlUGF0aCIsImxvY2F0aW9uc0FyZUVxdWFsJCQxIiwiaGFuZGxlSGFzaENoYW5nZSIsImVuY29kZWRQYXRoIiwicHJldkxvY2F0aW9uIiwiaGFuZGxlUG9wIiwib2siLCJyZXZlcnRQb3AiLCJmcm9tTG9jYXRpb24iLCJ0b0xvY2F0aW9uIiwidG9JbmRleCIsImFsbFBhdGhzIiwibGFzdEluZGV4T2YiLCJmcm9tSW5kZXgiLCJkZWx0YSIsImdvIiwiaW5pdGlhbExvY2F0aW9uIiwiY3JlYXRlSHJlZiIsImJhc2VUYWciLCJoYXNoQ2hhbmdlZCIsIm5leHRQYXRocyIsImdvQmFjayIsImdvRm9yd2FyZCIsImxpc3RlbmVyQ291bnQiLCJjaGVja0RPTUxpc3RlbmVycyIsImlzQmxvY2tlZCIsImJsb2NrIiwidW5ibG9jayIsImxpc3RlbiIsInVubGlzdGVuIiwiUm91dGVyQ29tcG9uZW50Iiwicm91dGVzIiwiQXN5bmNSb3V0ZSIsImxvYWQiLCJ0aGVuIiwibW9kdWxlIiwiQXBwU2hlbGwiLCJkcmF3ZXJJdGVtcyIsImFwcFRpdGxlIiwidXNlU3RhdGUiLCJUb3BBcHBCYXIiLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsR0FBRztFQUNqQkMsSUFBSSxFQUFFLFlBRFc7RUFFakJDLFdBQVcsRUFBRSx5QkFGSTtFQUdqQkMsS0FBSyxFQUFFLG1CQUhVO0VBSWpCQyxJQUFJLEVBQUUsa0JBSlc7RUFLakJDLE9BQU8sRUFBRSxxQkFMUTtFQU1qQkMsT0FBTyxFQUFFLHFCQU5RO0VBT2pCQyxPQUFPLEVBQUU7Q0FQWDs7O0FBV0EsTUFBTUMsT0FB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
