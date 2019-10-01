import WithRenderProp from './WithRenderProp'

var ExpectedBusinessLogic = function (TestComponent, props, withRenderProp, render) {

    this.wrapper = WithRenderProp(TestComponent, props, withRenderProp, render)


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
    
            const stateValues = Object.entries(state)
            stateValues.forEach((stateValue) => {
                const name = stateValue[0]
                const value = stateValue[1]
            
                    expect(this.wrapper.state(name)).toEqual(value)
                

            
        })
        return this
    }

    this.expectedProp = (props) => {
      
            const propValues = Object.entries(props)
            propValues.forEach((propValue) => {
                const name = propValue[0]
                const value = propValue[1]
              
            expect(this.wrapper.instance().props[name]).toEqual(value)
                
            })
        
        return this
    }

    this.mockData = (mockValue) => {

        this.mockValue = mockValue
        return this
    }
    this.setLocalStorageData = ({ key, value }) => {

        localStorage.setItem(key, JSON.stringify(value))
        //  console.log("ls value",localStorage.getItem("my"))
        // window.localStorage.__proto__.getItem = jest.fn();
        // window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(this.mockValue))


        return this
    }
    //
    this.setProps = (props) => {
        this.wrapper.setProps(props)
        return this
    }

    this.expectMethodCall = (methodName) => {
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalled();
            // this.methodNameFake.mockClear()
     

        return this
    }
    this.expectMethodCallOnce = (methodName) => {
     
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalledTimes(1);
            // this.methodNameFake.mockClear()
  

        return this
    }
    this.expectMethodCallWith = (methodName, param) => {
  
            //  this.wrapper.instance().forceUpdate()
            //  this.wrapper.update()
            const func = this[methodName]
            expect(func).toHaveBeenCalledWith(param);
            // this.methodNameFake.mockClear()
     

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
    this.getState=(name)=>{
        this.state[name]= this.wrapper.state(name)
        console.log("this.state---!!!!!!!!!!!!!!!!!!!!!-", this.wrapper.state(name))
        return this
    }

}


export default ExpectedBusinessLogic