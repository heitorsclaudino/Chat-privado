import './App.css';
import io from "socket.io-client";
import Chat from './Chat';

import { useState } from 'react';

const socket = io.connect("http://localhost:3001")


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if(!username || !room){
      return console.log("Usuário e/ou senha vazio(s)")
    }
    
    socket.emit("join_room", room);
    setShowChat(!showChat);
  };
  return (
    <div className='master'>
      {!showChat ? <div className="joinChatContainer">
          <h3 style={{ fontFamily: 'fantasy' }}>Entre em uma sala de chat</h3>
            <input placeholder='Username' onChange={(event) => { setUsername(event.target.value)}}/>
            <input placeholder='n° da sala' onChange={(event) => { setRoom(event.target.value)}}/>
          <button onClick={joinRoom}>Entrar</button>
      </div>
      :
      <Chat socket={socket} username={username} room={room}/>}
    </div> 
  );
}

export default App;
