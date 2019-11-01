
import room from '../room'
describe("room.js", () => {

    describe("Positive testing", () => {
        it("user joined room", () => {

            const socket = { username: "mario", join: jest.fn() }
            const spyOnJoin = jest.spyOn(socket, 'join')
            const spyOnNext = jest.fn()
            room(socket, spyOnNext)
            expect(spyOnNext).toHaveBeenCalledTimes(1)
            expect(spyOnJoin).toHaveBeenCalledTimes(1)
            expect(spyOnNext).toHaveBeenCalledWith()
        })
    })
    describe("negative testing", () => {
        it("undefined username", () => {
            const socket = { join: jest.fn() }
            const spyOnJoin = jest.spyOn(socket, 'join')
            const spyOnNext = jest.fn()
            room(socket, spyOnNext)
            expect(spyOnNext).toHaveBeenCalledTimes(1)
            expect(spyOnJoin).not.toHaveBeenCalled()  //
            expect(spyOnNext).toHaveBeenCalledWith(new Error('User name is undefined'))
        })
    })
})

