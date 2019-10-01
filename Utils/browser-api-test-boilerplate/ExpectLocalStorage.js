
import {WithRenderProp} from '../react-test-boilerplate'
const ExpectLocalStorage = (Component,{inokedBy,key},props,withRenderProp) => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    let wrapper =WithRenderProp(Component,props,withRenderProp)
    return {
        getItem: {
            toHaveBeenCalled: () => {
                describe("ExpectLocalStorage", () => {
                    it("getItem.toHaveBeenCalled", () => {
                        wrapper.instance()[inokedBy]({key})
                        expect(localStorage.getItem).toHaveBeenCalled();
                    })
                })
            },
            toEqual:(value)=>{
                describe("ExpectLocalStorage",()=>{
                    it("getItem toEqual",()=>{
                        window.localStorage.__proto__.getItem = jest.fn();
                        window.localStorage.__proto__.getItem.mockReturnValue(value)
                        wrapper.instance()[inokedBy]({key})
                        expect(localStorage.getItem).toHaveBeenCalled();
                    })
                })
            }   
        },
        setItem: {
            toHaveBeenCalled: () => {
                describe("ExpectLocalStorage", () => {
                    it("setItem.toHaveBeenCalled", () => {
                        wrapper.instance()[inokedBy]({key})
                        expect(localStorage.setItem).toHaveBeenCalled();
                    })
                })
            }
        }
    }
}
export default ExpectLocalStorage
