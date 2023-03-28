import './App.css';
import io from "socket.io-client";

import { useState } from 'react';

const socket = io.connect("http://localhost:3001")


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(!username || !room){
      return console.log("Usuário e/ou senha vazio(s)!")
    }
    socket.emit("join_room", room);

  };
  return (
    <div className="container">
      <div className='form'>
        <h3>Entre em uma sala de chat</h3>
          <input placeholder='Username' onChange={(event) => { setUsername(event.target.value)}}/>
          <input placeholder='n° da sala' onChange={(event) => { setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Entrar</button>
      </div> 
    </div>
  );
}

export default App;
