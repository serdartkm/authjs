import WithRenderProp from './WithRenderProp'


const ExpectComponentRender = (Component, props, withRenderProp = true) => {

    let wrapper = WithRenderProp(Component, props, withRenderProp)
    describe(`ExpectComponentRender, ${Component.name}`, () => {
        it(`Component ${Component.name} renders`, () => {
            expect(wrapper).toHaveLength(1)
        });

    })
}


export default ExpectComponentRender