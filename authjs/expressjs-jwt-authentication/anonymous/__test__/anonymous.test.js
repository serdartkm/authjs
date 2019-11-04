const anonymous = require('../anonymous')
const jwt = require('jsonwebtoken')

describe('anonymous.js', () => {

    describe('positive testing', () => {

        it('responds with token', async (done) => {
            const tokenMario = await jwt.sign({ username: "mario" }, "mysecret", { expiresIn: '1h' })
            const res = {}
            res.json = jest.fn()//
            const req = {}
            req.body = { expiresIn: '1h', secret: 'mysecret', payload: { username: "mario" } }
           
            await anonymous(req, res)
            await expect(res.json).toHaveBeenCalledTimes(1)
            await expect(res.json).toHaveBeenCalledWith({ token: tokenMario })
            done()
        })
    })
})