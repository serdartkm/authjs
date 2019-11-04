

const jwt = require('jsonwebtoken');
describe("jwt-event-emitter",()=>{
    beforeEach(() => {
        jest.resetModules()
    })
    describe('positive testing',()=>{
    
        it('token issued',(done)=>{
      
           const  jwtController =require ('../index')
            jwtController.requestToken({payload: {username:"mario"}, secret:"mysecret", expiresIn: '1h' },async ({error,token})=>{
                const testToken = await jwt.sign({username:"mario"}, "mysecret",  { expiresIn:'1h' })
                   await  expect(error).toBe(null)
                   await  expect(token).toBe(testToken)
         
                done()
            })
         
        })

    })
//
     describe('negative testing',()=>{
     
         it('handle errors',(done)=>{
         
            const  jwtController =require ('../index')
            jwtController.requestToken({}, async({error,token})=>{//
                await expect(error).not.toBe(null)
           
                done()//
            })
         })
     })
})