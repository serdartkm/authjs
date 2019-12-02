import { a as MDCFoundation, b as MDCComponent, s as MDCRipple, C as MDCRippleFoundation, c as createCommonjsModule, d as _interopRequireDefault, n as require$$0, e as require$$0$1, f as require$$1, g as require$$2, h as require$$3, i as require$$4, j as require$$5, l as _preact, m as unwrapExports, q as styleInject, r as h, x as v, y as _slicedToArray, B as p, w as commonjsGlobal } from './chunk-42fdbf08.js';
import { a as process, b as global$1 } from './index-d70776de.js';
import { a as _regeneratorRuntime } from './chunk-6229c86f.js';

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
const cssClasses = {
  ACTIVE: 'mdc-tab-indicator--active',
  FADE: 'mdc-tab-indicator--fade',
  NO_TRANSITION: 'mdc-tab-indicator--no-transition'
};
/** @enum {string} */

const strings = {
  CONTENT_SELECTOR: '.mdc-tab-indicator__content'
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
 * @extends {MDCFoundation<!MDCTabIndicatorAdapter>}
 * @abstract
 */

class MDCTabIndicatorFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }
  /** @return enum {string} */


  static get strings() {
    return strings;
  }
  /**
   * @see MDCTabIndicatorAdapter for typing information
   * @return {!MDCTabIndicatorAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTabIndicatorAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        computeContentClientRect: () => {},
        setContentStyleProperty: () => {}
      }
    );
  }
  /** @param {!MDCTabIndicatorAdapter} adapter */


  constructor(adapter) {
    super(Object.assign(MDCTabIndicatorFoundation.defaultAdapter, adapter));
  }
  /** @return {!ClientRect} */


  computeContentClientRect() {
    return this.adapter_.computeContentClientRect();
  }
  /**
   * Activates the indicator
   * @param {!ClientRect=} previousIndicatorClientRect
   * @abstract
   */


  activate(previousIndicatorClientRect) {} // eslint-disable-line no-unused-vars

  /** @abstract */


  deactivate() {}

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
 * @extends {MDCTabIndicatorFoundation}
 * @final
 */

