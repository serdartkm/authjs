
const EventEmitter =require('events')

class Socket   extends EventEmitter {
  constructor(){
      super()
  }
    to =(reciver)=>{

        return {
            emit :(event,data)=>{
                if(this.count===0)
                {
                    this.emit(event,data)
                    this.count=1
                }
              
            }
        }
    }

  
}
//
const socket = new Socket()

const messaging = require('../messaging')
describe("expressjs-socketio-messaging", () => {

    
    it("text_message event should be triggered with correct data", () => {
        const spyOn =jest.fn()
        const spyNext =jest.fn()
        const spyTo =jest.spyOn(socket,'to')
        const spyEmit =jest.spyOn(socket,'emit')
        socket.on('text_message',spyOn)
        
        socket.username ="dragos"
        messaging(socket, spyNext)
        socket.emit("text_message",{reciever:"mario", datetime:"1", message:"hello" })
        expect(spyOn).toHaveBeenCalledTimes(1)
        expect(spyOn).toHaveBeenCalledWith({"datetime": "1", "message": "hello", "reciever": "mario"})
        expect(spyNext).toHaveBeenCalledTimes(1)
        expect(spyTo).toHaveBeenCalledTimes(1)
        expect(spyTo).toHaveBeenCalledWith("mario")
        expect(spyEmit).toHaveBeenCalledTimes(1)
        expect(spyEmit).toHaveBeenCalledWith("text_message", {"datetime": "1", "message": "hello", "reciever": "mario"})

    })

    it("throws error",()=>{

        // socket.username ="dragos"
        // expect(messaging(socket, ()=>{ throw("s")})).toThroeError('s')
        // socket.emit("text_message",{reciever:"mario", datetime:"1", message:"hello" })
        
    })


})