import React from 'react'
import renderer from 'react-test-renderer'
import MessageEditorDisplayer from '../index'
import {shallow, mount} from 'enzyme'
describe('MessageEditorDisplayer component', () => {
    it("Should render correctly", () => {
        const tree = renderer.create(<MessageEditorDisplayer />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it("Send button clicked once",()=>{
    let spy =jest.fn()
    const wrapper = mount(<MessageEditorDisplayer sendMessage={spy} />)
     expect(wrapper.find('.btn')).toHaveLength(1)
      wrapper.find('.btn').simulate('click')
      expect(spy).toHaveBeenCalled()
    })


})
