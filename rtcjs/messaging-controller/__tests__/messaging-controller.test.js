'use strict';
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect'
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';

import MessageController from '../lib/index'

const setUp=(props={})=>{
const component = shallow(<MessageController {...props}/>)
return component
}

describe('<MessageController/>', () => {
    let component;

    beforeEach(()=>{
        component =setUp()
    })
    it('render <MessageController/>',()=>{


        expect(component).toHaveLength(1)
    });
});
