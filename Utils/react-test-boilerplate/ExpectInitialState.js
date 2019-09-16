'use strict';
import WithRenderProp from './WithRenderProp'

const ExpectInitialState = (Component, props, initialState, withRenderProp =true) => {

    describe(`ExpectedInitialState for ${Component.name} `, () => {
        let wrapper=WithRenderProp(Component,props,withRenderProp)
      
        const stateValues = Object.entries(initialState)
        stateValues.forEach((stateValue) => {
            const name = stateValue[0]
            const value = stateValue[1]
            it(`state name ${name}, expected value ${value}`, () => {
                expect(wrapper.state(name)).toEqual(value)
            })

        })
    })

}

export default ExpectInitialState