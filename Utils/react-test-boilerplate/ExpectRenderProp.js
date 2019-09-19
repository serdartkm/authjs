
import WithRenderProp from './WithRenderProp'
import { mount } from 'enzyme'
import { ChildComponent } from './ChildComponent'
import { isFunction } from 'util'

const ExpectRenderProp = (Component, renderPropsPassed = [], props, withRenderProp) => {
    let wrapper = WithRenderProp(Component, props, withRenderProp, mount)
    describe(`ExpectRenderProp to be passed from ${Component.name}`, () => {
        renderPropsPassed.forEach(prop => {
            const propName = Object.entries(prop)[0][0]

            it(`prop, {${propName}} is passed to child component`, () => {

                const propValue = Object.entries(prop)[0][1]

                if (!isFunction(wrapper.find(ChildComponent).prop(propName))) {
                    expect(wrapper.find(ChildComponent).prop(propName)).toEqual(propValue)
                }
                else
                    if (isFunction(wrapper.find(ChildComponent).prop(propName))) {
                        expect(isFunction(wrapper.find(ChildComponent).prop(propName))).toBe(true)
                    }

                    else {
                        expect(false).toBe(true)
                    }
            })
        })
    })
}

export default ExpectRenderProp