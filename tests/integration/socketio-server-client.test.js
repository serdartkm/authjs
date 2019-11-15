
import {h,Component} from 'preact'
import { render, fireEvent, cleanup } from '@testing-library/react'  //client
import io from "socket.io-client"; //client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' //client
const jwt = require('jsonwebtoken')


describe("INTEGRATION TESTING ", () => {

  describe("positive testing", () => {

    it("client sever connection established with required params", async (done) => {

      const tokenMario = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
      const tokenDragos = await jwt.sign({ data: "dragos" }, "secret", { expiresIn: '1h' })
      const socketServer = require('../../rtcjs/nodejs-socketio-text-chat')({})
      const marioClient = io(tokenMario, "one");
      const dragosClient = io(tokenDragos, "two");

      marioClient.onconnection((client) => {
        const { getAllByText, getByPlaceholderText } = render(<MessagingModuleSocket id={1} name="mario" targetName="dragos" socket={client} />)
        client.on("text_message", (data) => {
          setTimeout(() => {
            expect(getAllByText("Hello My Dear")[0]).toBeVisible()
            done()
          }, 0)
        })
      })
      
      dragosClient.onconnection(async (client) => {
        const { getByTestId, getAllByText } = render(<MessagingModuleSocket id={2} name="dragos" targetName="mario" socket={client} />)
        fireEvent.change(getByTestId(`message${2}`), { target: { value: "Hello My Dear" } })
        fireEvent.click(getByTestId(`sendMessage${2}`))
        await expect(getAllByText("Hello My Dear")[1]).toBeVisible()
      })
      socketServer.onconnection((socket) => {
      })
    })
  })
})

