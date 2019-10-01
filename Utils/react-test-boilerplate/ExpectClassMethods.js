
import WithRenderProp from './WithRenderProp'
import { isFunction } from 'util';

const ExpectClassMethods = (Component, classMethods, props, withRenderProp = true) => {

  let wrapper = WithRenderProp(Component, props, withRenderProp)
  describe(`ExpectClassMethods for ${Component.name}`, () => {
    classMethods.forEach(element => {
      it(`Class method ${element} is defined`, () => {
        expect(isFunction(wrapper.instance()[element])).toBe(true)
      })
    });

  })
}

export default ExpectClassMethods