
const jwt = require('jsonwebtoken')
const path =require('path')
require('dotenv').config({path:path.join(__dirname, `./.env`)})//


const authentication = require('../authentication')
describe("authentication", () => {
    let token =''
beforeEach(async()=>{
 token = await jwt.sign({ data: "aman" }, "mysecret", { expiresIn: '1h' })
})
    it("testing error handling token not proveded",(done)=>{
        const spyOnErrorThrow =jest.fn()
        authentication("secret")({},spyOnErrorThrow)
        expect(spyOnErrorThrow.mock.calls[0][0].message).toBe('jwt must be provided')
        done()
    }) 
    it('testing error handling token  malformed',(done)=>{
        const spyOnErrorThrow =jest.fn()
        const socket ={}
        socket.token ="dfdfdf"
        authentication("secret")(socket,spyOnErrorThrow)
        expect(spyOnErrorThrow.mock.calls[0][0].message).toBe('jwt malformed')
        done()

    })

    it('testing error handling invalid signature (wrong seceret)',(done)=>{
        const spyOnErrorThrow =jest.fn()
        const socket ={}

        socket.token =token
        authentication("secret")(socket,spyOnErrorThrow)

        expect(spyOnErrorThrow.mock.calls[0][0].message).toBe('invalid signature')
        done()

    })
    it('authorized user',async (done)=>{
        debugger
        const spyOnNext =jest.fn()
        const socket ={}
        socket.token =token
        await authentication("mysecret")(socket,spyOnNext)
        debugger
        expect(spyOnNext).toHaveBeenCalledTimes(1)
        expect(spyOnNext.mock.calls[0][0]).toBe(undefined)
        done()

    })

   
})

//