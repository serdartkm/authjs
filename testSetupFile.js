/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */

// eslint-disable-next-line import/no-extraneous-dependencies
import Enzyme from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-preact-pure';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });


global.MutationObserver = class {
    // eslint-disable-next-line no-empty-function
    constructor(callback) {}

    disconnect() {}

    observe(element, initObject) {}
};