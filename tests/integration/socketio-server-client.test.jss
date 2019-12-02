
import {h,Component} from 'preact'
import { render, fireEvent } from '@testing-library/preact'  // client
import io from "socket.io-client"; // client
import MessagingModuleSocket from '../../rtcjs/messaging-module-socket' // client

const MockDate = require('mockdate');
const jwt = require('jsonwebtoken')
const socketServer = require('../../rtcjs/nodejs-socketio-text-chat')({})

describe("messaging-module-socket and nodejs-socketio-text-chat", () => {

  describe("positive testing", () => {

    it("client sever connection established with required params", async (done) => {
      MockDate.set(1434319925276);
      const tokenMario = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
      const tokenDragos = await jwt.sign({ data: "dragos" }, "secret", { expiresIn: '1h' })
     
      const marioClient = io(tokenMario, "one");
      const dragosClient = io(tokenDragos, "two");
     // route='/anonymous',serverUrl
      marioClient.onconnection((client) => {
        const { getAllByText,container } = render(<MessagingModuleSocket route='/anonymous' serverUrl="http://localhost:3000"  id={1} name="mario" targetName="dragos" />)
        client.on("text_message", (data) => {
          setTimeout(() => {
            expect(getAllByText("Hello My Dear")[0]).toBeVisible()
            expect(container).toMatchSnapshot();
            MockDate.reset();
            done()
          }, 0)
        })
      })
      
      dragosClient.onconnection(async (client) => {
        const { getByTestId, getAllByText } = render(<MessagingModuleSocket route='/anonymous' serverUrl="http://localhost:3000" id={2} name="dragos" targetName="mario" />)
        fireEvent.input(getByTestId(`message${2}`), { target: { value: "Hello My Dear" } })
        fireEvent.click(getByTestId(`sendMessage${2}`))
        await expect(getAllByText("Hello My Dear")[1]).toBeVisible()
      })
      socketServer.onconnection((socket) => {
      })
    })
  })
})

