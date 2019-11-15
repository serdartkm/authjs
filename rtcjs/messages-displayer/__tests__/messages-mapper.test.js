import{h} from 'preact'
import { shallow } from 'enzyme'
import MessageMapper from '../lib/messages-mapper'

const ChildComponent = ({ messages }) => <div>messages length is,{messages.length}</div>


describe("MessageCollectionMapper", () => {
   
    it("first message is local", () => {
        const messages = [{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() }]
        const expectedFirstMessage = { message: "hello", local: true, side: "right", order: "F", from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime(), dateSpace: true }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[0]).toEqual(expectedFirstMessage)
    })
    it("first message is remote", () => {
        const messages = [{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() }]
        const expectedFirstMessage = { message: "hello", local: false, side: "left", order: "F", from: "dragos",letter:"d", to: "mario", datetime: new Date("26 July 2016").getTime(), dateSpace: true }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[0]).toEqual(expectedFirstMessage)
    })

    it("subsequent message is local and date is greater", () => {
        const messages = [{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("27 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: true, side: "right", order: "S", from: "mario", to: "dragos", datetime: new Date("27 July 2016").getTime(), dateSpace: true }
       
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)//
    })
    it("subsequent message is local and date is equal", () => {
        const messages = [{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: true, side: "right", order: "S", from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime(), dateSpace: false }
       
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)//
    })

    it("subsequent  message is remote and date is greater", () => {
        const messages = [{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("27 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: false, side: "left", order: "S", from: "dragos",letter:"d", to: "mario", datetime: new Date("27 July 2016").getTime(), dateSpace: true }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)//
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })

    it("subsequent  message is remote and date is equal", () => {
        const messages = [{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: false, side: "left", order: "S", from: "dragos",letter:"d", to: "mario", datetime: new Date("26 July 2016").getTime(), dateSpace: false }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)//
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })
    it("first message is remote and subsequent message is local and date is greater", () => {
        const messages = [{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("27 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: true, side: "right", order: "F", from: "mario", to: "dragos", datetime: new Date("27 July 2016").getTime(), dateSpace: true }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })

    it("first message is remote and subsequent message is local and date is equal", () => {
        const messages = [{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: true, side: "right", order: "F", from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime(), dateSpace: false }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })

    it("first message is local and subsequent message is remote and date is equal", () => {
        const messages = [{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("26 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: false, side: "left", order: "F", from: "dragos", letter:"d",to: "mario", datetime: new Date("26 July 2016").getTime(), dateSpace: false }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)//
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })

    it("first message is local and subsequent message is remote and date is greater", () => {
        const messages = [{ message: "hello", local: true, from: "mario", to: "dragos", datetime: new Date("26 July 2016").getTime() },{ message: "hello", local: false, from: "dragos", to: "mario", datetime: new Date("27 July 2016").getTime() }]
        const expectedSubsequentMessage = { message: "hello", local: false, side: "left", order: "F", from: "dragos",letter:"d", to: "mario", datetime: new Date("27 July 2016").getTime(), dateSpace: true }
        const wrapper = shallow(<MessageMapper messages={messages}>{({ messages }) => <ChildComponent messages={messages} />}</MessageMapper>)//
        expect(wrapper.find(ChildComponent).props().messages[1]).toEqual(expectedSubsequentMessage)
    })
})