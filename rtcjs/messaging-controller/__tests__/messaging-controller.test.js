'use strict';
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect'
import { checkProps } from '../../../Utils/index'
import MockedSocket from 'socket.io-mock';
import { shallow } from 'enzyme';
import MessageController from '../lib/index'

Enzyme.configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
    const component = shallow(<MessageController {...props}>{() => {

    }}</MessageController>)
    return component
}

let socket = new MockedSocket();

const expectedProps = {
    name: 'Test user',
    targetName: 'Test Target Name',
    socket: socket
}

let wrapper = setUp(expectedProps)

describe('<MessageController/>', () => {
    describe('render', () => {

        it('render <MessageController/>', () => {
            expect(wrapper).toHaveLength(1)
        });
    })

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {
            const propsError = checkProps(MessageController, expectedProps)
            expect(MessageController.propTypes).toBeDefined()
            expect(propsError).toBeUndefined()
        })
    })

    describe('Checking State', () => {
        it('Initial state should be null', () => {
            expect(wrapper.state().messageRecieved).toBeNull()
            expect(wrapper.state().messageSent).toBeNull()
        })
        it('Initial state should be false', () => {
            expect(wrapper.state().connected).toBe(false)
        })

    })

    describe('Checking socket connection state', () => {
        it('connected state should be true', () => {
           wrapper.instance().componentDidMount()
           socket.socketClient.emit('connect', 'Hello World!');
            expect(wrapper.state().connected).toBe(true)

        })  

        it('connected state should be false', () => {
            wrapper.instance().componentDidMount()
            socket.socketClient.emit('disconnect', 'Hello World!');
             expect(wrapper.state().connected).toBe(false)
 
         })  

 
    })

});
///