class MDCSlidingTabIndicatorFoundation extends MDCTabIndicatorFoundation {
  /** @param {!ClientRect=} previousIndicatorClientRect */
  activate(previousIndicatorClientRect) {
    // Early exit if no indicator is present to handle cases where an indicator
    // may be activated without a prior indicator state
    if (!previousIndicatorClientRect) {
      this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
      return;
    } // This animation uses the FLIP approach. You can read more about it at the link below:
    // https://aerotwist.com/blog/flip-your-animations/
    // Calculate the dimensions based on the dimensions of the previous indicator


    const currentClientRect = this.computeContentClientRect();
    const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter_.setContentStyleProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`); // Force repaint before updating classes and transform to ensure the transform properly takes effect

    this.computeContentClientRect();
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    this.adapter_.setContentStyleProperty('transform', '');
  }

  deactivate() {
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
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
 * @extends {MDCTabIndicatorFoundation}
 * @final
 */

class MDCFadingTabIndicatorFoundation extends MDCTabIndicatorFoundation {
  activate() {
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  }

  deactivate() {
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
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
 * @extends {MDCComponent<!MDCTabIndicatorFoundation>}
 * @final
 */

class MDCTabIndicator extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCTabIndicator}
   */
  static attachTo(root) {
    return new MDCTabIndicator(root);
  }
  /**
   * @param {...?} args
   */


  constructor(...args) {
    super(...args);
    /** @type {?Element} */

    this.content_;
  }

  initialize() {
    this.content_ = this.root_.querySelector(MDCTabIndicatorFoundation.strings.CONTENT_SELECTOR);
  }
  /**
   * @return {!ClientRect}
   */


  computeContentClientRect() {
    return this.foundation_.computeContentClientRect();
  }
  /**
   * @return {!MDCTabIndicatorFoundation}
   */


  getDefaultFoundation() {
    const adapter =
    /** @type {!MDCTabIndicatorAdapter} */
    Object.assign({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      computeContentClientRect: () => this.content_.getBoundingClientRect(),
      setContentStyleProperty: (prop, value) => this.content_.style.setProperty(prop, value)
    });

    if (this.root_.classList.contains(MDCTabIndicatorFoundation.cssClasses.FADE)) {
      return new MDCFadingTabIndicatorFoundation(adapter);
    } // Default to the sliding indicator


    return new MDCSlidingTabIndicatorFoundation(adapter);
  }
  /**
   * @param {!ClientRect=} previousIndicatorClientRect
   */


  activate(previousIndicatorClientRect) {
    this.foundation_.activate(previousIndicatorClientRect);
  }

  deactivate() {
    this.foundation_.deactivate();
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
  ACTIVE: 'mdc-tab--active'
};
/** @enum {string} */

const strings$1 = {
  ARIA_SELECTED: 'aria-selected',
  RIPPLE_SELECTOR: '.mdc-tab__ripple',
  CONTENT_SELECTOR: '.mdc-tab__content',
  TAB_INDICATOR_SELECTOR: '.mdc-tab-indicator',
  TABINDEX: 'tabIndex',
  INTERACTED_EVENT: 'MDCTab:interacted'
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
 * @extends {MDCFoundation<!MDCTabAdapter>}
 * @final
 */

class MDCTabFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$1;
  }
  /** @return enum {string} */


  static get strings() {
    return strings$1;
  }
  /**
   * @see MDCTabAdapter for typing information
   * @return {!MDCTabAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTabAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        setAttr: () => {},
        activateIndicator: () => {},
        deactivateIndicator: () => {},
        notifyInteracted: () => {},
        getOffsetLeft: () => {},
        getOffsetWidth: () => {},
        getContentOffsetLeft: () => {},
        getContentOffsetWidth: () => {},
        focus: () => {}
      }
    );
  }
  /** @param {!MDCTabAdapter} adapter */


  constructor(adapter) {
    super(Object.assign(MDCTabFoundation.defaultAdapter, adapter));
    /** @private {function(?Event): undefined} */

    this.handleClick_ = () => this.handleClick();
  }
  /**
   * Handles the "click" event
   */


  handleClick() {
    // It's up to the parent component to keep track of the active Tab and
    // ensure we don't activate a Tab that's already active.
    this.adapter_.notifyInteracted();
  }
  /**
   * Returns the Tab's active state
   * @return {boolean}
   */


  isActive() {
    return this.adapter_.hasClass(cssClasses$1.ACTIVE);
  }
  /**
   * Activates the Tab
   * @param {!ClientRect=} previousIndicatorClientRect
   */


  activate(previousIndicatorClientRect) {
    this.adapter_.addClass(cssClasses$1.ACTIVE);
    this.adapter_.setAttr(strings$1.ARIA_SELECTED, 'true');
    this.adapter_.setAttr(strings$1.TABINDEX, '0');
    this.adapter_.activateIndicator(previousIndicatorClientRect);
    this.adapter_.focus();
  }
  /**
   * Deactivates the Tab
   */


  deactivate() {
    // Early exit
    if (!this.isActive()) {
      return;
    }

    this.adapter_.removeClass(cssClasses$1.ACTIVE);
    this.adapter_.setAttr(strings$1.ARIA_SELECTED, 'false');
    this.adapter_.setAttr(strings$1.TABINDEX, '-1');
    this.adapter_.deactivateIndicator();
  }
  /**
   * Returns the dimensions of the Tab
   * @return {!MDCTabDimensions}
   */


  computeDimensions() {
    const rootWidth = this.adapter_.getOffsetWidth();
    const rootLeft = this.adapter_.getOffsetLeft();
    const contentWidth = this.adapter_.getContentOffsetWidth();
    const contentLeft = this.adapter_.getContentOffsetLeft();
    return {
      rootLeft,
      rootRight: rootLeft + rootWidth,
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth
    };
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
 * @extends {MDCComponent<!MDCTabFoundation>}
 * @final
 */

class MDCTab extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?MDCRipple} */

    this.ripple_;
    /** @private {?MDCTabIndicator} */

    this.tabIndicator_;
    /** @private {?Element} */

    this.content_;
    /** @private {?Function} */

    this.handleClick_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCTab}
   */


  static attachTo(root) {
    return new MDCTab(root);
  }

  initialize(rippleFactory = (el, foundation) => new MDCRipple(el, foundation), tabIndicatorFactory = el => new MDCTabIndicator(el)) {
    const rippleSurface = this.root_.querySelector(MDCTabFoundation.strings.RIPPLE_SELECTOR);
    const rippleAdapter = Object.assign(MDCRipple.createAdapter(
    /** @type {!RippleCapableSurface} */
    this), {
      addClass: className => rippleSurface.classList.add(className),
      removeClass: className => rippleSurface.classList.remove(className),
      updateCssVariable: (varName, value) => rippleSurface.style.setProperty(varName, value)
    });
    const rippleFoundation = new MDCRippleFoundation(rippleAdapter);
    this.ripple_ = rippleFactory(this.root_, rippleFoundation);
    const tabIndicatorElement = this.root_.querySelector(MDCTabFoundation.strings.TAB_INDICATOR_SELECTOR);
    this.tabIndicator_ = tabIndicatorFactory(tabIndicatorElement);
    this.content_ = this.root_.querySelector(MDCTabFoundation.strings.CONTENT_SELECTOR);
  }

  initialSyncWithDOM() {
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.listen('click', this.handleClick_);
  }

  destroy() {
    this.unlisten('click',
    /** @type {!Function} */
    this.handleClick_);
    this.ripple_.destroy();
    super.destroy();
  }
  /**
   * @return {!MDCTabFoundation}
   */


  getDefaultFoundation() {
    return new MDCTabFoundation(
    /** @type {!MDCTabAdapter} */
    {
      setAttr: (attr, value) => this.root_.setAttribute(attr, value),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      activateIndicator: previousIndicatorClientRect => this.tabIndicator_.activate(previousIndicatorClientRect),
      deactivateIndicator: () => this.tabIndicator_.deactivate(),
      notifyInteracted: () => this.emit(MDCTabFoundation.strings.INTERACTED_EVENT, {
        tab: this
      }, true
      /* bubble */
      ),
      getOffsetLeft: () => this.root_.offsetLeft,
      getOffsetWidth: () => this.root_.offsetWidth,
      getContentOffsetLeft: () => this.content_.offsetLeft,
      getContentOffsetWidth: () => this.content_.offsetWidth,
      focus: () => this.root_.focus()
    });
  }
  /**
   * Getter for the active state of the tab
   * @return {boolean}
   */


  get active() {
    return this.foundation_.isActive();
  }
  /**
   * Activates the tab
   * @param {!ClientRect=} computeIndicatorClientRect
   */


  activate(computeIndicatorClientRect) {
    this.foundation_.activate(computeIndicatorClientRect);
  }
  /**
   * Deactivates the tab
   */


  deactivate() {
    this.foundation_.deactivate();
  }
  /**
   * Returns the indicator's client rect
   * @return {!ClientRect}
   */


  computeIndicatorClientRect() {
    return this.tabIndicator_.computeContentClientRect();
  }
  /**
   * @return {!MDCTabDimensions}
   */


  computeDimensions() {
    return this.foundation_.computeDimensions();
  }
  /**
   * Focuses the tab
   */


  focus() {
    this.root_.focus();
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
const cssClasses$2 = {
  ANIMATING: 'mdc-tab-scroller--animating',
  SCROLL_TEST: 'mdc-tab-scroller__test',
  SCROLL_AREA_SCROLL: 'mdc-tab-scroller__scroll-area--scroll'
};
/** @enum {string} */

const strings$2 = {
  AREA_SELECTOR: '.mdc-tab-scroller__scroll-area',
  CONTENT_SELECTOR: '.mdc-tab-scroller__scroll-content'
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
/* eslint-enable no-unused-vars */

/**
 * @abstract
 */

class MDCTabScrollerRTL {
  /** @param {!MDCTabScrollerAdapter} adapter */
  constructor(adapter) {
    /** @private */
    this.adapter_ = adapter;
  }
  /**
   * @param {number} translateX The current translateX position
   * @return {number}
   * @abstract
   */


  getScrollPositionRTL(translateX) {}
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   * @abstract
   */


  scrollToRTL(scrollX) {}
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   * @abstract
   */


  incrementScrollRTL(scrollX) {}
  /**
   * @param {number} scrollX The current scrollX position
   * @param {number} translateX The current translateX position
   * @return {number}
   * @abstract
   */


  getAnimatingScrollPosition(scrollX, translateX) {}

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
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

class MDCTabScrollerRTLDefault extends MDCTabScrollerRTL {
  /**
   * @return {number}
   */
  getScrollPositionRTL() {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const {
      right
    } = this.calculateScrollEdges_(); // Scroll values on most browsers are ints instead of floats so we round

    return Math.round(right - currentScrollLeft);
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  scrollToRTL(scrollX) {
    const edges = this.calculateScrollEdges_();
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  incrementScrollRTL(scrollX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {number}
   */


  getAnimatingScrollPosition(scrollX) {
    return scrollX;
  }
  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  calculateScrollEdges_() {
    const contentWidth = this.adapter_.getScrollContentOffsetWidth();
    const rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (
      /** @type {!MDCTabScrollerHorizontalEdges} */
      {
        left: 0,
        right: contentWidth - rootWidth
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  clampScrollValue_(scrollX) {
    const edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
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
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

class MDCTabScrollerRTLNegative extends MDCTabScrollerRTL {
  /**
   * @param {number} translateX The current translateX position
   * @return {number}
   */
  getScrollPositionRTL(translateX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return Math.round(translateX - currentScrollLeft);
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  scrollToRTL(scrollX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(-scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  incrementScrollRTL(scrollX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @param {number} translateX
   * @return {number}
   */


  getAnimatingScrollPosition(scrollX, translateX) {
    return scrollX - translateX;
  }
  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  calculateScrollEdges_() {
    const contentWidth = this.adapter_.getScrollContentOffsetWidth();
    const rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (
      /** @type {!MDCTabScrollerHorizontalEdges} */
      {
        left: rootWidth - contentWidth,
        right: 0
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  clampScrollValue_(scrollX) {
    const edges = this.calculateScrollEdges_();
    return Math.max(Math.min(edges.right, scrollX), edges.left);
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
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

class MDCTabScrollerRTLReverse extends MDCTabScrollerRTL {
  /**
   * @param {number} translateX
   * @return {number}
   */
  getScrollPositionRTL(translateX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft(); // Scroll values on most browsers are ints instead of floats so we round

    return Math.round(currentScrollLeft - translateX);
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  scrollToRTL(scrollX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  incrementScrollRTL(scrollX) {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
    return (
      /** @type {!MDCTabScrollerAnimation} */
      {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {number}
   */


  getAnimatingScrollPosition(scrollX, translateX) {
    return scrollX + translateX;
  }
  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  calculateScrollEdges_() {
    const contentWidth = this.adapter_.getScrollContentOffsetWidth();
    const rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (
      /** @type {!MDCTabScrollerHorizontalEdges} */
      {
        left: contentWidth - rootWidth,
        right: 0
      }
    );
  }
  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  clampScrollValue_(scrollX) {
    const edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.right, scrollX), edges.left);
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
 * @extends {MDCFoundation<!MDCTabScrollerAdapter>}
 * @final
 */

class MDCTabScrollerFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$2;
  }
  /** @return enum {string} */


  static get strings() {
    return strings$2;
  }
  /**
   * @see MDCTabScrollerAdapter for typing information
   * @return {!MDCTabScrollerAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTabScrollerAdapter} */
      {
        eventTargetMatchesSelector: () => {},
        addClass: () => {},
        removeClass: () => {},
        addScrollAreaClass: () => {},
        setScrollAreaStyleProperty: () => {},
        setScrollContentStyleProperty: () => {},
        getScrollContentStyleValue: () => {},
        setScrollAreaScrollLeft: () => {},
        getScrollAreaScrollLeft: () => {},
        getScrollContentOffsetWidth: () => {},
        getScrollAreaOffsetWidth: () => {},
        computeScrollAreaClientRect: () => {},
        computeScrollContentClientRect: () => {},
        computeHorizontalScrollbarHeight: () => {}
      }
    );
  }
  /** @param {!MDCTabScrollerAdapter} adapter */


  constructor(adapter) {
    super(Object.assign(MDCTabScrollerFoundation.defaultAdapter, adapter));
    /**
     * This boolean controls whether we should handle the transitionend and interaction events during the animation.
     * @private {boolean}
     */

    this.isAnimating_ = false;
    /**
     * The MDCTabScrollerRTL instance varies per browser and allows us to encapsulate the peculiar browser behavior
     * of RTL scrolling in it's own class.
     * @private {?MDCTabScrollerRTL}
     */

    this.rtlScrollerInstance_;
  }

  init() {
    // Compute horizontal scrollbar height on scroller with overflow initially hidden, then update overflow to scroll
    // and immediately adjust bottom margin to avoid the scrollbar initially appearing before JS runs.
    const horizontalScrollbarHeight = this.adapter_.computeHorizontalScrollbarHeight();
    this.adapter_.setScrollAreaStyleProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
    this.adapter_.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
  }
  /**
   * Computes the current visual scroll position
   * @return {number}
   */


  getScrollPosition() {
    if (this.isRTL_()) {
      return this.computeCurrentScrollPositionRTL_();
    }

    const currentTranslateX = this.calculateCurrentTranslateX_();
    const scrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return scrollLeft - currentTranslateX;
  }
  /**
   * Handles interaction events that occur during transition
   */


  handleInteraction() {
    // Early exit if we aren't animating
    if (!this.isAnimating_) {
      return;
    } // Prevent other event listeners from handling this event


    this.stopScrollAnimation_();
  }
  /**
   * Handles the transitionend event
   * @param {!Event} evt
   */


  handleTransitionEnd(evt) {
    // Early exit if we aren't animating or the event was triggered by a different element.
    if (!this.isAnimating_ || !this.adapter_.eventTargetMatchesSelector(evt.target, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
      return;
    }

    this.isAnimating_ = false;
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
  }
  /**
   * Increment the scroll value by the scrollXIncrement
   * @param {number} scrollXIncrement The value by which to increment the scroll position
   */


  incrementScroll(scrollXIncrement) {
    // Early exit for non-operational increment values
    if (scrollXIncrement === 0) {
      return;
    }

    if (this.isRTL_()) {
      return this.incrementScrollRTL_(scrollXIncrement);
    }

    this.incrementScroll_(scrollXIncrement);
  }
  /**
   * Scrolls to the given scrollX value
   * @param {number} scrollX
   */


  scrollTo(scrollX) {
    if (this.isRTL_()) {
      return this.scrollToRTL_(scrollX);
    }

    this.scrollTo_(scrollX);
  }
  /**
   * Returns the appropriate version of the MDCTabScrollerRTL
   * @return {!MDCTabScrollerRTL}
   */


  getRTLScroller() {
    if (!this.rtlScrollerInstance_) {
      this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
    }

    return this.rtlScrollerInstance_;
  }
  /**
   * Returns the translateX value from a CSS matrix transform function string
   * @return {number}
   * @private
   */


  calculateCurrentTranslateX_() {
    const transformValue = this.adapter_.getScrollContentStyleValue('transform'); // Early exit if no transform is present

    if (transformValue === 'none') {
      return 0;
    } // The transform value comes back as a matrix transformation in the form
    // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
    // we're going to grab all the parenthesized values, strip out tx, and
    // parse it.


    const results = /\((.+)\)/.exec(transformValue)[1];
    const parts = results.split(',');
    return parseFloat(parts[4]);
  }
  /**
   * Calculates a safe scroll value that is > 0 and < the max scroll value
   * @param {number} scrollX The distance to scroll
   * @return {number}
   * @private
   */


  clampScrollValue_(scrollX) {
    const edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  }
  /**
   * @return {number}
   * @private
   */


  computeCurrentScrollPositionRTL_() {
    const translateX = this.calculateCurrentTranslateX_();
    return this.getRTLScroller().getScrollPositionRTL(translateX);
  }
  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  calculateScrollEdges_() {
    const contentWidth = this.adapter_.getScrollContentOffsetWidth();
    const rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (
      /** @type {!MDCTabScrollerHorizontalEdges} */
      {
        left: 0,
        right: contentWidth - rootWidth
      }
    );
  }
  /**
   * Internal scroll method
   * @param {number} scrollX The new scroll position
   * @private
   */


  scrollTo_(scrollX) {
    const currentScrollX = this.getScrollPosition();
    const safeScrollX = this.clampScrollValue_(scrollX);
    const scrollDelta = safeScrollX - currentScrollX;
    this.animate_(
    /** @type {!MDCTabScrollerAnimation} */
    {
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    });
  }
  /**
   * Internal RTL scroll method
   * @param {number} scrollX The new scroll position
   * @private
   */


  scrollToRTL_(scrollX) {
    const animation = this.getRTLScroller().scrollToRTL(scrollX);
    this.animate_(animation);
  }
  /**
   * Internal increment scroll method
   * @param {number} scrollX The new scroll position increment
   * @private
   */


  incrementScroll_(scrollX) {
    const currentScrollX = this.getScrollPosition();
    const targetScrollX = scrollX + currentScrollX;
    const safeScrollX = this.clampScrollValue_(targetScrollX);
    const scrollDelta = safeScrollX - currentScrollX;
    this.animate_(
    /** @type {!MDCTabScrollerAnimation} */
    {
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    });
  }
  /**
   * Internal incremenet scroll RTL method
   * @param {number} scrollX The new scroll position RTL increment
   * @private
   */


  incrementScrollRTL_(scrollX) {
    const animation = this.getRTLScroller().incrementScrollRTL(scrollX);
    this.animate_(animation);
  }
  /**
   * Animates the tab scrolling
   * @param {!MDCTabScrollerAnimation} animation The animation to apply
   * @private
   */


  animate_(animation) {
    // Early exit if translateX is 0, which means there's no animation to perform
    if (animation.scrollDelta === 0) {
      return;
    }

    this.stopScrollAnimation_(); // This animation uses the FLIP approach.
    // Read more here: https://aerotwist.com/blog/flip-your-animations/

    this.adapter_.setScrollAreaScrollLeft(animation.finalScrollPosition);
    this.adapter_.setScrollContentStyleProperty('transform', `translateX(${animation.scrollDelta}px)`); // Force repaint

    this.adapter_.computeScrollAreaClientRect();
    requestAnimationFrame(() => {
      this.adapter_.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
      this.adapter_.setScrollContentStyleProperty('transform', 'none');
    });
    this.isAnimating_ = true;
  }
  /**
   * Stops scroll animation
   * @private
   */


  stopScrollAnimation_() {
    this.isAnimating_ = false;
    const currentScrollPosition = this.getAnimatingScrollPosition_();
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
    this.adapter_.setScrollContentStyleProperty('transform', 'translateX(0px)');
    this.adapter_.setScrollAreaScrollLeft(currentScrollPosition);
  }
  /**
   * Gets the current scroll position during animation
   * @return {number}
   * @private
   */


  getAnimatingScrollPosition_() {
    const currentTranslateX = this.calculateCurrentTranslateX_();
    const scrollLeft = this.adapter_.getScrollAreaScrollLeft();

    if (this.isRTL_()) {
      return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
    }

    return scrollLeft - currentTranslateX;
  }
  /**
   * Determines the RTL Scroller to use
   * @return {!MDCTabScrollerRTL}
   * @private
   */


  rtlScrollerFactory_() {
    // Browsers have three different implementations of scrollLeft in RTL mode,
    // dependent on the browser. The behavior is based off the max LTR
    // scrollleft value and 0.
    //
    // * Default scrolling in RTL *
    //    - Left-most value: 0
    //    - Right-most value: Max LTR scrollLeft value
    //
    // * Negative scrolling in RTL *
    //    - Left-most value: Negated max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // * Reverse scrolling in RTL *
    //    - Left-most value: Max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // We use those principles below to determine which RTL scrollLeft
    // behavior is implemented in the current browser.
    const initialScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft - 1);
    const newScrollLeft = this.adapter_.getScrollAreaScrollLeft(); // If the newScrollLeft value is negative,then we know that the browser has
    // implemented negative RTL scrolling, since all other implementations have
    // only positive values.

    if (newScrollLeft < 0) {
      // Undo the scrollLeft test check
      this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);
      return new MDCTabScrollerRTLNegative(this.adapter_);
    }

    const rootClientRect = this.adapter_.computeScrollAreaClientRect();
    const contentClientRect = this.adapter_.computeScrollContentClientRect();
    const rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right); // Undo the scrollLeft test check

    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft); // By calculating the clientRect of the root element and the clientRect of
    // the content element, we can determine how much the scroll value changed
    // when we performed the scrollLeft subtraction above.

    if (rightEdgeDelta === newScrollLeft) {
      return new MDCTabScrollerRTLReverse(this.adapter_);
    }

    return new MDCTabScrollerRTLDefault(this.adapter_);
  }
  /**
   * @return {boolean}
   * @private
   */


  isRTL_() {
    return this.adapter_.getScrollContentStyleValue('direction') === 'rtl';
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
 * Stores result from computeHorizontalScrollbarHeight to avoid redundant processing.
 * @private {number|undefined}
 */

let horizontalScrollbarHeight_;
/**
 * Computes the height of browser-rendered horizontal scrollbars using a self-created test element.
 * May return 0 (e.g. on OS X browsers under default configuration).
 * @param {!Document} documentObj
 * @param {boolean=} shouldCacheResult
 * @return {number}
 */

function computeHorizontalScrollbarHeight(documentObj, shouldCacheResult = true) {
  if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== 'undefined') {
    return horizontalScrollbarHeight_;
  }

  const el = documentObj.createElement('div');
  el.classList.add(cssClasses$2.SCROLL_TEST);
  documentObj.body.appendChild(el);
  const horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
  documentObj.body.removeChild(el);

  if (shouldCacheResult) {
    horizontalScrollbarHeight_ = horizontalScrollbarHeight;
  }

  return horizontalScrollbarHeight;
}
/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */


function getMatchesProperty(HTMLElementPrototype) {
  return ['msMatchesSelector', 'matches'].filter(p$$1 => p$$1 in HTMLElementPrototype).pop();
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
 * @extends {MDCComponent<!MDCTabScrollerFoundation>}
 * @final
 */

class MDCTabScroller extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCTabScroller}
   */
  static attachTo(root) {
    return new MDCTabScroller(root);
  }

  constructor(...args) {
    super(...args);
    /** @private {?Element} */

    this.content_;
    /** @private {?Element} */

    this.area_;
    /** @private {?function(?Event): undefined} */

    this.handleInteraction_;
    /** @private {?function(!Event): undefined} */

    this.handleTransitionEnd_;
  }

  initialize() {
    this.area_ = this.root_.querySelector(MDCTabScrollerFoundation.strings.AREA_SELECTOR);
    this.content_ = this.root_.querySelector(MDCTabScrollerFoundation.strings.CONTENT_SELECTOR);
  }

  initialSyncWithDOM() {
    this.handleInteraction_ = () => this.foundation_.handleInteraction();

    this.handleTransitionEnd_ = evt => this.foundation_.handleTransitionEnd(evt);

    this.area_.addEventListener('wheel', this.handleInteraction_);
    this.area_.addEventListener('touchstart', this.handleInteraction_);
    this.area_.addEventListener('pointerdown', this.handleInteraction_);
    this.area_.addEventListener('mousedown', this.handleInteraction_);
    this.area_.addEventListener('keydown', this.handleInteraction_);
    this.content_.addEventListener('transitionend', this.handleTransitionEnd_);
  }

  destroy() {
    super.destroy();
    this.area_.removeEventListener('wheel', this.handleInteraction_);
    this.area_.removeEventListener('touchstart', this.handleInteraction_);
    this.area_.removeEventListener('pointerdown', this.handleInteraction_);
    this.area_.removeEventListener('mousedown', this.handleInteraction_);
    this.area_.removeEventListener('keydown', this.handleInteraction_);
    this.content_.removeEventListener('transitionend', this.handleTransitionEnd_);
  }
  /**
   * @return {!MDCTabScrollerFoundation}
   */


  getDefaultFoundation() {
    const adapter =
    /** @type {!MDCTabScrollerAdapter} */
    {
      eventTargetMatchesSelector: (evtTarget, selector) => {
        const MATCHES = getMatchesProperty(HTMLElement.prototype);
        return evtTarget[MATCHES](selector);
      },
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      addScrollAreaClass: className => this.area_.classList.add(className),
      setScrollAreaStyleProperty: (prop, value) => this.area_.style.setProperty(prop, value),
      setScrollContentStyleProperty: (prop, value) => this.content_.style.setProperty(prop, value),
      getScrollContentStyleValue: propName => window.getComputedStyle(this.content_).getPropertyValue(propName),
      setScrollAreaScrollLeft: scrollX => this.area_.scrollLeft = scrollX,
      getScrollAreaScrollLeft: () => this.area_.scrollLeft,
      getScrollContentOffsetWidth: () => this.content_.offsetWidth,
      getScrollAreaOffsetWidth: () => this.area_.offsetWidth,
      computeScrollAreaClientRect: () => this.area_.getBoundingClientRect(),
      computeScrollContentClientRect: () => this.content_.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () => computeHorizontalScrollbarHeight(document)
    };
    return new MDCTabScrollerFoundation(adapter);
  }
  /**
   * Returns the current visual scroll position
   * @return {number}
   */


  getScrollPosition() {
    return this.foundation_.getScrollPosition();
  }
  /**
   * Returns the width of the scroll content
   * @return {number}
   */


  getScrollContentWidth() {
    return this.content_.offsetWidth;
  }
  /**
   * Increments the scroll value by the given amount
   * @param {number} scrollXIncrement The pixel value by which to increment the scroll value
   */


  incrementScroll(scrollXIncrement) {
    this.foundation_.incrementScroll(scrollXIncrement);
  }
  /**
   * Scrolls to the given pixel position
   * @param {number} scrollX The pixel value to scroll to
   */


  scrollTo(scrollX) {
    this.foundation_.scrollTo(scrollX);
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
const strings$3 = {
  TAB_ACTIVATED_EVENT: 'MDCTabBar:activated',
  TAB_SCROLLER_SELECTOR: '.mdc-tab-scroller',
  TAB_SELECTOR: '.mdc-tab',
  ARROW_LEFT_KEY: 'ArrowLeft',
  ARROW_RIGHT_KEY: 'ArrowRight',
  END_KEY: 'End',
  HOME_KEY: 'Home',
  ENTER_KEY: 'Enter',
  SPACE_KEY: 'Space'
};
/** @enum {number} */

const numbers = {
  EXTRA_SCROLL_AMOUNT: 20,
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  HOME_KEYCODE: 36,
  ENTER_KEYCODE: 13,
  SPACE_KEYCODE: 32
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
/* eslint-enable no-unused-vars */

/**
 * @type {Set<string>}
 */

const ACCEPTABLE_KEYS = new Set(); // IE11 has no support for new Set with iterable so we need to initialize this by hand

ACCEPTABLE_KEYS.add(strings$3.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(strings$3.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(strings$3.END_KEY);
ACCEPTABLE_KEYS.add(strings$3.HOME_KEY);
ACCEPTABLE_KEYS.add(strings$3.ENTER_KEY);
ACCEPTABLE_KEYS.add(strings$3.SPACE_KEY);
/**
 * @type {Map<number, string>}
 */

const KEYCODE_MAP = new Map(); // IE11 has no support for new Map with iterable so we need to initialize this by hand

KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, strings$3.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, strings$3.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers.END_KEYCODE, strings$3.END_KEY);
KEYCODE_MAP.set(numbers.HOME_KEYCODE, strings$3.HOME_KEY);
KEYCODE_MAP.set(numbers.ENTER_KEYCODE, strings$3.ENTER_KEY);
KEYCODE_MAP.set(numbers.SPACE_KEYCODE, strings$3.SPACE_KEY);
/**
 * @extends {MDCFoundation<!MDCTabBarAdapter>}
 * @final
 */

class MDCTabBarFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$3;
  }
  /** @return enum {number} */


  static get numbers() {
    return numbers;
  }
  /**
   * @see MDCTabBarAdapter for typing information
   * @return {!MDCTabBarAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTabBarAdapter} */
      {
        scrollTo: () => {},
        incrementScroll: () => {},
        getScrollPosition: () => {},
        getScrollContentWidth: () => {},
        getOffsetWidth: () => {},
        isRTL: () => {},
        setActiveTab: () => {},
        activateTabAtIndex: () => {},
        deactivateTabAtIndex: () => {},
        focusTabAtIndex: () => {},
        getTabIndicatorClientRectAtIndex: () => {},
        getTabDimensionsAtIndex: () => {},
        getPreviousActiveTabIndex: () => {},
        getFocusedTabIndex: () => {},
        getIndexOfTab: () => {},
        getTabListLength: () => {},
        notifyTabActivated: () => {}
      }
    );
  }
  /**
   * @param {!MDCTabBarAdapter} adapter
   * */


  constructor(adapter) {
    super(Object.assign(MDCTabBarFoundation.defaultAdapter, adapter));
    /** @private {boolean} */

    this.useAutomaticActivation_ = false;
  }
  /**
   * Switches between automatic and manual activation modes.
   * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
   * @param {boolean} useAutomaticActivation
   */


  setUseAutomaticActivation(useAutomaticActivation) {
    this.useAutomaticActivation_ = useAutomaticActivation;
  }
  /**
   * Activates the tab at the given index
   * @param {number} index
   */


  activateTab(index) {
    const previousActiveIndex = this.adapter_.getPreviousActiveTabIndex();

    if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
      return;
    }

    this.adapter_.deactivateTabAtIndex(previousActiveIndex);
    this.adapter_.activateTabAtIndex(index, this.adapter_.getTabIndicatorClientRectAtIndex(previousActiveIndex));
    this.scrollIntoView(index);
    this.adapter_.notifyTabActivated(index);
  }
  /**
   * Handles the keydown event
   * @param {!Event} evt
   */


  handleKeyDown(evt) {
    // Get the key from the event
    const key = this.getKeyFromEvent_(evt); // Early exit if the event key isn't one of the keyboard navigation keys

    if (key === undefined) {
      return;
    } // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple


    if (!this.isActivationKey_(key)) {
      evt.preventDefault();
    }

    if (this.useAutomaticActivation_) {
      if (this.isActivationKey_(key)) {
        return;
      }

      const index = this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(), key);
      this.adapter_.setActiveTab(index);
      this.scrollIntoView(index);
    } else {
      const focusedTabIndex = this.adapter_.getFocusedTabIndex();

      if (this.isActivationKey_(key)) {
        this.adapter_.setActiveTab(focusedTabIndex);
      } else {
        const index = this.determineTargetFromKey_(focusedTabIndex, key);
        this.adapter_.focusTabAtIndex(index);
        this.scrollIntoView(index);
      }
    }
  }
  /**
   * Handles the MDCTab:interacted event
   * @param {!Event} evt
   */


  handleTabInteraction(evt) {
    this.adapter_.setActiveTab(this.adapter_.getIndexOfTab(evt.detail.tab));
  }
  /**
   * Scrolls the tab at the given index into view
   * @param {number} index The tab index to make visible
   */


  scrollIntoView(index) {
    // Early exit if the index is out of range
    if (!this.indexIsInRange_(index)) {
      return;
    } // Always scroll to 0 if scrolling to the 0th index


    if (index === 0) {
      return this.adapter_.scrollTo(0);
    } // Always scroll to the max value if scrolling to the Nth index
    // MDCTabScroller.scrollTo() will never scroll past the max possible value


    if (index === this.adapter_.getTabListLength() - 1) {
      return this.adapter_.scrollTo(this.adapter_.getScrollContentWidth());
    }

    if (this.isRTL_()) {
      return this.scrollIntoViewRTL_(index);
    }

    this.scrollIntoView_(index);
  }
  /**
   * Private method for determining the index of the destination tab based on what key was pressed
   * @param {number} origin The original index from which to determine the destination
   * @param {string} key The name of the key
   * @return {number}
   * @private
   */


  determineTargetFromKey_(origin, key) {
    const isRTL = this.isRTL_();
    const maxIndex = this.adapter_.getTabListLength() - 1;
    const shouldGoToEnd = key === strings$3.END_KEY;
    const shouldDecrement = key === strings$3.ARROW_LEFT_KEY && !isRTL || key === strings$3.ARROW_RIGHT_KEY && isRTL;
    const shouldIncrement = key === strings$3.ARROW_RIGHT_KEY && !isRTL || key === strings$3.ARROW_LEFT_KEY && isRTL;
    let index = origin;

    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }

    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    return index;
  }
  /**
   * Calculates the scroll increment that will make the tab at the given index visible
   * @param {number} index The index of the tab
   * @param {number} nextIndex The index of the next tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the Tab Bar
   * @return {number}
   * @private
   */


  calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth) {
    const nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    const relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
    const relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
    const leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
    const rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }

    return Math.max(rightIncrement, 0);
  }
  /**
   * Calculates the scroll increment that will make the tab at the given index visible in RTL
   * @param {number} index The index of the tab
   * @param {number} nextIndex The index of the next tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the Tab Bar
   * @param {number} scrollContentWidth The width of the scroll content
   * @return {number}
   * @private
   */


  calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
    const nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    const relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
    const relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
    const leftIncrement = relativeContentRight + numbers.EXTRA_SCROLL_AMOUNT;
    const rightIncrement = relativeContentLeft - numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex > index) {
      return Math.max(leftIncrement, 0);
    }

    return Math.min(rightIncrement, 0);
  }
  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar
   * @param {number} index The index of the tab
   * @param {!MDCTabDimensions} tabDimensions The dimensions of the tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the tab bar
   * @return {number}
   * @private
   */


  findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth) {
    /**
     * Tabs are laid out in the Tab Scroller like this:
     *
     *    Scroll Position
     *    +---+
     *    |   |   Bar Width
     *    |   +-----------------------------------+
     *    |   |                                   |
     *    |   V                                   V
     *    |   +-----------------------------------+
     *    V   |             Tab Scroller          |
     *    +------------+--------------+-------------------+
     *    |    Tab     |      Tab     |        Tab        |
     *    +------------+--------------+-------------------+
     *        |                                   |
     *        +-----------------------------------+
     *
     * To determine the next adjacent index, we look at the Tab root left and
     * Tab root right, both relative to the scroll position. If the Tab root
     * left is less than 0, then we know it's out of view to the left. If the
     * Tab root right minus the bar width is greater than 0, we know the Tab is
     * out of view to the right. From there, we either increment or decrement
     * the index.
     */
    const relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    const relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
    const relativeRootDelta = relativeRootLeft + relativeRootRight;
    const leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    const rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;

    if (leftEdgeIsCloser) {
      return index - 1;
    }

    if (rightEdgeIsCloser) {
      return index + 1;
    }

    return -1;
  }
  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
   * @param {number} index The index of the tab
   * @param {!MDCTabDimensions} tabDimensions The dimensions of the tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the tab bar
   * @param {number} scrollContentWidth The width of the scroller content
   * @return {number}
   * @private
   */


  findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
    const rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
    const rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
    const rootDelta = rootLeft + rootRight;
    const leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
    const rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;

    if (leftEdgeIsCloser) {
      return index + 1;
    }

    if (rightEdgeIsCloser) {
      return index - 1;
    }

    return -1;
  }
  /**
   * Returns the key associated with a keydown event
   * @param {!Event} evt The keydown event
   * @return {string}
   * @private
   */


  getKeyFromEvent_(evt) {
    if (ACCEPTABLE_KEYS.has(evt.key)) {
      return evt.key;
    }

    return KEYCODE_MAP.get(evt.keyCode);
  }

  isActivationKey_(key) {
    return key === strings$3.SPACE_KEY || key === strings$3.ENTER_KEY;
  }
  /**
   * Returns whether a given index is inclusively between the ends
   * @param {number} index The index to test
   * @private
   */


  indexIsInRange_(index) {
    return index >= 0 && index < this.adapter_.getTabListLength();
  }
  /**
   * Returns the view's RTL property
   * @return {boolean}
   * @private
   */


  isRTL_() {
    return this.adapter_.isRTL();
  }
  /**
   * Scrolls the tab at the given index into view for left-to-right useragents
   * @param {number} index The index of the tab to scroll into view
   * @private
   */


  scrollIntoView_(index) {
    const scrollPosition = this.adapter_.getScrollPosition();
    const barWidth = this.adapter_.getOffsetWidth();
    const tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    const nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    const scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
    this.adapter_.incrementScroll(scrollIncrement);
  }
  /**
   * Scrolls the tab at the given index into view in RTL
   * @param {number} index The tab index to make visible
   * @private
   */


  scrollIntoViewRTL_(index) {
    const scrollPosition = this.adapter_.getScrollPosition();
    const barWidth = this.adapter_.getOffsetWidth();
    const tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    const scrollWidth = this.adapter_.getScrollContentWidth();
    const nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    const scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
    this.adapter_.incrementScroll(scrollIncrement);
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
 * @extends {MDCComponent<!MDCTabBarFoundation>}
 * @final
 */

class MDCTabBar extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {!Array<!MDCTab>} */

    this.tabList_;
    /** @type {(function(!Element): !MDCTab)} */

    this.tabFactory_;
    /** @private {?MDCTabScroller} */

    this.tabScroller_;
    /** @type {(function(!Element): !MDCTabScroller)} */

    this.tabScrollerFactory_;
    /** @private {?function(?Event): undefined} */

    this.handleTabInteraction_;
    /** @private {?function(?Event): undefined} */

    this.handleKeyDown_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCTabBar}
   */


  static attachTo(root) {
    return new MDCTabBar(root);
  }

  set useAutomaticActivation(useAutomaticActivation) {
    this.foundation_.setUseAutomaticActivation(useAutomaticActivation);
  }
  /**
   * @param {(function(!Element): !MDCTab)=} tabFactory A function which creates a new MDCTab
   * @param {(function(!Element): !MDCTabScroller)=} tabScrollerFactory A function which creates a new MDCTabScroller
   */


  initialize(tabFactory = el => new MDCTab(el), tabScrollerFactory = el => new MDCTabScroller(el)) {
    this.tabFactory_ = tabFactory;
    this.tabScrollerFactory_ = tabScrollerFactory;
    this.tabList_ = this.getTabElements_().map(el => this.tabFactory_(el));
    const tabScrollerElement = this.root_.querySelector(MDCTabBarFoundation.strings.TAB_SCROLLER_SELECTOR);

    if (tabScrollerElement) {
      this.tabScroller_ = this.tabScrollerFactory_(tabScrollerElement);
    }
  }

  initialSyncWithDOM() {
    this.handleTabInteraction_ = evt => this.foundation_.handleTabInteraction(evt);

    this.handleKeyDown_ = evt => this.foundation_.handleKeyDown(evt);

    this.root_.addEventListener(MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
    this.root_.addEventListener('keydown', this.handleKeyDown_);

    for (let i = 0; i < this.tabList_.length; i++) {
      if (this.tabList_[i].active) {
        this.scrollIntoView(i);
        break;
      }
    }
  }

  destroy() {
    super.destroy();
    this.root_.removeEventListener(MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
    this.root_.removeEventListener('keydown', this.handleKeyDown_);
    this.tabList_.forEach(tab => tab.destroy());
    this.tabScroller_.destroy();
  }
  /**
   * @return {!MDCTabBarFoundation}
   */


  getDefaultFoundation() {
    return new MDCTabBarFoundation(
    /** @type {!MDCTabBarAdapter} */
    {
      scrollTo: scrollX => this.tabScroller_.scrollTo(scrollX),
      incrementScroll: scrollXIncrement => this.tabScroller_.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller_.getScrollContentWidth(),
      getOffsetWidth: () => this.root_.offsetWidth,
      isRTL: () => window.getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      setActiveTab: index => this.foundation_.activateTab(index),
      activateTabAtIndex: (index, clientRect) => this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: index => this.tabList_[index].deactivate(),
      focusTabAtIndex: index => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: index => this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: index => this.tabList_[index].computeDimensions(),
      getPreviousActiveTabIndex: () => {
        for (let i = 0; i < this.tabList_.length; i++) {
          if (this.tabList_[i].active) {
            return i;
          }
        }

        return -1;
      },
      getFocusedTabIndex: () => {
        const tabElements = this.getTabElements_();
        const activeElement = document.activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTab: tabToFind => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
      notifyTabActivated: index => this.emit(MDCTabBarFoundation.strings.TAB_ACTIVATED_EVENT, {
        index
      }, true)
    });
  }
  /**
   * Activates the tab at the given index
   * @param {number} index The index of the tab
   */


  activateTab(index) {
    this.foundation_.activateTab(index);
  }
  /**
   * Scrolls the tab at the given index into view
   * @param {number} index THe index of the tab
   */


  scrollIntoView(index) {
    this.foundation_.scrollIntoView(index);
  }

  getTabElements_() {
    return [].slice.call(this.root_.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR));
  }

}

var tabBar = /*#__PURE__*/Object.freeze({
  MDCTabBar: MDCTabBar,
  MDCTabBarFoundation: MDCTabBarFoundation
});

var TabBar_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.TabBar = exports.Tab = exports.TabIcon = exports.TabLabel = void 0;

  var _get2 = _interopRequireDefault(require$$0);

  var _classCallCheck2 = _interopRequireDefault(require$$0$1);

  var _createClass2 = _interopRequireDefault(require$$1);

  var _possibleConstructorReturn2 = _interopRequireDefault(require$$2);

  var _getPrototypeOf2 = _interopRequireDefault(require$$3);

  var _inherits2 = _interopRequireDefault(require$$4);

  var _MaterialComponent5 = _interopRequireDefault(require$$5);

  var TabLabel =
  /*#__PURE__*/
  function (_MaterialComponent) {
    (0, _inherits2.default)(TabLabel, _MaterialComponent);

    function TabLabel() {
      var _this;

      (0, _classCallCheck2.default)(this, TabLabel);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabLabel).apply(this, arguments));
      _this.componentName = 'tab__text-label';
      _this.mdcProps = [];
      return _this;
    }

    (0, _createClass2.default)(TabLabel, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({}, props), props.children);
      }
    }]);
    return TabLabel;
  }(_MaterialComponent5.default);

  exports.TabLabel = TabLabel;

  var TabIcon =
  /*#__PURE__*/
  function (_MaterialComponent2) {
    (0, _inherits2.default)(TabIcon, _MaterialComponent2);

    function TabIcon() {
      var _this2;

      (0, _classCallCheck2.default)(this, TabIcon);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabIcon).apply(this, arguments));
      _this2.componentName = 'tab__icon';
      _this2.mdcProps = [];
      return _this2;
    }

    (0, _createClass2.default)(TabIcon, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("span", Object.assign({
          className: "material-icons"
        }, props), props.children);
      }
    }]);
    return TabIcon;
  }(_MaterialComponent5.default);

  exports.TabIcon = TabIcon;

  var Tab =
  /*#__PURE__*/
  function (_MaterialComponent3) {
    (0, _inherits2.default)(Tab, _MaterialComponent3);

    function Tab() {
      var _this3;

      (0, _classCallCheck2.default)(this, Tab);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tab).apply(this, arguments));
      _this3.componentName = 'tab';
      _this3.mdcProps = ['active'];
      _this3.mdcNotifyProps = ['active'];
      return _this3;
    }

    (0, _createClass2.default)(Tab, [{
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("button", Object.assign({
          class: "mdc-tab",
          role: "tab",
          "aria-selected": "true"
        }, props), (0, _preact.h)("span", {
          class: "mdc-tab__content"
        }, props.children), (0, _preact.h)("span", {
          class: "mdc-tab-indicator ".concat(props.active ? 'mdc-tab-indicator--active' : '')
        }, (0, _preact.h)("span", {
          class: "mdc-tab-indicator__content mdc-tab-indicator__content--underline"
        })), (0, _preact.h)("span", {
          class: "mdc-tab__ripple"
        }));
      }
    }]);
    return Tab;
  }(_MaterialComponent5.default);

  exports.Tab = Tab;

  var TabBar =
  /*#__PURE__*/
  function (_MaterialComponent4) {
    (0, _inherits2.default)(TabBar, _MaterialComponent4);

    function TabBar() {
      var _this4;

      (0, _classCallCheck2.default)(this, TabBar);
      _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabBar).apply(this, arguments));
      _this4.componentName = 'tab-bar';
      _this4.mdcProps = [];
      _this4.mdcNotifyProps = ['activeTabIndex'];
      return _this4;
    }

    (0, _createClass2.default)(TabBar, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        (0, _get2.default)((0, _getPrototypeOf2.default)(TabBar.prototype), "componentDidMount", this).call(this);

        if (this.control) {
          this.MDComponent = new tabBar.MDCTabBar(this.control);
        }

        this.afterComponentDidMount();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        (0, _get2.default)((0, _getPrototypeOf2.default)(TabBar.prototype), "componentWillUnmount", this).call(this);

        if (this.MDComponent) {
          this.MDComponent.destroy();
        }
      }
    }, {
      key: "materialDom",
      value: function materialDom(props) {
        return (0, _preact.h)("div", {
          class: "mdc-tab-bar",
          role: "tablist",
          ref: this.setControlRef
        }, (0, _preact.h)("div", {
          class: "mdc-tab-scroller"
        }, (0, _preact.h)("div", {
          class: "mdc-tab-scroller__scroll-area"
        }, (0, _preact.h)("div", {
          class: "mdc-tab-scroller__scroll-content"
        }, props.children))));
      }
    }]);
    return TabBar;
  }(_MaterialComponent5.default);

  exports.TabBar = TabBar;

  var default_1 =
  /*#__PURE__*/
  function (_TabBar) {
    (0, _inherits2.default)(default_1, _TabBar);

    function default_1() {
      (0, _classCallCheck2.default)(this, default_1);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
    }

    return default_1;
  }(TabBar);

  exports.default = default_1;
  default_1.Tab = Tab;
  default_1.TabLabel = TabLabel;
  default_1.TabIcon = TabIcon;
});
var TabBar = unwrapExports(TabBar_1);
var TabBar_2 = TabBar_1.TabBar;
var TabBar_3 = TabBar_1.Tab;
var TabBar_4 = TabBar_1.TabIcon;
var TabBar_5 = TabBar_1.TabLabel;

var css = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n/**\n * @license\n * Copyright 2018 Google Inc.\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n/**\n * @license\n * Copyright 2018 Google Inc.\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n.mdc-tab-bar {\n  width: 100%; }";
styleInject(css);

var css$1 = "/*!\n Material Components for the Web\n Copyright (c) 2018 Google Inc.\n License: MIT\n*/\n@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-tab {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: rgba(0, 0, 0, 0.54);\n  /* @alternate */\n  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  display: table-cell;\n  position: relative;\n  box-sizing: border-box;\n  min-width: 160px;\n  min-height: 48px;\n  padding: 0 24px;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  overflow: hidden;\n  vertical-align: middle; }\n  .mdc-tab .mdc-tab__icon {\n    color: rgba(0, 0, 0, 0.54);\n    /* @alternate */\n    color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n  .mdc-tab::before, .mdc-tab::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-tab::before {\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .mdc-tab.mdc-ripple-upgraded::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n            transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-tab.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n  .mdc-tab.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  .mdc-tab.mdc-ripple-upgraded--foreground-activation::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n            animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-tab.mdc-ripple-upgraded--foreground-deactivation::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n            animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-tab::before, .mdc-tab::after {\n    background-color: black; }\n  .mdc-tab:hover::before {\n    opacity: 0.04; }\n  .mdc-tab:not(.mdc-ripple-upgraded):focus::before, .mdc-tab.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-tab:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-tab:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  .mdc-tab.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  .mdc-tab::before, .mdc-tab::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-tab.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-tab:hover {\n    color: rgba(0, 0, 0, 0.87);\n    /* @alternate */\n    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n    .mdc-tab:hover .mdc-tab__icon {\n      color: rgba(0, 0, 0, 0.87);\n      /* @alternate */\n      color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-tab:focus {\n    outline: none; }\n  @media screen and (max-width: 600px) {\n    .mdc-tab {\n      min-width: 72px;\n      padding: 0 12px; } }\n  .mdc-tab__icon {\n    display: block;\n    margin: 0 auto;\n    width: 24px;\n    height: 24px; }\n    .mdc-tab-bar--icons-with-text .mdc-tab__icon {\n      margin-top: 4px; }\n  .mdc-tab__icon-text {\n    display: block;\n    margin: 0 auto; }\n  .mdc-tab__icon + .mdc-tab__icon-text {\n    padding-top: 6px; }\n\n.mdc-tab--active {\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-tab--active .mdc-tab__icon {\n    color: rgba(0, 0, 0, 0.87);\n    /* @alternate */\n    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-tab--active::before {\n    bottom: 0; }\n\n.mdc-tab__indicator {\n  background-color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  background-color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n  position: absolute;\n  bottom: 0;\n  height: 2px;\n  visibility: hidden;\n  left: 2px;\n  width: calc(100% - 4px); }\n\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab--active .mdc-tab__indicator,\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab:hover .mdc-tab__indicator,\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab:active .mdc-tab__indicator {\n  visibility: visible; }\n\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab:not(.mdc-tab--active):hover .mdc-tab__indicator {\n  opacity: .38; }\n\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab--active,\n.mdc-tab-bar:not(.mdc-tab-bar-upgraded) .mdc-tab:not(.mdc-tab--active):active .mdc-tab__indicator {\n  opacity: .87; }\n\n.mdc-tab-bar__indicator,\n.mdc-tab__indicator {\n  background-color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  background-color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n\n.mdc-tab-bar {\n  display: table;\n  position: relative;\n  height: 48px;\n  margin: 0 auto;\n  text-transform: uppercase; }\n\n.mdc-tab-bar__indicator {\n  background-color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  background-color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n  position: absolute;\n  bottom: 0;\n  height: 2px;\n  visibility: hidden;\n  left: 0;\n  width: 100%;\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n  transition: -webkit-transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  will-change: transform; }\n\n.mdc-tab-bar--icons-with-text {\n  height: 72px; }\n\n.mdc-tab-bar-scroller {\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  width: 100%;\n  background-color: inherit;\n  overflow: hidden; }\n  .mdc-tab-bar-scroller__scroll-frame {\n    display: flex;\n    position: relative;\n    flex: 1;\n    justify-content: flex-start;\n    overflow: hidden; }\n    .mdc-tab-bar-scroller__scroll-frame__tabs {\n      transition: -webkit-transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n      transition: transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n      transition: transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 240ms 0ms cubic-bezier(0, 0, 0.2, 1);\n      will-change: transform; }\n  .mdc-tab-bar-scroller__indicator {\n    color: rgba(0, 0, 0, 0.54);\n    /* @alternate */\n    color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 48px;\n    cursor: pointer;\n    visibility: hidden; }\n    .mdc-tab-bar-scroller__indicator:hover {\n      color: rgba(0, 0, 0, 0.87);\n      /* @alternate */\n      color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n    .mdc-tab-bar-scroller__indicator__inner {\n      color: inherit;\n      text-decoration: inherit;\n      cursor: inherit; }\n      .mdc-tab-bar-scroller__indicator__inner:focus {\n        outline-color: inherit; }\n      .mdc-tab-bar-scroller[dir=\"rtl\"] .mdc-tab-bar-scroller__indicator__inner,\n      [dir=\"rtl\"] .mdc-tab-bar-scroller .mdc-tab-bar-scroller__indicator__inner {\n        -webkit-transform: rotate(180deg);\n                transform: rotate(180deg); }\n    .mdc-tab-bar-scroller__indicator__inner:hover {\n      color: inherit; }\n  .mdc-tab-bar-scroller__indicator--enabled {\n    visibility: visible; }";
styleInject(css$1);

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
      _useState2 = _slicedToArray(_useState, 2),
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
      _useState2 = _slicedToArray(_useState, 2),
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

/* eslint-disable react/no-deprecated */

var MessageViewScroller = function MessageViewScroller(_ref) {
  var children = _ref.children;
  return h("div", {
    style: {
      transform: "rotate(180deg)",
      height: "85%",
      backgroundColor: "#edeff2",
      overflow: "scroll",
      width: "100%"
    }
  }, h("div", {
    style: {
      transform: "rotate(180deg)"
    }
  }, children));
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

/* eslint-disable no-shadow */

var MessagesDisplayer = function MessagesDisplayer(_ref) {
  var messages = _ref.messages,
      socket = _ref.socket,
      id = _ref.id,
      messageText = _ref.messageText,
      sendMessage = _ref.sendMessage,
      handleMessageChange = _ref.handleMessageChange;

  var _useMessageSorter = useMessageSorter(messages),
      sortedMessages = _useMessageSorter.sortedMessages;

  var _useMessageMapper = useMessagesMapper(sortedMessages),
      mappedMessages = _useMessageMapper.mappedMessages;

  return [h(MessageViewScroller, null, h(MessageCollectionView, {
    messages: mappedMessages
  })), h(MessageEditorDisplayer, {
    disabled: socket === null,
    id: id,
    message: messageText,
    sendMessage: sendMessage,
    onMessageChange: handleMessageChange
  })];
};

var css$2 = ".chip{\n    background-color: darkgrey;\n    color: white;\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n   line-height: 20px;\n}\n\n.media-height{\nheight: 100%;\n}\n\n\n.root{\n    padding: 3px;\n    margin-left: 5px;\n    margin-bottom: 5px;\n    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);\n}\n\n.tab-bar{\n    padding: 0;\n    width: 50%;\n    display: flex ;\n    justify-content: center;\n  \n    \n}";
styleInject(css$2);

var ChatUser = function ChatUser(_ref) {
  var name = _ref.name,
      targetName = _ref.targetName,
      socket = _ref.socket,
      errors = _ref.errors,
      messages = _ref.messages,
      handleMessageChange = _ref.handleMessageChange,
      messageText = _ref.messageText,
      sendMessage = _ref.sendMessage;
  return h("div", {
    className: "root",
    style: {
      height: "97%",
      width: "50%"
    }
  }, h(MessagesDisplayer, {
    errors: errors,
    socket: socket,
    messages: messages,
    handleMessageChange: handleMessageChange,
    messageText: messageText,
    sendMessage: sendMessage
  }));
};

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

var useSocketMessaging = function useSocketMessaging(_ref) {
  var socket = _ref.socket,
      targetName = _ref.targetName;

  var _useState = v(''),
      _useState2 = _slicedToArray(_useState, 2),
      messageText = _useState2[0],
      setMessageText = _useState2[1];

  var _useState3 = v(null),
      _useState4 = _slicedToArray(_useState3, 2),
      messageRecieved = _useState4[0],
      setMessageRecieved = _useState4[1];

  var _useState5 = v(null),
      _useState6 = _slicedToArray(_useState5, 2),
      messageSent = _useState6[0],
      setMessageSent = _useState6[1];

  var _useState7 = v(false),
      _useState8 = _slicedToArray(_useState7, 2),
      connected = _useState8[0],
      setConnected = _useState8[1];

  var _useState9 = v([]),
      _useState10 = _slicedToArray(_useState9, 2),
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

var useChatLog = function useChatLog(_ref) {
  var name = _ref.name,
      messageRecieved = _ref.messageRecieved,
      messageSent = _ref.messageSent;

  var _useState = v([]),
      _useState2 = _slicedToArray(_useState, 2),
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

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

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
var h$1 = m * 60;
var d = h$1 * 24;
var w = d * 7;
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

var ms = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
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

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

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

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

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


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
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
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
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

      const self = debug; // Set `diff` timestamp

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
      } // Apply any `formatters` transformations


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
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
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
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
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
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
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

var browser = createCommonjsModule(function (module, exports) {
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

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
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
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
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
    return typeof console === 'object' && console.log && console.log(...args);
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
    } catch (error) {// Swallow
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
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
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
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common(exports);
  const {
    formatters
  } = module.exports;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v$$1) {
    try {
      return JSON.stringify(v$$1);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };
});
var browser_1 = browser.log;
var browser_2 = browser.formatArgs;
var browser_3 = browser.save;
var browser_4 = browser.load;
var browser_5 = browser.useColors;
var browser_6 = browser.storage;
var browser_7 = browser.colors;

/**
 * Module dependencies.
 */

var debug = browser('socket.io-client:url');
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

function url(uri, loc) {
  var obj = uri; // default to window.location

  loc = loc || typeof location !== 'undefined' && location;
  if (null == uri) uri = loc.protocol + '//' + loc.host; // relative path support

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
    } // parse


    debug('parse %s', uri);
    obj = parseuri(uri);
  } // make sure we treat `localhost:80` and `localhost` equally


  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';
  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host; // define unique id

  obj.id = obj.protocol + '://' + host + ':' + obj.port; // define href

  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);
  return obj;
}

/**
 * Helpers.
 */
var s$1 = 1000;
var m$1 = s$1 * 60;
var h$2 = m$1 * 60;
var d$1 = h$2 * 24;
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

var ms$1 = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse$1(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong$1(val) : fmtShort$1(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
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

  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

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
      return n * h$2;

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
  return plural$1(ms, d$1, 'day') || plural$1(ms, h$2, 'hour') || plural$1(ms, m$1, 'minute') || plural$1(ms, s$1, 'second') || ms + ' ms';
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
    var hash = 0,
        i;

    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
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
      var self = debug; // set `diff` timestamp

      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr; // turn the `arguments` into a proper Array

      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      } // apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];

        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // apply env-specific formatting (colors, etc.)

      exports.formatArgs.call(self, args);
      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy; // env-specific initialization logic for debug instances

    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);
    return debug;
  }

  function destroy() {
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

var browser$1 = createCommonjsModule(function (module, exports) {
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
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
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
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */


  exports.formatters.j = function (v$$1) {
    try {
      return JSON.stringify(v$$1);
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
    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
    if (!useColors) return;
    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
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
    return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
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
    } catch (e) {}
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
    } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


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
var browser_1$1 = browser$1.log;
var browser_2$1 = browser$1.formatArgs;
var browser_3$1 = browser$1.save;
var browser_4$1 = browser$1.load;
var browser_5$1 = browser$1.useColors;
var browser_6$1 = browser$1.storage;
var browser_7$1 = browser$1.colors;

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


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
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


  Emitter.prototype.once = function (event, fn) {
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


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


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


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1),
        callbacks = this._callbacks['$' + event];

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


  Emitter.prototype.listeners = function (event) {
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


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
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

function init() {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray(b64) {
  if (!inited) {
    init();
  }

  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice


  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

  arr = new Arr(len * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
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
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);
  return parts.join('');
}

function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
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

  e = e << mLen | m;
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

Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
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

  return that;
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


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
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
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
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

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
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

  return that;
}

function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}
Buffer.isBuffer = isBuffer;

function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}

Buffer.compare = function compare(a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
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
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
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
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
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
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read$$1(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
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
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write$$1(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

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

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
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

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
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

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
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
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
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
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
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
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
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
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
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

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
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

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

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
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
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
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
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
    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
} // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually


function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}

function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
}

var isBuffer$1 = isBuf;
var withNativeBuffer = typeof Buffer === 'function' && typeof isBuffer === 'function';
var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

var isView = function (obj) {
  return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */


function isBuf(obj) {
  return withNativeBuffer && isBuffer(obj) || withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj));
}

/*global Blob,File*/

/**
 * Module requirements
 */

var toString$2 = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString$2.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' || typeof File !== 'undefined' && toString$2.call(File) === '[object FileConstructor]';
/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

var deconstructPacket = function (packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'

  return {
    packet: pack,
    buffers: buffers
  };
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuffer$1(data)) {
    var placeholder = {
      _placeholder: true,
      num: buffers.length
    };
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


var reconstructPacket = function (packet, buffers) {
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


var removeBlobs = function (data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj; // convert any blob

    if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
      pendingBlobs++; // async filereader

      var fileReader = new FileReader();

      fileReader.onload = function () {
        // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        } else {
          bloblessData = this.result;
        } // if nothing pending its callback time


        if (! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isarray(obj)) {
      // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuffer$1(obj)) {
      // and object
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
  var debug = browser$1('socket.io-parser');
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

  exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];
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

  Encoder.prototype.encode = function (obj, callback) {
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
    var str = '' + obj.type; // attachments if we have them

    if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
      str += obj.attachments + '-';
    } // if we have a namespace other than `/`
    // we append it followed by a comma `,`


    if (obj.nsp && '/' !== obj.nsp) {
      str += obj.nsp + ',';
    } // immediately followed by the id


    if (null != obj.id) {
      str += obj.id;
    } // json data


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
    } catch (e) {
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

  Decoder.prototype.add = function (obj) {
    var packet;

    if (typeof obj === 'string') {
      packet = decodeString(obj);

      if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

        if (this.reconstructor.reconPack.attachments === 0) {
          this.emit('decoded', packet);
        }
      } else {
        // non-binary full packet
        this.emit('decoded', packet);
      }
    } else if (isBuffer$1(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error('got binary data when not reconstructing a packet');
      } else {
        packet = this.reconstructor.takeBinaryData(obj);

        if (packet) {
          // received final buffer
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
    var i = 0; // look up type

    var p$$1 = {
      type: Number(str.charAt(0))
    };

    if (null == exports.types[p$$1.type]) {
      return error('unknown packet type ' + p$$1.type);
    } // look up attachments if type binary


    if (exports.BINARY_EVENT === p$$1.type || exports.BINARY_ACK === p$$1.type) {
      var buf = '';

      while (str.charAt(++i) !== '-') {
        buf += str.charAt(i);
        if (i == str.length) break;
      }

      if (buf != Number(buf) || str.charAt(i) !== '-') {
        throw new Error('Illegal attachments');
      }

      p$$1.attachments = Number(buf);
    } // look up namespace (if any)


    if ('/' === str.charAt(i + 1)) {
      p$$1.nsp = '';

      while (++i) {
        var c = str.charAt(i);
        if (',' === c) break;
        p$$1.nsp += c;
        if (i === str.length) break;
      }
    } else {
      p$$1.nsp = '/';
    } // look up id


    var next = str.charAt(i + 1);

    if ('' !== next && Number(next) == next) {
      p$$1.id = '';

      while (++i) {
        var c = str.charAt(i);

        if (null == c || Number(c) != c) {
          --i;
          break;
        }

        p$$1.id += str.charAt(i);
        if (i === str.length) break;
      }

      p$$1.id = Number(p$$1.id);
    } // look up json data


    if (str.charAt(++i)) {
      var payload = tryParse(str.substr(i));
      var isPayloadValid = payload !== false && (p$$1.type === exports.ERROR || isarray(payload));

      if (isPayloadValid) {
        p$$1.data = payload;
      } else {
        return error('invalid payload');
      }
    }

    debug('decoded %s as %j', str, p$$1);
    return p$$1;
  }

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  /**
   * Deallocates a parser's resources
   *
   * @api public
   */


  Decoder.prototype.destroy = function () {
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


  BinaryReconstructor.prototype.takeBinaryData = function (binData) {
    this.buffers.push(binData);

    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
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


  BinaryReconstructor.prototype.finishedReconstruction = function () {
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
    module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    module.exports = false;
  }
});

var xmlhttprequest = function (opts) {
  var xdomain = opts.xdomain; // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

  var xscheme = opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217

  var enablesXDR = opts.enablesXDR; // XMLHttpRequest can be disabled on IE

  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
      return new XMLHttpRequest();
    }
  } catch (e) {} // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example


  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) {}
  }
};

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */
var keys = Object.keys || function keys(obj) {
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
var withNativeBlob$1 = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString$4.call(Blob) === '[object BlobConstructor]';
var withNativeFile$1 = typeof File === 'function' || typeof File !== 'undefined' && toString$4.call(File) === '[object FileConstructor]';
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

function hasBinary(obj) {
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

  if (typeof Buffer === 'function' && isBuffer && isBuffer(obj) || typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob$1 && obj instanceof Blob || withNativeFile$1 && obj instanceof File) {
    return true;
  } // see: https://github.com/Automattic/has-binary/pull/4


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
var arraybuffer_slice = function (arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) {
    return arraybuffer.slice(start, end);
  }

  if (start < 0) {
    start += bytes;
  }

  if (end < 0) {
    end += bytes;
  }

  if (end > bytes) {
    end = bytes;
  }

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
  err_cb = err_cb || noop;
  proxy.count = count;
  return count === 0 ? callback() : proxy;

  function proxy(err, result) {
    if (proxy.count <= 0) {
      throw new Error('after called too many times');
    }

    --proxy.count; // after first error, rest are passed to err_cb

    if (err) {
      bail = true;
      callback(err); // future error callbacks will go to error handler

      callback = err_cb;
    } else if (proxy.count === 0 && !bail) {
      callback(null, result);
    }
  }
}

function noop() {}

/*! https://mths.be/utf8js v2.1.2 by @mathias */
var stringFromCharCode = String.fromCharCode; // Taken from https://mths.be/punycode

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

      if ((extra & 0xFC00) == 0xDC00) {
        // low surrogate
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
} // Taken from https://mths.be/punycode


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
      throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
    }

    return false;
  }

  return true;
}
/*--------------------------------------------------------------------------*/


function createByte(codePoint, shift) {
  return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
}

function encodeCodePoint(codePoint, strict) {
  if ((codePoint & 0xFFFFFF80) == 0) {
    // 1-byte sequence
    return stringFromCharCode(codePoint);
  }

  var symbol = '';

  if ((codePoint & 0xFFFFF800) == 0) {
    // 2-byte sequence
    symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
  } else if ((codePoint & 0xFFFF0000) == 0) {
    // 3-byte sequence
    if (!checkScalarValue(codePoint, strict)) {
      codePoint = 0xFFFD;
    }

    symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
    symbol += createByte(codePoint, 6);
  } else if ((codePoint & 0xFFE00000) == 0) {
    // 4-byte sequence
    symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
    symbol += createByte(codePoint, 12);
    symbol += createByte(codePoint, 6);
  }

  symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
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
  } // If we end up here, it’s not a continuation byte


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
  } // Read first byte


  byte1 = byteArray[byteIndex] & 0xFF;
  byteIndex++; // 1-byte sequence (no continuation bytes)

  if ((byte1 & 0x80) == 0) {
    return byte1;
  } // 2-byte sequence


  if ((byte1 & 0xE0) == 0xC0) {
    byte2 = readContinuationByte();
    codePoint = (byte1 & 0x1F) << 6 | byte2;

    if (codePoint >= 0x80) {
      return codePoint;
    } else {
      throw Error('Invalid continuation byte');
    }
  } // 3-byte sequence (may include unpaired surrogates)


  if ((byte1 & 0xF0) == 0xE0) {
    byte2 = readContinuationByte();
    byte3 = readContinuationByte();
    codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;

    if (codePoint >= 0x0800) {
      return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
    } else {
      throw Error('Invalid continuation byte');
    }
  } // 4-byte sequence


  if ((byte1 & 0xF8) == 0xF0) {
    byte2 = readContinuationByte();
    byte3 = readContinuationByte();
    byte4 = readContinuationByte();
    codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;

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
  (function () {

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // Use a lookup table to find the index.

    var lookup = new Uint8Array(256);

    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p$$1 = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;

        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p$$1++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p$$1++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p$$1++] = (encoded3 & 3) << 6 | encoded4 & 63;
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
var BlobBuilder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof WebKitBlobBuilder !== 'undefined' ? WebKitBlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : false;
/**
 * Check if Blob constructor is supported
 */

var blobSupported = function () {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch (e) {
    return false;
  }
}();
/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */


var blobSupportsArrayBufferView = blobSupported && function () {
  try {
    var b = new Blob([new Uint8Array([1, 2])]);
    return b.size === 2;
  } catch (e) {
    return false;
  }
}();
/**
 * Check if BlobBuilder is supported
 */


var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  return ary.map(function (chunk) {
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer; // if this is a subarray, make a copy so we only
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
  mapArrayBufferViews(ary).forEach(function (part) {
    bb.append(part);
  });
  return options.type ? bb.getBlob(options.type) : bb.getBlob();
}

function BlobConstructor(ary, options) {
  return new Blob(mapArrayBufferViews(ary), options || {});
}

if (typeof Blob !== 'undefined') {
  BlobBuilderConstructor.prototype = Blob.prototype;
  BlobConstructor.prototype = Blob.prototype;
}

var blob = function () {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
}();

var browser$2 = createCommonjsModule(function (module, exports) {
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
    open: 0 // non-ws
    ,
    close: 1 // non-ws
    ,
    ping: 2,
    pong: 3,
    message: 4,
    upgrade: 5,
    noop: 6
  };
  var packetslist = keys(packets);
  /**
   * Premade error packet.
   */

  var err = {
    type: 'error',
    data: 'parser error'
  };
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

    var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

    if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
      return encodeArrayBuffer(packet, supportsBinary, callback);
    } else if (typeof blob !== 'undefined' && data instanceof blob) {
      return encodeBlob(packet, supportsBinary, callback);
    } // might be an object with { base64: true, data: dataAsBase64String }


    if (data && data.base64) {
      return encodeBase64Object(packet, callback);
    } // Sending data as a utf-8 string


    var encoded = packets[packet.type]; // data fragment is optional

    if (undefined !== packet.data) {
      encoded += utf8encode ? utf8.encode(String(packet.data), {
        strict: false
      }) : String(packet.data);
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
      resultBuffer[i + 1] = contentArray[i];
    }

    return callback(resultBuffer.buffer);
  }

  function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    var fr = new FileReader();

    fr.onload = function () {
      exports.encodePacket({
        type: packet.type,
        data: fr.result
      }, supportsBinary, true, callback);
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


  exports.encodeBase64Packet = function (packet, callback) {
    var message = 'b' + exports.packets[packet.type];

    if (typeof blob !== 'undefined' && packet.data instanceof blob) {
      var fr = new FileReader();

      fr.onload = function () {
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
    } // String data


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
        return {
          type: packetslist[type],
          data: data.substring(1)
        };
      } else {
        return {
          type: packetslist[type]
        };
      }
    }

    var asArray = new Uint8Array(data);
    var type = asArray[0];
    var rest = arraybuffer_slice(data, 1);

    if (blob && binaryType === 'blob') {
      rest = new blob([rest]);
    }

    return {
      type: packetslist[type],
      data: rest
    };
  };

  function tryDecode(data) {
    try {
      data = utf8.decode(data, {
        strict: false
      });
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


  exports.decodeBase64Packet = function (msg, binaryType) {
    var type = packetslist[msg.charAt(0)];

    if (!base64encoder) {
      return {
        type: type,
        data: {
          base64: true,
          data: msg.substr(1)
        }
      };
    }

    var data = base64encoder.decode(msg.substr(1));

    if (binaryType === 'blob' && blob) {
      data = new blob([data]);
    }

    return {
      type: type,
      data: data
    };
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
      exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function (message) {
        doneCallback(null, setLengthHeader(message));
      });
    }

    map(packets, encodeOne, function (err, results) {
      return callback(results.join(''));
    });
  };
  /**
   * Async array map using after
   */


  function map(ary, each, done) {
    var result = new Array(ary.length);
    var next = after_1(ary.length, done);

    var eachWithIndex = function (i, el, cb) {
      each(el, function (error, msg) {
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

    var length = '',
        n,
        msg;

    for (var i = 0, l = data.length; i < l; i++) {
      var chr = data.charAt(i);

      if (chr !== ':') {
        length += chr;
        continue;
      }

      if (length === '' || length != (n = Number(length))) {
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
      } // advance cursor


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


  exports.encodePayloadAsArrayBuffer = function (packets, callback) {
    if (!packets.length) {
      return callback(new ArrayBuffer(0));
    }

    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, true, true, function (data) {
        return doneCallback(null, data);
      });
    }

    map(packets, encodeOne, function (err, encodedPackets) {
      var totalLength = encodedPackets.reduce(function (acc, p$$1) {
        var len;

        if (typeof p$$1 === 'string') {
          len = p$$1.length;
        } else {
          len = p$$1.byteLength;
        }

        return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
      }, 0);
      var resultArray = new Uint8Array(totalLength);
      var bufferIndex = 0;
      encodedPackets.forEach(function (p$$1) {
        var isString = typeof p$$1 === 'string';
        var ab = p$$1;

        if (isString) {
          var view = new Uint8Array(p$$1.length);

          for (var i = 0; i < p$$1.length; i++) {
            view[i] = p$$1.charCodeAt(i);
          }

          ab = view.buffer;
        }

        if (isString) {
          // not true binary
          resultArray[bufferIndex++] = 0;
        } else {
          // true binary
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


  exports.encodePayloadAsBlob = function (packets, callback) {
    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, true, true, function (encoded) {
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

        var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;
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

    map(packets, encodeOne, function (err, results) {
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

      for (var i = 1;; i++) {
        if (tailArray[i] === 255) break; // 310 = char length of Number.MAX_VALUE

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
    buffers.forEach(function (buffer, i) {
      callback(exports.decodePacket(buffer, binaryType, true), i, total);
    });
  };
});
var browser_1$2 = browser$2.protocol;
var browser_2$2 = browser$2.packets;
var browser_3$2 = browser$2.encodePacket;
var browser_4$2 = browser$2.encodeBase64Packet;
var browser_5$2 = browser$2.decodePacket;
var browser_6$2 = browser$2.decodeBase64Packet;
var browser_7$2 = browser$2.encodePayload;
var browser_8 = browser$2.decodePayload;
var browser_9 = browser$2.encodePayloadAsArrayBuffer;
var browser_10 = browser$2.encodePayloadAsBlob;
var browser_11 = browser$2.decodePayloadAsBinary;

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

function Transport(opts) {
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
  this.withCredentials = opts.withCredentials; // SSL options for Node.js client

  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode; // results of ReactNative environment detection

  this.isReactNative = opts.isReactNative; // other options for Node.js client

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
  var packet = browser$2.decodePacket(data, this.socket.binaryType);
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


var decode = function (qs) {
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

var componentInherit = function (a, b) {
  var fn = function () {};

  fn.prototype = b.prototype;
  a.prototype = new fn();
  a.prototype.constructor = a;
};

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;
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
  return now + '.' + encode$1(seed++);
} //
// Map each character to its index.
//


for (; i < length; i++) map[alphabet[i]] = i; //
// Expose the `yeast`, `encode` and `decode` functions.
//


yeast.encode = encode$1;
yeast.decode = decode$1;
var yeast_1 = yeast;

/**
 * Module dependencies.
 */

var debug$2 = browser('engine.io-client:polling');
/**
 * Module exports.
 */

var polling = Polling;
/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = xmlhttprequest;
  var xhr = new XMLHttpRequest({
    xdomain: false
  });
  return null != xhr.responseType;
}();
/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */


function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;

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

  function pause() {
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
    } // if its a close packet, we close the ongoing requests


    if ('close' === packet.type) {
      self.onClose();
      return false;
    } // otherwise bypass onData and handle the message


    self.onPacket(packet);
  }; // decode payload


  browser$2.decodePayload(data, this.socket.binaryType, callback); // if an event did not trigger closing

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

  function close() {
    debug$2('writing close packet');
    self.write([{
      type: 'close'
    }]);
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

  browser$2.encodePayload(packets, this.supportsBinary, function (data) {
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
  var port = ''; // cache busting is forced

  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast_1();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query); // avoid port if default for schema

  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  } // prepend ? to query


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

var debug$3 = browser('engine.io-client:polling-xhr');
/**
 * Module exports.
 */

var pollingXhr = XHR;
var Request_1 = Request;
/**
 * Empty function
 */

function empty() {}
/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */


function XHR(opts) {
  polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port; // some user agents have empty `location.port`

    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = typeof location !== 'undefined' && opts.hostname !== location.hostname || port !== opts.port;
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
  opts.withCredentials = this.withCredentials; // SSL options for Node.js client

  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout; // other options for Node.js client

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
  var req = this.request({
    method: 'POST',
    data: data,
    isBinary: isBinary
  });
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


function Request(opts) {
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
  this.requestTimeout = opts.requestTimeout; // SSL options for Node.js client

  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client

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
  var opts = {
    agent: this.agent,
    xdomain: this.xd,
    xscheme: this.xs,
    enablesXDR: this.enablesXDR
  }; // SSL options for Node.js client

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
    } catch (e) {} // ie6 check


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
  } // xmlhttprequest


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

function unloadHandler() {
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

function empty$1() {}
/**
 * Until https://github.com/tc39/proposal-global is shipped.
 */


function glob() {
  return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};
}
/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */


function JSONPPolling(opts) {
  polling.call(this, opts);
  this.query = this.query || {}; // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution

  if (!callbacks) {
    // we need to consider multiple engines in the same page
    var global = glob();
    callbacks = global.___eio = global.___eio || [];
  } // callback identifier


  this.index = callbacks.length; // add callback to jsonp global

  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  }); // append to query string

  this.query.j = this.index; // prevent spurious errors from being emitted when the window is unloaded

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

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
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

  initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
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

var require$$1$1 = {};

/**
 * Module dependencies.
 */

var debug$4 = browser('engine.io-client:websocket');
var BrowserWebSocket, NodeWebSocket;

if (typeof WebSocket !== 'undefined') {
  BrowserWebSocket = WebSocket;
} else if (typeof self !== 'undefined') {
  BrowserWebSocket = self.WebSocket || self.MozWebSocket;
}

if (typeof window === 'undefined') {
  try {
    NodeWebSocket = require$$1$1;
  } catch (e) {}
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

function WS(opts) {
  var forceBase64 = opts && opts.forceBase64;

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
  }; // SSL options for Node.js client

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
    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? protocols ? new WebSocketImpl(uri, protocols) : new WebSocketImpl(uri) : new WebSocketImpl(uri, protocols, opts);
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
  this.writable = false; // encodePacket efficient as it uses WS framing
  // no need for encodePayload

  var total = packets.length;

  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      browser$2.encodePacket(packet, self.supportsBinary, function (data) {
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
        } // Sometimes the websocket has already been closed but the browser didn't
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

  function done() {
    self.emit('flush'); // fake drain
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
  var port = ''; // avoid port if default for schema

  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  } // append timestamp to URI


  if (this.timestampRequests) {
    query[this.timestampParam] = yeast_1();
  } // communicate binary support capabilities


  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query); // prepend ? to query

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

function polling$1(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port; // some user agents have empty `location.port`

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

var indexof = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

/**
 * Module dependencies.
 */

var debug$5 = browser('engine.io-client:socket');
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

function Socket(uri, opts) {
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

  this.secure = null != opts.secure ? opts.secure : typeof location !== 'undefined' && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (typeof location !== 'undefined' ? location.hostname : 'localhost');
  this.port = opts.port || (typeof location !== 'undefined' && location.port ? location.port : this.secure ? 443 : 80);
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
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;
  if (true === this.perMessageDeflate) this.perMessageDeflate = {};

  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  } // SSL options for Node.js client


  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode; // detect ReactNative environment

  this.isReactNative = typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative'; // other options for Node.js or ReactNative client

  if (typeof self === 'undefined' || this.isReactNative) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  } // set on handshake


  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null; // set on heartbeat

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

Socket.protocol = browser$2.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = transport;
Socket.transports = transports;
Socket.parser = browser$2;
/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug$5('creating transport "%s"', name);
  var query = clone(this.query); // append engine.io protocol identifier

  query.EIO = browser$2.protocol; // transport name

  query.transport = name; // per-transport options

  var options = this.transportOptions[name] || {}; // session id if we already have one

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
    protocols: options.protocols || void 0,
    isReactNative: this.isReactNative
  });
  return transport$$1;
};

function clone(obj) {
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

  this.readyState = 'opening'; // Retry with the next transport if the transport is disabled (jsonp: false)

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
  } // set up transport


  this.transport = transport$$1; // set up transport listeners

  transport$$1.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
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
  var transport$$1 = this.createTransport(name, {
    probe: 1
  });
  var failed = false;
  var self = this;
  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }

    if (failed) return;
    debug$5('probe transport "%s" opened', name);
    transport$$1.send([{
      type: 'ping',
      data: 'probe'
    }]);
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
          transport$$1.send([{
            type: 'upgrade'
          }]);
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

  function freezeTransport() {
    if (failed) return; // Any callback called by transport should be ignored since now

    failed = true;
    cleanup();
    transport$$1.close();
    transport$$1 = null;
  } // Handle any error that happens while probing


  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport$$1.name;
    freezeTransport();
    debug$5('probe transport "%s" failed because of error: %s', name, err);
    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  } // When the socket is closed while we're probing


  function onclose() {
    onerror('socket closed');
  } // When the socket is upgraded while we're probing


  function onupgrade(to) {
    if (transport$$1 && to.name !== transport$$1.name) {
      debug$5('"%s" works - aborting "%s"', to.name, transport$$1.name);
      freezeTransport();
    }
  } // Remove all listeners on the transport and on self


  function cleanup() {
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
  this.flush(); // we check for `readyState` in case an `open`
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
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug$5('socket receive: type "%s", data "%s"', packet.type, packet.data);
    this.emit('packet', packet); // Socket is live - any packet counts

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
  this.onOpen(); // In case open handler closes socket

  if ('closed' === this.readyState) return;
  this.setPing(); // Prolong liveness of socket on heartbeat

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
  }, timeout || self.pingInterval + self.pingTimeout);
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
  this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
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
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug$5('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
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


Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
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

  function close() {
    self.onClose('forced close');
    debug$5('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
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
    var self = this; // clear timers

    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport

    this.transport.removeAllListeners('close'); // ensure transport won't stay open

    this.transport.close(); // ignore further transport communication

    this.transport.removeAllListeners(); // set ready state

    this.readyState = 'closed'; // clear session id

    this.id = null; // emit close event

    this.emit('close', reason, desc); // clean buffers after, so users can still
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

var parser = browser$2;
lib.parser = parser;

var toArray_1 = toArray;

function toArray(list, index) {
  var array = [];
  index = index || 0;

  for (var i = index || 0; i < list.length; i++) {
    array[i - index] = list[i];
  }

  return array;
}

/**
 * Module exports.
 */
var on_1 = on;
/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
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

var componentBind = function (obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

var socket$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */
  var debug = browser('socket.io-client:socket');
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

  function Socket(io, nsp, opts) {
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
    this.subs = [on_1(io, 'open', componentBind(this, 'onopen')), on_1(io, 'packet', componentBind(this, 'onpacket')), on_1(io, 'close', componentBind(this, 'onclose'))];
  };
  /**
   * "Opens" the socket.
   *
   * @api public
   */


  Socket.prototype.open = Socket.prototype.connect = function () {
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
    packet.options.compress = !this.flags || false !== this.flags.compress; // event ack callback

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
    debug('transport is open - connecting'); // write connect packet if necessary

    if ('/' !== this.nsp) {
      if (this.query) {
        var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
        debug('sending connect packet with query %s', query);
        this.packet({
          type: socket_ioParser.CONNECT,
          query: query
        });
      } else {
        this.packet({
          type: socket_ioParser.CONNECT
        });
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


  Socket.prototype.close = Socket.prototype.disconnect = function () {
    if (this.connected) {
      debug('performing disconnect (%s)', this.nsp);
      this.packet({
        type: socket_ioParser.DISCONNECT
      });
    } // remove socket from pool


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


Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);

  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }

  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */


Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */


Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */


Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */


Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/**
 * Module dependencies.
 */

var debug$6 = browser('socket.io-client:manager');
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

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);

  if (uri && 'object' === typeof uri) {
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
  return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
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

Manager.prototype.reconnection = function (v$$1) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v$$1;
  return this;
};
/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */


Manager.prototype.reconnectionAttempts = function (v$$1) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v$$1;
  return this;
};
/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */


Manager.prototype.reconnectionDelay = function (v$$1) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v$$1;
  this.backoff && this.backoff.setMin(v$$1);
  return this;
};

Manager.prototype.randomizationFactor = function (v$$1) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v$$1;
  this.backoff && this.backoff.setJitter(v$$1);
  return this;
};
/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */


Manager.prototype.reconnectionDelayMax = function (v$$1) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v$$1;
  this.backoff && this.backoff.setMax(v$$1);
  return this;
};
/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */


Manager.prototype.timeout = function (v$$1) {
  if (!arguments.length) return this._timeout;
  this._timeout = v$$1;
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


Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug$6('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;
  debug$6('opening %s', this.uri);
  this.engine = lib(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false; // emit `open`

  var openSub = on_1(socket, 'open', function () {
    self.onopen();
    fn && fn();
  }); // emit `connect_error`

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
  }); // emit `connect_timeout`

  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug$6('connect attempt will timeout after %d', timeout); // set timer

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
  debug$6('open'); // clear old subs

  this.cleanup(); // mark as open

  this.readyState = 'open';
  this.emit('open'); // add new subs

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

  function onConnecting() {
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
  } else {
    // add packet to the queue
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


Manager.prototype.close = Manager.prototype.disconnect = function () {
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
      self.emitAll('reconnecting', self.backoff.attempts); // check again for the case socket closed in above events

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
  var debug = browser('socket.io-client');
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

  function lookup(uri, opts) {
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
    var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;
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

var useSocket = function useSocket(_ref) {
  var username = _ref.username,
      _ref$route = _ref.route,
      route = _ref$route === void 0 ? '/anonymous' : _ref$route,
      serverUrl = _ref.serverUrl;

  var _useState = v(null),
      _useState2 = _slicedToArray(_useState, 2),
      socket = _useState2[0],
      setSocket = _useState2[1];

  var _useState3 = v(false),
      _useState4 = _slicedToArray(_useState3, 2),
      connected = _useState4[0],
      setConnected = _useState4[1];

  var _useState5 = v(null),
      _useState6 = _slicedToArray(_useState5, 2),
      socketError = _useState6[0],
      setSocketError = _useState6[1];

  p(function () {
    function fetchToken() {
      var response, data;
      return _regeneratorRuntime.async(function fetchToken$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _regeneratorRuntime.awrap(fetch(route, {
                method: "POST",
                body: JSON.stringify({
                  username: username
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }));

            case 3:
              response = _context.sent;
              _context.next = 6;
              return _regeneratorRuntime.awrap(response.json());

            case 6:
              data = _context.sent;
              setSocket(lib$1(serverUrl, {
                query: "token=".concat(data.token)
              }));
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              setSocketError(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }

    fetchToken();
  }, []);
  p(function () {
    if (socket !== null) {
      socket.on("error", function (error) {
        setSocketError(error);
      });
      socket.on("connect", function () {
        setConnected(true);
      });
      socket.on("message", function () {});
    }
  }, [socket]);
  return {
    socket: socket,
    connected: connected,
    socketError: socketError
  };
};

var useSocketClient = function useSocketClient(_ref) {
  var name = _ref.name,
      targetName = _ref.targetName,
      route = _ref.route,
      serverUrl = _ref.serverUrl;

  var _useSocket = useSocket({
    username: name,
    route: route,
    serverUrl: serverUrl
  }),
      socket = _useSocket.socket,
      connected = _useSocket.connected,
      socketError = _useSocket.socketError;

  var _useSocketMessaging = useSocketMessaging({
    socket: socket,
    targetName: targetName
  }),
      errors = _useSocketMessaging.errors,
      handleMessageChange = _useSocketMessaging.handleMessageChange,
      messageRecieved = _useSocketMessaging.messageRecieved,
      messageSent = _useSocketMessaging.messageSent,
      messageText = _useSocketMessaging.messageText,
      sendMessage = _useSocketMessaging.sendMessage;

  var _useChatLog = useChatLog({
    name: name,
    messageRecieved: messageRecieved,
    messageSent: messageSent
  }),
      messages = _useChatLog.messages;

  return {
    messages: messages,
    messageRecieved: messageRecieved,
    messageSent: messageSent,
    messageText: messageText,
    sendMessage: sendMessage,
    errors: errors,
    connected: connected,
    handleMessageChange: handleMessageChange
  };
};

var ChatRoom = function ChatRoom() {
  var _useState = v(0),
      _useState2 = _slicedToArray(_useState, 2),
      msgForMario = _useState2[0],
      setMsgForMario = _useState2[1];

  var _useState3 = v(0),
      _useState4 = _slicedToArray(_useState3, 2),
      msgForDragos = _useState4[0],
      setMsgForDragos = _useState4[1];

  var _useState5 = v(0),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedItem = _useState6[0],
      setSelectedItem = _useState6[1];

  var _useSocketClient = useSocketClient({
    name: "mario",
    targetName: "dragos",
    serverUrl: "http://localhost:3000",
    route: '/anonymous'
  }),
      msgMario = _useSocketClient.messages,
      msgRecMario = _useSocketClient.messageRecieved,
      msgSntMario = _useSocketClient.messageSent,
      msgTxtMario = _useSocketClient.messageText,
      sendMsgMario = _useSocketClient.sendMessage,
      errMario = _useSocketClient.errors,
      cntMario = _useSocketClient.connected,
      hdleMessageChageMario = _useSocketClient.handleMessageChange,
      marioSocket = _useSocketClient.socket;

  var _useSocketClient2 = useSocketClient({
    name: "dragos",
    targetName: "mario",
    serverUrl: "http://localhost:3000",
    route: '/anonymous'
  }),
      msgDragos = _useSocketClient2.messages,
      msgRecDragos = _useSocketClient2.messageRecieved,
      msgSntDragos = _useSocketClient2.messageSent,
      msgTxtDragos = _useSocketClient2.messageText,
      sendMsgDragos = _useSocketClient2.sendMessage,
      errDragos = _useSocketClient2.errors,
      cntDragos = _useSocketClient2.connected,
      hdleMessageChageDragos = _useSocketClient2.handleMessageChange,
      dragosSocket = _useSocketClient2.socket;

  p(function () {
    if (msgForDragos !== null) setMsgForDragos(function (prevState) {
      return prevState + 1;
    });
  }, [msgRecDragos]);
  p(function () {
    if (msgForMario !== null) setMsgForMario(function (prevState) {
      return prevState + 1;
    });
  }, [msgRecMario]);
  p(function () {
    if (selectedItem === 0) {
      setMsgForMario(0);
    } else {
      setMsgForDragos(0);
    }
  }, [selectedItem]);
  return h("div", {
    style: {
      width: "100%",
      height: "100%"
    }
  }, h("div", {
    className: "tab-bar"
  }, h("div", null, h(TabBar, null, h(TabBar.Tab, {
    active: true,
    onClick: function onClick() {
      return setSelectedItem(0);
    }
  }, h(TabBar.TabLabel, null, h("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, h("div", {
    style: {
      color: cntMario ? "green" : "orange"
    }
  }, "mario"), h("div", {
    className: "chip",
    style: {
      backgroundColor: msgForMario > 0 ? "green" : "darkgrey"
    }
  }, msgForMario)))), h(TabBar.Tab, {
    onClick: function onClick() {
      return setSelectedItem(1);
    }
  }, h(TabBar.TabLabel, null, h("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, h("div", {
    style: {
      color: cntDragos ? "green" : "orange"
    }
  }, "dragos"), h("div", {
    className: "chip",
    style: {
      backgroundColor: msgForDragos > 0 ? "green" : "darkgrey"
    }
  }, msgForDragos))))))), selectedItem === 0 && h(ChatUser, {
    handleMessageChange: hdleMessageChageMario,
    connected: cntMario,
    errors: errMario,
    messageSent: msgSntMario,
    messageText: msgTxtMario,
    messages: msgMario,
    sendMessage: sendMsgMario,
    messageRecieved: msgRecMario,
    socket: dragosSocket,
    name: "mario",
    targetName: "dragos"
  }), selectedItem === 1 && h(ChatUser, {
    handleMessageChange: hdleMessageChageDragos,
    connected: cntDragos,
    errors: errDragos,
    messageSent: msgSntDragos,
    messageText: msgTxtDragos,
    messages: msgDragos,
    sendMessage: sendMsgDragos,
    messageRecieved: msgRecDragos,
    socket: dragosSocket,
    name: "dragos",
    targetName: "mario"
  }));
};

var SocketIOMessaging = function SocketIOMessaging() {
  return h(ChatRoom, null);
};

var WebRTCMessaging = function WebRTCMessaging() {
  return h("div", {
    style: {
      marginTop: 200
    }
  }, "WebRTC Messaging");
};

var WebRTCVideoChat = function WebRTCVideoChat() {
  return h("div", {
    style: {
      marginTop: 200
    }
  }, "WebRTCVideoChat");
};

export { SocketIOMessaging as a, WebRTCMessaging as b, WebRTCVideoChat as c };
