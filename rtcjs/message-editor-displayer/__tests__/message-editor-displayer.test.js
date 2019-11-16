

import { h } from 'preact'
import { render, fireEvent } from '@testing-library/preact'
import renderer from 'preact-render-to-string'
import MessageEditorDisplayer from '../index'

import '@testing-library/jest-dom/extend-expect'
describe('MessageEditorDisplayer component', () => {


    it("Should render correctly", () => {

        const tree = renderer(MessageEditorDisplayer)
        expect(tree).toMatchSnapshot();
    })

    it.only("Send button clicked once",()=>{
    let spy =jest.fn()

    const { debug,getByTestId,getByPlaceholderText } = render( <MessageEditorDisplayer id={0} sendMessage={spy} />,{})
     expect(getByTestId('sendMessage0')).toBeInTheDocument()
     expect(getByPlaceholderText('//i'))
    //  expect(wrapper.find('.btn')).toHaveLength(1)
    //   wrapper.find('.btn').simulate('click')
    //   expect(spy).toHaveBeenCalled()
    })


})
