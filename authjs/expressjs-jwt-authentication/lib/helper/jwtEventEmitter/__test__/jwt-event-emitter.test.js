
const  JwtEventEmitter =require ('../index')
const jwt = require('jsonwebtoken');
describe("jwt-event-emitter",()=>{

  

    describe('positive testing',()=>{

        it('token issued',(done)=>{
           
                JwtEventEmitter.requestToken({payload: {username:"mario"}, secret:"secret", expiresIn: '1h' },async (err,token)=>{
                    const testToken = await jwt.sign({username:"mario"}, "secret",  { expiresIn:'1h' })
                    await expect(token).toBe(testToken)
                    debugger
                    done()
                })
         
        })

    })

     describe('negative testing',()=>{
         it('handle errors',(done)=>{
            JwtEventEmitter.requestToken({}, (err,token)=>{
                 expect(err).not.toBe(null)//
                debugger
                done()
            })
         })
     })
})