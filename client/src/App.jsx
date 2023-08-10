import { useState } from 'react'
import './App.css'
import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Socket } from './lib/Socket'

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])
  useEffect(() => {
    Socket.on('connect', () => {
      console.log("Connected SocketIO")
      setIsConnected(true);
    })
    Socket.on('disconnect', () => {
      console.log("Server disconnected")
      setIsConnected(false);
    })
    Socket.on("new-user-joined", () => {
      setUsers(...users, "new User")
    })
  }, [])
  const handleSend = () => {
    console.log("sent")
    Socket.emit("chat", { message: message })
  }
  return (
    <>
      {isConnected ? 'Connected To server' : 'Not connected'}
      <div className="flex items-center justify-around">

        <Input width="50rem" variant='filled' onChange={(e) => {
          setMessage(e.target.value)
        }} placeholder='Filled' />
        <Button colorScheme='blue' onClick={handleSend}>Send</Button>
        {users.map((e) => { e })}
      </div>
    </>
  )
}

export default App
