import WithRenderProp from './WithRenderProp'

var ExpectedBusinessLogic = function (TestComponent, state, props, withRenderProp, render) {

    this.wrapper = WithRenderProp(TestComponent, props, withRenderProp, render)
    this.wrapper.setState({ ...state })

    this.methodCall = (methodName, args = []) => {
        this.wrapper.instance()[methodName](args)
        return this
    }
    this.componentDidMount = () => {
        this.wrapper.instance().componentDidMount()
        //  this.wrapper.instance().forceUpdate()
        //  this.wrapper.update()
        return this
    }
    this.expectedState = (state) => {
        this.wrapper.state(state)
        describe(`ExpectedState Change${TestComponent.name}`, () => {
            const stateValues = Object.entries(state)
            stateValues.forEach((stateValue) => {
                const name = stateValue[0]
                const value = stateValue[1]
                it(`state name ${name}, expected value ${value.length}`, () => {
                    console.log("-------", name, this.wrapper.state(name))
                    expect(this.wrapper.state(name)).toEqual(value)
                })

            })

        })
        return this
    }

    this.mockData = (mockValue) => {

        this.mockValue = mockValue
        return this
    }
    this.mock = ({ mockName, key }) => {

        switch (mockName) {
            case "localStorage": {
                window.localStorage.__proto__.getItem = jest.fn();
                window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(this.mockValue))
            }
        }
        return this
    }

    this.setProps = (props) => {
        this.wrapper.setProps(props)
        return this
    }

    this.expectMethodCall = (methodName) => {
        it(`expectMethodCall for ${methodName} class method`, () => {
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalled();
            // this.methodNameFake.mockClear()
        })

        return this
    }
    this.expectMethodCallOnce=(methodName)=>{
        it(`expectMethodCallOnce for ${methodName} class method`, () => {
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalledTimes(1);
            // this.methodNameFake.mockClear()
        })

        return this
    }
    this.expectMethodCallWith = (methodName,param) => {
        it(`expectMethodCall for ${methodName} class method`, () => {
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalledWith(param);
            // this.methodNameFake.mockClear()
        })

        return this
    }
    this.spyOnClassMethod = (methodName) => {
        this[methodName] = jest.spyOn(this.wrapper.instance(), methodName);
        return this
    }

    this.expectFuctionCall = () => {

        return this
    }

    this.componentWillReceiveProps = (newProps) => {
        this.wrapper.setProps(newProps)
        return this
    }




}


export default ExpectedBusinessLogic