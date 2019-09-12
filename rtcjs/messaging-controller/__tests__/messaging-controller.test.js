'use strict';
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect'
import {checkProps} from '../../../Utils/index'

import MockedSocket from 'socket.io-mock';


Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';

import MessageController from '../lib/index'

const setUp = (props = {}) => {
    const component = shallow(<MessageController {...props} />)
    return component
}

describe('<MessageController/>', () => {
    describe('render', () => {
        let component;

        beforeEach(() => {
            component = setUp()
        })
        it('render <MessageController/>', () => {
            expect(component).toHaveLength(1)
        });
    })

    describe('Checking PropTypes',()=>{
        let socket = new MockedSocket();

        console.log("socket---",socket)
        it('Should not throw a warning',()=>{
                const expectedProps ={
                    name:'Test user',
                    targetName:'Test Target Name',
                    socket :socket
                }

                const propsError =checkProps(MessageController,expectedProps)
                expect(MessageController.propTypes).toBeDefined()
                expect(propsError).toBeUndefined()
        })
    })


});
