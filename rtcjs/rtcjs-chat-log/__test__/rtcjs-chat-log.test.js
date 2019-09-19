
import RTCChatLog from '../index'
import { ExpectedPropTypes, ExpectedRenderProp, ExpectedBusinessLogic } from '../../../Utils/react-test-boilerplate'
import { mount } from 'enzyme'
import sinon from 'sinon'
const fakedate = sinon.useFakeTimers(new Date().getTime());
const expectedProps = {
    messageSent: { reciever: "dragos", datetime: new Date().getTime(), message: "hello" },
    messageReciever: { sender: "dragos", datetime: new Date().getTime(), message: "hello" },
    name: "dragos"
}

describe('RTCChatLog component', () => {
    ExpectedPropTypes(RTCChatLog, { messageSent: null, messageReciever: null })
    ExpectedRenderProp(RTCChatLog, [{ messages: [] }], expectedProps)
})

describe("RTCChatLog Component", () => {
    const iniTialMessages = [{ message: "hello", from: "dragos", local: true, datetime: new Date().getTime(), to: "mario" }]
    let Test__RTCChatLog = new ExpectedBusinessLogic(RTCChatLog, {}, expectedProps, true)
    describe("Test _loadFromStorage method", () => {
        Test__RTCChatLog
            .mockData(iniTialMessages)
            .mock({ mockName: "localStorage", key: "dragos" })
            .spyOnClassMethod('_loadFromStorage')
            .componentDidMount()
            .expectMethodCallWith('_loadFromStorage', { key: "dragos" })
            .expectedState({ messages: iniTialMessages })

    })

    describe("Test _saveLocalMessage method", () => {

            describe("props: messageSent === null, messageReceived===null ",()=>{
                let props = {messageSent:null,messageRecieved:null,name:"dragos"}
                let messageSent ={ message: "hi", datetime: "1668887783020", reciever: "dragos" }
                let messageRecieved ={ message: "hi", datetime: "1668887783020", sender: "mario" }
                new ExpectedBusinessLogic(RTCChatLog,{},props,true)
               // .mockData([...iniTialMessages, { message: "hi", datetime: "1668887783020", reciever: "dragos" }])
               
                .spyOnClassMethod('_saveLocalMessage')
                .componentWillReceiveProps({ messageSent})
                .expectMethodCallWith('_saveLocalMessage', { key: "dragos",messageSent })
                .expectMethodCallOnce('_saveLocalMessage')
                
                .spyOnClassMethod('_saveRemoteMessage')
                .componentWillReceiveProps({messageRecieved})
                .expectMethodCallWith('_saveRemoteMessage', { key: "dragos",messageRecieved })
                .expectMethodCallOnce('_saveRemoteMessage')
            })


            describe.only("props: messageSent !== null, messageReceived !==null ",()=>{
                let lastMessageSent ={ message: "hi", datetime: "1668887783020", reciever: "dragos" }
                let lastMessageRecieved ={ message: "hi", datetime: "1668887783020", sender: "mario" }
                let props = {messageSent:lastMessageSent,messageRecieved:lastMessageRecieved,name:"dragos"}
                let newMessageSent ={ message: "hooo", datetime: "1668887783021", reciever: "dragos" }
                let newMessageRecieved ={ message: "wooo", datetime: "1668887783023", sender: "mario" }
                new ExpectedBusinessLogic(RTCChatLog,{},props,true)

                .spyOnClassMethod('_saveLocalMessage')
                .componentWillReceiveProps({ messageSent:newMessageSent})
                .expectMethodCallWith('_saveLocalMessage', { key: "dragos",messageSent:newMessageSent })
                .expectMethodCallOnce('_saveLocalMessage')

                .spyOnClassMethod('_saveRemoteMessage')
                .componentWillReceiveProps({ messageReceived:newMessageRecieved})
                .expectMethodCallWith('_saveRemoteMessage', { key: "dragos",messageRecieved:newMessageRecieved })//
             //   .expectMethodCallOnce('_saveRemoteMessage')


            })


    })
})





       // .expectedState({messages:[...iniTialMessages,{message:"hi",datetime:new Date().getTime(),reciever:"dragos"}]})

       // .expectedState({ messages: [{ message: "hello", from: "dragos", local: true, datetime: new Date().getTime(), to: "mario" }] })
       // .setProps({ messageRecieved: { message: "hey you", datetime: new Date().getTime(), sender: "mario" } })
       // .mockData([...iniTialMessages, {message: "hey you", datetime: new Date().getTime(), sender: "mario" } ])
       // .mock({ mockName: "localStorage", key: "dragos"})
        //.expectedState({ messages: [{ message: "hello", from: "dragos", local: true, datetime: new Date().getTime(), to: "mario" }, { message: "hey you", datetime: new Date().getTime(), from: "mario", local: false }] })