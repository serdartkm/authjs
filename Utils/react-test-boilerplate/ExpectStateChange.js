import WithRenderProp from './WithRenderProp'

var ExpectStateChange = function (Component, props, withRenderProp) {
    let wrapper = WithRenderProp(Component, props, withRenderProp)
    return {
        fromState: (initialState) => {
            console.log("initial state---",initialState)
         //   wrapper.setState({ initialState })
            return {
                ByClassMethod: (methodName) => {
                    wrapper.instance()[methodName]()
                    return {
                        toState: (changedState) => {
                            describe(`ExpectedStateChange on ${Component.name}`, () => {
                                const changedStateValues = Object.entries(changedState)
                                changedStateValues.forEach((stateValue) => {
                                    const name = stateValue[0]
                                    const value = stateValue[1]
                                    it(`state name ${name}, expected value ${value}`, () => {
                                        expect(wrapper.state(name)).toEqual(value)
                                    })
                                
                                })

                            })
                        }
                    }
                }
            }
        }
    }

}


export default ExpectStateChange


